
define(["template","text!common/module/"+cms_all_config.template+"/tpl/goods.tpl","../../util/css"], function(template,tpl,css) {
	return {
		init:function(){
			this.query_cms();
		},
		query_cms:function(){
			
		},
		html:function(){
			return tpl;
		}
	};
});