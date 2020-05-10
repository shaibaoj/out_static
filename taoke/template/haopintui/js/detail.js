//  注册一些按钮事件
$(function () {

//    $(".click-pid-btn").click(function () {
//        if (!current_user.is_login()) {
//            location.href = g_config.urls.get('login');
//        }
//        else {
//            if (!current_user.get('current_pid')) {
//                location.href = g_config.urls.get('pid_add');
//            }
//            else {
//                //$('#config-pid-modal').modal();
//                		//弹出对话框
//                layer.open({
//                    type: 1,
//                    shadeClose:true,
//                    title: false,
//                    content: $('#promotion-box'),
//                    end:function () {
//                        //首个是默认PID
//                        var choose_promotion_media_name= $('.promotion-media-choose').text();
//                        var choose_promotion_media_id = $('.promotion-media-choose').attr('promotion-media-id');
//                        var choose_pid = $('.promotion-media-choose').attr('pid');
//                        //遍历所有按钮，找到active
//                        $('.promotion-media-choose').each(function () {
//                            if ($(this).hasClass('active')) {
//                                choose_promotion_media_name= $(this).text();
//                                choose_promotion_media_id = $(this).attr('promotion-media-id');
//                                choose_pid = $(this).attr('pid');
//                            }
//
//                        });
//
//                        //如果当前PID发生变化
//                        if(current_user.get('current_pid') != choose_pid){
//
//                            layer.msg('准备切换PID...',{time:0});
//
//                            $.ajax({
//                                url:g_config.ajax_urls.get('pid_set_default'),
//                                data:{id:choose_promotion_media_id},
//                                dataType:'json',
//                                success:function (data) {
//                                    if(data.status=='success'){
//                                        layer.msg(data.msg+',即将刷新页面');
//                                        location.reload();
//                                    }else{
//                                        layer.alert(data.msg);
//                                    }
//                                },
//                                error:function () {
//                                    layer.alert('服务器繁忙,切换PID失败');
//                                }
//                            });
//
//
//                        }
//
//                        //动态更换PID当前PID参数替换
//                        //current_user.set('current_pid',choose_pid);
//                        //文字替换掉
//                        //$('.config-pid .pid-name').text(choose_promotion_media_name);
//                        //$('.config-pid .pid-text').text(choose_pid);
//
//                    }
//
//
//
//                });
//            }
//
//        }
//
//    });


    //切换PID
    $('.promotion-media-choose').on("click",function () {
    	alert("ok");
        //所有按钮移除active
        $('.promotion-media-choose').each(function () {
            $(this).removeClass('active');
        });
        var chose_btn = $(this);
        //当前按钮激活
        chose_btn.addClass('active');
//        $('.current-pid').html(chose_btn.text() + " 的PID：<br>" + chose_btn.attr('pid'));
    });
    
    $('#promotion-box').on('click', function(e) { 
    	var clickedNode = e.target;
    	var $this = $(clickedNode);
    	if($this.hasClass("promotion-media-choose")){
    		HPT.pid_set($this.attr("promotion-media-id"),$this.attr("pid"),'1');
    	}
    });


    //添加收藏
    $('.add-fav').click(function () {
        $.ajax({
            url: g_config.ajax_urls.get('favorite'),
            type: 'get',
            data: {ajax:1,add:1,id: goods_info['id']},
            dataType: "json",
            success: function (data) {
            	if(data.result.map.status == 1){
					layer.msg(data.result.map.status_err, {icon: 1,time: 1000},function(){});
				}else{
					layer.msg(data.result.map.status_err, {icon: 2,time: 1000});
				}
            },
            error: function () {
                layer.alert('服务器繁忙，加入收藏失败');
            }
        });
    });
    
    $('.add-jiucuo').click(function () {
        layer.alert('正在调试中，暂不可用');
    });
    
    //推送助手
    $('.add-zhushou').click(function () {
    	HPT.qunfa(goods_info['id']);
//    	$.getJSON(URLPrefix.taoke_url+g_config.ajax_urls.get('user_info')
//				, {action:'user',mod:'qunfa',num_iid:num_iid}, function(data){
//			if(data.result.map.status == 1){
//				layer.msg(data.result.map.status_err, {icon: 1,time: 1000},function(){});
//			}else{
//				layer.msg(data.result.map.status_err, {icon: 2,time: 1000});
//			}
//		});
//        $.ajax({
//            url: g_config.ajax_urls.get('add_favorite'),
//            type: 'get',
//            data: {id: goods_info['id']},
//            dataType: "json",
//            success: function (data) {
//                if (data.status == 'success') {
//                    layer.msg(data.msg);
//                }
//                else {
//                    layer.alert(data.msg);
//                }
//            },
//            error: function () {
//                layer.alert('服务器繁忙，加入收藏失败');
//            }
//        });
    });

});


