
Vue.use(VueStorage, {
    namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
});

URLPrefix.token = Vue.ls.get('member_token')

var page = function (str, content) {
    if (!content) content = '';
    setTimeout(function () {
        window.location.href = str + '.html' + content;
    }, 50);

};
var pageAll = function (str) {
    setTimeout(function () {
        window.open(str);
    }, 50);
};

function Request(name) {
    var str = location.href;
    if (str.indexOf(name) != -1) {
        var num = str.indexOf(name);
        str = str.substring(num + name.length + 1);
        return str;
    }
}

var HTTPurl = window.location.protocol;
var isHTTPurl = HTTPurl.substring(0, HTTPurl.length - 1);
var config = {
    _url: "",
    urls: "/",
    isHTTP: function () {
        var HTTPurl = window.location.protocol;
        var isHTTP = HTTPurl.substring(0, HTTPurl.length - 1);
        return isHTTP;
    },
    getUrl: function (str) {
        var reg = new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]", "ig");
        var r = str.match(reg)
        if (r != null) return r; return null;
    },
    getVideoUrl: function (str) {  //匹配视频地址
        var reg = new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]+.mp4", "ig");
        var r = str.match(reg)
        if (r != null) return r; return null;
    },
    ImgSizeFun: function (Arr, strArr) {
        for (var i = 0; i < strArr.length; i++) {
            Arr[i] = strArr[i] + config.ImgSize;
        }
        return Arr;
    }
};

var ajaxPost = function (site, data, successfun, errorfun) {
    var temp_errorfun = function (xhr, type) {

    };
    if (errorfun) {
        temp_errorfun = errorfun;
    }
    $.ajax({
        type: 'POST',
        url: URLPrefix.api_url + site,
        data: Object.assign(data,{
            times:URLPrefix.times,
            url_sign:URLPrefix.url_sign,
            member_token:URLPrefix.token,
        }),
        dataType: 'json',
        timeout: 30000,
        success: successfun,
        error: temp_errorfun,
        xhrFields: {
            withCredentials: true
        },
    });
};

var ajaxPosts = function (site, data, successfun, errorfun) {
    var temp_errorfun = function (xhr, type) {
    };
    if (errorfun) {
        temp_errorfun = errorfun;
    }
    $.ajax({
        type: 'GET',
        url:  URLPrefix.api_url + site,
        data: Object.assign(data,{
            times:URLPrefix.times,
            url_sign:URLPrefix.url_sign,
            member_token:URLPrefix.token,
        }),
        dataType: 'json',
        timeout: 30000,
        success: successfun,
        error: temp_errorfun,
        xhrFields: {
            withCredentials: true
        },
    });
};


var ajaxGetJsonp = function (site, data, successfun, errorfun) {  //jsonp跨域请求
    var temp_errorfun = function (xhr, type) {
    };
    if (errorfun) {
        temp_errorfun = errorfun;
    }
    $.ajax({
        type: 'GET',
        url: site,
        data: data,
        dataType: 'jsonp',
        timeout: 30000,
        success: successfun,
        error: temp_errorfun,
        xhrFields: {
            withCredentials: true
        },
    });
};