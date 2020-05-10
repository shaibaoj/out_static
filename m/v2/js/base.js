$(window).bind('DOMContentLoaded', function () {
    setTimeout(function () {
        $('body').removeClass('loading');        
    }, 400);
});

var config = {};
$(window).bind('load', function () {
    reset();
});
$(window).bind('resize', function () {
    reset();
});
function reset() {
    config.w = $(window).width();
    config.h = $(window).height();
    // $('#menu').height(config.h);

    $('.ct').height(config.h - 45);

}
function currentUser(ticket) {
    if (ticket == null || ticket.length == 0) {
        return {id:0,name:""};
    } else {
        var details = ticket.split('&');
        return { id: details[0], name: decodeURIComponent(details[1]), pic: decodeURIComponent(details[3].split('|')[0]) };
    }
}
function isLogin() {
    if (_user.id == undefined || _user.id <= 0) {
        return false;
    }
    return true;
}
var _user ={id:0,name:"",pic:""};
_user= currentUser(getCookie("certification"));

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var _employee = getUrlVars();
if (_employee.length > 0) {
    var u = _employee["u"];
    if (u != null) {
        var reg = /^\d{1,10}$/;
        if (reg.test(_employee)) {
            document.cookie = "Employee=" + _employee + ";path=/";
        }
    }
}



// Silde当前状态
var oNavli = $("#side-menu li a");
for (var i = 0; i < oNavli.length; i++) {
    var sHref = oNavli.eq(i).attr("href");    
    if (sHref.indexOf(location.hostname) != -1) {
        sHref = sHref.split(location.hostname)[1];
    }
    if (sHref == location.pathname || sHref == location.pathname + "/") {
        oNavli.eq(i).parents("li").addClass("nav-cur");
    }
};

// Side
$(".side-menu").tap(function () { 
    $(".mask").css({ "visibility": "visible" });
    $("#side-menu").addClass('push');
    if (!getCookie("reddot")) {
        $(".reddot").remove();
        setCookie("reddot", "1", 10);
    }
});
$(".rese-input,.mask").tap(function () {
    $(".mask").css({ "visibility": "hidden" });
    $("#side-menu").removeClass('push');
});
// 添加小红点
if (!getCookie("reddot")) {
    $(".side-menu .menu").html('<b class="reddot"></b>');
}

// 阻止冒泡
//document.getElementById('container').addEventListener('touchmove', function (e) {
   // e.stopPropagation();
//});
document.getElementById('side-menu').addEventListener('touchmove', function (e) {
    e.preventDefault();
    e.stopPropagation();
});
//document.getElementById('overlay').addEventListener('touchmove', function (e) {
//    e.preventDefault();
//    e.stopPropagation();
//});


