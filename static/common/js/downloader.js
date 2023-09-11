function parseParams(t){try{var n,e=[];for(n in t){var i=encodeURIComponent(n),o=encodeURIComponent(t[n]);e.push(i+"="+o)}return e.join("&")}catch(t){return""}}function getUrlSearch(t,n){n=new RegExp("(^|&)"+n+"=([^&]*)(&|$)","i"),t=t.slice(t.indexOf("?")+1).match(n);if(null!=t)try{return decodeURIComponent(t[2])}catch(t){return null}return null}var vmTestInput={isPhoneNo:function(t){return"/^1[3456789]d{9}$/".test(t)},isNumber:function(t){return"/^[0-9]*$/".test(t)},isQQ:function(t){return"/^[1-9][0-9]{4,14}/".test(t)}},page=function(t,n){n=n||"",setTimeout(function(){window.location.href=t+".html"+n},50)},pageAll=function(t){setTimeout(function(){window.open(t)},50)};function Request(t){var n,e=location.href;if(-1!=e.indexOf(t))return n=e.indexOf(t),e.substring(n+t.length+1)}function obj2String(t,n=[],e=0){for(var i in t)n[e++]=[i,t[i]];return new URLSearchParams(n).toString()}var config={_url:"",urls:"/",isHTTP:function(){var t=window.location.protocol;return t.substring(0,t.length-1)},getUrl:function(t){var n=new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]","ig"),t=t.match(n);return null!=t?t:null},getVideoUrl:function(t){var n=new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]+.mp4","ig"),t=t.match(n);return null!=t?t:null},ImgSizeFun:function(t,n){for(var e=0;e<n.length;e++)t[e]=n[e]+config.ImgSize;return t}},ajaxGet=function(t,n,e,i){var o=function(t,n){},i=(i&&(o=i),obj2String(Object.assign(n,{hpt_times:web_config.hpt_times,hpt_sign:web_config.hpt_sign,member_token:web_config.token})));fetch(0===t.indexOf("http")?t:web_config.api_url+t+"?"+i,{method:"GET"}).then(t=>t.json()).then(e).catch((t,n)=>{o(t,n)})},ajaxPost=function(t,n,e,i){var o=i?i:function(t,n){};fetch(0===t.indexOf("http")?t:web_config.api_url+t,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(Object.assign(n,{hpt_times:web_config.hpt_times,hpt_sign:web_config.hpt_sign,member_token:web_config.token}))}).then(t=>t.json()).then(e).catch((t,n)=>{o(t,n)})},ajaxGetJsonp=function(t,n,e,i){i=i||function(t,n){};$.ajax({type:"GET",url:t,data:n,dataType:"jsonp",timeout:3e4,success:e,error:i,xhrFields:{withCredentials:!0}})};window.mobileUtil=function(){var t=navigator.userAgent,n=/android|adr|linux/gi.test(t),e=/iphone|ipod|ipad/gi.test(t)&&!n,i=/BlackBerry/i.test(t),o=/IEMobile/i.test(t),a=/WeiBo/gi.test(t),i=n||e||i||o,o=/Alipay/gi.test(t);return{isAndroid:n,isIOS:e,isMobile:i,isWeixin:/MicroMessenger/gi.test(t),isQQ:/ QQ/gi.test(t),isPC:!i,isWeiBo:a,isAlipay:o}}((window,document)),function(){var t,n=window.dataUrls||[];for(t in n)ajaxPost(n[t].url,n[t].data,function(t){});"undefined"!=typeof hljs&&hljs.highlightAll()}(),document.addEventListener("alpine:init",()=>{Alpine.data("action",()=>({stat:{dig:0},dig(t,n){var e=this;ajaxPost("/api/cms/action/view",{action:"dig",t:t,id:n},function(t){t.data.stat&&(e.stat=t.data.stat)})},view(t,n,e,i){var o=this;ajaxPost("/api/cms/action/view",{action:"view",t:t,id:n,lang:e,type:i},function(t){t.data.stat&&(o.stat.dig=t.data.stat.dig)})}})),Alpine.data("ad_google",()=>({stat:{dig:0},add_ins(t,n){var e,i=document.createElement("ins"),o=n.attrs||{};for(e in o)i.setAttribute(e,o[e]);t&&(t.appendChild(i),this.adsenseAddLoad(t))},adsenseAddLoad(t){let n=document.createElement("script");n.type="text/javascript",n.text="(adsbygoogle = window.adsbygoogle || []).push({});",t.appendChild(n)}}))});