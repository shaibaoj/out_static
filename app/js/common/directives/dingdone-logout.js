"use strict";
define(function(require) {
	var app = require("app");
	require("common/services/modelService"), require("appmake/services/appMakeService"), app.directive("dingdoneLogout", function(utils) {
		return {
			restrict: "EA",
			templateUrl: "common/directives/dingdone-exit.html",
			replace: !0,
			controller: function($scope) {
				$scope.openExitModel = function() {
					utils.mdDialog({
						templateUrl: "common/directives/dingdone-logout.html",
						controller: "ExitModalCtrl"
					})
				}
			}
		}
	}).controller("ExitModalCtrl", ["$rootScope", "$scope", "$state", "$mdDialog", "config", "navconfig", "http", "appMakeService", "modelService", function($rootScope, $scope, $state, $mdDialog, config, navconfig, http, appMakeService, modelService) {
		var vm = $scope.vm = {};
		angular.extend(vm, {
			cancel: function() {
				$mdDialog.cancel()
			},
			exit: function() {
				$mdDialog.cancel(), this.logout()
			},
			logout: function() {
				var _this = this,
					url = config.getAdminAPI("logout");
				http(url, {
					method: "post"
				}).then(function(data) {
					data.error || (_this.reset(), $state.go("loginLayout.userlogin"))
				})["catch"](function() {
					$state.go("loginLayout.userlogin")
				})
			},
			reset: function() {
				$rootScope.resetAPPandUserInfo()
			}
		}), $scope.$on("checkUserError", function() {
			console.log("checkUserError", "reset"), vm.reset()
		})
	}])
});