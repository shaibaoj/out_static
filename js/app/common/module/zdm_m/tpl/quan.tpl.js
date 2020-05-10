define(function() {
    return (function(){/*
<div class="list-detail page-all clearfix">
        <div class="detail-nav">
            当前位置：<a href="{{context.document_url}}">首页</a><span>></span>
            <a href="{{context.document_url}}?action=quan_list">内部优惠券</a>        
            <span>></span> 优惠详情
        </div>
        <div class="detail-left fl">
            <div class="detail-img">
                <img src="{{item.pic_url}}_400x400.jpg">
            </div>
        </div>
        <div class="detail-right">
            <h1 class="detail-title">
                <!-- <i class="icon icon-tmall"></i> -->
                <span class="inline-block title-img">
                    <img src="{{context.static_url}}/taoke/template/cms/{{taoke_cms.path}}/images/{{if item.user_type=='B'}}tmall{{else}}taobao{{/if}}.png">
                </span>{{item.title}}
            </h1>
            <div class="price-block">
                <p class="line-block">
                    <span class="title">价格:</span>
                    <span class="present-price">￥<em>{{item.buy_price}}</em></span>
                    <del>￥{{item.ori_price}}</del>
                </p>
                {{if item.coupon_money}}
                <p class="line-block">
                    <span class="title">优惠:</span>
                    <span class="text">{{item.coupon_money}}元优惠券</span>
                    <span  class="text">单笔满{{item.condition}}元可用，每人限领1 张</span>
                </p>
                {{/if}}
            </div>
            
            <div class="quan-block mb20">
                {{if item.coupon_money&&item.applied_count}}<i class="icon icon-tanhao"></i>已领券<span class="red">{{item.applied_count}}</span>张<em>|</em> {{/if}}
                {{if item.volume>0}}已有<span class="red">{{item.volume}}</span>人购买，手慢无{{/if}}
            </div>
           
            {{if item.comment}}
            <div class="explain-block mb20">
                <div class="explain-title"><span class="icon-block"></span>推荐理由</div>
                <p>{{item.comment}}</p>
            </div>
            {{/if}}
            <div class="explain-block mb30">
                <div class="explain-title"><span class="icon-block"></span>如何购买</div>
            </div>

            {{if item.goods_quan_type}}
            <a href="{{context.document_url}}?action=market_url&browser=0&id={{item.num_iid}}&pid={{pid}}&link={{item.taoke_url_encode}}" class="take-quan-btn mb30" target="_blank" rel="nofollow">去领券下单</a>
<div class="">
<img src="http://gqrcode.alicdn.com/img?type=hv&text={{item.taoke_url_encode}}&h=300&w=300" width="100" />
淘宝app扫描下单
</div>
{{/if}}

{{if !item.goods_quan_type}} 
{{if item.coupon_money}}
<a href="https://shop.m.taobao.com/shop/coupon.htm?seller_id={{item.user_num_id}}&activityId={{item.activity_id}}" class="take-quan-btn mb30" target="_blank" rel="nofollow">先领券</a>
{{/if}}
<a isconvert=1 biz-itemid="{{item.num_iid}}"  href="{{item.taoke_url}}" class="take-quan-btn mb30" target="_blank" rel="nofollow">去{{item.user_type_name}}下单</a>
{{/if}}
            <div class="share-other">
                喜欢这个宝贝？分享给好友一起享受优惠吧：
                <ul class="clearfix">
                    <div class="bdsharebuttonbox" data-tag="detail">
                        <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                        <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                        <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
                        <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
                        <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                        <a href="#" class="bds_more" data-cmd="more"></a>
                    </div>
					<script>
					window._bd_share_config={
					    common:{
					        bdSnsKey:{},
					        bdMini:"2",
					        bdMiniList:false,
					        bdPic:"{{item.pic_url}}_400x400.jpg",        
					        bdStyle:"0",
					        bdSize:"16"
					    },
					    share:{}
					};
					with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
					</script>
                </ul>
            </div>
        </div>
    </div>
    <div class="list-info page-all mb30">
        <h1 class="list-info-title">你可能还喜欢</h1>
        <div class="miaoquan_items goods_list">
            <ul id="goods_relation" data-cid1="{{item.cid1}}" data-cid2="{{item.cid2}}" data-title="{{item.title}}" class="list-warp clearfix">
                  
            </ul>
        </div>
        <div class="yd-selectMenu" style="">
		  <ul>
		      <li data-cagid="all" class="f-child curr">云优惠推荐<em class="yd-icon"></em></li>
		  </ul>
		</div>
		<div class="miaoquan_items goods_list">
		<ul id="goodList1" class="list-warp clearfix"></ul>
		</div>
		<div class="list-loading hide">
		    <span><i class="loading-ic"></i><span>小编为您加载中....</span></span>
		</div>
    </div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})