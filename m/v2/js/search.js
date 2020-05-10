var search = search || {};
var defaultWord = "";
var delay = null;
var defaultWord_data = null;
var directWords = null;

search.main = (function(C) {
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
			$("#historywords").hide()
			C("#container").hide();
			C("#nav").hide();
			C("#footer").hide();
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
//				queryHistory();
				queryHotWrods();
//				console.log("【cookie：queryHotWrods】");
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
//			queryHistory();
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
//			console.log("【cookie：--"+b+"-】");
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
//				queryHistory();
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
	function s() {
		var a = document.documentElement.clientHeight || document.body.clientHeight;
		if (window.innerHeight > a) {
			a = window.innerHeight
		}
		return a
	}
	return {
		searchAss: B,
		geth: s,
		searchHot: p
	}
})(Zepto);

$(function() {
	search.main.searchAss();
	search.main.searchHot();
	
	if (typeof(model_url) != "undefined" && model_url == '/s/index') {
		var q = $.trim($("#searchHotInp").val());
		if (q == "") {
			$(".search-btn").show();
			$(".J_filter").hide();
			$("#historywords").hide()
			$("#container").hide();
			$("#nav").hide();
			$("#footer").hide();
			$("#searchHotInp").parents(".sn-nav-inp").find(".clo-se-input").hide();
			$("body").removeClass("pop-color");
			$(".shop-list-wrap").hide();
			$(".result-propose-store").hide();
			$(".result-flagship").hide();
			$("#searchAss").hide();
			$(".search-fix-menu").hide();
			$("#searchHot").show();
			$("#searchHotInp").val("");
			$(".searchInp").attr("placeholder", "请输入您想找的商品或宝贝链接");
			$("#keyword").val("");
			queryHotWrods();
		}
	}
	
	var d = $("#header").height();
	$(".reset-s").css("minHeight", search.main.geth() - d);
	$("#wapSearchURL").on("click", function() {
		var f = $(".searchInp").val();
		f = $.trim(f);
		f = $.trim(f);
		if (!f && !defaultWord) {
			return false
		}
		if (!f && defaultWord) {
			f = defaultWord
		}
		if (defaultWord == f) {
			var d = defaultWord_data && defaultWord_data.url;
			if (d) {
				location.href = d;
				return false
			}
		}
		if (directWords && directWords.length > 0) {
			var e = null;
			$(directWords).each(function() {
				if (this.word == f) {
					e = this;
					return false
				}
			});
			if (e) {
				location.href = e.url;
				return false
			}
		}
//		addHistory(f);
		var d = buildresulturl2(f, $("#channel_type").val(), $("#terminalFlag").val());
		document.location.href = d
	});
	$(".think-words").delegate("a", "click", function(e) {
		var g = $(this).attr("keys").replace(/\<b\>/g, "").replace(/\<\/b\>/g, "");
		var f = $(this).attr("cf");
//		addHistory(g);
		var h;
		if (f != null && f != undefined && f != "") {
			h = URLPrefix.search_mobileUrl + "/s.php?q=" + encodeURIComponent($.trim(url_encode(g))) + "&cf=" + f
		} else {
			h = buildresulturl2(g, $("#channel").val(), $("#terminalFlag").val())
		}
		location.href = h;
		$("#keywordsList").empty()
	});
	
});

function queryHistory() {
	var h = $.cookie("custno") || "";
	if (h === "") {
		$("#historywords").hide();
		return
	}
	var f = "";
	var i = "";
	var g = "hisautoComplateCallback_" + MD5(h + "+query");
	if ($("#channel_type").val() == "hwg") {
		f = "ext/";
		i = URLPrefix.ds_server + "/ds/his/ext/" + h + "--4-" + g + ".jsonp"
	} else {
		if ($("#channel_type").val() != "") {
			$("#historywords").hide();
			return
		} else {
			i = URLPrefix.ds_server + "/ds/his/" + h + "--0-" + g + ".jsonp"
		}
	}
	var j = "";
	$.jsonp({
		url: i,
		type: "get",
		dataType: "jsonp",
		cache: true,
		timeout: 5000,
		callback: g,
		success: function(c) {
			if (c) {
				var d;
				if ($("#channel_type").val() == "hwg") {
					d = c.rs
				} else {
					d = c.words
				}
				if (d.length <= 0) {
					return
				}
				for (var e = 0; e < d.length; e++) {
					var a = unResolveHisKey(d[e].keyname);
					var b = html_encode(a);
					if (e < 9) {
						j += '<a name="wapsssry_none_lsc_rsc' + (e + 1) + '" href="javascript:void(0);">' + b + "</a>"
					}
				}
				$("#historyList").html(j);
				$("#historyList").show();
				$(".delbtn").show();
				$("#historywords").show()
			}
		},
		error: function() {
			$("#historywords").hide()
		},
		complete: function(a, b) {
			if (b == "timeout") {
				$("#historywords").hide()
			}
		}
	})
}

