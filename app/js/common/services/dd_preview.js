"use strict";define(function(require){var app=require("app"),server=require("common/services/server"),cycleInterval=30,delayTime=2e4;require("rainbow"),app.factory("PreviewAssistant",["$q","http","config",function($q,http,config){var vm={};return angular.extend(vm,{identityDict:[],resetDict:function(){this.identityDict=[]},doDict:function(params,cb){var action=params.action;if("online"==action||"upline"==action){var match=_.filter(vm.identityDict,function(obj){return obj.identity==params.identity});match.length||(vm.identityDict.push(params),cb(params)),console.log("打印当前在线的设备列表:",vm.identityDict)}else{console.log("打印设备列表:",vm.identityDict,"当前设备:",params.identity);for(var i=0;i<vm.identityDict.length;i++)vm.identityDict[i].identity==params.identity&&(vm.identityDict.splice(i,1),cb(params),console.log("打印下线设备:",params.identity))}},rainbowStart:function(sessionid,guid,upDownCallback){var host=server.rainbowConnect+"?DDP-USER-SESSIONID="+sessionid+"&DDP-APP-GUID="+guid,rainbow=new Rainbow(host);vm.rainbow=rainbow,vm.sessionid=sessionid,vm.guid=guid,rainbow.on("open",function(){}).on("message",function(msgType,data){if(3==msgType){var json=data;json&&json.action&&$.inArray(json.action,["upline","downline","online"])>-1&&vm.rainbowLocalIdentity!=json.data.identity&&vm.doDict({identity:json.data.identity,client:json.data.client,action:json.action},upDownCallback)}}).on("close",function(err){err&&console.log("Close with error: "+err.message)}).on("error",function(err){console.log(err)}),rainbow.open(function(){rainbow.send(0,"hello world",2,delayTime).on("success",function(res){vm.rainbowLocalIdentity=res.identity;var url=config.getAPI("rainbowsubscribe");http(url,{method:"post",data:{channel:guid,identity:res.identity,sessionid:sessionid}}).then(function(){var sendCallback=function(){rainbow.send(3,{message:{action:"check_client",channel:guid}},2,delayTime)};sendCallback();setInterval(function(){vm.resetDict(),sendCallback()},1e3*cycleInterval)})}).on("failed",function(err){console.log("send failed"),console.log(err)})}),window.rainbow=rainbow},rainbowClose:function(){vm.rainbow&&vm.rainbow.close()},ddPreview:function(params){console.log(params,"v1_ddPreview");var str=config.getAPI("helper"),paramsArr=[];for(var k in params)paramsArr.push(k+"="+params[k]);return str+="?"+paramsArr.join("&"),http(encodeURI(str).replace("#","%23"))},new_ddPreview:function(params){console.log(params,"v2_ddPreview");var deferred=$q.defer(),widgetinfo=params.widgetinfo,attrs={};attrs[widgetinfo.attrs.attribute_key]=widgetinfo.attrs.value;var message_body={target:params.target,operation:params.operation||"update",root_view_id:params.root_view_id,view_id:params.view_id,attrs:attrs};return console.log(message_body,"message_body"),widgetinfo.resource&&(message_body.resource=widgetinfo.resource),rainbow.send(3,{message:{action:"preview_v2",channel:vm.guid,data:message_body}},1,delayTime).on("success",function(res){var connections=vm.identityDict.length;deferred.resolve({error_code:0,result:{connections:connections}})}),deferred.promise},v3_ddPreview:function(params){var deferred=$q.defer(),message_body={target:params.target,operation:params.operation||"update",root_view_id:params.root_view_id,view_id:params.view_id,views_attr:params.views_attr,resource:params.resource};return rainbow.send(3,{message:{action:"preview_v3",channel:vm.guid,data:message_body}},1,delayTime).on("success",function(res){var connections=vm.identityDict.length;deferred.resolve({error_code:0,result:{connections:connections}})}),deferred.promise},getViewsAttr:function(params){var views_attr={},widgetinfo=params.widgetinfo,uuid=params.widget_id||params.root_view_id;if(widgetinfo&&widgetinfo.attrs){var obj={};obj[widgetinfo.attrs.attribute_key]=widgetinfo.attrs.value,views_attr[uuid]=obj}return views_attr}}),{getDevice:function(){return vm.identityDict},rainbowStart:vm.rainbowStart,rainbowClose:vm.rainbowClose,ddPreview:vm.ddPreview,new_ddPreview:vm.new_ddPreview,v3_ddPreview:vm.v3_ddPreview}}])});
