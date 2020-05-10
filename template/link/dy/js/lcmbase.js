//内容页右边浮动函数
function Fixed(moveObj,relativeObj){
	var offset_top=$(moveObj).offset().top;
	var offset_left=$(moveObj).offset().left;
	var relative_left=$(moveObj).position().left;
	var limitTop=$(relativeObj).offset().top + $(relativeObj).outerHeight()- $(moveObj).outerHeight();
	var limitHeight=$(relativeObj).outerHeight()- $(moveObj).outerHeight();
  	$(window).scroll(function(){
  		var top=$(window).scrollTop();
  		if($(window).scrollTop() > offset_top){
  			$(moveObj).css({'position':'fixed','top':'0px','left':offset_left+'px','zIndex':'9'});
  		}else{//如果滚动的高度不大于 moveObj就不动
            $(moveObj).removeAttr('style');
        } 
        if($(window).scrollTop()> limitTop && limitTop>=0 ){//限定最大的scroll高度
            $(moveObj).css({'position':'absolute','top':limitHeight+'px','left':relative_left+'px'})
        }
  		
  	}) 
}
function weiwei_lailu(){
	lailu=GetUrlQueryString();
	if(lailu.match(/all/)){
		$(".mxk_ind .mxk_tk_list .lm_name .tab h2").removeClass("current");
		$(".mxk_ind .mxk_tk_list .lm_name .tab h2:eq(0)").addClass("current");
	}else if(lailu.match(/xiezhen/)){
		$(".mxk_ind .mxk_tk_list .lm_name .tab h2").removeClass("current");
		$(".mxk_ind .mxk_tk_list .lm_name .tab h2:eq(1)").addClass("current");
	}else if(lailu.match(/shenghuo/)){
		$(".mxk_ind .mxk_tk_list .lm_name .tab h2").removeClass("current");
		$(".mxk_ind .mxk_tk_list .lm_name .tab h2:eq(2)").addClass("current");
	}else if(lailu.match(/juzhao/)){
		$(".mxk_ind .mxk_tk_list .lm_name .tab h2").removeClass("current");
		$(".mxk_ind .mxk_tk_list .lm_name .tab h2:eq(3)").addClass("current");
	}else if(lailu.match(/xianchang/)){
		$(".mxk_ind .mxk_tk_list .lm_name .tab h2").removeClass("current");
		$(".mxk_ind .mxk_tk_list .lm_name .tab h2:eq(4)").addClass("current");
	}

	document.write('<script type="text/javascript">');
		document.write('     /*mingxing搜索推荐 创建于 2015-05-21*/');
		document.write('var cpro_id = "u2115301";');
		document.write('</script>');
		document.write('<script src="http://su.bdimg.com/static/dspui/js/uf.js" type="text/javascript"></script>');

}
function GetUrlQueryString(){
	var url=String(window.document.location.href);
	var allargs = url.split("?")[1];
	if(allargs)
		return allargs;
	else
		return "mingxing";
}

