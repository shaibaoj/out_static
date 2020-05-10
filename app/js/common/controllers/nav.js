"use strict";
define(function(require) {
	var app = require("app"),
		server = require("common/services/server");
	require("common/services/modelService"), 
//	require("common/directives/dingdone-helper"), 
	require("common/directives/margin-top"), 
	require("common/directives/dingdone-nav"), app.controller("NavCtrl", ["$rootScope", "$state", "$scope", "navconfig", "$window", "$mdDialog", "http", "config", "modelService", "utils", "$timeout", function($rootScope, $state, $scope, navconfig, $window, $mdDialog, http, config, modelService, utils, $timeout) {
		function dealDynamicMenusSelect(modelList, info) {
			var tempArr = [],
				childs = [];
			return angular.forEach(modelList, function(item, index) {
				item.all_visible && tempArr.push(item.id)
			}), childs = tempArr, $rootScope.isFirstShowContent && (angular.forEach(childs, function(item, index) {
				$state.params.model_id == item && (info.son = childs[index])
			}), $rootScope.isFirstShowContent = !1), childs
		}
		var vm = $scope.vm = {};
		angular.extend(vm, {
			utils: utils,
			version: server.version,
			currentmode: ""
		}), $scope.init = function() {
			$scope.initData()
		}, $scope.initData = function() {
			function initData() {
				"operate" == mode ? (vm.navmenus = temp_obj.operate_arr, $rootScope.currentmode = vm.currentmode = "operate") : (vm.navmenus = temp_obj.design_arr, $rootScope.currentmode = vm.currentmode = "design"), $scope.initPermission()
			}
			var mode = "",
				temp_obj = {
					design_arr: {},
					operate_arr: {}
				},
				breadcrumbObj = navconfig.breadcrumb[$state.current.name];
			angular.forEach(navconfig.navmenus, function(item) {
				item.router_state && item.router_state === $state.current.name && (mode = item.mode), "" == item.router_state || item.href || ("mainLayout.module" == item.router_state ? item.href = $state.href(item.router_state, {
					type: ""
				}) : item.href = $state.href(item.router_state)), "design" == item.mode && (temp_obj.design_arr[item.unique] = item), "operate" == item.mode && (temp_obj.operate_arr[item.unique] = item)
			}), mode || (mode = vm.currentmode), breadcrumbObj && breadcrumbObj.groupkey && !breadcrumbObj.dynamicHomeGroupKey && (mode = navconfig.navmenus[breadcrumbObj.groupkey].mode), void 0 == vm.navmenus ? initData() : mode != vm.currentmode && (vm.navmenus = {}, $timeout(initData, 400), vm.isFirst = !0), $scope.isNewSocial(), $rootScope.$broadcast("selectcurrentmode", mode)
		}, $scope.focus = !1, $scope.isNewSocial = function() {
			"mainLayout.mxucommunity" == $state.current.name ? $rootScope.isNewSocial = !0 : $rootScope.isNewSocial = !1
		}, $scope.goNewWindow = function(menu) {
			menu.currentwindow ? window.location.href = menu.href : window.open(menu.href)
		}, $scope.previewHelper = function() {
			$mdDialog.show({
				controller: "ModalPreviewHelper",
				templateUrl: "appmake/modal/preview_helper.html",
				clickOutsideToClose: !0,
				openFrom: "#preview",
				closeTo: "#preview"
			})
		}, $scope.toggle = function() {
			$scope.extend = !$scope.extend, $rootScope.extend = $scope.extend, $rootScope.$broadcast("navcollapse", $rootScope.extend)
		}, $scope.showAppList = function() {
			$scope.isshowapplist = !$scope.isshowapplist
		}, $scope.homeJump = function(currentmode) {
			"design" == currentmode ? $state.go("mainLayout.index") : $state.go("mainLayout.operateindex")
		}, $scope.open = function(menu) {
			$scope.extend && ($scope.extend = !1)
		}, $scope.hover = function(menu) {}, $scope.mouse_enter = function(menu) {
			menu.hoverState = !0
		}, $scope.mouse_leave = function(menu) {
			menu.hoverState = !1
		}, $scope.refresh = function(menu) {
			console.log(menu, "menu"), menu.state ? 0 == ("." + $state.$current.url.sourcePath).indexOf(menu.href) ? $state.reload() : $state.go(menu.state) : $state.reload()
		}, $scope.initVersion = function() {
			var version = server.version || "normal";
			switch (version) {
			case "normal":
				delete vm.navmenus.medium, delete vm.navmenus.ecshop;
				break;
			case "medium":
				delete vm.navmenus.ecshop, delete vm.navmenus.xiuzanmake;
				break;
			case "ecshop":
				delete vm.navmenus.medium, delete vm.navmenus.xiuzanmake
			}
		}, $scope.getCodeNameMiddleKey = function(codename) {
			var middlekeyarray = codename.split("_"),
				len = middlekeyarray.length,
				key = "";
			return 3 == len && (key = middlekeyarray[1]), len >= 4 && (key = middlekeyarray[2]), key
		}, $scope.getCodenameLastKey = function(codename) {
			var keyarray = codename.split("_"),
				len = keyarray.length,
				lastkey = "";
			return lastkey = keyarray[len - 1]
		}, $scope.openClick = function() {
			$scope.$broadcast("openClick", !0)
		}, $scope.initPermission = function() {
			if ($scope.userinfo = $rootScope.user, $scope.navinfo = navconfig.permmapping, $scope.navgroupinfo = vm.navmenus, 1 == $scope.userinfo.user_type && angular.isArray($scope.userinfo.permissions) && $scope.userinfo.permissions.length) {
				$scope.permissions = $scope.userinfo.permissions;
				var permnavconfig = {},
					childperm = {};
				angular.forEach($scope.permissions, function(val) {
					angular.forEach($scope.navinfo, function(value, key) {
						var middlekey = $scope.getCodeNameMiddleKey(val),
							lastkey = $scope.getCodenameLastKey(val);
						middlekey == key && (permnavconfig[value] = value), childperm[lastkey] = lastkey
					})
				}), angular.forEach($scope.navgroupinfo, function(val, key) {
					if ("home" != key && "content" != key) if (permnavconfig[key]) {
						var childnavlist = [];
						angular.forEach(val.modules, function(item, currentkey) {
							item.currentunique = navconfig.permchildmapping[item.unique], childperm[item.currentunique] && childnavlist.push(item)
						}), val.modules = childnavlist, console.info(val.modules, "val.modules")
					} else delete vm.navmenus[key];
					"content" == key && angular.isArray(val.modules) && !val.modules.length && delete vm.navmenus[key]
				});
				var navlist = vm.navmenus;
				$rootScope.$broadcast("helper_navlist", navlist)
			}
			1 == $scope.userinfo.user_type && angular.isArray($scope.userinfo.permissions) && !$scope.userinfo.permissions.length && angular.forEach($scope.navgroupinfo, function(val, key) {
				"home" != key && delete vm.navmenus[key]
			})
		}, $scope.initContentNav = function(modellist, callback) {
			var contentState = "mainLayout.contentlist";
			navconfig.navmenus.content.childs = [], navconfig.navmenus.ecshop.childs = [], angular.forEach(modellist, function(model, key) {
				$.inArray(model.slug, _.pluck(config.mediumType, "key")) == -1 && "program" != model.slug && (navconfig.navmenus[model.id] = {
					name: model.name,
					unique: model.id,
					router_state: contentState,
					href: $state.href(contentState, {
						model_id: model.id
					}),
					isgroup: !1,
					mode: "operate",
					main_show: !1,
					breadcrumb: [{
						name: model.name,
						active: !0
					}]
				}, model.is_ecommerce ? navconfig.navmenus.ecshop.childs.push(model.id) : navconfig.navmenus.content.childs.push(model.id))
			}), $scope.isShowEshopMenu(navconfig.navmenus.ecshop.childs), angular.isFunction(callback) && callback()
		}, $scope.isShowEshopMenu = function(ecshoparr) {
			if (0 == ecshoparr.length) {
				var uniqueArr = ["ecshop", "ordermanager", "marketing"];
				angular.forEach(uniqueArr, function(item, index) {
					navconfig.navmenus[item].main_show = !1
				})
			}
		}, $rootScope.sumarg_thumb_over = function() {
			$rootScope.show_sumarg_thumb = !1, $rootScope.$broadcast("hide_sumarg_thumb", !0)
		}, $rootScope.$on("show_sumarg_thumb", function(event, info) {
			$rootScope.show_sumarg_thumb = info
		}), $rootScope.sonnavbarSelect = function(item, index) {
			item.unique && ($rootScope.issonnavbarselect = item.unique)
		}, $rootScope.openBuyBusiness = function() {
//			location.href = "http://www.haopintui.net/user_info.php?action=user&mod=service&type=cms_maijia&id=16";
//			var _url = config.getAPI("template_system.productlist").replace("{type}", "app_subscribe") + "?product_type=app_subscribe";
//			http(_url).then(function(json) {
//				var result = json.result.data[0],
//					productId = result.id,
//					productType = result.type,
//					userId = $rootScope.userId,
//					appId = $rootScope.global_currentApp.guid,
//					url = server.service_store_url + "/client/purchase?plat=dingdone&channel=" + server.service_store_channel + "&product_type=" + productType + "&product_id=" + productId + "&user_id=" + userId + "&appid=" + appId + "&backUrl=" + location.href.split("http://")[1];
//				location.href = url
//			})
		}, $scope.$on("model_broadcast", function(event, modelinfo) {
			$rootScope.copyNavconfig = $rootScope.copyNavconfig || angular.copy(navconfig), $scope.initContentNav(modelinfo), $scope.init()
		}), $rootScope.sonNavmenuLoading = !1, $rootScope.changeContentPadding = !0, $rootScope.isFirstShowContent = !0, $rootScope.$on("show_sonnavbar", function(event, info) {
			var menu = info.menu,
				key = info.key,
				navdata = [],
				modelList = $rootScope.contentMenuList;
			if (menu && menu.childs) if (key == menu.childs[0] || 0 == menu.childs.length) $rootScope.isshownavbar = !1;
			else if (menu.childs.length > 0) {
				if ("mainLayout.contentcategory" == $state.current.name) return void($rootScope.isshownavbar = !1);
				if ($rootScope.isshownavbar = !0, "content" == key) {
					var childs = dealDynamicMenusSelect(modelList.normalmodel, info);
					menu.childs = childs
				} else if ("ecshop" == key) {
					var _childs = dealDynamicMenusSelect(modelList.shopmodel, info);
					menu.childs = _childs
				}
				angular.forEach(menu.childs, function(val, index) {
					navdata.push(navconfig.navmenus[val])
				}), $rootScope.sonnavtitle = menu.name, $rootScope.sonnavdata = navdata, info.son && $rootScope.sonnavbarSelect(navconfig.navmenus[info.son])
			}
			$rootScope.sonNavmenuLoading = "complete"
		})
	}])
});