

$(function () {
    if ($('#kw').length > 0) {
        //关键词搜索
        $(document).on("click", '#js-eb-search-btn', function () {
            if ($.trim($('#kw').val()) != "") {
                $('form', $("#J_searchbox"))[0].submit();
            }
            return false;
        });

        //按回车键搜索的事件
        $(document).on('keydown', '#kw', function (event) {
            if (event.code == 13 && $.trim($('#kw').val()) != "") {
                $('#js-eb-search-btn')[0].click();
            }
        });

        //切换搜索
        $(document).on('click', '.search-tabs li', function () {
            var s = $(this).attr('data-s');
            var a = $(this).clone();
            if (s == 1) {
                $(this).parent().parent().find('#mod').val('index');
            } else if (s == 2) {
                $(this).parent().parent().find('#mod').val('queqiao');
            } else if (s == 3) {
                $(this).parent().parent().find('#mod').val('promo');
            }
            $('#kw').attr('placeholder', $(this).attr('data-p'));
            $(a).addClass('current');
            $('.search-tabs li').removeClass('current');
            $(this).remove();
            $(".search-tabs").prepend(a);
        });

        //删除搜索框关键词的事件
        $('#del').on("click", function () {
            $('#kw').val('')[0].focus();
            $('#filterForm')[0].submit();
        });
    }
    $(".copytext-btn", $(".goods-views")).on('click', function (o) {
        let $this = $(this);
        var clipboardBtn = new ClipboardJS('.copytext-btn', {
            target: function (trigger) {
                return $this.closest(".goods").find(".media-text-area")[0];
            }
        });

        clipboardBtn.on('success', function (e) {
            e.clearSelection();
            clipboardBtn.destroy();
            layer.msg('复制成功', { time: 2000 });
        });
        clipboardBtn.on('error', function (e) {
            console.log(e);
        });
    });

    //   $(".goods", $(".goods-views")).each(function(){
    //     let $this = $(this);
    //     let obj = JSON.parse($this.attr('data-item'));

    //     // $('.goodsimg-link',$this).wrap('<a title="" rel="nofollow" target="_blank" href="'+obj['link']+'"></a>');
    //     // $('.buy-btn',$this).wrap('<a title="" rel="nofollow" target="_blank" href="'+obj['url_buy']+'"></a>');
    //   });

    //延迟加载图片
    $("img.lazy", $(".goods-views")).lazyload({ effect: "fadeIn" });

    $('.go-url').on("click", function (event) {
        let $this = $(this)
        if ($this.attr("target")) {
            event.preventDefault();
        }
        window.open($this.attr("data-url"));
    });
});

var vmUserMenu = {
    data: {
        queryInit: false,
        user: {
            user_name: ''
        }
    },
    mounted: function () {
        this.init()
    },
    methods: {
        init: function () {
            this.query()
        },
        query: function () {
            var $this = this;
            ajaxPost("/api/user/home/user", {}, function (res) {
                if (res.data && res.data.user && res.data.user.user_id) {
                    $this.user = res.data.user;
                }
                $this.queryInit = true;
            })
        },
        logout: function () {
            Vue.ls.remove('member_token')
            window.location.href = "/";
        }
    }
}
var vmminxShopData = {  //公共方法
    data: {
        oPublic: {
            reportImg: '',
            loadingImg: web_config['static_url'] + "/static/platform/images/web/common/loading.png",
            loadingShow: false, //是否显示加载(加载动画)
            wholeShow: false, //数据加载完显示(全局)

            setTimeoutClear: '', //定时器(是否显示商品加载)
            setTime: 300,

            isDatanull: false, //商品数据为空的时候
            offsetTop: ''
        },
        publicList: { //商品列表数据
            productList: "", //列表数据

            pageNumber: 1, //页数
            pageInput: 1, //跳到第几页
            count: '', //总的页数
        },
        oHidePopup: {
            hideOnLineLin: false, //在线转链
            hideEchartCheck: false, //成交量
        },
        oToken: {
            token: '',
            tokenTime: '',
            tokenBoolean: false
        },
    },
    filters: {
        numText: function (number) {
            if (number < 10000) return number;
            if (number >= 10000) {
                return Math.round((number / 10000) * 100) / 100 + '万';
            }
        },
        conversion: function (number) {
            if (number) {
                if (number.length <= 4) return number;
                if (number.length >= 5) {
                    return Math.round((number / 10000) * 100) / 100 + '万';
                }
            }
        },
    },
    watch: {
        'publicList.pageInput': function (newValue) {  //监听分页的值
            var self = this;
            if (newValue > self.publicList.count) {
                self.publicList.pageInput = self.publicList.count;
            }
            if (newValue < 1 && newValue != '') {
                self.publicList.pageInput = 1;
            }
        },

    },
    methods: {
        producLink: function (id) { //跳到淘宝去
            pageAll("https://detail.tmall.com/item.htm?id=" + id);
        },
        ajaxGetToken: function () { //获取token
            var self = this;
            if (!self.oToken.tokenBoolean) {
                ajaxPost("/indexapi/get_qiniu_token", {}, function (data) {
                    if (data.status == '200') {
                        self.oToken.token = data.qiniu_token;
                        self.oToken.tokenBoolean = true;
                        clearTimeout(self.oToken.tokenTime);
                        self.setIntervalFun();
                    } else {
                        clearTimeout(self.oToken.tokenTime);
                        self.oToken.tokenBoolean = false;
                        self.oToken.token = '';
                    }

                }, function () {
                    clearTimeout(self.oToken.tokenTime);
                    self.oToken.tokenBoolean = false;
                })
            }
        },
        setIntervalFun: function () {  //计算token过期时间
            var self = this;
            this.oToken.tokenTime = setInterval(function () {
                self.oToken.tokenBoolean = false;
            }, 1000 * 5 * 60);
        },
        widthFun: function (item) { //计算优惠券的百分比
            if (item.down_type != 0) {
                return 'width:' + 0 + '%';
            }
            var str = Math.round((item.couponreceive / item.couponnum) * 100);
            return 'width:' + str + '%';
        },
        pageSkipp: function (id) { //跳到内页
            pageAll("/quan/" + id);
        },
        moveinIcon: function (name, event) { //商品图标鼠标移入
            layer.tips(name, $(event.target), {
                time: 0,
                tips: [2, '#4d77ff'],
            });
        },
        ComremoveLayerTips: function () { //商品图标鼠标移入
            var index = layer.tips();
            layer.close(index);
        },
        inCopywriting: function (event) { //显示文案
            var copy = $(event.target).attr('datatips');
            layer.tips(copy, $(event.target), {
                time: 0,
                tips: [2, '#5cadff'],
                area: '440px'
            });
        },
        copywritingBtn: function () { //复制文案
            var clipboard = new ClipboardJS('.public-copy', {
                target: function () {
                    return document.querySelector('.layui-layer-content');
                }
            });
            clipboard.on('success', function (e) {
                layer.msg('已复制', {
                    time: 1500
                });
                e.clearSelection();
                clipboard.destroy();
            });
            clipboard.on('error', function (e) {
                layer.msg('由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！', {
                    icon: 2
                });
            });
        },
        arrowTopFun: function () { //点击回到顶部
            $("body,html").stop(true, true).animate({
                "scrollTop": 0
            });
        },
        echartCheckFunBtn: function (itemid) { //成交量
            this.oHidePopup.hideEchartCheck = true;
            this.publicPopup(".js-popupEcharts");
            echartCheckFun(itemid);
        },
        echartCheckShut: function () { //成交量-关闭
            this.oHidePopup.hideEchartCheck = false;
            this.publicClose();
        },
        onLineLinBtn: function (itemId) { //在线转链图表
            this.oHidePopup.hideOnLineLin = true;
            this.publicPopup('.js-popupOnLineLin');
            onLineLinFun(itemId);
        },
        onLineLinShut: function () { //在线转链图表-关闭
            this.oHidePopup.hideOnLineLin = false;
            this.publicClose();
        },
        echoImg: function () { //懒加载
            Echo.init({
                offset: 0,
                throttle: 0
            });
        },
        publicPopup: function (className) { //公共弹窗
            layer.open({
                type: 1,
                shift: 0,
                title: false,
                closeBtn: 1,
                shade: 0.4,
                content: $(className)
            });
        },
        publicClose: function () { //公共弹窗关闭
            layer.closeAll();
        },
        publicPopupCustom: function (className, width, height) {
            layer.open({
                type: 2,
                area: [width + 'px', height + 'px'],
                shift: 0,
                title: false,
                closeBtn: 1,
                shade: 0.4,
                content: $(className)
            });
        },
    }
};

