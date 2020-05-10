function HashMap() {
	this.keys = new Array();
	this.data = new Object();
	this.put = function(a, b) {
		if (this.data[a] == null) {
			this.keys.push(a)
		}
		this.data[a] = b
	};
	this.get = function(a) {
		return this.data[a]
	};
	this.remove = function(a) {
		if (this.get(a) != null) {
			delete this.data[a]
		}
	}
}
var _samap = new HashMap();

function _searchDataSaPush(o, B, c, p) {
	try {
		if (!o) {
			o = 0
		}
		var u = document.location.href,
			v = u.substring(u.indexOf("?") + 1, u.length),
			C = v.split("&"),
			F = new HashMap();
		for (var s = 0; s < C.length; s++) {
			var t = C[s].split("=");
			for (var x = 0; x < t.length; x++) {
				F.put(t[x], t[++x])
			}
		}
		var D = "";
		if (B) {
			D = B.replace(/%7C/g, "")
		} else {
			var r = document.getElementById("keyword");
			D = r ? r.value.replace(/%7C/g, "") : "keyword undefined"
		}
		var w = "";
		if (c) {
			w = c.replace(/%7C/g, "")
		} else {
			var A = document.getElementById("kuozhan_key_words");
			w = A ? A.value.replace(/%7C/g, "") : ""
		}
		var m = D;
		var G = "*:*";
		var b = "";
		var n = document.getElementById("replace_key_words");
		if (n != undefined) {
			var a = n.value;
			if (a != undefined && a != null && a != "") {
				var E = a.split(G);
				if (E.length >= 2) {
					b = E[0];
					m = E[1];
					m = m ? m.replace(/%7C/g, "") : "replaceword undefined";
					b = b ? b.replace(/%7C/g, "") : "keyword undefined"
				}
			}
		}
		var l = o,
			k = "0",
			j = document.getElementById("sa_splited_key_words"),
			h = j ? j.value : "splitedKeyword undefined",
			q = F.get("ci"),
			g = q ? q : "",
			y = F.get("catalogId"),
			f = y ? y : "",
			d = [m, l, k, h, g, f, b, w, p];
		_samap.put("_saSearchDatas", d)
	} catch (z) {}
};