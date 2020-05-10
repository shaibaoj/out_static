"use strict";
define(function(require) {
	var app = require("app");
	require("common/services/appmake/baseinfo"), require("common/directives/empty-data"), require("common/modal/app_icon"), require("common/modal/app_startup"), require("../modal/baseinfo/app_guide"), require("../modal/baseinfo/youzan_unbind"), require("../modal/baseinfo/youzan_replace"), require("common/directives/focus"), require("common/services/addressServ"), require("common/modal/up_module"), require("common/services/youzanBindService"), require("../appglobaldesign/modal/globalstylemodal"), require("../appglobaldesign/modal/thirdconfigmodal"), require("../appglobaldesign/modal/systemassessmodal"), require("appmake/myapp/modal/chooseStoreModal");
	var server = require("common/services/server");
	app.controller("AppBaseCtrl", ["$rootScope", "$scope", "$q", "$modal", "$state", "navconfig", "utils", "config", "http", "appMakeService", "addressServ", "appBase", "youzanBindService", function($rootScope, $scope, $q, $modal, $state, navconfig, utils, config, http, appMakeService, addressServ, appBase, youzanBindService) {
		var vm = $scope.vm = {};
		angular.extend(vm, {
			isedit: {},
			utils: utils,
			config: config,
			init: function(guid) {
				vm.isOnline = "onlinev3" != server.platform, vm.loading = !1, vm.shoploading = "init", vm.getUserDetail(), vm.getBaseInfo(guid), vm.getVersion(guid), "ecshop" != vm.version && vm.getBusiness(), vm.getGuidePic(guid), vm.getAppIconConfig(guid), vm.guid = guid, vm.version = server.version, vm.host = server.host, "ecshop" == vm.version && youzanBindService.getYouzanShopInfo().then(function(resp) {
					resp.error_code || (vm.shopinfo = resp.result.shop_info, vm.shopinfo && angular.isArray(vm.shopinfo) && (vm.hasshop = !1), console.log(vm.shopinfo && !angular.isArray(vm.shopinfo), "shop"), vm.shopinfo && !angular.isArray(vm.shopinfo) && (vm.getYouzanAuthen(), vm.hasshop = !0))
				}), vm.getStoreInfo.init()
			},
			getBaseInfo: function(guid) {
				appMakeService.getAppBaseInfo(guid).then(function(data) {
					data && data.result && data.result.application && (vm.baseinfo = data.result.application), data && data.result && data.result.system_icons && (vm.system_icons = data.result.system_icons), console.log("APP 信息", vm.baseinfo), vm.secretkey = vm.baseinfo.dev_secret, vm.updateId = vm.baseinfo.export_product_id, vm.initBaseinfo(), vm.initStartUpPicData(), vm.initGuideData(), vm.system_icons && !$.isEmptyObject(vm.system_icons) && vm.dealIconTypeFlag(vm.system_icons.navbar.flag), vm.getProvince(), vm.loading = "complete"
				})
			},
			getYouzanAuthen: function() {
				appMakeService.getYouzanAuth().then(function(resp) {
					"0" === resp.error_code && resp.result && (vm.youzaninfo = resp.result, vm.now = Date.parse(new Date), vm.youzaninfo && vm.youzaninfo.expireTime && (vm.due_time = new Date(parseInt(vm.youzaninfo.expireTime)).toLocaleString().replace(/:\d{1,2}$/, " "), vm.overdue_time = vm.youzaninfo.expireTime - vm.now, vm.overdue_time > 0 && (parseInt(vm.overdue_time / 864e5) > 0 && (vm.time = parseInt(vm.overdue_time / 864e5) + "天"), 0 == parseInt(vm.overdue_time / 864e5) && (vm.time = parseInt(vm.overdue_time / 36e5) + "小时"), 0 == parseInt(vm.overdue_time / 36e5) && (vm.time = parseInt(vm.overdue_time / 6e4) + "分钟"), 0 != parseInt(vm.overdue_time / 6e4) && 0 != vm.overdue_time || (vm.time = vm.overdue_time + "秒")))), resp.error_code && "0" !== resp.error_code && (vm.has_error = !0, vm.youzanbindtip = {
						transition: "all .3s",
						top: "-webkit-calc( ( 100% - 182px ) / 2 )"
					})
				})
			},
			closeTip: function() {
				vm.youzanbindtip = {
					transition: "all .3s",
					top: "-182px"
				}
			},
			toPay: function() {
				vm.businessinfo && angular.isArray(vm.businessinfo) && $state.go("mainLayout.businessAuth"), vm.businessinfo && !angular.isArray(vm.businessinfo) && 0 == vm.businessinfo.is_confirm_pay && $state.go("mainLayout.noBuyBusinessAuth"), vm.businessinfo && !angular.isArray(vm.businessinfo) && 1 == vm.businessinfo.is_confirm_pay && $state.go("mainLayout.businessAuth")
			},
			toRenew: function() {
				vm.businessinfo && 2 == vm.businessinfo.status && vm.time <= 1296e6 && $state.go("mainLayout.businessAuth"), vm.businessinfo && 0 == vm.businessinfo.is_confirm_pay && $state.go("mainLayout.noBuyBusinessAuth"), vm.businessinfo && 1 == vm.businessinfo.is_confirm_pay && $state.go("mainLayout.businessAuth")
			},
			initStartUpPicData: function() {
				vm.startupValue = {}, vm.startupValue.startup_pic = vm.baseinfo.startup_pic, vm.startupValue.startup_type = vm.baseinfo.startup_type, vm.startupValue.effect = vm.baseinfo.effect, vm.startupValue.text_size = vm.baseinfo.text_size, vm.startupValue.text_color = vm.baseinfo.text_color, vm.startupValue.copyright = vm.baseinfo.copyright, vm.startupValue.isCopyrightOpen = vm.baseinfo.isCopyrightOpen
			},
			initGuideData: function() {
				vm.guide = vm.guide ? vm.guide : {}, vm.guide.guide_animation = 1 * vm.baseinfo.guide_animation, vm.guide.guide_effect = vm.baseinfo.guide_effect, vm.guide.guide_select_color = vm.baseinfo.guide_select_color, vm.guide.guide_sign = vm.baseinfo.guide_sign, vm.guide.guide_default_color = vm.baseinfo.guide_default_color
			},
			initDefaultData: function() {
				vm.baseinfo.brief = vm.baseinfo.brief, vm.baseinfo.user_copy_right = vm.baseinfo.user_copy_right, vm.baseinfo.is_show_guide = +vm.baseinfo.is_show_guide
			},
			initBaseinfo: function() {
				vm.initDefaultData(), D.isObject(vm.baseinfo.startup_pic) && (vm.baseinfo.startup_pic.url = utils.getImgUrl(vm.baseinfo.startup_pic)), D.isObject(vm.baseinfo.startup_pic2) && (vm.baseinfo.startup_pic2.url = utils.getImgUrl(vm.baseinfo.startup_pic2)), D.isObject(vm.baseinfo.startup_pic3) && (vm.baseinfo.startup_pic3.url = utils.getImgUrl(vm.baseinfo.startup_pic3)), D.isObject(vm.baseinfo.icon) && (vm.baseinfo.icon.url = utils.getImgUrl(vm.baseinfo.icon)), vm.namearr = vm.baseinfo.android_package_name.split("."), vm.val_01 = vm.namearr[0], vm.val_02 = vm.namearr[1], vm.val_03 = vm.namearr[2], vm.val_04 = vm.namearr[3]
			},
			getVersion: function(guid) {
				appMakeService.getVersion(guid).then(function(resp) {
					!resp.error_code && resp.result && (vm.versioninfo = resp.result.versions)
				})
			},
			bindYouzan: function() {
				youzanBindService.init()
			},
			refreshShopInfo: function() {
				vm.shoploading = !1;
				var url = userService.getAPI("youzanupdateshopinfo");
				http(url, {
					method: "post"
				}).then(function(resp) {
					resp && 0 == resp.error_code && youzanBindService.getYouzanShopInfo().then(function(resp) {
						resp.error_code || (vm.shopinfo = resp.result.shop_info, vm.shoploading = "complete"), resp.error_code && (vm.shoploading = "complete")
					})
				})["catch"](function(reject) {
					vm.shoploading = "complete"
				})
			},
			getBusiness: function() {
				appMakeService.getBusiness().then(function(resp) {
					!resp.error_code && resp.result && (vm.businessinfo = resp.result, vm.businessinfo && !angular.isArray(vm.businessinfo) && (vm.hasbusiness = !0, vm.businessinfo.overdue_time && vm.businessinfo.overdue_time >= 0 && (vm.businessinfo.overdue_time && parseInt(vm.businessinfo.overdue_time / 86400) > 0 && (vm.time = parseInt(vm.businessinfo.overdue_time / 86400), vm.overdue_time = vm.time + "天"), vm.businessinfo.overdue_time && 0 == parseInt(vm.businessinfo.overdue_time / 86400) && (vm.time = parseInt(vm.businessinfo.overdue_time / 3600), vm.overdue_time = vm.time + "小时"), vm.businessinfo.overdue_time && 0 == parseInt(vm.businessinfo.overdue_time / 3600) && (vm.time = parseInt(vm.businessinfo.overdue_time / 60), vm.overdue_time = vm.time + "分钟"), (vm.businessinfo.overdue_time && 0 == parseInt(vm.businessinfo.overdue_time / 60) || 0 == vm.businessinfo.overdue_time) && (vm.time = vm.businessinfo.overdue_time, vm.overdue_time = vm.time + "秒")), vm.businessinfo.overdue_time && vm.businessinfo.overdue_time < 0 && (vm.time = vm.businessinfo.overdue_time)), vm.businessinfo && angular.isArray(vm.businessinfo) && (vm.hasbusiness = !1))
				})
			},
			toRenewal: function() {
				vm.businessinfo && 2 == vm.businessinfo.status && vm.time <= 1296e6 && $state.go("mainLayout.businessAuth"), vm.businessinfo && 1 == vm.businessinfo.status && vm.time <= 1296e6 && $state.go("mainLayout.businessAuth"), vm.businessinfo && 3 == vm.businessinfo.status && vm.time <= 1296e6 && $state.go("mainLayout.businessAuth")
			},
			showUnbindModal: function() {
				$modal.open({
					animateanimation: !0,
					size: 600,
					templateUrl: "appmake/modal/baseinfo/youzan_unbind.html",
					controller: "youzanUnbindModalCtrl"
				})
			},
			showReplaceModal: function() {
				$modal.open({
					animateanimation: !0,
					size: 600,
					templateUrl: "appmake/modal/baseinfo/youzan_replace.html",
					controller: "youzanReplaceModalCtrl"
				})
			},
			getProvince: function() {
				addressServ.getProvince().then(function(resp) {
					vm.provinceList = resp.result.province, vm.initProvinceData()
				})
			},
			initProvinceData: function() {
				if (vm.baseinfo.province) {
					var cacheProvince = _(vm.provinceList).filter(function(value) {
						if (value.name === vm.baseinfo.province) return value
					})[0];
					cacheProvince && cacheProvince.code && (vm.currentProvinceCode = cacheProvince.code, this.initCityData(cacheProvince.code))
				}
			},
			initCityData: function(provinceValue) {
				appMakeService.getCityList(provinceValue).then(function(resp) {
					if (vm.cityList = resp.result.city, vm.baseinfo.city) {
						var cacheCity = _(vm.cityList).filter(function(value) {
							if (value.name === vm.baseinfo.city) return value
						})[0];
						vm.currentCityCode = cacheCity && cacheCity.code ? cacheCity.code : ""
					}
				})
			},
			requirelength: function() {
				vm.baseinfo.name && vm.baseinfo.name.length > 10 && (utils.error("APP名称限制为1-20个字符"), vm.baseinfo.name = vm.baseinfo.name.substr(0, vm.baseinfo.name.length - 1))
			},
			updateAttr: function(name, blur) {
				if ("is_show_guide" === name && (vm.baseinfo.is_show_guide = +vm.baseinfo.is_show_guide ? 0 : 1, this.isedit[name] = 1, blur = !0), this.isedit[name] && "user_copy_right" === name && (this.testCopyrightInfo(), vm.CopyrightError)) return void utils.error("版权信息字数应在50字以内");
				if (this.isedit[name] && blur) {
					var data = {};
					if ("address" === name) {
						var province = _(vm.provinceList).filter(function(value) {
							return value.code === vm.currentProvinceCode
						})[0],
							city = _(vm.cityList).filter(function(value) {
								return value.code === vm.currentCityCode
							})[0];
						province && (data.province = province.name, vm.baseinfo.province = data.province), city && (data.city = city && city.name ? city.name : "", vm.baseinfo.city = data.city)
					} else "is_show_guide" != name ? data[name] = utils.filterHtmlTag(vm.baseinfo[name]) : data[name] = vm.baseinfo[name];
					if ("name" === name) {
						if (this.testAppName(), this.appNameError) return void utils.error("App名称不符合规范，请修改后再保存");
						$rootScope.global_currentApp.name = data[name]
					}
					appMakeService.updateAppBaseInfo(vm.guid, data).then(function(data) {})
				}
				this.isedit[name] = !this.isedit[name], vm.initDefaultData()
			},
			testAppName: function() {
				vm.appNameError = !/^[\u4E00-\u9FA5a-zA-Z0-9_]+$/.test(vm.baseinfo.name)
			},
			testCopyrightInfo: function() {
				vm.baseinfo.user_copy_right.length > 50 ? vm.CopyrightError = !0 : vm.CopyrightError = !1
			},
			showAppIconPop: function() {
				utils.mdDialog({
					templateUrl: "appcreate/modal/app_icon.html",
					controller: "AppIconCtrl",
					clickOutsideToClose: !0,
					locals: {
						modalParams: {
							appName: vm.app_name,
							guid: vm.guid,
							params: vm.iconParams,
							iconType: "default",
							icon: vm.baseinfo ? vm.baseinfo.icon : ""
						}
					}
				}).then(function(res) {
					res && "success" === res.status && (console.log(res, "图标res"), vm.iconType = res.iconType, vm.baseinfo.icon = res.icon, vm.app_icon_obj = res.icon, vm.app_icon = utils.getImgUrl(res.icon), vm.baseinfo.icon.url = vm.app_icon, vm.iconParams = res.params, $rootScope.global_currentApp.icon = res.icon, vm.updateIcon())
				})
			},
			getAppIconConfig: function(guid) {
				appMakeService.getAppIconConfig(guid).then(function(data) {
					vm._appIconConfig = data.result
				})
			},
			updateIcon: function() {
				if (vm.iconType && vm.baseinfo.icon) {
					var data = {
						icon_type: vm.iconType,
						icon: vm.baseinfo.icon
					};
					appMakeService.updateAppBaseInfo(vm.guid, data).then(function(data) {
						data.error_code ? utils.error("更新图标失败!") : utils.success("更新图标成功!")
					})["catch"](function(resp) {
						utils.error("更新图标失败!")
					})
				}
			},
			showAppStartUpPop: function() {
				utils.mdDialog({
					templateUrl: "appcreate/modal/app_startup.html",
					controller: "AppStartUpCtrl",
					clickOutsideToClose: !0,
					locals: {
						params: {
							systemStartupConfig: appBase.getSystemStartupConfig(),
							systemStartupPic: appBase.getSystemStartupPic(),
							value: vm.startupValue
						}
					}
				}).then(function(res) {
					res && "success" === res.status && (console.log(res, "启动图"), vm.startUpObj = res.value, vm.startupValue = res.value, vm.baseinfo.startup_pic = vm.startupValue.startup_pic, vm.app_start_icon_obj = vm.startUpObj.startup_pic, vm.app_start_icon = utils.getImgUrl(vm.startUpObj.startup_pic), vm.baseinfo.startup_pic.url = vm.app_start_icon, vm.updateStartPic(res.value))
				})
			},
			updateStartPic: function() {
				if (vm.startupValue) {
					var data = vm.startupValue;
					appMakeService.updateAppBaseInfo(vm.guid, data).then(function(data) {
						data.error_code ? utils.error("更新图标失败!") : utils.success("更新启动图成功!")
					})["catch"](function(resp) {
						utils.error("更新图标失败!")
					})
				}
			},
			getGuidePic: function(guid) {
				appMakeService.getGuidePic(guid).then(function(resp) {
					resp.error_code || (vm.guide = vm.guide ? vm.guide : {}, vm.guide.fgImg = _.sortBy(resp.result.guide_picture.front, "sort_order"), vm.guide.bgImg = _.sortBy(resp.result.guide_picture.back, "sort_order"), vm.guide.guide_animation = resp.result.guide_animation, vm.guide.guide_default_color = resp.result.guide_default_color, vm.guide.guide_effect = resp.result.guide_effect, vm.guide.guide_select_color = resp.result.guide_select_color, vm.guide.guide_sign = resp.result.guide_sign)
				})["catch"](function() {
					utils.error("获取引导图失败!")
				})
			},
			showGuidePop: function() {
				var guideModel = utils.mdDialog({
					templateUrl: "appmake/modal/baseinfo/app_guide.html",
					controller: "AppGuideCtrl",
					locals: {
						guidePopData: {
							guide: vm.guide
						}
					}
				});
				guideModel.then(function(res) {
					vm.guide = res.guide, vm.updateGuidePic()
				})
			},
			updateGuidePic: function() {
				var fgpic = this.getIds(vm.guide.fgImg).join(),
					bgpic = this.getIds(vm.guide.bgImg).join(),
					guide = {
						guide_effect: vm.guide.guide_effect || "effect1",
						guide_animation: vm.guide.guide_animation || 0,
						guide_sign: vm.guide.guide_sign,
						guide_default_color: vm.guide.guide_default_color || "#000000",
						guide_select_color: vm.guide.guide_select_color || "#000000",
						guide_fg_picture: fgpic,
						guide_bg_picture: bgpic
					};
				appMakeService.updateAppBaseInfo(vm.guid, guide).then(function(data) {
					data.error_code ? utils.error("更新引导图设置失败!") : utils.success("更新引导图设置成功!")
				})["catch"](function(resp) {
					utils.error("更新引导图设置失败!")
				})
			},
			getIds: function(imgs) {
				return _(imgs).map(function(img, key, imgs) {
					if (img && img.id && img.id) return img.id
				})
			},
			changeProvince: function(provinceValue) {
				appMakeService.getCityList(provinceValue).then(function(resp) {
					vm.cityList = resp.result.city, vm.currentCityCode = vm.cityList[0].code
				})
			},
			getUserDetail: function() {
				var url = config.getAPI("user");
				http(url).then(function(resp) {
					vm.condition = resp.user.rename_android_package
				})
			},
			setAndrioidName: function() {
				if (!(vm.val_01 && vm.val_02 && vm.val_03)) return void utils.error("请填写完整包名！");
				vm.checkAndroidName() ? utils.error("请填写正确格式的包名！") : vm.val_04 ? vm.baseinfo.android_package_name = vm.val_01 + "." + vm.val_02 + "." + vm.val_03 + "." + vm.val_04 : (vm.val_04 = "", vm.baseinfo.android_package_name = vm.val_01 + "." + vm.val_02 + "." + vm.val_03);
				var data = {
					android_package_name: vm.baseinfo.android_package_name
				};
				vm.condition = 0, appMakeService.updateAppBaseInfo(vm.guid, data).then(function(data) {
					data.error_code ? utils.error("包名更新失败!") : utils.success("包名更新成功!")
				})["catch"](function(resp) {
					utils.error("包名更新失败!")
				})
			},
			checkAndroidName: function() {
				var str = /^[a-zA-Z][a-zA-Z0-9]+$/;
				if (vm.val_04) {
					if (!(str.test(vm.val_01) && str.test(vm.val_02) && str.test(vm.val_03) && str.test(vm.val_04))) return !0
				} else if (!str.test(vm.val_01) || !str.test(vm.val_02) || !str.test(vm.val_03)) return !0
			},
			resetSecretkey: function() {
				vm.loading = !1;
				var url = config.getAdminAPI("resetsecretkey").replace("{app_id}", vm.guid);
				http(url, {
					method: "put"
				}).then(function(resp) {
					"0" === resp.error_code ? (utils.success("Secret重置成功"), vm.getBaseInfo(), vm.loading = "complete") : (utils.error(resp.error_message), vm.loading = "complete")
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
			dealIconTypeFlag: function(flag) {
				"A" == flag ? vm.currentSysIconName = "已使用系统图标A" : "B" == flag ? vm.currentSysIconName = "已使用系统图标B" : "C" == flag ? vm.currentSysIconName = "已使用系统图标C" : "diy" == flag ? vm.currentSysIconName = "已使用自定义上传图标" : vm.currentSysIconName = "还没有设置系统图标,赶快去设置吧!"
			},
			sysglobalmodal: function(options) {
				utils.mdDialog(options).then(function(data) {
					return data && data.systemicon_flag ? (vm.systemicon_flag = data.systemicon_flag, void vm.dealIconTypeFlag(vm.systemicon_flag)) : void(data && !$.isEmptyObject(data) && (vm.appinfo = data))
				})
			},
			globalsetting: function() {
				$state.go("mainLayout.baseattr", {
					guid: vm.guid,
					view_id: vm.baseinfo.view_id
				})
			},
			goAppStore: function() {
				$q.all(vm.getStoreInfo.allXhr()).then(function() {
					vm.btnloading = "complate", utils.mdDialog({
						templateUrl: "appmake/myapp/modal/chooseStoreModal.html",
						controller: "chooseStoreWay",
						clickOutsideToClose: !0,
						locals: {
							data: {
								buyInfo: vm.buyAppStoreInfo
							}
						}
					}).then(function(res) {
						res && res.way && $state.go("mainLayout.appstore", {
							way: res.way
						})
					})
				})
			},
			getStoreInfo: {
				init: function() {
					vm.nocreateapp = !0, vm.checkapp = !1, vm.buyAppStoreInfo = {}, vm.buyAppStoreInfo = {}
				},
				allXhr: function() {
					var q1 = $q.defer(),
						q2 = $q.defer(),
						q3 = $q.defer(),
						q4 = $q.defer(),
						q5 = $q.defer(),
						q6 = $q.defer(),
						q7 = $q.defer(),
						q8 = $q.defer();
					vm.btnloading = !1, this.getMarketInfo(q1), this.__getMarketInfo(q2), this.getAppStoreInfoIos(q3), this.__getAppStoreInfoIos(q4), this._getAppStoreInfoIos(q5), this.__getAppStoreInfoIos_(q6), this.getAppStoreInfoAnd(q7), this.__getAppStoreInfoAnd(q8);
					var allAjax = [q1.promise, q2.promise, q3.promise, q4.promise, q5.promise, q6.promise, q7.promise, q8.promise];
					return allAjax
				},
				getMarketInfo: function(q) {
					var url = config.getAPI("getstoreinfo.appstoreremain").replace("{client_key}", 2);
					http(url).then(function(data) {
						data && 0 == data.error_code && (vm.buyAppStoreInfo.buy_ios = data.result.remain_times), q.resolve()
					})
				},
				__getMarketInfo: function(q) {
					var _url = config.getAPI("getstoreinfo.appstoreremain").replace("{client_key}", 1);
					http(_url).then(function(data) {
						data && 0 == data.error_code && (vm.buyAppStoreInfo.buy_android = data.result.remain_times), q.resolve()
					})
				},
				getAppStoreInfoIos: function(q) {
					var url = config.getAPI("getstoreinfo.appstoreinfo").replace("{client_key}", 2).replace("{is_self}", 0);
					http(url).then(function(resp) {
						resp && 0 == resp.error_code && (vm.buyAppStoreInfo.iosStatus = resp.result.status), q.resolve()
					})
				},
				__getAppStoreInfoIos: function(q) {
					var _url = config.getAPI("getstoreinfo.appstorerecord").replace("{client_key}", 2).replace("{is_self}", 0);
					http(_url).then(function(resp) {
						resp && 0 == resp.error_code && (vm.buyAppStoreInfo.iosRecord = resp.result), q.resolve()
					})
				},
				_getAppStoreInfoIos: function(q) {
					var url = config.getAPI("getstoreinfo.appstoreinfo").replace("{client_key}", 2).replace("{is_self}", 1);
					http(url).then(function(resp) {
						resp && 0 == resp.error_code && (vm.buyAppStoreInfo.selfIosStatus = resp.result.status), q.resolve()
					})
				},
				__getAppStoreInfoIos_: function(q) {
					var _url = config.getAPI("getstoreinfo.appstorerecord").replace("{client_key}", 2).replace("{is_self}", 1);
					http(_url).then(function(resp) {
						resp && 0 == resp.error_code && (vm.buyAppStoreInfo.selfIosRecord = resp.result), q.resolve()
					})
				},
				getAppStoreInfoAnd: function(q) {
					var url = config.getAPI("getstoreinfo.appstoreinfo").replace("{client_key}", 1).replace("{is_self}", 0);
					http(url).then(function(resp) {
						resp && 0 == resp.error_code && (vm.buyAppStoreInfo.AndStatus = resp.result.status), q.resolve()
					})
				},
				__getAppStoreInfoAnd: function(q) {
					var _url = config.getAPI("getstoreinfo.appstorerecord").replace("{client_key}", 1).replace("{is_self}", 0);
					http(_url).then(function(resp) {
						resp && 0 == resp.error_code && (vm.buyAppStoreInfo.andRecord = resp.result), q.resolve()
					})
				}
			},
			upModule: function(type, action) {
				utils.mdDialog({
					templateUrl: "common/modal/up_module.html",
					controller: "UpModuleCtrl",
					locals: {
						modalParams: {
							type: type,
							action: action,
							key: vm.guid,
							updateId: vm.updateId,
							appIcon: vm.baseinfo.icon.url
						}
					}
				}).then(function(resp) {
					vm.updateId = resp.id
				})
			}
		}), $scope.$on("checkApp", function(event, first_appinfo) {
			var guid = first_appinfo.guid;
			vm.init(guid)
		})
	}])
});