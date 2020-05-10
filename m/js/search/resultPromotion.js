/* FILE BEGIN search/script/search/resultPromotion.js */
var status_code = "200";
var userId = $.cookie("custno") || "";
var sszxskg = param.sszxskg;
var bizCode = "";
var partnumberCode = "";
util = util || {};
util.RI = (function() {
	var g = new Object();
	g.batchSize = batchLoadSize;
	g.isGoodHasSaleCode = _goodHasSaleCode || false;

	function d(j) {
		if (!j || !j.type || !j.partnumber) {
			return false
		}
		var i = {
			channel: "2"
		};
		var k = $.extend(i, j);
		if (k.type == "2") {
			k.supplierCode = k.supplierCode || "0000000000"
		}
		k.partnumber = cutPrefix(k.partnumber, 18);
		k.supplierCode = k.supplierCode || "";
		return k
	}

	function h(i) {
		i.sort(function(m, l) {
			var k = i[m].num;
			var j = i[l].num;
			return k > j ? 1 : k == j ? 0 : -1
		});
		return i[i[i.length - 1]].key
	}

	function e(t) {
		var l = [];
		var w = [];
		for (var o = 0; o < t.datas.length; o++) {
			var s = t.datas[o].type;
			var j = t.datas[o].supplierCode;
			var u = "_" + s;
			var r = "_" + j;
			var n = l[u];
			if (!n) {
				n = {
					index: l.length,
					key: s,
					num: 0
				};
				l[u] = n;
				l.push(u)
			}
			n.num = n.num + 1;
			n = w[r];
			if (!n) {
				n = {
					index: w.length,
					key: j,
					num: 0
				};
				w[r] = n;
				w.push(r)
			}
			n.num = n.num + 1
		}
		var p = h(l);
		var v = h(w);
		var m = g.isGoodHasSaleCode ? "/ds/generalForTile/" : "/ds/general/";
		var x = [URLPrefix.ds_server, m];
		var k = t.datas.length;
		for (var o = 0; o < k; o++) {
			var q = t.datas[o];
			x.push(q.partnumber);
			x.push("_");
			if (q.type != p || (q.type == p && q.supplierCode != v)) {
				x.push("_");
				if (q.type == "100") {
					x.push(q.type)
				} else {
					if (v != null && v != "") {
						x.push("2")
					} else {
						x.push(q.type)
					}
				}
			}
			if (q.supplierCode != v) {
				x.push("_");
				x.push(q.supplierCode)
			}
			if (o < k - 1) {
				x.push(",")
			}
		}
		x.push("-");
		x.push(t.cityId);
		x.push("_");
		x.push(t.positionCityId);
		x.push("-");
		x.push(p);
		x.push("-");
		x.push(v);
		x.push("-");
		x.push(t.channel);
		x.push("-");
		x.push(t.custno);
		x.push("-callDsServiceDate.jsonp");
		return x.join("")
	}
	g._loadInfoByRichInterface = function(i, l, k) {
		var j = {
			datas: [{
				partnumber: i.partnumber,
				type: i.type,
				supplierCode: i.supplierCode,
				context: i.context
			}],
			cityId: i.cityId,
			custno: i.custno,
			channel: i.channel
		};
		g._loadInfosByRichInterface(j, l, k)
	};
	g._loadInfosByRichInterface = function(r, l, t) {
		var m = [];
		for (var o = 0; o < r.datas.length; o++) {
			var q = d(r.datas[o]);
			if (q) {
				m.push(q)
			}
		}
		if (m.length == 0) {
			return
		}
		r.cityId = r.cityId || $.cookie("cityId") || "9173";
		r.positionCityId = r.positionCityId || $.cookie("cityId") || "9173";
		r.custno = r.custno || userId || "";
		r.channel = r.channel || "2";
		var s = Math.floor((m.length - 1) / g.batchSize) + 1;
		for (var o = 0; o < s; o++) {
			var k = o * g.batchSize;
			var n = k + g.batchSize;
			n = (n >= m.length) ? m.length : n;
			var j = $.extend({}, r);
			j.datas = m.slice(k, n);
			b(j, l, t)
		}
	};

	function b(j, l, k) {
		var i = e(j);
		var m = {};
		$(j.datas).each(function() {
			var n = "_" + this.partnumber;
			if (g.isGoodHasSaleCode) {
				n += "_" + this.supplierCode
			}
			if (!m[n]) {
				m[n] = [];
				m[n]["index"] = 0
			}
			m[n].push(this)
		});
		$.jsonp({
			url: i,
			type: "get",
			dataType: "jsonp",
			cache: true,
			callback: "callDsServiceDate",
			success: function(n) {
				if (n.status == status_code) {
					$.each(n.rs, function(p, q) {
						var o = "_" + q.cmmdtyCode;
						if (g.isGoodHasSaleCode) {
							o += "_" + q.bizCode
						}
						var r = m[o];
						if (r && typeof l == "function") {
							l.call(r[r.index].context, q);
							r.index = r.index + 1
						}
					})
				}
			}
		})
	}

	function c(l) {
		l = $(l);
		if (g.isGoodHasSaleCode) {
			var m = l.attr("data-catentryId2");
			var i = "2";
			if (m) {
				i = "100"
			}
			var k = {
				partnumber: l.attr("partnumberid"),
				type: i,
				supplierCode: l.attr("data-sale-code"),
				context: l[0],
			};
			return k
		}
		var i = l.attr("type");
		if (!i) {
			return false
		}
		var j = i.split("-");
		var k = {
			partnumber: l.attr("partnumberid"),
			type: j[0],
			supplierCode: l.attr("overseascode"),
			context: l[0],
		};
		return k
	}
	g.loadProductInfoByRichInterface = function(j) {
		var i = c(j);
		if (i) {
			g._loadInfoByRichInterface(i, callDsServiceDate2)
		}
	};
	g.loadProductInfosByRichInterface = function(l) {
		var n = {
			channel: "2"
		};
		var j = [];
		for (var k = 0; k < l.length; k++) {
			var m = c(l[k]);
			if (m) {
				j.push(m)
			}
		}
		if (j.length > 0) {
			n.datas = j;
			g._loadInfosByRichInterface(n, callDsServiceDate2)
		}
	};
	g.batchLoad = function(i) {
		if (i.length > 0) {
			g.loadProductInfosByRichInterface(i)
		}
	};
	var f = null;
	var a = [];
	g.addToBatchQueue = function(i) {
		a.push(i);
		if (!f) {
			f = window.setTimeout(function() {
				window.clearTimeout(f);
				f = null;
				var j = a;
				a = [];
				g.loadProductInfosByRichInterface(j)
			}, 50)
		}
	};
	return g
})();

