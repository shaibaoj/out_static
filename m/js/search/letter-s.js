/* FILE BEGIN search/script/search/letter-s.js */
(function(a, c) {
	function b(d, e) {
		if (!(this instanceof b)) {
			return new b(d, e).init()
		}
		this.id = $("#letter-sort");
		this.st = [];
		this.sh = [];
		this.jsonData = d;
		this.opts = e || {};
		this.callBack = this.opts.callBack;
		this.ids = this.opts.id
	}
	b.prototype = {
		constructor: b,
		getLetter: function() {
			var g = this,
				e = g.jsonData,
				d = [],
				f = [];
			for (n in e) {
				if (e.hasOwnProperty(n) && n != "#") {
					d.push(n)
				}
			}
			d.sort();
			d.push("#");
			return {
				letA: d
			}
		},
		setDom: function() {
			var o = this,
				p = o.getLetter().letA,
				d = o.jsonData,
				m = "",
				f = "<p class='letter-list'>";
			for (var l = 0; l < p.length; l++) {
				var g = d[p[l]];
				m += "<dl class='l-sortbox'><dt>" + p[l].replace(/#/ig, "其他") + "</dt><dd class='zwei'></dd>";
				if (typeof(g) != "undefined" && g != null) {
					for (var h = 0; h < g.length; h++) {
						m += "<dd><input type='checkbox' name='colorSelector' class='input-reset sn-checkbox'  id=\"code_" + g[h].value + '"><span>' + g[h].valueDesc + "</span></dd>"
					}
				}
				m += "</dl>"
			}
			o.id.prepend(f);
			o.id.append(m);
			for (var e = 0; e < o.ids.length; e++) {
				o.id.find("#code_" + o.ids[e]).prop("checked", "checked")
			}
			o.getHeight();
			o.callBack && typeof o.callBack === "function" && o.callBack(".l-sortbox dd")
		},
		init: function() {
			var e = this;
			var d = e.getLetter().letA.length;
			var f = e.id.offset().top;
			e.setDom()
		},
		getHeight: function() {
			var f = this;
			var e = f.id.find(".l-sortbox");
			for (var d = 0; d < f.getLetter().letA.length; d++) {
				f.sh.push(e.eq(d).offset().height)
			}
			f.getTop()
		},
		getTop: function() {
			var f = this;
			var e = f.sh;
			for (var d = 0; d < e.length; d++) {
				if (d == 0) {
					f.st.push(0)
				} else {
					(function(g) {
						var i = 0;
						for (var h = 0; h < g; h++) {
							i += e[h]
						}
						return f.st.push(i)
					})(d)
				}
			}
		},
		scrollt: function(d) {
			var e = this;
			e.id.scroll(function() {
				var f = $(this).scrollTop();
				e.scrollTo(f, d)
			})
		},
		letterC: function(d) {
			var g = this,
				e = null,
				f = g.id.children(".letter-list");
			f.on("click", "a", function(j) {
				var h = $(j.target).index(),
					i = g.st[h];
				clearTimeout(e);
				e = null;
				e = setTimeout(function() {
					g.id.scrollTop(i)
				}, 200)
			})
		},
		scrollTo: function(f, d) {
			var h = this;
			for (var e = 0; e < h.sh.length; e++) {
				var g = h.st[e + 1] ? h.st[e + 1] : h.st[e] + h.sh[e];
				if (f > h.st[e] && f < g) {} else {}
			}
		}
	};
	a.letter = b
})(window, document); 