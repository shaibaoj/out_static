/* FILE BEGIN search/script/search/filter/filter.js */
var wap = wap || {};
var selectorflag = false;
wap.filter = (function() {
	var t = new Object();
	var F = null;
	var Q = null;
	var L = null;
	var N = null;
	var K = null;
	var A = null;
	var H = null;
	var w = null;
	var a = null;
	var v = null;
	var d = null;
	var V = null;
	var P = null;
	var i = null;
	var q = 1;
	var C = {
		cf: [],
		cfStr: "",
		conatins: function() {
			return false
		}
	};
	var e = {
		cityId: "",
		st: "",
		set: "",
		cf: "",
		iv: "",
		ci: "",
		ct: "",
		sp: ""
	};
	var S = {};
	var R = null;
	var o = [];
	var l = [];
	var p = [];
	var s = [];
	var n = [];
	var y = false;
	var x = null;
	t.init = function() {
		delete t.init;
		D();
		h()
	};

	function D() {
		F = $("#resFilterWrap").find(".r-ctn");
		Q = F.find("#dete");
		L = F.find("#again");
		N = F.find(".res-filter-main");
		K = N.find(".filter-top");
		A = K.next();
		H = K.find("dd.filter-price-list");
		w = K.find("#priceLow");
		a = K.find("#priceHigh");
		v = $("#J_sortWrap");
		d = $("#result-sort").find(".J_sort");
		V = $("#result-sort").find("#isCt");
		P = $("#result-sort").find("#cx");
		i = $("#result-sort").find("#isSales");
		_$NewFest = $("#result-sort").find("#isNewFest")
	}

	function h() {
		w.on("keyup", O);
		a.on("keyup", O);
		Q.on("click", u);
		F.find(".close-btn").click(J);
		L.on("click", g);
		v.find("ul").delegate("em", "click", k);
		V.on("click", W);
		P.on("click", r);
		i.on("click", c);
		_$NewFest.on("click", z)
	}
	t.setVersion = function(X) {
		q = X;
		return t
	};
	t.isNumFilter = function() {
		return q == "2"
	};
	t.setCf = function(X) {
		C = G(X);
		return t
	};
	t.setCategoryId = function(X) {
		x = X;
		return t
	};

	function G(ab) {
		var Y = {
			cf: [],
			cfStr: ""
		};
		if (ab) {
			var X = ab.split(",");
			if (!t.isNumFilter()) {
				var ad = [];
				for (var Z = 0; Z < X.length; Z++) {
					var aa = X[Z].split(":");
					if (aa.length == 2) {
						var ac = {
							key: aa[0],
							values: aa[1].split(";")
						};
						ad.push(ac.values.join(","));
						Y.cf.push(ac)
					}
				}
				Y.cfStr = ad.length == 0 ? "" : "," + ad.join(",") + ","
			} else {
				var ac = {
					key: null,
					values: X
				};
				Y.cf.push(ac);
				Y.cfStr = "," + ab + ","
			}
		}
		Y.conatins = function(ae) {
			if (this.cfStr == "") {
				return false
			}
			ae = "," + ae + ",";
			return this.cfStr.indexOf(ae) > -1
		};
		return Y
	}
	t.addSubmitCallback = function(X) {
		M(o, X);
		return t
	};
	t.addFilterChangeCallback = function(X) {
		M(l, X);
		return t
	};
	t.addCancelCallback = function(X) {
		M(p, X);
		return t
	};
	t.addClearCallback = function(X) {
		M(s, X);
		return t
	};
	t.addSortChangeCallback = function(X) {
		M(n, X);
		return t
	};
	t.addbackCallback = function() {
		var ai = $("#isFilter").val();
		getScroll();
		if (resultType == 5) {
			searcher.searchParams.keyword = $.trim($("#rewriteWord").val())
		} else {
			searcher.searchParams.keyword = $.trim($("#keyword").val())
		}
		if (ai == "true") {
			var al = param.ssggdpkg;
			searcher.pageCurrent = 0;
			searcher.searchParams.cityId = $.cookie("cityId") || "9173";
			searcher.searchParams.cp = 0;
			searcher.searchParams.sg = "";
			$("#productsList").show();
			var ad = $("#fileterCf").val();
			var ab = $("#fileterCi").val();
			var ah = $("#fileterIv").val();
			var ak = $("#fileterCt").val();
			var ae = $("#fileterSp").val();
			var aa = $("#fileterSt").val();
			var af = $("#salesSp").val();
			var aj = $("#fileterPrune").val();
			if (ad || ab || ae || ak == "2" || ah == "1" || aa || aj) {
				searcher.utils.clearProducts();
				searcher.searchParams.cf = ad;
				searcher.searchParams.ci = ab;
				searcher.searchParams.iv = ah || "-1";
				searcher.searchParams.ct = ak || "-1";
				searcher.searchParams.prune = aj;
				searcher.searchParams.st = aa
			}
			if (aj) {
				$(".keywords-list").css("display", "none")
			}
			if ($("#fileterSp").val()) {
				var Z = [];
				var ag = [];
				filterArray = $("#fileterSp").val().split(",");
				if (filterArray.indexOf("hwg") >= 0) {
					$("#resFilterWrap .filter-mul").find("#isOversea").addClass("on")
				}
				if (filterArray.indexOf("ztcx") >= 0) {
					alert(nhj_checked_img);
					$("#result-sort").find("#isNewFest").find("img").attr("src", nhj_checked_img)
				}
				var Y = $(".filter-cx").find(".fr");
				if (filterArray.length > 6) {
					$("#result-sort").find("#cx").addClass("cur")
				}
				for (var ac = 0; ac < filterArray.length; ac++) {
					var X = $(".filter-cx").find("#" + filterArray[ac]).addClass("on");
					X.each(function() {
						ag.push($(this).text());
						Z.push($(this).attr("id"));
						Y.text(ag.join("、")).attr("sel-val", Z.join(","))
					})
				}
				if (af) {
					searcher.searchParams.sp = $("#fileterSp").val() + "," + $("#salesSp").val()
				}
			} else {
				if ($("#salesSp").val()) {
					searcher.searchParams.sp = $("#salesSp").val();
					$("#isNewFest").find("img").attr("src", nhj_checked_img)
				}
			}
			if (ak == "2") {
				$("#resFilterWrap .filter-mul").find("#isCt").addClass("on");
				$("#result-sort").find("#isCt").addClass("cur")
			}
			if (ah == "1") {
				$("#resFilterWrap .filter-mul").find("#ivCheck").addClass("on")
			}
			if (aa) {
				if (aa == "8") {
					$("#result-sort").find("#isSales").addClass("cur");
					$(".J_sort").removeClass("cur")
				}
			}
			if (!ak) {
				searcher.searchParams.ct = -1
			}
			$("#end_load").hide();
			searcher.searchParams.cp = 0;
			searcher.queryData()
		}
		return t
	};
	t.submit = function(X) {
		if (X) {
			R = null
		}
		if (Q) {
			Q.triggerHandler("click")
		}
	};

	function M(X, Y) {
		if (typeof Y == "function" && !B(X, Y)) {
			X.push(Y)
		}
	}

	function j(Z, X) {
		for (var Y = 0; Y < Z.length; Y++) {
			Z[Y].apply(t, X)
		}
	}

	function B(aa, Y) {
		if (!aa || aa.length == 0) {
			return false
		}
		var Z = aa.length;
		for (var X = 0; X < Z; X++) {
			if (aa[X] == Y) {
				return true
			}
		}
		return false
	}

	function O(Y) {
		var Z = $(this).val();
		if (Z) {
			var X = parseInt(Z);
			X = isNaN(X) ? "" : X + "";
			if (Z != X) {
				$(this).val(X)
			}
		}
	}

	function u(aa) {
		N.find("dl.filter").removeClass("filter-open");
		j(o);
		var X = t.getFilter();
		if (R) {
			var af = X._keys;
			var ab = R._keys;
			if (ab.length == af.length) {
				var Y = true;
				for (var Z = 0; Z < ab.length; Z++) {
					var ae = ab[Z];
					if (!(ae in X)) {
						Y = false;
						break
					} else {
						var ad = X[ae];
						var ac = R[ae];
						if (ad != ac) {
							Y = false;
							break
						}
					}
				}
				if (Y) {
					return
				}
			}
		}
		R = X;
		$("#resFilterWrap").find("#cover").trigger("click");
		j(l, [X])
	}

	function J(X) {
		X.stopPropagation();
		N.find("dl.filter").removeClass("filter-open");
		j(p)
	}

	function g(X) {
		X.stopPropagation();
		R = null;
		_brandarr = [];
		_brandId = [];
		F.find(".sn-input").val("");
		F.find(".filter dt .fr").not(".filerFr").text("");
		F.find(".filter dt .fr").not(".filerFr").text("").attr("sel-val", "").text("");
		F.find(" .filter dt .r").find("input").val("");
		F.find(" em").not(".filerFr").removeClass("on");
		F.find(" span").removeClass("on");
		F.find(".filter .sn-checkbox").prop("checked", false);
		$("#fileterCf").val("");
		$("#fileterCi").val("");
		$("#fileterIv").val("");
		$("#fileterCt").val("");
		$("#fileterCp").val("");
		$("#fileterSp").val("");
		$("#analysisedDirectory").val("");
		$("#analysisedBrand").val("");
		$("#cf").val("");
		j(s)
	}

	function k(ab) {
		ssggdpkg = false;
		var Z = $(this).attr("st");
		var aa = d.attr("sel-val");
		if (Z != aa) {
			$(".hotlists").hide();
			$("#resultHotPro").empty();
			var X = "综合";
			if (Z == "9") {
				X = "价格升序"
			} else {
				if (Z == "10") {
					X = "价格降序"
				} else {
					if (Z == "26") {
						X = "好评降序"
					}
				}
			}
			$(this).addClass("cur");
			searcher.$productsList.empty();
			$(".J_sort").addClass("cur curar");
			$("#isSales").removeClass("cur");
			d.attr("sel-val", Z).text(X);
			d.append('<i class="arrow"></i>');
			searcher.searchParams.sc = 0;
			$("#fileterSt").val(Z);
			var ac = $("#fileterSp").val();
			var Y = $("#salesSp").val();
			if ($("#channel_type").val() == "hwg") {
				if (ac) {
					searcher.searchParams.sp = ac
				} else {
					searcher.searchParams.sp = $("#channel_type").val()
				}
			} else {
				if (ac && Y) {
					searcher.searchParams.sp = ac + "," + Y
				} else {
					if (ac) {
						searcher.searchParams.sp = ac
					} else {
						if (Y) {
							searcher.searchParams.sp = Y
						} else {
							searcher.searchParams.sp = ""
						}
					}
				}
			}
			searcher.searchParams.ct = $("#fileterCt").val() || "-1";
			searcher.searchParams.ci = $("#fileterCi").val() || "";
			searcher.searchParams.iv = $("#fileterIv").val() || "-1";
			index_i = 0;
			$("#isAnalysised").val("0");
			j(n, [Z])
		}
	}

	function W() {
		$(".hotlists").hide();
		$("#resultHotPro").empty();
		searcher.$productsList.empty();
		$(".mask").trigger("click");
		$("#J_sortWrap").addClass("sort-wrap-up");
		$(".result-wrap .mask").hide();
		var X = $(this);
		searcher.searchParams.cityId = $.cookie("cityId") || "9173";
		if (X.hasClass("cur")) {
			$(this).removeClass("cur");
			$("#resFilterWrap .filter-mul").find("#isCt").removeClass("on");
			searcher.searchParams.ct = -1;
			$("#fileterCt").val("-1")
		} else {
			X.addClass("cur");
			$("#resFilterWrap .filter-mul").find("#isCt").addClass("on");
			searcher.searchParams.ct = 2;
			$("#fileterCt").val("2")
		}
		$("#loading").remove();
		var Z = '<div id="loading" class="sn-html5-loading"><div class="blueball"></div><div class="orangeball"></div></div>';
		$(".result-loaded-tip").after(Z);
		searcher.isFilterQueryData = true;
		searcher._isFilterQueryData = true;
		ssggdpkg = false;
		if (resultType == 4 && sen_sug_key) {
			searcher.searchParams.keyword = sen_sug_key;
			var Y = html_encode(sen_sug_key);
			$("#keyword").val(Y);
			$(".result-err").hide();
			$("#searchHotInp").val(Y);
			resultType = 0
		}
		if (resultType == 1) {
			var Y = html_encode($("#correctionsKeyword").val());
			$("#searchHotInp").val(Y);
			$("#keyword").val(Y);
			resultType = 0
		}
		$("#rewriteInfo").hide();
		$("#end_load").hide();
		e.st = searcher.searchParams.ct;
		index_i = 0;
		searcher.pageCurrent = 0;
		searcher.searchParams.cp = 0;
		searcher.searchParams.sc = 0;
		$("#isAnalysised").val("0");
		searcher.queryData()
	}

	function r() {
		index_i = 0;
		var ae = null;
		$(".hotlists").hide();
		$("#resultHotPro").empty();
		$(".mask").trigger("click");
		$("#J_sortWrap").addClass("sort-wrap-up");
		$(".result-wrap .mask").hide();
		var X = K.find("#isOversea").hasClass("on") || $("#channel_type").val();
		var ad = $(".filter-cx").find("em");
		var Y = [];
		var ac = [];
		var ab = $(".filter-cx").find(".fr");
		searcher.$productsList.empty();
		if ($(this).hasClass("cur")) {
			$(this).removeClass("cur");
			ad.removeClass("on");
			ab.text("").attr("sel-val", "");
			if (X == true || X == "hwg") {
				searcher.searchParams.sp = "hwg";
				$("#fileterSp").val("hwg")
			} else {
				searcher.searchParams.sp = "";
				$("#fileterSp").val("")
			}
		} else {
			$(this).addClass("cur");
			ad.addClass("on");
			ad.each(function() {
				Y.push($(this).text());
				ac.push($(this).attr("id"));
				ab.text(Y.join("、")).attr("sel-val", ac.join(","));
				if (X == true || X == "hwg") {
					searcher.searchParams.sp = "qdzx,djh,qg,tg,zj,fq,zxtc,hwg";
					$("#fileterSp").val("qdzx,djh,qg,tg,zj,fq,zxtc,hwg")
				} else {
					searcher.searchParams.sp = "qdzx,djh,qg,tg,zj,fq,zxtc";
					$("#fileterSp").val("qdzx,djh,qg,tg,zj,fq,zxtc")
				}
			})
		}
		searcher.pageCurrent = 0;
		searcher.searchParams.ct = $("#fileterCt").val() || "-1";
		searcher.searchParams.iv = $("#fileterIv").val() || "-1";
		searcher.searchParams.cp = 0;
		searcher.searchParams.sc = 0;
		searcher.searchParams.cityId = $.cookie("cityId") || "9173";
		ssggdpkg = false;
		$("#loading").remove();
		var aa = '<div id="loading" class="sn-html5-loading"><div class="blueball"></div><div class="orangeball"></div></div>';
		$(".result-loaded-tip").after(aa);
		searcher.isFilterQueryData = true;
		searcher._isFilterQueryData = true;
		if (resultType == 4 && sen_sug_key) {
			searcher.searchParams.keyword = sen_sug_key;
			var Z = html_encode(sen_sug_key);
			$("#keyword").val(Z);
			$(".result-err").hide();
			$("#searchHotInp").val(Z);
			resultType = 0
		}
		if (resultType == 1) {
			var Z = html_encode($("#correctionsKeyword").val());
			$("#searchHotInp").val(Z);
			$("#keyword").val(Z);
			resultType = 0
		}
		$("#rewriteInfo").hide();
		$("#end_load").hide();
		$("#isAnalysised").val("0");
		clearTimeout(ae);
		ae = null;
		ae = setTimeout(function() {
			searcher.queryData()
		}, 100)
	}

	function c() {
		index_i = 0;
		var Y = $(this);
		if (Y.hasClass("cur")) {
			return
		} else {
			searcher.$productsList.empty()
		}
		$(".hotlists").hide();
		$("#resultHotPro").empty();
		$(".mask").trigger("click");
		$("#J_sortWrap").addClass("sort-wrap-up");
		$("#J_sortWrap").find("li").removeClass("cur");
		$(".result-wrap .mask").hide();
		$("#result-sort").find(".J_sort").removeClass("cur");
		$("#result-sort").find(".J_sort").attr("sel-val", "0").text("综合");
		d.append('<i class="arrow"></i>');
		Y.addClass("cur");
		searcher.searchParams.st = "8";
		$("#fileterSt").val("8");
		d.attr("sel-val", 8);
		searcher.pageCurrent = 0;
		searcher.searchParams.ct = $("#fileterCt").val() || "-1";
		searcher.searchParams.iv = $("#fileterIv").val() || "-1";
		searcher.searchParams.cp = 0;
		var aa = $("#fileterSp").val();
		var X = $("#salesSp").val();
		if ($("#channel_type").val() == "hwg") {
			if (aa) {
				searcher.searchParams.sp = aa
			} else {
				searcher.searchParams.sp = $("#channel_type").val()
			}
		} else {
			if (aa && X) {
				searcher.searchParams.sp = aa + "," + X
			} else {
				if (aa) {
					searcher.searchParams.sp = aa
				} else {
					if (X) {
						searcher.searchParams.sp = X
					} else {
						searcher.searchParams.sp = ""
					}
				}
			}
		}
		$("#loading").show();
		searcher.searchParams.cityId = $.cookie("cityId") || "9173";
		ssggdpkg = false;
		if (resultType == 4 && sen_sug_key) {
			searcher.searchParams.keyword = sen_sug_key;
			var Z = html_encode(sen_sug_key);
			$("#keyword").val(Z);
			$(".result-err").hide();
			$("#searchHotInp").val(Z);
			resultType = 0
		}
		if (resultType == 1) {
			var Z = html_encode($("#correctionsKeyword").val());
			$("#searchHotInp").val(Z);
			$("#keyword").val(Z);
			resultType = 0
		}
		$("#rewriteInfo").hide();
		$("#end_load").hide();
		$("#isAnalysised").val("0");
		searcher.pageCurrent = 0;
		searcher.queryData()
	}

	function z() {
		index_i = 0;
		var aa = null;
		$(".hotlists").hide();
		$("#resultHotPro").empty();
		searcher.$productsList.empty();
		$(".mask").trigger("click");
		$("#J_sortWrap").addClass("sort-wrap-up");
		$(".result-wrap .mask").hide();
		var ab = $("#fileterSp").val();
		var X = $(this);
		if (X.hasClass("cur")) {
			$(this).removeClass("cur");
			X.find("img").attr("src", nhj_img);
			if (ab) {
				searcher.searchParams.sp = ab
			} else {
				searcher.searchParams.sp = ""
			}
			$("#salesSp").val("")
		} else {
			X.find("img").attr("src", nhj_checked_img);
			X.addClass("cur");
			if (ab) {
				searcher.searchParams.sp = ab + ",ztcx"
			} else {
				searcher.searchParams.sp = "ztcx"
			}
			$("#salesSp").val("ztcx")
		}
		$("#loading").remove();
		var Z = '<div id="loading" class="sn-html5-loading"><div class="blueball"></div><div class="orangeball"></div></div>';
		$(".result-loaded-tip").after(Z);
		searcher.searchParams.cityId = $.cookie("cityId") || "9173";
		searcher.searchParams.ct = $("#fileterCt").val() || "-1";
		searcher.searchParams.iv = $("#fileterIv").val() || "-1";
		searcher.pageCurrent = 0;
		searcher.isFilterQueryData = true;
		searcher.searchParams.cp = 0;
		ssggdpkg = false;
		$("#rewriteInfo").hide();
		$("#end_load").hide();
		if (resultType == 1) {
			var Y = html_encode($("#correctionsKeyword").val());
			$("#searchHotInp").val(Y);
			$("#keyword").val(Y);
			resultType = 0
		}
		clearTimeout(aa);
		aa = null;
		$("#isAnalysised").val("0");
		aa = setTimeout(function() {
			searcher.queryData()
		}, 100)
	}
	t.redrawFileter = function(X) {
		U(X.filters);
		t.renderSelfFilter(X);
		SEARCH.main.resultFilterBound();
		return t
	};
	t.renderFilter = function(X) {
		t.renderTopFilter(X);
		t.renderSelfFilter(X);
		return t
	};
	var T = 0;
	t.getFilter = function() {
		var ab = K.find("#isCt").hasClass("on") ? "2" : "-1";
		var ac = K.find("#ivCheck").hasClass("on") ? "1" : "-1";
		var an = w.val();
		var am = a.val();
		var ai = null;
		if (an || am) {
			var ah = t.isNumFilter() ? "_" : "-";
			if (an && am) {
				ai = an + ah + am;
				if (parseInt(an) > parseInt(am)) {
					w.val(am);
					a.val(an);
					ai = am + ah + an
				}
			} else {
				var Z = an ? an : (t.isNumFilter() ? "" : "-1");
				var X = am ? am : (t.isNumFilter() ? "" : "-1");
				ai = Z + ah + X
			}
		}
		var af = K.find("dl.filter-alone-fl").find("dt span.fr").attr("sel-val");
		var al = K.find("dl.city-btn").find("dt span.fr").attr("sel-val");
		if (al) {
			var aa = K.find("dl.city-btn").find("dt span.fr").attr("pcode");
			var ad = K.find("dl.city-btn").find("dt span.fr").text();
			var ao = new Date();
			ao.setTime(ao.getTime() + (12 * 60 * 60 * 1000));
			var aj = $.cookie("cityId") || "9173";
			if (aj != al) {
				searcher._isCityChange = true
			} else {
				searcher._isCityChange = false
			}
			$("#cityId").val(al);
			if (sn) {
				sn.cityId = al
			}
			$.cookie("cityId", al, {
				path: "/",
				domain: URLPrefix.cookie_domain,
				expires: ao
			});
			$.cookie("provinceCode", aa, {
				path: "/",
				domain: URLPrefix.cookie_domain,
				expires: ao
			});
			$.cookie("cityName", ad, {
				path: "/",
				domain: URLPrefix.cookie_domain,
				expires: ao
			})
		}
		var ak = K.find("dl.filter-mul").find("dt span.fr").attr("sel-val");
		var ag = K.find("#isOversea").hasClass("on");
		if (ag) {
			if (ak) {
				ak += ",hwg"
			} else {
				ak = "hwg"
			}
		}
		var ae = A.find(".filter-mulbrand").find("dt span.fr").attr("sel-val");
		var Y = [];
		A.find(".filter-alone").each(function() {
			var aq = $(this).find("dt span.fr");
			var ar = aq.attr("sel-val");
			if (ar) {
				if (t.isNumFilter()) {
					Y.push(ar)
				} else {
					Y.push(aq.attr("field-name") + ":" + ar.replace(",", ";"))
				}
			}
		});
		if (ai) {
			if (t.isNumFilter()) {
				Y.push(ai)
			} else {
				Y.push("price:" + ai)
			}
		}
		if (ae) {
			if (t.isNumFilter()) {
				Y.push(ae)
			} else {
				Y.push("bnf:" + ae.replace(",", ";"))
			}
		}
		var ap = {
			ct: ab,
			iv: ac,
			_keys: ["ct", "iv"]
		};
		if (al) {
			ap.cityId = al;
			ap._keys.push("cityId")
		}
		if (af) {
			ap.ci = af;
			ap._keys.push("ci")
		}
		if (ak) {
			ap.sp = ak;
			ap._keys.push("sp")
		}
		if (Y.length > 0) {
			ap.cf = Y.join(",");
			ap._keys.push("cf")
		}
		return ap
	};
	t.renderTopFilter = function(X) {
		U(X.filters);
		if (x == "") {
			E(X.categories)
		}
		b(X.newArrivalsShown);
		return t
	};
	t.renderSelfFilter = function(X) {
		f(X.filters);
		I(X.filters);
		return t
	};

	function m(X, Y) {
		if (!X || X.length == 0) {
			return null
		}
		var Z = null;
		$(X).each(function() {
			if (this.fieldName == Y) {
				Z = this;
				return false
			}
		});
		return Z
	}

	function U(Y) {
		var Z = m(Y, "price");
		if (Z) {
			H.empty();
			var X = [];
			$(Z.values).each(function(aa, ab) {
				if (ab.checked) {
					X.push("<em class='on'>" + this.valueDesc + "</em>")
				} else {
					X.push("<em>" + this.valueDesc + "</em>")
				}
			});
			H.html(X.join(""));
			X = null
		}
	}

	function E(ac) {
		if (!ac || ac.length == 0) {
			return
		}
		K.find(".shop-style").remove().empty();
		var aa = null;
		var Y = ['<dd class="filter-class">'];
		$(ac).each(function(af, ae) {
			Y.push('<em class=" filerFr" id="' + this.id + '">' + this.name + "</em>")
		});
		var Z = aa ? aa.id : "";
		var ab = aa ? aa.name : "";
		Y.push("</dd>");
		var ad = [];
		ad.push('<dt name="' + md_prefix + '_none_sxx_fenle"><span class="fl">分类</span><span class="fr filerFr" sel-val=' + Z + ">" + ab + "</span></dt>");
		ad.push(Y.join(""));
		var X = $('<dl class="filter shop-style filter-alone-fl" name="wapsssry_none_sxx_fenle"></dl>');
		X.html(ad.join(""));
		K.find(".filter-cx").before(X);
		SEARCH.main.fileterAll()
	}

	function b(Y) {
		if (Y) {
			var X = $('<li><span>新品</span><input name="colorSelector" title="" type="checkbox" value="cx" id="newPro" class="input-reset sn-checkbox"/></li>');
			K.find(".filter.cx .filter-check li:last").before(X)
		}
	}

	function f(ai) {
		var ac = m(ai, "bnf");
		if (!ac) {
			return null
		}
		var Y = $(window).height();
		var af = $("#resFilterWrap .filter-title").height(),
			X = $("#resFilterWrap .filter-bottom").height(),
			ah = $("#resFilterWrap .shop-style").height();
		var ae = Y - af - X - ah;
		var ag = $('<dl class="filter shop-style filter-mulbrand"　 id="filterbrand"></dl>');
		var ak = $('<dd class="filter-brand overtouch" style="max-height: ' + ae + 'px;"></dd>');
		var aj = $('<div class="filter-df"></div>');
		var ab = [];
		var Z = [];
		$.each(ac.values, function(am, an) {
			var ao;
			if (an.checked) {
				ab.push(an.valueDesc);
				Z.push(an.value);
				_brandarr.push(an.valueDesc);
				_brandId.push(an.value);
				ao = ' <em  class="on" id="pcode_' + an.value + '" >' + an.valueDesc + "</em>"
			} else {
				ao = ' <em id="pcode_' + an.value + '" >' + an.valueDesc + "</em>"
			}
			aj.append(ao)
		});
		if (ac.values.length == 18) {
			var al = '<i class="brand-all" id="brand-all">加载更多</i>'
		}
		T++;
		if (ac.values.length <= 18) {
			var ad = $('<dt name="' + md_prefix + "_none_sxx_sxz" + T + '"><span class="fl">' + ac.fieldNameDesc + '</span><span class="fr" sel-val="' + Z.join(",") + '">' + ab.join("、") + "</span></dt>");
			var aa = '<div class="letter-sort" id="letter-sort" style="display: block;"></div>';
			aj.append(al);
			ak.append(aj)
		}
		ak.append(aa);
		ag.append(ad);
		ag.append(ak);
		A.append(ag);
		SEARCH.main.brandAll()
	}

	function I(X) {
		if (X == undefined) {
			return
		}
		$.each(X, function(ad, Y) {
			if (Y.fieldName == "price" || Y.fieldName == "bnf") {
				return true
			}
			T++;
			var ae = null;
			var ab = Y.multiSel;
			var af = ab ? "filter-check" : "filter-radio";
			var ag = $('<dd class="filter-class"></dd>');
			var Z = [];
			var aa = [];
			var ab = Y.multiSel;
			if (ab) {
				ae = $('<dl class="filter  shop-style filter-mul"></dl>')
			} else {
				ae = $('<dl class="filter  shop-style filter-alone"></dl>')
			}
			$.each(Y.values, function(ai, aj) {
				var ah = "<em";
				if (aj.checked || C.conatins(aj.value)) {
					ah += ' class="on"';
					Z.push(aj.value);
					aa.push(aj.valueDesc)
				}
				ag.append(ah + " id =" + aj.value + ">" + aj.valueDesc + "</em>")
			});
			var ac = $('<dt name="' + md_prefix + "_none_sxx_sxz" + T + '"><span class="fl">' + Y.fieldNameDesc + '</span><span class="fr" sel-val="' + Z.join(",") + '" field-name="' + Y.fieldName + '">' + aa.join("、") + "</span></dt>");
			ae.append(ac);
			ae.append(ag);
			A.append(ae)
		})
	}
	return t
})();
$(function() {
	wap.filter.init()
});