// 加载更多数据
// dataurl： 请求数据对应的地址
// databox : 反回数据后装载到对应的容器
// autoload : 是否自动加载 1为是，0为否
config.isloading = true;
config.url_ex=false;
config.url_ex_pageCount=99;
config.url_ex_loading_count=0;
function getMoreData(dataurl, databox, autoload,dataurl_ex) {
    if (!config.isloading) {
        return false;
    }
    config.isloading = false;
    if (autoload=="undefined"){
        autoload = 0;
    };
    var showBtn = $(".show-more-btn");
    var pnum = Number(showBtn.attr("data-pagenum"));
    var pindex = Number(showBtn.attr("data-pageindex")) + 1;

    $(".show-more-btn").hide();
    $(".list-loading").show();
    if (config.url_ex&&typeof(dataurl_ex) != "undefined") {
    	dataurl = dataurl_ex;
    }
    $.ajax({
        url: dataurl,
        data: "ipage=" + pindex,
        success: function (data) {
            $boxes = $(data);
            if(!config.url_ex&&typeof(dataurl_ex) != "undefined"&&$.trim(data)==''){
            	config.url_ex = true;
            	showBtn.attr("data-pageindex","0");
            	pindex = 0;
            	
            	config.isloading = true;
            	showBtn.attr("data-pageindex", pindex);
            	getMoreData(dataurl, databox, autoload,dataurl_ex);
            }
            else if(config.url_ex&&typeof(dataurl_ex) != "undefined"&&$.trim(data)==''&&config.url_ex_pageCount>pindex){
            	config.isloading = true;
            	showBtn.attr("data-pageindex", pindex);
            	getMoreData(dataurl, databox, autoload,dataurl_ex);
            }else{
            	 $(".list-loading").hide();
                 if (pindex < pnum) {
                     $(".show-more-btn").show();
                 }

                 if (autoload) {
                     $(".show-more-btn").hide();
                     if (pindex > pnum) {
                         $(".list-loading").hide();
                     }
                 }
                 showBtn.attr("data-pageindex", pindex);
                 $('#' + databox).append($boxes);
                 lazyLoading($('#' + databox + " img.lazyload"));
                 // 首页加载三次显示跳转全民爆料按钮
                 if (dataurl.indexOf("_MainIndex") > -1 && pindex > 1 && $(".go-publish-wrap").length == 0) {
                     //$(".show-more-btn").remove();
                     //$(".list-loading").before('<div class="go-publish-wrap"><a class="go-publish" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.liuzhuni.lzn">去惠喵App查看更多精选</a></div>');
                 }
                 config.isloading = true;
            }
        }
    });
}

//签到
function signDaily() {

    if (!isLogin()) {
        promptPop({ content: "请先登录", yesFn: "closePop('gologin')" });
        return;
    }

    $.ajax({
        type: "post",
        url: "/ajaxmy/UserSignIn",
        success: function (result) {
            var result = eval(result);
            if (result.Result == null) {
                promptPop({ content: result.Error.Msg });
                return;
            }
            if (result.Result != null && result.Result.signday >= 1) {
                var cont = "签到成功，奖励" + result.Result.signnum + "积分";
                promptPop({ content: cont});
            }
        }
    });

}

//go top
function goTop() {
    function topAction() {
        h = $(window).height();
        t = $(window).scrollTop();
        if (t > h) {
            $("#gotop").show();
        } else {
            $("#gotop").hide();
        }
    }
    $("#gotop").tap(function () {
        $(window).scrollTop(0);
        $("#gotop").hide();
    });

    var count = 0;
    $(window).scroll(function (b) {
        count++;
        if (count % 2 === 0) {
            return;
        }
        topAction();
    });
}
goTop();

function getCookie(c_name) {
    if (document.cookie.length > 0) {//先查询cookie是否为空，为空就return ""
        c_start = document.cookie.indexOf(c_name + "=")//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
            c_end = document.cookie.indexOf(";", c_start)//其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))//通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
        }
    }
    return ""
}

function setCookie(name, value, day, domain) {
    var _cookie = name + "=" + escape(value);
    if (day) {
        var exp = new Date;
        exp.setTime(exp.getTime() + 60 * 60 * 24 * day * 1e3 ), _cookie += ";expires=" + exp.toGMTString()
    }
    domain && (_cookie += ";domain=" + escape(domain)), document.cookie = _cookie
}

function delCookie(name) {
    var exp = new Date;
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    null != cval && (document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString())
}

// 全局弹窗
function globalPop(popElem) {
    if (popElem) {
        popElem.show();
    }    
    // 创建遮罩层
    $("body").append("<div id='overlay'></div>");
}

// 关闭弹窗
function closePop(par) {
    $("#overlay").remove();
    if (par == "hide") {
        $(".popbox").hide();
    } else if (par == "remove") {
        $(".popbox").remove();
    } else if (par == "gologin") {
        location.href = location.origin + "/login";
    }
}

// 关闭弹窗聚焦到input 
function closeFocus(name){
    closePop('remove');
    $("input[name="+name+"]").focus();
    //评论框
    if(name=="comment"){
        $("#write-cot").focus();
    }
}

