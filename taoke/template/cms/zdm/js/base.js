
// 移入到用户名上
$(".user_info").hover(function () {
    $(this).addClass("show_info");
}, function () {
    $(this).removeClass("show_info");
});

// 移入到更多上
$(".topnav_more").hover(function () {
    $(this).addClass("more_hover");
}, function () {
    $(this).removeClass("more_hover");
});


// 关闭弹窗
function closePop(par) {
    if (par == "hide") {
        $(".ui_popbox").hide();
        $("#ui_layoutbg").hide();
    } else if (par == "remove") {
        $(".ui_popbox").remove();
        $("#ui_layoutbg").remove();
    }

};

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
if (!window.requestAnimationFrame) {
    requestAnimationFrame = function(fn) {
        setTimeout(fn, 17);
    };  
}
// 获取input框里的Value值 name为input对应的值
function getValue(name) {
    return $.trim($(':input[name=' + name + ']').attr("value"));
}

// 设置input框里的Value值 name为input对应的值,value为要设置的值
function setValue(name, value) {
    return $(':input[name = ' + name + ']').attr('value', $.trim(value));
}

// Input框鼠标聚焦提示
$("input.txt_focus,textarea.txt_focus").focus(function () {
    var txt_value = $(this).val();
    var value = $(this).attr("lang");
    $(this).addClass("ftext");
    if (txt_value == value) {
        $(this).val("");
    }
}).blur(function () {
    var txt_value = $(this).val();
    var value = $(this).attr("lang");
    if (txt_value == "") {
        $(this).val(value).removeClass("ftext");
    }
})

// 搜索
function searchKey(_this) {
    var txt_value = $.trim(_this.find($(":input[type=text]")).val());
    var value = _this.find($(":input[type=text]")).attr("lang");
    if ((txt_value == value)||txt_value=="") {
        _this.find($(":input[type=text]")).focus();
        return false;
    }
    var action_url = "/search/?s=" + escape(txt_value);
    _this.attr("action", action_url);
}

