"use strict";define(function(require){var app=require("app");app.directive("moveCate",function(){return{restrict:"E",scope:{currentModel:"=",modelModel:"=",groupList:"=",doAjax:"&",modifyNode:"&",disabled:"="},replace:!0,templateUrl:"common/directives/move-category.html",link:function(scope,el,attrs,ctrl){var vm=scope.vm={};angular.extend(vm,{init:function(){vm.currentModel=scope.currentModel,scope.$watch("groupList",function(newValue,oldValue,scope){vm.groupList=scope.groupList},!0),scope.$watch("currentModel",function(newValue,oldValue,scope){newValue&&(vm.currentModel=newValue,vm.currentModel&&(vm.isShow=!1))},!0),scope.$watch("modelModel",function(){vm.modelModel=scope.modelModel})},showCate:function(){vm.currentModel&&(vm.isShow?vm.isShow=!1:this.nextNodes({id:0},-1,function(){vm.isShow=!0}))},nextNodes:function(item,$index,callback){scope.doAjax({params:{currentCate:item,index:$index,callback:callback}}),this.tapNode(!0)},currentLevel:0,maxCol:scope.maxCol?scope.maxCol:4,tapNode:function(flag){flag?vm.currentLevel=vm.currentLevel+vm.maxCol<vm.groupList.length?vm.currentLevel+1:vm.currentLevel:vm.currentLevel=vm.currentLevel>0?vm.currentLevel-1:vm.currentLevel},move:function(cate){scope.modifyNode({nodeParams:{node:cate,success:function(){vm.isShow=!1}}})}}),vm.init()}}})});
