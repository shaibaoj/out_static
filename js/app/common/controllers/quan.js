
define(["template"
		,"common/controllers/util/header"
		,"common/controllers/util/footer"
		,"common/controllers/util/member"
		,"common/controllers/util/goods"
		,"text!common/module/"+cms_all_config.template+"/tpl/quan.tpl"
		,"../util/css"
		,"common/module/"+cms_all_config.template+"/require/quan"
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
					action:"quan",
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
//					_this.show_cms(source,result.result.map,cms_all_data,content,footer,member);
		            	_this.show_relation();
		            	if(cms_all_data.functions.goods_yun){
		            		_this.show_yun();
		            	}
				}
			});
		},
		show_relation:function(){
			var goods_relation  = $("#goods_relation");
			var cid1 = goods_relation.attr("data-cid1");
			var cid2 = goods_relation.attr("data-cid2");
			$.ajax({
				url: cms_all_config.yun_cms_url,
				data: {
					app_id:cms_all_config.app_id,
					url_sign:cms_all_config.url_sign,
					time:cms_all_config.time,
					action:"goods_relation",
					cid1:cid1,
					cid2:cid2,
					ajax:1,
					id:cms_all_data.context.arr_query.id,
					cms_host:cms_all_config.cms_host,
					documentUrl:cms_all_config.base_url,
					request_url:cms_all_config.request_url,
				},
				type: 'get',
				dataType: 'jsonp',
				jsonpCallback: "call",
				cache:true,
				success: function (result) {
					var render_data = $.extend({}, cms_all_data,result.result.map);
					var render = template.compile(goods.html());
		            	var html = render(render_data);
		            	goods_relation.html(html);
				}
			});
		},
		show_yun:function(){
			var goods_relation  = $("#goods_relation");
			var title = goods_relation.attr("data-title");
			
			 $.ajax({
				url: cms_all_config.yun_cms_url,
				data: {
					app_id:cms_all_config.app_id,
					url_sign:cms_all_config.url_sign,
					time:cms_all_config.time,
					action:"search",
					yun:1,
					ajax:1,
					num_iid:cms_all_data.context.arr_query.id,
					cms_host:cms_all_config.cms_host,
					documentUrl:cms_all_config.base_url,
					request_url:cms_all_config.request_url,
				},
				type: 'get',
				dataType: 'jsonp',
//				jsonpCallback: "call",
		        success: function (result) {
		        		var render_data = $.extend({}, cms_all_data,result.result.map);
					var render = template.compile(goods.html());
		            	var html = render(render_data);
		            	$("#goodList1").html(html);
		            	css.css(cms_all_config.config_js_url+"/common/module/"+cms_all_config.template+"/css/yun.css");
			    }
			 });
		}
	};
});