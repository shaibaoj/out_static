
define(["template"
		,"common/controllers/util/header"
		,"common/controllers/util/footer"
		,"common/controllers/util/member"
		,"common/controllers/util/goods"
		,"text!common/module/"+cms_all_config.template+"/tpl/product.tpl"
		,"../util/css"
		,"common/module/"+cms_all_config.template+"/require/product"
	], function(template,header,footer,member,goods,tpl,css,source) {
	return {
		init:function(){
			header.init(footer.html());
			this.show();
		},
		show:function(){
			var _this = this;
			var content_loading = "<div id='content_loading'></div>";
			header.show(source,content_loading,footer,member,function(){
				_this.show_goods();
			});
		},
		show_goods:function(){
			var _this = this;
			$.ajax({
				url: cms_all_config.yun_cms_url,
				data: {
					app_id:cms_all_config.app_id,
					url_sign:cms_all_config.url_sign,
					time:cms_all_config.time,
					action:"product",
					ajax:1,
					id:cms_all_data.context.arr_query.id,
					cms_host:cms_all_config.cms_host,
					documentUrl:cms_all_config.base_url,
					request_url:cms_all_config.request_url,
				},
				type: 'get',
				dataType: 'jsonp',
				success: function (result) {
					var render_data = $.extend({}, cms_all_data,result.result.map);
					var render = template.compile(tpl);
		            	var html = render(render_data);
		            	$("#content_loading").html(html);
				}
			});
		},
	};
});