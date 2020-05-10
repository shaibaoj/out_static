/* FILE BEGIN common/script/module/lazyload/1.0.0/lazyload.js */
(function(d, c) {
	if (typeof module !== "undefined" && module.exports) {
		module.exports = c()
	} else {
		if (typeof define === "function" && define.amd) {
			define(c)
		} else {
			d.lazyload = c.call(d)
		}
	}
})(this, function() {
	function b(f, e) {
		var a = null;
		$(f).find("img").each(function() {
			!$(f).hasClass("lazyimg") && $(f).addClass("lazyimg");
			var c = $(this)[0];
			if (c.getAttribute("data-src") == null) {
				return
			}
			if ($(this).offset().top < window.innerHeight && c.getAttribute("data-src") != "done") {
				c.onerror = function() {
					this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
				};
				c.src = c.getAttribute("data-src");
				c.setAttribute("data-src", "done")
			}
		});
		window.addEventListener("scroll", function() {
			a = setTimeout(function() {
				$(f).find("img").each(function() {
					!$(f).hasClass("lazyimg") && $(f).addClass("lazyimg");
					var c = $(this)[0];
					if (c.getAttribute("data-src") == null) {
						return
					}
					var d = $(this).offset().top;
					var h = window.innerHeight || window.screen.height;
					if (window.pageYOffset > d + h || window.pageYOffset < d - h && c.getAttribute("data-src") != "done") {
						clearTimeout(a);
						return
					}
					if (window.pageYOffset > d - h && c.getAttribute("data-src") != "done") {
						c.onerror = function() {
							this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
						};
						c.src = c.getAttribute("data-src");
						c.setAttribute("data-src", "done")
					}
				});
				if (typeof e == "function") {
					$(f).each(function() {
						var c = $(this)[0];
						var d = $(this).offset().top;
						var h = window.innerHeight || window.screen.height;
						if (window.pageYOffset > d + h || window.pageYOffset < d - h && c.getAttribute("data-loaded") != "done") {
							clearTimeout(a);
							return
						}
						if (window.pageYOffset > d - h - 30 && c.getAttribute("data-loaded") != "done") {
							e($(f))
						}
					})
				}
			}, 80)
		}, false)
	}
	if (window.Zepto || window.jQuery) {
		(function(a) {
			a.fn.lazyload = function(d) {
				return this.each(function() {
					b(a(this), d)
				})
			}
		})(window.Zepto || window.jQuery)
	}
	return b
}); 