$(function(){function a(t,e){return $.merge($.grep(t,function(t){return-1==$.inArray(t,e)}),$.grep(e,function(e){return-1==$.inArray(e,t)}))}function i(t,e){return Math.floor(Math.random()*(e-t))+t}function l(t){return 1==t.toString().length?"0"+t:t}function s(){var h,p,f,t=$(".cent.ddq .time").attr("data-next1_date"),e=$(".cent.ddq .time").attr("data-next1_hour"),n=$(".cent.ddq .time").attr("data-next2_date"),a=$(".cent.ddq .time").attr("data-next2_hour"),i=(new Date).getFullYear()+"-"+l((new Date).getMonth()+1)+"-"+l((new Date).getDate()),s=(new Date).getHours(),r=(new Date).getMinutes(),c=(new Date).getSeconds(),t=new RegExp(i).test(t);!1!==t?0<e-s?(h=l(e-s-1),p=l(59-r),f=l(60-c),$(".cent.ddq .time .cc_hour").html(h)):(t=new RegExp(i).test(n),p=l(59-r),f=l(60-c),_h2=l(!1!==t?a-s-1:a-s+23),$(".cent.ddq .time .cc_hour").html(_h2)):(h=l(e-s+23),p=l(59-r),f=l(60-c),$(".cent.ddq .time .cc_hour").html(h)),$(".cent.ddq .time .cc_min").html(p),$(".cent.ddq .time .cc_sec").html(f)}var r=new Swiper(".banner-center",{direction:"horizontal",loop:!0,autoplay:{disableOnInteraction:!1},pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});1<$(".banner-center .swiper-slide").length-2&&$(".swiper-pagination").show();try{r.el.onmouseenter=function(){1<$(".banner-center .swiper-slide").length-2&&(r.navigation.$nextEl.addClass("show"),r.navigation.$prevEl.addClass("show"))},r.el.onmouseleave=function(){1<$(".banner-center .swiper-slide").length-2&&(r.navigation.$nextEl.removeClass("show"),r.navigation.$prevEl.removeClass("show"))}}catch(c){}new Swiper(".notice",{direction:"vertical",loop:!0}),$(".com_banner").each(function(t){var n;1<$(this).find(".swiper-slide").length&&($(this).attr("banner-id"),n="."+$(this).attr("banner-id"),new Swiper(n,{autoplay:!0,direction:"horizontal",loop:!0}),$(n).find(".swiper-slide").length)});var o=$(".cent.ddq .list").length,d=new Array(0,1,2,3),h=!1,p=($(".cent.ddq .change").on("click",function(){if(o<=4||h)return!1;h=!0,$(".cent.ddq .list").hide();for(var t=new Array,e=0;e<o;e++)t.push(e);for(t=a(t,d);4<t.length;)t.splice(i(0,t.length-1),1);t.length<4&&$.each(d,function(e,n){if(t.push(n),4<=t.length)return!1}),d=t,$.each(t,function(t,e){$(".cent.ddq .list").eq(e).show()}),h=!1}),$(".yh_ul li").length),f=new Array(0,1,2),u=!1;setInterval(function(){if(!(p<=3||u)){u=!0,$(".yh_ul li").hide();for(var t=new Array,e=0;e<p;e++)t.push(e);for(t=a(t,f);3<t.length;)t.splice(i(0,t.length-1),1);t.length<3&&$.each(f,function(e,n){if(t.push(n),3<=t.length)return!1}),f=t,$.each(t,function(t,e){$(".yh_ul li").eq(e).show()}),u=!1}},1e4),s(),setInterval(function(){s()},1e3),200<$(window).scrollTop()?$(".to_top").slideDown():$(".to_top").slideUp(),$(window).scroll(function(){200<$(window).scrollTop()?$(".to_top").slideDown():$(".to_top").slideUp()}),$(".list-tab span").on("click",function(){$(".list-tab span").removeClass("act").eq($(this).index()).addClass("act"),$(".list_top").hide().eq($(this).index()).show(),$(".list_bt").hide().eq($(this).index()).show()}),$(".list-tab").siblings(".more").on("click",function(){window.open($(this).data("href")+"&type="+parseInt($(".list-tab span.act").index()+1),"_blank")})}),function(){var t=$("#homeGoodsItem");if(0!=t.length){for(var n="",a=lsitData.length-1;0<=a;a--)n+=function(t,e){return'<a target="_blank" class="goods_list" href="'+detailUrl+t.id+'"  id="cms-goods-items_'+t.id+"_"+e+'"   ><div class="img"><img src="'+t.pic+'" alt="'+t.d_title+'"></div><div class="content"><p class="co_tit"><span data-gid="'+t.id+'">'+(t.istmall&&0==parseInt(t.istmall)?'<i class="tag tag-tao fl" title="淘宝"></i>':'<i class="tag tag-tmall fl" title="天猫"></i>')+t.d_title+'</span></p><div class="sale_num"><span class="fl">原价 <i>'+t.yuanjia+'</i> </span><span class="fr">销量 <i>'+t.xiaoliang+'</i></span></div><div class="price cf"><i class="p">￥</i><span>'+t.jiage+'</span>  <b class="fr"><i>'+t.quan_jine+"</i>元券</span></b></div></div></a>"}(lsitData[a],a);t.html(n)}}(),function(){var t=$("#goodsItems");if(0!=t.length){for(var n="",a=0;a<lsitData.length;a++)n+=function(t,e){return'<li class="'+(e%4==3?"no-right":"")+' g_over" id="cms-goods-items_'+t.id+"_"+e+'"  >'+(1==parseInt(t.activity_type_3)&&0<parseInt(t.hz_quan_over)?'<span class="active-ico ico618-text"><b>付'+t.quan_m_link+"减"+t.hz_quan_over+"</b></span>":"")+(1==parseInt(t.activity_type_3)&&parseInt(t.hz_quan_over)<=0?'<span class="active-ico ico618"></span>':"")+(1==parseInt(t.activity_type_4)?'<span class="active-ico ico618-start"></span>':"")+(1==parseInt(t.activity_type_6)?'<span class="active-ico ico618-start" style="background-image: url(\'https://img.alicdn.com/imgextra/i2/97012073/O1CN01NjgnRK1RBTb8QIprX_!!97012073.png\'); top:194px;left: 0;"></span>':"")+(1==parseInt(t.activity_type_7)?'<span class="active-ico tb-xsl"></span>':"")+'<a href="'+detailUrl+t.id+'" class="img" target="_blank" data-gid="'+t.id+'"><img src="'+t.pic+'" alt="'+t.d_title+'"></a><div class="goods-padding"><div class="title"><a target="_blank" href="'+detailUrl+t.id+'" data-gid="'+t.id+'">'+(t.istmall&&0==parseInt(t.istmall)?'<i class="tag tag-tao fl" title="淘宝"></i>':"")+(t.istmall&&1==parseInt(t.istmall)?'<i class="tag tag-tmall fl" title="天猫"></i>':"")+t.d_title+'</a></div><div class="goods-num-type"><span class="old-price fl">原价 <i>'+t.yuanjia+'</i></span><span class="goods-num fr">销量 <i>'+t.xiaoliang+'</i></span></div><div class="coupon-wrap clearfix"><span class="price"><i>￥</i><span>'+t.jiage+'</span></span><b class="coupon fr"><i>'+t.quan_jine+'</i> 元券</b></div></div><em class="border_l_b border"></em><em class="border_l_t border"></em><em class="border_r_b border"></em><em class="border_r_t border"></em></li>'}(lsitData[a],a);t.html(n)}}(),function(){function t(t){var e=t.parent().parent(),n=t,a=0<e.find(".search-land li.active").length?e.find(".search-land li.active").index():0;if(40==event.keyCode)return a=(a=e.find(".search-land li.active").length?a+1:0)>e.find(".search-land li").length-1?0:a,e.find(".search-land li").removeClass("active"),e.find(".search-land").find("li:eq("+a+")").addClass("active"),t.val(e.find(".search-land li.active").html()),0;if(38==event.keyCode)return a=(a=e.find(".search-land li.active").length?a-1:e.find(".search-land li").length-1)<0?e.find(".search-land li").length-1:a,e.find(".search-land li").removeClass("active"),e.find(".search-land").find("li:eq("+a+")").addClass("active"),t.val(e.find(".search-land li.active").html()),0;var i=t.parents("form").siblings(".search-land"),a=t.val();0==a.replace(/\s+/g,"").length?($(".src-close-btn").hide(),i.hide()):$(".src-close-btn").show(),$.ajax({url:_url,type:"get",dataType:"json",data:{kw:a},success:function(e){"1"==e.status&&(0==e.data.length||(n.parent("form").siblings(".search-land").show(),n.parent("form").siblings(".search-land").find("li").each(function(a){a>e.data.length-1?n.parent("form").siblings(".search-land").find("li").eq(a).hide():""==t.val()||n.parent("form").siblings(".search-land").find("li").eq(a).show().html(e.data[a])})));0==n.val().replace(/\s+/g,"").length?($(".src-close-btn").hide(),i.hide()):$(".src-close-btn").show()}})}window.SetHome=function(t,e){try{t.style.behavior="url(#default#homepage)",t.setHomePage(e)}catch(n){if(window.netscape){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(n){layer.msg("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。")}Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch).setCharPref("browser.startup.homepage",e)}else layer.msg("您的浏览器不支持，请按照下面步骤操作：\n 1.打开浏览器设置。\n 2.点击设置首页。\n 3.输入："+e+"点击确定。")}},window.shoucang=function(t,e){try{window.external.addFavorite(e,t)}catch(n){try{window.sidebar.addPanel(t,e,"")}catch(n){layer.msg("加入收藏失败，请使用Ctrl+D进行添加")}}},$(function(){$("#search button").click(function(){if(30<$('#search input[name="kw"]').val().length)return layer.msg("您搜索的关键词过长！",{timer:2500}),!1}),$(window).scroll(function(){500<$(window).scrollTop()?$(".toTop").fadeIn(1e3):$(".toTop").fadeOut(1e3)})}),$(window).scroll(function(){130<$(window).scrollTop()?($(".floatNav").fadeIn(),$(".floatNav .fn-block").width(1200-$(".fn-left").width()-47),$(".floatNav .fn-block .my-src-input").width(1200-$(".fn-left").width()-147),$(".floatNav .w_1200 .search-land").width(1200-$(".fn-left").width()-50),$(".search-land").eq(0).fadeOut()):$(".floatNav").fadeOut()});navigator.userAgent.indexOf("MSIE"),$(".my-src-input").focus(function(){jQuery.fn.isChildAndSelfOf=function(t){return 0<this.closest(t).length};var e=$(this).parent().parent();$("body").unbind("click").on("click",function(t){$(t.target).isChildAndSelfOf(e)||$(".search-land").hide()}),t($(this))}).keyup(function(e){t($(this)),""==$(this).val()&&$(this).parent("form").siblings(".search-land").find("li").text("")}),$(".search-land").on("click","li",function(){$(".my-src-input").val($(this).text()),$(".my-src-btn").trigger("click")}),$(".search-land").on("click","p",function(){$(".search-land").hide()}),$(".src-close-btn").click(function(){$(".src-close-btn").hide(),$(".search-land").hide(),""==$(".my-src-input").attr("value")?$(".my-src-input").val(""):$(".my-src-input").val("").attr("placeholder","请输入要搜索的词")}),$("#search button").on("click",function(){var t=$(this);return""==$(this).siblings('input[name="kw"]').val()&&""!=kw_url?(window.location.href=$("#m_url").val(),!1):void t.parents("form").attr("action",$("#h_url").val())}),$(".floatNav .srcBtn").on("click",function(){var t=$(this);return""==$("#float-src-input").val()&&""!==kw_url?(window.location.href=$("#m_url").val(),!1):void t.parents("form").attr("action",$("#h_url").val())})}();