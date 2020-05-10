// 选择对应的分享
var param = location.search.toLowerCase();
var path = location.pathname.toLowerCase();
var leimu = $(".miaoquan_leimu li");
if (path.indexOf("miaoquan/") > 0) {
    for (var i = 0; i < leimu.length; i++) {
        var f = leimu.eq(i).find("a").attr("href").split(location.pathname.toLowerCase())[1];
        if (f == param) {
            leimu.eq(i).addClass("current").siblings().removeClass("current");
        } else if (f == "") {
            leimu.eq(0).addClass("current").siblings().removeClass("current");
        }
    }
}

var isloading = true;
$(window).scroll(function () {
    var t = $(window).scrollTop();
    var h = $("body").height();
    var i = $(window).height();

    if (t > h - i * 1.2) {
        getMoreData(cms_all_config.yun_cms_url, 'goods_list', 1);
    }

});

// 加载更多数据
// dataurl： 请求数据对应的地址
// databox : 反回数据后装载到对应的容器
// autoload : 是否自动加载 1为是，0为否
function getMoreData(dataurl, databox, autoload) {
    if (autoload == "undefined") {
        autoload = 0;
    };
    var showBtn = $(".show-more-btn");
    var pnum = Number(showBtn.attr("data-pagenum"));
    var pindex = Number(showBtn.attr("data-pageindex")) + 1;
    var f = showBtn.attr("data-f");
    var t = showBtn.attr("data-t");
    var s = showBtn.attr("data-s");
    var jiu = showBtn.attr("data-jiu");
    var cid = showBtn.attr("data-cid");
        
    if (!isloading) {
        return false;
    }
    isloading = false;
    $(".loading_area").show();
    $.ajax({
        url: dataurl,
        data: {
        	app_id:cms_all_config.app_id,
        	ajax:1,
        	ipage:pindex,
        	action:'quan_list',
        	documentUrl:cms_all_config.base_url,
        	cid:cid,
        },
        type: 'get',
        dataType: 'jsonp',
        success: function (result) {

            $(".loading_area").hide();

            if (autoload) {
//                if (pindex > pnum) {
//                    $(".list-loading").hide();
//                }
            }
            if (result.result.map.content == "") {
                $(".loading_area").hide();
                isloading = false;
//                $(".jx-foot").show();
                return false;
            }
            
            showBtn.attr("data-pageindex", pindex);
            $('#' + databox).append(result.result.map.content);
            lazyLoading($('#' + databox + " img.lazyload"));
            isloading = true;
        }
    });
}
// 图片懒加载
lazyLoading($("img.lazyload"));
getMoreData(cms_all_config.yun_cms_url, 'goods_list', 1);

// 显示返回顶部
goTop();

//滑动块
var page = 1,
    num = 5,
    $banner = $("div.r_content_list"),
    $slide = $("div.r_content"),
    slideWidth = $slide.width()+15,
    len = $banner.find("li").length,
    pageCount = Math.ceil(len / num); 
//向后 按钮
$(".arrow_next").click(function () { 
    if (!$banner.is(":animated")) {   
        if (page == pageCount) {
            $banner.animate({ left: '0px' }, "slow"); 
            page = 1;
        } else {
            $banner.animate({ left: '-=' + slideWidth }, "slow");
            page++;
        }
    }

});
//往前 按钮
$(".arrow_prev").click(function () {
    if (!$banner.is(":animated")) { 
        if (page == 1) { 
            $banner.animate({ left: '-=' + slideWidth * (pageCount - 1) }, "slow");
            page = pageCount;
        } else {
            $banner.animate({ left: '+=' + slideWidth }, "slow");
            page--;
        }
    }
});