// 视频组件
var componentVideo = {
    data: function () {
        return {
            oHidePopup: {
                hideVideo: false,
            },
            oVideo: {
                mp4link: '',
                swfLlink: '',
                videoTab: 0
            },
        }
    },
    methods: {
        playVideoBtn: function (id) { //视频播放
            this.oVideo.mp4link = "http://cloud.video.taobao.com/play/u/1/p/1/e/6/t/1/" + id + ".mp4";
            this.oVideo.swfLlink = "//cloud.video.taobao.com/play/u/2599950707/p/1/e/1/t/1/" + id +
                ".swf";

            this.oHidePopup.hideVideo = true;
            layer.open({
                type: 1,
                shift: 0,
                title: false,
                closeBtn: 0,
                shade: 0.4,
                content: $(".js-popupVideo")
            });
        },
        videoTabBtn: function (index) { //视频 赋值下标
            this.oVideo.videoTab = index;
        },
        playVideoShut: function () { //视频-关闭弹窗
            this.oVideo.videoTab = 0;
            this.oVideo.mp4link = '';
            this.oVideo.swfLlink = '';
            this.oHidePopup.hideVideo = false;
            layer.closeAll();
        },
    },
    template:
        '<div class="video-modal-dialog comPopupHide js-popupVideo">' +
        '<div v-if="oHidePopup.hideVideo">' +
        '<div class="video-modal-hd">' +
        '<span>查看视频</span>' +
        '<i class="iconfont icon-close" @click="playVideoShut()"></i>' +
        '</div>' +
        '<div class="video-modal-bd">' +
        '<div class="video-show">' +
        '<video class="video-box" autoplay="autoplay" :src="oVideo.mp4link" controls="controls" v-if="oVideo.videoTab == 0"></video>' +
        '<object class="video-box" type="application/x-shockwave-flash" :data="oVideo.swfLlink"  v-if="oVideo.videoTab == 1"></object>' +
        '</div>' +
        '</div>' +
        '<div class="video-modal-footer">' +
        '<span>下载视频请右键点击“视频另存为(V)...”</span>' +
        '<div class="video-btns">' +
        '<span class="video_source" :class="[oVideo.videoTab == 0?\'video-active\':\'\']" @click="videoTabBtn(0)">视频源1</span>' +
        '<span class="video_source" :class="[oVideo.videoTab == 1?\'video-active\':\'\']" @click="videoTabBtn(1)">视频源2</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div> ',
}

// 加载动画组件
var componentLoading = {
    props: ['vmpublicc'],
    data: function () {
        return {

        }
    },
    methods: {

    },
    template:
        '<div class="loadingBox" v-if="vmpublicc">' +
        '<div class="loading overall-loading">' +
        '<div class="outer"></div>' +
        '<div class="inner"></div>' +
        '<div class="loading-text">数据加载中，请稍后...</div>' +
        '</div>' +
        '</div>',
}

// 暂无数据提示
var componentDatanull = {
    props: ['vmdatanull', 'vmmsg', 'vmrescreen', 'vmnullimg'],
    data: function () {
        return {
            nullImg0: '//static.cdn.youdanhui.net/tatic/platform/images/web/detail/Index-null.png',
        }
    },
    methods: {
        resBtn: function () {
            this.$emit("vmresbtn");
        }
    },
    template:
        '<div class="inNull animatedFade animatedNaneBottom" v-if="vmdatanull">' +
        '<img :src="nullImg0" class=" comUser-select" v-if="vmnullimg ==undefined">' +
        // '<img :src="nullImg1" class=" comUser-select" v-else>'+
        '<p>{{vmmsg ==undefined?"抱歉，暂时没有筛选到合适商品":vmmsg}}</p>' +
        '<span v-if="vmmsg ==undefined">我们会努力寻找更多的商品哦~</span>' +
        '<em @click="resBtn" v-if="vmrescreen">重新筛选</em>' +
        '</div>'
}

//实拍图--小工具
var vmPic = {
    props: ['goodsid'],
    data: function () {
        return {
            loadmsg: true,
            cacheId: '',  //缓存Id
            realPicoPage: {
                pageNumber: 1,
                pageImgAll: [],
            },
        }
    },
    mounted: function () {
        var self = this;
        var nScrollHight = 0;
        var nScrollTop = 0;
        var nDivHight = $(".realpic-box").height();
        $(".realpic-box").scroll(function () {
            nScrollHight = $(this)[0].scrollHeight;
            nScrollTop = $(this)[0].scrollTop;
            if (nScrollTop + nDivHight >= nScrollHight) {
                if (self.loadmsg) {
                    self.ajaxIrealpic();
                }
            }
        });

    },
    methods: {
        ajaxIrealpic: function (abs) {
            var self = this;
            if (abs) {
                if (self.cacheId == self.goodsid && self.realPicoPage.pageImgAll != '') {
                    self.CallbackRealpic();
                    return;
                } else {
                    self.realPicoPage = {
                        pageNumber: 1,
                        pageImgAll: [],
                    };
                    self.loadmsg = true;
                    layer.load(2, { shade: 0.1 });
                    self.cacheId = self.goodsid;
                }
            } else {
                self.realPicoPage.pageNumber += 1;
            }
            ajaxPost("/api/common/goods/get_evaluate_imageurl", {
                num_iid: self.goodsid,
                page: self.realPicoPage.pageNumber
            }, function (data) {
                layer.closeAll('loading');
                if (data.code == '200') {
                    if (data.evaluate_imageurl != 0) {
                        self.realPicoPage.pageImgAll = self.realPicoPage.pageImgAll.concat(data.evaluate_imageurl);
                        if (self.realPicoPage.pageImgAll.length < 6) {
                            self.ajaxIrealpic();
                        }
                    } else {
                        self.loadmsg = false;
                        if (abs) {
                            layer.msg('没有实拍图哦', {
                                time: 1500,
                                shade: 0.1,
                                shadeClose: true
                            });
                        }
                        return;
                    }
                    self.$nextTick(function () {
                        if (abs) {
                            self.CallbackRealpic();
                        }

                    })

                } else if (data.code == '-1') {
                    layer.msg('请先登录', {
                        time: 1500,
                        shade: 0.1,
                        shadeClose: true
                    });
                } else {
                    layer.msg(data.msg, {
                        icon: 2,
                        shade: 0.1,
                        shadeClose: true
                    });
                }

            })
        },
        CallbackRealpic: function () {
            layer.open({
                type: 1,
                shift: 0,
                title: '获取实拍图',
                closeBtn: 2,
                shade: 0.4,
                area: ['850px', '720px'],
                content: $('.js-realPic')
            });
        },
    },
    template:
        '<div class="realPic js-realPic">' +
        '<div class="realpic-box">' +
        '<ul class="realPic-list clearfix">' +
        '<li v-for="(item,index) in realPicoPage.pageImgAll"><img :src="item"></li>' +
        '</ul>' +
        '<p class="realpic-loading" v-if="loadmsg"> <i class="iconfont hdk-jiazai vmIconLoad"></i><em>数据加载中...</em></p>' +
        '<p class="realpic-loading" v-else>数据已经加载完了</p>' +
        '</div>' +
        '</div>'
}


var oItemId = '';

//成交销量
function echarts_show_itemid (sale, saletime) {
    var myChart = echarts.init(document.getElementById('echarts-mail'));
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: [{
                name: '成交销量',
                textStyle: {
                    fontSize: 15,
                    color: '#000',
                    fontWeight: 'bolder'
                }
            }]
        },
        xAxis: {
            gridIndex: 0,
            type: 'category',
            boundaryGap: false,
            data: saletime,
        },
        yAxis: {
            type: 'value',
            name: '商品日销量轨迹',
            nameTextStyle: {
                color: 'white',
                backgroundColor: 'rgba(92, 173, 255, 0.8)',
                padding: [4, 6]
            },
            nameGap: 8,
            axisLabel: {
                formatter: '{value}'
            },
        },
        grid: {
            gridIndex: 0,
            top: '8%',
            left: '8%',
            width: '880px',
            height: '280px'
        },
        series: [
            {
                name: '成交销量',
                type: 'line',
                smooth: true,
                label: {
                    normal: {
                        show: true,
                    }
                },
                data: sale,
            },

        ]
    };
    myChart.setOption(option);
}

