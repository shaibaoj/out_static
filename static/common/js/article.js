function parseParams(t){try{var e,n=[];for(e in t){var i=encodeURIComponent(e),r=encodeURIComponent(t[e]);n.push(i+"="+r)}return n.join("&")}catch(t){return""}}function getUrlSearch(t,e){e=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),e=t.slice(t.indexOf("?")+1).match(e);if(null!=e)try{return decodeURIComponent(e[2])}catch(t){return null}return null}var vmTestInput={isPhoneNo:function(t){return"/^1[3456789]d{9}$/".test(t)},isNumber:function(t){return"/^[0-9]*$/".test(t)},isQQ:function(t){return"/^[1-9][0-9]{4,14}/".test(t)}},page=function(t,e){e=e||"",setTimeout(function(){window.location.href=t+".html"+e},50)},pageAll=function(t){setTimeout(function(){window.open(t)},50)};function Request(t){if(-1!=(e=location.href).indexOf(t)){var e,n=e.indexOf(t);return e=e.substring(n+t.length+1)}}var config={_url:"",urls:"/",isHTTP:function(){var t=window.location.protocol;return t.substring(0,t.length-1)},getUrl:function(t){var e=new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]","ig"),e=t.match(e);return null!=e?e:null},getVideoUrl:function(t){var e=new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]+.mp4","ig"),e=t.match(e);return null!=e?e:null},ImgSizeFun:function(t,e){for(var n=0;n<e.length;n++)t[n]=e[n]+config.ImgSize;return t}},ajaxGet=function(t,e,n,i){i=i||function(t,e){};$.ajax({type:"GET",url:0===t.indexOf("http")?t:URLPrefix.api_url+t,data:Object.assign(e,{hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token}),dataType:"json",timeout:3e4,success:n,error:i,xhrFields:{withCredentials:!0}})},ajaxPost=function(t,e,n,i){i=i||function(t,e){};$.ajax({type:"POST",url:0===t.indexOf("http")?t:URLPrefix.api_url+t,data:Object.assign(e,{hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token}),dataType:"json",timeout:3e4,success:n,error:i,xhrFields:{withCredentials:!0}})},ajaxGetJsonp=function(t,e,n,i){i=i||function(t,e){};$.ajax({type:"GET",url:t,data:e,dataType:"jsonp",timeout:3e4,success:n,error:i,xhrFields:{withCredentials:!0}})};window.mobileUtil=function(){var t=navigator.userAgent,e=/android|adr|linux/gi.test(t),n=/iphone|ipod|ipad/gi.test(t)&&!e,i=/BlackBerry/i.test(t),r=/IEMobile/i.test(t),o=/WeiBo/gi.test(t),i=e||n||i||r,r=/Alipay/gi.test(t);return{isAndroid:e,isIOS:n,isMobile:i,isWeixin:/MicroMessenger/gi.test(t),isQQ:/ QQ/gi.test(t),isPC:!i,isWeiBo:o,isAlipay:r}}((window,document));const shareCommp=()=>{location.href,location.origin,site,title,description,image},app=createApp({}).mount("#share");$(function(){});