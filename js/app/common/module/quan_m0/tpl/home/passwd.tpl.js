define(function() {
    return (function(){/*
<div class="tk-list-choice page-all mb20">
	<div class="list-choice-first clearfix">
		
	</div>
</div>
<div class="list-info page-all mb30">
	<div class="my-juanpi">

        <!-- 二级导航 -->
        <div class="sider-bar">
		    <ul>
 			<li><a href="{{context.document_url}}?action=home">个人中心</a></li>
            <li><a href="{{context.document_url}}?action=home&to_page=point">我的积分</a></li>
            <li><a href="{{context.document_url}}?action=home&to_page=cash">提现记录</a></li>
            <li class=""><a href="{{context.document_url}}?action=home&to_page=setting">个人设置</a></li>
            <li class="active"><a href="{{context.document_url}}?action=home&to_page=passwd">密码设置</a></li>
		    </ul>
		</div>
        <!-- 二级导航 -->

            <div class="cash-voucher fr">
                <div class="activate coupon-active">
                    <span>原密码:</span>
                    <input type="password" value="" id="member-passwd" autocomplete="off" placeholder="输入原密码">
                </div>
                <div class="activate coupon-active">
                    <span>新密码:</span>
                    <input type="password" value="" id="member-passwd-new" autocomplete="off" placeholder="输入新密码">
                </div>
                <div class="activate coupon-active">
                    <div class="activate-button f_shadow passwd-btn" style="cursor: default;">修改密码</div>
                    <span class="err" id="err" style="display:none"></span>
                </div>
                <!---->
            </div>

            <input id="member_passwd" type="hidden" />
    </div>

</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})