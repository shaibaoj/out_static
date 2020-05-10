
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
            let data = res.data.content;
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
            let data = res.data.content;
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
            let data = res.data.content;
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
                    copywriting_html = `<div class="fq-copywriting"><img class="fq-copywriting_image" src="${seckill_array[seckill_i].img}" alt=""><div class="copywriting-text">${seckill_array[seckill_i].show_text}</div><span class="copy-text" style="bottom: 8px;" data-tips="<img src='${seckill_array[seckill_i].img}' alt='' style='width: 50px;'>${seckill_array[seckill_i].copy_text}">复制文案</span></div>`
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
        let data = res.data.content;
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