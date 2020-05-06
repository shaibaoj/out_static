var defaultImg = "//staticcdn.haopintui.net/static/platform/images/web/tools/img.png"; //默认图片
var vmToolEx = new Vue({
    el: "#vmToolEx",
    data: {
        goodsId: "",
        Bjurl: "", //输入的地址
        ImgSize: '_400x400.jpg',

        oindexGoodsId: '',
    },
    mounted: function () {

    },
    methods: {
        celarBtn: function () {
            if ($(".contentBox").html() == '') {
                layer.msg("文案为空", {
                    time: 1200
                })
                return;
            }

            layer.alert('是否清空文案', {
                title: "提示",
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    $(".contentBox").empty();
                    layer.close(index);
                },
                cancel: function (index, layero) {
                },
            });
        },
        picBtn: function () {
            var self = this;
            var getidreg = /[\?&]id=(\d+)/;
            if (this.Bjurl.match(getidreg) != null) {
                var id_arr = this.Bjurl.match(getidreg)[1];
                if (id_arr != null) {
                    self.goodsId = id_arr;
                    self.oindexGoodsId = self.goodsId;
                    self.$nextTick(function () {
                        self.$refs.vmpic.ajaxIrealpic(true);
                    })
                } else {
                    layer.msg('请输入有效的商品链接！', {
                        time: 1500,
                        shade: 0.1,
                        shadeClose: true
                    });
                }
            } else {
                layer.msg('无效的商品链接！', {
                    time: 1500,
                    shade: 0.1,
                    shadeClose: true
                });
            }

        },
    },
})