"use strict";
define(function(require) {
	var app = require("app");
	app.directive("cannotVisit", ["config", function(config) {
		return {
			restrict: "EA",
			scope: {
				isshow: "="
			},
			replace: !0,
			templateUrl: "common/directives/cannot-visit.html",
			link: function(scope) {
				scope.text = "无权限访问！"
			}
		}
	}])
});