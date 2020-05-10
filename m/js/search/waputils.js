/* FILE BEGIN common/script/waputils.js */

function wapFormatURL(a) {
	a = hasAndRepalceSpecialCharater(a, /\%/g, "%25");
	a = hasAndRepalceSpecialCharater(a, /\+/g, "%2B");
	a = hasAndRepalceSpecialCharater(a, /\#/g, "%23");
	a = hasAndRepalceSpecialCharater(a, /\&/g, "%26");
	a = hasAndRepalceSpecialCharater(a, /\?/g, "%3F");
	a = hasAndRepalceSpecialCharater(a, /\ /g, "%20");
	a = hasAndRepalceSpecialCharater(a, /\//g, "%2F");
	return a
}

function hasAndRepalceSpecialCharater(c, a, b) {
	if (a.test(c)) {
		return c.replace(a, b)
	}
	return c
}

function trim(b) {
	var a = /(^\s*)|(\s*$)/g;
	if (a.test(b)) {
		return b.replace(a, "")
	}
	return b
}

function wapSubString(b, h, c, k) {
	var f = 0;
	var a = "";
	var d = /[^-ÿ]/g;
	var j = "";
	var e = b.replace(d, "**").length;
	for (var g = 0; g < e; g++) {
		j = b.charAt(g).toString();
		if (j.match(d) != null) {
			f += 2;
			if (c) {
				h++
			}
		} else {
			f++
		}
		if (f > h) {
			break
		}
		a += j
	}
	if (k && e > h) {
		a += "..."
	}
	return a
}; 