/* FILE BEGIN common/script/searchMd5.js */

function MD5(c) {
	var b = 0;

	function l(q) {
		return k(a(g(q)))
	}

	function a(q) {
		return d(i(e(q), q.length * 8))
	}

	function k(u) {
		try {
			b
		} catch (r) {
			b = 0
		}
		var q = b ? "0123456789ABCDEF" : "0123456789abcdef";
		var t = "";
		var s;
		for (var v = 0; v < u.length; v++) {
			s = u.charCodeAt(v);
			t += q.charAt((s >>> 4) & 15) + q.charAt(s & 15)
		}
		return t
	}

	function g(u) {
		var t = "";
		var q = -1;
		var s, r;
		while (++q < u.length) {
			s = u.charCodeAt(q);
			r = q + 1 < u.length ? u.charCodeAt(q + 1) : 0;
			if (55296 <= s && s <= 56319 && 56320 <= r && r <= 57343) {
				s = 65536 + ((s & 1023) << 10) + (r & 1023);
				q++
			}
			if (s <= 127) {
				t += String.fromCharCode(s)
			} else {
				if (s <= 2047) {
					t += String.fromCharCode(192 | ((s >>> 6) & 31), 128 | (s & 63))
				} else {
					if (s <= 65535) {
						t += String.fromCharCode(224 | ((s >>> 12) & 15), 128 | ((s >>> 6) & 63), 128 | (s & 63))
					} else {
						if (s <= 2097151) {
							t += String.fromCharCode(240 | ((s >>> 18) & 7), 128 | ((s >>> 12) & 63), 128 | ((s >>> 6) & 63), 128 | (s & 63))
						}
					}
				}
			}
		}
		return t
	}

	function e(q) {
		var s = Array(q.length >> 2);
		for (var r = 0; r < s.length; r++) {
			s[r] = 0
		}
		for (var r = 0; r < q.length * 8; r += 8) {
			s[r >> 5] |= (q.charCodeAt(r / 8) & 255) << (r % 32)
		}
		return s
	}

	function d(q) {
		var s = "";
		for (var r = 0; r < q.length * 32; r += 8) {
			s += String.fromCharCode((q[r >> 5] >>> (r % 32)) & 255)
		}
		return s
	}

	function i(y, t) {
		y[t >> 5] |= 128 << ((t) % 32);
		y[(((t + 64) >>> 9) << 4) + 14] = t;
		var x = 1732584193;
		var w = -271733879;
		var v = -1732584194;
		var u = 271733878;
		for (var q = 0; q < y.length; q += 16) {
			var s = x;
			var r = w;
			var A = v;
			var z = u;
			x = j(x, w, v, u, y[q + 0], 7, -680876936);
			u = j(u, x, w, v, y[q + 1], 12, -389564586);
			v = j(v, u, x, w, y[q + 2], 17, 606105819);
			w = j(w, v, u, x, y[q + 3], 22, -1044525330);
			x = j(x, w, v, u, y[q + 4], 7, -176418897);
			u = j(u, x, w, v, y[q + 5], 12, 1200080426);
			v = j(v, u, x, w, y[q + 6], 17, -1473231341);
			w = j(w, v, u, x, y[q + 7], 22, -45705983);
			x = j(x, w, v, u, y[q + 8], 7, 1770035416);
			u = j(u, x, w, v, y[q + 9], 12, -1958414417);
			v = j(v, u, x, w, y[q + 10], 17, -42063);
			w = j(w, v, u, x, y[q + 11], 22, -1990404162);
			x = j(x, w, v, u, y[q + 12], 7, 1804603682);
			u = j(u, x, w, v, y[q + 13], 12, -40341101);
			v = j(v, u, x, w, y[q + 14], 17, -1502002290);
			w = j(w, v, u, x, y[q + 15], 22, 1236535329);
			x = n(x, w, v, u, y[q + 1], 5, -165796510);
			u = n(u, x, w, v, y[q + 6], 9, -1069501632);
			v = n(v, u, x, w, y[q + 11], 14, 643717713);
			w = n(w, v, u, x, y[q + 0], 20, -373897302);
			x = n(x, w, v, u, y[q + 5], 5, -701558691);
			u = n(u, x, w, v, y[q + 10], 9, 38016083);
			v = n(v, u, x, w, y[q + 15], 14, -660478335);
			w = n(w, v, u, x, y[q + 4], 20, -405537848);
			x = n(x, w, v, u, y[q + 9], 5, 568446438);
			u = n(u, x, w, v, y[q + 14], 9, -1019803690);
			v = n(v, u, x, w, y[q + 3], 14, -187363961);
			w = n(w, v, u, x, y[q + 8], 20, 1163531501);
			x = n(x, w, v, u, y[q + 13], 5, -1444681467);
			u = n(u, x, w, v, y[q + 2], 9, -51403784);
			v = n(v, u, x, w, y[q + 7], 14, 1735328473);
			w = n(w, v, u, x, y[q + 12], 20, -1926607734);
			x = o(x, w, v, u, y[q + 5], 4, -378558);
			u = o(u, x, w, v, y[q + 8], 11, -2022574463);
			v = o(v, u, x, w, y[q + 11], 16, 1839030562);
			w = o(w, v, u, x, y[q + 14], 23, -35309556);
			x = o(x, w, v, u, y[q + 1], 4, -1530992060);
			u = o(u, x, w, v, y[q + 4], 11, 1272893353);
			v = o(v, u, x, w, y[q + 7], 16, -155497632);
			w = o(w, v, u, x, y[q + 10], 23, -1094730640);
			x = o(x, w, v, u, y[q + 13], 4, 681279174);
			u = o(u, x, w, v, y[q + 0], 11, -358537222);
			v = o(v, u, x, w, y[q + 3], 16, -722521979);
			w = o(w, v, u, x, y[q + 6], 23, 76029189);
			x = o(x, w, v, u, y[q + 9], 4, -640364487);
			u = o(u, x, w, v, y[q + 12], 11, -421815835);
			v = o(v, u, x, w, y[q + 15], 16, 530742520);
			w = o(w, v, u, x, y[q + 2], 23, -995338651);
			x = f(x, w, v, u, y[q + 0], 6, -198630844);
			u = f(u, x, w, v, y[q + 7], 10, 1126891415);
			v = f(v, u, x, w, y[q + 14], 15, -1416354905);
			w = f(w, v, u, x, y[q + 5], 21, -57434055);
			x = f(x, w, v, u, y[q + 12], 6, 1700485571);
			u = f(u, x, w, v, y[q + 3], 10, -1894986606);
			v = f(v, u, x, w, y[q + 10], 15, -1051523);
			w = f(w, v, u, x, y[q + 1], 21, -2054922799);
			x = f(x, w, v, u, y[q + 8], 6, 1873313359);
			u = f(u, x, w, v, y[q + 15], 10, -30611744);
			v = f(v, u, x, w, y[q + 6], 15, -1560198380);
			w = f(w, v, u, x, y[q + 13], 21, 1309151649);
			x = f(x, w, v, u, y[q + 4], 6, -145523070);
			u = f(u, x, w, v, y[q + 11], 10, -1120210379);
			v = f(v, u, x, w, y[q + 2], 15, 718787259);
			w = f(w, v, u, x, y[q + 9], 21, -343485551);
			x = h(x, s);
			w = h(w, r);
			v = h(v, A);
			u = h(u, z)
		}
		return Array(x, w, v, u)
	}

	function p(t, q, v, u, s, r) {
		return h(m(h(h(q, t), h(u, r)), s), v)
	}

	function j(w, v, t, s, u, r, q) {
		return p((v & t) | ((~v) & s), w, v, u, r, q)
	}

	function n(w, v, t, s, u, r, q) {
		return p((v & s) | (t & (~s)), w, v, u, r, q)
	}

	function o(w, v, t, s, u, r, q) {
		return p(v ^ t ^ s, w, v, u, r, q)
	}

	function f(w, v, t, s, u, r, q) {
		return p(t ^ (v | (~s)), w, v, u, r, q)
	}

	function h(s, r) {
		var q = (s & 65535) + (r & 65535);
		var t = (s >> 16) + (r >> 16) + (q >> 16);
		return (t << 16) | (q & 65535)
	}

	function m(q, r) {
		return (q << r) | (q >>> (32 - r))
	}
	return l(c)
};