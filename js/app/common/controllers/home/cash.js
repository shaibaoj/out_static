
define(["template"
		,"common/controllers/util/header"
		,"common/controllers/util/footer"
		,"common/controllers/util/member"
		,"common/controllers/util/goods"
		,"text!common/module/"+cms_all_config.template+"/tpl/home/cash.tpl"
		,"../../util/css"
		,"common/module/"+cms_all_config.template+"/require/home/cash"
	], function(template,header,footer,member,goods,tpl,css,source) {
	return {
		init:function(){
			header.init(footer.html());
			this.show();
		},
		show:function(){
			header.show(source,tpl,footer,member);
		}
	};
});