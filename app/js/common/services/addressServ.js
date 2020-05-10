"use strict";
define(function(require) {
	var app = require("app");
	app.factory("addressServ", ["http", "config", function(http, config) {
		return {
			getProvince: function() {
				var url = config.getAPI("getprovince");
				return http(url)
			},
			getCity: function(province_code) {
				var url = config.getAPI("getcity").replace("{province_code}", province_code);
				return http(url)
			},
			getRaion: function(city_code) {
				var url = config.getAPI("getRaion").replace("{city_code}", city_code);
				return http(url)
			}
		}
	}])
});