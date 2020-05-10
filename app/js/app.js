"use strict";
define(function(require, exports, module) {
	require("templateCache"), require("appmaketemplateCache"),
			require("angular-plugins"), require("underscore"),
			require("jquery.spectrum"), require("angular.spectrum"),
			window.D = _, window.A = angular;
	var angularDragula = require("angular-dragdrop");
	require("angular-dndLists");
	var app = angular.module("dingdoneApp", [ "ui.router", "ngAnimate",
			"ui.bootstrap", "ui.sortable", "templateCache",
			"appmaketemplateCache", "angularFileUpload", "ngMaterial",
			"widget.scrollbar", "ngMaterialDatePicker",
			"angularSpectrumColorpicker", "dndLists", "nsPopover",
			angularDragula(angular) ]);
	module.exports = app
});