var defaultImg = "https://img.youdanhui.cn/cms_img/2019-10-24/5db1683b690ce.png",
vmToolEx = new Vue({
    el: "#vmToolEx",
    data: {
        defaultVideoImg: [],
        oPicArr: [],
        VideoArr: [],
        oVideoArrImg: [],
        selectPicArr: [],
        selecCommentArr: [],
        goodsId: "",
        tbUrl: "",
        commodity: {
            name: "无(请先获取信息)",
            Sales: "0"
        },
        isShow: !1,
        ImgSize: "_400x400.jpg",
        shopUrl: Request("shopUrl") ? Request("shopUrl") : "",
        oAjaxVideo: {
            tbvideourl: [],
            dyvideourl: [],
            tbvideoPage: 1,
            tbvideoBool: !1,
            tbSum: 2,
            tbdyVideoArr: [],
            tbdyBool: !0
        }
    },
    mounted: function() {
        this.shopUrl && (this.tbUrl = decodeURIComponent(decodeURIComponent(this.shopUrl)))
    },
    methods: {
        seeImg: function(b) {
            for (var a = [], c = 0; c < this.oPicArr.length; c++) a[c] = {
                src: this.oPicArr[c]
            };
            layer.photos({
                title: "键盘左右键切换图片",
                photos: {
                    start: b,
                    data: a
                },
                shade: .6,
                shift: 5,
                area: "500px"
            })
        },
        seeVideo: function(b) {
            b ? layer.open({
                type: 1,
                title: "商品介绍短片",
                shadeClose: !0,
                area: ["545px", "435px"],
                content: '<video class="TVideo" webkit-playsinline="true" playsinline="true" controls autoplay><source src=' + b + ' type="video/mp4"><source src=' + b + ' type="video/ogg"><source src=' + b + ' type="video/webm"></video>'
            }) : layer.alert("没有视频", {
                icon: 2
            })
        },
        checkBtn: function(b, a, c, d) {
            this[d][a] != b ? (this[d][a] = b, $(c.currentTarget).addClass("TActive")) : (this[d][a] = "", $(c.currentTarget).removeClass("TActive"));
            this.ArrImg = [];
            this.ArrImg = this.selectPicArr.concat(this.selecCommentArr);
            this.$forceUpdate()
        },
        downImgMake: function() {
            var b = this;
            0 == b.selectPicArr.length && 0 == b.selecCommentArr.length ? layer.msg("请先选择要保存的图片", {
                time: 1500,
                shade: .1,
                shadeClose: !0
            }) : (b.selectPicArr.forEach(function(a, c) {
                b.downloadIamge(a, Math.round(1E3 * Math.random()))
            }), b.selecCommentArr.forEach(function(a, c) {
                b.downloadIamge(a, Math.round(1E3 * Math.random()))
            }), b.clearifFun())
        },
        downloadIamge: function(b, a) {
            var c = new Image;
            c.setAttribute("crossOrigin", "anonymous");
            c.onload = function() {
                var b = document.createElement("canvas");
                b.width = c.width;
                b.height = c.height;
                b.getContext("2d").drawImage(c, 0, 0, c.width, c.height);
                b = b.toDataURL("image/png");
                var e = document.createElement("a"),
                    f = new MouseEvent("click");
                e.download = a || "图片";
                e.href = b;
                e.dispatchEvent(f)
            };
            c.src = b
        },
        obtainBtn: function() {
            var b = this,
                a = /[\?&]id=(\d+)/;
            null != this.tbUrl.match(a) ? (a = this.tbUrl.match(a)[1], null != a ? (b.goodsId = a, layer.load(2, {
                shade: .1
            }), ajaxPost("/api/user/tools/tools/toolspic", {
                id: b.goodsId,
            }, function(a) {
                layer.closeAll();
                if(0 == a.info.status){
                    if(0 < a.data.goods.picList.length){
                        b.oPicArr = [];
                        b.$nextTick(function() {
                            b.commodity = {
                                name: a.data.goods.title,
                                Sales: a.data.goods.volume
                            };
                            b.oPicArr = a.data.goods.picList;
                            b.isShow = !0;
                            b.ajaxGetVideo();
                            b.ajaxtbVideo(0);
                            b.ajaxDyVideo(0);
                            b.VideoArr = [];
                            b.oVideoArrImg = [];
                            b.selecCommentArr = [];
                            b.oAjaxVideo.tbvideourl = [];
                            b.oAjaxVideo.dyvideourl = [];
                            b.oAjaxVideo.tbvideoPage = 1
                        });
                    }else{
                        console.log('adfasdfads')
                        layer.msg("无商品主图！")
                    }
                }
                else if(100 == a.info.status){
                    b.isShow = !1; 
                    loginJump(b.tbUrl);
                }
                else{
                    b.isShow = !1;
                    layer.alert(a.info.status_err, {
                        icon: 2
                    });
                }
                // 0 == a.info.status ? 0 < a.data.goods.picList.length ? (b.oPicArr = [], b.$nextTick(function() {
                //     b.commodity = {
                //         name: a.data.goods.title,
                //         Sales: a.data.goods.volume
                //     };
                //     b.oPicArr = a.data.goods.picList;
                //     b.isShow = !0;
                //     b.ajaxGetVideo();
                //     b.ajaxtbVideo(0);
                //     b.ajaxDyVideo(0);
                //     b.VideoArr = [];
                //     b.oVideoArrImg = [];
                //     b.selecCommentArr = [];
                //     b.oAjaxVideo.tbvideourl = [];
                //     b.oAjaxVideo.dyvideourl = [];
                //     b.oAjaxVideo.tbvideoPage = 1
                // })) : layer.msg("无商品主图！") : 100 == a.info.status ? (b.isShow = !1, loginJump(b.tbUrl)) : (b.isShow = !1, layer.alert(a.info.status_err, {
                //     icon: 2
                // }))
            }, function() {
                layer.closeAll();
                layer.alert("网络错误", {
                    icon: 5
                })
            })) : layer.msg("请输入有效的商品链接", {
                time: 1500,
                shade: .1,
                shadeClose: !0
            })) : layer.msg("无效的商品链接！", {
                time: 1500,
                shade: .1,
                shadeClose: !0
            })
        },
        ajaxGetVideo: function() {
            var b = this;
            ajaxGetJsonp("https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?jsv=2.4.8&appKey=12574478&t=1554712612690&sign=59ff83eeadc620f65b072a198f4cf178&api=mtop.taobao.detail.getdetail&v=6.0&dataType=jsonp&ttid=2017%40taobao_h5_6.6.0&AntiCreep=true&type=jsonp&data=%7B%22itemNumId%22%3A%22" + b.goodsId + "%22%7D", {}, function(a) {
                var c = [],
                    d = "";
                d = [];
                var e = 0;
                if (a.data.apiStack) {
                    for (var f = a.data.apiStack, g = f.length; g--;) if (d = JSON.parse(f[g].value), d = d.item.videos) for (e = d.length; e--;) c.unshift(d[e]);
                    else return;
                    b.$nextTick(function() {
                        c.forEach(function(a, c) {
                            b.VideoArr.push(a.url);
                            b.oVideoArrImg.push(a.videoThumbnailURL)
                        })
                    })
                } else layer.alert("点击立即跳转到淘宝去拉动滑动条或登录才能获取到实拍视频哦", {
                    icon: 2,
                    btn: "立即跳转"
                }, function(b) {
                    pageAll(a.data.url);
                    layer.close(b)
                })
            }, function() {})
        },
        clearifFun: function() {
            this.selecCommentArr = [];
            $(".ispicComClass em").removeClass("TActive");
            this.selectPicArr = [];
            $(".ispicClass em").removeClass("TActive");
            this.ArrImg = [];
            this.ArrImg = this.selectPicArr.concat(this.selecCommentArr)
        },
        mousedownFun: function(b) {
            b.preventDefault()
        },
        getRealpic: function() {
            this.$refs.vmpic.ajaxIrealpic(!0)
        },
        ajaxtbVideo: function(b) {
            var a = this;
            layer.load(2, {
                shade: .1
            });
            ajaxPost("/api/user/tools/tools/get_evaluate_videourl", {
                itemid: a.goodsId,
                page: a.oAjaxVideo.tbvideoPage
            }, function(c) {
                layer.closeAll("loading");
                "200" == c.code ? 0 == b ? (a.oAjaxVideo.tbvideourl = c.tbvideourl_data, a.$nextTick(function() {
                    setTimeout(function() {
                        a.toolSwiper0()
                    }, 100)
                })) : 0 != c.tbvideourl_data.length ? (1 == b && (a.videoPopup(".js-tbvideo"), a.oAjaxVideo.tbvideoBool = !1, a.oAjaxVideo.bdyVideoArr = [], a.oAjaxVideo.tbvideoPage = 2, a.oAjaxVideo.tbSum = 2), a.oAjaxVideo.tbSum < a.oAjaxVideo.tbvideoPage && (a.oAjaxVideo.tbSum = a.oAjaxVideo.tbvideoPage), a.oAjaxVideo.tbvideoBool = !1, a.oAjaxVideo.tbdyVideoArr = c.tbvideourl_data) : (layer.msg("已经没有更多数据了"), --a.oAjaxVideo.tbvideoPage, a.oAjaxVideo.tbvideoBool = !0) : "-1" == c.code && loginJump(a.tbUrl)
            })
        },
        ajaxDyVideo: function(b) {
            var a = this;
            layer.load(2, {
                shade: .1
            });
            ajaxPost("/api/user/tools/tools/get_dy_videourl", {
                itemid: a.goodsId,
                page: a.oAjaxVideo.tbvideoPage
            }, function(c) {
                layer.closeAll("loading");
                "200" == c.code ? 0 == b ? (a.oAjaxVideo.dyvideourl = c.dyvideourl_data, a.$nextTick(function() {
                    setTimeout(function() {
                        a.toolSwiper1()
                    }, 300)
                })) : 0 != c.dyvideourl_data.length ? (1 == b && (a.videoPopup(".js-tbvideo"), a.oAjaxVideo.tbvideoBool = !1, a.oAjaxVideo.bdyVideoArr = [], a.oAjaxVideo.tbvideoPage = 2, a.oAjaxVideo.tbSum = 2), a.oAjaxVideo.tbSum < a.oAjaxVideo.tbvideoPage && (a.oAjaxVideo.tbSum = a.oAjaxVideo.tbvideoPage), a.oAjaxVideo.tbvideoBool = !1, a.oAjaxVideo.tbdyVideoArr = c.dyvideourl_data) : (layer.msg("已经没有更多数据了"), --a.oAjaxVideo.tbvideoPage, a.oAjaxVideo.tbvideoBool = !0) : "-1" == c.code && loginJump(a.tbUrl)
            })
        },
        toolSwiper0: function() {
            new Swiper(".toolSwiper0", {
                pagination: ".swiper-pagination0",
                paginationClickable: !0,
                prevButton: ".swiper-prev0",
                nextButton: ".swiper-next0"
            })
        },
        toolSwiper1: function() {
            new Swiper(".toolSwiper1", {
                pagination: ".swiper-pagination1",
                paginationClickable: !0,
                prevButton: ".swiper-prev1",
                nextButton: ".swiper-next1"
            })
        },
        tbVideoBtn: function() {
            this.oAjaxVideo.tbdyBool = !0;
            this.oAjaxVideo.tbvideoPage = 2;
            this.ajaxtbVideo(1)
        },
        tbVideoBtns: function() {
            this.oAjaxVideo.tbdyBool = !1;
            this.oAjaxVideo.tbvideoPage = 2;
            this.ajaxDyVideo(1)
        },
        videopageBtn: function(b) {
            this.oAjaxVideo.tbvideoPage = b;
            this.oAjaxVideo.tbdyBool ? this.ajaxtbVideo() : this.ajaxDyVideo()
        },
        videoPopup: function(b) {
            layer.open({
                type: 1,
                shift: 0,
                title: "获取视频",
                closeBtn: 2,
                shade: .4,
                area: ["850px", "700px"],
                content: $(b)
            })
        }
    },
    filters: {
        filtersImgSize: function(b) {
            if (b) return b + "_400x400.jpg"
        }
    }
});
var sdEditorEmoj = {
    emojiconfig: {
        qq: {
            name: "QQ表情",
            path: "emoji/",
            imgName: ["1.gif", "2.gif", ],
            alias: ["微笑", "伤心", ],
            title: ["[Smile]", "[Grimace]", ],
        },
    },
    emojiRealTimeData: [ /*{imgUrl: "",title: "",alias: "",num:"",},*/ ],
    Init: function (options) {
        var isShowImg = true,
            faceDivBox = $('.faceDivBox'),
            faceDiv = $('.faceDiv'),
            div = $('#content'),
            isAnimate = false;
        var emojiContainer = faceDiv.find('.emoji-box'),
            emojiconfig = options;
        var div = document.getElementById('content');
        // div.focus(function () {
        //     $(this).parent().addClass('clicked')
        // });

        if ($(".faceDiv span").length == 0) {
            var num = 0;
            var imgName = '';
            for (var emojilist in emojiconfig) { //添加emoji标签
                var maxNum = Object.keys(emojiconfig[emojilist].alias).length - 1;
                num++;
                var emclassf = 'em' + num + '-';
                emojiContainer.append('<section class="for-' + emojilist + '"></section>');
                faceDiv.find('.emoji-tab').append('<a href="javascript:void(0);" data-target="for-' + emojilist + '">' + emojiconfig[emojilist].name + '</a>');
                for (var i = 0; i <= maxNum; i++) {
                    imgName = emojiconfig[emojilist].imgName[i];
                    imgName = imgName.substring(0, imgName.length - 4);
                    switch (emclassf) {
                        case 'em1-':
                            emclass = 'em1-' + imgName;
                            break;
                        case 'em2-':
                            emclass = 'em7-' + imgName;
                            break;
                        case 'em3-':
                            emclass = 'em8-' + imgName;
                            break;
                        case 'em4-':
                            emclass = 'em4-' + imgName;
                            break;
                        case 'em5-':
                            emclass = 'em3-' + imgName;
                            break;
                        case 'em6-':
                            emclass = 'em2-' + imgName;
                            break;
                        case 'em7-':
                            emclass = 'em6-' + imgName;
                            break;
                        case 'em8-':
                            emclass = 'em10-' + imgName;
                            break;
                        case 'em9-':
                            emclass = 'em12-' + imgName;
                            break;
                        case 'em10-':
                            emclass = 'em5-' + imgName;
                            break;
                        case 'em11-':
                            emclass = 'em9-' + imgName;
                            break;
                        case 'em12-':
                            emclass = 'em11-' + imgName;
                            break;
                        default:

                    }

                    // emclass = emclassf + imgName;
                    if (emojiContainer.find('.for-' + emojilist) !== undefined) {
                        var c = '<a unselectable="on" href="javascript:void(0);" class="embox"><span data-src="' +
                            emojiconfig[emojilist].path + emojiconfig[emojilist].imgName[i] + '" class="em ' + emclass + '" data-alias="' +
                            (emojiconfig[emojilist].alias[i] == undefined ? '' : emojiconfig[emojilist].alias[i]) + '" title="' +
                            (emojiconfig[emojilist].title[i] == undefined ? (emojiconfig[emojilist].empty) : emojiconfig[emojilist].title[i]) + '">' + emojiconfig[emojilist].alias[i] + '</span></a>';
                        emojiContainer.find('.for-' + emojilist).append(c);
                    }
                }
            }
            // faceDivShowHide();             
        }

        $(".contentBox,.faceDiv").click(function () {
            return false;
        });
        $(".faceDiv").click(function () {
            div.focus();
        });
        $(".tab-pre").click(function () {
            if (isAnimate) return false;
            isAnimate = true;
            var tabBox = $(".emoji-tab"),
                aNum = tabBox.find("a").length,
                num = parseInt(aNum / 8),
                tabBoxMaxMTop = -352 * num,
                mtop = parseInt(tabBox.css("marginTop"));
            if (mtop != 0) {
                var cTop = mtop + 352 + 'px';
                tabBox.animate({
                    marginTop: cTop
                }, 300, function () {
                    isAnimate = false;
                });
            } else {
                tabBoxMaxMTop = tabBoxMaxMTop + 'px'
                tabBox.animate({
                    marginTop: tabBoxMaxMTop
                }, 300, function () {
                    isAnimate = false;
                });
            }
            return false;
        });
        $(".tab-next").click(function () {
            if (isAnimate) return false;
            isAnimate = true;
            var tabBox = $(".emoji-tab"),
                aNum = tabBox.find("a").length,
                num = parseInt(aNum / 8),
                tabBoxMaxMTop = -352 * num,
                mtop = parseInt(tabBox.css("marginTop"));
            if (tabBoxMaxMTop < mtop) {
                var cTop = mtop - 352 + 'px';
                tabBox.animate({
                    marginTop: cTop
                }, 300, function () {
                    isAnimate = false;
                });
            } else {
                tabBox.animate({
                    marginTop: "0px"
                }, 300, function () {
                    isAnimate = false;
                });
            }
            return false;
        });
    },
    insertEmoji: function (src, alias, title) {
        if (window.getSelection) { //'getSelection' in window
            var sel = window.getSelection();
            var newImg = document.createElement('img');
            //var newImg = new Image();
            newImg.src = src, newImg.alt = alias, newImg.title = title;
            newImg.onload = function () {
                $(this).attr('data-alias', alias);
            }
            if (sel && sel.rangeCount === 1 && sel.isCollapsed) {
                //有选区，且选区数量是一个，且选区的起始点和终点在同一位置
                var range = sel.getRangeAt(0);
                range.insertNode(newImg);
                range.collapse(false); //对于IE来说，参数不可省略
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (sel && sel.rangeCount === 1 && !sel.isCollapsed) {
                //有选区，且选区数量是一个，且选区的起始点和终点不能同一位置
                sel = sel.getRangeAt(0);
                sel.deleteContents();
                sel.insertNode(newImg);
                sel.collapse(false);
            }
        } else if (document.selection) { //'selection' in document
            var range = document.selection.createRange();
            if (range != '') range.pasteHTML('<img src="' + src + '" data-alias="' + alias + '" title="' + title + '"/>');
            div.focus(); //IE 11模拟的IE5~IE8无须这一步也能获得焦点
        }
    },
    bindClickImg: function () {
        var faceDiv = $('.faceDiv'),
            div = $('#content');
        //初始化emoji标签选项
        faceDiv.find('.emoji-box section').css("display", "none").eq(0).css("display", "block");
        faceDiv.find('.emoji-tab a').eq(0).addClass("active");
        faceDiv.find('.emoji-box img,.emoji-box .embox').on('click', function () { //选择图片 点击表情
            div.focus();
            faceClick($(this));
            isPlace('content');
        });
        faceDiv.find('.emoji-tab a').on('click', function () { //切换表情标签
            // div.focus();
            $(this).parent().parent().prev().find('section').hide();
            faceDiv.find('.emoji-box .' + $(this).attr('data-target')).show();
            faceDiv.find('.emoji-tab a').removeClass('active');
            this.className += ' active';
            $(this).parent().parent().parent();
            var faceDivHeight = faceDiv.height(),
                nowSectionClass = "." + $(this).attr('data-target'),
                nowSection = $(nowSectionClass),
                contentHeight = nowSection.height(); //outerHeight()
            if (faceDivHeight < contentHeight) {
                faceDiv.addClass('isScrolly');
            } else {
                faceDiv.removeClass('isScrolly');
            }
            return false;
        });

        function faceClick(el) {
            if (el.prop("tagName") == "IMG") {
                var imgThis = el;
            } else {
                var imgThis = el.find("span").eq(0);
            }
            var textAreaInfo = $("#content"),
                imgArea = imgThis.attr("data-src"),
                imgAlias = imgThis.attr("data-alias"),
                imgTitle = imgThis.attr("title");
            imgArea = imgArea ? imgArea : imgThis.attr("src");
            if (textAreaInfo[0].nodeName === 'DIV') {
                sdEditorEmoj.insertEmoji(imgArea, imgAlias, imgTitle);
            } else {
                textAreaInfo.append('[' + imgTitle + ']');
            }

            //添加点击次数 作为热门表情依据
            var rtDate = sdEditorEmoj.emojiRealTimeData;
            var rtLength = rtDate.length,
                cu, addNum = true;
            for (var i = 0; i < rtLength; i++) {
                cu = rtDate[i]
                if (cu.alias == imgAlias) {
                    cu.num = cu.num + 1;
                    addNum = false;
                    break;
                }
            }
            if (addNum == true) {
                var objDate = {};
                objDate.imgUrl = imgArea;
                objDate.title = imgTitle;
                objDate.alias = imgAlias;
                objDate.num = 1;
                rtDate.push(objDate);
            }
            addNum = true;
            return false;
        }
    },
    hotEmoji: function () { //热门表情
        ajaxGet("/json/popular.json", {}, function (res) {
            if (res.error == 0) {
                var data = res.data,
                    sectionBox = '',
                    imgAll = '';
                var dataNum = data.length;

                for (var i = 0; i < dataNum; i++) {
                    imgAll += '<img src="' + data[i].Img + '" data-alias="' + (data[i].emoji == undefined ? '' : data[i].emoji) + '" title="' + (data[i].title == undefined ? '' : data[i].title) + '" />';
                }

                sectionBox = '<section class="for-hot">' + imgAll + '<section>';
                $('.emoji-tab').prepend('<a href="javascript:void(0);" data-target="for-hot">' + '热门表情' + '</a>');
                $(".emoji-box").prepend(sectionBox);

                sdEditorEmoj.bindClickImg();
            }
        }, function () {})
    },
};

$(document).ready(function () {
    if ($(".imgBtnf").length == '0') {
        sdEditorEmoj.Init(emojiconfig);
        sdEditorEmoj.hotEmoji();
    } else {
        $(".imgBtnf").one('click', function () {
            $(this).removeClass('imgBtnf');
            sdEditorEmoj.Init(emojiconfig);
            sdEditorEmoj.hotEmoji();
        });
    }
    var clipboard = new ClipboardJS('.infoCopy');
    clipboard.on('success', function (e) {
        layer.msg('复制成功');
    });

    //复制
    $(".infoCopy").click(function (event) {
        var contentBoxV = $(".contentBox").html();

        //contentBoxV = contentBoxV.replace(/&nbsp;/g, "");   
        var contentVal;
        contentVal = $("#contentVal");

        //清除多余的<br/> 空格
        var regBrDiv = /(<br>|<br\/>)(\s*)<\/div>/g,
            regBrP = /(<br>|<br\/>)(\s*)<\/p>/g,
            regEmpty = /(<div>(\s+)<\/div>)|(<p>(\s*)<\/p>)/g;
        contentBoxV = contentBoxV.replace(regBrDiv, '</div>');
        contentBoxV = contentBoxV.replace(regBrP, '</p>');
        contentBoxV = contentBoxV.replace(regEmpty, '');

        contentVal.html(contentBoxV);
        var flag = contentVal.find('.newLine').length;

        if (flag == 0) {
            contentVal.find('div').eq(0).before('<div class="newLine"></div>');;
        }

        var num = contentVal.find('img').length;
        for (var i = 0; i < num; i++) {
            var imgC = contentVal.find('img').eq(i);
            imgC.after(imgC.attr("data-alias"));
        }
        contentVal.find('img').remove();

        var nowT = contentVal.html();
        contentVal.html(nowT);

    });

    //提交热门表情记录
    // $(".hotEmBtn").click(function () {
    //     var emojiData = sdEditorEmoj.emojiRealTimeData;
    //     if (emojiData.length > 0) {
    //         var emojiUrl = "https://www.haodanku.com/Public/assets/home/js/emoji/popular";
    //         var emojiS = JSON.stringify(emojiData);
    //         $.post(emojiUrl, { data: emojiS }, function (res) {
    //             if (res.error == "1") { }
    //             if (res.error == "0") {
    //                 //console.log(res); msg:0\OK
    //                 emojiData = [];
    //                 sdEditorEmoj.emojiRealTimeData = [];
    //             }
    //         });
    //     }
    // });

    /*var isHotPost = true;
    var hotTime = 10;
    //提交热门表情记录
    $(".hotEmBtn").click(function () {
        if (isHotPost) {
            var emojiData = sdEditorEmoj.emojiRealTimeData;
            if (emojiData.length > 0) {
                var emojiUrl = "/Home/RecordSomeEmoji";
                var emojiS = JSON.stringify(emojiData);
                $.post(emojiUrl, { data: emojiS }, function (res) {
                    if (res.error == "1") { }
                    if (res.error == "0") {
                        //console.log(res); msg:0\OK
                        emojiData = [];
                        isHotPost = false;  
                        var hotTimer = setInterval(function(){
                            hotTime--;                              
                            if (hotTime == 0) {
                                hotTime = 10;
                                isHotPost = true;
                                clearInterval(hotTimer);
                            }
                        },1000);
                    }
                });
            }
        }           
    });*/

    $(".contentBox").focus(function () {
        $(this).parent().addClass('clicked');
    }).blur(function () {
        $(this).parent().removeClass('clicked');
        var wxText = "";

        var regBr = /(<br>|<br\/>)(\s*(<br>|<br\/>))+/g;
        wxText = $(this).html();
        wxText = wxText.replace(regBr, '<br>');
        $(".wxText").val(wxText);

        $("#remark5").val(wxText);
        $("#remark5").html(wxText);
    });
    //div textarea placeholder模拟
    $(".contentBox").on("input propertychange", function () {
        isPlace('content');
    });
    // editEmpty(); //编辑器初始为空时

    //清除暂不需要的emoji表情    
    $('.em11-bqfh130,.em11-bqfh131').parent().remove();

}); //jquery

$("#content").on("keyup", function (event) {
    var t = $(this);
    var conId = document.getElementById("content");
    if (8 === event.keyCode) { //Backspace退格键
        var i = void 0,
            A = t.html().toLowerCase().trim();
        A && "<br>" !== A || (i = "<div><br></div>", t.html(""), t.append(i), setCaretPosition(conId, 10));
    }
}).on("keydown", function (event) {
    var t = $(this);
    if (8 === event.keyCode) { //Backspace退格键
        return "<div><br></div>" === t.html().toLowerCase().trim() ? void event.preventDefault() : void 0
    }
}).on("mouseup", function () {
    var t = $(this);
    var conId = document.getElementById("content");
    if (t.html() == "<div><br></div>") {
        setCaretPosition(conId, 6);
    }
}).on("paste", function () { //黏贴         
    setTimeout(function () {
        sortFormat('content');
    }, 100)
});

//获取光标位置
function getCursortPosition(ctrl) {
    var CaretPos = 0; // IE Support
    if (document.selection) {
        ctrl.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;
    return (CaretPos);
}
//设置光标位置
function setCaretPosition(ctrl, pos) {
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);
    } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}
