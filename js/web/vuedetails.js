var vmminxdetails = {  //公共方法
    data: {
        oCommon: {
            id: URLPrefix.item_id,
            comloginState: false,
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
            strItempicArr: [], //存放选中的图片 默认推广长图

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
            material_info:[]
        },
        sellerInfo: '',  //用户数据接口
        oRecommend: "", // 好单推荐的接口数据

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
        oSetTemplate: {  //微信QQ文案模板接口
            contentTaoword: "", //显示弹窗分享文案
            contentlink: "", //显示弹窗链接文案

            showTaowordShare: '', //微信   //页面上显示模板
            showLinkShare: '',

            copy_taoword_share: "", //需要复制的模板
            copy_link_share: '',

            defaultShare: '', //默认分享文案 
            defaultlink: '', //默认链接文案

            changechain: {
                Token: "{淘口令}",
                link: '{二合一}',
            },
            comwxqqnav: [
                {
                    number: 0,
                    name: "修改推广文案",
                    bool: true,
                },
                {
                    number: 1,
                    name: "修改淘口令文案",
                    bool: false,
                },
                {
                    number: 2,
                    name: "修改短链接文案",
                    bool: false,
                },
            ],
            wxqqIndex: 0,
            listArrWx: [
                {
                    name: "短标题",
                },
                {
                    name: "原价",
                },
                {
                    name: "券后价",
                },
                {
                    name: "介绍",
                },
                {
                    name: "淘口令",
                }
            ],
            listArrQq: [
                {
                    name: "短标题",

                },
                {
                    name: "原价",
                },
                {
                    name: "券后价",
                },
                {
                    name: "介绍",
                },
                {
                    name: "二合一",
                }
            ],
        },
        oSetting: { //设置pid接口
            pidArr: '',
            defaultWeChatPid: '',
            defaultQqPid: '',


            RelationidWeChat: '', //需要传过去的隧道ID
            RelationidQq: '',
            RelationidOther: '',

            OtherPid: '',

            setShow: false,
            setQQShow: false,

            allPidNull: false, //true表示不为空有pid
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

    },
    filters: {
        scoreFun: function (score) {
            switch (score) {
                case -1:
                    return 'hdk-top top-right-down';
                    break;
                case 0:
                    return 'hdk-line';
                    break;
                case 1:
                    return 'hdk-top';
                    break;
            }
        },
        approveFun: function (name) {
            switch (name) {
                case '1':
                    return '待认证';
                    break;
                case '2':
                    return '已认证';
                    break;
                case '3':
                    return '未验证';
                    break;
            }
        },
        moneyConversion: function (number) {
            if (number) {
                if (number.length <= 4) return number;
                if (number.length >= 5) {
                    var number_2 = Math.round((number / 10000) * 100) / 100;
                    return number_2;
                }
            }
        },
        pidFilter: function (name) {  //pid -
            var newStr;
            if(name){
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
                    return (item.pid) + '（微信）';
                    break;
                case '1':
                    return (item.pid) + '（QQ）';
                    break;
                default:
                    return (item.pid) + '（其它）';
            }
        }
    },
    created: function () {

    },
    mounted: function () {

    },

    watch: {


    },
    methods: {
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
            var self = this;
            console.log("clickClass::::"+clickClass+"[copyClass:::+"+copyClass+"]")
            var clipboard = new ClipboardJS(clickClass, {
                target: function () {
                    return document.querySelector(copyClass);
                }
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
            vmAjaxPost("/api/common/goods/get_ratelist", {
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
            vmAjaxGetJsonp(link, {},
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
                })
        },
        swiperContent: function () {    //主图实拍图轮播
            var self = this;
            var swiperpic = new Swiper('.content-swiper', {
                prevButton: '.swiper-button-prev1',
                nextButton: '.swiper-button-next1',
                slidesPerView: 6,
                paginationClickable: true,
                observer: true,
                // initialSlide: self.oCommon.swiperIndex,
                autoplayDisableOnInteraction: false,
                spaceBetween: 9
            });

        },
        ajaxGetVideo: function () {  //获取实拍视频
            var self = this;
            var videolink = "https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?jsv=2.4.8&appKey=12574478&t=1554712612690&sign=59ff83eeadc620f65b072a198f4cf178&api=mtop.taobao.detail.getdetail&v=6.0&dataType=jsonp&ttid=2017%40taobao_h5_6.6.0&AntiCreep=true&type=jsonp&data=%7B%22itemNumId%22%3A%22" + self.oItemData.itemId + "%22%7D";
            layer.load(2, { shade: 0.1 });
            vmAjaxGetJsonp(videolink, {},
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
            vmTestInput.vmPageAll(strurl);
        },
        tljBtn: function () {  //跳到合成图片去
            var strurl = '/user/market/tlj?href=https://item.taobao.com/item.htm?id=' + this.oItemData.itemId;
            vmTestInput.vmPageAll(strurl);
        },
        shorttitleBtn: function (item) { //短标题文案
            this.oItemData.strShorttitle = item;
            this.oHistory.shorttitleShow = false
        },
        descRecommendBtn: function (item) { //推荐语文案
            this.oItemData.strDesc = item;
            this.oHistory.descRecommendShow = false
        },
        choiceBtn: function (item, index) { //实拍图选择
            if (this.oItemData.strItempicArr.length == 0) {
                this.oItemData.strItempicArr.push(item);
            } else {
                var xIndex = this.oItemData.strItempicArr.indexOf(item);
                if (xIndex >= 0) {
                    this.oItemData.strItempicArr.splice(xIndex, 1);
                    xIndex = null;
                } else {
                    this.oItemData.strItempicArr.push(item);
                }
            }
        },

        ajaxset: function () {   //微信QQ文案模板接口
            var self = this;
            vmAjaxPost("/api/common/stat/get_setting_info", {}, function (res) {
                if (res.info.status == 0) {
                    var setDATA = res.data.setting_data;

                    self.oSetTemplate.contentTaoword = setDATA.content; //自定义文案弹窗显示
                    self.oSetTemplate.contentlink = setDATA.content_qq;

                    self.oSetTemplate.showTaowordShare = setDATA.content;
                    self.oSetTemplate.showLinkShare = setDATA.content_qq;

                    self.oSetTemplate.copy_taoword_share = setDATA.content;
                    self.oSetTemplate.copy_link_share = setDATA.content_qq;

                    self.oSetTemplate.defaultShare = setDATA.content_default;
                    self.oSetTemplate.defaultlink = setDATA.content_qq_default;

                    //处理pid
                    self.oSetting.pidArr = res.data.pid_data;
                    res.data.pid_data.forEach(function (item, index) {
                        switch (item.type) {
                            case '0':
                                self.oSetting.defaultWeChatPid = item.pid + '（微信）';
                                self.oSetting.RelationidWeChat = item.relationid;
                                break;
                            case '1':
                                self.oSetting.defaultQqPid = item.pid + '（QQ）';
                                self.oSetting.RelationidQq = item.relationid;
                                break;
                            default:
                                self.oSetting.OtherPid = item.pid + '（其它）';
                                self.oSetting.RelationidOther = item.relationid;
                                break;
                        }
                    });
                    if (self.oSetting.defaultWeChatPid == '' && self.oSetting
                        .defaultQqPid != '') {
                        self.oSetting.defaultWeChatPid = self.oSetting.defaultQqPid;
                        self.oSetting.RelationidWeChat = self.oSetting.RelationidQq;
                    };
                    if (self.oSetting.defaultQqPid == '' && self.oSetting
                        .defaultWeChatPid != '') {
                        self.oSetting.defaultQqPid = self.oSetting.defaultWeChatPid;
                        self.oSetting.RelationidQq = self.oSetting.RelationidWeChat;
                    };
                    if (self.oSetting.defaultQqPid == '' && self.oSetting
                        .defaultWeChatPid == '' && self.oSetting.OtherPid != '') {
                        self.oSetting.defaultWeChatPid = self.oSetting.OtherPid;
                        self.oSetting.defaultQqPid = self.oSetting.OtherPid;

                        self.oSetting.RelationidWeChat = self.oSetting.relationid;
                        self.oSetting.RelationidQq = self.oSetting.relationid;
                    };
                    if (self.oSetting.defaultQqPid == '' && self.oSetting
                        .defaultWeChatPid == '' && self.oSetting.OtherPid == '') {
                        self.oSetting.allPidNull = false;
                    } else {
                        self.oSetting.allPidNull = true;
                    }
                } else {
                    self.oSetting.allPidNull = false;
                }
            }, function () {

            })
        },
        filtersContent: function (value, sign) { //微信QQ文案模板--截取
            var self = this;

            var content = value.replace(/\{标题\}/g, self.oItemData.strShorttitle);
            content = content.replace(/\{短标题\}/g, self.oItemData.strShorttitle);
            content = content.replace(/\{在售价\}/g, parseFloat(self.oItemData.itemInfo.price.price));
            content = content.replace(/\{券后价\}/g, parseFloat(self.oItemData.itemInfo.price.buy_price));
            content = content.replace(/\{推荐语\}/g, self.oItemData.strDesc);
            content = content.replace(/\{介绍\}/g, self.oItemData.strDesc);
            content = content.replace(/\{券额\}/g, parseFloat(self.oItemData.itemInfo.coupon.coupon_money));
            content = content.replace(/\{图片\}/g, '');
            content = content.replace(/\{淘口令\}/g, self.oSetTemplate.changechain.Token);
            content = content.replace(/\{二合一\}/g, self.oSetTemplate.changechain.link);
            content = content.replace(/\{二合一长链接\}/g, self.oItemData.itemInfo.click.url);
            content = content.replace(/\{二合一短链接\}/g, self.oSetTemplate.changechain.link);
            content = content.replace(/\{二合一淘点金短链接\}/g, self.oSetTemplate.changechain.link);
            content = content.replace(/\{二合一淘口令\}/g, self.oSetTemplate.changechain.Token);

            if (sign == 'wx') {
                return content;
            } else {
                return content;
            }
        },
        reviseWxBtn: function (sign) {  ////微信QQ弹窗模板 -点击弹出
            if (sign == 'wx') {
                this.oSetTemplate.comwxqqnav[1].bool = true;
            } else {
                this.oSetTemplate.comwxqqnav[2].bool = true;
            }
            this.publicPopup('.jspopup-wxqq');

        },
        shutBtn: function () {  //微信QQ弹窗模板-关闭弹窗
            this.publicClose();
            this.wxqqnavReset();
        },
        wxqqnavReset: function () { ////微信QQ弹窗模板-重置
            this.oSetTemplate.wxqqIndex = 0;
            this.oSetTemplate.comwxqqnav[1].bool = false;
            this.oSetTemplate.comwxqqnav[2].bool = false;
        },
        popupwxqqBtn: function (number) {  ////微信QQ弹窗模板-切换按钮  
            if (number == 1 || number == 2) {
                if (!this.oCommon.comloginState) {
                    this.loginFun();
                } else {
                    this.oSetTemplate.wxqqIndex = number;
                }

            } else {
                this.oSetTemplate.wxqqIndex = number;
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
                document.getElementById("textareaWx").innerHTML = this.oSetTemplate.defaultShare;
            } else {
                document.getElementById("textareaQq").innerHTML = this.oSetTemplate.defaultlink;
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
            vmAjaxPost("/api/user/info/template/updateItem", {
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
                    self.ajaxset();
                } else {
                    layer.msg(data.message, {
                        shadeClose: true,
                        shade: 0.4,
                    });
                    self.wxqqnavReset();
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
            var str;
            switch (item.type) {
                case '0':
                    str = (item.pid) + '（微信）';
                    break;
                case '1':
                    str = (item.pid) + '（QQ）';
                    break;
                default:
                    str = (item.pid) + '（其它）';
            };
            if (sign == 'wx') {
                this.oSetting.defaultWeChatPid = str;
                this.oSetting.RelationidWeChat = item.relationid;
                this.oSetting.setShow = false;
                this.publicClose();
            } else {
                this.oSetting.defaultQqPid = str;
                this.oSetting.RelationidQq = item.relationid;
                this.oSetting.setQQShow = false;
                this.publicClose();
            }
            layer.msg('设置成功！', {
                shadeClose: true,
                shade: 0.4,
                time: 2000
            });
        },
        taobaoTokenBtn: function (number) { //淘口令和转二合一
            var self = this;
            if (!this.oCommon.comloginState) {
                self.loginFun();
                return;
            }
            if (!self.oSetting.allPidNull) {
                self.PidFun();
                return;
            }
            var relationid, pidId;
            switch (number) { //0是淘口令 1是生成长图 2是转二合一
                case 0:
                    relationid = self.oSetting.RelationidWeChat;
                    pidId = self.oSetting.defaultWeChatPid;
                    break;
                case 2:
                    relationid = self.oSetting.RelationidQq;
                    pidId = self.oSetting.defaultQqPid;
                    break;
                default:
            }
            var pid = pidId.substring(0, pidId.length - 4);
            layer.load(2);
            vmAjaxPost("/api/common/goods/transform", {
                type: number,
                activity_id: self.oItemData.itemInfo.coupon.activity_id,
                num_iid: self.oItemData.itemId,
                title: self.oItemData.itemInfo.goods.title,
                itempic: self.oItemData.itemInfo.goods.pic_url,
                relationid: relationid,
                pid: pid
            }, function (data) {
                layer.closeAll();
                if (data.info.status == 0) {
                    self.oSetTemplate.changechain.Token = data.data.goods.click.tao_token;
                    self.oSetTemplate.changechain.link = data.data.goods.click.short_url;
                    if (number == 0) {
                        layer.msg('淘口令已生成', {
                            shade: 0.4,
                            time: 1500
                        }, function () {
                            // document.getElementById("copywx").click();
                        });
                    } else {
                        layer.msg('链接已生成', {
                            shade: 0.4,
                            time: 1500
                        }, function () {
                            // document.getElementById("copyqq").click();
                        });
                    }
                } else {
                    layer.msg(data.info.status_err, {
                        shadeClose: true,
                        shade: 0.2,
                    })
                }
            }, function () {
                layer.closeAll();
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
                vmTestInput.vmPageAll(self.oCommon.adminPidlink);
                layer.close(index);
            });
        },
        friendsBtn: function (number) {  //朋友圈文案--分页
            this.oItemData.friendsIndex += number;
        },
        ajaxSignin: function () { //登录
            var self = this;
            vmAjaxPost("/api/common/stat/loginfo", {}, function (data) {
                if (data.data.loginState == 1) {
                    self.oCommon.comloginState = true;
                } else {
                    self.oCommon.comloginState = false;
                }

            }, function () {

            })
        },
        swiperrecommend: function () {  //好单推荐 --swiper
            var swiper1 = new Swiper('.recommend-swiper', {
                prevButton: '.swiper-button-prev2',
                nextButton: '.swiper-button-next2',
                slidesPerView: 5,
                paginationClickable: true,
                autoplayDisableOnInteraction: false,
                observer: true,
                spaceBetween: 14,
            });
        },
        seeImg: function (url) { //双击预览图片
            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                area: '300px',
                shadeClose: true,
                content: '<div><img src="' + url + '"></div>'
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
                        // self.pLinkFun();
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
    }
};


//详情页面视频举报弹窗
Vue.component('component-detailsjb', {
    mixins: [vmminxShopData],
    data: function () {
        return {
            oPublic: {
                reportImg: '',
            },
            oVideo: {  //视频控件
                playBool: false,  //是否播放
                videooIndex: 0,   //选中了第几个视频

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
            oVideoreport: {
                videohideJb: false,

                videoItemId: '',
                itemId: '',
                reportLSelected: 1000, //选中第几个
                reportL: '', //理由
                reportQQ: '', //qq   


            },
            oVideoReportSelected: [
                {
                    id: 1,
                    describe: "违法违规",
                },
                {
                    id: 2,
                    describe: "盗用视频",
                },
                {
                    id: 3,
                    describe: "商品信息有误",
                },
                {
                    id: 0,
                    describe: "其它",
                },
            ],
            oToken: {
                token: '',
                toeknTime: '',
                toeknBoolean: false
            },
        }
    },
    methods: {
        videoReport: function (item) {   //视频举报
            this.publicPopup(".js-PopupVideoReport");
            this.oVideoreport.videohideJb = true;
            this.oVideoreport.videoitemId = item.id;
            this.oVideoreport.itemId = item.itemid;
            this.ajaxGetToken();
        },
        videoReportBtn: function () { //举报提交
            var self = this;
            if (self.oVideoreport.reportLSelected == 1000) {
                layer.msg('请先选择理由', {
                    time: 1500,
                    shade: [0.1, '#fff'],
                    shadeClose: true
                });
                return;
            }
            if (self.oVideoreport.reportL == '') {
                layer.msg('请先填写举报理由', {
                    time: 1500,
                    shade: [0.1, '#fff'],
                    shadeClose: true
                });
                return;
            }
            if (self.oVideoreport.reportQQ == '') {
                layer.msg('请输入您的联系QQ', {
                    time: 1500,
                    shade: [0.1, '#fff'],
                    shadeClose: true
                });
                return;
            }
            vmAjaxPost("/trill/trill_report", {
                trill_id: self.oVideoreport.videoitemId,
                itemid: self.oVideoreport.itemId,
                report_type: self.oVideoreport.reportLSelected,
                report_reason: self.oVideoreport.reportL,
                report_qq: self.oVideoreport.reportQQ,
                report_image: self.oPublic.reportImg,
                report_source: 1,
            }, function (data) {
                if (data.status == '200') {
                    self.videojbPrdoucShut();
                    layer.msg(data.message, {
                        icon: 1,
                        time: 2000
                    });
                } else {
                    layer.msg(data.message, {
                        icon: 2,
                        time: 2000
                    });
                }

            }, function () {

            })
        },
        videogetCouponSelected: function (item) {  //举报--选择理由
            this.oVideoreport.reportLSelected = item.id;
        },
        videojbPrdoucShut: function () { //  举报弹窗-关闭
            this.oVideoreport.videohideJb = false;
            this.publicClose();
            this.oVideoreport.videoItemId = "";
            this.oVideoreport.reportLSelected = 1000;
            this.oVideoreport.reportL = "";
            this.oVideoreport.reportQQ = "";
            this.oPublic.reportImg = "";
        },
    },
    template:
        '<div class="inJu-wrap details-jbwrap  comPopupHide js-PopupVideoReport" >'+
        '<div class="in-modal-inner" v-if="oVideoreport.videohideJb">'+
        '<p class="in-modal-hd">举报视频</p>'+
        '<p class="in-modal-p">请选择并填写举报理由，我们会对视频进行相应处理</p>'+
        '<ul class="in-modal-list">'+
        '<li><span>选择理由</span>'+
        '<div class="modal-detail">'+
        '<i v-for="item in oVideoReportSelected" :class= "oVideoreport.reportLSelected == item.id?\'active\':\'\'"@click="videogetCouponSelected(item)" > {{ item.describe }}</i >'+
        '</div >'+
        '</li >'+
        '<li>'+
        '<span>举报理由</span>'+
        '<input type="text" maxlength="20" v-model="oVideoreport.reportL" placeholder="请写下举报视频的理由">'+
        '</li>'+
        '<li>'+
        '<span>联系Q号</span>'+
        '<input type="text" v-model="oVideoreport.reportQQ" maxlength="12" onkeyup="this.value=this.value.replace(/[^0-9]/g,\'\')" placeholder="请输入您的联系QQ">'+
        '</li>'+
        '</ul>'+
        '<div class="in-modal-up">'+
        '<span>上传截图</span>'+
        '<div class="in-modal-img" v-if="oPublic.reportImg" @click="seeImg(oPublic.reportImg)"><img :src="oPublic.reportImg"></div>'+
        '<div class="in-modal-upbox">'+
        '<em>+</em>'+
        '<input type="file" @change="ReportreadFile($event)">'+
        '</div>'+
        '</div>'+
        '<div class="in-modal-footer">'+
        '<span class="in-modal-btn comHover-color"  @click="videoReportBtn()">提交</span>'+
        '<span class="in-modal-btn comHover-color"  @click="videojbPrdoucShut()" > 取消</span >'+
        '</div>'+
        '</div>'+
        '</div>'
});

//实拍图 --商品详情页面
Vue.component('newvmPic', {
    props: ['goodsid'],
    data: function () {
        return {
            loadmsg: true,
            cacheId: '',  //缓存Id
            realPicoPage: {
                pageNumber: 1,
                pageImgAll: [],
            },
            realChoiceImg: [],
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
            vmAjaxPost("/tool/get_evaluate_imageurl", {
                itemid: self.goodsid,
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
        realchoiceBtn: function (item) {
            if (this.realChoiceImg.length < 9) {
                if (this.realChoiceImg.length == 0) {
                    this.realChoiceImg.push(item);
                } else {
                    var xIndex = this.realChoiceImg.indexOf(item);
                    if (xIndex >= 0) {
                        this.realChoiceImg.splice(xIndex, 1);
                        xIndex = null;
                    } else {
                        this.realChoiceImg.push(item);
                    }
                }
            } else {
                var xIndex = this.realChoiceImg.indexOf(item);
                if (xIndex >= 0) {
                    this.realChoiceImg.splice(xIndex, 1);
                    xIndex = null;
                }
                if (this.realChoiceImg.length >= 9) {
                    layer.msg('最多只能选择9张哦', {
                        time: 1500,
                        shade: 0.1,
                        shadeClose: true
                    });
                }

            }
        },
        realdetermine: function () {
            layer.closeAll();
        },
        CallbackRealpic: function () {
            layer.open({
                type: 1,
                title: false,
                closeBtn: 2,
                shade: 0.4,
                content: $('.js-realPic')
            });
        },
    },
    template:
        '<div class="realPic js-realPic realpic-new">' +
        '<div class="realPic-head clearfix">' +
        '<p>获取实拍图</p>' +
        '<a href="javascript:" class="iconfont hdk-close layui-layer-close layui-layer-close1"></a>' +
        '</div>' +
        '<div class="realpic-box">' +
        '<ul class="realPic-list clearfix">' +
        '<li v-for="(item,index) in realPicoPage.pageImgAll" :class="realChoiceImg[realChoiceImg.indexOf(item)] == item?\'active\':\'\'"  @click="realchoiceBtn(item,index)"><img :src="item+\'_600x600.jpg\'"><div class="realpic-choice"><i></i></div></li>' +
        '</ul>' +
        '<p class="realpic-loading" v-if="loadmsg"> <i class="iconfont hdk-jiazai vmIconLoad"></i><em>数据加载中...</em></p>' +
        '<p class="realpic-loading" v-else>数据已经加载完了</p>' +
        '</div>' +
        '<div class="realpic-btn">' +
        '<span :class="realChoiceImg !=\'\'?\'\':\'active\'" @click="realChoiceImg = []">取消选中</span>' +
        '<span :class="realChoiceImg !=\'\'?\'\':\'active\'" @click="realdetermine()">确定<i>(已选择{{realChoiceImg.length}}/9)</i></span>' +
        '</div>' +
        '</div>'
});