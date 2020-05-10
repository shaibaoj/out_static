
//alert($("#search_keyName").val());
//
//$.getJSON("http://s.m.taobao.com/search?&q=iphone&event_submit_do_new_search_tmall_auction=1&_input_charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1&sst=1&n=20&buying=buyitnow&m=api4h5&abtest=6&wlsort=6", {ipage:ipage,keywordsTypeId:keywordsTypeId}, function(data){
//	$tbody.empty();
//	var html ="";
//	$.each(data.items, function(i,item){
//		html = html
//		+"<tr>"
//		+		"<td>"+item.articleId+"</td>"
//		+		"<td><a target='_blank' href='"+sbj.ctx_path+"/preview_article.jsp?articleId="+item.articleId+"'>"+item.title+"</a></td>"
//		+		"<td>编辑</td>"
//		+"</tr>";
//		
//	});
//	$tbody.append(html);
//	$(".tableData tr:odd").not($(".tableData tr")[0]).css({"backgroundColor":"#f2f2f2"});
//	$(".tableData tr:even").not($(".tableData tr")[0]).css({"backgroundColor":"#e6e6e6"});
//	$(".pager").pager(data.pager,{action: list});
//});

//$.getJSON("http://s.m.taobao.com/search?event_submit_do_new_search_auction=1&_input_charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1&sst=1&n=20&buying=buyitnow&tab=all&m=api4h5&abtest=4&wlsort=4&page=1&callback=?", {q:$("#search_keyName").val(),all_cities:'on'}, function(data){
	
//$.getJSON("http://s.m.taobao.com/search?callback=?"
//		, {
//			q:$("#search_keyName").val(),
//			search:"提交",
//			sst:"1",
//			n:"3",
//			buying:"buyitnow",
//			m:"api4h5",
//			abtest:"4",
//			wlsort:"4",
//			page:"1",
//			"data-key":"sort",
//			"data-value":"sale-desc"
//		}
//		, function(data){	
//
//	if(data&&data.data){					
//		data = data.data;
//	}
//	if(data.listItem&&data.listItem!=null){
//		var html = "";
//		var numIids = "";
//		$.each(data.listItem, function(i,item){   
//			numIids = numIids+(numIids!=''?",":"")+item.itemNumId;
//			var goodsUrl ="http://item.taobao.com/item.htm?id="+item.itemNumId;
//			var picUrl = item.img2+"_290x290.jpg";
//			var title = item.title;
//			var price = item.price;
//			var originalPrice = item.originalPrice;
//			var sold = item.sold;
//			var itemNumId = item.itemNumId;
//			
//			html = html +"<div class='c2016-1-130828-1457877884015-top3'><div class='c2016-1-130828-1457877884015-global'><div class='c2016-1-130828-1457877884015-item'><div class='c2016-1-130828-1457877884015-pic'><a biz-itemid='"+itemNumId+"' isconvert=1 href='"+goodsUrl+"' target='_blank' tt-data='ds_img'><img src='"+picUrl+"'></a></div><ul class='c2016-1-130828-1457877884015-attr'><li class='c2016-1-130828-1457877884015-title'><a biz-itemid='"+itemNumId+"' isconvert=1 href='"+goodsUrl+"' target='_blank' _hover-ignore='1'>"+title+"</a></li><li class='c2016-1-130828-1457877884015-price'><span class='c2016-1-130828-1457877884015-price-16'><i></i>"+price+"</span><span class='c2016-1-130828-1457877884015-price-12'><i></i>"+originalPrice+"</span></li><li class='c2016-1-130828-1457877884015-sale'><span class='c2016-1-130828-1457877884015-tmall'></span><strong>销量："+sold+"<strong></strong></strong></li><li class='c2016-1-130828-1457877884015-go'><a biz-itemid='"+itemNumId+"' isconvert=1 class='c2016-1-130828-1457877884015-buy' target='_blank' href='"+goodsUrl+"'><b>"+price+"</b></a></li><ul></ul></ul></div></div></div>";
//		});
//		if(html!=""){
//			$("#toplist").html(html);
//		}
//		if(numIids!=''){	
////			SBJ.putNumIid(numIids);
//		}
//	}
//});