//计算格式min5  7x17
function numLimit() {
    var content, textLen;
    divEmpty("content");

    content = $("#content");
    textLen = content.text().trim().length;
    if (textLen == '0') {
        $("#remark5").html("");
        $("#remark5").val("");
        return true;
    }

    var div = content.find('div');
    var divnum = div.length;
    if (divnum < 3) {
        layer.msg('朋友圈文案最少也写上3行嘛，这样内容才充实哦');
        return false;
    }
    if (divnum > 7) {
        layer.msg('朋友圈文案最好保持在7行以内，才显的不那么繁琐呦');
        return false;
    }

    var msg = '';
    for (var i = 0; i < divnum; i++) {
        var tlen = div.eq(i).text().length;
        var imglen = div.eq(i).find('img').length;
        var count = tlen + imglen;
        var drow = i + 1;
        if (count > 20) {
            msg += "<p>第" + drow + "行的字节超过20了呦，请您检查调整下</p>";
        };
    }
    if (!msg == '') {
        msgon = "<div class='wx_msg'><p>朋友圈文案编辑不规范提示<p>" + msg + "</div>";
        layer.msg(msgon);
        return false;
    }
    return true;
}
//清空没有内容空白的div
function divEmpty(id) {
    var Id = "#" + id;
    var div = $(Id).find('div');
    var divnum = div.length,
        divc, divclen;
    for (var i = 0; i < divnum; i++) {
        divc = div.eq(i);
        divclen = divc.text().trim().length;
        if (divclen == '0') {
            divc.remove();
        }
    }
}
//enmoji编辑器为空时使用占位符站位
function editEmpty(event) {
    var t = $(".contentBox");
    var clen = t.text().length;
    if (clen < 1) {
        t.html('<div><br></div>');
        var i = void 0,
            A = t.html().toLowerCase().trim();
        A && "<br>" !== A || (i = "<div><br></div>", t.html(""), t.append(i), setCaretPosition(conId, 10));
    } else {
        //给初期因为没有经过此功能整理的用户进行初始化格式，一段时间后可以进行注释
        sortFormat('content');
    }
}
//提示文字占位符  placeholder
function isPlace(id) {
    var Id = "#" + id,
        len, $this;
    $this = $(Id);
    len = $this.text().length;
    imglen = $this.find('img').length;
    if (len > 0 || imglen > 0) {
        $this.removeClass("place");
    } else {
        $this.addClass("place");
    }
}
//整理div(contenteditable = "true")的格式
function sortFormat(id) {
    var conId = document.getElementById(id);
    var $con = $("#content");
    var imgAll = $con.find('img'),
        img, imglen, arrImg = [];
    imglen = imgAll.length;
    //处理所有emoji图片 将本站自带的emoji Img填入到arrImg数组中并使用[emoji16]占位
    for (var i = 0; i < imglen; i++) {
        img = imgAll.eq(i);
        imgSrc = img.attr('src');
        if ((imgSrc.indexOf("www.fuhaodq.com") > -1) || (imgSrc.indexOf("img.xuandan.com/emoji/") > -1)) {
            img.after('[emoji16]');
            img = "<img src='" + imgSrc + "' alt='" + (img.attr('alt') == undefined ? ('') : (img.attr('alt'))) + "'  title='" + (img.attr('title') == undefined ? ('') : (img.attr('title'))) + "' data-alias='" + img.attr('data-alias') + "' />";
            arrImg.push(img);
        }
    }
    //整理格式
    var str, arrnum = 0,
        newdiv = '',
        arrText = [];
    str = conId.innerText;
    str = str.replace(/^(\n+)/g, "").replace(/(\n)+/g, "\n").replace(/\n$/g, "");
    arrText = str.split("\n");
    arrnum = arrText.length;
    for (var i = 0; i < arrnum; i++) {
        newdiv += "<div>" + arrText[i] + "</div>";
    }
    //conId.innerHTML = "";
    conId.innerHTML = newdiv;
    //将本站自带的emoji Img填充进来
    str = $con.html();
    var reg = /\[emoji16\]/g;
    var arrEmoji = [],
        arrIndex = 0;
    while (arrEmoji = reg.exec(str)) {
        str = str.replace(arrEmoji[0], arrImg[arrIndex]);
        arrIndex++;
    }
    $con.html(str);

    keepLastIndex(id); //将光标移动到最后
}
//定位div(contenteditable = "true") 光标移到最后
function keepLastIndex(id) {
    var obj = document.getElementById(id);
    if (window.getSelection) { //ie11 10 9 ff safari
        obj.focus(); //解决ff不获取焦点无法定位问题
        var range = window.getSelection(); //创建range
        range.selectAllChildren(obj); //range 选择obj下所有子内容
        range.collapseToEnd(); //光标移至最后
    } else if (document.selection) { //ie10 9 8 7 6 5
        var range = document.selection.createRange(); //创建选择对象
        //var range = document.body.createTextRange();
        range.moveToElementText(obj); //range定位到obj
        range.collapse(false); //光标移至最后
        range.select();
    }
}




