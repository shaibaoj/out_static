
define(["template"
		,"common/controllers/util/header"
		,"common/controllers/util/footer"
		,"common/controllers/util/member"
		,"common/controllers/util/goods"
		,"text!common/module/"+cms_all_config.template+"/tpl/search.tpl"
		,"../util/css"
		,"common/module/"+cms_all_config.template+"/require/search"
	], function(template,header,footer,member,goods,tpl,css,source) {
	return {
		init:function(){
			header.init(footer.html());
			this.show();
		},
		show:function(){
			var _this = this;
//			var content_loading = "<div id='content_loading'></div>";
			header.show(source,tpl,footer,member,function(){
				_this.show_goods();
			});
		},
		show_goods:function(){
			var _this = this;
//			var data_loading = $("#site_loading");
//			$.ajax({
//				url: cms_all_config.yun_cms_url,
//				data: {
//					app_id:cms_all_config.app_id,
//					url_sign:cms_all_config.url_sign,
//					time:cms_all_config.time,
//					action:"quan_list",
//					cid:data_loading.attr("data-cid"),
//					jiu:data_loading.attr("data-jiu"),
//					sort:data_loading.attr("data-sort"),
//					order_next:data_loading.attr("data-order_next"),
//					ajax:1,
//					id:cms_all_data.context.arr_query.id,
//					cms_host:cms_all_config.cms_host,
//					documentUrl:cms_all_config.base_url,
//					request_url:cms_all_config.request_url,
//				},
//				type: 'get',
//				dataType: 'jsonp',
//				success: function (result) {
//					var render_data = $.extend({}, cms_all_data,result.result.map);
//					var render = template.compile(goods.html());
//		            	var html = render(render_data);
//		            	$("#goods_list").append(html);
//				}
//			});
		},
	};
});