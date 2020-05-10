"use strict";
define(['underscore'], function(_) {
	return {
		init:function(){
			if(!cms_all_config.action||cms_all_config.action=='index'){
				require(['common/controllers/index'], function(controller) {
			    		controller.init();
			    });
			}
			else if(cms_all_config.action=='home'){
				if(!cms_all_config.to_page){					
					require(['common/controllers/home/index'], function(controller) {
						controller.init();
					});
				}else{
					require(['common/controllers/home/'+cms_all_config.to_page], function(controller) {
						controller.init();
					});
				}
			}
			else{
				require(['common/controllers/'+cms_all_config.action], function(controller) {
			    		controller.init();
			    });
			}
		}
	};
});