/*= 弹窗登录
--------------------------------------------------------------------------------------------------------*/
//检测
// 检测用户名
function CheckUserName(username) {
    if (username == "" || username == "请输入邮箱或手机号") { return "请输入邮箱或手机号"; }
    if (!/^[\.a-zA-Z0-9_-]+@([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,3}$/.test(username) && !/^(\+86)?[1][34578]\d{9}$/.test(username)) {
       
        return "请输入正确邮箱或手机号";
    }
    if (username.length > 50) {
        return "您输入的邮箱地址长度超过50个字符";
    }
    return null;
}

// 检测手机号码
function isMobileNumber(mobileNumber) {
    if (mobileNumber == '') {
        return "手机号码不能为空";
    }
    if (!/^(\+86)?[1][34578]\d{9}$/.test(mobileNumber)) {
        return "请输入正确的手机号码";
    }

    return null;
}

// 检测用户密码
function CheckUserPw(userpw) {
    if (userpw == "") { return "请输入密码"; }
    if (userpw.length < 6 || userpw.length > 32) { return "密码长度为6~32个字符"; }
    return null;
}

// 检测用户昵称
function CheckNickname(nickname) {
    if (nickname == "") { return "请输入您的昵称"; }
    if (nickname.replace(/[^\x00-\xff]/ig, "aa").length > 16) { return "建议昵称长度小于16个字符"; }
    if (/\W/g.test(nickname.replace(/[\u4e00-\u9fa5]/g, ''))) { return "昵称只能包含中文、字母、数字和下划线"; }
    return null;
}
// 检测手机验证码
function isVerifyCode(verifyCode) {
    if (verifyCode == '') {
        return "验证码不能为空";
    }
    if (!/^\d{6}$/.test(verifyCode)) {
        return "请输入手机接收到的6位验证码";
    }
    return null;
}

// 检测邮箱
function CheckEmail(useremail) {
    if (useremail == '') { return "请输入您的邮箱"; }
    if (!/^[\.a-zA-Z0-9_-]+@([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,3}$/.test(useremail) && useremail) {
        return "请输入正确的邮箱格式";
    }
    if (useremail.length > 50) {
        return "您输入的邮箱号码长度超过50个字符";
    }

    return null;
}

//新检测用户昵称
function valNickname($that) {
    var nickname = $that.val();
    if (nickname == ""||nickname == $that.attr('lang')) { return "请输入您的昵称"; }
    if (nickname.replace(/[^\x00-\xff]/ig, "aa").length < 4) { return "昵称长度需要大于4个字符"; }
    if (/\W/g.test(nickname.replace(/[\u4e00-\u9fa5]/g, ''))) { return "昵称只能包含中文、字母、数字和下划线"; }
    return null;
}
//新检测用户昵称
function valTel($that) {
    var tel = $that.val();
    if (tel == ''||tel == $that.attr('lang')) {
        return "请输入您的手机号码";
    }
    if (!/^(\+86)?[1][34578]\d{9}$/.test(tel)) {
        return "请输入正确的手机号码";
    }
    return null;
}
//新检测手机验证码
function valCode($that) {
    var code = $that.val();
    if (code == ""||code == $that.attr('lang')) { return "请输入您的验证码"; }
    if (!/^\d{6}$/.test(code)) {
        return "请输入6位数字验证码";
    }
    return null;
}
// 新检测用户密码
function valPw($that) {
    var pw = $that.val();
    if (pw == '') { return "请输入密码"; }
    if (pw.length < 6 || pw.length > 32) { return "密码长度为6~32个字符"; }
    return null;
}

//验证通用
function validate($that,fun){
    if($that.val() == ''||$that.val() == $that.attr('lang')){
        $that.removeClass('input_error');
        $that.siblings('.info_error').html('');
        return false;
    }
    var $that = $that,
        value = fun($that);
    if(value){
        $that.addClass('input_error');
        $that.siblings('.info_error').html(value);
    }else{
        $that.removeClass('input_error');
        $that.siblings('.info_error').html('');
    }
}
//新的验证码倒计时
function newCd($that){
    var obj = $that;
    obj.addClass("waiting");
    var curtime = 90;
    var down = function () {
        obj.val(curtime + ' 秒后可重发');
        curtime -= 1;
        obj.prop("disabled", true);
        if (curtime < 0) {
            obj.removeClass("waiting");
            obj.val('发送验证码');
            obj.prop("disabled", false);
        }else{
            setTimeout(down, 1000);
        }
    }
    down();
}
// 登录
function login(btn) {
    if (btn.is(".reging")) { return false; }
    var username, password, msg, unmeg, psmeg, data = "";
    username = $.trim($(":input[name=loginname]").val());
    unmeg = $(":input[name=loginname]").parent(".input_con");
//    msg = CheckUserName(username);
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
//    msg = CheckUserPw(password);
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
//			   $('#user_name_warn').html('<strong class="error "></strong><p class="msg_error">'+data.result.map.status_err+'</p>');
			   psmeg.find(".tips_msg_con").text(data.result.map.status_err).end().removeClass("msg_ok").addClass("msg_error");
			   btn.removeClass("reging");
			   btn.val("登录");
		   }
	   });        

//    data = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password) + "&remember=" + $("#ok_keep_pw").attr("checked");
//    $.ajax({
//        type: "POST",
//        url: "/ajax/logcheck",
//        data: data,
//        cache: false,
//        success: function (data) {
//
//            if (data.error) { alert(data.result.remark) }
//
//            if (data.result.type == 1) {
//                //账号设置
//                if(location.href.indexOf('setinfo') > -1){
//                    location.href = location.href;
//                    return false;
//                }
//                var sJumpUrl = $.cookie("landing_page") ? $.cookie("landing_page") : "/";
//                location.href = sJumpUrl;
//            }
//
//            btn.removeClass("reging");
//            btn.val("登录");
//
//            if (data.result.type == 2) {
//                psmeg.find(".tips_msg_con").html(data.result.remark).end().removeClass("msg_ok").addClass("msg_error");
//                return false;
//            }
//
//        }
//    });

    return false;
}

