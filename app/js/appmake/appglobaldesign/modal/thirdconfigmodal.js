"use strict";
define(function(require) {
	var app = require("app");
	require("../../services/appMakeService");
	require("common/services/server");
	app.controller("ModalThirdConfig", ["$scope", "$mdDialog", "utils", "appMakeService", "config", "data", function($scope, $mdDialog, utils, appMakeService, config, data) {
		var vm = $scope.vm = {};
		angular.extend(vm, {
			currentPayWay: data.currentPayWay,
			modalkey: data.modalkey,
			payinfo: "",
			guid: data.guid,
			initData: function() {
				vm.loading = "init", console.log(vm.currentPayWay, "vm.currentPayWay"), vm.currentPayWay && vm.currentPayWay.pay_info && vm.currentPayWay.pay_info.ddpay_wx && (vm.wx_appid = vm.currentPayWay.pay_info.ddpay_wx.ddpay_wx_appid, vm.wx_id = vm.currentPayWay.pay_info.ddpay_wx.ddpay_wx_mchid, vm.wx_rsa = vm.currentPayWay.pay_info.ddpay_wx.ddpay_wx_apikey, vm.wx_pageurl = vm.currentPayWay.pay_info.ddpay_wx.ddpay_wx_notify_url), vm.currentPayWay && vm.currentPayWay.pay_info && vm.currentPayWay.pay_info.ddpay_ali && (vm.ali_pid = vm.currentPayWay.pay_info.ddpay_ali.ddpay_ali_pid, vm.ali_private_rsa = vm.currentPayWay.pay_info.ddpay_ali.ddpay_ali_private_rsa, vm.ali_public_rsa = vm.currentPayWay.pay_info.ddpay_ali.ddpay_ali_public_rsa, vm.ali_pageurl = vm.currentPayWay.pay_info.ddpay_ali.ddpay_ali_notify_url), vm.currentPayWay && vm.currentPayWay.services && vm.currentPayWay.services.youzan && (vm.youzan_ua = vm.currentPayWay.services.youzan.ua, vm.youzan_appid = vm.currentPayWay.services.youzan.appId, vm.youzan_appsecret = vm.currentPayWay.services.youzan.appSecret), vm.currentPayWay && (vm.webhook_url = "http://v3.client-api.dingdone.com/api/" + vm.guid.configguid + "/webhook/"), vm.currentPayWay && vm.currentPayWay.services && vm.currentPayWay.services.webapp && (vm.wxapp_appid = vm.currentPayWay.services.webapp.app_id, vm.wxapp_mchid = vm.currentPayWay.services.webapp.mch_id, vm.wxapp_appsecret = vm.currentPayWay.services.webapp.app_secret, vm.wxapp_mchsecret = vm.currentPayWay.services.webapp.mch_secret), vm.currentPayWay && vm.currentPayWay.services && vm.currentPayWay.services.baidu_map && (vm.baidu_ios_key = vm.currentPayWay.services.baidu_map.ios_key, vm.baidu_android_key = vm.currentPayWay.services.baidu_map.android_key)
			},
			save: function(type, bool) {
				console.log(type, "type"), bool && this.configData(type), bool && this.ajaxData(vm.data, type)
			},
			configData: function(type) {
				switch (vm.data = {}, type) {
				case "ddpay_wx":
					vm.data.ddpay_wx = {
						ddpay_wx_appid: vm.wx_appid,
						ddpay_wx_mchid: vm.wx_id,
						ddpay_wx_apikey: vm.wx_rsa,
						ddpay_wx_notify_url: vm.wx_pageurl
					};
					break;
				case "ddpay_ali":
					vm.data.ddpay_ali = {
						ddpay_ali_pid: vm.ali_pid,
						ddpay_ali_private_rsa: vm.ali_private_rsa,
						ddpay_ali_public_rsa: vm.ali_public_rsa,
						ddpay_ali_notify_url: vm.ali_pageurl
					};
					break;
				case "youzan":
					vm.data.youzan = {
						ua: vm.youzan_ua,
						appId: vm.youzan_appid,
						appSecret: vm.youzan_appsecret
					};
					break;
				case "weixnapp":
					vm.data.webapp = {
						app_id: vm.wxapp_appid,
						mch_id: vm.wxapp_mchid,
						app_secret: vm.wxapp_appsecret,
						mch_secret: vm.wxapp_mchsecret
					};
					break;
				case "baidumap":
					vm.data.baidu_map = {
						ios_key: vm.baidu_ios_key ? vm.baidu_ios_key : "",
						android_key: vm.baidu_android_key ? vm.baidu_android_key : ""
					}
				}
			},
			ajaxData: function(data, type) {
				var _this = this;
				vm.loading = !1, appMakeService.setThirdPartService(vm.guid.configguid, data).then(function(resp) {
					resp.error_code ? utils.error(resp.error_message) : (utils.success("系统配置更新成功!"), vm.currentPayWay && _this.updataLocal()), setTimeout(function() {
						$mdDialog.hide(vm.currentPayWay)
					}, 1500), vm.loading = "complete"
				})
			},
			updataLocal: function() {
				vm.currentPayWay.pay_info.ddpay_wx = {
					ddpay_wx_appid: vm.wx_appid,
					ddpay_wx_mchid: vm.wx_id,
					ddpay_wx_apikey: vm.wx_rsa,
					ddpay_wx_notify_url: vm.wx_pageurl
				}, vm.currentPayWay.pay_info.ddpay_ali = {
					ddpay_ali_pid: vm.ali_pid,
					ddpay_ali_private_rsa: vm.ali_private_rsa,
					ddpay_ali_public_rsa: vm.ali_public_rsa,
					ddpay_ali_notify_url: vm.ali_pageurl
				}, vm.currentPayWay.services.youzan = {
					ua: vm.youzan_ua,
					appId: vm.youzan_appid,
					appSecret: vm.youzan_appsecret
				}, vm.currentPayWay.services.webapp = {
					app_id: vm.wxapp_appid,
					mch_id: vm.wxapp_mchid,
					app_secret: vm.wxapp_appsecret,
					mch_secret: vm.wxapp_mchsecret
				}, vm.currentPayWay.services.baidu_map = {
					ios_key: vm.baidu_ios_key,
					android_key: vm.baidu_android_key
				}
			},
			close: function() {
				$mdDialog.hide()
			}
		}), vm.initData()
	}])
});