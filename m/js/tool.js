//手机正则表达式
function RegExpPhone(val){
	return /^1[34578]\d{9}$/.test(val) ? true : false;
};
//验证密码
function RegExpPassword(val) {
    return /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,16}$/.test(val) ? true : false;
};

//广告
$(window).load(function(){
    if($("#js-adBox").length){
        var h=$("#js-adBox").height()+44;
        $("#banner").css({"margin-top":h});
        $("#js-login-box").css({"margin-top":h});
        $("#js-register-box").css({"margin-top":h});
        $("#js-sign-in-box").css({"margin-top":h});
        $("#js-forget-password-box").css({"margin-top":h});
        $("#js-new-password-box").css({"margin-top":h});
        $("#js-reset-password-box").css({"margin-top":h});
        $("#js-advance-notice").css({"margin-top":h});
        $("#js-activity").css({"margin-top":h});
        $("#js-adBox").find(".i-close").on("click",function(){
            $("#header-box").animate({top:-$("#js-adBox").height()});
            $("#banner").css({"margin-top":44});
            $("#js-login-box").css({"margin-top":44});
            $("#js-register-box").css({"margin-top":44});
            $("#js-sign-in-box").css({"margin-top":44});
            $("#js-forget-password-box").css({"margin-top":44});
            $("#js-new-password-box").css({"margin-top":44});
            $("#js-reset-password-box").css({"margin-top":44});
            $("#js-advance-notice").css({"margin-top":44});
            $("#js-activity").css({"margin-top":44});
            if($(".js-nav-position").length){ // 计算nav定位的铜牌值
                $(".js-nav-position").css({"top":44});
            }
        });
    }else{

        $("#banner").css({"margin-top":44});
        $("#js-login-box").css({"margin-top":44});
        $("#js-register-box").css({"margin-top":44});
        $("#js-sign-in-box").css({"margin-top":44});
        $("#js-forget-password-box").css({"margin-top":44});
        $("#js-new-password-box").css({"margin-top":44});
        $("#js-reset-password-box").css({"margin-top":44});
        $("#js-advance-notice").css({"margin-top":44});
        $("#js-activity").css({"margin-top":44});
    }
//    $("#js-category").on('click',function(){
//        $("#js-category-list").slideToggle();
//    });
    is_show_type()
});

//判断设备类型
function is_show_type(){
    var objd= $("#product-box"),objb = $("#banner");
    if(objd.attr("data-b_type")=="app"){
        objb.css("marginTop",0);
    }else{

    }
}
//登录
if($("#js-login-box").length>0){
    // 失去光标的时候验证
    (function() {
    	var $name = $("#name"),
    		$password = $("#password");

    	$name.on("blur",function(){
    		if($name.val()!="" && !RegExpPhone($name.val())){
    			$name.nextAll(".error-tip")
                    .html("您输入的手机号码有误")
                    .parent().addClass("error")
                    .focus();
                return false;
    		} else {
                $name.parent().removeClass("error");
    		}
    	});

    	$password.on("blur", function(){
    		if($password.val()!="" && !RegExpPassword($password.val()) ){
                $password.nextAll(".error-tip")
                    .html("您设置的密码格式不对")
                    .parent().addClass("error")
                    .focus();
                return false;
            } else {
                $password.parent().removeClass("error");
	    	};
    	});
    })();

    // "登入"时验证
    function verifyloginFrom(){
    	var $name = $("#name"),
    		$password = $("#password");

    	if(!$name.val()){
			$name.nextAll(".error-tip")
                .html("账号不能为空")
                .parent().addClass("error")
                .focus();
            return false;
		} else if(!RegExpPhone($name.val())){
            $name.nextAll(".error-tip")
                .html("您输入的手机号码有误")
                .parent().addClass("error")
                .focus();
            return false;
        };

    	if(!$password.val() && !RegExpPassword($password.val()) ){
            $password.nextAll(".error-tip")
                .html("您设置的密码格式不对")
                .parent().addClass("error")
                .focus();
            return false;
        };

    	return true
    };

    $("#submit-login").on("click", function(){
        var referurl = $('.form-box').attr('data-referurl');
    	if(verifyloginFrom()){
            var username = $.trim($('input[name=username]').val()),password = $.trim($('input[name=password]').val()),remember = $('input[name=remember]').attr('checked') == 'checked' ? 1 : 0;
            $.ajax({
                url:'/?r=mob/user/loginin',
                data:{username:username,password:password,remember:remember},
                type:"GET",
                dataType:'json',
                success:function(ret) {
                  if(ret.state=='ok'){
                      location.href = referurl;
                  }else{
                      alert(ret.message);
                  }
                }
            })

    	}
    });
};

