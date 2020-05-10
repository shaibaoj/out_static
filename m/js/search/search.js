/* FILE BEGIN search/script/search/search.js */
var SEARCH = SEARCH || {};
var _brandFilterData = null;
var _brandarr = [];
var _brandId = [];
var __ua;
var bind_name = "input";
var delay = null;
SEARCH.main = (function(C) {
	var w = __ua = navigator.userAgent.toLowerCase();
	var A = function() {
			var a = C(window).height();
			if (document.getElementById("J_listWrap")) {
				C("#J_listWrap").css("height", a - C("#J_listWrap").offset().top);
				C("#J_listWrap .list-items").css("height", a - C("#J_listWrap").offset().top);
				C("#J_listWrap .list-details").css("height", a - C("#J_listWrap").offset().top);
				C("html").addClass("sn-active");
				C("body").css({
					height: a,
					overflow: "hidden"
				})
			}
			if (document.getElementById("J_resultNone")) {
				C("#J_resultNone").css("height", a - C("#J_resultNone").offset().top)
			}
		};
	var t = function() {
			C(".J_sort").on("click", function() {
				C("#J_cityWrap").addClass("city-wrap-up").css({
					height: 0
				});
				C("html").removeClass("sn-active");
				C("body").removeAttr("style").css("overflow", "initial");
				var a = C(window).height();
				C(this).toggleClass("curar");
				if (C("#J_sortWrap").hasClass("sort-wrap-up")) {
					var b = searcher.searchAmount;
					if (C("#channel_type").val() != "hwg" && C("#channel_type").val() == "") {
						C(".result-wrap .mask").show().css("height", a)
					} else {
						if (b == 0) {
							C(".result-wrap .mask").hide()
						} else {
							C(".result-wrap .mask").show().css("height", a)
						}
					}
					C("#J_sortWrap").removeClass("sort-wrap-up");
					C("html").addClass("sn-active");
					C("body").css({
						height: a,
						overflow: "hidden"
					})
				} else {
					C(".result-wrap .mask").hide();
					C("#J_sortWrap").addClass("sort-wrap-up");
					C("html").removeClass("sn-active");
					C("body").removeAttr("style").css("overflow", "initial")
				}
				return false
			});
			C("#J_sortWrap").find("em").on("click", function() {
				C("#J_sortWrap").addClass("sort-wrap-up");
				C(".result-wrap .mask").hide();
				C("html").removeClass("sn-active");
				C("body").removeAttr("style").css("overflow", "initial");
				if (C(this).parent("li").hasClass("cur")) {
					C(".wtable").detach()
				} else {
					C(this).parent("li").addClass("cur").siblings().removeClass("cur");
					var b = C(this).attr("data-rel"),
						a = C(this).attr("data-name");
					C(".J_sort").removeClass("curar").text(a).attr("data-rel", b)
				}
			});
			C(".mask").on("click", function() {
				C("#J_cityWrap").addClass("city-wrap-up").css({
					height: 0
				});
				C(".result-wrap .mask").hide();
				C("html").removeClass("sn-active");
				C("body").removeAttr("style").css("overflow", "initial");
				C("#J_sortWrap").addClass("sort-wrap-up");
				C(".J_sort").removeClass("curar")
			})
		};
	var v = function() {
			var a = C("#fileterSt").val();
			if (a) {
				C("html").removeClass("sn-active");
				C("body").removeAttr("style").css("overflow", "initial");
				var c = a;
				var b = C("#result-sort").find(".J_sort").attr("sel-val", c).text(d);
				C("li.wbox-flex.J_sort").addClass("cur").siblings().removeClass("cur");
				C("em[st$='0']").parent("li").removeClass("cur");
				if (c == "0") {
					var d = "综合"
				} else {
					if (c == "9") {
						d = "价格升序"
					} else {
						if (c == "10") {
							d = "价格降序"
						} else {
							if (c == "26") {
								d = "好评降序"
							} else {
								var d = "综合"
							}
						}
					}
				}
				b.attr("sel-val", c).text(d);
				C("em[st$='" + c + "']").parent("li").addClass("cur")
			}
		};
	var D = function() {
			var b = C("#resFilterWrap");
			var a = b.find("#cover");
			a.off().on("touchmove", function(c) {
				c.preventDefault()
			}).on("click", function() {
				_$this = C(this);
				b.removeClass("filter-show");
				_$this.css("display", "none");
				C("html").removeClass("sn-active");
				C("body").removeAttr("style");
				C(".letter-list").hide();
				setTimeout(function() {
					_$this.removeClass("on");
					C("body").removeAttr("style").css("overflow", "initial");
					b.css("display", "none")
				}, 500)
			});
			C(".J_filter").on("click", function() {
				getSelector();
				C("#J_sortWrap").addClass("sort-wrap-up");
				var c = C(window).height();
				C(".letter-list").show();
				b.css("display", "block");
				a.css("display", "block");
				setTimeout(function() {
					b.addClass("filter-show")
				}, 10);
				setTimeout(function() {
					a.addClass("on")
				}, 400);
				C("html").addClass("sn-active");
				C("body").css({
					height: c,
					overflow: "hidden"
				});
				C("#resFilterWrap").css("height", c)
			});
			C("#resFilterWrap .close-btn").on("click", function(c) {
				c.stopPropagation();
				b.find("#cover").trigger("click")
			});
			C("#resFilterWrap .submit-btn").on("touchend", function() {
				b.find("#cover").trigger("click")
			});
			window.addEventListener("resize", function() {
				var c = C(document.activeElement);
				if (w.indexOf("ucbrowser") != -1 && c.parent(".filter-price").length > 0) {
					c.parents("dl").siblings().removeClass("filter-open");
					setTimeout(function() {
						C("#resFilterWrap .res-filter-main").scrollTop(0)
					}, 300)
				} else {
					if (C("#resFilterWrap").is(":visible")) {
						setTimeout(function() {
							var d = C(window).height();
							C("body").css({
								height: d,
								overflow: "hidden"
							});
							C("#resFilterWrap").css("height", d)
						}, 100)
					}
				}
			});
			C(".filter-price").find("input").on("click focus", function(c) {
				var d = C(this).parents("dl");
				d.siblings().removeClass("filter-open");
				scrollTimer = setTimeout(function() {
					C(window).scrollTop(0);
					C("#resFilterWrap .res-filter-main").scrollTop(0)
				}, 100);
				if (!d.hasClass("filter-open")) {
					d.addClass("filter-open")
				} else {
					c.stopPropagation()
				}
			});
			C("#resFilterWrap").on("click touchmove", function(c) {
				if (C("#J_cityWrap").parents(".filter.city-btn.filter-open").length == 0) {
					c.stopPropagation()
				}
			});
			C("#resFilterWrap .filter-title").on("touchmove", function(c) {
				c.preventDefault()
			});
			C("#resFilterWrap .filter-bottom").on("touchmove", function(c) {
				c.preventDefault()
			})
		};
	var u = function() {
			C("#resFilterWrap .filter-alone").each(function(a) {
				C(this).find("em").on("click", function(d) {
					if (C(this).hasClass("on")) {
						C(this).removeClass("on");
						C(this).parents(".filter").find("dt").find(".fr").text("");
						C(this).parents(".filter").find("dt").find(".fr").attr("sel-val", "")
					} else {
						var b = C(this).text();
						var c = C(this).attr("id");
						C(this).addClass("on").siblings().removeClass("on");
						C(this).parents(".filter").find("dt").find(".fr").text(b).attr("sel-val", c)
					}
				})
			});
			C("#resFilterWrap .filter-mul").each(function(a) {
				if (C(this).hasClass("filter-cx")) {
					var b = C(this).find("em").length;
					C(this).find("em").on("click", function() {
						var c = C(this).parent().find("em");
						var g = [];
						var e = [];
						var f = C(this).parents(".filter").find("dt").find(".fr");
						if (C(this).hasClass("on")) {
							C(this).removeClass("on")
						} else {
							C(this).addClass("on")
						}
						var d = C(this).parent().find(".on");
						if (d.length > 0) {
							d.each(function() {
								g.push(C(this).text());
								e.push(C(this).attr("id"));
								f.text(g.join("、")).attr("sel-val", e.join(","))
							})
						} else {
							f.attr("sel-val", "").text("")
						}
					})
				} else {
					C(this).on("click", "em", function() {
						var c = C(this).parent().find("em");
						var g = [];
						var e = [];
						var f = C(this).parents(".filter").find("dt").find(".fr");
						if (C(this).hasClass("on")) {
							C(this).removeClass("on")
						} else {
							C(this).addClass("on")
						}
						var d = C(this).parent().find(".on");
						if (d.length > 0) {
							d.each(function() {
								g.push(C(this).text());
								e.push(C(this).attr("id"));
								f.text(g.join("、")).attr("sel-val", e.join(","))
							})
						} else {
							f.text("")
						}
					})
				}
			});
			cityPlugin.init()
		};
	var x = function() {
			C("#resFilterWrap .filter-alone-fl").find("em").on("click", function(a) {
				var b = C(this).text();
				var c = C(this).attr("id");
				C("#categoryId").val(c);
				C(this).addClass("on").siblings().removeClass("on");
				C(this).parents(".filter").find("dt").find(".fr").text(b).attr("sel-val", c);
				queryAllFilter()
			})
		};
	var y = function() {
			var a = "";
			C("#resFilterWrap .filter-mulbrand").find("em").on("click", function(b) {
				b.stopPropagation();
				if (C(this).hasClass("on")) {
					C(this).removeClass("on");
					_brandarr.removeByValue(C(this).text());
					_brandId.removeByValue(C(this).attr("id").substring(6))
				} else {
					C(this).addClass("on");
					_brandarr.push(C(this).text());
					_brandId.push(C(this).attr("id").substring(6))
				}
				C("#letter-sort").find("input").prop("checked", false);
				for (var c = 0; c < _brandId.length; c++) {
					C("#letter-sort").find("#code_" + _brandId[c]).prop("checked", "checked")
				}
				C(this).parents(".filter").find("dt").find(".fr").text(_brandarr.join("、")).attr("sel-val", _brandId.join(","))
			});
			C("#brand-all").on("click", function(d) {
				var c = C(window).height();
				var e = C("#resFilterWrap .shop-style dt").height();
				var b = e * 4;
				C("#resFilterWrap .shop-style").find(".filter-brand").css("max-height", c - b);
				C(this).css({
					display: "none"
				});
				C(this).parent().next().css({
					display: "block"
				});
				C("#brand-all").remove();
				letter(_brandFilterData, {
					callBack: function(g) {
						var f = C(g).parents("#letter-sort").offset().top;
						C(g).parents(".filter-brand").addClass("overtouch")
					},
					id: _brandId
				});
				C("#resFilterWrap .letter-sort").find("dd").on("click", function(h) {
					h.stopPropagation();
					if (!C(h.target).is("input")) {
						var i = C(this).find("input");
						i.prop("checked", !i.prop("checked"))
					}
					var j = C(this).parents(".letter-sort").find("dd input:checked");
					C(this).parents(".tabbox").children(".defalut-list").find("input").prop("checked", false);
					C(".filter-df").find("em").removeClass("on");
					var k = [];
					var g = [];
					for (var f = 0;
					f < j.length; f++) {
						k.push(j.eq(f).parent("dd").find("span").text());
						g.push(j.eq(f).attr("id").substring(5))
					}
					for (var l = 0; l < g.length; l++) {
						C(".filter-df").find("#pcode_" + g[l]).addClass("on")
					}
					C(this).parents(".filter").find("dt").find(".fr").text(k.join("、")).attr("sel-val", g.join(","))
				})
			})
		};
	var z = function() {
			C("#resFilterWrap .filter-self").find("dt").on("click", function() {
				if (C(this).parent("dl").hasClass("filter-open")) {
					C(this).parent("dl").removeClass("filter-open").siblings().removeClass("filter-open")
				} else {
					var a = C(this).parent("dl").attr("id");
					if (a != "" && _brandFilterData == null) {
						queryAllBrand()
					}
					C(this).parent("dl").find(".fl").text();
					C(this).parent("dl").addClass("filter-open").siblings().removeClass("filter-open");
					scrollTimer = setTimeout(function() {
						if (C(this).parent("dl").hasClass("city-btn")) {
							return
						}
						var b = C(this)[0].offsetTop;
						var c = b - C("#resFilterWrap .filter-title").height();
						C("#resFilterWrap .res-filter-main").scrollTop(c)
					}.bind(this), 10)
				}
			});
			C("#resFilterWrap .filter-price-list").find("em").on("click", function(c) {
				scrollTimer = setTimeout(function() {
					C(window).scrollTop(0);
					C("#resFilterWrap .res-filter-main").scrollTop(0)
				}, 80);
				var a = C(this).text(),
					e = new RegExp(/[一-龥]/);
				if (e.test(a)) {
					var f = a.match(/[一-龥]/g);
					if (f[1] == "上") {
						C(".filter-price").find("input").eq(0).val(parseInt(a)).end().eq(1).val("").attr("placeholder", "最高价")
					} else {
						C(".filter-price").find("input").eq(1).val(parseInt(a)).end().eq(0).val("").attr("placeholder", "最低价")
					}
				} else {
					var b = a.match(/-/g).length,
						d = a.split("-");
					if (b === 1) {
						C(".filter-price").find("input").eq(0).val(C.trim(d[0])).end().eq(1).val(C.trim(d[1]))
					} else {
						if (b === 2) {
							if (a.indexOf("-") === 0) {
								C(".filter-price").find("input").eq(0).val(-C.trim(d[1])).end().eq(1).val(C.trim(d[2]))
							} else {
								C(".filter-price").find("input").eq(0).val(C.trim(d[0])).end().eq(1).val(-C.trim(d[2]))
							}
						}
					}
				}
				C(this).addClass("on").siblings().removeClass("on")
			});
			u()
		};
	var B = function() {
			C("#searchAssInp").on("focus", function() {
				var a = C.trim(C(this).val());
				if (a) {
					C(this).parents(".sn-nav-inp").find(".clo-se-input").show()
				}
			});
			C("#searchAssInp").on("keyup input", function() {
				var a = C.trim(C(this).val());
				if (a == "") {
					C(this).parents(".sn-nav-inp").find(".clo-se-input").hide();
					C("body").removeClass("pop-color");
					C(".search-wrap").show();
					C("#searchAss").hide();
					return false
				} else {
					querySuggest(a);
					C(this).parents(".sn-nav-inp").find(".clo-se-input").show();
					C("body").addClass("pop-color");
					C(".search-wrap").hide()
				}
			});
			C("#searchAssInp").parents("div").next(".clo-se-input").on("click", function() {
				C("#searchAssInp").val("");
				C(this).parents(".sn-nav-inp").find(".clo-se-input").hide();
				C("body").removeClass("pop-color");
				C(".search-wrap").show();
				C("#searchAss").hide();
				C("#searchAssInp").focus()
			})
		};
	var p = function() {
			C("#searchHotInp").on("focus", function() {
				var a = C.trim(C(this).val());
				if (defaultWord && a == defaultWord) {
					C(this).val("").css("color", "#222").removeAttr("placeholder")
				}
				C(this).removeAttr("placeholder");
				C(".search-btn").show();
				C(".J_filter").hide();
				C("#sTop").hide();
				C(".float-b").css("display", "none");
				C(".result-ad").css({
					display: "none"
				});
				C(".search-fix-menu").hide();
				C("#hotwords").hide();
				C(".result-wrap").css({
					display: "none"
				});
				clearTimeout(delay);
				if (a != "") {
					window.scroll(0, 0);
					delay = setTimeout(function() {
						querySuggest(a)
					}, 10);
					C(this).parents(".sn-nav-inp").find(".clo-se-input").show();
					C(".shop-list-wrap").hide();
					C(".result-propose-store").hide();
					C(".result-flagship").hide();
					C("#J_resultNone").hide();
					C("#searchAss").show()
				} else {
					C(this).parents(".sn-nav-inp").find(".clo-se-input").hide();
					C("body").removeClass("pop-color");
					C(".shop-list-wrap").hide();
					C(".result-propose-store").hide();
					C(".result-flagship").hide();
					C("#searchAss").hide();
					C(".search-fix-menu").hide();
					C("#searchHot").show();
					C("#searchHotInp").val("");
					C(".searchInp").attr("placeholder", "请输入您想找的商品或宝贝链接");
					C("#keyword").val("");
					queryHistory();
					queryHotWrods()
				}
			});
			C("#searchHotInp").on("blur", function() {
				C(".result-ad").css({
					display: "none"
				});
				var a = C.trim(C(this).val());
				if (a == "" && defaultWord) {
					C(this).attr("placeholder", defaultWord)
				}
			});
			C("#searchHotInp").parents("div").next(".clo-se-input").on("click", function() {
				C("#searchHotInp").val("");
				C(".searchInp").attr("placeholder", "请输入您想找的商品").focus();
				C(this).parents(".sn-nav-inp").find(".clo-se-input").hide();
				C("body").removeClass("pop-color");
				C(".result-wrap").css({
					display: "none"
				});
				C(".shop-list-wrap").hide();
				C(".result-propose-store").hide();
				C(".result-flagship").hide();
				C("#searchHot").show();
				C("#searchAss").hide();
				queryHistory();
				queryHotWrods()
			});
			C("#searchHotInp").on("keyup input", function(c) {
				var a = null;
				var b = C.trim(C(this).val());
				C(".result-wrap").css({
					display: "none"
				});
				C(".result-ad").css({
					display: "none"
				});
				if (b != "") {
					clearTimeout(a);
					C(this).css("color", "#222");
					a = setTimeout(function() {
						querySuggest(b)
					}, 10);
					C(this).parents(".sn-nav-inp").find(".clo-se-input").show();
					C(".shop-list-wrap").hide();
					C(".result-propose-store").hide();
					C(".result-flagship").hide()
				} else {
					C("#searchHotInp").val("");
					C("#keyword").val("");
					C(".search-fix-menu").hide();
					queryHistory();
					queryHotWrods();
					if (defaultWord) {
						C(this).css("color", "#999").removeAttr("placeholder")
					}
					C(".searchInp").attr("placeholder", "请输入您想找的商品");
					C(this).parents(".sn-nav-inp").find(".clo-se-input").hide();
					C("body").removeClass("pop-color");
					C(".shop-list-wrap").hide();
					C(".result-propose-store").hide();
					C(".result-flagship").hide();
					C("#searchHot").show();
					C("#searchAss").hide()
				}
			})
		};
	var q = function() {
			var b = C(".list-bulletin").find("li").length;
			var a = 0;
			if (b > 1) {
				C(".list-bulletin ul").append(C(".list-bulletin li").eq(0).clone());
				setInterval(function() {
					a++;
					var c = C(".list-bulletin li").eq(a).position().top;
					C(".list-bulletin ul").addClass("action").css("-webkit-transform", "translateY(-" + c + "px)");
					setTimeout(function() {
						if (a == b) {
							C(".list-bulletin ul").removeClass("action").css("-webkit-transform", "translateY(0)");
							a = 0
						}
					}, 300)
				}, 4000)
			}
		};

	function s() {
		var a = document.documentElement.clientHeight || document.body.clientHeight;
		if (window.innerHeight > a) {
			a = window.innerHeight
		}
		return a
	}
	var r = function() {
			C(".down-pt").find(".sn-btn").on("click", function(a) {
				C(".down-mask").show();
				C(".downbox").show();
				document.addEventListener("touchmove", function(b) {
					if (!C(".down-mask").is(":hidden")) {
						b.preventDefault()
					}
				}, false);
				a.stopPropagation();
				initEvent()
			});
			C(".downbox-btn").find(".reset-btn").on("click", function(a) {
				C(".down-mask").hide();
				C(".downbox").hide();
				a.stopPropagation()
			})
		};
	return {
		pageInit: A,
		resultSort: t,
		filterSort: v,
		searchAss: B,
		searchHot: p,
		listBulletin: q,
		resultFilter: D,
		resultFilterBound: z,
		result_load: u,
		brandAll: y,
		fileterAll: x,
		geth: s,
		appEntry: r
	}
})(Zepto);
$(function() {
	if (navigator.userAgent.indexOf("SNEBUY-APP") > 0) {
		$(".sn-nav-back").hide()
	} else {
		$(".wtable").show()
	}
	SEARCH.main.pageInit();
	SEARCH.main.resultSort();
	SEARCH.main.filterSort();
	SEARCH.main.resultFilter();
	SEARCH.main.searchAss();
	SEARCH.main.searchHot();
	SEARCH.main.listBulletin();
	setTimeout(function() {
		window.addEventListener("popstate", function(a) {
			wap.filter.addbackCallback();
			if ($("#isFilter").val() == "true" && $("#_bigflag").val() == "true") {
				$("#list-or-img").addClass("result-list-img");
				$(".big-img").css({
					display: "none"
				});
				$(".small-img").css({
					display: "block"
				});
				$(".switch").addClass("result-type-img")
			}
			$(".search-ass").hide();
			$(".search-ass").css("display", "none");
			$(".result-wrap").css({
				display: "block"
			});
			$(".search-btn").css("display", "none");
			$(".J_filter").css("display", "block");
			$(".search-fix-menu").css("display", "block");
			$("body").removeClass("pop-color");
			if ($("#isFilter").val() != "true") {
				getQueryApscore()
			}
		}, false)
	});
	var c;
	$(".search-fix-menu .add-show").on("click", function(a) {
		a.preventDefault();
		a.stopPropagation();
		$(".search-fix-menu").toggleClass("unfold")
	}).on("touchend,click", ".switch", function(b) {
		var e = productAD.data.cpcGoods;
		var i = $("#productsList").find(".ad-result").size();
		var j = 0;
		if (e) {
			j = e.length
		}
		if (j < 2) {
			j = j
		} else {
			j = j - 5 + i
		}
		b.preventDefault();
		b.stopPropagation();
		$(".switch").children("em").toggle();
		if ($(this).hasClass("result-type-img")) {
			$(this).removeClass("result-type-img");
			$("#list-or-img").removeClass("result-list-img");
			var a = $("#productsList").find("li").size();
			if (dom2 != undefined) {
				if (a <= 8) {
					$("#productsList").find("li").eq(a - 2).after(dom2)
				} else {
					$("#productsList").find("li").eq(8 + j).after(dom2)
				}
			} else {
				if (a <= 8) {
					$("#productsList").find("li").eq(a - 2).after(c)
				} else {
					$("#productsList").find("li").eq(8 + j).after(c)
				}
			}
			$("#_bigflag").val(false)
		} else {
			$(this).addClass("result-type-img");
			$("#list-or-img").addClass("result-list-img");
			c = $("#productsList").find(".wtable").detach();
			$("#_bigflag").val(true)
		}
		$(".search-fix-menu").removeClass("unfold")
	}).on("touchend", ".ebuy", function(a) {
		a.preventDefault();
		a.stopPropagation();
		window.location.href = this.href
	}).on("touchend", ".footprint", function(a) {
		a.preventDefault();
		a.stopPropagation();
		window.location.href = this.href
	});
	$(window).scroll(function() {
		$(".search-fix-menu").removeClass("unfold")
	});
	if ($(".float-b:visible").length < 1) {
		$(".search-fix-menu,.fix-page").removeAttr("style")
	} else {
		$(".search-fix-menu,.fix-page").css("bottom", "2.6rem")
	}
	$(".float-b").children("b").click(function() {
		$(".search-fix-menu,.fix-page").removeAttr("style")
	});
	lazyload(".lazyimg");
	$("#J_listWrap .list-label-img img").each(function() {
		if (this.getAttribute("data-src") == null) {
			return
		}
		if (this.getAttribute("data-src") != "done") {
			this.onerror = function() {
				this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
			};
			this.src = this.getAttribute("data-src");
			this.setAttribute("data-src", "done")
		}
	});
	var d = $(".sn-nav").height();
	$(".reset-s").css("minHeight", SEARCH.main.geth() - d);
	$(".delbtn").on("click", function() {
		AlertBox({
			type: "doubleBtn",
			title: "温馨提示",
			msg: "确定清空历史数据？",
			cancelText: "取消",
			confirmText: "确定",
			cancel: function() {},
			confirm: function() {
				queryHotWrods();
				delHistory()
			}
		})
	})
});