//宝贝时间点选择
$(document).on('click', '.echarts-clickable', function () {
    // $(this).siblings().removeClass('active-time');
    $(this).addClass('echarts-active').siblings().removeClass('echarts-active');
    // $(this).addClass('active-time');
    // var itemid = $('#echarts-mail').attr('data-id');
    var show_time = $(this).attr('date-time');
    $.ajax({
        url: '/api/common/goods/itemid_echarts_data',
        type: 'post',
        data: Object.assign({ 'num_iid': oItemId, 'show_time': show_time }, {
            hpt_times: web_config['hpt_times'],
            hpt_sign: web_config['hpt_sign'],
            member_token: web_config['token'],
        }),
        success: function (res) {
            var data = res.data.content;
            //get_show_time(data.check_hour);//时间档处理
            echarts_show_itemid(data.sale, data.saletime);//销量走势展示
        }
    });
});

//处理更多图文的折线图时间档处理
function get_show_time (check_hour) {
    for (var i = 6; i >= 1; i--) {
        if (i > check_hour) {
            $('.hour' + i).removeClass('echarts-clickable');
            // $('.hour'+i).removeClass('active-time');
        } else if (i == check_hour) {
            // $('.hour'+i).addClass('active-time');
            $('.hour' + i).addClass('echarts-clickable');
        } else {
            $('.hour' + i).addClass('echarts-clickable');
            // $('.hour'+i).removeClass('active-time');
        }
    }
}

// 在线转链
function onLineLinFun (itemid) {
    autoHeight();
    $.ajax({
        url: '/api/common/goods/api_check_material',
        data: Object.assign({ 'num_iid': itemid }, {
            hpt_times: web_config['hpt_times'],
            hpt_sign: web_config['hpt_sign'],
            member_token: web_config['token'],
        }),
        type: 'post',
        dataType: 'json',
        success: function (res) {
            var data = res.data.content;
            if (data.status == 1) {
                var chain_modal = $('#material_box').html();
                var shop_score_str = data.item_info.shop_score;
                chain_modal = chain_modal.replace(/\{\{itemshorttitle\}\}/g, data.item_info.itemshorttitle);
                chain_modal = chain_modal.replace(/\{\{itemendprice\}\}/g, parseFloat(data.item_info.itemendprice));
                chain_modal = chain_modal.replace(/\{\{tkrates\}\}/g, parseFloat(data.item_info.tkrates));
                chain_modal = chain_modal.replace(/\{\{tkmoney\}\}/g, parseFloat(data.item_info.tkmoney));
                chain_modal = chain_modal.replace(/\{\{general_index\}\}/g, data.item_info.general_index);
                chain_modal = chain_modal.replace(/\{\{itempic\}\}/g, data.item_info.itempic);
                chain_modal = chain_modal.replace(/\{\{itemsale2\}\}/g, data.item_info.itemsale2);
                chain_modal = chain_modal.replace(/\{\{todaysale\}\}/g, data.item_info.todaysale);
                chain_modal = chain_modal.replace(/\{\{itemprice\}\}/g, parseFloat(data.item_info.itemprice));
                chain_modal = chain_modal.replace(/\{\{discount\}\}/g, parseFloat(data.item_info.discount));
                chain_modal = chain_modal.replace(/\{\{couponmoney\}\}/g, data.item_info.couponmoney);
                chain_modal = chain_modal.replace(/\{\{couponreceive\}\}/g, data.item_info.couponreceive);
                chain_modal = chain_modal.replace(/\{\{couponsurplus\}\}/g, data.item_info.couponsurplus);
                chain_modal = chain_modal.replace(/\{\{itemid\}\}/g, data.item_info.itemid);
                chain_modal = chain_modal.replace(/\{\{itemsale\}\}/g, data.item_info.itemsale);
                chain_modal = chain_modal.replace(/\{\{grade_avg\}\}/g, data.item_info.grade_avg);
                chain_modal = chain_modal.replace(/\{\{sellernick\}\}/g, data.item_info.sellernick);

                try {
                    var shop_score_array = JSON.parse(shop_score_str);
                    chain_modal = chain_modal.replace(/\{\{desc_score\}\}/g, shop_score_array.desc_score);
                    chain_modal = chain_modal.replace(/\{\{serv_score\}\}/g, shop_score_array.serv_score);
                    chain_modal = chain_modal.replace(/\{\{post_score\}\}/g, shop_score_array.post_score);
                } catch (error) {
                    chain_modal = chain_modal.replace(/\{\{desc_score\}\}/g, '');
                    chain_modal = chain_modal.replace(/\{\{serv_score\}\}/g, '');
                    chain_modal = chain_modal.replace(/\{\{post_score\}\}/g, '');
                }

                if (!data.main_video && typeof (data.main_video) != "undefined" && data.main_video != 0) {
                    // $('#more_material_video').addClass('am-hide');
                    $('#more_material_video').css('display', 'none');
                } else {
                    chain_modal = chain_modal.replace(/\{\{main_video\}\}/g, "http://video.haodanku.com/" + data.main_video + "?attname=" + data.material_info.main_video_url + ".mp4");
                }

                if (data.detail_video != '') {
                    chain_modal = chain_modal.replace(/\{\{detail_video\}\}/g, "http://video.haodanku.com/" + data.detail_video + "?attname=" + data.material_info.detail_video_url + ".mp4");
                }

                if (data.item_info.shoptype == 'C') {
                    var shop_img = '<img src="https://img.youdanhui.cn/cms_img/2019-10-24/5db167ada0c13.png" alt="淘宝"/>';
                } else {
                    var shop_img = '<img src="https://img.youdanhui.cn/cms_img/2019-10-24/5db16788be2fa.png" alt="天猫"/>';
                }

                try {
                    var desc_level = level_result(shop_score_array.desc_level);
                    var serv_level = level_result(shop_score_array.serv_level);
                    var post_level = level_result(shop_score_array.post_level);
                    chain_modal = chain_modal.replace(/\{\{desc_level\}\}/g, desc_level);
                    chain_modal = chain_modal.replace(/\{\{serv_level\}\}/g, serv_level);
                    chain_modal = chain_modal.replace(/\{\{post_level\}\}/g, post_level);
                } catch (error) {
                    chain_modal = chain_modal.replace(/\{\{desc_level\}\}/g, '');
                    chain_modal = chain_modal.replace(/\{\{serv_level\}\}/g, '');
                    chain_modal = chain_modal.replace(/\{\{post_level\}\}/g, '');
                }

                chain_modal = chain_modal.replace(/\{\{shop_img\}\}/g, shop_img);
                var seckill_array = data.material_info.seckill_content;
                var copywriting_html, more_image_html, copy_html, more_material_img_html, couponurl_text = '';

                //实拍素材
                var seckill_i;
                var seckill_html = '';
                for (seckill_i in seckill_array) {
                    //存放需要复制的内容
                    copywriting_html = '<div class="fq-copywriting"><img class="fq-copywriting_image" src="${seckill_array[seckill_i].img}" alt=""><div class="copywriting-text">${seckill_array[seckill_i].show_text}</div><span class="copy-text" style="bottom: 8px;" data-tips="<img src=' + seckill_array[seckill_i].img + ' alt="" style="width: 50px;">${seckill_array[seckill_i].copy_text}">复制文案</span></div>'
                    seckill_html = seckill_html + copywriting_html;
                }
                if (data.item_info.couponurl != '' && data.item_info.couponurl != null) {
                    var couponurl_text = '领券：' + data.item_info.couponurl + '<br>';
                }
                var allCopyText = "<img class='fq-copywriting_image' src='" + data.item_info.itempic_copy + "' alt=''><br/>" + data.item_info.itemshorttitle + "<br/>原价" + data.item_info.itemprice + "元，券后价【" + data.item_info.itemendprice + "元】<br/>" + couponurl_text + "下单:https://detail.tmall.com/item.htm?id=" + data.item_info.itemid + "<br/>" + data.item_info.itemdesc;
                var copy_html = '<div class="fq-copywriting" style="background: #dedede;"><img class="fq-copywriting_image" src="' + data.item_info.itempic + '_310x310.jpg" alt=""><div class="copywriting-text">' + data.item_info.itemshorttitle + '<br>原价' + data.item_info.itemprice + '元，券后价【' + data.item_info.itemendprice + '元】<br>' + couponurl_text + '下单：https://detail.tmall.com/item.htm?id=' + data.item_info.itemid + '<br>' + data.item_info.itemdesc + '</div><span class="copy-text" data-tips="' + allCopyText + '" style="bottom: 8px; background: #4dca51;">复制文案（含链接）</span></div>';

                seckill_html = seckill_html + copy_html;

                $('#js_material_box').html(chain_modal);
                $('.js_copywriting_box').append(seckill_html);

                //更多素材图片
                var more_image = data.material_info.image;
                var more_image_length = 0;
                if (more_image != '' || more_image != 'NULL') {
                    var material_img_array = more_image.split(",");
                    more_image_length = material_img_array.length;
                }

                if (more_image_length > 1) {
                    var img;
                    var more_material_img_html = '';
                    for (img in material_img_array) {
                        more_image_html = '<div class="material-img"><div><img src="' + material_img_array[img] + '" data-src="' + material_img_array[img] + '" alt=""><label class="img-label"><input type="radio" class="img-radio" value="' + img + '"><span class="img-radioInput"></span>实拍' + (parseInt(img) + 1) + '</label></div></div>';
                        more_material_img_html = more_material_img_html + more_image_html;
                    }
                    $('.js_material_img_box').html(more_material_img_html);
                    $('#more_material_img').css('display', 'block');
                } else {
                    $('#more_material_img').css('display', 'none');
                }

                //朋友圈文案
                var friends_circle_text_html = data.material_info.friends_circle_text;
                var show_friends_circle_text = data.material_info.show_friends_circle_text;
                var copy_friends_circle_text = data.material_info.copy_friends_circle_text;

                if (friends_circle_text_html != '' && friends_circle_text_html != null) {
                    $('.js_friendsCircle').append('<div class="fq-friendsCircle"><div class="friendsCircle-img"><img src="https://img.youdanhui.cn/cms_img/2019-10-24/5db157e0381d3.png" alt="" style="width: 1.875rem;" /></div><div class="friendsCircle-content"><span class="friendsCircle-title">好品生活</span><div class="friendsCircle-text">' + show_friends_circle_text + '</div><span class="copy-text" data-tips="' + copy_friends_circle_text + '">复制文案</span></div></div>');
                    $('#friends_circle_js').css('display', 'block');
                } else {
                    $('#friends_circle_js').css('display', 'none');
                }

                //没有视频时隐藏
                if (!data.main_video && typeof (data.main_video) != "undefined" && data.main_video != 0) {
                    $('#more_material_video').css('display', 'none');
                }

                //更多素材视频
                if (data.detail_video != '' && data.main_video != null) {
                    $('#video_main_url').css('display', 'block');
                    $('#video_detail_url').css('display', 'block');
                } else if (data.main_video != null) {
                    $('#video_main_url').css('display', 'block');
                    $('#video_detail_url').attr('src', '');
                } else if (data.detail_video != '') {
                    $('#video_detail_url').css('display', 'block');
                    $('#video_main_url').attr('src', '');
                } else {
                    $('#video_main_url').attr('src', '');
                    $('#video_detail_url').attr('src', '');
                }

                //展示在线转链
                var onlineCopyText = "<img class='fq-copywriting_image' src='" + data.item_info.itempic_copy + "' alt=''><br/>" + data.item_info.itemshorttitle + "<br/>原价" + data.item_info.itemprice + "元，券后价【" + data.item_info.itemendprice + "元】<br/>下单:https://detail.tmall.com/item.htm?id=" + data.item_info.itemid + "<br/>" + data.item_info.itemdesc;
                var tao_sign = '<div class="fq-copywriting" style="background: #dedede;"><img class="fq-copywriting_image" src="' + data.item_info.itempic + '_310x310.jpg" alt=""><div class="copywriting-text">' + data.item_info.itemshorttitle + '<br>原价' + data.item_info.itemprice + '元，券后价【' + data.item_info.itemendprice + '元】<br>【领券方法】：<span class="tao_sign_str">【转淘口令】</span>长按复制该信息，打开手机淘宝，即可领券下单<br>' + data.item_info.itemdesc + '</div><span class="copy-text copy-tao" data-tips="' + onlineCopyText + '" style="display: none; background: #4dca51;">复制淘口令文案</span><span class="tao_sign" style="display:block">转淘口令</span></div>';
                var shorturl = '<div class="fq-copywriting" style="background: #dedede;"><img class="fq-copywriting_image" src="' + data.item_info.itempic + '_310x310.jpg" alt=""><div class="copywriting-text">' + data.item_info.itemshorttitle + '<br>原价' + data.item_info.itemprice + '元，券后价【' + data.item_info.itemendprice + '元】<br>【领券方法】：点击链接-》领券下单  <span class="shorturl_str">【转二合一链接】</span><br>' + data.item_info.itemdesc + '</div><span class="copy-text copy-shorturl" data-tips="' + onlineCopyText + '" style="display: none; background: #4dca51;">复制二合一文案</span><span class="shorturl" style="display:block">转二合一</span></div>';
                $('.transfer_content').append(tao_sign + shorturl);

                //在线转链数据
                var tao_sign_title = data.item_info.itemshorttitle;
                var activityid = data.item_info.activityid;
                var chain_itempic = data.item_info.itempic_copy;
                var chain_itemprice = data.item_info.itemprice;
                var chain_itemendprice = data.item_info.itemendprice;
                var chain_itemdesc = data.item_info.itemdesc;

                var seller_id = ''; //设置全局变量 seller_id
                //没有多图文只展示转链
                // if (!seckill_array) {
                $('.js_copywriting_box').css('diaplay', 'none');
                $('.material-left .material-active').css('diaplay', 'none');
                $('#online_transfer').addClass('material-active');;
                $('.transfer_content').css('diaplay', 'block')
                var host = getLocation()
                $.ajax({
                    url: "/api/common/stat/loginfo",
                    type: 'post',
                    xhrFields: {
                        withCredentials: true
                    },
                    data: Object.assign({}, {
                        hpt_times: web_config['hpt_times'],
                        hpt_sign: web_config['hpt_sign'],
                        member_token: web_config['token'],
                    }),
                    success: function (e) {
                        if (e.data.loginState == 1) {
                            var seller_id = e.seller_id;
                        } else {
                            //$('.shorturl').attr('href',"http://publish."+host).text('转链登录');
                            $('.shorturl').text('转链登录');
                            //$('.tao_sign').attr('href',"http://publish."+host).text('转淘口令登录');
                            $('.tao_sign').text('转淘口令登录');
                        }
                    }
                });
                // }
            }
            online_modal_chian();
        }
    });
}


