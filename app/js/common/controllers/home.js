"use strict";
define(function(require) {
	var app = require("app"),
		server = require("common/services/server");
	require("appmake/services/appMakeService"), require("appmake/createapp/createAppModal"), require("appmake/createapp/dabaoModal"), require("appmake/directives/create-app"), require("common/directives/blocks/dingdone-app-base-info"), require("common/directives/blocks/dingdone-app-version-info"), require("common/modal/youzanAuthorizeModal"), require("common/directives/dingdone-static"), require("modal/businessOver"), app.controller("HomeCtrl", ["$rootScope", "$scope", "utils", "$state", "$stateParams", "http", "config", "navconfig", "appMakeService", "$timeout", "localStorages", "youzanBindService", "$modal", function($rootScope, $scope, utils, $state, $stateParams, http, config, navconfig, appMakeService, $timeout, localStorages, youzanBindService, $modal) {
		var vm = $scope.vm = {};
		angular.extend(vm, {
			config: config,
			sms_info: {},
			applications: [],
			init: function(appinfo) {
				vm.guid = appinfo.guid, vm.showrelease = !0, vm.showpush = !0, vm.showmember = !0, vm.showcontentcomment = !0, vm.showfeedback = !0, vm.applications.push(config.Appinfo), vm.app_info = vm.appinfo = config.Appinfo, vm.usertype = $rootScope.user.user_type, this.initappmsgcount(), vm.version = server.version, vm.currentView = 1, vm.isbusiness = !0, vm.bigStrSub = 45, vm.smallStrSub = 24, vm.showtipmodal = {
					transition: "all .3s",
					top: "-webkit-calc( ( 100% - 182px ) / 2 )"
				}, vm.watchCurrentScreen(), "ecshop" == vm.version && youzanBindService.getYouzanShopInfo().then(function(resp) {
					resp.error_code || (vm.shopinfo = resp.result.shop_info, vm.shopinfo && !angular.isArray(vm.shopinfo) && "youzancb" == $stateParams.iscallback && (vm.hasshopinfo = !0, localStorages.get("isbindsuccess") || (vm.youzanmodalstyle = vm.showtipmodal)), vm.shopinfo && !angular.isArray(vm.shopinfo) && vm.getYouzanAuth())
				}), vm.initData(), vm.getBusinessInfo(), vm.bindYouzan(), "mainLayout.operateindex" == $rootScope.currentState ? this.statistics.init() : (vm.getPageModelist(), vm.getMessagelist())
			},
			watchCurrentScreen: function() {
				vm.resizeWidth = $(window).width(), vm.resizeWidth > 1440 ? vm.bigScreen = !0 : vm.bigScreen = !1, $rootScope.$broadcast("staticToAutoSize", vm.bigScreen), $(window).resize(function(ev) {
					$scope.$apply(function() {
						vm.resizeWidth = ev.target.innerWidth
					})
				}), $scope.$watch("vm.resizeWidth", function(newval, oldval) {
					newval > 1440 ? (vm.bigScreen = !0, vm.initLargeSrceenData()) : (vm.bigScreen = !1, vm.initSmallSrceenData()), $rootScope.$broadcast("staticToAutoSize", vm.bigScreen)
				})
			},
			initLargeSrceenData: function() {
				vm.businessLeft = {
					transition: "left 0.2s linear",
					left: 0
				}, vm.developLeft = {
					transition: "left 0.2s linear",
					left: "100%"
				}, vm.initTempleatePos(), vm.modelWidth = 191, vm.currentView = 1
			},
			initSmallSrceenData: function() {
				vm.selectTab("business"), vm.initTempleatePos(), vm.modelWidth = 160, vm.currentView = 1
			},
			toPay: function() {
				vm.businessinfo && angular.isArray(vm.businessinfo) && $state.go("mainLayout.noBusinessAuth"), vm.businessinfo && !angular.isArray(vm.businessinfo) && 0 == vm.businessinfo.is_confirm_pay && $state.go("mainLayout.noBuyBusinessAuth"), vm.businessinfo && !angular.isArray(vm.businessinfo) && 1 == vm.businessinfo.is_confirm_pay && $state.go("mainLayout.businessAuth")
			},
			subMessageString: function(obj, subStrCount) {
				for (var i = 0; i < obj.length; i++) obj[i].version = "3.0." + (obj.length - i), obj[i].title.length > subStrCount ? (obj[i].title = obj[i].title.substr(0, subStrCount), obj[i].showdot = !0) : obj[i].showdot = !1
			},
			getMessagelist: function() {
				var url = (vm.bigScreen ? vm.bigStrSub : vm.smallStrSub, config.getAPI("messagelist"));
				http(url).then(function(data) {
					if (data && data.notice && data.notice.length && (vm.messagelist = data.notice), !data.notice.length && console.log("公告没有返回数据"), vm.messagelist) {
						for (var i = 0; i < vm.messagelist.length; i++) vm.messagelist[i].version = "1.0." + (vm.messagelist.length - i);
						angular.forEach(vm.messagelist, function(model) {
							model.create_at = utils.formatDate(model.create_at, "YYYY-MM-DD hh:mm")
						})
					}
				})
			},
			bindYouzan: function() {
				var url = config.getAdminAPI("getyouzantoken") + "?redirect_uri=" + server.host + "index/youzancb";
				vm.bindurl = url
			},
			getQueryString: function() {
				var url = window.location.search,
					theRequest = new Object,
					strs = [];
				if (url.indexOf("?") != -1) {
					var str = url.substr(1);
					strs = str.split("&");
					for (var i = 0; i < strs.length; i++) theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1])
				}
				vm.error_code = theRequest.error_code
			},
			initData: function() {
				vm.getQueryString(), 1007 != vm.error_code && 1005 != vm.error_code || (vm.youzanmodalstyle = vm.showtipmodal)
			},
			getBusinessInfo: function() {
				appMakeService.getBusiness().then(function(resp) {
					!resp.error_code && resp.result && (vm.businessinfo = resp.result)
				})
			},
			getYouzanAuth: function() {
				appMakeService.getYouzanAuth().then(function(resp) {
					if ("0" === resp.error_code && resp.result && (vm.youzaninfo = resp.result, vm.now = Date.parse(new Date), vm.youzaninfo && vm.youzaninfo.expireTime && (vm.overdue_time = vm.youzaninfo.expireTime - vm.now, vm.overdue_time <= 1296e6))) {
						var now = Date.parse(new Date),
							time = localStorage.getItem("time");
						if (time) {
							var val = now - time;
							val >= 864e8 && vm.showYouzanModal()
						} else vm.showYouzanModal()
					}
				})
			},
			showYouzanModal: function() {
				$modal.open({
					animateanimation: !0,
					size: 560,
					templateUrl: "common/modal/youzanAuthorizeModal.html",
					controller: "youzanAuthModalCtrl"
				})
			},
			initHelperPerm: function(navlist) {
				var keyarray = [],
					nameArray = [];
				1 == vm.usertype && (angular.forEach(navlist, function(val, key) {
					keyarray.push(key), val && val.modules && angular.isArray(val.modules) && val.modules.length && angular.forEach(val.modules, function(value) {
						nameArray.push(value.name)
					})
				}), vm.showrelease = keyarray.indexOf("content") > -1, vm.showpush = nameArray.indexOf("推送消息") > -1, vm.showmember = nameArray.indexOf("会员管理") > -1, vm.showcontentcomment = nameArray.indexOf("评论管理") > -1, vm.showfeedback = nameArray.indexOf("意见反馈") > -1)
			},
			initappmsgcount: function() {
				var url = config.getAPI("getappmessage");
				http(url).then(function(data) {
					vm.sms_count = data.result.sms_count
				})["catch"](function() {})
			},
			message_recharge: function() {
				var sms_url = config.getAPI("getsms"),
					plat = "dingdone",
					channel = server.service_store_channel,
					appid = vm.guid,
					host = server.host.split("//")[1],
					back_pathname = "operateindex/",
					store_pathname = "/client/message";
				vm.loading = !1, http(sms_url, {
					method: "GET"
				}).then(function(res) {
					if (console.log("res", res), 0 === res.error_code) {
						if (res.result && angular.isObject(res.result)) return res.result.data[0];
						throw new Error("短信商品返回的数据result为空")
					}
					utils.error(res.error_message)
				}).then(function(result) {
					if (null == result.id) throw new Error("短信商品数据缺少id参数值");
					if (null == result.type) throw new Error("短信商品数据缺少type参数值");
					return {
						id: result.id,
						type: result.type
					}
				}).then(function(options) {
					var user_url = config.getAPI("verify_withdraw_cash_mod");
					http(user_url, {
						method: "GET"
					}).then(function(res) {
						if (vm.loading = "complete", !res.user || null == res.user.user_id) throw new Error("获取用户信息失败");
						var _sms_url = server.service_store_url + store_pathname + "?plat=" + plat + "&channel=" + channel + "&product_type=" + options.type + "&product_id=" + options.id + "&user_id=" + res.user.user_id + "&appid=" + appid + "&backUrl=" + host + back_pathname;
						console.log("短信商城地址 >>>", _sms_url), window.location = _sms_url
					})
				})
			},
			hideBindYouzanModal: function() {
				vm.youzanmodalstyle = {
					transition: "all .3s",
					top: "-182px"
				}
			},
			getPageModelist: function() {
				var url = config.getAPI("template_system.productlist").replace("{type}", "page");
				http(url).then(function(data) {
					!+data.error_code && data.result && (vm.latestTemplates = data.result.data, vm.initTempleatePos(vm.latestTemplates))
				})
			},
			initTempleatePos: function(templateArr) {
				templateArr && templateArr.length && (angular.forEach(templateArr, function(item, index) {
					vm.latestTemplates.push(item)
				}), $(".template-contant-item").css("width", templateArr.length * vm.modelWidth)), $(".template-contant-item").css({
					transition: "all 0.3s linear",
					position: "absolute",
					top: 0,
					left: 0
				})
			},
			tabCurrentMode: function(dir) {
				vm.latestTemplates.length && "left" == dir ? ($(".template-contant-item").css({
					transition: "all 0.3s linear",
					left: -(vm.currentView * vm.modelWidth) + "px"
				}), vm.currentView++, vm.currentView > vm.latestTemplates.length / 2 && (vm.currentView = 1, $(".template-contant-item").css({
					transition: "none",
					left: 0
				}))) : vm.latestTemplates.length && "right" == dir && (--vm.currentView, vm.currentView <= 0 ? (vm.currentView = vm.latestTemplates.length - 3, $(".template-contant-item").css({
					transition: "none",
					left: -((vm.currentView - 1) * vm.modelWidth) + "px"
				})) : $(".template-contant-item").css({
					transition: "all 0.3s linear",
					left: -((vm.currentView - 1) * vm.modelWidth) + "px"
				}))
			},
			statistics: {
				url: "",
				data: {},
				init: function() {
					this.info_url = config.getAPI("getAddUntreatedInfo"), this.statistic_url = config.getAPI("getStatisticSummary"), this.activity_url = config.getAPI("getActivateSummary"), this.getAddUntreatedInfo(), this.getStatisticInfo("total"), this.getStatisticInfo("yesterday"), this.getActivateInfo("yesterday")
				},
				getAddUntreatedInfo: function() {
					http(this.info_url).then(function(resp) {
						resp && !+resp.error_code && (vm.statistics.member = resp.result.member, vm.statistics.comment = resp.result.comment, vm.statistics.feedback = resp.result.feedback, vm.statistics.report = resp.result.report)
					})["catch"](function() {})
				},
				getStatisticInfo: function(type) {
					http(this.statistic_url, {
						method: "get",
						params: {
							data_type: type
						}
					}).then(function(res) {
						0 == res.error_code && "success" == res.error_message && (vm.statistics["sta_" + type] = res.result.nums)
					})["catch"](function() {})
				},
				getActivateInfo: function(type) {
					http(this.activity_url, {
						method: "get",
						params: {
							data_type: type
						}
					}).then(function(res) {
						0 == res.error_code && "success" == res.error_message && (vm.statistics["act_" + type] = res.result.nums)
					})["catch"](function() {})
				}
			},
			updateApp: function(key, value) {
				var isopen = +value ? 0 : 1,
					obj = {};
				obj[key] = isopen, vm.updateAppLoading = !1, appMakeService.updateAppBaseInfo(vm.guid, obj).then(function(data) {
					data.error_code || (vm.app_info.open_mobile_register = isopen), vm.updateAppLoading = "complete"
				})["catch"](function() {
					vm.updateAppLoading = "fail"
				})
			},
			linkgo: function(type) {
				  "video" === type && (url = "http://www.haopintui.net/doc.php?id=4")
				, "share" === type && (url = "http://www.haopintui.net/doc.php?id=4")
				, "fair" === type && (url = "http://www.haopintui.net/doc.php?id=4")
				, "mall" === type && (url = "http://www.haopintui.net/doc.php?id=4")
				, window.open(url, "_blank")
			},
			selectTab: function(flag) {
				vm.isbusiness = "business" === flag, vm.isbusiness ? (vm.businessLeft = {
					transition: "left 0.2s linear",
					left: 0
				}, vm.developLeft = {
					transition: "left 0.2s linear",
					left: "100%"
				}) : (vm.businessLeft = {
					transition: "left 0.2s linear",
					left: "-100%"
				}, vm.developLeft = {
					transition: "left 0.2s linear",
					left: 0
				})
			}
		}), $scope.$on("checkApp", function(event, first_appinfo) {
			vm.init(first_appinfo)
		}), $scope.$on("helper_navlist", function(event, navlist) {
			vm.initHelperPerm(navlist)
		}), $scope.$on("selectcurrentmode", function(event, $modelinfo) {
			vm.currentMode = A.copy($modelinfo)
		})
	}])
});