$(function () {
    //申请过佣金计划
    var has_apply_campaign = false;
    $('.apply-campaign-url,.go').click(function () {
        has_apply_campaign = true;
    });

    //生成我的文案 事件
    var has_transform = false;
    var transform_copywriting = function (btn_selector, succ_text, async) {

        //判断是否多次生成
        if (has_transform || $('.extensions-response').attr('has-transform')=='1') {
            layer.alert('已经生成推广文案了，请勿频繁操作。', {
                btn: ['好的我知道了']
            });
            return;
        }

        //设置标示
        has_transform = true;

        var event_btn = $(btn_selector);
        //禁用状态
        event_btn.addClass("disabled");

        var succ_func = function (json) {
        	if(json!== undefined && json.result!==undefined){
        		json = json.result.map; 
			}
            if (json.status == "1") {
                var short_tag = '{二合一短链接}';
                var tkl_tag = '{二合一淘口令}';

                //如果不存在任何标签，则直接更新模板
                if(json.copywriting.indexOf(short_tag)==-1 && json.copywriting.indexOf(tkl_tag)==-1){
                    //更新DOM
                    update_dom_func(json);

                }else{//如果存在短链接和淘口令的标签，则用ajax生成

                    //解析短链接标签，ajax异步获取短链接
                    if(json.copywriting.indexOf(short_tag)>=0){
                        Generater.get_short_url(json.combo_url,goods_info.title,goods_info.pic_url,goods_info.price_original,goods_info.coupon_fee,
                        function (data) {
                            var html = '<a href="'+data.link+'" target="_blank">'+data.link+'</a>';
                            json.copywriting = json.copywriting.replace(new RegExp(short_tag, "g"),html);
                        },function () {
                                json.copywriting = json.copywriting.replace(new RegExp(short_tag, "g"),'-');
                        });
                    }
                    //解析淘口令标签
                    if(json.copywriting.indexOf(tkl_tag)>=0){
                        var shareTkl = $('.extensions-response').attr('tkl');
                        //如果已经提前生成了淘口令，则直接替换
                        if(shareTkl && shareTkl.indexOf('￥')>=0){
                            json.copywriting = json.copywriting.replace(new RegExp(tkl_tag, "g"),shareTkl);
                            //淘口令使用计数
                            $.get(g_config.ajax_urls.get('tkls_use_once'));
                        }
                        else{//否则使用ajax通过服务器生成淘口令
                            Generater.get_tkl(json.combo_url,goods_info.title,goods_info.pic_url,
                            function (data) {
                                json.copywriting = json.copywriting.replace(new RegExp(tkl_tag, "g"),data.tkl);
                            },function () {
                                    json.copywriting = json.copywriting.replace(new RegExp(tkl_tag, "g"),'-');
                                });
                        }

                    }
                    //检测ajax是否完成
                    var startWaitTime = new Date().getTime();
                    var checkAjaxOver = setInterval(function () {

                        //ajax请求全部完成，则结束定时，更新DOM
                        if(json.copywriting.indexOf(short_tag)==-1 && json.copywriting.indexOf(tkl_tag)==-1){
                            clearInterval(checkAjaxOver);
                            //更新DOM
                            update_dom_func(json);
                        }

                        //如果超过8秒
                        var leftTime = (new Date().getTime()) - startWaitTime;
                        if(leftTime>8000){
                            clearInterval(checkAjaxOver);

                            var shortUrl = $('.extensions-response').attr('wb-short-url') ||
                                $('.extensions-response').attr('share-short-url') || '--';
                            //如果模板标签还存在，则替换为--
                            json.copywriting = json.copywriting.replace(new RegExp(short_tag, "g"),shortUrl);
                            json.copywriting = json.copywriting.replace(new RegExp(tkl_tag, "g"),'--');
                            //更新DOM
                            update_dom_func(json);
                        }

                    },500);
                }//end

            }
            else {
                has_transform = false;
                if(json.status_code=='bind_invalid'){
                		layer.open({
                        type: 1,
                        title: '',
                        closeBtn: 1,
                        shade: 0.5,
                        area: ['380px', '280px'],
                        content: $('#ying-attention')
                    });
                }
                else if(json.status_code=='isv.pid-not-correct'){
                		layer.open({
                        type: 1,
                        title: '',
                        closeBtn: 1,
                        shade: 0.5,
                        area: ['380px', '280px'],
                        content: $('#ying-attention-pid')
                    });
                }
                else{                	
                		layer.alert("生成推广文案失败：" + json.status_err);
                }
            }

        };
        var err_func = function () {
            has_transform = false;
            event_btn.removeClass("disabled");
            layer.alert("服务器繁忙，生成推广文案失败，请稍后再试");
        };

        // 更新网页DOM元素
        var update_dom_func = function (json) {
            event_btn.removeClass("disabled");

            $('.copywriting .content').empty().html(json.copywriting);

            var aff_url = g_config.urls.get('affiliate');
//            $('.tkl-surplus-text').html("每日免费淘口令：" + json.tkls_free_per_day + "条，" +
//                "剩余" + json.tkls_free +
//                "条。淘口令不限期余额：" + json.tkls + "条" +
//                "&nbsp;&nbsp;&nbsp;<a href='" + aff_url + "' target='_blank'>点此免费获取更多淘口令</a>");
//            //如果有活动的淘口令
//            if(json.tkls_free_per_day>200){
//                $('.tkl-surplus-text').append("<br>恭喜你，今日赢得额外100条淘口令，使用好品推佣金助手过程中每天随机参与淘口令抽奖（中奖率99%）。")
//            }
            //显示提示出来
            if (json.tkls_free <= 0 && json.tkls <= 0) {
                $('.tkl-free-over').removeClass('hide');
                $('.tkl-surplus').addClass('red');
            }
            
            event_btn.text(succ_text || '文案生成完成');

            $('.tkl-surplus').removeClass('hide');

            var message = "";

            //判断是否登录
            if (!current_user.get('is_login')) {
                message += '<br><br>提示：您还未设置淘宝联盟PID，将不会得到佣金。<br>请记得注册并登录好品推后，设置淘宝联盟PID哟。';
            }//判断PID
            else if (!current_user.get('current_pid')) {
                message += '<br><br>提示：您还未设置淘宝联盟PID，将不会得到佣金。';
            }
            else {
                //在插件中查看过佣金，不提示
                if($('.extensions-response').length>0 && $('.extensions-response').attr('has-show-campagin')=='1'){
                    has_apply_campaign = true;
                }

                //忘记申请高佣计划的提示文字
                if (!$('.campaign-1').hasClass('hide') && $(".apply-campaign-url").length > 0 && !has_apply_campaign) {
                    var tk_rate = $('.tk-rate-val').text();
//                    message += '<br><br>这个商品是定向计划，要拿到 ' + tk_rate + '% 的高佣金，别忘了申请高佣计划哦！';
                }

                //淘口令用完的提示文字
                if (json.tkls_free <= 0 && json.tkls <= 0) {

                    message += '<br><br>提示：淘口令每日免费' + json.tkls_free_per_day + '条，' +
                        '<br>您的今日的淘口令次数已经用完，文案中将没有淘口令。<br>' +
                        '如需使用更多淘口令，请进入后台，加入激励活动免费获得淘口令 或 购买淘口令兑换码。';
                }

            }
            //弹出提示
            if (message != "") {
                layer.alert("文案生成成功。" + message);
            }
        };


        var start = function () {

            //加上一个alert就可以无视ajax的阻塞，仍然可以复制文案
            if (async == false)
                alert("生成您的推广文案完成，可以粘贴到QQ群和微信群里了哦！");

//			alert(current_user.get('current_pid'));
//            goods_info['dx']
            var data = {
	        		ajax:1,
	        		num_iid: goods_info['id'],
	        		title: goods_info['title'],
	        		pic_url: goods_info['pic_url'],
	        		comment: goods_info['comment'],
	        		user_type:goods_info['user_type'],
	        		goods_price: goods_info['price_discount'],
	        		volume: goods_info['sales'],
	        		coupon_url: goods_info['coupon_url'],
	        		coupon_condition: goods_info['coupon_start_fee'],
	        		coupon_money: goods_info['coupon_fee'],
	        		total_count: goods_info['coupon_left'],
	        		applied_count: goods_info['applied_count'],
	        		pid: current_user.get('current_pid')?current_user.get('current_pid'):"",
	        		activity_id: goods_info['activity_id'],
	        		user_num_id: goods_info['seller_id'],
	        		dx: $('input[name="dx"]').prop("checked")?"1":""
            };

            //如果ID为-1，这就是插件临时显示的商品信息，把商品参数传过去
//            if (parseInt(goods_info['id']) == -1) {
//                //把商品参数传过去
//                for (var k in goods_info) {
//                    data[k] = goods_info[k]
//                }
//            }

            //console.log(data);

            //通过json获取生成的文案
            $.ajax({
                type: "post",
                data: data,
                async: async,//(false同步，true异步）
                url: g_config.ajax_urls.get('transform_copywriting'),
                dataType: "json",
                success: succ_func,
                error: err_func
            });

        };

        //开始
        start();
    };

    $('.transform-copywriting-btn').click(function () {
        transform_copywriting('.transform-copywriting-btn', '文案生成完成', true);
    });

    //复制图文到剪切板
    $(function () {
        var clipboard = new Clipboard('.copy-copywriting-btn', {
            target: function () {
//                if (!has_transform && $('.transform-copywriting-btn').length>0) {
//                    transform_copywriting('.copy-copywriting-btn', '生成完成,点击这里复制', false);
//                    /*
//                    layer.tips('请先点这生成自己的文案！', '.transform-copywriting-btn', {
//                        tips: [1, '#f95c68'] //还可配置颜色
//                    });
//                    */
//                    return false;
//                }

                return document.querySelector('.copywriting .content');

            }
        });
        clipboard.on('success', function () {
            if (!current_user.get('current_pid')) {
                layer.alert('复制成功！。', {
                    btn: ['好的我知道了']
                });
            }
            else {
                layer.tips('复制成功', '.copy-copywriting-btn', {
                    tips: [1, '#f95c68'] //还可配置颜色
                });
            }
        });
        clipboard.on('error', function () {
            var tipsText = '复制失败, 请尝试升级您的浏览器 或 手动选取文案复制';

            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/iphone/i) == "iphone" || ua.match(/ipad/i) == "ipad") {
                tipsText = '复制失败,<br>手机浏览器请用手指长按上方文案 > 拷贝';
            }else if (ua.match(/android/i) == "android") {
                tipsText = '复制失败,<br>手机浏览器请用手指长按上方文案 > 全选 >复制';
            }

            layer.tips(tipsText, '.copy-copywriting-btn', {
                tips: [1, '#f95c68'] //还可配置颜色
            });
        });
    });

});


