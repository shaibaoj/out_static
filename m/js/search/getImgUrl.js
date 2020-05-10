/* FILE BEGIN common/script/getImgUrl.js */
function getPrdImgUrl(f) {
	var d = "http://image?.suning.cn";
	var e = parseInt("5");
	d = d.replace("?", parseInt(Math.floor(Math.random() * 10) % e + 1));
	if (f) {
		d = d + "/b2c/catentries/" + f + "_1_400x400.jpg"
	}
	return d
}

function getRecProductImgUrl(c) {
	var d = cutPrefix(c, 18);
	return getProducImgUrlPath() + "/" + d + "_1_400x400.jpg"
}

function getRecProductImgUrl2(i, j, k) {
	i = cutPrefix(i, 18);
	if (j) {
		k = k || cutPrefix(j, 10);
		var h = k + "-";
		var l = getProductDomainData();
		var d = tiledImgDomain.replace("{number}", l.num);
		return d + h + i + "_1_400x400.jpg"
	}
	return getProducImgUrlPath() + "/" + i + "_1_400x400.jpg"
}

function getRecProductImgUrl3(j, k, l, m) {
	j = cutPrefix(j, 18);
	if (k) {
		m = l = "0000000000"
	}
	if (l) {
		m = m || cutPrefix(l, 10);
		var i = m + "-";
		var n = getProductDomainData();
		var d = tiledImgDomain.replace("{number}", n.num);
		return d + i + j + "_1_400x400.jpg"
	}
	return getProducImgUrlPath() + "/" + j + "_1_400x400.jpg"
}

function getProducImgUrlPath() {
	return getProducImgUrlPrefix() + "b2c/catentries"
}

function getProducImgUrlPrefix() {
	var b = getProductDomainData();
	return "http://" + b.domain + "image" + b.num + ".suning.cn/"
}

function getProductDomainData() {
	var c, d;
	if (typeof pageGlobalJsParam != "undefined") {
		c = Math.floor(Math.random() * pageGlobalJsParam.imageServerNum + 1);
		d = pageGlobalJsParam.prdImageDomain
	} else {
		c = 1;
		d = ""
	}
	return {
		domain: d,
		num: c
	}
}

function cutPrefix(g, k) {
	if (g.length == k) {
		return g
	}
	if (g.length > k) {
		var i = /[0-9]+([0-9]{9})/;
		if (i.test(g)) {
			g = g.match(i)[1] + ""
		}
		return g
	}
	var l = k - g.length;
	var h = "";
	for (var j = 0; j < l; j++) {
		h += "0"
	}
	return h + g
}

function getPrdSmallImgUrl(f) {
	var d = "http://image?.suning.cn";
	var e = parseInt("5");
	d = d.replace("?", parseInt(Math.floor(Math.random() * 10) % e + 1));
	if (f) {
		d = d + "/b2c/catentries/" + f + "_1_400x400.jpg"
	}
	return d
}

function getPrdSmallImgUrl2(j, i) {
	if (!i) {
		return getPrdSmallImgUrl(j)
	}
	if (i) {
		i = cutPrefix(i, 10);
		var g = i + "-";
		var h = parseInt(Math.floor(Math.random() * 10) % 5 + 1);
		var f = tiledImgDomain.replace("{number}", h);
		return f + g + j + "_1_400x400.jpg"
	}
}

function getPriceImgUrl(g, h, j) {
	var i = "http://price?.suning.cn";
	var f = parseInt("2");
	i = i.replace("?", parseInt(Math.floor(Math.random() * 10) % f + 1));
	if (g) {
		i = i + "/webapp/wcs/stores/prdprice/" + g.substring(9, 18) + "_" + j + "_" + h + "_9-1.png"
	}
	return i
}

function getPriceImgUrlFromProId(g, h, j) {
	var i = "http://price?.suning.cn";
	var f = parseInt("2");
	i = i.replace("?", parseInt(Math.floor(Math.random() * 10) % f + 1));
	if (g) {
		i = i + "/webapp/wcs/stores/prdprice/" + g + "_" + j + "_" + h + "_9-1.png"
	}
	return i
}

function getImgUrl(k, j, l, i) {
	var d = getProductDomainData();
	var h = activeImgDome.replace("{number}", d.num);
	return h + j + k + l + "?v=" + i
}; 