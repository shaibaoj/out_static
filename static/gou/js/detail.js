var oItemId="";function echarts_show_itemid(t,e){echarts.init(document.getElementById("echarts-mail")).setOption({tooltip:{trigger:"axis",axisPointer:{type:"cross"}},legend:{data:[{name:"成交销量",textStyle:{fontSize:15,color:"#000",fontWeight:"bolder"}}]},xAxis:{gridIndex:0,type:"category",boundaryGap:!1,data:e},yAxis:{type:"value",name:"商品日销量轨迹",nameTextStyle:{color:"white",backgroundColor:"rgba(92, 173, 255, 0.8)",padding:[4,6]},nameGap:8,axisLabel:{formatter:"{value}"}},grid:{gridIndex:0,top:"8%",left:"8%",width:"880px",height:"280px"},series:[{name:"成交销量",type:"line",smooth:!0,label:{normal:{show:!0}},data:t}]})}function get_show_time(t){for(var e=6;1<=e;e--)t<e?$(".hour"+e).removeClass("echarts-clickable"):$(".hour"+e).addClass("echarts-clickable")}function onLineLinFun(t){autoHeight(),$.ajax({url:"/api/common/goods/api_check_material",data:Object.assign({num_iid:t},{hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token}),type:"post",dataType:"json",success:function(t){var e=t.data.content;if(1==e.status){var i=$("#material_box").html(),t=e.item_info.shop_score;i=(i=(i=(i=(i=(i=(i=(i=(i=(i=(i=(i=(i=(i=(i=(i=(i=i.replace(/\{\{itemshorttitle\}\}/g,e.item_info.itemshorttitle)).replace(/\{\{itemendprice\}\}/g,parseFloat(e.item_info.itemendprice))).replace(/\{\{tkrates\}\}/g,parseFloat(e.item_info.tkrates))).replace(/\{\{tkmoney\}\}/g,parseFloat(e.item_info.tkmoney))).replace(/\{\{general_index\}\}/g,e.item_info.general_index)).replace(/\{\{itempic\}\}/g,e.item_info.itempic)).replace(/\{\{itemsale2\}\}/g,e.item_info.itemsale2)).replace(/\{\{todaysale\}\}/g,e.item_info.todaysale)).replace(/\{\{itemprice\}\}/g,parseFloat(e.item_info.itemprice))).replace(/\{\{discount\}\}/g,parseFloat(e.item_info.discount))).replace(/\{\{couponmoney\}\}/g,e.item_info.couponmoney)).replace(/\{\{couponreceive\}\}/g,e.item_info.couponreceive)).replace(/\{\{couponsurplus\}\}/g,e.item_info.couponsurplus)).replace(/\{\{itemid\}\}/g,e.item_info.itemid)).replace(/\{\{itemsale\}\}/g,e.item_info.itemsale)).replace(/\{\{grade_avg\}\}/g,e.item_info.grade_avg)).replace(/\{\{sellernick\}\}/g,e.item_info.sellernick);try{var a=JSON.parse(t);i=(i=(i=i.replace(/\{\{desc_score\}\}/g,a.desc_score)).replace(/\{\{serv_score\}\}/g,a.serv_score)).replace(/\{\{post_score\}\}/g,a.post_score)}catch(t){i=(i=(i=i.replace(/\{\{desc_score\}\}/g,"")).replace(/\{\{serv_score\}\}/g,"")).replace(/\{\{post_score\}\}/g,"")}e.main_video||void 0===e.main_video||0==e.main_video?i=i.replace(/\{\{main_video\}\}/g,"http://video.haodanku.com/"+e.main_video+"?attname="+e.material_info.main_video_url+".mp4"):$("#more_material_video").css("display","none"),""!=e.detail_video&&(i=i.replace(/\{\{detail_video\}\}/g,"http://video.haodanku.com/"+e.detail_video+"?attname="+e.material_info.detail_video_url+".mp4")),t="C"==e.item_info.shoptype?'<img src="https://img.youdanhui.cn/cms_img/2019-10-24/5db167ada0c13.png" alt="淘宝"/>':'<img src="https://img.youdanhui.cn/cms_img/2019-10-24/5db16788be2fa.png" alt="天猫"/>';try{var o=level_result(a.desc_level),n=level_result(a.serv_level),s=level_result(a.post_level);i=(i=(i=i.replace(/\{\{desc_level\}\}/g,o)).replace(/\{\{serv_level\}\}/g,n)).replace(/\{\{post_level\}\}/g,s)}catch(t){i=(i=(i=i.replace(/\{\{desc_level\}\}/g,"")).replace(/\{\{serv_level\}\}/g,"")).replace(/\{\{post_level\}\}/g,"")}i=i.replace(/\{\{shop_img\}\}/g,t);var r,c=e.material_info.seckill_content,s="",l="";for(r in c)l+='<div class="fq-copywriting"><img class="fq-copywriting_image" src="${seckill_array[seckill_i].img}" alt=""><div class="copywriting-text">${seckill_array[seckill_i].show_text}</div><span class="copy-text" style="bottom: 8px;" data-tips="<img src='+c[r].img+' alt="" style="width: 50px;">${seckill_array[seckill_i].copy_text}">复制文案</span></div>';""!=e.item_info.couponurl&&null!=e.item_info.couponurl&&(s="领券："+e.item_info.couponurl+"<br>");t="<img class='fq-copywriting_image' src='"+e.item_info.itempic_copy+"' alt=''><br/>"+e.item_info.itemshorttitle+"<br/>原价"+e.item_info.itemprice+"元，券后价【"+e.item_info.itemendprice+"元】<br/>"+s+"下单:https://detail.tmall.com/item.htm?id="+e.item_info.itemid+"<br/>"+e.item_info.itemdesc;l+='<div class="fq-copywriting" style="background: #dedede;"><img class="fq-copywriting_image" src="'+e.item_info.itempic+'_310x310.jpg" alt=""><div class="copywriting-text">'+e.item_info.itemshorttitle+"<br>原价"+e.item_info.itemprice+"元，券后价【"+e.item_info.itemendprice+"元】<br>"+s+"下单：https://detail.tmall.com/item.htm?id="+e.item_info.itemid+"<br>"+e.item_info.itemdesc+'</div><span class="copy-text" data-tips="'+t+'" style="bottom: 8px; background: #4dca51;">复制文案（含链接）</span></div>',$("#js_material_box").html(i),$(".js_copywriting_box").append(l);var d,s=e.material_info.image,t=0;if(1<(t=""!=s||"NULL"!=s?(d=s.split(",")).length:t)){var m,p="";for(m in d)p+='<div class="material-img"><div><img src="'+d[m]+'" data-src="'+d[m]+'" alt=""><label class="img-label"><input type="radio" class="img-radio" value="'+m+'"><span class="img-radioInput"></span>实拍'+(parseInt(m)+1)+"</label></div></div>";$(".js_material_img_box").html(p),$("#more_material_img").css("display","block")}else $("#more_material_img").css("display","none");i=e.material_info.friends_circle_text,s=e.material_info.show_friends_circle_text,t=e.material_info.copy_friends_circle_text;""!=i&&null!=i?($(".js_friendsCircle").append('<div class="fq-friendsCircle"><div class="friendsCircle-img"><img src="https://img.youdanhui.cn/cms_img/2019-10-24/5db157e0381d3.png" alt="" style="width: 1.875rem;" /></div><div class="friendsCircle-content"><span class="friendsCircle-title">好品生活</span><div class="friendsCircle-text">'+s+'</div><span class="copy-text" data-tips="'+t+'">复制文案</span></div></div>'),$("#friends_circle_js").css("display","block")):$("#friends_circle_js").css("display","none"),e.main_video||void 0===e.main_video||0==e.main_video||$("#more_material_video").css("display","none"),""!=e.detail_video&&null!=e.main_video?($("#video_main_url").css("display","block"),$("#video_detail_url").css("display","block")):null!=e.main_video?($("#video_main_url").css("display","block"),$("#video_detail_url").attr("src","")):""!=e.detail_video?($("#video_detail_url").css("display","block"),$("#video_main_url").attr("src","")):($("#video_main_url").attr("src",""),$("#video_detail_url").attr("src",""));s="<img class='fq-copywriting_image' src='"+e.item_info.itempic_copy+"' alt=''><br/>"+e.item_info.itemshorttitle+"<br/>原价"+e.item_info.itemprice+"元，券后价【"+e.item_info.itemendprice+"元】<br/>下单:https://detail.tmall.com/item.htm?id="+e.item_info.itemid+"<br/>"+e.item_info.itemdesc,t='<div class="fq-copywriting" style="background: #dedede;"><img class="fq-copywriting_image" src="'+e.item_info.itempic+'_310x310.jpg" alt=""><div class="copywriting-text">'+e.item_info.itemshorttitle+"<br>原价"+e.item_info.itemprice+"元，券后价【"+e.item_info.itemendprice+'元】<br>【领券方法】：<span class="tao_sign_str">【转淘口令】</span>长按复制该信息，打开手机淘宝，即可领券下单<br>'+e.item_info.itemdesc+'</div><span class="copy-text copy-tao" data-tips="'+s+'" style="display: none; background: #4dca51;">复制淘口令文案</span><span class="tao_sign" style="display:block">转淘口令</span></div>',s='<div class="fq-copywriting" style="background: #dedede;"><img class="fq-copywriting_image" src="'+e.item_info.itempic+'_310x310.jpg" alt=""><div class="copywriting-text">'+e.item_info.itemshorttitle+"<br>原价"+e.item_info.itemprice+"元，券后价【"+e.item_info.itemendprice+'元】<br>【领券方法】：点击链接-》领券下单  <span class="shorturl_str">【转二合一链接】</span><br>'+e.item_info.itemdesc+'</div><span class="copy-text copy-shorturl" data-tips="'+s+'" style="display: none; background: #4dca51;">复制二合一文案</span><span class="shorturl" style="display:block">转二合一</span></div>';$(".transfer_content").append(t+s);e.item_info.itemshorttitle,e.item_info.activityid,e.item_info.itempic_copy,e.item_info.itemprice,e.item_info.itemendprice,e.item_info.itemdesc;$(".js_copywriting_box").css("diaplay","none"),$(".material-left .material-active").css("diaplay","none"),$("#online_transfer").addClass("material-active"),$(".transfer_content").css("diaplay","block");getLocation();$.ajax({url:"/api/common/stat/loginfo",type:"post",xhrFields:{withCredentials:!0},data:Object.assign({},{hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token}),success:function(t){1==t.data.loginState?t.seller_id:($(".shorturl").text("转链登录"),$(".tao_sign").text("转淘口令登录"))}})}online_modal_chian()}})}function getLocation(){var t=document.domain.split(".");return 2===t.length?document.domain:(2<t.length&&t[0],t.slice(1).join("."))}function copy_fun(t){t=new ClipboardJS("."+t,{target:function(){return document.querySelector(".all-copywriting")}});t.on("success",function(t){layer.msg("复制成功",{time:1e3}),$("#all-copywriting").html(""),t.clearSelection()}),t.on("error",function(t){layer.msg("复制失败，您当前的浏览器不兼容或网速较慢，请更换主流浏览器",{time:1800,maxWidth:"100%"}),$("#all-copywriting").html("")})}function online_modal_chian(){var t=$("#echarts").attr("data-itemid"),a=getLocation();ajaxPost("/api/common/goods/get_echarts_data",{num_iid:t},function(t){t=t.data.content;get_show_status(t.check_hour),echarts_show_box(t.sale,t.saletime)},function(){}),$(function(){copy_fun("copy-text"),$(".copywriting-content").on("click",".copy-text",function(){var t=$(this).attr("data-tips");$(".all-copywriting").html(t)}),$(".fq-friendsCircle").on("click",".copy-text",function(){var t=$(this).attr("data-tips");$(".all-copywriting").html(t)}),$(".transfer_content").on("click",".copy-text",function(){var t=$(this).attr("data-tips");$(".all-copywriting").html(t)})}),$(function(){copy_fun("copywriting-copy"),$(".copywriting-copy").click(function(){var t,e="";$(".copywriting-content .copy-text").each(function(){t=$(this).attr("data-tips"),e+=t}),$(".all-copywriting").html(e)})}),$(function(){$(".material-image input:radio").data("checked",!0),$(".material-image input:radio").prop("checked",!0),$(".material-image .material-img").children("div").addClass("img-active"),$(".material-image input:radio").click(function(){var t=$(this);1==t.data("checked")?(t.prop("checked",!1),t.data("checked",!1),t.parents(".material-img").children("div").removeClass("img-active")):(t.prop("checked",!0),t.data("checked",!1),t.data("checked",!0),t.parents(".material-img").children("div").addClass("img-active"))})}),$(function(){copy_fun("material-copy"),$(".material-copy").click(function(){var e="";$(".img-active").each(function(){var t=$(this).children("img").attr("data-src");e=e+"<img src="+t+"><br>",$(".all-copywriting").html(e)})})}),$(".tao_sign").click(function(){var i=window.location.protocol;seller_id?$.ajax({url:"/Onlinechain/changechain",type:"post",data:{itemid:t,seller_id:seller_id,title:tao_sign_title,activityid:activityid},success:function(t){var e;1==t.status?($(".tao_sign_str").text(t.data),e="<img class='fq-copywriting_image' src='"+chain_itempic+"' alt=''><br/>"+tao_sign_title+"<br/>原价"+chain_itemprice+"元，券后价【"+chain_itemendprice+"元】<br/>【领券方法】:"+t.data+"长按复制该信息，打开手机淘宝，即可领券下单<br/>"+chain_itemdesc,$(".copy-tao").attr("data-tips",e),$(".tao_sign").css("display","none"),$(".copy-tao").css("display","block")):2==t.status?layer.confirm(t.info+"，是否前往设置？",{icon:3,title:""},function(t){skip(i+"//publish."+a+"/Personal/setpid.html"),layer.close(t)}):3==t.status?layer.confirm(t.info+"，是否前往设置？",{icon:3,title:""},function(t){skip(i+"//publish."+a+"/Tbauth/index.html"),layer.close(t)}):layer.msg(t.info,{time:1200})}}):(layer.closeAll(),skip(i+"//publish."+a))}),$(".shorturl").click(function(){var i=window.location.protocol;seller_id?$.ajax({url:"/Onlinechain/changechain",type:"post",data:{itemid:t,seller_id:seller_id,activityid:activityid},success:function(t){var e;1==t.status?($(".shorturl_str").text(t.data),e="<img class='fq-copywriting_image' src='"+chain_itempic+"' alt=''><br/>"+tao_sign_title+"<br/>原价"+chain_itemprice+"元，券后价【"+chain_itemendprice+"元】<br/>【领券方法】：点击链接-》领券下单 "+t.data+"<br/>"+chain_itemdesc,$(".copy-shorturl").attr("data-tips",e),$(".shorturl").css("display","none"),$(".copy-shorturl").css("display","block")):2==t.status?layer.confirm(t.info+"，是否前往设置？",{icon:3,title:""},function(t){skip(i+"//publish."+a+"/Personal/setpid.html"),layer.close(t)}):3==t.status?layer.confirm(t.info+"，是否前往设置？",{icon:3,title:""},function(t){skip(i+"//publish."+a+"/Tbauth/index.html"),layer.close(t)}):layer.msg(t.info,{time:1200})}}):(layer.closeAll(),skip(i+"//publish."+a))})}function autoHeight(){var a=setInterval(function(){$(".fq-copywriting_image").each(function(){var t=$(this).height(),e=$(this).siblings(".copywriting-text").innerHeight(),i=parseInt(350-t)-36-32;0<t&&(i<parseInt(e)&&($(this).siblings(".copywriting-text").css("max-height",i),$(this).siblings(".copywriting-text").addClass("textDiv")),clearInterval(a))})},50)}function echarts_show_box(t,e){echarts.init(document.getElementById("echarts")).setOption({tooltip:{trigger:"axis",axisPointer:{type:"cross"}},legend:{data:[{name:"成交销量",textStyle:{fontSize:14,color:"#000",fontWeight:"bloder"}}]},grid:{left:64,top:30,right:30,bottom:40},xAxis:{type:"category",boundaryGap:!1,data:e},yAxis:{type:"value",axisLabel:{formatter:"{value}"},splitLine:{show:!0,lineStyle:{color:"#eaeaea"}}},series:{type:"line",smooth:!0,label:{normal:{show:!0}},symbolSize:4,itemStyle:{normal:{color:"#fe6075",borderColor:"#fe6075"}},data:t}})}function get_show_status(t){for(var e=6;1<=e;e--)t<e?($(".show_hour"+e).removeClass("clickable-time"),$(".show_hour"+e).removeClass("active-time")):e==t?($(".show_hour"+e).addClass("active-time"),$(".show_hour"+e).addClass("clickable-time")):($(".show_hour"+e).addClass("clickable-time"),$(".show_hour"+e).removeClass("active-time"))}function level_result(t){t=1==t?'<i class="iconfont hdk-top icon-color-red"></i>':-1==t?'<i class="iconfont hdk-bottom icon-color-green"></i>':'<i class="iconfont hdk-line icon-color-red"></i>';return t}function skip(t){var e=document.createElement("a");document.body.appendChild(e),e.href=t,e.target="_blank",e.click(),document.body.removeChild(e)}$(document).on("click",".echarts-clickable",function(){$(this).addClass("echarts-active").siblings().removeClass("echarts-active");var t=$(this).attr("date-time");$.ajax({url:"/api/common/goods/itemid_echarts_data",type:"post",data:Object.assign({num_iid:oItemId,show_time:t},{hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token}),success:function(t){t=t.data.content;echarts_show_itemid(t.sale,t.saletime)}})}),$(".fq-chain-close").on("click",function(){$("#js_material_box").empty()}),$("body").on("click",".material-span",function(){autoHeight(),$(this).addClass("material-active").siblings().removeClass("material-active"),"图文复制"==$(this).text()?($(".copywriting-content").css("display","block"),$(".video-content").css("display","none"),$(".friendsCircle-copywriting").css("display","none"),$(".material-content").css("display","none"),$(".transfer_content").css("display","none")):"视频素材"==$(this).text()?($(".video-content").css("display","block"),$(".copywriting-content").css("display","none"),$(".friendsCircle-copywriting").css("display","none"),$(".material-content").css("display","none"),$(".transfer_content").css("display","none")):"朋友圈文案"==$(this).text()?($(".friendsCircle-copywriting").css("display","block"),$(".copywriting-content").css("display","none"),$(".video-content").css("display","none"),$(".material-content").css("display","none"),$(".transfer_content").css("display","none")):"在线转链"==$(this).text()?($(".transfer_content").css("display","block"),$(".copywriting-content").css("display","none"),$(".video-content").css("display","none"),$(".material-content").css("display","none"),$(".friendsCircle-copywriting").css("display","none"),getLocation(),$.ajax({url:"/api/common/stat/loginfo",type:"post",xhrFields:{withCredentials:!0},data:Object.assign({},{hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token}),success:function(t){1==t.data.loginState?t.seller_id:($(".tao_sign").text("转淘口令登录"),$(".shorturl").text("转链登录"))}})):($(".material-content").css("display","block"),$(".copywriting-content").css("display","none"),$(".video-content").css("display","none"),$(".friendsCircle-copywriting").css("display","none"),$(".transfer_content").css("display","none"))}),$(document).on("click",".clickable-time",function(){$(this).addClass("active-time").siblings().removeClass("active-time");var t=$("#echarts").attr("data-itemid"),e=$(this).attr("date-time");$.ajax({url:"/Index/get_echarts_data",type:"post",data:{itemid:t,show_time:e},success:function(t){echarts_show_box(t.sale,t.saletime)}})}),$(function(){var t=$(".coupon-btn");mobileUtil.isMobile,t.attr("href",t.data("url"))});var vmdetails=new Vue({el:"#vmdetails",mixins:[vmminxShopData],data:{oCommon:{id:URLPrefix.item_id,tianmao:"https://detail.tmall.com/item.htm",adminPidlink:"/user/info/pid",adminLoginlink:"/public/login",comloginState:!1},oItemData:{itemInfo:{},picIndex:1,sellerId:"",itemId:"",taobaoImage:[],strWeixinArr:[],strFriendsArr:[],strPosterArr:[],videoImg:"",videoLink:"",imgArr:[],videoHide:!0,strShorttitle:"",strDesc:"",swiperIndex:0,friendsIndex:0,wholeShow:!1,material_id:0,material_info:[]},taobaoComment:{taobaoDataArr:[],taobaoPage:1,taobaoCount:"",taobaoCountSign:0,loadmsg:!0,taobaoLabel:[]},oHistory:{salesRecord:""},oSetting:{pidArr:[],allPidNull:!1,navId:1,templateType:1,qq:{default:"",brand:"",custom:"",token:"{淘口令}",link:"{二合一短链接}",url:"{二合一长链接}",status:0,id:0,pid:"",pidName:"",relation_id:null,show:!1},weixin:{default:"",brand:"",custom:"",token:"{淘口令}",link:"{二合一短链接}",url:"{二合一长链接}",status:0,qrcode:"",id:0,pid:"",pidName:"",relation_id:null,show:!1,linkChecked:!1,qrcodeChecked:!1},other:{id:0,pid:"",pidName:"",relation_id:null},friend:{qrcodeView:!0},poster:{picUrl1:"",picUrl2:""},comwxqqnav:[{number:0,name:"修改微信文案",bool:!0},{number:1,name:"修改QQ文案",bool:!0}],wxqqIndex:0,listArrWx:[{name:"短标题"},{name:"介绍"},{name:"店铺类型"},{name:"原价"},{name:"券后价"},{name:"销量"},{name:"佣金比例"},{name:"领券链接"},{name:"券满"},{name:"券额"},{name:"优惠券剩余数量"},{name:"优惠券有效限期"},{name:"二合一长链接"},{name:"二合一短链接"},{name:"淘口令"}],listArrQq:[{name:"短标题"},{name:"介绍"},{name:"店铺类型"},{name:"原价"},{name:"券后价"},{name:"销量"},{name:"佣金比例"},{name:"领券链接"},{name:"券满"},{name:"券额"},{name:"优惠券剩余数量"},{name:"优惠券有效限期"},{name:"二合一长链接"},{name:"二合一短链接"},{name:"淘口令"}]},oVideo:{playBool:!1,videooIndex:-1,pLink:" 0",oVoice:!0,videoData:[],oTime:0,videoitemId:"",IndexSave:"",loadIcon:!1,videosetClear:"",videooneIcon:!1},dataTime:{itemType:0,endtime:"",hours:"00",Minutes:"00",Seconds:"00",oClearInterval:"",countBoll:!0},oEchartToday:{check_hour:"",sale:[],saletime:[],tabShow:0,historyprice:[],historyMinprice:"",historytime:[]}},created:function(){""!=URLPrefix.token&&(this.oCommon.comloginState=!0),this.ajaxInfo()},mounted:function(){},filters:{scoreFun:function(t){switch(t){case-1:return"hdk-top top-right-down";case 0:return"hdk-line";case 1:return"hdk-top"}},approveFun:function(t){switch(t){case"1":return"待认证";case"2":return"已认证";case"3":return"未验证"}},moneyConversion:function(t){if(t)return t.length<=4?t:5<=t.length?Math.round(t/1e4*100)/100:void 0},pidFilter:function(t){var e;if(t)if(2===t.length)e=t.substr(0,1)+"*";else if(2<t.length){for(var i="",a=0,o=t.length-2;a<o;a++)i+="*";e=i.substr(0,4)+t.substr(-8,4)}else e=t;return e},pidData:function(t){return t.type,t.pid+"（"+t.pid_name+"）"},copyImg:function(t){return"https://img.istyle.live/imgcdn/"+$.md5(t)+".jpg?src="+encodeURIComponent(t)}},methods:{copyImg:function(t){return"https://img.istyle.live/imgcdn/"+$.md5(t)+".jpg?src="+encodeURIComponent(t)},ajaxInfo:function(){var a=this;ajaxPost("/api/common/goods/view",{id:a.oCommon.id},function(t){if(0==t.code){a.oItemData.itemInfo=t.data.item,a.oItemData.sellerId=a.oItemData.itemInfo.goods.user_num_id,a.oItemData.itemId=a.oItemData.itemInfo.goods.num_iid;var e=a.oItemData.itemInfo.goods.p_list;if(e)for(var i=0;i<e.length;i++)a.oItemData.taobaoImage.push(e[i]);if(e&&a.oItemData.strWeixinArr.push(a.oItemData.taobaoImage[a.oItemData.taobaoImage.length-1]),e)for(i=0;i<e.length;i++)a.oItemData.strFriendsArr.push(e[i]);e&&a.oItemData.strPosterArr.push(a.oItemData.taobaoImage[0]),a.oItemData.itemInfo.videos&&(a.oItemData.videoImg=a.oItemData.itemInfo.videos.pic_url,a.oItemData.videoLink=a.oItemData.itemInfo.videos.url),a.oItemData.strShorttitle=a.oItemData.itemInfo.goods.d_title,a.oItemData.strShorttitle||(a.oItemData.strShorttitle=a.oItemData.itemInfo.goods.title),a.oItemData.strDesc=a.oItemData.itemInfo.goods.description,null==a.oItemData.strDesc&&(a.oItemData.strDesc=""),a.dataTime.endtime=a.oItemData.itemInfo.start_time,a.dataTime.itemType=a.oItemData.itemInfo.item_type,0<a.dataTime.itemType&&a.FunCountDown(),a.$nextTick(function(){a.oItemData.wholeShow=!0,a.ajaxComment(!0),a.ajaxhistory(),a.ajaxTodaySales()})}else layer.msg(t.message,{shade:.4,shadeClose:!0})},function(){})},ajaxhistory:function(){var i=this;ajaxPost("/api/common/goods/history",{num_iid:i.oItemData.itemId},function(t){t.data.content&&"1"==t.data.content.status&&(i.oHistory.salesRecord=t.data.content.sales_record,i.oItemData.taobaoImage=i.oItemData.taobaoImage.concat(t.data.content.more_copyimage),i.oHistory.shorttitleRecommend=t.data.content.itemshorttitle_recommend,i.oHistory.descRecommend=t.data.content.itemdesc_recommend,i.$nextTick(function(){i.oHistory.salesRecord.forEach(function(t,e){i.oEchartToday.historyprice.push(parseFloat(t.itemendprice)),i.oEchartToday.historytime.push(t.time.substring(5,t.time.length))}),i.oEchartToday.historyMinprice=Math.min.apply(Math,i.oEchartToday.historyprice)}))})},ajaxTodaySales:function(){var e=this;ajaxPost("/api/common/goods/get_today_sales",{num_iid:e.oItemData.itemId},function(t){"1"==t.data.content.status&&(t=t.data.content.data,e.oEchartToday.check_hour=t.check_hour,e.oEchartToday.saletime=t.saletime,e.oEchartToday.sale=t.sale)},function(){})},countDown:function(t){function e(t){return(t=t.toString())[1]?t:"0"+t}var i=this,a={},t=1e3*Number(t)-Number((new Date).getTime());0<=t?(a.d=Number(Math.floor(t/864e5)),i.dataTime.hours=Number(e(parseInt(t/1e3/3600%24)))+24*a.d,i.dataTime.Minutes=e(parseInt(t/1e3/60%60)),i.dataTime.Seconds=e(parseInt(t/1e3%60))):(i.dataTime.countBoll=!1,i.dataTime.hours="00",i.dataTime.Minutes="00",i.dataTime.Seconds="00",clearInterval(i.dataTime.oClearInterval))},FunCountDown:function(){var t=this;t.dataTime.oClearInterval=setInterval(function(){t.countDown(t.dataTime.endtime)},1e3)},ajaxVideo:function(){var e=this;ajaxPost("/api/common/goods/trill_video_list",{num_iid:e.oItemData.itemId,p:e.publicList.pageNumber},function(t){"1"==t.data.content.status&&(e.publicList.productList=t.data.content.data,e.publicList.count=t.data.content.count)})},adderImg:function(t){var e=$(t.target).attr("datatips");layer.tips(e,$(t.target),{skin:"popup-layer",time:0,tips:[2,"#ccc"]})},adderImg1:function(t){var e=$(t.target).attr("datatips");layer.tips(e,$(t.target),{skin:"popup-layer content-top-lookimg",time:0,tips:[1,"#fff"]})},copyBtn:function(t,e){var i=new ClipboardJS(t,{target:function(){return document.querySelector(e)}});i.on("success",function(t){layer.msg("复制成功！",{shade:.4,time:1500,shadeClose:!0}),t.clearSelection(),i.destroy()}),i.on("error",function(t){layer.msg("由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！",{icon:2})})},seeVideo:function(t){layer.open({type:1,title:"视频",shadeClose:!0,shade:.4,area:["560px",""],content:'<video class="comvideo" preload="auto" webkit-playsinline="true" playsinline="true" controls autoplay><source src='+t+' type="video/mp4"><source src='+t+' type="video/ogg"><source src='+t+' type="video/webm"></video>'})},seetcomment:function(){0<this.taobaoComment.taobaoCount?(this.ajaxRatelabel(),this.taobaoscroll()):layer.msg("没有评论哦",{shadeClose:!0,shade:.4})},ajaxComment:function(e){var i=this;ajaxPost("/api/common/goods/get_ratelist",{num_iid:i.oItemData.itemId,pageno:i.taobaoComment.taobaoPage,pagesize:10},function(t){layer.closeAll("loading"),"1"==t.data.content.status&&(i.taobaoComment.taobaoDataArr=i.taobaoComment.taobaoDataArr.concat(t.data.content.data),i.taobaoComment.taobaoCountSign=t.data.content.count,i.taobaoComment.taobaoPage<=parseInt(i.taobaoComment.taobaoCountSign/10)?(i.taobaoComment.taobaoPage+=1,i.taobaoComment.loadmsg=!0):i.taobaoComment.loadmsg=!1,i.$nextTick(function(){e&&(i.taobaoComment.taobaoCount=t.data.content.count)}))})},taobaoscroll:function(){var t,e,i=this,a=$(".popup-taobao-comment").height();$(".popup-taobao-comment").scroll(function(){t=$(this)[0].scrollHeight,e=$(this)[0].scrollTop,parseInt(e+a)+10>=t&&i.taobaoComment.loadmsg&&(i.taobaoComment.loadmsg=!1,i.ajaxComment())})},ajaxRatelabel:function(){var e=this,t="https://rate.tmall.com/listTagClouds.htm?itemId="+e.oItemData.itemId+"&isAll=true&isInner=true&t=1570446988539&groupId=&_ksTS=1570446988540_680";layer.load(2,{shade:.1}),ajaxGetJsonp(t,{},function(t){layer.closeAll("loading"),t.tags.tagClouds&&(e.taobaoComment.taobaoLabel=t.tags.tagClouds),e.publicPopup(".jspopup-taobao")},function(){e.publicPopup(".jspopup-taobao"),layer.closeAll("loading")})},ajaxGetVideo:function(){var s=this,t="https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?jsv=2.4.8&appKey=12574478&t=1554712612690&sign=59ff83eeadc620f65b072a198f4cf178&api=mtop.taobao.detail.getdetail&v=6.0&dataType=jsonp&ttid=2017%40taobao_h5_6.6.0&AntiCreep=true&type=jsonp&data=%7B%22itemNumId%22%3A%22"+s.oItemData.itemId+"%22%7D";layer.load(2,{shade:.1}),ajaxGetJsonp(t,{},function(e){layer.closeAll("loading");var t,i=[];if(e.data.apiStack){for(var a=e.data.apiStack,o=a.length;o--;){if(!(t=JSON.parse(a[o].value).item.videos))return layer.msg("没有商品视频哦!"),void(s.oItemData.videoHide=!1);for(var n=t.length;n--;)i.unshift(t[n])}if(i.length<=0)return layer.msg("没有商品视频哦!"),void(s.oItemData.videoHide=!1);s.$nextTick(function(){for(var t=0;t<i.length;t++)s.oItemData.videoLink=i[0].url,s.oItemData.videoImg=i[0].videoThumbnailURL})}else layer.alert("点击立即跳转到淘宝去拉动滑动条或登录才能获取到实拍视频哦",{icon:2,btn:"立即跳转"},function(t){pageAll(e.data.url),layer.close(t)})},function(){layer.closeAll("loading")})},loginFun:function(){var t=encodeURIComponent(encodeURIComponent(window.location.href)),e=this.oCommon.adminLoginlink+"?returnurl="+t;layer.alert("请先登录",{icon:2,btn:"立即登录"},function(t){window.location.href=e})},picBtn:function(){var t="/tools/spic?shopUrl=https://item.taobao.com/item.htm?id="+this.oItemData.itemId;pageAll(t)},tljBtn:function(){var t="/user/market/tlj?href=https://item.taobao.com/item.htm?id="+this.oItemData.itemId;pageAll(t)},wxBtn:function(){var t="/tools/wx?href=https://item.taobao.com/item.htm?id="+this.oItemData.itemId;pageAll(t)},shorttitleBtn:function(t){this.oItemData.strShorttitle=t,this.oHistory.shorttitleShow=!1},descRecommendBtn:function(t){this.oItemData.strDesc=t,this.oHistory.descRecommendShow=!1},choiceBtn:function(t,e,i){var a;1==t?0!=this.oItemData.strWeixinArr.length&&0<=(a=this.oItemData.strWeixinArr.indexOf(e))?this.oItemData.strWeixinArr.splice(a,1):this.oItemData.strWeixinArr.push(e):2==t?0!=this.oItemData.strFriendsArr.length&&0<=(a=this.oItemData.strFriendsArr.indexOf(e))?this.oItemData.strFriendsArr.splice(a,1):this.oItemData.strFriendsArr.push(e):3==t?(this.oItemData.strPosterArr=[],this.oItemData.strPosterArr.push(e)):0==t&&(this.oSetting.friend.qrcodeView=!this.oSetting.friend.qrcodeView)},filtersContent:function(t){var e=this,i=t.default;return 2==e.oSetting.templateType?i=t.brand:3==e.oSetting.templateType&&(i=t.custom),i=(i=(i=(i=(i=(i=(i=i.replace(/\{标题\}/g,e.oItemData.strShorttitle)).replace(/\{短标题\}/g,e.oItemData.strShorttitle)).replace(/\{在售价\}/g,parseFloat(e.oItemData.itemInfo.price.price))).replace(/\{券后价\}/g,"<span>"+parseFloat(e.oItemData.itemInfo.price.buy_price)+"</span>")).replace(/\{推荐语\}/g,e.oItemData.strDesc)).replace(/\{券额\}/g,"<span>"+parseFloat(e.oItemData.itemInfo.coupon.coupon_money)+"</span>")).replace(/\{图片\}/g,""),i=(i=(i=(i=(i=(i=(i=""!=t.token||""!=t.link?i.replace(/\{介绍\}/g,e.oItemData.strDesc):i.replace(/\{介绍\}/g,"文案")).replace(/\{淘口令\}/g,"<span>"+t.token+"</span>")).replace(/\{二合一\}/g,"<span>"+t.link+"</span>")).replace(/\{二合一长链接\}/g,"<span>"+t.url+"</span>")).replace(/\{二合一短链接\}/g,"<span>"+t.link+"</span>")).replace(/\{二合一淘点金短链接\}/g,"<span>"+t.link+"</span>")).replace(/\{二合一淘口令\}/g,"<span>"+t.token+"</span>")},reviseWxBtn:function(t){this.publicPopup(".jspopup-wxqq")},shutBtn:function(){this.publicClose(),this.wxqqnavReset()},wxqqnavReset:function(){this.oSetting.wxqqIndex=0,this.oSetting.comwxqqnav[0].bool=!0,this.oSetting.comwxqqnav[1].bool=!0},popupwxqqBtn:function(t){(0==t||1==t)&&""==URLPrefix.token?this.loginFun():this.oSetting.wxqqIndex=t},customizedAdd:function(t,e){("wx"==e?document.getElementById("textareaWx"):document.getElementById("textareaQq")).focus(),this.insertAtCaret("{"+t.name+"}")},insertAtCaret:function(t){var e,i;if(window.getSelection){if((e=window.getSelection()).getRangeAt&&e.rangeCount){(i=e.getRangeAt(0)).deleteContents();var a=document.createElement("div");a.innerHTML=t;for(var o,n,s=document.createDocumentFragment();o=a.firstChild;)n=s.appendChild(o);i.insertNode(s),n&&((i=i.cloneRange()).setStartAfter(n),i.collapse(!0),e.removeAllRanges(),e.addRange(i))}}else document.selection&&"Control"!=document.selection.type&&document.selection.createRange().pasteHTML(t)},templateDefault:function(t){"wx"==t?document.getElementById("textareaWx").innerHTML=this.oSetting.weixin.default:document.getElementById("textareaQq").innerHTML=this.oSetting.qq.default},saveTemplateBtn:function(e,t){var i=this,a="";""!=(a=("wx"==t?document.getElementById("textareaWx"):document.getElementById("textareaQq")).innerHTML)?(layer.load(2),ajaxPost("/api/user/info/template/updateItem",{share_set:e,set_content:a},function(t){layer.closeAll(),"1"==t.status?layer.msg(t.message,{shadeClose:!0,shade:.4},function(){i.publicClose(),i.wxqqnavReset()}):(layer.msg(t.message,{shadeClose:!0,shade:.4}),i.wxqqnavReset()),1==e?i.oSetting.weixin.custom=a:i.oSetting.qq.custom=a},function(){layer.closeAll(),layer.msg("网络错误",{shadeClose:!0,shade:.4}),i.wxqqnavReset()})):layer.msg("模板不能为空",{shadeClose:!0,shade:.4})},templateCelarBtn:function(t){"wx"==t?document.getElementById("textareaWx").innerHTML="":document.getElementById("textareaQq").innerHTML=""},setPidBtn:function(t,e){"wx"==e?(this.oSetting.weixin.pid=t.pid,this.oSetting.weixin.pidName=t.pid_name,this.oSetting.weixin.relation_id=t.relation_id,this.oSetting.weixin.id=t.id,this.oSetting.weixin.show=!1):(this.oSetting.qq.pid=t.pid,this.oSetting.qq.pidName=t.pid_name,this.oSetting.qq.relation_id=t.relation_id,this.oSetting.qq.id=t.id,this.oSetting.qq.show=!1),this.publicClose(),layer.msg("设置成功！",{shadeClose:!0,shade:.4,time:2e3})},taobaoTokenBtn:function(e,i,t){var a,o,n=this;if(""!=URLPrefix.token)if(n.oSetting.allPidNull){switch(e){case 0:a=n.oSetting.weixin.relation_id,o=n.oSetting.weixin.pid,n.oSetting.weixin.status=1;break;case 1:a=n.oSetting.qq.relation_id,o=n.oSetting.qq.pid,n.oSetting.qq.status=1;break;case 2:a=n.oSetting.weixin.relation_id,o=n.oSetting.weixin.pid,n.oSetting.weixin.status=1;break;case 3:case 4:a=n.oSetting.weixin.relation_id,o=n.oSetting.weixin.pid}3!=e&&4!=e||""==n.oSetting.weixin.qrcode?ajaxPost("/api/common/goods/transform",{type:e,activity_id:n.oItemData.itemInfo.coupon.activity_id,num_iid:n.oItemData.itemId,title:n.oItemData.itemInfo.goods.title,itempic:n.oItemData.itemInfo.goods.pic_url,relationid:a,pid:o},function(t){0==t.code?(1==e?(t.data.goods.click.tao_token&&(n.oSetting.qq.token=t.data.goods.click.tao_token),t.data.goods.click.short_url&&(n.oSetting.qq.link=t.data.goods.click.short_url),t.data.goods.click.url&&(n.oSetting.qq.url=t.data.goods.click.url)):(t.data.goods.click.tao_token&&(n.oSetting.weixin.token=t.data.goods.click.tao_token),t.data.goods.click.short_url&&(n.oSetting.weixin.link=t.data.goods.click.short_url),t.data.goods.click.url&&(n.oSetting.weixin.url=t.data.goods.click.url),t.data.goods.click.qrcode&&(n.oSetting.weixin.qrcode=t.data.goods.click.qrcode)),0==e?(n.oSetting.weixin.status=2,layer.msg("生成成功",{shade:.4,time:1e3},function(){document.querySelector(i).click()})):1==e?(n.oSetting.qq.status=2,layer.msg("生成成功",{shade:.4,time:1e3},function(){document.querySelector(i).click()})):2==e&&(n.oSetting.weixin.status=2),3==e?(n.oSetting.weixin.status=2,n.unitePic(".poster1",".copy_poster_hide1",function(t){n.oSetting.poster.picUrl1=t.img})):4==e&&(n.oSetting.weixin.status=2,n.unitePic(".poster2",".copy_poster_hide2",function(t){n.oSetting.poster.picUrl2=t.img}))):layer.msg(t.message,{shadeClose:!0,shade:.2})},function(){layer.msg("网络错误，请重新检查网络！",{shadeClose:!0,shade:.4})}):3==e?n.unitePic(".poster1",".copy_poster_hide1",function(t){n.oSetting.poster.picUrl1=t.img}):4==e&&n.unitePic(".poster2",".copy_poster_hide2",function(t){n.oSetting.poster.picUrl2=t.img})}else n.PidFun();else n.loginFun()},PidFun:function(){var e=this;layer.alert("未设置pid,请前往个人中心设置pid!",{icon:2,btn:"立即前往"},function(t){pageAll(e.oCommon.adminPidlink),layer.close(t)})},friendsBtn:function(t){this.oItemData.friendsIndex+=t},seeImg:function(t){layer.open({type:1,title:!1,closeBtn:0,area:"300px",shadeClose:!0,content:'<div><img class="viewPic" src="'+t+'"></div>'})},videoPlayBtn:function(t){var e=this;e.oVideo.videooIndex=t,setTimeout(function(){var t=e.$refs.myVideo[0];null!=t&&(null==t.error?(t.play(),e.$refs.myVideo[0].addEventListener("waiting",function(){e.oVideo.videooneIcon?e.oVideo.videosetClear=setTimeout(function(){e.oVideo.videooneIcon=!1,e.oVideo.loadIcon=!0},100):e.oVideo.loadIcon=!0}),e.$refs.myVideo[0].addEventListener("playing",function(){e.oVideo.loadIcon=!1})):e.oVideo.playBool=!1,t.addEventListener("play",function(){e.videoEnd(),e.oVideo.playBool=!0}))},100)},videostopBtn:function(){var t=this;this.$refs.myVideo[0].pause(),this.$refs.myVideo[0].addEventListener("pause",function(){t.oVideo.playBool=!1,t.oVideo.loadIcon=!1})},videoEnd:function(){var t=this;t.$refs.myVideo[0].addEventListener("ended",function(){t.$refs.myVideo[0].pause(),t.oVideo.playBool=!1})},videoExtendBtn:function(){this.oDyvideo.videoExtend=!1},videomoveinIcon:function(t,e){layer.tips(t,$(e.target),{time:0,tips:[1,"#553cf7"]})},setNav:function(t){this.oSetting.navId=t},setTemplateType:function(t){this.oSetting.templateType=t},unitePic:function(t,i,a){html2canvas(document.querySelector(t),{allowTaint:!1,useCORS:!0,logging:!0}).then(function(t){var e=t.toDataURL("image/png",1),t=new Image;t.src=e,document.querySelector(i).append(t),a({img:e})})},downImgMake:function(t){this.downloadIamge(t,Math.round(1e3*Math.random()))},downloadIamge:function(t,a){var o=new Image;o.setAttribute("crossOrigin","anonymous"),o.onload=function(){(t=document.createElement("canvas")).width=o.width,t.height=o.height,t.getContext("2d").drawImage(o,0,0,o.width,o.height);var t=t.toDataURL("image/png"),e=document.createElement("a"),i=new MouseEvent("click");e.download=a||"图片",e.href=t,e.dispatchEvent(i)},o.src=t}}});$(function(){$(".go-btn").on("click",function(){window.open(URLPrefix.item_buy)})});