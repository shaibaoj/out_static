"use strict";
define(function(require) {
	var app = require("app");
	require("common/directives/dingdone-drag"), require("common/services/helpPageService"), app.directive("dingdoneHelp", ["config", "http", "$rootScope", "navconfig", "helpPageService", "$state", "$q", "$timeout", function(config, http, $rootScope, navconfig, helpPageService, $state, $q, $timeout) {
		return {
			restrict: "EA",
			replace: !0,
			scope: {
				type: "="
			},
			templateUrl: "common/directives/dingdone-helper.html",
			link: function(scope, element, attrs, controller) {
				var vm = scope.vm = {};
				angular.extend(vm, {
					init: function() {
						$rootScope.type = scope.type, vm.getrouterItem($rootScope.currentState), 0 == $("head").find(".supportbox").length && $(function() {
//							$("head>link").before('<script  class="supportbox" src="//assets.kf5.com/supportbox/main.js" id="kf5-provide-supportBox" kf5-domain="dingdoneapp.kf5.com"></script>')
						})
					},
					getrouterItem: function(data) {
						helpPageService.showPage(data).then(function(datas) {
							vm.getMess(datas)
						})
					},
					openlayer: function() {
						window.KF5SupportBoxAPI.init(), window.KF5SupportBoxAPI.ready(function() {
							window.KF5SupportBoxAPI.open(function() {})
						})
					},
					href: function(view) {
						$state.go(view)
					},
					getMess: function(identification) {
						if (identification) {
							var url = config.getAPI("helper.getmess");
							http(url, {
								params: {
									tag: identification
								}
							}).then(function(data) {
								data && 0 == data.error_code && (vm.helpList = data.result.qa, vm.quesList = [], vm.linkList = [], angular.forEach(vm.helpList, function(val, index) {
									"" == val.answer ? vm.linkList.push(val) : vm.quesList.push(val)
								}))
							})
						}
					}
				}), scope.$watch(function() {
					return helpPageService.eventPage
				}, function(newval, oldval) {
					newval && vm.getMess(newval)
				}, !0), scope.$on("checkApp", function(event, first_appinfo) {
					vm.init()
				})
			}
		}
	}])
});