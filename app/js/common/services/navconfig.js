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
	var _breadcrumb, app = require("app"),
		server = require("./server");
	server.host;
	app.constant("navconfig", {
		navmenus: {
			operatehome: {
				unique: "operatehome",
				name: "主页",
				isgroup: !1,
				router_state: "mainLayout.operateindex",
				mode: "operate",
				main_show: !0,
				childs: ["operatehome"]
			},
			content: {
				unique: "content",
				name: "数据",
				isgroup: !0,
				router_state: "",
				mode: "operate",
				main_show: !0,
				childs: []
			},
			ecshop: {
				unique: "ecshop",
				name: "商品",
				isgroup: !0,
				router_state: "",
				mode: "operate",
				main_show: !0,
				childs: []
			},
			goodmanage: {
				unique: "goodmanage",
				name: "商品管理",
				isgroup: !1,
				router_state: "mainLayout.goodslist",
				mode: "operate",
				main_show: !1
			},
			ordermanager: {
				unique: "ordermanager",
				name: "订单",
				isgroup: !0,
				router_state: "mainLayout.normalshoporderlist",
				mode: "operate",
				main_show: !0,
				childs: ["ordersituation", "ordermanage", "assessmanage"]
			},
			ordersituation: {
				unique: "ordersituation",
				name: "订单概况",
				isgroup: !1,
				router_state: "mainLayout.ordersituation",
				mode: "operate",
				main_show: !1
			},
			ordermanage: {
				unique: "ordermanage",
				name: "订单管理",
				isgroup: !1,
				router_state: "mainLayout.orderlist",
				mode: "operate",
				main_show: !1
			},
			assessmanage: {
				unique: "assessmanage",
				name: "评价管理",
				isgroup: !1,
				router_state: "mainLayout.assesslist",
				mode: "operate",
				main_show: !1
			},
			freightmanage: {
				unique: "freightmanage",
				name: "运费模板",
				isgroup: !1,
				router_state: "mainLayout.postcostlist",
				mode: "operate",
				main_show: !1
			},
			marketing: {
				unique: "marketing",
				name: "营销",
				isgroup: !1,
				router_state: "",
				mode: "operate",
				main_show: !0,
				childs: ["fullbenefit", "coupon", "limitdiscount"]
			},
			marketingtools: {
				unique: "marketingtools",
				name: "营销工具",
				isgroup: !1,
				router_state: "mainLayout.marketingtools",
				mode: "operate",
				main_show: !1
			},
			fullbenefit: {
				unique: "fullbenefit",
				name: "满减",
				isgroup: !1,
				router_state: "mainLayout.fullbenefit",
				mode: "operate",
				main_show: !1
			},
			coupon: {
				unique: "coupon",
				name: "优惠券",
				isgroup: !1,
				router_state: "mainLayout.coupon",
				mode: "operate",
				main_show: !1
			},
			limitdiscount: {
				unique: "limitdiscount",
				name: "限时折扣",
				isgroup: !1,
				router_state: "mainLayout.discount",
				mode: "operate",
				main_show: !1
			},
			member: {
				unique: "member",
				name: "会员",
				isgroup: !0,
				router_state: "",
				mode: "operate",
				main_show: !0,
				childs: ["allmember", "membergroup", "setting", "invite", "subscibe", "blacklist", "extendmanage"]
			},
			allmember: {
				unique: "allmember",
				name: "全部会员",
				isgroup: !1,
				router_state: "mainLayout.allmember",
				mode: "operate",
				main_show: !1
			},
			membergroup: {
				unique: "membergroup",
				name: "会员组",
				isgroup: !1,
				router_state: "mainLayout.membergroup",
				mode: "operate",
				main_show: !1
			},
			setting: {
				unique: "setting",
				name: "会员设置",
				isgroup: !1,
				router_state: "mainLayout.setting",
				mode: "operate",
				main_show: !1
			},
			invite: {
				unique: "invite",
				name: "邀请新会员",
				isgroup: !1,
				router_state: "mainLayout.invite",
				mode: "operate",
				main_show: !1
			},
			subscibe: {
				unique: "subscibe",
				name: "订阅组",
				isgroup: !1,
				router_state: "mainLayout.subscibe",
				mode: "operate",
				main_show: !1
			},
			blacklist: {
				unique: "blacklist",
				name: "黑名单",
				isgroup: !1,
				router_state: "mainLayout.blacklist",
				mode: "operate",
				main_show: !1
			},
			extendmanage: {
				unique: "extendmanage",
				name: "扩展信息",
				isgroup: !1,
				router_state: "mainLayout.extendmanage",
				mode: "operate",
				main_show: !1
			},
			"function": {
				unique: "function",
				name: "功能",
				isgroup: !0,
				router_state: "",
				mode: "operate",
				main_show: !0,
				childs: ["groupmanagecomment", "shake", "aboutus", "integral", "message"]
			},
			interactivecommunity: {
				unique: "interactivecommunity",
				name: "微社区",
				isgroup: !1,
				router_state: "mainLayout.communitylist",
				mode: "operate",
				main_show: !1
			},
			message: {
				unique: "message",
				name: "广告投放",
				isgroup: !1,
				router_state: "mainLayout.message",
				mode: "operate",
				main_show: !1
			},
			groupmanagecomment: {
				unique: "groupmanagecomment",
				name: "系统群管理",
				isgroup: !1,
				router_state: "mainLayout.groupmanagelist",
				mode: "operate",
				main_show: !1
			},
			shake: {
				unique: "shake",
				name: "摇一摇",
				isgroup: !1,
				router_state: "mainLayout.shake",
				mode: "operate",
				main_show: !1
			},
			aboutus: {
				unique: "aboutus",
				name: "关于我们",
				isgroup: !1,
				router_state: "mainLayout.aboutus",
				mode: "operate",
				main_show: !1
			},
			integral: {
				unique: "integral",
				name: "会员储值",
				isgroup: !1,
				router_state: "mainLayout.integral",
				mode: "operate",
				main_show: !1
			},
			newmessage: {
				unique: "newmessage",
				name: "消息",
				isgroup: !0,
				router_state: "",
				mode: "operate",
				main_show: !0,
				childs: ["push", "contentcomment", "feedback"]
			},
			push: {
				unique: "push",
				name: "App推送",
				isgroup: !1,
				router_state: "mainLayout.pushmessage",
				mode: "operate",
				main_show: !1
			},
			contentcomment: {
				unique: "contentcomment",
				name: "评论审核",
				isgroup: !1,
				router_state: "mainLayout.commentlist",
				mode: "operate",
				main_show: !1
			},
			report: {
				unique: "report",
				name: "举报管理",
				isgroup: !1,
				router_state: "mainLayout.report",
				mode: "operate",
				main_show: !1
			},
			feedback: {
				unique: "feedback",
				name: "意见反馈",
				isgroup: !1,
				router_state: "mainLayout.feedback",
				mode: "operate",
				main_show: !1
			},
			cloundfrom: {
				unique: "cloundfrom",
				name: "云表单",
				isgroup: !1,
				router_state: "mainLayout.xiuzanfeedback",
				mode: "operate",
				main_show: !1
			},
			cloundques: {
				unique: "cloundques",
				name: "云问卷",
				isgroup: !1,
				router_state: "mainLayout.xiuzansurvey",
				mode: "operate",
				main_show: !1
			},
			cloundpage: {
				unique: "cloundpage",
				name: "云单页",
				isgroup: !1,
				router_state: "mainLayout.xiuzanmarketing",
				mode: "operate",
				main_show: !1
			},
			interactivemember: {
				unique: "interactivemember",
				name: "会员",
				isgroup: !1,
				router_state: "mainLayout.memberlist",
				mode: "operate",
				main_show: !1
			},
			contentcontribute: {
				unique: "contentcontribute",
				name: "投稿",
				isgroup: !1,
				router_state: "mainLayout.contribute",
				mode: "operate",
				main_show: !1
			},
			naviconreplace: {
				unique: "naviconreplace",
				name: "导航图标更换",
				isgroup: !1,
				router_state: "mainLayout.iconmanage",
				mode: "operate",
				main_show: !1
			},
			makehome: {
				unique: "makehome",
				name: "主页",
				isgroup: !1,
				router_state: "mainLayout.index",
				mode: "design",
				main_show: !0,
				childs: []
			},
			appbase: {
				unique: "appbase",
				name: "App信息",
				isgroup: !1,
				router_state: "mainLayout.appbase",
				mode: "design",
				main_show: !0,
				childs: []
			},
			pagemange: {
				unique: "pagemange",
				name: "页面管理",
				isgroup: !1,
				router_state: "mainLayout.module",
				mode: "design",
				main_show: !0,
				childs: []
			},
			funcmode: {
				unique: "funcmode",
				name: "功能模块",
				isgroup: !1,
				router_state: "mainLayout.funModule",
				mode: "design",
				main_show: !0,
				childs: []
			},
			datalist: {
				unique: "datalist",
				name: "数据表",
				isgroup: !1,
				router_state: "mainLayout.contentmodel",
				mode: "design",
				main_show: !0,
				childs: []
			},
			trigger: {
				unique: "trigger",
				name: "触发器",
				isgroup: !1,
				router_state: "mainLayout.triggerlist",
				mode: "design",
				main_show: !0,
				childs: []
			},
			appglobel: {
				unique: "appglobel",
				name: "第三方",
				isgroup: !1,
				router_state: "mainLayout.thirdassess",
				mode: "design",
				main_show: !0,
				childs: []
			},
			shopping: {
				unique: "shopping",
				name: "我的模板",
				isgroup: !1,
				router_state: "mainLayout.tempbuyrecord",
				mode: "design",
				main_show: !0,
				childs: []
			},
			appstore: {
				unique: "appstore",
				name: "App上架",
				isgroup: !1,
				router_state: "mainLayout.appstoreguide",
				mode: "design",
				main_show: !0,
				childs: []
			}
		},
		breadcrumb: (_breadcrumb = {
			"mainLayout.index": {
				childbread: "none",
				groupkey: "makehome",
				name: "",
				hidegroup: !0,
				ishome: !0,
				pageNameConfig: "makeHomePage"
			},
			"mainLayout.businessAuth": {
				childbread: "none",
				groupkey: "makehome",
				name: "商业授权",
				hidegroup: !0,
				pageNameConfig: "business"
			},
			"mainLayout.messagelist": {
				childbread: "none",
				groupkey: "makehome",
				name: "官方公告",
				hidegroup: !0
			},
			"mainLayout.appbase": {
				childbread: "none",
				groupkey: "appbase",
				name: "App信息",
				pageNameConfig: "appinfo"
			},
			"mainLayout.globaldesign": {
				childbread: "none",
				groupkey: "appglobel",
				name: "全局设置"
			},
			"mainLayout.baseattr": {
				childbread: "none",
				groupkey: "appbase",
				name: "全局样式",
				pageNameConfig: "globalSetting"
			},
			"mainLayout.module": {
				childbread: "none",
				groupkey: "pagemange",
				name: "页面管理"
			},
			"mainLayout.setpermissions": {
				childbread: "none",
				groupkey: "pagemange",
				name: "设置访问权限",
				pageNameConfig: "pageAccess"
			},
			"mainLayout.creatModule": {
				childbread: "none",
				groupkey: "pagemange",
				name: "新增页面",
				pageNameConfig: "pageTemplate"
			},
			"mainLayout.funModule": {
				childbread: "none",
				groupkey: "funcmode",
				name: "功能模块",
				pageNameConfig: "funcModule"
			},
			"mainLayout.funModuleExit": {
				childbread: "none",
				groupkey: "funcmode",
				name: "添加功能模块"
			},
			"mainLayout.funModuleChange": {
				childbread: "添加功能模块",
				groupkey: "funcmode",
				name: "",
				isdynamic: !0,
				mapping: {
					community: "新社区",
					publish: "投稿",
					weather: "天气",
					aboutus: "关于我们",
					seekhelp: "微社区",
					address_book_container: "通讯录",
					im_conversation_list_container: "互动IM",
					im_service_container: "客服",
					comment_container: "评论"
				}
			},
			"mainLayout.funModuleDesign": {
				childbread: "none",
				groupkey: "funcmode",
				name: "",
				isdynamic: !0,
				mapping: {
					seekhelp: "微社区"
				}
			},
			"mainLayout.plateSet": {
				childbread: "none",
				groupkey: "funcmode",
				name: "设置板块"
			},
			"mainLayout.contentmodel": {
				childbread: "none",
				groupkey: "datalist",
				name: "数据表",
				pageNameConfig: "dataTable"
			},
			"mainLayout.contentmodelform": {
				childbread: "none",
				groupkey: "datalist",
				name: "编辑数据表"
			},
			"mainLayout.contentcopy": {
				childbread: "none",
				groupkey: "datalist",
				name: "数据复制设置"
			},
			"mainLayout.triggerlist": {
				childbread: "none",
				groupkey: "trigger",
				name: "触发器",
				pageNameConfig: "trigger"
			},
			"mainLayout.triggerform": {
				childbread: "none",
				groupkey: "trigger",
				name: "触发器编辑"
			},
			"mainLayout.tempbuyrecord": {
				childbread: "none",
				groupkey: "shopping",
				name: "我的购买",
				pageNameConfig: "templateManage"
			}
		}, _defineProperty(_breadcrumb, "mainLayout.businessAuth", {
			childbread: "none",
			groupkey: "businessauth",
			name: "商业授权",
			pageNameConfig: "business"
		}), _defineProperty(_breadcrumb, "mainLayout.appstorehelp_ios", {
			childbread: "none",
			groupkey: "appstore",
			name: "iOS代上架申请",
			pageNameConfig: "appStore"
		}), _defineProperty(_breadcrumb, "mainLayout.appstorehelp_android", {
			childbread: "none",
			groupkey: "appstore",
			name: "安卓代上架申请",
			pageNameConfig: "appStore"
		}), _defineProperty(_breadcrumb, "mainLayout.appstoreself_ios", {
			childbread: "none",
			groupkey: "appstore",
			name: "iOS自助上架申请",
			pageNameConfig: "appStore"
		}), _defineProperty(_breadcrumb, "mainLayout.appstoreguide", {
			childbread: "none",
			groupkey: "appstore",
			name: "App上架",
			pageNameConfig: "appStore"
		}), _defineProperty(_breadcrumb, "mainLayout.buyappstore", {
			childbread: "none",
			groupkey: "appstore",
			name: "上架购买"
		}), _defineProperty(_breadcrumb, "mainLayout.storerecord", {
			childbread: "none",
			groupkey: "appstore",
			name: "上架记录"
		}), _defineProperty(_breadcrumb, "mainLayout.operateindex", {
			childbread: "none",
			groupkey: "operatehome",
			name: "",
			hidegroup: !0,
			ishome: !0,
			pageNameConfig: "operationHomePage"
		}), _defineProperty(_breadcrumb, "mainLayout.currentautheninfo", {
			childbread: "none",
			groupkey: "operatehome",
			name: "资料认证",
			hidegroup: !0,
			dynamicHomeGroupKey: !0,
			pageNameConfig: "identification"
		}), _defineProperty(_breadcrumb, "mainLayout.systemcategory", {
			childbread: "资料认证",
			groupkey: "operatehome",
			name: "申请权限",
			hidegroup: !0,
			dynamicHomeGroupKey: !0
		}), _defineProperty(_breadcrumb, "mainLayout.authenticateform", {
			childbread: "资料认证,申请权限",
			groupkey: "operatehome",
			name: "",
			isdynamic: !0,
			mapping: {
				student: "学生个人",
				shehui: "社会个人",
				zhengfu: "政府机构官方",
				meiti: "媒体官方",
				qiye: "企业官方",
				xiaoyuan: "校园官方",
				zuzhi: "组织团体官方",
				qita: "其他官方",
				disanfang: "第三方开发资源"
			},
			hidegroup: !0,
			dynamicHomeGroupKey: !0
		}), _defineProperty(_breadcrumb, "mainLayout.qualityautheninfo", {
			childbread: "none",
			groupkey: "operatehome",
			name: "开发者资质",
			hidegroup: !0,
			dynamicHomeGroupKey: !0,
			pageNameConfig: "developer"
		}), _defineProperty(_breadcrumb, "mainLayout.ordermanage", {
			childbread: "none",
			groupkey: "operatehome",
			name: "我的账户",
			hidegroup: !0,
			dynamicHomeGroupKey: !1,
			pageNameConfig: "ordermanage"
		}), _defineProperty(_breadcrumb, "mainLayout.invoicesearch", {
			childbread: "none",
			groupkey: "operatehome",
			name: "我的账户",
			hidegroup: !0,
			dynamicHomeGroupKey: !1,
			pageNameConfig: "ordermanage"
		}), _defineProperty(_breadcrumb, "mainLayout.modifymessage", {
			childbread: "none",
			groupkey: "operatehome",
			name: "个人设置",
			hidegroup: !0,
			dynamicHomeGroupKey: !0,
			pageNameConfig: "personalSetting"
		}), _defineProperty(_breadcrumb, "mainLayout.helpermanage", {
			childbread: "none",
			groupkey: "operatehome",
			name: "协作者管理",
			hidegroup: !0,
			dynamicHomeGroupKey: !0,
			pageNameConfig: "assistant"
		}), _defineProperty(_breadcrumb, "mainLayout.managelist", {
			childbread: "协作者管理",
			groupkey: "operatehome",
			name: "协作者列表",
			dynamicHomeGroupKey: !0,
			routerSelectChild: !0
		}), _defineProperty(_breadcrumb, "mainLayout.contentlist", {
			childbread: "{model_id},",
			groupkey: "content",
			name: "内容",
			pageNameConfig: "contentManage"
		}), _defineProperty(_breadcrumb, "secondLayout.contentform", {
			childbread: "{model_id},",
			groupkey: "content",
			name: "",
			isdynamic: !0,
			mapping: {
				id: ""
			}
		}), _defineProperty(_breadcrumb, "mainLayout.contentcategory", {
			childbread: "none",
			groupkey: "content",
			name: "内容分类"
		}), _defineProperty(_breadcrumb, "mainLayout.allmember", {
			childbread: "none",
			groupkey: "member",
			name: "全部会员",
			pageNameConfig: "memberManage"
		}), _defineProperty(_breadcrumb, "mainLayout.membergroup", {
			childbread: "none",
			groupkey: "member",
			name: "会员组",
			pageNameConfig: "memberManage"
		}), _defineProperty(_breadcrumb, "mainLayout.integral", {
			childbread: "none",
			groupkey: "function",
			name: "储值"
		}), _defineProperty(_breadcrumb, "mainLayout.setting", {
			childbread: "none",
			groupkey: "member",
			name: "会员设置",
			pageNameConfig: "memberManage"
		}), _defineProperty(_breadcrumb, "mainLayout.invite", {
			childbread: "none",
			groupkey: "member",
			name: "用户邀请",
			pageNameConfig: "memberManage"
		}), _defineProperty(_breadcrumb, "mainLayout.subscibe", {
			childbread: "none",
			groupkey: "member",
			name: "订阅组",
			pageNameConfig: "memberManage"
		}), _defineProperty(_breadcrumb, "mainLayout.blacklist", {
			childbread: "none",
			groupkey: "member",
			name: "黑名单",
			pageNameConfig: "memberManage"
		}), _defineProperty(_breadcrumb, "mainLayout.extendmanage", {
			childbread: "none",
			groupkey: "member",
			name: "扩展管理",
			pageNameConfig: "memberManage"
		}), _defineProperty(_breadcrumb, "mainLayout.memberlist", {
			childbread: "none",
			groupkey: "manage",
			name: "会员"
		}), _defineProperty(_breadcrumb, "mainLayout.extendsinfo", {
			childbread: "none",
			groupkey: "manage",
			name: "扩展资料"
		}), _defineProperty(_breadcrumb, "mainLayout.report", {
			childbread: "none",
			groupkey: "newmessage",
			name: "举报审核"
		}), _defineProperty(_breadcrumb, "mainLayout.mxucommunity", {
			childbread: "none",
			groupkey: "community",
			name: "新社区",
			pageNameConfig: "communityManage"
		}), _defineProperty(_breadcrumb, "mainLayout.communitylist", {
			childbread: "none",
			groupkey: "function",
			name: "社区",
			pageNameConfig: "community"
		}), _defineProperty(_breadcrumb, "mainLayout.groupmanagelist", {
			childbread: "none",
			groupkey: "function",
			name: "群聊",
			pageNameConfig: "groupChat"
		}), _defineProperty(_breadcrumb, "mainLayout.groupmanagedetails", {
			childbread: "群聊",
			groupkey: "function",
			name: "角色列表"
		}), _defineProperty(_breadcrumb, "mainLayout.commentlist", {
			childbread: "none",
			groupkey: "newmessage",
			name: "评论"
		}), _defineProperty(_breadcrumb, "mainLayout.contribute", {
			childbread: "none",
			groupkey: "manage",
			name: "投稿"
		}), _defineProperty(_breadcrumb, "mainLayout.feedback", {
			childbread: "none",
			groupkey: "newmessage",
			name: "意见反馈"
		}), _defineProperty(_breadcrumb, "mainLayout.shake", {
			childbread: "none",
			groupkey: "function",
			name: "摇一摇管理",
			pageNameConfig: "shake"
		}), _defineProperty(_breadcrumb, "mainLayout.aboutus", {
			childbread: "none",
			groupkey: "function",
			name: "关于我们"
		}), _defineProperty(_breadcrumb, "mainLayout.compileShake", {
			childbread: "none",
			groupkey: "function",
			name: "摇一摇编辑"
		}), _defineProperty(_breadcrumb, "mainLayout.pushmessage", {
			childbread: "none",
			groupkey: "newmessage",
			name: "消息推送",
			pageNameConfig: "operationFunc"
		}), _defineProperty(_breadcrumb, "mainLayout.message", {
			childbread: "none",
			groupkey: "serveice",
			name: "广告投放"
		}), _defineProperty(_breadcrumb, "mainLayout.addMessage", {
			childbread: "none",
			groupkey: "serveice",
			name: "新增广告",
			routerSelectChild: !0
		}), _defineProperty(_breadcrumb, "mainLayout.xiuzanfeedback", {
			childbread: "none",
			groupkey: "h5make",
			name: "云表单",
			pageNameConfig: "h5"
		}), _defineProperty(_breadcrumb, "mainLayout.xiuzansurvey", {
			childbread: "none",
			groupkey: "h5make",
			name: "云问卷"
		}), _defineProperty(_breadcrumb, "mainLayout.xiuzanmarketing", {
			childbread: "none",
			groupkey: "h5make",
			name: "云单页"
		}), _defineProperty(_breadcrumb, "mainLayout.iconmanage", {
			childbread: "none",
			groupkey: "gear",
			name: "导航图标更换",
			pageNameConfig: "operationSetting"
		}), _defineProperty(_breadcrumb, "mainLayout.thirdassess", {
			childbread: "none",
			groupkey: "appglobel",
			name: "第三方",
			pageNameConfig: "thirtParty"
		}), _defineProperty(_breadcrumb, "mainLayout.goodslist", {
			childbread: "none",
			groupkey: "goodmanage",
			name: "商品列表",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.addgoods", {
			childbread: "none",
			groupkey: "goodmanage",
			name: "商品发布",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.goodcategory", {
			childbread: "none",
			groupkey: "goodmanage",
			name: "商品分组",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.ordersituation", {
			childbread: "none",
			groupkey: "ordersituation",
			name: "订单概况",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.orderlist", {
			childbread: "none",
			groupkey: "ordermanage",
			name: "订单列表",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.ordersdetails", {
			childbread: "none",
			groupkey: "ordermanage",
			name: "订单详情",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.newpostcostmodel", {
			childbread: "none",
			groupkey: "freightmanage",
			name: "新建运费模版",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.postcostlist", {
			childbread: "none",
			groupkey: "freightmanage",
			name: "运费模版列表",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.editpostcostmodel", {
			childbread: "none",
			groupkey: "freightmanage",
			name: "编辑运费模版",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.assesslist", {
			childbread: "none",
			groupkey: "assessmanage",
			name: "评价列表",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.assessdetails", {
			childbread: "none",
			groupkey: "assessmanage",
			name: "评价详情",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.marketingtools", {
			childbread: "none",
			groupkey: "marketing",
			name: "营销工具",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.fullbenefit", {
			childbread: "none",
			groupkey: "marketing",
			name: "满减送",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.createfullbenefit", {
			childbread: "none",
			groupkey: "marketing",
			name: "新建满减送",
			pageNameConfig: "ecommerce",
			routerSelectChild: !0
		}), _defineProperty(_breadcrumb, "mainLayout.coupon", {
			childbread: "none",
			groupkey: "marketing",
			name: "优惠券",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.createcoupon", {
			childbread: "none",
			groupkey: "marketing",
			name: "编辑优惠券",
			pageNameConfig: "ecommerce",
			routerSelectChild: !0
		}), _defineProperty(_breadcrumb, "mainLayout.discount", {
			childbread: "none",
			groupkey: "marketing",
			name: "限时折扣",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.editdiscount", {
			childbread: "none",
			groupkey: "marketing",
			name: "编辑限时折扣",
			pageNameConfig: "ecommerce",
			routerSelectChild: !0
		}), _defineProperty(_breadcrumb, "mainLayout.aftersalelist", {
			childbread: "none",
			groupkey: "ordermanage",
			name: "售后管理",
			pageNameConfig: "ecommerce"
		}), _defineProperty(_breadcrumb, "mainLayout.aftersaledetails", {
			childbread: "none",
			groupkey: "ordermanage",
			name: "售后管理详情",
			pageNameConfig: "ecommerce"
		}), _breadcrumb)
	})
});