"use strict";var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i["return"]&&_i["return"]()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return sliceIterator(arr,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};define(function(require){var app=require("app");require("appmake/page_design/services/page_design_service"),require("common/directives/model/dingdone-data-format"),require("common/directives/model/dingdone-operator"),require("common/modal/modal-header"),require("common/modal/modal-footer"),require("common/directives/inside-node"),require("common/services/page_params_service"),app.controller("DingdoneSelectorDialogCtrl",function($scope,$mdDialog,config,PageDesignService,modalData,pageId,currentKey,currentValue,dataTypes,widget_types,widget_type,widgetKey,forbidParams,xhrSupport,utils,modelService,dingdoneSelectorService,upload,PageParamesService){var vm=$scope.vm={};angular.extend(vm,{xhrSupport:xhrSupport,modelLoading:"init",widgetKey:widgetKey,dataTypes:dataTypes,widget_types:widget_types,widget_type:widget_type,forbidParams:forbidParams,pageId:pageId,current:{key:currentKey,value:currentValue},fieldsInModel:modalData.fieldsInModel,init:function(){this.getPageParamList();var allModelList=[];modalData.modelList&&(angular.forEach(modalData.modelList,function(eachList){var cache=[],model={};angular.forEach(eachList.fields,function(eachField){var match=void 0;match=!widget_types||widget_types.length?_.indexOf(dataTypes,eachField.data_type)>-1&&_.indexOf(widget_types,eachField.widget_type)>-1:_.indexOf(dataTypes,eachField.data_type)>-1,match&&cache.push(eachField)}),model={name:eachList.name,fields:cache,flag:eachList.flag},eachList.refer_key&&(model.refer_key=eachList.refer_key),allModelList.push(model)}),vm.modelList=allModelList);var allGlobalList=[];modalData.fieldsInGlobal&&(modalData.fieldsInGlobal.forEach(function(eachList){var cache=[];angular.forEach(eachList.params,function(eachField){var match=_.indexOf(dataTypes,eachField.data_type)>-1;match&&cache.push(eachField)}),allGlobalList.push({name:eachList.name,params:cache})}),vm.fieldsInGlobal=allGlobalList),modelService.getDataTypeList().then(function(result){var dateTypeDic=result.dictionary,allSupportType=[];dataTypes.forEach(function(dataTypes){allSupportType.push(dateTypeDic[dataTypes])}),vm.allSupportType=allSupportType.join("、")}),this.initTab()},isField:function(key){var field=void 0,globalfield=void 0;return angular.forEach(vm.modelList,function(model){var bool=(key.split("."),void 0);bool=_.find(model.fields,function(eachField){return eachField.key==key}),bool&&(field=!0)}),angular.forEach(vm.fieldsInGlobal,function(global){var bool=_.find(global.params,function(param){return param.key==key});bool&&(globalfield=!0)}),field||globalfield},addPageParamKeyUp:function($event){13==$event.which&&this.addPageParam()},select:function(field,model){this.current=angular.copy(field),model&&model.refer_key&&(this.current.key=[model.refer_key,field.key].join("."))},initTab:function(){if(this.current&&this.current.key){this.current.value&&this.current.value.indexOf("{{")>-1&&this.current.value.indexOf("}}")>-1&&(this.current.value="");var str=this.current.key.split(".")[0];"node"==str?$scope.selectedIndex=2:"page"==str?$scope.selectedIndex=1:this.isField(this.current.key)?$scope.selectedIndex=0:(this.current.value="",$scope.selectedIndex=0)}else this.current.value?(this.current.value=decodeURIComponent(decodeURIComponent(vm.current.value)),"switch"==this.widget_type&&(vm.current.value=!(!vm.current.value||"0"==vm.current.value)),$scope.selectedIndex=3):$scope.selectedIndex=0},changeValue:function(value){this.current.key="",this.current.data_type="short_text",this.current.value=value,this.current.name=value},uploadPic:function(file){vm.modelLoading=!1;var url=config.getAPI("upload");upload(url,file).then(function(resp){vm.current.key="",vm.current.value=resp.url,vm.modelLoading="complete"},function(reason){utils.error("该图片上传失败!"),vm.modelLoading="complete"})},delBinding:function(){this.current={}},hide:function(){$mdDialog.hide()},cancel:function(){$mdDialog.cancel()},save:function(){"switch"==vm.widget_type&&(vm.current.key="",vm.current.value=vm.current.value?1:"0"),this.current&&this.current.value&&(this.current.key="",this.current.value=encodeURIComponent(this.current.value)),$mdDialog.hide(this.current)},getPageParamList:function(){PageParamesService.getList(pageId).then(function(result){return vm.paramsInPage=result})},addPageParam:function(){var _this2=this;vm.theAdd&&!function(){var _this=_this2;PageParamesService.addParam(pageId,vm.theAdd).then(function(result){vm.theAdd="",_this.paramsInPage=result.list})}()},"delete":function(field,index){var _this=this;utils.confirm({headTitle:"删除确认",msg:"确定要删除该传入参数吗?"},function(sure){sure&&PageParamesService.delParam(pageId,field.key).then(function(list){_this.paramsInPage=list,field.key==vm.current.key&&(vm.current.key="")})})}}),vm.init()}),app.controller("DingdoneDataFormatDialogCtrl",function($scope,$mdDialog,config,PageDesignService,modalData,pageId,currentModel,currentField,mapping,advanceconfig,utils,selfmodel,pageModelId,hideView){var vm=$scope.vm={};angular.extend(vm,{modelLoading:"init",currentField:currentField,currentModel:currentModel,selfmodel:selfmodel,pageId:pageId,pageModelId:pageModelId,fieldsInModel:modalData.fieldsInModel,fieldsInGlobal:modalData.fieldsInGlobal,paramsInPage:modalData.paramsInPage||[],dictionary:modalData.dictionary,mapping:mapping||{},advanceconfig:advanceconfig,typecache:{title:"shot_text"},hideView:hideView,init:function(){vm.funcstr=vm.mapping.tpl_text||"",vm.data=vm.advanceconfig&&vm.advanceconfig[0]||{style:{}},vm.data.connector?vm.initEdit():(vm.data={style:{}},vm.condition={}),angular.forEach(hideView,function(field){vm.currentField&&field.key==vm.currentField.key&&(vm.currentField.hideView=!0)})},dataformatViewConfig:["text_view","detail_component_table_row"],hasCondition:function(){vm.data.style.hidden=!vm.data.style.hidden,vm.data.style.hidden||(vm.condition={})},initEdit:function(){this.dictionary&&vm.mapping&&!this.dictionary[vm.mapping.field_key]&&(vm.mapping.value=vm.mapping.field_key),angular.isArray(vm.data.style)&&(vm.data.style={hidden:!1}),vm.condition={condition_mode:"and"==vm.data.connector?"all":"any"};var conds=[];angular.forEach(vm.data.conditions,function(cond){var obj={cond_type:1,modelId:vm.currentModel?vm.currentModel.id:"",key:cond.left_value&&cond.left_value.match(/\{\{(\S*)\}\}/)?cond.left_value.match(/\{\{(\S*)\}\}/)[1]:cond.left_value,value:cond.right_value&&cond.right_value.match(/\{\{(\S*)\}\}/)?cond.right_value.match(/\{\{(\S*)\}\}/)[1]:cond.right_value,operator:cond.op};conds.push(obj)}),vm.condition.cond=conds},hide:function(){$mdDialog.hide()},cancel:function(){$mdDialog.cancel()},buildFuncStr:function(){},noOperatorConfig:["is_logged_in"],save:function(){var _this3=this;vm.funcstr=vm.buildFuncStr(),vm.condition?"":vm.condition={},vm.data.connector="any"==vm.condition.condition_mode?"or":"and";var conds=[],bool=!0;if(angular.forEach(vm.condition.cond,function(val){if(!val.key)return utils.error("请选择筛选数据！"),void(bool=!1);if(val.key.indexOf(".")>-1&&_this3.noOperatorConfig.indexOf(val.key.split(".")[1])>-1);else{if(!val.value)return utils.error("请输入筛选内容！"),void(bool=!1);if(!val.operator)return utils.error("请选择筛选方式！"),void(bool=!1)}var obj={left_value:"{{"+val.key+"}}",right_value:"2"==val.cond_type?"{{"+val.value+"}}":val.value,op:val.operator,left_data_type:vm.typecache[val.key]};conds.push(obj)}),bool){vm.data.conditions=conds;var data={str:vm.funcstr,data:vm.data};$mdDialog.hide(data)}}}),vm.init()}),app.controller("DingdoneOperatorDialogCtrl",function($scope,$mdDialog,config,field,instance,target,key){var vm=$scope.vm={};angular.extend(vm,{instance:instance,target:target,field:field,key:key,init:function(){this.funcName=""},initEdit:function(){},hide:function(){$mdDialog.hide()},cancel:function(){$mdDialog.cancel()},save:function(){$mdDialog.hide(vm.field)}}),vm.init()}),app.factory("dingdoneSelectorService",function($q,utils,config,http,PageDesignService,modelService,PageParamesService,$timeout){var service={};return angular.extend(service,{init:function(params){var _this4=this;if(params.model&&"self"==params.model.id){var _ret2=function(){var defer=$q.defer();return _this4.initGlobal().then(function(data){defer.resolve(data)}),{v:defer.promise}}();if("object"===("undefined"==typeof _ret2?"undefined":_typeof(_ret2)))return _ret2.v}else{var _ret3=function(){var defer=$q.defer(),model=params.model,modelId=params.modelId||params.model&&params.model.id||"",pageId=params.pageId,pageModelId=params.pageModelId,_this=_this4,scope=params.scope||"",allXHR=[modelService.fetchModelFields({modelId:modelId,scope:scope,cache:!1}),_this4.getFieldsInGlobal(),_this4.getParamsInPage(pageId),modelService.fetchQuoteModelFields({modelId:modelId,cache:!1,refer_key:model&&model.isDetail?"data":""})];pageModelId&&allXHR.push(modelService.fetchModelFields({modelId:pageModelId,scope:scope,cache:!1})),params.otherModels&&params.otherModels.length&&allXHR.push(_this4.getOtherModel(params.otherModels,scope));var comptype=params.currentCompConfig&&params.currentCompConfig.type||"",not_self_model=params.currentCompConfig&&params.currentCompConfig.not_self_model||"";return $q.all(allXHR).then(function(_ref){var _ref2=_slicedToArray(_ref,6),fieldsInModel=_ref2[0],fieldsInGlobal=_ref2[1],paramsInPage=_ref2[2],quoteModel=_ref2[3],detail=_ref2[4],fieldsOtherModels=_ref2[5];"detail"==comptype?fieldsInModel=null:not_self_model&&(fieldsInModel=null),modelId||(fieldsInModel=null),model&&model.isDetail&&quoteModel instanceof Array&&angular.forEach(quoteModel,function(qmodel){qmodel.refer_key.indexOf("data.")==-1&&(qmodel.refer_key="data."+qmodel.refer_key)});var result={fieldsInModel:fieldsInModel,fieldsInGlobal:fieldsInGlobal,paramsInPage:paramsInPage,quoteModel:quoteModel,detail:detail||null,fieldsOtherModels:fieldsOtherModels?fieldsOtherModels:detail||null};defer.resolve(angular.extend(result,{dictionary:_this.generateDict(result)}))})["catch"](function(){}),{v:defer.promise}}();if("object"===("undefined"==typeof _ret3?"undefined":_typeof(_ret3)))return _ret3.v}},getOtherModel:function(modellist,scope){var length=modellist?modellist.length:0,ajaxCount=0,defer=$q.defer(),templist=[];return angular.forEach(modellist,function(model){model&&model.id?modelService.fetchModelFields({modelId:model.id,scope:scope,cache:!1}).then(function(result){var data=angular.copy(result);angular.forEach(data.fields,function(field){field.key=(model.otherflag&&field.key.indexOf(model.otherflag+".")==-1?model.otherflag+".":"")+field.key}),model.fields=data.fields,templist.push(model),ajaxCount+=1,ajaxCount===length&&defer.resolve(templist)}):(ajaxCount+=1,ajaxCount===length&&defer.resolve(templist))}),defer.promise},initDict:function(selector){var mapping={};return angular.forEach(selector.paramsInPage,function(eachField){mapping[eachField.key]=eachField.name}),mapping},generateDict:function(selector){var mapping={};return mapping=this.getMapping(selector).mapping,selector.modelList=this.getMapping(selector).modelList,selector.fieldsInGlobal&&selector.fieldsInGlobal.forEach(function(eachGroup){eachGroup.name=eachGroup.name.indexOf("全局")>-1?eachGroup.name:eachGroup.name+"(全局)";var fields=eachGroup.params;fields.forEach(function(eachField){mapping[eachField.key]=eachField.name,"unit_price"==eachField.key&&(mapping[eachField.key+".now"]=eachField.name)})}),angular.extend(mapping,this.initDict(selector)),mapping},getMapping:function(selector){var modelList=this.mergeModelFields(selector),mapping={};return modelList.forEach(function(model){var fields=angular.copy(model.fields);fields&&fields.forEach(function(eachField){model&&model.refer_key?mapping[model.refer_key+"."+eachField.key]=eachField.name:("unit_price"==eachField.key&&(mapping[eachField.key+".now"]=eachField.name),mapping[eachField.key]=eachField.name)})}),{mapping:mapping,modelList:modelList}},mergeModelFields:function(selector){var model={};selector.fieldsInModel&&(model={name:"当前数据字段",fields:selector.fieldsInModel?selector.fieldsInModel.fields:[],flag:"modelFields"});var modelList=selector.quoteModel instanceof Array&&angular.copy(selector.quoteModel)||[];if(selector.fieldsInModel&&modelList.unshift(model),selector.detail&&selector.detail.fields){var detailModel={name:"详情数据",fields:selector.detail.fields,refer_key:"data"};modelList.push(detailModel)}return selector.fieldsOtherModels&&selector.fieldsOtherModels instanceof Array&&angular.forEach(selector.fieldsOtherModels,function(model){modelList.push(model)}),modelList},getFieldsInModel:function(model){var defer=$q.defer(),url=config.getAPI("contentModelV3.fieldsForCondition").replace("{modelId}",model.id);return http(url).then(function(json){defer.resolve(json.result.fields)}),defer.promise},getFieldsInGlobal:function(){return PageDesignService.getAppGlobalparams()},getParamsInPage:function(pageId){var defer=$q.defer();return pageId?PageParamesService.getList(pageId).then(function(list){defer.resolve(list)}):defer.resolve([]),defer.promise},getXHRSupport:function(selectorMode){return{modelFields:"default"==selectorMode,referModelFields:"default"==selectorMode,fieldsInGlobal:!0,paramsInPage:!0,fieldsOtherModels:!0}},initOtherFields:function(params){var defer=$q.defer(),_this=this;return this.getOtherModel(params.otherModels,params.scope).then(function(data){var result={fieldsOtherModels:data};defer.resolve(angular.extend(result,{dictionary:_this.generateDict(result)}))})["catch"](function(){defer.resolve()}),defer.promise},initGlobal:function(params){var defer=$q.defer(),allXHR=[this.getFieldsInGlobal(),this.getParamsInPage(params?params.pageId:"")],_this=this;return $q.all(allXHR).then(function(_ref3){var _ref4=_slicedToArray(_ref3,2),fieldsInGlobal=_ref4[0],paramsInPage=_ref4[1],result={fieldsInGlobal:fieldsInGlobal,paramsInPage:paramsInPage};defer.resolve(angular.extend(result,{dictionary:_this.generateDict(result)}))})["catch"](function(){defer.resolve()}),defer.promise},showPop:function(params){var dataTypes=params.dataTypes||[],_this=this,selectorMode=params.selectorMode||"default";"string"==typeof dataTypes&&(dataTypes=dataTypes.split(","));var defer=$q.defer();return utils.mdDialog({controller:"DingdoneSelectorDialogCtrl",templateUrl:"common/dingdone_selector_dialog.html",locals:{modalData:params.selector||{},pageId:params.pageId,currentKey:params.currentKey,currentValue:params.currentValue,forbidParams:params.forbidParams,dataTypes:dataTypes,widget_types:params.widget_types||[],widget_type:params.widget_type,widgetKey:params.widgetKey,xhrSupport:_this.getXHRSupport(selectorMode)}}).then(function(data){defer.resolve(data)}),defer.promise},showDataFormatPop:function(selector,pageId,currentField,currentModel,mapping,advanceconfig,selfmodel,pageModelId,hideView){var defer=$q.defer();return utils.mdDialog({controller:"DingdoneDataFormatDialogCtrl",templateUrl:"common/modal/dingdone_dataformat_dialog.html",locals:{modalData:selector,pageId:pageId,currentField:currentField,currentModel:currentModel,mapping:mapping,advanceconfig:advanceconfig,selfmodel:selfmodel,pageModelId:pageModelId,hideView:hideView}}).then(function(data){defer.resolve(data)}),defer.promise},showOperatorPop:function(field,instance,target,key){var defer=$q.defer();return utils.mdDialog({controller:"DingdoneOperatorDialogCtrl",templateUrl:"common/modal/dingdone_operator_dialog.html",locals:{field:field,instance:instance,target:target,key:key}}).then(function(data){defer.resolve(data)}),defer.promise}}),service})});