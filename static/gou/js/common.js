function parseParams(e){try{var t,i=[];for(t in e){var n=encodeURIComponent(t),o=encodeURIComponent(e[t]);i.push(n+"="+o)}return i.join("&")}catch(e){return""}}function getUrlSearch(e,t){t=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),t=e.slice(e.indexOf("?")+1).match(t);if(null!=t)try{return decodeURIComponent(t[2])}catch(e){return null}return null}!function(i,n){var o;function t(){var e=n.clientWidth/o*100;a(e);var t=parseFloat(i.getComputedStyle(n)["font-size"]);.1<Math.abs(t-e)&&a(e*e/t)}function a(e){n.style.fontSize=e+"px"}i.calcRem=function(e){o=e,t(),i.addEventListener("resize",t)}}(window,document.documentElement),window.Echo=function(n,o){"use strict";function e(){for(var e=l.length;e--;){var t=l[e];!function(e){e=e.getBoundingClientRect();return(0<=e.top&&0<=e.left&&e.top)<=(n.innerHeight||o.documentElement.clientHeight)+parseInt(s)}(t)||(t.src=t.getAttribute("data-echo"),l.splice(e,1))}}function a(){clearTimeout(t),t=setTimeout(e,r)}var s,r,t,l=[];return{init:function(e){var t=o.querySelectorAll("[data-echo]"),e=e||{};s=e.offset||0,r=e.throttle||250;for(const i of t)l.push(i);a(),o.addEventListener?n.addEventListener("scroll",a,!1):n.attachEvent("onscroll",a)},render:a}}(window,document),function(i){"function"!=typeof define||!define.amd&&!define.cmd||jQuery?"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),i(t),t}:i(jQuery):define(["jquery"],i)}(function(o){function n(e,t){var a,s=t,i=o(document),r=o(e);this.setPageCount=function(e){return s.pageCount=e},this.getPageCount=function(){return s.totalData||s.showData?Math.ceil(parseInt(s.totalData)/s.showData):s.pageCount},this.getCurrent=function(){return a},this.filling=function(e){var t="";a=e||s.current;var i=this.getPageCount();s.keepShowPN||1<a?t+='<a href="javascript:;" class="'+s.prevCls+'">'+s.prevContent+"</a>":0==s.keepShowPN&&r.find("."+s.prevCls)&&r.find("."+s.prevCls).remove(),a>=s.count+2&&1!=a&&i!=s.count&&(e=s.coping&&s.homePage?s.homePage:"1",t+=s.coping?'<a href="javascript:;" data-page="1">'+e+"</a><span>...</span>":"");var n=a+s.count,o="";for((1<(o=a===i?a-s.count-2:a-s.count)&&a<s.count||1==a)&&n++,a>i-s.count&&i<=a&&o++;o<=n;o++)o<=i&&1<=o&&(t+=o!=a?'<a href="javascript:;" data-page="'+o+'">'+o+"</a>":'<span class="'+s.activeCls+'">'+o+"</span>");a+s.count<i&&1<=a&&i>s.count&&(n=s.coping&&s.endPage?s.endPage:i,t+=s.coping?'<span>...</span><a href="javascript:;" data-page="'+i+'">'+n+"</a>":""),s.keepShowPN||a<i?t+='<a href="javascript:;" class="'+s.nextCls+'">'+s.nextContent+"</a>":0==s.keepShowPN&&r.find("."+s.nextCls)&&r.find("."+s.nextCls).remove(),t+=s.jump?'<input type="text" class="'+s.jumpIptCls+'"><a href="javascript:;" class="'+s.jumpBtnCls+'">'+s.jumpBtn+"</a>":"",r.empty().html(t)},this.eventBind=function(){var t=this,n=t.getPageCount(),e=1;r.off().on("click","a",function(){if(o(this).hasClass(s.nextCls)){if(r.find("."+s.activeCls).text()>=n)return o(this).addClass("disabled"),!1;e=parseInt(r.find("."+s.activeCls).text())+1}else if(o(this).hasClass(s.prevCls)){if(r.find("."+s.activeCls).text()<=1)return o(this).addClass("disabled"),!1;e=parseInt(r.find("."+s.activeCls).text())-1}else if(o(this).hasClass(s.jumpBtnCls)){if(""===r.find("."+s.jumpIptCls).val())return;e=parseInt(r.find("."+s.jumpIptCls).val())}else e=parseInt(o(this).data("page"));t.filling(e),"function"==typeof s.callback&&s.callback(t)}),r.on("input propertychange","."+s.jumpIptCls,function(){var e=o(this),t=e.val(),i=/[^\d]/g;i.test(t)&&e.val(t.replace(i,"")),parseInt(t)>n&&e.val(n),0===parseInt(t)&&e.val(1)}),i.keydown(function(e){13==e.keyCode&&r.find("."+s.jumpIptCls).val()&&(e=parseInt(r.find("."+s.jumpIptCls).val()),t.filling(e),"function"==typeof s.callback&&s.callback(t))})},this.init=function(){this.filling(s.current),this.eventBind(),(s.isHide&&"1"==this.getPageCount()||"0"==this.getPageCount())&&r.hide()},this.init()}var a={totalData:0,showData:0,pageCount:9,current:1,prevCls:"prev",nextCls:"next",prevContent:"<",nextContent:">",activeCls:"active",coping:!1,isHide:!1,homePage:"",endPage:"",keepShowPN:!1,count:3,jump:!1,jumpIptCls:"jump-ipt",jumpBtnCls:"jump-btn",jumpBtn:"跳转",callback:function(){}};o.fn.pagination=function(e,t){"function"==typeof e?(t=e,e={}):(e=e||{},t=t||function(){});var i=o.extend({},a,e);return this.each(function(){var e=new n(this,i);t(e)})}}),Vue.use(VueStorage,{namespace:"pro__",name:"ls",storage:"local"}),URLPrefix.token=Vue.ls.get("member_token");var vmTestInput={isPhoneNo:function(e){return"/^1[3456789]d{9}$/".test(e)},isNumber:function(e){return"/^[0-9]*$/".test(e)},isQQ:function(e){return"/^[1-9][0-9]{4,14}/".test(e)}},page=function(e,t){t=t||"",setTimeout(function(){window.location.href=e+".html"+t},50)},pageAll=function(e){setTimeout(function(){window.open(e)},50)};function Request(e){if(-1!=(t=location.href).indexOf(e)){var t,i=t.indexOf(e);return t=t.substring(i+e.length+1)}}var config={_url:"",urls:"/",isHTTP:function(){var e=window.location.protocol;return e.substring(0,e.length-1)},getUrl:function(e){var t=new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]","ig"),t=e.match(t);return null!=t?t:null},getVideoUrl:function(e){var t=new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]+.mp4","ig"),t=e.match(t);return null!=t?t:null},ImgSizeFun:function(e,t){for(var i=0;i<t.length;i++)e[i]=t[i]+config.ImgSize;return e}},ajaxGet=function(e,t,i,n){n=n||function(e,t){};$.ajax({type:"GET",url:0===e.indexOf("http")?e:URLPrefix.api_url+e,data:Object.assign(t,{hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token}),dataType:"json",timeout:3e4,success:i,error:n,xhrFields:{withCredentials:!0}})},ajaxPost=function(e,t,i,n){n=n||function(e,t){};$.ajax({type:"POST",url:0===e.indexOf("http")?e:URLPrefix.api_url+e,data:Object.assign(t,{hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token}),dataType:"json",timeout:3e4,success:i,error:n,xhrFields:{withCredentials:!0}})},ajaxGetJsonp=function(e,t,i,n){$.ajax({type:"GET",url:e,data:t,dataType:"jsonp",timeout:3e4,success:i,error:n?n:function(e,t){},xhrFields:{withCredentials:!0}})};function CurrentUser(){var i={};this.set=function(e,t){i[e]=t},this.get=function(e){return i[e]},this.is_login=function(){return!!i.is_login}}function Urls(){var i={};this.set=function(e,t){i[e]=t},this.get=function(e){return i[e]}}function AjaxUrls(){var n={};this.set=function(e,t){var i=(new Date).getTime();0<=t.indexOf("?")?t+="&_="+i:t+="?_="+i,n[e]=t},this.get=function(e){return n[e]}}function Config(){this.urls=new Urls,this.ajax_urls=new AjaxUrls}window.mobileUtil=function(){var e=navigator.userAgent,t=/android|adr|linux/gi.test(e),i=/iphone|ipod|ipad/gi.test(e)&&!t,n=/BlackBerry/i.test(e),o=/IEMobile/i.test(e),a=/WeiBo/gi.test(e),n=t||i||n||o,o=/Alipay/gi.test(e);return{isAndroid:t,isIOS:i,isMobile:n,isWeixin:/MicroMessenger/gi.test(e),isQQ:/ QQ/gi.test(e),isPC:!n,isWeiBo:a,isAlipay:o}}((window,document)),$(function(){}),$(function(){String.prototype.replaceAll=function(e,t){return this.replace(new RegExp(e,"gm"),t)},String.prototype.format=function(e){var t=this;if(arguments.length<1)return t;var i,n=1==arguments.length&&"object"==typeof e?e:arguments;for(i in n){var o=n[i];null!=o&&(t=t.replaceAll("\\{"+i+"\\}",o))}return t}}),0<$("#kw").length&&($(document).on("click","#js-eb-search-btn",function(){return""!=$.trim($("#kw").val())&&(console.log($("form",$("#J_searchbox"))[0]),$("form",$("#J_searchbox"))[0].submit()),!1}),$(document).on("keydown","#kw",function(e){13==e.code&&""!=$.trim($("#kw").val())&&$("#js-eb-search-btn")[0].click()}),$(document).on("click",".search-tabs li",function(){var e=$(this).attr("data-s"),t=$(this).clone();1==e?$(this).parent().parent().find("#mod").val("index"):2==e?$(this).parent().parent().find("#mod").val("queqiao"):3==e&&$(this).parent().parent().find("#mod").val("promo"),$("#kw").attr("placeholder",$(this).attr("data-p")),$(t).addClass("current"),$(".search-tabs li").removeClass("current"),$(this).remove(),$(".search-tabs").prepend(t)}),$(".search-tabs").hover(function(){$(this).find("li").not(".current").show()},function(){$(this).find("li").not(".current").hide()}),$("#del").bind("click",function(){$("#kw").val("")[0].focus(),$("#filterForm")[0].submit()})),function(a){window.HPT={init:function(){},pid_list:function(){a.getJSON(URLPrefix.api_url+g_config.ajax_urls.get("user_ajax"),{entity:"pid",hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token},function(e){a("#promotion-box>.chooses").html("");var i="",n="",o="";e.items&&(a.each(e.items,function(e,t){n=null!=t.user_pid_id?t.user_pid_id:"",o=null!=t.pid?t.pid:"",i=i+'<div promotion-media-id="'+(null!=t.user_pid_id?t.user_pid_id:"")+'" pid="'+(null!=t.pid?t.pid:"")+'" class="promotion-media-choose">'+(null!=t.pid_name?t.pid_name:"")+"</div>"}),i+="<div style='clear:both'></div>"),a("#promotion-box>.chooses").html(i),""!=i&&(a("#promotion-box").show(),HPT.pid_set(n,o,""))})},pid_set:function(e,t,i){a.getJSON(URLPrefix.api_url+g_config.ajax_urls.get("user_ajax"),{entity:"pid_default",qz:i,id:e,pid:t,hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token},function(e){var t=e.items.id,e=e.items.pid;void 0===t||""==t||void 0===e||""==e||(t=a("div[promotion-media-id="+t+"]",a("#promotion-box")))&&0<t.length&&(a(".promotion-media-choose").removeClass("active"),t.addClass("active"),a(".pid-text").attr("pid",e).text(t.text()),current_user.set("current_pid",e))})},qunfa:function(e){a.post(URLPrefix.api_url+"/api/user/tools/zhushou/qunfa",{num_iid:e,hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token},function(e){0==e.code?layer.msg(e.message,{icon:1,time:1e3},function(){}):layer.msg(e.message,{icon:2,time:1e3},function(){})})},agent_list:function(){a.getJSON(URLPrefix.api_url+g_config.ajax_urls.get("user_ajax"),{entity:"agent",hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token},function(e){a("#promotion-box>.chooses").html("");var i="";void 0!==e&&void 0!==e.result&&(e=e.info);var n="",o="";e.items&&(a.each(e.items,function(e,t){n=null!=t.member_id?t.member_id:"",o=null!=t.user_id?t.user_id:"",i=i+'<div aid="'+(null!=t.member_id?t.member_id:"")+'" uid="'+(null!=t.user_id?t.user_id:"")+'" pid="'+(null!=t.app_id?t.app_id:"")+'" class="promotion-media-choose">'+(null!=t.agent.user_name?t.agent.user_name:"")+"</div>"}),i+="<div style='clear:both'></div>"),a("#promotion-box>.chooses").html(i),""!=i&&(a("#promotion-box").show(),HPT.agent_set(n,o,""))})},agent_set:function(e,t,i){a.getJSON(URLPrefix.api_url+g_config.ajax_urls.get("user_ajax"),{entity:"agent_default",qz:i,aid:e,uid:t,hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token},function(e){var t=(e=void 0!==e&&void 0!==e.result?e.info:e).items.aid,e=e.items.uid;void 0!==t&&""!=t&&void 0!==e&&""!=e&&(e=a("div[aid="+t+"]",a("#promotion-box")),a(".promotion-media-choose").removeClass("active"),e.addClass("active"),a(".pid-text").attr("aid",t).text(e.text()),current_user.set("current_agent_aid",t))})},qunfa_product:function(e){a.getJSON(URLPrefix.api_url+g_config.ajax_urls.get("user_info"),{action:"user",mod:"qunfa_product",id:e,hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token},function(e){1==e.code?layer.msg(e.message,{icon:1,time:1e3},function(){}):layer.msg(e.message,{icon:2,time:1e3},function(){})})}},window.HPT.init()}(jQuery),$(function(){$(".copytext-btn",$(".goods-list")).on("click",function(e){let t=$(this);var i=new ClipboardJS(".copytext-btn",{target:function(e){return t.closest(".goods").find(".media-text-area")[0]}});i.on("success",function(e){e.clearSelection(),i.destroy(),layer.msg("复制成功",{time:2e3})}),i.on("error",function(e){console.log(e)})}),$(document).on("mouseenter",".copytext-btn",function(e){var t=$(this).data("goods-id"),i=$(this).closest(".goods").find(".media-list-box"),n=i.children(".media-text-area"),o=$.trim(n.html());$(window).width()-$(this).offset().left-120<340&&(i.css({left:-186}),i.children("b").css({left:304,borderLeftColor:"#212121",borderLeftWidth:9,borderRightColor:"transparent",borderRightWidth:5})),o&&i.show(),o||$.post(URLPrefix.api_url+"/api/common/goods/viewComment",{num_iid:t,hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token},function(e){e.data.content&&(n.html(e.data.content),i.show())})}),$(document).on("mouseleave",".copytext-btn",function(){$(this).closest(".goods").find(".media-list-box").hide()}),$(document).on("mouseenter",".goods",function(){$(this).find(".media-list-box").hide()}),$(".goods",$(".goods-views")).each(function(){let e=$(this);var t=JSON.parse(e.attr("data-item"));$(".goodsimg-link",e).wrap('<a rel="nofollow" target="_blank" href="'+t.link+'"></a>'),$(".buy-btn",e).wrap('<a rel="nofollow" target="_blank" href="'+t.url_buy+'"></a>')}),$("img.lazy").each(function(){let e=$(this);e.attr("data-original",e.attr("src")),e.attr("src",URLPrefix.static_url+"/static/web/images/web/common/loading.png")}),$("img.lazy").lazyload({effect:"fadeIn"})});var vmUserMenu=new Vue({el:"#vmUserMenu",data:{queryInit:!1,user:{user_name:""}},mounted:function(){this.init()},methods:{init:function(){this.query()},query:function(){var t=this;ajaxPost("/api/user/home/user",{},function(e){e.data&&e.data.user&&e.data.user.user_id&&(t.user=e.data.user),t.queryInit=!0})},logout:function(){Vue.ls.remove("member_token"),window.location.href="/"}}}),vmminxShopData={data:{oPublic:{reportImg:"",loadingImg:URLPrefix.static_url+"/static/platform/images/web/common/loading.png",loadingShow:!1,wholeShow:!1,setTimeoutClear:"",setTime:300,isDatanull:!1,offsetTop:""},publicList:{productList:"",pageNumber:1,pageInput:1,count:""},oHidePopup:{hideOnLineLin:!1,hideEchartCheck:!1},oToken:{token:"",tokenTime:"",tokenBoolean:!1}},created:function(){},mounted:function(){},filters:{numText:function(e){return e<1e4?e:1e4<=e?Math.round(e/1e4*100)/100+"万":void 0},conversion:function(e){if(e)return e.length<=4?e:5<=e.length?Math.round(e/1e4*100)/100+"万":void 0}},watch:{"publicList.pageInput":function(e){e>this.publicList.count&&(this.publicList.pageInput=this.publicList.count),e<1&&""!=e&&(this.publicList.pageInput=1)}},methods:{producLink:function(e){pageAll("https://detail.tmall.com/item.htm?id="+e)},ajaxGetToken:function(){var t=this;t.oToken.tokenBoolean||ajaxPost("/indexapi/get_qiniu_token",{},function(e){"200"==e.status?(t.oToken.token=e.qiniu_token,t.oToken.tokenBoolean=!0,clearTimeout(t.oToken.tokenTime),t.setIntervalFun()):(clearTimeout(t.oToken.tokenTime),t.oToken.tokenBoolean=!1,t.oToken.token="")},function(){clearTimeout(t.oToken.tokenTime),t.oToken.tokenBoolean=!1})},setIntervalFun:function(){var e=this;this.oToken.tokenTime=setInterval(function(){e.oToken.tokenBoolean=!1},3e5)},widthFun:function(e){return 0!=e.down_type?"width:0%":"width:"+Math.round(e.couponreceive/e.couponnum*100)+"%"},pageSkipp:function(e){pageAll("/quan/"+e)},moveinIcon:function(e,t){layer.tips(e,$(t.target),{time:0,tips:[2,"#4d77ff"]})},ComremoveLayerTips:function(){var e=layer.tips();layer.close(e)},inCopywriting:function(e){var t=$(e.target).attr("datatips");layer.tips(t,$(e.target),{time:0,tips:[2,"#5cadff"],area:"440px"})},copywritingBtn:function(){var t=new ClipboardJS(".public-copy",{target:function(){return document.querySelector(".layui-layer-content")}});t.on("success",function(e){layer.msg("已复制",{time:1500}),e.clearSelection(),t.destroy()}),t.on("error",function(e){layer.msg("由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！",{icon:2})})},arrowTopFun:function(){$("body,html").stop(!0,!0).animate({scrollTop:0})},echartCheckFunBtn:function(e){this.oHidePopup.hideEchartCheck=!0,this.publicPopup(".js-popupEcharts"),echartCheckFun(e)},echartCheckShut:function(){this.oHidePopup.hideEchartCheck=!1,this.publicClose()},onLineLinBtn:function(e){this.oHidePopup.hideOnLineLin=!0,this.publicPopup(".js-popupOnLineLin"),onLineLinFun(e)},onLineLinShut:function(){this.oHidePopup.hideOnLineLin=!1,this.publicClose()},echoImg:function(){Echo.init({offset:0,throttle:0})},publicPopup:function(e){layer.open({type:1,shift:0,title:!1,closeBtn:1,shade:.4,content:$(e)})},publicClose:function(){layer.closeAll()},publicPopupCustom:function(e,t,i){layer.open({type:2,area:[t+"px",i+"px"],shift:0,title:!1,closeBtn:1,shade:.4,content:$(e)})}}};Vue.component("component-video",{data:function(){return{oHidePopup:{hideVideo:!1},oVideo:{mp4link:"",swfLlink:"",videoTab:0}}},methods:{playVideoBtn:function(e){this.oVideo.mp4link="http://cloud.video.taobao.com/play/u/1/p/1/e/6/t/1/"+e+".mp4",this.oVideo.swfLlink="//cloud.video.taobao.com/play/u/2599950707/p/1/e/1/t/1/"+e+".swf",this.oHidePopup.hideVideo=!0,layer.open({type:1,shift:0,title:!1,closeBtn:0,shade:.4,content:$(".js-popupVideo")})},videoTabBtn:function(e){this.oVideo.videoTab=e},playVideoShut:function(){this.oVideo.videoTab=0,this.oVideo.mp4link="",this.oVideo.swfLlink="",this.oHidePopup.hideVideo=!1,layer.closeAll()}},template:'<div class="video-modal-dialog comPopupHide js-popupVideo"><div v-if="oHidePopup.hideVideo"><div class="video-modal-hd"><span>查看视频</span><i class="iconfont icon-close" @click="playVideoShut()"></i></div><div class="video-modal-bd"><div class="video-show"><video class="video-box" autoplay="autoplay" :src="oVideo.mp4link" controls="controls" v-if="oVideo.videoTab == 0"></video><object class="video-box" type="application/x-shockwave-flash" :data="oVideo.swfLlink"  v-if="oVideo.videoTab == 1"></object></div></div><div class="video-modal-footer"><span>下载视频请右键点击“视频另存为(V)...”</span><div class="video-btns"><span class="video_source" :class="[oVideo.videoTab == 0?\'video-active\':\'\']" @click="videoTabBtn(0)">视频源1</span><span class="video_source" :class="[oVideo.videoTab == 1?\'video-active\':\'\']" @click="videoTabBtn(1)">视频源2</span></div></div></div></div> '}),Vue.component("component-loading",{props:["vmpublicc"],data:function(){return{}},methods:{},template:'<div class="loadingBox" v-if="vmpublicc"><div class="loading overall-loading"><div class="outer"></div><div class="inner"></div><div class="loading-text">数据加载中，请稍后...</div></div></div>'}),Vue.component("component-datanull",{props:["vmdatanull","vmmsg","vmrescreen","vmnullimg"],data:function(){return{nullImg0:"//static.cdn.youdanhui.net/tatic/platform/images/web/detail/Index-null.png"}},methods:{resBtn:function(){this.$emit("vmresbtn")}},template:'<div class="inNull animatedFade animatedNaneBottom" v-if="vmdatanull"><img :src="nullImg0" class=" comUser-select" v-if="vmnullimg ==undefined"><p>{{vmmsg ==undefined?"抱歉，暂时没有筛选到合适商品":vmmsg}}</p><span v-if="vmmsg ==undefined">我们会努力寻找更多的商品哦~</span><em @click="resBtn" v-if="vmrescreen">重新筛选</em></div>'}),Vue.component("vmPic",{props:["goodsid"],data:function(){return{loadmsg:!0,cacheId:"",realPicoPage:{pageNumber:1,pageImgAll:[]}}},mounted:function(){var e,t,i=this,n=$(".realpic-box").height();$(".realpic-box").scroll(function(){e=$(this)[0].scrollHeight,t=$(this)[0].scrollTop,e<=t+n&&i.loadmsg&&i.ajaxIrealpic()})},methods:{ajaxIrealpic:function(t){var i=this;if(t){if(i.cacheId==i.goodsid&&""!=i.realPicoPage.pageImgAll)return void i.CallbackRealpic();i.realPicoPage={pageNumber:1,pageImgAll:[]},i.loadmsg=!0,layer.load(2,{shade:.1}),i.cacheId=i.goodsid}else i.realPicoPage.pageNumber+=1;ajaxPost("/api/common/goods/get_evaluate_imageurl",{num_iid:i.goodsid,page:i.realPicoPage.pageNumber},function(e){if(layer.closeAll("loading"),"200"==e.code){if(0==e.evaluate_imageurl)return i.loadmsg=!1,void(t&&layer.msg("没有实拍图哦",{time:1500,shade:.1,shadeClose:!0}));i.realPicoPage.pageImgAll=i.realPicoPage.pageImgAll.concat(e.evaluate_imageurl),i.realPicoPage.pageImgAll.length<6&&i.ajaxIrealpic(),i.$nextTick(function(){t&&i.CallbackRealpic()})}else"-1"==e.code?layer.msg("请先登录",{time:1500,shade:.1,shadeClose:!0}):layer.msg(e.msg,{icon:2,shade:.1,shadeClose:!0})})},CallbackRealpic:function(){layer.open({type:1,shift:0,title:"获取实拍图",closeBtn:2,shade:.4,area:["850px","720px"],content:$(".js-realPic")})}},template:'<div class="realPic js-realPic"><div class="realpic-box"><ul class="realPic-list clearfix"><li v-for="(item,index) in realPicoPage.pageImgAll"><img :src="item"></li></ul><p class="realpic-loading" v-if="loadmsg"> <i class="iconfont hdk-jiazai vmIconLoad"></i><em>数据加载中...</em></p><p class="realpic-loading" v-else>数据已经加载完了</p></div></div>'});