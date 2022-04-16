
function parseParams (data) {
    try {
        var tempArr = [];
        for (var i in data) {
            var key = encodeURIComponent(i);
            var value = encodeURIComponent(data[i]);
            tempArr.push(key + '=' + value);
        }
        return tempArr.join('&');
    } catch (err) {
        return '';
    }
}

function getUrlSearch (url, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url.slice(url.indexOf('?') + 1).match(reg);
    if (r != null) {
        try {
            return decodeURIComponent(r[2]);
        } catch (_e) {
            return null;
        }
    }
    return null;
}

var vmTestInput = {
    isPhoneNo: function (phone) {
        var pattern = '/^1[3456789]\d{9}$/';
        return pattern.test(phone);
    },
    isNumber: function (number) {
        var pattern = '/^[0-9]*$/';
        return pattern.test(number);
    },
    isQQ: function (qq) {
        var pattern = '/^[1-9][0-9]{4,14}/';
        return pattern.test(qq);
    },
};

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

function Request (name) {
    var str = location.href;
    if (str.indexOf(name) != -1) {
        var num = str.indexOf(name);
        str = str.substring(num + name.length + 1);
        return str;
    }
}

/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 */
 function obj2String(obj, arr = [], idx = 0) {
    for (let item in obj) {
      arr[idx++] = [item, obj[item]]
    }
    return new URLSearchParams(arr).toString()
  }

var config = {
    _url: "",
    urls: "/",
    isHTTP: function () {
        var HTTPurl = window.location.protocol;
        return HTTPurl.substring(0, HTTPurl.length - 1);
    },
    getUrl: function (str) {
        var reg = new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]", "ig");
        var r = str.match(reg)
        if (r != null) return r;
        return null;
    },
    getVideoUrl: function (str) {  //匹配视频地址
        var reg = new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]+.mp4", "ig");
        var r = str.match(reg)
        if (r != null) return r;
        return null;
    },
    ImgSizeFun: function (Arr, strArr) {
        for (var i = 0; i < strArr.length; i++) {
            Arr[i] = strArr[i] + config.ImgSize;
        }
        return Arr;
    }
};

var ajaxGet = function (url, data, successfun, errorfun) {
    var temp_errorfun = function (xhr, type) { };
    if (errorfun) {
        temp_errorfun = errorfun;
    }

    const searchStr = obj2String(Object.assign(data, {
        hpt_times: web_config['hpt_times'],
        hpt_sign: web_config['hpt_sign'],
        hpt_token: web_config['token'],
    }))

    fetch(url.indexOf('http') === 0 ? url : web_config['api_url'] + url +'?' + searchStr, {
        method: "GET",
        // headers: {
        //     "Content-Type": "application/json",
        //     Accept: "application/json",
        // },
        // body: JSON.stringify(Object.assign(data, {
        //     hpt_times: web_config['hpt_times'],
        //     hpt_sign: web_config['hpt_sign'],
        //     hpt_token: web_config['token'],
        // })),
    })
    .then(response => response.json())
        .then(successfun)
        .catch((xhr, type) => {
            temp_errorfun(xhr, type)
        });

    // $.ajax({
    //     type: 'GET',
    //     url: url.indexOf('http') === 0 ? url : web_config['api_url'] + url,
    //     data: Object.assign(data, {
    //         hpt_times: web_config['hpt_times'],
    //         hpt_sign: web_config['hpt_sign'],
    //         hpt_token: web_config['token'],
    //     }),
    //     dataType: 'json',
    //     timeout: 30000,
    //     success: successfun,
    //     error: temp_errorfun,
    //     xhrFields: {
    //         withCredentials: true
    //     },
    // });
};

var ajaxPost = function (url, data, successfun, errorfun) {
    var temp_errorfun = function (xhr, type) { };
    if (errorfun) {
        temp_errorfun = errorfun;
    }
    fetch(url.indexOf('http') === 0 ? url : web_config['api_url'] + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(Object.assign(data, {
            hpt_times: web_config['hpt_times'],
            hpt_sign: web_config['hpt_sign'],
            hpt_token: web_config['token'],
        })),
    })
    .then(response => response.json())
        .then(successfun)
        .catch((xhr, type) => {
            temp_errorfun(xhr, type)
        });

    // $.ajax({
    //     type: 'POST',
    //     url: url.indexOf('http') === 0 ? url : web_config['api_url'] + url,
    //     data: Object.assign(data, {
    //         hpt_times: web_config['hpt_times'],
    //         hpt_sign: web_config['hpt_sign'],
    //         hpt_token: web_config['token'],
    //     }),
    //     dataType: 'json',
    //     timeout: 30000,
    //     success: successfun,
    //     error: temp_errorfun,
    //     xhrFields: {
    //         withCredentials: true
    //     },
    // });
};