//清除多余的空格
function fHandle() {
    var con = $("#content");
    var str;
    str = con.html();
    //替换所有的换行符
    str = str.replace(/\r\n/g, "<br>")
    str = str.replace(/\n/g, "<br>");

    //替换所有的空格（中文空格、英文空格都会被替换）
    //str = str.replace(/\s/g,"&nbsp;");
    //str = str.replace(/\s/g,"");
    str = str.replace(/(^\s+)|(\s+$)/g, "");
    con.html(str);
}
var emojiconfig = {
    emojiaSeries: {
        name: "表情系列",
        path: "https://www.haodanku.com/Public/assets/home/js/emoji/icon/1/",
        imgName: ["bqfh0.png", "bqfh1.png", "bqfh2.png", "bqfh3.png", "bqfh4.png", "bqfh5.png", "bqfh6.png", "bqfh7.png", "bqfh8.png", "bqfh9.png", "bqfh10.png", "bqfh11.png", "bqfh12.png", "bqfh13.png", "bqfh14.png", "bqfh15.png", "bqfh16.png", "bqfh17.png", "bqfh18.png", "bqfh19.png", "bqfh20.png", "bqfh21.png", "bqfh22.png", "bqfh23.png", "bqfh24.png", "bqfh25.png", "bqfh26.png", "bqfh27.png", "bqfh28.png", "bqfh29.png", "bqfh30.png", "bqfh31.png", "bqfh32.png", "bqfh33.png", "bqfh34.png", "bqfh35.png", "bqfh36.png", "bqfh37.png", "bqfh38.png", "bqfh39.png", "bqfh40.png", "bqfh41.png", "bqfh42.png", "bqfh43.png", "bqfh44.png", "bqfh45.png", "bqfh46.png", "bqfh47.png", "bqfh48.png", "bqfh49.png", "bqfh50.png", "bqfh51.png", "bqfh52.png", "bqfh53.png", "bqfh54.png", "bqfh55.png", "bqfh56.png", "bqfh57.png", "bqfh73.png", "bqfh74.png", "bqfh75.png", "bqfh76.png", "bqfh77.png", "bqfh78.png", "bqfh79.png", "bqfh80.png", "bqfh81.png", "bqfh82.png", "bqfh83.png"],
        alias: ["😄", "😃", "😀", "😊", "☺", "😉", "😍", "😘", "😚", "😗", "😙", "😜", "😝", "😛", "😳", "😁", "😔", "😌", "😒", "😞", "😣", "😢", "😂", "😭", "😪", "😥", "😰", "😅", "😓", "😩", "😫", "😨", "😱", "😠", "😡", "😤", "😖", "😆", "😋", "😷", "😎", "😴", "😵", "😲", "😟", "😦", "😧", "😈", "👿", "😮", "😬", "😐", "😕", "😯", "😶", "😇", "😏", "😑", "😺", "😸", "😻", "😽", "😼", "🙀", "😿", "😹", "😾", "👹", "👺", ],
        title: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ],
    },
    person: {
        name: "人物相关",
        path: "https://www.haodanku.com/Public/assets/home/js/emoji/icon/7/",
        imgName: ["bqfh100.png", "bqfh101.png", "bqfh102.png", "bqfh103.png", "bqfh104.png", "bqfh105.png", "bqfh106.png", "bqfh107.png", "bqfh108.png", "bqfh109.png", "bqfh110.png", "bqfh111.png", "bqfh112.png", "bqfh113.png", "bqfh114.png", "bqfh115.png", "bqfh116.png", "bqfh117.png", "bqfh118.png", "bqfh119.png", "bqfh120.png", "bqfh121.png", "bqfh122.png", "bqfh123.png", "bqfh124.png", "bqfh125.png", "bqfh126.png", "bqfh127.png", "bqfh128.png", "bqfh129.png", "bqfh130.png", "bqfh131.png", "bqfh132.png", "bqfh133.png", "bqfh134.png", "bqfh135.png", "bqfh136.png", "bqfh137.png", "bqfh138.png", "bqfh139.png", "bqfh140.png", "bqfh141.png", "bqfh142.png", "bqfh143.png", "bqfh144.png", "bqfh145.png", "bqfh146.png", "bqfh147.png", "bqfh148.png", "bqfh149.png", "bqfh150.png", "bqfh151.png", "bqfh152.png", "bqfh153.png", "bqfh154.png", "bqfh155.png", "bqfh156.png", "bqfh157.png", "bqfh158.png", "bqfh159.png", "bqfh160.png", "bqfh161.png", "bqfh162.png", "bqfh163.png", "bqfh164.png", "bqfh165.png", "bqfh166.png", "bqfh180.png", "bqfh185.png", "bqfh181.png", "jiezhi.png"],
        alias: ["👂", "👀", "👃", "👅", "👄", "👍", "👎", "👌", "👊", "✊", "✌", "👋", "✋", "👐", "👆", "👇", "👉", "👈", "🙌", "🙏", "☝", "👏", "💪", "🚶", "🏃", "💃", "👫", "👪", "👬", "👭", "💏", "💑", "👯", "🙆", "🙅", "💁", "🙋", "💇", "💅", "👰", "🙎", "🙍", "🙇", "🎩", "👑", "👒", "👟", "👞", "👡", "👠", "👢", "👕", "👔", "👚", "👗", "🎽", "👖", "👘", "👙", "💼", "👜", "👝", "👛", "👓", "🎀", "🌂", "💄", "💋", "👣", "💎", "💍", ],
        title: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ],
    },
    trick: {
        name: "花样庆祝",
        path: "https://www.haodanku.com/Public/assets/home/js/emoji/icon/8/",
        imgName: ["bqfh144.png", "bqfh90.png", "bqfh91.png", "bqfh92.png", "bqfh93.png", "bqfh94.png", "bqfh164.png", "bqfh165.png", "bqfh166.png", "bqfh167.png", "bqfh168.png", "bqfh169.png", "bqfh170.png", "bqfh171.png", "bqfh172.png", "bqfh173.png", "bqfh174.png", "bqfh175.png", "bqfh176.png", "bqfh177.png", "bqfh178.png", "bqfh179.png", "bqfh180.png", "bqfh0.png", "bqfh1.png", "bqfh2.png", "bqfh3.png", "bqfh4.png", "bqfh5.png", "bqfh6.png", "bqfh7.png", "bqfh8.png", "bqfh9.png", "bqfh10.png", "bqfh11.png", "bqfh12.png", "bqfh13.png", "bqfh14.png", "bqfh15.png", "bqfh16.png", "bqfh17.png", "bqfh18.png", "bqfh19.png"],
        alias: ["👑", "🔥", "✨", "🌟", "💫", "💥", "🎀", "🌂", "💄", "💛", "💙", "💜", "💚", "❤", "💔", "💗", "💓", "💕", "💖", "💞", "💘", "💌", "💋", "🎍", "💝", "🎎", "🎒", "🎓", "🎏", "🎆", "🎇", "🎐", "🎑", "🎃", "👻", "🎅", "🎄", "🎁", "🎋", "🎉", "🎊", "🎈", "🎌", ],
        title: ["皇冠", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ],
    },
    plantNature: {
        name: "植物自然",
        path: "https://www.haodanku.com/Public/assets/home/js/emoji/icon/4/",
        imgName: ["bqfh63.png", "bqfh64.png", "bqfh65.png", "bqfh66.png", "bqfh67.png", "bqfh68.png", "bqfh69.png", "bqfh70.png", "bqfh71.png", "bqfh72.png", "bqfh73.png", "bqfh74.png", "bqfh75.png", "bqfh76.png", "bqfh77.png", "bqfh78.png", "bqfh79.png", "bqfh80.png", "bqfh81.png", "bqfh82.png", "bqfh83.png", "bqfh84.png", "bqfh85.png", "bqfh86.png", "bqfh87.png", "bqfh88.png", "bqfh89.png", "bqfh90_002.png", "bqfh91_002.png", "bqfh92_002.png", "bqfh93_002.png", "bqfh94_002.png", "bqfh95_002.png", "bqfh96_002.png", "bqfh97.png", "bqfh98_002.png", "bqfh99_002.png", "bqfh100.png", "bqfh101.png", "bqfh102.png", "bqfh103.png", "bqfh104.png", "bqfh105.png", "bqfh106.png", "bqfh107.png", "bqfh108.png", "bqfh109.png", "bqfh110.png", "bqfh111.png", "bqfh112.png", "bqfh113.png", "bqfh114.png", "bqfh115.png", "bqfh90.png", "bqfh91.png", "bqfh92.png", "bqfh93.png", "bqfh94.png", "bqfh95.png", "bqfh96.png", "bqfh97_002.png", "bqfh98.png", "bqfh99.png"],
        alias: ["💐", "🌸", "🌷", "🍀", "🌹", "🌻", "🌺", "🍁", "🍃", "🍂", "🌿", "🌾", "🍄", "🌵", "🌴", "🌲", "🌳", "🌰", "🌱", "🌼", "🌐", "🌞", "🌝", "🌚", "🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘", "🌜", "🌛", "🌙", "🌍", "🌎", "🌏", "🌋", "🌌", "🌠", "⭐", "☀", "⛅", "☁", "⚡", "☔", "❄", "⛄", "🌀", "🌁", "🌈", "🌊", "🔥", "✨", "🌟", "💫", "💥", "💢", "💦", "💧", "💤", "💨", ],
        title: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ],
    },
    fruitFood: {
        name: "水果食物",
        path: "https://www.haodanku.com/Public/assets/home/js/emoji/icon/3/",
        imgName: ["bqfh169.png", "bqfh170.png", "bqfh171.png", "bqfh172.png", "bqfh173.png", "bqfh174.png", "bqfh175.png", "bqfh176.png", "bqfh177.png", "bqfh178.png", "bqfh179.png", "bqfh180.png", "bqfh181.png", "bqfh182.png", "bqfh183.png", "bqfh184.png", "bqfh185.png", "bqfh186.png", "bqfh187.png", "bqfh188.png", "bqfh189.png", "bqfh190.png", "bqfh191.png", "bqfh192.png", "bqfh193.png", "bqfh194.png", "bqfh195.png", "bqfh196.png", "bqfh197.png", "bqfh198.png", "bqfh199.png", "bqfh200.png", "bqfh201.png", "bqfh202.png", "bqfh203.png", "bqfh204.png", "bqfh205.png", "bqfh206.png", "bqfh207.png", "bqfh208.png", "bqfh209.png", "bqfh210.png", "bqfh211.png", "bqfh212.png", "bqfh213.png", "bqfh214.png", "bqfh215.png", "bqfh216.png", "bqfh217.png", "bqfh218.png", "bqfh219.png", "bqfh220.png", "bqfh221.png", "bqfh222.png", "bqfh223.png", "bqfh224.png", "bqfh225.png", "bqfh226.png", "bqfh227.png"],
        alias: ["☕", "🍵", "🍶", "🍼", "🍺", "🍻", "🍸", "🍹", "🍷", "🍴", "🍕", "🍔", "🍟", "🍗", "🍖", "🍝", "🍛", "🍤", "🍱", "🍣", "🍥", "🍙", "🍘", "🍚", "🍜", "🍲", "🍢", "🍡", "🍳", "🍞", "🍩", "🍮", "🍦", "🍨", "🍧", "🎂", "🍰", "🍪", "🍫", "🍬", "🍭", "🍯", "🍎", "🍏", "🍊", "🍋", "🍒", "🍇", "🍉", "🍓", "🍑", "🍈", "🍌", "🍐", "🍍", "🍠", "🍆", "🍅", "🌽", ],
        title: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ],
    },
    animal: {
        name: "动物系列",
        path: "https://www.haodanku.com/Public/assets/home/js/emoji/icon/2/",
        imgName: ["bqfh0.png", "bqfh1.png", "bqfh2.png", "bqfh3.png", "bqfh4.png", "bqfh5.png", "bqfh6.png", "bqfh7.png", "bqfh8.png", "bqfh9.png", "bqfh10.png", "bqfh11.png", "bqfh12.png", "bqfh13.png", "bqfh14.png", "bqfh15.png", "bqfh16.png", "bqfh17.png", "bqfh18.png", "bqfh19.png", "bqfh20.png", "bqfh21.png", "bqfh22.png", "bqfh23.png", "bqfh24.png", "bqfh25.png", "bqfh26.png", "bqfh27.png", "bqfh28.png", "bqfh29.png", "bqfh30.png", "bqfh31.png", "bqfh32.png", "bqfh33.png", "bqfh34.png", "bqfh35.png", "bqfh36.png", "bqfh37.png", "bqfh38.png", "bqfh39.png", "bqfh40.png", "bqfh41.png", "bqfh42.png", "bqfh43.png", "bqfh44.png", "bqfh45.png", "bqfh46.png", "bqfh47.png", "bqfh48.png", "bqfh49.png", "bqfh50.png", "bqfh51.png", "bqfh52.png", "bqfh53.png", "bqfh54.png", "bqfh55.png", "bqfh56.png", "bqfh57.png", "bqfh58.png", "bqfh59.png", "bqfh60.png", "bqfh61.png", "bqfh62.png", "bqfh84.png", "bqfh85.png", "bqfh86.png", "bqfh87.png", "bqfh88.png", "bqfh73.png", "bqfh74.png", "bqfh75.png", "bqfh76.png", "bqfh77.png", "bqfh78.png", "bqfh79.png", "bqfh80.png", "bqfh81.png"],
        alias: ["🐶", "🐺", "🐱", "🐭", "🐹", "🐰", "🐸", "🐯", "🐨", "🐻", "🐷", "🐽", "🐮", "🐗", "🐵", "🐒", "🐴", "🐑", "🐘", "🐼", "🐧", "🐦", "🐤", "🐥", "🐣", "🐔", "🐍", "🐢", "🐛", "🐝", "🐜", "🐞", "🐌", "🐙", "🐚", "🐠", "🐟", "🐬", "🐳", "🐋", "🐄", "🐏", "🐀", "🐃", "🐅", "🐇", "🐉", "🐎", "🐐", "🐓", "🐕", "🐖", "🐁", "🐂", "🐲", "🐡", "🐊", "🐫", "🐪", "🐆", "🐈", "🐩", "🐾", "🙈", "🙉", "🙊", "💀", "👽", "😺", "😸", "😻", "😽", "😼", "🙀", "😿", "😹", "😾", ],
        title: ["小狗符号", "狼狗符号", "小猫头像", "老鼠头像", "花鼠头像", "兔子头像", "青蛙头像", "老虎头像", "考拉头像", "小熊头像", "猪的头像", "猪鼻符号", "牛的头像", "野猪头像", "猴子头像", "小猴子图像", "马的头像", "绵羊符号", "大象符号", "熊猫头像", "企鹅头像", "鸽子头像", "小鸟头像", "小鸡图像", "小鸡", "母鸡头像", "蛇的符号", "乌龟符号", "虫子符号", "蜜蜂符号", "蚂蚁符号", "瓢虫符号", "蜗牛符号", "章鱼", "海螺壳", "热带鱼", "鱼", "海豚", "喷水鲸鱼", "长须鲸", "奶牛", "绵羊", "老鼠", "牛", "老虎", "兔子", "龙", "马", "羊", "鸡", "狗", "猪", "老鼠", "牛", "龙头", "鱼", "鳄鱼", "骆驼", "骆驼", "牧羊犬", "牧羊犬", "狮子狗", "爪印", "害羞的猴子", "捂着耳朵的猴子", "偷笑的猴子", "骷髅", "外星人", "微笑的猫脸", "咧着嘴笑得猫脸", "色迷迷的猫脸", "接吻猫", "苦笑的猫脸", "疲倦的猫脸", "哭的猫脸", "流着泪的猫脸", "撅嘴的猫脸", ],
    },
    sports: {
        name: "运动休闲",
        path: "https://www.haodanku.com/Public/assets/home/js/emoji/icon/6/",
        imgName: ["bqfh131.png", "bqfh132.png", "bqfh133.png", "bqfh134.png", "bqfh135.png", "bqfh136.png", "bqfh137.png", "bqfh138.png", "bqfh139.png", "bqfh140.png", "bqfh141.png", "bqfh142.png", "bqfh143.png", "bqfh144.png", "bqfh145.png", "bqfh146.png", "bqfh147.png", "bqfh148.png", "bqfh149.png", "bqfh150.png", "bqfh151.png", "bqfh152.png", "bqfh153.png", "bqfh154.png", "bqfh155.png", "bqfh156.png", "bqfh157.png", "bqfh158.png", "bqfh159.png", "bqfh160.png", "bqfh161.png", "bqfh162.png", "bqfh163.png", "bqfh164.png", "bqfh165.png", "bqfh166.png", "bqfh167.png", "bqfh168.png"],
        alias: ["📰", "🎨", "🎬", "🎤", "🎧", "🎼", "🎵", "🎶", "🎹", "🎻", "🎷", "🎸", "👾", "🎮", "🃏", "🎴", "🀄", "🎲", "🎯", "🏈", "🏀", "⚽", "⚾", "🎾", "🎱", "🏉", "🎳", "⛳", "🚵", "🚴", "🏁", "🏇", "🏆", "🎿", "🏂", "🏊", "🏄", "🎣", ],
        title: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ],
    },
    goods: {
        name: "物体物件",
        path: "https://www.haodanku.com/Public/assets/home/js/emoji/icon/10/",
        imgName: ["bqfh20.png", "bqfh21.png", "bqfh22.png", "bqfh23.png", "bqfh24.png", "bqfh25.png", "bqfh26.png", "bqfh27.png", "bqfh28.png", "bqfh29.png", "bqfh30.png", "bqfh31.png", "bqfh32.png", "bqfh33.png", "bqfh34.png", "bqfh35.png", "bqfh36.png", "bqfh37.png", "bqfh38.png", "bqfh39.png", "bqfh40.png", "bqfh41.png", "bqfh42.png", "bqfh43.png", "bqfh44.png", "bqfh45.png", "bqfh46.png", "bqfh47.png", "bqfh48.png", "bqfh49.png", "bqfh50.png", "bqfh51.png", "bqfh52.png", "bqfh53.png", "bqfh54.png", "bqfh55.png", "bqfh56.png", "bqfh57.png", "bqfh58.png", "bqfh59.png", "bqfh60.png", "bqfh61.png", "bqfh62.png", "bqfh63.png", "bqfh64.png", "bqfh65.png", "bqfh66.png", "bqfh67.png", "bqfh68.png", "bqfh69.png", "bqfh70.png", "bqfh71.png", "bqfh72.png", "bqfh73.png", "bqfh74.png", "bqfh75.png", "bqfh76.png", "bqfh77.png", "bqfh78.png", "bqfh79.png", "bqfh80.png", "bqfh81.png", "bqfh82.png", "bqfh83.png", "bqfh84.png", "bqfh85.png", "bqfh86.png", "bqfh87.png", "bqfh88.png", "bqfh89.png", "bqfh90.png", "bqfh91.png", "bqfh92.png", "bqfh93.png", "bqfh94.png", "bqfh95.png", "bqfh96.png", "bqfh97.png", "bqfh98.png", "bqfh99.png", "bqfh100.png", "bqfh101.png", "bqfh102.png", "bqfh103.png", "bqfh104.png", "bqfh105.png", "bqfh106.png", "bqfh107.png", "bqfh108.png", "bqfh109.png", "bqfh110.png", "bqfh111.png", "bqfh112.png", "bqfh113.png", "bqfh114.png", "bqfh115.png", "bqfh116.png", "bqfh117.png", "bqfh118.png", "bqfh119.png", "bqfh120.png", "bqfh121.png", "bqfh122.png", "bqfh123.png", "bqfh124.png", "bqfh125.png", "bqfh126.png", "bqfh127.png", "bqfh128.png", "bqfh129.png", "bqfh130.png"],
        alias: ["🔮", "🎥", "📷", "📹", "📼", "💿", "📀", "💽", "💾", "💻", "📱", "☎", "📞", "📟", "📠", "📡", "📺", "📻", "🔊", "🔉", "🔈", "🔇", "🔔", "🔕", "📢", "📣", "⏳", "⌛", "⏰", "⌚", "🔓", "🔒", "🔐", "🔑", "🔎", "💡", "🔦", "🔆", "🔅", "🔌", "🔋", "🔍", "🛁", "🛀", "🚿", "🚽", "🔧", "🔩", "🔨", "🚪", "🚬", "💣", "🔫", "🔪", "💊", "undefined", "💰", "💴", "💵", "💷", "💶", "💳", "💸", "📲", "📧", "📥", "📤", "✉", "📩", "📨", "📯", "📫", "📪", "📬", "📭", "📮", "📦", "📝", "📄", "📃", "📑", "📊", "📈", "📉", "📜", "📋", "📅", "📆", "📇", "📁", "📂", "✂", "📌", "📎", "✒", "✏", "📏", "📐", "📕", "📗", "📘", "📙", "📓", "📔", "📒", "📚", "📖", "🔖", "📛", "🔬", ],
        title: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ],
    },
    RVtraffic: {
        name: "房车交通",
        path: "https://www.haodanku.com/Public/assets/home/js/emoji/icon/12/",
        imgName: ["bqfh0.png", "bqfh1.png", "bqfh2.png", "bqfh3.png", "bqfh4.png", "bqfh5.png", "bqfh6.png", "bqfh7.png", "bqfh8.png", "bqfh9.png", "bqfh10.png", "bqfh11.png", "bqfh12.png", "bqfh13.png", "bqfh14.png", "bqfh15.png", "bqfh16.png", "bqfh17.png", "bqfh18.png", "bqfh19.png", "bqfh20.png", "bqfh21.png", "bqfh22.png", "bqfh23.png", "bqfh24.png", "bqfh25.png", "bqfh26.png", "bqfh27.png", "bqfh28.png", "bqfh29.png", "bqfh30.png", "bqfh31.png", "bqfh32.png", "bqfh33.png", "bqfh34.png", "bqfh35.png", "bqfh36.png", "bqfh37.png", "bqfh38.png", "bqfh39.png", "bqfh40.png", "bqfh41.png", "bqfh42.png", "bqfh43.png", "bqfh44.png", "bqfh45.png", "bqfh46.png", "bqfh47.png", "bqfh48.png", "bqfh49.png", "bqfh50.png", "bqfh51.png", "bqfh52.png", "bqfh53.png", "bqfh54.png", "bqfh55.png", "bqfh56.png", "bqfh57.png", "bqfh58.png", "bqfh59.png", "bqfh60.png", "bqfh61.png", "bqfh62.png", "bqfh63.png", "bqfh64.png", "bqfh65.png", "bqfh66.png", "bqfh67.png", "bqfh68.png", "bqfh69.png", "bqfh70.png", "bqfh71.png", "bqfh72.png", "bqfh73.png", "bqfh74.png", "bqfh75.png", "bqfh76.png", "bqfh77.png", "bqfh78.png", "bqfh79.png", "bqfh80.png", "bqfh81.png", "bqfh82.png"],
        alias: ["🏠", "🏡", "🏫", "🏢", "🏣", "🏥", "🏦", "🏪", "🏩", "🏨", "💒", "⛪", "🏬", "🏤", "🌇", "🌆", "🏯", "🏰", "⛺", "🏭", "🗼", "🗾", "🗻", "🌄", "🚢", "⛵", "🚤", "🚣", "⚓", "🚀", "✈", "💺", "🚁", "🚂", "🚊", "🚉", "🚞", "🚆", "🚄", "🚅", "🚈", "🚇", "🚝", "🚋", "🚃", "🚎", "🚌", "🚍", "🚙", "🚘", "🚗", "🚕", "🚖", "🚛", "🚚", "🚨", "🚓", "🚔", "🚒", "🚑", "🚐", "🚲", "🚡", "🚟", "🚠", "🚜", "💈", "🚏", "🎫", "🚦", "🚥", "⚠", "🚧", "🔰", "⛽", "🏮", "🎰", "♨", "🗿", "🎪", "🎭", "📍", "🚩", ],
        title: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ],
    },
    zodiac: {
        name: "生肖星座",
        path: "https://www.haodanku.com/Public/assets/home/js/emoji/icon/5/",
        imgName: ["bqfh52.png", "bqfh53.png", "bqfh44.png", "bqfh45.png", "bqfh46.png", "bqfh26.png", "bqfh47.png", "bqfh48.png", "bqfh15.png", "bqfh49.png", "bqfh50.png", "bqfh51.png", "bqfh110.png", "bqfh111.png", "bqfh112.png", "bqfh113.png", "bqfh114.png", "bqfh115.png", "bqfh116.png", "bqfh117.png", "bqfh118.png", "bqfh119.png", "bqfh120.png", "bqfh121.png"],
        alias: ["🐁", "🐂", "🐅", "🐇", "🐉", "🐍", "🐎", "🐐", "🐒", "🐓", "🐕", "🐖", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓", ],
        title: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪", "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "摩羯座", "水瓶座", "双鱼座", ],
    },
    textSeries: {
        name: "文字系列",
        path: "https://www.haodanku.com/Public/assets/home/js/emoji/icon/9/",
        imgName: ["bqfh51.png", "bqfh52.png", "bqfh53.png", "bqfh54.png", "bqfh55.png", "bqfh56.png", "bqfh57.png", "bqfh58.png", "bqfh59.png", "bqfh60.png", "bqfh65.png", "bqfh68.png", "bqfh71.png", "bqfh72.png", "bqfh73.png", "bqfh74.png", "bqfh79.png", "bqfh80.png", "bqfh81.png", "bqfh82.png", "bqfh83.png", "bqfh84.png", "bqfh86.png", "bqfh85.png", "bqfh100.png", "bqfh103.png", "bqfh104.png", "bqfh105.png", "bqfh106.png", "bqfh95.png"],
        alias: ["🈯", "🈳", "🈵", "🈴", "🈲", "🉐", "🈹", "🈺", "🈶", "🈚", "🚾", "🅿", "🈷", "🈸", "🈂", "Ⓜ", "🉑", "㊙", "㊗", "🆑", "🆘", "🆔", "🔞", "🚫", "🆚", "🅰", "🅱", "🆎", "🅾", "❇", ],
        title: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ],
    },
    signs: {
        name: "各种标识",
        path: "https://www.haodanku.com/Public/assets/home/js/emoji/icon/11/",
        imgName: ["bqfh61.png", "bqfh62.png", "bqfh63.png", "bqfh64.png", "bqfh66.png", "bqfh67.png", "bqfh69.png", "bqfh70.png", "bqfh75.png", "bqfh76.png", "bqfh77.png", "bqfh78.png", "bqfh85.png", "bqfh86.png", "bqfh88.png", "bqfh89.png", "bqfh90.png", "bqfh91.png", "bqfh92.png", "bqfh93.png", "bqfh94.png", "bqfh95.png", "bqfh96.png", "bqfh97.png", "bqfh98.png", "bqfh99.png", "bqfh101.png", "bqfh102.png", "bqfh107.png", "bqfh108.png", "bqfh109.png", "bqfh122.png", "bqfh0.png", "bqfh1.png", "bqfh2.png", "bqfh3.png", "bqfh4.png", "bqfh5.png", "bqfh6.png", "bqfh7.png", "bqfh8.png", "bqfh9.png", "bqfh10.png", "bqfh11.png", "bqfh12.png", "bqfh13.png", "bqfh14.png", "bqfh15.png", "bqfh16.png", "bqfh17.png", "bqfh18.png", "bqfh19.png", "bqfh20.png", "bqfh21.png", "bqfh22.png", "bqfh23.png", "bqfh24.png", "bqfh25.png", "bqfh26.png", "bqfh27.png", "bqfh28.png", "bqfh29.png", "bqfh30.png", "bqfh31.png", "bqfh32.png", "bqfh33.png", "bqfh34.png", "bqfh35.png", "bqfh36.png", "bqfh37.png", "bqfh38.png", "bqfh39.png", "bqfh40.png", "bqfh41.png", "bqfh42.png", "bqfh43.png", "bqfh44.png", "bqfh45.png", "bqfh46.png", "bqfh47.png", "bqfh48.png", "bqfh49.png", "bqfh50.png", "bqfh123.png", "bqfh124.png", "bqfh125.png", "bqfh126.png", "bqfh127.png", "bqfh128.png", "bqfh129.png", "bqfh130.png", "bqfh131.png", "bqfh132.png", "bqfh133.png", "bqfh134.png", "bqfh135.png", "bqfh136.png", "bqfh137.png", "bqfh138.png", "bqfh139.png", "bqfh140.png", "bqfh141.png", "bqfh142.png", "bqfh143.png", "bqfh144.png", "bqfh145.png", "bqfh146.png", "bqfh147.png", "bqfh148.png", "bqfh149.png", "bqfh150.png", "bqfh151.png", "bqfh152.png", "bqfh153.png", "bqfh154.png", "bqfh155.png", "bqfh156.png", "bqfh157.png", "bqfh158.png", "bqfh159.png", "bqfh160.png", "bqfh161.png", "bqfh162.png", "bqfh163.png", "bqfh164.png", "bqfh165.png", "bqfh166.png", "bqfh167.png", "bqfh168.png", "bqfh169.png", "bqfh170.png", "bqfh171.png", "bqfh172.png", "bqfh173.png", "bqfh174.png", "bqfh175.png", "bqfh176.png", "bqfh177.png", "bqfh178.png", "bqfh179.png", "bqfh180.png", "bqfh181.png", "bqfh182.png", "bqfh183.png", "bqfh184.png", "bqfh185.png", "bqfh186.png", "bqfh187.png", "bqfh188.png", "bqfh189.png", "bqfh190.png", "bqfh191.png", "bqfh192.png", "bqfh193.png", "bqfh194.png", "bqfh195.png", "bqfh196.png", "bqfh197.png", "bqfh198.png", "bqfh199.png", "bqfh200.png", "bqfh201.png", ],
        alias: ["🚻", "🚹", "🚺", "🚼", "🚰", "🚮", "♿", "🚭", "🛂", "🛄", "🛅", "🛃", "🚫", "🔞", "🚯", "🚱", "🚳", "🚷", "🚸", "⛔", "✳", "❇", "❎", "✅", "✴", "💟", "📳", "📴", "💠", "➿", "♻", "⛎", "0⃣", "1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣", "🔟", "⬆", "⬇", "⬅", "➡", "🔣", "🔢", "🔠", "🔡", "🔤", "↗", "↖", "↘", "↙", "↔", "↕", "🔄", "◀", "▶", "🔼", "🔽", "↩", "↪", "ℹ", "⏪", "⏫", "⏬", "⤵", "⤴", "🆗", "🔀", "🔁", "🔂", "🆕", "🆙", "🆒", "🆓", "🆖", "📶", "🎦", "🈁", "🔯", "🏧", "💹", "💲", "💱", "™", "❌", "‼", "⁉", "❗", "❓", "❕", "❔", "⭕", "🔝", "🔚", "🔙", "🔛", "🔜", "🔃", "🕛", "🕧", "🕐", "🕜", "🕑", "🕝", "🕒", "🕞", "🕓", "🕟", "🕔", "🕠", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕡", "🕢", "🕤", "🕥", "🕦", "➕", "➖", "➗", "♠", "♥", "♣", "♦", "💮", "💯", "✔", "☑", "🔘", "🔗", "➰", "〰", "〽", "🔱", "◼", "◻", "◾", "◽", "▪", "▫", "🔺", "🔲", "🔳", "⚫", "⚪", "🔴", "🔵", "🔻", "🔶", "🔷", "🔸", "🔹", "✖", ],
        title: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ]
    }
};