//注册
if($("#js-register-box").length>0){
    // 失去光标的时候验证
    (function(){
        var $userName = $("#user-name"),
            $pass = $("#pass"),
            $confirmPass = $("#confirm-pass"),
            $verifyCode = $("#validcode"),
            $getPhoneCode = $("#get-phone-code"),
            $userAgreement = $("#user-agreement");

        $userName.on("blur",function(){
            if($userName.val()!="" && !RegExpPhone($userName.val())){
                $userName.nextAll(".error-tip")
                    .html("您输入的手机号码有误")
                    .parent().addClass("error")
                    .focus();
                return false;
            } else {
                $userName.parent().removeClass("error");
            }
        });

        $pass.on("blur", function(){
            if($pass.val()!="" && !RegExpPassword($pass.val()) ){
                $pass.nextAll(".error-tip")
                    .html("密码可以包含字母、数字、特俗符。长6-16位")
                    .parent().addClass("error")
                    .focus();
                return false;
            } else {
                $pass.parent().removeClass("error");
            };
        });

        $confirmPass.on("blur", function(){
            if( !$confirmPass.val() && $confirmPass.val() !== $pass.val()){
                $confirmPass.nextAll(".error-tip")
                    .html("两次密码输入不同")
                    .parent().addClass("error")
                    .focus();
                return false;
            } else {
                $confirmPass.parent().removeClass("error");
            };
        });

        $verifyCode.on("blur", function(){
            if($verifyCode.val()){
                $("#js-phone-box").removeClass("hide");
                $(this).parents(".form-group").removeClass("m-bottom-10");
            } else {
                $("#js-phone-box").addClass("hide");
                $(this).parents(".form-group").addClass("m-bottom-10");
            }
        });

        $getPhoneCode.on("click", function(){

            var timer = 59;
            var countdown = setInterval(CountDown, 1000);

            $getPhoneCode.html("重新发送(60s)");
            $getPhoneCode.attr("disabled", true).addClass("btn-disabled");
            function CountDown() {
                $getPhoneCode.html("重新发送(" + timer + "s)");
                if (timer == 0) {
                    $getPhoneCode.html("免费获取验证码").removeAttr("disabled").removeClass("btn-disabled");
                    clearInterval(countdown);
                }
                timer--;
            };
            var mobile = $("#user-name").val();
            $.ajax({
                url:'/?r=mob/user/sendcode',
                data:{mobile:mobile,type:3},
                type:"GET",
                dataType:'json',
                success:function(ret) {
                    if(ret.state=='ok'){
                        alert(ret.message);
                    }
                }
            })
        });

        $userAgreement.on("change",function(){
            if($userAgreement.prop("checked") == true){
                $(this).nextAll("svg").show();
            } else {
                $(this).nextAll("svg").hide();
            }
        });


    })();

    //提交时验证
    function verifyRegisterForm(){
        var $userName = $("#user-name"),
            $pass = $("#pass"),
            $confirmPass = $("#confirm-pass"),
            $verifyCode = $("#validcode"),
            $phoneCode = $("#phone-code"),
            $userAgreement = $("#user-agreement");

        if(!$userName.val()){
            $userName.nextAll(".error-tip")
                .html("请输入手机号")
                .parent().addClass("error")
                .focus();
            return false;
        };

        if(!$pass.val()){
            $pass.nextAll(".error-tip")
                .html("密码不能为空")
                .parent().addClass("error")
                .focus();
            return false;
        };

        if(!$confirmPass.val()){
            $confirmPass.nextAll(".error-tip")
                .html("请重复输入密码")
                .parent().addClass("error")
                .focus();
            return false;
        };

        if(!$verifyCode.val()){
            $verifyCode.parent().parent().nextAll(".error-tip")
                .html("请输入验证码")
                .parent().addClass("error")
                .focus();
            return false;
        };

        if(!$phoneCode.val()){
            $phoneCode.parent().parent().nextAll(".error-tip")
                .html("请输入短信验证码")
                .parent().addClass("error")
                .focus();
            return false;
        };

        if($userAgreement.prop("checked") !== true){
            $userAgreement.parent().nextAll(".error-tip")
                .html("请同意用户协议")
                .parent().addClass("error")
                .focus();
            return false;
        };

        return true;
    };

    $("#submit-register").on("click", function(){
        if(verifyRegisterForm()){
            var mobile = $.trim($('input[name=mobile]').val()),password = $.trim($('input[name=password]').val()),repassword = $.trim($('input[name=repassword]').val()),validcode = $.trim($('input[name=validcode]').val()),code = $.trim($('input[name=code]').val());
            $.ajax({
                url:'/?r=mob/user/registerin',
                data:{mobile:mobile,password:password,repassword:repassword,validcode:validcode,code:code},
                type:"GET",
                dataType:'json',
                success:function(ret) {
                    if(ret.errno==1){
                        location.href ='?r=mob/user/successre';
                    }else{
                        alert(ret.msg);
                    }

                }
            })
        }
    });
};