var ajaxGetJsonp = function (url, data, successfun, errorfun) {  //jsonp跨域请求
    var temp_errorfun = function (xhr, type) {
    };
    if (errorfun) {
        temp_errorfun = errorfun;
    }
    $.ajax({
        type: 'GET',
        url: url,
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

window.mobileUtil = (function (win, doc) {
    var UA = navigator.userAgent,
        isAndroid = /android|adr|linux/gi.test(UA),
        isIOS = /iphone|ipod|ipad/gi.test(UA) && !isAndroid,
        isBlackBerry = /BlackBerry/i.test(UA),
        isWindowPhone = /IEMobile/i.test(UA),
        isWeiBo = /WeiBo/gi.test(UA),
        isMobile = isAndroid || isIOS || isBlackBerry || isWindowPhone,
        isAlipay = /Alipay/gi.test(UA);
    return {
        isAndroid: isAndroid,
        isIOS: isIOS,
        isMobile: isMobile,
        isWeixin: /MicroMessenger/gi.test(UA),
        isQQ: / QQ/gi.test(UA),
        isPC: !isMobile,
        isWeiBo: isWeiBo,
        isAlipay: isAlipay
    };
})(window, document);
document.addEventListener('alpine:init', () => {
    Alpine.data('goods', () => ({
        content:'',
        statusComment:0,
        showComment: false,
        copyStatus:0,
        copyBtnText:'一键复制',
        viewComment(id){
            var $this = this;
            if($this.statusComment==0){
                $this.statusComment = 1;
                ajaxPost("/api/common/goods/viewComment", {
                    num_iid: id,
                }, function (res) {
                    if (res.data.content) {
                        $this.content = res.data.content;
                        $this.statusComment = 2;
                    }
                })
            }
        }, 
        copyContent(copyBtn){
            var $this = this;
            var clipboardBtn = new ClipboardJS(copyBtn, {
                target: function(trigger) {
                    return trigger.nextElementSibling;
                },
                // text () {
                //     return $this.content
                // }
            });

            clipboardBtn.on('success', function (e) {
                e.clearSelection();
                clipboardBtn.destroy();
                $this.copyStatus = 2;
                $this.copyBtnText = "复制成功";
                console.log(e);
                setTimeout(() => {
                    $this.copyStatus = 0;
                    $this.copyBtnText = "一键复制";
                }, 2000);
            });
            clipboardBtn.on('error', function (e) {
                $this.copyStatus = 1;
                $this.copyBtnText = "复制失败";
                console.log(e);
                setTimeout(() => {
                    $this.copyStatus = 0;
                    $this.copyBtnText = "一键复制";
                }, 2000);
            });
        }
    }));
});

(function () {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    // if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    //     document.documentElement.classList.add('dark')
    //   } else {
    //     document.documentElement.classList.remove('dark')
    //   }

    //   // Whenever the user explicitly chooses light mode
    //   localStorage.theme = 'light'

    //   // Whenever the user explicitly chooses dark mode
    //   localStorage.theme = 'dark'

    //   // Whenever the user explicitly chooses to respect the OS preference
    //   localStorage.removeItem('theme')

    var data_urls = window.dataUrls || [];
    for (let i in data_urls)  // x 为属性名
    {
        ajaxPost(data_urls[i]['url'], data_urls[i]['data'], function () { /* TODO document why this function is empty */  })
    }

    if (typeof hljs != 'undefined') {
        hljs.highlightAll();
    }
})();

document.addEventListener('alpine:init', () => {
    Alpine.data('detail', () => ({
        oCommon: {
            id: web_config['item_id'],
            tianmao: 'https://detail.tmall.com/item.htm',
            loadingImg: web_config['static_url'] + "/static/platform/images/web/common/loading.png",
            adminPidlink: '/app/user/info/pid',
            adminLoginlink: '/app/public/login',
            comloginState: false,
        },
        setting:{
            showContent:false,
            copyStatus:0,
            copyBtnText:'一键复制',
            nav: 1,

            modalWeixin:false,
            modalQQ:false,
            modalPid:true,
            modalWenan:false,
        },
        pid:{
            name: "",
            pid: "",
            items:[],
            weixinId:0,
            qqId:0,
        },
        oPublic: {
            reportImg: '',
            loadingShow: false, //是否显示加载(加载动画)
            wholeShow: false, //数据加载完显示(全局)

            setTimeoutClear: '', //定时器(是否显示商品加载)
            setTime: 300,

            isDatanull: false, //商品数据为空的时候
            offsetTop: ''
        },
        publicList: { //商品列表数据
            productList: [], //列表数据

            pageNumber: 1, //页数
            pageInput: 1, //跳到第几页
            count: '', //总的页数
        },
        oHidePopup: {
            hideOnLineLin: false, //在线转链
            hideEchartCheck: false, //成交量
        },
        oItemData: {  //基本数据接口
            itemInfo: {
                goods: {},
                coupon: {},
                price: {},
            }, //商品数据
            picIndex: 1,
            sellerId: '', //用户id,
            itemId: '',
            taobaoImage: [],  //推广长图和主图

            strWeixinArr: [], //存放选中的图片 默认推广长图
            strFriendsArr: [],  //朋友圈推广选择图片
            strPosterArr: [], //长图

            videoImg: '',  //实拍视频图片
            videoLink: '', //实拍视频连接
            imgArr: [],  //实拍图片

            videoHide: true,
            strShorttitle: "", //短标题
            strDesc: "", //推荐语

            swiperIndex: 0,  //第几个轮播图

            friendsIndex: 0,  //朋友圈文案第几个
            wholeShow: false,

            material_id: 0,
            material_info: [],
        },
        taobaoComment: { //淘宝评论图接口
            taobaoDataArr: [],
            taobaoPage: 1,
            taobaoCount: '', //条数
            taobaoCountSign: 0, //条数--滚动记录
            loadmsg: true,
            taobaoLabel: [],
        },
        oHistory: {  //历史数据接口
            IndexShow: 0,
            descRecommend: '', //文案
            salesRecord: '', //历史跑单记录

            shorttitleRecommend: "",  //更多短标题
            shorttitleShow: false, //更多短标题布尔值
            descRecommendShow: false, //更多推荐语布尔值
        },
        oSetting: {  //微信QQ文案模板接口s
            pidArr: [],
            allPidNull: false, //true表示不为空有pid

            navId: 1,
            templateType: 1,
            qq: {
                default: '',
                brand: '',
                custom: '',
                token: "{淘口令}",
                link: '{二合一短链接}',
                url: '{二合一长链接}',
                status: 0,
                id: 0,
                pid: '',
                pidName: '',
                relation_id: null,
                show: false,
            },
            weixin: {
                default: '',
                brand: '',
                custom: '',
                token: "{淘口令}",
                link: '{二合一短链接}',
                url: '{二合一长链接}',
                status: 0,
                // qrcode: '',
                qrcode: web_config['static_url'] + "/static/platform/images/web/detail/detail_default_qrimg.png",
                id: 0,
                pid: '',
                pidName: '',
                relation_id: null,
                show: false,
                linkChecked: false,
                qrcodeChecked: false,
            },
            other: {
                id: 0,
                pid: '',
                pidName: '',
                relation_id: null,
            },
            friend: {
                qrcodeView: true,
            },
            poster: {
                picUrl1: '',
                picUrl2: '',
            },
            comwxqqnav: [
                {
                    number: 0,
                    name: "修改微信文案",
                    bool: true,
                },
                {
                    number: 1,
                    name: "修改QQ文案",
                    bool: true,
                },
            ],
            wxqqIndex: 0,
            listArrWx: [
                { name: "短标题", },
                { name: "介绍", },
                { name: "店铺类型", },
                { name: "原价", },
                { name: "券后价", },
                { name: "销量", },
                { name: "佣金比例", },
                { name: "领券链接", },
                { name: "券满", },
                { name: "券额", },
                { name: "优惠券剩余数量", },
                { name: "优惠券有效限期", },
                { name: "二合一长链接", },
                { name: "二合一短链接", },
                { name: "淘口令", },
            ],
            listArrQq: [
                { name: "短标题", },
                { name: "介绍", },
                { name: "店铺类型", },
                { name: "原价", },
                { name: "券后价", },
                { name: "销量", },
                { name: "佣金比例", },
                { name: "领券链接", },
                { name: "券满", },
                { name: "券额", },
                { name: "优惠券剩余数量", },
                { name: "优惠券有效限期", },
                { name: "二合一长链接", },
                { name: "二合一短链接", },
                { name: "淘口令", },
            ],
        },
        oVideo: {  //视频控件
            playBool: false,  //是否播放
            videooIndex: -1,   //选中了第几个视频

            pLink: ' 0',  //播放进度条
            oVoice: true,  //是否关闭声音  true为关闭声音 false为有声

            videoData: [],

            oTime: 0,

            videoitemId: '',  //视频id

            IndexSave: '',

            loadIcon: false,    //是否有加载效果
            videosetClear: '',
            videooneIcon: false
        },
        dataTime: {  //倒计时
            itemType: 0, //0 正常单子 1快抢 2快抢中 3预告单
            endtime: '',
            hours: '00',
            Minutes: '00',
            Seconds: '00',
            oClearInterval: '',
            countBoll: true,
        },
        oEchartToday: { //日销量Tab块 走势图
            check_hour: '',
            sale: [],
            saletime: [],
            tabShow: 0,
            historyprice: [],
            historyMinprice: '',  //历史最低价
            historytime: []
        },
        copyImg(picUrl) {
            return 'https://img.marsnews.work/imgcdn/' + MD5(picUrl) + '.jpg?src=' + encodeURIComponent(picUrl);
        },
        ajaxInfo() {
            var self = this;
            ajaxPost("/api/common/goods/view", {
                id: self.oCommon.id
            }, function (data) {
                if (data.code == 0) {
                    self.oItemData.itemInfo = data.data.item;
                    self.oItemData.sellerId = self.oItemData.itemInfo.goods.user_num_id;
                    self.oItemData.itemId = self.oItemData.itemInfo.goods.num_iid;

                    var taobaoArr = self.oItemData.itemInfo.goods.pic_urls;
                    if (taobaoArr) {
                        for (const element of taobaoArr) {
                            self.oItemData.taobaoImage.push(element)
                        }
                    }
                    // self.oItemData.taobaoImage.push(self.oItemData.itemInfo.itempic_copy);
                    // self.oItemData.strWeixinArr.push(self.oItemData.itemInfo.itempic_copy);
                    if (taobaoArr) {
                        self.oItemData.strWeixinArr.push(self.oItemData.taobaoImage[self.oItemData.taobaoImage.length - 1]);
                    }

                    if (taobaoArr) {
                        for (var i = 0; i < taobaoArr.length; i++) {
                            self.oItemData.strFriendsArr.push(taobaoArr[i])
                        }
                    }

                    if (taobaoArr) {
                        self.oItemData.strPosterArr.push(self.oItemData.taobaoImage[0]);
                    }

                    if (self.oItemData.itemInfo.videos) {
                        self.oItemData.videoImg = self.oItemData.itemInfo.videos.pic_url;
                        self.oItemData.videoLink = self.oItemData.itemInfo.videos.url;
                    }

                    self.oItemData.strShorttitle = self.oItemData.itemInfo.goods.d_title;
                    if (!self.oItemData.strShorttitle) {
                        self.oItemData.strShorttitle = self.oItemData.itemInfo.goods.title;
                    }
                    // self.oItemData.strDesc = self.oItemData.itemInfo.goods.comment;
                    self.oItemData.strDesc = self.oItemData.itemInfo.goods.description;
                    if (self.oItemData.strDesc == null) {
                        self.oItemData.strDesc = '';
                    }

                    self.dataTime.endtime = self.oItemData.itemInfo.start_time;
                    self.dataTime.itemType = self.oItemData.itemInfo.item_type;
                    if (self.dataTime.itemType > 0) {
                        self.FunCountDown();
                    }
                    self.$nextTick(function () {
                        self.oItemData.wholeShow = true;
                        self.ajaxComment(true);
                        self.ajaxhistory();
                        self.ajaxTodaySales();
                        self.ajaxset();  //微信QQ文案模板接口
                        // self.ajaxVideo();
                    });
                } else {
                    console.log(data.message)
                }
            });
            this.queryPid();
        },
        ajaxhistory() { //历史数据
            var self = this;
            ajaxPost("/api/common/goods/history", {
                num_iid: self.oItemData.itemId
            }, function (data) {
                if (data.data.content && data.data.content.status == '1') {
                    self.oHistory.salesRecord = data.data.content.sales_record;
                    self.oItemData.taobaoImage = self.oItemData.taobaoImage.concat(data.data.content.more_copyimage);
                    self.oHistory.shorttitleRecommend = data.data.content.itemshorttitle_recommend;
                    self.oHistory.descRecommend = data.data.content.itemdesc_recommend;

                    self.$nextTick(function () {
                        self.oHistory.salesRecord.forEach(function (item, index) {
                            self.oEchartToday.historyprice.push(parseFloat(item
                                .itemendprice));
                            self.oEchartToday.historytime.push((item.time).substring(5, (item.time).length));
                        });
                        self.oEchartToday.historyMinprice = Math.min.apply(Math, self.oEchartToday.historyprice);
                    })
                }
            })
        },
        echartOption(oTime, oSales, str) { //走势图
            var dom = document.getElementById("echartToday");
            var myChart = echarts.init(dom);
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#4D75FF'
                        }
                    }
                },
                grid: {
                    top: '25',
                    left: '5',
                    right: '25',
                    bottom: '0px',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: oTime
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    name: str,
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: { //折线拐点的样式
                        normal: {
                            color: '#4D75FF', //折线拐点的颜色
                        }
                    },
                    lineStyle: { //线条的样式
                        normal: {
                            color: '#4D75FF', //折线颜色
                        }
                    },
                    data: oSales
                }]
            };
            setTimeout(function () {
                myChart.setOption(option, true);
            }, 50)
        },
        tabBtn(index) { //切换图标
            var self = this;
            switch (index) {
                case 0:
                    self.echartOption(self.oEchartToday.saletime, self.oEchartToday.sale, '日销量');
                    break;
                case 1:
                    self.echartOption(self.oEchartToday.historytime, self.oEchartToday.historyprice,
                        '历史价格');
                    break;
                default:
            }
            this.oEchartToday.tabShow = index;
        },
        ajaxTodaySales() { //走势图
            var self = this;
            ajaxPost("/api/common/goods/get_today_sales", {
                num_iid: self.oItemData.itemId
            }, function (data) {
                if (data.data.content.status == '1') {
                    var DATA = data.data.content.data;
                    self.oEchartToday.check_hour = DATA.check_hour;
                    self.oEchartToday.saletime = DATA.saletime;
                    self.oEchartToday.sale = DATA.sale;
                    self.echartOption(self.oEchartToday.saletime, self.oEchartToday.sale,
                        '日销量');
                }
            })
        },
        countDown(endtime) { //倒计时方法
            var self = this;
            var formatNumber = function (n) {
                n = n.toString();
                return n[1] ? n : '0' + n; //补零
            };
            var cd = {};
            var stamp = Number(endtime) * 1000 - Number(new Date().getTime());
            if (stamp >= 0) {
                cd.d = Number(Math.floor(stamp / (24 * 3600 * 1000)));
                self.dataTime.hours = Number(formatNumber(parseInt((stamp / 1000 / 3600) % 24))) + cd.d * 24;  //小时
                self.dataTime.Minutes = formatNumber(parseInt((stamp / 1000 / 60) % 60));   //分钟
                self.dataTime.Seconds = formatNumber(parseInt(stamp / 1000 % 60));      //秒
            } else {
                self.dataTime.countBoll = false;
                self.dataTime.hours = '00';
                self.dataTime.Minutes = '00';
                self.dataTime.Seconds = '00';
                clearInterval(self.dataTime.oClearInterval);
            }
        },
        FunCountDown() {  //倒计时 -函数
            var self = this;
            self.dataTime.oClearInterval = setInterval(function () {
                var time = self.countDown(self.dataTime.endtime);
            }, 1000);
        },
        ajaxVideo() {  //视频 --数据接口
            var self = this;
            ajaxPost("/api/common/goods/trill_video_list", {
                num_iid: self.oItemData.itemId,
                p: self.publicList.pageNumber,
            }, function (data) {
                if (data.data.content.status == '1') {
                    self.publicList.productList = data.data.content.data;
                    self.publicList.count = data.data.content.count;
                }
            })
        },
        adderImg(event) { //显示图片
        },
        adderImg1(event) { //显示图片
        },
        copyBtn(clickClass, copyClass) { //复制公共方法
            var clipboard = new ClipboardJS(clickClass, {
                target() {
                    return document.querySelector(copyClass);
                },
                // container: document.querySelector(copyClass),
            });
            clipboard.on('success', function (e) {
                e.clearSelection();
                clipboard.destroy();
            });
            clipboard.on('error', function (e) {
                console.log('由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！')
            });
        },
        seeVideo(url) {  //淘宝评论视频
            var video =
                '<video class="comvideo" preload="auto" webkit-playsinline="true" playsinline="true" controls autoplay>' +
                '<source src=' + url + ' type="video/mp4">' +
                '<source src=' + url + ' type="video/ogg">' +
                '<source src=' + url + ' type="video/webm">' +
                '</video>';
        },
        seetcomment() {  //淘宝评论-调起
            if (this.taobaoComment.taobaoCount > 0) {
                this.ajaxRatelabel();
                this.taobaoscroll();
            } else {
                console.log('没有评论哦')
            }
        },
        ajaxComment(callback) {  //淘宝评论接口
            var self = this;
            ajaxPost("/api/common/goods/get_ratelist", {
                num_iid: self.oItemData.itemId,
                pageno: self.taobaoComment.taobaoPage,
                pagesize: 10,
            }, function (data) {
                if (data.data.content.status == '1') {
                    self.taobaoComment.taobaoDataArr = self.taobaoComment.taobaoDataArr.concat(data.data.content.data);
                    self.taobaoComment.taobaoCountSign = data.data.content.count;
                    if (self.taobaoComment.taobaoPage <= parseInt(self.taobaoComment.taobaoCountSign / 10)) {
                        self.taobaoComment.taobaoPage += 1;
                        self.taobaoComment.loadmsg = true;
                    } else {
                        self.taobaoComment.loadmsg = false;
                    }
                    self.$nextTick(function () {
                        if (callback) {
                            self.taobaoComment.taobaoCount = data.data.content.count;
                        }
                    })
                }
            })
        },
        taobaoscroll() {  //淘宝评论--滚动加载
            var self = this;
            var nScrollHight = 0;
            var nScrollTop = 0;
            var nDivHight = $(".popup-taobao-comment").height();
            $(".popup-taobao-comment").scroll(function () {
                nScrollHight = $(this)[0].scrollHeight;
                nScrollTop = $(this)[0].scrollTop;
                if (parseInt(nScrollTop + nDivHight) + 10 >= nScrollHight) {
                    if (self.taobaoComment.loadmsg) {
                        self.taobaoComment.loadmsg = false;
                        self.ajaxComment();
                    }
                }
            });
        },
        ajaxRatelabel() {  //淘宝评论--标签
            var self = this;
            var link = "https://rate.tmall.com/listTagClouds.htm?itemId=" + self.oItemData.itemId + "&isAll=true&isInner=true&t=1570446988539&groupId=&_ksTS=1570446988540_680";
            ajaxGetJsonp(link, {},
                function (data) {
                    if (data.tags.tagClouds) {
                        self.taobaoComment.taobaoLabel = data.tags.tagClouds;
                    }
                }
            )
        },
        ajaxGetVideo() {  //获取实拍视频
            var self = this;
            var videolink = "https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?jsv=2.4.8&appKey=12574478&t=1554712612690&sign=59ff83eeadc620f65b072a198f4cf178&api=mtop.taobao.detail.getdetail&v=6.0&dataType=jsonp&ttid=2017%40taobao_h5_6.6.0&AntiCreep=true&type=jsonp&data=%7B%22itemNumId%22%3A%22" + self.oItemData.itemId + "%22%7D";
            ajaxGetJsonp(videolink, {},
                function (data) {
                    var arr = [], val = '', arr_theVideos = [], len_theVideos = 0;
                    if (data.data.apiStack) {
                        var apiStack = data.data.apiStack, len_apiStack = apiStack.length;
                        for (var i = len_apiStack; i--;) {
                            val = JSON.parse(apiStack[i].value);

                            arr_theVideos = val.item.videos;
                            if (arr_theVideos) {
                                len_theVideos = arr_theVideos.length;
                                for (var l = len_theVideos; l--;) {
                                    arr.unshift(arr_theVideos[l]);
                                }
                            } else {
                                console.log('没有商品视频哦')
                                self.oItemData.videoHide = false;
                                return;
                            }
                        }
                        if (arr.length <= 0) {
                            console.log('没有商品视频哦')
                            self.oItemData.videoHide = false;
                            return;
                        }
                        self.$nextTick(function () {
                            for (const item of arr) {
                                self.oItemData.videoLink = item.url;
                                self.oItemData.videoImg = item.videoThumbnailURL;
                            }
                        })
                    } else {
                        console.log('点击立即跳转到淘宝去拉动滑动条或登录才能获取到实拍视频哦')
                        pageAll(data.data.url);
                    }

                })
        },
        loginFun() { //跳到登录页面去
            var url = encodeURIComponent(encodeURIComponent(window.location.href));
            var strurl = this.oCommon.adminLoginlink + '?returnurl=' + url;
            w
        },
        picBtn() {  //跳到合成图片去
            var strurl = '/tools/spic?shopUrl=https://item.taobao.com/item.htm?id=' + this.oItemData.itemId;
            pageAll(strurl);
        },
        tljBtn() {  //跳到合成图片去
            var strurl = '/app/user/market/tlj?href=https://item.taobao.com/item.htm?id=' + this.oItemData.itemId;
            pageAll(strurl);
        },
        wxBtn() {  //跳到合成图片去
            var strurl = '/tools/wx?href=https://item.taobao.com/item.htm?id=' + this.oItemData.itemId;
            pageAll(strurl);
        },
        shorttitleBtn(item) { //短标题文案
            this.oItemData.strShorttitle = item;
            this.oHistory.shorttitleShow = false
        },
        descRecommendBtn(item) { //推荐语文案
            this.oItemData.strDesc = item;
            this.oHistory.descRecommendShow = false
        },
        choiceBtn(type, item, index) { //实拍图选择
            if (type == 1) {
                if (this.oItemData.strWeixinArr.length == 0) {
                    this.oItemData.strWeixinArr.push(item);
                } else {
                    var xIndex = this.oItemData.strWeixinArr.indexOf(item);
                    if (xIndex >= 0) {
                        this.oItemData.strWeixinArr.splice(xIndex, 1);
                        xIndex = null;
                    } else {
                        this.oItemData.strWeixinArr.push(item);
                    }
                }
            }
            else if (type == 2) {
                if (this.oItemData.strFriendsArr.length == 0) {
                    this.oItemData.strFriendsArr.push(item);
                } else {
                    var xIndex = this.oItemData.strFriendsArr.indexOf(item);
                    if (xIndex >= 0) {
                        this.oItemData.strFriendsArr.splice(xIndex, 1);
                        xIndex = null;
                    } else {
                        this.oItemData.strFriendsArr.push(item);
                    }
                }
            }
            else if (type == 3) {
                this.oItemData.strPosterArr = [];
                this.oItemData.strPosterArr.push(item);
            }
            else if (type == 0) {
                this.oSetting.friend.qrcodeView = !this.oSetting.friend.qrcodeView;
            }
        },
        ajaxset() {   //微信QQ文案模板接口
            var self = this;
            ajaxPost("/api/common/stat/get_setting_info", {}, function (res) {
                if (res.code == 0) {
                    var setDATA = res.data.setting_data;

                    self.oSetting.qq.default = setDATA.content_qq_default;
                    self.oSetting.qq.brand = setDATA.content_qq_default;
                    self.oSetting.qq.custom = setDATA.content_qq;

                    self.oSetting.weixin.default = setDATA.content_default;
                    self.oSetting.weixin.brand = setDATA.content_default;
                    self.oSetting.weixin.custom = setDATA.content;

                    self.oSetting.weixin.id = res.data.weixin_pid_id;
                    self.oSetting.qq.id = res.data.qq_pid_id;
                    self.oSetting.other.id = res.data.other_pid_id;

                    //处理pid
                    self.oSetting.pidArr = res.data.items;
                    res.data.items.forEach(function (item, index) {
                        if (item.id == self.oSetting.weixin.id) {
                            self.oSetting.weixin.pid = item.pid;
                            self.oSetting.weixin.pidName = item.pid_name;
                            self.oSetting.weixin.relation_id = item.relation_id;
                        }
                        else if (item.id == self.oSetting.qq.id) {
                            self.oSetting.qq.pid = item.pid;
                            self.oSetting.qq.pidName = item.pid_name;
                            self.oSetting.qq.relation_id = item.relation_id;
                        }
                        else if (item.id == self.oSetting.other.id) {
                            self.oSetting.other.pid = item.pid;
                            self.oSetting.other.pidName = item.pid_name;
                            self.oSetting.other.relation_id = item.relation_id;
                        }
                    });
                    if (self.oSetting.weixin.id == 0 && self.oSetting.qq.id > 0) {
                        self.oSetting.weixin.id = self.oSetting.qq.id
                        self.oSetting.weixin.pid = self.oSetting.qq.pid
                        self.oSetting.weixin.pidName = self.oSetting.qq.pid_name;
                        self.oSetting.weixin.relation_id = self.oSetting.qq.relation_id;
                    }
                    if (self.oSetting.qq.id == 0 && self.oSetting.weixin.id > 0) {
                        self.oSetting.qq.id = self.oSetting.weixin.id
                        self.oSetting.qq.pid = self.oSetting.weixin.pid
                        self.oSetting.qq.pidName = self.oSetting.weixin.pid_name;
                        self.oSetting.qq.relation_id = self.oSetting.weixin.relation_id;
                    }

                    if (self.oSetting.qq.id == 0 && self.oSetting.weixin.id == 0 && self.oSetting.other.id > 0) {
                        self.oSetting.qq.id = self.oSetting.other.id
                        self.oSetting.qq.pid = self.oSetting.other.pid
                        self.oSetting.qq.pidName = self.oSetting.other.pid_name;
                        self.oSetting.qq.relation_id = self.oSetting.other.relation_id;

                        self.oSetting.weixin.id = self.oSetting.other.id
                        self.oSetting.weixin.pid = self.oSetting.other.pid
                        self.oSetting.weixin.pidName = self.oSetting.other.pid_name;
                        self.oSetting.weixin.relation_id = self.oSetting.other.relation_id;
                    }

                    if (self.oSetting.qq.id == 0 && self.oSetting.weixin.id == 0 && self.oSetting.other.id == 0) {
                        self.oSetting.allPidNull = false;
                    } else {
                        self.oSetting.allPidNull = true;
                    }
                } else {
                    self.oSetting.allPidNull = false;
                }
            })
        },
        filtersContent(value) { //微信QQ文案模板--截取
            var self = this;

            var content = value.default;
            if (self.oSetting.templateType == 2) {
                content = value.brand;
            }
            else if (self.oSetting.templateType == 3) {
                content = value.custom;
            }
            if(content==null){
                content = '';
            }

            content = content.replace(/\{标题\}/g, self.oItemData.strShorttitle);
            content = content.replace(/\{短标题\}/g, self.oItemData.strShorttitle);
            if(self.oItemData.itemInfo && self.oItemData.itemInfo.price && self.oItemData.itemInfo.price.price){
                content = content.replace(/\{在售价\}/g, parseFloat(self.oItemData.itemInfo.price.price));
                content = content.replace(/\{券后价\}/g, '<span>' + parseFloat(self.oItemData.itemInfo.price.buy_price) + '</span>');
            }
            content = content.replace(/\{推荐语\}/g, self.oItemData.strDesc);
            // content = content.replace(/\{介绍\}/g, self.oItemData.strDesc);

            if(self.oItemData.itemInfo && self.oItemData.itemInfo.coupon && self.oItemData.itemInfo.price.coupon_money){
                content = content.replace(/\{券额\}/g, '<span>' + parseFloat(self.oItemData.itemInfo.coupon.coupon_money) + '</span>');
            }
            content = content.replace(/\{图片\}/g, '');

            if (value.token != '' || value.link != '') {
                content = content.replace(/\{介绍\}/g, self.oItemData.strDesc);
            }
            else {
                content = content.replace(/\{介绍\}/g, '文案');
            }

            content = content.replace(/\{淘口令\}/g, '<span>' + value.token + '</span>');
            content = content.replace(/\{二合一\}/g, '<span>' + value.link + '</span>');
            content = content.replace(/\{二合一长链接\}/g, '<span>' + value.url + '</span>');
            content = content.replace(/\{二合一短链接\}/g, '<span>' + value.link + '</span>');
            content = content.replace(/\{二合一淘点金短链接\}/g, '<span>' + value.link + '</span>');
            content = content.replace(/\{二合一淘口令\}/g, '<span>' + value.token + '</span>');
            return content;
        },
        shutBtn() {  //微信QQ弹窗模板-关闭弹窗
            this.wxqqnavReset();
        },
        wxqqnavReset() { ////微信QQ弹窗模板-重置
            this.oSetting.wxqqIndex = 0;
            this.oSetting.comwxqqnav[0].bool = true;
            this.oSetting.comwxqqnav[1].bool = true;
        },
        popupwxqqBtn(number) {  ////微信QQ弹窗模板-切换按钮  
            if (number == 0 || number == 1) {
                if (web_config['token'] == '') {
                    this.loginFun();
                } else {
                    this.oSetting.wxqqIndex = number;
                }
            } else {
                this.oSetting.wxqqIndex = number;
            }
        },
        customizedAdd(item, sign) {  //微信QQ弹窗模板 -- 添加标签
            if (sign == 'wx') {
                document.getElementById('textareaWx').focus();
                this.insertAtCaret('{' + item.name + '}');
            } else {
                document.getElementById('textareaQq').focus();
                this.insertAtCaret('{' + item.name + '}');
            }
        },
        insertAtCaret(html) {  //微信QQ弹窗模板 -- 写入标签
            var sel, range;
            if (window.getSelection) {
                // IE9 and non-IE
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();
                    var el = document.createElement("div");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(),
                        node, lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            } else if (document.selection && document.selection.type != "Control") {
                // IE < 9
                document.selection.createRange().pasteHTML(html);
            }
        },
        templateDefault(sign) { //微信QQ弹窗模板 -- 恢复默认模板
            if (sign == 'wx') {
                document.getElementById("textareaWx").innerHTML = this.oSetting.weixin.default;
            } else {
                document.getElementById("textareaQq").innerHTML = this.oSetting.qq.default;
            }
        },
        saveTemplateBtn(number, sign) { //微信QQ弹窗模板 -- 保存模板
            var self = this;
            var Text = "";
            if (sign == 'wx') {
                Text = document.getElementById("textareaWx").innerHTML;
            } else {
                Text = document.getElementById("textareaQq").innerHTML;
            }
            if (Text == '') {
                return;
            }

            ajaxPost("/api/user/info/template/updateItem", {
                share_set: number,
                set_content: Text
            }, function (data) {
                if (data.status == '1') {
                    console.log(data.message)
                    self.wxqqnavReset();
                    self.ajaxset();
                } else {
                    console.log(data.message)
                    self.wxqqnavReset();
                }
                if (number == 1) {
                    self.oSetting.weixin.custom = Text
                }
                else {
                    self.oSetting.qq.custom = Text
                }
            }, function () {
                self.wxqqnavReset();
            })
        },
        templateCelarBtn(sign) { //微信QQ弹窗模板 -- 清空
            if (sign == 'wx') {
                document.getElementById("textareaWx").innerHTML = "";
            } else {
                document.getElementById("textareaQq").innerHTML = "";
            }
        },
        setPidBtn(item, sign) { //pid -- 保存PID设置
            if (sign == 'wx') {
                this.oSetting.weixin.pid = item.pid;
                this.oSetting.weixin.pidName = item.pid_name;
                this.oSetting.weixin.relation_id = item.relation_id;
                this.oSetting.weixin.id = item.id;
                this.oSetting.weixin.show = false;
            } else {
                this.oSetting.qq.pid = item.pid;
                this.oSetting.qq.pidName = item.pid_name;
                this.oSetting.qq.relation_id = item.relation_id;
                this.oSetting.qq.id = item.id;
                this.oSetting.qq.show = false;
            }
        },
        taobaoTokenBtn(number, clickClass, copyClass) { //淘口令和转二合一
            var self = this;
            if (web_config['token'] == '') {
                self.loginFun();
                return;
            }
            if (!self.oSetting.allPidNull) {
                self.PidFun();
                return;
            }
            var relationid, pid;
            switch (number) { //0微信 1qq 2朋友圈 3长图
                case 0:
                case 1:
                case 2:
                    relationid = self.oSetting.weixin.relation_id;
                    pid = self.oSetting.weixin.pid;
                    self.oSetting.weixin.status = 1;
                    break;
                case 3:
                case 4:
                    relationid = self.oSetting.weixin.relation_id;
                    pid = self.oSetting.weixin.pid;
                    break;
                default:
            }
            if (number == 3 || number == 4) {
                if (self.oSetting.weixin.qrcode != '') {
                    if (number == 3) {
                        self.unitePic('.poster1', '.copy_poster_hide1', function (obj) {
                            self.oSetting.poster.picUrl1 = obj.img;
                        });
                    }
                    else if (number == 4) {
                        self.unitePic('.poster2', '.copy_poster_hide2', function (obj) {
                            self.oSetting.poster.picUrl2 = obj.img;
                        });
                    }
                    return;
                }
            }
            ajaxPost("/api/common/goods/transform", {
                type: number,
                activity_id: self.oItemData.itemInfo.coupon.activity_id,
                num_iid: self.oItemData.itemId,
                title: self.oItemData.itemInfo.goods.title,
                itempic: self.oItemData.itemInfo.goods.pic_url,
                relationid: relationid,
                pid: pid
            }, function (data) {
                if (data.code == 0) {
                    if (number == 1) {
                        if (data.data.goods.click.tao_token) {
                            self.oSetting.qq.token = data.data.goods.click.tao_token;
                        }
                        if (data.data.goods.click.short_url) {
                            self.oSetting.qq.link = data.data.goods.click.short_url;
                        }
                        if (data.data.goods.click.url) {
                            self.oSetting.qq.url = data.data.goods.click.url;
                        }
                    }
                    else {
                        if (data.data.goods.click.tao_token) {
                            self.oSetting.weixin.token = data.data.goods.click.tao_token;
                        }
                        if (data.data.goods.click.short_url) {
                            self.oSetting.weixin.link = data.data.goods.click.short_url;
                        }
                        if (data.data.goods.click.url) {
                            self.oSetting.weixin.url = data.data.goods.click.url;
                        }
                        if (data.data.goods.click.qrcode) {
                            self.oSetting.weixin.qrcode = data.data.goods.click.qrcode;
                        }
                    }
                    if (number == 0) {
                        self.oSetting.weixin.status = 2;
                        document.querySelector(clickClass).click();
                    }
                    else if (number == 1) {
                        self.oSetting.qq.status = 2;
                        document.querySelector(clickClass).click();
                    }
                    else if (number == 2) {
                        self.oSetting.weixin.status = 2;
                    }
                    if (number == 3) {
                        self.oSetting.weixin.status = 2;
                        self.unitePic('.poster1', '.copy_poster_hide1', function (obj) {
                            self.oSetting.poster.picUrl1 = obj.img;
                        });
                    }
                    else if (number == 4) {
                        self.oSetting.weixin.status = 2;
                        self.unitePic('.poster2', '.copy_poster_hide2', function (obj) {
                            self.oSetting.poster.picUrl2 = obj.img;
                        });
                    }
                } else {
                    console.log(data.message)
                }
            }, function () {
                console.log('网络错误，请重新检查网络！')
            })
        },
        PidFun() { //跳到设置Pid页面去
            var self = this;
            console.log('未设置pid,请前往个人中心设置pid!')
            pageAll(self.oCommon.adminPidlink);
        },
        friendsBtn(number) {
            this.oItemData.friendsIndex += number;
        },
        seeImg(url) { //双击预览图片
        },
        videoPlayBtn(index) {  //视频 - 播放
            var self = this;
            self.oVideo.videooIndex = index;
            setTimeout(function () {
                var myVideo = self.$refs.myVideo[0];
                if (myVideo != undefined) {
                    if (myVideo.error == null) {
                        myVideo.play();
                        self.$refs.myVideo[0].addEventListener("waiting", function () {
                            if (self.oVideo.videooneIcon) {
                                self.oVideo.videosetClear = setTimeout(function () {
                                    self.oVideo.videooneIcon = false;
                                    self.oVideo.loadIcon = true;
                                }, 100);
                            } else {
                                self.oVideo.loadIcon = true;
                            }
                        });
                        self.$refs.myVideo[0].addEventListener("playing", function () {
                            self.oVideo.loadIcon = false;
                        });
                    } else {
                        self.oVideo.playBool = false;
                    }
                    myVideo.addEventListener('play', function () {
                        self.videoEnd();
                        self.oVideo.playBool = true;
                    });
                }
            }, 100)
        },
        videostopBtn() {  //暂停
            var self = this;
            this.$refs.myVideo[0].pause();
            this.$refs.myVideo[0].addEventListener('pause', function () {
                self.oVideo.playBool = false;
                self.oVideo.loadIcon = false;
            });
        },
        videoEnd() {  //播放结束
            var self = this;
            self.$refs.myVideo[0].addEventListener("ended", function () {
                self.$refs.myVideo[0].pause();
                self.oVideo.playBool = false;
            });
        },
        videoExtendBtn() {
            this.oDyvideo.videoExtend = false;
        },
        videomoveinIcon(name, event) { //商品图标鼠标移入
        },
        setTemplateType(id) {
            this.oSetting.templateType = id;
        },
        unitePic(copyClass, copyImgClass, callback) {
            html2canvas(document.querySelector(copyClass), {
                allowTaint: false,
                useCORS: true,
                // scale: scale, // 添加的scale 参数
                // canvas: canvas, //自定义 canvas
                logging: true, //日志开关，便于查看html2canvas的内部执行流程
            }).then(function (canvas) {
                var b = canvas.toDataURL("image/png", 1.0);

                var image = new Image();
                image.src = b;
                document.querySelector(copyImgClass).append(image);
                callback({
                    img: b
                });
            })
        },
        downImgMake(picUrl) {
            this.downloadIamge(picUrl, Math.round(1E3 * Math.random()))
        },
        downloadIamge(picUrl, b) {
            var d = new Image;
            d.setAttribute("crossOrigin", "anonymous");
            d.onload = function () {
                var a = document.createElement("canvas");
                a.width = d.width;
                a.height = d.height;
                a.getContext("2d").drawImage(d, 0, 0, d.width, d.height);
                a = a.toDataURL("image/png");
                var f = document.createElement("a"),
                    e = new MouseEvent("click");
                f.download = b || "图片";
                f.href = a;
                f.dispatchEvent(e)
            };
            d.src = picUrl
        },
        copyContent(copyBtn){
            var $this = this;
            var clipboardBtn = new ClipboardJS(copyBtn, {
                target: function(trigger) {
                    return trigger.nextElementSibling;
                },
            });

            clipboardBtn.on('success', function (e) {
                e.clearSelection();
                clipboardBtn.destroy();
                $this.setting.copyStatus = 2;
                $this.setting.copyBtnText = "复制成功";
                console.log($this.setting.copyBtnText)
                setTimeout(() => {
                    $this.setting.copyStatus = 0;
                    $this.setting.copyBtnText = "一键复制";
                }, 2000);
            });
            clipboardBtn.on('error', function (e) {
                $this.setting.copyStatus = 1;
                $this.setting.copyBtnText = "复制失败";
                setTimeout(() => {
                    $this.setting.copyStatus = 0;
                    $this.setting.copyBtnText = "一键复制";
                }, 2000);
            });
        },
        addPid() {
            var $this = this;
            ajaxPost("/api/user/market/resource/update", {
                name: $this.pid.name,
                pid: $this.pid.pid,
                type:'pid',
            }, function () {
                $this.queryPid()
            })
        },
        queryPid() { 
            var $this = this;
            ajaxPost("/api/user/market/resource/list", {
                type:'pid',
            }, function (data) {
                if(data.data && data.data.items){
                    $this.pid.items = data.data.items;
                    $this.pid.name = '';
                    $this.pid.pid='';
                }
            })
        },
        delPid(id) { 
            var $this = this;
            ajaxPost("/api/user/market/resource/delete", {
                id: id,
            }, function () {
                $this.queryPid()
            })
        },
    }));
});