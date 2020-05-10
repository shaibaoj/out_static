define([
		"./util/base"
		,"./util/member"
		,"text!../tpl/goods.tpl"
		,"css!../css/v2/global.css"
		,"css!../css/v2/base.css"
		,"css!../css/quan_list.css"
		,"css!../css/souquan.css"
		,"css!../css/yun.css"
		,"css!../css/member.css"
	], function(base,member,goods_html) {
	return {
		isloading:true,
		client:function(){
			var _this = this;
			
			base.search();
			base.goTop();
			member.init();
			_this.init_so();
		},
		init_so:function(){
			var $listBox = $('#goods_list'), 
			waiting = false,
			isLoadMore = true,
			$load = $('#site_loading'),
			$noMoreData = $('#no_data'),
			$noList = $('#no_list'),
			$searchBox = $('#search_info'),
			$result = $('#search_result'),
			type = 1,
			page = 0;
			searchKeys = $.trim($searchBox.val());
			
			var showBtn = $("#site_loading");
		    var query_type = showBtn.attr("data-goods");

			var searchFun = {
				//滚动加载数据
				scrollLoad:function(){
					var windowH = $(window).height(),
					 	$selector = $('#selector_fixed'),
						selectorTop = $selector.offset().top,
						that = this;
					that.loadData();
					$(window).scroll(function(){
						if(isLoadMore&&$(this).scrollTop() + windowH > $(document).height() - 300){
							if(waiting){
								return false;
							}
							page++;
							that.loadData();
							base.lazyLoading($("img.lazyload"));
						}
						//设置固定
						if($(this).scrollTop() > selectorTop){
							$selector.addClass('sq_fixed');
	
						}else{
							$selector.removeClass('sq_fixed');
						}
					});
				},
				//加载数据
				loadData:function(){
					var key = '';
					if(searchKeys){
						key = $.trim(searchKeys);
					}
					
					var data_loading = $("#site_loading");
					if(cms_all_data.context.arr_query.q){
						key = decodeURIComponent(cms_all_data.context.arr_query.q);
					}
					
					$("#search_info").val(key);
					$("#search_info_span").html('"'+key+'"');
					if(waiting){
						return false;
					}
					waiting = true;
					$load.show();
					
					var goods_action = 'goods';
					var query_url = cms_all_config.yun_cms_url;
					var query_data = {
						app_id:cms_all_config.app_id,
						url_sign:cms_all_config.url_sign,
						time:cms_all_config.time,
				        	ajax:1,
				        	ipage:page,
				        	action:'search',
				        	documentUrl:cms_all_config.base_url,
				        	q:key,
			        };
					
					if(query_type=='yun'){
						goods_action = 'goods';
						query_url = cms_all_config.yun_cms_url;
						query_data = {
							app_id:cms_all_config.app_id,
							url_sign:cms_all_config.url_sign,
							time:cms_all_config.time,
					        	ajax:1,
					        	ipage:page,
					        	action:'search',
					        	yun:1,
					        	documentUrl:cms_all_config.base_url,
					        	q:key,
				        };
					}
					else if(query_type=='jd'){
						goods_action = 'product_search';
						query_url = cms_all_config.yun_cms_url;
						query_data = {
							app_id:cms_all_config.app_id,
							url_sign:cms_all_config.url_sign,
							time:cms_all_config.time,
					        	ajax:1,
					        	ipage:page,
					        	action:'search_jd',
					        	documentUrl:cms_all_config.base_url,
					        	q:key,
				        };
					}
							
					$.ajax({
			            url: query_url,
			            data: query_data,
			            type: "GET",
				        dataType: 'jsonp',
			            success: function (result){
				            	waiting = false;
				            	$load.hide();
				            	
				            	var render_data = $.extend({}, cms_all_data,result.result.map,{'goods_action':goods_action});
				            	
							var render = _template.compile(goods_html);
				            	var temHtml = render(render_data);
				            	
//				            	temHtml = result.result.map.content;
				            	//加载更多没有数据
				            	if (!result.result.map.list||result.result.map.list.length==0) {
									$noMoreData.show();
									isLoadMore = false;
									return false;
				            	}
				            	$listBox.append(temHtml);
				            	base.lazyLoading($("img.lazyload"));
			            },
			            error:function(){
			            	waiting = false;
			            	$load.hide();
			                promptPop('系统繁忙,请重试');
			            }
			        });
				},
				init:function(){
					if(typeof searchKeys != 'undefined'){
						this.scrollLoad();
					}
				}
			}
			searchFun.init();
	
			$(function () {
				$(".yd-selectMenu li").click(function () {
					$this = $(this);
					
					showBtn.attr("data-goods",$this.attr("data-goods"));
					$(".yd-selectMenu li").removeClass("curr");
					$this.addClass("curr");
					$listBox.empty();
					query_type = showBtn.attr("data-goods");
					$("#selector_fixed").removeClass("sq_fixed");
					searchFun.init();
			    });
			});
		}
	};
});