function queryFilterParams() {
	var t = "";
	var v = $("#keyword").val();
	var C = $("#categoryType").val();
	var A = $.cookie("cityId") || $("#cityId").val();
	var y = $("#correctionsKeyword").val();
	if (y != undefined && y != null) {
		searcher.searchParams.keyword = $.trim(y)
	} else {
		searcher.searchParams.keyword = $.trim(v)
	}
	searcher.searchParams.channel = C;
	if (searcher.searchParams.channel == "99999998") {
		searcher.searchParams.channel = ""
	}
	searcher.searchParams.isAnalysised = $("#isAnalysised").val();
	searcher.searchParams.cityId = A;
	var B = $("#fileterIv").val() || "-1";
	var x = $("#fileterCt").val() || "-1";
	var p = $("#fileterSp").val();
	var u = $("#fileterSt").val();
	var D = $("#salesSp").val();
	searcher.searchParams.ci = $("#categoryId").val() || "";
	searcher.searchParams.cf = $("#cf").val() || "";
	var s = $("#categoryId").val();
	var z = $("#cf").val();
	var q = new Array();
	q = $("#fileterSp").val();
	var w = $("#analysisedBrand").val();
	var r = $("#fileterCf").val();
	searcher.searchParams.sc = "0";
	if (z == "" && z != undefined) {
		if (w && r) {
			searcher.searchParams.cf = w + "," + r
		} else {
			searcher.searchParams.cf = w || r || s
		}
	} else {
		searcher.searchParams.cf = z
	}
	if (s == "" && s != undefined) {
		searcher.searchParams.ci = $("#analysisedDirectory").val() || $("#fileterCi").val() || ""
	} else {
		searcher.searchParams.ci = s
	}
	if (p || x == "2" || B == "1" || u) {
		searcher.searchParams.iv = B;
		searcher.searchParams.ct = x;
		searcher.searchParams.sp = p;
		searcher.searchParams.st = u
	}
	if (p) {
		if (D) {
			searcher.searchParams.sp = p + "," + D
		}
	} else {
		if (D) {
			searcher.searchParams.sp = D
		}
	}
	if ($("#channel_type").val() == "hwg") {
		searcher.searchParams.sp = "hwg"
	}
	if (searcher.searchParams.ci == "0" || searcher.searchParams.ci == 0) {
		searcher.searchParams.ci = ""
	}
	for (key in searcher.searchParams) {
		t += key + "=" + encodeURIComponent(searcher.searchParams[key]) + "&"
	}
	return t
}

