"use strict";
define(function(require) {
	var app = require("app"),
		moment = require("moment");
	app.controller("MessageListCtrl", ["$scope", "$sce", "$state", "http", "config", "utils", "navconfig", function($scope, $sce, $state, http, config, utils, navconfig) {
		var vm = $scope.vm = {};
		angular.extend(vm, {
			init: function() {
				vm.loading = "init", this._getMessageList()
			},
			_getMessageList: function() {
				var _this = this;
				vm.loading = null;
				var url = config.getAPI("messagelist");
				http(url).then(function(data) {
					vm.messagelist = _this._formatData(data.notice), vm.loading = "complete"
				})["catch"](function() {
					vm.loading = "error"
				})
			},
			_formatData: function(list) {
				return angular.forEach(list, function(notice, key) {
					notice.content = $sce.trustAsHtml(notice.content), notice.create_at = moment(notice.create_at).format("YYYY-MM-DD"), console.log(notice.create_at, "notice.create_at")
				}), list
			},
			publish: function(item) {
				var url = config.getAPI("publishnotice");
				http(url, {
					method: "POST",
					data: {
						id: item.id,
						status: 1
					}
				}).then(function(data) {
					item.status = 1, utils.success("发布成功!")
				})["catch"](function(data) {
					utils.error("发布失败!")
				})
			},
			"delete": function(id) {
				var url = config.getAPI("deletenotice");
				http(url, {
					method: "POST",
					data: {
						id: id
					}
				}).then(function(data) {
					utils.success("删除成功!").then(function() {
						$state.reload()
					})
				})["catch"](function(data) {
					utils.error("删除失败!")
				})
			}
		}), $scope.$on("checkApp", function(event, first_appinfo) {
			vm.init()
		})
	}])
});