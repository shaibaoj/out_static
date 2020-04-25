
var oItemId = '';
function echartCheckFun(itemid) {
    $('.active-time').removeClass('active-time');
    $('.echarts-time-content').children('span').eq(0).addClass('echarts-active').siblings().removeClass('echarts-active');
    oItemId = itemid;
    // var itemid = $(this).attr('data-itemid');
    // $('#echarts-mail').attr('data-id', itemid);
    $.ajax({
        url: "/api/common/goods/itemdata",
        type: 'post',
        data: Object.assign({ 'num_iid': itemid },{
            times:URLPrefix.times,
            url_sign:URLPrefix.url_sign,
            member_token:URLPrefix.token,
        }),
        success: function (res) {
            var data = res.data.content;
            if (data.grade_avg > 0) {
                $('.rate-score').removeClass('in-hide');
            } else {
                $('.rate-score').addClass('in-hide');
            }
            $('#t_shorttitle').text(data.shorttitle);
            $('#t_endprice').text(data.itemendprice);
            $('#t_tkrates').text(data.tkrates);
            $('#t_sales').text(data.itemsale);
            $('#t_todaysale').text(data.todaysale);
            $('#t_sellernick').text(data.sellernick);
            $('#t_grade_avg').text(data.grade_avg);
            $('#t_stock').text(data.stock);
            var star_width = parseInt(data.grade_avg * 12);
            $('#star_width').css("width", star_width + "px");
            if (data.is_hdk_item == 1) {
                $('#t_startTime').text(data.checktime_text);
            } else {
                $('#t_startTime').text(data.start_time_text);
            }

            //成交销量
            echarts_show_itemid(data.sale, data.saletime);
            get_show_time(data.check_hour);

            //历史价格&佣金比例
            var Chart_details = echarts.init(document.getElementById('echarts-details'));
            option = {
                title: [
                    {
                        text: '历史价格',
                        top: '3%',
                        left: '20%',
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    {
                        text: '佣金比例',
                        bottom: '39%',
                        left: '20%',
                        textStyle: {
                            fontSize: 14
                        }
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                xAxis: [
                    {
                        gridIndex: 0,
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            formatter: function () {
                                return '';
                            }
                        },
                        data: data.price_date
                    },
                    {
                        gridIndex: 1,
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            formatter: function () {
                                return '';
                            }
                        },
                        data: data.rate_date
                    }
                ],
                yAxis: [
                    {
                        gridIndex: 0,
                        type: 'value',
                        name: '最低/最高价格',
                        nameTextStyle: {
                            color: 'white',
                            backgroundColor: 'rgba(92, 173, 255, 0.8)',
                            padding: [4, 6]
                        },
                        nameGap: 8,
                        axisLabel: {
                            formatter: '{value}'
                        },
                        axisPointer: {
                            snap: true
                        }
                    },
                    {
                        gridIndex: 1,
                        type: 'value',
                        name: '最低/最高比例',
                        nameTextStyle: {
                            color: 'white',
                            backgroundColor: 'rgba(92, 173, 255, 0.8)',
                            padding: [4, 6]
                        },
                        nameGap: 8,
                        axisLabel: {
                            formatter: '{value}'
                        },
                        axisPointer: {
                            snap: true
                        }
                    }
                ],
                grid: [
                    {
                        gridIndex: 0,
                        top: '12%',
                        left: '8%',
                        width: '320px',
                        height: '80px'
                    },
                    {
                        gridIndex: 1,
                        bottom: '6%',
                        left: '8%',
                        width: '320px',
                        height: '80px'
                    }
                ],
                series: [
                    {
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        name: '历史价格',
                        type: 'line',
                        label: {
                            normal: {
                                show: true,
                                position: [5, 5],
                                color: '#000',
                                formatter: '{c}元'
                            }
                        },
                        data: data.history_price,
                        lineStyle: {
                            normal: {
                                color: '#C53E3B'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#C53E3B'
                            }
                        }
                    },
                    {
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        name: '佣金比例',
                        type: 'line',
                        label: {
                            normal: {
                                show: true,
                                position: [5, 5],
                                color: '#000',
                                formatter: '{c}%'
                            }
                        },
                        data: data.history_rate,
                        lineStyle: {
                            normal: {
                                color: '#C53E3B'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#C53E3B'
                            }
                        }
                    }
                ]
            };
            Chart_details.setOption(option);
        }
    });
}

// });

//成交销量
function echarts_show_itemid(sale, saletime) {
    var myChart = echarts.init(document.getElementById('echarts-mail'));
    option = {
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
        data: Object.assign({ 'num_iid': oItemId, 'show_time': show_time },{
            times:URLPrefix.times,
            url_sign:URLPrefix.url_sign,
            member_token:URLPrefix.token,
        }),
        success: function (res) {
            var data = res.data.content;
            //get_show_time(data.check_hour);//时间档处理
            echarts_show_itemid(data.sale, data.saletime);//销量走势展示
        }
    });
});

