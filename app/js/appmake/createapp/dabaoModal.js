"use strict";
define(function(require) {
	var app = require("app"),
		moment = require("moment");
	require("common/directives/dingdone-donut"), require("common/modal/modal-header");
	var server = require("common/services/server");
	app.controller("DabaoCtrl", ["$rootScope", "$scope", "$interval", "$mdDialog", "packageData", "appMakeService", "config", "utils", function($rootScope, $scope, $interval, $mdDialog, packageData, appMakeService, config, utils) {
		var vm = $scope.vm = {};
		angular.extend(vm, {
			clientConfig: {
				ios: {
					iconClass: "icon-ios",
					progressColor: "#15a5fb",
					progress: 0
				},
				android: {
					iconClass: "icon-android",
					progressColor: "#14c596",
					progress: 0
				},
				wxapp: {
					iconClass: "icon-wxapp",
					progressColor: "#7181de",
					progress: 0
				}
			},
			timer: {},
			ios: {},
			android: {},
			wxapp: {},
			TIME_DELAY: 5e3,
			options: {},
			init: function(guid) {
				server.wxappOpen && angular.extend(vm.clientConfig, {
					wxapp: {
						iconClass: "icon-program",
						progressColor: "#7080dd",
						progress: 0
					}
				}), appMakeService.getAppBaseInfo(guid).then(function(resp) {
					vm.appinfo = resp.result.application, vm.appinfo.create_time = vm.appinfo.create_time ? moment.unix(+vm.appinfo.create_time).format("YYYY-MM-DD HH:mm") : "--", vm.appinfo.pack_time = vm.appinfo.pack_time ? moment.unix(+vm.appinfo.pack_time).format("YYYY-MM-DD HH:mm") : "--"
				}), vm.getVersion(guid), vm.flag = packageData.packageId && packageData.packageId.is_release ? "release" : "debug", vm.ios.version = packageData.iosVersion, vm.android.version = packageData.androidVersion, vm.wxapp.version = packageData.wxappVersion, D.forEach(config.progressConfig, function(v, sysType) {
					packageData.packageId && packageData.packageId[sysType] && (vm.getPackageStatus(sysType), vm.timer[sysType] = $interval(function() {
						vm.getPackageStatus(sysType)
					}, vm.TIME_DELAY))
				})
			},
			initIosAndroid: function(sysType, v) {
				D.forEach(v, function(item, key) {
					key.indexOf("init") !== -1 && (vm[sysType][key.split("init")[1]] = item)
				})
			},
			getStrokeDasharray: function(progress) {
				var percent = progress / 100,
					perimeter = 2 * Math.PI * 55,
					result = perimeter * percent + " " + perimeter * (1 - percent);
				return result
			},
			getPackageStatus: function(sysType) {
				appMakeService.getPackageStatus(packageData.packageId[sysType]).then(function(data) {
					data.error_code || (vm.setProgressConfig(sysType, data), vm[sysType].progress = data.result && data.result.progress_bar ? 1 * data.result.progress_bar.replace("%", "") / 100 : 0, vm.options.text = vm[sysType].download_url, "done" === data.result.status && ($rootScope.building = "done" + Math.random(), vm.appinfo.pack_time = moment(new Date).format("YYYY-MM-DD HH:mm")), "done" !== data.result.status && "error" !== data.result.status || ($interval.cancel(vm.timer[sysType]), $rootScope.$broadcast("to-build")))
				})
			},
			getStatusText: function(client) {
				var flag = vm[client] && vm[client].flag,
					hash = {
						init: "队列中...",
						processing: "处理中...",
						building: "编译中...",
						done: "打包完成!",
						error: "打包失败!"
					};
				return flag ? hash[flag] : "本次未打包"
			},
			setProgressConfig: function(sysType, data) {
				vm[sysType].flag = data.result && data.result.status ? data.result.status : "error", vm[sysType].resultText = data.result.prompt ? data.result.prompt : config.progressConfig[vm[sysType].flag + "resultText"], vm[sysType].color = config.progressConfig[sysType][vm[sysType].flag + "color"], vm[sysType].bgColor = config.progressConfig[sysType][vm[sysType].flag + "bgColor"], vm[sysType].imgSrc = config.progressConfig[sysType][vm[sysType].flag + "imgSrc"], vm[sysType].download_url = data.result.download_url, vm.clientConfig[sysType].progress = parseInt(data.result.progress_bar)
			},
			drawLineTimer: function(sysType, data) {
				var timer = {};
				timer[sysType + "count"] = 0, timer[sysType] = $interval(function() {
					timer[sysType + "count"]++, vm.setProgress(sysType, data, timer[sysType + "count"]), timer[sysType + "count"] >= 100 && $interval.cancel(timer[sysType])
				}, vm.TIME_DELAY / 100 - 5), "done" !== vm[sysType].flag && "error" !== vm[sysType].flag || ($interval.cancel(timer[sysType]), $interval.cancel(vm.timer[sysType]))
			},
			getVersion: function(guid) {
				appMakeService.getVersion(guid).then(function(resp) {
					resp.error_code || (vm.qrcode = resp.result.qrcode, vm.ios.version = resp.result.versions[vm.flag].ios, vm.android.version = resp.result.versions[vm.flag].android, vm.wxapp.version = resp.result.versions[vm.flag].wxapp)
				})
			},
			getRelVersion: function(is_release) {
				appMakeService.getRelVersion(is_release).then(function(data) {
					vm.ios.version = data.result.ios, vm.android.version = data.result.android, vm.wxapp.version = data.result.wxapp
				})["catch"](function() {})
			},
			setProgress: function(sysType, data, count) {
				vm[sysType].progress = data.result && data.result.progress_bar ? data.result.progress_bar.replace("%", "") * count / 1e4 : 0
			},
			close: function() {
				$interval.cancel(vm.timer.ios), $interval.cancel(vm.timer.android), $interval.cancel(vm.timer.wxapp), $mdDialog.hide()
			}
		}), vm.init(config.Appinfo.guid)
	}])
});