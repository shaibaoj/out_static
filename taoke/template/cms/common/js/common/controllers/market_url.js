
define([ "text!common/module/"+cms_all_config.template+"/tpl/header.tpl" ], function(tpl) {
	return {
		init:function(){
			alert(tpl);
			appView.html(_.template(tpl, {
				name : 'kenko'
			}));
		}
	};
});