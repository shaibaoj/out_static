/* FILE BEGIN search/script/search/brandRecommend.js */
		(function(c, b) {
			var a = {
				iScroll: "",
				init: function() {
					this._setWidth(function(d) {
						if (d) {
							this.iScroll = new IScroll("#brand_rmd", {
								scrollX: true,
								scrollY: false,
								mouseWheel: true
							})
						}
					});
					b("#brand_rmd a").on("tap", function() {
						location.href = this.href
					})
				},
				_setWidth: function(e) {
					var d = b("#brand_rmd .brand-scroll");
					var f = d.find("li").length * 3.2 + 1;
					var g = b(c).width();
					var h = c.document;
					var i = +getComputedStyle(h.documentElement).fontSize.replace("px", "");
					if (f * i < g) {
						f = "102%"
					} else {
						f += "rem"
					}
					d.css("width", f);
					e && e(f)
				},
				refresh: function() {
					this._setWidth();
					this.iScroll && this.iScroll.refresh()
				}
			};
			c.addEventListener("load", function() {
				if (!b(".brand-rmd").length) {
					return
				}
				a.init()
			});
			c.addEventListener("onorientationchange" in c ? "orientationchange" : "resize", function() {
				setTimeout(function() {
					a.refresh()
				}, 100)
			}, false)
		})(window, Zepto);