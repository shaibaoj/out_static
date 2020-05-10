
$(window).bind('DOMContentLoaded', function () {
    setTimeout(function () {
        $('body').removeClass('loading');        
    }, 400);
});
var config = {};
// 加载更多数据
// dataurl： 请求数据对应的地址
// databox : 反回数据后装载到对应的容器
// autoload : 是否自动加载 1为是，0为否
config.isloading = true;
function getMoreData(dataurl, databox, autoload) {
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
    $.ajax({
        url: dataurl,
        data: "pindex=" + pindex,
        success: function (data) {
            $boxes = $(data);

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
    });
}
//go top
function goTop() {
    var $header = $('#header'),
        $nav = $('#nav'),
        $tem_h = $('#tem_h'),
        windowWidth = $(window).height(),
        $gotop = $('#gotop')
        $webBottom = $('#web_bottom');
    function topAction() {
        if ($(window).scrollTop() > windowWidth / 3) {
            //频道页和内页的底部高度不同
            if($('.menu_content').length > 0){
                $webBottom.addClass('bottom_show');
            }else{
                $webBottom.addClass('page_bottom_show');
            }
        } else {
            if($('.menu_content').length > 0){
                $webBottom.removeClass('bottom_show');
            }else{
                $webBottom.removeClass('page_bottom_show');
            }
        }
    }
    $gotop.on('touchend',function (e) {
        $(window).scrollTop(0);
        if($('.menu_content').length > 0){
            $webBottom.removeClass('bottom_show');
        }else{
            $webBottom.removeClass('page_bottom_show');
        }
        $webBottom.removeClass('bottom_show');
        e.preventDefault();
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

// 惰性加载图片
function lazyLoading(_images) {
    $(window).scroll(function () {
        for (var i = 0; i < _images.length; i++) {
            var image = _images.eq(i);
            if (image.attr("data-original") && (image.offset().top < $(window).scrollTop() + $(window).height())) {
                image.attr("src", image.attr("data-original"));
                image.removeAttr("data-original");
                image.removeClass("lazyload");
            }
        }
    });
}

//关闭淘口令弹窗
function closeMask(){
    $('#mask_close').on('click',function(){
        $('#mask').hide();
    });
}
//判断是否微信打开
function isWx(){
    if(navigator.userAgent.indexOf('MicroMessenger') > -1){
        return true;
    }
    return false;
}
//判断在ios打开
function isIos(){
    var ua = navigator.userAgent.toLowerCase(); 
    if (/iphone|ipad|ipod/.test(ua)){
        return true;
    }else{
        return false;
    }
}
//弹出淘口令
//$list为列表的容器 other为额外操作如获取淘口令getKtl isprice为是否显示券后价，详情没有
function showTkl($list,other,isprice){
    var $copyBtn = $('#copy_kl'),
        $mask = $('#mask'),
        $copySuccess = $('#copy_success'),
        $title = $('#mask_title');
    //点击复制
    $copyBtn.on('click', function () {
        $copySuccess.show();
        setTimeout(function () {
            $copySuccess.hide();
        },1500);
    });
    //关闭遮罩
    closeMask();
    $list.on('click', 'a', function () {
        var $that = $(this),
            waiting = false;
        //点击下载块不执行
        if($that.hasClass('app_url')){
            return false;
        }
        //点击获取淘口令再弹窗
        if(other == 'getKtl'){
            if(waiting){
                return false;
            }
            waiting = true;
            $.ajax({
                url: "/ajax/GetKouling",
                data: 'url='+encodeURIComponent($that.data('url'))+'&img='+$that.data('img')+'&title='+$that.data('title'),
                type: "GET",
                success: function (data){
                    $that.data('tkl',data.kouling);
                    waiting = false;
                    if (isWx()){
                        var tkl = $that.data('tkl'),
                            value = '';
                        //没有淘口令
                        if (tkl == '' || typeof tkl === 'undefined') {
                            window.location.href = $that.data('url');
                            return false;
                        }
                        if(isprice == 'noPrice'){
                            value = '【' + $that.data('title') + '】复制这条信息，打开手机淘宝' + tkl;
                        }else{
                            value = '【' + $that.data('title') + '，券后' + $that.data('price') + '元包邮】复制这条信息，打开手机淘宝' + tkl;
                        }
                        //配置数据
                        $title.html(value);
                        $copyBtn.data('clipboard-text', value);
                        var clipboard = new Clipboard('#copy_kl');
                        //不支持复制
                        clipboard.on('error', function (e) {
                            $copyBtn.remove();
                            $('.mask_top').show();
                        });
                        $mask.show();
                    }else{
                        //不是微信直接跳转
                        window.location.href = $that.data('url');
                    }
                },
                error:function(){
                    waiting = false;
                    promptPop({ content: '系统繁忙,请重试'});
                }
            });
            return false;
        }
        //已经有淘口令再弹窗
        if (isWx()){
            var tkl = $that.data('tkl');
            //没有淘口令
            if (tkl == '' || typeof tkl === 'undefined') {
                window.location.href = $(this).data('url');
                return false;
            }
            var value = '【' + $that.data('title') + '，券后' + $that.data('price') + '元包邮】复制这条信息，打开手机淘宝' + tkl;
            //配置数据
            $title.html(value);
            $copyBtn.data('clipboard-text', value);
            var clipboard = new Clipboard('#copy_kl');
            //不支持复制
            clipboard.on('error', function (e) {
                $copyBtn.remove();
                $('.mask_top').show();
            });
            $mask.show();
        }else{
            //不是微信直接跳转
            window.location.href = $(this).data('url');
        }
    });
}
//设置 cookie
function setCookie(name,value){
    if(window.localStorage){
        localStorage.removeItem(name);
        localStorage.setItem(name,value);
    } else {
        var Days = 1000;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    };
    return false;
}
//获得 cookie
function getCookie(name) {
    if(window.localStorage){
        var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        arr = localStorage.getItem(name);
        return arr;
    } else {
        var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg)){
            return unescape(arr[2]);
        }else{
            return null;
        }
    };
}
/*--获取参数--*/
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|#|$)");
    var r = window.location.search.substr(1).match(reg);

    if (r != null) {
        return unescape(r[2]);
    } else {
        return null;
    }
}