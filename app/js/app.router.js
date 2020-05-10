"use strict";
define(function(require, exports, module) {
	var app = require("app"),
		server = require("common/services/server");
	require("moment");
	require("angular-loader").configure(app), require("common/services/config"), require("common/services/areaConfig"), require("common/services/navconfig"), require("common/services/utils"), require("common/services/http"), require("common/services/modelService"), require("common/services/youzanBindService"), require("appmake/services/appMakeService"), require("appmake/services/permissionConfig"), require("medium/services/mediumServ"), require("common/services/schoolconfig"), require("common/services/getServerConfig"), require("common/services/noticeServic"), require("common/services/usergetapi"), require("common/directives/loading"), require("common/directives/breadcrumb"), require("common/directives/school-select"), require("common/directives/empty-data"), require("common/directives/cannot-visit"), require("common/directives/dingdone-logout"), require("common/directives/dingdone-footer"), app.config(["$httpProvider", "$stateProvider", "$urlRouterProvider", "$locationProvider", function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.when("/", "login").when("/login/:anyone", "login").when("/register", "register/").when("/fed", "login").when("/fed/login", "login").when("/fed/login/:anyone", "login").when("/fed/register", "register/").when("/fed/register/:register_token", "register/:register_token").when("/fed/index", "index/").when("/fed/index/:anyone", "index/:anyone").when("/fed/activatesuccess", "activatesuccess").when("/fed/app/create", "app/create").when("/fed/activatefailed", "activatefailed").when("/index.html", "login").otherwise("/error"), $stateProvider.state("loginLayout", {
			"abstract": !0,
			views: {
				"": {
					templateUrl: "common/layout/login.html"
				}
			}
		}).state("mainLayout", {
			url: "",
			"abstract": !0,
			views: {
				"": {
					templateUrl: "common/layout/leftrightLayout.html"
				},
				"nav@mainLayout": {
					templateUrl: "common/nav/nav.html",
					controller: "NavCtrl",
					controllerUrl: "common/controllers/nav"
				},
				"userheader@mainLayout": {
					templateUrl: "common/nav/userheader.html",
					controller: "UserheadCtrl",
					controllerUrl: "common/controllers/userhead"
				}
			}
		}).state("secondLayout", {
			url: "",
			"abstract": !0,
			views: {
				"": {
					templateUrl: "common/layout/updownLayout.html"
				},
				"simpleheader@secondLayout": {
					templateUrl: "common/nav/simpleheader.html",
					controller: "UserheadCtrl",
					controllerUrl: "common/controllers/userhead"
				}
			}
		}).state("appmakeLayout", {
			url: "",
			"abstract": !0,
			views: {
				"": {
					templateUrl: "common/layout/updownLayout_appmake.html"
				},
				"appmakeheader@appmakeLayout": {
					templateUrl: "common/nav/appmakeheader.html",
					controller: "AppMakeHeaderCtrl",
					controllerUrl: "common/nav/appmakeheader"
				}
			}
		}).state("sharetplLayout", {
			url: "",
			"abstract": !0,
			views: {
				"": {
					templateUrl: "common/layout/updownLayout_share.html"
				},
				"sharetplheader@sharetplLayout": {
					templateUrl: "common/nav/sharetplheader.html",
					controller: "ShareTplHeaderCtrl",
					controllerUrl: "common/nav/sharetplheader"
				}
			}
		}).state("layout_for_push", {
			url: "",
			"abstract": !0,
			views: {
				"": {
					templateUrl: "common/layout/layout_for_push.html"
				}
			}
		}).state("pageDesignLayout", {
			url: "",
			"abstract": !0,
			views: {
				"": {
					templateUrl: "common/layout/page_design.html"
				},
				"header@pageDesignLayout": {
					templateUrl: "common/nav/page_design.html",
					controller: "AppMakeHeaderCtrl",
					controllerUrl: "common/nav/appmakeheader"
				}
			}
		}).state("memberDetailLayout", {
			url: "",
			"abstract": !0,
			views: {
				"": {
					templateUrl: "common/layout/updownLayout_member.html"
				},
				"memberheader@memberDetailLayout": {
					templateUrl: "common/nav/memberheader.html"
				}
			}
		}).state("modalMarketLayout", {
			url: "",
			"abstract": !0,
			views: {
				"": {
					templateUrl: "common/layout/layout_for_modal.html"
				},
				"modalmarketherader@modalMarketLayout": {
					templateUrl: "common/nav/modalmarketherader.html",
					controller: "UserheadCtrl",
					controllerUrl: "common/controllers/userhead"
				}
			}
		}).state("resolvePlanLayout", {
			url: "",
			"abstract": !0,
			views: {
				"": {
					templateUrl: "common/layout/layout_for_resolveplan.html"
				},
				"resolveplanheader@resolvePlanLayout": {
					templateUrl: "common/nav/resolveplanheader.html"
				}
			}
		}).state("error", {
			url: "/error",
			templateUrl: "common/error.html"
		}).state("shang", {
			url: "/donate",
			templateUrl: "common/shang.html"
		}).state("resolveplan", {
			url: "/resolveplan/:type",
			templateUrl: "appcreate/resolveplan.html",
			controller: "ResolvePlan",
			controllerUrl: "appcreate/resolveplan"
		}).state("specialmake", {
			url: "/specialmake",
			templateUrl: "appcreate/specialmake.html",
			controller: "SpecialMake",
			controllerUrl: "appcreate/specialmake"
		}).state("layout_for_push.uikit", {
			url: "/uikit",
			templateUrl: "uikit.html",
			controller: "UikitCtrl",
			controllerUrl: "common/controllers/uikit"
		}).state("mainLayout.operateindex", {
			url: "/operateindex/:iscallback",
			templateUrl: "operateindex.html",
			controller: "HomeCtrl",
			controllerUrl: "common/controllers/home"
		}).state("mainLayout.index", {
			url: "/index/:iscallback",
			templateUrl: "makeindex.html",
			controller: "HomeCtrl",
			controllerUrl: "common/controllers/home"
		}).state("secondLayout.contentform", {
			url: "/content/form/:handle_type/:model_id/:id",
			templateUrl: "content/list/form.html",
			controller: "ContentFormCtrl",
			controllerUrl: "content/list/form"
		}).state("secondLayout.contentformAdd", {
			url: "/content/form/:model_id",
			templateUrl: "content/list/form.html",
			controller: "ContentFormCtrl",
			controllerUrl: "content/list/form"
		}).state("mainLayout.contentlist", {
			url: "/content/list/:model_id",
			templateUrl: "content/list/index.html",
			controller: "ContentlistCtrl",
			controllerUrl: "content/list/index"
		}).state("mainLayout.contentcategory", {
			url: "/content/category/:model_id",
			templateUrl: "content/category/index.html",
			controller: "ContentcategoryCtrl",
			controllerUrl: "content/category/index"
		}).state("mainLayout.contentmodel", {
			url: "/content/model",
			templateUrl: "content/model/index.html",
			controller: "ContentmodelCtrl",
			controllerUrl: "content/model/index"
		}).state("mainLayout.contentmodelform", {
			url: "/content/modelform/:handleType/:modelId",
			templateUrl: "content/model/form.html",
			controller: "ContentModelFormCtrl",
			controllerUrl: "content/model/form"
		}).state("mainLayout.contentcopy", {
			url: "/contentcopy/index/:moduleId/:currentTo",
			templateUrl: "content_copy/index.html",
			controller: "ContentCopyCtrl",
			controllerUrl: "content_copy/index"
		}).state("mainLayout.allmember", {
			url: "/member/allmember/list",
			templateUrl: "member/allmember/list.html",
			controller: "MembersListCtrl",
			controllerUrl: "member/allmember/list"
		}).state("memberDetailLayout.memberdetail", {
			url: "/member/allmember/detail/:type/:identifier",
			templateUrl: "member/allmember/detail/index.html",
			controller: "MemberDetailCtrl",
			controllerUrl: "member/allmember/detail"
		}).state("mainLayout.membergroup", {
			url: "/member/membergroup",
			templateUrl: "member/membergroup/index.html",
			controller: "MemberGroupCtrl",
			controllerUrl: "member/membergroup/index"
		}).state("mainLayout.setting", {
			url: "/member/setting",
			templateUrl: "member/setting/index.html",
			controller: "MemberSettingCtrl",
			controllerUrl: "member/setting/index"
		}).state("mainLayout.invite", {
			url: "/member/invite",
			templateUrl: "member/invite/index.html",
			controller: "MembernviteCtrl",
			controllerUrl: "member/invite/index"
		}).state("mainLayout.subscibe", {
			url: "/member/subscibe",
			templateUrl: "member/subscibe/index.html",
			controller: "MemberSubscibeCtrl",
			controllerUrl: "member/subscibe/index"
		}).state("mainLayout.blacklist", {
			url: "/member/blacklist",
			templateUrl: "member/blacklist/index.html",
			controller: "MemberBlacklistCtrl",
			controllerUrl: "member/blacklist/index"
		}).state("mainLayout.extendmanage", {
			url: "/member/extendmanage",
			templateUrl: "member/extendmanage/index.html",
			controller: "MemberExtendCtrl",
			controllerUrl: "member/extendmanage/index"
		}).state("mainLayout.integral", {
			url: "/integral",
			templateUrl: "integral/index.html",
			controller: "MemberIntegralCtrl",
			controllerUrl: "integral/index"
		}).state("mainLayout.contribute", {
			url: "/interactive/contribute",
			templateUrl: "interactive/contribute/index.html",
			controller: "ContentcontributeCtrl",
			controllerUrl: "interactive/contribute/index"
		}).state("secondLayout.contributeform", {
			url: "/contribute/form/:model_id/:id/:is_contribute",
			templateUrl: "content/list/form.html",
			controller: "ContentFormCtrl",
			controllerUrl: "content/list/form"
		}).state("mainLayout.communitylist", {
			url: "/interactive/community/list",
			templateUrl: "interactive/community/list.html",
			controller: "communityListCtrl",
			controllerUrl: "interactive/community/list"
		}).state("mainLayout.imlist", {
			url: "/interactive/groupchat/index",
			templateUrl: "interactive/groupchat/index.html",
			controller: "groupCtrl",
			controllerUrl: "interactive/groupchat/index"
		}).state("mainLayout.groupmanagelist", {
			url: "/interactive/groupmanage/index",
			templateUrl: "interactive/groupmanage/index.html",
			controller: "groupManageCtrl",
			controllerUrl: "interactive/groupmanage/index"
		}).state("mainLayout.groupmanagedetails", {
			url: "/interactive/groupmanage/list/:group_id",
			templateUrl: "interactive/groupmanage/list.html",
			controller: "groupManageDetailCtrl",
			controllerUrl: "interactive/groupmanage/list"
		}).state("mainLayout.commentlist", {
			url: "/interactive/comment/list",
			templateUrl: "interactive/comment/list.html",
			controller: "commentListCtrl",
			controllerUrl: "interactive/comment/list"
		}).state("mainLayout.messagelist", {
			url: "/message/messagelist",
			templateUrl: "message/messagelist.html",
			controller: "MessageListCtrl",
			controllerUrl: "message/messagelist"
		}).state("secondLayout.messageform", {
			url: "/message/messageform/:id",
			templateUrl: "message/messageform.html",
			controller: "MessageFormCtrl",
			controllerUrl: "message/messageform"
		}).state("layout_for_push.contentlist_for_push", {
			url: "/content/push",
			templateUrl: "content/list/contentlist_for_push.html",
			controller: "ContentlistForPushCtrl",
			controllerUrl: "content/list/contentlist_for_push"
		}).state("secondLayout.test", {
			url: "/test",
			templateUrl: "test/index.html",
			controller: "TestCtrl",
			controllerUrl: "test/test"
		}).state("loginLayout.userlogin", {
			url: "/login",
			templateUrl: "login/login.html",
			controller: "LoginCtrl",
			controllerUrl: "login/login"
		}).state("loginLayout.wxlogin", {
			url: "/wxlogin",
			templateUrl: "login/login_wx.html",
			controller: "WxLoginCtrl",
			controllerUrl: "login/login_wx"
		}).state("loginLayout.forgetpassword", {
			url: "/getpassindex",
			templateUrl: "login/forget_password.html",
			controller: "GetPasswordCtrl",
			controllerUrl: "login/forget_password"
		}).state("layout_for_push.registersuccess", {
			url: "/registersuccess/:email/:username/:helper",
			templateUrl: "user_system/login/registersuccess.html",
			controller: "RegisterSuccessCtrl",
			controllerUrl: "user_system/login/registersuccess"
		}).state("layout_for_push.activatesuccess", {
			url: "/activatesuccess",
			templateUrl: "user_system/login/activatesuccess.html",
			controller: "ActivateSuccessCtrl",
			controllerUrl: "user_system/login/activatesuccess"
		}).state("layout_for_push.activatefalse", {
			url: "/activatefailed",
			templateUrl: "user_system/activatefalse.html",
			controller: "ActivateFalseCtrl",
			controllerUrl: "user_system/activatefalse"
		}).state("loginLayout.userregister", {
			url: "/register/:register_token",
			templateUrl: "register/register.html",
			controller: "RegisterCtrl",
			controllerUrl: "register/register"
		}).state("layout_for_push.customersystem", {
			url: "/customersystem",
			templateUrl: "login/login_customer.html",
			controller: "CustomerServiceSystemCtrl",
			controllerUrl: "login/login_customer"
		}).state("layout_for_push.helperinvitedsuccess", {
			url: "/helperinvitedsuccess",
			templateUrl: "appmake/partner/helperinvitedsuccess.html",
			controller: "HelperInvitedSuccessCtrl",
			controllerUrl: "appmake/partner/helperinvitedsuccess"
		}).state("layout_for_push.helperinvitedfalse", {
			url: "/helperinvitedfailed",
			templateUrl: "appmake/partner/helperinvitedfalse.html",
			controller: "HelpereMailFalseCtrl",
			controllerUrl: "appmake/partner/helperinvitedfalse"
		}).state("mainLayout.modifymessage", {
			url: "/modifymessage",
			templateUrl: "login/modifymessage.html",
			controller: "UserModifyMessageCtrl",
			controllerUrl: "login/modifymessage"
		}).state("mainLayout.systemcategory", {
			url: "/usersystem/category/:type/:is_change",
			templateUrl: "user_system/data_authen/category.html",
			controller: "UserSystemCtrl",
			controllerUrl: "user_system/data_authen/category"
		}).state("mainLayout.seniorform", {
			url: "/usersystem/seniorform/:handle",
			templateUrl: "user_system/quality_authen/form.html",
			controller: "SeniorDeveloperFormCtrl",
			controllerUrl: "user_system/quality_authen/form"
		}).state("mainLayout.currentautheninfo", {
			url: "/usersystem/index",
			templateUrl: "user_system/data_authen/index.html",
			controller: "CurrentAuthenInfoCtrl",
			controllerUrl: "user_system/data_authen/index"
		}).state("mainLayout.authenticateform", {
			url: "/usersystem/form/:flag/:handle",
			templateUrl: "user_system/data_authen/form.html",
			controller: "AuthenticateFormCtrl",
			controllerUrl: "user_system/data_authen/form"
		}).state("mainLayout.auditprogress", {
			url: "/usersystem/audit",
			templateUrl: "user_system/data_authen/audit_progress.html",
			controller: "AuditProgressCtrl",
			controllerUrl: "user_system/data_authen/audit_progress"
		}).state("mainLayout.qualityautheninfo", {
			url: "/usersystem/senior/index",
			templateUrl: "user_system/quality_authen/index.html",
			controller: "QualityAuthenInfoCtrl",
			controllerUrl: "user_system/quality_authen/index"
		}).state("mainLayout.ordermanage", {
			url: "/usersystem/ordermanage/?type",
			templateUrl: "user_system/data_authen/order_manage.html",
			controller: "MyAccountCtrl",
			controllerUrl: "user_system/data_authen/myaccount"
		}).state("mainLayout.invoicesearch", {
			url: "/usersystem/invoicesearch/?type",
			templateUrl: "user_system/data_authen/invoice_search.html",
			controller: "MyAccountCtrl",
			controllerUrl: "user_system/data_authen/myaccount"
		}).state("mainLayout.seniorauditprogress", {
			url: "/usersystem/senioraudit",
			templateUrl: "user_system/quality_authen/audit_progress.html",
			controller: "SeniorAuditProgressCtrl",
			controllerUrl: "user_system/quality_authen/audit_progress"
		}).state("mainLayout.helpermanage", {
			url: "/partner/manage",
			templateUrl: "appmake/partner/helpermanage.html",
			controller: "ManageCtrl",
			controllerUrl: "appmake/partner/helpermanage"
		}).state("mainLayout.managelist", {
			url: "/partner/list",
			templateUrl: "appmake/partner/list.html",
			controller: "ListCtrl",
			controllerUrl: "appmake/partner/list"
		}).state("modalMarketLayout.appmarket", {
			url: "/app/market",
			templateUrl: "appcreate/index.html",
			controller: "CreateAppCtrl",
			controllerUrl: "appcreate/index"
		}).state("modalMarketLayout.modulemarketlist", {
			url: "/app/modulemarket",
			templateUrl: "appcreate/modulemarket.html",
			controller: "ModuleMarketCtrl",
			controllerUrl: "appcreate/modulemarket"
		}).state("resolvePlanLayout.moduledetial", {
			url: "/app/moduledetial/:product_id",
			templateUrl: "appcreate/moduledetial.html",
			controller: "ModuleDetailCtrl",
			controllerUrl: "appcreate/moduledetial"
		}).state("modalMarketLayout.mallpay", {
			url: "/mallpay",
			templateUrl: "appcreate/orderpay.html",
			controller: "ModuleOrderPayCtrl",
			controllerUrl: "appcreate/orderpay"
		}).state("modalMarketLayout.paysuccess", {
			url: "/paysuccess",
			templateUrl: "paysuccess/index.html",
			controller: "PaySuccessCtrl",
			controllerUrl: "paysuccess/index"
		}).state("modalMarketLayout.moduleorderpay", {
			url: "/orderpay/:type/:status/:product_id",
			templateUrl: "appcreate/orderpay.html",
			controller: "ModuleOrderPayCtrl",
			controllerUrl: "appcreate/orderpay"
		}).state("modalMarketLayout.appcreate", {
			url: "/app/create/:template_id",
			templateUrl: "appcreate/create.html",
			controller: "ModuleDiyCreateCtrl",
			controllerUrl: "appcreate/create"
		}).state("modalMarketLayout.importstute", {
			url: "/app/importstute",
			templateUrl: "appcreate/importstute.html",
			controller: "ModuleImportStuteCtrl",
			controllerUrl: "appcreate/importstute"
		}).state("mainLayout.appbase", {
			url: "/app/baseinfo",
			templateUrl: "appmake/baseinfo/index.html",
			controller: "AppBaseCtrl",
			controllerUrl: "appmake/baseinfo/index"
		}).state("pageDesignLayout.pageconfig", {
			url: "/app/pageconfig/:uniqueid/:module_id/:view_id",
			templateUrl: "appmake/funmodule/fun_config.html",
			controller: "pageconfigCtrl",
			controllerUrl: "appmake/funmodule/fun_config"
		}).state("mainLayout.funModule", {
			url: "/app/funmodule",
			templateUrl: "appmake/funmodule/index.html",
			controller: "FunModuleCtrl",
			controllerUrl: "appmake/funmodule/index"
		}).state("mainLayout.plateSet", {
			url: "/app/plateSet",
			templateUrl: "appmake/funmodule/plate/plate_set.html",
			controller: "PlateSetCtrl",
			controllerUrl: "appmake/funmodule/plate/plate_set"
		}).state("mainLayout.funModuleChange", {
			url: "/app/funmodulechange/:uniqueid",
			templateUrl: "appmake/funmodule/change.html",
			controller: "FunModuleChangeCtrl",
			controllerUrl: "appmake/funmodule/change"
		}).state("mainLayout.funModuleExit", {
			url: "/app/funmoduleexit",
			templateUrl: "appmake/funmodule/exit.html",
			controller: "ExitCtrl",
			controllerUrl: "appmake/funmodule/exit"
		}).state("mainLayout.funModuleDesign", {
			url: "/app/funmoduledesign/:uniqueid",
			templateUrl: "appmake/funmodule/im_design.html",
			controller: "ImDesign",
			controllerUrl: "appmake/funmodule/im_design"
		}).state("pageDesignLayout.funDesign", {
			url: "/app/fundesign/:uniqueid/:module_id/:view_id",
			templateUrl: "appmake/funmodule/funDesign.html",
			controller: "FunModuleDesignCtrl",
			controllerUrl: "appmake/funmodule/funDesign"
		}).state("pageDesignLayout.skuPanel", {
			url: "/app/skupanel/:uniqueid/:module_id/:view_id",
			templateUrl: "appmake/funmodule/skuPanel.html",
			controller: "SkuPanelCtrl",
			controllerUrl: "appmake/funmodule/skuPanel"
		}).state("pageDesignLayout.dataSearch", {
			url: "/app/datasearch/:pageType/:uniqueid/:module_id/:view_id",
			templateUrl: "appmake/funmodule/data_search.html",
			controller: "SearchDataCtrl",
			controllerUrl: "appmake/funmodule/data_search"
		}).state("mainLayout.module", {
			url: "/app/page/:type",
			templateUrl: "appmake/pagemanage/index.html",
			controller: "ModuleListCtrl",
			controllerUrl: "appmake/pagemanage/index"
		}).state("mainLayout.creatModule", {
			url: "/app/creatmodule/:page",
			templateUrl: "appmake/pagemanage/creatModule.html",
			controller: "CreatModuleCtrl",
			controllerUrl: "appmake/pagemanage/creatModule"
		}).state("sharetplLayout.tplShare", {
			url: "/app/tplShare/:id/:module_id",
			templateUrl: "appmake/tplsharemanage/tplShare.html",
			controller: "tplShareCtrl",
			controllerUrl: "appmake/tplsharemanage/tplShare"
		}).state("sharetplLayout.tplShareDetail", {
			url: "/app/tplShareDetail/:id/:module_id/:tpl_id",
			templateUrl: "appmake/tplsharemanage/tplShareDetail.html",
			controller: "tplFieldsCtrl",
			controllerUrl: "appmake/tplsharemanage/tplShareDetail"
		}).state("pageDesignLayout.portfolioPage", {
			url: "/app/portfolioPage/:moduleId/:groupPageType",
			templateUrl: "appmake/pagemanage/editor_portfolio_page.html",
			controller: "EditorPortfolioCtrl",
			controllerUrl: "appmake/pagemanage/editor_portfolio_page"
		}).state("mainLayout.createportfolio", {
			url: "/app/createportfolio",
			templateUrl: "appmake/pagemanage/create_portfolio_page.html",
			controller: "CreatePortfolioCtrl",
			controllerUrl: "appmake/pagemanage/create_portfolio_page"
		}).state("mainLayout.setpermissions", {
			url: "/app/setpermissions/:type/:pageId",
			templateUrl: "appmake/pagemanage/set_permission.html",
			controller: "SetPermissionctrl",
			controllerUrl: "appmake/pagemanage/set_permission"
		}).state("pageDesignLayout.pageDesign", {
			url: "/app/pagedesign/:pageType/:defaultType/:moduleId/:viewId",
			templateUrl: "appmake/page_design/index.html",
			controller: "PageDesignCtrl",
			controllerUrl: "appmake/page_design/index"
		}).state("pageDesignLayout.pagesetting", {
			url: "/app/pagesetting/:type/:module_id/:view_id",
			templateUrl: "appmake/page_design/pagesetting.html",
			controller: "PageSettingCtrl",
			controllerUrl: "appmake/page_design/pagesetting"
		}).state("pageDesignLayout.groupstyle", {
			url: "/app/groupstyle/:type/:page_id",
			templateUrl: "appmake/page_design/groupstyle.html",
			controller: "GroupStyleCtrl",
			controllerUrl: "appmake/page_design/groupstyle"
		}).state("mainLayout.tempbuyrecord", {
			url: "/temp/record",
			templateUrl: "appmake/temp_buy_record/index.html",
			controller: "TempBuyRecordCtrl",
			controllerUrl: "appmake/temp_buy_record/index"
		}).state("mainLayout.thirdassess", {
			url: "/app/thirdassess",
			templateUrl: "appmake/appglobaldesign/index.html",
			controller: "thirdAssessCtrl",
			controllerUrl: "appmake/appglobaldesign/index"
		}).state("changemainui", {
			url: "/app/changemainui/:guid/:uniqueid",
			templateUrl: "appmake/appdesign/mainui.html",
			controller: "ChangeMainCtrl",
			controllerUrl: "appmake/appdesign/mainui"
		}).state("mainLayout.baseattr", {
			url: "/app/setting/:guid/:view_id",
			templateUrl: "appmake/appglobaldesign/globalsetting.html",
			controller: "GlobalsettingCtrl",
			controllerUrl: "appmake/appglobaldesign/globalsetting"
		}).state("mainLayout.myapp", {
			url: "/app/myapp",
			templateUrl: "appmake/myapp/index.html",
			controller: "MyAppCtrl",
			controllerUrl: "appmake/myapp/index"
		}).state("mainLayout.businessAuth", {
			url: "/businessAuth/index",
			templateUrl: "appmake/myapp/businessAuth/index.html",
			controller: "BusinessAuthCtrl",
			controllerUrl: "appmake/myapp/businessAuth/index"
		}).state("mainLayout.noBusinessAuth", {
			url: "/businessAuth/form",
			templateUrl: "appmake/myapp/businessAuth/form.html",
			controller: "BusinessAuthorCtrl",
			controllerUrl: "appmake/myapp/businessAuth/form"
		}).state("mainLayout.noBuyBusinessAuth", {
			url: "/businessAuth/submit",
			templateUrl: "appmake/myapp/businessAuth/submit.html",
			controller: "BusinessSubmitCtrl",
			controllerUrl: "appmake/myapp/businessAuth/submit"
		}).state("mainLayout.triggerlist", {
			url: "/trigger/list",
			templateUrl: "trigger/index.html",
			controller: "triggerListCtrl",
			controllerUrl: "trigger/index"
		}).state("mainLayout.triggerform", {
			url: "/trigger/form/:id",
			templateUrl: "trigger/form.html",
			controller: "triggerFormCtrl",
			controllerUrl: "trigger/form"
		}).state("appmakeLayout.modulemarket", {
			url: "/app/modulemarket/:moduleId",
			templateUrl: "appmake/modulemarket/index.html",
			controller: "ModulemarketCtrl",
			controllerUrl: "appmake/modulemarket/index"
		}).state("mainLayout.message", {
			url: "/appoperate/message",
			templateUrl: "appoperate/message/index.html",
			controller: "MessageCtrl",
			controllerUrl: "appoperate/message/index"
		}).state("mainLayout.addMessage", {
			url: "/appoperate/addMessage",
			templateUrl: "appoperate/message/addMessage.html",
			controller: "AddMessage",
			controllerUrl: "appoperate/message/addMessage"
		}).state("mainLayout.feedback", {
			url: "/appoperate/feedback",
			templateUrl: "appoperate/feedback/index.html",
			controller: "FeedbackCtrl",
			controllerUrl: "appoperate/feedback/index"
		}).state("mainLayout.shake", {
			url: "/shake/shakeMain",
			templateUrl: "shake/shakeMain/index.html",
			controller: "ShakeCtrl",
			controllerUrl: "shake/shakeMain/index"
		}).state("mainLayout.compileShake", {
			url: "/shake/shakeMain/:jsonString",
			templateUrl: "shake/shakeMain/compileShake.html",
			controller: "compileShakeCtrl",
			controllerUrl: "shake/shakeMain/compileShake"
		}).state("mainLayout.pushmessage", {
			url: "/appoperate/pushmessage",
			templateUrl: "appoperate/pushmessage/index.html",
			controller: "PushMessageCtrl",
			controllerUrl: "appoperate/pushmessage/index"
		}).state("appmakeLayout.createpush", {
			url: "/appoperate/createpush",
			templateUrl: "appoperate/pushmessage/createpush.html",
			controller: "CreatePushCtrl",
			controllerUrl: "appoperate/pushmessage/createpush"
		}).state("mainLayout.appstorehelp_ios", {
			url: "/appoperate/appstore_help_ios/:way/:id",
			templateUrl: "appstore/appstore.html",
			controller: "AppStoreCtrl",
			controllerUrl: "appstore/appstore"
		}).state("mainLayout.appstorehelp_android", {
			url: "/appoperate/appstore_help_android/:way/:id",
			templateUrl: "appstore/appstore.html",
			controller: "AppStoreCtrl",
			controllerUrl: "appstore/appstore"
		}).state("mainLayout.appstoreself_ios", {
			url: "/appoperate/appstore_self_ios/:way/:id",
			templateUrl: "appstore/appstore.html",
			controller: "AppStoreCtrl",
			controllerUrl: "appstore/appstore"
		}).state("mainLayout.appstoreguide", {
			url: "/appstore/appstoreguide",
			templateUrl: "appstore/appstore_guide.html",
			controller: "appstoreGuideCtrl",
			controllerUrl: "appstore/appstore_guide"
		}).state("mainLayout.storerecord", {
			url: "/storerecord",
			templateUrl: "appstore/storerecord.html",
			controller: "appStoreRecordCtrl",
			controllerUrl: "appstore/storerecord"
		}).state("mainLayout.updatacert", {
			url: "/appoperate/updatacert",
			templateUrl: "appoperate/pushmessage/updatacert.html",
			controller: "updataCertCtrl",
			controllerUrl: "appoperate/pushmessage/updatacert"
		}).state("mainLayout.iconmanage", {
			url: "/appoperate/iconmanage",
			templateUrl: "appoperate/iconmanage/index.html",
			controller: "iconManageCtrl",
			controllerUrl: "appoperate/iconmanage/index"
		}).state("mainLayout.aboutus", {
			url: "/appoperate/aboutus",
			templateUrl: "appoperate/aboutus/index.html",
			controller: "AboutUsCtrl",
			controllerUrl: "appoperate/aboutus/index"
		}).state("mainLayout.mxucommunity", {
			url: "/mxu/community",
			templateUrl: "mxu_community/iframe/index.html",
			controller: "CommunityManageCtrl",
			controllerUrl: "mxu_community/iframe/index"
		}).state("mainLayout.xiuzanfeedback", {
			url: "/xiuzan/feedback",
			templateUrl: "xiuzanmake/iframe/index.html",
			controller: "FeedbackCtrl",
			controllerUrl: "xiuzanmake/feedback/index"
		}).state("mainLayout.xiuzansurvey", {
			url: "/xiuzan/survey",
			templateUrl: "xiuzanmake/iframe/index.html",
			controller: "SurveyCtrl",
			controllerUrl: "xiuzanmake/survey/index"
		}).state("mainLayout.xiuzanmarketing", {
			url: "/xiuzan/marketing",
			templateUrl: "xiuzanmake/iframe/index.html",
			controller: "MarketingCtrl",
			controllerUrl: "xiuzanmake/marketing/index"
		}).state("mainLayout.xiuzanraffle", {
			url: "/xiuzan/raffle",
			templateUrl: "xiuzanmake/iframe/index.html",
			controller: "RaffleCtrl",
			controllerUrl: "xiuzanmake/raffle/index"
		}).state("mainLayout.normalshoporderlist", {
			url: "/normalshop/ordermanage/list",
			templateUrl: "normalshop/ordermanage/list.html",
			controller: "OrderManageListCtrl",
			controllerUrl: "normalshop/ordermanage/list"
		}).state("mainLayout.normalshoporderdetail", {
			url: "/normalshop/ordermanage/details/:order_no",
			templateUrl: "normalshop/ordermanage/details.html",
			controller: "OrderManageDetailsCtrl",
			controllerUrl: "normalshop/ordermanage/details"
		}).state("mainLayout.goodslist", {
			url: "/ecshop/goodsmanage/goodslist",
			templateUrl: "ecshop/goodsmanage/list.html",
			controller: "GoodsManageListCtrl",
			controllerUrl: "ecshop/goodsmanage/list"
		}).state("loginLayout.youzanuserlogin", {
			url: "/youzanauth",
			templateUrl: "login/login_youzan.html",
			controller: "YouzanUserLoginCtrl",
			controllerUrl: "login/login_youzan"
		}).state("mainLayout.addgoods", {
			url: "/ecshop/goodsmanage/addgoods/:good_id",
			templateUrl: "ecshop/goodsmanage/addgoods.html",
			controller: "AddGoodsCtrl",
			controllerUrl: "ecshop/goodsmanage/addgoods"
		}).state("mainLayout.ordersituation", {
			url: "/ecshop/ordersituation",
			templateUrl: "ecshop/orderSituation/order_situation.html",
			controller: "orderSituation",
			controllerUrl: "ecshop/orderSituation/order_situation"
		}).state("mainLayout.goodcategory", {
			url: "/ecshop/goodsmanage/goodcategory",
			templateUrl: "ecshop/goodsmanage/goodcategory.html",
			controller: "GoodCategoryCtrl",
			controllerUrl: "ecshop/goodsmanage/goodcategory"
		}).state("mainLayout.orderlist", {
			url: "/ecshop/ordermanage/orderlist/?type",
			templateUrl: "ecshop/ordermanage/list.html",
			controller: "OrderManageListCtrl",
			controllerUrl: "ecshop/ordermanage/list"
		}).state("mainLayout.ordersdetails", {
			url: "/ecshop/ordermanage/orderlist/:order_no",
			templateUrl: "ecshop/ordermanage/details.html",
			controller: "OrderManageDetailsCtrl",
			controllerUrl: "ecshop/ordermanage/details"
		}).state("mainLayout.newpostcostmodel", {
			url: "/ecshop/postcost/newpostcostmodel",
			templateUrl: "ecshop/postcost/newpostcostmodel.html",
			controller: "NewPostCostModelCtrl",
			controllerUrl: "ecshop/postcost/newpostcostmodel"
		}).state("mainLayout.postcostlist", {
			url: "/ecshop/postcost/postcostlist",
			templateUrl: "ecshop/postcost/postcostlist.html",
			controller: "PostCostListCtrl",
			controllerUrl: "ecshop/postcost/postcostlist"
		}).state("mainLayout.editpostcostmodel", {
			url: "/ecshop/postcost/editpostcostmodel/:model_id",
			templateUrl: "ecshop/postcost/editpostcostmodel.html",
			controller: "EditPostCostModelCtrl",
			controllerUrl: "ecshop/postcost/editpostcostmodel"
		}).state("mainLayout.assesslist", {
			url: "/ecshop/assessmanage/assesslist",
			templateUrl: "ecshop/assessmanage/list.html",
			controller: "AssessManageListCtrl",
			controllerUrl: "ecshop/assessmanage/list"
		}).state("mainLayout.assessdetails", {
			url: "/ecshop/assessmanage/assessdetails/:product_id",
			templateUrl: "ecshop/assessmanage/details.html",
			controller: "AssessManageDetailsCtrl",
			controllerUrl: "ecshop/assessmanage/details"
		}).state("mainLayout.marketingtools", {
			url: "/ecshop/marketingtools",
			templateUrl: "ecshop/marketingtools/index.html",
			controller: "MarketingTollsCtrl",
			controllerUrl: "ecshop/marketingtools/index"
		}).state("mainLayout.fullbenefit", {
			url: "/ecshop/marketingtools/fullbenefit/index",
			templateUrl: "ecshop/marketingtools/fullbenefit/index.html",
			controller: "FullBenefitCtrl",
			controllerUrl: "ecshop/marketingtools/fullbenefit/index"
		}).state("mainLayout.createfullbenefit", {
			url: "/ecshop/marketingtools/fullbenefit/form/:product_id",
			templateUrl: "ecshop/marketingtools/fullbenefit/form.html",
			controller: "createuFllBenefitCtrl",
			controllerUrl: "ecshop/marketingtools/fullbenefit/form"
		}).state("mainLayout.coupon", {
			url: "/ecshop/marketingtools/coupon/index",
			templateUrl: "ecshop/marketingtools/coupon/index.html",
			controller: "CouponCtrl",
			controllerUrl: "ecshop/marketingtools/coupon/index"
		}).state("mainLayout.createcoupon", {
			url: "/ecshop/marketingtools/coupon/form/:product_id",
			templateUrl: "ecshop/marketingtools/coupon/form.html",
			controller: "createCouponCtrl",
			controllerUrl: "ecshop/marketingtools/coupon/form"
		}).state("mainLayout.discount", {
			url: "/ecshop/marketingtools/discount/index",
			templateUrl: "ecshop/marketingtools/discount/index.html",
			controller: "DiscountCtrl",
			controllerUrl: "ecshop/marketingtools/discount/index"
		}).state("mainLayout.editdiscount", {
			url: "/ecshop/marketingtools/discount/form/:product_id",
			templateUrl: "ecshop/marketingtools/discount/form.html",
			controller: "EditDiscountCtrl",
			controllerUrl: "ecshop/marketingtools/discount/form"
		}).state("mainLayout.aftersalelist", {
			url: "/ecshop/aftersale/list",
			templateUrl: "ecshop/aftersale/list.html",
			controller: "AfterSaleListCtrl",
			controllerUrl: "ecshop/aftersale/list"
		}).state("mainLayout.aftersaledetails", {
			url: "/ecshop/aftersale/details/:product_id",
			templateUrl: "ecshop/aftersale/details.html",
			controller: "AfterSaleDetailsCtrl",
			controllerUrl: "ecshop/aftersale/details"
		}), "medium" == server.version && $stateProvider.state("mainLayout.channel", {
			url: "/medium/channel/:modelId",
			templateUrl: "medium/channel/index.html",
			controller: "ChannelCtrl",
			controllerUrl: "medium/channel/index"
		}).state("mainLayout.radio", {
			url: "/medium/radio/:modelId",
			templateUrl: "medium/channel/index.html",
			controller: "ChannelCtrl",
			controllerUrl: "medium/channel/index"
		}).state("mainLayout.program", {
			url: "/medium/program/:modelId",
			templateUrl: "medium/program/index.html",
			controller: "ProgramCtrl",
			controllerUrl: "medium/program/index"
		}).state("mainLayout.material", {
			url: "/medium/material",
			templateUrl: "medium/material/index.html",
			controller: "MaterialCtrl",
			controllerUrl: "medium/material/index"
		}).state("mainLayout.useprofile", {
			url: "/medium/useprofile",
			templateUrl: "medium/useprofile/index.html",
			controller: "UseprofileCtrl",
			controllerUrl: "medium/useprofile/index"
		}).state("secondLayout.channelform", {
			url: "/medium/channel/channelform/:modelId/:id",
			templateUrl: "medium/channel/form.html",
			controller: "ChannelFormCtrl",
			controllerUrl: "medium/channel/form"
		}).state("mainLayout.programlist", {
			url: "/medium/program/programlist/:modelId/:channelId",
			templateUrl: "medium/program/programlist.html",
			controller: "ProgramListCtrl",
			controllerUrl: "medium/program/programlist"
		}).state("mainLayout.vod", {
			url: "/medium/vod/:model_id",
			templateUrl: "medium/vod/index.html",
			controller: "AudioVodCtrl",
			controllerUrl: "medium/audio/index"
		}).state("mainLayout.audio", {
			url: "/medium/audio/:model_id",
			templateUrl: "medium/audio/index.html",
			controller: "AudioVodCtrl",
			controllerUrl: "medium/audio/index"
		}).state("secondLayout.contentformmedia", {
			url: "/medium/form/:model_id/:id/:is_media",
			templateUrl: "content/list/form.html",
			controller: "ContentFormCtrl",
			controllerUrl: "content/list/form"
		}), "ecshop" == server.version && $stateProvider.state("mainLayout.goodslist", {
			url: "/ecshop/goodsmanage/goodslist",
			templateUrl: "ecshop/goodsmanage/list.html",
			controller: "GoodsManageListCtrl",
			controllerUrl: "ecshop/goodsmanage/list"
		}).state("loginLayout.youzanuserlogin", {
			url: "/youzanauth",
			templateUrl: "login/login_youzan.html",
			controller: "YouzanUserLoginCtrl",
			controllerUrl: "login/login_youzan"
		}).state("mainLayout.addgoods", {
			url: "/ecshop/goodsmanage/addgoods/:good_id",
			templateUrl: "ecshop/goodsmanage/addgoods.html",
			controller: "AddGoodsCtrl",
			controllerUrl: "ecshop/goodsmanage/addgoods"
		}).state("mainLayout.goodcategory", {
			url: "/ecshop/goodsmanage/goodcategory",
			templateUrl: "ecshop/goodsmanage/goodcategory.html",
			controller: "GoodCategoryCtrl",
			controllerUrl: "ecshop/goodsmanage/goodcategory"
		}).state("mainLayout.orderlist", {
			url: "/ecshop/ordermanage/orderlist",
			templateUrl: "ecshop/ordermanage/list.html",
			controller: "OrderManageListCtrl",
			controllerUrl: "ecshop/ordermanage/list"
		}).state("mainLayout.ordersdetails", {
			url: "/ecshop/ordermanage/orderlist/:order_no",
			templateUrl: "ecshop/ordermanage/details.html",
			controller: "OrderManageDetailsCtrl",
			controllerUrl: "ecshop/ordermanage/details"
		}).state("mainLayout.newpostcostmodel", {
			url: "/ecshop/postcost/newpostcostmodel",
			templateUrl: "ecshop/postcost/newpostcostmodel.html",
			controller: "NewPostCostModelCtrl",
			controllerUrl: "ecshop/postcost/newpostcostmodel"
		}).state("mainLayout.postcostlist", {
			url: "/ecshop/postcost/postcostlist",
			templateUrl: "ecshop/postcost/postcostlist.html",
			controller: "PostCostListCtrl",
			controllerUrl: "ecshop/postcost/postcostlist"
		}).state("mainLayout.editpostcostmodel", {
			url: "/ecshop/postcost/editpostcostmodel/:model_id",
			templateUrl: "ecshop/postcost/editpostcostmodel.html",
			controller: "EditPostCostModelCtrl",
			controllerUrl: "ecshop/postcost/editpostcostmodel"
		}).state("mainLayout.assesslist", {
			url: "/ecshop/assessmanage/assesslist",
			templateUrl: "ecshop/assessmanage/list.html",
			controller: "AssessManageListCtrl",
			controllerUrl: "ecshop/assessmanage/list"
		}).state("mainLayout.assessdetails", {
			url: "/ecshop/assessmanage/assessdetails",
			templateUrl: "ecshop/assessmanage/details.html",
			controller: "AssessManageDetailsCtrl",
			controllerUrl: "ecshop/assessmanage/details"
		}).state("mainLayout.marketingtools", {
			url: "/ecshop/marketingtools",
			templateUrl: "ecshop/marketingtools/index.html",
			controller: "MarketingTollsCtrl",
			controllerUrl: "ecshop/marketingtools/index"
		}).state("mainLayout.fullbenefit", {
			url: "/ecshop/marketingtools/fullbenefit/index",
			templateUrl: "ecshop/marketingtools/fullbenefit/index.html",
			controller: "FullBenefitCtrl",
			controllerUrl: "ecshop/marketingtools/fullbenefit/index"
		}).state("mainLayout.createfullbenefit", {
			url: "/ecshop/marketingtools/fullbenefit/form/:product_id",
			templateUrl: "ecshop/marketingtools/fullbenefit/form.html",
			controller: "createuFllBenefitCtrl",
			controllerUrl: "ecshop/marketingtools/fullbenefit/form"
		}).state("mainLayout.coupon", {
			url: "/ecshop/marketingtools/coupon/index",
			templateUrl: "ecshop/marketingtools/coupon/index.html",
			controller: "CouponCtrl",
			controllerUrl: "ecshop/marketingtools/coupon/index"
		}).state("mainLayout.createcoupon", {
			url: "/ecshop/marketingtools/coupon/form/:product_id",
			templateUrl: "ecshop/marketingtools/coupon/form.html",
			controller: "createCouponCtrl",
			controllerUrl: "ecshop/marketingtools/coupon/form"
		}).state("mainLayout.discount", {
			url: "/ecshop/marketingtools/discount/index",
			templateUrl: "ecshop/marketingtools/discount/index.html",
			controller: "DiscountCtrl",
			controllerUrl: "ecshop/marketingtools/discount/index"
		}).state("mainLayout.editdiscount", {
			url: "/ecshop/marketingtools/discount/form/:product_id",
			templateUrl: "ecshop/marketingtools/discount/form.html",
			controller: "EditDiscountCtrl",
			controllerUrl: "ecshop/marketingtools/discount/form"
		}).state("mainLayout.aftersalelist", {
			url: "/ecshop/aftersale/list",
			templateUrl: "ecshop/aftersale/list.html",
			controller: "AfterSaleListCtrl",
			controllerUrl: "ecshop/aftersale/list"
		}).state("mainLayout.aftersaledetails", {
			url: "/ecshop/aftersale/details/:product_id",
			templateUrl: "ecshop/aftersale/details.html",
			controller: "AfterSaleDetailsCtrl",
			controllerUrl: "ecshop/aftersale/details"
		}), $locationProvider.html5Mode(!0)
	}]), app.run(["$rootScope", "$q", "$window", "$timeout", "$interval", "config", "$stateParams", "$mdDialog", "navconfig", "http", "utils", "notice", "appMakeService", "$state", "modelService", "youzanBindService", "mediumServ", function($rootScope, $q, $window, $timeout, $interval, config, $stateParams, $mdDialog, navconfig, http, utils, notice, appMakeService, $state, modelService, youzanBindService, mediumServ) {
		function getExpireDate(first_appinfo) {
			var expireDate = new Date(first_appinfo.expire_date),
				nowDate = new Date;
			expireDate > nowDate ? $rootScope.global_currentApp.over = !1 : $rootScope.global_currentApp.over = !0;
			var timeCha = new Date(first_appinfo.expire_date.replace(" ", "T")).getTime() - (new Date).getTime();
			console.log("timeCha: ", timeCha);
			var timeDay = 15;
			timeDay = 0 == first_appinfo.app_subscribed ? 14 : 15, angular.isNumber(timeCha / 1e3 / 60 / 60 / 24) && timeCha / 1e3 / 60 / 60 / 24 > timeDay ? $rootScope.global_currentApp.showTip = !1 : timeCha / 1e3 / 60 / 60 / 24 <= timeDay && timeCha / 1e3 / 60 / 60 / 24 > 1 ? ($rootScope.global_currentApp.showTip = !0, $rootScope.global_currentApp.overTimeStr = "还剩" + Math.ceil(timeCha / 1e3 / 60 / 60 / 24) + "天") : timeCha / 1e3 / 60 / 60 >= 1 && timeCha / 1e3 / 60 / 60 / 24 < 1 ? ($rootScope.global_currentApp.showTip = !0, $rootScope.global_currentApp.overTimeStr = "还剩" + Math.ceil(timeCha / 1e3 / 60 / 60) + "小时") : ($rootScope.global_currentApp.showTip = !0, $rootScope.global_currentApp.overTimeStr = "还剩" + Math.ceil(timeCha / 1e3 / 60) + "分钟")
		}
		$rootScope.timer = {}, $mdDialog && $mdDialog.cancel();
		var NProgress = require("nprogress");
		$rootScope.host = server.SITE_host, function() {
			var url = config.getAdminAPI("pagedesign.wxappConfig");
			http(url).then(function(data) {
				config.wxapp = data.result
			})
		}(), $rootScope.ValidateUser = function(routername) {
			var url = config.getAPI("user"),
				deferred = $q.defer(),
				promise = deferred.promise,
				_this = this;
			return http(url, {
				error_nonotice: "loginLayout.userlogin" == $state.$current.name
			}).then(function(json) {
				_this.userResult = json, deferred.resolve(json)
			}), promise
		}, $rootScope.checkUser = function(routername) {
			var nav_userpic = config.picConfig.nav_userpic,
				nav_userheadpic = config.picConfig.nav_userheadpic;
			$rootScope.ValidateUser(routername).then(function(data) {
				if (!data.error_code) {
					$rootScope.user = {}, $rootScope.user = data.user;
					var avatar = data.user.avatar;
					angular.isArray(avatar) && !avatar.length ? ($rootScope.user.userPic = "", $rootScope.user.userheadPic = "") : ($rootScope.user.userPic = utils.getImgUrl(data.user.avatar, nav_userpic.width, nav_userpic.height), $rootScope.user.userheadPic = utils.getImgUrl(data.user.avatar, nav_userheadpic.width, nav_userheadpic.height)), $rootScope.user.isAdmin = config.isAdmin($rootScope.user.uuid);
					var userinfo = $rootScope.user;
					$rootScope.$broadcast("checkUser", userinfo), data.user.task && data.user.task.app_template ? $state.go("modalMarketLayout.importstute") : ($rootScope.checkApp(), "loginLayout.userlogin" == routername && $state.go("mainLayout.index"))
				}
			})["catch"](function(reject) {
				"loginLayout.userlogin" != routername && $timeout(function() {
					$state.go("loginLayout.userlogin")
				}, 1500)
			})
		}, $rootScope.resetAPPandUserInfo = function() {
			var API = {
				resetUserInfo: function() {
					$rootScope.userResult = null, console.log($rootScope.userResult, "退出前用户信息")
				},
				resetNav: function() {
					$rootScope.copyNavconfig && (navconfig.navmenus = angular.copy($rootScope.copyNavconfig.navmenus))
				},
				resetAppList: function() {
					appMakeService.resetAppList()
				},
				resetModelList: function() {
					modelService.resetModelList()
				}
			};
			API.resetUserInfo(), API.resetNav(), API.resetAppList(), API.resetModelList(), $mdDialog && $mdDialog.cancel()
		}, $rootScope.checkApp = function() {
			appMakeService.getAppList().then(function(data) {
				var data = data.result;
				if (data && angular.isArray(data.applications) && data.applications.length) {
					var first_appinfo = data.applications[0],
						user_id = data.id;
					$rootScope.userId = user_id, $rootScope.global_currentApp = first_appinfo;
					var is_new = +first_appinfo.is_new;
					if (config.Appinfo = first_appinfo, 2 == is_new) {
						var url = config.getAPI("autoAnysnodecomponent");
						http(url, {
							method: "post"
						})
					}
					$rootScope.$broadcast("checkApp", first_appinfo), $rootScope.$broadcast("checkUserId", user_id);
					var version = server.version;
					!$state.$current || "mainLayout.businessAuth" === $state.$current.name || "mainLayout.noBusinessAuth" === $state.$current.name || "mainLayout.noBuyBusinessAuth" === $state.$current.name || "ecshop" != version || 1 == $rootScope.user.user_type || $stateParams.iscallback && "1" != $stateParams.iscallback || youzanBindService.init(), "medium" == version && mediumServ.checkAuthModal(), modelService.fetchModelList("normal", !1).then(function(modellist) {
						var modellist = modellist;
						getExpireDate(first_appinfo), $rootScope.$broadcast("model_broadcast", modellist)
					}), !$state.$current || "modalMarketLayout.appmarket" != $state.$current.name && "modalMarketLayout.appcreate" != $state.$current.name || ($mdDialog && $mdDialog.cancel(), $state.go("mainLayout.index"))
				} else {
					var user_id = data.id;
					$rootScope.$broadcast("checkUserId", user_id), checknoapp()
				}
			})["catch"](function() {});
			var checknoapp = function() {
					var noAppState = ["resolveplan", "resolvePlanLayout.moduledetial", "modalMarketLayout.appcreate", "modalMarketLayout.importstute", "modalMarketLayout.modulemarketlist", "modalMarketLayout.mallpay", "modalMarketLayout.moduleorderpay"];
					if ($state.$current) {
						var checkmun = D.indexOf(noAppState, $state.$current.name);
//						checkmun == -1 && $state.go("resolveplan", {
//							type: "shop"
//						})
						checkmun == -1 && $state.go("modalMarketLayout.appcreate", {
//							type: "shop"
						})
					}
				}
		}, $rootScope.$on("$stateChangeStart", function(event) {
			NProgress.start()
		}), $rootScope.$on("$stateChangeSuccess", function(event, to, toParams, from, fromParams) {
			var nameArr = ["loginLayout.wxlogin", "loginLayout.userregister", "loginLayout.forgetpassword", "layout_for_push.registersuccess", "layout_for_push.activatesuccess", "layout_for_push.activatefalse", "loginLayout.youzanuserlogin", "layout_for_push.customersystem", "resolveplan", "resolvePlanLayout.moduledetial", "specialmake"];
			nameArr.indexOf(to.name) < 0 && $rootScope.checkUser(to.name), $rootScope.timer.ios && $interval.cancel($rootScope.timer.ios), $rootScope.timer.android && $interval.cancel($rootScope.timer.android), $rootScope.timer && $interval.cancel($rootScope.timer), $rootScope.previousState = from.name, $rootScope.currentState = to.name, $window.scrollTo(0, 0), NProgress.done()
		}), $rootScope.$on("$stateChangeError", function(event) {
			$window.scrollTo(0, 0), NProgress.done()
		})
	}])
});