//忘记密码
if($("#js-forget-password-box").length>0){
    // 失去光标的时候验证
    (function(){
        var $phone=$("#phone-number");

        $phone.on("blur",function(){
            if($phone.val()!="" && !RegExpPhone($phone.val())){
                $phone.nextAll(".error-tip")
                    .html("您输入的手机号码有误")
                    .parent().addClass("error")
                    .focus();
                return false;
            } else {
                $phone.parent().removeClass("error");
            }
        });
    })();

    // 提交时验证
    function verifyForgetPasswordForm(){
        var $phone=$("#phone-number"),
            $verifyCode = $("#validcode");

        if(!$phone.val()){
            $phone.nextAll(".error-tip")
                .html("请输入手机号")
                .parent().addClass("error")
                .focus();
            return false;
        };

        if(!$verifyCode.val()){
            $verifyCode.parent().parent().nextAll(".error-tip")
                .html("请输入验证码")
                .parent().addClass("error")
                .focus();
            return false;
        };

        return true
    };

    $("#submit-forget-pass").on("click", function(){
        if(verifyForgetPasswordForm()){
            mobile=$("#phone-number").val();
            validcode=$("#validcode").val();
            $.ajax({
                url:'/?r=mob/user/judgeujudge',
                data:{mobile:mobile,validcode:validcode},
                type:"GET",
                dataType:'json',
                success:function(ret) {
                    if(ret.error==1){
                        window.location.href="/?r=mob/user/repassword&mobile="+mobile;
                    }else{
                        alert(ret.msg);
                    }

                }
            })

        }
    });
};

