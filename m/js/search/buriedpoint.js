/* FILE BEGIN common/script/buriedpoint.js */
		(function() {
			var b = function() {
					var i = document,
						f, p = [],
						h = [],
						e;

					function g(k, d) {
						var j, l;
						a();
						if (k.src) {
							k.src = k.src.constructor === Array ? k.src : [k.src];
							for (var m = 0; m < k.src.length; m++) {
								if (k.src[m].constructor !== Array) {
									k.src[m] = [k.src[m]]
								}
								h.push(k.src[m])
							}
						}
						p = h.shift();
						f = f || i.getElementsByTagName("head")[0];
						k.src = p;
						for (var m = 0; m < k.src.length; m++) {
							l = k.src[m];
							j = i.createElement("script");
							j.src = l;
							j.type = "text/javascript";
							if (e.ie) {
								j.onreadystatechange = function() {
									var n = this.readyState;
									if (n === "loaded" || n === "complete") {
										this.onreadystatechange = null;
										c(k, d)
									}
								}
							} else {
								j.onload = j.onerror = function() {
									c(k, d)
								}
							}
							f.appendChild(j)
						}
					}

					function c(j, d) {
						var k = p;
						if (!k) {
							return
						}
						k.shift();
						if (!k.length) {
							if (h.length) {
								g(j, d)
							} else {
								if (typeof d == "function") {
									d()
								}
								return
							}
						}
					}

					function a() {
						if (e) {
							return
						}
						var d = /msie/i.test(navigator.userAgent.toLowerCase());
						e = {
							ie: d
						}
					}
					return {
						init: function(j, d) {
							g(j, d)
						}
					}
				}();
			if (navigator.userAgent.match(/SNEBUY-APP/i)) {
				document.body.insertAdjacentHTML("beforeend", '<input type="hidden" id="resourceType" value="inapp">')
			} else {
				document.body.insertAdjacentHTML("beforeend", '<input type="hidden" id="resourceType" value="wap">')
			}
			window.addEventListener("load", function() {
				b.init({
					src: [getSearchJsFilePath()]
				})
			})
		})();

		function getSearchJsFilePath() {
			var n = document.location.hostname;
			var o = /^\w*?.suning.com$/;
			var m = /^\w*?pre.cnsuning.com$/;
			var j = /^\w*?sit.cnsuning.com$/;
			var i = "";
			if (o.test(n)) {
				i = ("https:" == document.location.protocol) ? "https://imgssl.suning.com" : "http://script.suning.cn"
			} else {
				if (m.test(n)) {
					i = ("https:" == document.location.protocol) ? "https://preimgssl.suning.com" : "http://prescript.suning.cn"
				} else {
					if (j.test(n)) {
						var k = n.charAt(n.indexOf("sit") + 3);
						var p = "https://sit1imgssl.suning.com";
						var l = "http://sit1script.suning.cn";
						i = ("https:" == document.location.protocol) ? p : l
					} else {
						i = ("https:" == document.location.protocol) ? "https://imgssl.suning.com" : "http://script.suning.cn"
					}
				}
			}
			i = i + "/javascript/sn_da/da_opt.js";
			return i
		}; 