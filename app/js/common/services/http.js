"use strict";
define(function(require) {
	var app = require("app");
	app.factory("http", ["$q", "$http", "$state", "$timeout", "utils", "$rootScope", function($q, $http, $state, $timeout, utils, $rootScope) {
		return function(url, settings) {
			var deferred = $q.defer(),
				settings = settings || {},
				type = settings.type || "json",
				url = "jsonp" == type ? url + "&call_back=JSON_CALLBACK" : url;
			return "jsonp" === type ? $http.jsonp(url).success(function(data) {
				deferred.resolve(data)
			}).error(function(reason) {
				deferred.reject(reason)
			}) : $http({
				url: url,
				method: settings.method || "get",
				data: settings.data || null,
				params: settings.params || null,
				responseType: type
			}).success(function(data) {
				data && data.error_code && utils.error(data.error_message), deferred.resolve(data)
			}).error(function(reason) {
				if (reason) {
					if (!settings.error_nonotice && reason.error_code && "resolvePlanLayout.moduledetial" != $state.$current.name && "specialmake" != $state.$current.name && utils.error(reason.error_message), 1e3 == reason.error_code && "loginLayout.userlogin" != $state.$current.name && "layout_for_push.customersystem" != $state.$current.name && "resolvePlanLayout.moduledetial" != $state.$current.name && "specialmake" != $state.$current.name && $timeout(function() {
						$state.go("loginLayout.userlogin")
					}, 1500), 1e3 == reason.error_code) {
						var code = reason.error_code;
						$rootScope.resetAPPandUserInfo(), $rootScope.$broadcast("checkUserError", code)
					}
					deferred.reject(reason)
				}
			})["catch"](function(reason) {
				reason && (!settings.error_nonotice && reason.error_code && utils.error(reason.error_message), deferred.reject(reason))
			}), deferred.promise
		}
	}]), app.factory("httpInterceptor", ["$q", function($q) {
		return {
			request: function(config) {
//				if("DELETE" == config.method){
//					config.headers["Content-Type"] = "application/json;charset=UTF-8";
//				}
//				else if("POST" == config.method){
//					config.headers["Content-Type"] = "application/x-www-form-urlencoded";
//				}
//				return config;
				return "DELETE" == config.method && (config.headers["Content-Type"] = "application/json;charset=UTF-8"), config
			},
			requestError: function(rejection) {
				return $q.reject(rejection)
			},
			response: function(_response) {
				return 200 == _response.status, _response
			},
			responseError: function(rejection) {
				return $q.reject(rejection)
			}
		}
	}]), app.config(["$httpProvider", function($httpProvider) {
		$httpProvider.defaults.withCredentials = !0, $httpProvider.interceptors.push("httpInterceptor")
	}])
});