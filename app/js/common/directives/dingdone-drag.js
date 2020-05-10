"use strict";
define(function(require) {
	var app = require("app");
	require("common/services/helpPageService"), app.directive("weiYi", function($rootScope, helpPageService) {
		return {
			restrict: "A",
			link: function(scope, element, attr) {
				element.on("mousedown", function(e) {
					$rootScope.type ? scope.num = 0 : (console.log("$rootScope.type", $rootScope.type), "design" == $rootScope.currentmode ? scope.num = helpPageService.navWidth : scope.num = helpPageService.navWidth), e.preventDefault(), scope._that = $(this);
					var x = e.clientX - $(this).offset().left,
						y = e.clientY - $(this).offset().top;
					$(document).on("mousemove", function(e) {
						var clx = Math.min(Math.max(e.clientX - x, scope.num), $(window).width() - scope._that.width()),
							cly = Math.min(Math.max(e.clientY - y, 0), $(window).height() - scope._that.height());
						scope._that.css({
							left: clx,
							top: cly
						})
					}), $(document).on("mouseup", function(e) {
						$(document).off("mousemove"), $(document).off("mouseup")
					})
				}), $rootScope.$watch("currentmode", function(newval, oldval) {
					newval && oldval && "design" == newval && scope._that && "60px" == scope._that.css("left") && scope._that.css({
						left: 180
					})
				}, !0)
			}
		}
	})
});