function callDsServiceDate2(d) {
	var a = $(this);
	bizCode = d.bizCode;
	partnumberCode = d.cmmdtyCode;
	getBizCode(d, a);
	addProid(d, a);
	getGotoUrl(d, a);
	getImageUrl(d, a);
	var b = a.attr("packagestype");
	if (!reservationAndSubscribe(d, b, a)) {
		bigPartys(d.priceType, a);
		promotionType(d.promoTypes, a);
		getEnergy(d, a)
	}
	geBtigPromotion(d, a);
	getVendorName(d, a);
	getLablePicture(d, a);
	getCollect(d, a);
	getInvStatus(d, a);
	getOverseas(d, a);
	var c = a.find(".link").attr("id");
	runAnalyseExpoBaoguang(c)
}

function promotionType(a, b) {
	promotionTypeTag(a, b)
}

function promotionTypeTag(d) {
	if (!d || !$.isArray(d) || d.length == 0) {
		return
	}
	var e = arguments[1];
	var b;
	var a;
	for (var c = 0; c < d.length; c++) {
		if (c == 3) {
			return
		}
		if (d[c] === "99") {
			b = $("<i class='taog'>套购</i>");
			a = $("<i class='taog'>套购</i>")
		} else {
			if (d[c] === "4") {
				b = $("<i class='mj'>满减</i>");
				a = $("<i class='mj'>满减</i>")
			} else {
				if (d[c] === "3") {
					b = $("<i class='fq'>返券</i>");
					a = ("<i class='fq'>返券</i>")
				} else {
					if (d[c] === "5") {
						b = $("<i class='zp'>赠品</i>");
						a = $("<i class='zp'>赠品</i>")
					} else {
						if (d[c] === "9") {
							b = $("<i class='zp'>返券</i>");
							a = $("<i class='zp'>返券</i>")
						}
					}
				}
			}
		}
		e.find(".txt").find("p.product-label").append(a);
		e.find(".price").find(".price-txt").find("em.product-label").append(b)
	}
	return true
}

