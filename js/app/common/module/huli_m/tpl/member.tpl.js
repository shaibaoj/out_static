define(function() {
    return (function(){/*
<div id="toolbar1" class="toolbar" style="display:none">
    <div class="bar-con">
        <div class="right-show rg">
        	<div class="login-show">
            	<a href="{{context.document_url}}?action=login" rel="nofollow">登录</a>
            	<a href="{{context.document_url}}?action=register" rel="nofollow" class="nav-reg">免费注册</a>　
           	</div>
        </div>
    </div>
</div>

<div id="toolbar" class="login_before" style="display:none">
    <a href="{{context.document_url}}?action=login">请登录</a>
    <span class="fg_line">|</span>
    <a target="_blank" href="{{context.document_url}}?action=register">注册</a>

</div>

<div id="toolbar_member" class="login_after cf" style="display:none">
    <div class="user_info fl">
        <a class="nick_name" href="{{context.document_url}}?action=home">
            欢迎您，<span class="user"></span><i class="arr_down"></i>
        </a>
        <div class="my_list">
            <ul>
                <li><a class="ico_login_1" href="{{context.document_url}}?action=home"><i class="ico_site"></i><span _hover-ignore="1">个人中心</span></a></li>
                <li><a class="ico_login_2" href="{{context.document_url}}?action=home&to_page=point"><i class="ico_site"></i><span>积分商城</span></a></li>
                <li><a class="ico_login_3" href="{{context.document_url}}?action=home&to_page=cash"><i class="ico_site"></i><span>提现记录</span></a></li>
                <li><a id="btn_logout" class="ico_login_4" href="javascript:void(0)"><i class="ico_site"></i><span>退出登录</span></a></li>
            </ul>
        </div>
    </div>
</div>

<ul id="toolbar_member_r" style="display:none">
    <li><a target="_blank" href="{{context.document_url}}?action=fuli">0元抽奖</a><span class="fg_line">|</span></li>
    <li><a target="_blank" href="{{context.document_url}}?action=fuli">免费领券</a><span class="fg_line">|</span></li>
    <li><a target="_blank" href="{{context.document_url}}?action=fuli">积分换礼</a><span class="fg_line">|</span></li>
    <li><a target="_blank" href="{{context.document_url}}?action=home">订阅推荐</a><span class="fg_line">|</span></li>
    <li class="topnav_more">
        <div class="nav_more">更多<i class="arr_down"></i></div>
        <div class="more_list">
            <ul>
                <li><a target="_blank" href="{{context.document_url}}?action=app"><span>下载APP</span></a></li>
                <li><a target="_blank" href="{{context.document_url}}?action=mall"><span>商城导航</span></a></li>
                <li><a target="_blank" href="{{context.document_url}}?action=help"><span>帮助中心</span></a></li>
            </ul>
        </div>
    </li>
</ul>

<div id="toolbar_member1" class="toolbar" style="display:none">
    <div class="bar-con">
        <div class="right-show rg">
        	<div class="logined-show">
        		<a href="{{context.document_url}}?action=home" class="normal-a">
        			欢迎您，<span class="user"></span><em class="cur"></em>
        		</a>
        		<a id="btn_logout" href="#"><span>退出</span></a>
        	</div>
        	<div class="personal-show">
        		<a href="{{context.document_url}}?action=home"><span>我的订单</span></a>
        		<a href="{{context.document_url}}?action=home&to_page=point"><span>积分商城</span></a>
        		<a href="{{context.document_url}}?action=home&to_page=cash"><span>提现记录</span></a>　
        		|
        	</div>
        </div>	
    </div>
</div>
<input id="member_agent_id" type="hidden" value="{{context.arr_query.ag_id}}" />
    */}).toString().split("\n").slice(1,-1).join("\n")
})