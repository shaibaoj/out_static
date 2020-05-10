/* FILE BEGIN search/script/search/lazyload.js */
var util = util || {};
util.lazyload = (function() {
	var e = new Object();
	var a = [];
	var d = 1;
	e.delay = 0;
	$(window).on("scroll", function(j, i) {
		var k = i && i.selector;
		var l = [];
		if (k) {
			var h = c(k);
			if (h) {
				l.push(h)
			}
		} else {
			l = a
		}
		f(l, e.delay)
	});

	function f(k, h) {
		for (var j = 0; j < k.length; j++) {
			g(k[j], h)
		}
	}

	function g(i, h) {
		if (i) {
			h = h || 0;
			window.setTimeout(function() {
				i.trigger()
			}, h)
		}
	}

	function c(j) {
		for (var h = 0; h < a.length; h++) {
			if (a[h].name == j) {
				return a[h]
			}
		}
		return null
	}
	e.hasRegisted = function(j, h) {
		var i = c(j);
		return ((i == null) ? false : i.hasCalls(h))
	};

	function b(l, j, o, n) {
		var h = "utilLazyLoadClass";
		this.calls = [];
		this.name = l;
		this.className = k();
		this.loadOnce = ((typeof o == "undefined") ? true : o);
		this.batchSize = ((typeof n == "undefined") ? 1 : n);

		function k() {
			return h + (d++)
		}
		this.addCalls = function(s) {
			if (!this.hasCalls(s) && (typeof s == "function")) {
				this.calls.push(s)
			}
			return this
		};
		this.hasCalls = function(s) {
			for (var t = 0; t < this.calls.length; t++) {
				if (this.calls[t] == s) {
					return true
				}
			}
			return false
		};

		function p(v) {
			v = $(v);
			var u = v.offset().top;
			var s = window.innerHeight || document.documentElement.clientHeight || window.screen.height;
			var t = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0;
			return (t + s) >= u && t <= u
		}

		function i(s, t) {
			return t.hasClass(s.className)
		}

		function r(t, u) {
			for (var s = 0; s < u.length; s++) {
				$(u[s]).addClass(t.className)
			}
		}

		function q(v, w) {
			var u = v.calls;
			if (v.loadOnce) {
				for (var t = 0; t < u.length; t++) {
					var s = {
						cancel: false,
						items: w
					};
					u[t].call(w[0], s);
					if (!s.cancel) {
						r(v, w)
					}
				}
			} else {
				for (var t = 0; t < u.length; t++) {
					var s = {
						items: w
					};
					u[t].call(w[0], s)
				}
			}
		}

		function m(t, v) {
			var u = [];
			var s = null;
			$(v).each(function(w, y) {
				if (!s) {
					if (p(y)) {
						s = y;
						u.push(s)
					}
				} else {
					u.push(y);
					if (u.length > t.batchSize) {
						var x = u.pop();
						if (!p(x)) {
							return false
						} else {
							q(t, u);
							u = [x];
							s = x
						}
					}
				}
			});
			if (u.length > 0) {
				q(t, u)
			}
		}
		this.trigger = function() {
			var t = this.name;
			if (this.loadOnce) {
				var s = ":not(." + this.className + ")";
				t = t.replace(/(\s*,\s*)/g, s + ",");
				t += s
			}
			m(this, t);
			return this
		};
		this.addCalls(j)
	}
	e.registerCallback = function(l, k, h, j) {
		l = l || "";
		l = $.trim(l);
		if (e.hasRegisted(l, k)) {
			return e.getEventHandler(l)
		}
		var i = c(l);
		if (!i) {
			h = ((typeof h == "undefined") ? true : h);
			j = ((typeof j == "undefined") ? 1 : j);
			i = new b(l, k, h, j);
			a.push(i)
		} else {
			i.addCalls(k)
		}
		return i
	};
	e.trigger = function(h) {
		if (typeof h == "undefined") {
			$(window).triggerHandler("scroll")
		} else {
			$(window).triggerHandler("scroll", {
				selector: h
			})
		}
		return e
	};
	return e
})(); 