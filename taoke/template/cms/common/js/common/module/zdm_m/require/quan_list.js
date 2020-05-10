define([
		"./util/base"
		,"./util/member"
		,"text!../tpl/goods.tpl"
		,"css!../css/v2/global.css"
		,"css!../css/v2/base.css"
		,"css!../css/souquan.css"
		,"css!../css/miaoquan.css"
		,"css!../css/member.css"
	], function(base,member,goods_html) {
	return {
		isloading:true,
		client:function(){
			var _this = this;
			
			base.search();
			base.goTop();
			member.init();
			base.stat(".update_num");
			_this.show();
		},
		show:function(){
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
						url_sign:cms_all_config.url_sign,
						time:cms_all_config.time,
				        	ajax:1,
				        	ipage:pindex,
				        	action:'quan_list',
				        	cid:showBtn.attr("data-cid"),
						jiu:showBtn.attr("data-jiu"),
						sort:showBtn.attr("data-sort"),
						order_next:showBtn.attr("data-order_next"),
				        	documentUrl:cms_all_config.base_url,
				        	cid:cid,
			        },
			        type: 'get',
			        dataType: 'jsonp',
			        success: function (result) {

			            $(".loading_area").hide();

			            if (autoload) {
//			                if (pindex > pnum) {
//			                    $(".list-loading").hide();
//			                }
			            }
			            if (!result.result.map.list||result.result.map.list.length==0) {
			                $(".loading_area").hide();
			                isloading = false;
//			                $(".jx-foot").show();
			                return false;
			            }
			            
			            var render_data = $.extend({}, cms_all_data,result.result.map);
						var render = _template.compile(goods_html);
			            	var html = render(render_data);
			            
			            showBtn.attr("data-pageindex", pindex);
			            $('#' + databox).append(html);
			            base.lazyLoading($('#' + databox + " img.lazyload"));
			            isloading = true;
			        }
			    });
			}
			// 图片懒加载
			base.lazyLoading($("img.lazyload"));
			getMoreData(cms_all_config.yun_cms_url, 'goods_list', 1);

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
			
		}
	};
});