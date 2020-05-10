/* FILE BEGIN common/script/openClient.js */
(function() {
	closeClient();
	var f = $.cookie("wapToEbay");
	var d = $("#appType").val();
	var e = $("#openappURL").val();
	snwapapp = self.sn || {};
	snwapapp.dlp = "http://mapp.suning.com/a.php?s=qrcode/offline&f=ygznwpdt&pack=com.suning.mobile.ebuy ";
	if (!navigator.userAgent.match(/SNEBUY-APP;?/i) && !f) {
		$.ajax({
			type: "get",
			url: URLPrefix.search_mobileUrl + "/queryNVP/jsonp.do?name=" + d,
			dataType: "jsonp",
			cache: true,
			jsonpCallback: "openAppJsonpCallback",
			success: function(a) {
				if (a && a.value == "1") {
					$("#cBlue").html(a.description)
				}
			}
		})
	}
	$(".a-dds_btns").click(function() {
		switch (d) {
		case "openApp_Search":
			snwapapp.iphoneUrl = "com.suning.SuningEbuy://http://m.suning.com?adTypeCode=30&cityId=" + searcher.searchParams.cityId + "&keyword=" + encodeURIComponent(searcher.searchParams.keyword) + "&cp=" + searcher.searchParams.cp + "&ps=" + (searcher.searchParams.ps * (searcher.searchParams.cp + 1)) + "&st=" + searcher.searchParams.st + "&set=5&cf=" + searcher.searchParams.cf + "&iv=" + searcher.searchParams.iv + "&ci=" + searcher.searchParams.ci;
			snwapapp.androidUrl = "suning://m.suning.com/index.html?adTypeCode=30&cityId=" + searcher.searchParams.cityId + "&keyword=" + encodeURIComponent(searcher.searchParams.keyword) + "&cp=" + searcher.searchParams.cp + "&ps=" + (searcher.searchParams.ps * (searcher.searchParams.cp + 1)) + "&st=" + searcher.searchParams.st + "&set=5&cf=" + searcher.searchParams.cf + "&iv=" + searcher.searchParams.iv + "&ci=" + searcher.searchParams.ci;
			break;
		default:
			break
		}
		var i = navigator.userAgent;
		if (i.match(/(iPhone|iPod|iPad);?/i)) {
			var b = new Date();
			var c = i.match(/(iPhone\sOS)\s([\d]+)/) || i.match(/(iPad).*OS\s([\d_]+)/) || i.match(/(iPod)(.*OS\s([\d_]+))?/);
			var j = parseInt(c[2], 10);
			if (j >= 9) {
				window.location.href = snwapapp.iphoneUrl
			} else {
				iframeBridge(snwapapp.iphoneUrl)
			}
			var a = true;
			window.onblur = function() {
				a = false
			};
			window.setTimeout(function() {
				var g = new Date();
				if (g - b < 5000) {
					if (navigator.userAgent.match(/MicroMessenger/i)) {
						window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.suning.mobile.ebuy&g_f=992129";
						return
					}
					window.location.replace("http://code.suning.cn/HPj8dy")
				} else {
					window.close()
				}
			}, 2000)
		} else {
			if (i.match(/android/i)) {
				iframeBridge(snwapapp.androidUrl);
				if (navigator.userAgent.match(/MicroMessenger/i)) {
					window.location = "http://code.suning.cn/HPj8dy";
					return
				}
				var a = true;
				window.onblur = function() {
					a = false
				};
				setTimeout(function() {
					if (a) {
						window.location.href = snwapapp.dlp
					}
				}, 2000)
			}
		}
	})
})();

function iframeBridge(d) {
	var c = document.createElement("iframe");
	c.src = d;
	c.style.display = "none";
	document.body.appendChild(c);
	setTimeout(function() {
		document.body.removeChild(c)
	}, 2000)
}

function closeClient() {
	if ($.cookie("_isopenapp") == "true") {
		$(".float-b").css("display", "none")
	}
}
$(".float-b").find("b").click(function() {
	$(this).parent().css("display", "none");
	var b = new Date();
	b.setTime(b.getTime() + (appTimeOut * 1000));
	$.cookie("_isopenapp", "true", {
		path: "/",
		domain: URLPrefix.cookie_domain,
		expires: b
	})
}); 