$('.fq-chain-close').on('click', function () {
    $('#js_material_box').empty();
});
// });

// 获取域名
function getLocation () {
    var arr = document.domain.split('.');
    if (arr.length === 2) {
        return document.domain;
    }
    if (arr.length > 2 && arr[0] !== 'www') {
        return arr.slice(1).join('.');
    }
    return arr.slice(1).join('.');
}

// 复制方法
function copy_fun (even_btn) {
    var clipboard = new ClipboardJS('.' + even_btn, {
        target: function () {
            return document.querySelector('.all-copywriting');
        }
    });

    clipboard.on('success', function (e) {
        layer.msg('复制成功', {
            time: 1000
        });
        $('#all-copywriting').html("");
        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        layer.msg('复制失败，您当前的浏览器不兼容或网速较慢，请更换主流浏览器', {
            time: 1800,
            maxWidth: '100%'
        });
        $('#all-copywriting').html("");
    });
}

// 在线转链弹窗
function online_modal_chian () {
    var itemid = $('#echarts').attr('data-itemid');
    // var itemid = 590891861952;
    var host = getLocation();
    ajaxPost("/api/common/goods/get_echarts_data", {
        'num_iid': itemid
    }, function (res) {
        var data = res.data.content;
        get_show_status(data.check_hour); //时间档处理
        echarts_show_box(data.sale, data.saletime); //销量走势展示
    }, function () { });

    // 单个图文复制
    $(function () {
        copy_fun('copy-text');

        // 图文复制
        $('.copywriting-content').on('click', '.copy-text', function () {
            var content = $(this).attr('data-tips');
            $('.all-copywriting').html(content);
        });

        // 朋友圈文案复制
        $('.fq-friendsCircle').on('click', '.copy-text', function () {
            var content = $(this).attr('data-tips');
            $('.all-copywriting').html(content);
        });

        // 在线转链复制
        $('.transfer_content').on('click', '.copy-text', function () {
            var content = $(this).attr('data-tips');
            $('.all-copywriting').html(content);
        });
    });

    // 一键复制所有图文
    $(function () {
        copy_fun('copywriting-copy');
        $('.copywriting-copy').click(function () {
            var all_content = '';
            var content = '';
            $('.copywriting-content .copy-text').each(function () {
                content = $(this).attr('data-tips');
                all_content = all_content + content;
            });
            $('.all-copywriting').html(all_content);
        });
    });

    // 更多素材单选按钮切换
    $(function () {
        $('.material-image input:radio').data('checked', true);
        $('.material-image input:radio').prop('checked', true);
        $('.material-image .material-img').children('div').addClass('img-active');
        $('.material-image input:radio').click(function () {
            var $radio = $(this);
            if ($radio.data('checked') == true) {
                $radio.prop('checked', false);
                $radio.data('checked', false);
                $radio.parents('.material-img').children('div').removeClass('img-active');
            } else {
                $radio.prop('checked', true);
                $radio.data('checked', false);
                $radio.data('checked', true);
                $radio.parents('.material-img').children('div').addClass('img-active');
            }
        });
    });

    // 复制更多素材图片
    $(function () {
        copy_fun('material-copy');

        $('.material-copy').click(function () {
            var imgContent = '';
            $('.img-active').each(function () {
                var dataSrc = $(this).children('img').attr('data-src');
                imgContent = imgContent + '<img src=' + dataSrc + '>' + '<br>';
                $('.all-copywriting').html(imgContent);
            });
        });
    });

    // 在线转淘口令
    $('.tao_sign').click(function () {
        var protocol = window.location.protocol;
        if (seller_id) {
            $.ajax({
                url: '/Onlinechain/changechain',
                type: 'post',
                data: { 'itemid': itemid, 'seller_id': seller_id, 'title': tao_sign_title, 'activityid': activityid },
                success: function (e) {
                    // 状态：1正常，2没有设置PID，3淘宝授权过期，4转链失败
                    if (e.status == 1) {
                        $('.tao_sign_str').text(e.data);
                        var taocopy_text = "<img class='fq-copywriting_image' src='" + chain_itempic + "' alt=''><br/>" + tao_sign_title + "<br/>原价" + chain_itemprice + "元，券后价【" + chain_itemendprice + "元】<br/>【领券方法】:" + e.data + "长按复制该信息，打开手机淘宝，即可领券下单<br/>" + chain_itemdesc;
                        $('.copy-tao').attr('data-tips', taocopy_text);
                        $('.tao_sign').css('display', 'none');
                        $('.copy-tao').css('display', 'block');
                    } else if (e.status == 2) {
                        layer.confirm(e.info + '，是否前往设置？', { 'icon': 3, 'title': '' }, function (index) {
                            // href = 'https://publish.'+host+"/Personal/setpid.html"; //url 是你得到的连接
                            var href = protocol + '//publish.' + host + '/Personal/setpid.html';
                            skip(href);
                            layer.close(index);
                        });
                    } else if (e.status == 3) {
                        layer.confirm(e.info + '，是否前往设置？', { 'icon': 3, 'title': '' }, function (index) {
                            // window.location.href = "http://publish."+host+"/Personal/setpid.html";
                            // href = 'https://publish.'+host+"/Tbauth/index.html"; //url 是你得到的连接
                            var href = protocol + '//publish.' + host + '/Tbauth/index.html';
                            skip(href);
                            layer.close(index);
                        });
                    } else {
                        layer.msg(e.info, {
                            time: 1200
                        });
                    }
                }
            });
        } else {
            // $('#fq_chain').css('display', 'none');
            // vmIndex.removerpopuFun('.js-popup');
            // href = 'https://publish.'+host; //url 是你得到的连接
            layer.closeAll();
            var href = protocol + '//publish.' + host;
            skip(href);
        }
    });

    // 在线转短连接
    $('.shorturl').click(function () {
        var protocol = window.location.protocol;
        if (seller_id) {
            $.ajax({
                url: '/Onlinechain/changechain',
                type: 'post',
                data: { 'itemid': itemid, 'seller_id': seller_id, 'activityid': activityid },
                success: function (e) {
                    // 状态：1正常，2没有设置PID，3淘宝授权过期，4转链失败
                    if (e.status == 1) {
                        $('.shorturl_str').text(e.data);
                        var shorturlcopy_text = "<img class='fq-copywriting_image' src='" + chain_itempic + "' alt=''><br/>" + tao_sign_title + "<br/>原价" + chain_itemprice + "元，券后价【" + chain_itemendprice + "元】<br/>【领券方法】：点击链接-》领券下单 " + e.data + "<br/>" + chain_itemdesc;
                        $('.copy-shorturl').attr('data-tips', shorturlcopy_text);
                        $('.shorturl').css('display', 'none');
                        $('.copy-shorturl').css('display', 'block');
                    } else if (e.status == 2) {
                        layer.confirm(e.info + '，是否前往设置？', { 'icon': 3, 'title': '' }, function (index) {
                            // href = 'https://publish.'+host+"/Personal/setpid.html"; //url 是你得到的连接
                            var href = protocol + '//publish.' + host + '/Personal/setpid.html';
                            skip(href);
                            layer.close(index);
                        });
                    } else if (e.status == 3) {
                        layer.confirm(e.info + '，是否前往设置？', { 'icon': 3, 'title': '' }, function (index) {
                            // window.location.href = "http://publish."+host+"/Personal/setpid.html";
                            // href = 'https://publish.'+host+"/Tbauth/index.html"; //url 是你得到的连接
                            var href = protocol + '//publish.' + host + '/Tbauth/index.html';
                            skip(href);
                            layer.close(index);
                        });
                    } else {
                        layer.msg(e.info, {
                            time: 1200
                        });
                    }
                }
            });
        } else {
            // $('#fq_chain').css('display', 'none');
            // vmIndex.removerpopuFun('.js-popup');
            layer.closeAll();
            var href = protocol + '//publish.' + host;
            skip(href);
        }
    });
}