//检测商品优惠信息是否有效
$(function () {
    var data = {
        coupon_url: goods_info['coupon_url'],
        goods_id: goods_info['id'],
        item_id: goods_info['item_id']
    };

    var succ_func = function (data) {
        if (data.status == 'success') {

            //提示被抢完
            if (data.coupon_effective == 0) {

                layer.alert('该商品的这张优惠券已经被抢完了！');
            }
            else if (data.item_effective == 0) {
                layer.alert('该商品的已经下架了哦！');
            }
            else if (data.campaign_effective == 0) {
                layer.alert('该商品的高佣金活动已经下架了哦！');
            }

            //更新数量
            if(data.coupon_surplus && data.coupon_surplus>0){
                $('.coupon-surplus').text(data.coupon_surplus);
            }

            //更新券后价
            if(data.price_discount && data.price_discount>0)
            {
                $('.price-discount-val').text(data.price_discount);
            }

            //佣金变化
            if (data.tk_rate_changed == 1 && data.tk_rate) {
                $('.tk-rate-val').text(data.tk_rate);
            }
            //计划类型变化
            if (data.campaign_type_changed == 1) {
                //隐藏所有
                $('.campaign').each(function () {
                    $(this).addClass('hide');
                });
                //显示出来
                $('.campaign-' + data.campaign_type).removeClass('hide');
            }
            //修改申请计划链接
            if (data.campaign_id_changed == 1 && data.apply_campaign_url) {
                $('.apply-campaign-url').attr('href', data.apply_campaign_url);
            }


        }

    };

    //自己的商品库才检测
    if (parseInt(goods_info['id']) > 0) {
//        $.ajax({
//            url: g_config.ajax_urls.get('check_goods'),
//            type: 'post',
//            data: data,
//            dataType: 'json',
//            success: succ_func
//        });
    }

});


