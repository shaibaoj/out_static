"use strict";define(function(require){var app=require("app");require("common/modal/modal-header"),require("common/modal/modal-footer"),app.controller("PicCtrl",["$scope","$mdDialog","utils","http","config",function($scope,$mdDialog,utils,http,config){var vm=$scope.vm={};angular.extend(vm,{init:function(){console.log(" this is Link pic ctrl"),vm.uploading="init"},save:function(){this._uploadLinkPic(function(data){$mdDialog.hide(data)})},_uploadLinkPic:function(callback){vm.uploading=null;var url=config.getAPI("upload"),_this=this;vm.urllist&&vm.urllist.length>0&&http(url,{data:{url_list:vm.urllist.split("\n").join("\\n"),upload_type:1},method:"POST"}).then(function(data){var imgs=_this._formatData(data);vm.uploading="complete",callback&&callback(imgs)})["catch"](function(reject){vm.uploading="error",utils.error("上传图片失败,请检查输入时候有误！")})},_formatData:function(data){var picConfig=config.picConfig.form_multipic,imgs=[];return angular.forEach(data.material,function(img,key){img.url=utils.getImgUrl(img,picConfig.width,picConfig.height),imgs.push(img)}),imgs}}),vm.init()}])});
