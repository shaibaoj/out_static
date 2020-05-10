"use strict";
define(function(require) {
	var app = require("app"),
		server = require("common/services/server");
	require("https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"), app.controller("weCodeModalCtrl", ["$scope", "http", "utils", "config", "$mdDialog", function($scope, http, utils, config, $mdDialog) {
		var vm = $scope.vm = {};
		angular.extend(vm, {
			init: function() {
				vm.getWxState()
			},
			getWxState: function() {
				vm.loading = !1;
				var url = config.getAdminAPI("wechatlogin");
				http(url).then(function(resp) {
					if ("0" === resp.error_code) {
						vm.wxinfo = resp.result;
						var wxinfo = {
							appid: vm.wxinfo.appid,
							redirect_uri: vm.wxinfo.redirect_uri,
							state: vm.wxinfo.state,
							scope: vm.wxinfo.scope
						};
						vm.initWxLogin(wxinfo), vm.loading = "complete"
					}
				})["catch"](function() {
					vm.loading = "fail"
				})
			},
			initWxLogin: function(wxinfo) {
				new WxLogin({
					id: "wx-qrcod",
					appid: wxinfo.appid,
					scope: wxinfo.scope,
					redirect_uri: wxinfo.redirect_uri,
					state: wxinfo.state,
					style: "black",
					href: server.staticCDN_https + "/images/weixin.css"
				})
			},
			close: function() {
				$mdDialog.cancel()
			}
		}), vm.init()
	}])
});