function queryHotWrods() {
	var c = $("#categoryType").val();
	if (c == "") {
		c = "99999998"
	}
	var d = "https://suggest.taobao.com/sug?area=sug_hot&wireless=2&code=utf-8&nick=&sid=null&callback=getHotWord";
	$(".otherProBox").hide();
	$.jsonp({
		url: d,
		type: "get",
		dataType: "jsonp",
		cache: true,
		timeout: 5000,
		callback: "getHotWord",
		success: function(a) {
			constructHotWords(a)
		},
		error: function() {
			$("#hotwords").hide()
		},
		complete: function(a, b) {
			if (b == "timeout") {
				$("#hotwords").hide()
			}
		}
	})
}

function constructHotWords(f) {
	var i = $(".search-switch").attr("data-rel");
//	console.log("【cookie："+f.querys.length+"】");
	if (f.querys.length>0) {
//		if (f.rs.defaultWord.length > 0) {
//			$("#searchAssInp").attr("value", f.rs.defaultWord[0].word);
//			defaultWord_data = f.rs.defaultWord[0];
//			defaultWord = $.trim(f.rs.defaultWord[0].word)
//		}
//		if (f.rs.directWord && f.rs.directWord.length > 0) {
//			directWords = f.rs.directWord
//		}
		if (f.querys.length > 0) {
			$("#hotwords-err").hide();
			$("#hotwords").show()
		}
		var j = f.querys;
		var g = $("#hotwordsBox");
		g.empty();
		var h = "";
		$.each(j, function(a, c) {
			var b = html_encode(c);
//			if (c.type == 3) {
//				if (c.url == "") {
//					h += '<a name="wapsssry_none_rsc_rsc' + (a + 1) + '" href="javascript:searchHistoryOrHotword(\'' + b + "');\">" + b + "</a>"
//				} else {
//					h += '<a name="wapsssry_none_rsc_rsc' + (a + 1) + '"  href="' + c.url + '">' + b + "</a>"
//				}
//			} else {
//				if (c.type == 2) {
//					h += '<a class="ad" name="wapsssry_none_rsc_rsc' + (a + 1) + '" href="' + c.url + '">' + b + "</a>"
//				}
//			}
			h += '<a name="wapsssry_none_rsc_rsc' + (a + 1) + '" href="javascript:searchHistoryOrHotword(\'' + b + "');\">" + b + "</a>"
		});
		g.html(h);
		g.show()
	} else {
		$("#hotwords").hide()
	}
}