//输入新密码
if($("#js-new-password-box").length>0){
    // 失去光标的时候验证
    (function(){
        var $getPhoneCode = $("#get-new-phone-code"),
            $phoneCode = $("#new-phone-code");

        $getPhoneCode.on("click", function(){
            var timer = 59;
            var countdown = setInterval(CountDown, 1000);

            $getPhoneCode.html("重新发送(60s)");
            $getPhoneCode.attr("disabled", true).addClass("btn-disabled");

            function CountDown() {
                $getPhoneCode.html("重新发送(" + timer + "s)");
                if (timer == 0) {
                    $getPhoneCode.html("免费获取验证码").removeAttr("disabled").removeClass("btn-disabled");
                    clearInterval(countdown);
                }
                timer--;
            };
            var mobile = $('.form-inline').attr('data-mobile');
            $.ajax({
                url:'/?r=mob/user/sendcode',
                data:{mobile:mobile,type:3},
                type:"GET",
                dataType:'json',
                success:function(ret) {
                    if(ret.state!='ok'){
                        alert(ret.message)
                    }
                }
            })
        });

        $phoneCode.on("blur", function(){
            if($phoneCode.val()){
                $phoneCode.parents(".form-group").removeClass("error");
            }
        });



    })();

    //提交时验证
    function verifyNewPasswordForm(){
        var $phoneCode = $("#new-phone-code");

        if(!$phoneCode.val()){
            $phoneCode.parent().parent().nextAll(".error-tip")
                .html("请输入短信验证码")
                .parent().addClass("error")
                .focus();
            return false;
        };

        return true
    };



    $("#submit-new-pass").on("click", function(){
        var mobile = $('.form-inline').attr('data-mobile');
        var code = $("#new-phone-code").val();
        if(verifyNewPasswordForm()){
            $.ajax({
                url:'/?r=mob/user/verifycode',
                data:{mobile:mobile,code:code},
                type:"GET",
                dataType:'json',
                success:function(ret) {
                    if(ret.error==1){
                        window.location.href="/?r=mob/user/resetpassword&mobile="+mobile+"&vcode="+ret.data;
                    }else{
                        alert(ret.msg)
                    }
                }
            })
        }
    });
};

//重置密码
if($("#js-reset-password-box").length>0){
    // 失去光标的时候验证
    (function(){
        var $pass = $("#pass"),
            $confirmPass = $("#confirm-pass");

        $pass.on("blur", function(){
            if($pass.val()!="" && !RegExpPassword($pass.val()) ){
                $pass.nextAll(".error-tip")
                    .html("密码可以包含字母、数字、特俗符。长6-16位")
                    .parent().addClass("error")
                    .focus();
                return false;
            } else {
                $pass.parent().removeClass("error");
            };
        });

        $confirmPass.on("blur", function(){
            if( !$confirmPass.val() && $confirmPass.val() !== $pass.val()){
                $confirmPass.nextAll(".error-tip")
                    .html("两次密码输入不同")
                    .parent().addClass("error")
                    .focus();
                return false;
            } else {
                $confirmPass.parent().removeClass("error");
            };
        });
    })();

    //提交时验证
    function verifyResetPasswordForm(){
        var $pass = $("#pass"),
            $confirmPass = $("#confirm-pass");

        if(!$pass.val()){
            $pass.nextAll(".error-tip")
                .html("密码不能为空")
                .parent().addClass("error")
                .focus();
            return false;
        };

        if(!$confirmPass.val()){
            $confirmPass.nextAll(".error-tip")
                .html("请重复输入密码")
                .parent().addClass("error")
                .focus();
            return false;
        };

        return true;
    };

    $("#submit-reset-password").on("click", function(){
        if(verifyResetPasswordForm()){
            var password = $.trim($('input[name=password]').val()),repassword = $.trim($('input[name=repassword]').val()),code = $.trim($('input[name=code]').val());
            $.ajax({
                url:'/?r=mob/user/modfiypw',
                data:{password:password,repassword:repassword,code:code},
                type:"GET",
                dataType:'json',
                success:function(ret) {
                    if(ret.error==1){
                        window.location.href="/?r=mob/user/successre&type=reps";
                    }else{
                        alert(ret.msg)
                    }
                }
            })
        }
    });
};