$(document).ready(function() {
	
	//首页顶部搜索
		$(".header .search_box .search_txt").focus(function(){
			$(this).val("").css("color","#333");
			$(this).animate({width:"350px"});
		});
	$(".header .search_box .search_txt").blur(function(){
			$(this).animate({width:"325px"});
		});
	
	
	$(".index .cm_block01 .block02 ul li").hover(
		function(){
			$(this).css({"z-index":"999"});
			$(this).addClass("hover");
			},
		function(){
			$(this).css({"z-index":"0"});
			$(this).removeClass("hover");
			}
	);
	
	$(".index .cm_block01 .block03 .tab_name h2").hover(
	function(){
		$(this).addClass("current");
		$(this).siblings().removeClass("current");
		var dangqian=$(".index .cm_block01 .block03 .tab_txt").eq($(".index .cm_block01 .block03 .tab_name h2").index(this));
		dangqian.addClass("showbox");
		dangqian.siblings().removeClass("showbox");
		}
	);
	
    $(".index .cm_block04 .lm_name .tab span").hover(
	function(){
		$(this).addClass("current");
		$(this).siblings().removeClass("current");
		var dangqian=$(".index .cm_block04 .zxmmtp_gd").eq($(".index .cm_block04 .lm_name .tab span").index(this));
		dangqian.show();
		dangqian.siblings().hide();
		}
	);
	$(".index .cm_block04 ul li").hover(
	function(){
		$(this).find(".txt_box").animate({
		top:"245px"
		},"linear"
		);
		},
	function(){
		$(this).find(".txt_box").animate({
		top:"280px"
		},"linear"
		);
		}
	);
	
	
	
	$(".index .cm_block05 dd").hover(
		function(){
			$(this).addClass("current");
			$(this).find(".btn").show();
			},
		function(){
			$(this).removeClass("current");
			$(this).find(".btn").hide();
			}
		);
	
	$(".mxk_ind .cm_block02 .block04 .box dd").hover(
		function(){
			$(this).addClass("current");
			},
		function(){
			$(this).removeClass("current");
			}
		);
	
	$(".mxk_ind .mxk_xw_list .block02 .block04 .box dl dd").hover(
		function(){
			$(this).addClass("current");
			},
		function(){
			$(this).removeClass("current");
			}
		);
	
	$(".mxk_ind .mxk_zl .block02 .block04 .box dl dd").hover(
		function(){
			$(this).addClass("current");
			},
		function(){
			$(this).removeClass("current");
			}
		);
	
	$(".tk_ind .cm_block01 .block02 dd").hover(
		function(){
			$(this).addClass("current");
			},
		function(){
			$(this).removeClass("current");
			}
		);
	
	 $(".tk_ind .cm_block03 .lm_name .tab span").hover(
	function(){
		$(this).addClass("current");
		$(this).siblings().removeClass("current");
		var dangqian=$(".tk_ind .cm_block03 ul").eq($(".tk_ind .cm_block03 .lm_name .tab span").index(this));
		dangqian.addClass("showbox");
		dangqian.siblings().removeClass("showbox");
		}
	);
	
	 $(".tk_ind .cm_block04 .lm_name .tab span").hover(
	function(){
		$(this).addClass("current");
		$(this).siblings().removeClass("current");
		var dangqian=$(".tk_ind .cm_block04 ul").eq($(".tk_ind .cm_block04 .lm_name .tab span").index(this));
		dangqian.addClass("showbox");
		dangqian.siblings().removeClass("showbox");
		}
	);
	
	 $(".tk_ind .cm_block05 .lm_name .tab span").hover(
	function(){
		$(this).addClass("current");
		$(this).siblings().removeClass("current");
		var dangqian=$(".tk_ind .cm_block05 ul").eq($(".tk_ind .cm_block05 .lm_name .tab span").index(this));
		dangqian.addClass("showbox");
		dangqian.siblings().removeClass("showbox");
		}
	);
	
	$(".xw_list .cm_block01 .lm_name .tab h2").hover(
	function(){
		$(this).addClass("current");
		$(this).siblings().removeClass("current");
		var dangqian=$(".xw_list .cm_block01 .ulbox").eq($(".xw_list .cm_block01 .lm_name .tab h2").index(this));
		dangqian.addClass("showbox");
		dangqian.siblings().removeClass("showbox");
		}
	);
	
	$(".mxk_ind .mxk_tk_list .lm_name .tab h2").hover(
	function(){
		$(this).addClass("current");
		$(this).siblings().removeClass("current");
		var dangqian=$(".mxk_ind .mxk_tk_list .box").eq($(".mxk_ind .mxk_tk_list .lm_name .tab h2").index(this));
		dangqian.addClass("showbox");
		dangqian.siblings().removeClass("showbox");
		}
	);
	

	$("body").append('<div id="float_box"><a href="javascript:void(0);" class="erweima_ico"><span>微信二维码，扫一扫</span></a><a href="http://e.weibo.com/mingxinggw" target="_blank" class="sina_ico"></a><a href="javascript:void(0);" class="top_ico"></a></div>');
	$(".top_ico").click(function(){
		$("html,body").animate({scrollTop: 0}, 1000); 
		});

	$(".jz_list .cm_block01 .box_pb .box").hover(
		function(){
			$(this).addClass("hover");
			},
		function(){
			$(this).removeClass("hover");
			});
			
	$(".jz_list .cm_block01 .lm_name .tab span").hover(
		function(){
			$(this).find("i").show();
			},
		function(){
			$(this).find("i").hide();
			});
	$(".jz_list .cm_block01 .lm_name .tab span").click(function(){
		$(".jz_list .cm_block01 .lm_name .tab span").removeClass("current");
		$(this).addClass("current");
		var dangqian=$(".jz_list .cm_block01 .block").eq($(".jz_list .cm_block01 .lm_name .tab span").index(this));
		dangqian.addClass("block_show");
		dangqian.siblings().removeClass("block_show");
		});
	
	
//自动播放	
	function getRandom(n){
        return Math.floor(Math.random()*n)
    }
	
   var sh=setInterval(click_time,2000);
	function click_time(){
	 $(".index .cm_block01 .block02 ul li").removeClass("hover");
	 var a=getRandom(7);
	 $(".index .cm_block01 .block02 ul li").eq(a).addClass("hover");
	}
	$(".index .cm_block01 .block02 ul").hover(
	function(){clearInterval(sh);},
	function(){sh=setInterval(click_time,2000);}
	);	
			
			
			
	//新闻首页js
		$(".gong_header .nav02 li.xiala").hover(function(){
			$(".gong_nav_bg").show();
			$(".top_h").css({"height":"135px"});
			$(this).addClass("current");
			$(this).siblings().removeClass("current");
			var dangqian=$(".gong_nav_bg .gong_nav ul").eq($(".gong_header .nav02 li.xiala").index(this));
			dangqian.addClass("show_ul");
			dangqian.siblings().removeClass("show_ul");			
			});
		$(".gong_header .nav02 li").eq(0).hover(function(){
			$(".gong_header .nav02 li").removeClass("current");
			$(".gong_nav_bg").hide();
			$(".top_h").css({"height":"87px"});
			});
	
	//新闻首页顶部搜索
		$(".gong_header .search_box .search_txt").focus(function(){
			$(this).val("").css("color","#333");
			$(this).animate({width:"190px"});
			$(".gong_search_html").show();
			$("body").css({"overflow":"hidden"});
			$(".gong_search_html").nextAll().hide();
		});
	$(".gong_header .search_box .search_txt").blur(function(){
			$(this).animate({width:"145px"});
			$(".gong_search_html").hide();
			$("body").css({"overflow":"visible"});
			$(".gong_search_html").nextAll().show();
		});
	
	$(".news_index .cm_block03 .block01 .gd_box01 ul").each(function(i) {
		var a=i+1;
		var b=2+(a-1)*4
        $(".news_index .cm_block03 .block01 .gd_box01 ul li").eq(b).addClass("current");
    });
	$(".news_index .cm_block03 .block01 .gd_box01 ul li").hover(
		function(){
			$(".news_index .cm_block03 .block01 .gd_box01 ul li").removeClass("current");
			$(this).addClass("current");
			});
	$(".news_index .cm_block03 .block01 .right_btn").click(function(){
			$(".news_index .cm_block03 .block01 .gd_box01 ul li").removeClass("current");
			$(".news_index .cm_block03 .block01 .gd_box01 ul").each(function(i) {
			var a=i+1;
			var b=2+(a-1)*4
			$(".news_index .cm_block03 .block01 .gd_box01 ul li").eq(b).addClass("current");
			});
		});
	$(".news_index .cm_block03 .block01 .left_btn").click(function(){
			$(".news_index .cm_block03 .block01 .gd_box01 ul li").removeClass("current");
			$(".news_index .cm_block03 .block01 .gd_box01 ul").each(function(i) {
			var a=i+1;
			var b=2+(a-1)*4
			$(".news_index .cm_block03 .block01 .gd_box01 ul li").eq(b).addClass("current");
			});
		});
				
	$(".gong_search_html .block02 .txt_box a,.search_index .cm_block01 .block02 .jrrs_box .search_tags .txt_box a").each(function(i){
		var mycolor = ['color01', 'color02', 'color03', 'color04', 'color05', 'color06', 'color07', 'color08', 'color09', 'color10', 'color11', 'color12', 'color13', 'color14', 'color15', 'color16', 'color17']; 
		var myfontsize = ['fontsize01', 'fontsize02']; 
		var myfontweight = ['fontweight01', 'fontweight02'];  
        //Math.random()*(上限-下限+1)+下限   
        var i = parseInt(Math.random() * (16 - 0 + 1) + 0); 
		var s = parseInt(Math.random() * (1 - 0 + 1) + 0); 
		var w = parseInt(Math.random() * (1 - 0 + 1) + 0);  
		$(this).addClass(mycolor[i]).addClass(myfontsize[s]).addClass(myfontweight[w]);
		});
	
	
	//图库首页js
	$(".photo_index .cm_block01 .block02 ul li").hover(function(){
		$(this).addClass("current");
		$(this).siblings().removeClass("current");
		});
	
	
	$(".photo_index .cm_block03 .block01 .gd_box01 ul").each(function(i) {
		var a=i+1;
		var b=2+(a-1)*4
        $(".photo_index .cm_block03 .block01 .gd_box01 ul li").eq(b).addClass("current");
    });
	$(".photo_index .cm_block03 .block01 .gd_box01 ul li").hover(
		function(){
			$(".photo_index .cm_block03 .block01 .gd_box01 ul li").removeClass("current");
			$(this).addClass("current");
			});
	$(".photo_index .cm_block03 .block01 .btn").click(function(){
			$(".photo_index .cm_block03 .block01 .gd_box01 ul li").removeClass("current");
			$(".photo_index .cm_block03 .block01 .gd_box01 ul").each(function(i) {
			var a=i+1;
			var b=2+(a-1)*4
			$(".photo_index .cm_block03 .block01 .gd_box01 ul li").eq(b).addClass("current");
			});
		});
		
	
	$(".photo_index .cm_block03 .block02 .gd_box01 ul").each(function(i) {
		var a=i+1;
		var b=1+(a-1)*4
        $(".photo_index .cm_block03 .block02 .gd_box01 ul li").eq(b).addClass("current");
    });
	$(".photo_index .cm_block03 .block02 .gd_box01 ul li").hover(
		function(){
			$(".photo_index .cm_block03 .block02 .gd_box01 ul li").removeClass("current");
			$(this).addClass("current");
			});
	$(".photo_index .cm_block03 .block02 .btn").click(function(){
			$(".photo_index .cm_block03 .block02 .gd_box01 ul li").removeClass("current");
			$(".photo_index .cm_block03 .block02 .gd_box01 ul").each(function(i) {
			var a=i+1;
			var b=1+(a-1)*4
			$(".photo_index .cm_block03 .block02 .gd_box01 ul li").eq(b).addClass("current");
			});
		});
		
	
	$(".photo_index .cm_block03 .block03 .gd_box01 ul").each(function(i) {
		var a=i+1;
		var b=2+(a-1)*4
        $(".photo_index .cm_block03 .block03 .gd_box01 ul li").eq(b).addClass("current");
    });
	$(".photo_index .cm_block03 .block03 .gd_box01 ul li").hover(
		function(){
			$(".photo_index .cm_block03 .block03 .gd_box01 ul li").removeClass("current");
			$(this).addClass("current");
			});
	$(".photo_index .cm_block03 .block03 .btn").click(function(){
			$(".photo_index .cm_block03 .block03 .gd_box01 ul li").removeClass("current");
			$(".photo_index .cm_block03 .block03 .gd_box01 ul").each(function(i) {
			var a=i+1;
			var b=2+(a-1)*4
			$(".photo_index .cm_block03 .block03 .gd_box01 ul li").eq(b).addClass("current");
			});
		});
		
	
	$(".photo_index .cm_block03 .block04 .gd_box01 ul").each(function(i) {
		var a=i+1;
		var b=1+(a-1)*4
        $(".photo_index .cm_block03 .block04 .gd_box01 ul li").eq(b).addClass("current");
    });
	$(".photo_index .cm_block03 .block04 .gd_box01 ul li").hover(
		function(){
			$(".photo_index .cm_block03 .block04 .gd_box01 ul li").removeClass("current");
			$(this).addClass("current");
			});
	$(".photo_index .cm_block03 .block04 .btn").click(function(){
			$(".photo_index .cm_block03 .block04 .gd_box01 ul li").removeClass("current");
			$(".photo_index .cm_block03 .block04 .gd_box01 ul").each(function(i) {
			var a=i+1;
			var b=1+(a-1)*4
			$(".photo_index .cm_block03 .block04 .gd_box01 ul li").eq(b).addClass("current");
			});
		});
	
	$(".photo_index .cm_block06 .img_box div").hover(function(){
		var dangdian=$(".photo_index .cm_block06 .txt_box div").eq($(".photo_index .cm_block06 .img_box div").index(this));
		$(".photo_index .cm_block06 .txt_box div").removeClass("show_box");
		dangdian.addClass("show_box");
		});
		
	//大首页js
	$(".home_index .cm_block01 .block03 .search_tags .txt_box a").each(function(i){
		var mycolor = ['color01', 'color02', 'color03', 'color04', 'color05', 'color06', 'color07', 'color08', 'color09', 'color10', 'color11', 'color12', 'color13', 'color14', 'color15', 'color16', 'color17']; 
		var myfontsize = ['fontsize01', 'fontsize02']; 
		var myfontweight = ['fontweight01', 'fontweight02'];  
        //Math.random()*(上限-下限+1)+下限   
        var i = parseInt(Math.random() * (16 - 0 + 1) + 0); 
		var s = parseInt(Math.random() * (1 - 0 + 1) + 0); 
		var w = parseInt(Math.random() * (1 - 0 + 1) + 0);  
		$(this).addClass(mycolor[i]).addClass(myfontsize[s]).addClass(myfontweight[w]);
		});
	
	$(".home_index .cm_block01 .block03 .mxcmj_box ul li").hover(function(){
		$(this).addClass("current");
		$(this).siblings().removeClass("current");
		});
	
	$(".home_index .cm_block03 .tab_name_box .txt").hover(function(){
		$(this).addClass("current");
		$(this).siblings().removeClass("current");
		var dangqian=$(".home_index .cm_block03 .block").eq($(".home_index .cm_block03 .tab_name_box .txt").index(this));
		dangqian.addClass("show_box");
		dangqian.siblings().removeClass("show_box");
		});
	$(".home_index .cm_block04 .btn").toggle(
		function(){
			$(".home_index  .cm_block04 .block").hide();
			$(".home_index  .cm_block04 .block02").show();
			},
		function(){
			$(".home_index  .cm_block04 .block").hide();
			$(".home_index  .cm_block04 .block03").show();
		},
		function(){
			$(".home_index  .cm_block04 .block").hide();
			$(".home_index  .cm_block04 .block01").show();
			}
	   );
	
	$(".home_index .cm_block05 .box dl dd").hover(
		function(){
			$(this).addClass("current");
			$(this).find(".btn").show();
			},
		function(){
			$(this).removeClass("current");
			$(this).find(".btn").hide();
			}
		);
	
	
	//热搜关键字长度
	$(".home_index .cm_block01 .block03 .search_tags .txt_box a").eq(0).css({"width":"148px"});
	$(".home_index .cm_block01 .block03 .search_tags .txt_box a").eq(1).css({"width":"202px"});
	$(".home_index .cm_block01 .block03 .search_tags .txt_box a").eq(2).css({"width":"134px"});
	$(".home_index .cm_block01 .block03 .search_tags .txt_box a").eq(3).css({"width":"102px"});
	$(".home_index .cm_block01 .block03 .search_tags .txt_box a").eq(4).css({"width":"84px"});
	$(".home_index .cm_block01 .block03 .search_tags .txt_box a").eq(5).css({"width":"84px"});
	$(".home_index .cm_block01 .block03 .search_tags .txt_box a").eq(6).css({"width":"84px"});
	$(".home_index .cm_block01 .block03 .search_tags .txt_box a").eq(7).css({"width":"152px"});
	$(".home_index .cm_block01 .block03 .search_tags .txt_box a").eq(8).css({"width":"148px"});
	$(".home_index .cm_block01 .block03 .search_tags .txt_box a").eq(9).css({"width":"202px"});
	$(".home_index .cm_block01 .block03 .search_tags .txt_box a").eq(10).css({"width":"134px"});
	$(".home_index .cm_block01 .block03 .search_tags .txt_box a").eq(11).css({"width":"102px"});
	$(".home_index .cm_block01 .block03 .search_tags .txt_box a").eq(12).css({"width":"84px"});
	
	$(".search_index .cm_block01 .block02 .jrrs_box .search_tags .txt_box a").eq(0).css({"width":"160px"});
	$(".search_index .cm_block01 .block02 .jrrs_box .search_tags .txt_box a").eq(1).css({"width":"90px"});
	$(".search_index .cm_block01 .block02 .jrrs_box .search_tags .txt_box a").eq(2).css({"width":"120px"});
	$(".search_index .cm_block01 .block02 .jrrs_box .search_tags .txt_box a").eq(3).css({"width":"130px"});
	$(".search_index .cm_block01 .block02 .jrrs_box .search_tags .txt_box a").eq(4).css({"width":"150px"});
	$(".search_index .cm_block01 .block02 .jrrs_box .search_tags .txt_box a").eq(5).css({"width":"100px"});
	$(".search_index .cm_block01 .block02 .jrrs_box .search_tags .txt_box a").eq(6).css({"width":"150px"});
	$(".search_index .cm_block01 .block02 .jrrs_box .search_tags .txt_box a").eq(7).css({"width":"100px"});
	$(".search_index .cm_block01 .block02 .jrrs_box .search_tags .txt_box a").eq(8).css({"width":"280px"});
	$(".search_index .cm_block01 .block02 .jrrs_box .search_tags .txt_box a").eq(9).css({"width":"280px"});
	
	
	
});