// 全局弹窗登录
function loginShow() {
    // $("#login_pop,#ui_layoutbg").show();

    var _loginHtml = '<div id="login_pop" class="ui_popbox">' +
	        '<a class="popbox_close" href="javascript:;" onclick="return closeLoginPop(\'remove\')" title="关闭">x</a>' +
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
//                            '<a class="forget_pw" href="/my/findpwd1">忘记密码？</a>' +
                        '</div>' +

                        '<div class="item login_btn">' +
                            '<input type="button" value="登录" id="login_btn" onclick="return login($(this))"/>' +
                        '</div>' +

                    '</form>' +

                    '<div class="login_side_con">' +
//                        '<div class="login_other_title">' +
//			                '<i></i>' +
//			                '<span>使用合作账号登录</span>' +
//		                '</div>' +
//                        '<div class="login_other_login cf ">' +
//                            '<ul>' +
//                                '<li><a class="login_qq" href="/unionLog/qq/">QQ</a></li>' +
//                                '<li><a class="login_wb" href="/unionLog/sina/">新浪微博</a></li>' +
//                                '<li><a class="login_wx" href="/unionLog/weixin/">微信登录</a></li>' +
//                            '</ul>' +
//                        '</div>' +
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
//        var msg = CheckUserName(input);
//        if (msg != null) {
//            megBox.find(".tips_msg_con").text(msg).end().removeClass("msg_ok").addClass("msg_error");
//            return;
//        }

//        $.ajax({
//            type: "POST",
//            url: "/ajax/getUserName",
//            cache: false,
//            data: "username=" + encodeURIComponent(input),
//            success: function (data) {
//
//                if (data.error) { alert(data.result.remark) }
//
//                if (data.result.type == 0) {
//                    megBox.find(".tips_msg_con").html("该手机号或邮箱尚未注册，<a href='/reg'>注册></a>").end().removeClass("msg_ok").addClass("msg_error");
//                    return;
//                } else if (data.result.type == 1) {
//                    megBox.removeClass("msg_error").addClass("msg_ok");
//                    megBox.removeClass("sfocus");
//                    return;
//                } else if (data.result.remark) {
//                    megBox.find(".tips_msg_con").html(data.result.remark).end().removeClass("msg_ok").addClass("msg_error");
//                    return;
//                }
//
//            }
//        });

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
    

};

// 兼容旧版的登录有些没改过来的情况
function LoginShow() {loginShow();}

// 关闭登录弹窗
function closeLoginPop(par) {
    if (par == "hide") {
        $(".ui_popbox").hide();
        $("#ui_layoutbg").hide();
    } else if (par == "remove") {
        $("#login_pop").remove();
        $(".login_layoutbg").remove();
    }
};

// 惰性加载图片
function lazyLoading(_images) {
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
};

// par 参数对象｛msg:"内容",type:"1为正确，2为错误，3为警告",point:"加的积分值 0不显示"｝
function shopResult(par) {
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
}

// 领券动态
if ($(".coupon_move_inner li").length > 4) {
    var mtime = null;
    $(function () {
        clearInterval(mtime);
        $(".coupon_move").hover(function () {
            $(".coupon_move_inner").stop(true, true);
            clearInterval(mtime);
        }, function () {
            clearInterval(mtime);
            mtime = setInterval(scrollCoupon, 3000);
        });
        mtime = setInterval(scrollCoupon, 3000);
    });
    
    //滚动方式
    function scrollCoupon() {
        $(".coupon_move_inner").stop(true, true).animate({ top: "-66px" }, 1200, function () {
            $(".coupon_move_inner").css("top", "0px");
            $(".coupon_move_inner li").first().insertAfter($(".coupon_move_inner li").last());
        });
    }
}