// 定时执行获取图片高度
function autoHeight () {
    var timer = setInterval(takePlace, 50);
    function takePlace () {
        $('.fq-copywriting_image').each(function () {
            var img_height = $(this).height();
            var div_height = $(this).siblings('.copywriting-text').innerHeight();
            var text_height = parseInt(350 - img_height) - 36 - 32;

            if (img_height > 0) {
                if (text_height < parseInt(div_height)) {
                    $(this).siblings('.copywriting-text').css('max-height', text_height);
                    $(this).siblings('.copywriting-text').addClass('textDiv');
                }
                clearInterval(timer);
            }
        });
    }
}

// 图文复制、更多素材切换
$('body').on('click', '.material-span', function () {
    autoHeight();
    $(this).addClass('material-active').siblings().removeClass('material-active');
    if ($(this).text() == '图文复制') {
        $('.copywriting-content').css('display', 'block');
        $('.video-content').css('display', 'none');
        $('.friendsCircle-copywriting').css('display', 'none');
        $('.material-content').css('display', 'none');
        $('.transfer_content').css('display', 'none');
    } else if ($(this).text() == '视频素材') {
        $('.video-content').css('display', 'block');
        $('.copywriting-content').css('display', 'none');
        $('.friendsCircle-copywriting').css('display', 'none');
        $('.material-content').css('display', 'none');
        $('.transfer_content').css('display', 'none');
    } else if ($(this).text() == '朋友圈文案') {
        $('.friendsCircle-copywriting').css('display', 'block');
        $('.copywriting-content').css('display', 'none');
        $('.video-content').css('display', 'none');
        $('.material-content').css('display', 'none');
        $('.transfer_content').css('display', 'none');
    } else if ($(this).text() == '在线转链') {
        $('.transfer_content').css('display', 'block');
        $('.copywriting-content').css('display', 'none');
        $('.video-content').css('display', 'none');
        $('.material-content').css('display', 'none');
        $('.friendsCircle-copywriting').css('display', 'none');

        // 获取登录状态，-1为没登陆
        var host = getLocation();
        $.ajax({
            url: "/api/common/stat/loginfo",
            type: 'post',
            xhrFields: {
                withCredentials: true
            },
            data: Object.assign({}, {
                hpt_times: web_config['hpt_times'],
                hpt_sign: web_config['hpt_sign'],
                member_token: web_config['token'],
            }),
            success: function (e) {
                if (e.data.loginState == 1) {
                    var seller_id = e.seller_id;
                } else {
                    $('.tao_sign').text('转淘口令登录');
                    $('.shorturl').text('转链登录');
                }
            }
        });
    } else {
        $('.material-content').css('display', 'block');
        $('.copywriting-content').css('display', 'none');
        $('.video-content').css('display', 'none');
        $('.friendsCircle-copywriting').css('display', 'none');
        $('.transfer_content').css('display', 'none');
    }
});

