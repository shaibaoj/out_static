define([], function() {
	return {
		loginShow:function(){
			var _this = this;
		    var _loginHtml = '<div id="login_pop" class="ui_popbox">' +
			        '<a class="popbox_close" href="javascript:;" title="关闭">x</a>' +
			        '<div class="popbox_content login_pop_cot">' +
		                '<div class="login_pop_tit cf">' +
		                    '<span>立即登录</span>' +
		                    '<a href="'+cms_all_config.base_url+'?action=register">注册帐号</a>' +
		                '</div>' +

		                '<div class="begin_con login_con">' +
		                    '<form method="post" action="" class="login_form">' +
		                        '<div class="item cf r_username">' +
		                            '<label class="ui_tit" for="l_username">帐号：</label>' +
		                            '<div class="input_con">' +
		                                '<input class="txt_focus" id="l_username" type="text" name="loginname" value="请输入帐号" lang="请输入帐号" />' +
		                                '<p class="tips_msg"><i class="tips_msg_icon"></i><span class="tips_msg_con">请输入帐号</span></p>' +
		                                '<span class="reset">×</span>' +
		                            '</div>' +
		                        '</div>' +
		                        '<div class="item cf r_password">' +
		                            '<label class="ui_tit" for="r_password">密码：</label>' +
		                            '<div class="input_con">' +
		                                '<label class="label_password">请输入密码</label>' +
		                                '<input class="txt_focus" id="r_password" type="password" name="loginpassword" />' +
		                                '<span class="tips_ok"></span>' +
		                                '<div class="tips_msg">' +
		                                    '<span class="tips_msg_icon"></span>' +
		                                    '<span class="tips_msg_con"></span>' +
		                                    '<i class="arrow_d"></i>' +
		                                '</div>' +
		                            '</div>' +
		                        '</div>' +

		                        '<div class="item cf keep_wp">' +
		                            '<label class="ui_tit"></label>' +
		                            '<input type="checkbox" id="ok_keep_pw" checked="checked" /><label for="ok_keep_pw">以后自动登录</label>' +
//		                            '<a class="forget_pw" href="/my/findpwd1">忘记密码？</a>' +
		                        '</div>' +

		                        '<div class="item login_btn">' +
		                            '<input type="button" value="登录" id="login_btn" onclick="return login($(this))"/>' +
		                        '</div>' +

		                    '</form>' +

		                    '<div class="login_side_con">' +
//		                        '<div class="login_other_title">' +
//					                '<i></i>' +
//					                '<span>使用合作账号登录</span>' +
//				                '</div>' +
//		                        '<div class="login_other_login cf ">' +
//		                            '<ul>' +
//		                                '<li><a class="login_qq" href="/unionLog/qq/">QQ</a></li>' +
//		                                '<li><a class="login_wb" href="/unionLog/sina/">新浪微博</a></li>' +
//		                                '<li><a class="login_wx" href="/unionLog/weixin/">微信登录</a></li>' +
//		                            '</ul>' +
//		                        '</div>' +
		                    '</div>' +
		                '</div>' +
			        '</div>' +
		        '</div>' +
		        '<div id="ui_layoutbg" class="login_layoutbg" style="display:block"></div>';

		    $('body').append(_loginHtml);

		    //检测登录用户
		    $(":input[name=loginname]").focus(function () {
		        var input = $.trim($(this).attr("value"));
		        var value = $.trim($(this).attr("lang"));
		        var megBox = $(this).parent(".input_con");
		        $(this).next(".tips_data").show();
		        megBox.removeClass("msg_error");
		        megBox.addClass("sfocus");
		        if (input == value) {
		            $(this).val("");
		            megBox.addClass("sfocus");
		        }
		    }).blur(function () {
		        var input = $.trim($(this).attr("value"));
		        var value = $.trim($(this).attr("lang"));
		        var megBox = $(this).parent(".input_con");
		        $(this).next(".tips_data").hide();
//		        var msg = CheckUserName(input);
//		        if (msg != null) {
//		            megBox.find(".tips_msg_con").text(msg).end().removeClass("msg_ok").addClass("msg_error");
//		            return;
//		        }

//		        $.ajax({
//		            type: "POST",
//		            url: "/ajax/getUserName",
//		            cache: false,
//		            data: "username=" + encodeURIComponent(input),
//		            success: function (data) {
		//
//		                if (data.error) { alert(data.result.remark) }
		//
//		                if (data.result.type == 0) {
//		                    megBox.find(".tips_msg_con").html("该手机号或邮箱尚未注册，<a href='/reg'>注册></a>").end().removeClass("msg_ok").addClass("msg_error");
//		                    return;
//		                } else if (data.result.type == 1) {
//		                    megBox.removeClass("msg_error").addClass("msg_ok");
//		                    megBox.removeClass("sfocus");
//		                    return;
//		                } else if (data.result.remark) {
//		                    megBox.find(".tips_msg_con").html(data.result.remark).end().removeClass("msg_ok").addClass("msg_error");
//		                    return;
//		                }
		//
//		            }
//		        });

		    });
		    // 密码框处理
		    $(".label_password").click(function () {
		        console.log(111);
		        $(this).next(":input[type=password]").focus();
		    });
		    // 登录密码框处理
		    $(":input[name=loginpassword]").focus(function () {
		        $(this).prev(".label_password").hide();
		        var input = $(this).attr("value");
		        var megBox = $(this).parent(".input_con");
		        megBox.removeClass("msg_error").removeClass("msg_ok");
		        if (input == "") {
		            megBox.addClass("sfocus");
		        }
		    }).blur(function () {
		        var input = $.trim($(this).attr("value"));
		        var megBox = $(this).parent(".input_con");
		        if (input == "") {
		            $(this).prev(".label_password").show();
		            megBox.removeClass("sfocus");
		            return;
		        }
		    });

		    $(":input[type=submit]").hover(function () {
		        $(this).addClass("btnhover");
		    }, function () {
		        $(this).removeClass("btnhover");
		    });
		    
		    $(".popbox_close").click(function () {
		       _this.closeLoginPop('remove');
		    });

		},
		closeLoginPop:function(par){
			if (par == "hide") {
		        $(".ui_popbox").hide();
		        $("#ui_layoutbg").hide();
		    } else if (par == "remove") {
		        $("#login_pop").remove();
		        $(".login_layoutbg").remove();
		    }
		},
		goTop:function(){
			goTop();
			// 返回顶部区
			function goTop() {
			    var _topHtml1 = '<div id="gotop"><a href="javascript:void(0);"></a></div>';
			    var _topHtml = '<div id="layer_box"><a class="gotop_btn" title="回到顶部" href="javascript:void(0);">回到顶部</a></div>';
			    
			    $(_topHtml).appendTo("body");
			    $(window).scroll(function () {
			        if ($(window).scrollTop() >= 600) {
			            $("#layer_box").fadeIn("slow");
			        } else {
			            $("#layer_box").fadeOut("slow");
			        }
			    });

			    $("#layer_box .gotop_btn").click(function () {
			        gotoTop(4);
			        return false;
			    });

			}
			//平滑返回顶部
			function gotoTop(rate) {
			    var doc = document.body.scrollTop? document.body : document.documentElement;
			    var scrollTop = doc.scrollTop;
			    var top = function () {
			        scrollTop = scrollTop + (0 - scrollTop) / (rate || 2);
			        if (scrollTop < 1) {
			            doc.scrollTop = 0;
			            return false;
			        }
			        doc.scrollTop = scrollTop;
			        stop = requestAnimationFrame(top);    
			    };
			    top();
			};
		},
		lazyLoading:function(_images){
			 $(window).scroll(function () {
		        for (var i = 0; i < _images.length; i++) {
		            var image = _images.eq(i);
		            if (image.attr("data-original") && (image.offset().top < $(window).scrollTop() + $(window).height())) {
		                image.attr("src", image.attr("data-original"));
		                image.removeAttr("data-original");
		                image.removeClass("lazyload");
		            }
		        }
		    });
		},
		shopResult:function(par){
			// par 参数对象｛msg:"内容",type:"1为正确，2为错误，3为警告",point:"加的积分值 0不显示"｝
			this.par = {
		        msg: "操作成功",
		        type: 1,
		        point: 0
		    };
		    var optional = $.extend(this.par, par);

		    $('.shop_result').remove();

		    if (optional.point != 0) {
		        var _html = '<div class="shop_result" style="width:240px;margin-left:-120px;"><div class="shop_result_cot"><i class="result_ico1"></i><span class="result_txt">' + optional.msg + '</span><span class="result_jifen">，积分+' + optional.point + '</span></div><div class="shop_result_bg"></div></div>';
		    } else {
		        var _html = '<div class="shop_result" style="width:200px;margin-left:-100px;"><div class="shop_result_cot"><i class="result_ico' + optional.type + '"></i><span class="result_txt">' + optional.msg + '</span></div><div class="shop_result_bg"></div></div>';
		    }
		    $('body').append(_html);
		    setTimeout(function () { $('.shop_result').remove(); }, 2500);
		},
		search:function(){
			var _this  = this;
			/* 搜券 */
			var $searchBox = $('#search_info'),
			    $serchItems = $('#search_items'),
			    inputValue = '',
			    index = -1; 
			$searchBox.keyup('keyup',function(event){
			    var keyValue = event.which;
			    if(keyValue!=40&&keyValue!=38){  
			        inputValue = $(this).val();  
			    }; 
			    if(filter(inputValue) == 'error'||inputValue.indexOf('￥') > -1){
			        return false;
			    }
			    var temHtml = '';
			    //上下滑动列表
			    if($serchItems.is(':visible')){ 
			        var len = $serchItems.find('li').length;
			        if(keyValue == 40){//向下  
			            if(index >= len){  
			                index = -1;                 
			            }  
			            index++;  
			            $serchItems.find('li').css('background','#fff')  
			            $serchItems.find('li').eq(index).css('background','#fff2f2');  
			            $searchBox.val($serchItems.find('li').eq(index).text());  
			            if(index == len){  
			                $(this).val(inputValue);  
			            }
			            return false; 
			        }else if(keyValue == 38){//向上  
			            if(index < 0){  
			                index = len;  
			                $(this).val(inputValue);  
			            }else if(index == 0){  
			                index = len + 1;  
			                $(this).val(inputValue);  
			            }  
			            index--;  
			            $serchItems.find('li').css('background','#fff');  
			            $serchItems.find('li').eq(index).css('background','#fff2f2');  
			            $searchBox.val($serchItems.find('li').eq(index).text());  
			            if(index == len){  
			                $(this).val(inputValue);  
			            }
			             return false;   
			        } 
			    }
			    //显示五条联想词       
			    $.ajax({
			        url: "https://suggest.taobao.com/sug?code=utf-8&q="+inputValue,
			        type: "get",
			        dataType:"jsonp",
			        success: function (data){
			            var result = data.result,
			                len = result.length;
			            if(result.length == 0){
			                $serchItems.html('');
			                $serchItems.hide();
			                return false;
			            }else{
			                $serchItems.show();
			            }
			            if(len > 8){
			                len = 8;
			            }
			            for(var i = 0;i < len;i++){
			                temHtml += '<li><a href="'+cms_all_config.base_url+'?action=search&q='+result[i][0]+'">'+result[i][0]+'</a></li>';
			            }
			            $serchItems.html(temHtml);
			            $serchItems.show();
			        },
			        error:function(){
			            promptPop('系统繁忙,请重试');
			        }
			    });
			});
			$searchBox.blur(function(){
			    setTimeout(function(){
			        $serchItems.hide();
			    },100);
			});
			//点击搜券按钮
			$('#search_contain').on('submit',function(){
			    searchKeys = $.trim($searchBox.val());
			    //搜索词的过滤
			    var len = searchKeys.replace(/[^\x00-\xff]/g, "**").length;
			    if(searchKeys == $searchBox.attr('lang')||searchKeys == ''){
			    		_this.shopResult({msg:'搜索词不能为空',type:3});
			        $searchBox.focus();
			        return false;
			    }else if(searchKeys.indexOf('http://') > -1||searchKeys.indexOf('https://') > -1){
			    	_this.shopResult({msg:'不支持链接搜索，请使用关键词或宝贝标题搜索',type:3});
			        return false;
			        //不支持淘口令
			    }else if(searchKeys.indexOf('￥') > -1||filter(inputValue) == 'error'){
			    	_this.shopResult({msg:'搜索词格式错误',type:3});
			        return false;
			    }else if(len > 64){
			    	_this.shopResult({msg:'搜索词过长,请输入少于32个字',type:3});
			        return false;
			    }
			    window.location.href = ''+cms_all_config.base_url+'?action=search&q='+searchKeys;
			    return false;
			});
			
			//过滤表情
			function filter(value){
			    var regu = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
			    if(regu.test(value)){
			        return 'error';
			    }
			}
		},
		login:function(btn){
			return login(btn);
			function login(btn) {
			    if (btn.is(".reging")) { return false; }
			    var username, password, msg, unmeg, psmeg, data = "";
			    username = $.trim($(":input[name=loginname]").val());
			    unmeg = $(":input[name=loginname]").parent(".input_con");
//			    msg = CheckUserName(username);
			    btn.addClass("reging");
			    btn.val("登录...");

			    if (msg != null) {
			        unmeg.find(".tips_msg_con").text(msg).end().removeClass("msg_ok").addClass("msg_error");
			        btn.removeClass("reging");
			        btn.val("登录");
			        return false;
			    }
			    password = $(":input[name=loginpassword]").val();
			    psmeg = $(":input[name=loginpassword]").parent(".input_con");
//			    msg = CheckUserPw(password);
			    if (msg == "请输入密码") {
			        $(":input[name=loginpassword]").prev(".label_password").hide();
			        psmeg.find(".tips_msg_con").text(msg).end().removeClass("msg_ok").addClass("msg_error");
			        $(":input[name=loginpassword]").focus();
			        btn.removeClass("reging");
			        btn.val("登录");
			        return false;
			    }
			    
			    $.getJSON(cms_all_config.login_url, {
					   app_id:cms_all_config.app_id,
					   url_sign:cms_all_config.url_sign,
					   time:cms_all_config.time,
					   action:'login',
					   user_name:username,
					   passwd:password,
				   }, function(data){
					   if(data.result.map.status == 1){
						   window.location.href=cms_all_config.base_url;
					   }else{
//						   $('#user_name_warn').html('<strong class="error "></strong><p class="msg_error">'+data.result.map.status_err+'</p>');
						   psmeg.find(".tips_msg_con").text(data.result.map.status_err).end().removeClass("msg_ok").addClass("msg_error");
						   btn.removeClass("reging");
						   btn.val("登录");
					   }
				   });  
			    return false;
			}
		},
		checkin:function(){
			$.getJSON(cms_config.login_url, {
			   app_id:cms_config.app_id,
			   url_sign:cms_config.url_sign,
			   time:cms_config.time,
			   action:'checkin',
			   'base_url':cms_config.base_url,
			   'cms_host':cms_config.cms_host,
			}, function(data){
				if(data!== undefined && data.result!==undefined){
					data = data.result.map; 
				}
				if(data.user_cms_user_checkin&&data.user_cms_user_checkin.id&&data.user_cms_user_checkin.id!=''){
					$(".nosign_box").hide();
					$(".oksign_box").show();
				}
			});
		},
		stat:function(stat_obj){
			$.ajax({
		        url: cms_all_config.yun_cms_url,
		        data: {
		        		app_id:cms_all_config.app_id,
				    url_sign:cms_all_config.url_sign,
				    time:cms_all_config.time,
			        	action:"stat",
			        	ajax:1,
			        	ipage:0,
			        	cms_host:cms_all_config.cms_host,
			        	documentUrl:cms_all_config.base_url,
			        	request_url:cms_all_config.request_url,
		        },
		        type: 'get',
		        dataType: 'jsonp',
		        jsonpCallback: "call",
		        cache:true,
		        success: function (result) {
		            if (result.result.map.count) {
		            		$(stat_obj).html(result.result.map.count);
		            }
		        }
		    });
		}
	};
});