function queryAllBrand() {
	var c = queryFilterParams();
	var d = URLPrefix.search + "/mobile/getAllBrand.jsonp?" + c.substring(0, c.length - 1);
	$.ajax({
		url: d,
		type: "get",
		dataType: "jsonp",
		cache: true,
		jsonp: "callback",
		jsonpCallback: "allBrandCallBack",
		success: function(a) {
			_brandFilterData = a.brandFilter
		},
	})
}

function queryAllFilter() {
	$("#resFilterWrap").find(" .filter dt .r").find("input").val("");
	var c = queryFilterParams();
	var d = URLPrefix.search + "/mobile/getSelector.jsonp?" + c.substring(0, c.length - 1);
	$.ajax({
		url: d,
		type: "get",
		dataType: "jsonp",
		cache: true,
		jsonp: "callback",
		jsonpCallback: "allFilterCallback",
		success: function(a) {
			SEARCH.main.resultFilterBound();
			$("#filterGroups").empty();
			wap.filter.redrawFileter(a)
		},
	})
}
$(".nhj").on("click", function() {
	window.location = promotionUrl
});
$(".egoechoose").on("click", function() {
	$(this).parent().removeClass("unfold");
	window.location = URLPrefix.search_mobileUrl
});
$("#productsList").delegate("li", "click", function() {
	if (resultType == 0 || !resultType) {
		$("#isFilter").val("true")
	}
});