//折线图展示
function echarts_show_box (sale, saletime) {
    var dataChart = echarts.init(document.getElementById('echarts'));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: [{
                name: '成交销量',
                textStyle: {
                    fontSize: 14,
                    color: '#000',
                    fontWeight: 'bloder'
                }
            }]
        },
        grid: {
            left: 64,
            top: 30,
            right: 30,
            bottom: 40
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: saletime
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#eaeaea'
                }
            },
        },
        series: {
            type: 'line',
            smooth: true,
            label: {
                normal: {
                    show: true
                }
            },
            symbolSize: 4,
            itemStyle: {
                normal: {
                    color: '#fe6075',
                    borderColor: '#fe6075',
                }
            },
            data: sale
        }
    };
    // 使用刚指定的配置项和数据显示图表。
    dataChart.setOption(option);
}

//处理更多图文的折线图时间档处理
function get_show_status (check_hour) {
    for (var i = 6; i >= 1; i--) {
        if (i > check_hour) {
            $('.show_hour' + i).removeClass('clickable-time');
            $('.show_hour' + i).removeClass('active-time');
        } else if (i == check_hour) {
            $('.show_hour' + i).addClass('active-time');
            $('.show_hour' + i).addClass('clickable-time');
        } else {
            $('.show_hour' + i).addClass('clickable-time');
            $('.show_hour' + i).removeClass('active-time');
        }
    }
}

// 折线图时间点选择
$(document).on('click', '.clickable-time', function () {
    $(this).addClass('active-time').siblings().removeClass('active-time');
    var itemid = $('#echarts').attr('data-itemid');
    var show_time = $(this).attr('date-time');
    $.ajax({
        url: '/Index/get_echarts_data',
        type: 'post',
        data: { 'itemid': itemid, 'show_time': show_time },
        success: function (data) {
            echarts_show_box(data.sale, data.saletime);//销量走势展示
        }
    });
});

//评分
function level_result (level) {
    if (level == 1) {
        //飘红向上
        var result_html = '<i class="iconfont hdk-top icon-color-red"></i>';
    } else if (level == -1) {
        //飘绿向下
        result_html = '<i class="iconfont hdk-bottom icon-color-green"></i>';
    } else {
        //持平
        result_html = '<i class="iconfont hdk-line icon-color-red"></i>';
    }
    return result_html;
}

//js实现跳转
function skip (url) {
    var el = document.createElement("a");
    document.body.appendChild(el);
    el.href = url; //url 是你得到的连接
    el.target = '_blank'; //指定在新窗口打开
    el.click();
    document.body.removeChild(el);
}

