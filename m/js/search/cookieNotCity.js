/* FILE BEGIN search/script/search/cookieNotCity.js */
$(function() {
	if (!$.cookie("cityId")) {
		$.ajax({
			type: "GET",
			url: "http://ipservice.suning.com/ipQuery.do",
			cache: !0,
			dataType: "jsonp",
			jsonpCallback: "jsonpCallback",
			success: function(b) {
				if (b.cityCommerceId) {
					var a = new Date();
					a.setTime(a.getTime() + (12 * 60 * 60 * 1000));
					$.cookie("cityId", b.cityCommerceId, {
						path: "/",
						domain: URLPrefix.cookie_domain,
						expires: a
					});
					$.cookie("provinceCode", b.provinceCommerceId, {
						path: "/",
						domain: URLPrefix.cookie_domain,
						expires: a
					});
					$.cookie("cityName", b.cityName, {
						path: "/",
						domain: URLPrefix.cookie_domain,
						expires: a
					})
				}
			}
		})
	}
}); 