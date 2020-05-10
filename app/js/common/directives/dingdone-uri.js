"use strict";define(function(require){var app=require("app");require("common/services/modelService"),require("common/directives/model/dingdone-bind"),require("common/services/dingdone_selector_service"),require("appmake/services/pageManagerService"),require("appmake/services/URIService"),require("common/directives/model/dingdone-select-content-model"),require("common/services/page_params_service"),require("common/services/verifyService"),app.directive("dingdoneUri",function(config,utils,http,$q,modelService,dingdoneSelectorService,upload,pageManagerService,URIService,PageParamesService,verifyService){return{scope:{url:"=",model:"=",flag:"=",pageId:"=",pageModelId:"=",compConfig:"=",bigwidth:"="},restrict:"EA",templateUrl:"common/directives/dingdone-uri.html",link:function(scope,element,attrs,ngModel){var vm=scope.vm={};angular.extend(vm,{flag:scope.flag||"navigator",init:function(){this.getUriList()},initEdit:function(url){var uri=scope.url.split("?")[0],params=decodeURIComponent(decodeURIComponent(scope.url.split("?")[1]));if(params){var paramarr=params.split("&");angular.forEach(paramarr,function(str){var value=str.split("=")[1];"undefined"!=str.split("=")[0]&&(vm.paramsCache[str.split("=")[0]]="undefined"!=value?value:"")})}var bool=!1,customuri={};angular.forEach(vm.uriList,function(item){"dingdone://module"==uri&&item.uri==uri?vm.pageResult?vm.paramsCache&&item.name==vm.getPageType(vm.pageResult,vm.paramsCache.module_id)&&(vm.changeUri(item),bool=!0):pageManagerService.getPages().then(function(data){vm.pageResult=data,vm.paramsCache&&item.name==vm.getPageType(vm.pageResult,vm.paramsCache.module_id)&&(vm.changeUri(item),bool=!0)}):uri==item.uri||"dingdone://share/show?s=b_push"==item.uri&&item.uri.indexOf(uri)>-1?(vm.changeUri(item),bool=!0):"dingdone://xxx"==item.uri&&(customuri=item,vm.isInit=!0)}),bool||vm.changeUri(customuri)},getPageType:function(pageData,id){var pageType=void 0,_loop=function(type){angular.forEach(pageData[type],function(page){page.id==id&&(pageType=type,console.log("找到啦",type))})};for(var type in pageData)_loop(type);return"detail"==pageType?"详情页":"standard-link"==pageType?"通用页":void 0},getUriList:function(){var _this=this;pageManagerService.getUriList(scope.flag).then(function(resp){vm.uriList=angular.copy(resp),vm.mapping={},vm.paramsCache={},scope.url?_this.initEdit(scope.url):_this.isInit=!0})["catch"](function(rej){})},changeUri:function(item,flag){vm.isInit=!1;var id=item.identifier;if(flag&&(scope.url=item.uri,vm.paramsCache={},vm.bindKeyList=[],vm.mapping={}),"default"==id||"dingdone://xxx"==item.uri)vm.currentUri=angular.copy(item),vm.currentUri.identifier="custom",vm.currentUri.uri=scope.url,vm.isInit=!0;else if(id){var url=config.getAdminAPI("getadminuridetail").replace("{uri_id}",id);http(url).then(function(resp){vm.currentUri=resp.result,flag&&(scope.url=resp.result.uri,vm.paramsCache={}),vm.initParams()})["catch"](function(){vm.isInit=!0})}},initParams:function(){var arr=[],showImg=!0;console.log(vm.paramsCache,"看看收集到的参数 "),angular.forEach(vm.currentUri.queries,function(q,index){if(vm.otherQuote.indexOf(q.quote)>-1){if("model"==q.quote)vm.getModuleList().then(function(data){q.currentIds=[],vm.paramsCache[q.key]&&(q.currentIds=vm.paramsCache[q.key].split(",")),data.length==q.currentIds.length&&(q.isCheck=!0)}),showImg=!1;else if("module"==q.quote||"general_module"==q.quote||"detail_module"==q.quote)vm.getDetailPageData("detail_module"==q.quote?"detail":"standard-link"),console.log("走这里 初始化页面"),showImg=!1;else if("navigator"==q.quote)vm.getNavigator(),q.currentIds=[],vm.paramsCache[q.key]&&(q.currentIds=vm.paramsCache[q.key].split(",")),showImg=!1;else if("content"==q.quote){if(q.content_id=q.default_value,q.keylist=[{data_types:["number","list","short_text","number","datetime","price","address","text_unit","text","model_list","model"],key:q.key,name:q.name}],q.mapping={},q.mapping[q.key]={field_key:q.default_value},vm.paramsCache[q.key]){q.content_id=vm.paramsCache[q.key];var url=config.getAPI("recordlistall");http(url,{method:"get"}).then(function(data){vm.contentlist=data.data,q.content_id&&q.content_id.indexOf("{{")>-1&&q.content_id.indexOf("}}")>-1?(q.content_id=q.content_id.substr(2,q.content_id.length-4),q.mapping[q.key]={field_key:q.content_id}):angular.forEach(vm.contentlist,function(item){q.content_id==item.id&&(q.title=item.data.title,q.showContent=!0)})})}else q.showContent=!0,q.title=q.name;q.hide||(showImg=!1)}}else{if(vm.paramsCache){var value=vm.paramsCache[q.key];value?value.indexOf("{{")>-1&&value.indexOf("}}")>-1?(q.value=value.substr(2,value.length-4),vm.mapping[q.key]={field_key:q.value}):(q.value=value?value:q.default_value,vm.mapping[q.key]={value:value}):(q.value=q.default_value,vm.paramsCache[q.key]=q.default_value)}q.data_types=q.data_types.length?q.data_types:["number","list","short_text","number","datetime","price","address","text_unit","text","model_list","model"],q.hide||(arr.push(q),showImg=!1)}}),vm.currentUri.showImg=showImg,vm.currentUri.normalqueries=arr,vm.isInit=!0},initPageParams:function(){angular.forEach(vm.bindKeyList,function(val){var paramval=vm.paramsCache[val.key];paramval?paramval.indexOf("{{")>-1&&paramval.indexOf("}}")>-1?(paramval=paramval.substr(2,paramval.length-4),vm.mapping[val.key]={field_key:paramval}):vm.mapping[val.key]={value:paramval}:vm.mapping[val.key]={}})},changeValue:function(value,uri){uri.value=value},getModuleList:function(){var defer=$q.defer(),_this=this;return modelService.fetchModelList(!0).then(function(modelList){_this.modelList=modelList,defer.resolve(vm.modelList)}),defer.promise},getModelFields:function(){var _this=this;dingdoneSelectorService.init({pageId:scope.pageId,model:scope.model}).then(function(result){_this.selector=result})},getNavigator:function(){var url=config.getAPI("getnavgrouplist"),defer=$q.defer(),_this=this;return http(url).then(function(data){data&&"0"==data.error_code&&(_this.navigator=data.result.data,defer.resolve(vm.navigator))}),defer.promise},selectContent:function(model_id,querie){utils.mdDialog({controller:"dingdoneSelectContentCtrl",templateUrl:"common/directives/model/dingdone-select-content-model.html",clickOutsideToClose:!0,locals:{modalData:{}}}).then(function(data){querie.content_id=data.content_id;var bool=_.find(vm.currentUri.queries,function(q){return"model"==q.key});bool&&(vm.paramsCache[bool.key]=data.slug),querie.title=data.title})},getDetailPageData:function(){var key=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"standard-link",_this=this;pageManagerService.getPages().then(function(json){vm.page=json,_this.currentPage={id:vm.paramsCache?vm.paramsCache.module_id:""},vm.currentUri.pageType=key,_this.currentPage.id&&PageParamesService.getList(_this.currentPage.id).then(function(pageParamList){vm.bindKeyList=pageParamList,vm.initPageParams()});var _loop2=function(_key){angular.forEach(vm.page[_key],function(page,index){page.id==scope.pageId&&vm.page[_key].splice(index,1)})};for(var _key in vm.page)_loop2(_key);console.log(vm.currentUri.identifier,"vm.currentUri.identifier")})},selectPage:function(page,type){this.currentPage=page,vm.paramsCache.module_id=page.id,PageParamesService.getList(page.id).then(function(pageParamList){vm.bindKeyList=pageParamList})},currentIds:[],selectAll:function(arr,querie){querie.isCheck=!querie.isCheck,querie.currentIds=[],angular.forEach(arr,function(item){querie.isCheck&&querie.currentIds.push(item.id)})},select:function(item,querie,flag){flag&&(querie.currentIds=[]),querie.currentIds.indexOf(item.id)==-1?querie.currentIds.push(item.id):this.removeByValue(item.id,querie.currentIds)},uploadImage:function(file,uri){var url=config.getAPI("upload");vm.imageloading=!1,upload(url,file).then(function(data){uri.value=data.url,vm.imageloading="complete"},function(reason){vm.imageloading="complete"})},removeByValue:function(value,arr){var index=arr.indexOf(value);arr.splice(index,1)},selectModule:function(uri){this.selectTypeHandler&&this.selectTypeHandler[uri.quote]&&this.selectTypeHandler[uri.quote](uri)},showPop:function(uri){var dataTypes=(uri.data_type,["number","list","short_text","number","datetime","price","address","text_unit","text","model_list","model"]);dingdoneSelectorService.showPop({selector:this.selector,pageId:scope.pageId,dataTypes:dataTypes}).then(function(data){uri.value=data.key})},selectTypeHandler:{module:function(uri){var hightSetModulePop=utils.mdDialog({templateUrl:"appmake/modal/highsetmodule.html",controller:"HighSetModuleCtrl",locals:{highSetData:{quote:uri.quote}}}),self=this;uri.value=uri.value?uri.value:"",hightSetModulePop.then(function(settings){uri.value=self.format(settings.dataId,uri)})},format:function(str,uri){return uri.dynamic&&(str="{"+str+"}"),str},content:function(uri){this.module(uri)},model_fields:function(uri){var hightSetModuleFieldPop=utils.mdDialog({templateUrl:"appmake/modal/highsetmodulefield.html",controller:"HighSetModuleFieldCtrl",locals:{params:{quote:uri.quote,model_id:params.model_id}}}),self=this;uri.value=uri.value?uri.value:"",hightSetModuleFieldPop.then(function(settings){uri.value=self.format(settings.dataId,uri)})},navigator:function(uri){var hightSetNavigatorPop=utils.mdDialog({templateUrl:"appmake/modal/highsetnavigator.html",controller:"HighSetNavigatorCtrl",locals:{params:{quote:uri.quote,model_id:params.model_id}}}),self=this;uri.value=uri.value?uri.value:"",hightSetNavigatorPop.then(function(settings){uri.value=self.format(settings.dataId,uri)})}},save:function(flag){var uri="";if("custom"==vm.currentUri.identifier){if(!verifyService.isUrl(vm.currentUri.uri))return void utils.error("请输入合法的url！");uri=vm.currentUri.uri}else uri=this.ping();scope.$emit(flag,uri)},otherQuote:["content","model","detail_module","navigator","general_module","module"],ping:function(){if(!vm.currentUri)return void utils.error("请选择事件！");var uri;return uri=vm.currentUri&&vm.currentUri.uri&&vm.currentUri.uri.indexOf("?")==-1?vm.currentUri.uri+"?":vm.currentUri.uri+"&",angular.forEach(vm.currentUri.queries,function(querie){"model"==querie.quote||"navigator"==querie.quote?vm.paramsCache[querie.key]=querie.currentIds.join(","):"general_module"==querie.quote||"detail_module"==querie.quote?angular.forEach(vm.bindKeyList,function(val){if(vm.mapping[val.key]){var field_key=vm.mapping[val.key].field_key;field_key&&"undefined"!=field_key?vm.paramsCache[val.key]="{{"+field_key+"}}":vm.mapping[val.key].value?vm.paramsCache[val.key]=vm.mapping[val.key].value:vm.paramsCache[val.key]=""}}):"content"==querie.quote&&(querie.showContent?vm.paramsCache[querie.key]=querie.content_id:vm.paramsCache[querie.key]="{{"+querie.mapping[querie.key].field_key+"}}")}),angular.forEach(vm.currentUri.normalqueries,function(querie){var field=vm.mapping[querie.key];field?field.field_key&&"undefined"!=field.field_key?vm.paramsCache[querie.key]="{{"+field.field_key+"}}":void 0!=field.value&&(vm.paramsCache[querie.key]=field.value):vm.paramsCache[querie.key]=""}),angular.forEach(vm.paramsCache,function(paramval,paramkey){uri+=paramkey+"="+paramval+"&"}),uri=uri.substr(0,uri.length-1)},changeUrl:function(){scope.url="custom"}}),scope.$on("saveUri",function(event,params){vm.save(params.flag)}),vm.init()}}})});