//处理更多图文的折线图时间档处理
function get_show_time(check_hour) {
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
function onLineLinFun(itemid) {
    autoHeight();
    $.ajax({
        url: '/api/common/goods/api_check_material',
        data: Object.assign({ 'num_iid': itemid },{
            times:URLPrefix.times,
            url_sign:URLPrefix.url_sign,
            member_token:URLPrefix.token,
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
                    copywriting_html = '<div class="fq-copywriting"><img class="fq-copywriting_image" src="${seckill_array[seckill_i].img}" alt=""><div class="copywriting-text">${seckill_array[seckill_i].show_text}</div><span class="copy-text" style="bottom: 8px;" data-tips="<img src='+seckill_array[seckill_i].img+' alt="" style="width: 50px;">${seckill_array[seckill_i].copy_text}">复制文案</span></div>'
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
                friends_circle_text_html = data.material_info.friends_circle_text;
                show_friends_circle_text = data.material_info.show_friends_circle_text;
                copy_friends_circle_text = data.material_info.copy_friends_circle_text;

                if (friends_circle_text_html != '' && friends_circle_text_html != null) {
                    $('.js_friendsCircle').append('<div class="fq-friendsCircle"><div class="friendsCircle-img"><img src="https://img.youdanhui.cn/cms_img/2019-10-24/5db157e0381d3.png" alt="" style="width: 30px;" /></div><div class="friendsCircle-content"><span class="friendsCircle-title">好品生活</span><div class="friendsCircle-text">' + show_friends_circle_text + '</div><span class="copy-text" data-tips="' + copy_friends_circle_text + '">复制文案</span></div></div>');
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
                tao_sign_title = data.item_info.itemshorttitle;
                activityid = data.item_info.activityid;
                chain_itempic = data.item_info.itempic_copy;
                chain_itemprice = data.item_info.itemprice;
                chain_itemendprice = data.item_info.itemendprice;
                chain_itemdesc = data.item_info.itemdesc;

                seller_id = ''; //设置全局变量 seller_id
                //没有多图文只展示转链
                // if (!seckill_array) {
                $('.js_copywriting_box').css('diaplay', 'none');
                $('.material-left .material-active').css('diaplay', 'none');
                $('#online_transfer').addClass('material-active');;
                $('.transfer_content').css('diaplay', 'block')
                host = getLocation()
                $.ajax({
                    url: "/api/common/stat/loginfo",
                    type: 'post',
                    xhrFields: {
                        withCredentials: true
                    },
                    data: Object.assign({},{
                        times:URLPrefix.times,
                        url_sign:URLPrefix.url_sign,
                        member_token:URLPrefix.token,
                    }),
                    success: function (e) {
                        if (e.data.loginState == 1) {
                            seller_id = e.seller_id;
                        }else{
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
    // $('.fq-chain').css('display', 'none');
    $('#js_material_box').empty();
});
// });

// 获取域名
function getLocation() {
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
function copy_fun(even_btn) {
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
function online_modal_chian() {
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
                data: { 'itemid': itemid, 'seller_id': seller_id, 'title': tao_sign_title, 'activityid': activityid},
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
                            href = protocol + '//publish.' + host + '/Personal/setpid.html';
                            skip(href);
                            layer.close(index);
                        });
                    } else if (e.status == 3) {
                        layer.confirm(e.info + '，是否前往设置？', { 'icon': 3, 'title': '' }, function (index) {
                            // window.location.href = "http://publish."+host+"/Personal/setpid.html";
                            // href = 'https://publish.'+host+"/Tbauth/index.html"; //url 是你得到的连接
                            href = protocol + '//publish.' + host + '/Tbauth/index.html';
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
            href = protocol + '//publish.' + host;
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
                data: { 'itemid': itemid, 'seller_id': seller_id, 'activityid': activityid},
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
                            href = protocol + '//publish.' + host + '/Personal/setpid.html';
                            skip(href);
                            layer.close(index);
                        });
                    } else if (e.status == 3) {
                        layer.confirm(e.info + '，是否前往设置？', { 'icon': 3, 'title': '' }, function (index) {
                            // window.location.href = "http://publish."+host+"/Personal/setpid.html";
                            // href = 'https://publish.'+host+"/Tbauth/index.html"; //url 是你得到的连接
                            href = protocol + '//publish.' + host + '/Tbauth/index.html';
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
            href = protocol + '//publish.' + host;
            skip(href);
        }
    });
}

// 定时执行获取图片高度
function autoHeight() {
    var timer = setInterval(takePlace, 50);
    function takePlace() {
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
            };
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
            data: Object.assign({},{
                times:URLPrefix.times,
                url_sign:URLPrefix.url_sign,
                member_token:URLPrefix.token,
            }),
            success: function (e) {
                if (e.data.loginState == 1) {
                    seller_id = e.seller_id;
                }else{
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
function echarts_show_box(sale, saletime) {
    var dataChart = echarts.init(document.getElementById('echarts'));
    // 指定图表的配置项和数据
    option = {
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
function get_show_status(check_hour) {
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
    // $(this).siblings().removeClass('active-time');
    // $(this).addClass('active-time');
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
function level_result(level) {
    if (level == 1) {
        //飘红向上
        result_html = '<i class="iconfont hdk-top icon-color-red"></i>';
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
function skip(url) {
    var el = document.createElement("a");
    document.body.appendChild(el);
    el.href = url; //url 是你得到的连接
    el.target = '_blank'; //指定在新窗口打开
    el.click();
    document.body.removeChild(el);
}
var vmminxdetails = {  //公共方法
    data: {
        oCommon: {
            id: URLPrefix.item_id,
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
                }
            )
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
                if (URLPrefix.token=='') {
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
            if (URLPrefix.token=='') {
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
        activity11:false
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
                        self.ajaxComment(true);
                        self.ajaxhistory();
                        self.ajaxTodaySales();
                        self.ajaxset();  //微信QQ文案模板接口
                        self.ajaxVideo();
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
        ajaxhistory: function () { //历史数据
            var self = this;
            vmAjaxPost("/api/common/goods/history", {
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

