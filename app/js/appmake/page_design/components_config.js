"use strict";define(function(require){var app=require("app");app.factory("componentsConfigService",function(config,http,$q){var services={};return angular.extend(services,{getConfig:function(){var url=config.getAdminAPI("pagedesign.componentConfig"),defer=$q.defer(),_this=this;return http(url).then(function(json){_this.COMPONENT_CONFIG=json.result,defer.resolve()}),defer.promise},componentLimit:{filter_menu:1,detail_component_comment:1,detail_component_praise:1},componentEnable:function(uniqueid,list){var limit=this.componentLimit[uniqueid];if(void 0!==limit){var existLen=_.filter(list,function(comp){return comp.uniqueid===uniqueid}).length;return existLen<limit}return!0},getComponentTpl:function(uniqueid){var config=this.COMPONENT_CONFIG[uniqueid],template=config?config.template:"";if(template)return template;if(null===template)return null;var compType=config?config.type:"",compSelfModel=config?config.not_self_model:"";return"detail"==compType||compSelfModel?"datasource_for_detail.html":"datasource_for_list.html"},getCompConfig:function(uniqueid){return this.COMPONENT_CONFIG[uniqueid]||{}},isSupportExtend:function(uniqueid){return this.COMPONENT_CONFIG[uniqueid]&&this.COMPONENT_CONFIG[uniqueid].supportExtend},isSupportHeightSetting:function(uniqueid){return this.COMPONENT_CONFIG[uniqueid]&&this.COMPONENT_CONFIG[uniqueid].supportExtendHeight},isSupportLayout:function(uniqueid){return this.COMPONENT_CONFIG[uniqueid]&&this.COMPONENT_CONFIG[uniqueid].supportLayout},isSupportBar:function(uniqueid){return this.COMPONENT_CONFIG[uniqueid]&&this.COMPONENT_CONFIG[uniqueid].bars},noNeedComp:["filter_node","filter_menu","left_filter_node","list_search","search","WeatherUnit","navigator1","navigator2","navigator3","navigator_slide_ceramic","float_component","component_float_button_toolbar","shoppingcart_toolbar","pathmenu","detail_component_bottombar","detail_component_comment","detail_component_praise","promotion_card","timed_discount"],noSave:function(uniqueid){return this.noNeedComp.indexOf(uniqueid)>-1},detail_page_support_listcomponent:["listUI","functional","navigator","float","form"],normal_page_support_listcomponent:["listUI","functional","navigator","ItemCard","float","form"],group_page_support_listcomponent:["float"],detail_group_page_support_listcomponent:["float"],link_page_support_listcomponent:["float"],layer_page_support_listcomponent:["listUI","navigator"],normal_allViews:["navbar","page_style"],search_allViews:["filter_node","search_bar","search_history_record","search_place_holder","search_container"],detail_allViews:["navbar","page_style"],link_allViews:["navbar","page_style"],function_allViews:["navbar","page_style"],global_allViews:["navbar","page_style"],layer_allViews:["modal_page"],group_allViews:["submodules1","submodules2","submodules3","submodules_tabbar","submodules_column","submodules_sliding","submodules_detail_column","navbar","page_style"],detail_group_allViews:["submodules1","submodules2","submodules3","submodules_tabbar","submodules_column","submodules_sliding","submodules_detail_column","navbar","page_style"]}),services})});