function bigPartys(d) {
	var e = arguments[1];
	if (d == "") {
		return false
	}
	var c;
	var b = e.find(".price").find(".price-txt").find("em");
	var a;
	if (d === "4-1") {
		c = $('<i class="djh">大聚惠</i>');
		a = $('<i class="djh">大聚惠</i>')
	} else {
		if (d === "4-2") {
			c = $('<i class="qg">抢购</i>');
			a = $('<i class="qg">抢购</i>')
		} else {
			if (d === "4-3") {
				c = $('<i class="tg">团购</i>');
				a = $('<i class="tg">团购</i>')
			} else {
				if (d === "4-4") {
					c = $('<i class="sg">闪购</i>');
					a = $('<i class="sg">闪购</i>')
				} else {
					if (d === "4-5") {
						c = $('<i class="qdzx">手机专享</i>');
						a = $('<i class="qdzx">手机专享</i>')
					} else {
						if (d === "4-6") {
							c = $('<i class="mptm">名品特卖</i>');
							a = $('<i class="mptm">名品特卖</i>');
							partnumberCode = partnumberCode.substring(9, 18);
							mptmUrl = URLPrefix.mobileSpecialSellProductUrl + "/mp/0000000000/" + partnumberCode + ".html";
							e.find(".link").attr("href", mptmUrl)
						} else {
							if (d === "4-7") {
								c = $('<i class="smzx">S码专享</i>');
								a = $('<i class="smzx">S码专享</i>')
							} else {
								if (d == "4-10") {
									c = $('<i class="bkqg">爆款抢购</i>');
									a = $('<i class="bkqg">爆款抢购</i>')
								}
							}
						}
					}
				}
			}
		}
	}
	e.find(".txt").find("p.product-label").append(a);
	e.find(".price").find(".price-txt").find("em.product-label").append(c);
	return true
}

function reservationAndSubscribe(g) {
	var a = arguments[2];
	var l = false;
	var b;
	var j;
	var e = a.find(".price-txt").find(".price-num");
	var i = a.find("div.position-right-bottom");
	var k = a.find(".price").find(".price-txt");
	var h = "";
	var d = a.find(".txt").find(".product-label");
	if (g.price) {
		var c = parseFloat(g.price).toFixed(2);
		var f = c.split(".");
		if (g.priceType == "7-2" || g.priceType == "7-4") {
			e.html("￥<strong>" + f[0] + "</strong>." + f[1])
		} else {
			if (g.priceType == "7-1" || g.priceType == "7-3") {
				if (/^[\d|\?|？]+$/.test(g.price)) {
					e.text("￥" + g.price)
				} else {
					e.text(g.price)
				}
			} else {
				e.html("￥<strong>" + f[0] + "</strong>." + f[1])
			}
		}
	}
	if (g.priceType == "7-1" || g.priceType == "7-2" || g.priceType == "7-3" || g.priceType == "7-4" || g.priceType == "8-1" || g.priceType == "8-2" || g.priceType == "8-3" || g.priceType == "8-4") {
		a.addClass("goods-yyyd");
		l = true;
		if (g.priceType == "7-1" || g.priceType == "7-2" || g.priceType == "7-3" || g.priceType == "7-4") {
			b = $('<i class="yy">预约</i>');
			j = $('<i class="yy">预约</i>');
			h = $('<div class="mask-layer">正在预约</div>')
		} else {
			if (g.priceType == "8-1" || g.priceType == "8-3") {
				b = $('<i class="yd">预订</i>');
				j = $('<i class="yd">预订</i>');
				h = $('<div class="mask-layer">正在预订</div>')
			} else {
				if (g.priceType == "8-2" || g.priceType == "8-4") {
					b = $('<i class="djt">定金团</i>');
					j = $('<i class="djt">定金团</i>');
					h = $('<div class="mask-layer">正在预订</div>')
				}
			}
		}
		a.find(".txt").find("p.product-label").append(j);
		a.find(".price").find(".price-txt").find("em.product-label").append(b);
		i.append(h)
	}
	return l
}

function getCollect(b) {
	var e = arguments[1];
	var d = b.collection;
	var a = "span";
	var c = $(a + "[name='" + b.cmmdtyCode + "']");
	if (d == 1) {
		if (!e.hasClass("collection-on")) {
			e.addClass("collection-on")
		}
		e.find(".position-right-bottom").html('<i class="collection">已收藏</i>')
	}
}

function getLablePicture(a) {
	var c = arguments[1];
	var b = a.text;
	if (b) {
		c.find(".img").append('<div class="position-left-top">' + b + "</div>")
	}
}

function getEnergy(d) {
	var e = arguments[1];
	var b = d.energySubsidy;
	var a = $('<i class="jnbt">节能补贴</i>');
	var c = $('<i class="jnbt">节能补贴</i>');
	if (b == 1) {
		e.find(".price").find(".price-txt").find(".product-label").append(a);
		e.find(".txt").find("p.product-label").append(c)
	}
}

function getBizCode(b) {
	var c = arguments[1];
	var a = b.bizCode;
	if (a == "0000000000") {
		c.find(".txt").find(".name").prepend("<i class='project-label'>自营</i>")
	}
}

