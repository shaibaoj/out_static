function parseParams(data){try{var i,tempArr=[];for(i in data){var key=encodeURIComponent(i),value=encodeURIComponent(data[i]);tempArr.push(key+"="+value)}return tempArr.join("&")}catch(err){return""}}function getUrlSearch(url,r){r=new RegExp("(^|&)"+r+"=([^&]*)(&|$)","i"),r=url.slice(url.indexOf("?")+1).match(r);if(null!=r)try{return decodeURIComponent(r[2])}catch(_e){return null}return null}Vue.use(VueStorage,{namespace:"pro__",name:"ls",storage:"local"}),URLPrefix.token=Vue.ls.get("member_token");var vmTestInput={isPhoneNo:function(phone){return"/^1[3456789]d{9}$/".test(phone)},isNumber:function(number){return"/^[0-9]*$/".test(number)},isQQ:function(qq){return"/^[1-9][0-9]{4,14}/".test(qq)}},page=function(str,content){content=content||"",setTimeout(function(){window.location.href=str+".html"+content},50)},pageAll=function(str){setTimeout(function(){window.open(str)},50)};function Request(name){if(-1!=(str=location.href).indexOf(name)){var str,num=str.indexOf(name);return str=str.substring(num+name.length+1)}}var config={_url:"",urls:"/",isHTTP:function(){var HTTPurl=window.location.protocol;return HTTPurl.substring(0,HTTPurl.length-1)},getUrl:function(str){var r=new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]","ig"),r=str.match(r);return null!=r?r:null},getVideoUrl:function(str){var r=new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]+.mp4","ig"),r=str.match(r);return null!=r?r:null},ImgSizeFun:function(Arr,strArr){for(var i=0;i<strArr.length;i++)Arr[i]=strArr[i]+config.ImgSize;return Arr}},ajaxGet=function(url,data,successfun,temp_errorfun){temp_errorfun=temp_errorfun||function(xhr,type){};$.ajax({type:"GET",url:0===url.indexOf("http")?url:URLPrefix.api_url+url,data:Object.assign(data,{hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token}),dataType:"json",timeout:3e4,success:successfun,error:temp_errorfun,xhrFields:{withCredentials:!0}})},ajaxPost=function(url,data,successfun,temp_errorfun){temp_errorfun=temp_errorfun||function(xhr,type){};$.ajax({type:"POST",url:0===url.indexOf("http")?url:URLPrefix.api_url+url,data:Object.assign(data,{hpt_times:URLPrefix.hpt_times,hpt_sign:URLPrefix.hpt_sign,member_token:URLPrefix.token}),dataType:"json",timeout:3e4,success:successfun,error:temp_errorfun,xhrFields:{withCredentials:!0}})},ajaxGetJsonp=function(url,data,successfun,temp_errorfun){temp_errorfun=temp_errorfun||function(xhr,type){};$.ajax({type:"GET",url:url,data:data,dataType:"jsonp",timeout:3e4,success:successfun,error:temp_errorfun,xhrFields:{withCredentials:!0}})};window.mobileUtil=function(){var UA=navigator.userAgent,isAndroid=/android|adr|linux/gi.test(UA),isIOS=/iphone|ipod|ipad/gi.test(UA)&&!isAndroid,isMobile=/BlackBerry/i.test(UA),isAlipay=/IEMobile/i.test(UA),isWeiBo=/WeiBo/gi.test(UA),isMobile=isAndroid||isIOS||isMobile||isAlipay,isAlipay=/Alipay/gi.test(UA);return{isAndroid:isAndroid,isIOS:isIOS,isMobile:isMobile,isWeixin:/MicroMessenger/gi.test(UA),isQQ:/ QQ/gi.test(UA),isPC:!isMobile,isWeiBo:isWeiBo,isAlipay:isAlipay}}((window,document));