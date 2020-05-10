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
	var _json, _release, app = require("app"),
		server = require("./server"),
		Version = server.version ? server.version : "normal",
		host = server.host,
		baseUrl = server.API_dingdone;
	server.API_admin;
	app.constant("config", {
		host: host,
		API: {
			baseUrl: baseUrl,
			localUrl: "dist/json",
			login: server.loginUrl,
			json: (_json = {
				postdetails: "/content/list/postdetails.json",
				division: "/division.json",
				videolist: "/content/list/videolist.json",
				piclist: "/content/list/piclist.json",
				provincelist: "/province.json",
				citylist: "/city.json",
				districtlist: "/district.json",
				youzanuserlogin: "/user_system/youzanlogin.json",
				getpermissions: "/appmake/model/list/modifylimits.json",
				getchannellist: "/medium/channellist.json",
				goodsmanage: "/ecshop/goodsmanage/goodslist.json",
				ordermanage: "/ecshop/ordermanage/orderlist.json",
				orderlist: "/ecshop/ordermanage/orderlist.json",
				logistics: "/ecshop/ordermanage/logistics.json",
				orderdetails: "/ecshop/ordermanage/orderdetails.json",
				assesslist: "/ecshop/assessmanage/assesslist.json",
				assessdetails: "/ecshop/assessmanage/assessdetails.json",
				step1: "/ecshop/goodsmanage/step1.json",
				getSkuK: "/ecshop/goodsmanage/getSkuK.json",
				step2: "/ecshop/goodsmanage/addgood.json",
				editgoods: "/ecshop/goodsmanage/editgoods.json",
				getDeliveryTemplate: "/ecshop/goodsmanage/getDeliveryTemplate.json",
				getProductNodes: "/ecshop/goodsmanage/getProductNodes.json",
				appstorerecord: "/appstore/storerecord.json",
				appstore1: "/appstore/appstore1.json",
				appstore2: "/appstore/appstore2.json",
				refundlist: "/ecshop/aftersale/list.json",
				refunddetails: "/ecshop/aftersale/details.json",
				marketingtoolslist: "/ecshop/marketingtools/data1.json",
				fullbenediabox: "/ecshop/marketingtools/data2.json",
				superattr: "/attrs.json",
				creatactive: "/ecshop/marketingtools/creatActive.json",
				discountdata: "/ecshop/marketingtools/discount.json",
				editdiscountdata: "/ecshop/marketingtools/editdiscount.json",
				fullbenefitdata: "/ecshop/marketingtools/fullbenefit.json",
				fullbenefit: "/ecshop/marketingtools/fullbenefit.json",
				fullbenefit_creat: "/ecshop/marketingtools/fullbenefit_creat.json",
				fullbenefit_edit: "/ecshop/marketingtools/fullbenefit_edit.json",
				coupon: "/ecshop/marketingtools/coupon.json",
				coupon_creat: "/ecshop/marketingtools/coupon_creat.json",
				coupon_edit: "/ecshop/marketingtools/coupon_edit.json",
				productlist: "/ecshop/marketingtools/productlist.json",
				getpostcostlist: "/ecshop/postcost/proCityArea.json",
				postcostlist: "/ecshop/postcost/postcostmodellist.json",
				usercommentlist: "/interactive/index.json"
			}, _defineProperty(_json, "getpermissions", "/appmake/model/list/modifylimits.json"), _defineProperty(_json, "getmodelbindlist", "/content_copy/getmodelbindlist.json"), _defineProperty(_json, "datasourceconfig", "/content/model/dataSourceConfig.json"), _defineProperty(_json, "configdatasource", "/content/model/configdatasource.json"), _defineProperty(_json, "superattr", "/superattr/test.json"), _defineProperty(_json, "getextendviews", "/superattr/testviews.json"), _defineProperty(_json, "getExtendWidget", "/comps_setting.json"), _defineProperty(_json, "triggercondition", "/trigger/triggercondition.json"), _defineProperty(_json, "triggerbuysuccess", "/trigger/triggerbuysuccess.json"), _defineProperty(_json, "triggerusercomment", "/trigger/triggerusercomment.json"), _defineProperty(_json, "triggeruserdeletelike", "/trigger/triggeruserdeletelike.json"), _defineProperty(_json, "triggeruserlike", "/trigger/triggeruserlike.json"), _defineProperty(_json, "triggeruserdeletefavor", "/trigger/triggeruserdeletefavor.json"), _defineProperty(_json, "triggeruserfavor", "/trigger/triggeruserfavor.json"), _defineProperty(_json, "hanshu", "/trigger/hanshu.json"), _defineProperty(_json, "triggeruserregister", "/trigger/triggeruserregister.json"), _defineProperty(_json, "integral", "/integral/index.json"), _defineProperty(_json, "rechargerecord", "/integral/recharge.json"), _defineProperty(_json, "rechargerecordcount", "/integral/rechargecount.json"), _defineProperty(_json, "getWhiteList", "/appmake/model/pagemanage/getWhiteList.json"), _defineProperty(_json, "getFunPage", "/appmake/model/pagemanage/getWhiteList.json"), _defineProperty(_json, "getproducttag", "/appcreate/module/product-tags.json"), _defineProperty(_json, "views2", "/appmake/page_design/views2.json"), _defineProperty(_json, "getdetailcomptype", "/appmake/page_design/detailcomponenttype.json"), _defineProperty(_json, "getattributevalues", "/appmake/page_design/pagesetting.json"), _defineProperty(_json, "gettempbuyrecord", "/appmake/page_design/recordlist.json"), _defineProperty(_json, "getpagelist", "/appmake/page_design/pagelist.json"), _defineProperty(_json, "pageCategory", "/appmake/page_design/pageCategory.json"), _defineProperty(_json, "testtabitem", "/appmake/testtabitem.json"), _defineProperty(_json, "getstatistical", "/statistical.json"), _defineProperty(_json, "advancedLayout", "/appmake/advancedLayout.json"), _defineProperty(_json, "funmodule", "/appmake/funmodule/index.json"), _defineProperty(_json, "groupmanage", {
				getgrouplist: "/interactive/groupmanage/getgrouplist.json",
				searchgrouprole: "/interactive/groupmanage/searchgrouprole.json"
			}), _defineProperty(_json, "shake", {
				shakelist: "/shake/shakelist.json",
				pagelist: "/shake/pageActivity.json",
				shakePage: "/shake/shakePage.json"
			}), _json),
			release: (_release = {
				sycUC: "?action=uc_client_login",
				helper: "{guid}/helper/preview",
				configure: "common/get-configure",
				defaultmodel: "{guid}/model-template",
				diymodel: "{guid}/diy-model",
				copymodel: "{guid}/diy-model/apply-build-in-model",
				listnav: "{guid}/record/list-nav?model_id={model_id}",
				contentlist: "{guid}/record",
				updatefield: "{guid}/record/update/{field}/{value}",
				contentdel: "{guid}/record/delete",
				contentsort: "{guid}/record/sort",
				nodecreate: "{guid}/node/create",
				nodeupdate: "{guid}/node/update",
				nodedelete: "{guid}/node/delete",
				nodechildren: "{guid}/node?model_id={model_id}&parent_id={parent_id}",
				nodesort: "{guid}/node/sort",
				fieldtype: "{guid}/field-type",
				fieldtemplate: "{guid}/field-template",
				modeldatadetail: "{guid}/record/{id}/detail?model_id={model_id}",
				updatemodeldata: "{guid}/record/update",
				addmodeldata: "{guid}/record/create",
				upload: "?action=common/upload",
				uploadMaterial: "common/upload/material",
				createmodel: "{guid}/diy-model/create",
				editmodel: "{guid}/diy-model/update",
				deletemodel: "{guid}/diy-model/delete",
				mixfields: "{guid}/diy-model/mix-model-field",
				bindmixfield: "{guid}/diy-model/mix-model-field/bind",
				applantlayout: "{guid}/applant/layout?model_id={model_id}&node_id={node_id}",
				bindtpl: "{guid}/diy-model/model-bind-tpl",
				user: "?action=user_detail",
				stylelist: "{guid}/record/style",
				videoparse: "{guid}/common/parse-video",
				messagelist: "?action=notice&appid={guid}",
				addmessage: "{guid}/notice/create",
				updatemessage: "{guid}/notice/update",
				messagedetail: "notice/detail/{id}",
				modifynode: "{guid}/record/modify_node",
				cleardemodata: "v3/{guid}/record/delete-demo",
				havedemo: "v3/{guid}/record/demo-button",
				resetnodetpl: "{guid}/diy-model/unbind_node_tpl",
				defaultlayout: "{guid}/diy-model/template-setting/{tpl_unique}",
				diysetting: "{guid}/diy-model/diy-setting",
				getdiysetting: "{guid}/diy-model/get-diy-setting/{tpl_unique}",
				publishnotice: "{guid}/notice/publish",
				deletenotice: "{guid}/notice/delete",
				listennotice: "{guid}/notice/listenNotice",
				componentlib: "{guid}/diy-model/componentlib/{uniqueid}",
				creatediytpl: "{guid}/applant/layout/create",
				updatediytpl: "{guid}/applant/layout/update",
				deletediytpl: "applant/layout/delete",
				datasourceconfig: "application/{guid}/models/{model_slug}/data_source/",
				updateDatasourceconfig: "application/{guid}/models/{model_slug}/data_source/{source_id}/",
				modelfields: "application/{guid}/models/{model_id}/fields/"
			}, _defineProperty(_release, "deletediytpl", "{guid}/applant/layout/delete"), _defineProperty(_release, "native_component_create", "{guid}/template/component/create"), _defineProperty(_release, "getNativeTplDefaultAttr", "{guid}/template/config"), _defineProperty(_release, "views", {
				layoutViews: "layout_views/{view_key}/",
				getAttributeValues: "?action=application/views&appid={guid}&viewid={app_view_id}",
				getNormalAttributeValues: "application/{guid}/pages/{app_view_id}/style/",
				getGroupAttributeValues: "application/{guid}/submodules_views/{app_view_id}",
				getView: "?action=views/{view_key}",
				getWidgetList: "v3/{guid}/views/groups/{view_key}",
				getWidgetListBytpl: "v3/{guid}/views/tpl/groups/{view_key}",
				upload: "?action=image/upload",
				getTool: "?action=views/tools",
				getFormViews: "form_views/{view_key}/",
				getViewsData: "v3/{guid}/sku/{app_view_id}/settings"
			}), _defineProperty(_release, "getViewList", "application/{guid}/views2/{view_id}/")
			, _defineProperty(_release, "getSuperAttr", "?action=application/views&appid={guid}&viewid={app_view_id}")
			, _defineProperty(_release, "getTemplate", "views/tpl/{view_key}/"), _defineProperty(_release, "getimagelib", "resources/groups/{libtype}/"), _defineProperty(_release, "componentType", "views/scenes/form"), _defineProperty(_release, "extendViews", "views/scenes/extend_views/"), _defineProperty(_release, "pagedesign", {
				componentConfig: "am/configs/components/",
				wxappConfig: "?action=am_configs_wxapp",
				config: "am/configs/{config_key}/",
				deleteComponent: "v3/{guid}/component/delete",
				getComponentsList: "v3/{guid}/component/{module_id}/list",
				getCompData: "v3/{guid}/component/{comp_id}/get-data",
				setCompData: "v3/{guid}/component/set-data/{comp_id}",
				changeComponentInfo: "v3/{guid}/component/change/{comp_id}",
				getFilterCompConfig: "v3/{guid}/{model_id}/{comp_id}/filter-info",
				getFilterCustomField: "{guid}/component/{model_id}/get-sort-field",
				setCompStyle: "v3/{guid}/component/set-attr/{comp_id}",
				component_create: "v3/{guid}/component/create",
				detail_component_type: "v3/template-system/detail/category/list",
				component_temp: "v3/template-system/product/{type}/list",
				component_temp_replace: "v3/{guid}/template-import/component/{pageId}",
				category_list: "v3/template-system/component/category/list",
				search_list: "v3/template-system/category/search-function/list",
				modify_page_name: "v3/{guid}/module/edit",
				get_base_info: "v3/{guid}/module/{module_id}/detail",
				set_model_data: "v3/{guid}/module/set-model",
				component_sort: "v3/{guid}/component/order",
				getmodellist: "?action=model/get-model-list&appid={guid}",
				createPageParam: "v3/{guid}/module/parameters/create",
				deletePageParam: "v3/{guid}/module/parameters/delete",
				AppGlobalParam: "?action=application/global_params&appid={guid}",
				getnavigatorlist: "v3/{guid}/component/{id}/get-navigator",
				addnavigator: "v3/{guid}/component/navigator/item/create",
				deletenavigator: "v3/{guid}/component/navigator/item/delete",
				editnavigator: "v3/{guid}/component/navigator/item/edit",
				setnavigator: "v3/{guid}/component/set-navigator/{id}",
				navigatorsort: "v3/{guid}/component/navigator/item/order",
				getFunModule: "v3/{guid}/module/{type}/list",
				getFunViewId: "v3/{guid}/module/func-module/{uniqueid}/get-view-id",
				setFunStatus: "v3/{guid}/module/func-module/switch",
				getSkuParams: "v3/{guid}/model/get-sku-config",
				creatFunComponent: "v3/{guid}/module/search-func-module/component/create",
				delFunComponent: "v3/{guid}/module/search-func-module/component/delete",
				getGroupStyle: "v3/{guid}/module/get-submodules",
				setGroupStyle_old: "v3/{guid}/module/change-module-type",
				setGroupStyle: "v3/{guid}/template-import/page"
			}), _defineProperty(_release, "tempmarket", {
				gettempbuyrecord: "v3/template-system/pay-record/list",
				taglist: "v3/template-system/paid/template-type"
			}), _defineProperty(_release, "appglobaldesign", {
				setting: "?action=app/set-app-attr&appid={guid}",
				getfontlist: "?action=app/get-font&appid={guid}",
				getsystemconfig: "v3/{guid}/app/get-system-config",
				setsystemconfig: "v3/{guid}/app/set-system-config",
				exportapp: "v3/{application_id}/template-export/{level}",
				importApp: "v3/{application_id}/template-import/app",
				importModal: "v3/{application_id}/template-import/page",
				importComponent: "v3/{application_id}/template-import/component/{pageId}",
				importTable: "v3/{guid}/template-import/model",
				exportTable: "v3/{guid}/template-export/{level}"
			}), _defineProperty(_release, "userlogin", "index.php?action=login"), _defineProperty(_release, "youzanuserlogin", "user/login/youzan/"), _defineProperty(_release, "youzanlogin", "user/login/bind_shop/"), _defineProperty(_release, "youzanregister", "user/register/youzan/"), _defineProperty(_release, "getwechatstate", "social/login/wechat/"), _defineProperty(_release, "userregister", "user/register/"), _defineProperty(_release, "youzanlogin", "user/login/bind_shop/"), _defineProperty(_release, "wechatlogin", "third_part/auth_url/?provider=wechat&method=embed"), _defineProperty(_release, "wechatbind", "third_part/auth_url/?provider=wechat&method=embed&action=bind"), _defineProperty(_release, "validatecode", "verification_code/"), _defineProperty(_release, "youzanregister", "user/register/youzan/"), _defineProperty(_release, "getsechatswitch", "user/register/verify_code_status/"), _defineProperty(_release, "helperregister", "assistant/register/"), _defineProperty(_release, "testregisterfield", "user/check_account/"), _defineProperty(_release, "sendemailagain", "user/activation/send_email/"), _defineProperty(_release, "sendbindemail", "user/binding/send_email/"), _defineProperty(_release, "sendverifycode", "user/send_verify_code/"), _defineProperty(_release, "setnewpassword", "user/reset_password/"), _defineProperty(_release, "getusermessage", "user/current_user/"), _defineProperty(_release, "modifypersonalmessage", "user/profile/"), _defineProperty(_release, "modifypassword", "user/set_password/"), _defineProperty(_release, "patternPwd", "user/check_password/"), _defineProperty(_release, "modifyphonenumber", "user/binding/mobile/"), _defineProperty(_release, "modifyBind", "user/binding/"), _defineProperty(_release, "getthirduserinfo", "wechat/current_user/binding_info/"), _defineProperty(_release, "unbindweixin", "user/unbind/wechat/"), _defineProperty(_release, "emailinvitedhelper", "assistant/invite/"), _defineProperty(_release, "linkinvitedhelper", "assistant/invite_link/"), _defineProperty(_release, "gethelperlist", "application/{app_id}/assistants/"), _defineProperty(_release, "releasebind", "assistants/{user_id}/"), _defineProperty(_release, "giveupinvited", "assistant/invite/"), _defineProperty(_release, "getpermission", "assistants/{user_id}/permissions/"), _defineProperty(_release, "clearcache", "{guid}/user/{user_id}/clear-cache"), _defineProperty(_release, "authenticatedata", "developer/authentication/apply/"), _defineProperty(_release, "getauthenticationlist", "developer/certification_classification/"), _defineProperty(_release, "getcertificatelist", "developer/certificate_type/"), _defineProperty(_release, "getauthenticationpermssion", "developer/certification_type/permissions/"), _defineProperty(_release, "getseniorpermssion", "developer/senior_certification_type/permissions/"), _defineProperty(_release, "getolddata", "developer/developer_certification/apply_info/"), _defineProperty(_release, "getrecord", "developer/certification_records/"), _defineProperty(_release, "getauthentypeperm", "user/certification_type/permissions/?type_name="), _defineProperty(_release, "getcurrentuserperm", "user/current_permissions/"), _defineProperty(_release, "getseniordata", "developer/senior_developer/apply_info/"), _defineProperty(_release, "seniorauthenticate", "application/{app_id}/senior_developer/apply/")
			, _defineProperty(_release, "logout", "?action=user/logout")
			, _defineProperty(_release, "getyouzantoken", "{guid}/youzan/authorization/"), _defineProperty(_release, "getshopinfo", "{guid}/ecommerce/oauth/detail"), _defineProperty(_release, "youzanupdateshopinfo", "application/{guid}/youzan_shop_info/"), _defineProperty(_release, "youzanunbind", "application/{app_id}/third_party/?type=youzan"), _defineProperty(_release, "getconfigure", "common/get-configure"), _defineProperty(_release, "getorderlist", "{guid}/ecommerce/order/list"), _defineProperty(_release, "closeorder", "{guid}/ecommerce/order/{order_no}/close"), _defineProperty(_release, "changeprice", "{guid}/ecommerce/order/{order_no}/modify_price"), _defineProperty(_release, "getorderdetail", "{guid}/ecommerce/order/{order_id}/detail"), _defineProperty(_release, "setdelivery", "{guid}/ecommerce/order/delivery"), _defineProperty(_release, "get_yesterday_order_and_pay", "v3/{guid}/member-order"), _defineProperty(_release, "search_order_by_time", "v3/{guid}/member-order/search"), _defineProperty(_release, "get_withdraw_cash_value", "v3/{guid}/account/finances"), _defineProperty(_release, "verify_withdraw_cash_mod", "user/detail"), _defineProperty(_release, "activitylist", "{guid}/ecommerce/sales_activity/{promo_type}/list"), _defineProperty(_release, "activitysave", "{guid}/ecommerce/sales_activity/save"), _defineProperty(_release, "activitydelete", "{guid}/ecommerce/sales_activity/{promotion_id}/delete"), _defineProperty(_release, "activitydetail", "{guid}/ecommerce/sales_activity/{promotion_id}/detail"), _defineProperty(_release, "activitydisable", "{guid}/ecommerce/sales_activity/{promotion_id}/disable"), _defineProperty(_release, "effectivecoupon", "{guid}/ecommerce/coupon/list"), _defineProperty(_release, "oauthdetail", "{guid}/ecommerce/oauth/detail"), _defineProperty(_release, "templateslist", "{guid}/ecommerce/templates/list"), _defineProperty(_release, "edittemplates", "{guid}/ecommerce/templates/edit"), _defineProperty(_release, "copytemplates", "{guid}/ecommerce/templates/{template_id}/copy"), _defineProperty(_release, "deletetemplates", "{guid}/ecommerce/templates/{template_id}/delete"), _defineProperty(_release, "allmemberlist", "application/{guid}/members/"), _defineProperty(_release, "addmember", "application/{guid}/members/"), _defineProperty(_release, "createSearch", "application/{guid}/member_search/tags/"), _defineProperty(_release, "deleteSearchTag", "application/{guid}/member_search/tags/{id}/"), _defineProperty(_release, "searchlist", "application/{guid}/member_search/tags/"), _defineProperty(_release, "membergroup", "application/{guid}/member_groups/"), _defineProperty(_release, "creategroup", "application/{guid}/member_groups/"), _defineProperty(_release, "deletegroup", "application/{guid}/member_groups/{id}/"), _defineProperty(_release, "editgroups", "application/{guid}/member_groups/{id}/"), _defineProperty(_release, "extendList", "application/{guid}/member_profile/extension/"), _defineProperty(_release, "addextend", "application/{guid}/member_profile/extension/"), _defineProperty(_release, "delextend", "application/{guid}/member_profile/extension/"), _defineProperty(_release, "relationship", "application/{guid}/member_ability/relationship_mode/"), _defineProperty(_release, "membersinfo", "application/{guid}/members/{identifier}/"), _defineProperty(_release, "reset_password", "application/{guid}/members/{identifier}/reset_password/"), _defineProperty(_release, "operation_log", "application/{guid}/members/{identifier}/operation_log/"), _defineProperty(_release, "friendslist", "application/{guid}/members/{identifier}/friends/"), _defineProperty(_release, "blacklist", "application/{guid}/operation/blacklist/"), _defineProperty(_release, "optblacklist", "application/{guid}/operation/blacklist/"), _defineProperty(_release, "getMemberGroups", "application/{guid}/members/{identifier}/member_groups/"), _defineProperty(_release, "integral", {
				planslist: "application/{guid}/virtual_currency/plans/",
				addplan: "application/{guid}/virtual_currency/plans/",
				addplans: "application/{guid}/virtual_currency/plans/bulk_create/",
				updateplans: "application/{guid}/virtual_currency/plans/{plan_id}/",
				deleteplans: "application/{guid}/virtual_currency/plans/bulk_delete/",
				getrechargerecord: "application/{guid}/virtual_currency/charge_log/",
				rechargecount: "application/{guid}/virtual_currency/charge_log/profile/"
			}), _defineProperty(_release, "relation_ship", "application/{guid}/member_ability/relationship_mode/")
			, _defineProperty(_release, "relation_ship_config", "application/{guid}/member_ability/relationship_mode_config/")
			, _defineProperty(_release, "memberinvited", "application/{guid}/member_ability/invite/")
			, _defineProperty(_release, "memberinvited_config", "application/{guid}/member_ability/invite_config/")
			, _defineProperty(_release, "invite_page", "application/{guid}/invite_page/")
			, _defineProperty(_release, "open", "application/{guid}/member_ability/open/")
			, _defineProperty(_release, "open_config", "application/{guid}/member_ability/open_config/")
			, _defineProperty(_release, "register_login", "application/{guid}/member_ability/register_login/")
			, _defineProperty(_release, "register_login_config", "application/{guid}/member_ability/register_login_config/")
			, _defineProperty(_release, "invitedlist", "application/{guid}/members/invited/")
			, _defineProperty(_release, "approval", "application/{guid}/members/invited/{id}/approval/")
			, _defineProperty(_release, "sendmessages", "application/{guid}/invite_messages/")
			, _defineProperty(_release, "getmemberlist", "{guid}/app_member/get-member-list")
			, _defineProperty(_release, "getmemberdetails", "{guid}/app_member/{identifier}/get-member-info")
			, _defineProperty(_release, "getfans", "{guid}/app_member/{identifier}/{type}/get-fans")
			, _defineProperty(_release, "getextendlist", "{guid}/app_member/get-extend-list")
			, _defineProperty(_release, "setextend", "{guid}/app_member/set-extend")
			, _defineProperty(_release, "setgroup", "{guid}/app_member/set-group")
			, _defineProperty(_release, "getblacklist", "{guid}/app_member/get-black-list")
			, _defineProperty(_release, "addtoblacklist", "{guid}/app_member/add-black")
			, _defineProperty(_release, "getreportlist", "{guid}/app_member/get-report-list")
			, _defineProperty(_release, "setreport", "{guid}/app_member/set-report")
			, _defineProperty(_release, "resetPassword", "{guid}/app_member/reset-password")
			, _defineProperty(_release, "getsections", "{guid}/community/sections")
			, _defineProperty(_release, "addsections", "{guid}/community/section/create")
			, _defineProperty(_release, "sectionsort", "{guid}/community/section/sort")
			, _defineProperty(_release, "createcommunity", "{guid}/community")
			, _defineProperty(_release, "updatecommunity", "{guid}/community/update")
			, _defineProperty(_release, "getreviewconfig", "{guid}/community/app-config")
			, _defineProperty(_release, "updatereviewconfig", "{guid}/community/update-app-config")
			, _defineProperty(_release, "updatesections", "{guid}/community/section/update/{section_id}")
			, _defineProperty(_release, "deletesections", "{guid}/community/section/{section_id}")
			, _defineProperty(_release, "deletepost", "{guid}/community/posts/delete")
			, _defineProperty(_release, "movepost", "{guid}/community/posts/move")
			, _defineProperty(_release, "getposts", "{guid}/community/posts")
			, _defineProperty(_release, "getpostsdetails", "{guid}/community/posts/{id}/detail")
			, _defineProperty(_release, "getcomments", "{guid}/community/comments")
			, _defineProperty(_release, "handlecomment", "{guid}/community/comment/{id}")
			, _defineProperty(_release, "changepoststype", "{guid}/community/posts/{id}"), _defineProperty(_release, "allpost", "{guid}/community/member/{member_id}/posts"), _defineProperty(_release, "allcomment", "{guid}/community/member/{member_id}/comment"), _defineProperty(_release, "getchatmember", "{guid}/im/members"), _defineProperty(_release, "getchatgroups", "{guid}/im/groups"), _defineProperty(_release, "getmembergroup", "{guid}/im/members?group_id={group_id}"), _defineProperty(_release, "creatchatgroups", "{guid}/im/group"), _defineProperty(_release, "getchatdetails", "{guid}/im/group/{group_id}"), _defineProperty(_release, "delchatgroups", "{guid}/im/group/{group_id}"), _defineProperty(_release, "updatechatgroups", "{guid}/im/group/{group_id}/update"), _defineProperty(_release, "getusercommentlist", "v3/{guid}/comment/list"), _defineProperty(_release, "deleteusercomment", "v3/{guid}/comment/delete"), _defineProperty(_release, "replyassess", "v3/{guid}/comment/reply_comment"), _defineProperty(_release, "getcommentlist", "{guid}/ecommerce/products/comment/list"), _defineProperty(_release, "deletecomment", "{guid}/ecommerce/comment/delete"), _defineProperty(_release, "replyassess", "{guid}/ecommerce/products/reply_comment"), _defineProperty(_release, "updatecommentlist", "v3/{guid}/comment/audit"), _defineProperty(_release, "appModuleList", "{guid}/module/show"), _defineProperty(_release, "modelList", "{guid}/diy-model?scope=filter"), _defineProperty(_release, "appmodulesort", "{guid}/module/sortModules"), _defineProperty(_release, "addmoduleinfo", "{guid}/module/edit"), _defineProperty(_release, "getdefaulticon", "{guid}/module/getSelectModuleIcon")
			, _defineProperty(_release, "getappbaseinfo", "?action=application/detail&appid={guid}")
			, _defineProperty(_release, "updateappbaseinfo", "?action=application/update&appid={guid}")
			, _defineProperty(_release, "updateaboutus", "v3/{guid}/app/update-aboutus")
			, _defineProperty(_release, "getapplist", "?action=application/list")
			, _defineProperty(_release, "getbusiness", "?action=business&appid={guid}"), _defineProperty(_release, "getcompanydata", "{guid}/business/company-type"), _defineProperty(_release, "getbilldata", "{guid}/business/company-invoice-type"), _defineProperty(_release, "getyouzanauth", "application/{guid}/yzservice_status/?service=app&sku=pro"), _defineProperty(_release, "removeLogo", "{guid}/business/is-remove"), _defineProperty(_release, "getPayRecord", "{guid}/business/pay-record"), _defineProperty(_release, "downloadCert", "{guid}/business/get-image"), _defineProperty(_release, "applybusiness", "{guid}/business/apply"), _defineProperty(_release, "payConfirm", "{guid}/business/confirm")
			, _defineProperty(_release, "getversion", "?action=application/version&appid={guid}")
			, _defineProperty(_release, "getappmessage", "?action=application/get-sms-count&appid={guid}")
			, _defineProperty(_release, "getsms", "v3/template-system/product/sms/list?product_type=sms"), _defineProperty(_release, "getHomeStatistics", "{guid}/application/getstatistics?start_time={start_time}&end_time={end_time}"), _defineProperty(_release, "getStatisticsData", "v3/{guid}/statistics/app/device/trend"), _defineProperty(_release, "getActivateData", "v3/{guid}/statistics/app/activate/trend"), _defineProperty(_release, "getAddUntreatedInfo", "v3/{guid}/statistics/manage"), _defineProperty(_release, "getStatisticSummary", "v3/{guid}/statistics/app/device/nums"), _defineProperty(_release, "getActivateSummary", "v3/{guid}/statistics/app/activate/nums"), _defineProperty(_release, "getwhitelist", "{guid}/component/h5-list")
			, _defineProperty(_release, "getAppIconConfig", "?action=application/icon-config")
			, _defineProperty(_release, "generateAppIcon", "?action=application/generate-icon")
			, _defineProperty(_release, "getSystemStartupConfig", "?action=application/startup-config")
			, _defineProperty(_release, "getSystemStartupPic", "?action=application/startup-picture")
			, _defineProperty(_release, "createApp", "?action=application/create")
			, _defineProperty(_release, "getMainUIList", "?action=application/main-ui-config")
			, _defineProperty(_release, "setMainUI", "{guid}/application/set-main-ui"), _defineProperty(_release, "rainbowsubscribe", "rainbow/channel/subscribe"), _defineProperty(_release, "community", "{guid}/community/sections")
			, _defineProperty(_release, "getSuperAttr", "?action=application/views&appid={guid}&viewid={app_view_id}")
			, _defineProperty(_release, "getViewList", "?action=application/views2&appid={guid}&viewid={app_view_id}"), _defineProperty(_release, "componentType", "views/scenes/form"), _defineProperty(_release, "getFunAttr", "views/{view_id}/"), _defineProperty(_release, "getviewList", "application/{guid}/views2/{view_id}/"), _defineProperty(_release, "getimagelib", "resources/groups/{libtype}/"), _defineProperty(_release, "autoAnysnodecomponent", "{guid}/module/setfilternodecomponent"), _defineProperty(_release, "getModelBindList", "{guid}/diy-model/model-bind-detail/{model_id}"), _defineProperty(_release, "addModelBind", "{guid}/diy-model/model-bind-create"), _defineProperty(_release, "editModelBind", "{guid}/diy-model/model-bind-update/{id}"), _defineProperty(_release, "deleteModelBind", "{guid}/diy-model/model-bind-delete/{id}"), _defineProperty(_release, "copyContent", "{guid}/record/copy"), _defineProperty(_release, "getpermnum", "user/permissions")
			, _defineProperty(_release, "getprovince", "?action=common/province/list")
			, _defineProperty(_release, "getcity", "?action=common/province/city&province_code={province_code}")
			, _defineProperty(_release, "getRaion", "common/province/{city_code}/area")
			, _defineProperty(_release, "setthirdpartservice", "?action=app/set-third-part-service&appid={guid}")
			, _defineProperty(_release, "getrelversion", "?action=application/build/version_code&appid={guid}&is_release={isrelease}")
			, _defineProperty(_release, "getpackagestatus", "?action=application/build/status&appid={guid}&id={id}")
			, _defineProperty(_release, "dopackage", "?action=application/build/package&appid={guid}")
			, _defineProperty(_release, "getguidepic", "?action=application/guide-picture&appid={guid}")
			, _defineProperty(_release, "getversionlog", "?action=application/version-log&client_type={client_type}&page={current}")
			, _defineProperty(_release, "h5preview", "{guid}/application/h5/preview")
			, _defineProperty(_release, "storeguide", "?action=application/store-guide&appid={guid}")
			, _defineProperty(_release, "deleteguide", "?action=application/delete-guide&appid={guid}&id={id}")
			, _defineProperty(_release, "sortguide", "{guid}/application/sort-guide"), _defineProperty(_release, "getdemoapp", "application/demo-app-config")
			, _defineProperty(_release, "getpackageinfo", "?action=application/package-info&appid={guid}")
			, _defineProperty(_release, "geturilist", "{guid}/uri-scheme/uris?group_key={group_key}"), _defineProperty(_release, "getadminurilist", "v3/{guid}/group/{group_key}/uris"), _defineProperty(_release, "geturidetail", "{guid}/uri-scheme/uri/{uri_id}"), _defineProperty(_release, "getadminuridetail", "uri/{uri_id}/"), _defineProperty(_release, "changechannelstatus", "{guid}/media/channel_status/{id}/{channel_status}"), _defineProperty(_release, "uploadmedia", "{guid}/media/vod_upload"), _defineProperty(_release, "createprogram", "{guid}/media/{record_id}/programme/create"), _defineProperty(_release, "programme_detail", "{guid}/media/{record_id}/{programme_time}/programme_detail"), _defineProperty(_release, "setfont", "{guid}/application/set-font"), _defineProperty(_release, "transcoding", "{guid}/media/transcoding/{record_id}"), _defineProperty(_release, "getsnap", "{guid}/media/snap/{record_id}"), _defineProperty(_release, "setindexpic", "{guid}/media/replace_indexpic/{record_id}"), _defineProperty(_release, "getadvertlist", "{guid}/advert/adlist"), _defineProperty(_release, "createadvert", "{guid}/advert/create"), _defineProperty(_release, "getadvertdetail", "{guid}/advert/{id}/detail"), _defineProperty(_release, "modifystatus", "{guid}/advert/{id}/{status}/update"), _defineProperty(_release, "deletadvert", "{guid}/advert/delete"), _defineProperty(_release, "getfeedbacklist", "{guid}/feedback/fblist"), _defineProperty(_release, "getbacklist", "{guid}/feedback/get-reply-list"), _defineProperty(_release, "replycontent", "{guid}/feedback/save"), _defineProperty(_release, "delallreply", "{guid}/feedback/deleteAll"), _defineProperty(_release, "delsinglereply", "{guid}/feedback/delete")
			, _defineProperty(_release, "getpushcondition", "?action=push/index&appid={guid}")
			, _defineProperty(_release, "savepromotepic", "{guid}/push/promote")
			, _defineProperty(_release, "getmoduleinfo", "{guid}/push/get-module")
			, _defineProperty(_release, "getcontentinfo", "{guid}/push/get-content")
			, _defineProperty(_release, "sendpush", "v3/{guid}/push/send")
			, _defineProperty(_release, "getpushlist", "?action=push/plist&appid={guid}")
			, _defineProperty(_release, "deletpush", "{guid}/push/delete")
			, _defineProperty(_release, "recordlistall", "{guid}/record")
			, _defineProperty(_release, "getappstoreinfo", "{guid}/push/apply-check")
			, _defineProperty(_release, "applystore", "{guid}/store/send")
			, _defineProperty(_release, "normalappstore", "{guid}/push/store")
			, _defineProperty(_release, "appstoresku", "v3/template-system/product/detail?product_id={product_id}"), _defineProperty(_release, "appstorerecord", "v3/{guid}/app-shelves/apply/list"), _defineProperty(_release, "eshoplistnav", "v3/{guid}/record/list-nav?model_id={model_id}"), _defineProperty(_release, "recorddetial", "v3/{guid}/app-shelves/detail?client_key={client_key}&is_self={is_self}"), _defineProperty(_release, "appstoreinfo", "{guid}/store/detail?client_key={client_key}&is_self={is_self}"), _defineProperty(_release, "appstoreupload", "{guid}/push/pic-upload"), _defineProperty(_release, "buyappstore", "{guid}/store/apply-pay"), _defineProperty(_release, "confirmbuymoney", "{guid}/store/apply-pay/confirm"), _defineProperty(_release, "buyappstoreinfo", "{guid}/store/apply-pay/detail?client_key={client_key}"), _defineProperty(_release, "appstoreremain", "{guid}/store/remain-times?client_key={client_key}"), _defineProperty(_release, "appstoreapptype", "{guid}/store/android-market-category/list"), _defineProperty(_release, "appstoreapptype_c", "{guid}/store/android-market-category/list?parent_id={parent_id}"), _defineProperty(_release, "appstorechargetype", "{guid}/store/charge-type/list"), _defineProperty(_release, "appstorelanguagetype", "{guid}/store/language/list"), _defineProperty(_release, "appstorepublishtype", "{guid}/store/publish-type/list"), _defineProperty(_release, "getstoreinfo", {
				getappstoreinfo: "v3/{guid}/push/apply-check",
				appstoreinfo: "v3/{guid}/app-shelves/detail?client_key={client_key}&is_self={is_self}",
				appstoreremain: "v3/{guid}/app-shelves/remain-times?client_key={client_key}",
				appstoreinfobyid: "v3/{guid}/app-shelves/detail?id={id}",
				applystore: "v3/{guid}/app-shelves/send",
				normalappstore: "v3/{guid}/push/store",
				appstorerecord: "v3/{guid}/app-shelves/list?client_key={client_key}&is_self={is_self}",
				recorddetial: "v3/{guid}/app-shelves/list/detail?id={id}",
				appstoreupload: "v3/{guid}/push/pic-upload",
				buyappstore: "v3/{guid}/app-shelves/apply-pay",
				confirmbuymoney: "v3/{guid}/app-shelves/apply-pay/confirm",
				buyappstoreinfo: "v3/{guid}/app-shelves/apply-pay/detail?client_key={client_key}",
				appstoreapptype: "v3/{guid}/app-shelves/android-market-category/list",
				appstoreapptype_c: "v3/{guid}/app-shelves/android-market-category/list?parent_id={parent_id}",
				appstorechargetype: "v3/{guid}/app-shelves/charge-type/list",
				appstorelanguagetype: "v3/{guid}/app-shelves/language/list",
				appstorepublishtype: "v3/{guid}/app-shelves/publish-type/list"
			}), _defineProperty(_release, "uodatacertificate", "{guid}/push/replace-cert"), _defineProperty(_release, "resetsecretkey", "application/{app_id}/reset_dev_secret/"), _defineProperty(_release, "communitymanage", "{guid}/community/smartcity/login"), _defineProperty(_release, "communityforum", "{guid}/community/smartcity/forum"), _defineProperty(_release, "importcommunity", "{guid}/community/import/seekhelp"), _defineProperty(_release, "getimportstatus", "{guid}/community/import/queue"), _defineProperty(_release, "checkurl", "domains/status/?url={url}")
			, _defineProperty(_release, "createApp", {
				create: "?action=application/create",
				updateappinfo: "?action=application/update&appid={guid}",
				updataAppIcon: "v3/application/generate-icon",
				importApp: "?action=template-import/app",
				appQueue: "?action=dingdone-task/status"
			}), _defineProperty(_release, "template_system", {
				import_level: "v3/template-system/import/{level}",
				productlist: "?action=template-system/product/{type}/list",
				productdetial: "?action=template-system/product/detail&product_id={product_id}",
				tagslist: "v3/template-system/tags/list",
				addtags: "v3/{guid}/template-system/tags",
				deltags: "v3/{guid}/template-system/tags",
				getCategories: "v3/{guid}/template-system/categories/type_map",
				upmodule: "v3/{guid}/template-system/{level}/apply-shelves",
				getCategorieDetail: "?action=template-system/product/detail",
				appstorebuyinfo: "?action=template-system/product/on_shelf/list&product_type={product_type}"
			}), _defineProperty(_release, "groupmanage", {
				setmaillist: "application/{guid}/im_ability/contact/",
				getmaillist: "application/{guid}/im_ability/contact_config/",
				imsetting: "application/{guid}/im_ability/im/",
				getimsettting: "application/{guid}/im_ability/im_config/",
				creategroup: "application/{guid}/im/groups/",
				editgroup: "application/{guid}/im/groups/{group_id}/",
				deletegroup: "application/{guid}/im/groups/{group_id}/",
				getgroupinfo: "application/{guid}/im/groups/{group_id}/",
				getgrouplist: "application/{guid}/im/groups/",
				searchappmember: "application/{guid}/members",
				searchgrouprole: "application/{guid}/im/groups/{group_id}/members/",
				updategrouprole: "application/{guid}/im/groups/{group_id}/members/{user_id}/",
				createcustomer: "application/{guid}/im/customer_services/"
			}), _defineProperty(_release, "pageManage", {
				pagelist: "v3/{guid}/module/list",
				pagedetail: "v3/{guid}/module/{module_id}/detail",
				deletepagelist: "v3/{guid}/module/delete",
				getInitialpage: "v3/{guid}/module/get-start-page",
				getpagelist: "v3/{guid}/module/type/list",
				setInitialpage: "v3/{guid}/module/set-start-page/{id}",
				createpage: "v3/{guid}/module/create",
				getparames: "v3/{guid}/module/{module_id}/get-parameters",
				sortpage: "v3/{guid}/module/order",
				portfoliopagelist: "v3/{guid}/module/set-group",
				portfoliopagedetail: "v3/{guid}/module/group-page/{id}/detail",
				addportfoliochild: "v3/{guid}/module/group-page/son-page/create",
				deletechildpage: "v3/{guid}/module/group-page/son-page/delete",
				editchildpage: "v3/{guid}/module/group-page/son-page/edit",
				portfoliopagetype: "v3/{guid}/module/get-submodules",
				portfoliopagesort: "v3/{guid}/module/group-page/son-page/order",
				getsharetpllist: "v3/{guid}/share/template/list",
				getsharetpldetail: "v3/{guid}/share/template/detail",
				getsharetplpreview: "v3/{guid}/share/template/preview",
				getsharetplbind: "v3/{guid}/share/{page_id}/module-bind-tpl",
				setsharefield: "v3/{guid}/share/{module_id}/module-bind-tpl",
				creatLinkPage: "v3/{guid}/module/set-page-url",
				getWhiteList: "v3/{guid}/module/get-white-list",
				setPageParams: "v3/{guid}/module/set-module-attr",
				getEvents: "am/configs/events/",
				getModalBind: "v3/{guid}/module/seekhelp/section-bind",
				getModalList: "v3/{guid}/module/seekhelp/section/list",
				postpermissions: "v3/{guid}/resource_perm/bulk",
				getassociatefield: "v3/{guid}/resource_perm/associate_fields",
				saveresourcesper: "v3/{guid}/resource_perm",
				updateresourcesper: "v3/{guid}/resource_perm/{id}",
				getresourcesper: "v3/{guid}/resource_perm/{id}",
				getgrouplist: "v3/{guid}/member/group",
				copypage: "v3/{guid}/module/copy"
			}), _defineProperty(_release, "triggerManage", {
				triggerlist: "{guid}/trigger",
				updateTrigger: "{guid}/trigger/{trigger_id}",
				gettriggermodel: "{guid}/trigger/model",
				gettriggerdetail: "{guid}/trigger/model/fields",
				createtrigger: "{guid}/trigger"
			}), _defineProperty(_release, "fieldAdvance", {
				getFunctions: "am/tpl_functions/"
			}), _defineProperty(_release, "dingdoneWidget", {
				widgetDataType: "v3/{guid}/widget/data-type",
				conditionOperator: "v3/{guid}/filter/filter-symbol/list",
				memberCondition: "v3/{guid}/model/{model_id}/get-condition"
			}), _defineProperty(_release, "modelfielddetail", "{guid}/diy-model/detail/{model_id}"), _defineProperty(_release, "contentModelV3", {
				fieldsForCondition: "v3/{guid}/model/{modelId}/get-fields",
				fieldsForBinding: "v3/{guid}/model/{modelId}/get-fields",
				requiremodel: "v3/{guid}/model/{model_id}/copy-data-fields",
				fieldQuote: "v3/{guid}/model/{modelId}/get-refer-fields",
				fieldtype: "v3/{guid}/model/get-field-type",
				nodename: "v3/{guid}/node/{node_id}/detail",
				diymodellist: "?action=model/get-model-list&appid={guid}",
				tplmodellist: "v3/{guid}/model/get-model-template",
				copymodel: "v3/{guid}/model/apply-model",
				normalfieldlist: "v3/{guid}/model/get-field-template",
				funfieldlist: "v3/{guid}/model/{modelId}/get-function-field",
				fieldwidgettype: "v3/{guid}/model/get-widget-type",
				fielddatatype: "v3/{guid}/model/get-data-type",
				fieldsave: "v3/{guid}/model/create",
				fieldupdate: "v3/{guid}/model/update",
				modeldetail: "v3/{guid}/model/detail/{id}?scope=reflex",
				deletemodel: "v3/{guid}/model/delete",
				recorddetial: "v3/{guid}/record/{contentId}/detail/{modelId}",
				recordcreate: "v3/{guid}/record/create",
				recordupdate: "v3/{guid}/record/update",
				recorddelete: "v3/{guid}/record/delete",
				recordlist: "v3/{guid}/record/get-content-list",
				createnode: "v3/{guid}/node/create",
				updatenode: "v3/{guid}/node/update",
				deletenode: "v3/{guid}/node/delete",
				getnodelist: "v3/{guid}/node/get-node-list",
				recordsort: "v3/{guid}/record/sort",
				issupportsort: "v3/{guid}/record/is-support-sort/{model_id}",
				getdetailpage: "v3/{guid}/detail-page-list/{modelId}",
				setdefaultpage: "v3/{guid}/module/set-default-detail-page"
			}), _defineProperty(_release, "v3modluelist", "v3/{guid}/module/type/list?module_id={module_id}"), _defineProperty(_release, "groupmanage", {
				setmaillist: "application/{guid}/im_ability/contact/",
				getmaillist: "application/{guid}/im_ability/contact_config/",
				imsetting: "application/{guid}/im_ability/im/",
				getimsettting: "application/{guid}/im_ability/im_config/",
				creategroup: "application/{guid}/im/groups/",
				editgroup: "application/{guid}/im/groups/{group_id}/",
				deletegroup: "application/{guid}/im/groups/{group_id}/",
				getgroupinfo: "application/{guid}/im/groups/{group_id}/",
				getgrouplist: "application/{guid}/im/groups/",
				searchappmember: "application/{guid}/members",
				searchgrouprole: "application/{guid}/im/groups/{group_id}/members/",
				updategrouprole: "application/{guid}/im/groups/{group_id}/members/{user_id}/",
				createcustomer: "application/{guid}/im/customer_services/",
				deletegrouprole: "application/{guid}/im/groups/{group_id}/members/bulk_delete/"
			}), _defineProperty(_release, "iconmanage", {
				getnavigatorlist: "v3/{guid}/navigator/list",
				setgroupicon: "v3/{guid}/navigator/upload-zip/{navigator_id}",
				getcomponentlist: "v3/{guid}/navigator-item/{navigator_id}/list",
				editnavigatoricon: "v3/{guid}/navigator/set-batch-icon/{navigator_id}"
			}), _defineProperty(_release, "telmanage", {
				tokenperson: "v3/{guid}/im/customer/list",
				getlenperson: "v3/{guid}/im/search-member",
				settelperson: "v3/{guid}/im/set-custom-service"
			}), _defineProperty(_release, "shakeItem", {
				shakePage: "v3/{guid}/activity/shake/default-images",
				addShake: "v3/{guid}/activity/shake/create",
				getGroup: "v3/{guid}/member/group",
				activityList: "v3/{guid}/activity/shake/list",
				delpageList: "v3/{guid}/activity/shake/{activityId}/delete",
				startpage: "v3/{guid}/activity/shake/{activityId}/switch",
				changeShake: "v3/{guid}/activity/shake/{activityId}/update",
				getactivitydetail: "v3/{guid}/activity/shake/{activityId}/detail",
				setImg: "v3/{guid}/activity/shake/{activityId}/switch-image"
			}), _defineProperty(_release, "helper", {
				getmess: "?action=help/get-qa"
			})
			, _defineProperty(_release, "dropdownrefresh", "?action=app/get-loading-icon&appid={guid}")
			, _release)
		},
		getAPI: function(key, model, ApihostKey) {
			var _this = this,
				API = this.API;
			model = model || "release";
			var baseUrl = "release" === model ? API.baseUrl : API.localUrl;
			if (API = "release" === model ? API.release : API.json, ApihostKey && (baseUrl = server[ApihostKey]), key || console.error("url 有误"), key.split(".").length > 1) {
				var arr = key.split("."),
					url = API[arr[0]][arr[1]];
				return url.indexOf("{guid}") > -1 && (url = url.replace("{guid}", _this.Appinfo.guid)), baseUrl + url
			}
			if (API[key]) {
				var apistr = API[key];
				if (API[key].indexOf("{guid}") > -1) var guid = _this.Appinfo ? _this.Appinfo.guid : "noguid",
					apistr = API[key].replace("{guid}", guid);
				return baseUrl + apistr
			}
		},
		getAdminAPI: function(key) {
			return this.getAPI(key, null, "API_admin")
		},
		ACCESS_TOKEN: "",
		picConfig: {
			list_indexpic: {
				width: 54,
				height: 36
			},
			form_singlepic: {
				width: 178,
				height: 178
			},
			form_multipic: {
				width: 220,
				height: 160
			},
			nav_userpic: {
				width: 85,
				height: 85
			},
			nav_userheadpic: {
				width: 30,
				height: 30
			}
		},
		colorConfig: {
			status: ["#838e9e", "#ffae47", "#1abc9c", "#ee8176"]
		},
		messageConfig: {
			category: {
				create: "创建分类成功!",
				update: "更新分类成功!",
				sizeerror: "分类名称最多不超过{num}字！",
				levelerror: "分类层级上限为{num}个！",
				level: "6",
				size: "40"
			},
			emptydata: {
				canaddList: "暂无内容,请尽快添加"
			},
			diytpl: {
				canAdd: "{name}不能超过{num}个!"
			}
		},
		listcount: [{
			name: "每页20条",
			id: 20
		}, {
			name: "每页40条",
			id: 40
		}, {
			name: "每页60条",
			id: 60
		}, {
			name: "每页80条",
			id: 80
		}, {
			name: "每页100条",
			id: 100
		}],
		modulelistcount: [{
			name: "每页10条",
			id: 10
		}, {
			name: "每页20条",
			id: 20
		}, {
			name: "每页30条",
			id: 30
		}, {
			name: "每页40条",
			id: 40
		}, {
			name: "每页50条",
			id: 50
		}],
		colorpickerDefault: {
			preferredFormat: "rgb",
			showInput: !0,
			showPalette: !0,
			chooseText: "确定",
			cancelText: "取消",
			palette: [
				["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
				["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
				["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
				["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
				["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
				["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
				["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
				["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
			]
		},
		listuitype: {
			card_ui: "单卡片模块",
			solidify_ui: "功能模块",
			filter_ui: "子模块组合"
		},
		diyurlserver: "subtemplates/{filepath}/lib/{filename}",
		diyurlfed: "previewtpl/{filepath}/lib/{filename}.html",
		replaceAll: function() {
			var str = arguments[0];
			return angular.forEach(arguments[1], function(arg, key) {
				str = str.replace("{" + key + "}", arg)
			}), str
		},
		administrator: ["QYAWY5HIAH", "AQ7994PP8A", "Y4J6VHRATU", "ISQ565DW3J"],
		isAdmin: function isAdmin(uuid) {
			var isAdmin = !1;
			return $.inArray(uuid, this.administrator) !== -1 && (isAdmin = !0), isAdmin
		},
		previewtpl: {
			mainui: "appPreview/mainui.html",
			component: "appPreview/component.html",
			module: "appPreview/module.html"
		},
		getInsideLink: {
			moduleurl: "dingdone://module?module_id={module_id}"
		},
		component: {
			ListUI1: {
				tpl: "appPreview/component/ListUI1.html"
			},
			Slider: {
				tpl: "appPreview/component/Slider.html"
			},
			EnhanceSlide: {
				tpl: "appPreview/component/EnhanceSlide.html"
			},
			denggaopic: {
				tpl: "appPreview/component/denggaopic.html"
			},
			PianoKey: {
				tpl: "appPreview/component/PianoKey.html"
			},
			search: {
				tpl: "appPreview/component/search.html"
			},
			WeatherUnit: {
				tpl: "appPreview/component/WeatherUnit.html"
			},
			OverTurn: {
				tpl: "appPreview/component/OverTurn.html"
			},
			SideSlip: {
				tpl: "appPreview/component/SideSlip.html"
			},
			navigator1: {
				tpl: "appPreview/component/ListUI1.html"
			},
			navigator2: {
				tpl: "appPreview/component/denggaopic.html"
			},
			navigator3: {
				tpl: "appPreview/component/navigator3.html"
			},
			ListUI2: {
				tpl: "appPreview/component/ListUI2.html"
			},
			ListUI3: {
				tpl: "appPreview/component/ListUI3.html"
			},
			ListUI4: {
				tpl: "appPreview/component/ListUI4.html"
			},
			ListUI6: {
				tpl: "appPreview/component/ListUI6.html",
				name: "卡片（左右滑）"
			},
			ListUI11: {
				tpl: "appPreview/component/ListUI11.html",
				name: "书签"
			},
			ListUI12: {
				tpl: "appPreview/component/ListUI12.html",
				name: "卡片层叠"
			},
			ListUI13: {
				tpl: "appPreview/component/ListUI13.html",
				name: "折叠"
			},
			ListUI14: {
				tpl: "appPreview/component/ListUI14.html"
			},
			ListUI15: {
				tpl: "appPreview/component/ListUI15.html"
			},
			ListUI5: {
				tpl: "appPreview/component/ListUI5.html"
			},
			Dislocate: {
				tpl: "appPreview/component/Dislocate.html"
			},
			ListUI7: {
				tpl: "appPreview/component/ListUI7.html"
			},
			filter_node: {
				tpl: "appPreview/component/filter_node.html"
			},
			filter_menu: {
				tpl: "appPreview/component/filter_menu.html"
			},
			ListUI16: {
				tpl: "appPreview/component/ListUI16.html"
			},
			CmpItemCard: {
				tpl: "appPreview/component/CmpItemCard.html"
			},
			list_component_standard: {
				tpl: "appPreview/component/list_component_standard.html"
			}
		},
		card_module: {
			ListUI6: {
				tpl: "appPreview/component/ListUI6.html",
				name: "卡片（左右滑）"
			},
			ListUI11: {
				tpl: "appPreview/component/ListUI11.html",
				name: "书签"
			},
			ListUI12: {
				tpl: "appPreview/component/ListUI12.html",
				name: "卡片层叠"
			},
			ListUI13: {
				tpl: "appPreview/component/ListUI13.html",
				name: "折叠"
			},
			ListUI3: {
				tpl: "appPreview/component/ListUI3.html",
				name: "瀑布流"
			},
			ListUI15: {
				tpl: "appPreview/component/ListUI15.html",
				name: "画册大图"
			}
		},
		function_module: {
			seekhelp2: "seekhelp2",
			seekhelp3: "seekhelp3",
			seekhelp4: "seekhelp4",
			community: "community",
			html5: "html5",
			aboutus: "aboutus",
			weather: "weather",
			eb_shopping_cart: "eb_shopping_cart",
			im: "im",
			publish: "publish",
			submodules1: "submodules1",
			submodules2: "submodules2",
			submodules3: "submodules3",
			submodules4: "submodules4",
			submodules5: "submodules5",
			time_line: "time_line",
			eb_services: "eb_services",
			eb_usercenter: "eb_usercenter"
		},
		wxapp: {},
		mainui: {
			MainUI1: {
				tpl: "appPreview/tabMainUI/index.html",
				css: "appPreview/resource/css/MainUI/tabMainUI.html"
			},
			MainUI2: {
				tpl: "appPreview/sideSwipeMainUI/index.html",
				css: "appPreview/resource/css/MainUI/sideSwipeMainUI.html"
			},
			MainUI3: {
				tpl: "appPreview/slidePlaqueMainUI/index.html",
				css: "appPreview/resource/css/MainUI/sidePlaqueMainUI.html"
			},
			MainUI4: {
				tpl: "appPreview/metroMainUI/index.html",
				css: "appPreview/resource/css/MainUI/metroMainUI.html"
			},
			MainUI6: {
				tpl: "appPreview/topTabMainUI/index.html",
				css: "appPreview/resource/css/MainUI/topTabMainUI.html"
			}
		},
		html5Status: ["提交的网址正在审核中", "提交的网址正在审核中", "提交的网址已通过审核", "提交的网址不符合规定"],
		phoneType: {
			ios7: {
				clip: "rect(auto 151px auto 68px)",
				top: "77px",
				left: "0px",
				display: "block",
				width: 1080,
				height: 1920
			},
			ios5: {
				clip: "rect(auto 151px auto 68px)",
				top: "77px",
				left: "0px",
				width: 640,
				height: 1136
			},
			ios6: {
				clip: "rect(auto 151px auto 68px)",
				top: "77px",
				left: "0px",
				width: 750,
				height: 1334
			},
			android2: {
				clip: "rect(auto 154px auto 65px)",
				top: "77px",
				left: "0px",
				width: 1440,
				height: 2560
			},
			android1: {
				clip: "rect(auto 151px auto 68px)",
				top: "77px",
				left: "0px",
				width: 1080,
				height: 1920
			},
			android3: {
				clip: "rect(auto 154px auto 65px)",
				top: "77px",
				left: "0px",
				width: 1440,
				height: 2960
			}
		},
		progressConfig: {
			ios: {
				initcolor: "#6bc1f2",
				initbgColor: "#f7fbfe",
				initresultText: "队列中...",
				initprogress: 0,
				initflag: "init",
				processingcolor: "#6bc1f2",
				processingbgColor: "#f7fbfe",
				processingresultText: "处理中...",
				buildingcolor: "#6bc1f2",
				buildingbgColor: "#f7fbfe",
				buildingresultText: "编译中...",
				donecolor: "#6bc1f2",
				donebgColor: "#f7fbfe",
				doneimgSrc: server.staticCDN + "/images/skin/" + Version + "/appmake/A_success-2x.png",
				doneresultText: "打包成功!",
				errorcolor: "#fc635b",
				errorbgColor: "#fff6f7",
				errorimgSrc: server.staticCDN + "/images/skin/" + Version + "/appmake/fail-2x.png",
				errorresultText: "打包失败!"
			},
			android: {
				initcolor: "#24caa6",
				initbgColor: "#f6fcfc",
				initresultText: "队列中...",
				initprogress: 0,
				initflag: "init",
				processingcolor: "#24caa6",
				processingbgColor: "#f6fcfc",
				processingresultText: "处理中...",
				processingflag: "processing",
				buildingcolor: "#24caa6",
				buildingbgColor: "#f6fcfc",
				buildingresultText: "编译中...",
				buildingflag: "building",
				donecolor: "#24caa6",
				donebgColor: "#f6fcfc",
				doneimgSrc: server.staticCDN + "/images/skin/" + Version + "/appmake/i_success-2x.png",
				doneresultText: "打包成功!",
				doneflag: "done",
				errorcolor: "#fc635b",
				errorbgColor: "#fff6f7",
				errorimgSrc: server.staticCDN + "/images/skin/" + Version + "/appmake/fail-2x.png",
				errorresultText: "打包失败!",
				errorflag: "error"
			},
			wxapp: {
				initcolor: "#24caa6",
				initbgColor: "#f6fcfc",
				initresultText: "队列中...",
				initprogress: 0,
				initflag: "init",
				processingcolor: "#24caa6",
				processingbgColor: "#f6fcfc",
				processingresultText: "处理中...",
				processingflag: "processing",
				buildingcolor: "#24caa6",
				buildingbgColor: "#f6fcfc",
				buildingresultText: "编译中...",
				buildingflag: "building",
				donecolor: "#24caa6",
				donebgColor: "#f6fcfc",
				doneimgSrc: server.staticCDN + "/images/skin/" + Version + "/appmake/wxapp_success-2x.png",
				doneresultText: "打包成功!",
				doneflag: "done",
				errorcolor: "#fc635b",
				errorbgColor: "#fff6f7",
				errorimgSrc: server.staticCDN + "/images/skin/" + Version + "/appmake/fail-2x.png",
				errorresultText: "打包失败!",
				errorflag: "error"
			}
		},
		guideEffectList: [{
			text: "跟随手指滑动",
			value: "effect1"
		}, {
			text: "1张背景缓动",
			value: "effect2"
		}, {
			text: "0-6张淡入淡出",
			value: "effect3"
		}],
		shapeList: ["●", "★", "♪", "■"],
		animationList: [{
			option: "无动画",
			value: 0
		}, {
			option: "淡入淡出",
			value: 1
		}, {
			option: "向后缩小消失",
			value: 2
		}, {
			option: "手风琴",
			value: 3
		}],
		guideSignList: function() {
			var list = [{
				text: "数字",
				type: "NUM"
			}, {
				text: "形状",
				type: "shape"
			}, {
				text: "无",
				type: "null"
			}];
			return list
		},
		mediumItems: {
			channel: "./medium/channel",
			radio: "./medium/radio",
			vod: "./medium/vod",
			audio: "./medium/audio",
			programme: "./medium/program",
			program: "./medium/program"
		},
		mediumType: [{
			key: "channel",
			sort: 1,
			displayname: "直播频道"
		}, {
			key: "radio",
			sort: 2,
			displayname: "广播电台"
		}, {
			key: "programme",
			sort: 5,
			displayname: "节目单"
		}, {
			key: "vod",
			sort: 3,
			displayname: "视频素材"
		}, {
			key: "audio",
			sort: 4,
			displayname: "音频素材"
		}],
		orderstatus: {
			unpaid: "待支付",
			paid: "已支付",
			delivery: "已发货",
			blocked: "冻结",
			closed: "交易关闭",
			success: "交易成功"
		},
		assessconfig: {
			3: "good",
			2: "normal",
			1: "bad",
			0: "good"
		},
		triggerevent: {
			before_create: "创建记录前",
			after_create: "创建记录后",
			before_update: "编辑记录前",
			after_update: "编辑记录后",
			before_delete: "删除记录前",
			after_delete: "删除记录后",
			log_in: "会员登录",
			register: "会员注册",
			buy: "会员购买成功",
			comment: "会员评论内容",
			comment_delete: "会员删除评论",
			like: "会员点赞内容",
			like_delete: "会员取消点赞",
			favor: "会员收藏内容",
			favor_delete: "会员取消收藏"
		},
		datachange: {
			before_create: "创建记录前",
			after_create: "创建记录后",
			before_update: "编辑记录前",
			after_update: "编辑记录后",
			before_delete: "删除记录前",
			after_delete: "删除记录后"
		},
		triggercondition: {
			all: "满足以下全部条件",
			any: "满足以下任意条件"
		},
		triggerfilter: {
			">": ">",
			"<": "<",
			"=": "=",
			has_any: "包含",
			match: "正则"
		},
		triggeraction: {
			create: "新增数据",
			update: "修改数据",
			"delete": "删除数据",
			push: "推送一条消息",
			add_to_group: "添加用户到组"
		},
		triggeroperator: {
			"+": {
				name: "数量+",
				operator: "+"
			},
			"-": {
				name: "数量-",
				operator: "-"
			},
			"*": {
				name: "数量*",
				operator: "*"
			},
			"/": {
				name: "数量/",
				operator: "/"
			},
			connect: {
				name: "连接",
				operator: "connect"
			},
			append: {
				name: "加入",
				operator: "append"
			},
			"=": {
				name: "固定值",
				operator: "="
			}
		},
		operatorlist: ["固定值", "函数", "参数值"],
		nodeoperatorlist: ["参数值", "函数"],
		integralInfo: [{
			name: "0.1元 测试 一会儿删",
			price: .1,
			type: "coin",
			value: .1,
			platform: "android"
		}, {
			name: "6元",
			price: 6,
			type: "coin",
			value: 6,
			platform: "android"
		}, {
			name: "30元",
			price: 30,
			type: "coin",
			value: 30,
			platform: "android"
		}, {
			name: "68元",
			price: 68,
			type: "coin",
			value: 68,
			platform: "android"
		}, {
			name: "98元",
			price: 98,
			type: "coin",
			value: 98,
			platform: "android"
		}, {
			name: "188元",
			price: 188,
			type: "coin",
			value: 188,
			platform: "android"
		}, {
			name: "298元",
			price: 298,
			type: "coin",
			value: 298,
			platform: "android"
		}],
		directCity: ["110000", "120000", "310000", "500000", "810000", "820000", "710000", "北京市", "天津市", "上海市", "重庆市", "香 港", "澳 门", "台湾省"],
		isDirectCity: function(province) {
			return !($.inArray(province, this.directCity) == -1)
		},
		videoType: ".wmv;.avi;.dat;.asf;.rm;.rmvb;.ram;.mpg;.mpeg;.3gp;.mov;.mp4;.m4v;.dvix;.dv;.dat;.mkv;.flv;.vob;.ram;.qt;.divx;.cpk;.fli;.flc;.mod;.m4a;.f4v;.3ga;.caf;.mp3;.vob;.aac;.amr;.ts;",
		emailHash: function(suffix) {
			var hash = {
				"qq.com": "http://mail.qq.com",
				"gmail.com": "http://mail.google.com",
				"sina.com": "http://mail.sina.com.cn",
				"163.com": "http://mail.163.com",
				"126.com": "http://mail.126.com",
				"yeah.net": "http://www.yeah.net/",
				"sohu.com": "http://mail.sohu.com/",
				"tom.com": "http://mail.tom.com/",
				"sogou.com": "http://mail.sogou.com/",
				"139.com": "http://mail.10086.cn/",
				"hotmail.com": "http://www.hotmail.com",
				"live.com": "http://login.live.com/",
				"live.cn": "http://login.live.cn/",
				"live.com.cn": "http://login.live.com.cn",
				"189.com": "http://webmail16.189.cn/webmail/",
				"yahoo.com.cn": "http://mail.cn.yahoo.com/",
				"yahoo.cn": "http://mail.cn.yahoo.com/",
				"eyou.com": "http://www.eyou.com/",
				"21cn.com": "http://mail.21cn.com/",
				"188.com": "http://www.188.com/",
				"foxmail.coom": "http://www.foxmail.com",
				"aliyun.com": "https://mail.aliyun.com/",
				"hoge.cn": "http://www.hoge.cn/"
			};
			return hash[suffix] || ""
		},
		imageUploadSize: {
			defaultImg: {
				width: 1024,
				height: 1024,
				format: "PNG",
				size: "3072"
			},
			appIcon: {
				width: 1024,
				height: 1024,
				format: "PNG",
				size: "1024",
				type: "icon"
			},
			appIconImg: {
				size: "1024"
			},
			startImage: {
				width: 1080,
				height: 1920,
				format: "PNG",
				size: "512",
				type: "startup_pic"
			},
			guideImage: {
				width: 1080,
				height: 1920,
				format: "PNG",
				size: "512",
				type: "guide_pic"
			},
			moduleIcon: {
				width: 200,
				height: 200,
				format: "PNG",
				size: "16",
				type: "module_pic"
			},
			navigationIcon: {
				width: 200,
				height: 200,
				format: "PNG",
				size: "100",
				type: "navigator_pic"
			},
			communityIcon: {
				size: "16",
				type: "community_pic"
			},
			communitybg: {
				size: "512",
				type: "community_bg_pic"
			},
			groupIcon: {
				size: "16",
				type: "head_pic"
			},
			pageBg: {
				size: "64",
				type: "bg_pic"
			},
			topBarBg: {
				size: "16",
				type: "top_pic"
			},
			unitIcon: {
				size: "4",
				type: "extend_pic"
			},
			bodyPic: {
				size: "3072",
				type: "picture"
			},
			upPic: {
				size: "300",
				format: "PNG"
			}
		}
	})
});