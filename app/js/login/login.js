"use strict";
define(function(require) {
	var app = require("app");
	require("common/services/server");
//	require("common/directives/dingdone-helper"), 
	require("login/modal/weCodeModal"), require("common/services/sycUC"), app.controller("LoginCtrl", ["$rootScope", "$scope", "$document", "$state", "http", "utils", "config", "sycUC", "$mdDialog", function($rootScope, $scope, $document, $state, http, utils, config, sycUC, $mdDialog) {
		var vm = $scope.vm = {};
		angular.extend(vm, {
			init: function() {
				console.log($scope.checkopen), vm.loading = "init", vm.username = "", vm.password = "", this.browserSupport = this.isBrowserSupport()
			},
			login: function(action) {
				console.log(action), vm.loading = !1;
				var url = config.getAdminAPI("userlogin");
				http(url, {
					method: "post",
					data: {
						username: vm.username,
						password: vm.password
					}
				}).then(function(resp) {
					0 === resp.error_code ? utils.success("登录成功！", {
						posId: ".login-form",
						position: "top center"
					}).then(function() {
						$scope.checkopen ? $mdDialog.hide() : ($state.go("mainLayout.index", {
							iscallback: ""
						}), vm.loading = "complete", sycUC.init(vm.password))
					}) : (vm.error_msg_username = resp.error_message, vm.loading = "complete")
				})["catch"](function() {
					vm.loading = "fail"
				})
			},
			changeType: function() {
				vm.numType = !vm.numType
			},
			showWecodeModal: function() {
				utils.mdDialog({
					controller: "weCodeModalCtrl",
					templateUrl: "login/modal/weCodeModal.html"
				})
			},
			isBrowserSupport: function() {
				var isBrowser = !1,
					safariFlag = navigator.userAgent.toLowerCase().indexOf("safari"),
					chromeFlag = navigator.userAgent.toLowerCase().indexOf("chrome");
				return isBrowser = safariFlag > 0 && chromeFlag < 0 || chromeFlag > 0, window.File && window.FileList && window.FileReader && window.Blob || (isBrowser = !1), isBrowser
			}
		}), vm.init(), $document.bind("keypress", function(e) {
			$scope.$apply(function() {
				var keycode = window.event ? e.keyCode : e.which;
				13 == keycode && vm.login()
			})
		})
	}])
});