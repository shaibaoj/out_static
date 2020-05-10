var vmdetails = new Vue({
    el: "#vmdetails",
    mixins: [vmminxShopData, vmminxdetails],
    data: {
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
        this.ajaxInfo();
    },
    mounted: function () {

    },
    filters: {
    },
    methods: {
        ajaxInfo: function () {
            var self = this;
            vmAjaxPost("/api/common/goods/view", {
                id: self.oCommon.id
            }, function (data) {
                if (data.info.status == 0) {
                    self.oItemData.itemInfo = data.data.item;
                    self.oItemData.sellerId = self.oItemData.itemInfo.goods.user_num_id;
                    self.oItemData.itemId = self.oItemData.itemInfo.goods.num_iid;

                    var taobaoArr = self.oItemData.itemInfo.goods.picList;
                    if(taobaoArr){
                        for (var i = 0; i < taobaoArr.length; i++) {
                            self.oItemData.taobaoImage.push( taobaoArr[i])
                        }
                    }
                    // self.oItemData.taobaoImage.push(self.oItemData.itemInfo.itempic_copy);
                    // self.oItemData.strItempicArr.push(self.oItemData.itemInfo.itempic_copy);
                    if(taobaoArr){
                        self.oItemData.strItempicArr.push(self.oItemData.taobaoImage[self.oItemData.taobaoImage.length-1]);
                    }

                    if(self.oItemData.itemInfo.videos){                     
                        self.oItemData.videoImg = self.oItemData.itemInfo.videos.pic_url;
                        self.oItemData.videoLink = self.oItemData.itemInfo.videos.url;
                    }

                    self.oItemData.strShorttitle = self.oItemData.itemInfo.goods.d_title;
                    if(!self.oItemData.strShorttitle){
                        self.oItemData.strShorttitle = self.oItemData.itemInfo.goods.title;
                    }
                    self.oItemData.strDesc = self.oItemData.itemInfo.goods.comment;

                    self.dataTime.endtime = self.oItemData.itemInfo.start_time;
                    self.dataTime.itemType = self.oItemData.itemInfo.item_type;
                    if (self.dataTime.itemType > 0) {
                        self.FunCountDown();
                    }
                    self.$nextTick(function () {
                        self.oItemData.wholeShow = true;
                        self.ajaxUser();
                        self.ajaxComment(true);
                        self.ajaxhistory();
                        self.ajaxTodaySales();
                        self.ajaxSignin();
                        self.ajaxRecommend();
                        self.ajaxset();  //微信QQ文案模板接口
                        self.ajaxVideo();
                        var Arr = [
                            {
                                id: self.oCommon.id,
                                fqcat: self.oItemData.itemInfo.fqcat
                            }
                        ];
                        self.getonFun(Arr);
                    });

                } else {
                    layer.msg(data.info.status_err, {
                        shade: 0.4,
                        shadeClose: true,
                    });
                }
            }, function () {

            })
        },
        ajaxUser: function () { //用户信息
            var self = this;
            vmAjaxPost("/detail/seller_info", {
                id: self.oItemData.sellerId
            }, function (data) {
                if (data.status == '1') {
                    self.sellerInfo = data.data;
                }
            }, function () {

            })
        },
        ajaxhistory: function () { //历史数据
            var self = this;
            vmAjaxPost("/api/common/goods/history", {
                num_iid: self.oItemData.itemId
            }, function (data) {
                if (data.data.content.status == '1') {
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
                        setTimeout(function () {
                            self.swiperContent();
                        }, 30)
                    })
                }

            })
        },
        echartOption: function (oTime, oSales, str) { //走势图
            var dom = document.getElementById("echartToday");
            var myChart = echarts.init(dom);
            option = {
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
        tabBtn: function (index) { //切换图标
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
        ajaxTodaySales: function () { //走势图
            var self = this;
            vmAjaxPost("/api/common/goods/get_today_sales", {
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

            }, function () {

            })
        },
        ajaxRecommend: function () { //好单推荐
            var self = this;
            vmAjaxPost("/api/common/goods/get_recommend_items", {
                num_iid: self.oItemData.itemId,
                son_category: self.oItemData.itemInfo.son_category
            }, function (data) {
                if (data.data.content.status == '1') {
                    self.oRecommend = data.data.content.data;

                    self.$nextTick(function () {
                        setTimeout(function () {
                            self.swiperrecommend();
                            self.echoImg();
                        }, 30)
                    })
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
            vmAjaxPost("/api/common/goods/trill_video_list", {
                num_iid: self.oItemData.itemId,
                p: self.publicList.pageNumber,
            }, function (data) {
                if (data.data.content.status == '1') {
                    self.publicList.productList = data.data.content.data;
                    self.publicList.count = data.data.content.count;
                    self.$nextTick(function () {
                        self.swiperFun();
                    })
                }

            })
        },
        swiperFun: function () {
            var self = this;
            var swiper = new Swiper('.dyswiperContainer0', {
                slidesPerView: '5',
                spaceBetween: 15,
                slideToClickedSlide: false,  //是否可以点击 
                prevButton: '.swiper-button-prev4',
                nextButton: '.swiper-button-next4',
                onTransitionEnd: function (swiper) {
                    self.videostopBtn();
                },
            });
        },
    },
})