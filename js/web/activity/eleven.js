var vmActivity = new Vue({
    el: "#vmActivity",
    mixins: [vmminxShopData],
    data: {
        category: [],
        categoryId: 0,
        categoryCount: '',
        maxPrice: '',
        maxCouponmoney: '',
        maxTkrates: '',
        maxItemsale: '',
        typeArr: [ 1, 0, 2],
        activityType: 0,
        plan:11,
    },
    created() {

    },
    mounted: function () {
        this.categoryFun();
        this.shopList();
        // this.categoryCountFun();
    },
    methods: {
        categoryFun: function () {
            var self = this;
            vmAjaxPost("/api/common/channel/items", {}, function (res) {
                if (res.info.status == 0) {
                    self.category = res.data.items;
                    self.$nextTick(function () {})
                } else {
                    layer.msg(res.info.status_err, {
                        time: 2000,
                        shade: 0.1,
                        shadeClose: true
                    })
                }
            }, function () {
                layer.msg('网络错误，请检查网络重试', {
                    time: 2000,
                    shade: 0.1,
                    shadeClose: true
                })
            })

        },
        categoryCountFun: function () {
            var self = this;
            vmAjaxPost("/api/common/channel/items", {
                cat_id: self.categoryId,
                max_price: self.maxPrice,
                max_couponmoney: self.maxCouponmoney,
                max_tkrates: self.maxTkrates,
                max_itemsale: self.maxItemsale,
                type: self.activityType
            }, function (data) {
                if (data.code == '200') {
                    self.categoryCount = data.data;
                }
            })

        },
        categoryBtn: function (id) {
            this.categoryId = id;
            this.regChoice();
        },
        shopList: function () {
            var self = this;
            if (this.publicList.productList[0]) {
                this.publicList.productList.forEach(function (item, index) {
                    item.itempic = '';
                });
            }
            self.oPublic.setTimeoutClear = setTimeout(function () {
                self.oPublic.loadingShow = true;
            }, self.oPublic.setTime);

            var shopUrl = "/api/common/activity/list";
            var para =  {
                plan:self.plan,
                cid: self.categoryId,
                ipage: self.publicList.pageNumber,
                max_price: self.maxPrice,
                max_couponmoney: self.maxCouponmoney,
                max_tkrates: self.maxTkrates,
                max_itemsale: self.maxItemsale,
                type: self.activityType
            };
            if(self.activityType==0){
                shopUrl = "/api/common/activity/goods";
                para = Object.assign(para,{'activity_type':11,'sort':'day_sales'});
            }
            else if(self.activityType==2){
                shopUrl = null;
            }
            if(shopUrl){
                vmAjaxPost(shopUrl, para, function (data) {
                    if (data.info.status == 0) {
                        self.publicList.productList = data.data.items;
                        self.publicList.count = data.data.pager.page_count == 0 ? 1 : data.data.pager.page_count;
                        self.categoryCount = data.data.pager.count == 0 ? 1 : data.data.pager.count;
                        self.$nextTick(function () {
                            clearTimeout(self.oPublic.setTimeoutClear);
                            self.oPublic.loadingShow = false;
                            self.oPublic.wholeShow = true;
    
                            if (self.publicList.productList.length > 0) {
                                self.oPublic.isDatanull = false;
                                self.echoImg();
                                self.paginationFun(self.publicList.pageNumber);
                            } else {
                                layer.msg('暂无数据', {
                                    time: 2000,
                                    shade: 0.1,
                                    shadeClose: true
                                })
                                self.oPublic.isDatanull = true;
                            }
                        })
                    }
                })
            }
        },
        paginationFun: function (isPage) { //分页
            var self = this;
            $('.inPage').pagination({
                pageCount: self.publicList.count,
                current: isPage,
                prevContent: '<<',
                nextContent: '>>',
                count: 4,
                callback: function (api) {
                    self.publicList.pageNumber = api.getCurrent();
                    self.publicList.pageInput = self.publicList.pageNumber;
                    self.arrowTopFuns();
                    self.shopList();

                }
            });
        },
        PageJump: function () { //最后一页跳转
            this.publicList.pageNumber = this.publicList.count;
            this.publicList.pageInput = this.publicList.count;
            this.arrowTopFuns();
            this.shopList();
            this.paginationFun(this.publicList.count);
        },
        pageSureBtn: function () { //页面跳转确定
            if (this.publicList.pageInput == '') {
                this.publicList.pageInput = 1;
            }
            this.publicList.pageNumber = parseInt(this.publicList.pageInput);
            this.paginationFun(this.publicList.pageInput);
            this.arrowTopFuns();
            this.shopList();
        },
        regChoice: function () {
            this.publicList.pageNumber = 1;
            this.publicList.pageInput = 1;
            // this.categoryCountFun();
            this.shopList();
        },
        arrowTopFuns: function () { //点击分页回到顶部
            document.documentElement.scrollTop = 564;
        },
        typeClick: function (type) {
            this.activityType = type;
            this.categoryId = 0;
            this.categoryCount = '';
            this.maxPrice = '';
            this.maxCouponmoney = '';
            this.maxTkrates = '';
            this.maxItemsale = '';
            this.regChoice();
        }
    }
})
