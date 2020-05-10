define(function() {
    return (function(){/*
<div class="tk-list-choice page-all mb20">
	<div class="list-choice-first clearfix">
		
	</div>
</div>
<div class="list-info page-all mb30">
	<div class="login-main">
                
    <div class="login-content">
        <div class="title">
            <span class="hd">老用户登录</span>
            <span class="tips"></span>
            <p class="other">还没账号？<a href="{{context.document_url}}?action=register" rel="nofollow">立即去注册</a></p></div>
        <div class="login-center">
            <div class="content-landing fl">
                <ul class="login_list">
                    <li class="error_box1">
                        <label class="normal"></label>
                        <div class="box_border">
                            <div class="user_img"></div>
                            <input type="text" class="normal-input" id="user_name" placeholder="帐号名字" name="user_name" autocomplete="off" value="">
                            <div class="dele_info_img"></div>
                        </div>
                        <div class="error-box" id="user_name_warn"><strong class="error unsee"></strong><p class="msg_error"></p></div>
                    </li>
                    <li class="clear">
                       <label class="normal"></label>
                        <div class="box_border">
                            <div class="code_img"></div>
                            <input type="password" class="normal-input" placeholder="密码" id="password" name="password" autocomplete="off" id="inter_code">
                            <div class="dele_info_img"></div>
                        </div>
                        <div class="error-box" id="password_warn"></div>
                    </li>
                    <li class="chex-d">
                        <label class="normal"></label>
                        <div class="chex">
                            <span><label><input type="checkbox" class="ck" name="auto" checked="checked">两周内免登录</label></span>
                            <!-- <a class="forget " href="#">忘记密码？</a> -->
                        </div>
                    </li>
                    <li>
                        <label class="normal"></label>
                        <div class="btn">
                            <input type="button" id="btn-login" class="sub smt-o" value="登录" autocomplete="off">
                            <span id="loading"></span> 
                        </div>
                    </li>
                    <!-- <li class="third-login">
                        <label class="normal"></label>
                        <div class="union-login">
                            <p class="union-title"><span>合作网站账号登录</span></p>
                            <div class="third-box">
                                <a class="qq" href="#"></a>
                                <a href="#" class="weixin"></a>
                                <a class="sina" href="#"></a>
                                <a href="#" class="taobao"></a>
                            </div>
                        </div>
                        <a href="#" class="quick fl"><em class="icons icons-phone-other fl"></em><span class="fl">手机快捷登录&gt;&gt;</span></a>
                    </li> -->
                </ul>
            </div>
            <div class="login-l-img fr"> <img src="{{context.static_url}}/taoke/template/cms/{{taoke_cms.path}}/images/login_side.png" alt=""> </div>
        </div>

    </div>

    </div>
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})