function getInvStatus(c) {
	var g = c.invStatus;
	var f = arguments[1];
	var d = f.find("div.position-right-bottom");
	var e = d.find("div").hasClass("mask-layer");
	var b = "";
	var a = f.attr("searchtype");
	if (g == 2) {
		if (!e) {
			f.addClass("no-goods collection-on");
			b = $('<div class="mask-layer">无货</div>');
			d.append(b)
		}
	} else {
		if (g == 3) {
			if (!e) {
				f.addClass("no-goods collection-on");
				b = $('<div class="mask-layer">暂不销售</div>');
				d.append(b)
			}
		}
	}
	if (sszxskg) {
		if (a != "1" && !e) {
			if (g == 2 || g == 3) {
				f.append('<a name="' + md_prefix + '_none_sph_xs" href="http://rec.suning.com/show/mfind/' + c.bizCode + "/" + c.cmmdtyCode.substring(9, 18) + '.htm" class="find-similar">找相似</a>')
			}
		}
	}
}

function getOverseas(a) {
	var c = arguments[1];
	var b = a.oversea;
	if (b == 1) {
		c.find(".txt").find(".name").prepend("<i class='project-label hwg'>海外购</i>")
	}
}

function geBtigPromotion(g) {
	var a = arguments[1];
	var f = ztcx_big_img;
	var e = a.find(".price").find(".product-label").find("i").length;
	var c = a.find(".txt").find("p.product-label");
	var h = a.find(".price").find(".price-txt");
	var d;
	var i = g.bigPromotion;
	var b;
	if (ztcx_img == "" || ztcx_big_img == "") {
		return
	}
	if (i == "1") {
		if (e > 0) {
			d = $('<i class="special-s"><img src="' + ztcx_img + '"></i>');
			b = $('<i class="special-s"><img src="' + ztcx_img + '"></i>')
		} else {
			d = $('<i class="special-b"><img src="' + ztcx_big_img + '"></i>');
			b = $('<i class="special-b"><img src="' + ztcx_big_img + '"></i>')
		}
		c.prepend(b);
		a.find(".price").find(".price-txt").find(".product-label").prepend(d)
	}
}

function getVendorName(c) {
	var g = arguments[1];
	var d = c.vendorName;
	var b = c.storeStock;
	var f = c.distance;
	if (!_goodHasSaleCode) {
		var e = '<p class="shop-name">';
		if (f && b == 1) {
			e += "距离您<i>" + f + "</i>km的<em>苏宁门店有货</em>"
		} else {
			if (b == 1) {
				e += "<em>苏宁门店有货</em>"
			} else {
				e += d
			}
		}
		e += "</p>";
		var a = $(e);
		g.find(".price").append(a)
	} else {
		if (b == 1) {
			var e = "";
			if (f && b == 1) {
				e = "距离您<i>" + f + "</i>km的<em>苏宁门店有货</em>"
			} else {
				if (b == 1) {
					e = "<em>苏宁门店有货</em>"
				}
			}
			g.find(".price .shop-name").html(e)
		}
	}
}

function addProid(a) {
	var c = arguments[1];
	var b = c.find(".link").attr("id") + a.bizCode + "_" + a.cmmdtyCode.substring(9, 18) + "_0_" + a.storeStock;
	c.find(".link").attr("id", b)
}

function runAnalyseExpoBaoguang(a) {
	if (typeof(saExportUtil) != "undefined") {
		saExportUtil.sendCustomExpoData(a, 1)
	}
}

function getGotoUrl(c) {
	var d = arguments[1];
	var b = d.attr("subCode");
	if (c.subCode && b) {
		var a = URLPrefix.mobileProductUrl + "/product/" + c.bizCode + "/" + c.subCode.substring(9, 18) + ".html";
		d.find(".link").attr("href", a)
	} else {
		if (!c.subCode && b) {
			var a = URLPrefix.mobileProductUrl + "/product/" + c.bizCode + "/" + d.attr("partnumberid") + ".html";
			d.find(".link").attr("href", a)
		}
	}
}

function getImageUrl(f) {
	var g = arguments[1];
	var b = g.attr("subCode");
	var d = g.attr("picversion");
	var e = g.find(".link").attr("isFlag");
	var a = g.find(".img-occupied").find("img").attr("data-src");
	if (e > 0) {
		return
	}
	if (f.subCode) {
		var c = getRecProductImgUrl2(f.subCode, f.bizCode);
		if (f.subCodeImageVersion) {
			c = getRecProductImgUrl2(f.subCode, f.bizCode) + "?ver=" + f.subCodeImageVersion
		}
		g.find(".img-occupied").find("img").attr("data-src", c)
	} else {
		if (!f.subCode) {
			var c = getRecProductImgUrl2(f.cmmdtyCode, f.bizCode);
			if (d) {
				c = getRecProductImgUrl2(f.cmmdtyCode, f.bizCode) + "?ver=" + d
			}
			g.find(".img-occupied").find("img").attr("data-src", c)
		}
	}
	lazyload(".lazyimg")
}; 