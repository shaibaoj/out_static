var CURID = "10";
function getMallInfo(a) {
	var b = {};
	switch (a) {
	case "1":
		b.acf = "acjd()";
		b.framecolor = "#E4393C";
		b.sugbkcolor = "";
		b.btnhovercolor = "";
		b.mname = "京东";
		return b;
	case "2":
		b.acf = "actaobao()";
		b.framecolor = "#ff5500";
		b.sugbkcolor = "";
		b.btnhovercolor = "";
		b.mname = "淘宝";
		return b;
	case "3":
		b.acf = "actmall()";
		b.framecolor = "#c40000";
		b.sugbkcolor = "";
		b.btnhovercolor = "";
		b.mname = "天猫";
		return b;
	case "4":
		b.acf = "acgeneral('4')";
		b.framecolor = "#ff9900";
		b.sugbkcolor = "";
		b.btnhovercolor = "";
		b.mname = "亚马逊";
		return b;
	case "5":
		b.acf = "acsuning('5')";
		b.framecolor = "#3392e2";
		b.sugbkcolor = "";
		b.btnhovercolor = "";
		b.mname = "苏宁";
		return b;
	case "6":
		b.acf = "acgeneral('6')";
		b.framecolor = "#ff3c3c";
		b.sugbkcolor = "";
		b.btnhovercolor = "";
		b.mname = "1号店";
		return b;
	case "7":
		b.acf = "achaosou()";
		b.framecolor = "#5db95b";
		b.sugbkcolor = "";
		b.btnhovercolor = "";
		b.mname = "好搜";
		return b;
	case "8":
		b.acf = "acbaidu()";
		b.framecolor = "#3385ff";
		b.sugbkcolor = "";
		b.btnhovercolor = "";
		b.mname = "百度";
		return b;	
	case "9":
		b.acf = "acsogou()";
		b.framecolor = "#ff5a34";
		b.sugbkcolor = "";
		b.btnhovercolor = "";
		b.mname = "搜狗";
		return b;	
	case "10":
		b.acf = "acquanquan()";
		b.framecolor = "#ff5500";
		b.sugbkcolor = "";
		b.btnhovercolor = "";
		b.mname = "券券";
		b.mname_all = "优惠券搜索";
		return b;	
	default:
		b.acf = "acquanquan()";
		b.framecolor = "#ff5500";
		b.sugbkcolor = "";
		b.btnhovercolor = "";
		b.mname = "券券";
		b.mname_all = "优惠券搜索";
		return b
	}
}
function acquanquan() {
	$("#searchfield").autocomplete({
		source : function(b, a) {
			$.ajax({
				url : "http://suggest.taobao.com/sug",
				dataType : "jsonp",
				data : {
					q : b.term,
					code : "utf-8"
				},
				success : function(c) {
					a($.map(c.result, function(d) {
						return {
							label : d[0],
							value : d[0]
						}
					}))
				}
			})
		},
		minLength : 1,
		select : function(a, b) {
			dosearch(b.item.value, "10", "sug")
		}
	}).data("ui-autocomplete")._renderItem = function(a, b) {
		return $("<li>").data("ui-autocomplete-item", b).append(
				'<span class="headsuggestitem">' + b.label + "</span>")
				.appendTo(a)
	}
}
function acsogou() {
	$("#searchfield").autocomplete({
		source : function(b, a) {
			$.ajax({
				url : "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&p=3&req=2&csor=5",
				dataType : "jsonp",
				jsonp: 'cb',
				data : {
					wd : b.term,
					code : "utf-8"
				},
				success : function(c) {
					a($.map(c.s, function(d) {
						return {
							label : d,
							value : d
						}
					}))
				}
			})
		},
		minLength : 1,
		select : function(a, b) {
			dosearch(b.item.value, "9", "sug")
		}
	}).data("ui-autocomplete")._renderItem = function(a, b) {
		return $("<li>").data("ui-autocomplete-item", b).append(
				'<span class="headsuggestitem">' + b.label + "</span>")
				.appendTo(a)
	}
}
function achaosou() {
	$("#searchfield").autocomplete({
		source : function(b, a) {
			$.ajax({
				url : "http://sug.so.360.cn/suggest?encodein=utf-8&encodeout=utf-8&format=json",
				dataType : "jsonp",
				data : {
					word : b.term,
					code : "utf-8"
				},
				success : function(c) {
					a($.map(c.result, function(d) {
						return {
							label : d.word,
							value : d.word
						}
					}))
				}
			})
		},
		minLength : 1,
		select : function(a, b) {
			dosearch(b.item.value, "7", "sug")
		}
	}).data("ui-autocomplete")._renderItem = function(a, b) {
		return $("<li>").data("ui-autocomplete-item", b).append(
				'<span class="headsuggestitem">' + b.label + "</span>")
				.appendTo(a)
	}
}
function acbaidu() {
	$("#searchfield").autocomplete({
		source : function(b, a) {
			$.ajax({
				url : "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&p=3&req=2&csor=5",
				dataType : "jsonp",
				jsonp: 'cb',
				data : {
					wd : b.term,
					code : "utf-8"
				},
				success : function(c) {
					a($.map(c.s, function(d) {
						return {
							label : d,
							value : d
						}
					}))
				}
			})
		},
		minLength : 1,
		select : function(a, b) {
			dosearch(b.item.value, "8", "sug")
		}
	}).data("ui-autocomplete")._renderItem = function(a, b) {
		return $("<li>").data("ui-autocomplete-item", b).append(
				'<span class="headsuggestitem">' + b.label + "</span>")
				.appendTo(a)
	}
}
function acjd() {
	$("#searchfield").autocomplete({
		source : function(b, a) {
			$.ajax({
				url : "http://suggest.taobao.com/sug",
				dataType : "jsonp",
				data : {
					q : b.term,
					code : "utf-8"
				},
				success : function(c) {
					a($.map(c.result, function(d) {
						return {
							label : d[0],
							value : d[0]
						}
					}))
				}
			})
		},
		minLength : 1,
		select : function(a, b) {
			dosearch(b.item.value, "1", "sug")
		}
	}).data("ui-autocomplete")._renderItem = function(a, b) {
		return $("<li>").data("ui-autocomplete-item", b).append(
				'<span class="headsuggestitem">' + b.label + "</span>")
				.appendTo(a)
	}
}
function actmall() {
	$("#searchfield").autocomplete({
		source : function(b, a) {
			$.ajax({
				url : "http://suggest.taobao.com/sug",
				dataType : "jsonp",
				data : {
					q : b.term,
					area : "b2c",
					code : "utf-8"
				},
				success : function(c) {
					a($.map(c.result, function(d) {
						return {
							label : d[0],
							value : d[0]
						}
					}))
				}
			})
		},
		minLength : 1,
		select : function(a, b) {
			dosearch(b.item.value, "3", "sug")
		}
	}).data("ui-autocomplete")._renderItem = function(a, b) {
		return $("<li>").data("ui-autocomplete-item", b).append(
				'<span class="headsuggestitem">' + b.label + "</span>")
				.appendTo(a)
	}
}
function actaobao() {
	$("#searchfield").autocomplete({
		source : function(b, a) {
			$.ajax({
				url : "http://suggest.taobao.com/sug",
				dataType : "jsonp",
				data : {
					q : b.term,
					code : "utf-8"
				},
				success : function(c) {
					a($.map(c.result, function(d) {
						return {
							label : d[0],
							value : d[0]
						}
					}))
				}
			})
		},
		minLength : 1,
		select : function(a, b) {
			dosearch(b.item.value, "2", "sug")
		}
	}).data("ui-autocomplete")._renderItem = function(a, b) {
		return $("<li>").data("ui-autocomplete-item", b).append(
				'<span class="headsuggestitem">' + b.label + "</span>")
				.appendTo(a)
	}
}
function acsuning() {
	$("#searchfield").autocomplete({
		source : function(b, a) {
			$.ajax({
				url : "http://suggest.taobao.com/sug",
				dataType : "jsonp",
				data : {
					q : b.term,
					code : "utf-8"
				},
				success : function(c) {
					a($.map(c.result, function(d) {
						return {
							label : d[0],
							value : d[0]
						}
					}))
				}
			})
		},
		minLength : 1,
		select : function(a, b) {
			dosearch(b.item.value, "5", "sug")
		}
	}).data("ui-autocomplete")._renderItem = function(a, b) {
		return $("<li>").data("ui-autocomplete-item", b).append(
				'<span class="headsuggestitem">' + b.label + "</span>")
				.appendTo(a)
	}
//	$("#searchfield").autocomplete({
//		source : function(b, a) {
//			$.ajax({
//				url : "http://ds.suning.cn/ds/his/111-"+encodeURIComponent(b.term)+"-0-autoComplateCallback.jsonp?callback=autoComplateCallback",
//				dataType : "jsonp",
//				jsonp: 'autoComplateCallback',
//				data : {
//					keyword : b.term,
//					categoryId : "0"
//				},
//				success : function(c) {
//					a($.map(c.words, function(e) {
//						var d = delhtmltag(e.keyname);
//						return {
//							label : e.keyname,
//							value : d
//						}
//					}))
//				}
//			})
//		},
//		minLength : 1,
//		select : function(a, b) {
//			dosearch(b.item.value, "5", "sug")
//		}
//	}).data("ui-autocomplete")._renderItem = function(a, b) {
//		return $("<li>").data("ui-autocomplete-item", b).append(
//				'<span class="headsuggestitem">' + b.label + "</span>")
//				.appendTo(a)
//	}
}
function acgeneral(a) {
	$("#searchfield").autocomplete({
		source : function(c, b) {
			$.ajax({
				url : "http://completion.amazon.cn/search/complete?mkt=3240&client=amazon-search-ui&search-alias=aps&qs=&cf=1&noCacheIE=1454323964475&fb=1&sc=1&",
				dataType : "jsonp",
				data : {
					q : c.term
				},
				success : function(d) {
					b($.map(d[1], function(e) {
						return {
							label : e,
							value : e
						}
					}))
				}
			})
		},
		minLength : 1,
		select : function(b, c) {
			dosearch(c.item.value, a, "sug")
		}
	}).data("ui-autocomplete")._renderItem = function(b, c) {
		return $("<li>").data("ui-autocomplete-item", c).append(
				'<span class="headsuggestitem">' + c.label + "</span>")
				.appendTo(b)
	}
}
function init() {
	changemall(CURID)
}
function dosearch(g, e, d) {
	var c = "";
	var a = "";
	switch (e) {
	case "1":
		a = "http://search.jd.com/Search?keyword=" + encodeURIComponent(g)
				+ "&enc=utf-8";
		c = "http://p.yiqifa.com/c?s=f465bdfc&w=594992&c=254&i=160&l=0&e=huopinjie&t=" + a
				+ "";
		break;
	case "2":
		c = "http://search.taobao.com/search?q=" + encodeURIComponent(g);
		break;
	case "3":
		c = "http://search.taobao.com/search?tab=mall&q="
				+ encodeURIComponent(g);
		break;
	case "4":
//		http://www.amazon.cn/gp/search?ie=UTF8&camp=536&creative=3200&index=aps&keywords=qqq&linkCode=ur2&tag=shaibaoj-23
		c = "http://www.amazon.cn/s/?field-keywords=" + encodeURIComponent(g)
				+ "&tag=shaibaoj-23";
		break;
	case "5":
		a = "http://search.suning.com/" + encodeURIComponent(g) + "/";
		c = "http://p.yiqifa.com/c?s=908fdec3&w=594992&c=4459&i=5662&l=0&e=huopinjie&t=" + a
				+ "";
		break;
	case "6":
		a = "http://search.yhd.com/s2/c0-0/k" + encodeURIComponent(g) + "/2/";
		c = "http://p.yiqifa.com/c?s=429c5144&w=594992&c=139&i=802&l=0&e=huopinjie&t=" + a
				+ "";
		break;
	case "7":
		c = "http://www.haosou.com/s?ie=utf-8&q=" + encodeURIComponent(g)
				+ "";
		break;
	case "8":
		c = "https://www.baidu.com/s?ie=utf-8&wd=" + encodeURIComponent(g)
				+ "";
		break;
	case "9":
		c = "https://www.sogou.com/web?query=" + encodeURIComponent(g)
				+ "";
		break;	
	case "10":
		c = URLPrefix.so_url+"/promo/search/index.htm?q=" + encodeURIComponent(g)
				+ "";
		break;		
	}
	var f = "search_" + e;
	var b = "query_" + g;
	window.open(c)
}
function delhtmltag(a) {
	return a.replace(/<[^>]+>/g, "")
}
function changemall(mallid) {
	mallinfo = getMallInfo(mallid);
	$("#searchfielddiv").css("border", "3px solid " + mallinfo.framecolor);
	$("#searchbutton").css("background-color", mallinfo.framecolor);
	$("#searchboxtitlebk").css("background-color", mallinfo.framecolor);
	if(typeof(mallinfo.mname_all)=="undefined"||mallinfo.mname_all==null||mallinfo.mname_all==''){		
		$("#searchbutton").text("在" + mallinfo.mname + "搜索");
	}else{		
		$("#searchbutton").text("" + mallinfo.mname_all + "");
	}
	
	eval(mallinfo.acf + ";");
	$("#searchfield").focus();
	var eachmallobj = $(".eachmall[mallid=" + mallid + "]");
	var mallitem = eachmallobj.find(".mallitem");
	var mallbase = mallitem.attr("id");
	resettoinactive();
	mallitem.removeClass(mallbase + "inactive");
	mallitem.removeClass(mallbase + "hover");
	mallitem.addClass(mallbase);
	$(".eachmall").hover(function() {
		var mallitem = $(this).find(".mallitem");
		var mallbase = mallitem.attr("id");
		if (mallitem.hasClass(mallbase + "inactive")) {
			mallitem.removeClass(mallbase + "inactive");
			mallitem.addClass(mallbase + "hover")
		}
	}, function() {
		var mallitem = $(this).find(".mallitem");
		var mallbase = mallitem.attr("id");
		if (mallitem.hasClass(mallbase + "hover")) {
			mallitem.removeClass(mallbase + "hover");
			mallitem.addClass(mallbase + "inactive")
		}
	})
}
function resettoinactive() {
	$(".eachmall").each(function() {
		var a = $(this).find(".mallitem").attr("id");
		$(this).find(".mallitem").removeClass(a);
		$(this).find(".mallitem").addClass(a + "inactive")
	})
}
function enterkey() {
	if (event.keyCode == 13
			&& !jQuery(this).data("ui-autocomplete").menu.active) {
		var a = $("#searchfield").val();
		dosearch(a, CURID, "entersearch")
	}
}
$("#searchfield").keydown(function(b) {
	if (b.keyCode == 13 && !jQuery(this).data("ui-autocomplete").menu.active) {
		if ($("#searchfield").is(":focus")) {
			$(".ui-autocomplete").hide()
		}
		var a = $("#searchfield").val();
		dosearch(a, CURID, "entersearch")
	}
});
$(function() {
	init();
	$("#tiparea").click(function() {
		$("#tip").hide();
		$.get("setcookie.php?name=tipclick&value=2");
		$("#searchfield").focus();
	});
	$(".eachmall").click(function() {
		CURID = $(this).attr("mallid");
		changemall(CURID);
		var a = "changemall" + CURID;
	});
	$(".navitem").hover(function() {
		$(this).css("background-color", "#f9f8f9");
		$(this).find("span.navmallname").css("text-decoration", "underline")
	}, function() {
		$(this).css("background-color", "#ffffff");
		$(this).find("span.navmallname").css("text-decoration", "none")
	});
	$(".navitem").click(function() {
		var a = $(this).attr("href");
	});
	$(".navhotitem").click(function() {
		var a = $(this).attr("href");
	});
	$(".navhotitem").hover(function() {
		$(this).css("background-color", "#f2f1f2");
		$(this).find("span.navmallname").css("text-decoration", "underline")
	}, function() {
		$(this).css("background-color", "#f9f8f9");
		$(this).find("span.navmallname").css("text-decoration", "none")
	});
	$("#searchbutton").click(function() {
		var a = $("#searchfield").val();
		dosearch(a, CURID, "btnsearch")
	});
	$(".hotnavitem").hover(function() {
		$(this).find(".navitemlogobk").css("background-color", "#f8f8f8")
	}, function() {
		$(this).find(".navitemlogobk").css("background-color", "#ffffff")
	})
});