//banner
if($("#banner").length || $("#brand-box").length){
    var detailsSwiper = new Swiper('#banner', {
        loop: true,
        pagination: '.details_pagination',
        loopAdditionalSlides:0,
        lazyLoading : true,
        autoplay:3000
    });
    /*var detailsSwiper = new Swiper('#brand-box', {
        loop: true,
        loopAdditionalSlides:0,
        lazyLoading : true
    });*/

	var detailsSwiper = new Swiper('#brand-box', {
        loop: true,
        loopAdditionalSlides:0,
        lazyLoading : true,
        nextButton: '.prev-btn',
        prevButton: '.next-btn'
    });

};

//滚动条到滚动底部
$(window).load(function(){

    var touchScroll = {
        scroll:function(parameter,sBlock,sCount){
            var scrollPage = document.getElementById(parameter),
                flage = false,
                scrollTop,
                proData=$('#product-box').attr('data-action'),
                proCid=$('#product-box').attr('data-cid'),
                documentHeight = $(document).height(),
                windowHeight = $(window).height(),
                sddd=(documentHeight - windowHeight) -80,
                todaypage= 2,
                allpage= 2,
                overpage= 2,
                today= 0,
                all= 0,
                over=0;



            if(parameter==='youdian-box') {
                var counts=sCount
            }else{
                var counts = 0;
            }
            function touchstart(event){

                if(scrollTop >= sddd){
                    flage=false;
                } else {
                    flage = true;
                }
            };
            function touchMove(event){
                scrollTop = $(document).scrollTop();
                if(flage && scrollTop >= (documentHeight - windowHeight) - 80){
                    //console.log("页面到底咯~")
                    flage = false;
                }
            };
            function touchEnd(event){
				
				if( typeof(disabled) != 'undefined' && disabled == 1 ) return;

                scrollTop = $(document).scrollTop();
                if(parameter==='youdian-box'){
                    var sul='/?r=mob/index/youdianv3&ajax=2&s='+s+'&block_id='+sBlock+'&page='
                }else if(parameter==='index-box'){
                    var sul='/?r=mob/index/indexv3&ajax=2&s='+s+'&page='

                }else if(parameter==='product-box'){

                    if(proData=='nine'){
                        var sul='/?r=mob/index/ninev3&ajax=2&s='+s+'&page='
                    }else if(proData=='plist'){
                        var sCid=$('#product-box').attr('data-cid');
                        var sul='/?r=mob/index/plist&ajax=2&s='+s+'&cid='+sCid+'&page='
                    } else if( proData=='activity' ) {
						return;
					} else if(proData=='tmplist'){
                        var sul='/?r=mob/p/list&ajax=2&page='
                    } else{
                        var sul='/?r=mob/index/productv3&ajax=2&s='+s+'&cid='+proCid+'&page='
                    }

                }else if(parameter==='youdian-session-box'){
                    var sAid=$('#youdian-session-box').attr('data-aid');
                    var sul='/?r=mob/index/youdiansv3&ajax=2&s='+s+'&aid='+sAid+'&page='
                }else if(parameter==='active-box'){
                    var sAid=$('#product-box').attr('data-aid'),
                        sOrder=$('#product-box').attr('data-order'),
                        sOrderv=$('#product-box').attr('data-orderv'),
                        sBid=$('#product-box').attr('data-block_id');
                    var sul='/?r=mob/activity/newlist&ajax=2&s='+s+'&aid='+sAid+'&order='+sOrder+'&block_id='+sBid+'&order_v='+sOrderv+'&page='
                }else if(parameter=="js-seckill-boxs"){
                    var $current=$(".seckill-tab").find(".tab"),
                        page=Number($current.attr("data-page")),
                        datatype=$(".seckill-tab").find('.active').attr("data-type");
                    if(datatype=="today"){
                        url='/?r=mob/index/seckill&ajax=1&page='+todaypage
                        $seckillHtml=$("#js-"+datatype);
                    }else if(datatype=="all"){
                        url='/?r=mob/index/seckill&ajax=1&page='+allpage+'&type='+datatype
                        $seckillHtml=$("#js-"+datatype);
                    }else{
                        url='/?r=mob/index/seckill&ajax=1&page='+overpage+'&type='+datatype
                        $seckillHtml=$("#js-"+datatype);
                    }
                }
                //console.log(scrollTop+'---'+sddd)



                if(!counts){
                    if(!flage && scrollTop >= (documentHeight - windowHeight) - 80){
                        if(parameter!="js-seckill-boxs"){
                            $.ajax({
                                url: sul+$num++,
                                type: 'POST',
                                data: '',
                                dataType : "jsonp",
                                jsonp : "callback",
                                beforeSend: function(){
                                    $('.waitgif').show();
                                    $('.waitfont').hide();
                                },
                                success: function (re) {
                                    if (re.state == 'ok') {
                                        BigUl = $(".score-main");
                                        BigUl.append(re.html);
                                        documentHeight = $(document).height();
                                        $('.waitgif').hide();
                                        $('.waitfont').show();
                                        if(re.isover==1){
                                            counts=re.isover;
                                            $('.bottomover').show()
                                                .removeClass('bottomover2');
                                            //$('.waitgif').remove();
                                            $('.waitfont').text('已经全部加载');
                                        }
                                    }
                                }
                            })
                        }
                    }
                }
                if(!today || !over || !all){
                    documentHeight = $(document).height();
                    if(scrollTop >= (documentHeight - windowHeight) - 80){
                        if(parameter=="js-seckill-boxs"){
                            $.ajax({
                                url: url,
                                type: 'GET',
                                data: '',
                                dataType : "json",
                                beforeSend: function(){
                                    $('.waitgif').show();
                                    $('.waitfont').hide();
                                },
                                success: function (re) {
                                    $current.attr("data-page",page++);
                                    if (re.state == 'ok') {
                                        $seckillHtml.append(re.html);
                                        documentHeight = $(document).height();
                                        $('.waitgif').hide();
                                        $('.waitfont').show();
                                        if(datatype=="today"){
                                            todaypage++;
                                        }else if(datatype=="all"){
                                            allpage++;
                                        }else{
                                            overpage++;
                                        }
                                        if(re.isover==1){
                                            if(datatype=="today"){
                                                today=re.isover;
                                                $("#js-product2").find('.bottomover').show()
                                                    .removeClass('bottomover2');
                                                //$('.waitgif').remove();
                                                $("#js-product2").find('.waitfont').text('已经全部加载');
                                            }else if(datatype=="all"){
                                                all=re.isover;
                                                $("#js-product3").find('.bottomover').show()
                                                    .removeClass('bottomover2');
                                                //$('.waitgif').remove();
                                                $("#js-product3").find('.waitfont').text('已经全部加载');
                                            }else{
                                                over=re.isover;
                                                $("#js-product1").find('.bottomover').show()
                                                    .removeClass('bottomover2');
                                                //$('.waitgif').remove();
                                                $("#js-product1").find('.waitfont').text('已经全部加载');
                                            }

                                        }
                                    }

                                }
                            })
                        }

                    }
                }

                if(!flage && scrollTop >= (documentHeight - windowHeight)){
                    if(!$("#js-seckill-boxs").length){
                        if($('.bottomover').attr('class').indexOf('bottomover2')==-1){
                            $('.waitfont').text('已经全部加载');
                        }else{
                            $('.waitfont').text('上滑动加载更多...');
                        }
                    }
                }
            };
            $(document).on("scroll",function(){
                scrollTop = $(document).scrollTop();
            });

            scrollPage.addEventListener("touchstart",touchstart);
            scrollPage.addEventListener("touchmove",touchMove);
            scrollPage.addEventListener("touchend",touchEnd);
            scrollPage.addEventListener("touchcancel",touchEnd);
        }
    };

    //首页
    if($("#index-box").length>0){
        console.log(1)
        touchScroll.scroll("index-box");
    };
    // 产品列表页
    if($("#product-box").length>0){

        touchScroll.scroll("product-box");
    };
    // 优店
    if($("#youdian-box").length>0){

        sBlock=$('.nav ul .active').find('a').attr('data-block_id');
        touchScroll.scroll("youdian-box",sBlock);
        $('.nav li').on('click',function(){
            var sCount=0
            touchScroll.scroll("youdian-box",sBlock);
        })
    };


    // 优店专场
    if($("#youdian-session-box").length>0){

        touchScroll.scroll("youdian-session-box",sBlock);
    };
    // 活动专场
    if($("#active-box").length>0){

        touchScroll.scroll("active-box");
    };
    //秒杀
    if($("#js-seckill-boxs").length){

        touchScroll.scroll("js-seckill-boxs");
    }

});
// fixed导航
function fixedNav(obj){
    var topVal = $(".header").height(),
        scrollTop = $(document).scrollTop();

    if($("#js-adBox").length > 0){
        topVal +=$("#js-adBox").height();
    }

    $(document).scroll(function(){
        scrollTop = $(document).scrollTop();
        if(scrollTop >= topVal){
            $(obj).addClass("fixed").css({"top": topVal});
        } else {
            $(obj).removeClass("fixed");
        }
    });
};