function getSelector() {
	var c = location.search;
	var b = queryFilterParams();
	var a = URLPrefix.search + "/mobile/getSelector.jsonp?" + b.substring(0, b.length - 1);
	if (selectorflag) {
		return
	}
//	$.ajax({
//		url: a,
//		type: "get",
//		dataType: "jsonp",
//		cache: true,
//		jsonpCallback: "selectorCallBack",
//		success: function(d) {
			selectorflag = true;
			wap.filter.setVersion("2");
			wap.filter.setCf($("#cf").val());
			wap.filter.setCategoryId($("#categoryId").val());
//			wap.filter.renderFilter(d);
			SEARCH.main.resultFilterBound();
			wap.filter.addCancelCallback(function() {
				$(".result-wrap .mask").hide();
				$("#J_sortWrap").addClass("sort-wrap-up")
			}).addClearCallback(function() {}).addSubmitCallback(function() {
				$(".letter-list").hide();
				$(".cut-ts").hide();
				var e = $("#resFilterWrap");
				e.find("#cover").trigger("click");
				$("#J_sortWrap").addClass("sort-wrap-up")
			}).addFilterChangeCallback(function(e) {
				index_i = 0;
				if (resultType != 2 && resultType != 4) {
					searcher.$productsList.empty()
				}
				searcher.searchParams.cf = "";
				searcher.searchParams.ci = "";
				searcher.searchParams.sp = "";
				searcher.searchParams.sc = "0";
				searcher.searchParams.ct = -1;
				searcher.searchParams.iv = -1;
				var f = $("#salesSp").val();
				if (e.cf) {
					searcher.searchParams.cf = e.cf;
					$("#cf").val(e.cf);
					$("#fileterCf").val(e.cf)
				} else {
					$("#fileterCf").val("")
				}
				if (e.ct) {
					searcher.searchParams.ct = e.ct;
					$("#fileterCt").val(e.ct)
				} else {
					$("#fileterCt").val("-1")
				}
				if (e.ct == -1) {
					$(".result-wrap").find("#isCt").removeClass("cur")
				} else {
					$(".result-wrap").find("#isCt").addClass("cur")
				}
				if (e.iv) {
					searcher.searchParams.iv = e.iv;
					$("#fileterIv").val(e.iv)
				} else {
					$("#fileterIv").val("-1")
				}
				if ("ci" in e) {
					searcher.searchParams.ci = e.ci;
					$("#fileterCi").val(e.ci)
				} else {
					if (!$("#fileterCi").val()) {
						$("#fileterCi").val("")
					}
				}
				if (e.sp == undefined) {
					$("#cx").removeClass("cur")
				}
				if ("sp" in e) {
					$("#fileterSp").val(e.sp);
					if (f) {
						searcher.searchParams.sp = e.sp + "," + f
					} else {
						searcher.searchParams.sp = e.sp
					}
					if (e.sp != "qdzx,djh,qg,tg,zj,fq,zxtc" && e.sp != "qdzx,djh,qg,tg,zj,fq,zxtc,hwg") {
						$("#cx").removeClass("cur")
					} else {
						$("#cx").addClass("cur")
					}
				} else {
					if (f) {
						searcher.searchParams.sp = f
					} else {
						$("#fileterSp").val("")
					}
				}
				if ($("#channel_type").val() == "hwg") {
					if (e.sp != null && typeof e.sp != undefined) {
						searcher.searchParams.sp += ",hwg";
						$("#fileterSp").val(searcher.searchParams.sp)
					} else {
						searcher.searchParams.sp = "hwg";
						$("#fileterSp").val(searcher.searchParams.sp)
					}
				}
				if (!searcher.searchParams.ci) {
					if ($("#categoryId").val()) {
						searcher.searchParams.ci = $("#categoryId").val();
						$("#fileterCi").val($("#categoryId").val())
					}
				}
				if (e.cityId) {
					searcher.searchParams.cityId = e.cityId
				}
				searcher.searchParams.cp = 0;
				searcher.pageCurrent = 0;
				searcher.isFilterQueryData = true;
				searcher._isFilterQueryData = true;
				searcher.searchParams.sc = "0";
				ssggdpkg = false;
				if (searcher._isCityChange && e.cf == undefined && e.ci == undefined && e.sp == undefined && e.ct == "-1" && e.iv == "-1") {
					searcher.adIndex = 0;
					ssggdpkg = true;
					getQueryApscore()
				}
				$("#isAnalysised").val("0");
				if (resultType != 2 && resultType != 4) {
					$("#loading").remove();
					var h = '<div id="loading" class="sn-html5-loading"><div class="blueball"></div><div class="orangeball"></div></div>';
					$(".result-loaded-tip").after(h);
					searcher.queryData();
					$("#noResultMsg").hide();
					$("#end_load").hide()
				}
				if (resultType == 1) {
					var g = html_encode($("#correctionsKeyword").val());
					$("#searchHotInp").val(g);
					$("#keyword").val(g);
					resultType = 0
				}
				$("#rewriteInfo").hide();
				$("#end_load").hide()
			})
//		}
//	})
}; 