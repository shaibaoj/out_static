"use strict";define(function(require){var app=require("app");app.directive("dingdoneFileSelect",[function(){return{scope:{accept:"@",dingdoneFileSelect:"&"},restrict:"AEC",link:function($scope,el){var fileHtml='<input type="file" accept="'+$scope.accept+'" class="hidden"/>',fileDom=$(fileHtml).insertBefore(el);el.on("click",function(){$(this).siblings("input").click()}),fileDom.on("change",function(){$scope.dingdoneFileSelect({$files:this.files})})}}}])});