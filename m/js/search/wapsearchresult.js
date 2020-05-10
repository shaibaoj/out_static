/* FILE BEGIN search/script/search/wapsearchresult.js */
var isSort = false;
var index_i = 10;
var productAD = {};
var ssggdpkg = param.ssggdpkg;
var batchLoadInfo = param.wapDsPriceBatchSug;
var isRank = false;
var batchLoadSize = batchLoadInfo ? (param.dsPriceBatchSize || 10) : 1;
var imgLoaderHandler = null;
var _appFlag = false;
var searcher = {
	init: function() {
		var c = this;
		var d = $("#keyword").val();
		var b = $("#channel").val();
		var f = $("#cityId").val();
		c.searchParams.keyword = $.trim(d);
		c.searchParams.channel = b;
		c.searchParams.cityId = $.cookie("cityId") || f;
		var e = $("#cateoryFlag").val();
		if (e == "") {
			c.searchParams.cf = $("#cf").val() || "";
			c.searchParams.ci = $("#fileterCi").val() || ""
		}
		searcher.$productsList = $("#productsList");
		var a = $("#operate").val();
		if (a == "1") {
			c.searchParams.operate = a
		}
		util.lazyload.registerCallback("#productsList li,#expandList li", function(g) {
			if (batchLoadInfo) {
				util.RI.batchLoad(g.items)
			} else {
				util.RI.loadProductInfoByRichInterface(this)
			}
		}, true, batchLoadSize)
	},
	isload: false,
	isFilterQueryData: false,
	pageCurrent: 0,
	searchAmount: searchCount,
	searchParams: {
		cityId: "",
		keyword: "",
		channel: "",
		cp: 0,
		ps: 10,
		st: 0,
		set: 5,
		cf: "",
		iv: -1,
		ci: "",
		ct: -1,
		channelId: "WAP",
		sp: "",
		sg: "",
		sc: "",
		prune: "",
		operate: "0",
		isAnalysised: "",
		istongma: "1",
		v: "99999999"
	},
	rSearchParams: {
		cityId: "",
		parameter: "",
		sceneIds: "10-7",
		count: 6
	},
	queryData: function() {
		$("#expandInfo").hide();
		$("#expandList").hide();
		var p = $(".searchInp").val();
		var r = this;
		var f = $("#categoryId").val();
		var m = $("#cateoryFlag").val();
		var a = $("#cf").val();
		if (f != null && f.length > 0) {
			r.searchParams.ci = f
		}
		if (m != "" && m.length > 0) {
			searcher.isFilterQueryData = true;
			r.searchParams.cf = a;
			isSort = true;
			if (a != "0") {
				ssggdpkg = false
			}
		}
		if (resultType == 5 || resultType == 1) {
			$(".searchInp").val(searcher.searchParams.keyword)
		}
		if (!searcher.searchParams.cp) {
			var h = $("#fileterCi").val();
			if (searcher.searchParams.keyword != "") {
				var k = $(".filter-alone-fl").find("dt span.fr").attr("sel-val");
				if (k == "" || k == undefined) {
					if ($("#analysisedDirectory").val()) {
						searcher.searchParams.ci = $("#analysisedDirectory").val()
					} else {
						searcher.searchParams.ci = h
					}
					searcher.searchParams.sc = "0"
				} else {
					searcher.searchParams.ci = $("#categoryId").val() || h
				}
			} else {
				searcher.searchParams.ci = $("#analysisedDirectory").val() || $("#categoryId").val()
			}
			var c = $("#cf").val();
			var e = $("#analysisedBrand").val();
			var j = $("#fileterCf").val();
			if (searcher.searchParams.keyword != "") {
				var l = $(".filter-mulbrand").find("dt span.fr").attr("sel-val");
				if (l != "" && l != undefined) {
					if (j) {
						searcher.searchParams.cf = j
					} else {
						searcher.searchParams.cf = l
					}
				} else {
					if (e) {
						searcher.searchParams.cf = e;
						searcher.searchParams.sc = "0"
					} else {
						if (j) {
							searcher.searchParams.cf = j;
							searcher.searchParams.sc = "0"
						} else {
							searcher.searchParams.cf = ""
						}
					}
				}
			} else {
				searcher.searchParams.cf = j
			}
		}
		if (searcher.searchParams.channel == "99999998") {
			searcher.searchParams.channel = ""
		}
		if ($("#channel_type").val() == "hwg") {
			var n = searcher.searchParams.sp;
			if (!n) {
				searcher.searchParams.sp = "hwg"
			}
		}
		if (searcher.searchParams.ci == "0" || searcher.searchParams.ci == 0) {
			searcher.searchParams.ci = ""
		}
		var g = "";
		if ($("#isAnalysised").val() == "1") {
			searcher.searchParams.isAnalysised = "1"
		} else {
			searcher.searchParams.isAnalysised = "0"
		}
		for (key in r.searchParams) {
			g += key + "=" + encodeURIComponent(r.searchParams[key]) + "&"
		}

		function o() {
			return searcher._isFilterQueryData ? true : false
		}

		function i() {
			var s = searcher.searchParams;
			if (s.cf || s.ct != -1 || s.sp || (s.ci && s.ci != "0") || searcher._isCityChange) {
				return true
			}
			return false
		}
		
		function query_coupon(){
			var numIids = "";
	    	var sellerIds = "";
	    	$("#productsList>li").each(function(i,o){
				var $this = $(o);
				if(!$(o).hasClass("utilLazyLoadClass1")){					
					var numIid = $this.attr("data-item-id");
					var sellerId = $this.attr("data-seller-id");
					if(numIid&&numIid!=''){
						numIids = numIids+(i>0?",":"")+numIid;
						sellerIds = sellerIds+(i>0?",":"")+sellerId;
					}
				}
			});
	    	
//			$.ajax({
//				url: URLPrefix.search +"/common/coupon.php?callback=?",
//				data:{numIids:numIids,sellerIds:sellerIds},
//				type: "get",
//				dataType: "jsonp",
//				cache: true,
//				setTimeout: 3000,
//				jsonp: "callback",
//				jsonpCallback: "success_jsonpCallback",
//				success: function(data) {
//					if(data.items&&data.items!=null){
//						var html = "";
//						var numIids = "";
//						$.each(data.items, function(i,item){   
//							var $item_tag = $("[data-seller-id="+i+"]",$("#productsList>li"));
//							var $item_img_tag = $item_tag.find(".product-label");
//							$item_img_tag.append("<a target=\"_blank\" href=\""+URLPrefix.search+"/coupon.php?numIid="+$item_tag.attr("data-item-id")+"&sellerId="+i+"\"><i class=\"djh\">有优惠券</i></a>");
//						});
//					}
//				},
//				error: function() {}
//			})
	    	
			$.getJSON("/common/coupon.php?callback=?", {numIids:numIids,sellerIds:sellerIds}, function(data){
				if(data.items&&data.items!=null){
					var html = "";
					var numIids = "";
					var $item_tag_list = $("#productsList>li");
					$item_tag_list.each(function(ii,oo){
						$item_tag = $(oo);
						
						$.each(data.items, function(i,item){   
							if($item_tag.attr("data-seller-id")==i){
								
//							var $item_tag = $("#productsList>li[data-seller-id='"+i+"']");
								var $item_img_tag = $item_tag.find(".product-label");
								$item_img_tag.html("<a target=\"_blank\" href=\""+URLPrefix.search_mobileUrl+"/coupon.php?numIid="+$item_tag.attr("data-item-id")+"&sellerId="+i+"\"><i class=\"djh\">有优惠券</i></a>");
								
								//直达quan
								var goods_money = parseFloat($item_tag.attr("data-money"));
								var item_coupon_current = null;
//						var q = parseFloat(I.zkPrice).toFixed(2);
								var num_iid =  $item_tag.attr("data-item-id");
								if(item){
									$.each(item, function(j,item_coupon){ 
										var items_iid_arr = new Array();
										if(item_coupon.items&&item_coupon.items!=null&&item_coupon.items!='null'&&item_coupon.items!=''){
											var items_json = JSON.parse(item_coupon.items);
											$.each(items_json, function(ii,item_num_iid){
												items_iid_arr.push(item_num_iid);
											});
										}
										if(goods_money>=parseFloat(item_coupon.condition)&&(item_coupon.shop_all!='2'||items_iid_arr.indexOf(num_iid)>-1)){
											if(item_coupon_current==null||parseFloat(item_coupon.money)>parseFloat(item_coupon_current.money)){
												item_coupon_current = item_coupon;
											}
										}
									});
								}
								if(item_coupon_current!=null){
									$item_img_tag.append("<a target=\"_blank\" href=\""+URLPrefix.search_mobileUrl+"/activity.php?numIid="+$item_tag.attr("data-item-id")+"&sellerId="+i+"&activity_id="+item_coupon_current.activity_id+"\"><i class=\"djh\">直领"+item_coupon_current.money+"元券</i></a>");
								}
							}
							
						});
						
					});	
				}
			});
	    	
		}

		function d(I) {
			var C;
			if (I != null&& I.data != null && I.data.paginator != null&& I.data.paginator.items != null) {
				C = parseInt(I.data.paginator.items, 10) || 0
			} else {
				C = 0
			}
			searcher.searchAmount = C;
			$("#searchCount").html(C);
			var D;
//			if (I != null && I.data != null && I.data.pageList != null && I.data.pageList.length > 0) {
//				D = I.data.pageList.length
//			} else {
//				D = 0
//			}
			$("#loading").hide();
			if (C == 0 && D == 0) {
				$("#productsListArea").hide();
				$(".cut-ts").hide();
				$(".result-err").hide();
				$(".result-list").hide();
				$("#end_load").hide();
				$(".result-type").hide();
				$("#loading").hide();
				$(".keywords-list").hide();
				var s = $("#noResultMsg");
				s.empty();
				if (m && m.length > 0) {
					if (o()) {
						var t = '<img src="' + URLPrefix.search_static_res + '/m/css/search/images/noResult.png" width="48" height="66" alt=""/><p class="none-info">抱歉，没有找到符合条件的商品</p><p class="none-tip">您可以修改筛选条件试试看</p>'
					} else {
						var t = '<img src="' + URLPrefix.search_static_res + '/m/css/search/images/noResult.png" width="48" height="66" alt=""/><p class="none-info">抱歉，没有找到符合条件的商品</p><p class="none-tip">您可以输入关键词试试看</p>'
					}
				} else {
					if (o()) {
						var t = '<img src="' + URLPrefix.search_static_res + '/m/css/search/images/noResult.png" width="48" height="66" alt=""/><p class="none-info">抱歉，没有找到符合条件的商品</p><p class="none-tip">您可以修改筛选条件试试看</p>'
					} else {
						var t = '<img src="' + URLPrefix.search_static_res + '/m/css/search/images/noResult.png" width="48" height="66" alt=""/><p class="none-info">抱歉，没有找到相关商品</p><p class="none-tip">您可以输入其他关键词试试看</p>'
					}
				}
				s.append(t);
				s.show();
				if ($("#channel_type").val() != "hwg" && $("#channel_type").val() == "") {
					if (searcher.searchParams.ci != "" && searcher.searchParams.ci > 0) {
						searcher.rSearchParams.parameter = searcher.searchParams.ci;
						searcher.rSearchParams.sceneIds = "10-8";
						$("#hotTitle").html("热销商品");
//						r.queryRecommendGoods()
					} else {
						searcher.rSearchParams.parameter = $("#keyword").val();
						searcher.rSearchParams.sceneIds = "10-7";
						$("#hotTitle").html("推荐商品");
//						r.queryRecommendGoods()
					}
				}
			} else {
				if (D > 0) {
					$("#result-sort").remove();
					$(".result-type").hide();
					var F = "";
//					var z = I.subSearchResults[0].subkey || "";
//					if (z) {
//						var w = z.substring(0, z.indexOf("@"));
//						if (w == "") {
//							F = z
//						} else {
//							F = w
//						}
//					}
					var y = $("#keyword").val();
					y = html_encode(y);
					var E = html_encode(F);
					var A = html_encode(encodeURIComponent(F));
					var B = "";
					var v = "jcTip";
					if (I.resultType == "4") {
						v = "mgTip";
						B = '<div><img src="' + URLPrefix.search_static_res + '/m/css/search/images/noResult03.png" width="43" height="54"><div><p class="info-title">根据相关法律法规和政策</p><p class="other-tip">无法显示相关商品</p>';
						if (F) {
							B += '<p class="other-tip">我们为您推荐“<a name="${md_prefix}_none_ts_mgts" href="' + URLPrefix.search_mobileUrl + "/search/" + A + '/">' + E + "</a>”的相关商品。</p>"
						}
						B += "</div></div>"
					} else {
						B = '<div><img src="' + URLPrefix.search_static_res + '/m/css/search/images/noResult.png" width="43" height="54"><div><p class="info-title">抱歉，没有找到\'' + y + '\'相关商品</p><p class="other-tip">我们为您提供了<a name="wapsssry_none_ts_jcts" href="' + URLPrefix.search_mobileUrl + "/search/" + A + '/">' + E + "</a>的搜索结果</p>            </div></div>"
					}
					$("#domId").html(B);
					$("#domId").show();
					wap.product.clearProducts();
					wap.product.addProducts(I.data.pageList.slice(0, 10));
					lazyloadPromotionLabel()
				} else {
					if (I.expandSearchResult && !i()) {
						$("#expandInfo").find("a").attr("exp-word", html_encode(I.expandSearchResult[0])).text(slasher(I.expandSearchResult[0], 5));
						$("#expandList").empty();
						var H = I.expandProducts;
						if (I.expandProducts.length > 8) {
							H = I.expandProducts.slice(0, 8)
						}
						wap.product.addProducts(H, $("#expandList"));
						$("#expandInfo").show();
						$("#expandList").show()
					}
					if (I.isPrune == "1") {
						var G = '已过滤掉部分商品，<br><a href="javascript:void(0);">点击可查看全部</a>';
						$("#cut_ts").html(G);
						$("#cut_hint").show();
						$(".keywords-list").hide()
					}
					$(".result-list").show();
					$(".result-type").show();
					$("#result-sort").removeAttr("style");
					$("#reGoodsDiv").hide();
					$(".hotlists").hide();
					var x = $("#rewriteInfo").is(":visible");
					$(".result-err").hide();
					$("#noResultMsg").hide();
					$("#productsListArea").show();
					$("#searchFilter").show();
					if (x) {
						$("#rewriteInfo").show()
					}
					if (I.isPrune == "1") {
						$("#cut_hint").show();
						$(".keywords-list").hide()
					}
					if (!i() && I.expandSearchResult) {
						$("#expandInfo").show()
					}
					if (C < 8) {
						if (searcher.searchParams.ci) {
//							_loadTuijian()
						} else {
							if (!I.expandSearchResult) {
//								_loadTuijian()
							}
						}
					}
					wap.product.addProducts(I.data.pageList);
					if (ssggdpkg) {
						if ($("#channel_type").val() == "hwg" || $("#channel_type").val() != "") {} else {
//							searcher.insertAD()
						}
					}
					lazyloadPromotionLabel();
					searcher.pageCurrent = parseInt(searcher.pageCurrent) + 1;
					if (C < searcher.searchParams.ps) {
						$("#end_load").show()
					}
				}
			}
			searcher.isload = true;
			lazyload(".lazyimg");
			var u = I.data.pageList.length || 0;
			_searchDataSaPush(u)
//			alert($("#productsList").html())
			query_coupon()
		}
		var b = URLPrefix.search + "/mobile/clientSearch.jsonp?" + g.substring(0, g.length - 1);
//		console.log("【url："+g.substring(0, g.length - 1)+"】");
		
		var query_sort = "";
		if(searcher.searchParams.st==10){
			query_sort = "&queryType=0&sortType=3"; //价格从搞到低
		}
		else if(searcher.searchParams.st==9){
			query_sort = "&queryType=0&sortType=4"; //价格从低到搞
		}
		else if(searcher.searchParams.st==8){
			query_sort = "&queryType=0&sortType=9"; //销量从高到低
		}
		else if(searcher.searchParams.st==26){ //人气
			query_sort = "&queryType=2"; //人气
		}
		
		var shop_tag = "";
		if(searcher.searchParams.sp!=''&&searcher.searchParams.sp!=null&&searcher.searchParams.sp.indexOf("qdzx")>=0){
			shop_tag = "&shopTag=dpyhq"; //优惠券
		}
		
		var freeShipment="";
		if(searcher.searchParams.ct=='2'){
			freeShipment = "&freeShipment=1"; //包邮
		}
		
		var b2c="";
		if(searcher.searchParams.iv=='1'){
			b2c = "&b2c=1"; //是否天猫旗舰店
		}
		
		var typeTag="";
		if(searcher.searchParams.sp!=''&&searcher.searchParams.sp!=null&&searcher.searchParams.sp.indexOf("hwg")>=0){
			typeTag = "&typeTag=qqg"; //是否全球购
		}
		
		var startPrice="";
		var endPrice="";
		if(searcher.searchParams.cf!=''&&searcher.searchParams.cf!=null){
			var priceList = searcher.searchParams.cf.split("_");
			startPrice="&startPrice="+priceList[0];
			if(priceList.length>1){				
				endPrice="&endPrice="+priceList[1];
			}
		}
						
		b = URLPrefix.so_url + "/items/search.json?q="+encodeURIComponent(p)+startPrice+endPrice+typeTag+b2c+freeShipment+shop_tag+"&_t=&auctionTag="+query_sort+"&toPage="+(searcher.pageCurrent+1)+"&perPageSize=40&shopTag=&t=&_tb_token_=&pvid=";
		
		$.ajax({
			url: b,
			type: "get",
			dataType: "jsonp",
			cache: true,
			setTimeout: 1000,
			jsonp: "callback",
			jsonpCallback: "success_jsonpCallback",
			success: function(s) {
				d(s)
			},
			error: function() {
				$(".result-type").hide();
				var s = $("#noResultMsg");
				s.show();
				s.html("<p>系统繁忙,请稍后再试!</p>");
				$("#searchFilter").hide();
				$("#productsListArea").hide()
			}
		})
	},
	insertApp: function() {
		var b = this;
		var d = parseInt(searcher.searchAmount);
		var c = $("#productsList").find("li").size();
		var a = "8";
		if (a <= c - 1) {
			var e = $("#productsList").find("li:eq(" + a + ")");
			e.after(b.buildApp())
		} else {
			if (d < a + 2) {
				$("#productsList").append(b.buildApp())
			}
		}
	},
	buildApp: function() {
		var a = [];
		a.push('<div class="wtable">');
		a.push('<div class="down-pic wtable-cell">');
		a.push('<img src="' + URLPrefix.search_static_res + '/wap/search/style/search/images/down-pic.png"  />');
		a.push("</div>");
		a.push('<div class="wtable-cell vmm">');
		a.push('<p class="down-title">下载客户端，享专属优惠</p>');
		a.push('<p class="down-pt"><span class="sn-btn sn-btn-positive">立即下载</span></p>');
		a.push("</div>");
		a.push("</div>");
		return a.join("")
	},
	insertCpmData: function() {
		var b = productAD.data.cpmDatas;
		var a = productAD.data.searchMaterial;
		if (b && b.adSrc && b.adSrc != "") {
			var c = '<div class="result-ad"><a href="' + b.clickUrl + '"><img src="' + b.adSrc + '" /></a></div>';
			$("div.result-wrap").before(c)
		} else {
			if (a && a.adSrc && a.adSrc != "") {
				var c = '<div class="result-ad"><a href="' + a.clickUrl + '"><img src="' + a.adSrc + '" /></a></div>';
				$("div.result-wrap").before(c)
			}
		}
	},
	adIndex: 0,
	adPositionAry: [4, 8, 18, 28, 38, 48],
	insertAD: function() {
		var l = this;
		var f = parseInt(searcher.searchAmount);
		if (l.adIndex < l.adPositionAry.length && f > 0) {
			var k = productAD.data.cptBrand;
			var d = 0;
			for (var b in k) {
				d++;
				break
			}
			if (d > 0) {
				if (k.searchMaintain == "true") {
					var e = $('<a name="' + md_prefix + '_none_qjd_ qjd" href="' + URLPrefix.wapShopUrl + "/" + k.shopId + '.html" class="wbox"></a>');
					var a = '<img class="img" data-src="' + k.shopLogo + '" alt=""/><div class="name wbox-flex">' + k.brandName + "旗舰店</div>";
					e.append(a);
					$(".result-propose-store").html(e);
					$(".result-propose-store").css({
						display: "block"
					});
					$(".result-flagship").remove()
				} else {
					$(".result-flagship").html(l.shopHtml(k));
					$(".result-flagship").css({
						display: "block"
					});
					$(".result-propose-store").remove()
				}
				lazyload(".lazyimg")
			}
			var g = productAD.data.cpcGoods;
			var c = l.adPositionAry[l.adIndex];
			if (g) {
				if (g.length > l.adIndex) {
					var j = $("#productsList").find("li").size();
					if (c <= j - 1) {
						var h = $("#productsList").find("li:eq(" + c + ")");
						h.after(l.buildADHtml(g[l.adIndex]));
						l.adIndex++;
						l.insertAD()
					} else {
						if (f < c + 2) {
							$("#productsList").append(l.buildADHtml(g[l.adIndex]));
							l.adIndex = l.adPositionAry.length
						}
					}
				}
			}
		}
	},
	buildADHtml: function(d) {
		d = d || {};
		var b = [];
		var c = d.labelInfo;
		b.push('<li id="' + d.tid + '">');
		b.push('<a href="' + d.apsClickUrl + '">');
		b.push('<div class="img">');
		b.push('<div class="img-occupied">');
		b.push('<img data-src="' + d.adSrc + '" alt="" >');
		b.push("</div>");
		b.push('<div class="position-right-bottom">');
		b.push('<div class="mask-layer"></div>');
		b.push("</div>");
		b.push("</div>");
		b.push('<div class="txt">');
		b.push('<p class="name">' + d.title + "</p>");
		b.push('<p class="product-label">');
		for (var a = 0; a < c.length; a++) {
			if (c[a] == "1008") {
				b.push('<em class="pinkage">免运费</em>')
			}
		}
		b.push("</p>");
		b.push('<div class="price">');
		b.push('<p class="price-box">');
		b.push('<span class="price-txt">');
		if (d.cmdPrice) {
			var f = parseFloat(d.cmdPrice).toFixed(2);
			var e = f.split(".");
			b.push('<em class="price-num">￥<strong>' + e[0] + "</strong>." + e[1] + "</em>")
		}
		b.push('<em class="product-label">');
		for (var a = 0; a < c.length; a++) {
			if (c[a] == "1008") {
				b.push('<em class="pinkage">免运费</em>')
			}
		}
		b.push("</em>");
		b.push("</span>");
		b.push("</p>");
		b.push('<p class="shop-num"></p>');
		b.push('<p class="shop-name">' + d.shopName + "</p> ");
		b.push(' <em class="hot">HOT</em>');
		b.push("</div>");
		b.push("</div>");
		b.push("</a>");
		b.push("</li>");
		return b.join("")
	},
	shopHtml: function(e) {
		var d = [];
		d.push('<a href="' + e.apsClickUrl + '"  class="link"></a>');
		d.push("<h2><span>" + e.shopName + "</span><i></i></h2>");
		d.push('<div class="flagship-info wbox">');
		d.push('<div class="img">');
		d.push('<img data-src="' + e.adSrc + '" alt="' + e.title + '"/>');
		d.push("</div>");
		d.push('<div class="info wbox-flex">');
		d.push('<p><a href="' + e.apsClickUrl + '">' + e.shopDesc + "</a></p>");
		d.push("</div>");
		d.push("</div>");
		d.push('<div class="satisfied">');
		d.push('<dl class="starlist">');
		d.push("<dt>商家满意度:</dt>");
		d.push("<dd>");
		var c = parseFloat(e.shopScore);
		var b = "";
		if (c >= 0 && c <= 0.25) {
			b = "zero"
		} else {
			if (c > 0.2 && c <= 0.7) {
				b = "zerob"
			} else {
				if (c > 0.7 && c <= 1.2) {
					b = "ones"
				} else {
					if (c > 1.2 && c <= 1.7) {
						b = "oneb"
					} else {
						if (c > 1.7 && c <= 2.2) {
							b = "twos"
						} else {
							if (c > 2.2 && c <= 2.7) {
								b = "twob"
							} else {
								if (c > 2.7 && c <= 3.2) {
									b = "threes"
								} else {
									if (c > 3.2 && c <= 3.7) {
										b = "threeb"
									} else {
										if (c > 3.7 && c <= 4.2) {
											b = "fours"
										} else {
											if (c > 4.2 && c <= 4.7) {
												b = "fourb"
											} else {
												if (c > 4.7 && c <= 5) {
													b = ""
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		d.push("<em class=" + b + "></em>");
		d.push("</dd>");
		d.push("</dl>");
		if (e.shopServiceScore != "undefined") {
			var a = e.shopServiceScore.split(".")
		}
		d.push('<div class="score">服务满意度:<strong>' + a[0] + "</strong><i>." + a[1] + "</i>分 </div>");
		d.push("</div>");
		return d.join("")
	},
	queryRecommendGoods: function() {
		searcher.rSearchParams.cityId = searcher.searchParams.cityId;
		var b = "";
		for (key in searcher.rSearchParams) {
			b += key + "=" + encodeURIComponent(searcher.rSearchParams[key]) + "&"
		}
		var a = URLPrefix.tuijian_recommend + "/recommendv2/biz.jsonp?" + b.substring(0, b.length - 1);
		$.ajax({
			url: a,
			dataType: "jsonp",
			cache: true,
			async: false,
			jsonpCallback: "tuijian_callback",
			success: function(c) {
				var d = c.sugGoods[0];
				if (d.resCode != "02" && d.skus != null && d.skus.length > 0) {
					searcher.utils.constructRecommendGoods(d.skus)
				} else {
					$("#reGoodsDiv").hide();
					$(".hotlists").hide();
					$("#noResultMsg").addClass("result-none1")
				}
			},
			error: function() {
				$("#reGoodsDiv").hide();
				$(".hotlists").hide();
				$("#noResultMsg").addClass("result-none1")
			}
		})
	},
	utils: {
		clearProducts: function() {
			searcher.$productsList.empty()
		},
		constructRecommendGoods: function(b) {
			$(".hotlists").show();
			$("#reGoodsDiv").show();
			var a = $("#resultHotPro");
			a.empty();
			$.each(b, function(k, r) {
				var n = $("<li></li>");
				var j = r.sugGoodsCode;
				var m = getPrdSmallImgUrl(j, r.vendorId);
				var e = URLPrefix.mobileProductUrl + "/product/" + r.sugGoodsCode + ".html";
				var f = "wapssjgy_none_tjmk_tjsp" + k;
				var o = $('<a name="' + f + '" href="' + e + '"></a>');
				var d = '<div class="img" ><div class="img-occupied"><img src="' + m + '" altr=""></div></div>';
				var p = $(' <div class="txt"></div>');
				var c = $('<p class="name">' + r.sugGoodsName + "</p>");
				var h = r.price;
				var l = h.split(".");
				var g = '<div class="price"><span class="price-txt"><em class="price-num">&yen;<strong>' + l[0] + "<strong>." + l[1] + '</em></span><span class="fr"></span></div>';
				p.append(c);
				p.append(g);
				o.append(d).append(p);
				n.append(o);
				a.append(n)
			});
			$("#end_load").show()
		}
	}
};

function showMsg() {
	SUI.Use("AlertBox", {
		type: "mini",
		msg: "很抱歉，暂不支持查看套餐商品详情"
	})
}

function lazyloadPromotionLabel() {
	util.lazyload.trigger("#productsList li,#expandList li")
}

function appFlagLabel() {
	var c = $("#fileterIv").val();
	var e = $("#fileterCt").val();
	var g = $("#fileterSp").val();
	var b = $("#fileterSt").val();
	var a = $("#salesSp").val();
	var f = $("#fileterCf").val();
	var d = $("#fileterCi").val();
	if (g || a || e == "2" || c == "1" || b || f || (d && d != "0")) {
		_appFlag = true
	}
}

function queryApscore(b, h) {
//	var c = $("#categoryId").val();
//	var d = "100000008";
//	var j = [];
//	var f = c;
//	var g = "";
//	if (!c) {
//		d = "100000007";
//		g = $("#keyword_new").val();
//		g = g || "";
//		g = g.replace(/^\s+|\s+$/g, "");
//		if (!g) {
//			return
//		}
//		g = encodeURIComponent(g);
//		q = g
//	}
//	var e = URLPrefix.cpmID;
//	var i = {
//		city: $.cookie("cityId") || "9173",
//		t: "wap",
//		positionID: d,
//		t_pid: URLPrefix.advertisID,
//		v_m: 1
//	};
//	if (!c) {
//		j = [URLPrefix.adSuggest, "/cpm/getMTBrandCGoods?t_pid=", i.t_pid, "&c_pid=", i.positionID, "&q=", g, "&clt=", i.t, "&city=", i.city, "&v_m=", i.v_m, "&m_pid=", e]
//	} else {
//		j = [URLPrefix.adSuggest, "/cpm/getMTBrandCGoods?t_pid=", i.t_pid, "&c_pid=", i.positionID, "&pc=", f, "&clt=", i.t, "&city=", i.city, "&v_m=", i.v_m, "&m_pid=", e]
//	}
//	var a = j.join("");
//	$.ajax({
//		url: a,
//		type: "GET",
//		timeout: 3000,
//		dataType: "jsonp",
//		cache: true,
//		jsonp: "callback",
//		jsonpCallback: "brandCGoodsCallBack",
//		success: b,
//		error: h
//	})
}

function slasher(c, b) {
	if (!c) {
		return ""
	}
	c = $.trim(c);
	if (c.length <= b) {
		return c
	}
	var a = null;
	a = c.substring(0, b);
	if (a != c) {
		a = a + "..."
	}
	return a
}

function _loadTuijian() {
	var a = $("#channel_type").val();
	if (a != "hwg" && a == "") {
		var b = $("#categoryId").val();
		if (b) {
			searcher.rSearchParams.parameter = b;
			searcher.rSearchParams.sceneIds = "10-8";
			$("#hotTitle").html("热销商品");
			searcher.queryRecommendGoods()
		} else {
			searcher.rSearchParams.parameter = $("#keyword").val();
			searcher.rSearchParams.sceneIds = "10-7";
			$("#hotTitle").html("推荐商品");
			searcher.queryRecommendGoods()
		}
	}
}

function loadDirectWrods() {
	var b = $("#categoryType").val();
	if (b == "") {
		b = "99999998"
	}
	var a = URLPrefix.ds_server + "/ds/terminal/hotword/" + b + "-wap-getHotWord.jsonp";
	$.jsonp({
		url: a,
		type: "get",
		dataType: "jsonp",
		cache: true,
		timeout: 5000,
		callback: "getHotWord",
		success: function(c) {
			if (c.status == "200") {
				if (c.rs.directWord && c.rs.directWord.length > 0) {
					directWords = c.rs.directWord
				}
			}
		}
	})
}
$(function() {
	searcher.init();
//	loadDirectWrods();
	searcher.queryData()
	var b = $("#categoryId").val();
	if ($("#channel_type").val() == "hwg" || $("#channel_type").val() != "") {} else {
		if (_productCount <= 0 && subSearchResultsCount <= 0 && resultType == 0) {
			if (b) {
				searcher.rSearchParams.parameter = b
			} else {
				searcher.rSearchParams.parameter = $("#keyword").val()
			}
//			searcher.queryRecommendGoods()
		}
		var a = $("#expandList li").size() > 0;
		if (_productCount > 0 && _productCount < 8 && !a) {
//			_loadTuijian()
		}
	}
	if (_productCount < 10 && _productCount > 0) {
		$("#loading").hide();
		$("#end_load").show()
	}
	getQueryApscore();
	wap.filter.addSortChangeCallback(function(c) {
		searcher.searchParams.st = c;
		var f = $("#fileterIv").val();
		var g = $("#fileterCt").val();
		if (f) {
			searcher.searchParams.iv = f
		} else {
			searcher.searchParams.iv = "-1"
		}
		if (g) {
			searcher.searchParams.ct = g
		} else {
			searcher.searchParams.ct = "-1"
		}
		$("#fileterSt").val(c);
		searcher.searchParams.cp = 0;
		searcher.pageCurrent = 0;
		$("#end_load").hide();
		searcher.utils.clearProducts();
		$("#loading").remove();
		var e = '<div id="loading" class="sn-html5-loading"><div class="blueball"></div><div class="orangeball"></div></div>';
		$(".result-loaded-tip").after(e);
		$(".cut-ts").hide().html("");
		if (resultType == 4 && sen_sug_key) {
			searcher.searchParams.keyword = sen_sug_key;
			var d = html_encode(sen_sug_key);
			$("#keyword").val(d);
			$(".result-err").hide();
			$("#searchHotInp").val(d);
			resultType = 0
		}
		if (resultType == 1) {
			var d = html_encode($("#correctionsKeyword").val());
			$("#searchHotInp").val(d);
			$("#keyword").val(d);
			resultType = 0
		}
		$("#rewriteInfo").hide();
		searcher.queryData()
	});
	$("#cut_ts").delegate("a", "click", function(d) {
		d.stopPropagation();
		$("#end_load").hide();
		$("#cut_hint").hide();
		searcher.searchParams.prune = "0";
		$("#fileterPrune").val("0");
		searcher.searchParams.st = $("#fileterSt").val() || "0";
		searcher.$productsList.empty();
		var c = '<div id="loading" class="sn-html5-loading"><div class="blueball"></div><div class="orangeball"></div></div>';
		$(".result-loaded-tip").after(c);
		searcher.queryData()
	});
	lazyloadPromotionLabel();
	if (_productCount > 0 || subSearchResultsCount > 0) {
		appFlagLabel();
		if ($("#channel_type").val() == "hwg" || $("#channel_type").val() != "" || $("#_bigflag").val() == "true" || _appFlag) {} else {
			if (bigPicture == "0") {
				searcher.insertApp()
			}
		}
	}
	searcher.isload = true;
	if (resultType == 4 || resultType == 2) {
		$("#result-sort").remove();
		$("#noResultMsg").remove()
	}
	if (resultType == 1) {
		searcher.searchParams.keyword = $("#correctionsKeyword").val()
	}
	$("#rewriteInfo a").click(function(f) {
		var d = $(this).attr("rel-word");
		var c = "/search/" + encodeURIComponent(d) + "/&operate=1";
		location.href = c
	});
	$("#expandInfo a").click(function(f) {
		var d = $(this).attr("exp-word");
		var c = "/search/" + encodeURIComponent(d) + "/";
		location.href = c
	});
	$("#jcTip a").click(function(f) {
		var d = $(this).attr("rel-word");
		var c = "/search/" + encodeURIComponent(d) + "/";
		location.href = c
	});
	SEARCH.main.appEntry();
	expoBaoguang();
	lazyload(".lazyimg");
	$(window).on("load", function() {
		setTimeout(function() {
			window.scroll(0, 0);
			$(".loadmore").lazyload(function(f) {
				if (searcher.isload && $(".result-wrap").is(":visible")) {
					var d = parseInt(searcher.searchParams.ps, 10) || 20,
						c = parseInt(searcher.searchAmount, 10) || 0,
						e = parseInt((c - 1) / d + 1);
					if (searcher.pageCurrent < e && resultType != 2 && resultType != 4) {
						searcher.isload = false;
						searcher.searchParams.cp = parseInt(searcher.pageCurrent, 10);
						$("#loading").show();
						$("#loading").remove();
						var g = '<div id="loading" class="sn-html5-loading"><div class="blueball"></div><div class="orangeball"></div></div>';
						$(".result-loaded-tip").after(g);
						searcher.queryData()
					} else {
						if (e != 0) {
							$("#loading").hide();
							$("#end_load").show()
						}
					}
				}
			})
		}, 50)
	})
});

function getQueryApscore() {
	var b = $("#cateoryFlag").val();
	var a = $("#cf").val();
	productAD.loaded = true;
	productAD.data = {
		rows: []
	};
	if (ssggdpkg && _productCount > 0) {
		if ($("#channel_type").val() == "hwg" || $("#channel_type").val() != "" || resultType == "1" || (a != "0" && a != "")) {} else {
			queryApscore(function(c) {
				productAD.loaded = true;
				productAD.data = c;
				if (!searcher._isCityChange) {
					searcher.insertAD();
					searcher.insertCpmData()
				}
			}, function() {
				productAD.loaded = true;
				productAD.data = {
					rows: []
				}
			})
		}
	}
}

function expoBaoguang() {
	var a = $("#productsList").find(".ad-result").find("a").attr("id");
	if (a != undefined) {
		runAnalyseExpoBaoguang(a)
	}
}; 