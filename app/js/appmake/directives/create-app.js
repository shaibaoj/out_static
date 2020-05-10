"use strict";
define(function(require) {
	var app = require("app"),
		server = require("common/services/server");
	require("../services/appMakeService"), app.directive("createApp", function($rootScope, $modal, appMakeService, utils, config, http) {
		return {
			restrict: "A",
			replace: !0,
			scope: {},
			link: function(scope, element, attrs, controller) {
				var vm = scope.vm = {};
				angular.extend(vm, {
					init: function() {},
					createApp: function() {
						vm.appinfo = $rootScope.global_currentApp;
						var expireDate = new Date(vm.appinfo.expire_date).getTime(),
							nowDate = (new Date).getTime();
						return expireDate - nowDate < 0 ? void utils.confirm({
							msgClass: "dingdone-auth-exprie",
							msg: "授权使用已到期，无法享受打包服务，是否前往订购?",
							sureName: "立即续费",
							sureClass: "btn-danger",
							cancelName: "取消",
							cancelClass: "btn-cancel",
							needCancl: !0,
							icon: "icon-trash"
						}, function(sure) {
							if (sure) {
//								var _url = config.getAPI("template_system.productlist").replace("{type}", "app_subscribe") + "?product_type=app_subscribe";
//								http(_url).then(function(json) {
//									var result = json.result.data[0],
//										productId = result.id,
//										productType = result.type,
//										userId = $rootScope.userId,
//										appId = $rootScope.global_currentApp.guid,
//										url = server.service_store_url + "/client/purchase?plat=dingdone&channel=" + server.service_store_channel + "&product_type=" + productType + "&product_id=" + productId + "&user_id=" + userId + "&appid=" + appId + "&backUrl=" + location.href.split("http://")[1];
//									location.href = url
//								})
								location.href = "http://www.haopintui.net/user_info.php?action=user&mod=service&type=cms_maijia&id=16"
							}
						}) : void appMakeService.getVersion(vm.guid).then(function(resp) {
							resp.error_code || (vm.versioninfo = resp.result.versions, vm._createApp())
						})
					},
					_createApp: function() {
						var data = {};
						vm.versioninfo && vm.versioninfo.release && vm.versioninfo.release.ios && 0 === +vm.versioninfo.release.ios.status && (data.packageId = {
							ios: vm.versioninfo.release.ios.id
						}, vm.versioninfo.release.android && vm.versioninfo.release.android.id && (data.packageId.android = vm.versioninfo.release.android.id)), vm.versioninfo && vm.versioninfo.release && vm.versioninfo.release.android && 0 === +vm.versioninfo.release.android.status && (data.packageId = {
							android: vm.versioninfo.release.android.id
						}, vm.versioninfo.release.ios && vm.versioninfo.release.ios.id && (data.packageId.ios = vm.versioninfo.release.ios.id)), vm.versioninfo && vm.versioninfo.debug && vm.versioninfo.debug.ios && 0 === +vm.versioninfo.debug.ios.status && (data.packageId = {
							ios: vm.versioninfo.debug.ios.id
						}, vm.versioninfo.debug.android && vm.versioninfo.debug.android.id && (data.packageId.android = vm.versioninfo.debug.android.id)), vm.versioninfo && vm.versioninfo.debug && vm.versioninfo.debug.android && 0 === +vm.versioninfo.debug.android.status && (data.packageId = {
							android: vm.versioninfo.debug.android.id
						}, vm.versioninfo.debug.ios && vm.versioninfo.debug.ios.id && (data.packageId.ios = vm.versioninfo.debug.ios.id)), utils.mdDialog({
							templateUrl: "appmake/createapp/createAppModal.html",
							controller: "CreateAppModalCtrl",
							locals: {
								modalData: {
									version: vm.versioninfo
								}
							}
						}).then(function(data) {
							console.log(data, "开始打包回调"), vm.createPackage(data)
						})
					},
					createPackage: function(data) {
						utils.mdDialog({
							templateUrl: "appmake/createapp/dabaoModal.html",
							controller: "DabaoCtrl",
							locals: {
								packageData: {
									packageId: data.packageId,
									iosVersion: data.iosVersion,
									androidVersion: data.androidVersion
								}
							}
						})
					}
				}), element.on("click", function() {
					vm.createApp()
				})
			}
		}
	})
});