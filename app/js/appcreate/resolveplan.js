"use strict";
define(function(require) {
	var app = require("app");
	require("common/services/server");
	require("appmake/services/appMakeService"), app.controller("ResolvePlan", ["$rootScope", "$scope", "$modal", "$timeout", "$state", "$stateParams", "utils", "config", "http", "$mdDialog", "appMakeService", function($rootScope, $scope, $modal, $timeout, $state, $stateParams, utils, config, http, $mdDialog, appMakeService) {
		var vm = $scope.vm = {};
		angular.extend(vm, {
			config: {
				shop: {
					ability: [{
						logo: "shop_pic1",
						content: ["视觉界面任意搭建"]
					}, {
						logo: "shop_pic2",
						content: ["跨行业商品任意定义"]
					}, {
						logo: "shop_pic3",
						content: ["统一会员体系"]
					}, {
						logo: "shop_pic4",
						content: ["实用营销工具"]
					}, {
						logo: "shop_pic5",
						content: ["订单/库存/评价", "统一管理"]
					}, {
						logo: "shop_pic6",
						content: ["快速集成其他能力"]
					}],
					scene: [{
						logo: "shop_scene_pic1",
						content: ["构建自有电商平台", "用户不再受制于人"]
					}, {
						logo: "shop_scene_pic2",
						content: ["支持全终端购买下单", "多入口一网打尽"]
					}, {
						logo: "shop_scene_pic3",
						content: ["满减/优惠券/储值/限时折扣", "营销工具推陈出新"]
					}],
					trade: [{
						logo: "shop_trade_pic1",
						content: ["垂直类电商"]
					}, {
						logo: "shop_trade_pic2",
						content: ["内容电商/社交电商"]
					}, {
						logo: "shop_trade_pic3",
						content: ["生鲜电商"]
					}, {
						logo: "shop_trade_pic4",
						content: ["电商导购平台"]
					}, {
						logo: "shop_trade_pic5",
						content: ["餐饮外卖"]
					}, {
						logo: "shop_trade_pic6",
						content: ["超市/便利店/百货"]
					}]
				},
				community: {
					ability: [{
						logo: "community_pic1",
						content: ["视觉界面任意搭建"]
					}, {
						logo: "community_pic2",
						content: ["多种社区形态玩法"]
					}, {
						logo: "community_pic3",
						content: ["内容格式自主定义"]
					}, {
						logo: "community_pic4",
						content: ["兼容单双向好友关系"]
					}, {
						logo: "community_pic5",
						content: ["支持私聊/群聊/聊天室"]
					}, {
						logo: "community_pic6",
						content: ["集成支付/电商能力"]
					}],
					scene: [{
						logo: "community_scene_pic1",
						content: ["轻社区:撷取微小场景", "沉淀碎片内容"]
					}, {
						logo: "community_scene_pic2",
						content: ["本地社区:构建本地生活圈", "贯穿线上与线下"]
					}, {
						logo: "community_scene_pic3",
						content: ["垂直社区:吸引志趣相投的用户", "打造垂直社群生态"]
					}],
					trade: [{
						logo: "community_trade_pic1",
						content: ["校园/社团"]
					}, {
						logo: "community_trade_pic2",
						content: ["地方门户/本地生活"]
					}, {
						logo: "community_trade_pic3",
						content: ["社会组织"]
					}, {
						logo: "community_trade_pic4",
						content: ["兴趣领域"]
					}, {
						logo: "community_trade_pic5",
						content: ["垂直行业"]
					}]
				},
				"class": {
					ability: [{
						logo: "class_pic1",
						content: ["视觉界面任意搭建"]
					}, {
						logo: "class_pic2",
						content: ["涵盖图文影音/直播", "等内容形态"]
					}, {
						logo: "class_pic3",
						content: ["内置单品/专栏/会员", "各种付费形式"]
					}, {
						logo: "class_pic4",
						content: ["内容商品支持试读", "试听试看"]
					}, {
						logo: "class_pic5",
						content: ["多种营销工具支持"]
					}, {
						logo: "class_pic6",
						content: ["全渠道学员数据", "跟踪分析"]
					}],
					scene: [{
						logo: "class_scene_pic1",
						content: ["面向教育培训行业", "打造全栈移动课堂"]
					}, {
						logo: "class_scene_pic2",
						content: ["为知识生产者提供", "内容变现渠道"]
					}, {
						logo: "class_scene_pic3",
						content: ["建立私密知识社群", "转化内容价值"]
					}],
					trade: [{
						logo: "class_trade_pic1",
						content: ["教育培训类"]
					}, {
						logo: "class_trade_pic2",
						content: ["企业内部培训"]
					}, {
						logo: "class_trade_pic3",
						content: ["内容创业者"]
					}, {
						logo: "class_trade_pic4",
						content: ["情感/职场/励志/理财"]
					}, {
						logo: "class_trade_pic5",
						content: ["付费音/视频类"]
					}, {
						logo: "class_trade_pic6",
						content: ["自媒体个人/团队"]
					}]
				}
			},
			init: function() {
				vm.loading = "init", vm.type = $stateParams.type, vm.getmodulelist()
			},
			getmodulelist: function() {
				vm.loading = !1;
				var params = "";
				params = "shop" == vm.type ? "dianshang" : "community" == vm.type ? "shequ" : "fufeineirong";
				var url = config.getAPI("template_system.productlist").replace("{type}", "app") + "&tags=" + params;
				http(url).then(function(resp) {
					vm.modulelist = resp.result.data, vm.loading = "complete"
				})
			},
			typechange: function(type) {
				$state.go("resolveplan", {
					type: type
				})
			}
		}), vm.init()
	}])
});