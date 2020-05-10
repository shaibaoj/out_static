/* FILE BEGIN search/script/search/product.js */
var wap = wap || {};
wap.pager = function() {
	var b = this;
	var d = 0;
	var c = 0;
	var a = 20;
	b.setPageSize = function(e) {
		a = e || 20;
		return b
	};
	b.setTotalCount = function(e) {
		d = e;
		return b
	};
	b.setCurrentPage = function(e) {
		c = e || 0;
		return b
	};
	b.getPageSize = function() {
		return a
	};
	b.getTotalCount = function() {
		return d
	};
	b.getCurrentPage = function() {
		return c
	};
	b.getPageCount = function() {
		return parseInt((d - 1) / a + 1)
	};
	b.hasNextPage = function() {
		var e = b.getPageCount();
		return c < e - 1
	};
	return b
};
wap.product = (function() {
	var d = new wap.pager();
	var e = null;
	var g = null;
	var f = null;
	var b = false;
	d.init = function() {
		a();
		c();
		delete d.init
	};

	function a() {
		e = $("#productsList");
		g = e.parent()
	}

	function c() {}
	d.setLoading = function(i) {
		b = i;
		if (i && !f) {
			var h = '<div id="loading"><div class="sn-html5-loading" style="margin:100px auto;"><div class="blueball"></div><div class="orangeball"></div></div></div>';
			f = $(h);
			$("#productsList").html(f)
		} else {
			if (f) {
				f.remove().empty();
				f = null
			}
		}
		return d
	};
	d.isLoading = function() {
		return b
	};
	d.clearProducts = function() {
		e.empty();
		_startIndex = 0;
		return d
	};
	d.addProduct = function(I, l) {
		var J = I.extenalFileds["overseas"];
		var v = "";
		if (J != null && typeof J != undefined) {
			v = J[0]
		}
		if (!I) {
			return d
		}
		var i = I.extenalFileds.bundleType || "";
		var af = [URLPrefix.commerce_emall, "/sprdpromon_10052_10051_"];
		af.push(I.catentryId);
		af.push("_");
		af.push(searcher.searchParams.cityId);
		af.push("_.html");
		var ae = af.join("");
		var ah = "";
		var N = "";
		var ab = wap.filter.getFilter();
		var A = ab.ct == "2";
		if (A) {
			ah = "2";
			N = "0000000000"
		} else {
			if (v != null && typeof v != undefined && v != "") {
				ah = "2"
			} else {
				ah = "1"
			}
		}
		var n = "";
		var u = "";
		var q = "";
		var K = "";
		var D = "";
		if (I.contractInfos) {
			ah = "100";
			N = "";
			var z = I.contractInfos.split("@");
			if (z.length == 4) {
				n = z[0];
				u = z[1];
				q = z[2];
				K = z[3]
			}
			if (I.inventory < 1 || I.saleStatus > 0) {
				D = "no-goods collection-on"
			}
		}
		var E = ah + "-" + N + "-2-";
		if (i === "") {
			i = "null"
		}
		var T = I.extenalFileds.GD;
		if (T == undefined || T == "") {
			T = ""
		}
		var m = I.extenalFileds.subs;
		if (m == undefined || m == "") {
			m = ""
		}
		var H = I.extenalFileds.picVersion;
		if (H == undefined || H == "") {
			H = ""
		}
		var X = '<li id="' + I.catentryId + '" partnumberid="' + I.partnumber + '" type="' + E + '" data-catentryId2="' + n + '" data-partnumber2="' + u + '" data-contract-sell-type="' + q + '" data-operator-code="' + K + '" app-url="' + ae + '" packagestype="' + i + '" overseascode ="' + v + '" subCode="' + m + '" picVersion="' + H + '"  searchtype="' + T + '" data-sale-code="' + (I.salesCode || "") + '" class="' + D + '"></li>';
		var W = $(X);
		var t = "";
		var j = false;
		index_i++;
		var O = "";
		var x = "";
		if (I.extenalFileds && I.extenalFileds.specialSell) {
			j = true;
			t = URLPrefix.mobileSpecialSellProductUrl + "/mp/0000000000/" + I.partnumber + ".html";
			O = md_prefix + "_none_sph_sp" + index_i;
			if (I.contractInfos) {
				t = URLPrefix.mobileSpecialSellProductUrl + "/mp/0000000000/" + u + "-" + K + "-" + q + ".html";
				O = md_prefix + "_none_sph_sp" + index_i + "-p"
			}
		} else {
			if (I.salesCode) {
				t = URLPrefix.mobileProductUrl + "/product/" + I.salesCode10 + "/" + I.partnumber + ".html";
				if (I.contractInfos) {
					t = URLPrefix.mobileProductUrl + "/product/" + I.salesCode10 + "/" + u + "-" + K + "-" + q + ".html"
				}
				O = md_prefix + "_none_sph_sp" + index_i + "-p"
			} else {
				O = md_prefix + "_none_sph_sp" + index_i;
				t = URLPrefix.mobileProductUrl + "/product/" + I.partnumber + ".html";
				if (I.contractInfos) {
					t = URLPrefix.mobileProductUrl + "/product/" + u + "-" + K + "-" + q + ".html"
				}
				if (v) {
					t = URLPrefix.mobileProductUrl + "/product/" + v + "/" + I.partnumber + ".html";
					if (I.contractInfos) {
						t = URLPrefix.mobileProductUrl + "/product/" + v + "/" + u + "-" + K + "-" + q + ".html"
					}
				}
			}
		}
		if (md_prefix == "wapssjgy") {
			x = "wapssjgy_search_pro_baoguang_1_" + index_i + "_"
		} else {
			if (pro_prefix == "wapfllby" && $("#cateoryFlag").val()) {
				var L = $("#fileterCi").val();
				x = "wapfllby_" + L + "_pro_baoguang_1_" + index_i + "_"
			}
		}
		var ai = "";
		if (I.extenalFileds && I.extenalFileds.subs) {
			ai = $('<a class="link" name="' + O + '" isFlag="0"  id="' + x + '" ></a>')
		} else {
			ai = $('<a class="link" name="' + O + '" isFlag="1"  id="' + x + '" href="' + t + '"></a>')
		}
		var R = "000000000" + I.partnumber;
		var M = $('<div class="img"></div>');
		var V = $('<div class="position-left-top"></div>');
		var R = "000000000" + I.partnumber;
		var s = "";
		if (!m) {
			if (H != "") {
				s = getRecProductImgUrl2(u || R, I.salesCode, I.salesCode10) + "?ver=" + H
			} else {
				s = getRecProductImgUrl2(u || R, I.salesCode, I.salesCode10)
			}
		}
		var ad = I.inventory;
		var ag = I.saleStatus;
		var aa = $('<div class="img-occupied" d-width="100px"></div>');
		var ac = $('<img data-src="' + s + '"/>');
		var h = "";
		if (I.contractInfos) {
			if (I.saleStatus > 0) {
				h = $('<div class="position-right-bottom"><div class="mask-layer">不可销售</div></div>')
			} else {
				if (I.inventory < 1) {
					h = $('<div class="position-right-bottom"><div class="mask-layer">无货</div></div>')
				}
			}
		} else {
			h = $('<div class="position-right-bottom"></div>')
		}
		var p = $('<div class="txt"></div>');
		var y = $('<p class="name">' + I.catentdesc + "</p>");
		var S = $('<p class="product-label"></p>');
		var r = $('<div class="price"></div>');
		var U = $('<p class="price-box"> </p>');
		var o = $(' <span class="price-txt" id="sp' + I.catentryId + '"></span>');
		var C = $('<em class="price-num"></em>');
		var F = $('<em class="product-label"></em>');
		var Z = $('<p class="shop-num"></p>');
		var B = I.countOfarticle;
		if (B > 0) {
			var G = $("<em>评论<i>" + I.countOfarticle + "</i>条</em>");
			Z.append(G)
		} else {
			var G = $("<em><i></i></em>");
			Z.append(G)
		}
		var Y = I.praiseRate;
		if (Y) {
			var Q = Y.substring(0, 1);
			if (Q > 0) {
				var P = $('<em class="evaluate">好评率<i>' + Y + "</i></em>");
				Z.append(P)
			}
		} else {
			var P = $('<em class="evaluate"><i></i></em>');
			Z.append(P)
		}
		aa.append(ac);
		M.append(aa);
		M.append(h);
		p.append(y);
		p.append(S);
		o.append(C);
		o.append(F);
		U.append(o);
		r.append(U);
		r.append(Z);
		if (_goodHasSaleCode) {
			var k = (I.salesCode == "0000000000") ? "苏宁自营" : (I.salesName || "");
			r.append('<p class="shop-name">' + k + "</p>")
		}
		p.append(r);
		ai.append(M).append(p);
		W.append(ai);
		var w = l || e;
		w.append(W)
	};
	d.addProduct1 = function(I, l) {
		var v = "";
		if (!I) {
			return d
		}
		var af = [URLPrefix.commerce_emall, "/sprdpromon_10052_10051_"];
		af.push(I.catentryId);
		af.push("_");
		af.push(searcher.searchParams.cityId);
		af.push("_.html");
		var ae = af.join("");
		var ah = "";
		var N = "";
		var ab = wap.filter.getFilter();
		var A = ab.ct == "2";
		if (A) {
			ah = "2";
			N = "0000000000"
		} else {
			if (v != null && typeof v != undefined && v != "") {
				ah = "2"
			} else {
				ah = "1"
			}
		}
		var n = "";
		var u = "";
		var q = "";
		var K = "";
		var D = "";
		if (I.contractInfos) {
			ah = "100";
			N = "";
			var z = I.contractInfos.split("@");
			if (z.length == 4) {
				n = z[0];
				u = z[1];
				q = z[2];
				K = z[3]
			}
			if (I.inventory < 1 || I.saleStatus > 0) {
				D = "no-goods collection-on"
			}
		}
		var E = ah + "-" + N + "-2-";
		
		ae = URLPrefix.search_mobileUrl + "/item.php?numIid=" + I.auctionId;
		
		var T = ""
		var m = ""
		var H = ""
		var X = '<li id="' + I.auctionId + '" data-item-id="' + I.auctionId + '" data-seller-id="' + I.sellerId + '" data-money="' + I.zkPrice + '" app-url="' + ae + '" class="' + D + '"></li>';
		var W = $(X);
		var t = "";
		var j = false;
		index_i++;
		var O = "";
		var x = "";
		
		t = URLPrefix.search_mobileUrl + "/item.php?numIid=" + I.auctionId;
		O = md_prefix + "_none_sph_sp" + index_i;
		x = "wapssjgy_search_pro_baoguang_1_" + index_i + "_"
		
		var ai = "";
		ai = $('<a class="link" name="' + O + '" isFlag="1"  id="' + x + '" href="' + t + '"></a>')
		
		var R = "000000000" + I.partnumber;
		var M = $('<div class="img"></div>');
		var V = $('<div class="position-left-top"></div>');
		var R = "000000000" + I.partnumber;
		var s = "";
		if (!m) {
			if (H != "") {
				s = getRecProductImgUrl2(u || R, I.salesCode, I.salesCode10) + "?ver=" + H
			} else {
				s = getRecProductImgUrl2(u || R, I.salesCode, I.salesCode10)
			}
		}
		s=I.pictUrl+"_400x400_.webp";
		var ad = I.inventory;
		var ag = I.saleStatus;
		var aa = $('<div class="img-occupied" d-width="100px"></div>');
		var ac = $('<img data-src="' + s + '"/>');
		var h = "";
		if (I.contractInfos) {
			if (I.saleStatus > 0) {
				h = $('<div class="position-right-bottom"><div class="mask-layer">不可销售</div></div>')
			} else {
				if (I.inventory < 1) {
					h = $('<div class="position-right-bottom"><div class="mask-layer">无货</div></div>')
				}
			}
		} else {
			h = $('<div class="position-right-bottom"></div>')
		}
		
		var q = parseFloat(I.zkPrice).toFixed(2);
		var u = q.split(".");
		
		var p = $('<div class="txt"></div>');
		var y = $('<p class="name">' + I.title + "</p>");
		var S = $('<p class="product-label"></p>');
		var r = $('<div class="price"></div>');
		var U = $('<p class="price-box"> </p>');
		var o = $(' <span class="price-txt" id="sp' + I.catentryId + '"></span>');
		var C = $('<em class="price-num">￥<strong>' + u[0] + '</strong>.' + u[1] + '</em>');
		var F = $('<em class="product-label"></em>');
		var Z = $('<p class="shop-num"></p>');
		var B = I.biz30day;
		if (B > 0) {
			var G = $("<em>月销:<i>" + I.biz30day + "</i></em>");
			Z.append(G)
		} else {
			var G = $("<em><i></i></em>");
			Z.append(G)
		}
		var Y = I.praiseRate;
		if (Y) {
			var Q = Y.substring(0, 1);
			if (Q > 0) {
				var P = $('<em class="evaluate">好评率<i>' + Y + "</i></em>");
				Z.append(P)
			}
		} else {
			var P = $('<em class="evaluate"><i></i></em>');
			Z.append(P)
		}
		aa.append(ac);
		M.append(aa);
		M.append(h);
		p.append(y);
		p.append(S);
		o.append(C);
		o.append(F);
		U.append(o);
		r.append(U);
		r.append(Z);
		var k = (I.userType == 1) ? "天猫" : ("淘宝");
		r.append('<p class="shop-name">' + k + "</p>")
		
		p.append(r);
		ai.append(M).append(p);
		W.append(ai);
		var w = l || e;
		w.append(W)
	};
	d.addProducts = function(h, i) {
		$.each(h, function(j, k) {
			d.addProduct1(k, i)
//			if (k.goodsType == "1") {
//				d.addProduct(k, i)
//			} else {
//				if (k.goodsType == "2") {
//					if ($("#channel_type").val() == "hwg" || $("#channel_type").val() != "") {} else {
//						d.addSalesPiec(k, i)
//					}
//				} else {
//					if (k.goodsType == "3") {
//						if ($("#channel_type").val() == "hwg" || $("#channel_type").val() != "") {} else {
//							d.addCrowdfunding(k, i)
//						}
//					}
//				}
//			}
		})
	};
	d.setFilter = function(h) {
		if (h) {
			$.extend(_searchParams, h)
		}
		return d
	};
	d.addSalesPiec = function(u, q) {
		if (md_prefix == "wapssjgy") {
			proId = "wapssjgy_search_pro_baoguang_1_" + index_i + "_0000000000_" + u.partnumber + "_1"
		} else {
			if (pro_prefix == "wapfllby" && $("#cateoryFlag").val()) {
				var v = $("#fileterCi").val();
				proId = "wapfllby_" + v + "_pro_baoguang_1_" + index_i + "_0000000000_" + u.partnumber + "_1"
			}
		}
		index_i++;
		var j = "_750x240.jpg";
		var p = "_370x550.jpg";
		var o = "wap1";
		var m = "wap2";
		var s = getImgUrl(u.partnumber, m, j, u.imgVision);
		var l = getImgUrl(u.partnumber, o, p, u.imgVision);
		var n = $('<li class="ad-result"></li>');
		var i = $('<a href="' + u.gotoWapURL + '" id=' + proId + '  name="' + md_prefix + "_none_sph_doufu" + index_i + '"></a>');
		var k = $('<img src="' + s + '"/>');
		var h = $('<img src="' + l + '"/>');
		i.append(k);
		i.append(h);
		n.append(i);
		var r = q || e;
		r.append(n);
		var t = n.find("a").attr("id");
		runAnalyseExpoBaoguang(t)
	};
	d.addCrowdfunding = function(x, r) {
		index_i++;
		var h = $('<li class="crowdfunding"></li>');
		if (URLPrefix.wap_zc_url) {
			var n = URLPrefix.wap_zc_url + "detail.htm?projectId=" + x.projectId
		} else {
			var n = "http://m.zc.suning.com/project/detail.htm?projectId=" + x.projectId
		}
		var i = $('<a href="' + n + '"></a>');
		var k = $('<div class="img"></div>');
		var w = $('<div class="position-left-top">众筹</div>');
		var t = $('<div class="img-occupied" d-width="100px"></div>');
		var l = $("<img data-src=" + x.mobilePicUrl + ">");
		var p = $('<div class="txt"></div>');
		var y = $('<p class="name">' + x.projectName + "</p>");
		var s = $('<div class="price"></div>');
		var z = $('<span class="price-txt"></span>');
		if (x.price) {
			var q = parseFloat(x.price).toFixed(2);
			var u = q.split(".");
			if (x.projectType == "0" || x.projectType == "2") {
				var o = $('<em class="price-num">￥<strong>' + u[0] + "</strong>." + u[1] + "起</em> ")
			} else {
				if (x.projectType == "1") {
					var o = $('<em class="price-num">￥<strong>' + u[0] + "</strong>." + u[1] + "</em> ")
				}
			}
		}
		var v = $('<div class="crowdfunding-label"></div>');
		if (x.projectType == "1") {
			var m = $("<em>精品返售</em>")
		} else {
			if (x.status == "0") {
				var m = $("<em>即将开始</em>")
			} else {
				if (x.status == "1") {
					var m = $("<em>众筹中</em>")
				}
			}
		}
		k.append(w);
		t.append(l);
		k.append(t);
		p.append(y);
		z.append(o);
		s.append(z);
		p.append(s);
		v.append(m);
		p.append(v);
		i.append(k);
		i.append(p);
		h.append(i);
		var j = r || e;
		j.append(h)
	};
	return d
})();
$(function() {
	wap.product.init()
}); 