// 绑定验证手机
// par 参数对象｛title:"标题",type:"1为绑定手机，2验证手机",phone:"验证的手机号"｝
function verifyPhone(par) {

    this.par = {
        type: 1,
        title: '绑定手机',
        phone: ''
    };
    var optional = $.extend(this.par, par);   
    var btnText, phoneArea;

    if (optional.type == 1) { //绑定
        btnText = "绑定手机";
        phoneArea = '<div class="v_item cf v_phone">'+
                        '<label class="ui_tit" for="v_phone">手机号：</label>'+
                        '<div class="input_con"><input class="txt_focus" id="v_phone" type="text" name="verifyphone" value="请输入您的手机号码" lang="请输入您的手机号码"/></div>'+
                    '</div>';
    } else if (optional.type == 2) { //验证
        btnText = "验证";
        phoneArea = '<div class="v_item cf v_phonenumber">'+
                        '<label class="ui_tit">手机号：</label>'+
                        '<p class="verify_phonenumber">'+optional.phone+'</p>'+
                    '</div>';
    }

    var _vPhoneHtml = '<div id="verify_pop" class="ui_popbox">'+
                        '<a class="popbox_close" href="javascript:;" title="关闭">x</a>'+
                        '<div class="popbox_content verify_pop_cot">'+
                            '<div class="verify_pop_tit cf">'+optional.title+'</div>'+ phoneArea +
                            '<div class="v_item cf v_phone">'+
                                '<label class="ui_tit" for="v_code">短信验证码：</label>'+
                                '<div class="input_con"><input class="txt_focus" id="v_code" type="text" name="verifycode" value="请填写短信验证码" lang="请填写短信验证码"/><a class="get_code_btn" id="get_verifycode" href="javascript:;" disabled="disabled">获取短信验证码</a></div>'+
                            '</div>'+
                            '<div class="v_item cf verify_btn">'+
                                '<input class="txt_focus" id="verify_btn" type="text" value="'+btnText+'" />'+
                                '<p class="success_msg"></p>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div id="ui_layoutbg" class="verify_layoutbg" style="display:block"></div>';

    $('body').append(_vPhoneHtml);

    $(".popbox_close").click(function () {
        $("#verify_pop,#ui_layoutbg").remove();
    });
    //检测手机号
    $(":input[name=verifyphone]").focus(function () {
        var input = $.trim($(this).attr("value"));
        var value = $.trim($(this).attr("lang"));
        var megBox = $(this).parent(".input_con");
        megBox.addClass("sfocus");

    }).blur(function () {
        var input = $.trim($(this).attr("value"));
        var value = $.trim($(this).attr("lang"));
        var megBox = $(this).parent(".input_con");
        megBox.removeClass("sfocus");
        if (input == value) {
            return;
        }
        var msg = isMobileNumber(input);
        var megBox = $(this).parent(".input_con");
        if (msg != null) {
            megBox.removeClass("sfocus");
            $(".verify_btn .success_msg").html(msg).delay(1500).slideUp(800, function () {
                $(this).remove();
            });
            return;
        }
        $.ajax({
            type: "POST",
            url: "/ajax/getUserPhone",
            cache: false,
            data: "phoneNum=" + encodeURIComponent(input),
            success: function (data) {

                if (data.error) { alert(data.result.remark) }

                if (data.result.type == 0) {
                    //megBox.find(".tips_msg_con").html("该手机号或邮箱尚未注册，<a href='/reg'>注册></a>").end().removeClass("msg_ok").addClass("msg_error");
                    return;
                } else if (data.result.type == 1) {
                    $(".verify_btn .success_msg").html("该手机号已被使用").delay(1500).slideUp(800, function () {
                        $(this).remove();
                    });
                    return;
                } else if (data.result.remark) {
                    $(".verify_btn .success_msg").html(data.result.remark).delay(1500).slideUp(800, function () {
                        $(this).remove();
                    });
                    return;
                }

            }
        });

    });

    // 获取短信验证码
    $("#get_verifycode").click(function () {
        if ($(this).is(".reging")) { return false; }
        var phone = $(":input[name=verifyphone]");
        var verify = $(":input[name=verifycode]");
        var value = $.trim(phone.attr("value"));

        var phoneBox = phone.parent(".input_con");
        var verifyBox = verify.parent(".input_con");

        var msg = isMobileNumber(value);

        if (msg != null && optional.type == 1) {
            $(".verify_btn .success_msg").html(msg).delay(1500).slideUp(800, function () {
                $(this).remove();
            });
            return false;
        }
        $(this).addClass("reging");

        var smstype = 2;
        if (optional.type == 2) {
            smstype = 3;
            value = optional.phone;
        }

        $.ajax({
            type: "POST",
            url: "/ajax/smsSend",
            cache: false,
            data: "phoneNum=" + encodeURIComponent(value) + "&flag=" + smstype,
            success: function (data) {
                $(this).removeClass("reging");
                if (data.error) { alert(data.result.remark); return; }

                if (data.result.type == 0) {
                    countDown();
                    verify.focus();
                    return;
                } else if (data.result.type == 9) {
                    $(".verify_btn .success_msg").html("今日短信验证已上限，明天再来吧").delay(1500).slideUp(800, function () {
                        $(this).remove();
                    });
                    return;
                }
                else {
                    alert(data.result.remark);
                    return;
                }
            }
        });

    });

    // 倒数
    var countDown = function () {
        var obj = $(".get_code_btn");
        obj.addClass("waiting");
        var curtime = 90;
        var down = function () {
            obj.html(curtime + ' 秒后可重发');
            curtime -= 1;
            obj.prop("disabled", true);
            if (curtime < 0) {
                obj.removeClass("waiting");
                obj.html('重新发送验证码');
                obj.prop("disabled", false);
            } else {
                setTimeout(down, 1000);
            }
        }
        down();
    };

    // 绑定或验证
    $("#verify_btn").click(function () {
        if ($(this).is(".reging")) { return false; }
        var phone = $(":input[name=verifyphone]");
        var verify = $(":input[name=verifycode]");
        var value = $.trim(phone.attr("value"));

        var phoneBox = phone.parent(".input_con");
        var verifyBox = verify.parent(".input_con");
        // 手机号
        var msg = isMobileNumber(value);
        if (msg != null && optional.type == 1) {
            $(".verify_btn .success_msg").html(msg).delay(1500).slideUp(800, function () {
                $(this).remove();
            });
            return false;
        }

        // 验证码
        var vcode = $.trim($(":input[name=verifycode]").attr("value").toLowerCase());
        msg = isVerifyCode(vcode);
        if (msg != null) {
            $(".verify_btn .success_msg").html(msg).delay(1500).slideUp(800, function () {
                $(this).remove();
            });
            return false;
        }

        $(this).addClass("reging");

        var verify_url = "/ajax/verifyPhoneCode";
        if (optional.type == 2) {
            verify_url = "/ajax/verifyPhone";
            value = optional.phone;
        }

        $.ajax({
            type: "POST",
            url: verify_url,
            cache: false,
            data: "phoneNum=" + encodeURIComponent(value) + "&code=" + encodeURIComponent(vcode),
            success: function (data) {

                if (data.error) { alert(data.result.remark); return; }

                if (data.result.type == 0) { // 成功  
                    shopResult({ msg: btnText + "成功", type: 0 });
                    location.href = location.href;

                    return;
                } else if (data.result.remark) {

                    $(".verify_btn .success_msg").html(data.result.remark).delay(1500).slideUp(800, function () {
                        $(this).remove();
                    });

                    return;
                }

            }
        });


    });



};
// par 参数对象｛title:"标题",type:"1为绑定手机，2验证手机",phone:"验证的手机号"｝
//verifyPhone({ type: 1, title: "为了帐户安全请绑定手机", phone: '1560****2592' });
//verifyPhone({ type: 2, title: "验证帐户", phone: _user.phone });
//verifyPhone({ type: 1, title: "绑定手机", phone: _user.phone });

