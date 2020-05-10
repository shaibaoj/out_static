
// 显示返回顶部
goTop();

//var eTop = $(".zhi_tit").position().top - 120 - 35;
var eTop = $(".zhi_tit").offset().top - 120 - 35;
var sideTop = 0;
if ($(".zhi_type_grid").length == 0 && $(".main_side").length) {
    sideTop = $(".main_side").offset().top + $(".main_side").height();
}
var tmp = true;
// 首页左侧筛选导航
$(window).scroll(function () {
    var winTop = $(window).scrollTop();
    if (winTop >= eTop) {
        $(".side_nav").addClass("fixed_nav");
    } else {
        $(".side_nav").removeClass("fixed_nav");
    }

    if (winTop > 1500) {
        $(".side_nav .nav_list").slideUp(1);
    } else {
        $(".side_nav .current .nav_list").slideDown(1);
    }

    if (winTop >= 150) {
        $(".top_nav").css({ "top": "0" });
    } else {
        $(".top_nav").css({ "top": "-50px" });
    }

    var hot_height = $(".tj_hot").height();

    if($(".zhi_type_grid").length==0){
        if (winTop > sideTop) {

            $(".tj_hot").addClass("pfixed");
            if (tmp) {
                $(".tj_hot").css("top", -(hot_height)+"px");
                tmp = false;
            }
            $(".tj_hot").animate({ top: '55px' });

        } else {

            $(".tj_hot").removeClass("pfixed");
            if (!tmp) {
                $(".tj_hot").css("top", "0px");
                $(".tj_hot").animate({ top: '0px' }).stop(true, true);
                tmp = true;
            }

        }
    }


});

$(".side_nav .current").hover(function () {
    $(this).find(".nav_list").slideDown();
});

$(".side_nav .mall_list").hover(function () {
    $(".side_nav .mall_box").show();
}, function () {
    $(".side_nav .mall_box").hide();
});


// 热门推荐固定浮动


/*
// 换新装了
if (!$.cookie('huim')) {
    $.cookie('hiuser', 'true', { path: "/", expires: 72, domain: _domain }); // 记录是否来过网站
    var _popHtml = '<div id="revision_pop" class="ui_popbox" onclick="closeRevisionPop();">' +
                        '<a class="popbox_close" href="javascript:closeRevisionPop();" title="关闭">x</a>' +
                        '<div class="popbox_content revision_pop_cot">'+
                            '<a class="open_revision" href="/zhuanti/shengji?f=pop"></a>' +
                        '</div>'+
                    '</div>'+
                    '<div id="ui_layoutbg" class="revision_bg" style="display:block;opacity:0.5;filter:alpha(opacity=50);"></div>';
   //$('body').append(_popHtml);
}
function closeRevisionPop() {
    $.cookie('huim', 'true', { path: "/", expires: 3000, domain: _domain });
    $('#revision_pop').remove();
    $(".revision_bg").remove();
}
*/

//双12红包
/*if (!$.cookie('38nwj')) {
    //if(new Date("2016/12/13 00:00").getTime() - new Date().getTime() > 0){
    var _popHtml = '<div id="hb_pop" class="ui_popbox" style="background:url(https://i.huim.com/zhuanti/nvwangjie/nwhb_pop.png?v=20170107) no-repeat;">' +
                    '<a class="popbox_close" href="javascript:closehbPop();" title="关闭">x</a>' +
                    '<a class="hb_enter" href="https://s.click.taobao.com/GMmQR2x" target="_blank"></a>' +
                '</div>' +
                '<div id="ui_layoutbg" style="display:block;opacity:0.7;filter:alpha(opacity=70);"></div>';
    $('body').append(_popHtml);
}

function closehbPop() {
    $.cookie('38nwj', 'true', { path: "/", expires: 3000, domain: _domain });
    //$.cookie('superday', 'true');
    $('#hb_pop').remove();
    $('#ui_layoutbg').remove();
}*/

// 扫一扫红码领红包
if (!$.cookie('redqrcode') && $.cookie('hiuser')) {
    var _popHtml = '<div class="side_redqcode"><a href="http://www.huim.com/push" target="_blank"><img src="https://i.huim.com/zhuanti/1212/side_redqcode.png" alt=""/></a><a class="close_btn" href="javascript:closeQrcode();"></a></div>';
    //$('#today_zhi').append(_popHtml); 618这几天换大幅版
}

function closeQrcode() {
    $.cookie('redqrcode', 'true', { path: "/", expires: 3000, domain: _domain });
    $('.side_redqcode').remove();
}


// 首页页脚二维码
//if (!$.cookie('footqrcode')) {
//    $('body').append('<div class="foot_qrcode"><div class="qrcode_cot grid_auto"><a class="qrcode_close" href="javascript:closeQrcodePop();"></a><a class="qrcode_btn" target="_blank" href="/push"></a></div><div class="qrcode_bg"></div></div>');  
//}

//function closeQrcodePop() {
//    $.cookie('footqrcode', 'true', { path: "/", expires: 3000, domain: _domain });
//    $('.foot_qrcode').remove();
//}

// 签到达人榜单
$(".daren_sign,.sign_rank").hover(function () {
    $(".oksign_box .sign_rank").show();
}, function () {
    $(".oksign_box .sign_rank").hide();
});

