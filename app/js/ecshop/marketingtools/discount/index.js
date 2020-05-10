"use strict";define(function(require){var app=require("app"),moment=require("moment");require("common/services/modelService"),require("common/directives/pager-redirect"),app.controller("DiscountCtrl",["$scope","utils","navconfig","config","http","$state","$stateParams","$modal",function($scope,utils,navconfig,config,http,$state,$stateParams,$modal){var vm=$scope.vm={};angular.extend(vm,{currentState:0,init:function(guid){vm.guid=guid,this.watchCurrentPage(),this.getecshopmarketlist()},getecshopmarketlist:function(){var _url=config.getAPI("activitylist").replace("{guid}",vm.guid).replace("{promo_type}","timed_discount"),params=this.collectListParam();http(_url,{params:params}).then(function(data){vm.timestamp_trans(data.data),vm.currentlist=angular.copy(data.data),vm.statue_change(vm.currentState),vm.initPagination(data.meta.pagination),0==vm.activelist.length&&(vm.nodata=!0)})},timestamp_trans:function(obj){angular.forEach(obj,function(value){value.from_time=moment(value.from_time).format("YYYY-MM-DD HH:mm:ss"),value.to_time=moment(value.to_time).format("YYYY-MM-DD HH:mm:ss"),value.create_time=moment(value.create_time).format("YYYY-MM-DD HH:mm:ss")})},collectListParam:function(status){var params={};return status&&(params.status=status),vm.pagination&&vm.pagination.currentPage&&(params.page=vm.pagination.currentPage,params.count=vm.pagination.pagecount),params},initPagination:function(options){vm.pagination=vm.pagination||{},angular.extend(vm.pagination,{totalItems:options.total,numPages:options.total_pages,itemsPerPage:options.per_page,maxSize:options.total_pages,currentPage:options.current_page,countconfig:config.listcount,pagecount:options.per_page})},watchCurrentPage:function(){var _this=this;$scope.$watch("vm.pagination.currentPage",function(currentpage,old){currentpage&&old&&_this.getecshopmarketlist()}),$scope.$watch("vm.pagination.pagecount",function(currentpagecount,old){currentpagecount&&old&&_this.getecshopmarketlist()})},statue_change:function(statue){var _obj=[];0==statue?_obj=vm.currentlist:angular.forEach(vm.currentlist,function(value){value.status==statue&&_obj.push(value)}),vm.activelist=_obj,vm.currentState=statue,0==vm.activelist.length&&(vm.nodata=!0),0!=vm.activelist.length&&(vm.nodata=!1)},creatActive:function(){$state.go("mainLayout.editdiscount")},editActive:function(id){$state.go("mainLayout.editdiscount",{product_id:id})},delete_active:function(index,id,statue){utils.confirm({headTitle:"删除提醒",msg:"确定删除选中的数据吗?"},function(sure){if(sure){var _url=config.getAPI("activitydelete").replace("{guid}",vm.guid).replace("{promotion_id}",id);http(_url,{method:"delete"}).then(function(data){data.error?utils.error(data.error.message):(vm.pagination.totalItems-=1,vm.activelist.splice(index,1),vm.getecshopmarketlist(),!vm.activelist.length&&(vm.nodata=!0),vm.loading="complete")})}})}}),$scope.$on("checkApp",function(event,first_appinfo){var guid=first_appinfo.guid;vm.init(guid)})}])});