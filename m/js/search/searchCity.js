/* FILE BEGIN search/script/search/searchCity.js */
$(function() {
	var e = $("#J_provinceList").find("li");
	var b = $("#J_cityWrap");
	var d = $(".city-btn").find(".fr");
	var f = $.cookie("cityId");
	var c = $.cookie("provinceCode");
	var a = $.cookie("cityName");
	if (c != "null" && c != undefined) {
		$.ajax({
			type: "GET",
			url: "http://product.m.suning.com/pds-web/getCityListCb/jsonp/" + c + "_callback.html",
			cache: true,
			async: false,
			dataType: "jsonp",
			jsonpCallback: "callback",
			success: function(h) {
				var j = "<ul>";
				for (var g = 0; g < h.cityList.length; g++) {
					if (h.cityList[g].provinceCode == c) {
						$("#J_provinceList").find('li[pcode="' + c + '"]').addClass("cur").siblings().removeClass("cur")
					}
					if (h.cityList[g].cityNo == f) {
						j += '<li class="cur" data-meta=\'' + JSON.stringify(h.cityList[g]) + '\'><a href="javascript:;" id=' + h.cityList[g].cityNo + "  provinceCode=" + h.cityList[g].provinceCode + ">" + h.cityList[g].cityName + "</a></li>";
						d.text(h.cityList[g].cityName);
						d.attr("sel-val", h.cityList[g].cityNo);
						d.attr("pcode", h.cityList[g].provinceCode)
					} else {
						j += "<li data-meta='" + JSON.stringify(h.cityList[g]) + '\'><a href="javascript:;" id=' + h.cityList[g].cityNo + "  provinceCode=" + h.cityList[g].provinceCode + ">" + h.cityList[g].cityName + "</a></li>"
					}
				}
				j += "</ul>";
				b.find("#J_cityList").empty();
				b.find("#J_cityList").append(j)
			}
		})
	}
}); 