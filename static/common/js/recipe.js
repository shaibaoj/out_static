Vue.use(VueStorage,{namespace:"pro__",name:"ls",storage:"local"});var URLPrefix=URLPrefix||{};function parseParams(e){try{var t,n=[];for(t in e){var i=encodeURIComponent(t),r=encodeURIComponent(e[t]);n.push(i+"="+r)}return n.join("&")}catch(e){return""}}function getUrlSearch(e,t){t=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),t=e.slice(e.indexOf("?")+1).match(t);if(null!=t)try{return decodeURIComponent(t[2])}catch(e){return null}return null}URLPrefix.token=Vue.ls.get("member_token");var vmTestInput={isPhoneNo:function(e){return"/^1[3456789]d{9}$/".test(e)},isNumber:function(e){return"/^[0-9]*$/".test(e)},isQQ:function(e){return"/^[1-9][0-9]{4,14}/".test(e)}},page=function(e,t){t=t||"",setTimeout(function(){window.location.href=e+".html"+t},50)},pageAll=function(e){setTimeout(function(){window.open(e)},50)};function Request(e){if(-1!=(t=location.href).indexOf(e)){var t,n=t.indexOf(e);return t=t.substring(n+e.length+1)}}var config={_url:"",urls:"/",isHTTP:function(){var e=window.location.protocol;return e.substring(0,e.length-1)},getUrl:function(e){var t=new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]","ig"),t=e.match(t);return null!=t?t:null},getVideoUrl:function(e){var t=new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]+.mp4","ig"),t=e.match(t);return null!=t?t:null},ImgSizeFun:function(e,t){for(var n=0;n<t.length;n++)e[n]=t[n]+config.ImgSize;return e}},ajaxGet=function(e,t,n,i){i=i||function(e,t){};$.ajax({type:"GET",url:0===e.indexOf("http")?e:URLPrefix.api_url+e,data:Object.assign(t,{hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token}),dataType:"json",timeout:3e4,success:n,error:i,xhrFields:{withCredentials:!0}})},ajaxPost=function(e,t,n,i){i=i||function(e,t){};$.ajax({type:"POST",url:0===e.indexOf("http")?e:URLPrefix.api_url+e,data:Object.assign(t,{hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token}),dataType:"json",timeout:3e4,success:n,error:i,xhrFields:{withCredentials:!0}})},ajaxGetJsonp=function(e,t,n,i){$.ajax({type:"GET",url:e,data:t,dataType:"jsonp",timeout:3e4,success:n,error:i?i:function(e,t){},xhrFields:{withCredentials:!0}})};window.mobileUtil=function(){var e=navigator.userAgent,t=/android|adr|linux/gi.test(e),n=/iphone|ipod|ipad/gi.test(e)&&!t,i=/BlackBerry/i.test(e),r=/IEMobile/i.test(e),o=/WeiBo/gi.test(e),i=t||n||i||r,r=/Alipay/gi.test(e);return{isAndroid:t,isIOS:n,isMobile:i,isWeixin:/MicroMessenger/gi.test(e),isQQ:/ QQ/gi.test(e),isPC:!i,isWeiBo:o,isAlipay:r}}((window,document));