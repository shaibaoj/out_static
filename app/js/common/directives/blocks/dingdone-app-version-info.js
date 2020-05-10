"use strict";
define(function(require) {
	var app = require("app");
	require("moment");
	require("appmake/services/appMakeService"), require("appmake/createapp/versionLog"), require("appmake/modal/myapp/debugqrcode"), require("appmake/modal/myapp/releaseqrcode"), require("common/modal/modal-header"), require("common/modal/modal-footer"), app.directive("dingdoneAppVersionInfo", ["$rootScope", "appMakeService", "utils", "config", "$interval", "http", function($rootScope, appMakeService, utils, config, $interval, http) {
		return {
			scope: {},
			templateUrl: "common/directives/blocks/dingdone-app-version-info.html",
			link: function($scope) {
				var vm = $scope.vm = {};
				angular.extend(vm, {
					guid: config.Appinfo.guid,
					loadingObj: {
						release: {
							ios: {
								versionloading: "init"
							},
							android: {
								versionloading: "init"
							},
							wxapp: {
								versionloading: "init"
							}
						},
						debug: {
							ios: {
								versionloading: "init"
							},
							android: {
								versionloading: "init"
							},
							wxapp: {
								versionloading: "init"
							}
						}
					},
					packageType: {
						release: {
							name: "发布版",
							noDataTip: "发布版为已经发布的办法。可以上架到应用市场。用户可以自动检查更新"
						},
						debug: {
							name: "测试版",
							noDataTip: "测试版用于在APP制作过程中调试测试，建议仅限内部人员安装，如需打包测试版点击右上打包生成按钮。"
						}
					},
					client: {
						ios: {
							iconClass: "icon-ios"
						},
						android: {
							iconClass: "icon-android"
						},
						wxapp: {
							iconClass: "icon-program"
						}
					},
					init: function() {
						vm.getVersion(), vm.wacthScreen()
					},
					hasClient: function(packageType) {
						return vm.versioninfo && (vm.versioninfo[packageType].android || vm.versioninfo[packageType].ios || vm.versioninfo[packageType].wxapp)
					},
					wacthScreen: function() {
						vm.currentWidth = $(window).width(), $scope.$watch("vm.currentWidth", function(val) {
							val > 1440 ? vm.bigScreen = !0 : vm.bigScreen = !1, $(window).resize(function() {
								vm.currentWidth = $(window).width()
							})
						})
					},
					getVersion: function() {
						appMakeService.getVersion(this.guid).then(function(resp) {
							if (!resp.error_code) {
								vm.versioninfo = resp.result.versions, vm.qrcode = resp.result.qrcode;
								var t = new Date;
								vm.qrcode.release += "?" + t.getTime(), vm.qrcode.debug += "?" + t.getTime(), D.forEach(vm.versioninfo, function(v, k) {
									D.forEach(v, function(vv, kk) {
										vm.versioninfo[k][kk] && (vm.versioninfo[k][kk].status = +vm.versioninfo[k][kk].status, 0 === +vm.versioninfo[k][kk].status && vm.getPackageStatus(k, kk), "ios" === kk ? vm.versioninfo[k][kk].tip = "(扫描下载)" : "android" === kk ? vm.versioninfo[k][kk].tip = "(点击/扫描下载)" : "wxapp" === kk && (vm.versioninfo[k][kk].tip = "(点击/扫描下载)"))
									})
								})
							}
						})
					},
					selectTab: function(flag) {
						vm.isrelease = "release" === flag
					},
					showVersionLogPop: function() {
						utils.mdDialog({
							animateanimation: !0,
							templateUrl: "appmake/createapp/versionLog.html",
							controller: "VersionLogCtrl"
						})
					},
					showQrcode: function(packageType) {
						"debug" == packageType ? vm.showDebugQrcode() : vm.showReleaseQrcode()
					},
					showDebugQrcode: function() {
						utils.mdDialog({
							templateUrl: "appmake/modal/myapp/debugqrcode.html",
							controller: "ModalDebugQrcode",
							locals: {
								qrcodeSrc: {
									src: vm.qrcode.debug
								}
							}
						})
					},
					showReleaseQrcode: function() {
						utils.mdDialog({
							templateUrl: "appmake/modal/myapp/releaseqrcode.html",
							controller: "ModalReleaseQrcode",
							locals: {
								releaseqrcodeSrc: {
									src: vm.qrcode.release
								}
							}
						})
					},
					reDoPackage: function(id, packageType, isrelease, type) {
						var obj = {
							is_release: isrelease,
							version_code: {
								ios: {},
								android: {}
							}
						};
						obj.version_code[type].version_id = id;
						var url = config.getAPI("dopackage");
						vm.loadingObj[packageType][type].versionloading = null, http(url, {
							method: "post",
							data: obj
						}).then(function(data) {
							var flag = isrelease ? "release" : "debug";
							vm.getPackageStatus(flag, type), vm.loadingObj[packageType][type].versionloading = "complete"
						})
					},
					getPackageStatus: function(flag, type) {
						this._fetchPackageStatus(flag, type), $rootScope.timer[type] && $interval.cancel($rootScope.timer[type]), $rootScope.timer[type] = $interval(function() {
							vm._fetchPackageStatus(flag, type)
						}, 5e3)
					},
					_fetchPackageStatus: function(flag, type) {
						appMakeService.getPackageStatus(vm.versioninfo[flag][type].id).then(function(data) {
							data.error_code || ("error" == data.result.status ? (vm.versioninfo[flag][type].status = -1, vm.clearTimer(type)) : "done" == data.result.status ? (vm.versioninfo[flag][type].status = 1, vm.clearTimer(type)) : vm.versioninfo[flag][type].status = 0)
						})["catch"](function() {
							$interval.cancel($rootScope.timer[type])
						})
					},
					clearTimer: function(type) {
						$rootScope.timer[type] && $interval.cancel($rootScope.timer[type])
					}
				}), vm.init(), $scope.$on("to-build", function() {
					vm.init()
				}), $rootScope.$on("$stateChangeStart", function() {})
			}
		}
	}])
});