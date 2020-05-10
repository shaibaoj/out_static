"use strict";define(function(require){var app=require("app"),template='<div class="multiple-sort-box wd250"><div class="trigger sys-flex" ng-click="show()"><div class="sys-flex-one" style="overflow:hidden;white-space: nowrap;text-overflow: ellipsis;">{{ alreadySelectedName.join("／") || "请选择"}}</div><span class="arrow down" ng-if="!isShow"></span><span class="arrow up" ng-if="isShow"></span></div><div class="multiple-wrap" ng-show="isShow"><div class="multiple-sort"><span class="caret-left" ng-click="tapNode(0)"></span><div class="sys-flex"><div class="tip-sentence" ng-if="!ngModel[0].length">暂无内容分类数据，请添加</div><ul ng-repeat="(index,model) in ngModel" ng-if="ngModel[0].length && index >= currentLevel && index < currentLevel+maxCol"><li class="sys-flex sys-flex-center sys-flex-one" ng-repeat="node in model"><md-checkbox ng-checked="is_select_{{node.id}}" ng-click="select( node ,$parent.$index, $event,$index)" _node="{{$parent.$index}}{{$index}}"></md-checkbox><div class="title" title="{{node.name}}">{{node.name}}</div><div class="arrow"ng-if="!node.is_last"ng-click="showNext( node.id, $parent.$parent.$index ,$event )"></div></li></ul></div><span class="caret-right" ng-click="tapNode(1)"></span></div></div><input type="hidden" value="{{ alreadySelected.join() }}" name="{{ hiddenName }}"/></div>';app.directive("dingdoneMultipleSortSelect",["$compile",function($compile){return{restrict:"E",scope:{alreadySelected:"=",alreadySelectedName:"=",ngModel:"=",triggerEvent:"@",doAjax:"&",hiddenName:"@",callback:"&"},replace:!0,template:template,link:function(scope,el,attrs){$(document).on("click",function(){scope.show(0),scope.$digest()}),el.on("click",function(event){scope.show(1),scope.$digest(),event.stopPropagation()}),angular.extend(scope,{isShow:!1,init:function(){scope.isSelect(!0)},currentLevel:0,maxCol:scope.maxCol?scope.maxCol:4,tapNode:function(flag){flag?this.currentLevel=this.currentLevel+this.maxCol<scope.ngModel.length?scope.currentLevel+1:this.currentLevel:this.currentLevel=this.currentLevel>0?this.currentLevel-1:this.currentLevel},show:function(isShow){scope.isShow=arguments.length?isShow:!scope.isShow},isSelect:function(bool){angular.forEach(scope.alreadySelected,function(val){scope["is_select_"+val]=bool})},select:function(node,parentIndex,$event,$index){$event.stopPropagation(),scope.doSelect(node,parentIndex,$index)},doSelect:function(node,parentIndex,$index,needReset){var id=node.id,name=node.name,index=$.inArray(id,scope.alreadySelected);scope.alreadySelected=scope.alreadySelected?scope.alreadySelected:[],scope.alreadySelectedName=scope.alreadySelectedName?scope.alreadySelectedName:[],needReset?(scope.isSelect(!1),scope.alreadySelected=[],index<0&&(scope.alreadySelected.push(id),scope.alreadySelectedName.push(name))):index>=0?(scope.alreadySelected.splice(index,1),scope.alreadySelectedName.splice(index,1),scope["is_select_"+id]=!1):(scope.alreadySelected.push(id),scope.alreadySelectedName.push(name),scope["is_select_"+id]=!0),scope.callback&&scope.callback({alreadySelected:scope.alreadySelected})},showNext:function(id,parentIndex,$event){$event.stopPropagation(),scope.doAjax({params:{index:parentIndex,id:id}}),scope.tapNode(!0)},confirm:function(){scope.save({nodes:{ids:scope.alreadySelected.join(),names:scope.alreadySelectedName.join()}}),this.show(0)}}),scope.init(),scope.$watch("alreadySelected",function(alreadySelected){if(alreadySelected&&!alreadySelected.length)for(var key in scope)key.search(/^is_select_/)>-1&&(scope[key]=!1);scope.isSelect(!0)})}}}]),app.directive("xxxxxxdingdoneMultipleSortSelect",["$compile",function($compile){return{restrict:"E",scope:{selected:"=",selectedName:"=",ngModel:"=",triggerEvent:"@",doAjax:"&",save:"&"},replace:!0,templateUrl:"common/directives/dingdone-multiple-sort-select.html",link:function(scope,el,attrs,ctrl){angular.extend(scope,{init:function(){scope.existed={},setTimeout(function(){scope.isSelect(!0)},200)},show:function(isShow){scope.isShow=isShow||!scope.isShow},hide:function(){scope.isShow=!1},isSelect:function(bool){angular.forEach(scope.selected,function(val){scope["is_select_"+val]=bool})},select:function(node,parentIndex,$event){$event.stopPropagation(),scope.doSelect(node)},doSelect:function(node,needReset){var id=node.id,name=node.name,index=$.inArray(id,scope.selected);needReset?(scope.isSelect(!1),scope.selected=[],index<0&&(scope.selected.push(id),scope.selectedName.push(name))):index>=0?(scope.selected.splice(index,1),scope.selectedName.splice(index,1),scope["is_select_"+id]=!1):(scope.selected.push(id),scope.selectedName.push(name)),scope.selected=scope.selected,scope.isSelect(!0)},showNext:function(id,parentIndex,$event){$event.stopPropagation(),scope.doAjax({params:{index:parentIndex,id:id}})},confirm:function(){scope.save({nodes:{ids:scope.selected.join(),names:scope.selectedName.join()}}),this.show(0)}}),scope.init()}}}])});
