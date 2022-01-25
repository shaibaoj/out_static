function parseParams(e){try{var t,n=[];for(t in e){var i=encodeURIComponent(t),o=encodeURIComponent(e[t]);n.push(i+"="+o)}return n.join("&")}catch(e){return""}}function getUrlSearch(e,t){t=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),t=e.slice(e.indexOf("?")+1).match(t);if(null!=t)try{return decodeURIComponent(t[2])}catch(e){return null}return null}var vmTestInput={isPhoneNo:function(e){return"/^1[3456789]d{9}$/".test(e)},isNumber:function(e){return"/^[0-9]*$/".test(e)},isQQ:function(e){return"/^[1-9][0-9]{4,14}/".test(e)}},page=function(e,t){t=t||"",setTimeout(function(){window.location.href=e+".html"+t},50)},pageAll=function(e){setTimeout(function(){window.open(e)},50)};function Request(e){if(-1!=(t=location.href).indexOf(e)){var t,n=t.indexOf(e);return t=t.substring(n+e.length+1)}}var config={_url:"",urls:"/",isHTTP:function(){var e=window.location.protocol;return e.substring(0,e.length-1)},getUrl:function(e){var t=new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]","ig"),t=e.match(t);return null!=t?t:null},getVideoUrl:function(e){var t=new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]+.mp4","ig"),t=e.match(t);return null!=t?t:null},ImgSizeFun:function(e,t){for(var n=0;n<t.length;n++)e[n]=t[n]+config.ImgSize;return e}},ajaxGet=function(e,t,n,i){i=i||function(e,t){};$.ajax({type:"GET",url:0===e.indexOf("http")?e:web_config.api_url+e,data:Object.assign(t,{hpt_times:web_config.hpt_times,hpt_sign:web_config.hpt_sign,member_token:web_config.token}),dataType:"json",timeout:3e4,success:n,error:i,xhrFields:{withCredentials:!0}})},ajaxPost=function(e,t,n,i){i=i||function(e,t){};$.ajax({type:"POST",url:0===e.indexOf("http")?e:web_config.api_url+e,data:Object.assign(t,{hpt_times:web_config.hpt_times,hpt_sign:web_config.hpt_sign,member_token:web_config.token}),dataType:"json",timeout:3e4,success:n,error:i,xhrFields:{withCredentials:!0}})},ajaxGetJsonp=function(e,t,n,i){i=i||function(e,t){};$.ajax({type:"GET",url:e,data:t,dataType:"jsonp",timeout:3e4,success:n,error:i,xhrFields:{withCredentials:!0}})};window.mobileUtil=function(){var e=navigator.userAgent,t=/android|adr|linux/gi.test(e),n=/iphone|ipod|ipad/gi.test(e)&&!t,i=/BlackBerry/i.test(e),o=/IEMobile/i.test(e),r=/WeiBo/gi.test(e),i=t||n||i||o,o=/Alipay/gi.test(e);return{isAndroid:t,isIOS:n,isMobile:i,isWeixin:/MicroMessenger/gi.test(e),isQQ:/ QQ/gi.test(e),isPC:!i,isWeiBo:r,isAlipay:o}}((window,document));const shareCommp=()=>{location.href,location.origin,site,title,description,image};$(function(){const p={qzone:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}&pics={{IMAGE}}",qq:'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}&summary="{{SUMMARY}}"',weibo:"https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}",wechat:"javascript:",douban:"http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11",linkedin:"http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin",facebook:"https://www.facebook.com/sharer/sharer.php?u={{URL}}",twitter:"https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{ORIGIN}}",googleplus:"https://plus.google.com/share?url={{URL}}",pinterest:"https://www.pinterest.com/pin-builder/?url={{URL}}&media={{IMAGE}}&description={{DESCRIPTION}}&method=button",whatsapp:"https://api.whatsapp.com/send?text={{TITLE}}%20{{URL}}",line:"https://social-plugins.line.me/lineit/share?url={{URL}}",telegram:"https://t.me/share/url?url={{URL}}&text={{DESCRIPTION}}&to="};$("li",$(".share-btns")).on("click",function(){let e=$(this);var t=function(e){let t=e.title;var n=e.url;let i=e.description;var o=e.image,r=e.source,s=e.origin,a=e.tags,c=e.platform;let l=p[c];if(a&&0<a.length)for(const u of a)t="twitter"==c?(i=i+" #"+u+" ",t+" #"+u+" "):(i=i+" #"+u+"# ",t+" #"+u+"# ");return l?(l=l.replace("{{URL}}",encodeURIComponent(n)),l=l.replace("{{TITLE}}",encodeURIComponent(t)),l=l.replace("{{DESCRIPTION}}",encodeURIComponent(i)),l=l.replace("{{SUMMARY}}",encodeURIComponent(i)),l=l.replace("{{IMAGE}}",encodeURIComponent(o)),l=l.replace("{{SOURCE}}",encodeURIComponent(r)),l=l.replace("{{ORIGIN}}",encodeURIComponent(s)),l):null}({platform:e.data("platform"),title:web_config.share.title,url:web_config.share.url,description:web_config.share.description,image:web_config.share.image,source:web_config.share.source,origin:web_config.share.url,tags:web_config.share.tags});t&&window.open(t)}),hljs.highlightAll(),$("img.lazy",$(".content-views")).lazyload({effect:"fadeIn"}),$(".go-url").on("click",function(e){let t=$(this);t.attr("target")&&e.preventDefault(),window.open(t.attr("data-url"))})});