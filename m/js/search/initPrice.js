/* FILE BEGIN search/script/search/initPrice.js */
var susearch = susearch || {};
susearch.PriceClass = function() {
	var h = this;
	var i = "9173";
	var f = "span";
	var g = [];
	var a = null;
	var c = 0;
	var e = false;
	h.addQueue = function(j) {
		if (!j) {
			return
		}
		var l = {};
		if ($.isArray(j)) {
			l.lists = j.slice(0)
		} else {
			var k = j.lists;
			if ($.isArray(k)) {
				l.lists = k.slice(0)
			} else {
				if (typeof k == "string") {
					l.lists = [k]
				}
			}
		}
		l.cityId = j.cityId || i;
		l.tagName = j.tagName || f;
		g.push(l)
	};
	h.loadPrice = function() {
		if (e) {
			return
		}
		e = true;
		b()
	};

	function b() {
		var l = d();
		if (!l) {
			e = false;
			return
		}
		var p = l.data.split("_");
		var n = p[0];
		var o = p[1];
		var m = "_" + l.cityId + "_" + n + "|||";
		var j = l.tagName;
		if (o != "0000000000" && o != "0" && o != undefined) {
			m = m + o
		}
		var k = URLPrefix.commerce_emall + "/priceService" + m + "_5_priceServiceCallBack_.html";
		$.ajax({
			url: k,
			dataType: "jsonp",
			jsonp: false,
			jsonpCallback: "priceServiceCallBack",
			timeout: 3000,
			cache: true,
			error: function(q, s, r) {
				$(j + "[name='" + transferProcode(n) + "']").html("<em>暂无报价</em>")
			},
			success: function(q) {
				if (q) {
					$.each(q.price, function(r, s) {
						if (j) {
							$(j + "[name='" + s.partNumber + "']").html("￥" + s.promotionPrice.toFixed(2))
						} else {
							$("#" + s.partNumber).html("￥" + s.promotionPrice.toFixed(2))
						}
					});
					if (q.price.length == 0 && j && j != "i") {
						if (!$(j + "[name='" + transferProcode(n) + "']").parents("li").find(".img").find("p").hasClass("nsale")) {
							$(j + "[name='" + transferProcode(n) + "']").parents("li").find(".img").append("<p class='nsale'>暂不销售</p>")
						}
						$(j + "[name='" + transferProcode(n) + "']").html("<em>暂无报价</em>")
					}
				}
				setTimeout(b, 0)
			}
		})
	}

	function d() {
		if (!a) {
			if (g.length > 0) {
				a = g[0];
				c = 0
			}
		}
		if (!a) {
			return null
		}
		var j = a.lists;
		if (c >= j.length) {
			g.shift();
			if (g.length > 0) {
				a = g[0];
				c = 0;
				var k = a.lists[c];
				c++;
				return {
					data: k,
					cityId: a.cityId,
					tagName: a.tagName
				}
			}
			a = null;
			c = 0;
			return null
		} else {
			var k = j[c];
			c++;
			return {
				data: k,
				cityId: a.cityId,
				tagName: a.tagName
			}
		}
	}
	h.next = d;
	return h
};
susearch.priceUtil = new susearch.PriceClass();

function initPrice(b, a) {
	susearch.priceUtil.addQueue({
		lists: skuIds,
		cityId: b,
		tagName: a
	});
	susearch.priceUtil.loadPrice()
}

function initPrice3(b, c, a) {
	susearch.priceUtil.addQueue({
		lists: [b],
		cityId: c,
		tagName: a
	});
	susearch.priceUtil.loadPrice()
}

function transferProcode(d) {
	var b = "";
	if (d) {
		if (d.length <= 18) {
			var a = 18 - d.length;
			for (var c = 0; c < a; c++) {
				b += "0"
			}
		}
	}
	return b + d
}; 