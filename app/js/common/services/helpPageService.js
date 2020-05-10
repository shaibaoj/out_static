"use strict";
define(function(require) {
	var app = require("app");
	app.factory("helpPageService", ["$q", "navconfig", function($q, navconfig) {
		var services = {};
		return angular.extend(services, {
			pageNameConfig: {
				"loginLayout.userlogin": "login",
				"dingdone://detail": "browser",
				"modalMarketLayout.appmarket": "makeApp",
				"resolveplan.modulemarketlist": "appTemplate",
				"sharetplLayout.tplShare": "pageShare",
				"pageDesignLayout.pagesetting": "pageConfig",
				"mainLayout.normalshoporderlist": "orderManage"
			},
			eventPage: null,
			navWidth: "",
			showPage: function(data) {
				var defer = $q.defer();
				return navconfig.breadcrumb[data] ? navconfig.breadcrumb[data].pageNameConfig && defer.resolve(navconfig.breadcrumb[data].pageNameConfig) : angular.forEach(this.pageNameConfig, function(val, index) {
					data === index && defer.resolve(val)
				}), defer.promise
			}
		}), services
	}])
});