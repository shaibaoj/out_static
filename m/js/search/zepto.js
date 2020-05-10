/* FILE BEGIN common/script/lib/zepto/1.1.4/zepto.min.js */
var Zepto = function() {
		function t(t) {
			return null == t ? String(t) : U[Y.call(t)] || "object"
		}

		function e(e) {
			return "function" == t(e)
		}

		function n(t) {
			return null != t && t == t.window
		}

		function i(t) {
			return null != t && t.nodeType == t.DOCUMENT_NODE
		}

		function r(e) {
			return "object" == t(e)
		}

		function o(t) {
			return r(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
		}

		function a(t) {
			return "number" == typeof t.length
		}

		function s(t) {
			return O.call(t, function(t) {
				return null != t
			})
		}

		function c(t) {
			return t.length > 0 ? T.fn.concat.apply([], t) : t
		}

		function u(t) {
			return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
		}

		function l(t) {
			return t in _ ? _[t] : _[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
		}

		function f(t, e) {
			return "number" != typeof e || k[u(t)] ? e : e + "px"
		}

		function h(t) {
			var e, n;
			return N[t] || (e = P.createElement(t), P.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), N[t] = n), N[t]
		}

		function p(t) {
			return "children" in t ? C.call(t.children) : T.map(t.childNodes, function(t) {
				return 1 == t.nodeType ? t : void 0
			})
		}

		function d(t, e, n) {
			for (A in e) {
				n && (o(e[A]) || J(e[A])) ? (o(e[A]) && !o(t[A]) && (t[A] = {}), J(e[A]) && !J(t[A]) && (t[A] = []), d(t[A], e[A], n)) : e[A] !== x && (t[A] = e[A])
			}
		}

		function m(t, e) {
			return null == e ? T(t) : T(t).filter(e)
		}

		function g(t, n, i, r) {
			return e(n) ? n.call(t, i, r) : n
		}

		function v(t, e, n) {
			null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
		}

		function y(t, e) {
			var n = t.className,
				i = n && n.baseVal !== x;
			return e === x ? i ? n.baseVal : n : void(i ? n.baseVal = e : t.className = e)
		}

		function w(t) {
			var e;
			try {
				return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? T.parseJSON(t) : t : e) : t
			} catch (n) {
				return t
			}
		}

		function b(t, e) {
			e(t);
			for (var n = 0, i = t.childNodes.length; i > n; n++) {
				b(t.childNodes[n], e)
			}
		}
		var x, A, T, $, E, j, S = [],
			C = S.slice,
			O = S.filter,
			P = window.document,
			N = {},
			_ = {},
			k = {
				"column-count": 1,
				columns: 1,
				"font-weight": 1,
				"line-height": 1,
				opacity: 1,
				"z-index": 1,
				zoom: 1
			},
			M = /^\s*<(\w+|!)[^>]*>/,
			D = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
			Z = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
			L = /^(?:body|html)$/i,
			R = /([A-Z])/g,
			z = ["val", "css", "html", "text", "data", "width", "height", "offset"],
			F = ["after", "prepend", "before", "append"],
			I = P.createElement("table"),
			B = P.createElement("tr"),
			W = {
				tr: P.createElement("tbody"),
				tbody: I,
				thead: I,
				tfoot: I,
				td: B,
				th: B,
				"*": P.createElement("div")
			},
			q = /complete|loaded|interactive/,
			H = /^[\w-]*$/,
			U = {},
			Y = U.toString,
			V = {},
			X = P.createElement("div"),
			G = {
				tabindex: "tabIndex",
				readonly: "readOnly",
				"for": "htmlFor",
				"class": "className",
				maxlength: "maxLength",
				cellspacing: "cellSpacing",
				cellpadding: "cellPadding",
				rowspan: "rowSpan",
				colspan: "colSpan",
				usemap: "useMap",
				frameborder: "frameBorder",
				contenteditable: "contentEditable"
			},
			J = Array.isArray ||
		function(t) {
			return t instanceof Array
		};
		return V.matches = function(t, e) {
			if (!e || !t || 1 !== t.nodeType) {
				return !1
			}
			var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
			if (n) {
				return n.call(t, e)
			}
			var i, r = t.parentNode,
				o = !r;
			return o && (r = X).appendChild(t), i = ~V.qsa(r, e).indexOf(t), o && X.removeChild(t), i
		}, E = function(t) {
			return t.replace(/-+(.)?/g, function(t, e) {
				return e ? e.toUpperCase() : ""
			})
		}, j = function(t) {
			return O.call(t, function(e, n) {
				return t.indexOf(e) == n
			})
		}, V.fragment = function(t, e, n) {
			var i, r, a;
			return D.test(t) && (i = T(P.createElement(RegExp.$1))), i || (t.replace && (t = t.replace(Z, "<$1></$2>")), e === x && (e = M.test(t) && RegExp.$1), e in W || (e = "*"), a = W[e], a.innerHTML = "" + t, i = T.each(C.call(a.childNodes), function() {
				a.removeChild(this)
			})), o(n) && (r = T(i), T.each(n, function(t, e) {
				z.indexOf(t) > -1 ? r[t](e) : r.attr(t, e)
			})), i
		}, V.Z = function(t, e) {
			return t = t || [], t.__proto__ = T.fn, t.selector = e || "", t
		}, V.isZ = function(t) {
			return t instanceof V.Z
		}, V.init = function(t, n) {
			var i;
			if (!t) {
				return V.Z()
			}
			if ("string" == typeof t) {
				if (t = t.trim(), "<" == t[0] && M.test(t)) {
					i = V.fragment(t, RegExp.$1, n), t = null
				} else {
					if (n !== x) {
						return T(n).find(t)
					}
					i = V.qsa(P, t)
				}
			} else {
				if (e(t)) {
					return T(P).ready(t)
				}
				if (V.isZ(t)) {
					return t
				}
				if (J(t)) {
					i = s(t)
				} else {
					if (r(t)) {
						i = [t], t = null
					} else {
						if (M.test(t)) {
							i = V.fragment(t.trim(), RegExp.$1, n), t = null
						} else {
							if (n !== x) {
								return T(n).find(t)
							}
							i = V.qsa(P, t)
						}
					}
				}
			}
			return V.Z(i, t)
		}, T = function(t, e) {
			return V.init(t, e)
		}, T.extend = function(t) {
			var e, n = C.call(arguments, 1);
			return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function(n) {
				d(t, n, e)
			}), t
		}, V.qsa = function(t, e) {
			var n, r = "#" == e[0],
				o = !r && "." == e[0],
				a = r || o ? e.slice(1) : e,
				s = H.test(a);
			return i(t) && s && r ? (n = t.getElementById(a)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : C.call(s && !r ? o ? t.getElementsByClassName(a) : t.getElementsByTagName(e) : t.querySelectorAll(e))
		}, T.contains = P.documentElement.contains ?
		function(t, e) {
			return t !== e && t.contains(e)
		} : function(t, e) {
			for (; e && (e = e.parentNode);) {
				if (e === t) {
					return !0
				}
			}
			return !1
		}, T.type = t, T.isFunction = e, T.isWindow = n, T.isArray = J, T.isPlainObject = o, T.isEmptyObject = function(t) {
			var e;
			for (e in t) {
				return !1
			}
			return !0
		}, T.inArray = function(t, e, n) {
			return S.indexOf.call(e, t, n)
		}, T.camelCase = E, T.trim = function(t) {
			return null == t ? "" : String.prototype.trim.call(t)
		}, T.uuid = 0, T.support = {}, T.expr = {}, T.map = function(t, e) {
			var n, i, r, o = [];
			if (a(t)) {
				for (i = 0; i < t.length; i++) {
					n = e(t[i], i), null != n && o.push(n)
				}
			} else {
				for (r in t) {
					n = e(t[r], r), null != n && o.push(n)
				}
			}
			return c(o)
		}, T.each = function(t, e) {
			var n, i;
			if (a(t)) {
				for (n = 0; n < t.length; n++) {
					if (e.call(t[n], n, t[n]) === !1) {
						return t
					}
				}
			} else {
				for (i in t) {
					if (e.call(t[i], i, t[i]) === !1) {
						return t
					}
				}
			}
			return t
		}, T.grep = function(t, e) {
			return O.call(t, e)
		}, window.JSON && (T.parseJSON = JSON.parse), T.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
			U["[object " + e + "]"] = e.toLowerCase()
		}), T.fn = {
			forEach: S.forEach,
			reduce: S.reduce,
			push: S.push,
			sort: S.sort,
			indexOf: S.indexOf,
			concat: S.concat,
			map: function(t) {
				return T(T.map(this, function(e, n) {
					return t.call(e, n, e)
				}))
			},
			slice: function() {
				return T(C.apply(this, arguments))
			},
			ready: function(t) {
				return q.test(P.readyState) && P.body ? t(T) : P.addEventListener("DOMContentLoaded", function() {
					t(T)
				}, !1), this
			},
			get: function(t) {
				return t === x ? C.call(this) : this[t >= 0 ? t : t + this.length]
			},
			toArray: function() {
				return this.get()
			},
			size: function() {
				return this.length
			},
			remove: function() {
				return this.each(function() {
					null != this.parentNode && this.parentNode.removeChild(this)
				})
			},
			each: function(t) {
				return S.every.call(this, function(e, n) {
					return t.call(e, n, e) !== !1
				}), this
			},
			filter: function(t) {
				return e(t) ? this.not(this.not(t)) : T(O.call(this, function(e) {
					return V.matches(e, t)
				}))
			},
			add: function(t, e) {
				return T(j(this.concat(T(t, e))))
			},
			is: function(t) {
				return this.length > 0 && V.matches(this[0], t)
			},
			not: function(t) {
				var n = [];
				if (e(t) && t.call !== x) {
					this.each(function(e) {
						t.call(this, e) || n.push(this)
					})
				} else {
					var i = "string" == typeof t ? this.filter(t) : a(t) && e(t.item) ? C.call(t) : T(t);
					this.forEach(function(t) {
						i.indexOf(t) < 0 && n.push(t)
					})
				}
				return T(n)
			},
			has: function(t) {
				return this.filter(function() {
					return r(t) ? T.contains(this, t) : T(this).find(t).size()
				})
			},
			eq: function(t) {
				return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
			},
			first: function() {
				var t = this[0];
				return t && !r(t) ? t : T(t)
			},
			last: function() {
				var t = this[this.length - 1];
				return t && !r(t) ? t : T(t)
			},
			find: function(t) {
				var e, n = this;
				return e = t ? "object" == typeof t ? T(t).filter(function() {
					var t = this;
					return S.some.call(n, function(e) {
						return T.contains(e, t)
					})
				}) : 1 == this.length ? T(V.qsa(this[0], t)) : this.map(function() {
					return V.qsa(this, t)
				}) : []
			},
			closest: function(t, e) {
				var n = this[0],
					r = !1;
				for ("object" == typeof t && (r = T(t)); n && !(r ? r.indexOf(n) >= 0 : V.matches(n, t));) {
					n = n !== e && !i(n) && n.parentNode
				}
				return T(n)
			},
			parents: function(t) {
				for (var e = [], n = this; n.length > 0;) {
					n = T.map(n, function(t) {
						return (t = t.parentNode) && !i(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
					})
				}
				return m(e, t)
			},
			parent: function(t) {
				return m(j(this.pluck("parentNode")), t)
			},
			children: function(t) {
				return m(this.map(function() {
					return p(this)
				}), t)
			},
			contents: function() {
				return this.map(function() {
					return C.call(this.childNodes)
				})
			},
			siblings: function(t) {
				return m(this.map(function(t, e) {
					return O.call(p(e.parentNode), function(t) {
						return t !== e
					})
				}), t)
			},
			empty: function() {
				return this.each(function() {
					this.innerHTML = ""
				})
			},
			pluck: function(t) {
				return T.map(this, function(e) {
					return e[t]
				})
			},
			show: function() {
				return this.each(function() {
					"none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName))
				})
			},
			replaceWith: function(t) {
				return this.before(t).remove()
			},
			wrap: function(t) {
				var n = e(t);
				if (this[0] && !n) {
					var i = T(t).get(0),
						r = i.parentNode || this.length > 1
				}
				return this.each(function(e) {
					T(this).wrapAll(n ? t.call(this, e) : r ? i.cloneNode(!0) : i)
				})
			},
			wrapAll: function(t) {
				if (this[0]) {
					T(this[0]).before(t = T(t));
					for (var e;
					(e = t.children()).length;) {
						t = e.first()
					}
					T(t).append(this)
				}
				return this
			},
			wrapInner: function(t) {
				var n = e(t);
				return this.each(function(e) {
					var i = T(this),
						r = i.contents(),
						o = n ? t.call(this, e) : t;
					r.length ? r.wrapAll(o) : i.append(o)
				})
			},
			unwrap: function() {
				return this.parent().each(function() {
					T(this).replaceWith(T(this).children())
				}), this
			},
			clone: function() {
				return this.map(function() {
					return this.cloneNode(!0)
				})
			},
			hide: function() {
				return this.css("display", "none")
			},
			toggle: function(t) {
				return this.each(function() {
					var e = T(this);
					(t === x ? "none" == e.css("display") : t) ? e.show() : e.hide()
				})
			},
			prev: function(t) {
				return T(this.pluck("previousElementSibling")).filter(t || "*")
			},
			next: function(t) {
				return T(this.pluck("nextElementSibling")).filter(t || "*")
			},
			html: function(t) {
				return 0 in arguments ? this.each(function(e) {
					var n = this.innerHTML;
					T(this).empty().append(g(this, t, e, n))
				}) : 0 in this ? this[0].innerHTML : null
			},
			text: function(t) {
				return 0 in arguments ? this.each(function(e) {
					var n = g(this, t, e, this.textContent);
					this.textContent = null == n ? "" : "" + n
				}) : 0 in this ? this[0].textContent : null
			},
			attr: function(t, e) {
				var n;
				return "string" != typeof t || 1 in arguments ? this.each(function(n) {
					if (1 === this.nodeType) {
						if (r(t)) {
							for (A in t) {
								v(this, A, t[A])
							}
						} else {
							v(this, t, g(this, e, n, this.getAttribute(t)))
						}
					}
				}) : this.length && 1 === this[0].nodeType ? !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n : x
			},
			removeAttr: function(t) {
				return this.each(function() {
					1 === this.nodeType && v(this, t)
				})
			},
			prop: function(t, e) {
				return t = G[t] || t, 1 in arguments ? this.each(function(n) {
					this[t] = g(this, e, n, this[t])
				}) : this[0] && this[0][t]
			},
			data: function(t, e) {
				var n = "data-" + t.replace(R, "-$1").toLowerCase(),
					i = 1 in arguments ? this.attr(n, e) : this.attr(n);
				return null !== i ? w(i) : x
			},
			val: function(t) {
				return 0 in arguments ? this.each(function(e) {
					this.value = g(this, t, e, this.value)
				}) : this[0] && (this[0].multiple ? T(this[0]).find("option").filter(function() {
					return this.selected
				}).pluck("value") : this[0].value)
			},
			offset: function(t) {
				if (t) {
					return this.each(function(e) {
						var n = T(this),
							i = g(this, t, e, n.offset()),
							r = n.offsetParent().offset(),
							o = {
								top: i.top - r.top,
								left: i.left - r.left
							};
						"static" == n.css("position") && (o.position = "relative"), n.css(o)
					})
				}
				if (!this.length) {
					return null
				}
				var e = this[0].getBoundingClientRect();
				return {
					left: e.left + window.pageXOffset,
					top: e.top + window.pageYOffset,
					width: Math.round(e.width),
					height: Math.round(e.height)
				}
			},
			css: function(e, n) {
				if (arguments.length < 2) {
					var i = this[0],
						r = getComputedStyle(i, "");
					if (!i) {
						return
					}
					if ("string" == typeof e) {
						return i.style[E(e)] || r.getPropertyValue(e)
					}
					if (J(e)) {
						var o = {};
						return T.each(J(e) ? e : [e], function(t, e) {
							o[e] = i.style[E(e)] || r.getPropertyValue(e)
						}), o
					}
				}
				var a = "";
				if ("string" == t(e)) {
					n || 0 === n ? a = u(e) + ":" + f(e, n) : this.each(function() {
						this.style.removeProperty(u(e))
					})
				} else {
					for (A in e) {
						e[A] || 0 === e[A] ? a += u(A) + ":" + f(A, e[A]) + ";" : this.each(function() {
							this.style.removeProperty(u(A))
						})
					}
				}
				return this.each(function() {
					this.style.cssText += ";" + a
				})
			},
			index: function(t) {
				return t ? this.indexOf(T(t)[0]) : this.parent().children().indexOf(this[0])
			},
			hasClass: function(t) {
				return t ? S.some.call(this, function(t) {
					return this.test(y(t))
				}, l(t)) : !1
			},
			addClass: function(t) {
				return t ? this.each(function(e) {
					$ = [];
					var n = y(this),
						i = g(this, t, e, n);
					i.split(/\s+/g).forEach(function(t) {
						T(this).hasClass(t) || $.push(t)
					}, this), $.length && y(this, n + (n ? " " : "") + $.join(" "))
				}) : this
			},
			removeClass: function(t) {
				return this.each(function(e) {
					return t === x ? y(this, "") : ($ = y(this), g(this, t, e, $).split(/\s+/g).forEach(function(t) {
						$ = $.replace(l(t), " ")
					}), void y(this, $.trim()))
				})
			},
			toggleClass: function(t, e) {
				return t ? this.each(function(n) {
					var i = T(this),
						r = g(this, t, n, y(this));
					r.split(/\s+/g).forEach(function(t) {
						(e === x ? !i.hasClass(t) : e) ? i.addClass(t) : i.removeClass(t)
					})
				}) : this
			},
			scrollTop: function(t) {
				if (this.length) {
					var e = "scrollTop" in this[0];
					return t === x ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ?
					function() {
						this.scrollTop = t
					} : function() {
						this.scrollTo(this.scrollX, t)
					})
				}
			},
			scrollLeft: function(t) {
				if (this.length) {
					var e = "scrollLeft" in this[0];
					return t === x ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ?
					function() {
						this.scrollLeft = t
					} : function() {
						this.scrollTo(t, this.scrollY)
					})
				}
			},
			position: function() {
				if (this.length) {
					var t = this[0],
						e = this.offsetParent(),
						n = this.offset(),
						i = L.test(e[0].nodeName) ? {
							top: 0,
							left: 0
						} : e.offset();
					return n.top -= parseFloat(T(t).css("margin-top")) || 0, n.left -= parseFloat(T(t).css("margin-left")) || 0, i.top += parseFloat(T(e[0]).css("border-top-width")) || 0, i.left += parseFloat(T(e[0]).css("border-left-width")) || 0, {
						top: n.top - i.top,
						left: n.left - i.left
					}
				}
			},
			offsetParent: function() {
				return this.map(function() {
					for (var t = this.offsetParent || P.body; t && !L.test(t.nodeName) && "static" == T(t).css("position");) {
						t = t.offsetParent
					}
					return t
				})
			}
		}, T.fn.detach = T.fn.remove, ["width", "height"].forEach(function(t) {
			var e = t.replace(/./, function(t) {
				return t[0].toUpperCase()
			});
			T.fn[t] = function(r) {
				var o, a = this[0];
				return r === x ? n(a) ? a["inner" + e] : i(a) ? a.documentElement["scroll" + e] : (o = this.offset()) && o[t] : this.each(function(e) {
					a = T(this), a.css(t, g(this, r, e, a[t]()))
				})
			}
		}), F.forEach(function(e, n) {
			var i = n % 2;
			T.fn[e] = function() {
				var e, r, o = T.map(arguments, function(n) {
					return e = t(n), "object" == e || "array" == e || null == n ? n : V.fragment(n)
				}),
					a = this.length > 1;
				return o.length < 1 ? this : this.each(function(t, e) {
					r = i ? e : e.parentNode, e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null;
					var s = T.contains(P.documentElement, r);
					o.forEach(function(t) {
						if (a) {
							t = t.cloneNode(!0)
						} else {
							if (!r) {
								return T(t).remove()
							}
						}
						r.insertBefore(t, e), s && b(t, function(t) {
							null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
						})
					})
				})
			}, T.fn[i ? e + "To" : "insert" + (n ? "Before" : "After")] = function(t) {
				return T(t)[e](this), this
			}
		}), V.Z.prototype = T.fn, V.uniq = j, V.deserializeValue = w, T.zepto = V, T
	}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function(r) {
	function e(j) {
		return j._zid || (j._zid = h++)
	}

	function v(B, k, q, j) {
		if (k = i(k), k.ns) {
			var z = p(k.ns)
		}
		return (g[e(B)] || []).filter(function(C) {
			return !(!C || k.e && C.e != k.e || k.ns && !z.test(C.ns) || q && e(C.fn) !== e(q) || j && C.sel != j)
		})
	}

	function i(k) {
		var j = ("" + k).split(".");
		return {
			e: j[0],
			ns: j.slice(1).sort().join(" ")
		}
	}

	function p(j) {
		return new RegExp("(?:^| )" + j.replace(" ", " .* ?") + "(?: |$)")
	}

	function x(k, j) {
		return k.del && !A && k.e in s || !! j
	}

	function a(j) {
		return b[j] || A && s[j] || j
	}

	function t(k, C, D, E, B, j, q) {
		var F = e(k),
			z = g[F] || (g[F] = []);
		C.split(/\s/).forEach(function(G) {
			if ("ready" == G) {
				return r(document).ready(D)
			}
			var H = i(G);
			H.fn = D, H.sel = B, H.e in b && (D = function(K) {
				var J = K.relatedTarget;
				return !J || J !== this && !r.contains(this, J) ? H.fn.apply(this, arguments) : void 0
			}), H.del = j;
			var I = j || D;
			H.proxy = function(K) {
				if (K = w(K), !K.isImmediatePropagationStopped()) {
					K.data = E;
					var J = I.apply(k, K._args == f ? [K] : [K].concat(K._args));
					return J === !1 && (K.preventDefault(), K.stopPropagation()), J
				}
			}, H.i = z.length, z.push(H), "addEventListener" in k && k.addEventListener(a(H.e), H.proxy, x(H, q))
		})
	}

	function c(z, j, B, q, C) {
		var k = e(z);
		(j || "").split(/\s/).forEach(function(D) {
			v(z, D, B, q).forEach(function(E) {
				delete g[k][E.i], "removeEventListener" in z && z.removeEventListener(a(E.e), E.proxy, x(E, C))
			})
		})
	}

	function w(k, j) {
		return (j || !k.isDefaultPrevented) && (j || (j = k), r.each(T, function(z, B) {
			var q = j[z];
			k[z] = function() {
				return this[B] = n, q && q.apply(j, arguments)
			}, k[B] = y
		}), (j.defaultPrevented !== f ? j.defaultPrevented : "returnValue" in j ? j.returnValue === !1 : j.getPreventDefault && j.getPreventDefault()) && (k.isDefaultPrevented = n)), k
	}

	function l(k) {
		var j, q = {
			originalEvent: k
		};
		for (j in k) {
			X.test(j) || k[j] === f || (q[j] = k[j])
		}
		return w(q, k)
	}
	var f, h = 1,
		o = Array.prototype.slice,
		d = r.isFunction,
		m = function(j) {
			return "string" == typeof j
		},
		g = {},
		u = {},
		A = "onfocusin" in window,
		s = {
			focus: "focusin",
			blur: "focusout"
		},
		b = {
			mouseenter: "mouseover",
			mouseleave: "mouseout"
		};
	u.click = u.mousedown = u.mouseup = u.mousemove = "MouseEvents", r.event = {
		add: t,
		remove: c
	}, r.proxy = function(q, k) {
		var j = 2 in arguments && o.call(arguments, 2);
		if (d(q)) {
			var z = function() {
					return q.apply(k, j ? j.concat(o.call(arguments)) : arguments)
				};
			return z._zid = e(q), z
		}
		if (m(k)) {
			return j ? (j.unshift(q[k], q), r.proxy.apply(null, j)) : r.proxy(q[k], q)
		}
		throw new TypeError("expected function")
	}, r.fn.bind = function(k, j, q) {
		return this.on(k, j, q)
	}, r.fn.unbind = function(k, j) {
		return this.off(k, j)
	}, r.fn.one = function(j, z, q, k) {
		return this.on(j, z, q, k, 1)
	};
	var n = function() {
			return !0
		},
		y = function() {
			return !1
		},
		X = /^([A-Z]|returnValue$|layer[XY]$)/,
		T = {
			preventDefault: "isDefaultPrevented",
			stopImmediatePropagation: "isImmediatePropagationStopped",
			stopPropagation: "isPropagationStopped"
		};
	r.fn.delegate = function(k, j, q) {
		return this.on(j, k, q)
	}, r.fn.undelegate = function(k, j, q) {
		return this.off(j, k, q)
	}, r.fn.live = function(k, j) {
		return r(document.body).delegate(this.selector, k, j), this
	}, r.fn.die = function(k, j) {
		return r(document.body).undelegate(this.selector, k, j), this
	}, r.fn.on = function(z, q, D, C, k) {
		var j, B, E = this;
		return z && !m(z) ? (r.each(z, function(F, G) {
			E.on(F, q, D, G, k)
		}), E) : (m(q) || d(C) || C === !1 || (C = D, D = q, q = f), (d(D) || D === !1) && (C = D, D = f), C === !1 && (C = y), E.each(function(G, F) {
			k && (j = function(H) {
				return c(F, H.type, C), C.apply(this, arguments)
			}), q && (B = function(H) {
				var I, J = r(H.target).closest(q, F).get(0);
				return J && J !== F ? (I = r.extend(l(H), {
					currentTarget: J,
					liveFired: F
				}), (j || C).apply(J, [I].concat(o.call(arguments, 1)))) : void 0
			}), t(F, z, C, D, q, B || j)
		}))
	}, r.fn.off = function(z, q, k) {
		var j = this;
		return z && !m(z) ? (r.each(z, function(C, B) {
			j.off(C, q, B)
		}), j) : (m(q) || d(k) || k === !1 || (k = q, q = f), k === !1 && (k = y), j.each(function() {
			c(this, z, k, q)
		}))
	}, r.fn.trigger = function(k, j) {
		return k = m(k) || r.isPlainObject(k) ? r.Event(k) : w(k), k._args = j, this.each(function() {
			"dispatchEvent" in this ? this.dispatchEvent(k) : r(this).triggerHandler(k, j)
		})
	}, r.fn.triggerHandler = function(z, k) {
		var j, q;
		return this.each(function(C, B) {
			j = l(m(z) ? r.Event(z) : z), j._args = k, j.target = B, r.each(v(B, z.type || z), function(E, D) {
				return q = D.proxy(j), j.isImmediatePropagationStopped() ? !1 : void 0
			})
		}), q
	}, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(j) {
		r.fn[j] = function(k) {
			return k ? this.bind(j, k) : this.trigger(j)
		}
	}), ["focus", "blur"].forEach(function(j) {
		r.fn[j] = function(k) {
			return k ? this.bind(j, k) : this.each(function() {
				try {
					this[j]()
				} catch (q) {}
			}), this
		}
	}), r.Event = function(j, z) {
		m(j) || (z = j, j = z.type);
		var q = document.createEvent(u[j] || "Events"),
			k = !0;
		if (z) {
			for (var B in z) {
				"bubbles" == B ? k = !! z[B] : q[B] = z[B]
			}
		}
		return q.initEvent(j, k, !0), w(q)
	}
}(Zepto), function(t) {
	function e(e, n, i) {
		var r = t.Event(n);
		return t(e).trigger(r, i), !r.isDefaultPrevented()
	}

	function n(t, n, i, r) {
		return t.global ? e(n || y, i, r) : void 0
	}

	function i(e) {
		e.global && 0 === t.active++ && n(e, null, "ajaxStart")
	}

	function r(e) {
		e.global && !--t.active && n(e, null, "ajaxStop")
	}

	function o(t, e) {
		var i = e.context;
		return e.beforeSend.call(i, t, e) === !1 || n(e, i, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void n(e, i, "ajaxSend", [t, e])
	}

	function a(t, e, i, r) {
		var o = i.context,
			a = "success";
		i.success.call(o, t, a, e), r && r.resolveWith(o, [t, a, e]), n(i, o, "ajaxSuccess", [e, i, t]), c(a, e, i)
	}

	function s(t, e, i, r, o) {
		var a = r.context;
		r.error.call(a, i, e, t), o && o.rejectWith(a, [i, e, t]), n(r, a, "ajaxError", [i, r, t || e]), c(e, i, r)
	}

	function c(t, e, i) {
		var o = i.context;
		i.complete.call(o, e, t), n(i, o, "ajaxComplete", [e, i]), r(i)
	}

	function u() {}

	function l(t) {
		return t && (t = t.split(";", 2)[0]), t && (t == T ? "html" : t == A ? "json" : b.test(t) ? "script" : x.test(t) && "xml") || "text"
	}

	function f(t, e) {
		return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
	}

	function h(e) {
		e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = f(e.url, e.data), e.data = void 0)
	}

	function p(e, n, i, r) {
		return t.isFunction(n) && (r = i, i = n, n = void 0), t.isFunction(i) || (r = i, i = void 0), {
			url: e,
			data: n,
			success: i,
			dataType: r
		}
	}

	function d(e, n, i, r) {
		var o, a = t.isArray(n),
			s = t.isPlainObject(n);
		t.each(n, function(n, c) {
			o = t.type(c), r && (n = i ? r : r + "[" + (s || "object" == o || "array" == o ? n : "") + "]"), !r && a ? e.add(c.name, c.value) : "array" == o || !i && "object" == o ? d(e, c, i, n) : e.add(n, c)
		})
	}
	var m, g, v = 0,
		y = window.document,
		w = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		b = /^(?:text|application)\/javascript/i,
		x = /^(?:text|application)\/xml/i,
		A = "application/json",
		T = "text/html",
		$ = /^\s*$/;
	t.active = 0, t.ajaxJSONP = function(e, n) {
		if (!("type" in e)) {
			return t.ajax(e)
		}
		var i, r, c = e.jsonpCallback,
			u = (t.isFunction(c) ? c() : c) || "jsonp" + ++v,
			l = y.createElement("script"),
			f = window[u],
			h = function(e) {
				t(l).triggerHandler("error", e || "abort")
			},
			p = {
				abort: h
			};
		return n && n.promise(p), t(l).on("load error", function(o, c) {
			clearTimeout(r), t(l).off().remove(), "error" != o.type && i ? a(i[0], p, e, n) : s(null, c || "error", p, e, n), window[u] = f, i && t.isFunction(f) && f(i[0]), f = i = void 0
		}), o(p, e) === !1 ? (h("abort"), p) : (window[u] = function() {
			i = arguments
		}, l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + u), y.head.appendChild(l), e.timeout > 0 && (r = setTimeout(function() {
			h("timeout")
		}, e.timeout)), p)
	}, t.ajaxSettings = {
		type: "GET",
		beforeSend: u,
		success: u,
		error: u,
		complete: u,
		context: null,
		global: !0,
		xhr: function() {
			return new window.XMLHttpRequest
		},
		accepts: {
			script: "text/javascript, application/javascript, application/x-javascript",
			json: A,
			xml: "application/xml, text/xml",
			html: T,
			text: "text/plain"
		},
		crossDomain: !1,
		timeout: 0,
		processData: !0,
		cache: !0
	}, t.ajax = function(e) {
		var n = t.extend({}, e || {}),
			r = t.Deferred && t.Deferred();
		for (m in t.ajaxSettings) {
			void 0 === n[m] && (n[m] = t.ajaxSettings[m])
		}
		i(n), n.crossDomain || (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host), n.url || (n.url = window.location.toString()), h(n);
		var c = n.dataType,
			p = /\?.+=\?/.test(n.url);
		if (p && (c = "jsonp"), n.cache !== !1 && (e && e.cache === !0 || "script" != c && "jsonp" != c) || (n.url = f(n.url, "_=" + Date.now())), "jsonp" == c) {
			return p || (n.url = f(n.url, n.jsonp ? n.jsonp + "=?" : n.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(n, r)
		}
		var d, v = n.accepts[c],
			y = {},
			w = function(t, e) {
				y[t.toLowerCase()] = [t, e]
			},
			b = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol,
			x = n.xhr(),
			A = x.setRequestHeader;
		if (r && r.promise(x), n.crossDomain || w("X-Requested-With", "XMLHttpRequest"), w("Accept", v || "*/*"), (v = n.mimeType || v) && (v.indexOf(",") > -1 && (v = v.split(",", 2)[0]), x.overrideMimeType && x.overrideMimeType(v)), (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && w("Content-Type", n.contentType || "application/x-www-form-urlencoded"), n.headers) {
			for (g in n.headers) {
				w(g, n.headers[g])
			}
		}
		if (x.setRequestHeader = w, x.onreadystatechange = function() {
			if (4 == x.readyState) {
				x.onreadystatechange = u, clearTimeout(d);
				var e, i = !1;
				if (x.status >= 200 && x.status < 300 || 304 == x.status || 0 == x.status && "file:" == b) {
					c = c || l(n.mimeType || x.getResponseHeader("content-type")), e = x.responseText;
					try {
						"script" == c ? (1, eval)(e) : "xml" == c ? e = x.responseXML : "json" == c && (e = $.test(e) ? null : t.parseJSON(e))
					} catch (o) {
						i = o
					}
					i ? s(i, "parsererror", x, n, r) : a(e, x, n, r)
				} else {
					s(x.statusText || null, x.status ? "error" : "abort", x, n, r)
				}
			}
		}, o(x, n) === !1) {
			return x.abort(), s(null, "abort", x, n, r), x
		}
		if (n.xhrFields) {
			for (g in n.xhrFields) {
				x[g] = n.xhrFields[g]
			}
		}
		var T = "async" in n ? n.async : !0;
		x.open(n.type, n.url, T, n.username, n.password);
		for (g in y) {
			A.apply(x, y[g])
		}
		return n.timeout > 0 && (d = setTimeout(function() {
			x.onreadystatechange = u, x.abort(), s(null, "timeout", x, n, r)
		}, n.timeout)), x.send(n.data ? n.data : null), x
	}, t.get = function() {
		return t.ajax(p.apply(null, arguments))
	}, t.post = function() {
		var e = p.apply(null, arguments);
		return e.type = "POST", t.ajax(e)
	}, t.getJSON = function() {
		var e = p.apply(null, arguments);
		return e.dataType = "json", t.ajax(e)
	}, t.fn.load = function(e, n, i) {
		if (!this.length) {
			return this
		}
		var r, o = this,
			a = e.split(/\s/),
			s = p(e, n, i),
			c = s.success;
		return a.length > 1 && (s.url = a[0], r = a[1]), s.success = function(e) {
			o.html(r ? t("<div>").html(e.replace(w, "")).find(r) : e), c && c.apply(o, arguments)
		}, t.ajax(s), this
	};
	var E = encodeURIComponent;
	t.param = function(t, e) {
		var n = [];
		return n.add = function(t, e) {
			this.push(E(t) + "=" + E(e))
		}, d(n, t, e), n.join("&").replace(/%20/g, "+")
	}
}(Zepto), function(b) {
	b.fn.serializeArray = function() {
		var a, d = [];
		return b([].slice.call(this.get(0).elements)).each(function() {
			a = b(this);
			var c = a.attr("type");
			"fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != c && "reset" != c && "button" != c && ("radio" != c && "checkbox" != c || this.checked) && d.push({
				name: a.attr("name"),
				value: a.val()
			})
		}), d
	}, b.fn.serialize = function() {
		var a = [];
		return this.serializeArray().forEach(function(d) {
			a.push(encodeURIComponent(d.name) + "=" + encodeURIComponent(d.value))
		}), a.join("&")
	}, b.fn.submit = function(a) {
		if (a) {
			this.bind("submit", a)
		} else {
			if (this.length) {
				var d = b.Event("submit");
				this.eq(0).trigger(d), d.isDefaultPrevented() || this.get(0).submit()
			}
		}
		return this
	}
}(Zepto), function(d) {
	"__proto__" in {} || d.extend(d.zepto, {
		Z: function(b, a) {
			return b = b || [], d.extend(b, d.fn), b.selector = a || "", b.__Z = !0, b
		},
		isZ: function(a) {
			return "array" === d.type(a) && "__Z" in a
		}
	});
	try {
		getComputedStyle(void 0)
	} catch (f) {
		var e = getComputedStyle;
		window.getComputedStyle = function(b) {
			try {
				return e(b)
			} catch (a) {
				return null
			}
		}
	}
}(Zepto), function(d) {
	function c(t) {
		var g = this.os = {},
			n = this.browser = {},
			r = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
			p = t.match(/(Android);?[\s\/]+([\d.]+)?/),
			A = !! t.match(/\(Macintosh\; Intel /),
			a = t.match(/(iPad).*OS\s([\d_]+)/),
			s = t.match(/(iPod)(.*OS\s([\d_]+))?/),
			e = !a && t.match(/(iPhone\sOS)\s([\d_]+)/),
			y = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
			v = t.match(/Windows Phone ([\d.]+)/),
			h = y && t.match(/TouchPad/),
			l = t.match(/Kindle\/([\d.]+)/),
			o = t.match(/Silk\/([\d._]+)/),
			f = t.match(/(BlackBerry).*Version\/([\d.]+)/),
			m = t.match(/(BB10).*Version\/([\d.]+)/),
			i = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
			u = t.match(/PlayBook/),
			T = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/),
			x = t.match(/Firefox\/([\d.]+)/),
			b = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
			S = !T && t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
			w = S || t.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
		(n.webkit = !! r) && (n.version = r[1]), p && (g.android = !0, g.version = p[2]), e && !s && (g.ios = g.iphone = !0, g.version = e[2].replace(/_/g, ".")), a && (g.ios = g.ipad = !0, g.version = a[2].replace(/_/g, ".")), s && (g.ios = g.ipod = !0, g.version = s[3] ? s[3].replace(/_/g, ".") : null), v && (g.wp = !0, g.version = v[1]), y && (g.webos = !0, g.version = y[2]), h && (g.touchpad = !0), f && (g.blackberry = !0, g.version = f[2]), m && (g.bb10 = !0, g.version = m[2]), i && (g.rimtabletos = !0, g.version = i[2]), u && (n.playbook = !0), l && (g.kindle = !0, g.version = l[1]), o && (n.silk = !0, n.version = o[1]), !o && g.android && t.match(/Kindle Fire/) && (n.silk = !0), T && (n.chrome = !0, n.version = T[1]), x && (n.firefox = !0, n.version = x[1]), b && (n.ie = !0, n.version = b[1]), w && (A || g.ios) && (n.safari = !0, A && (n.version = w[1])), S && (n.webview = !0), g.tablet = !! (a || u || p && !t.match(/Mobile/) || x && t.match(/Tablet/) || b && !t.match(/Phone/) && t.match(/Touch/)), g.phone = !(g.tablet || g.ipod || !(p || e || y || f || m || T && t.match(/Android/) || T && t.match(/CriOS\/([\d.]+)/) || x && t.match(/Mobile/) || b && t.match(/Touch/)))
	}
	c.call(d, navigator.userAgent), d.__detect = c
}(Zepto), function(u, e) {
	function h(b) {
		return b.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
	}

	function t(b) {
		return o ? o + b : b.toLowerCase()
	}
	var o, m, a, n, c, r, g, p, f, l, d = "",
		i = {
			Webkit: "webkit",
			Moz: "",
			O: "o"
		},
		s = window.document,
		v = s.createElement("div"),
		y = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
		w = {};
	u.each(i, function(b, j) {
		return v.style[b + "TransitionProperty"] !== e ? (d = "-" + b.toLowerCase() + "-", o = j, !1) : void 0
	}), m = d + "transform", w[a = d + "transition-property"] = w[n = d + "transition-duration"] = w[r = d + "transition-delay"] = w[c = d + "transition-timing-function"] = w[g = d + "animation-name"] = w[p = d + "animation-duration"] = w[l = d + "animation-delay"] = w[f = d + "animation-timing-function"] = "", u.fx = {
		off: o === e && v.style.transitionProperty === e,
		speeds: {
			_default: 400,
			fast: 200,
			slow: 600
		},
		cssPrefix: d,
		transitionEnd: t("TransitionEnd"),
		animationEnd: t("AnimationEnd")
	}, u.fn.animate = function(x, j, q, k, b) {
		return u.isFunction(j) && (k = j, q = e, j = e), u.isFunction(q) && (k = q, q = e), u.isPlainObject(j) && (q = j.easing, k = j.complete, b = j.delay, j = j.duration), j && (j = ("number" == typeof j ? j : u.fx.speeds[j] || u.fx.speeds._default) / 1000), b && (b = parseFloat(b) / 1000), this.anim(x, j, q, k, b)
	}, u.fn.anim = function(k, q, b, x, j) {
		var E, G, F, B = {},
			z = "",
			C = this,
			D = u.fx.transitionEnd,
			A = !1;
		if (q === e && (q = u.fx.speeds._default / 1000), j === e && (j = 0), u.fx.off && (q = 0), "string" == typeof k) {
			B[g] = k, B[p] = q + "s", B[l] = j + "s", B[f] = b || "linear", D = u.fx.animationEnd
		} else {
			G = [];
			for (E in k) {
				y.test(E) ? z += E + "(" + k[E] + ") " : (B[E] = k[E], G.push(h(E)))
			}
			z && (B[m] = z, G.push(m)), q > 0 && "object" == typeof k && (B[a] = G.join(", "), B[n] = q + "s", B[r] = j + "s", B[c] = b || "linear")
		}
		return F = function(H) {
			if ("undefined" != typeof H) {
				if (H.target !== H.currentTarget) {
					return
				}
				u(H.target).unbind(D, F)
			} else {
				u(this).unbind(D, F)
			}
			A = !0, u(this).css(w), x && x.call(this)
		}, q > 0 && (this.bind(D, F), setTimeout(function() {
			A || F.call(C)
		}, 1000 * q + 25)), this.size() && this.get(0).clientLeft, this.css(B), 0 >= q && setTimeout(function() {
			C.each(function() {
				F.call(this)
			})
		}, 0), this
	}, v = null
}(Zepto), function(l, e) {
	function n(d, c, b, h, g) {
		"function" != typeof c || g || (g = c, c = e);
		var f = {
			opacity: b
		};
		return h && (f.scale = h, d.css(l.fx.cssPrefix + "transform-origin", "0 0")), d.animate(f, c, null, g)
	}

	function i(c, d, b, f) {
		return n(c, d, 0, b, function() {
			m.call(l(this)), f && f.call(this)
		})
	}
	var o = window.document,
		a = (o.documentElement, l.fn.show),
		m = l.fn.hide,
		p = l.fn.toggle;
	l.fn.show = function(c, b) {
		return a.call(this), c === e ? c = 0 : this.css("opacity", 0), n(this, c, 1, "1,1", b)
	}, l.fn.hide = function(b, c) {
		return b === e ? m.call(this) : i(this, b, "0,0", c)
	}, l.fn.toggle = function(c, b) {
		return c === e || "boolean" == typeof c ? p.call(this, c) : this.each(function() {
			var d = l(this);
			d["none" == d.css("display") ? "show" : "hide"](c, b)
		})
	}, l.fn.fadeTo = function(d, b, c) {
		return n(this, d, b, null, c)
	}, l.fn.fadeIn = function(c, d) {
		var b = this.css("opacity");
		return b > 0 ? this.css("opacity", 0) : b = 1, a.call(this).fadeTo(c, b, d)
	}, l.fn.fadeOut = function(b, c) {
		return i(this, b, null, c)
	}, l.fn.fadeToggle = function(b, c) {
		return this.each(function() {
			var d = l(this);
			d[0 == d.css("opacity") || "none" == d.css("display") ? "fadeIn" : "fadeOut"](b, c)
		})
	}
}(Zepto), function(c) {
	function n(h, f) {
		var d = h[a],
			g = d && r[d];
		if (void 0 === f) {
			return g || p(h)
		}
		if (g) {
			if (f in g) {
				return g[f]
			}
			var b = e(f);
			if (b in g) {
				return g[b]
			}
		}
		return q.call(c(h), f)
	}

	function p(h, d, g) {
		var f = h[a] || (h[a] = ++c.uuid),
			b = r[f] || (r[f] = o(h));
		return void 0 !== d && (b[e(d)] = g), b
	}

	function o(b) {
		var d = {};
		return c.each(b.attributes || i, function(f, g) {
			0 == g.name.indexOf("data-") && (d[e(g.name.replace("data-", ""))] = c.zepto.deserializeValue(g.value))
		}), d
	}
	var r = {},
		q = c.fn.data,
		e = c.camelCase,
		a = c.expando = "Zepto" + +new Date,
		i = [];
	c.fn.data = function(b, d) {
		return void 0 === d ? c.isPlainObject(b) ? this.each(function(g, f) {
			c.each(b, function(j, h) {
				p(f, j, h)
			})
		}) : 0 in this ? n(this[0], b) : void 0 : this.each(function() {
			p(this, b, d)
		})
	}, c.fn.removeData = function(b) {
		return "string" == typeof b && (b = b.split(/\s+/)), this.each(function() {
			var d = this[a],
				f = d && r[d];
			f && c.each(b || f, function(g) {
				delete f[b ? e(this) : g]
			})
		})
	}, ["remove", "empty"].forEach(function(b) {
		var d = c.fn[b];
		c.fn[b] = function() {
			var f = this.find("*");
			return "remove" === b && (f = f.add(this)), f.removeData(), d.call(this)
		}
	})
}(Zepto), function(d) {
	var f, e = [];
	d.fn.remove = function() {
		return this.each(function() {
			this.parentNode && ("IMG" === this.tagName && (e.push(this), this.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=", f && clearTimeout(f), f = setTimeout(function() {
				e = []
			}, 60000)), this.parentNode.removeChild(this))
		})
	}
}(Zepto), function(d) {
	function f(c) {
		var a = [
			["resolve", "done", d.Callbacks({
				once: 1,
				memory: 1
			}), "resolved"],
			["reject", "fail", d.Callbacks({
				once: 1,
				memory: 1
			}), "rejected"],
			["notify", "progress", d.Callbacks({
				memory: 1
			})]
		],
			j = "pending",
			i = {
				state: function() {
					return j
				},
				always: function() {
					return b.done(arguments).fail(arguments), this
				},
				then: function() {
					var g = arguments;
					return f(function(h) {
						d.each(a, function(p, n) {
							var o = d.isFunction(g[p]) && g[p];
							b[n[1]](function() {
								var k = o && o.apply(this, arguments);
								if (k && d.isFunction(k.promise)) {
									k.promise().done(h.resolve).fail(h.reject).progress(h.notify)
								} else {
									var l = this === i ? h.promise() : this,
										m = o ? [k] : arguments;
									h[n[0] + "With"](l, m)
								}
							})
						}), g = null
					}).promise()
				},
				promise: function(g) {
					return null != g ? d.extend(g, i) : i
				}
			},
			b = {};
		return d.each(a, function(n, h) {
			var g = h[2],
				m = h[3];
			i[h[1]] = g.add, m && g.add(function() {
				j = m
			}, a[1 ^ n][2].disable, a[2][2].lock), b[h[0]] = function() {
				return b[h[0] + "With"](this === b ? i : this, arguments), this
			}, b[h[0] + "With"] = g.fireWith
		}), i.promise(b), c && c.call(b, b), b
	}
	var e = Array.prototype.slice;
	d.when = function(h) {
		var o, l, t, r = e.call(arguments),
			a = r.length,
			s = 0,
			i = 1 !== a || h && d.isFunction(h.promise) ? a : 0,
			b = 1 === i ? h : f(),
			c = function(j, g, k) {
				return function(m) {
					g[j] = this, k[j] = arguments.length > 1 ? e.call(arguments) : m, k === o ? b.notifyWith(g, k) : --i || b.resolveWith(g, k)
				}
			};
		if (a > 1) {
			for (o = new Array(a), l = new Array(a), t = new Array(a); a > s; ++s) {
				r[s] && d.isFunction(r[s].promise) ? r[s].promise().done(c(s, t, r)).fail(b.reject).progress(c(s, l, o)) : --i
			}
		}
		return i || b.resolveWith(t, r), b.promise()
	}, d.Deferred = f
}(Zepto), function(b) {
	b.Callbacks = function(e) {
		e = b.extend({}, e);
		var n, i, r, o, a, s, c = [],
			u = !e.once && [],
			l = function(d) {
				for (n = e.memory && d, i = !0, s = o || 0, o = 0, a = c.length, r = !0; c && a > s; ++s) {
					if (c[s].apply(d[0], d[1]) === !1 && e.stopOnFalse) {
						n = !1;
						break
					}
				}
				r = !1, c && (u ? u.length && l(u.shift()) : n ? c.length = 0 : f.disable())
			},
			f = {
				add: function() {
					if (c) {
						var g = c.length,
							d = function(h) {
								b.each(h, function(k, j) {
									"function" == typeof j ? e.unique && f.has(j) || c.push(j) : j && j.length && "string" != typeof j && d(j)
								})
							};
						d(arguments), r ? a = c.length : n && (o = g, l(n))
					}
					return this
				},
				remove: function() {
					return c && b.each(arguments, function(g, d) {
						for (var h;
						(h = b.inArray(d, c, h)) > -1;) {
							c.splice(h, 1), r && (a >= h && --a, s >= h && --s)
						}
					}), this
				},
				has: function(d) {
					return !(!c || !(d ? b.inArray(d, c) > -1 : c.length))
				},
				empty: function() {
					return a = c.length = 0, this
				},
				disable: function() {
					return c = u = n = void 0, this
				},
				disabled: function() {
					return !c
				},
				lock: function() {
					return u = void 0, n || f.disable(), this
				},
				locked: function() {
					return !u
				},
				fireWith: function(g, d) {
					return !c || i && !u || (d = d || [], d = [g, d.slice ? d.slice() : d], r ? u.push(d) : l(d)), this
				},
				fire: function() {
					return f.fireWith(this, arguments)
				},
				fired: function() {
					return !!i
				}
			};
		return f
	}
}(Zepto), function(t) {
	function i(b) {
		return b = t(b), !(!b.width() && !b.height()) && "none" !== b.css("display")
	}

	function o(j, g) {
		j = j.replace(/=#\]/g, '="#"]');
		var d, b, h = s.exec(j);
		if (h && h[2] in c && (d = c[h[2]], b = h[3], j = h[1], b)) {
			var f = Number(b);
			b = isNaN(f) ? b.replace(/^["']|["']$/g, "") : f
		}
		return g(j, d, b)
	}
	var n = t.zepto,
		r = n.qsa,
		q = n.matches,
		c = t.expr[":"] = {
			visible: function() {
				return i(this) ? this : void 0
			},
			hidden: function() {
				return i(this) ? void 0 : this
			},
			selected: function() {
				return this.selected ? this : void 0
			},
			checked: function() {
				return this.checked ? this : void 0
			},
			parent: function() {
				return this.parentNode
			},
			first: function(b) {
				return 0 === b ? this : void 0
			},
			last: function(b, d) {
				return b === d.length - 1 ? this : void 0
			},
			eq: function(b, f, d) {
				return b === d ? this : void 0
			},
			contains: function(f, d, b) {
				return t(this).text().indexOf(b) > -1 ? this : void 0
			},
			has: function(b, f, d) {
				return n.qsa(this, d).length ? this : void 0
			}
		},
		s = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),
		e = /^\s*>/,
		a = "Zepto" + +new Date;
	n.qsa = function(b, d) {
		return o(d, function(g, f, j) {
			try {
				var k;
				!g && f ? g = "*" : e.test(g) && (k = t(b).addClass(a), g = "." + a + " " + g);
				var h = r(b, g)
			} catch (l) {
				throw console.error("error performing selector: %o", d), l
			} finally {
				k && k.removeClass(a)
			}
			return f ? n.uniq(t.map(h, function(p, m) {
				return f.call(p, m, h, j)
			})) : h
		})
	}, n.matches = function(b, d) {
		return o(d, function(f, h, g) {
			return !(f && !q(b, f) || h && h.call(b, null, g) !== b)
		})
	}
}(Zepto), function(e) {
	function t(j, g, d, b) {
		return Math.abs(j - g) >= Math.abs(d - b) ? j - g > 0 ? "Left" : "Right" : d - b > 0 ? "Up" : "Down"
	}

	function l() {
		i = null, f.last && (f.el.trigger("longTap"), f = {})
	}

	function h() {
		i && clearTimeout(i), i = null
	}

	function r() {
		c && clearTimeout(c), s && clearTimeout(s), p && clearTimeout(p), i && clearTimeout(i), c = s = p = i = null, f = {}
	}

	function n(b) {
		return ("touch" == b.pointerType || b.pointerType == b.MSPOINTER_TYPE_TOUCH) && b.isPrimary
	}

	function u(b, d) {
		return b.type == "pointer" + d || b.type.toLowerCase() == "mspointer" + d
	}
	var c, s, p, i, a, f = {},
		o = 750;
	e(document).ready(function() {
		var g, m, j, k, d = 0,
			b = 0;
		"MSGesture" in window && (a = new MSGesture, a.target = document.body), e(document).bind("MSGestureEnd", function(q) {
			var v = q.velocityX > 1 ? "Right" : q.velocityX < -1 ? "Left" : q.velocityY > 1 ? "Down" : q.velocityY < -1 ? "Up" : null;
			v && (f.el.trigger("swipe"), f.el.trigger("swipe" + v))
		}).on("touchstart MSPointerDown pointerdown", function(q) {
			(!(k = u(q, "down")) || n(q)) && (j = k ? q : q.touches[0], q.touches && 1 === q.touches.length && f.x2 && (f.x2 = void 0, f.y2 = void 0), g = Date.now(), m = g - (f.last || g), f.el = e("tagName" in j.target ? j.target : j.target.parentNode), c && clearTimeout(c), f.x1 = j.pageX, f.y1 = j.pageY, m > 0 && 250 >= m && (f.isDoubleTap = !0), f.last = g, i = setTimeout(l, o), a && k && a.addPointer(q.pointerId))
		}).on("touchmove MSPointerMove pointermove", function(q) {
			(!(k = u(q, "move")) || n(q)) && (j = k ? q : q.touches[0], h(), f.x2 = j.pageX, f.y2 = j.pageY, d += Math.abs(f.x1 - f.x2), b += Math.abs(f.y1 - f.y2))
		}).on("touchend MSPointerUp pointerup", function(q) {
			(!(k = u(q, "up")) || n(q)) && (h(), f.x2 && Math.abs(f.x1 - f.x2) > 30 || f.y2 && Math.abs(f.y1 - f.y2) > 30 ? p = setTimeout(function() {
				f.el.trigger("swipe"), f.el.trigger("swipe" + t(f.x1, f.x2, f.y1, f.y2)), f = {}
			}, 0) : "last" in f && (30 > d && 30 > b ? s = setTimeout(function() {
				var v = e.Event("tap");
				v.cancelTouch = r, f.el.trigger(v), f.isDoubleTap ? (f.el && f.el.trigger("doubleTap"), f = {}) : c = setTimeout(function() {
					c = null, f.el && f.el.trigger("singleTap"), f = {}
				}, 250)
			}, 0) : f = {}), d = b = 0)
		}).on("touchcancel MSPointerCancel pointercancel", r), e(window).on("scroll", r)
	}), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(b) {
		e.fn[b] = function(d) {
			return this.on(b, d)
		}
	})
}(Zepto), function(e) {
	function h(a) {
		return "tagName" in a ? a : a.parentNode
	}
	if (e.os.ios) {
		var g, f = {};
		e(document).bind("gesturestart", function(b) {
			var a = Date.now();
			a - (f.last || a), f.target = h(b.target), g && clearTimeout(g), f.e1 = b.scale, f.last = a
		}).bind("gesturechange", function(a) {
			f.e2 = a.scale
		}).bind("gestureend", function() {
			f.e2 > 0 ? (0 != Math.abs(f.e1 - f.e2) && e(f.target).trigger("pinch") && e(f.target).trigger("pinch" + (f.e1 - f.e2 > 0 ? "In" : "Out")), f.e1 = f.e2 = f.last = 0) : "last" in f && (f = {})
		}), ["pinch", "pinchIn", "pinchOut"].forEach(function(a) {
			e.fn[a] = function(b) {
				return this.bind(a, b)
			}
		})
	}
}(Zepto), function(b) {
	b.fn.end = function() {
		return this.prevObject || b()
	}, b.fn.andSelf = function() {
		return this.add(this.prevObject || b())
	}, "filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings".split(",").forEach(function(a) {
		var d = b.fn[a];
		b.fn[a] = function() {
			var c = d.apply(this, arguments);
			return c.prevObject = this, c
		}
	})
}(Zepto), "function" == typeof Zepto && !
function(b) {
	"function" == typeof define && define.amd ? define(["Zepto"], b) : b($)
}(function(l) {
	function e(b) {
		return p.raw ? b : encodeURIComponent(b)
	}

	function n(b) {
		return p.raw ? b : decodeURIComponent(b)
	}

	function i(b) {
		return e(p.json ? JSON.stringify(b) : String(b))
	}

	function o(b) {
		0 === b.indexOf('"') && (b = b.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
		try {
			b = decodeURIComponent(b.replace(m, " "))
		} catch (c) {
			return
		}
		try {
			return p.json ? JSON.parse(b) : b
		} catch (c) {}
	}

	function a(d, b) {
		var c = p.raw ? d : o(d);
		return l.isFunction(b) ? b(c) : c
	}
	var m = /\+/g,
		p = l.cookie = function(g, j, r) {
			if (void 0 !== j && !l.isFunction(j)) {
				if (r = l.extend({}, p.defaults, r), "number" == typeof r.expires) {
					var c = r.expires,
						b = r.expires = new Date;
					b.setDate(b.getDate() + c)
				}
				return document.cookie = [e(g), "=", i(j), r.expires ? "; expires=" + r.expires.toUTCString() : "", r.path ? "; path=" + r.path : "", r.domain ? "; domain=" + r.domain : "", r.secure ? "; secure" : ""].join("")
			}
			for (var v = g ? void 0 : {}, x = document.cookie ? document.cookie.split("; ") : [], f = 0, u = x.length; u > f; f++) {
				var d = x[f].split("="),
					k = n(d.shift()),
					h = d.join("=");
				if (g && g === k) {
					v = a(h, j);
					break
				}
				g || void 0 === (h = a(h)) || (v[k] = h)
			}
			return v
		};
	p.defaults = {}, l.removeCookie = function(b, c) {
		return void 0 !== l.cookie(b) ? (l.cookie(b, "", l.extend({}, c, {
			expires: -1
		})), !0) : !1
	}
}), !
function() {
	function A(j) {
		return j.replace(u, "").replace(b, ",").replace(p, "").replace(s, "").replace(Z, "").split(T)
	}

	function e(j) {
		return "'" + j.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
	}

	function n(M, z) {
		function R(W) {
			return J += W.split(/\n/).length - 1, F && (W = W.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), W && (W = D[1] + e(W) + D[2] + "\n"), W
		}

		function O(X) {
			var ab = J;
			if (V ? X = V(X, z) : G && (X = X.replace(/\n/g, function() {
				return J++, "$line=" + J + ";"
			})), 0 === X.indexOf("=")) {
				var W = I && !/^=[=#]/.test(X);
				if (X = X.replace(/^=[=#]?|[\s;]*$/g, ""), W) {
					var Y = X.replace(/\s*\([^\)]+\)/, "");
					E[Y] || /^(include|print)$/.test(Y) || (X = "$escape(" + X + ")")
				} else {
					X = "$string(" + X + ")"
				}
				X = D[1] + X + D[2]
			}
			return G && (X = "$line=" + ab + ";" + X), r(A(X), function(ac) {
				if (ac && !L[ac]) {
					var aa;
					aa = "print" === ac ? H : "include" === ac ? C : E[ac] ? "$utils." + ac : d[ac] ? "$helpers." + ac : "$data." + ac, Q += ac + "=" + aa + ",", L[ac] = !0
				}
			}), X + "\n"
		}
		var G = z.debug,
			S = z.openTag,
			j = z.closeTag,
			V = z.parser,
			F = z.compress,
			I = z.escape,
			J = 1,
			L = {
				$data: 1,
				$filename: 1,
				$utils: 1,
				$helpers: 1,
				$out: 1,
				$line: 1
			},
			k = "".trim,
			D = k ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
			q = k ? "$out+=text;return $out;" : "$out.push(text);",
			H = "function(){var text=''.concat.apply('',arguments);" + q + "}",
			C = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + q + "}",
			Q = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (G ? "$line=0," : ""),
			P = D[0],
			K = "return new String(" + D[3] + ");";
		r(M.split(S), function(Y) {
			Y = Y.split(j);
			var X = Y[0],
				W = Y[1];
			1 === Y.length ? P += R(X) : (P += O(X), W && (P += R(W)))
		});
		var U = Q + P + K;
		G && (U = "try{" + U + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + e(M) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
		try {
			var B = new Function("$data", "$filename", U);
			return B.prototype = E, B
		} catch (N) {
			throw N.temp = "function anonymous($data,$filename) {" + U + "}", N
		}
	}
	var i = function(k, j) {
			return "string" == typeof j ? g(j, {
				filename: k
			}) : a(k, j)
		};
	i.version = "3.0.0", i.config = function(k, j) {
		w[k] = j
	};
	var w = i.defaults = {
		openTag: "<%",
		closeTag: "%>",
		escape: !0,
		cache: !0,
		compress: !1,
		parser: null
	},
		o = i.cache = {};
	i.render = function(k, j) {
		return g(k, j)
	};
	var a = i.renderFile = function(k, j) {
			var q = i.get(k) || m({
				filename: k,
				name: "Render Error",
				message: "Template not found"
			});
			return j ? q(j) : q
		};
	i.get = function(j) {
		var z;
		if (o[j]) {
			z = o[j]
		} else {
			if ("object" == typeof document) {
				var q = document.getElementById(j);
				if (q) {
					var k = (q.value || q.innerHTML).replace(/^\s*|\s*$/g, "");
					z = g(k, {
						filename: j
					})
				}
			}
		}
		return z
	};
	var v = function(k, j) {
			return "string" != typeof k && (j = typeof k, "number" === j ? k += "" : k = "function" === j ? v(k.call(k)) : ""), k
		},
		c = {
			"<": "&#60;",
			">": "&#62;",
			'"': "&#34;",
			"'": "&#39;",
			"&": "&#38;"
		},
		y = function(j) {
			return c[j]
		},
		l = function(j) {
			return v(j).replace(/&(?![\w#]+;)|[<>"']/g, y)
		},
		f = Array.isArray ||
	function(j) {
		return "[object Array]" === {}.toString.call(j)
	}, h = function(j, z) {
		var q, k;
		if (f(j)) {
			for (q = 0, k = j.length; k > q; q++) {
				z.call(j, j[q], q, j)
			}
		} else {
			for (q in j) {
				z.call(j, j[q], q)
			}
		}
	}, E = i.utils = {
		$helpers: {},
		$include: a,
		$string: v,
		$escape: l,
		$each: h
	};
	i.helper = function(k, j) {
		d[k] = j
	};
	var d = i.helpers = E.$helpers;
	i.onerror = function(k) {
		var j = "Template Error\n\n";
		for (var q in k) {
			j += "<" + q + ">\n" + k[q] + "\n\n"
		}
		"object" == typeof console && console.error(j)
	};
	var m = function(j) {
			return i.onerror(j), function() {
				return "{Template Error}"
			}
		},
		g = i.compile = function(z, B) {
			function q(G) {
				try {
					return new j(G, C) + ""
				} catch (F) {
					return B.debug ? m(F)() : (B.debug = !0, g(z, B)(G))
				}
			}
			B = B || {};
			for (var k in w) {
				void 0 === B[k] && (B[k] = w[k])
			}
			var C = B.filename;
			try {
				var j = n(z, B)
			} catch (D) {
				return D.filename = C || "anonymous", D.name = "Syntax Error", m(D)
			}
			return q.prototype = j.prototype, q.toString = function() {
				return j.toString()
			}, C && B.cache && (o[C] = q), q
		},
		r = E.$each,
		t = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
		u = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
		b = /[^\w$]+/g,
		p = new RegExp(["\\b" + t.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
		s = /^\d[^,]*|,\d[^,]*/g,
		Z = /^,+|,+$/g,
		T = /^$|,+/;
	w.openTag = "{{", w.closeTag = "}}";
	var x = function(j, z) {
			var q = z.split(":"),
				k = q.shift(),
				B = q.join(":") || "";
			return B && (B = ", " + B), "$helpers." + k + "(" + j + B + ")"
		};
	w.parser = function(q) {
		q = q.replace(/^\s/, "");
		var H = q.split(" "),
			k = H.shift(),
			J = H.join(" ");
		switch (k) {
		case "if":
			q = "if(" + J + "){";
			break;
		case "else":
			H = "if" === H.shift() ? " if(" + H.join(" ") + ")" : "", q = "}else" + H + "{";
			break;
		case "/if":
			q = "}";
			break;
		case "each":
			var z = H[0] || "$data",
				j = H[1] || "as",
				I = H[2] || "$value",
				L = H[3] || "$index",
				B = I + "," + L;
			"as" !== j && (z = "[]"), q = "$each(" + z + ",function(" + B + "){";
			break;
		case "/each":
			q = "});";
			break;
		case "echo":
			q = "print(" + J + ");";
			break;
		case "print":
		case "include":
			q = k + "(" + H.join(",") + ");";
			break;
		default:
			if (/^\s*\|\s*[\w\$]/.test(J)) {
				var D = !0;
				0 === q.indexOf("#") && (q = q.substr(1), D = !1);
				for (var K = 0, F = q.split("|"), G = F.length, C = F[K++]; G > K; K++) {
					C = x(C, F[K])
				}
				q = (D ? "=" : "=#") + C
			} else {
				q = i.helpers[k] ? "=#" + k + "(" + H.join(",") + ");" : "=" + q
			}
		}
		return q
	}, "function" == typeof define ? define(function() {
		return i
	}) : "undefined" != typeof exports ? module.exports = i : this.template = i
}();
var Queuejs = function() {
		function i(f, b) {
			var d, c;
			if (f.src) {
				f.src = f.src.constructor === Array ? f.src : [f.src];
				for (var a = 0; a < f.src.length; a++) {
					f.src[a].constructor !== Array && (f.src[a] = [f.src[a]]), l.push(f.src[a])
				}
			}
			h = l.shift(), k = k || j.getElementsByTagName("head")[0], f.src = h;
			for (var a = 0; a < f.src.length; a++) {
				c = f.src[a], d = j.createElement("script"), d.src = c, d.type = "text/javascript", d.onload = d.onerror = function() {
					e(f, b)
				}, k.appendChild(d)
			}
		}

		function e(c, b) {
			var a = h;
			if (a && (a.shift(), !a.length)) {
				if (!l.length) {
					return void("function" == typeof b && b())
				}
				i(c, b)
			}
		}
		var k, j = document,
			h = [],
			l = [];
		return {
			init: function(b, a) {
				i(b, a)
			}
		}
	}();




!
function(e, h, l) {
	function k(c, b) {
		this.wrapper = "string" == typeof c ? h.querySelector(c) : c, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
			startX: 0,
			startY: 0,
			scrollY: !0,
			directionLockThreshold: 5,
			momentum: !0,
			bounce: !0,
			bounceTime: 600,
			bounceEasing: "",
			preventDefault: !0,
			preventDefaultException: {
				tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
			},
			HWCompositing: !0,
			useTransition: !0,
			useTransform: !0
		};
		for (var a in b) {
			this.options[a] = b[a]
		}
		this.translateZ = this.options.HWCompositing && j.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = j.hasTransition && this.options.useTransition, this.options.useTransform = j.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY, this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? j.ease[this.options.bounceEasing] || j.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), 3 == this.options.probeType && (this.options.useTransition = !1), this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
	}
	var i = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame ||
	function(a) {
		e.setTimeout(a, 1000 / 60)
	}, j = function() {
		function c(g) {
			return d === !1 ? !1 : "" === d ? g : d + g.charAt(0).toUpperCase() + g.substr(1)
		}
		var a = {},
			b = h.createElement("div").style,
			d = function() {
				for (var r, g = ["t", "webkitT", "MozT", "msT", "OT"], q = 0, m = g.length; m > q; q++) {
					if (r = g[q] + "ransform", r in b) {
						return g[q].substr(0, g[q].length - 1)
					}
				}
				return !1
			}();
		a.getTime = Date.now ||
		function() {
			return (new Date).getTime()
		}, a.extend = function(g, m) {
			for (var o in m) {
				g[o] = m[o]
			}
		}, a.addEvent = function(r, g, q, m) {
			r.addEventListener(g, q, !! m)
		}, a.removeEvent = function(r, g, q, m) {
			r.removeEventListener(g, q, !! m)
		}, a.prefixPointerEvent = function(g) {
			return e.MSPointerEvent ? "MSPointer" + g.charAt(9).toUpperCase() + g.substr(10) : g
		}, a.momentum = function(n, C, t, E, g, m) {
			var B, o, D = n - C,
				r = l.abs(D) / t;
			return m = void 0 === m ? 0.0006 : m, B = n + r * r / (2 * m) * (0 > D ? -1 : 1), o = r / m, E > B ? (B = g ? E - g / 2.5 * (r / 8) : E, D = l.abs(B - n), o = D / r) : B > 0 && (B = g ? g / 2.5 * (r / 8) : 0, D = l.abs(n) + B, o = D / r), {
				destination: l.round(B),
				duration: o
			}
		};
		var f = c("transform");
		return a.extend(a, {
			hasTransform: f !== !1,
			hasPerspective: c("perspective") in b,
			hasTouch: "ontouchstart" in e,
			hasPointer: e.PointerEvent || e.MSPointerEvent,
			hasTransition: c("transition") in b
		}), a.isBadAndroid = /Android /.test(e.navigator.appVersion) && !/Chrome\/\d/.test(e.navigator.appVersion), a.extend(a.style = {}, {
			transform: f,
			transitionTimingFunction: c("transitionTimingFunction"),
			transitionDuration: c("transitionDuration"),
			transitionDelay: c("transitionDelay"),
			transformOrigin: c("transformOrigin")
		}), a.hasClass = function(g, m) {
			var o = new RegExp("(^|\\s)" + m + "(\\s|$)");
			return o.test(g.className)
		}, a.addClass = function(g, m) {
			if (!a.hasClass(g, m)) {
				var o = g.className.split(" ");
				o.push(m), g.className = o.join(" ")
			}
		}, a.removeClass = function(g, m) {
			if (a.hasClass(g, m)) {
				var o = new RegExp("(^|\\s)" + m + "(\\s|$)", "g");
				g.className = g.className.replace(o, " ")
			}
		}, a.offset = function(g) {
			for (var m = -g.offsetLeft, o = -g.offsetTop; g = g.offsetParent;) {
				m -= g.offsetLeft, o -= g.offsetTop
			}
			return {
				left: m,
				top: o
			}
		}, a.preventDefaultException = function(g, m) {
			for (var o in m) {
				if (m[o].test(g[o])) {
					return !0
				}
			}
			return !1
		}, a.extend(a.eventType = {}, {
			touchstart: 1,
			touchmove: 1,
			touchend: 1,
			mousedown: 2,
			mousemove: 2,
			mouseup: 2,
			pointerdown: 3,
			pointermove: 3,
			pointerup: 3,
			MSPointerDown: 3,
			MSPointerMove: 3,
			MSPointerUp: 3
		}), a.extend(a.ease = {}, {
			quadratic: {
				style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
				fn: function(g) {
					return g * (2 - g)
				}
			},
			circular: {
				style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
				fn: function(g) {
					return l.sqrt(1 - --g * g)
				}
			},
			back: {
				style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
				fn: function(g) {
					var m = 4;
					return (g -= 1) * g * ((m + 1) * g + m) + 1
				}
			},
			bounce: {
				style: "",
				fn: function(g) {
					return (g /= 1) < 1 / 2.75 ? 7.5625 * g * g : 2 / 2.75 > g ? 7.5625 * (g -= 1.5 / 2.75) * g + 0.75 : 2.5 / 2.75 > g ? 7.5625 * (g -= 2.25 / 2.75) * g + 0.9375 : 7.5625 * (g -= 2.625 / 2.75) * g + 0.984375
				}
			},
			elastic: {
				style: "",
				fn: function(p) {
					var g = 0.22,
						m = 0.4;
					return 0 === p ? 0 : 1 == p ? 1 : m * l.pow(2, -10 * p) * l.sin(2 * (p - g / 4) * l.PI / g) + 1
				}
			}
		}), a.tap = function(g, p) {
			var m = h.createEvent("Event");
			m.initEvent(p, !0, !0), m.pageX = g.pageX, m.pageY = g.pageY, g.target.dispatchEvent(m)
		}, a.click = function(g) {
			var p, m = g.target;
			/(SELECT|INPUT|TEXTAREA)/i.test(m.tagName) || (p = h.createEvent("MouseEvents"), p.initMouseEvent("click", !0, !0, g.view, 1, m.screenX, m.screenY, m.clientX, m.clientY, g.ctrlKey, g.altKey, g.shiftKey, g.metaKey, 0, null), p._constructed = !0, m.dispatchEvent(p))
		}, a
	}();
	k.prototype = {
		version: "5.1.3",
		_init: function() {
			this._initEvents()
		},
		destroy: function() {
			this._initEvents(!0), this._execEvent("destroy")
		},
		_transitionEnd: function(a) {
			a.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
		},
		_start: function(b) {
			if (!(1 != j.eventType[b.type] && 0 !== b.button || !this.enabled || this.initiated && j.eventType[b.type] !== this.initiated)) {
				!this.options.preventDefault || j.isBadAndroid || j.preventDefaultException(b.target, this.options.preventDefaultException) || b.preventDefault();
				var c, a = b.touches ? b.touches[0] : b;
				this.initiated = j.eventType[b.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = j.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, c = this.getComputedPosition(), this._translate(l.round(c.x), l.round(c.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = a.pageX, this.pointY = a.pageY, this._execEvent("beforeScrollStart")
			}
		},
		_move: function(n) {
			if (this.enabled && j.eventType[n.type] === this.initiated) {
				this.options.preventDefault && n.preventDefault();
				var c, a, f, g, b = n.touches ? n.touches[0] : n,
					r = b.pageX - this.pointX,
					d = b.pageY - this.pointY,
					t = j.getTime();
				if (this.pointX = b.pageX, this.pointY = b.pageY, this.distX += r, this.distY += d, f = l.abs(this.distX), g = l.abs(this.distY), !(t - this.endTime > 300 && 10 > f && 10 > g)) {
					if (this.directionLocked || this.options.freeScroll || (this.directionLocked = f > g + this.options.directionLockThreshold ? "h" : g >= f + this.options.directionLockThreshold ? "v" : "n"), "h" == this.directionLocked) {
						if ("vertical" == this.options.eventPassthrough) {
							n.preventDefault()
						} else {
							if ("horizontal" == this.options.eventPassthrough) {
								return void(this.initiated = !1)
							}
						}
						d = 0
					} else {
						if ("v" == this.directionLocked) {
							if ("horizontal" == this.options.eventPassthrough) {
								n.preventDefault()
							} else {
								if ("vertical" == this.options.eventPassthrough) {
									return void(this.initiated = !1)
								}
							}
							r = 0
						}
					}
					r = this.hasHorizontalScroll ? r : 0, d = this.hasVerticalScroll ? d : 0, c = this.x + r, a = this.y + d, (c > 0 || c < this.maxScrollX) && (c = this.options.bounce ? this.x + r / 3 : c > 0 ? 0 : this.maxScrollX), (a > 0 || a < this.maxScrollY) && (a = this.options.bounce ? this.y + d / 3 : a > 0 ? 0 : this.maxScrollY), this.directionX = r > 0 ? -1 : 0 > r ? 1 : 0, this.directionY = d > 0 ? -1 : 0 > d ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(c, a), t - this.startTime > 300 && (this.startTime = t, this.startX = this.x, this.startY = this.y, 1 == this.options.probeType && this._execEvent("scroll")), this.options.probeType > 1 && this._execEvent("scroll")
				}
			}
		},
		_end: function(g) {
			if (this.enabled && j.eventType[g.type] === this.initiated) {
				this.options.preventDefault && !j.preventDefaultException(g.target, this.options.preventDefaultException) && g.preventDefault();
				var a, r, c = (g.changedTouches ? g.changedTouches[0] : g, j.getTime() - this.startTime),
					f = l.round(this.x),
					t = l.round(this.y),
					n = l.abs(f - this.startX),
					b = l.abs(t - this.startY),
					p = 0,
					d = "";
				if (this.isInTransition = 0, this.initiated = 0, this.endTime = j.getTime(), !this.resetPosition(this.options.bounceTime)) {
					return this.scrollTo(f, t), this.moved ? this._events.flick && 200 > c && 100 > n && 100 > b ? void this._execEvent("flick") : (this.options.momentum && 300 > c && (a = this.hasHorizontalScroll ? j.momentum(this.x, this.startX, c, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
						destination: f,
						duration: 0
					}, r = this.hasVerticalScroll ? j.momentum(this.y, this.startY, c, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
						destination: t,
						duration: 0
					}, f = a.destination, t = r.destination, p = l.max(a.duration, r.duration), this.isInTransition = 1), f != this.x || t != this.y ? ((f > 0 || f < this.maxScrollX || t > 0 || t < this.maxScrollY) && (d = j.ease.quadratic), void this.scrollTo(f, t, p, d)) : void this._execEvent("scrollEnd")) : (this.options.tap && j.tap(g, this.options.tap), this.options.click && j.click(g), void this._execEvent("scrollCancel"))
				}
			}
		},
		_resize: function() {
			var a = this;
			clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
				a.refresh()
			}, this.options.resizePolling)
		},
		resetPosition: function(b) {
			var c = this.x,
				a = this.y;
			return b = b || 0, !this.hasHorizontalScroll || this.x > 0 ? c = 0 : this.x < this.maxScrollX && (c = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? a = 0 : this.y < this.maxScrollY && (a = this.maxScrollY), c == this.x && a == this.y ? !1 : (this.scrollTo(c, a, b, this.options.bounceEasing), !0)
		},
		disable: function() {
			this.enabled = !1
		},
		enable: function() {
			this.enabled = !0
		},
		refresh: function() {
			this.wrapper.offsetHeight;
			this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = j.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
		},
		on: function(a, b) {
			this._events[a] || (this._events[a] = []), this._events[a].push(b)
		},
		off: function(b, c) {
			if (this._events[b]) {
				var a = this._events[b].indexOf(c);
				a > -1 && this._events[b].splice(a, 1)
			}
		},
		_execEvent: function(b) {
			if (this._events[b]) {
				var c = 0,
					a = this._events[b].length;
				if (a) {
					for (; a > c; c++) {
						this._events[b][c].apply(this, [].slice.call(arguments, 1))
					}
				}
			}
		},
		scrollBy: function(c, d, b, a) {
			c = this.x + c, d = this.y + d, b = b || 0, this.scrollTo(c, d, b, a)
		},
		scrollTo: function(c, d, b, a) {
			a = a || j.ease.circular, this.isInTransition = this.options.useTransition && b > 0, !b || this.options.useTransition && a.style ? (this._transitionTimingFunction(a.style), this._transitionTime(b), this._translate(c, d)) : this._animate(c, d, b, a.fn)
		},
		scrollToElement: function(c, d, g, f, a) {
			if (c = c.nodeType ? c : this.scroller.querySelector(c)) {
				var b = j.offset(c);
				b.left -= this.wrapperOffset.left, b.top -= this.wrapperOffset.top, g === !0 && (g = l.round(c.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), f === !0 && (f = l.round(c.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), b.left -= g || 0, b.top -= f || 0, b.left = b.left > 0 ? 0 : b.left < this.maxScrollX ? this.maxScrollX : b.left, b.top = b.top > 0 ? 0 : b.top < this.maxScrollY ? this.maxScrollY : b.top, d = void 0 === d || null === d || "auto" === d ? l.max(l.abs(this.x - b.left), l.abs(this.y - b.top)) : d, this.scrollTo(b.left, b.top, d, a)
			}
		},
		_transitionTime: function(a) {
			a = a || 0, this.scrollerStyle[j.style.transitionDuration] = a + "ms", !a && j.isBadAndroid && (this.scrollerStyle[j.style.transitionDuration] = "0.001s")
		},
		_transitionTimingFunction: function(a) {
			this.scrollerStyle[j.style.transitionTimingFunction] = a
		},
		_translate: function(a, b) {
			this.options.useTransform ? this.scrollerStyle[j.style.transform] = "translate(" + a + "px," + b + "px)" + this.translateZ : (a = l.round(a), b = l.round(b), this.scrollerStyle.left = a + "px", this.scrollerStyle.top = b + "px"), this.x = a, this.y = b
		},
		_initEvents: function(c) {
			var b = c ? j.removeEvent : j.addEvent,
				a = this.options.bindToWrapper ? this.wrapper : e;
			b(e, "orientationchange", this), b(e, "resize", this), this.options.click && b(this.wrapper, "click", this, !0), this.options.disableMouse || (b(this.wrapper, "mousedown", this), b(a, "mousemove", this), b(a, "mousecancel", this), b(a, "mouseup", this)), j.hasPointer && !this.options.disablePointer && (b(this.wrapper, j.prefixPointerEvent("pointerdown"), this), b(a, j.prefixPointerEvent("pointermove"), this), b(a, j.prefixPointerEvent("pointercancel"), this), b(a, j.prefixPointerEvent("pointerup"), this)), j.hasTouch && !this.options.disableTouch && (b(this.wrapper, "touchstart", this), b(a, "touchmove", this), b(a, "touchcancel", this), b(a, "touchend", this)), b(this.scroller, "transitionend", this), b(this.scroller, "webkitTransitionEnd", this), b(this.scroller, "oTransitionEnd", this), b(this.scroller, "MSTransitionEnd", this)
		},
		getComputedPosition: function() {
			var c, b, a = e.getComputedStyle(this.scroller, null);
			return this.options.useTransform ? (a = a[j.style.transform].split(")")[0].split(", "), c = +(a[12] || a[4]), b = +(a[13] || a[5])) : (c = +a.left.replace(/[^-\d.]/g, ""), b = +a.top.replace(/[^-\d.]/g, "")), {
				x: c,
				y: b
			}
		},
		_animate: function(r, c, p, a) {
			function g() {
				var o, n, m, q = j.getTime();
				return q >= f ? (b.isAnimating = !1, b._translate(r, c), void(b.resetPosition(b.options.bounceTime) || b._execEvent("scrollEnd"))) : (q = (q - t) / p, m = a(q), o = (r - s) * m + s, n = (c - d) * m + d, b._translate(o, n), b.isAnimating && i(g), void(3 == b.options.probeType && b._execEvent("scroll")))
			}
			var b = this,
				s = this.x,
				d = this.y,
				t = j.getTime(),
				f = t + p;
			this.isAnimating = !0, g()
		},
		handleEvent: function(a) {
			switch (a.type) {
			case "touchstart":
			case "pointerdown":
			case "MSPointerDown":
			case "mousedown":
				this._start(a);
				break;
			case "touchmove":
			case "pointermove":
			case "MSPointerMove":
			case "mousemove":
				this._move(a);
				break;
			case "touchend":
			case "pointerup":
			case "MSPointerUp":
			case "mouseup":
			case "touchcancel":
			case "pointercancel":
			case "MSPointerCancel":
			case "mousecancel":
				this._end(a);
				break;
			case "orientationchange":
			case "resize":
				this._resize();
				break;
			case "transitionend":
			case "webkitTransitionEnd":
			case "oTransitionEnd":
			case "MSTransitionEnd":
				this._transitionEnd(a);
				break;
			case "wheel":
			case "DOMMouseScroll":
			case "mousewheel":
				this._wheel(a);
				break;
			case "keydown":
				this._key(a);
				break;
			case "click":
				a._constructed || (a.preventDefault(), a.stopPropagation())
			}
		}
	}, k.utils = j, "undefined" != typeof module && module.exports ? module.exports = k : e.IScroll = k
}(window, document, Math); 