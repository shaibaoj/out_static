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
//    if (!isLogin()) { loginShow(); return false; }
    
//    var data;
//    $.ajax({
//        type: "POST",
//        url: "/ajax/userSignIn_new",
//        data: data,
//        cache: false,
//        success: function (data) {
//            if (data.error == 0) {
//
//                $(".start_sign").html("您已连续签到" + data.result.num + "天");
//                $(".nosign_box").hide();
//                $(".oksign_box").show();
//
//                shopResult({ msg: "签到成功", point: data.result.jifen});
//
//            }
//            else if (data=="login") {
//                loginShow(); return false;
//            } 
//            else {
//                $(".nosign_box").show();
//                $(".oksign_box").hide();
//            }
//        }
//    });
    
    $.getJSON(cms_all_config.login_url, {
	   app_id:cms_all_config.app_id,
	   u_id:cms_all_config.u_id,
	   url_sign:cms_all_config.url_sign,
	   time:cms_all_config.time,
	   action:'input_checkin',
   }, function(data){
	   if(data.result.map.status == 1){
		   $(".nosign_box").hide();
           $(".oksign_box").show();
           shopResult({ msg: "签到成功", point: data.result.jifen});
	   }else{
		   loginShow(); return false;
		   $(".nosign_box").show();
           $(".oksign_box").hide();
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

var isloading = true,
    $types = $('#mq_types ');

var query_type = $(".show-more-btn").attr("data-goods");
var typeListTop = $types.offset().top;
$(window).scroll(function () {
    var t = $(window).scrollTop();
    var h = $("body").height();
    var i = $(window).height();

    if (t > h - i * 1.4) {
        getMoreData(cms_all_config.yun_cms_url, 'content-item', 1);
    }
    if(t <= typeListTop){
        $types.removeClass('mq_fixed');
    }else{
        $types.addClass('mq_fixed');
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
    var time = showBtn.attr("data-time");
    var f = showBtn.attr("data-f");
    var t = showBtn.attr("data-t");
    var s = showBtn.attr("data-s");
    var jiu = showBtn.attr("data-jiu");
    var cid = showBtn.attr("data-cid");
    
//    if (time == "") {
//           $(".jx-foot").show();
//            return false;
//    }
    
    if (!isloading) {
        return false;
    }
    isloading = false;
    $(".load-more").show();
    
    var query_url = cms_all_config.yun_cms_url;
	var query_data = {
    	app_id:cms_all_config.app_id,
    	ajax:1,
    	ipage:pindex,
    	action:'product_list',
    	documentUrl:cms_all_config.base_url,
//    	q:key,
    };
	databox = 'ulmain';
	
	if(query_type=='taobao'){
		query_url = cms_all_config.yun_cms_url;
		query_data = {
			app_id:cms_all_config.app_id,
	        	ajax:1,
	        	ipage:pindex,
	        	documentUrl:cms_all_config.base_url,
	        	jiu:jiu,
	        	cid:cid,
        };
		databox = 'content-item';
	}
	else if(query_type=='mall'){
		query_url = cms_all_config.yun_cms_url;
		query_data = {
			app_id:cms_all_config.app_id,
	        	ajax:1,
	        	ipage:pindex,
	        	action:'product_list',
	        	documentUrl:cms_all_config.base_url,
        };
		databox = 'ulmain';
	}
    
    $.ajax({
        url: query_url,
        data: query_data,
        type: 'get',
        dataType: 'jsonp',
        success: function (result) {
//            $boxes = $(data.result.map.content);

            $(".load-more").hide();

            if (autoload) {
//                if (pindex > pnum) {
//                    $(".list-loading").hide();
//                }
            }

            if (result.result.map.content == "") {
                $(".list-loading").hide();
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
getMoreData(cms_all_config.yun_cms_url, 'content-item', 1);

// 显示返回顶部
goTop();

$(function () {
	$(".i_brand_name a").click(function () {
		$this = $(this);
		var showBtn = $(".show-more-btn");
		
		showBtn.attr("data-goods",$this.attr("data-goods"));
		showBtn.attr("data-pageindex", 0);
		$(".i_brand_name a").removeClass("active");
		$this.addClass("active");
		
		$("#content-item,#ulmain").empty();
		
		$types.removeClass('mq_fixed');
		isloading = true;
		query_type = $(".show-more-btn").attr("data-goods");
        getMoreData(cms_all_config.yun_cms_url, 'content-item', 1);
		
    });
});

//滑动块
!function(){
	function addList($el,num){
        var endHtml = '',
            firstHtml = '';
        for(var i = num;i > 0;i--){
            endHtml += '<li>'+$el.find('li').eq(len -i).html()+'</li>';
        }
        for(var i = 0;i < num;i++){
            firstHtml += '<li>'+$el.find('li').eq(i).html()+'</li>';
        }
        $el.prepend(endHtml);
        $el.append(firstHtml);
    }
    
    var page = 0,
        num = 5,
        $slide = $(".r_content"),
        $banner = $slide.find('.r_content_list').eq(0),
        $banner1 = $slide.find('.r_content_list').eq(1),
        slideWidth = $slide.width() + 19,
        len = $banner.find("li").length,
    pageCount = Math.ceil(len / num); 
    /* 填充列表 */
    addList($banner.find('ul'),num);
    addList($banner1.find('ul'),num);
    $banner.css({left:-slideWidth});
    $banner1.css({left:-slideWidth});
    //向右 按钮
    $(".ranking_area .arrow_next").click(function () { 
        if (!$banner.is(":animated")) {   
            if (page == pageCount) {
                $banner.css({left:0});
                $banner.animate({ left: -slideWidth }, "slow"); 
                page = 1;
            } else {
                $banner.animate({ left: '-=' + slideWidth }, "slow");
                page++;
            }
        }

    });
    //向左 按钮
    $(".ranking_area .arrow_prev").click(function () {
        if (!$banner.is(":animated")) { 
            if (page == 1) { 
                $banner.css({left:-slideWidth * (pageCount + 1)});
                $banner.animate({ left:-slideWidth * pageCount }, "slow");
                page = pageCount;
            } else {
                $banner.animate({ left: '+=' + slideWidth }, "slow");
                page--;
            }
        }
    });
    var $mqHit = $('#miaoquan_hit'),
        $tjHit = $('#tj_hit');
    //选择排行榜
    var mqPage = 1,
        tjPage = 1;
    $('.ranking_select_box').on('click','a',function(){
        var $that = $(this);
        if($that.hasClass('active')){
            return false;
        }
        $that.addClass('active').siblings().removeClass('active');
        // 选择喵券排行榜
        if($(this).data('type') == 1){
            tjPage = page;
            page = mqPage;
            $mqHit.fadeIn(300);
            $tjHit.fadeOut(300);
            $banner = $slide.find('.r_content_list').eq(0);
            len = $banner.find("li").length - num*2;
            pageCount = Math.ceil(len / num);
        }else{
            mqPage = page;
            page = tjPage;
            $mqHit.fadeOut(300);
            $tjHit.fadeIn(300);
            $banner = $slide.find('.r_content_list').eq(1);
            len = $banner.find("li").length - num*2;
            pageCount = Math.ceil(len / num);
        }
    });
    
    
}();
// 搜索
function searchKey(_this) {
    var txt_value = $.trim(_this.find($(":input[type=text]")).val());
    var value = _this.find($(":input[type=text]")).attr("lang");
    if ((txt_value == value)||txt_value=="") {
        _this.find($(":input[type=text]")).focus();
        return false;
    }
    var action_url = "/search/?s=" + escape(txt_value);
    _this.attr("action", action_url);
}

$(function(){
	
	
	$.ajax({
        url: cms_all_config.yun_cms_url,
        data: {
        	action:"quan_faxian_list",
        	app_id:cms_all_config.app_id,
        	ajax:1,
        	ipage:0,
        	documentUrl:cms_all_config.base_url,
        },
        type: 'get',
        dataType: 'jsonp',
        success: function (result) {
            if (result.result.map.content == "") {
                return false;
            }else{
                $('#miaoquan_hit>ul').empty().append(result.result.map.content);
                lazyLoading($('#miaoquan_hit>ul img.lazyload'));
                $('.ranking_area_wrap').show();
//                
            }
        }
    });
	
	try{
		
		$.getJSON(cms_config.login_url, {
			app_id:cms_config.app_id,
			url_sign:cms_config.url_sign,
			time:cms_config.time,
			action:'checkin',
			'base_url':cms_config.base_url,
			'cms_host':cms_config.cms_host,
		}, function(data){
			if(data!== undefined && data.result!==undefined){
				data = data.result.map; 
			}
			if(data.user_cms_user_checkin&&data.user_cms_user_checkin.id&&data.user_cms_user_checkin.id!=''){
				$(".nosign_box").hide();
				$(".oksign_box").show();
			}
		});
	}catch(e){
		
	}
})

