"use strict";define(function(require){var app=require("app"),moment=require("moment");require("common/directives/content-reply"),app.controller("AssessManageListCtrl",["$scope","$state","http","config","utils","navconfig",function($scope,$state,http,config,utils,navconfig){var vm=$scope.vm={};angular.extend(vm,{init:function(guid){vm.watchCurrentPage(),vm.getAssessList(),this.starconfig=config.assessconfig},assessConfig:{"全部好评":"","好评":3,"中评":2,"差评":1},getAssessList:function(){var url=config.getAPI("getcommentlist"),params=this.collectListParam();http(url,{method:"get",params:params}).then(function(data){if(vm.assesslist=data.result.data,angular.forEach(vm.assesslist,function(val){val.submit_time&&(val.submit_time=vm.format_time(val.submit_time))}),vm.pagination&&vm.pagination.currentPage){var options={per_page:20,current_page:vm.pagination.currentPage,total:data.result.count,total_pages:Math.ceil(data.result.count/20)};vm.initPagination(options)}else{var options={per_page:20,current_page:1,total:data.result.count,total_pages:Math.ceil(data.result.count/20)};vm.initPagination(options)}vm.showpagination=vm.assesslist&&vm.assesslist.length||!1,vm.assesslist&&vm.assesslist.length?vm.nodata=!1:vm.nodata=!0,vm.paginationLoading="complete"})["catch"](function(resp){vm.paginationLoading="complete"})},format_time:function(time){return moment(time).format("YYYY-MM-DD HH:mm:ss")},chooseAssess:function(status){vm.pagination.currentPage=1,vm.current_status=status,vm.getAssessList()},collectListParam:function(){var params={star:vm.current_status};return vm.pagination&&vm.pagination.currentPage&&(params.api_page=vm.pagination.currentPage,params.api_size=vm.pagination.itemsPerPage),console.log(params,"params参数"),params},initPagination:function(options){vm.pagination={totalItems:options.total,numPages:options.total_pages,itemsPerPage:options.per_page,maxSize:options.total_pages,currentPage:options.current_page}},watchCurrentPage:function(){var _this=this;$scope.$watch("vm.pagination.currentPage",function(currentpage,old){currentpage&&old&&(console.log(currentpage,"当前页",old,"cc"),_this.getAssessList())}),$scope.$watch("vm.pagination.pagecount",function(currentpagecount,old){currentpagecount&&old&&(vm.paginationLoading=!1,console.log(currentpagecount,"当前页条数!!!!!!!",old),_this.getAssessList())})},toggleContentReply:function(item){vm.currentShowReplay=item.id}}),$scope.$on("checkApp",function(event,first_appinfo){var guid=first_appinfo.guid;vm.init(guid)})}])});