var mtime = null;
// 提示弹窗options中的参数 content内容,autoClose时间,yesFn确定动作
function promptPop(options) {
    this.options = {
        content: "",
        autoClose:"",
        yesFn: "closePop('hide')"
    }
    var op = $.extend(this.options, options);
    if ($("#overlay").length) {
        $('#overlay,.pop-prompt').remove()
    }
    $("body").append("<div id='overlay'></div>");
    $("body").append("<div class='pop-prompt popbox'><p class='pop-prompt-text'>" + op.content + "</p><div class='popbox-action'><a class='action-enter' onclick=\""+ op.yesFn + "\">确定</a></div></div>");
    if (op.autoClose) {
        clearTimeout(mtime);
        mtime = setTimeout("$('#overlay,.pop-prompt').remove()", op.autoClose);
    }
}

// 加载弹窗 ms为时间
function lodingPop() {
    $("body").append("<div class='resultok popbox'><span class='popbox-icon'><img src='/content/img/loading-icon.gif' style='width:30px' /></span><p class='popbox-text'>加载中</p></div>");
}
// 勾弹窗 cont为内容 ms为时间
function successPop(cont,ms) {    
    $("body").append("<div class='resultok popbox'><span class='popbox-icon'><img src='/content/img/correct-ic.png' style='width:45px'/></span><p class='popbox-text'>"+cont+"</p></div>");
    if (ms) {
        clearTimeout(mtime);
        mtime = setTimeout("$('#overlay,.resultok').remove()", ms);
    }
}

// 搜索
$("#search-box,#search-box1").keyup(function (e) {
    var key = $.trim($(this).attr("value"));
    if(key !=""){
        $("#search-btn,#search-btn1").addClass('search-focus');
    }else{
        $("#search-btn,#search-btn1").removeClass('search-focus');
    }
    if (e.keyCode == 13) {
        if (key=="") {
            promptPop({ content: "输入你要找的商品", yesFn: "closeFocus('seacrh-box')" });
            e.preventDefault();
            return;
        } else {
            lodingPop("加载中");
            location.href = location.origin+"/search?keyword="+ encodeURIComponent(key);
        }
    }
});

$("#search-btn,#search-btn1").click(function(e){
    var key = $.trim($("#search-box").attr("value"));
    if($("#search-btn1").length==1){
        key = $.trim($("#search-box1").attr("value"));
    } 
    if (key=="") {
        promptPop({ content: "输入你要找的商品", yesFn: "closeFocus('seacrh-box')" });
        e.preventDefault();
    } else {
        lodingPop("加载中");
        $(".mask").css({ "visibility": "hidden" });
        $("#side-menu").removeClass('push');
        location.href = location.origin + "/search?keyword=" + encodeURIComponent(key);
    }
});

// 惰性加载图片
function lazyLoading(_images) {
	for (var i = 0; i < _images.length; i++) {
        var image = _images.eq(i);
        if (image.attr("data-original") && (image.offset().top < $(window).scrollTop() + $(window).height())) {
            image.attr("src", image.attr("data-original"));
            image.removeAttr("data-original");
        }
    }
    $(window).scroll(function () {
        for (var i = 0; i < _images.length; i++) {
            var image = _images.eq(i);
            if (image.attr("data-original") && (image.offset().top < $(window).scrollTop() + $(window).height())) {
                image.attr("src", image.attr("data-original"));
                image.removeAttr("data-original");
            }
        }
    });
}


// 底栏下载app
//var _downloadHtml = '<div class="app_promotion_bar cf">' +
//                '<div class="app_cot">' +
//                    '<span class="app_icon"></span>' +
//                    '<p class="app_title">惠喵</p>' +
//                    '<p class="app_describe">App更多优惠、神价福利</p>' +
//                '</div>' +
//                '<a target="_blank" class="app_download_btn" href="http://m.huim.com/clicktotal.html?dapp=footbar">打开 App</a>' +
//            '</div>';
//
//if (location.href.indexOf("qingdan/q-") < 0 && location.href.indexOf("/app") < 0 && location.href.indexOf("/mq") < 0) {
//    $('body').append(_downloadHtml);
//}
