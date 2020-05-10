
$(function () {

    $(".copyBtn").on('click',function(o) {
        $this = $(this);
        const clipboardBtn = new ClipboardJS('.copyBtn',{
            target: function(trigger) {
                switch ($(trigger).attr('data-type')) {
                    case 'QQ':
                        $copyContentDom = $('.QQ-template');
                        break;
                    case 'wechat':
                        $copyContentDom = $('.wechat-template');
                        break;
                    default:
                        $copyContentDom = $('.choose-model');
                }
                $copyContentDom.find('.promote-content-right p').attr('contenteditable',false);
                return $copyContentDom.find('.promote-muban')[0];
            }
        });

        clipboardBtn.on('success', (e) => {
            e.clearSelection();
            clipboardBtn.destroy();
            layer.msg('复制成功', {time: 2000});
        });
        clipboardBtn.on('error', function(e) {
            // console.log(e);
        });
    })

    $.post(URLPrefix.api_url+'/api/common/goods/viewDetail', {
        num_iid:goods_info['item_id'],
        times:URLPrefix.times,
        url_sign:URLPrefix.url_sign,
        member_token:URLPrefix.token,
    }, function(res){
        if(res.data.content){
            $(".choose-model").find(".promote-content-right").find("p").html(res.data.content);
        }
    })

    $(".buildBtn").on('click',function(o) {
        $this = $(this);
        var $p = $this.parent('.setup-promote').find('.setup-promote-box p');
        if ($p.length <= 0) {
            layer.confirm('请先设置推广位', {
                btn: ['确认'] 
            }, function(){
                
            });
            return false;
        }
        var pid = $p.attr('data-pid');
        $.post(URLPrefix.api_url+'/api/common/goods/transform', {
            num_iid:goods_info['item_id'],
            activity_id:goods_info['activity_id'],
            d_title:goods_info['d_title'],
            title:goods_info['title'],
            comment:goods_info['desc'],
            pic_url:goods_info['pic_url'],
            pid:pid,
            template_type:$this.data('type'),
            times:URLPrefix.times,
            url_sign:URLPrefix.url_sign,
            member_token:URLPrefix.token,
        }, function(res){
            if(res.info.status==0){
                if(res.data.content){
                    $this.closest(".promote-content").find(".promote-content-right").find("p").html(res.data.content);
                    $this.closest(".promote-content").find(".promote-content-left").find("img").attr("src",res.data.pic_url);
    
                    $this.prev(".copyBtn").show();
                    $this.hide();
                    layer.msg('文案生成成功', {time: 2000});
                }
            }
        })    
    })

    queryPids();
    function queryPids(){
        $(".setup-promote-box").html('');
        $("tbody",$('.table-pid')).html('');
        $.ajax({
            url: '/api/user/user/pid/list',
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
                        $(".setup-promote-box").show();
                        if(data.data.item){
                            html = html+'<p data-pid="'+data.data.item.pid+'" data-build="">'+data.data.item.pid_name+' | '+data.data.item.pid+'<i class="imageicon selected-down-icon"></i></p>';
                        }
                        html = html+'<ul>';
                        $.each(data.data.items, function(i,item){

                            html = html+'<li data-pid="'+item.pid+'" data-name="'+item.pid_name+'">'+item.pid_name+'</li>';

                            tableHtml = tableHtml +'<tr><td>'+item.pid_name+'</td><td>'+item.pid+'</td><td><a data-id="'+item.user_pid_id+'" class="btn btn-outline-secondary btn-sm btn-del-pid">删除</a></td></tr>';
                        });
                        html = html+'</ul>';
                        $(".setup-promote-box").html(html);
                        $("tbody",$('.table-pid')).html(tableHtml);
                    }else{
                        // $(".setup-promote-box").hide();
                    }
                }
                // else{
                //     layer.msg(data.info.status_err, {
                //         icon: 2
                //     });
                // }
            }
        });
    }

    $(".add_pid").click(function (e) {
        $this = $(this);
        $this.attr('disabled', 'disabled');
        $this.text('添加中...');
        var pid_name = $('#pid_name').val();
        var pid_pid = $('#pid_pid').val();

        if (pid_pid != '0' && pid_pid != '' && pid_pid != null) {
            $.ajax({
                url: '/api/user/user/pid/update',
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

    $(".setup-promote-box").click(function (event) {
        var $this = $(this);
        var $target = $(event.target);
        if( $target.is("li") ) {
            var user_pid = $target.data("pid");
            var user_name = $target.data("name");
            $("p",$this).html(user_name+' | '+user_pid+'<i class="imageicon selected-down-icon"></i>');
            $("p",$this).attr("data-pid",user_pid);
        }
    });

    $(".table-pid").click(function (event) {
        var $this = $(this);
        var $target = $(event.target);
        if( $target.is(".btn-del-pid") ) {
            var user_pid_id = $target.data("id");
            if (user_pid_id != '0' && user_pid_id != '' && user_pid_id != null) {
                $.ajax({
                    url: '/api/user/user/pid/delete',
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

    $(".choose-model-tit").click(function (event) {
        var $this = $(this);
        var $target = $(event.target);
        if( $target.is("p") ) {
            $("p",this).removeClass("choose-model-active");
            $target.addClass("choose-model-active");
            var type = $target.data("type");
            $(".promote-box").hide();
            if(type==1){
                $(".QQ-template,.wechat-template").show();
            }else{
                $(".choose-model").show();
            }            
        }
    });

    $("#qrcode_btn").on('click',function(o) {
        $this = $(this);
        var $p = $this.parent('.setup-promote').find('.setup-promote-box p');
        if ($p.length <= 0) {
            layer.confirm('请先设置推广位', {
                btn: ['确认'] 
            }, function(){
                
            });
            return false;
        }
        var pid = $p.attr('data-pid');
        $.post(URLPrefix.api_url+'/api/common/goods/transform', {
            num_iid:goods_info['item_id'],
            activity_id:goods_info['activity_id'],
            d_title:goods_info['d_title'],
            title:goods_info['title'],
            comment:goods_info['desc'],
            pic_url:goods_info['pic_url'],
            pid:pid,
            template_type:'weixin',
            times:URLPrefix.times,
            url_sign:URLPrefix.url_sign,
            member_token:URLPrefix.token,
        }, function(res){
            if(res.data.content){

                var img = new Image();
                img.src = goods_info['pic_url'];
                img.onload = function(){
                    var goods_title = res.data.goods.goods.d_title?res.data.goods.goods.d_title:res.data.goods.goods.title;
                    var type = res.data.goods.user_type == 'B' ? "tianmao" : "taobao";
                    var kouling=res.data.goods.click.tao_token.replace(new RegExp("￥",("gm")),"");
                    var qcode_url = 'https://fdhdrhjy34265.kuaizhan.com/?word='+kouling+'&image='+goods_info['pic_url']+'&kl=(zSVb30Krk)';
                    $('.qrcode-box .qrleft-bottom div img').attr('src','//code.youdanhui.com/?w=5&url='+encodeURIComponent(qcode_url));
                    $('.qrcode-box .qr-left-img').attr('src', goods_info['pic_url']);
                    $('.qrcode-box .qrleft-top p').html('<i class="imageicon '+ type  +'"></i>' + goods_title);
                    $('.qrcode-box .qrleft-top li').eq(0).find('span').text(res.data.goods.price.buy_price);
                    $('.qrcode-box .qrleft-top li').eq(1).find('span').text(res.data.goods.price.price);
                    $('.qrcode-box .qrleft-top li').eq(2).find('span').text(res.data.goods.price.volume);
                    $('.qrcode-box .qrleft-top li').eq(3).find('span em').text(parseInt(res.data.goods.coupon.coupon_money));
                    $('.qrcode-box .qrleft-bottom p span').eq(1).text(res.data.goods.goods.comment);
    
                    $(".copy-qrleft").html('');
                    $(".copy-qrleft").append($('.qr-left').clone());
    
                    domtoimage.toJpeg($(".copy-qrleft .qr-left")[0], { bgcolor: '#fff',quality: 0.9}).then(function (base64) {
                        base64 = base64.replace('data:image/jpeg;base64,','');
                        $.post(URLPrefix.api_url+'/api/uploadify/uploadImg', {
                            base64: base64,
                            times:URLPrefix.times,
                            url_sign:URLPrefix.url_sign,
                            member_token:URLPrefix.token,
                        }, function(res){
                            if(res.data.item.img){
                                $('.qrcode-build-img img').attr('src', res.data.item.img);
                                $('.qr-right a').attr('href', res.data.item.img);
                                $('#quanModalLong').modal('toggle');
                            }
                        })
                    });
                }
                img.onerror = function() {
                    layer.msg('图片加载失败，请稍后重试', {time: 2000});
                }

            }
        })    
    })

    $(".copyimg-btn").on('click',function(o) {
        $this = $(this);
        const clipboardBtn = new ClipboardJS('.copyimg-btn',{
            target: function(trigger) {
                // return $(".qr-left",$("#qrcode-box"))[0];
                return $('.qrcode-build-img')[0];
            }
        });

        clipboardBtn.on('success', (e) => {
            e.clearSelection();
            clipboardBtn.destroy();
            layer.msg('复制成功', {time: 2000});
        });
        clipboardBtn.on('error', function(e) {
            // console.log(e);
        });
    })

    //点击主图选择
    $("ul li",$(".choose-mainimg")).on('click', function() {
        $this = $(this);
        if (!$this.hasClass('selected-active')) {
            $("ul li",$(".choose-mainimg")).removeClass('selected-active');
            $this.addClass('selected-active');

            var src = $.trim($this.children('.small-goodsimg').children('img').attr('data-src'));
            goods_info['pic_url'] = src;
            templateAll();
        }
    });

    //点击文案选择
    $(".changeIntro li").on('click', function() {
        $this = $(this);
        if (!$this.hasClass('choose-copy-active')) {
            $('.changeIntro li').removeClass('choose-copy-active');
            $this.addClass('choose-copy-active');

            var text = $.trim($this.children('span').text());
            console.log(text);
            goods_info['desc'] = text;
            templateAll();
        }
    });

    function templateAll() {
        template(goods_info['qqTemplate'], '.QQ-template');
        template(goods_info['wechatTemplate'], '.wechat-template');
        template(goods_info['template'], '.choose-model');
    }

    function template(desc, dom) {
        // var short_link = dom === '.QQ-template' && dom !== '.choose-model' ? goodsInfo.QQ_short_link : goodsInfo.wechat_short_link;
        // var taokouling = dom === '.QQ-template' && dom !== '.choose-model' ? goodsInfo.QQ_taokouling : goodsInfo.wechat_taokouling;
        // var text = desc.replace(/\{标题\}/g, goodsInfo.goods_short_title);
        // text = text.replace(/\{券后价\}/g, parseFloat(goodsInfo.last_price));
        // text = text.replace(/\{商品价格\}/g, parseFloat(goodsInfo.goods_price));
        // text = text.replace(/\{导购文案\}/g, goodsInfo.goods_intro);
        // text = text.replace(/\{月销量\}/g, goodsInfo.goods_sale_num);
        // text = text.replace(/\{优惠券面额\}/g, goodsInfo.coupon_amount);
        // if(short_link === '{短链接}'){
        //     text = text.replace(/\{短链接\}/g, '<a>' + short_link + '</a>');
        // }else{
        //     text = text.replace(/\{短链接\}/g, '<a href="'+short_link+'" target="_blank">' + short_link + '</a>');
        // }
        // text = text.replace(/\{淘口令\}/g, '<a>' + taokouling + '</a>');
        // text = text.replace(/\n/g, '<br/>');
        // text = text.replace(/\{图片\}/g, '');
        // text = text.replace(/\{下单地址\}/g, '<a href="'+goodsInfo.goods_link+'" target="_blank">' + goodsInfo.goods_link + '</a>');

        // var coupon_url = "https://uland.taobao.com/quan/detail?sellerId="+goodsInfo.seller_id+"&activityId="+goodsInfo.coupon_id;

        // text = text.replace(/\{优惠券地址\}/g, '<a target="_blank" href="'+coupon_url+'">'+coupon_url+'</a>');
        // $(dom).find('.promote-content-right p').html(text);
        // $(dom).find('.promote-content-right p br:first-child').remove();
        $(dom).find('.promote-content-left img').attr('src', goods_info['pic_url']);
    }

});