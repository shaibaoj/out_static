"use strict";

function _defineProperty(obj, key, value) {
	return key in obj ? Object.defineProperty(obj, key, {
		value: value,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : obj[key] = value, obj
}
define(function(require) {
	var app = require("app");
	require("../../services/appMakeService");
	require("common/services/server");
	app.controller("ModalSystemConfig", ["$scope", "$mdDialog", "utils", "appMakeService", "config", "data", function($scope, $mdDialog, utils, appMakeService, config, data) {
		var vm = $scope.vm = {};
		angular.extend(vm, _defineProperty({
			currentPayWay: data.currentPayWay,
			modalkey: data.modalkey,
			payinfo: "",
			guid: data.guid,
			appinfo: data.appinfo,
			bState: !1,
			initData: function() {
				vm.bState = !(!vm.appinfo.share_plant.tencent_weixin || !vm.appinfo.share_plant.tencent_weixin.wx_login) && vm.appinfo.share_plant.tencent_weixin.wx_login
			},
			setWxLoginState: function() {
				vm.bState = !vm.bState, vm.bState ? vm.appinfo.share_plant.tencent_weixin.wx_login = !0 : vm.appinfo.share_plant.tencent_weixin.wx_login = !1
			},
			save: function(type) {
				var data = {};
				switch (type) {
				case "sina_weibo":
					data.sina_weibo = {
						key: vm.appinfo.share_plant.sina_weibo.key,
						secret: vm.appinfo.share_plant.sina_weibo.secret
					};
					break;
				case "tencent_qq":
					data.tencent_qq = {
						key: vm.appinfo.share_plant.tencent_qq.key,
						secret: vm.appinfo.share_plant.tencent_qq.secret
					};
					break;
				case "tencent_weixin":
					data.tencent_weixin = {
						key: vm.appinfo.share_plant.tencent_weixin.key,
						secret: vm.appinfo.share_plant.tencent_weixin.secret,
						wx_login: vm.appinfo.share_plant.tencent_weixin.wx_login
					}
				}
				this.ajaxData(data)
			},
			ajaxData: function(data) {
				vm.loading = !1, appMakeService.setThirdPartService(vm.guid.configguid, data).then(function(resp) {
					resp.error_code ? utils.error(resp.error_message) : utils.success("系统配置更新成功!"), setTimeout(function() {
						$mdDialog.hide()
					}, 1500), vm.loading = "complete"
				})
			},
			addThirdConfig: function() {
				vm.thirdtipstyle = {
					transition: "all .3s",
					top: "-webkit-calc( ( 100% - 182px ) / 2 )"
				}
			},
			close: function() {
				$mdDialog.hide()
			},
			initThirdConfig: function() {
				vm.appinfo && vm.appinfo.services && vm.appinfo.services.youzan && (vm.appinfo.services.youzan.ua || vm.appinfo.services.youzan.appId || vm.appinfo.services.youzan.appSecret) && !vm.appinfo.services.youzan.hasOwnProperty("opened") && (vm.appinfo.services.youzan.opened = !0)
			},
			initPayConfig: function() {
				vm.appinfo && vm.appinfo.share_plant && vm.appinfo.share_plant.sina_weibo && (vm.appinfo.share_plant.sina_weibo.key || vm.appinfo.share_plant.sina_weibo.secret) && !vm.appinfo.share_plant.sina_weibo.hasOwnProperty("opened") && (vm.appinfo.share_plant.sina_weibo.opened = !0), vm.appinfo && vm.appinfo.share_plant && vm.appinfo.share_plant.tencent_qq && (vm.appinfo.share_plant.tencent_qq.key || vm.appinfo.share_plant.tencent_qq.secret) && !vm.appinfo.share_plant.tencent_qq.hasOwnProperty("opened") && (vm.appinfo.share_plant.tencent_qq.opened = !0), vm.appinfo && vm.appinfo.share_plant && vm.appinfo.share_plant.tencent_weixin && (vm.appinfo.share_plant.tencent_weixin.key || vm.appinfo.share_plant.tencent_weixin.secret) && !vm.appinfo.share_plant.tencent_weixin.hasOwnProperty("opened") && (vm.appinfo.share_plant.tencent_weixin.opened = !0)
			}
		}, "close", function() {
			$mdDialog.cancel()
		})), vm.initData()
	}])
});