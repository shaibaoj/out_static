/* FILE BEGIN search/script/search/wapsearch.js */
var hotwords_Num = 0;
var history_Num = 1;
var defaultWord = "";
var defaultWord_data = null;
var directWords = null;

function queryHotWrods() {
	var c = $("#categoryType").val();
	if (c == "") {
		c = "99999998"
	}
	var d = URLPrefix.ds_server + "/ds/terminal/hotword/" + c + "-wap-getHotWord.jsonp";
	d = "https://suggest.taobao.com/sug?area=sug_hot&wireless=2&code=utf-8&nick=&sid=null&callback=getHotWord";
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

function errorHotWord() {
	$("#hotwords").show();
	$("#hotwords-err").show();
	$("#hotwordsBox").hide()
}

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

function addHistory(i) {
	var j = "";
	var h = "";
	var g = $.cookie("custno") || "";
	var f = "addHistory_" + MD5(g + "+add");
	if ($("#channel_type").val() == "99999994") {
		return
	} else {
		if ($("#channel_type").val() == "hwg") {
			h = URLPrefix.ds_server + "/ds/his/ext/add/" + g + "-" + encodeURIComponent(resolveHisKey(i)) + "-4-" + f + ".jsonp"
		} else {
			h = URLPrefix.ds_server + "/ds/his/add/" + g + "-" + encodeURIComponent(resolveHisKey(i)) + "-" + f + ".jsonp"
		}
	}
	httpGifSendIndex(h)
}

function resolveHisKey(b) {
	b = b.replace(/\%/g, "%25").replace(/\-/g, "%2d").replace(/\//g, "%2F").replace(/\\/g, "%5C").replace(/\~/g, "%7E").replace(/\+/g, "%2B");
	return b
}

function unResolveHisKey(b) {
	b = b.replace("%2f", "/").replace("%2F", "/");
	return b
}

function delHistory() {
	var d = $.cookie("custno") || "";
	var c = "hisautoComplateCallback_" + MD5(d + "+clean");
	if ($("#channel_type").val() == "hwg") {
		url = URLPrefix.ds_server + "/ds/his/ext/clean/" + d + "-4-" + c + ".jsonp"
	} else {
		url = URLPrefix.ds_server + "/ds/his/clean/" + d + "-" + c + ".jsonp"
	}
	httpGifSendIndex(url);
	$("#historyList").empty();
	$("#historyList").hide();
	$(".delbtn").hide();
	$("#historywords").css({
		display: "none"
	})
}

function httpGifSendIndex(a) {
	var e = "hislog_" + (new Date()).getTime();
	var f = window[e] = new Image();
	f.onload = (f.onerror = function() {
		window[e] = null
	});
	f.src = a + "?" + e;
	f = null
}

function hwgQuerySuggest(c) {
	var d = $("#shopList");
	$(".think-words").hide();
	$("#typesList").hide();
	$("#shopList").empty();
	$("body").addClass("pop-color");
	$("#searchAss").show();
	$("#searchHot").hide();
	$(".search-wrap").hide();
	$("#shopsListArea").hide();
	listDom2 = "<a href='javascript:void(0);' class='list-ass' name='wapsssry_none_lxc_lxdp' keys='" + html_encode(c) + "'><p>搜索<span>“" + html_encode(c) + "”</span>相关店铺</p><em></em> </a>";
	d.append(listDom2)
}

function querySuggest(i) {
	$("#shopList").empty();
	if (!i) {
		return
	}
	i = $.trim(i);
	if (!i) {
		return
	}
	if ($("#channel_type").val() == "hwg") {
		hwgQuerySuggest(i);
		return
	} else {
		if ($("#channel_type").val() != "") {
			return
		}
	}
	var j = $("#shopList");
	var l = "<a href='javascript:void(0);' class='list-ass' name='wapsssry_none_lxc_lxdp' keys='" + html_encode(i) + "'><p>搜索<span>“" + html_encode(i) + "”</span>相关店铺</p><em></em> </a>";
//	j.append(l);
	var h = $.cookie("custno") || "";
	var g = "autoComplateCallback_" + MD5(h + "+query");
	var k = URLPrefix.ds_server + "/ds/his/new/" + h + "-" + encodeURIComponent(i) + "-0-2-" + g + ".jsonp";
	k="http://suggest.taobao.com/sug?callback="+g+"&q="+encodeURIComponent(i)+"&code=utf-8&_="+new Date().getTime();
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

function buildresulturl2(h, f, g) {
	var e = $.cookie("cityId") || "";
	return URLPrefix.search_mobileUrl + "/s.php?q=" + encodeURIComponent($.trim(url_encode(h))) + "" + (f ? "&ch=" + f : "") + (g ? "&terminal=" + g : "")
}

function searchHistoryOrHotword(d) {
	d = $.trim(d);
	if (!d) {
		return false
	}
	addHistory(d);
	var c = buildresulturl2(d, $("#channel_type").val(), $("#terminalFlag").val());
	document.location.href = c
}
$(function() {
	$("#hotwords").hide();
	$("#hotwordsBox").hide();
	$("#hotwords-err").hide();
	$("#historywords").hide();
	$("#historyList-err").hide();
	$(".delbtn").hide();
	$(".online-err").hide();
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
		addHistory(f);
		var d = buildresulturl2(f, $("#channel_type").val(), $("#terminalFlag").val());
		document.location.href = d
	});
//	$("#historyList").delegate("a", "click", function(c) {
//		var d = $(this).text();
//		searchHistoryOrHotword(d)
//	});
//	$("#typesList").delegate("a", "click", function(f) {
//		var e = $(this);
//		var d = e.attr("keys").replace(/\<b\>/g, "").replace(/\<\/b\>/g, "");
//		link = URLPrefix.search_mobileUrl + "/search/" + encodeURIComponent(d) + "/&ci=" + e.attr("c_id");
//		$("#wapSearchInput").val(d);
//		location.href = link;
//		$("#keywordsList").empty()
//	});
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
//	$("#shopList").delegate("a", "click", function(e) {
//		var f = "";
//		if ($("#channel_type").val() == "hwg") {
//			f = "&ch=hwg"
//		}
//		var g = $(this).attr("keys");
//		var h = URLPrefix.search_mobileUrl + "/search/shopresult.html?keyword=" + encodeURIComponent($.trim(g)) + f;
//		location.href = h;
//		$("#keywordsList").empty()
//	})
});

function loadSearch() {
	queryHistory();
	queryHotWrods()
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

function javascript_encode(g) {
	if (!g) {
		return ""
	}
	g = $.trim(g);
	var c = [];
	for (var h = 0; h < g.length; h++) {
		var f = g.charAt(h);
		if (f == '"') {
			c.push('\\"')
		} else {
			if (f == "'") {
				c.push("\\'")
			} else {
				if (f == "\\") {
					c.push("\\\\")
				} else {
					if (f == "/") {
						c.push("\\/")
					} else {
						if (f == "\t") {
							c.push("\\t")
						} else {
							c.push(f)
						}
					}
				}
			}
		}
	}
	return c.join("")
}

function footprintGoto() {
	window.location = URLPrefix.traceUrl + "/trace-web/wap/index.do"
}

function url_encode(b) {
	b = b.replace(/\//g, "%2F").replace(/\./g, "%2E").replace(/\;/g, "%3B");
	return b
}

var delay = null;

function initEvent() {
	var a = $(".searchInp").val();
	topDownloadApp(encodeURIComponent(a))
}

function iframeBridge(a) {
	var b = document.createElement("iframe");
	b.src = a;
	b.style.display = "none";
	document.body.appendChild(b);
	setTimeout(function() {
		document.body.removeChild(b)
	}, 1000)
}
//$(".down-link").on("click", function() {
//	var a = $(".searchInp").val();
//	if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i) || navigator.userAgent.match(/android/i)) {
//		window.location.href = "http://code.suning.cn/HPj8dy"
//	} else {
//		window.location.href = URLPrefix.search_mobileUrl + "/search/" + encodeURIComponent($.trim(url_encode(a))) + "/"
//	}
//}); 