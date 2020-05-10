"use strict";

function _defineProperty(obj, key, value) {
	return key in obj ? Object.defineProperty(obj, key, {
		value: value,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : obj[key] = value, obj
}
var _paths;
require.config({
	baseUrl: "https://res.youdanhui.com/app/js",
	paths: (_paths = {
		jquery: "jquery.min",
		"jquery-ui": "jquery-ui.min",
		"jquery.tmpl.min": "jquery.tmpl.min",
		"jquery.modal": "jquery.modal",
		ajaxload_new: "ajaxload_new",
		ajax_upload: "ajax_upload",
		"ueditor.config": "ueditor.config",
		"ueditor.all": "ueditor.all",
		"ueditor.plugins": "ueditor.plugins",
		angular: "angular/angular.min",
		"angular-plugins": "angular/angular.plugins",
		"angular-loader": "angular/angular-async-loader"
	}, _defineProperty(_paths, "ueditor.config", "third-party/ueditor/ueditor.config"), _defineProperty(_paths, "ueditor.all", "third-party/ueditor/ueditor.all.min"), _defineProperty(_paths, "ueditor.plugins", "third-party/ueditor/third-party/dingdone/editor.plugin.min"), _defineProperty(_paths, "form.utils", "common/directives/form.utils"), _defineProperty(_paths, "angular-dragdrop", "angular/angular-dragdrop.min"), _defineProperty(_paths, "angular-dndLists", "angular/angular-drag-and-drop-lists.min"), _defineProperty(_paths, "angular-popups", "angular/angular-popups"), _defineProperty(_paths, "underscore", "underscore-min"), _defineProperty(_paths, "jquery.spectrum", "third-party/spectrum/spectrum.min"), _defineProperty(_paths, "angular.spectrum", "third-party/spectrum/angular-spectrum-colorpicker.min"), _defineProperty(_paths, "datetimepicker", "jquery-ui-timepicker-addon"), _defineProperty(_paths, "clipboard", "third-party/clipboard.min"), _defineProperty(_paths, "rainbow", "third-party/rainbow.min"), _defineProperty(_paths, "moment", "third-party/moment"), _defineProperty(_paths, "uploadify", "jquery.uploadify.min"), _defineProperty(_paths, "video", "third-party/video"), _defineProperty(_paths, "zeroclipboard", "third-party/ZeroClipboard"), _defineProperty(_paths, "Chart", "third-party/Chart"), _defineProperty(_paths, "heightchart", "third-party/highcharts.src"), _defineProperty(_paths, "daterangepicker", "third-party/daterangepicker"), _defineProperty(_paths, "mustache", "third-party/mustache"), _defineProperty(_paths, "nprogress", "third-party/nprogress"), _defineProperty(_paths, "templateCache", "templateCache"), _defineProperty(_paths, "appmaketemplateCache", "appmaketemplateCache"), _defineProperty(_paths, "common/services/server", "common/services/server"), _defineProperty(_paths, "bootstrap.min", "bootstrap.min"), _paths),
	shim: {
		"jquery-ui": {
			deps: ["jquery"]
		},
		angular: {
			exports: "angular",
			deps: ["jquery-ui"]
		},
		datetimepicker: {
			exports: "datetimepicker",
			deps: ["angular"]
		},
		"app.router": {
			deps: ["angular"]
		},
		"ueditor.plugins": {
			deps: ["ueditor.all", "jquery.tmpl.min", "jquery.modal", "ajaxload_new", "ajax_upload"]
		},
		"ueditor.all": {
			deps: ["ueditor.config"]
		}
	},
	waitSeconds: 0,
	urlArgs: "2017102301"
}), require(["jquery", "jquery-ui", "angular", "datetimepicker", "moment", "app.router"], function() {
	angular.element(document).ready(function() {
		angular.bootstrap(document, ["dingdoneApp"])
	})
});