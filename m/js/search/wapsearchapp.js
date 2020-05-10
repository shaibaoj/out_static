/* FILE BEGIN search/script/search/wapsearchapp.js */
		var delay = null;

		function initEvent() {
			var a = $(".searchInp").val();
			topDownloadApp(encodeURIComponent(a))
		}

		function topDownloadApp(d) {
			if ($("#channel_type").val() == "hwg" || $("#channel_type").val() != "") {
				return
			}
			var c = "com.suning.SuningEbuy://";
			var e = "suning://m.suning.com/index.html";
			if (d) {
				c += "http://m.suning.com?adTypeCode=1023&adId=" + d;
				e += "?adTypeCode=1023&adId=" + d
			}
			var b = $.cookie("traceId");
			if (b != null && b != undefined) {
				c += /\?/.test(c) ? "&traceId" : "?traceId";
				e += /\?/.test(e) ? "&traceId" : "?traceId"
			}
			var g = navigator.userAgent;
			if (g.match(/(iPhone|iPod|iPad);?/i)) {
				var a = new Date();
				var h = g.match(/(iPhone\sOS)\s([\d]+)/) || g.match(/(iPad).*OS\s([\d_]+)/) || g.match(/(iPod)(.*OS\s([\d_]+))?/);
				var f = parseInt(h[2], 10);
				if (f >= 9) {
					window.location = c
				} else {
					iframeBridge(c)
				}
			} else {
				if (g.match(/android/i)) {
					iframeBridge(e)
				}
			}
		}

		function iframeBridge(a) {
			var b = document.createElement("iframe");
			b.src = a;
			b.style.display = "none";
			document.body.appendChild(b);
			setTimeout(function() {
				document.body.removeChild(b)
			}, 1000)
		}
		$(".down-link").on("click", function() {
			var a = $(".searchInp").val();
			if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i) || navigator.userAgent.match(/android/i)) {
				window.location.href = "http://code.suning.cn/HPj8dy"
			} else {
				window.location.href = URLPrefix.search_mobileUrl + "/search/" + encodeURIComponent($.trim(url_encode(a))) + "/"
			}
		}); 