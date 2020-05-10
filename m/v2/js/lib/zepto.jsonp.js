/* FILE BEGIN search/script/search/zepto.jsonp.js */
(function(A) {
	function y() {}

	function q(F) {
		x = [F]
	}

	function e(G, H, F) {
		return G && G.apply(H.context || H, F)
	}

	function d(F) {
		return /\?/.test(F) ? "&" : "?"
	}
	var f = "async",
		n = "charset",
		j = "",
		l = "error",
		p = "insertBefore",
		m = "_jqjsp",
		g = "on",
		B = g + "click",
		a = g + l,
		h = g + "load",
		t = g + "readystatechange",
		w = "readyState",
		k = "removeChild",
		E = "<script>",
		u = "success",
		i = "timeout",
		z = window,
		v = A.Deferred,
		C = A("head")[0] || document.documentElement,
		s = {},
		c = 0,
		x, b = {
			callback: m,
			url: location.href
		},
		r = z.opera,
		D = !! A("<div>").html("<!--[if IE]><i><![endif]-->").find("i").length;

	function o(N) {
		N = A.extend({}, b, N);
		var L = N.success,
			S = N.error,
			K = N.complete,
			ab = N.dataFilter,
			F = N.callbackParameter,
			T = N.callback,
			ac = N.cache,
			J = N.pageCache,
			M = N.charset,
			O = N.url,
			H = N.data,
			V = N.timeout,
			R, Z = 0,
			X = y,
			U, Q, I, G, P, Y;
		v && v(function(ad) {
			ad.done(L).fail(S);
			L = ad.resolve;
			S = ad.reject
		}).promise(N);
		N.abort = function() {
			!(Z++) && X()
		};
		if (e(N.beforeSend, N, [N]) === !1 || Z) {
			return N
		}
		O = O || j;
		H = H ? ((typeof H) == "string" ? H : A.param(H, N.traditional)) : j;
		O += H ? (d(O) + H) : j;
		F && (O += d(O) + encodeURIComponent(F) + "=?");
		!ac && !J && (O += d(O) + "_" + (new Date()).getTime() + "=");
		O = O.replace(/=\?(&|$)/, "=" + T + "$1");

		function aa(ad) {
			if (!(Z++)) {
				X();
				J && (s[O] = {
					s: [ad]
				});
				ab && (ad = ab.apply(N, [ad]));
				e(L, N, [ad, u, N]);
				e(K, N, [N, u])
			}
		}

		function W(ad) {
			console.log("notifyError");
			if (!(Z++)) {
				X();
				J && ad != i && (s[O] = ad);
				e(S, N, [N, ad]);
				e(K, N, [N, ad])
			}
		}
		if (J && (R = s[O])) {
			R.s ? aa(R.s[0]) : W(R)
		} else {
			z[T] = q;
			G = A(E)[0];
			G.id = m + c++;
			if (M) {
				G[n] = M
			}
			G[h] = G[a] = G[t] = function(ad) {
				if (!G[w] || !/i/.test(G[w])) {
					try {
						G[B] && G[B]()
					} catch (ae) {}
					ad = x;
					x = 0;
					ad ? aa(ad[0]) : W(l)
				}
			};
			G.src = O;
			X = function(ad) {
				Y && clearTimeout(Y);
				G[t] = G[h] = G[a] = null;
				C[k](G);
				P && C[k](P)
			};
			C[p](G, (I = C.firstChild));
			P && C[p](P, I);
			Y = V > 0 && setTimeout(function() {
				W(i)
			}, V)
		}
		return N
	}
	o.setup = function(F) {
		A.extend(b, F)
	};
	A.jsonp = o
})(Zepto); 
