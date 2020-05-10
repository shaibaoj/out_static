define(function() {
    return (function(){/*
<div class="list-detail page-all clearfix">
        <div class="detail-nav">
           当前位置：<a href="{{context.document_url}}">首页</a>
            <span>></span>{{item.productName}}
        </div>
        <div class="detail-left fl">
            <div class="detail-img">
                <img src="{{item.picUrl}}">
            </div>
        </div>
        <div class="detail-right">
            <h1 class="detail-title">
                <span class="inline-block title-img">
                </span>
                {{item.productName}}
            </h1>
            <div class="price-block">
                <p class="line-block">
                    <span class="title">价格:</span>
                    <span class="present-price">￥<em>{{item.goods_buy_price}}</em></span>
                    <del>￥{{item.goods_price}}</del>
                </p>
                {{if item.coupon_money}}
                <p class="line-block">
                    <span class="title">优惠:</span>
                    <span class="text">{{item.coupon_money}}元优惠券</span>
                    <span  class="text">单笔满{{item.coupon_condition}}元可用，每人限领1 张</span>
                </p>
                {{/if}}
            </div>
           
            {{if item.describe}}
            <div class="explain-block mb20">
                <div class="explain-title"><span class="icon-block"></span>推荐理由</div>
                <p>{{item.describe}}</p>
            </div>
             {{/if}}
            <div class="explain-block mb30">
                <div class="explain-title"><span class="icon-block"></span>如何购买</div>
            </div>

            {{if item.coupon_money}}
            <a href="{{item.coupon_url}}" class="take-quan-btn mb30" target="_blank" rel="nofollow">先领券</a>
            {{/if}}
            <a target="_blank" class="take-quan-btn mb30 mall-click" href="{{item.click_url}}" data-url="{{item.url}}"  data-mallid="" data-uid="{{cms.user_id}}" data-pid="{{cms.app_id}}" data-aid="{{context.agent_id}}">下单</a>

            {{if item.user_goods_commission>0}}
            (<b>预计返{{item.user_goods_commission}}</b>)
            {{/if}}
        </div>
    </div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})