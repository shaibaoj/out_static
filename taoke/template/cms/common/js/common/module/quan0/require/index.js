define([
		"./util/base"
		,"./util/member"
		,"text!../tpl/goods.tpl"
		,"css!../css/v2/global.css"
		,"css!../css/v2/base.css"
		,"css!../css/v2/home.css"
		,"css!../css/member.css"
	], function(base,member,goods_html) {
	return {
		isloading:true,
		client:function(){
			var _this = this;
			$(".sign_btn").click(function () {
				_this.signIn();
		    });
			
		    $types = $('#mq_types ');

			var query_type = $(".show-more-btn").attr("data-goods");
			var typeListTop = $types.offset().top;
			$(window).scroll(function () {
			    var t = $(window).scrollTop();
			    var h = $("body").height();
			    var i = $(window).height();
	
			    if (t > h - i * 1.4) {
			        _this.getMoreData(cms_all_config.yun_cms_url, 'content-item', 1,query_type);
			    }
			    if(t <= typeListTop){
			        $types.removeClass('mq_fixed');
			    }else{
			        $types.addClass('mq_fixed');
			    }
			    
			});
			
			base.search();
			base.goTop();
			
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
		        _this.getMoreData(cms_all_config.yun_cms_url, 'content-item', 1,query_type);
				
		    });
			_this.getMoreData(cms_all_config.yun_cms_url, 'content-item', 1,query_type);
			
			$.ajax({
		        url: cms_all_config.yun_cms_url,
		        data: {
		        		action:"quan_faxian_list",
		        		app_id:cms_all_config.app_id,
				    url_sign:cms_all_config.url_sign,
				    time:cms_all_config.time,
			        	ajax:1,
			        	ipage:0,
			        	documentUrl:cms_all_config.base_url,
		        },
		        type: 'get',
		        dataType: 'jsonp',
		        success: function (result) {
		            if (!result.result.map.list||result.result.map.list.length==0) {
		                return false;
		            }else{
		            		var render_data = $.extend({}, cms_all_data,result.result.map,{goods_action:'goods_faxian'});
		            	
						var render = _template.compile(goods_html);
			            	var temHtml = render(render_data);
			            	
		                $('#miaoquan_hit>ul').empty().append(temHtml);
		                base.lazyLoading($('#miaoquan_hit>ul img.lazyload'));
		                $('.ranking_area_wrap').show();
                			_this.sliderBaner();
		            }
		        }
		    });
			member.init();
			base.stat(".update_num");
			base.checkin();
		},
		signIn:function(){
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
		           base.shopResult({ msg: "签到成功", point: data.result.jifen});
			   }else{
				   base.loginShow(); return false;
				   $(".nosign_box").show();
		           $(".oksign_box").hide();
			   }
		   });
		},
		sliderBaner:function(){

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

		},
		getMoreData:function(dataurl, databox, autoload,query_type){
			var _this = this;

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
		    
//		    if (time == "") {
//		           $(".jx-foot").show();
//		            return false;
//		    }
		    
		    if (!_this.isloading) {
		        return false;
		    }
		    _this.isloading = false;
		    $(".load-more").show();
		    
		    var goods_action = 'goods';
		    var query_url = cms_all_config.yun_cms_url;
			var query_data = {
				app_id:cms_all_config.app_id,
			    url_sign:cms_all_config.url_sign,
			    time:cms_all_config.time,
			    	ajax:1,
			    	ipage:pindex,
			    	action:'product_list',
			    	documentUrl:cms_all_config.base_url,
//		    	q:key,
		    };
			databox = 'ulmain';
			
			if(query_type=='taobao'){
				goods_action = 'index';
				query_url = cms_all_config.yun_cms_url;
				query_data = {
					app_id:cms_all_config.app_id,
				    url_sign:cms_all_config.url_sign,
				    time:cms_all_config.time,
			        	ajax:1,
			        	ipage:pindex,
			        	action:'quan_list',
			        	documentUrl:cms_all_config.base_url,
			        	jiu:jiu,
			        	cid:cid,
		        };
				databox = 'content-item';
			}
			else if(query_type=='mall'){
				goods_action = 'product_search';
				query_url = cms_all_config.yun_cms_url;
				query_data = {
					app_id:cms_all_config.app_id,
				    url_sign:cms_all_config.url_sign,
				    time:cms_all_config.time,
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
//		            $boxes = $(data.result.map.content);

		            $(".load-more").hide();

		            if (autoload) {
//		                if (pindex > pnum) {
//		                    $(".list-loading").hide();
//		                }
		            }

		            if (!result.result.map.list||result.result.map.list.length==0) {
		                $(".list-loading").hide();
		                isloading = false;
//		                $(".jx-foot").show();
		                return false;
		            }
		            
		        		var render_data = $.extend({}, cms_all_data,result.result.map,{'goods_action':goods_action});
					var render = _template.compile(goods_html);
		            	var temHtml = render(render_data);
		            
		            showBtn.attr("data-pageindex", pindex);
		            $('#' + databox).append(temHtml);
		            base.lazyLoading($('#' + databox + " img.lazyload"));
		            _this.isloading = true;
		        }
		    });

		},
	};
});