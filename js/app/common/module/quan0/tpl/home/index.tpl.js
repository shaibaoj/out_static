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
 			<li class="active"><a href="{{context.document_url}}?action=home">个人中心</a></li>
		    <li><a href="{{context.document_url}}?action=home&to_page=point">我的积分</a></li>
		    <li><a href="{{context.document_url}}?action=home&to_page=cash">提现记录</a></li>
            <li><a href="{{context.document_url}}?action=home&to_page=setting">个人设置</a></li>
            <li class=""><a href="{{context.document_url}}?action=home&to_page=passwd">密码设置</a></li>
		    </ul>
		</div>
        <!-- 二级导航 -->

            <div class="cash-voucher fr">
                <div class="rder-infolist">
                    <div class="wallet-overview">
                        <div class="overview-item item-inlineblock">
                            <div><img src="{{context.static_url}}/taoke/template/cms/{{taoke_cms.path}}/images/member/money_03.png"></div>
                            <div class="overview-total">
                                <div>
                                    <div>总金额</div>
                                    <div class="tips-icon"><img src="{{context.static_url}}/taoke/template/cms/{{taoke_cms.path}}/images/member/info.png" alt=""></div>
                                </div>
                                <div class="fontsize-20"><span class="color-red" id="member_money"></span>元</div>
                                <div class="hover-tips">总余额为付款结算和未结算总和。<div class="triangle"></div></div>
                            </div>
                        </div>
                        <div class="overview-item segmentation">
                            <div>
                                <span><img src="{{context.static_url}}/taoke/template/cms/{{taoke_cms.path}}/images/member/money_02.png" alt=""></span>
                                <span class="fw-bold">
                                    可用现金：<em class="color-red" id="member_money_available"></em>元
                                    <div class="tips-icon"><img src="{{context.static_url}}/taoke/template/cms/{{taoke_cms.path}}/images/member/info.png" alt=""></div>
                                    <div class="hover-tips">现金即为已经结算的订单金额，可以提现。</div>
                                </span>
                            </div>
                            <div>
                                <span><img src="{{context.static_url}}/taoke/template/cms/{{taoke_cms.path}}/images/member/money_01.png" alt=""></span>
                                <span class="fw-bold">
                                    积分：<em class="color-red" id="member_points"></em>个
                                    <div class="tips-icon"><img src="{{context.static_url}}/taoke/template/cms/{{taoke_cms.path}}/images/member/info.png" alt=""></div>
                                    <div class="hover-tips">积分为兑换礼品或者返现为现金使用。</div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="agent_url" class="activate coupon-active" style="display:none">
                    <span>推广地址:</span>
                    <span class="agent_url"></span>
                </div>

                <div class="activate coupon-active">
	                <span>淘宝、天猫订单号录入:</span>
	                <input type="text" value="" id="activate-code" autocomplete="off">
	                <div class="activate-button f_shadow tb-btn" style="cursor: default;">晒订单、拿奖励</div>
	                <span class="err" style="display:none">无效订单号</span>
	            </div>

                <!---->
                <div class="rder-infolist detail-list">
                    <div class="title">最新100条订单记录</div>
                    <div class="thead">
                        <span>时间</span>
                        <span>金额</span>
                        <span>积分</span>
                        <span>状态</span>
                        <span>备注</span>
                    </div>
                    <div>
                        <ul id="member_list"></ul>
                    </div>
                </div>
                <!---->
                <input id="member_home" type="hidden" />
            </div>
        </div>

</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})