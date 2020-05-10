"use strict";
define(function(require) {
	var app = require("app");
	require("../services/appMakeService"), require("../appglobaldesign/modal/globalstylemodal"), require("../appglobaldesign/modal/thirdconfigmodal"), require("../appglobaldesign/modal/systemassessmodal"), app.controller("thirdAssessCtrl", ["$scope", "$modal", "$state", "navconfig", "utils", "config", "http", "appMakeService", function($scope, $modal, $state, navconfig, utils, config, http, appMakeService) {
		var vm = $scope.vm = {};
		angular.extend(vm, {
			utils: utils,
			init: function(guid) {
				vm.loading = "init", vm.guid = guid, this.getAppBaseInfo(), console.log(vm.guid, "vm.guid")
			},
			getAppBaseInfo: function() {
				appMakeService.getAppBaseInfo(vm.guid).then(function(resp) {
					vm.appinfo = resp.result.application, vm.share_plant = vm.appinfo.share_plant, vm.services = vm.appinfo.services, $.isArray(vm.appinfo.pay_info) && (vm.appinfo.pay_info = {})
				})
			},
			globalsetting: function() {
				$state.go("mainLayout.baseattr", {
					guid: vm.guid,
					view_id: vm.appinfo.view_id
				})
			},
			getModuleList: function() {
				var _this = this,
					url = config.getAPI("appModuleList") + "?scope=main&count=200";
				http(url).then(function(data) {
					0 == data.error_code && (vm.modulelist = data.result.data, _this.handleModulepic())
				})["catch"](function(reject) {})
			},
			handleModulepic: function() {
				angular.forEach(vm.modulelist, function(value) {
					value.iconpic = appMakeService.getModulePic(value.pic)
				})
			},
			getMainUI: function(guid) {
				appMakeService.getMainUI(guid).then(function(data) {
					data.error_code || (vm.mainUI = data.result.main_ui, vm.mainUI.img_info.url = utils.getImgUrl(vm.mainUI.img_info, 180, 320))
				})
			},
			getVersion: function(guid) {
				appMakeService.getVersion(guid).then(function(resp) {
					resp.error_code || (vm.versioninfo = resp.result.versions, vm.qrcode = resp.result.qrcode, D.forEach(vm.versioninfo, function(v, k) {
						D.forEach(v, function(vv, kk) {
							vm.versioninfo[k][kk] && 0 === vm.versioninfo[k][kk].status
						})
					}))
				})
			},
			modal_config: {
				dialog_style_config: {
					templateUrl: "appmake/appglobaldesign/modal/globalstylemodal.html",
					controller: "globalDesignModal",
					child_template_url: "appmake/modal/appglobaldesign/{type}.html"
				},
				third_data_config: {
					templateUrl: "appmake/appglobaldesign/modal/thirdconfigmodal.html",
					_templateUrl: "appmake/appglobaldesign/modal/systemassessmodal.html",
					controller: "{ctrl}",
					child_template_url: "appmake/modal/appglobaldesign/{type}.html"
				}
			},
			styleSeetingPop: function(type) {
				var options = {
					clickOutsideToClose: !0,
					size: 800,
					templateUrl: vm.modal_config.dialog_style_config.templateUrl,
					controller: vm.modal_config.dialog_style_config.controller,
					locals: {
						data: {
							iconsguid: vm.guid,
							type: vm.modal_config.dialog_style_config.child_template_url.replace("{type}", type)
						}
					}
				};
				this.sysglobalmodal(options)
			},
			thirdConfigPop: function(type, ctrl) {
				vm.appinfo && !vm.appinfo.pay_info && (vm.appinfo.pay_info = {}), vm.appinfo && !vm.appinfo.services && (vm.appinfo.services = {});
				var options = {
					clickOutsideToClose: !0,
					templateUrl: "ModalThirdConfig" == ctrl ? vm.modal_config.third_data_config.templateUrl : vm.modal_config.third_data_config._templateUrl,
					controller: vm.modal_config.third_data_config.controller.replace("{ctrl}", ctrl),
					locals: {
						data: {
							guid: vm.guid,
							currentPayWay: vm.appinfo,
							modalkey: {
								type: type
							},
							appinfo: vm.appinfo
						}
					}
				};
				console.log(options, "options"), this.sysglobalmodal(options)
			},
			addThirdhandel: function() {
				vm.thirdtipstyle = !0
			},
			hideThirdhandel: function() {
				vm.thirdtipstyle = !1
			},
			uploadCertificate: function() {
				vm.tipstyle = {
					transition: "all .3s",
					top: "-webkit-calc( ( 100% - 182px ) / 2 )"
				}
			},
			hideTip: function() {
				vm.tipstyle = {
					transition: "all .3s",
					top: "-182px"
				}
			},
			sysglobalmodal: function(options) {
				utils.mdDialog(options).then(function(data) {
					data && !$.isEmptyObject(data) && (vm.appinfo = data)
				})
			},
			appstoreentry: function() {
				$state.go("mainLayout.appstore")
			},
			outputApp: function() {
				var url = config.getAPI("appglobaldesign.exportapp").replace("{application_id}", vm.guid).replace("{level}", "app"),
					_url_ = url + "?check=1";
				http(_url_).then(function(data) {
					data && !+data.error_code ? window.location.href = url : utils.error(data.error_message), console.log(data, "导出的data")
				})
			}
		}), $scope.$on("checkApp", function(event, first_appinfo) {
			var guid = first_appinfo.guid;
			vm.init(guid)
		})
	}])
});