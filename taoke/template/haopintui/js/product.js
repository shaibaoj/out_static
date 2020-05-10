//  注册一些按钮事件
$(function () {

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
    		HPT.agent_set($this.attr("aid"),$this.attr("uid"),'1');
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
    	HPT.qunfa_product(goods_info['id']);
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
    var transform_copywriting = function (btn_selector, succ_text, async,fanli) {

//        //判断是否多次生成
//        if (has_transform || $('.extensions-response').attr('has-transform')=='1') {
//            layer.alert('已经生成推广文案了，请勿频繁操作。', {
//                btn: ['好的我知道了']
//            });
//            return;
//        }
//
//        //设置标示
//        has_transform = true;

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
                layer.alert("生成推广文案失败：" + json.status_err);
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
            //显示提示出来
            if (json.tkls_free <= 0 && json.tkls <= 0) {
                $('.tkl-free-over').removeClass('hide');
                $('.tkl-surplus').addClass('red');
            }
            
            event_btn.text(succ_text || '文案生成完成');

            $('.tkl-surplus').removeClass('hide');
            layer.alert("文案生成成功。");
            
        };


        var start = function () {

            //加上一个alert就可以无视ajax的阻塞，仍然可以复制文案
            if (async == false)
                alert("生成您的推广文案完成，可以粘贴到QQ群和微信群里了哦！");

//			alert(current_user.get('current_pid'));
//            goods_info['dx']
            var data = {
        		ajax:1,
        		id: goods_info['id'],
        		title: goods_info['title'],
        		pic_url: goods_info['pic_url'],
        		goods_url: goods_info['goods_url'],
        		comment: goods_info['desc'],
        		businessName:goods_info['businessName'],
        		goods_price: goods_info['goods_price'],
        		volume: goods_info['sales'],
        		businessName: goods_info['businessName'],
        		coupon_url: goods_info['coupon_url'],
        		coupon_condition: goods_info['coupon_condition'],
        		coupon_money: goods_info['coupon_money'],
//        		total_count: goods_info['coupon_left'],
        		goods_buy_price: goods_info['goods_buy_price'],
        		agent_id: current_user.get('current_agent_aid')?current_user.get('current_agent_aid'):"",
				user_goods_commission: goods_info['user_goods_commission'],
				user_goods_commission_rate: goods_info['user_goods_commission_rate'],
				fanli: fanli,
//        		dx: $('input[name="dx"]').prop("checked")?"1":"",
            };

            //通过json获取生成的文案
            $.ajax({
                type: "post",
                data: data,
                async: async,//(false同步，true异步）
                url: g_config.ajax_urls.get('transform_copywriting_mall'),
                dataType: "json",
                success: succ_func,
                error: err_func
            });

        };

        //开始
        start();
    };

    $('.transform-copywriting-btn').click(function () {
        transform_copywriting('.transform-copywriting-btn', '普通文案生成完成', true,'0');
    });
    $('.transform-copywriting-btn-fanli').click(function () {
        transform_copywriting('.transform-copywriting-btn-fanli', '返利文案生成完成', true,'1');
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
 
   HPT.agent_list();
});