function querySuggest(i) {
//	console.log("【cookie："+i+"】");
	$("#shopList").empty();
	if (!i) {
		return
	}
	i = $.trim(i);
	if (!i) {
		return
	}
//	console.log("【cookieasdas："+i+"】");

	var j = $("#shopList");
	var l = "<a href='javascript:void(0);' class='list-ass' name='wapsssry_none_lxc_lxdp' keys='" + html_encode(i) + "'><p>搜索<span>“" + html_encode(i) + "”</span>相关店铺</p><em></em> </a>";
//	j.append(l);
	var h = "";
	var g = "autoComplateCallback_" + (h + "query");
	var k="http://suggest.taobao.com/sug?callback="+g+"&q="+encodeURIComponent(i)+"&code=utf-8&_="+new Date().getTime();
	$.jsonp({
		url: k,
		type: "get",
		dataType: "jsonp",
		cache: true,
		setTimeout: 1000,
		callback: g,
		success: function(a) {
//			var b = a.searchboxBanner.url;
//			var c = a.searchboxBanner.image;
//			if (b != undefined && c != undefined) {
//				$(".search-result-ad").remove();
//				l = '<a href="' + b + '" class="search-result-ad"><img src="' + c + '"></a>';
//				$("#searchAss").prepend(l)
//			} else {
//				$(".search-result-ad").remove()
//			}
			if (a && a.result.length > 0) {
				$(".think-words").empty();
				$("#typesList").empty();
				$("body").addClass("pop-color");
				$("#searchHot").hide();
				$(".search-wrap").hide();
				$("#shopsListArea").hide();
				$("#searchAss").show();
				$("#typesList").show();
				$(".think-words").show();
				$("#keywordsList").show();
				constructSuggest(a.result, i)
			} else {
				$("body").removeClass("pop-color");
				$(".shopsList").hide();
				$("#typesList").hide();
				$(".think-words").hide();
				$("#keywordsList").hide()
			}
		}
	})
}

function html_encode(b) {
	if (b.length == 0) {
		return ""
	}
	b = b.replace(/&/g, "&amp;");
	b = b.replace(/</g, "&lt;");
	b = b.replace(/>/g, "&gt;");
	b = b.replace(/\'/g, "&#39;");
	b = b.replace(/\"/g, "&quot;");
	return b
}

function searchHistoryOrHotword(d) {
	d = $.trim(d);
	if (!d) {
		return false
	}
//	addHistory(d);
	var c = buildresulturl2(d, $("#channel_type").val(), $("#terminalFlag").val());
	document.location.href = c
}

function buildresulturl2(h, f, g) {
//	var e = $.cookie("cityId") || "";
	return URLPrefix.search_mobileUrl + "/s/index?q=" + encodeURIComponent($.trim(url_encode(h))) + "" + (f ? "&ch=" + f : "") + (g ? "&terminal=" + g : "")
}

function url_encode(b) {
	b = b.replace(/\//g, "%2F").replace(/\./g, "%2E").replace(/\;/g, "%3B");
	return b
}

function constructSuggest(j, n) {
	var l = $("#typesList");
	var p = $(".think-words");
	var o = $("#shopList");
	var m = 1;
	var i = 1;
	var k = 1;
	if (j.length > 0) {
		$.each(j, function(e, d) {
			if (e > 11) {
				return
			}
			
//			if (typeof d.categoryName != "undefined" && d.categoryName != null) {
//				listDom2 = "<a href='javascript:void(0);' class='list-ass' name='wapsssry_none_lxc_lxfl" + (m++) + "' c_id='" + d.categoryId + "' keys='" + html_encode(d.keyname) + "'><p>在<span>“" + html_encode(d.categoryName) + "”</span>分类中搜索</p><em></em> </a>";
//				l.append(listDom2)
//			} else {
//				var b = $("<li></li>");
//				var f = $('<a class="mainA"  name="wapsssry_none_lxc_lxc' + (i) + '" href="javascript:void(0);" keys=' + html_encode(d.keyname) + "><span>" + d.keyname + "</span></a>");
//				b.append(f);
//				if (d.attr != undefined) {
//					var a = i < 10 ? ("0" + i) : (i + "");
//					var c = $('<div class="think-words-tag"></div>');
//					$.each(d.attr, function(g, t) {
//						var h = g + 1;
//						h = h < 10 ? ("0" + h) : (h + "");
//						var s = $('<a href="javascript:void(0);" name="wapsssry_none_lxc_sx' + a + h + '" id=' + t.attrValueCode + " keys=" + html_encode(d.keyname) + "  cf=" + t.attrFilterId + ">" + t.attrValue + "</a></div>");
//						c.append(s);
//						b.append(c)
//					})
//				}
//				i++;
//				p.append(b)
//			}
			var b = $("<li></li>");
			var f = $('<a class="mainA"  name="wapsssry_none_lxc_lxc' + (i) + '" href="javascript:void(0);" keys="' + html_encode(d[0]) + '"><span>' + d[0] + '</span></a>');
			b.append(f);
			i++;
			p.append(b)
		})
	}
}
