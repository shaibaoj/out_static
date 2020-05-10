$(".sort-mall").on('touchend', function (e) { 
    e.preventDefault();
    e.stopPropagation();
    $(".asort-wrap,.asort-mall").show().addClass('show');
});
$(".sort-cate").on('touchend', function (e) { 
    e.preventDefault();
    e.stopPropagation();
    $(".asort-wrap,.asort-cat").show().addClass('show');
    if ($(".popbox").length) {
        $('popbox').remove();
    }
});
$(".asort-close").on('touchend', function (e) {  
    e.preventDefault();
    $(".asort-wrap").removeClass('show');
    setTimeout(function () {
        $(".asort").removeClass('show');
        $(".asort-wrap").hide();
    }, 300);
});

// 选择分类
$(".ct-wrap li a").on('click', function (e) {    
    e.preventDefault();
    e.stopPropagation();
    $(this).parents('li').addClass("a-selected").siblings().removeClass("a-selected");

    $(".asort-wrap").removeClass('show');
    var href = location.origin + $(this).attr('href');
    lodingPop();
    setTimeout(function () {
        location.href = href;
        $(".asort").removeClass('show');
    }, 300);
});

// 首页swiper
//var mySwiper = new Swiper('.swiper-container', {
//    pagination: '.pagination',
//    loop: true,
//    grabCursor: true,
//    paginationClickable: true,
//    autoplay: 5000,
//    autoplayDisableOnInteraction: true
//})
// 图片懒加载
lazyLoading($("img.lazyload"));

// 添加到主屏
/*
if (!getCookie("desktop")) {

    var version = ($.os.version && $.os.version.substr(0, 3) > 4.1 ? 'new' : 'old');
    if ($.os.version && $.os.version.substr(0, 3) >= 7.0) {
        version = 'iOS7';
    }
    if ($.browser.safari && $.os.iphone && !($.browser.uc || $.browser.qq || $.browser.qh || $.browser.chrome || $.browser.firefox)) { 
        var addDesktop = $('<div></div>').addClass('ui-add2desktop').appendTo('body');
        addDesktop.html('<img src="/content/img/icon-152.png"/><p>先点击<span class="ui-add2desktop-icon-' + version + '"></span>，<br />再"添加到主屏幕"</p><span class="ui-add2desktop-close"><b></b></span><div class="ui-add2desktop-arrow"><b></b></div>');
    }
}
$(".ui-add2desktop-close").on("click", function () {
    $(".ui-add2desktop").remove();
    setCookie("desktop", "1", 60);
});
*/
//alert(navigator.userAgent);
var b = $.browser.safari && $.os.iphone && !($.browser.uc || $.browser.qq || $.browser.qh || $.browser.chrome || $.browser.firefox);
//alert(b);


