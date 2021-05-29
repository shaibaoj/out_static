var vmToolEx = new Vue({
    el: "#vmToolEx",
    data: {
        isAdd: '',
        oArr: {
            money: 'XX',
            couponsurplus: 'XX',
            couponnum: 'XX',
            couponreceive: 'XX',
            single_sum: 'XX',
            start_time: 'XX',
            end_time: 'XX',
            couponurl: ''
        }
    },
    mounted: function () {},
    methods: {
        clear: function () {
            this.isAdd = '';
            layer.msg('已经清空', {
                time: 1500,
                shade: 0.1,
                shadeClose: true
            });
        },
        queryBtn: function () {
            var self = this;
            if (!self.isAdd) {
                layer.msg('不能为空', {
                    icon: 2,
                    time: 1500,
                    shade: 0.1,
                    shadeClose: true
                });
                return;
            }
            layer.load(2);
            ajaxPost("/api/common/goods/get_coupon_info", {
                content: self.isAdd,
            }, function (data) {
                layer.closeAll();
                if (data.code == 0) {
                    layer.msg(data.message, {
                        icon: 1,
                        time: 1500,
                        shade: 0.1,
                        shadeClose: true
                    });
                    var DATA = data.data.item;
                    self.oArr = {
                        money: DATA.coupon_money,
                        couponsurplus: DATA.remain_count,
                        couponnum: DATA.total_count,
                        couponreceive: DATA.applied_count,
                        single_sum: DATA.coupon_condition,
                        start_time: DATA.create_time,
                        end_time: DATA.end_time,
                        couponurl: DATA.coupon_url
                    };
                } 
                else {
                    layer.msg(data.message, {
                        icon: 2,
                        time: 1500,
                        shade: 0.1,
                        shadeClose: true
                    });
                }
            }, function () {
                layer.closeAll();
                layer.msg('网络错误', {
                    icon: 5,
                    time: 1500,
                    shade: 0.1,
                    shadeClose: true
                });
            })
        },
        btn: function () {
            if (!this.oArr.couponurl) {
                layer.msg('请先查询优惠券', {
                    icon: 2,
                    time: 1500,
                    shade: 0.1,
                    shadeClose: true
                });
                return;
            }
            pageAll(this.oArr.couponurl);
        }
    },
})