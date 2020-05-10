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

        ajaxPosts("/json/popular.json", {}, function (res) {
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
    //         var emojiUrl = "/Public/assets/home/js/emoji/popular";
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