// 签到达人榜单
$(".nosign_box .sign_inner").hover(function () {
    $(".start_sign .qrcode_box").show();
}, function () {
    $(".start_sign .qrcode_box").hide();
});

//用户签到
function signIn() {
    if (!isLogin()) { loginShow(); return false; }
    
    var data;
    $.ajax({
        type: "POST",
        url: "/ajax/userSignIn_new",
        data: data,
        cache: false,
        success: function (data) {
            if (data.error == 0) {

                $(".start_sign").html("您已连续签到" + data.result.num + "天");
                $(".nosign_box").hide();
                $(".oksign_box").show();

                shopResult({ msg: "签到成功", point: data.result.jifen});

            }
            else if (data=="login") {
                loginShow(); return false;
            } 
            else {
                $(".nosign_box").show();
                $(".oksign_box").hide();
            }
        }
    });
}

// 首页幻灯片
var sliderBaner = function () {
    if ($(".banner li").size() == 1) $(".banner li").eq(0).css("opacity", "1");
    if ($(".banner li").size() <= 1) return;
    var i = 0, max = $(".banner li").size() - 1, playTimer;

    $(".banner li").each(function () {
        $(".adtype").append('<a></a>');
    });

    //初始化
    $(".adtype a").eq(0).addClass("current");
    $(".banner li").eq(0).css({ "z-index": "2", "opacity": "1" });
    var playshow = function () {
        $(".adtype a").removeClass("current").eq(i).addClass("current");
        $(".slider .banner li").eq(i).css("z-index", "2").fadeTo(500, 1, function () {
            $(".slider .banner li").eq(i).siblings("li").css({
                "z-index": 0,
                opacity: 0
            }).end().css("z-index", 1);
        });
    }

    var next = function () {
        i = i >= max ? 0 : i + 1;
        playshow()
    }
    var prev = function () {
        i = i <= 0 ? max : i - 1;
        playshow()
    }
    var play = setInterval(next, 5000);
    $(".banner li a,.banner_arrow").hover(function () {
        clearInterval(play);
        $(".banner_arrow").css("display", "block");
    }, function () {
        clearInterval(play);
        play = setInterval(next, 5000);
        $(".banner_arrow").css("display", "none");
    });

    $(".banner_arrow .arrow_prev").click(function () { prev(); });
    $(".banner_arrow .arrow_next").click(function () { next(); });

    $(".adtype a").mouseover(function () {
        if ($(this).hasClass("current")) return;
        var index = $(this).index() - 1;
        var playTimer = setTimeout(function () {
            clearInterval(play);
            i = index;
            next();
        }, 500)
    }).mouseout(function () {
        clearTimeout(playTimer);
    });
}
sliderBaner();

// 切换模式
function setStyle(v) {    
    // 点击后
    if ($("#showtype_pop").length==1) {
        closeShowTypePop();
    }

    $.ajax({
        type: "POST",
        url: "/ajax/setUserStyle",
        data: { flag: v },
        cache: false,
        success: function (result) {
            location = location;
        }
    });
}

// 首页自动加载最新数据
function getNewPush() {
    $.ajax({
                url: "http://api.liuzhuni.com/ajax/getNewContent?jsonpcallback",
        type: 'Get',
        dataType: 'jsonp',
        jsonp: "jsonpcallback",
        success: function (data) {
            jsonpcallback(data);
           setTimeout(getNewPush, 60000);
        }
    });
}
//setTimeout(getNewPush,60000);

//无缝轮播 模式为31231
var page = 1,
    num = 1,
    $banner = $('#banner_list2'),
    $slide = $("#banner_list2").find('li').eq(0),
    slideWidth = $slide.width(),
    $arrowBox = $('.tm_banner_arrow');
//填充2个li
$banner.prepend($("#banner_list2").find('li').last().clone());
$banner.append($slide.clone());
$banner.css({left:-280});
var len = $banner.find('li').length,
    $currentPageBox = $('#current_page'),
    $bannerBox = $('.top_banner'),
    pageCount = Math.ceil(len / num);
$('#count_page').html(len-2);
//向后 按钮
$arrowBox.find('.arrow_next').click(function () { 
    turnRight();
});
//往前 按钮
$arrowBox.find('.arrow_prev').click(function () {
    if (!$banner.is(":animated")) { 
        if (page == 1) {
            $banner.css({left:-slideWidth * (pageCount - 1)});
            $banner.animate({ left:-slideWidth * (pageCount - 2) }, "slow");
            page = pageCount-2;
        } else {
            $banner.animate({ left: '+=' + slideWidth }, "slow");
            page--;
        }
        $currentPageBox.html(page);
    }
});
//向后函数
function turnRight(){
    if (!$banner.is(":animated")) {   
        if (page == pageCount-2) {
            $banner.css({left:0});
            $banner.animate({ left: -slideWidth }, "slow"); 
            page = 1;
        } else {
            $banner.animate({ left: '-=' + slideWidth }, "slow");
            page++;
        }
        $currentPageBox.html(page);
    }
}
if(len > 3){
    var inite = setInterval(turnRight,3000);
    $bannerBox.hover(function(){
        $arrowBox.show();
        clearInterval(inite);
    },function(){
        $arrowBox.hide();
        inite = setInterval(turnRight,3000);
    });
}

