"use strict";define(function(require){var app=require("app");app.directive("dingdoneWidgetShadow",["mathService","config","$compile","colorService",function(mathService,config,$compile,colorService){return{scope:{widget:"="},replace:!0,templateUrl:"common/directives/superui/shadow.html",require:"?^dingdoneWidgetItem",link:function($scope,el,attrs,dingdoneWidgetItem){var vm=$scope.vm={};angular.extend(vm,{isShow:!1,effectPreview:{"box-shadow":"none"},direction:{offset_x:{enabled:!0,name:"水平偏移量",defaultValue:0},offset_y:{enabled:!0,name:"垂直偏移量",defaultValue:0},radius:{enabled:$scope.widget.radius_enabled,name:"阴影外延值",defaultValue:0},blur_radius:{enabled:$scope.widget.blur_enabled,name:"阴影模糊值",defaultValue:0}},width:{},init:function(){this.init="init";var value=dingdoneWidgetItem.getValue();for(var directionKey in value)vm.direction[directionKey]&&(vm.width[directionKey]=value&&value[directionKey]||vm.direction[directionKey].defaultValue);vm.enabled=value&&value.enabled||!1,vm.spectrumColor=value&&value.color?colorService.clientToHex(value.color):void 0,vm.colorpickerOption=angular.extend(angular.copy(config.colorpickerDefault),{preferredFormat:"hex"});var html='<spectrum-colorpicker class="sys-flex-one" ng-model="vm.spectrumColor" on-change="vm.colorpickerChange( color )" on-hide="vm.callback()" options="vm.colorpickerOption"></spectrum-colorpicker>';$compile(html)($scope).appendTo(el.find(".colorpicker-placeholder")),this.renderBox()},minusEnable:function(){return mathService.subtract(this.value,$scope.widget.step)>=$scope.widget.min},plusEnable:function(){return mathService.add(this.value,$scope.widget.step)<=$scope.widget.max},minus:function(){if(this.minusEnable()){var alreadyMin=this.value<=$scope.widget.min;this.value=alreadyMin?$scope.widget.min:mathService.subtract(this.value,$scope.widget.step)}},plus:function(){if(this.plusEnable()){var alreadyMax=this.value>=$scope.widget.max;this.value=alreadyMax?$scope.widget.max:mathService.add(this.value,$scope.widget.step)}},toggle:function(){vm.isShow=!vm.isShow},colorpickerChange:function(color){color&&(this.refreshView(this.init),this.init=!1)},check:function(directionKey){this.refreshView()},renderBox:function(){var cssKey="box-shadow",val=this.width;vm.enabled?vm.effectPreview[cssKey]=[val.offset_x+"px",val.offset_y+"px",val.blur_radius+"px",val.radius+"px",vm.spectrumColor].join(" "):vm.effectPreview[cssKey]="none"},refreshView:function(init){this.renderBox();var val=this.width;dingdoneWidgetItem.setValue({blur_radius:val.blur_radius,color:colorService.hexToClient(vm.spectrumColor),enabled:vm.enabled,offset_x:val.offset_x,offset_y:val.offset_y,radius:val.radius},null,"init"!=init)}}),vm.init()}}}])});