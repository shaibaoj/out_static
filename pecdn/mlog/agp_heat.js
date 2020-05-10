/**
 *
 * 客户端侦测脚本
 *  @ref: https://github.com/kissyteam/kissy/blob/1.4.x/src/seed/src/ua.js
 *        https://github.com/yuyu1911/Magneto/blob/master/src/plugins/client/ua.js
 *        http://gitlab.alibaba-inc.com/tb/ap/blob/master/build/1.0/poc/m/os.js
 *        http://gitlab.alibaba-inc.com/tb/ap/blob/master/build/1.0/m/m/ua.js
 */

(function (win, doc) {
    'use strict';
    /* global goldlog */

    var version = 1;

    /** 防止旧有版本覆盖新版本 **/
    if (win["_ap_agp_heat"] && version <= win["_ap_agp_heat"].version) {
        return;
    }

    var performance = win.performance || win.mozPerformance || win.msPerformance || win.webkitPerformance || {_na: 1};
    var loc = location;
    var url = location.href;
    var hostname = loc.hostname;
    var nav = win.navigator;
    var app_version = nav.appVersion;
    var ua = nav && nav.userAgent || '';
    var _head_node; // 用于保存页面的 head Node
    var _meta_nodes; // 用于保存页面 head 中的 meta 节点集合
    var is_ahot = getMetaAhot();
    var rate_ahot_res = getMetaAhotRes();
    var rate_perf = getMetaPerfRate();
    var default_rate = get_rate();
    var microscope_data = getMetaMicroscope();
    //var IFRAME_PREFIX = 'iframe_';
    var aplus_node = doc.getElementById("tb-beacon-aplus");
    var exparams = tryToGetAttribute(aplus_node, "exparams");

    /** 默认配置 **/
    var default_config = {
        layout: 0,
        shouldBindMonitor: false
    };

    var get_rate = function () {
        //设置默认采样率，三淘采样单独设置
        large_sites = ["taobao.com", "tmall.com", "etao.com"];
        for (var i=0; i < large_sites.length; i++) {
            if (location.hostname.indexOf(large_sites[i]) >= 0) {
                return 0.1;
            }
        }
        return 0.5;
    }

    var CONFIG = {
        RATE: {
            RESOURCE_TIMING: isNaN(rate_ahot_res) ? 0.001 : rate_ahot_res,
            PERFORMANCE_TIMEING: isNaN(rate_perf) ? default_rate : rate_perf,
            ENGINSTART: 1
        },
        THRESHOLD: {
            RESOURCE_TIMING: 50
        },
        DEBUG: {
            RESOURCE_TIMING: location.search.indexOf('ap-debug-resource') > -1,
            PERFORMANCE_TIMEING: location.search.indexOf('agp-debug-perf') > -1
        },
        ID: {
            IFRAME: 'aplus_iframe_resource_timing',
            FORM: 'aplus_form_resource_timing'
        }
    };

    /** 辅助方法 **/
    var isNumber = function (v) {
        return typeof v == "number";
    };

    /**
     * 判断字符串 s1 是否包含字符串 s2
     * @param s1 {String}
     * @param s2 {String}
     */
    var isContain = function (s1, s2) {
        return s1.indexOf(s2) > -1;
    };

    /**
     *  根据script上的exparams判断是否是店铺
     */

    function getExparams() {
        var exparamsArray = exparams.split('&'),
            exparamsMap = {};
        for (var i = 0; i < exparamsArray.length; i++) {
            var exparam = exparamsArray[i],
                e = exparam.split('=');
            exparamsMap[e[0]] = e[1];
        }
        return exparamsMap;
    }

    function tryToGetAttribute(element, attr_name) {
        return element && element.getAttribute ? (element.getAttribute(attr_name) || "") : "";
    }

    /**
     * 取得页面上 head 中的所有 meta 元素
     */
    function getMetaTags() {
        _head_node = _head_node || doc.getElementsByTagName("head")[0];

        return _meta_nodes || (_head_node ? (_meta_nodes = _head_node.getElementsByTagName("meta")) : []);
    }

    function getMetaContentByName(name) {
        var i;
        var meta;
        var meta_nodes = getMetaTags();
        var l = meta_nodes.length;
        var content;

        for (i = 0; i < l; i++) {
            meta = meta_nodes[i];
            if (tryToGetAttribute(meta, "name") == name) {
                content = tryToGetAttribute(meta, "content");
                break;
            }
        }

        return content;
    }

    function getMetaAhot() {
        return getMetaContentByName("ahot-aplus");
    }

    /**
     * 取得AGP性能采样率
     * <meta name="agp-rate-perf" content="0.1">
     */
    function getMetaPerfRate() {
        var content = getMetaContentByName("agp-rate-perf");
        return parseFloat(content || "");
    }

    /**
     * 取得 head / meta 中的 aplus-rate-ahot-res
     * 形如：
     * <meta name="aplus-rate-ahot-res" content="0.1">
     */
    function getMetaAhotRes() {
        var content = getMetaContentByName("aplus-rate-ahot-res");
        return parseFloat(content || "");
    }

    function getMetaMicroscope() {
        return getMetaContentByName("microscope-data");
    }

    function useIframe(sid, url) {
        var iframeid = sid;
        var iframe = doc.getElementById(iframeid);

        if (!iframe) {
            iframe = doc.createElement('iframe');
            iframe.setAttribute('frameborder', '0');
            iframe.style.cssText = 'width:0;height:0;border:0;display:none;';
            iframe.setAttribute('id', iframeid);
            iframe.setAttribute('name', iframeid);
        }

        if (url) {
            iframe.setAttribute('src', url);
        }

        if (!iframe.parentNode) {
            doc.body.appendChild(iframe);
        }

        return iframe;
    }

    var onload = win.attachEvent ?
        (function (cb) {
            win.attachEvent('onload', cb);
        }) : (win.addEventListener ?
        function (cb) {
            win.addEventListener('load', cb, false);
        } :
        function () {
        });

    /**
     * 生成本页的 pv id
     */
    var makePvid = function () {
        var rnd_strs = "",
            chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        while (rnd_strs.length < 16) {
            rnd_strs += chars.substr(Math.floor(Math.random() * 62), 1);
        }
        return rnd_strs;
    };

    /**
     * object to param
     * 将一个简单对象转化为 url 参数的形式
     * @param obj {Object}
     */
    var obj2param = function (obj) {
        var a = [], k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                a.push(k + "=" + encodeURIComponent(obj[k]));
            }
        }
        return a.join("&");
    };

    var numberify = function (s) {
        var c = 0;
        // convert '1.2.3.4' to 1.234
        return parseFloat(s.replace(/\./g, function () {
            return (c++ === 0) ? '.' : '';
        }));
    };

    var setTridentVersion = function (ua, UA) {
        var core, m;
        UA[core = 'trident'] = 0.1;

        if ((m = ua.match(/Trident\/([\d.]*)/)) && m[1]) {
            UA[core] = numberify(m[1]);
        }

        UA.core = core;
    };

    var getIEVersion = function (ua) {
        var m, v;
        if ((m = ua.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) &&
            (v = (m[1] || m[2]))) {
            return numberify(v);
        }
        return 0;
    };

    var dealDefault = function (s) {
        return s || 'other';
    };

    var getDescriptorFromUserAgent = function (ua) {
        var EMPTY = '';
        var os;
        var core = EMPTY;
        var shell = EMPTY;
        var m;
        var IE_DETECT_RANGE = [6, 9];
        var ieVersion;
        var v;
        var end;
        var VERSION_PLACEHOLDER = '{{version}}';
        var IE_DETECT_TPL = '<!--[if IE ' + VERSION_PLACEHOLDER + ']><' + 's></s><![endif]-->';
        var div = doc && doc.createElement('div');
        var s = [];
        var extra_name;
        var extra_version;
        var external;
        /**
         * KISSY UA
         * @class KISSY.UA
         * @singleton
         */
        var UA = {
            /**
             * webkit version
             * @type undefined|Number
             * @member KISSY.UA
             */
            webkit: undefined,
            /**
             * trident version
             * @type undefined|Number
             * @member KISSY.UA
             */
            trident: undefined,
            /**
             * gecko version
             * @type undefined|Number
             * @member KISSY.UA
             */
            gecko: undefined,
            /**
             * presto version
             * @type undefined|Number
             * @member KISSY.UA
             */
            presto: undefined,
            /**
             * chrome version
             * @type undefined|Number
             * @member KISSY.UA
             */
            chrome: undefined,
            /**
             * safari version
             * @type undefined|Number
             * @member KISSY.UA
             */
            safari: undefined,
            /**
             * firefox version
             * @type undefined|Number
             * @member KISSY.UA
             */
            firefox: undefined,
            /**
             * ie version
             * @type undefined|Number
             * @member KISSY.UA
             */
            ie: undefined,
            /**
             * ie document mode
             * @type undefined|Number
             * @member KISSY.UA
             */
            ieMode: undefined,
            /**
             * opera version
             * @type undefined|Number
             * @member KISSY.UA
             */
            opera: undefined,
            /**
             * mobile browser. apple, android.
             * @type String
             * @member KISSY.UA
             */
            mobile: undefined,
            /**
             * browser render engine name. webkit, trident
             * @type String
             * @member KISSY.UA
             */
            core: undefined,
            /**
             * browser shell name. ie, chrome, firefox
             * @type String
             * @member KISSY.UA
             */
            shell: undefined,

            /**
             * PhantomJS version number
             * @type undefined|Number
             * @member KISSY.UA
             */
            phantomjs: undefined,

            /**
             * operating system. android, ios, linux, windows
             * @type string
             * @member KISSY.UA
             */
            os: undefined,

            /**
             * ipad ios version
             * @type Number
             * @member KISSY.UA
             */
            ipad: undefined,
            /**
             * iphone ios version
             * @type Number
             * @member KISSY.UA
             */
            iphone: undefined,
            /**
             * ipod ios
             * @type Number
             * @member KISSY.UA
             */
            ipod: undefined,
            /**
             * ios version
             * @type Number
             * @member KISSY.UA
             */
            ios: undefined,

            /**
             * android version
             * @type Number
             * @member KISSY.UA
             */
            android: undefined,

            /**
             * nodejs version
             * @type Number
             * @member KISSY.UA
             */
            nodejs: undefined,

            /**
             * extra browser name
             */
            extraName: undefined,

            /**
             * extra browser version
             */
            extraVersion: undefined
        };

        // ejecta
        if (div && div.getElementsByTagName) {
            // try to use IE-Conditional-Comment detect IE more accurately
            // IE10 doesn't support this method, @ref: http://blogs.msdn.com/b/ie/archive/2011/07/06/html5-parsing-in-ie10.aspx
            div.innerHTML = IE_DETECT_TPL.replace(VERSION_PLACEHOLDER, '');
            s = div.getElementsByTagName('s');
        }

        if (s.length > 0) {

            setTridentVersion(ua, UA);

            // Detect the accurate version
            // 注意：
            //  UA.shell = ie, 表示外壳是 ie
            //  但 UA.ie = 7, 并不代表外壳是 ie7, 还有可能是 ie8 的兼容模式
            //  对于 ie8 的兼容模式，还要通过 documentMode 去判断。但此处不能让 UA.ie = 8, 否则
            //  很多脚本判断会失误。因为 ie8 的兼容模式表现行为和 ie7 相同，而不是和 ie8 相同
            for (v = IE_DETECT_RANGE[0], end = IE_DETECT_RANGE[1]; v <= end; v++) {
                div.innerHTML = IE_DETECT_TPL.replace(VERSION_PLACEHOLDER, v);
                if (s.length > 0) {
                    UA[shell = 'ie'] = v;
                    break;
                }
            }

            // https://github.com/kissyteam/kissy/issues/321
            // win8 embed app
            if (!UA.ie && (ieVersion = getIEVersion(ua))) {
                UA[shell = 'ie'] = ieVersion;
            }

        } else {
            // WebKit
            if ((m = ua.match(/AppleWebKit\/([\d.]*)/)) && m[1]) {
                UA[core = 'webkit'] = numberify(m[1]);

                if ((m = ua.match(/OPR\/(\d+\.\d+)/)) && m[1]) {
                    UA[shell = 'opera'] = numberify(m[1]);
                }
                // Chrome
                else if ((m = ua.match(/Chrome\/([\d.]*)/)) && m[1]) {
                    UA[shell = 'chrome'] = numberify(m[1]);
                }
                // Safari
                else if ((m = ua.match(/\/([\d.]*) Safari/)) && m[1]) {
                    UA[shell = 'safari'] = numberify(m[1]);
                }

                // Apple Mobile
                if (/ Mobile\//.test(ua) && ua.match(/iPad|iPod|iPhone/)) {
                    UA.mobile = 'apple'; // iPad, iPhone or iPod Touch

                    m = ua.match(/OS ([^\s]*)/);
                    if (m && m[1]) {
                        UA.ios = numberify(m[1].replace('_', '.'));
                    }
                    os = 'ios';
                    m = ua.match(/iPad|iPod|iPhone/);
                    if (m && m[0]) {
                        UA[m[0].toLowerCase()] = UA.ios;
                    }
                } else if (/ Android/i.test(ua)) {
                    if (/Mobile/.test(ua)) {
                        os = UA.mobile = 'android';
                    }
                    m = ua.match(/Android ([^\s]*);/);
                    if (m && m[1]) {
                        UA.android = numberify(m[1]);
                    }
                }
                // Other WebKit Mobile Browsers
                else if ((m = ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/))) {
                    UA.mobile = m[0].toLowerCase(); // Nokia N-series, Android, webOS, ex: NokiaN95
                }

                if ((m = ua.match(/PhantomJS\/([^\s]*)/)) && m[1]) {
                    UA.phantomjs = numberify(m[1]);
                }
            }
            // NOT WebKit
            else {
                // Presto
                // ref: http://www.useragentstring.com/pages/useragentstring.php
                if ((m = ua.match(/Presto\/([\d.]*)/)) && m[1]) {
                    UA[core = 'presto'] = numberify(m[1]);

                    // Opera
                    if ((m = ua.match(/Opera\/([\d.]*)/)) && m[1]) {
                        UA[shell = 'opera'] = numberify(m[1]); // Opera detected, look for revision

                        if ((m = ua.match(/Opera\/.* Version\/([\d.]*)/)) && m[1]) {
                            UA[shell] = numberify(m[1]);
                        }

                        // Opera Mini
                        if ((m = ua.match(/Opera Mini[^;]*/)) && m) {
                            UA.mobile = m[0].toLowerCase(); // ex: Opera Mini/2.0.4509/1316
                        }
                        // Opera Mobile
                        // ex: Opera/9.80 (Windows NT 6.1; Opera Mobi/49; U; en) Presto/2.4.18 Version/10.00
                        // issue: 由于 Opera Mobile 有 Version/ 字段，可能会与 Opera 混淆，同时对于 Opera Mobile 的版本号也比较混乱
                        else if ((m = ua.match(/Opera Mobi[^;]*/)) && m) {
                            UA.mobile = m[0];
                        }
                    }

                    // NOT WebKit or Presto
                } else {
                    // MSIE
                    // 由于最开始已经使用了 IE 条件注释判断，因此落到这里的唯一可能性只有 IE10+
                    // and analysis tools in nodejs
                    if ((ieVersion = getIEVersion(ua))) {
                        UA[shell = 'ie'] = ieVersion;
                        setTridentVersion(ua, UA);
                        // NOT WebKit, Presto or IE
                    } else {
                        // Gecko
                        if ((m = ua.match(/Gecko/))) {
                            UA[core = 'gecko'] = 0.1; // Gecko detected, look for revision
                            if ((m = ua.match(/rv:([\d.]*)/)) && m[1]) {
                                UA[core] = numberify(m[1]);
                                if (/Mobile|Tablet/.test(ua)) {
                                    UA.mobile = 'firefox';
                                }
                            }
                            // Firefox
                            if ((m = ua.match(/Firefox\/([\d.]*)/)) && m[1]) {
                                UA[shell = 'firefox'] = numberify(m[1]);
                            }
                        }
                    }
                }
            }
        }

        function getOSInfo() {
            var token = [
                ['Windows NT 5.1', 'winXP'],
                ['Windows NT 6.1', 'win7'],
                ['Windows NT 6.0', 'winVista'],
                ['Windows NT 6.2', 'win8'],
                ['iPad', 'ios'],
                ['iPhone;', 'ios'],
                ['iPod', 'ios'],
                ['Macintosh', 'mac'],
                ['Android', 'android'],
                ['Ubuntu', 'ubuntu'],
                ['Linux', 'linux'],
                ['Windows NT 5.2', 'win2003'],
                ['Windows NT 5.0', 'win2000'],
                ['Windows', 'winOther'],
                ['rhino', 'rhino']
            ];
            for (var i = 0, len = token.length; i < len; ++i) {
                if (ua.indexOf(token[i][0]) != -1) {
                    return token[i][1];
                }
            }
            return 'other';
        }

        if (!os) {
            os = getOSInfo();
        }

        // 国产浏览器专场
        function _mime(where, value, name, nameReg) {
            var mimeTypes = win.navigator.mimeTypes;
            var i;

            // QQ浏览器7.7会报错
            try {
                for (i in mimeTypes) {
                    if (mimeTypes.hasOwnProperty(i)) {
                        if (mimeTypes[i][where] == value) {
                            if (name !== undefined && nameReg.test(mimeTypes[i][name])) return !0;
                            else if (name === undefined) return !0;
                        }
                    }
                }
                return !1;
            } catch (e) {
                return !1;
            }
        }

        var _style;
        var _v8locale;

        // 淘宝浏览器不适用与mime
        if (!_mime('type', 'application/vnd.chromium.remoting-viewer')) {
            _style = 'scoped' in doc.createElement('style');
            _v8locale = 'v8Locale' in win;
            try {
                external = win.external || undefined;
            } catch (err) {
            }

            // 360Browser
            if ((m = ua.match(/360SE/))) {
                extra_name = '360';
            }
            // 先判断sogo 和 猎豹
            else if ((m = ua.match(/SE\s([\d.]*)/)) || (external && 'SEVersion' in external)) {
                extra_name = 'sougou';
                extra_version = numberify(m[1]) || 0.1;
            }
            // Maxthon
            else if ((m = ua.match(/Maxthon(?:\/)+([\d.]*)/)) && external) {
                // issue: Maxthon 3.x in IE-Core cannot be recognised and it doesn't have exact version number
                // but other maxthon versions all have exact version number
                extra_name = 'maxthon';
                try {
                    extra_version = numberify(external['max_version'] || m[1]);
                } catch (ex) {
                    extra_version = 0.1;
                }
            }
            // 360SE or theworld
            // 部分 ff 也会进入到这个判断，直接排除掉
            else if (_style && _v8locale) {
                extra_name = "360se";
            }
            // opera 会是漏网之鱼，排除掉
            else if (!_style && !_v8locale && /Gecko\)\s+Chrome/.test(app_version) && !UA['opera'] && !UA['trident']) {
                extra_name = "360ee";
            }
        }
        // TT
        if ((m = ua.match(/TencentTraveler\s([\d.]*)|QQBrowser\/([\d.]*)/))) {
            extra_name = 'tt';
            extra_version = numberify(m[2]) || 0.1;
        }
        // LB
        else if ((m = ua.match(/LBBROWSER/)) || (external && 'LiebaoGetVersion' in external)) {
            extra_name = 'liebao';
        }
        // TheWorld
        else if ((m = ua.match(/TheWorld/))) {
            extra_name = 'theworld';
            extra_version = 3;
        }
        // Sougou
        else if ((m = ua.match(/TaoBrowser\/([\d.]*)/))) {
            extra_name = 'taobao';
            extra_version = numberify(m[1]) || 0.1;
        }

        UA.os = os;
        UA.core = UA.core || core;
        UA.shell = shell;
        UA.ieMode = UA.ie && doc.documentMode || UA.ie;
        UA.extraName = extra_name;
        UA.extraVersion = extra_version;
        UA.resolution = win.screen.width + "x" + win.screen.height;

        return UA;
    };

    var pvid = makePvid();
    // IE 6 的 quirks 模式中要用 document.body
    var d = doc.compatMode == "BackCompat" ? doc.body : doc.documentElement;
    //var sw = win.screen.width;
    //var sh = win.screen.height;
    //var vw = d.clientWidth;
    //var vh = d.clientHeight;
    //var ref = doc.referrer;
    var loc_protocol = loc.protocol;
    var is_https = "https:" == loc_protocol;
    var start = new Date().getTime();
    var nTimes = 0;
    var goldlog_flag = is_ahot ? "/ahot.1.2" : "/ahot.1.1";
    //var base_url = loc_protocol + "//100.67.31.64" + goldlog_flag + "?logtype=2&cache=";
    var base_url = loc_protocol + "//res.mmstat.com/perf.gif" + "?logtype=2&cache=";

    var Engine = function (config) {
        this.config = config;
    };

    Engine.prototype = {
        startup: function () {
            var that = this;
            this["spm-cnt"] = win["goldlog"] ? win["goldlog"].spm_ab ? win["goldlog"].spm_ab : null : null;

            // that.sendPV();
            // that.sendResourceTiming();
            // 移动端直接执行, PC端aplus已经在onload之后加载该js, 不需要再监听onload事件

            onload(function () {
                that.sendPV();
                that.sendResourceTiming();
            });
        },

        collectPerformanceTiming: function () {
            var timing = performance.timing;
            var params = {};

            if (!timing) {
                return params;
            }

            var mapping = {
                // firstPaint: 'fp',
                navigationStart: 'ns',
                unloadEventStart: 'ues',
                unloadEventEnd: 'uee',
                redirectStart: 'rds',
                redirectEnd: 'rde',
                fetchStart: 'fs',
                domainLookupStart: 'dls',
                domainLookupEnd: 'dle',
                connectStart: 'cs',
                connectEnd: 'ce',
                secureConnectionStart: 'scs',
                requestStart: 'rqs',
                responseStart: 'rps',
                responseEnd: 'rpe',
                domLoading: 'dl',
                domInteractive: 'di',
                domContentLoadedEventStart: 'dcles',
                domContentLoadedEventEnd: 'dclee',
                domComplete: 'dc',
                loadEventStart: 'les',
                loadEventEnd: 'lee'
            };

            var ns = timing.navigationStart;
            var key;
            var value;
            var mappingKey;
            for (key in timing) {
                //if (!timing.hasOwnProperty(key)) continue; // 说明：这儿不能加 hasOwnProperty，否则会过滤掉很多 key
                value = timing[key];
                mappingKey = mapping[key];

                if (mappingKey) {
                    if (value === 0 || value === undefined) {
                        params[mappingKey] = 'na';
                    } else if (typeof value == 'number') {
                        params[mappingKey] = value - ns;
                    }
                }
            }

            // firstPaint
            var fp;
            var chrome_fp;
            if (typeof timing.msFirstPaint == 'number') {
                // by ms
                fp = timing.msFirstPaint;
            } else if (win.chrome && win.chrome.loadTimes && (chrome_fp = win.chrome.loadTimes().firstPaintTime)) {
                // by s
                fp = Math.ceil(chrome_fp * 1000);
            }

            if (typeof fp == 'number') {
                fp = fp - ns;
            } else {
                fp = 'na';
            }
            params.fp = fp;

            return params;
        },

        /**
         * [
         *   {
         *     n: '',
         *     fs: n,
         *     st: n,
         *     ...
         *   },
         *   {}, {}, ...
         * ]
         */
        collectResourceTiming: function () {

            if (!('performance' in win) || !('getEntriesByType' in performance) || !(performance.getEntriesByType('resource') instanceof Array)) {
                return;
            }

            var resTimingObjs = [];
            var resources = performance.getEntriesByType('resource');
            var formatMillSecond = function (millseconds) {
                if (millseconds === undefined || millseconds === 0) {
                    return 0;
                } else {
                    return Math.floor(millseconds);
                }
            };
            for (var index in resources) {
                if (!resources.hasOwnProperty(index)) continue;
                var resource = resources[index];
                if (!resource.initiatorType) {
                    continue;
                }
                resTimingObjs.push({
                    rs: formatMillSecond(resource.redirectStart),
                    re: formatMillSecond(resource.redirectEnd),
                    fs: formatMillSecond(resource.fetchStart),
                    st: formatMillSecond(resource.startTime),
                    dls: formatMillSecond(resource.domainLookupStart),
                    dle: formatMillSecond(resource.domainLookupEnd),
                    cs: formatMillSecond(resource.connectStart),
                    ce: formatMillSecond(resource.connectEnd),
                    scs: formatMillSecond(resource.secureConnectionStart),
                    resqs: formatMillSecond(resource.requestStart),
                    resps: formatMillSecond(resource.responseStart),
                    respe: formatMillSecond(resource.responseEnd),
                    restype: resource.initiatorType,
                    n: resource.name
                });
            }

            return resTimingObjs;
        },

        /**
         * 发送客户端参数
         */
        sendPV: function () {
            if (!(Math.random() < CONFIG.RATE.PERFORMANCE_TIMEING || CONFIG.DEBUG.PERFORMANCE_TIMEING)) {
                return;
            }

            var that = this;

            if (!this.initialized) {
                var descriptor;
                var o_os;
                var o_shell;
                var o_core;
                var o_reso;
                var o_extra;
                var o_extraV;

                var o, b, w, s, m, p = 1;

                var trid;

                try {
                    descriptor = getDescriptorFromUserAgent(ua);

                    // 整理客户端信息
                    o_os = descriptor["os"];
                    o_shell = descriptor["shell"];
                    o_core = descriptor["core"];
                    o_reso = descriptor["resolution"];
                    o_extra = descriptor["extraName"];
                    o_extraV = descriptor["extraVersion"];

                    o = o_os ? o_os + (descriptor[o_os] ? descriptor[o_os] : "") : "";
                    b = o_shell ? o_shell + parseInt(descriptor[o_shell]) : "";
                    w = o_core;
                    s = o_reso;
                    m = o_extra ? o_extra + (o_extraV ? parseInt(o_extraV) : "") : "";

                } catch (err) {
                }

                var params = {
                    p: p,
                    o: dealDefault(o), // os
                    b: dealDefault(b), // browser
                    w: dealDefault(w), // core
                    s: s, // screen pixel
                    mx: m // 国产
                };

                if (this["spm-cnt"]) {
                    params["spm-cnt"] = this["spm-cnt"].join(".");
                }
                if (goldlog && goldlog.pvid) {
                    params['spm-cnt'] += ('.' + goldlog.pvid);
                }
                if (is_https) {
                    params['isps'] = 1;
                }

                if ((trid = getExparams()['trid'])) {
                    params['trid'] = trid;
                }

                setTimeout(function () {
                    // issue #73: performance timing
                    var timingParams = that.collectPerformanceTiming();
                    var key;
                    var value;
                    for (key in timingParams) {
                        if (timingParams.hasOwnProperty(key)) {
                            value = timingParams[key];
                            params[key] || (params[key] = value);
                        }
                    }

                    that.initialized = true;
                    that.sendData(base_url + Math.random(), params);
                }, 0);
            }
        },

        /**
         * #118 resource timing
         *
         * (goldlog.pvid|--|total=x|--|index=y|--|rescnt=z|--|resinfo=xxxxxxx)
         */
        sendResourceTiming: function () {
            var that = this;

            if (!(Math.random() < CONFIG.RATE.RESOURCE_TIMING || CONFIG.DEBUG.RESOURCE_TIMING)) {
                return;
            }

            if (!('performance' in win)) {
                return;
            }

            var delimiter = '|--|';
            //useIframe(CONFIG.ID.IFRAME);

            var rt_data = this.collectResourceTiming();
            var rt_group = this.groupResourceTimingData(rt_data);

            for (var i = 0; i < rt_group.length; i++) {

                /*jshint -W083*/
                (function (index) {

                    // 分段请求间隔发送，防止 abort
                    setTimeout(function () {

                        var requestData = ([
                            goldlog ? goldlog.pvid : '',
                            'total=' + rt_group.length,
                            'index=' + (index + 1),
                            'rescnt=' + rt_group[index].groupItem.length,
                            rt_group[index].groupItemString
                        ]).join(delimiter);

                        that.setResourceTimingForm('content', requestData);

                    }, 500 * (index + 1));

                })(i);
            }
        },

        /**
         * [
         *   {}, {}, ...
         * ]
         *
         * ->
         *
         * [
         *   [{}, {}, ...],
         *   [{}, {}, ...],
         *   ...
         * ]
         *
         * ->
         *
         * [
         *   {
         *     groupItem: [{}, {}, ...],
         *     groupItemString: 'resinfo=a=1|-|b=2|--|resinfo='
         *   },
         *   ...
         * ]
         */
        groupResourceTimingData: function (rtData) {

            var that = this;
            var rt_group = [];

            while (rtData.length) {
                rt_group.push(rtData.splice(0, CONFIG.THRESHOLD.RESOURCE_TIMING));
            }

            for (var i = 0; i < rt_group.length; i++) {
                var rtGroupItem = rt_group[i];
                var rtGroupItemString = '';
                var delimiter = '|--|';
                var keyName = 'resinfo=';

                for (var j = 0; j < rtGroupItem.length; j++) {
                    var resourceObj = rtGroupItem[j];
                    rtGroupItemString += keyName + that.serializeResourceObj(resourceObj) + delimiter;
                }

                rt_group[i] = {
                    groupItem: rtGroupItem,
                    groupItemString: rtGroupItemString
                };
            }

            return rt_group;
        },

        serializeResourceObj: function (obj) {
            var arr = [];
            var split = '|-|';
            var key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    arr.push(key + '=' + encodeURIComponent(obj[key]));
                }
            }
            return arr.join(split);
        },

        setResourceTimingForm: function (name, value) {

            // 每次都创建新表单、iframe 用于发送
            // @see http://gitlab.alibaba-inc.com/alilog/mlog/issues/1
            // 创建表单
            //var el_form = doc.getElementById(CONFIG.ID.FORM);
            var el_form;
            var el_temp;
            var sid = CONFIG.ID.IFRAME + "_" + Math.floor(Math.random() * 1000000);
            var el_iframe = useIframe(sid);

            el_form = doc.createElement('form');
            el_form.style.display = 'none';
            el_form.target = el_iframe.id;
            el_form.method = 'POST';
            el_form.action = '//res.mmstat.com/1.gif';
            el_form.setAttribute('id', CONFIG.ID.FORM);

            // 创建隐藏项
            el_temp = doc.createElement('input');
            el_temp.type = 'hidden';
            el_form.appendChild(el_temp);

            // 创建提交按钮
            var submitButtonEl = doc.createElement('input');
            submitButtonEl.type = 'submit';
            submitButtonEl.value = '';
            el_form.appendChild(submitButtonEl);

            doc.body.appendChild(el_form);

            el_temp = el_form.getElementsByTagName('input')[0];
            el_temp.name = name;
            el_temp.value = value;

            // 提交表单
            el_form.submit();

            el_iframe.onload = function () {
                el_form.parentNode.removeChild(el_form);
                el_iframe.parentNode.removeChild(el_iframe);
            };
        },

        sendData: function (url, data) {
            var img = new Image();
            var rnd_id = "_img_" + Math.random();
            var link_char = url.indexOf("?") == -1 ? "?" : "&";

            // 在全局变量中引用 img，防止 img 被垃圾回收机制过早回收造成请求发送失败
            // 参考：http://hi.baidu.com/meizz/blog/item/a0f4fc0ae9d8be1694ca6b05.html
            win[rnd_id] = img;

            img.onload = img.onerror = function () {
                win[rnd_id] = null;
            };

            img.src = (url) + link_char + obj2param(data);
            img = null; // 删除临时变量的引用
        }
    };

    var stb = (performance.setResourceTimingBufferSize || performance.webkitSetResourceTimingBufferSize);
    stb && stb.call(performance, 200); // 部分浏览器有 150 个元素的限制，设为 200

    win["_ap_agp_heat"] = {
        version: version
    };

    if (Math.random() < CONFIG.RATE.ENGINSTART) {
      var engine = new Engine(default_config);
      engine.startup();
    }

})(window, document);
