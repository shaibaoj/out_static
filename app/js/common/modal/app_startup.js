"use strict";
define(function(require) {
	var app = require("app");
	require("common/directives/superui/dingdone_widget"), require("appcreate/directive/font-slider"), require("common/directives/form-select"), require("common/modal/modal-header"), require("common/modal/modal-footer"), app.controller("AppStartUpCtrl", ["$scope", "$mdDialog", "$timeout", "http", "config", "utils", "params", "upload", function($scope, $mdDialog, $timeout, http, config, utils, params, upload) {
		var vm = $scope.vm = {};
		angular.extend(vm, params, {
			utils: utils,
			form_scheme_font: [{
				attribute_key: "font_color",
				attribute_link: null,
				attrs: {
					enabled_alpha: !1
				},
				children: [],
				description: "",
				id: "w_font_color",
				title: "版权文字颜色",
				widget: "color",
				widget_link: null
			}],
			init: function() {
				vm.startpicuploading = "init", vm.colorpickerOption = angular.extend(config.colorpickerDefault, {}), vm.rating = 3, console.log(params, "params", vm.value, "vm.value"), vm.value ? this.initEdit() : this.initAdd()
			},
			addFFstr: function(str) {
				return "#ff" + str.substr(1)
			},
			initAdd: function() {
				vm.startup_type = "default";
				var url = config.getAPI("getSystemStartupConfig");
				http(url).then(function(json) {
					vm.systemStartupConfig = json.result
				}), vm.effect = function() {
					for (var arr = vm.systemStartupConfig.startup_effect, len = arr.length, i = 0; i < len; i++) if (arr[i]["default"]) return arr[i].value
				}(), vm.text_size = function() {
					for (var arr = vm.systemStartupConfig.copyright_text_size, len = arr.length, i = 0; i < len; i++) if (arr[i]["default"]) return arr[i].value
				}(), vm.copyright_text_color = "#" + vm.systemStartupConfig.copyright_text_color, vm.first_copyright_text_color = vm.addFFstr(vm.systemStartupConfig.copyright_text_color), vm.options = {
					font_color: vm.first_copyright_text_color
				}
			},
			initEdit: function() {
				vm.startup_type = vm.value.startup_type, vm.startup_pic = vm.value.startup_pic, vm.effect = vm.value.effect, vm.text_size = vm.value.text_size, vm.copyright_text_color = vm.value.text_color, vm.first_copyright_text_color = vm.addFFstr(vm.value.text_color), vm.options = {
					font_color: vm.first_copyright_text_color
				}, vm.copyright = vm.value.copyright, vm.copyright ? vm.isCopyrightOpen = !0 : vm.isCopyrightOpen = !1
			},
			changeStartupType: function(str) {
				vm.startup_type = str
			},
			changeStartupPic: function(index) {
				vm.defaultStartupPicIndex = index, vm.startup_pic = vm.systemStartupPic[index]
			},
			changeTextSize: function(val) {
				vm.text_size = val
			},
			changeCopyrightTextColor: function(info) {
				vm.copyright_text_color = "#" + info.attrs.value.substr(3)
			},
			changeOpenStartPic: function() {
				vm.isCopyrightOpen || (vm.copyright = "")
			},
			startupAnimateShow: function(typeNum) {
				var imgObj = $(".together img");
				4 == typeNum ? imgObj.css({
					transition: "all 0.3s linear",
					transform: "scale(2)"
				}).fadeOut(1e3, function() {
					$timeout(function() {
						imgObj.css({
							transform: "scale(1)"
						}).fadeIn("fast")
					}, 300)
				}) : 3 == typeNum ? imgObj.animate({
					marginLeft: "160px"
				}, function() {
					$timeout(function() {
						imgObj.css("marginLeft", "0")
					}, 500)
				}) : 2 == typeNum ? imgObj.animate({
					marginLeft: "-160px"
				}, function() {
					$timeout(function() {
						imgObj.css("marginLeft", "0")
					}, 500)
				}) : 1 == typeNum && imgObj.fadeOut(1e3, function() {
					$timeout(function() {
						imgObj.fadeIn("fast")
					}, 300)
				})
			},
			uploadStartPic: function(file) {
				var url = config.getAPI("upload");
				vm.startpicuploading = null, upload(url, file, 160, 284, "startImage").then(function(data) {
					vm.startup_pic = data, vm.startpicuploading = "complete"
				}, function(reason) {
					vm.startpicuploading = "fail"
				})
			},
			selectPhone: function(type) {
				vm.phonetype = type;
				var imgW = $(".crop-base").width(),
					imgH = $(".crop-base").height(),
					typeW = config.phoneType[type].width,
					typeH = config.phoneType[type].height;
				if (imgW / imgH >= 220 / 300) {
					var w = (220 - imgH * (typeW / typeH)) / 2;
					$(".crop-mask").css({
						left: 0,
						top: (300 - imgH) / 2,
						clip: "rect(auto " + (220 - w) + "px auto " + w + "px)",
						display: "block"
					})
				} else {
					var h = (300 - imgW * (typeH / typeW)) / 2;
					$(".crop-mask").css({
						top: 0,
						left: (220 - imgW) / 2,
						clip: "rect(" + h + "px auto " + (300 - h) + "px auto)",
						display: "block"
					})
				}
			},
			save: function() {
				var obj = {
					startup_type: vm.startup_type,
					startup_pic: vm.startup_pic,
					effect: vm.effect,
					text_size: vm.text_size,
					text_color: vm.copyright_text_color,
					copyright: vm.copyright,
					isCopyrightOpen: vm.isCopyrightOpen
				};
				console.log($mdDialog, "$mdDialog"), console.log("obj", obj), $mdDialog.hide({
					value: obj,
					status: "success"
				})
			},
			close: function() {
				$mdDialog.hide()
			}
		}), vm.init(), $scope.$watch("vm.effect", function(newval, oldval) {
			newval != oldval && vm.startupAnimateShow(newval)
		})
	}])
});