webpackJsonp([2],{269:function(t,e,n){"use strict";function i(t){u||n(435)}Object.defineProperty(e,"__esModule",{value:!0});var o=n(377),r=n.n(o);for(var a in o)["default","default"].indexOf(a)<0&&function(t){n.d(e,t,function(){return o[t]})}(a);var s=n(384),c=n.n(s),u=!1,l=n(93),d=i,f=l(r.a,c.a,!1,d,"data-v-13988cab",null);f.options.__file="src/views/top.vue",e.default=f.exports},270:function(t,e,n){var i=n(108)("wks"),o=n(109),r=n(24).Symbol,a="function"==typeof r;(t.exports=function(t){return i[t]||(i[t]=a&&r[t]||(a?r:o)("Symbol."+t))}).store=i},271:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(272),r=(i(o),n(277)),a=i(r),s=n(41),c=i(s),u=n(42),l=(i(u),n(39)),d=i(l),f=n(92),p=(i(f),n(276)),v=(i(p),n(26)),m=i(v),h=window.location.hostname,g={};g.post=function(t,e,i,o,r,s){var u=a.default.apiUrl;e=e||{};var l=(new Date).getTime();if(e.time=l,e.url_sign="youdanhuiapp",e.hpt_host=h,e.hpt_from="web",e.platform="web",cms_app_id&&""!=cms_app_id&&(e.app_id=cms_app_id),i){var f=window.localStorage.getItem("member_token");f?e.hpt_token=f:(f=m.default.getCookie("member_token"))&&(e.hpt_token=f)}var p=window.localStorage.getItem("fromInviteCode");p?e.hpt_invite_code=p:(p=m.default.getCookie("fromInviteCode"))&&(e.hpt_invite_code=p);var v={"Content-Type":"application/x-www-form-urlencoded"};e=n(278).stringify(e),(0,c.default)({method:"post",url:""+u+t,data:e,headers:v,timeout:6e4}).then(function(t){(0,d.default)(o)&&(t.data&&!t.data.info||0!==t.data.info.status?100==t.data.info.status?s.replace({path:"/login"}):(0,d.default)(r)&&r(t.data.info.status_err):o(t.data.data))})},e.default=g},272:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default="production"},273:function(t,e,n){"use strict";var i=String.prototype.replace,o=/%20/g;t.exports={default:"RFC3986",formatters:{RFC1738:function(t){return i.call(t,o,"+")},RFC3986:function(t){return t}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},274:function(t,e,n){"use strict";var i=Object.prototype.hasOwnProperty,o=function(){for(var t=[],e=0;e<256;++e)t.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return t}();e.arrayToObject=function(t,e){for(var n=e&&e.plainObjects?Object.create(null):{},i=0;i<t.length;++i)void 0!==t[i]&&(n[i]=t[i]);return n},e.merge=function(t,n,o){if(!n)return t;if("object"!=typeof n){if(Array.isArray(t))t.push(n);else{if("object"!=typeof t)return[t,n];(o.plainObjects||o.allowPrototypes||!i.call(Object.prototype,n))&&(t[n]=!0)}return t}if("object"!=typeof t)return[t].concat(n);var r=t;return Array.isArray(t)&&!Array.isArray(n)&&(r=e.arrayToObject(t,o)),Array.isArray(t)&&Array.isArray(n)?(n.forEach(function(n,r){i.call(t,r)?t[r]&&"object"==typeof t[r]?t[r]=e.merge(t[r],n,o):t.push(n):t[r]=n}),t):Object.keys(n).reduce(function(t,i){var r=n[i];return Object.prototype.hasOwnProperty.call(t,i)?t[i]=e.merge(t[i],r,o):t[i]=r,t},r)},e.decode=function(t){try{return decodeURIComponent(t.replace(/\+/g," "))}catch(e){return t}},e.encode=function(t){if(0===t.length)return t;for(var e="string"==typeof t?t:String(t),n="",i=0;i<e.length;++i){var r=e.charCodeAt(i);45===r||46===r||95===r||126===r||r>=48&&r<=57||r>=65&&r<=90||r>=97&&r<=122?n+=e.charAt(i):r<128?n+=o[r]:r<2048?n+=o[192|r>>6]+o[128|63&r]:r<55296||r>=57344?n+=o[224|r>>12]+o[128|r>>6&63]+o[128|63&r]:(i+=1,r=65536+((1023&r)<<10|1023&e.charCodeAt(i)),n+=o[240|r>>18]+o[128|r>>12&63]+o[128|r>>6&63]+o[128|63&r])}return n},e.compact=function(t,n){if("object"!=typeof t||null===t)return t;var i=n||[],o=i.indexOf(t);if(-1!==o)return i[o];if(i.push(t),Array.isArray(t)){for(var r=[],a=0;a<t.length;++a)t[a]&&"object"==typeof t[a]?r.push(e.compact(t[a],i)):void 0!==t[a]&&r.push(t[a]);return r}return Object.keys(t).forEach(function(n){t[n]=e.compact(t[n],i)}),t},e.isRegExp=function(t){return"[object RegExp]"===Object.prototype.toString.call(t)},e.isBuffer=function(t){return null!==t&&void 0!==t&&!!(t.constructor&&t.constructor.isBuffer&&t.constructor.isBuffer(t))}},275:function(t,e){t.exports={}},276:function(t,e){function n(t){return void 0===t}t.exports=n},277:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(272),o=function(t){return t&&t.__esModule?t:{default:t}}(i),r={env:o.default,filePath:"https://file.youdanhui.com/file/",apiUrl:"https://s.youdanhui.com",version:40,liveVersion:1};"development"===r.env&&(r.filePath="http://127.0.0.1:9800/overview/",r.apiUrl="//test.s.youdanhui.com"),e.default=r},278:function(t,e,n){"use strict";var i=n(280),o=n(279),r=n(273);t.exports={formats:r,parse:o,stringify:i}},279:function(t,e,n){"use strict";var i=n(274),o=Object.prototype.hasOwnProperty,r={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:i.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},a=function(t,e){for(var n={},i=t.split(e.delimiter,e.parameterLimit===1/0?void 0:e.parameterLimit),r=0;r<i.length;++r){var a,s,c=i[r],u=-1===c.indexOf("]=")?c.indexOf("="):c.indexOf("]=")+1;-1===u?(a=e.decoder(c),s=e.strictNullHandling?null:""):(a=e.decoder(c.slice(0,u)),s=e.decoder(c.slice(u+1))),o.call(n,a)?n[a]=[].concat(n[a]).concat(s):n[a]=s}return n},s=function(t,e,n){if(!t.length)return e;var i,o=t.shift();if("[]"===o)i=[],i=i.concat(s(t,e,n));else{i=n.plainObjects?Object.create(null):{};var r="["===o.charAt(0)&&"]"===o.charAt(o.length-1)?o.slice(1,-1):o,a=parseInt(r,10);!isNaN(a)&&o!==r&&String(a)===r&&a>=0&&n.parseArrays&&a<=n.arrayLimit?(i=[],i[a]=s(t,e,n)):i[r]=s(t,e,n)}return i},c=function(t,e,n){if(t){var i=n.allowDots?t.replace(/\.([^.[]+)/g,"[$1]"):t,r=/(\[[^[\]]*])/,a=/(\[[^[\]]*])/g,c=r.exec(i),u=c?i.slice(0,c.index):i,l=[];if(u){if(!n.plainObjects&&o.call(Object.prototype,u)&&!n.allowPrototypes)return;l.push(u)}for(var d=0;null!==(c=a.exec(i))&&d<n.depth;){if(d+=1,!n.plainObjects&&o.call(Object.prototype,c[1].slice(1,-1))&&!n.allowPrototypes)return;l.push(c[1])}return c&&l.push("["+i.slice(c.index)+"]"),s(l,e,n)}};t.exports=function(t,e){var n=e||{};if(null!==n.decoder&&void 0!==n.decoder&&"function"!=typeof n.decoder)throw new TypeError("Decoder has to be a function.");if(n.delimiter="string"==typeof n.delimiter||i.isRegExp(n.delimiter)?n.delimiter:r.delimiter,n.depth="number"==typeof n.depth?n.depth:r.depth,n.arrayLimit="number"==typeof n.arrayLimit?n.arrayLimit:r.arrayLimit,n.parseArrays=!1!==n.parseArrays,n.decoder="function"==typeof n.decoder?n.decoder:r.decoder,n.allowDots="boolean"==typeof n.allowDots?n.allowDots:r.allowDots,n.plainObjects="boolean"==typeof n.plainObjects?n.plainObjects:r.plainObjects,n.allowPrototypes="boolean"==typeof n.allowPrototypes?n.allowPrototypes:r.allowPrototypes,n.parameterLimit="number"==typeof n.parameterLimit?n.parameterLimit:r.parameterLimit,n.strictNullHandling="boolean"==typeof n.strictNullHandling?n.strictNullHandling:r.strictNullHandling,""===t||null===t||void 0===t)return n.plainObjects?Object.create(null):{};for(var o="string"==typeof t?a(t,n):t,s=n.plainObjects?Object.create(null):{},u=Object.keys(o),l=0;l<u.length;++l){var d=u[l],f=c(d,o[d],n);s=i.merge(s,f,n)}return i.compact(s)}},280:function(t,e,n){"use strict";var i=n(274),o=n(273),r={brackets:function(t){return t+"[]"},indices:function(t,e){return t+"["+e+"]"},repeat:function(t){return t}},a=Date.prototype.toISOString,s={delimiter:"&",encode:!0,encoder:i.encode,encodeValuesOnly:!1,serializeDate:function(t){return a.call(t)},skipNulls:!1,strictNullHandling:!1},c=function t(e,n,o,r,a,s,c,u,l,d,f,p){var v=e;if("function"==typeof c)v=c(n,v);else if(v instanceof Date)v=d(v);else if(null===v){if(r)return s&&!p?s(n):n;v=""}if("string"==typeof v||"number"==typeof v||"boolean"==typeof v||i.isBuffer(v)){if(s){return[f(p?n:s(n))+"="+f(s(v))]}return[f(n)+"="+f(String(v))]}var m=[];if(void 0===v)return m;var h;if(Array.isArray(c))h=c;else{var g=Object.keys(v);h=u?g.sort(u):g}for(var _=0;_<h.length;++_){var y=h[_];a&&null===v[y]||(m=Array.isArray(v)?m.concat(t(v[y],o(n,y),o,r,a,s,c,u,l,d,f,p)):m.concat(t(v[y],n+(l?"."+y:"["+y+"]"),o,r,a,s,c,u,l,d,f,p)))}return m};t.exports=function(t,e){var n=t,i=e||{};if(null!==i.encoder&&void 0!==i.encoder&&"function"!=typeof i.encoder)throw new TypeError("Encoder has to be a function.");var a=void 0===i.delimiter?s.delimiter:i.delimiter,u="boolean"==typeof i.strictNullHandling?i.strictNullHandling:s.strictNullHandling,l="boolean"==typeof i.skipNulls?i.skipNulls:s.skipNulls,d="boolean"==typeof i.encode?i.encode:s.encode,f="function"==typeof i.encoder?i.encoder:s.encoder,p="function"==typeof i.sort?i.sort:null,v=void 0!==i.allowDots&&i.allowDots,m="function"==typeof i.serializeDate?i.serializeDate:s.serializeDate,h="boolean"==typeof i.encodeValuesOnly?i.encodeValuesOnly:s.encodeValuesOnly;if(void 0===i.format)i.format=o.default;else if(!Object.prototype.hasOwnProperty.call(o.formatters,i.format))throw new TypeError("Unknown format option provided.");var g,_,y=o.formatters[i.format];"function"==typeof i.filter?(_=i.filter,n=_("",n)):Array.isArray(i.filter)&&(_=i.filter,g=_);var b=[];if("object"!=typeof n||null===n)return"";var O;O=i.arrayFormat in r?i.arrayFormat:"indices"in i?i.indices?"indices":"repeat":"indices";var j=r[O];g||(g=Object.keys(n)),p&&g.sort(p);for(var w=0;w<g.length;++w){var x=g[w];l&&null===n[x]||(b=b.concat(c(n[x],x,j,u,l,d?f:null,_,p,v,m,y,h)))}return b.join(a)}},281:function(t,e,n){var i=n(97).f,o=n(40),r=n(270)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,r)&&i(t,r,{configurable:!0,value:e})}},283:function(t,e,n){"use strict";var i=n(104),o=n(96),r=n(305),a=n(94),s=n(275),c=n(299),u=n(281),l=n(303),d=n(270)("iterator"),f=!([].keys&&"next"in[].keys()),p=function(){return this};t.exports=function(t,e,n,v,m,h,g){c(n,e,v);var _,y,b,O=function(t){if(!f&&t in C)return C[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},j=e+" Iterator",w="values"==m,x=!1,C=t.prototype,M=C[d]||C["@@iterator"]||m&&C[m],S=M||O(m),k=m?w?O("entries"):S:void 0,P="Array"==e?C.entries||M:M;if(P&&(b=l(P.call(new t)))!==Object.prototype&&b.next&&(u(b,j,!0),i||"function"==typeof b[d]||a(b,d,p)),w&&M&&"values"!==M.name&&(x=!0,S=function(){return M.call(this)}),i&&!g||!f&&!x&&C[d]||a(C,d,S),s[e]=S,s[j]=p,m)if(_={values:w?S:O("values"),keys:h?S:O("keys"),entries:k},g)for(y in _)y in C||r(C,y,_[y]);else o(o.P+o.F*(f||x),e,_);return _}},284:function(t,e,n){var i=n(102),o=n(270)("toStringTag"),r="Arguments"==i(function(){return arguments}()),a=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=a(e=Object(t),o))?n:r?i(e):"Object"==(s=i(e))&&"function"==typeof e.callee?"Arguments":s}},285:function(t,e,n){var i=n(24).document;t.exports=i&&i.documentElement},286:function(t,e,n){var i=n(284),o=n(270)("iterator"),r=n(275);t.exports=n(23).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||r[i(t)]}},287:function(t,e,n){"use strict";var i=n(306)(!0);n(283)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=i(e,n),this._i+=t.length,{value:t,done:!1})})},288:function(t,e,n){n(308);for(var i=n(24),o=n(94),r=n(275),a=n(270)("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),c=0;c<s.length;c++){var u=s[c],l=i[u],d=l&&l.prototype;d&&!d[a]&&o(d,a,u),r[u]=r.Array}},290:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(291),r=i(o),a=n(294),s=i(a),c=n(105),u=i(c),l=n(293),d=i(l),f=n(39),p=i(f),v=n(92),m=i(v),h=n(276),g=i(h),_=n(46),y=i(_),b={isFunction:function(t){return(0,p.default)(t)},isObject:function(t){return(0,y.default)(t)},isEmpty:function(t){return(0,m.default)(t)},isUndefined:function(t){return(0,g.default)(t)},isEmptyObject:function(t){return 0===(0,d.default)(t).length&&t.constructor===Object},mergeDeep:function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];if(!n.length)return t;var o=n.shift();if((0,y.default)(t)&&(0,y.default)(o))for(var r in o)(0,y.default)(o[r])?(t[r]||(0,u.default)(t,(0,s.default)({},r,{})),b.mergeDeep(t[r],o[r])):(0,u.default)(t,(0,s.default)({},r,o[r]));return b.mergeDeep.apply(b,[t].concat(n))},fetch_domain:function(t,e){if(!(0,m.default)(t)&&!(0,m.default)(e)){var n=!0,i=!1,o=void 0;try{for(var a,s=(0,r.default)(t);!(n=(a=s.next()).done);n=!0){var c=a.value,u=!0,l=!1,d=void 0;try{for(var f,p=(0,r.default)(c.domain);!(u=(f=p.next()).done);u=!0){if(e==f.value)return c}}catch(t){l=!0,d=t}finally{try{!u&&p.return&&p.return()}finally{if(l)throw d}}}}catch(t){i=!0,o=t}finally{try{!n&&s.return&&s.return()}finally{if(i)throw o}}}return null},dateDiff:function(t,e){if(t&&e&&""!=t&&""!=e&&null!=t&&null!=e){return b.getDataLarge(t,e)<0}return(!t||""==t||null==t)&&!(!e||""==e||""==e)},getDataLarge:function(t,e){var n=t.replace(/-/g,"/"),i=e.replace(/-/g,"/"),o=Date.parse(n);return(Date.parse(i)-o)/3600/1e3},formatDate:function(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var i in n)if(new RegExp("("+i+")").test(e)){var o=n[i]+"";e=e.replace(RegExp.$1,1===RegExp.$1.length?o:this.padLeftZero(o))}return e},padLeftZero:function(t){return("00"+t).substr(t.length)},stringToDate:function(t){var e=t.split("-");return new Date(e[0],e[1]-1,e[2],0,0,0)}};e.default=b},291:function(t,e,n){t.exports={default:n(295),__esModule:!0}},292:function(t,e,n){t.exports={default:n(296),__esModule:!0}},293:function(t,e,n){t.exports={default:n(297),__esModule:!0}},294:function(t,e,n){"use strict";e.__esModule=!0;var i=n(292),o=function(t){return t&&t.__esModule?t:{default:t}}(i);e.default=function(t,e,n){return e in t?(0,o.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},295:function(t,e,n){n(288),n(287),t.exports=n(307)},296:function(t,e,n){n(309);var i=n(23).Object;t.exports=function(t,e,n){return i.defineProperty(t,e,n)}},297:function(t,e,n){n(310),t.exports=n(23).Object.keys},298:function(t,e){t.exports=function(){}},299:function(t,e,n){"use strict";var i=n(301),o=n(107),r=n(281),a={};n(94)(a,n(270)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=i(a,{next:o(1,n)}),r(t,e+" Iterator")}},300:function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},301:function(t,e,n){var i=n(95),o=n(302),r=n(106),a=n(99)("IE_PROTO"),s=function(){},c=function(){var t,e=n(103)("iframe"),i=r.length;for(e.style.display="none",n(285).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),c=t.F;i--;)delete c.prototype[r[i]];return c()};t.exports=Object.create||function(t,e){var n;return null!==t?(s.prototype=i(t),n=new s,s.prototype=null,n[a]=t):n=c(),void 0===e?n:o(n,e)}},302:function(t,e,n){var i=n(97),o=n(95),r=n(98);t.exports=n(25)?Object.defineProperties:function(t,e){o(t);for(var n,a=r(e),s=a.length,c=0;s>c;)i.f(t,n=a[c++],e[n]);return t}},303:function(t,e,n){var i=n(40),o=n(100),r=n(99)("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),i(t,r)?t[r]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},304:function(t,e,n){var i=n(96),o=n(23),r=n(27);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],a={};a[t]=e(n),i(i.S+i.F*r(function(){n(1)}),"Object",a)}},305:function(t,e,n){t.exports=n(94)},306:function(t,e,n){var i=n(44),o=n(43);t.exports=function(t){return function(e,n){var r,a,s=String(o(e)),c=i(n),u=s.length;return c<0||c>=u?t?"":void 0:(r=s.charCodeAt(c),r<55296||r>56319||c+1===u||(a=s.charCodeAt(c+1))<56320||a>57343?t?s.charAt(c):r:t?s.slice(c,c+2):a-56320+(r-55296<<10)+65536)}}},307:function(t,e,n){var i=n(95),o=n(286);t.exports=n(23).getIterator=function(t){var e=o(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return i(e.call(t))}},308:function(t,e,n){"use strict";var i=n(298),o=n(300),r=n(275),a=n(45);t.exports=n(283)(Array,"Array",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),r.Arguments=r.Array,i("keys"),i("values"),i("entries")},309:function(t,e,n){var i=n(96);i(i.S+i.F*!n(25),"Object",{defineProperty:n(97).f})},310:function(t,e,n){var i=n(100),o=n(98);n(304)("keys",function(){return function(t){return o(i(t))}})},313:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(101),r=i(o),a=n(271),s=(i(a),n(15));e.default={components:{},props:{activeKey:String},data:function(){return{currentActiveKey:this.activeKey,menus:[{name:"首页",iconClass:"icon-shouye",url:"/"},{name:"9块9",iconClass:"icon-9kuai9",url:"/jiu"},{name:"分类",iconClass:"icon-fenlei",url:"/category"},{name:"拼多多",iconClass:"icon-gengduopintuan",url:"/pinduoduo"},{name:"我的",iconClass:"icon-gerenzhongxin",url:"/member"}]}},watch:{activeKey:function(t){},currentActiveKey:function(t){}},methods:(0,r.default)({},(0,s.mapActions)(["getUser","getUserData","saveUser","saveUserData","removeAll","getDomain"]),{handleSelect:function(t){var e=this;"logout"===t?(this.logout(),this.$router.push("/login")):(this.$nextTick(function(){e.$router.push(t)}),this.currentActiveKey=t)},logout:function(){window.localStorage.removeItem("member_token")}}),created:function(){},computed:(0,r.default)({},(0,s.mapGetters)({member:"showMember",showMemberData:"showMemberData",showMid:"showMid"}))}},314:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(101),r=i(o),a=n(92),s=i(a),c=n(271),u=i(c),l=n(320),d=i(l),f=n(15);e.default={components:{"ydh-footer":d.default},props:{},data:function(){return{activeKey:""}},created:function(){this.init()},mounted:function(){},methods:(0,r.default)({},(0,f.mapActions)(["getMember","getMemberData","saveMember","saveMemberData"]),{init:function(){this.activeKey=this.$route.path},query_user:function(){var t=this;(0,s.default)(this.member)&&u.default.post("/user/home/user",{},!0,function(e){t.member&&!(0,s.default)(e.member.id)&&t.saveMember(e.member)},function(e){t.$toast(e)},this.$router)},handleSelect:function(t){var e=this;this.$nextTick(function(){e.$router.push(t)})}}),computed:(0,r.default)({},(0,f.mapGetters)({member:"showMember",showMemberData:"showMemberData",showUid:"showUid"}))}},315:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(92),r=(i(o),n(271));i(r);e.default={components:{},props:{goods:{default:Object},columns:{default:0},index:{default:0},rank:{default:0}},data:function(){return{}},methods:{init:function(){},handleSelect:function(t){var e=this;this.$nextTick(function(){e.$router.push(t)})}},created:function(){this.init()},mounted:function(){},computed:{title:function(){return this.goods.short_name?this.goods.short_name:this.goods.title}}}},316:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"footer"},t._l(t.menus,function(e,i){return n("div",{staticClass:"item",class:[e.url==t.activeKey?"selected":""],on:{click:function(n){t.handleSelect(e.url)}}},[n("i",{staticClass:"cmsfont",class:[e.iconClass]}),t._v(" "),n("span",[t._v(t._s(e.name))])])}))},o=[];i._withStripped=!0;var r={render:i,staticRenderFns:o};e.default=r},317:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"slot"},[t._t("default")],2),t._v(" "),n("ydh-footer",{attrs:{"active-key":t.activeKey}})],1)},o=[];i._withStripped=!0;var r={render:i,staticRenderFns:o};e.default=r},318:function(t,e){},319:function(t,e){},320:function(t,e,n){"use strict";function i(t){u||n(318)}Object.defineProperty(e,"__esModule",{value:!0});var o=n(313),r=n.n(o);for(var a in o)["default","default"].indexOf(a)<0&&function(t){n.d(e,t,function(){return o[t]})}(a);var s=n(316),c=n.n(s),u=!1,l=n(93),d=i,f=l(r.a,c.a,!1,d,"data-v-6c4d8baa",null);f.options.__file="src/components/footer.vue",e.default=f.exports},321:function(t,e,n){"use strict";function i(t){u||n(319)}Object.defineProperty(e,"__esModule",{value:!0});var o=n(314),r=n.n(o);for(var a in o)["default","default"].indexOf(a)<0&&function(t){n.d(e,t,function(){return o[t]})}(a);var s=n(317),c=n.n(s),u=!1,l=n(93),d=i,f=l(r.a,c.a,!1,d,"data-v-6f6af01c",null);f.options.__file="src/components/root.vue",e.default=f.exports},322:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={items:[{c_id:"",title:"全部",short_name:"全部",class:"icon"},{c_id:1,title:"潮流女装",short_name:"女装",class:"icon"},{c_id:2,title:"时尚男装",short_name:"男装",class:"nanz"},{c_id:3,title:"男女鞋包",short_name:"鞋包",class:"xieb"},{c_id:4,title:"配饰礼品",short_name:"配饰",class:"peis"},{c_id:5,title:"户外",short_name:"户外",class:"peis"},{c_id:6,title:"美妆护肤",short_name:"美妆",class:"meiz"},{c_id:7,title:"母婴童装",short_name:"母婴",class:"muy"},{c_id:8,title:"零食饮品",short_name:"食品",class:"lings"},{c_id:9,title:"内衣",short_name:"内衣",class:"lings"},{c_id:10,title:"数码周边",short_name:"数码",class:"shum"},{c_id:11,title:"家装",short_name:"家装",class:"shum"},{c_id:12,title:"生活家居",short_name:"居家",class:"jiaj"},{c_id:13,title:"家用电器",short_name:"家电",class:"went"},{c_id:14,title:"文体车品",short_name:"汽车",class:"went"},{c_id:15,title:"服务",short_name:"服务",class:"went"},{c_id:16,title:"图书",short_name:"图书",class:"went"},{c_id:17,title:"其它",short_name:"其它",class:"went"}],pddItems:[{id:1,title:"美食",class:"icon-apple-and-pear"},{id:4,title:"⺟婴",class:"icon-weibiaoti2fuzhi05"},{id:13,title:"水果",class:"icon-shuiguo"},{id:14,title:"服饰",class:"icon-yundongfushi"},{id:15,title:"百货",class:"icon-shenghuobaihuo"},{id:16,title:"美妆",class:"icon-meizhuanghufu"},{id:18,title:"电器",class:"icon-dianqi"},{id:743,title:"男装",class:"icon-nanzhuang"},{id:818,title:"家纺",class:"icon-jiazhuangjiajuleimu"},{id:1281,title:"鞋包",class:"icon-xiebaopeishizhuanhuan"},{id:1451,title:"运动",class:"icon-yundong"},{id:1543,title:"手机",class:"icon-phone"},{id:1282,title:"内衣",class:"icon-neiyi"},{id:1917,title:"家装",class:"icon-jiazhuangjiajuleimu"},{id:2048,title:"汽车",class:"icon-qiche"}]};e.default=i},323:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"goods",on:{click:function(e){t.handleSelect("/goods/"+t.goods.num_iid)}}},[n("div",{staticClass:"goods-bg",style:"background-image:url("+t.goods.pic_url+");"},[t.rank>0?n("span",{staticClass:"rank today"},[t._v("第"+t._s(t.rank)+"名")]):t._e()]),t._v(" "),n("div",{staticClass:"goods-title"},[n("span",[t._v(t._s(t.title))])]),t._v(" "),n("div",{staticClass:"goods-item"},[t.goods.coupon_money>0?n("div",{staticClass:"goods-price"},[n("span",{staticClass:"tip"},[t._v("原价")]),t._v(" "),n("span",{staticClass:"price"},[t._v("￥"+t._s(t.goods.price))])]):n("div",{staticClass:"goods-price"},[n("span",{staticClass:"tip"},[t._v("原价")]),t._v(" "),n("span",{staticClass:"price"},[t._v("￥"+t._s(t.goods.ori_price))])]),t._v(" "),t.goods.volume>0?n("span",{staticClass:"goods-volume"},[t._v("月销 "+t._s(t.goods.volume))]):t._e()]),t._v(" "),n("div",{staticClass:"goods-item"},[n("div",{staticClass:"coupon-price"},[n("span",{staticClass:"coupon-price-txt"},[t._v("￥")]),t._v(" "),n("span",{staticClass:"coupon-price-number"},[t._v(t._s(t.goods.buy_price))])]),t._v(" "),t.goods.coupon_money>0?n("span",{staticClass:"coupon-text"},[t._v(t._s(t.goods.coupon_money)+"元券")]):t._e()])])},o=[];i._withStripped=!0;var r={render:i,staticRenderFns:o};e.default=r},324:function(t,e){},325:function(t,e,n){"use strict";function i(t){u||n(324)}Object.defineProperty(e,"__esModule",{value:!0});var o=n(315),r=n.n(o);for(var a in o)["default","default"].indexOf(a)<0&&function(t){n.d(e,t,function(){return o[t]})}(a);var s=n(323),c=n.n(s),u=!1,l=n(93),d=i,f=l(r.a,c.a,!1,d,"data-v-dec1b9e0",null);f.options.__file="src/components/model/goods.vue",e.default=f.exports},327:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(92),r=(i(o),n(271)),a=i(r);e.default={components:{},props:{},data:function(){return{items:[{src:"http://static.app.youdanhui.com/images/cms/home/zhuanqian.png",title:"全网购",url:"/mall"},{src:"http://static.app.youdanhui.com/images/cms/home/pingou.png",title:"拼多多",url:"/pinduoduo"}]}},methods:{init:function(){},query:function(){var t=this;this.loading=!0,a.default.post("/common/goods/viewComment",{num_iid:this.goods.num_iid},!0,function(e){e.content&&(t.code=e.content),t.loading=!1},function(e){t.loading=!1},this.$router)},jump:function(t){t.url&&this.handleSelect(t.url)},handleSelect:function(t){var e=this;this.$nextTick(function(){e.$router.push(t)})}},created:function(){this.init()},mounted:function(){},computed:{title:function(){return this.goods.shortName?this.goods.shortName:this.goods.title}}}},328:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(92),r=(i(o),n(271)),a=i(r);e.default={components:{},props:{type:{type:[String,Number]},isCollapsed:{default:!1},goods:{default:Object},index:0},data:function(){return{code:"正在加载中...",copied:!1,hideDetail:!0,loading:!1,images:["https://images.cangshutun.com/FnzaZM_YD-e4aqvaiRvInoJZvqxi","https://images.cangshutun.com/FnzaZM_YD-e4aqvaiRvInoJZvqxi"]}},methods:{init:function(){},query:function(){var t=this;this.loading=!0,a.default.post("/common/goods/viewComment",{num_iid:this.goods.num_iid},!0,function(e){e.content&&(t.code=e.content),t.loading=!1},function(e){t.loading=!1},this.$router)}},created:function(){this.init()},mounted:function(){},computed:{title:function(){return this.goods.shortName?this.goods.shortName:this.goods.title}}}},333:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("van-swipe",{attrs:{autoplay:4e3}},t._l(t.images,function(t,e){return n("van-swipe-item",{key:e},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t,expression:"image"}]})])}))},o=[];i._withStripped=!0;var r={render:i,staticRenderFns:o};e.default=r},334:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"icons"},t._l(t.items,function(e,i){return n("a",{staticClass:"icon",on:{click:function(n){t.jump(e)}}},[n("img",{attrs:{src:e.src}}),t._v(" "),n("span",[t._v(t._s(e.title))])])}))},o=[];i._withStripped=!0;var r={render:i,staticRenderFns:o};e.default=r},335:function(t,e){},336:function(t,e){},337:function(t,e,n){"use strict";function i(t){u||n(336)}Object.defineProperty(e,"__esModule",{value:!0});var o=n(327),r=n.n(o);for(var a in o)["default","default"].indexOf(a)<0&&function(t){n.d(e,t,function(){return o[t]})}(a);var s=n(334),c=n.n(s),u=!1,l=n(93),d=i,f=l(r.a,c.a,!1,d,"data-v-37a10a84",null);f.options.__file="src/views/home/icons.vue",e.default=f.exports},338:function(t,e,n){"use strict";function i(t){u||n(335)}Object.defineProperty(e,"__esModule",{value:!0});var o=n(328),r=n.n(o);for(var a in o)["default","default"].indexOf(a)<0&&function(t){n.d(e,t,function(){return o[t]})}(a);var s=n(333),c=n.n(s),u=!1,l=n(93),d=i,f=l(r.a,c.a,!1,d,"data-v-2d8a2932",null);f.options.__file="src/views/home/slider.vue",e.default=f.exports},377:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(321),r=i(o),a=n(92),s=(i(a),n(271)),c=i(s),u=n(290),l=(i(u),n(337)),d=i(l),f=n(338),p=i(f),v=n(325),m=i(v),h=n(322),g=i(h);e.default={components:{iRoot:r.default,"ydh-icons":d.default,"ydh-slider":p.default,"ydh-goods":m.default},data:function(){return{activate:!1,categorys:g.default,condition:{goods:{ipage:0,min_time:"",max_time:"",cid:"",sort:"time",order_next:"",loading:!1}},data:{goods:{items:[]}}}},mounted:function(){this.activate=!0,this.init()},beforeDestroy:function(){this.activate=!1},created:function(){},beforeCreate:function(){},beforeMount:function(){},beforeUpdate:function(){},updated:function(){},activated:function(){this.activate=!0},deactivated:function(){this.activate=!1},computed:{scrollDisabled:function(){return!!(this.condition.goods.loading>0&&this.activate)}},methods:{init:function(){this.query()},query:function(){var t=this;this.condition.goods.loading=1,this.data.goods.items=Array(),c.default.post("/cms/goods/top",{cid:this.condition.goods.cid,pic_size:400,column:2,sort:this.condition.goods.sort,order_next:this.condition.goods.order_next,min_date:this.condition.goods.min_time},!0,function(e){e.items&&e.items.length>0?(t.data.goods.items.push.apply(t.data.goods.items,e.items),t.condition.goods.ipage=e.pager.ipage,t.condition.goods.loading=0):t.condition.goods.loading=2},function(e){t.condition.goods.loading=2},this.$router)},queryItems:function(t,e,n){c.default.post("/cms/goods/top",t,!0,function(t){e(t)},function(t){n(t)},this.$router)},loadmore:function(){var t=this;0==this.condition.goods.loading&&this.activate&&(this.condition.goods.loading=1,this.queryItems({ipage:this.condition.goods.ipage+1,column:2,cid:this.condition.goods.cid,pic_size:400,min_date:this.condition.goods.min_time,sort:this.condition.goods.sort,order_next:this.condition.goods.order_next},function(e){e.items&&e.items.length>0?(t.data.goods.items.push.apply(t.data.goods.items,e.items),t.condition.goods.ipage=e.pager.ipage,t.condition.goods.loading=0):t.condition.goods.loading=2},function(e){t.condition.goods.loading=2}))},onTab:function(t,e){this.condition.goods.cid=this.categorys.items[t].c_id,this.condition.goods.ipage=0,this.condition.goods.min_time="",this.condition.goods.max_time="",this.condition.goods.loading=!1,this.query()},back:function(){this.$router.go(-1)}}}},384:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"page-nav"},[n("i",{staticClass:"cmsfont icon-back",on:{click:t.back}}),t._v(" "),n("span",{staticClass:"title"},[t._v("销量排行榜")]),t._v(" "),n("i",{})]),t._v(" "),n("div",{staticClass:"fixed"},[n("van-tabs",{attrs:{sticky:""},on:{click:t.onTab}},t._l(t.categorys.items,function(t,e){return n("van-tab",{attrs:{title:t.short_name}})}))],1),t._v(" "),n("div",{staticClass:"content"},[n("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadmore,expression:"loadmore"}],staticClass:"list",attrs:{"infinite-scroll-disabled":t.scrollDisabled,"infinite-scroll-distance":"50"}},t._l(t.data.goods.items,function(e,i){return n("div",{staticClass:"li"},t._l(e,function(t,e){return n("ydh-goods",{attrs:{columns:"2",goods:t,index:e,rank:2*i+e+1}})}))})),t._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:1==t.condition.goods.loading,expression:"condition.goods.loading==1"}],staticClass:"page-infinite-loading"},[n("mt-spinner",{attrs:{type:"fading-circle"}}),t._v("\n             加载中...\n         ")],1),t._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:2==t.condition.goods.loading,expression:"condition.goods.loading==2"}],staticClass:"page-infinite-loading"},[t._v("\n             见底了\n         ")])])])},o=[];i._withStripped=!0;var r={render:i,staticRenderFns:o};e.default=r},435:function(t,e){}});