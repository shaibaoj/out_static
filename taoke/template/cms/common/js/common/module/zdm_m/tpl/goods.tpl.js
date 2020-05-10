define(function() {
    return (function(){/*
{{each list as value i}}
{{if goods_action=='top'}}
<li>
    <div class="quan_item_img">
        <a href="{{context.document_url}}?action=quan&id={{value.num_iid}}" target="_blank">
            <img class="lazyload" src="{{value.pic_url}}_290x290.jpg"/>
            <span class="top_icon">排名第{{i+1}}</span>
        </a>       
    </div>
    <div class="quan_item_con">
        <p class="quan_item_tit"><a href="{{context.document_url}}?action=quan&id={{value.num_iid}}" target="_blank">{{value.title}}</a></p>
        <div class="quan_item_price">
            <span class="pir">¥</span><span class="num">{{value.buy_price}}</span><span class="pri_font">券后价</span><span class="list">{{value.volume}}人购买</span>
        </div>
        <div class="item_btn_box cf">
            <a  href="{{context.document_url}}?action=quan&id={{value.num_iid}}" target="_blank" class="item_coupon">
                <span class="quan">领</span><span class="num">{{value.coupon_money}}元券</span>
            </a>
            <a isconvert=1 href="{{context.document_url}}?action=quan&id={{value.num_iid}}" target="_blank" class="item_btn">
                前往抢购
                <span class="arr_right"></span>
            </a>    
        </div>
    </div>
</li>
{{else if goods_action=='deal'}}
<div class="zhi_list cf">
    <div class="list_pic fl">                       
        <a target="_blank" href="{{context.document_url}}?action=you&id={{value.id}}"><img src="{{value.picUrl}}" alt=""></a>
    </div>
    <div class="list_info fl">
        <p class="list_tit"><a target="_blank" href="{{context.document_url}}?action=you&id={{value.id}}">{{value.title}}</a></p>
        <p class="list_price"><a target="_blank" href="{{context.document_url}}?action=you&id={{value.id}}">{{value.title}}</a></p>
        <div class="list_doc">{{value.recommendedReason}}</div>
        <div class="list_action">
            <p class="list_label">
                <a href="{{context.document_url}}?action=you&id={{value.id}}">{{value.shopName}}</a>
            </p>
            <p class="list_page">
                <span class="pub_time"><i class="ico_clock"></i>{{value.create_date}}</span>
                <span class="page_num">{{value.views}}人已浏览</span>
            </p>
            <a target="_blank" class="list_buy_btn combtn_b combtn_red" href="{{context.document_url}}?action=you&id={{value.id}}"><i class="home_icon"></i><span>前往购买</span></a>
        </div>
    </div> 
    <div class="tab_tips"></div>
</div>
{{else if goods_action=='goods_faxian'}}
<li>
    <i class="tiem_no">{{i+1}}</i>
    <a target="_blank" href="{{context.document_url}}?action=quan&yun=1&id={{value.num_iid}}">
        <img src="{{value.pic_url}}_310x310.jpg" alt="{{value.title}}">
        <p class="g_title">{{value.title}}</p>
        <div class="box_info cf"><div class="fl g_price">￥<span class="ranking_price">{{value.goods_buy_price}}</span><i class="quan_icons"></i></div><span class="fr g_num">有{{value.volume}}人购买</span></div>
    </a>
</li>
{{else if goods_action=='product'}}
<li>
    <div class="zhi_grid">
        <div class="grid_pic">                        
        <a target="_blank" href="{{context.document_url}}?action=product&id={{value.id}}">
        	<img class="lazyload" src="{{value.picUrl}}"></a>
        </div>
        <div class="grid_boxs">
            <h4 class="grid_tit">
                <a target="_blank" href="{{context.document_url}}?action=product&id={{value.id}}" >{{value.productName}}</a>
            </h4>
            <div class="grid_price">
            	{{if value.user_goods_commission>0}}
                <p class="price_current"><a target="_blank" href="{{context.document_url}}?action=product&id={{value.id}}">预计返{{value.user_goods_commission}}</a></p>
                {{/if}}
                {{if value.coupon_money>0}}
                <p class="price_current"><a target="_blank" href="{{context.document_url}}?action=product&id={{value.id}}">{{value.coupon_money}}</a>元券</p>
                {{/if}}
                <div class="grid_infos cf">
                    <span class="grid_page_go">{{value.businessName}}</span>
                </div>
                <a target="_blank" class="grid_buy_btn" href="{{context.document_url}}?action=product&id={{value.id}}"><span>前往购买</span></a>   
            </div>
            <div class="grid_page cf">
                <span class="pub_time"><i class="ico_clock"></i>{{value.create_date}}</span>
                <span class="page_num">{{value.views}}人已浏览</span>
            </div>
        </div>
    </div>
    <div class="tab_tips"></div>
</li>
{{else if goods_action=='product_search'}}
<li>                
   <div class="quan_item_img">
		<a href="{{context.document_url}}?action=product&id={{value.id}}" target="_blank">    
	         <img src="{{value.picUrl}}" />
	         {{if value.goods_today}}
	         <span class="new_icon top_icon">今日</span>
	         {{/if}}
		</a>
	</div>
     <div class="quan_item_con">
         <p class="quan_item_tit"><a href="{{context.document_url}}?action=product&id={{value.id}}" target="_blank">{{value.productName}}</a></p>
         <div class="quan_item_price cf">
	          <div class="fl"><span class="pir">¥</span><span class="num">{{value.goods_buy_price}}</span>{{if value.goods_coupon_price}}<span class="pri_font">券后价</span>{{/if}}</div><span class="list fr">{{value.volume}}人已购买</span>
	     </div>
         <div class="item_btn_box cf">
        	 {{if value.coupon_money>0}}
             <div class="quan_number fl"><span class="quan_tip">券</span><span class="quan_price">{{value.coupon_money}}元</span></div>
             {{/if}}
             <a class="fr combtn_n combtn_red" href="{{context.document_url}}?action=product&id={{value.id}}" target="_blank">{{if value.goods_coupon_price}}领券{{/if}}抢购</a>
         </div>
     </div>    
 </li> 
{{else if goods_action=='temai'}}
<li class=" <?php if($top_count%4==0){echo 'no-right';} ?>">
    <a class="cnzzCounter" data-cnzz-type="2" data-cnzz="{{value.num_iid}}" href="<?php echo $goods_taoke_item_url; ?>" biz-itemid="{{value.num_iid}}" isconvert="1" rel="nofollow" target="_blank">
        <img src="{{value.pic_url}}_290x290.jpg" alt="">
    </a>
    <div class="padding">
    <a rel="nofollow" target="_blank" biz-itemid="{{value.num_iid}}" isconvert="1" href="<?php echo $goods_taoke_item_url; ?>" class="title  clearfix cnzzCounter" data-cnzz-type="2" data-cnzz="{{value.num_iid}}">
        <i class="{{if item.user_type=='B'}}tmall{{else}}taobao{{/if}}"></i>
        <span>{{value.title}}</span>
    </a>
    <div class="price-wrap clearfix">
        <span class="icon">￥</span>
        <span class="price">{{value.buy_price}}</span>
        <span class="youpin"></span>
        <div class="sold-count">
            <span class="text">目前已售</span>
            <span class="num">{{value.volume}}</span>
        </div>
    </div>
    <div class="time-wrap clearfix">
        <div class="time"></div>
        <div class="date">
            剩余&nbsp;<?php echo ceil((strtotime($event_end_time)-strtotime(date('Y-m-d', time()).' 00:00:00'))/(3600*24)); ?>>&nbsp;天
        </div>
        <a class="buy cnzzCounter" data-cnzz-type="2" data-cnzz="{{value.num_iid}}" biz-itemid="{{value.num_iid}}" isconvert="1" href="<?php echo $taoke_item_url; ?>" target="_blank">去抢购&gt;</a>
    </div>
    </div>
</li>
{{else if goods_action=='miaosha'}}
 <li class="list-item">
<div class="item-img">
    <a href="{{context.document_url}}?action=quan&id={{value.num_iid}}" target="_blank"><img src="{{value.pic_url}}_290x290.jpg" alt=""></a>
</div>
<h1 class="item-title text-ellipsis">
    <!-- <i class="icon icon-tmall"></i> -->
    <span class="inline-block title-img">
        <img src="{{context.static_url}}/taoke/template/cms/{{taoke_cms.path}}/images/{{if item.user_type=='B'}}tmall{{else}}taobao{{/if}}.png">
    </span>
    {{value.title}}                
</h1>
<p class="item-explain text-ellipsis"><span>{{value.coupon_money}}</span>元优惠券，已有 <span>{{value.volume}}</span>人购买，手慢无</p>
<div class="item-price text-ellipsis">
    <span>券后￥</span>
    <span class="present-price">{{value.buy_price}}</span>
    <del>￥<?php echo coreAppCache::number_format($goods_item_price); ?></del>
    <a href="{{context.document_url}}?action=quan&id={{value.num_iid}}" target="_blank" class="receive">领券下单</a>
</div>
</li>
 {{else if goods_action=='index'}}
<li>

    <div class="quan_item_img">
        <a href="{{context.document_url}}?action=quan&id={{value.num_iid}}" target="_blank">
            <img src="{{value.pic_url}}_310x310.jpg">
            {{if value.tip==1}}
            <span class="top_icon">今日热卖</span>
            {{else if value.tip==2}}
               <span class="top_icon">给力优惠</span>  
            {{else if value.tip==3}}
               <span class="top_icon">爆款热门</span>  
            {{else if value.tip==4}}
               <span class="new_icon top_icon">今日上新</span>  
            {{/if}}
        </a>       
    </div>
    <div class="quan_item_con">
        <p class="quan_item_tit"><a href="{{context.document_url}}?action=quan&id={{value.num_iid}}" target="_blank">{{value.title}}</a></p>
        <p class="quan_desc color_red"><?php echo $coupon_goods_item['comment']; ?>.</p>
        <div class="quan_item_price cf">
            <div class="fl">
                <span class="pir">¥</span>
                <span class="num">{{value.buy_price}}</span>
                <span class="pri_font">券后价</span>
            </div>
            <span class="list fr">{{value.volume}}人已买</span>
        </div>
        <div class="item_btn_box cf">
            <?php if(!empty($goods_item_coupon_price)){ ?>
            <span class="quan_number fl">领{{value.coupon_money}}元券</span>
            <?php } ?>
            <a class="fr combtn_n combtn_red" href="{{context.document_url}}?action=quan&id={{value.num_iid}}" target="_blank">领券抢购</a>
        </div>
    </div>
</li>
{{else}}
<li>
    <div class="quan_item_img">
        <a href="{{context.document_url}}?action=quan&id={{value.num_iid}}" target="_blank">
            <img class="lazyload" src="{{value.pic_url}}_290x290.jpg"/>
            {{if value.tip==1}}
            <span class="top_icon">今日热卖</span>
            {{else if value.tip==2}}
               <span class="top_icon">给力优惠</span>  
            {{else if value.tip==3}}
               <span class="top_icon">爆款热门</span>  
            {{else if value.tip==4}}
               <span class="new_icon">今日上新</span>  
            {{/if}}
        </a>       
    </div>
    <div class="quan_item_con">
        <p class="quan_item_tit"><a href="{{context.document_url}}?action=quan&id={{value.num_iid}}" target="_blank">{{value.title}}</a></p>
        <div class="quan_item_price">
            <span class="pir">¥</span><span class="num">{{value.buy_price}}</span><span class="pri_font">券后价</span><span class="list">{{value.volume}}人购买</span>
        </div>
        <div class="item_btn_box cf">
        		{{if value.coupon_money}}
            <a href="{{context.document_url}}?action=quan&id={{value.num_iid}}" target="_blank" class="item_coupon">
                <span class="quan">领</span><span class="num">{{value.coupon_money}}元券</span>
            </a>
            {{/if}}
            <a isconvert=1 href="{{context.document_url}}?action=quan&id={{value.num_iid}}" target="_blank" class="item_btn">
                前往抢购
                <span class="arr_right"></span>
            </a>    
        </div>
    </div>
</li>
{{/if}}
{{/each}}
    */}).toString().split("\n").slice(1,-1).join("\n")
})