function getScroll() {
	var d = $("#productsList").find("li").height();
	var c;
	
//	console.log('2');
//	$('window').on('scroll',function(e){
//		console.log('1')
//	});
	$(window).scroll(function() {
		if (d == null) {
			return
		}
		if (bigPicture == "1") {
			c = d * 2
		} else {
			c = d * 9
		}
		if (window.pageYOffset > c) {
			$(".egoechoose").css({
				display: "none"
			});
//			$(".nhj").css({
//				display: "none"
//			});
			$("#sTop").css({
				display: "block"
			})
		} else {
			$(".egoechoose").css({
				display: "block"
			});
//			$(".nhj").css({
//				display: "block"
//			});
			$("#sTop").css({
				display: "none"
			})
		}
	})
}
var cityPlugin = {
	_uid: "",
	cityScroll: null,
	init: function() {
		this._uid = $("#J_cityWrap");
		this._init();
		this.bindEvent()
	},
	_init: function() {
		var d = this._uid;
		var c;
		$("#resFilterWrap .city-btn dt").on("click", function() {
			scrollTimer = setTimeout(function() {
				$("#resFilterWrap .res-filter-main").scrollTop(0)
			}.bind(this), 100);
			var b = $("#J_provinceList");
			if (__ua.indexOf("xiaomi") == -1) {
				if (!c) {
					c = new IScroll("#J_provinceList", {
						mouseWheel: true,
						scrollbars: true,
						click: true
					})
				}
				setTimeout(function() {
					c.refresh();
					cityPlugin.cityScroll && cityPlugin.cityScroll.refresh()
				})
			} else {
				b.css("overflow-y", "auto !important")
			}
			var k = $(".city-btn").offset().top;
			var l = $(window).height();
			var b = $("#J_provinceList");
			var m = k - $("#resFilterWrap .filter-title").height();
			var n = $(this).height();
			var o = n * 4;
			d.height(l - o);
			setTimeout(function() {
				l = $(window).height();
				d.height(l - o)
			}, 100);
			if (d.find("#J_cityList").children().length == 0) {
				var p = $("#J_provinceList").find(".cur");
				var a = JSON.parse(p.attr("data-meta"));
				cityPlugin._setList(a.provinceCode, true)
			} else {
				if (!cityPlugin.cityScroll) {
					cityPlugin.cityScroll = new IScroll("#J_cityList", {
						mouseWheel: true,
						scrollbars: true,
						click: true
					})
				}
			}
		})
	},
	bindEvent: function() {
		var b = this._uid;
		$("#J_provinceList").find("li").on("click", function() {
			var a = JSON.parse($(this).attr("data-meta"));
			$(this).addClass("cur").siblings().removeClass("cur");
			cityPlugin._setList(a.provinceCode)
		});
		$("#J_cityList").on("click", "li", function() {
			var a = $(".city-btn").find(".fr");
			$(this).addClass("cur").siblings().removeClass("cur");
			a.text($(this).find("a").text());
			a.attr("sel-val", $(this).find("a").attr("id"));
			a.attr("pcode", $(this).find("a").attr("provinceCode"));
			$(this).parents(".city-btn.filter-open").removeClass("filter-open").siblings().removeClass("filter-open")
		})
	},
	_setList: function(d, e) {
		var f = this._uid;
		$.ajax({
			type: "GET",
			url: "http://product.m.suning.com/pds-web/getCityListCb/jsonp/" + d + "_callback.html",
			cache: true,
			async: false,
			dataType: "jsonp",
			jsonpCallback: "callback",
			success: function(i) {
				var b = "<ul>";
				for (var j = 0; j < i.cityList.length; j++) {
					b += "<li ";
					var a = $(".filerFr").attr("sel-val");
					if (i.cityList[j].cityNo == a) {
						b += 'class="cur" '
					}
					b += "data-meta='" + JSON.stringify(i.cityList[j]) + '\'><a href="javascript:;" id=' + i.cityList[j].cityNo + "  provinceCode=" + i.cityList[j].provinceCode + ">" + i.cityList[j].cityName + "</a></li>"
				}
				b += "</ul>";
				var c = f.find("#J_cityList");
				c.empty();
				c.append(b);
				if (__ua.indexOf("xiaomi") == -1) {
					cityPlugin.cityScroll = new IScroll("#J_cityList", {
						mouseWheel: true,
						scrollbars: true,
						click: true
					})
				} else {
					c.css("overflow-y", "auto !important")
				}
			}
		})
	},
};
Array.prototype.removeByValue = function(e) {
	var d = this;
	if (e.constructor === Array) {
		e.foreach(function(a) {
			for (var b = 0; b < d.length; b++) {
				if (d[b] == a) {
					d.splice(b, 1)
				}
			}
		})
	} else {
		for (var f = 0; f < this.length; f++) {
			if (this[f] == e) {
				this.splice(f, 1);
				break
			}
		}
	}
}; 