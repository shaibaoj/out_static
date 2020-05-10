
define(["template"
	,"text!common/module/"+cms_all_config.template+"/tpl/member.tpl"
	,"../../util/css"], function(template,tpl,css) {
	return {
		init:function(footer){
			this.query_cms(footer);
		},
		query_cms:function(footer){
			
		},
		html:function(){
			return tpl;
		}
	};
});