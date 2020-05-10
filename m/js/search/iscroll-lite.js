/* FILE BEGIN search/script/search/iscroll-lite.js */
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