
define(["template"
	,"text!common/module/"+cms_all_config.template+"/tpl/header.tpl"
	,"../../util/css"], function(template,tpl,css) {
	return {
		init:function(footer){
			this.query_cms(footer);
//			appView.html(_.template(tpl, {
//				name : 'kenko'
//			}));
		},
		query_cms:function(footer){
			
		},
		html:function(){
			return tpl;
		},
		show_cms:function(source,cms_all_data,content,footer,member){
			var _this = this;
			if(cms_all_data.taoke_cms&&cms_all_data.taoke_cms.css){		        			
	    			css.css(cms_all_config.config_js_url+"/common/module/"+cms_all_config.template+"/css/m/"+cms_all_data.taoke_cms.css+".css");
	    		}
	        if (cms_all_data.cms) {
	            	var render = template.compile(_this.html());
	            	var html = render(cms_all_data);
	            	appView.append(html);
	        }
	        if (cms_all_data.cms&&content) {
	            	var render = template.compile(content);
	            	var html = render(cms_all_data);
	            	appView.append(html);
	        }
	        if (cms_all_data.cms&&footer) {
	            	var render = template.compile(footer.html());
	            	var html = render(cms_all_data);
	            	appView.append(html);
	        }
	        if (cms_all_data.cms&&member) {
	            	var render = template.compile(member.html());
	            	var html = render(cms_all_data);
	            	appView.append(html);
	        }
	        source.client();
		},
		show:function(source,content,footer,member,callback){
			callback = callback || $.noop;
			var _this = this;
			if(typeof(cms_all_data)=="undefined"){
				$.ajax({
					url: cms_all_config.yun_cms_url,
					data: {
						app_id:cms_all_config.app_id,
						url_sign:cms_all_config.url_sign,
						time:cms_all_config.time,
						action:"cms",
						ajax:1,
						ipage:0,
						cms_host:cms_all_config.cms_host,
						documentUrl:cms_all_config.base_url,
						request_url:cms_all_config.request_url,
					},
					type: 'get',
					dataType: 'jsonp',
					jsonpCallback: "call",
					cache:true,
					success: function (result) {
						cms_all_data = result.result.map;
						_this.show_cms(source,result.result.map,content,footer,member);
						callback();
					}
				});
			}else{				
				_this.show_cms(source,cms_all_data,content,footer,member);
				callback();
			}
		}
	};
});