$.getJSON("http://s.m.taobao.com/search?callback=?"
		, {
//			q:$("#search_keyName").val(),all_cities:'on'
			q:$("#search_keyName").val(),
			search:"提交",
			sst:"1",
			n:"60",
			buying:"buyitnow",
			m:"api4h5",
			abtest:"4",
			wlsort:"4",
			page:"1"
		}
		, function(data){
	if(data&&data.data){					
		data = data.data;
	}
	if(data.listItem&&data.listItem!=null){
		var html_top = "";
		var html_items = "";
		var numIids = "";
		$.each(data.listItem, function(i,item){   
			numIids = numIids+(numIids!=''?",":"")+item.itemNumId;
			if(i<3){
				var goodsUrl ="http://item.taobao.com/item.htm?id="+item.itemNumId;
				var picUrl = item.img2+"_290x290.jpg";
				var title = item.title;
				var price = item.price;
				var originalPrice = item.originalPrice;
				var sold = item.sold;
				var itemNumId = item.itemNumId;
				
				html_top = html_top +"<div class='c2016-1-130828-1457877884015-top3'><div class='c2016-1-130828-1457877884015-global'><div class='c2016-1-130828-1457877884015-item'><div class='c2016-1-130828-1457877884015-pic'><a biz-itemid='"+itemNumId+"' isconvert=1 href='"+goodsUrl+"' target='_blank' tt-data='ds_img'><img src='"+picUrl+"'></a></div><ul class='c2016-1-130828-1457877884015-attr'><li class='c2016-1-130828-1457877884015-title'><a biz-itemid='"+itemNumId+"' isconvert=1 href='"+goodsUrl+"' target='_blank' _hover-ignore='1'>"+title+"</a></li><li class='c2016-1-130828-1457877884015-price'><span class='c2016-1-130828-1457877884015-price-16'><i></i>"+price+"</span><span class='c2016-1-130828-1457877884015-price-12'><i></i>"+originalPrice+"</span></li><li class='c2016-1-130828-1457877884015-sale'><span class='c2016-1-130828-1457877884015-tmall'></span><strong>销量："+sold+"<strong></strong></strong></li><li class='c2016-1-130828-1457877884015-go'><a biz-itemid='"+itemNumId+"' isconvert=1 class='c2016-1-130828-1457877884015-buy' target='_blank' href='"+goodsUrl+"'><b>"+price+"</b></a></li><ul></ul></ul></div></div></div>";
			
			}else{				
				var goodsUrl ="http://item.taobao.com/item.htm?id="+item.itemNumId;
				var picUrl = item.img2+"_210x210.jpg";
				var title = item.title;
				var price = item.price;
				var originalPrice = item.originalPrice;
				var sold = item.sold;
				var itemNumId = item.itemNumId;
				
				html_items = html_items +"<li><div class='list-pic'><a biz-itemid='"+itemNumId+"' isconvert=1 href='"+goodsUrl+"' target='_blank' tt-data='ds_img'><img style='padding:10px;' border='0' src='"+picUrl+"' alt=''></a></div><div style='margin-left:10px;'><a biz-itemid='"+itemNumId+"' isconvert=1 href='"+goodsUrl+"' target='_blank'>"+title+"</a></div><div style='float:right;margin-right:10px;'><span tt-if='ds_cust' class='cust' title='消费者保障'></span></div><div style='margin-left:10px;'><span style='color:#000;font-size:16px;margin-right:10px;padding-left:13px;position:relative;'><i style='background:url(http://img01.taobaocdn.com/tps/i1/T1xtQ1XjleXXabccbg-20-137.png);height:12px;width:8px;overflow:hidden;position:absolute;top:0;left:0;background-position:0 -125px;top:4px'></i>"+price+"</span><span style='color:#acacac;text-decoration:line-through;padding-left:9px;position:relative;'><i style='background-position:0 -114px;height:9px;width:6px;top:3px;*top:7px;'></i>原价："+originalPrice+"</span></div><div style='float:right; margin-right:10px;'><a biz-itemid='"+itemNumId+"' isconvert=1 href='"+goodsUrl+"' target='_blank' class='c2016-2-130842-1457877884035-buy_btn' style='color:#FFF'><em></em>购买</a></div><div class='list-sale' style='margin-left:10px;'><span class='list-tmall'></span>销量：<strong>"+sold+"</strong>件</div></li>";
			}
		});
		if(html_top!=""){
//			$("#queryGoods").empty();
			$("#toplist").html(html_top);
			$("#items").html(html_items);
		}
		if(numIids!=''){	
//			SBJ.putNumIid(numIids);
		}
	}
});