$(window).on("load", function(){
    fixedNav(".js-nav-position");
});

//首页秒杀
var nextTime;
function recommended(){
    var $productBox = $("#js-seckill-list");
    $.ajax({
        url:'?r=mob/index/msapi',
        data:"",
        type:"POST",
        dataType:'json',
        success:function(data){
            if(data.state){
                debugger;
                $productBox.html(data.html);
                //debugger;
                $("#js-times").attr("data-endtime",data.endtime);
                nextTime=data.endtime;
                _recommend();

            }
        }
    });
};


function _recommend(){
    var $jsRecommended=$("#js-seckill-box");
    if(nextTime==undefined){
        nextTime=parseInt($jsRecommended.find("#js-times").attr("data-endtime"));
    }
    if(nextTime>1){
        var currentTime=PCfg.page.time[1];
        var $times=$("#js-times"),
            lastTime=nextTime-currentTime;
        var interValObj=setInterval(function(){countdown("#js-times")},1000);
        function countdown(obj){
            if(lastTime>0){
                lastTime=lastTime-1;
                var second=Math.floor(lastTime%60),
                    minite=Math.floor((lastTime/60)%60),
                    hour=Math.floor((lastTime/3600)%24);
                second=String(second).split(""),
                    minite=String(minite).split(""),
                    hour=String(hour).split("");
                if(second.length==1){
                    second.unshift("0");
                }
                if(minite.length==1){
                    minite.unshift("0");
                }
                if(hour.length==1){
                    hour.unshift("0");
                }
                if(seckillingtype=="1"){
                    var  timescon='<span>'+hour[0]+hour[1]+'</span>:<span>'+minite[0]+minite[1]+'</span>:<span>'+second[0]+second[1]+'</span>';
                }else{
                    var  timescon='<span>'+hour[0]+hour[1]+'</span><span class="minute">'+minite[0]+minite[1]+'</span><span class="second">'+second[0]+second[1]+'</span>';
                }

                $(obj).html(timescon);
            }else {
                clearInterval(interValObj);
                recommended();
            }
        }
    }
}

var $jsRecommended=$("#js-seckill-box");
if($jsRecommended.length>0){
    var seckillingtype=$("#js-seckilling-type").attr("data-templetid");
    _recommend()
};
//秒杀tab切换
if($(".seckill-tab").length){
    $(".seckill-tab").find(".tab").on('click',function(){
        var i=$(this).index();
        $(".tab").removeClass('active');
        $(this).addClass('active');
        $(".product-tab").addClass('hide');
        $(".product-tab").eq(i).removeClass('hide');
    });
}