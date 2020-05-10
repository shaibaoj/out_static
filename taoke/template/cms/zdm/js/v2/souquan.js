//搜券通
var $listBox = $('#goods_list'), 
	waiting = false,
	isLoadMore = true,
	$load = $('#site_loading'),
	$noMoreData = $('#no_data'),
	$noList = $('#no_list'),
	$searchBox = $('#search_info'),
	$result = $('#search_result'),
	type = 1,
	page = 0;
	searchKeys = $.trim($searchBox.val());
	
	var showBtn = $("#site_loading");
    var query_type = showBtn.attr("data-goods");

var searchFun = {
	//滚动加载数据
	scrollLoad:function(){
		var windowH = $(window).height(),
		 	$selector = $('#selector_fixed'),
			selectorTop = $selector.offset().top,
			that = this;
		that.loadData();
		$(window).scroll(function(){
			if(isLoadMore&&$(this).scrollTop() + windowH > $(document).height() - 300){
				if(waiting){
					return false;
				}
				page++;
				that.loadData();
				lazyLoading($("img.lazyload"));
			}
			//设置固定
			if($(this).scrollTop() > selectorTop){
				/*$souquanType.addClass('sq_fixed');
				$('#souquan_items_box').addClass('sq_fixed');*/
				$selector.addClass('sq_fixed');

			}else{
				/*$souquanType.removeClass('sq_fixed');
				$('#souquan_items_box').removeClass('sq_fixed');*/
				$selector.removeClass('sq_fixed');
			}
		});
	},
	//加载数据
	loadData:function(){
		var key = '';
		if(searchKeys){
			key = $.trim(searchKeys);
		}
		if(waiting){
			return false;
		}
		waiting = true;
		$load.show();
		
		var query_url = cms_all_config.yun_cms_url;
		var query_data = {
        	app_id:cms_all_config.app_id,
        	ajax:1,
        	ipage:page,
        	action:'search',
        	documentUrl:cms_all_config.base_url,
        	q:key,
        };
		
		if(query_type=='yun'){
			query_url = cms_all_config.yun_cms_url;
			query_data = {
	        	app_id:cms_all_config.app_id,
	        	ajax:1,
	        	ipage:page,
	        	action:'yun',
	        	documentUrl:cms_all_config.base_url,
	        	q:key,
	        };
		}
		else if(query_type=='jd'){
			query_url = cms_all_config.yun_cms_url;
			query_data = {
	        	app_id:cms_all_config.app_id,
	        	ajax:1,
	        	ipage:page,
	        	action:'search_jd',
	        	documentUrl:cms_all_config.base_url,
	        	q:key,
	        };
		}
				
		$.ajax({
            url: query_url,
            data: query_data,
            type: "GET",
	        dataType: 'jsonp',
            success: function (result){
            	waiting = false;
            	$load.hide();
            	temHtml = result.result.map.content;
            	//加载更多没有数据
            	if (result.result.map.content == "") {
					$noMoreData.show();
					isLoadMore = false;
					return false;
            	}
            	$listBox.append(temHtml);
            	lazyLoading($("img.lazyload"));
            },
            error:function(){
            	waiting = false;
            	$load.hide();
                promptPop('系统繁忙,请重试');
            }
        });
	},
	init:function(){
		if(typeof searchKeys != 'undefined'){
			this.scrollLoad();
		}
		goTop();
	}
}
searchFun.init();

$(function () {
	$(".yd-selectMenu li").click(function () {
		$this = $(this);
		
		showBtn.attr("data-goods",$this.attr("data-goods"));
		$(".yd-selectMenu li").removeClass("curr");
		$this.addClass("curr");
		$listBox.empty();
		query_type = showBtn.attr("data-goods");
		$("#selector_fixed").removeClass("sq_fixed");
		searchFun.init();
    });
});


/* 搜券 */
!function(){
	//过滤表情
	function filter(value){
	    var regu = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
	    if(regu.test(value)){
	        return 'error';
	    }
	}
	/* 搜券 */
	var $searchBox = $('#search_info2'),
	    $serchItems = $('#search_items2'),
	    inputValue = '',
	    index = -1; 
	$searchBox.keyup('keyup',function(event){
	    var keyValue = event.which;
	    if(keyValue!=40&&keyValue!=38){  
	        inputValue = $(this).val();  
	    }; 
	    if(filter(inputValue) == 'error'||inputValue.indexOf('￥') > -1){
	        return false;
	    }
	    var temHtml = '';
	    //上下滑动列表
	    if($serchItems.is(':visible')){ 
	        var len = $serchItems.find('li').length;
	        if(keyValue == 40){//向下  
	            if(index >= len){  
	                index = -1;                 
	            }  
	            index++;  
	            $serchItems.find('li').css('background','#fff')  
	            $serchItems.find('li').eq(index).css('background','#fff2f2');  
	            $searchBox.val($serchItems.find('li').eq(index).text());  
	            if(index == len){  
	                $(this).val(inputValue);  
	            }
	            return false; 
	        }else if(keyValue == 38){//向上  
	            if(index < 0){  
	                index = len;  
	                $(this).val(inputValue);  
	            }else if(index == 0){  
	                index = len + 1;  
	                $(this).val(inputValue);  
	            }  
	            index--;  
	            $serchItems.find('li').css('background','#fff');  
	            $serchItems.find('li').eq(index).css('background','#fff2f2');  
	            $searchBox.val($serchItems.find('li').eq(index).text());  
	            if(index == len){  
	                $(this).val(inputValue);  
	            }
	             return false;   
	        } 
	    }
	    //显示五条联想词       
	    $.ajax({
	        url: "https://suggest.taobao.com/sug?code=utf-8&q="+inputValue,
	        type: "get",
	        dataType:"jsonp",
	        success: function (data){
	            var result = data.result,
	                len = result.length;
	            if(result.length == 0){
	                $serchItems.html('');
	                $serchItems.hide();
	                return false;
	            }else{
	                $serchItems.show();
	            }
	            if(len > 8){
	                len = 8;
	            }
	            for(var i = 0;i < len;i++){
	                temHtml += '<li><a href="/souquan?key='+result[i][0]+'">'+result[i][0]+'</a></li>';
	            }
	            $serchItems.html(temHtml);
	            $serchItems.show();
	        },
	        error:function(){
	            promptPop('系统繁忙,请重试');
	        }
	    });
	});
	$searchBox.blur(function(){
	    setTimeout(function(){
	        $serchItems.hide();
	    },100);
	});
	//点击搜券按钮
	$('#search_contain2').on('submit',function(){
	    searchKeys = $.trim($searchBox.val());
	    //搜索词的过滤
	    var len = searchKeys.replace(/[^\x00-\xff]/g, "**").length;
	    if(searchKeys == $searchBox.attr('lang')||searchKeys == ''){
	        shopResult({msg:'搜索词不能为空',type:3});
	        $searchBox.focus();
	        return false;
	    }else if(searchKeys.indexOf('http://') > -1||searchKeys.indexOf('https://') > -1){
	        shopResult({msg:'不支持链接搜索，请使用关键词或宝贝标题搜索',type:3});
	        return false;
	        //不支持淘口令
	    }else if(searchKeys.indexOf('￥') > -1||filter(inputValue) == 'error'){
	        shopResult({msg:'搜索词格式错误',type:3});
	        return false;
	    }else if(len > 64){
	        shopResult({msg:'搜索词过长,请输入少于32个字',type:3});
	        return false;
	    }
	    window.location.href = ''+cms_all_config.base_url+'?action=search&q='+searchKeys;
	    return false;
	    
	});
}();