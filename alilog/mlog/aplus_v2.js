/* v6.1.16,6.2.10,0.5 2016-08-08 11:33:01 */
!function t(e,r,o){function n(i,c){if(!r[i]){if(!e[i]){var s="function"==typeof require&&require;if(!c&&s)return s(i,!0);if(a)return a(i,!0);throw new Error("Cannot find module '"+i+"'")}var l=r[i]={exports:{}};e[i][0].call(l.exports,function(t){var r=e[i][1][t];return n(r?r:t)},l,l.exports,t,e,r,o)}return r[i].exports}for(var a="function"==typeof require&&require,i=0;i<o.length;i++)n(o[i]);return n}({1:[function(t,e,r){e.exports=t("./src/grey")},{"./src/grey":2}],2:[function(t,e,r){function o(t){if(t)try{var e=g.createElement("script");e.appendChild(g.createTextNode(t)),y.parentNode.insertBefore(e,y)}catch(r){(h.execScript||function(t){h.eval.call(h,t)})(t)}}function n(t,e,r){if(/blitz/i.test(p))return void r();var o,n="GET",a=function(){o.responseText?e(o.responseText):r()};m?(o=new XMLHttpRequest,o.open(n,t,!0)):(o=new XDomainRequest,o.open(n,t)),o.timeout=w.timeout,o.onload=a,o.onerror=r,o.ontimeout=r,o.send()}function a(t,e){var r=g.createElement("script");r.async=!0,i(r,e),r.src=t,y.parentNode.insertBefore(r,y)}function i(t,e){function r(){t.onreadystatechange=t.onload=null,t=null,x(e)&&e({from:"script"})}if("onload"in t)t.onload=r;else{var o=function(){/loaded|complete/.test(t.readyState)&&r()};t.onreadystatechange=o,o()}}function c(t,e){return t+Math.floor(Math.random()*(e-t+1))}function s(t,e){return c(1,e)<=t}function l(t,e){var r;for(r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);return t}function u(t,e){return function(r){return t.call(null,l(e,r||{}))}}function f(t){return function(e){return{}.toString.call(e)=="[object "+t+"]"}}var h=window,g=document,p=navigator.userAgent,y=g.getElementsByTagName("script")[0],d=h.XDomainRequest,m=h.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest,b=function(){},v={set:function(t,e){try{return localStorage.setItem(t,e),!0}catch(r){return!1}},get:function(t){return localStorage.getItem(t)},test:function(){var t="grey_test_key";try{return localStorage.setItem(t,1),localStorage.removeItem(t),!0}catch(e){return!1}}},w={base:1e4,timeout:1e4},_={_config:w};_.load=function(t){t=l({stable:"",stableKey:"",stableHash:"",grey:"",greyKey:"",greyHash:"",base:w.base},t);var e,r,i,c,f=t.hash,h={};if(t.ratio>=t.base||s(t.ratio,t.base)?(e=t.greyKey,r=t.grey,c=t.greyHash,h.type="grey"):(e=t.stableKey,r=t.stable,c=t.stableHash,h.type="stable"),h.url=r,h.key=e,h.hash=c,x(t.before)&&t.before(h),t.after=x(t.after)?u(t.after,h):b,v.test()&&e&&(m||d)&&x(f))if(i=v.get(e),i&&c===f(i,h))try{o(i),t.after({from:"local"})}catch(g){a(r,t.after)}else n(r,function(r){v.set(e,r),o(r),t.after({from:"cors"})},function(){a(r,t.after)});else a(r,t.after);return this},_.config=function(t){return l(w,t||{}),this};var x=(Array.isArray||f("Array"),f("Function"));e.exports=_},{}],3:[function(t,e,r){"use strict";!function(){var e=window,r="g_aplus_grey_launched";if(!e[r]){e[r]=1;var o=t("@ali/grey-publish"),n=location.protocol;0!=n.indexOf("http")&&(n="http:");var a,i=n+"//res.youdanhui.com/alilog/s",c="aplus_v2.js",s=5e3,l=[/^https?:\/\/www\.taobao\.com\/?$/i,/^https?:\/\/(.*\.)?sycm\.taobao\.com/i,/^https?:\/\/(.*\.)?pm\.alibaba-inc\.com/i,/^https?:\/\/(.*\.)?ecrm\.taobao\.com/i,/^https?:\/\/(.*\.)?jxtportal\.taobao\.com/i,/^https?:\/\/(.*\.)?mongodb\.console\.aliyun\.com/i,/^https?:\/\/(.*\.)?ylb\.m\.taobao\.com/i,/^https?:\/\/([\w\.]+\.)?mei\.com/i,/^https?:\/\/([\w\.]+\.)?hotel\.alitrip\.com/i,/^https?:\/\/([\w\.]+\.)?healthday\.m\.taobao\.com/i];for(a=0;a<l.length;a++){if(location.href.match(l[a])){s=1e4;break}s=0}var u="aplus_grey_ratio";"number"==typeof e[u]&&(s=Math.floor(1e4*e[u]));var f=location.search.match(new RegExp("\\b"+u+"=([\\d\\.]+)"));f&&(f=parseFloat(f[1]),isNaN(f)||(s=Math.floor(1e4*f))),e.goldlog=e.goldlog||{},goldlog.record||(goldlog.record=function(t,r,o,n){(e.goldlog_queue||(e.goldlog_queue=[])).push({action:"goldlog.record",arguments:[t,r,o,n]})}),o.load({stable:[i,"6.1.16",c].join("/"),grey:[i,"6.2.10",c].join("/"),ratio:s,stableKey:"APLUSGREYs_aplus_v2",greyKey:"APLUSGREYg_aplus_v2",stableHash:"6ee997ce",greyHash:"4bd13515",hash:t("./hash").hash,before:function(t){goldlog.lver="grey"==t.type?"6.2.10":"6.1.16"}})}}()},{"./hash":4,"@ali/grey-publish":1}],4:[function(t,e,r){"use strict";r.hash=function(t){var e,r,o=1315423911;for(e=t.length-1;e>=0;e--)r=t.charCodeAt(e),o^=(o<<5)+r+(o>>2);return(2147483647&o).toString(16)}},{}]},{},[3]);