$(function () {
    var $couponBtn = $(".coupon-btn");
    if (mobileUtil.isMobile == true) {
        $couponBtn.attr("href", $couponBtn.data("url"));
    } else {
        $couponBtn.attr("href", $couponBtn.data("url"));
    }
});
var vmdetails = {
    // el: "#vmdetails",
    mixins: [vmminxShopData],
    data: {
        oCommon: {
            id: web_config['item_id'],
            tianmao: 'https://detail.tmall.com/item.htm',
            adminPidlink: '/user/info/pid',
            adminLoginlink: '/public/login',
            comloginState: false,
        },
        oItemData: {  //基本数据接口
            itemInfo: {}, //商品数据
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
            // salesRecord: '', //历史跑单记录

            shorttitleRecommend: "",  //更多短标题
            shorttitleShow: false, //更多短标题布尔值
            descRecommend: "", //更多推荐语
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
                qrcode: '',
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
        oHistory: {  //历史数据接口
            salesRecord: '', //历史跑单记录
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
    },
    created: function () {
        if (web_config['token'] != '') {
            this.oCommon.comloginState = true;
        }
        this.ajaxInfo();
    },
    mounted: function () {

    },
    filters: {
        scoreFun: function (score) {
            switch (score) {
                case -1:
                    return 'hdk-top top-right-down';
                case 0:
                    return 'hdk-line';
                case 1:
                    return 'hdk-top';
            }
        },
        approveFun: function (name) {
            switch (name) {
                case '1':
                    return '待认证';
                case '2':
                    return '已认证';
                case '3':
                    return '未验证';
            }
        },
        moneyConversion: function (number) {
            if (number) {
                if (number.length <= 4) return number;
                if (number.length >= 5) {
                    return Math.round((number / 10000) * 100) / 100;
                }
            }
        },
        pidFilter: function (name) {  //pid -
            var newStr;
            if (name) {
                if (name.length === 2) {
                    newStr = name.substr(0, 1) + '*';
                } else if (name.length > 2) {
                    var char = '';
                    for (var i = 0, len = name.length - 2; i < len; i++) {
                        char += '*';
                    }
                    // newStr = name.substr(0, 2) + char.substr(0, 3) + name.substr(-1, 1);
                    newStr = char.substr(0, 4) + name.substr(-8, 4);
                } else {
                    newStr = name;
                }
            }
            return newStr;
        },
        pidData: function (item) {  //pid - 过滤添加信息
            switch (item.type) {
                case '0':
                    return (item.pid) + '（' + item.pid_name + '）';
                    break;
                case '1':
                    return (item.pid) + '（' + item.pid_name + '）';
                    break;
                default:
                    return (item.pid) + '（' + item.pid_name + '）';
            }
        },
        copyImg: function (item) {
            return 'https://img.istyle.live/imgcdn/' + $.md5(item) + '.jpg?src=' + encodeURIComponent(item);
        }
    },
    methods: {
        copyImg: function (picUrl) {
            return 'https://img.istyle.live/imgcdn/' + $.md5(picUrl) + '.jpg?src=' + encodeURIComponent(picUrl);
        },
        ajaxInfo: function () {
            var self = this;
            ajaxPost("/api/common/goods/view", {
                id: self.oCommon.id
            }, function (data) {
                if (data.code == 0) {
                    self.oItemData.itemInfo = data.data.item;
                    self.oItemData.sellerId = self.oItemData.itemInfo.goods.user_num_id;
                    self.oItemData.itemId = self.oItemData.itemInfo.goods.num_iid;

                    var taobaoArr = self.oItemData.itemInfo.goods.p_list;
                    if (taobaoArr) {
                        for (var i = 0; i < taobaoArr.length; i++) {
                            self.oItemData.taobaoImage.push(taobaoArr[i])
                        }
                    }
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
                    });
                } else {
                    layer.msg(data.message, {
                        shade: 0.4,
                        shadeClose: true,
                    });
                }
            }, function () { })
        },
        ajaxhistory: function () { //历史数据
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
        ajaxTodaySales: function () { //走势图
            var self = this;
            ajaxPost("/api/common/goods/get_today_sales", {
                num_iid: self.oItemData.itemId
            }, function (data) {
                if (data.data.content && data.data.content.status == '1') {
                    var DATA = data.data.content.data;
                    self.oEchartToday.check_hour = DATA.check_hour;
                    self.oEchartToday.saletime = DATA.saletime;
                    self.oEchartToday.sale = DATA.sale;
                }
            }, function () {

            })
        },
        countDown: function (endtime) { //倒计时方法
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
        FunCountDown: function () {  //倒计时 -函数
            var self = this;
            self.dataTime.oClearInterval = setInterval(function () {
                var time = self.countDown(self.dataTime.endtime);
            }, 1000);
        },
        ajaxVideo: function () {  //视频 --数据接口
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
        adderImg: function (event) { //显示图片
            var copy = $(event.target).attr('datatips');
            layer.tips(copy, $(event.target), {
                skin: 'popup-layer',
                time: 0,
                tips: [2, '#ccc'],
            });
        },
        adderImg1: function (event) { //显示图片
            var copy = $(event.target).attr('datatips');
            layer.tips(copy, $(event.target), {
                skin: 'popup-layer content-top-lookimg',
                time: 0,
                tips: [1, '#fff'],
            });
        },
        copyBtn: function (clickClass, copyClass) { //复制公共方法
            var clipboard = new ClipboardJS(clickClass, {
                target: function () {
                    return document.querySelector(copyClass);
                },
                // container: document.querySelector(copyClass),
            });
            clipboard.on('success', function (e) {
                layer.msg('复制成功！', {
                    shade: 0.4,
                    time: 1500,
                    shadeClose: true,
                });
                e.clearSelection();
                clipboard.destroy();
            });
            clipboard.on('error', function (e) {
                layer.msg('由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！', {
                    icon: 2
                });
            });
        },
        seeVideo: function (url) {  //淘宝评论视频
            var video =
                '<video class="comvideo" preload="auto" webkit-playsinline="true" playsinline="true" controls autoplay>' +
                '<source src=' + url + ' type="video/mp4">' +
                '<source src=' + url + ' type="video/ogg">' +
                '<source src=' + url + ' type="video/webm">' +
                '</video>';
            layer.open({
                type: 1,
                title: '视频',
                shadeClose: true,
                shade: 0.4,
                area: ['560px', ''],
                content: video
            });
        },
        seetcomment: function () {  //淘宝评论-调起
            if (this.taobaoComment.taobaoCount > 0) {
                this.ajaxRatelabel();
                this.taobaoscroll();
            } else {
                layer.msg('没有评论哦', {
                    shadeClose: true,
                    shade: 0.4,
                });
            }
        },
        ajaxComment: function (callback) {  //淘宝评论接口
            var self = this;
            ajaxPost("/api/common/goods/get_ratelist", {
                num_iid: self.oItemData.itemId,
                pageno: self.taobaoComment.taobaoPage,
                pagesize: 10,
            }, function (data) {
                layer.closeAll('loading');
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
        taobaoscroll: function () {  //淘宝评论--滚动加载
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
        ajaxRatelabel: function () {  //淘宝评论--标签
            var self = this;
            var link = "https://rate.tmall.com/listTagClouds.htm?itemId=" + self.oItemData.itemId + "&isAll=true&isInner=true&t=1570446988539&groupId=&_ksTS=1570446988540_680";
            layer.load(2, { shade: 0.1 });
            ajaxGetJsonp(link, {},
                function (data) {
                    layer.closeAll('loading');
                    if (data.tags.tagClouds) {
                        self.taobaoComment.taobaoLabel = data.tags.tagClouds;
                    } else {

                    }
                    self.publicPopup('.jspopup-taobao');
                },
                function () {
                    self.publicPopup('.jspopup-taobao');
                    layer.closeAll('loading');
                }
            )
        },
        ajaxGetVideo: function () {  //获取实拍视频
            var self = this;
            var videolink = "https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?jsv=2.4.8&appKey=12574478&t=1554712612690&sign=59ff83eeadc620f65b072a198f4cf178&api=mtop.taobao.detail.getdetail&v=6.0&dataType=jsonp&ttid=2017%40taobao_h5_6.6.0&AntiCreep=true&type=jsonp&data=%7B%22itemNumId%22%3A%22" + self.oItemData.itemId + "%22%7D";
            layer.load(2, { shade: 0.1 });
            ajaxGetJsonp(videolink, {},
                function (data) {
                    layer.closeAll('loading');
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
                                layer.msg('没有商品视频哦!');
                                self.oItemData.videoHide = false;
                                return;
                            }
                        }
                        if (arr.length <= 0) {
                            layer.msg('没有商品视频哦!');
                            self.oItemData.videoHide = false;
                            return;
                        }
                        self.$nextTick(function () {
                            for (var kk = 0; kk < arr.length; kk++) {
                                self.oItemData.videoLink = arr[0].url;
                                self.oItemData.videoImg = arr[0].videoThumbnailURL;
                            }
                        })
                    } else {
                        layer.alert("点击立即跳转到淘宝去拉动滑动条或登录才能获取到实拍视频哦", {
                            icon: 2,
                            btn: '立即跳转'
                        }, function (index) {
                            pageAll(data.data.url);
                            layer.close(index);
                        });
                    }

                },
                function () {
                    layer.closeAll('loading');
                })
        },
        loginFun: function () { //跳到登录页面去
            var url = encodeURIComponent(encodeURIComponent(window.location.href));
            var strurl = this.oCommon.adminLoginlink + '?returnurl=' + url;
            layer.alert("请先登录", {
                icon: 2,
                btn: '立即登录'
            }, function (index) {
                window.location.href = strurl;
            });
        },
        picBtn: function () {  //跳到合成图片去
            var strurl = '/tools/spic?shopUrl=https://item.taobao.com/item.htm?id=' + this.oItemData.itemId;
            pageAll(strurl);
        },
        tljBtn: function () {  //跳到合成图片去
            var strurl = '/user/market/tlj?href=https://item.taobao.com/item.htm?id=' + this.oItemData.itemId;
            pageAll(strurl);
        },
        wxBtn: function () {  //跳到合成图片去
            var strurl = '/tools/wx?href=https://item.taobao.com/item.htm?id=' + this.oItemData.itemId;
            pageAll(strurl);
        },
        shorttitleBtn: function (item) { //短标题文案
            this.oItemData.strShorttitle = item;
            this.oHistory.shorttitleShow = false
        },
        descRecommendBtn: function (item) { //推荐语文案
            this.oItemData.strDesc = item;
            this.oHistory.descRecommendShow = false
        },
        choiceBtn: function (type, item, index) { //实拍图选择
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
        filtersContent: function (value) { //微信QQ文案模板--截取
            var self = this;

            var content = value.default;
            if (self.oSetting.templateType == 2) {
                content = value.brand;
            }
            else if (self.oSetting.templateType == 3) {
                content = value.custom;
            }

            content = content.replace(/\{标题\}/g, self.oItemData.strShorttitle);
            content = content.replace(/\{短标题\}/g, self.oItemData.strShorttitle);
            content = content.replace(/\{在售价\}/g, parseFloat(self.oItemData.itemInfo.price.price));
            content = content.replace(/\{券后价\}/g, '<span>' + parseFloat(self.oItemData.itemInfo.price.buy_price) + '</span>');
            content = content.replace(/\{推荐语\}/g, self.oItemData.strDesc);
            // content = content.replace(/\{介绍\}/g, self.oItemData.strDesc);
            content = content.replace(/\{券额\}/g, '<span>' + parseFloat(self.oItemData.itemInfo.coupon.coupon_money) + '</span>');
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
        reviseWxBtn: function (sign) {  ////微信QQ弹窗模板 -点击弹出
            this.publicPopup('.jspopup-wxqq');
        },
        shutBtn: function () {  //微信QQ弹窗模板-关闭弹窗
            this.publicClose();
            this.wxqqnavReset();
        },
        wxqqnavReset: function () { ////微信QQ弹窗模板-重置
            this.oSetting.wxqqIndex = 0;
            this.oSetting.comwxqqnav[0].bool = true;
            this.oSetting.comwxqqnav[1].bool = true;
        },
        popupwxqqBtn: function (number) {  ////微信QQ弹窗模板-切换按钮  
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
        customizedAdd: function (item, sign) {  //微信QQ弹窗模板 -- 添加标签
            if (sign == 'wx') {
                document.getElementById('textareaWx').focus();
                this.insertAtCaret('{' + item.name + '}');
            } else {
                document.getElementById('textareaQq').focus();
                this.insertAtCaret('{' + item.name + '}');
            }
        },
        insertAtCaret: function (html) {  //微信QQ弹窗模板 -- 写入标签
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
        templateDefault: function (sign) { //微信QQ弹窗模板 -- 恢复默认模板
            if (sign == 'wx') {
                document.getElementById("textareaWx").innerHTML = this.oSetting.weixin.default;
            } else {
                document.getElementById("textareaQq").innerHTML = this.oSetting.qq.default;
            }
        },
        saveTemplateBtn: function (number, sign) { //微信QQ弹窗模板 -- 保存模板
            var self = this;
            var Text = "";
            if (sign == 'wx') {
                Text = document.getElementById("textareaWx").innerHTML;
            } else {
                Text = document.getElementById("textareaQq").innerHTML;
            }
            if (Text == '') {
                layer.msg('模板不能为空', {
                    shadeClose: true,
                    shade: 0.4,
                });
                return;
            }
            layer.load(2);
            ajaxPost("/api/user/info/template/updateItem", {
                share_set: number,
                set_content: Text
            }, function (data) {
                layer.closeAll();
                if (data.status == '1') {
                    layer.msg(data.message, {
                        shadeClose: true,
                        shade: 0.4,
                    }, function () {
                        self.publicClose();
                        self.wxqqnavReset();
                    });
                } else {
                    layer.msg(data.message, {
                        shadeClose: true,
                        shade: 0.4,
                    });
                    self.wxqqnavReset();
                }
                if (number == 1) {
                    self.oSetting.weixin.custom = Text
                }
                else {
                    self.oSetting.qq.custom = Text
                }
            }, function () {
                layer.closeAll();
                layer.msg('网络错误', {
                    shadeClose: true,
                    shade: 0.4,
                });
                self.wxqqnavReset();
            })
        },
        templateCelarBtn: function (sign) { //微信QQ弹窗模板 -- 清空
            if (sign == 'wx') {
                document.getElementById("textareaWx").innerHTML = "";
            } else {
                document.getElementById("textareaQq").innerHTML = "";
            }
        },
        setPidBtn: function (item, sign) { //pid -- 保存PID设置
            if (sign == 'wx') {
                this.oSetting.weixin.pid = item.pid;
                this.oSetting.weixin.pidName = item.pid_name;
                this.oSetting.weixin.relation_id = item.relation_id;
                this.oSetting.weixin.id = item.id;
                this.oSetting.weixin.show = false;
                this.publicClose();
            } else {
                this.oSetting.qq.pid = item.pid;
                this.oSetting.qq.pidName = item.pid_name;
                this.oSetting.qq.relation_id = item.relation_id;
                this.oSetting.qq.id = item.id;
                this.oSetting.qq.show = false;
                this.publicClose();
            }
            layer.msg('设置成功！', {
                shadeClose: true,
                shade: 0.4,
                time: 2000
            });
        },
        taobaoTokenBtn: function (number, clickClass, copyClass) { //淘口令和转二合一
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
                    relationid = self.oSetting.weixin.relation_id;
                    pid = self.oSetting.weixin.pid;
                    self.oSetting.weixin.status = 1;
                    break;
                case 1:
                    relationid = self.oSetting.qq.relation_id;
                    pid = self.oSetting.qq.pid;
                    self.oSetting.qq.status = 1;
                    break;
                case 2:
                    relationid = self.oSetting.weixin.relation_id;
                    pid = self.oSetting.weixin.pid;
                    self.oSetting.weixin.status = 1;
                    break;
                case 3:
                    relationid = self.oSetting.weixin.relation_id;
                    pid = self.oSetting.weixin.pid;
                    break;
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
            // layer.load(2);
            ajaxPost("/api/common/goods/transform", {
                type: number,
                activity_id: self.oItemData.itemInfo.coupon.activity_id,
                num_iid: self.oItemData.itemId,
                title: self.oItemData.itemInfo.goods.title,
                itempic: self.oItemData.itemInfo.goods.pic_url,
                relationid: relationid,
                pid: pid
            }, function (data) {
                // layer.closeAll();
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
                        layer.msg('生成成功', {
                            shade: 0.4,
                            time: 1000
                        }, function () {
                            document.querySelector(clickClass).click();
                        });
                    }
                    else if (number == 1) {
                        self.oSetting.qq.status = 2;
                        layer.msg('生成成功', {
                            shade: 0.4,
                            time: 1000
                        }, function () {
                            document.querySelector(clickClass).click();
                        });
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
                    layer.msg(data.message, {
                        shadeClose: true,
                        shade: 0.2,
                    })
                }
            }, function () {
                layer.msg('网络错误，请重新检查网络！', {
                    shadeClose: true,
                    shade: 0.4,
                });
            })
        },
        PidFun: function () { //跳到设置Pid页面去
            var self = this;
            layer.alert("未设置pid,请前往个人中心设置pid!", {
                icon: 2,
                btn: '立即前往'
            }, function (index) {
                pageAll(self.oCommon.adminPidlink);
                layer.close(index);
            });
        },
        friendsBtn: function (number) {
            this.oItemData.friendsIndex += number;
        },
        seeImg: function (url) { //双击预览图片
            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                area: '300px',
                shadeClose: true,
                content: '<div><img class="viewPic" src="' + url + '"></div>'
            });
        },
        videoPlayBtn: function (index) {  //视频 - 播放
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
        videostopBtn: function () {  //暂停
            var self = this;
            this.$refs.myVideo[0].pause();
            this.$refs.myVideo[0].addEventListener('pause', function () {
                self.oVideo.playBool = false;
                self.oVideo.loadIcon = false;
            });
        },
        videoEnd: function () {  //播放结束
            var self = this;
            self.$refs.myVideo[0].addEventListener("ended", function () {
                self.$refs.myVideo[0].pause();
                self.oVideo.playBool = false;
            });
        },
        videoExtendBtn: function () {
            this.oDyvideo.videoExtend = false;
        },
        videomoveinIcon: function (name, event) { //商品图标鼠标移入
            layer.tips(name, $(event.target), {
                time: 0,
                tips: [1, '#553cf7'],
            });
        },
        setNav: function (id) {
            this.oSetting.navId = id;
        },
        setTemplateType: function (id) {
            this.oSetting.templateType = id;
        },
        unitePic: function (copyClass, copyImgClass, callback) {
            // var $this = this;
            html2canvas(document.querySelector(copyClass), {
                allowTaint: false,
                useCORS: true,
                // scale: scale, // 添加的scale 参数
                // canvas: canvas, //自定义 canvas
                logging: true, //日志开关，便于查看html2canvas的内部执行流程
            }).then(function (canvas) {
                var b = canvas.toDataURL("image/png", 1.0);
                // b = b.substring(22);

                var image = new Image();
                image.src = b;
                document.querySelector(copyImgClass).append(image);
                callback({
                    img: b
                });
            })
        },
        downImgMake: function (picUrl) {
            this.downloadIamge(picUrl, Math.round(1E3 * Math.random()))
        },
        downloadIamge: function (picUrl, b) {
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
    },
}


$(function () {
    $('.go-btn').on("click", function () {
        window.open(web_config['item_buy']);
    });

    $('.btn-goods-buy-token').on("click", function () {
        showGoodsModal();
    });

    $('.btn-goods-buy-url').on("click", function () {
        if (mobileUtil.isWeixin) {
            showGoodsModal();
        } else {
            window.open(web_config['item_buy']);
        }
    });

    function showGoodsModal () {
        if (web_config['item_token']) {
            openGoodsModal()
        } else {
            getGoodsToken()
        }
    }

    function getGoodsToken () {
        ajaxPost("/api/common/goods/click", {
            num_iid: web_config['item_id']
        }, function (res) {
            console.log(res)
            if (res.data && res.data.item && res.data.item.click && res.data.item.click.tao_token) {
                web_config['item_token_content'] = res.data.item.click.tao_token_content;
                web_config['item_token'] = res.data.item.click.tao_token;
                $("#goodsModalTokenContent").html(res.data.item.click.tao_token_content);

                openGoodsModal()
            }
        })
    }

    function openGoodsModal () {
        var goodsTokenModal = new bootstrap.Modal(document.getElementById('goodsTokenModal'), {
            keyboard: false
        })
        goodsTokenModal.toggle()

        $('.copytextBtn').on("click", function () {
            var content = '复制框内整段文字，打开【手-机-淘-宝】即可领券购买。' + web_config['item_token']
            var code = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
            var clipboard = new ClipboardJS('.copytextBtn', {
                // text: function (trigger) {
                //     return trigger.getAttribute('data-clipboard-text');
                // },
                container: document.getElementById('goodsTokenModal'),
                text () {
                    return code
                }
            })

            clipboard.on('success', (e) => {
                console.info('Action:', e.action);
                console.info('Text:', e.text);
                console.info('Trigger:', e.trigger);

                e.clearSelection()
                clipboard.destroy()
                // this.copied = true
                // Toast.info('代码已复制到剪贴板')
                // this.modelBtnText = '复制成功'
                console.log('成果')
                setTimeout(() => {
                    // this.copied = false
                }, 2000)
            })
            clipboard.on('error', function (e) {
                console.log(e)
            })
        });
    }

});


// Vue.use(VueStorage, {
//     namespace: 'pro__', // key prefix
//     name: 'ls', // name variable Vue.[ls] or this.[$ls],
//     storage: 'local', // storage name session, local, memory
// });

// web_config['token'] = Vue.ls.get('member_token')

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
    $.ajax({
        type: 'GET',
        url: url.indexOf('http') === 0 ? url : web_config['api_url'] + url,
        data: Object.assign(data, {
            hpt_times: web_config['hpt_times'],
            hpt_sign: web_config['hpt_sign'],
            member_token: web_config['token'],
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

var ajaxPost = function (url, data, successfun, errorfun) {
    var temp_errorfun = function (xhr, type) { };
    if (errorfun) {
        temp_errorfun = errorfun;
    }
    $.ajax({
        type: 'POST',
        url: url.indexOf('http') === 0 ? url : web_config['api_url'] + url,
        data: Object.assign(data, {
            hpt_times: web_config['hpt_times'],
            hpt_sign: web_config['hpt_sign'],
            member_token: web_config['token'],
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