//容错检查
$(function () {
    //申请高佣计划链接检测
    var campaign = $('.apply-campaign-url');
    if (campaign.length > 0) {
        var campaign_url = campaign.attr('href');
        //如果有http，但是开头有其他字符，则正则匹配出来
        if (campaign_url.indexOf('http') >= 0 && campaign_url[0] != 'h') {
            var reg = /(http|ftp|https):\/\/([\.\w\-_]+)([\w\-\.,@?^=%&amp;:/~\+!#]*)?/;
            var m = reg.exec(campaign_url);
            campaign.attr('href', m[0])//0存的是整个匹配结果，1,2,3,等存的是（）里面的子表达式结果
        }
    }
});



$(function () {
    //事件监听,实现iphone直接全选文案
    //------------------------------------------
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/iphone/i) == "iphone" || ua.match(/ipad/i) == "ipad" || ua.match(/android/i) == "android") {
        document.addEventListener("selectionchange", function (e) {
            if (window.getSelection().anchorNode.parentNode.id == 'copywriting-content' && document.getElementById('copywriting-content').innerText != window.getSelection()) {
                var key = document.getElementById('copywriting-content');
                window.getSelection().selectAllChildren(key);
            }

        }, false);
    }
});


$(function() {
   $('.add-pid').click(function () {
	   $.getJSON(URLPrefix.taoke_url+g_config.ajax_urls.get('pid_action'), {
		   Sub:1,
		   name:$('#pid_name').val(),
		   pid:$('#pid_id').val(),
	   }, function(data){
		   if(data.result.map.status == 1){
			   layer.msg(data.result.map.status_err, {icon: 1,time: 500},function(){
				   $('#pid_name').val('');
				   $('#pid_id').val('');
				   HPT.pid_list();
			   });
		   }else{
//			   layer.msg(data.result.map.status_err, {icon: 2});
			   layer.alert(data.result.map.status_err);
		   }
	   });        
    });
   HPT.pid_list();
});