//移入二维码
$(".qrcode_btn").hover(function () {
    $(this).find(".qrcode_box").show();
}, function () {
    $(this).find(".qrcode_box").hide();
})

// 获取参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|#|$)");
    var r = window.location.search.substr(1).match(reg);

    if (r != null) {
        return unescape(r[2]);
    } else {
        return null;
    }
}


$("#sideshow_btn").click(function () {
    $(".nav_sidebar_cot").addClass("show_info");
    $(".nav_sidebar_show").hide();
    $(".nav_sidebar_hide").show();
});

$(".nav_sidebar_hide").click(function () {
    $(".nav_sidebar_cot").removeClass("show_info");
    $(".nav_sidebar_hide").hide();
    $(".nav_sidebar_show").show();
});

var path = location.pathname.toLowerCase() + location.search;
if (path.indexOf("1111") > 0) {
    $(".nav_sidebar").show();
    $("#sideshow_btn").click();
} else if(path.indexOf('/')>-1) {
    $(".nav_sidebar").show();
}

//过滤表情
function filter(value){
    var regu = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
    if(regu.test(value)){
        return 'error';
    }
}
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
        shopResult({msg:'搜索词不能为空',type:3});
        $searchBox.focus();
        return false;
    }else if(searchKeys.indexOf('http://') > -1||searchKeys.indexOf('https://') > -1){
        shopResult({msg:'不支持链接搜索，请使用关键词或宝贝标题搜索',type:3});
        return false;
        //不支持淘口令
    }else if(searchKeys.indexOf('￥') > -1||filter(inputValue) == 'error'){
        shopResult({msg:'搜索词格式错误',type:3});
        return false;
    }else if(len > 64){
        shopResult({msg:'搜索词过长,请输入少于32个字',type:3});
        return false;
    }
    window.location.href = ''+cms_all_config.base_url+'?action=search&q='+searchKeys;
    return false;
});