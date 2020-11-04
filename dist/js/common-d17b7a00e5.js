var Util=Util||{};Util.pageSize=function(){var t=document.documentElement,e=["clientWidth","clientHeight","scrollWidth","scrollHeight"],n={};for(var i in e)n[e[i]]=t[e[i]];return n.scrollLeft=document.body.scrollLeft||document.documentElement.scrollLeft,n.scrollTop=document.body.scrollTop||document.documentElement.scrollTop,n},Util.lazyload3Init={},Util.lazyload3=function(t){Util.lazyload3Method(t),Util.lazyload3Init[t]||(Util.lazyload3Init[t]=1,window.onscroll=function(){Util.lazyload3Method(t)})},Util.lazyload3Method=function(t){for(var e=$("."+t),n=document.documentElement.clientHeight,i=$(document).scrollTop(),o=0,a=e.length;o<a;o++){var l=e[o];$(l).offset().top<n+i+200&&($(l).removeClass(t),function(t){var e=new Image,n=t.getAttribute("data-original");e.onload=function(){"IMG"==t.tagName?(t.setAttribute("src",n),t.onload=function(){t.style.opacity=1}):(t.style.backgroundImage="url("+n+")",setTimeout(function(){t.style.opacity=1},15))},e.src=n}(l))}},Util.getQueryString=function(t){var e={};if(t=t.split("?"),t.length>1){t=t[1],t=t.split("&");for(var n=0,i=t.length;n<i;n++){var o=t[n].split("=");o.length>1&&(e[""+o[0]]=o[1])}}return e},Util.timeCount=function(t,e,n){t=$(t);var i=t.data("endtime"),o=1*Math.floor((new Date).getTime()/1e3);if(o>i)t.html(e);else{var a=i-o,l=Math.floor(a/86400),c=Math.floor((a-60*l*60*24)/3600),s=Math.floor((a-60*l*60*24-60*c*60)/60),r=a-60*l*60*24-60*c*60-60*s,d="还剩&nbsp;"+(l>0?"<em>"+l+"</em>天":"")+(c>0?"<em>"+c+"</em>时":"")+(s>0?"<em>"+s+"</em>分":"")+(r>=0?"<em>"+r+"</em>秒":"")+"&nbsp;结束";n&&2==n&&l<=0&&(d='<span style="color:#FF2220;font-weight: bold;">即将失效：&nbsp;'+(l>0?"<em>"+l+"</em>天":"")+(c>0?"<em>"+c+"</em>时":"")+(s>0?"<em>"+s+"</em>分":"")+(r>=0?"<em>"+r+"</em>秒":"")+"</span>"),t.html(d)}},Util.scrollToTop=function(t){var e=$("body,html");t<20?e.scrollTop(0):e.stop(!0,!0).animate({scrollTop:0},t)},Util.sideFixedMenu=function(t,e){if(t){e||(e=2e3);var n=$(document),i=($("body"),t.width()),o=Math.floor(i/2)+25,a="";a+='<div class="side-fixed-menu" style="margin-left: '+o+'px;">',a+='<div class="menu-item" id="backToTop" style="display: none;">',a+='<i class="back-to-top"></i>',a+="<p>返回顶部</p>",a+="</div>";var l=$.cookie("gender")||0;a+='<div class="menu-item l" id="switchGender" data-gender="0">',a+='<i class="gender-female'+(0==l?" active":"")+'"></i>',a+="<p>"+(0==l?"当前女版":"切换女版")+"</p>",a+="</div>",a+='<div class="menu-item l" id="switchGender" data-gender="1">',a+='<i class="gender-male'+(1==l?" active":"")+'"></i>',a+="<p>"+(1==l?"当前男版":"切换男版")+"</p>",a+="</div>",a+="</div>";var c=$(a);c.find("#backToTop").on("click",function(){Util.scrollToTop(100)}),c.find("#switchGender").on("click",function(){var t=$(this).data("gender");if(t!=l){$.cookie("gender",t,{expires:360,path:"/"}),Util.gaSendEvent("切换性别:点击:切换"+("1"==t?"男":"女")+"版");var e=window.location.href,n=Util.getQueryString(e).channel;e.match(/\/s\/.+/)?window.location.reload():window.location.href="/"+(n?"?channel="+n:"")}}),c.appendTo($("body")),$(window).on("scroll",function(){n.scrollTop()>e?c.find("#backToTop").fadeIn(100):c.find("#backToTop").fadeOut(100)})}},Util.zkItemTimeCount=function(t){var e=null;$(".zk-item").unbind("mouseenter").unbind("mouseleave"),$(".zk-item").on("mouseenter",function(){clearInterval(e),e=null;var n=$(this).find(".time-count");Util.timeCount(n,"优惠券已过期",t),e=setInterval(function(){Util.timeCount(n,"优惠券已过期",t)},1e3)}).on("mouseleave",function(){clearInterval(e),e=null})},Util.transHTTPS=function(t){return t.replace(/^http:\/\//,"//")},Util.createCouponList=function(t,e,n){n=n||"未知";for(var i="<div>",o=0,a=t.length;o<a;o++){var l=t[o],c=null;if(l.topic_id){if(!l.coupon_info)continue;0==l.is_product_topic&&(c=l),l=l.coupon_info}if(l.element_id)if(l.coupon_list&&l.coupon_list.length>0)l=l.coupon_list[0];else{if(!(l.topic_list&&l.topic_list.length>0))continue;if(l=l.topic_list[0],!l.coupon_info)continue;0==l.is_product_topic&&(c=l),l=l.coupon_info}switch(1*l.platform_id){case 1:"淘宝";break;case 2:"天猫"}i+='<div class="zk-item">',i+='<div class="img-area">';var s="";l.is_from_tb?(s="https://item.taobao.com/item.htm?id="+l.item_id,l.ticket&&l.ticket.ticket_url&&(s=l.ticket.ticket_url),i+='<a target="_blank" rel="nofollow" href="'+s+'">'):c?(s="/topic/"+c.topic_id+"/",i+='<a target="_blank" href="'+s+'">'):(s="/coupon/"+l.coupon_id+"/",i+='<a target="_blank" href="'+s+'">'),l.rank_no?i+='<div class="rank-no rank-no-'+l.rank_no+'"></div>':!c&&l.is_new&&(i+='<div class="is-new"></div>');var r=1==l.product_type&&l.ticket?l.ticket.coupon_price:(l.raw_price-l.zk_price).toFixed(0);r>0&&(i+='<div data-ga-event="'+(c?"专场":"商品")+"_右上角领券:点击:"+n+'" class="lq">',i+='<div class="lq-t">',i+='<p class="lq-t-d1">'+(1==l.product_type?"领券":"折扣")+"立减</p>",i+='<p class="lq-t-d2">&yen;<span>'+r+"</span></p>",i+="</div>",i+='<div class="lq-b"></div>',i+="</div>"),c&&(i+='<div class="bottom-info">',i+='<p class="time-count">共'+c.item_count+"件</p>",i+="</div>"),i+='<img data-ga-event="'+(c?"专场":"商品")+"_图片:点击:"+n+'" class="lazy new lazyLoad" data-original="'+this.transHTTPS(l.thumbnail_pic)+'" alt="'+l.title+'">',i+="</a>",i+="</div>",i+='<p class="title-area elli">',l.is_promotion?i+='<i class="de-icon"></i>':(2==l.platform_id&&(i+='<i class="tmall-icon"></i>'),1==l.post_free&&(i+='<span class="post-free">包邮</span>')),i+=l.title+"</p>",l.rank_no?(i+='<div class="recover-raw-price">',l.ticket&&1*l.ticket.coupon_end_time-Math.floor(Date.now()/1e3)<=172800&&(i+="<span>即将恢复"+l.raw_price+"元</span>"),i+="</div>"):i+='<div class="raw-price-area">现价：&yen;'+l.raw_price+'<p class="sold">销量 '+(c?1*c.month_sales||l.month_sales:l.month_sales)+"</p></div>";var d=(l.zk_price/l.raw_price).toFixed(1),p=1==l.product_type?r+" 元券":d+"折";i+='<div class="info">',l.rank_no?(i+='<div class="price-area">',i+='<span class="price">',i+='&yen;<em class="number-font">'+l.zk_price.toString().split(".")[0]+"</em>",i+='<em class="decimal">'+(l.zk_price.toString().split(".").length>1?"."+l.zk_price.toString().split(".")[1]:"")+"</em></span>",i+='<span class="rp">&yen;'+l.raw_price+"</span>",i+="</div>",i+='<span class="month-sales">销量&nbsp;'+l.month_sales+"</span>"):(i+='<div class="price-area">',i+='<span class="price">',l.is_promotion?i+='<em class="de">双12价：&nbsp;</em>':i+=(1==l.product_type?"券后价":"折扣价")+"：",i+='&yen;<em class="number-font">'+l.zk_price.toString().split(".")[0]+"</em>",i+='<em class="decimal">'+(l.zk_price.toString().split(".").length>1?"."+l.zk_price.toString().split(".")[1]:"")+"</em></span>",i+="</div>",i+='<a data-ga-event="'+(c?"专场":"商品")+"_立即抢购:点击:"+n+'" class="buy-btn" target="_blank" href="'+s+'">'+p+"</a>"),i+="</div>",i+="</div>"}i+="</div>",i=$(i),i.find("[data-ga-event]").on("click",function(){var t=$(this),e=t.attr("data-ga-event");Util.gaSendEvent(e)}),e.append(i),Util.addChannel(),Util.lazyload3("lazyLoad")},Util.getBottomOperElements=function(t){function e(e){for(var i='<div class="footer-element-area">',o=0,a=e.length;o<a;o++){var l=e[o].extend;n.channel&&!l.match(/channel=/)&&(l.match(/\?/)?l+="&channel="+n.channel:l+="?channel="+n.channel),i+='<div data-i="'+(o+1)+'" class="footer-element-item">',i+='<a target="_blank" href="'+l+'"><img src="'+e[o].pic+'"></a>',i+="</div>"}i+="</div>",i=$(i),i.find(".footer-element-item").on("click",function(){Util.gaSendEvent("底部运营位:点击:底部运营位_"+$(this).data("i"))}),t.after(i)}$.ajax({url:"/getOperElements/",type:"GET",dataType:"json",data:{},beforeSend:function(){},success:function(t){1==t.code&&e(t.data.footer_element)}});var n=Util.getQueryString(window.location.href)},Util.arrInsertEle=function(t,e,n){var i=t.slice(0,n),o=t.slice(n);if(!e.length){var a=[];a.push(e),e=a}return i.concat(e).concat(o)},Util.uniqueCouponList=function(t){for(var e={},n=[],i=0,o=t.length;i<o;i++){var a=t[i];a.coupon_id&&!e["coupon"+a.coupon_id]&&(n.push(a),e["coupon"+a.coupon_id]=1),a.topic_id&&!e["topic"+a.topic_id]&&(n.push(a),e["topic"+a.topic_id]=1),a.element_id&&!e["element"+a.element_id]&&(n.push(a),e["element"+a.element_id]=1),0==a.coupon_id&&n.push(a)}return n},Util.insertTimelineEle=function(t,e,n,i){for(var o=0,a=n.length;o<a;o++){var l=n[o].index-1;if((l=l<0?0:l)>=t&&l<e){var c=n[o];n[o].coupon_list&&n[o].coupon_list.length>1?c=n[o].coupon_list:n[o].topic_list&&n[o].topic_list.length>1&&(c=n[o].topic_list),i=Util.arrInsertEle(i,c,l-t),e=t+i.length}}return Util.uniqueCouponList(i)},Util.addChannel=function(){var t=Util.getQueryString(window.location.href);t.channel&&$("a").each(function(){var e=$(this),n=e.attr("href");n.match(/channel=[0-9]+/)||(n+=(n.indexOf("?")>=0?"&":"?")+"channel="+t.channel,e.attr("href",n))})},Util.scrollLoadEvent=function(t,e){$(document).on("scroll",function(){var n=$(document).scrollTop(),i=Util.pageSize().scrollHeight;n+Util.pageSize().clientHeight>=i-t&&e&&e()})},Util.gaSendEvent=function(t){var e=t.split(":");"undefined"!=typeof ga&&e.length>=3&&ga("send","event",e[0],e[1],e[2],e.length>=4?e[3]:0)},Util.onerrorImg=function(t){t.src="/img/shop/shopHeader.jpg"},$(function(){if(Util.addChannel(),Util.lazyload3("lazyLoad"),!$.cookie("bdm_cancel")){var t=$("#bdm");t.css("display","block"),t.find(".close").on("click",function(){t.css("display","none"),$.cookie("bdm_cancel",1,{path:"/",expires:15})})}$("[data-ga-event]").on("click",function(){var t=$(this),e=t.attr("data-ga-event");Util.gaSendEvent(e)})});