var vmToolPic = new Vue({
	el: "#vmToolPic",
	data: {
		fontSizeList: "12 14 16 18 20 22 24 26 28 30 32".split(" "),
		fontSizeLists: "16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48".split(" "),
		isfontShow: !1,
		fontSizeSelected: 16,
		colors: {
			r: 255,
			g: 0,
			b: 0
		},
		fontColor: "#409EFF",
		goodsId: "",
		fontAbout: {
			round: [{
				title: "文字一",
				className: "round-text1",
				text: "我们券后只需",
				fontColor: "#fff",
				fontFamily: "Microsoft Yahei",
				fontSize: 16,
				isfontShow: !1
			}, {
				title: "文字二",
				className: "round-text2",
				text: "29.9",
				fontColor: "#fff",
				fontFamily: "Microsoft Yahei",
				fontSize: 28,
				isfontShow: !1
			}, {
				title: "文字三",
				className: "round-text3",
				text: "比促销价更优惠",
				fontColor: "#fff",
				fontFamily: "Microsoft Yahei",
				fontSize: 16,
				isfontShow: !1
			}, {
				title: "文字四",
				className: "round-text4",
				text: "速度抢",
				fontColor: "#fff",
				fontFamily: "Microsoft Yahei",
				fontSize: 16,
				isfontShow: !1
			}],
			oblong: [{
				title: "文字一",
				className: "oblong-text1",
				text: "￥19.9￥",
				fontColor: "#fff",
				fontFamily: "Microsoft Yahei",
				fontSize: 16,
				isfontShow: !1
			}, {
				title: "文字二",
				className: "oblong-text2",
				text: "天猫Tmall",
				fontColor: "#fff",
				fontFamily: "Microsoft Yahei",
				fontSize: 16,
				isfontShow: !1
			}, {
				title: "文字三",
				className: "oblong-text3",
				text: "省60元",
				fontColor: "#fff",
				fontFamily: "Microsoft Yahei",
				fontSize: 16,
				isfontShow: !1
			}],
			oSpikes: [{
				title: "栏顶(上)",
				text: "精选必抢单",
				fontSize: 40,
				fontColor: "#fff",
				number: 1
			}, {
				title: "栏顶(下)",
				text: "明日预告",
				fontSize: 30,
				fontColor: "#fff",
				number: 2
			}]
		},
		bgTips: {
			round: "#ffffff"
		},
		predefineColors: "#ffffff;#ff4500;#ff8c00;#ffd700;#90ee90;#00ced1;#1e90ff;#c71585;rgb(255, 120, 0)".split(";"),
		ExplaninArr: {
			box0: {
				explainText: "点击上传主图",
				exImg: ""
			},
			box1: {
				explainText: "点击上传左副图",
				exImg: ""
			},
			box2: {
				explainText: "点击上传右副图",
				exImg: ""
			}
		},
		tipsType: 0,
		roundTips: [{
			imgurl: "https://www.haodanku.com/Public/assets/home/images/tool/C1.png",
			class: ""
		}, {
			imgurl: "https://www.haodanku.com/Public/assets/home/images/tool/C2.png",
			class: ""
		}, {
			imgurl: "https://www.haodanku.com/Public/assets/home/images/tool/C3.png",
			class: "word3"
		}, {
			imgurl: "https://www.haodanku.com/Public/assets/home/images/tool/240×240.png",
			class: "word5"
		}],
		roundTipsC: "",
		oblongTips: [{
			imgurl: "https://www.haodanku.com/Public/assets/home/images/tool/chang1.png"
		}, {
			imgurl: "https://www.haodanku.com/Public/assets/home/images/tool/chang2.png"
		}, {
			imgurl: "https://www.haodanku.com/Public/assets/home/images/tool/chang3.png"
		}],
		oblongTipsC: "",
		curRoundTips: -1,
		curOlongTips: -1,
		tbUrl: "",
		shopUrl: Request("shopUrl") ? Request("shopUrl") : "",
		goodsImg: {
			mainImgs: ["", "", ""],
			realImgs: ["", "", ""],
			marketImgs: ["", "", ""],
			arraygoodsDATA: ""
		},
		imgMakeUrl: "",
		picCanvas: "",
		activeMakeImgBox: 0,
		objSpike: {
			style: [{
				name: "缤纷_单列",
				className: "TspikeBg0",
				number: 0
			}, {
				name: "蓝色_单列",
				className: "TspikeBg1",
				number: 1
			}, {
				name: "橙黄色_单列",
				className: "TspikeBg2",
				number: 2
			}],
			oDefinTypeset: [{
				name: "单行标题",
				className: "",
				number: 0
			}, {
				name: "多行标题",
				className: "Tspstyle0",
				number: 1
			}],
			defineTypesetName: "单行标题",
			definTypeset: "",
			isTypesetShow: !1,
			defineName: "缤纷_单列",
			defineclass: "TspikeBg0",
			isStyleShow: !1,
			count: 0,
			countArr: [{
				title: {
					tit: "商品标题",
					name: "三只松鼠",
					size: "18",
					color: "#fff"
				},
				money: {
					tit: "原价",
					name: "50.0",
					size: "16",
					color: "#fff"
				},
				quan: {
					tit: "券后价",
					name: "10.0",
					size: "16",
					color: "#fff"
				},
				time: {
					tit: "日期",
					name: "3月14号 上午10:00",
					size: "16",
					color: "#fff"
				},
				image: ""
			}, {
				title: {
					tit: "商品标题",
					name: "三只松鼠",
					size: "18",
					color: "#fff"
				},
				money: {
					tit: "原价",
					name: "50.0",
					size: "16",
					color: "#fff"
				},
				quan: {
					tit: "券后价",
					name: "10.0",
					size: "16",
					color: "#fff"
				},
				time: {
					tit: "日期",
					name: "3月14号 上午10:00",
					size: "16",
					color: "#fff"
				},
				image: ""
			}],
			upImg: [],
			swpierImg: [
				"https://www.haodanku.com/Public/assets/home/images/tool/Tsps1.png", 
				"https://www.haodanku.com/Public/assets/home/images/tool/Tsps2.png", 
				"https://www.haodanku.com/Public/assets/home/images/tool/Tsps3.png"
			],
				defineSwpierImg: "https://www.haodanku.com/Public/assets/home/images/tool/Tsps1.png",
				clickRecord: 0
			},
			fontFamilyList: [{
				ch: "宋体",
				en: "SimSun"
			}, {
				ch: "Arial",
				en: "Arial"
			}, {
				ch: "黑体",
				en: "SimHei"
			}, {
				ch: "微软雅黑",
				en: "Microsoft Yahei"
			}, {
				ch: "微软正黑体",
				en: "Microsoft JhengHei"
			}, {
				ch: "楷体",
				en: "KaiTi"
			}, {
				ch: "新宋体",
				en: "NSimSun"
			}, {
				ch: "仿宋",
				en: "FangSong"
			}, {
				ch: "Times New Roman",
				en: "Times New Roman"
			}, {
				ch: "Helvetica",
				en: "Helvetica"
			}, {
				ch: "Verdana",
				en: "Verdana"
			}, {
				ch: "Tahoma",
				en: "Tahoma"
			}],
			ImgSize: "_400x400.jpg",
			hoverIndex: -1,
			Token: {
				isToken: "",
				toeknTime: "",
				toeknBoolean: !1
			},
			oFiery: {
				FierySpike: {
					style: [{
						name: "缤纷_单列1",
						className: "FieryBg0",
						number: 0
					}, {
						name: "缤纷_单列2",
						className: "FieryBg1",
						number: 1
					}, {
						name: "缤纷_单列3",
						className: "FieryBg2",
						number: 2
					}]
				},
				FieryoSpikes: [{
					title: "栏顶(上)",
					text: "爆款汇总",
					fontSize: 40,
					fontColor: "#fff",
					number: 1
				}, {
					title: "栏顶(下)",
					text: "每日更新最火爆优质商品",
					fontSize: 16,
					fontColor: "#fff",
					number: 2
				}],
				FieryCountArr: [{
					title: {
						tit: "品牌",
						name: "[三只松鼠]",
						size: "16",
						color: "#fff"
					},
					money: {
						tit: "标题",
						name: "零食大礼包",
						size: "16",
						color: "#fff"
					},
					quan: {
						tit: "出单量",
						name: "6666",
						size: "32",
						color: "#fff"
					},
					time: {
						tit: "日期",
						name: "3.20",
						size: "16",
						color: "#fff"
					},
					image: ""
				}, {
					title: {
						tit: "品牌",
						name: "[三只松鼠]",
						size: "16",
						color: "#fff"
					},
					money: {
						tit: "标题",
						name: "零食大礼包",
						size: "16",
						color: "#fff"
					},
					quan: {
						tit: "出单量",
						name: "6666",
						size: "32",
						color: "#fff"
					},
					time: {
						tit: "日期",
						name: "3.20",
						size: "16",
						color: "#fff"
					},
					image: ""
				}, {
					title: {
						tit: "品牌",
						name: "[三只松鼠]",
						size: "16",
						color: "#fff"
					},
					money: {
						tit: "标题",
						name: "零食大礼包",
						size: "16",
						color: "#fff"
					},
					quan: {
						tit: "出单量",
						name: "6666",
						size: "32",
						color: "#fff"
					},
					time: {
						tit: "日期",
						name: "3.20",
						size: "16",
						color: "#fff"
					},
					image: ""
				}, 
				{
				title: {
					tit: "品牌",
					name: "[三只松鼠]",
					size: "16",
					color: "#fff"
				},
				money: {
					tit: "标题",
					name: "零食大礼包",
					size: "16",
					color: "#fff"
				},
				quan: {
					tit: "出单量",
					name: "6666",
					size: "32",
					color: "#fff"
				},
				time: {
					tit: "日期",
					name: "3.20",
					size: "16",
					color: "#fff"
				},
				image: ""
			}],
			FieryDefineName: "缤纷_单列",
			FieryDefineclass: "FieryBg0",
			FieryIsStyleShow: !1,
			FieryswpierImg: ["https://www.haodanku.com/Public/assets/home/images/tool/TspFierySwiper0.png"],
			FierydefineSwpierImg: "https://www.haodanku.com/Public/assets/home/images/tool/TspFierySwiper0.png",
			FieryclickRecord: 0
		}
	},
	methods: {
		drop: function(a, b) {},
		allowDrop: function(a) {
			a.preventDefault()
		},
		drag: function(a) {
			if (1 == this.tipsType || 0 == this.tipsType) a.dataTransfer.setData("Text", a.target.id), a.dataTransfer.setData("img_url", a.target.src), a.dataTransfer.dropEffect = "copy";
			2 == this.tipsType && (a.dataTransfer.setData("Text", a.target.id), a.dataTransfer.setData("img_url", a.target.src), a.dataTransfer.dropEffect = "copy");
			3 == this.tipsType && (a.dataTransfer.setData("Text", a.target.id), a.dataTransfer.setData("img_url", a.target.src), a.dataTransfer.dropEffect = "copy")
		},
		file: function(a) {
			document.getElementById(a).click()
		},
		readFile: function(a, b) {
			var d = this;
			if (a = a.target.files[0]) {
				if (!/image\/\w+/.test(a.type)) return layer.alert("文件必须为图片哦！", {
					icon: 5
				}), !1;
				if (512E4 <= a.size) layer.msg("图片大小过大，应小于5M！", {
					icon: 2
				});
				else {
					var c = new FileReader;
					c.readAsDataURL(a);
					c.onload = function(a) {
						d.ExplaninArr[b].exImg = this.result
					}
				}
			}
		},
		isFileReader: function() {
			if ("undefined" === typeof FileReader) return layer.alert("您的浏览器不支持图片上传，请升级您的浏览器", {
				icon: 5
			}), !1
		},
		setdisabled: function(a) {
			document.getElementById(a).setAttribute("disabled", "disabled")
		},
		ajaxGetToken: function() {
			var a = this;
			layer.msg("正在合成中...", {
				icon: 16,
				shade: .1,
				skin: "mylayer-border-radius",
				time: !1
			});
			a.unitePic();

			// a.Token.toeknBoolean ? a.unitePic() : $.ajax({
			// 	type: "GET",
			// 	url: "https://www.haodanku.com/indexapi/get_qiniu_token",
			// 	data: {},
			// 	dataType: "json",
			// 	timeout: 1E4,
			// 	success: function(b) {
			// 		"200" == b.status ? (a.Token.isToken = b.qiniu_token, a.Token.toeknBoolean = !0, a.unitePic(), clearTimeout(a.Token.toeknTime), a.setIntervalFun()) : (layer.msg("图片合成失败，请重新试", {
			// 			icon: 2
			// 		}), clearTimeout(a.Token.toeknTime), a.Token.isToken = "")
			// 	},
			// 	error: function() {
			// 		layer.msg("网络错误，请检查网络", {
			// 			icon: 2
			// 		});
			// 		clearTimeout(a.Token.toeknTime);
			// 		a.Token.isToken = ""
			// 	},
			// 	xhrFields: {
			// 		withCredentials: !0
			// 	}
			// })
		},
		setIntervalFun: function() {
			var a = this;
			this.Token.toeknTime = setInterval(function() {
				a.Token.toeknBoolean = !1
			}, 3E5)
		},
		unitePic: function() {
			var a = this;
			$("#unitePic canvas").remove();
			var b = document.getElementById("imgMakeBox"),
				d = document.getElementById("unitePic"),
				c = document.getElementById("imgGroupBig");
			c.innerHTML = b.innerHTML;
			if (0 == a.tipsType && a.roundTipsC || 1 == a.tipsType && a.oblongTipsC) if (b = this.countPotionRound(), "{}" != JSON.stringify(b)) {
				if (b.round) {
					var f = c.getElementsByClassName("tipsInuse-round")[0];
					f.style.top = b.round.top;
					f.style.left = b.round.left
				}
				b.oblong && (f = c.getElementsByClassName("tipsInuse-oblong")[0], f.style.top = b.oblong.top, f.style.left = b.oblong.left)
			}
			html2canvas(c, {
				useCORS: !0,
				allowTaint: !1
			}).then(function(a) {
				d.appendChild(a)
			}).then(function() {
				var c = d.getElementsByTagName("canvas")[0],
				b = c.toDataURL("image/png");
				// b = b.substring(22);
				// var f = Math.round(1E3 * Math.random()) + ".jpg";
				// f = btoa(f);

				$.post(URLPrefix.api_url+'/api/common/upload/uploadImg',{
					base64:b,
					times:URLPrefix.times,
					url_sign:URLPrefix.url_sign,
					member_token:URLPrefix.token,
				},function(data){
					if(data.info.status == 1){
						var b = data.item.img;
						c.parentNode.removeChild(c);
						a.imgMakeUrl = b;
						layer.msg("合成图片成功", {
							icon: 1,
							time: 1500
						})
					}else{
						layer.msg('合成失败,请重新刷新页面重试', {icon: 2,time: 2000},function(){
							
						});
					}
				},"json");
			})
		},
		addRoundTips: function(a, b, d) {
			this.curRoundTips = b;
			this.roundTipsC = a.currentTarget.innerHTML
		},
		addOlongTips: function(a, b, d) {
			this.curOlongTips = b;
			this.oblongTipsC = a.currentTarget.innerHTML
		},
		countPotionRound: function() {
			var a = document.getElementById("imgMakeBox"),
				b = a.offsetHeight,
				d = a.offsetWidth,
				c = a.getElementsByClassName("tipsInuse-round")[0],
				f = a.getElementsByClassName("tipsInuse-oblong")[0];
			a = {};
			if (this.roundTipsC) {
				var e = c.style.top;
				c = c.style.left;
				e = e && parseInt(e);
				c = c && parseInt(c);
				if ("" != e || "" != c) toprB = this.countPercentage(e, b), leftrB = this.countPercentage(c, d), a.round = {
					top: toprB,
					left: leftrB
				}
			}
			this.oblongTipsC && (c = f.style.top, f = f.style.left, c = c && parseInt(c), f = f && parseInt(f), "" != c || "" != f) && (topoB = this.countPercentage(c, b), leftoB = this.countPercentage(f, d), a.oblong = {
				top: topoB,
				left: leftoB
			});
			return a
		},
		countPercentage: function(a, b) {
			return Math.round(a / b * 1E4) / 100 + "%"
		},
		dragTips: function(a, b, d) {
			b = document.getElementById(b);
			var c = document.getElementById(d);
			a = a || window.event;
			var f = b.offsetWidth - c.offsetWidth,
				e = b.offsetHeight - c.offsetHeight;
			c.startX = a.clientX - c.offsetLeft;
			c.startY = a.clientY - c.offsetTop;
			document.onmousemove = function(a) {
				localStorage.removeItem("left1");
				localStorage.removeItem("top1");
				var b = a.clientX - c.startX,
					d = a.clientY - c.startY;
				a = a || window.event;
				0 >= a.clientX - c.startX && (c.style.left = "0px", b = 0);
				0 >= a.clientY - c.startY && (c.style.top = "0px", d = 0);
				a.clientX - c.startX >= f && (c.style.left = f + "px", b = f);
				a.clientY - c.startY >= e && (c.style.top = e + "px", d = e);
				c.style.left = b + "px";
				c.style.top = d + "px";
				localStorage.setItem("left1", b);
				localStorage.setItem("top1", d)
			};
			document.onmouseup = function() {
				document.onmousemove = null;
				document.onmouseup = null
			}
		},
		seeImg: function(a) {
			layer.open({
				type: 1,
				title: !1,
				closeBtn: 0,
				area: "300px",
				shadeClose: !0,
				content: '<div class="seeImgWrap"><img src="' + a + '"></div>'
			})
		},
		getGoodsImgs: function() {
			var a = this;
			layer.load(2, {
				shade: .1
			});
			var b = /[\?&]id=(\d+)/;
			if (null != this.tbUrl.match(b)) {
				var d = this.tbUrl.match(b)[1];
				null != d ? ajaxPost("/api/user/tools/tools/toolspic", {
					id: d,
				}, function(c) {
					layer.closeAll();
					if (0 == c.info.status) {
						a.goodsId = d;
						var b = c.data.item.goods;
						a.goodsImg.arraygoodsDATA = c.data;
						layer.msg(c.message, {
							icon: 1
						});
						if ("" != b.picList) {
							a.goodsImg.mainImgs = [];
							for (var e = 0; e < b.picList.length; e++){
								a.goodsImg.mainImgs[e] = b.picList[e] ;
							} 
						} else {
							a.goodsImg.mainImgs = ["", "", ""];
						}
						c = b.array_all;
						if ("" != c && 2 == a.tipsType) {
							var g = [];
							for (e = 0; e < a.objSpike.countArr.length; e++)"" == a.objSpike.countArr[e].image && g.push(e);
							0 < g.length ? (e = g[0], a.objSpike.countArr[e].title.name = c.itemshorttitle, a.objSpike.countArr[e].money.name = c.itemprice, a.objSpike.countArr[e].quan.name = c.itemendprice, a.objSpike.countArr[e].time.name = c.couponstarttime, a.objSpike.countArr[e].image = c.itempic) : 0 >= g.length && 0 >= a.objSpike.countArr.length && (a.styleAdd(), a.objSpike.countArr[0].title.name = c.itemshorttitle, a.objSpike.countArr[0].money.name = c.itemprice, a.objSpike.countArr[0].quan.name = c.itemendprice, a.objSpike.countArr[0].time.name = c.couponstarttime, a.objSpike.countArr[0].image = c.itempic)
						}
						if ("" != c && 3 == a.tipsType) {
							g = [];
							for (e = 0; e < a.oFiery.FieryCountArr.length; e++)"" == a.oFiery.FieryCountArr[e].image && g.push(e);
							0 < g.length ? (e = g[0], a.oFiery.FieryCountArr[e].title.name = c.shopname, a.oFiery.FieryCountArr[e].money.name = c.itemshorttitle, a.oFiery.FieryCountArr[e].quan.name = b.itemsale, a.oFiery.FieryCountArr[e].time.name = c.couponstarttime_plus, a.oFiery.FieryCountArr[e].image = c.itempic) : 0 >= g.length && 0 >= a.oFiery.FieryCountArr.length && (a.styleAdd(), a.oFiery.FieryCountArr[0].title.name = c.shopname, a.oFiery.FieryCountArr[0].money.name = c.itemshorttitle, a.oFiery.FieryCountArr[0].quan.name = b.itemsale, a.oFiery.FieryCountArr[0].time.name = c.couponstarttime_plus, a.oFiery.FieryCountArr[0].image = c.itempic)
						}
						// if ("" != b.itempic_copy) for (a.goodsImg.marketImgs = [], e = 0; e < b.itempic_copy.length; e++) a.goodsImg.marketImgs[e] = b.itempic_copy[e] + "_600x600.jpg";
						// else a.goodsImg.marketImgs = ["", "", ""];
						a.$forceUpdate()
					} else 100 == c.info.status ? loginJump(a.tbUrl) : layer.alert(c.info.status_err, {
						icon: 2
					})
				}, function() {
					layer.closeAll();
					layer.alert("网络错误", {
						icon: 5
					})
				}) : (layer.closeAll(), layer.msg("你输入的信息中没有获取到产品id，请重新输入有效的商品链接"))
			} else layer.closeAll(), layer.msg("无效的商品链接！", {
				time: 1500,
				shade: .1,
				shadeClose: !0
			})
		},
		cleanImg: function(a) {
			this.ExplaninArr[a].exImg = ""
		},
		cleanTips: function(a) {
			a.currentTarget.innerHTML = ""
		},
		cleanTipsRound: function() {
			this.roundTipsC = ""
		},
		cleanTipsOblong: function() {
			this.oblongTipsC = ""
		},
		hoverAdd: function(a) {
			this.hoverIndex = a != this.hoverIndex ? a : -1
		},
		addImgMake: function(a, b) {
			this.ExplaninArr[b].exImg = a;
			this.hoverIndex = -1
		},
		copy: function() {
			this.imgMakeUrl ? layer.msg("复制成功", {
				icon: 1,
				itme: 1500
			}) : layer.msg("暂无合成图片", {
				icon: 2,
				itme: 1500
			});
			var a = new ClipboardJS(".copyUrl", {
				target: function() {
					return document.querySelector(".unitePic")
				}
			});
			a.on("success", function(a) {
				if (0 == a.trigger.disabled || void 0 == a.trigger.disabled) a.trigger.disabled = !0, setTimeout(function() {
					a.trigger.disabled = !1
				}, 2E3)
			});
			a.on("error", function() {
				a.destroy()
			})
		},
		downImgMake: function() {
			this.imgMakeUrl ? this.downloadIamge(this.imgMakeUrl, Math.round(1E3 * Math.random())) : layer.msg("暂无合成图片", {
				icon: 2,
				itme: 1500
			})
		},
		downloadIamge: function(a, b) {
			var d = new Image;
			d.setAttribute("crossOrigin", "anonymous");
			d.onload = function() {
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
			d.src = a
		},
		setFontColor: function(a, b) {
			a = document.getElementsByClassName(a);
			for (var d = a.length, c = 0; c < d; c++) a[c].style.color = b
		},
		getContrastYIQ: function(a) {
			var b = parseInt(a.substr(0, 2), 16),
				d = parseInt(a.substr(2, 2), 16);
			a = parseInt(a.substr(4, 2), 16);
			return 128 <= (299 * b + 587 * d + 114 * a) / 1E3 ? "black" : "gray"
		},
		setFontSize: function(a, b, d) {
			a = document.getElementsByClassName(a);
			d = a.length;
			b /= 16;
			for (var c = 0; c < d; c++) a[c].style.fontSize = b + "em"
		},
		setFontFamily: function(a, b) {
			a = document.getElementsByClassName(a);
			for (var d = a.length, c = 0; c < d; c++) a[c].style.fontFamily = b
		},
		openCloseFontFamily: function(a, b, d, c) {
			d = c.currentTarget;
			0 == d.getAttribute("data-open") ? (d.setAttribute("data-open", "1"), this.fontAbout[b][a].isfontShow = !0) : (d.setAttribute("data-open", "0"), this.fontAbout[b][a].isfontShow = !1)
		},
		blurf: function(a, b, d, c) {
			d && (this.fontAbout[b][a].isfontShow = !1, setTimeout(function() {
				for (var a = document.getElementsByClassName("butText"), c = a.length, b = 0; b < c; b++) a[b].setAttribute("data-open", "0")
			}, 300))
		},
		setTipsBg: function(a, b) {
			a = document.getElementsByClassName(a);
			for (var d = a.length, c = 0; c < d; c++) a[c].style.backgroundColor = b
		},
		setStyle: function(a, b) {
			2 == this.tipsType && (this.objSpike.isStyleShow = !1, this.objSpike.defineName = b, this.objSpike.defineclass = a);
			3 == this.tipsType && (this.oFiery.FieryIsStyleShow = !1, this.oFiery.FieryDefineName = b, this.oFiery.FieryDefineclass = a)
		},
		TypesetBtn: function(a) {
			this.objSpike.isTypesetShow = !1;
			this.objSpike.defineTypesetName = a.name;
			this.objSpike.definTypeset = a.className;
			if (0 == a.number) for (a = 0; a < this.objSpike.countArr.length; a++) this.objSpike.countArr[a].money.size = 16;
			else for (a = 0; a < this.objSpike.countArr.length; a++) this.objSpike.countArr[a].money.size = 12
		},
		regstyleBtn: function() {
			this.objSpike.isTypesetShow = !1;
			this.objSpike.isStyleShow = !1
		},
		styleAdd: function() {
			if (2 == this.tipsType) {
				if (20 <= this.objSpike.countArr.length) {
					layer.msg("不能再添加了", {
						icon: 2
					});
					return
				}
				this.objSpike.countArr.push({
					title: {
						tit: "商品标题",
						name: "三只松鼠",
						size: "18",
						color: "#fff"
					},
					money: {
						tit: "原价",
						name: "50.0",
						size: "16",
						color: "#fff"
					},
					quan: {
						tit: "券后价",
						name: "10.0",
						size: "16",
						color: "#fff"
					},
					time: {
						tit: "日期",
						name: "3月14号 上午10:00",
						size: "16",
						color: "#fff"
					},
					image: ""
				});
				"Tspstyle0" == this.objSpike.definTypeset && (this.objSpike.countArr[this.objSpike.countArr.length - 1].money.size = 12)
			}
			3 == this.tipsType && (20 <= this.oFiery.FieryCountArr.length ? layer.msg("不能再添加了", {
				icon: 2
			}) : this.oFiery.FieryCountArr.push({
				title: {
					tit: "品牌",
					name: "[三只松鼠]",
					size: "16",
					color: "#fff"
				},
				money: {
					tit: "标题",
					name: "零食大礼包",
					size: "16",
					color: "#fff"
				},
				quan: {
					tit: "出单量",
					name: "6666",
					size: "32",
					color: "#fff"
				},
				time: {
					tit: "日期",
					name: "3.20",
					size: "16",
					color: "#fff"
				},
				image: ""
			}))
		},
		styleDelete: function(a, b) {
			2 == this.tipsType && this.objSpike.countArr.splice(b, 1);
			3 == this.tipsType && this.oFiery.FieryCountArr.splice(b, 1)
		},
		stylFile: function(a, b) {
			if (a = a.target.files[0]) {
				if (2 == this.tipsType) {
					if (!/image\/\w+/.test(a.type)) return layer.alert("文件必须为图片哦!", {
						icon: 2
					}), !1;
					if (512E4 <= a.size) {
						layer.msg("图片大小过大，应小于5M！", {
							icon: 2
						});
						return
					}
					var d = new FileReader;
					d.readAsDataURL(a);
					d.onload = function(a) {
						b.image = this.result
					}
				}
				if (3 == this.tipsType) {
					if (!/image\/\w+/.test(a.type)) return layer.alert("文件必须为图片哦!", {
						icon: 2
					}), !1;
					512E4 <= a.size ? layer.msg("图片大小过大，应小于5M！", {
						icon: 2
					}) : (d = new FileReader, d.readAsDataURL(a), d.onload = function(a) {
						b.image = this.result
					})
				}
			}
		},
		drop_img: function(a, b) {
			2 == this.tipsType ? b.image = a.dataTransfer.getData("img_url") : 3 == this.tipsType ? b.image = a.dataTransfer.getData("img_url") : this.ExplaninArr[b].exImg = a.dataTransfer.getData("img_url")
		},
		tipsTypeBtn: function(a) {
			this.tipsType = a;
			this.imgMakeUrl = "";
			2 == a && (this.swiperFun(), this.objSpike.defineSwpierImg = this.objSpike.swpierImg[0])
		},
		swiperFun: function() {
			var a = this;
			setTimeout(function() {
				new Swiper(".Tswiper-container", {
					prevButton: ".swiper-button-prev",
					nextButton: ".swiper-button-next",
					onSlideChangeStart: function(b) {
						a.objSpike.defineSwpierImg = a.objSpike.swpierImg[b.activeIndex]
					}
				})
			}, 100)
		},
		spikeBtn: function(a, b) {
			2 == this.tipsType && (this.objSpike.clickRecord = b);
			3 == this.tipsType && (this.oFiery.FieryclickRecord = b);
			this.AddDefaultData()
		},
		AddDefaultData: function() {
			var a = this.goodsImg.arraygoodsDATA.array_all,
				b = this.goodsImg.arraygoodsDATA;
			"" != a && void 0 != a && 2 == this.tipsType && "" == this.objSpike.countArr[this.objSpike.clickRecord].image && (this.objSpike.countArr[this.objSpike.clickRecord].title.name = a.itemshorttitle, this.objSpike.countArr[this.objSpike.clickRecord].money.name = a.itemprice, this.objSpike.countArr[this.objSpike.clickRecord].quan.name = a.itemendprice, this.objSpike.countArr[this.objSpike.clickRecord].time.name = a.couponstarttime, this.objSpike.countArr[this.objSpike.clickRecord].image = a.itempic);
			"" != a && void 0 != a && 3 == this.tipsType && "" == this.oFiery.FieryCountArr[this.oFiery.FieryclickRecord].image && (this.oFiery.FieryCountArr[this.oFiery.FieryclickRecord].title.name = a.shopname, this.oFiery.FieryCountArr[this.oFiery.FieryclickRecord].money.name = a.itemshorttitle, this.oFiery.FieryCountArr[this.oFiery.FieryclickRecord].quan.name = b.itemsale, this.oFiery.FieryCountArr[this.oFiery.FieryclickRecord].time.name = a.couponstarttime_plus, this.oFiery.FieryCountArr[this.oFiery.FieryclickRecord].image = a.itempic)
		},
		getRealpic: function() {
			"" == this.goodsId ? layer.msg("请先获取商品", {
				tiem: 2E3,
				shade: .1,
				shadeClose: !0
			}) : this.$refs.vmpic.ajaxIrealpic(!0)
		}
	},
	directives: {
		focus: {
			inserted: function(a) {
				a.focus()
			}
		}
	},
	mounted: function() {
		this.shopUrl && (this.tbUrl = decodeURIComponent(decodeURIComponent(this.shopUrl)));
		document.images && (img1 = new Image, img2 = new Image, img3 = new Image, img4 = new Image, img5 = new Image, img1.src = this.objSpike.swpierImg[0], img2.src = this.objSpike.swpierImg[1], img3.src = this.objSpike.swpierImg[2], img4.src = "https://www.haodanku.com/Public/assets/home/images/tool/Tsp1.png", img5.src = "https://www.haodanku.com/Public/assets/home/images/tool/Tsp2.png")
	},
	created: function() {
		this.isFileReader()
	},
	computed: {},
	watch: {}
});
$(function () {
    $("#clearBtn").click(function (e) {
        $('#linkQuery').val('');
    });

    $("#wenanbtn").click(function (e) {
        $this = $(this);
        $this.attr('disabled', 'disabled');
        $this.text('文案生成中,请稍候...');
        var linkQuery = $('#linkQuery').val();
        var pidnumin = $('#pidnumin').val();

        if (pidnumin != '0' && pidnumin != '' && pidnumin != null) {
            $.ajax({
                url: URLPrefix.api_url+'/api/user/tools/tools/transform',
                type: 'POST',
                data: {
                    ajax: 1,
                    content: linkQuery,
                    pid: pidnumin,
                    times:URLPrefix.times,
                    url_sign:URLPrefix.url_sign,
                    member_token:URLPrefix.token,
                },
                dataType: 'json',
                success: function (data) {
                    if(data.info.status==0){
                        var toolimg = '';
                        for (i = 0; i < data.data.goods.goods.picList.length; i++) {
                            toolimg = toolimg + '<li class="fadein" id="liact' + i +
                                '"><a href="javascript:;" rel="nofollow"><img src="' + data.data.goods.goods.picList[i] + '" id="itempic' + i +
                                '"></a></li>';
                        };
                        $("#tool-itempic").html(toolimg);
                        $('#result').html(data.data.content);
                        layer.msg('恭喜，生成已成功！', {
                            icon: 1
                        });
                    }else{
                        layer.msg(data.info.status_err, {
                            icon: 2
                        });
                    }
                    $('#wenanbtn').removeAttr('disabled');
                    $('#wenanbtn').text('生成文案');
                }
            });
        } else {
            layer.msg('抱歉，未检测到PID,请先设置PID！', {
                icon: 2
            });
            $('#wenanbtn').removeAttr('disabled');
            $('#wenanbtn').text('生成文案');
        }
    });

    queryPids();
    function queryPids(){
        $("#pidnumin").html('');
        $("tbody",$('.table-pid')).html('');
        $.ajax({
            url: URLPrefix.api_url+'/api/user/user/pid/list',
            type: 'POST',
            data: {
                times:URLPrefix.times,
                url_sign:URLPrefix.url_sign,
                member_token:URLPrefix.token,
            },
            dataType: 'json',
            success: function (data) {
                if(data.info.status==0){
                    var html="",tableHtml="";
                    if(data.data.items&&data.data.items.length>0){
                        $("#pidnumin").show();
                        $.each(data.data.items, function(i,item){
                            html = html+'<option value="'+(item.pid!=null?item.pid:'')+'" '+(item.selected!=null&&item.selected=='1'?' selected':'')+'>'+(item.pid_name!=null?item.pid_name:'')+'</option>';
                            tableHtml = tableHtml +'<tr><td>'+item.pid_name+'</td><td>'+item.pid+'</td><td><a data-id="'+item.user_pid_id+'" class="btn btn-outline-secondary btn-sm btn-del-pid">删除</a></td></tr>';
                        });
                        $("#pidnumin").html(html);
                        $("tbody",$('.table-pid')).html(tableHtml);
                    }else{
                        $("#pidnumin").hide();
                    }
                }else{
                    // layer.msg(data.info.status_err, {
                    //     icon: 2
                    // });
                }
            }
        });
    }

    $(".tool-copy").click(function (e) {
        var clipboardBtn = new ClipboardJS('.tool-copy',{
            target: function(trigger) {
                return document.querySelector('#result');
            }
        });

        clipboardBtn.on('success', function(e)  {
            e.clearSelection();
            clipboardBtn.destroy();
            layer.msg('复制成功', {time: 2000});
        });
        clipboardBtn.on('error', function(e) {
            return layer.msg('您的浏览器不支持一键复制，请升级浏览器或更换浏览器', {
                icon: 2
            });
        });
    });

    $("#tool-itempic").click(function (event) {
        var $this = $(this);
        $this.find("li").removeClass("active");
        var $target = $(event.target);
        if( $target.is("img") ) {
            $target.closest("li").addClass("active");
            $("img",$("#result")).attr("src",$target.attr("src"));
        }
    });

    $(".generate-taoken").click(function (e) {
        $this = $(this);
        $this.attr('disabled', 'disabled');
        $this.text('解析口令中.....');
        $(".token_result").hide();
        var taoken = $('#taoken').val();
        var captcha = $('#captcha').val();

        if (taoken != '0' && taoken != '' && taoken != null) {
            $.ajax({
                url: URLPrefix.api_url+'/api/user/tools/tools/token',
                type: 'POST',
                data: {
                    content: taoken,
                    captcha: captcha,
                    times:URLPrefix.times,
                    url_sign:URLPrefix.url_sign,
                    member_token:URLPrefix.token,
                },
                dataType: 'json',
                success: function (data) {
                    if(data.info.status==0){
                        $("#url").val(data.data.token.url);
                        $('#content').val(data.data.token.content);
                        $('#pic_url').val(data.data.token.pic_url);
                        $(".token_result").show();
                        layer.msg('恭喜，生成已成功！', {
                            icon: 1
                        });
                    }else{
                        layer.msg(data.info.status_err, {
                            icon: 2
                        });
                    }
                    $("img",$(".verification-captcha")).attr("src",'/showpic?a='+Math.random());
                    $this.removeAttr('disabled');
                    $this.text('解析口令');
                }
            });
        } else {
            layer.msg('请先输入要解析的口令！', {
                icon: 2
            });
            $this.removeAttr('disabled');
            $this.text('解析口令');
        }
    });

    $(".add_pid").click(function (e) {
        $this = $(this);
        $this.attr('disabled', 'disabled');
        $this.text('添加中...');
        var pid_name = $('#pid_name').val();
        var pid_pid = $('#pid_pid').val();

        if (pid_pid != '0' && pid_pid != '' && pid_pid != null) {
            $.ajax({
                url: URLPrefix.api_url+'/api/user/user/pid/update',
                type: 'POST',
                data: {
                    name: pid_name,
                    pid: pid_pid,
                    times:URLPrefix.times,
                    url_sign:URLPrefix.url_sign,
                    member_token:URLPrefix.token,
                },
                dataType: 'json',
                success: function (data) {
                    if(data.info.status==0){
                        queryPids();
                        $('#pid_name').val('');
                        $('#pid_pid').val('');
                        layer.msg('恭喜，生成已成功！', {
                            icon: 1
                        });
                    }else{
                        layer.msg(data.info.status_err, {
                            icon: 2
                        });
                    }
                    $this.removeAttr('disabled');
                    $this.text('添加');
                }
            });
        } else {
            layer.msg('抱歉，pid不能为空！', {
                icon: 2
            });
            $this.removeAttr('disabled');
            $$this.text('添加');
        }
    });

    $(".table-pid").click(function (event) {
        var $this = $(this);
        var $target = $(event.target);
        if( $target.is(".btn-del-pid") ) {
            var user_pid_id = $target.data("id");
            if (user_pid_id != '0' && user_pid_id != '' && user_pid_id != null) {
                $.ajax({
                    url: URLPrefix.api_url+'/api/user/user/pid/delete',
                    type: 'POST',
                    data: {
                        id: user_pid_id,
                        times:URLPrefix.times,
                        url_sign:URLPrefix.url_sign,
                        member_token:URLPrefix.token,
                    },
                    dataType: 'json',
                    success: function (data) {
                        queryPids();
                    }
                });
            }
        }
    });

});