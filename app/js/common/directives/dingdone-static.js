"use strict";
define(function(require) {
	var app = require("app"),
		Hightcharts = (require("daterangepicker"), require("heightchart"));
	app.directive("dingdoneStatic", ["$rootScope", "$timeout", "config", "utils", "http", function($rootScope, $timeout, config, utils, http) {
		return {
			restrict: "EA",
			scope: {},
			replace: !0,
			templateUrl: "common/directives/dingdone-static.html",
			link: function(scope, ele, attr) {
				var vm = scope.vm = {};
				angular.extend(vm, {
					url: "",
					data: {
						android: {},
						ios: {}
					},
					init: function() {
						this.url = config.getAPI("getHomeStatistics"), this.device_url = config.getAPI("getStatisticsData"), this.activate_url = config.getAPI("getActivateData"), vm.oldLabel = "最近七天", vm.currentType = "week", vm.statisticActive = !0, this.getTodayDate(), this.getStatisticsData()
					},
					tabStatistic: function(type) {
						"device" == type ? (vm.statisticActive = !0, vm.chart && vm.chart.showLoading(), this.getStatisticsData()) : "active" == type && (vm.statisticActive = !1, vm.chart && vm.chart.showLoading(), this.getActivateData())
					},
					getTodayDate: function() {
						var _this = this;
						_this.getDateInfo(), $timeout(function() {
							_this.chooseDate()
						}, 200)
					},
					getDateInfo: function(type) {
						var week = 6048e5,
							NowTime = new Date,
							sBefore = NowTime.getTime() - week,
							today = NowTime.toLocaleDateString(),
							yesterday = new Date(NowTime.getTime() - 864e5).toLocaleDateString(),
							before = new Date(sBefore).toLocaleDateString(),
							firstDayOfMon = new Date(NowTime.getFullYear(), NowTime.getMonth(), 1).toLocaleDateString(),
							lastDayOfMon = lastDayOfMon = new Date(NowTime.getFullYear(), NowTime.getMonth() + 1, 0).toLocaleDateString();
						this.end_time = today, this.start_time = before, this.today = today, this.yesterday = yesterday, this.firstDayOfMon = firstDayOfMon, this.lastDayOfMon = lastDayOfMon
					},
					getXtype: function() {
						["today", "yesterday"].indexOf(vm.currentType) != -1 ? vm.currentXType = "hour" : ["week"].indexOf(vm.currentType) != -1 ? vm.currentXType = "day" : ["month"].indexOf(vm.currentType) != -1 ? vm.currentXType = "day" : vm.currentXType = "day"
					},
					getHomeStatistics: function() {
						var url = this.url.replace("{start_time}", this.start_time).replace("{end_time}", this.end_time),
							_this = this;
						vm.chartloading = !1, http(url).then(function(resp) {
							resp.error_code ? utils.error(resp.error_message) : (_this.data = resp.result, _this.refreshChart()), vm.loading = "complete"
						})["catch"](function() {
							vm.loading = "fail"
						})
					},
					getStatisticsData: function() {
						var _this = this;
						_this.getXtype();
						var data = {
							device_type: "",
							start_time: _this.start_time,
							end_time: _this.end_time,
							data_type: "diy",
							unit_type: vm.currentXType
						};
						http(_this.device_url, {
							method: "get",
							params: data
						}).then(function(res) {
							0 == res.error_code && "success" == res.error_message ? (_this.data = res.result, _this.refreshChart()) : utils.error("获取数据失败 ！ 错误信息:", res.error_message)
						})
					},
					getActivateData: function() {
						var _this = this;
						_this.getXtype();
						var data = {
							device_type: "",
							start_time: _this.start_time,
							end_time: _this.end_time,
							data_type: "diy",
							unit_type: vm.currentXType
						};
						http(_this.activate_url, {
							method: "get",
							params: data
						}).then(function(res) {
							0 == res.error_code && "success" == res.error_message ? (_this.data = res.result, _this.refreshChart()) : utils.error("获取数据失败 ！ 错误信息:", res.error_message)
						})
					},
					dealChoostDateShow: function() {
						var tdArr = $(".daterangepicker td");
						tdArr.each(function(indx, ele) {
							var oEle = $(ele),
								cName = oEle.attr("class"),
								filterCls = ["off", "active", "in-range"];
							$.each(filterCls, function(index, item) {
								if (cName.indexOf(item) != -1) {
									oEle.css({
										cursor: "default !important",
										"background-color": "transparent !important",
										position: "relative"
									}), "off" == item || ("active" == item && cName.indexOf("off") != -1 ? oEle.removeClass("active") : "in-range" == item && cName.indexOf("off") != -1 && oEle.removeClass("in-range")), oEle.off();
									var thumbDiv = $("<span></span>").css({
										width: "100%",
										height: "100%",
										"background-color": "transparent",
										"z-index": "1",
										display: "block",
										position: "absolute",
										top: "0",
										left: "0"
									});
									oEle.append(thumbDiv)
								}
							})
						})
					},
					chooseDate: function() {
						var _this = this;
						$("#daterangepicker").daterangepicker({
							parentEl: ".time-picker",
							opens: "left",
							autoApply: !0,
							startDate: vm.start_time,
							endDate: vm.end_time,
							maxDate: vm.today,
							singleDatePicker: !1,
							dateLimit: {
								days: 30
							},
							ranges: {
								"昨日": [_this.yesterday, _this.yesterday],
								"今日": [_this.today, _this.today],
								"最近七天": [_this.start_time, _this.end_time],
								"本月": [_this.firstDayOfMon, _this.lastDayOfMon]
							},
							showCustomRangeLabel: !1,
							alwaysShowCalendars: !0,
							locale: {
								format: "YYYY/MM/DD",
								applyLabel: "确认",
								cancelLabel: "取消",
								daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
								monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
							}
						}, function(start, end, label) {
							_this.start_time = start.format("YYYY/MM/DD"), _this.end_time = end.format("YYYY/MM/DD")
						}), $(".time-picker").on("show.daterangepicker", function(event) {
							vm.dealChoostDateShow()
						}), $(".time-picker").on("hide.daterangepicker", function(event, picker) {
							vm.chart && vm.chart.showLoading();
							var label = picker.chosenLabel;
							switch (label) {
							case "昨日":
								vm.currentType = "yesterday";
								break;
							case "今日":
								vm.currentType = "today";
								break;
							case "最近七天":
								vm.currentType = "week";
								break;
							case "本月":
								vm.currentType = "month"
							}
							vm.oldLabel == label && (vm.currentType = "diy"), vm.oldLabel = label, vm.statisticActive ? _this.getStatisticsData() : _this.getActivateData()
						})
					},
					getCharData: function(data) {
						vm.androidData = [], vm.iosData = [], vm.x_categories = [];
						for (var key in data) for (var son_key in data[key])"android" == key ? vm.androidData.push([son_key, data[key][son_key]]) : vm.iosData.push([son_key, data[key][son_key]]), vm.x_categories.indexOf(son_key) == -1 && vm.x_categories.push(son_key)
					},
					dealXShowFormat: function(x_categories) {
						if (!(x_categories && x_categories.length <= 0)) {
							var dealArr = [];
							return vm.currentTimeIndex = [], vm.tickInterval = 1, angular.forEach(x_categories, function(item, index) {
								var timeAndHour = item.split(" ");
								vm.currentTimeIndex.push(item), "hour" == vm.currentXType && ["today", "yesterday"].indexOf(vm.currentType) != -1 ? (dealArr.push(timeAndHour[1].substr(0, 5)), vm.tickInterval = 4) : "day" == vm.currentXType && ["week"].indexOf(vm.currentType) != -1 ? (vm.bigScreen ? dealArr.push(timeAndHour[0]) : dealArr.push(timeAndHour[0].substr(2)), vm.tickInterval = 1) : "day" == vm.currentXType && ["month"].indexOf(vm.currentType) != -1 ? (dealArr.push(timeAndHour[0].substr(2)), vm.tickInterval = 5) : "day" == vm.currentXType && ["diy"].indexOf(vm.currentType) != -1 && (x_categories.length <= 8 ? (vm.bigScreen ? dealArr.push(timeAndHour[0]) : dealArr.push(timeAndHour[0].substr(2)), vm.tickInterval = 1) : x_categories.length <= 15 ? (vm.tickInterval = 2, dealArr.push(timeAndHour[0].substr(2))) : (vm.tickInterval = 5, dealArr.push(timeAndHour[0].substr(2))))
							}), dealArr
						}
					},
					dealYShowFormat: function(data, type) {
						if (!(data && data.length <= 0)) {
							var dealArr = [],
								bState = "",
								date = new Date;
							return angular.forEach(data, function(item, index) {
								vm.currentTimeIndex.indexOf(item[0]) != -1 && ("hour" == vm.currentXType ? item[0] = item[0].split(" ")[1].substr(0, 5) : "day" == vm.currentXType && (item[0] = item[0].split(" ")[0]), bState = new Date(item[0]).getTime() > new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()).getTime(), bState && (item[1] = ""), dealArr.push(item))
							}), dealArr
						}
					},
					refreshChart: function() {
						vm.getCharData(vm.data), vm.chart && vm.chart.hideLoading();
						var defaultOptionsZhCn = {
							lang: {
								loading: "加载中..."
							},
							chart: {
								renderTo: "_mychart_",
								spacing: vm.bigScreen ? [10, 40, 0, 39] : [10, 19, 5, 19],
								style: {
									fontFamily: "",
									fontSize: "12px",
									fontWeight: "bold",
									color: "#000"
								},
								type: "spline"
							},
							global: {
								useUTC: !0,
								timezoneOffset: 480,
								canvasToolsURL: "http://cdn.hcharts.cn/highcharts/modules/canvas-tools.js"
							},
							title: {
								text: ""
							},
							subtitle: {
								text: ""
							},
							credits: {
								enabled: !1,
								text: "好品推 © 云APP",
								href: "http://www.haopintui.net",
								position: {
									align: "right",
									x: -10,
									verticalAlign: "bottom",
									y: -5
								}
							},
							legend: {
								layout: "horizontal",
								backgroundColor: "#FFFFFF",
								floating: !0,
								align: "left",
								verticalAlign: "top",
								x: 20,
								y: -300
							},
							loading: {
								labelStyle: {
									color: "white"
								},
								style: {
									backgroundColor: "rgba(0,0,0,0.3)"
								},
								hideDuration: 500,
								showDuration: 500
							},
							xAxis: {
								dateTimeLabelFormats: {
									millisecond: "%H:%M:%S.%L",
									second: "%H:%M:%S",
									minute: "%H:%M",
									hour: "%H:%M",
									day: "%e. %b",
									week: "%e. %b",
									month: "%b '%y",
									year: "%Y"
								},
								categories: vm.dealXShowFormat(vm.x_categories),
								tickInterval: vm.tickInterval,
								labels: {
									align: "center",
									style: {
										color: "#999"
									}
								}
							},
							yAxis: {
								title: {
									text: ""
								},
								labels: {
									formatter: function() {
										return this.value
									},
									style: {
										color: "#999"
									}
								}
							},
							tooltip: {
								dateTimeLabelFormats: {
									millisecond: "%A, %b %e, %H:%M:%S.%L",
									second: "%A, %b %e, %H:%M:%S",
									minute: "%A, %b %e, %H:%M",
									hour: "%b %e, %H:%M",
									day: "%Y-%m-%d",
									week: "Week from %A, %b %e, %Y",
									month: "%m-%Y",
									year: "%Y"
								},
								backgroundColor: "#24334b",
								borderColor: "#24334b",
								borderRadius: 10,
								borderWidth: 1,
								shadow: !1,
								padding: 10,
								crosshairs: {
									width: 1,
									color: "#ccc",
									dashStyle: "shortdot"
								},
								shared: !0,
								animation: !0,
								useHTML: !0,
								headerFormat: "<span>{point.key}</span><br/>",
								pointFormat: '<p style="display:inline-block;margin:0;margin-right:10px;">{series.name}: <span style="color: {series.color};">{point.y}</span></p>',
								footerFormat: "</table>",
								style: {
									color: "#ffffff",
									fontSize: "12px",
									fontWeight: "normal",
									fontFamily: "Courir new"
								}
							},
							plotOptions: {
								spline: {
									marker: {
										states: {
											hover: {
												fillColor: "#fff",
												lineWidth: 3,
												radius: 6
											}
										},
										radius: 1
									}
								}
							},
							series: [{
								name: "Android",
								marker: {
									symbol: "circle",
									states: {
										hover: {
											lineColor: "#14a7ff"
										}
									}
								},
								data: vm.dealYShowFormat(vm.androidData, "android"),
								color: "#14a7ff",
								lineWidth: 3
							}, {
								name: "IOS",
								marker: {
									symbol: "circle",
									states: {
										hover: {
											lineColor: "#05ccac"
										}
									}
								},
								data: vm.dealYShowFormat(vm.iosData, "ios"),
								color: "#05ccac",
								lineWidth: 3
							}]
						};
						vm.chart = new Hightcharts.Chart(defaultOptionsZhCn)
					}
				}), $timeout(function() {
					vm.init()
				}, 760), $rootScope.$on("staticToAutoSize", function(event, isbig) {
					vm.bigScreen = isbig
				}), scope.$watch("vm.bigScreen", function(newval, oldval) {
					newval != oldval && vm.refreshChart()
				})
			}
		}
	}])
});