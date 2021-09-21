var vmToolEx = new Vue({
    el: "#vmToolEx",
    data: {
        dataUrL: {
            isAddL: '',
        },
        oCommon: {
            tianmao: 'https://detail.tmall.com/item.htm',
            adminPidlink: '/user/info/pid',
            adminLoginlink: '/public/login',
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

            material_id:0,
            material_info:[],
        },
        oSetting:{
            pidArr: [],
            allPidNull: false, //true表示不为空有pid

            item_url:'',
            coupon_url:'',
            weixin:{
                default:'',
                brand:'',
                custom:'',
                token: "",
                link: '',
                url: '',
                tk_url: '',
                status: 0,
                qrcode:'',
                id:0,
                pid: '',
                pidName: '',
                relation_id: null,
                show:false,
            },
            other:{
                id: 0,
                pid: '',
                pidName: '',
                relation_id: null,
            },
        },
    },
    mounted: function () {
        this.ajaxset();
    },
    methods: {
        clear: function () {
            this.dataUrL.isAddL = '';
            this.dataUrL.UrlAdd = '';
            this.dataUrL.couponAdd = '';
            this.dataUrL.closeAdd = '';
            this.dataUrL.pid = '';
            this.dataUrL.relationId = '';
            if (this.dataUrL.taoword) {
                this.dataUrL.taoword = '';
            }
            layer.msg('已清空', {
                time: 1500,
                shade: 0.1,
                shadeClose: true
            });
        },
        isOpend: function (url) {
            url ? pageAll(url) : layer.msg('地址为空', {
                icon: 2,
                time: 1500,
                shade: 0.1,
                shadeClose: true
            });
        },
        copy: function (classA, classB, number) {
            var clipboard = new ClipboardJS(classA, {
                target: function () {
                    return document.querySelector(classB);
                }
            });
            clipboard.on('success', function (e) {
                layer.msg('复制成功', {
                    icon: 1,
                    time: 1500,
                    shade: 0.1,
                    shadeClose: true
                });
                clipboard.destroy() // 释放内存
            });
            clipboard.on('error', function () {
                layer.msg('复制失败，请手动复制', {
                    icon: 2,
                    time: 1500,
                    shade: 0.1,
                    shadeClose: true
                });
                clipboard.destroy() // 释放内存
            })
        },
        Tbtn: function (number) {
            var $this = this;
            layer.load(2);
            ajaxPost("/api/common/goods/token", {
                content: $this.dataUrL.isAddL,
                analysis_taoword_type: number,
            }, function (data) {
                layer.closeAll();
                if (data.code == 0) {
                    $this.dataUrL.UrlAdd = data.short_url;

                    if(data.data.goods.click.tao_token){
                        $this.oSetting.weixin.token = data.data.goods.click.tao_token;
                    }
                    if(data.data.goods.click.short_url){
                        $this.oSetting.weixin.link = data.data.goods.click.short_url;
                    }
                    if(data.data.goods.click.url){
                        $this.oSetting.weixin.url = data.data.goods.click.url;
                    }
                    if(data.data.goods.click.qrcode){
                        $this.oSetting.weixin.qrcode = data.data.goods.click.qrcode;
                    }
                    if(data.data.goods.click.tk_url){
                        $this.oSetting.weixin.tk_url = data.data.goods.click.tk_url;
                    }
                    if(data.data.goods.coupon.coupon_url){
                        $this.oSetting.coupon_url = data.data.goods.coupon.coupon_url;
                    }
                    if(data.data.goods.goods.item_url){
                        $this.oSetting.item_url = data.data.goods.goods.item_url;
                    }

                    if(data.data.goods && data.data.goods.goods){
                        $this.oItemData.itemInfo = data.data.goods;
    
                        $this.oItemData.strShorttitle = $this.oItemData.itemInfo.goods.d_title;
                        if(!$this.oItemData.strShorttitle){
                            $this.oItemData.strShorttitle = $this.oItemData.itemInfo.goods.title;
                        }
                        $this.oItemData.strDesc = $this.oItemData.itemInfo.goods.comment;

                        $this.oItemData.wholeShow = true;
                    }
                } 
                else if (data.status == 100) {
                    loginFun();
                }
                else if(data.code == -1){
                    $this.publicPopup('.js-setWeChat');
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
        setPidBtn: function (item) { //pid -- 保存PID设置
            this.oSetting.weixin.pid = item.pid;
            this.oSetting.weixin.pidName = item.pid_name;
            this.oSetting.weixin.relation_id = item.relation_id;
            this.oSetting.weixin.id = item.user_pid_id;
            this.oSetting.weixin.show = false;

            this.setUserPid(item.user_pid_id,'wx');

            this.publicClose();
            layer.msg('设置成功！', {
                shadeClose: true,
                shade: 0.4,
                time: 2000
            });
        },
        ajaxset: function () {   //微信QQ文案模板接口
            var self = this;
            ajaxPost("/api/common/stat/get_setting_info", {}, function (res) {
                if (res.code == 0) {
                    var setDATA = res.data.setting_data;

                    self.oSetting.weixin.default = setDATA.content_default;
                    self.oSetting.weixin.brand = setDATA.content_default;
                    self.oSetting.weixin.custom = setDATA.content;

                    self.oSetting.weixin.id = res.data.weixin_pid_id;
                    self.oSetting.other.id = res.data.other_pid_id;

                    //处理pid
                    self.oSetting.pidArr = res.data.items;
                    res.data.items.forEach(function (item, index) {
                        if(item.user_pid_id==self.oSetting.weixin.id){
                            self.oSetting.weixin.pid = item.pid;
                            self.oSetting.weixin.pidName = item.pid_name;
                            self.oSetting.weixin.relation_id = item.relation_id;
                        }
                        else if(item.user_pid_id==self.oSetting.other.id){
                            self.oSetting.other.pid = item.pid;
                            self.oSetting.other.pidName = item.pid_name;
                            self.oSetting.other.relation_id = item.relation_id;
                        }
                    });

                    if(self.oSetting.weixin.id==0&&self.oSetting.other.id>0){

                        self.oSetting.weixin.id = self.oSetting.other.id
                        self.oSetting.weixin.pid = self.oSetting.other.pid
                        self.oSetting.weixin.pidName = self.oSetting.other.pid_name;
                        self.oSetting.weixin.relation_id = self.oSetting.other.relation_id;
                    }

                    if(self.oSetting.weixin.id==0&&self.oSetting.other.id==0){
                        self.oSetting.allPidNull = false;
                    }else{
                        self.oSetting.allPidNull = true;
                    }
                } else {
                    self.oSetting.allPidNull = false;
                }
            }, function () {

            })
        },
        setUserPid: function (id,type) {
            var $this = this;
            ajaxPost("/api/user/user/pid/updateUserPid", {
                id: id,
                pid_type: type,
            }, function (data) {
                if (data.code == 100) {
                    loginFun();
                }
            }, function () {})
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
        filtersContent: function (value) { //微信QQ文案模板--截取
            var self = this;
            var content = value.default;
            if(self.oSetting.templateType==2){
                content = value.brand;
            }
            else if(self.oSetting.templateType==3){
                content = value.custom;
            }

            if(self.oItemData&&self.oItemData.itemInfo&&self.oItemData.itemInfo.price){
                content = content.replace(/\{标题\}/g, self.oItemData.strShorttitle);
                content = content.replace(/\{短标题\}/g, self.oItemData.strShorttitle);
                content = content.replace(/\{在售价\}/g, parseFloat(self.oItemData.itemInfo.price.price));
                content = content.replace(/\{券后价\}/g, '<span>'+parseFloat(self.oItemData.itemInfo.price.buy_price)+'</span>');
                content = content.replace(/\{推荐语\}/g, self.oItemData.strDesc);
                // content = content.replace(/\{介绍\}/g, self.oItemData.strDesc);
                content = content.replace(/\{券额\}/g, '<span>'+parseFloat(self.oItemData.itemInfo.coupon.coupon_money)+'</span>');
                content = content.replace(/\{图片\}/g, '');
            }

            if(value.token!=''||value.link!=''){
                content = content.replace(/\{介绍\}/g, self.oItemData.strDesc);
            }
            else{
                content = content.replace(/\{介绍\}/g, '文案');
            }

            content = content.replace(/\{淘口令\}/g, '<span>'+value.token+'</span>');
            content = content.replace(/\{二合一\}/g, '<span>'+value.link+'</span>');
            content = content.replace(/\{二合一长链接\}/g, '<span>'+value.url+'</span>');
            content = content.replace(/\{二合一短链接\}/g, '<span>'+value.link+'</span>');
            content = content.replace(/\{二合一淘点金短链接\}/g, '<span>'+value.link+'</span>');
            content = content.replace(/\{二合一淘口令\}/g, '<span>'+value.token+'</span>');
            return content;
        },
    },
    filters: {
        pidData: function (item) {  //pid - 过滤添加信息
            switch (item.type) {
                case '0':
                    return (item.pid) + '（'+item.pid_name+'）';
                    break;
                case '1':
                    return (item.pid) + '（'+item.pid_name+'）';
                    break;
                default:
                    return (item.pid) + '（'+item.pid_name+'）';
            }
        },
    }
})