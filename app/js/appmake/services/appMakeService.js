"use strict";
define(function(require) {
	var app = require("app"),
		server = require("common/services/server");
	app.factory("appMakeService", ["$q", "$upload", "http", "config", "utils", function($q, $upload, http, config, utils) {
		var services = {},
			pageparam = {};
		return angular.extend(services, {
			getAppBaseInfo: function(guid) {
				var url = config.getAPI("getappbaseinfo").replace("{guid}", guid);
				return http(url)
			},
			updateAppBaseInfo: function(guid, data) {
				var url = config.getAPI("updateappbaseinfo").replace("{guid}", guid);
				return http(url, {
					method: "post",
					data: data
				})
			},
			getAppList: function() {
				var deferred = $q.defer(),
					promise = deferred.promise,
					_this = this,
					url = config.getAPI("getapplist");
				return this.applicationlist ? deferred.resolve(this.applicationlist) : http(url).then(function(json) {
					_this.applicationlist = json, deferred.resolve(_this.applicationlist)
				}), promise
			},
			resetAppList: function() {
				this.applicationlist && (this.applicationlist = null)
			},
			getBusiness: function(guid) {
				var url = config.getAPI("getbusiness").replace("{guid}", guid);
				return http(url)
			},
			getYouzanAuth: function() {
				var url = config.getAdminAPI("getyouzanauth");
				return http(url)
			},
			getVersion: function(guid) {
				var url = config.getAPI("getversion").replace("{guid}", guid);
				return http(url)
			},
			getMainUI: function(guid) {
				var url = config.getAPI("getmainui").replace("{guid}", guid);
				return http(url)
			},
			setThirdPartService: function(guid, data) {
				var url = config.getAPI("setthirdpartservice").replace("{guid}", guid);
				return http(url, {
					method: "post",
					data: data
				})
			},
			getModulePic: function(pic) {
				if (angular.isObject(pic)) {
					var url = "";
					return url = pic.url ? pic.url : utils.getImgUrl(pic)
				}
				if (angular.isString(pic)) {
					var pic = pic.substring(1, pic.length);
					return server.system_resource_host + "/images" + pic
				}
			},
			getRelVersion: function(isrelease) {
				var url = config.getAPI("getrelversion").replace("{isrelease}", isrelease);
				return http(url)
			},
			getPackageStatus: function(id) {
				var url = config.getAPI("getpackagestatus").replace("{id}", id);
				return http(url)
			},
			getProvinceList: function() {
				var url = config.getAPI("getprovince");
				return http(url)
			},
			getCityList: function(provinceCode) {
				var url = config.getAPI("getcity").replace("{province_code}", provinceCode);
				return http(url)
			},
			getGuidePic: function(guid) {
				var url = config.getAPI("getguidepic").replace("{id}", guid);
				return http(url)
			},
			getVersionLog: function(guid, type, current_page) {
				var url = config.getAPI("getversionlog").replace("{id}", guid).replace("{client_type}", type).replace("{current}", current_page);
				return http(url)
			},
			storeGuidePic: function(guid, type, file) {
				var deferred = $q.defer(),
					url = config.getAPI("storeguide").replace("{guid}", guid);
				return $upload.upload({
					url: url,
					method: "post",
					file: file,
					fileFormDataName: "file",
					data: {
						type: type
					}
				}).success(function(data) {
					deferred.resolve(data)
				}).error(function(reason) {
					deferred.reject(reason)
				}), deferred.promise
			},
			deleteGuidePic: function(picid) {
				var url = config.getAPI("deleteguide").replace("{id}", picid);
				return http(url, {
					method: "POST"
				})
			},
			sortGuidePic: function() {
				var url = config.getAPI("sortguide");
				return http(url, {
					method: "POST",
					data: data
				})
			},
			getAppIconConfig: function(guid) {
				guid = guid ? "&app_id=" + guid : "";
				var url = config.getAPI("getAppIconConfig") + guid;
				return http(url)
			},
			getDemoApp: function() {
				var url = config.getAPI("getdemoapp");
				return http(url)
			},
			getPackageInfo: function(guid) {
				var url = config.getAPI("getpackageinfo").replace("{guid}", guid);
				return http(url)
			},
			setPagemanageParam: function(typeObject) {
				pageparam.pagetype = typeObject
			},
			getPagemanageParam: function() {
				return pageparam.pagetype
			}
		}), services
	}])
});