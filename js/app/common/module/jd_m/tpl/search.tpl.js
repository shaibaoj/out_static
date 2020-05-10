define(function() {
    return (function(){/*
<div class="container souquan">
   
    <div class="grid_auto">
    <p class="search_result" id="search_result" _hover-ignore="1">为您找到 <span id="search_info_span" class="search_info"></span> 的内部券</p>
<!--     <div class="yd-selectMenu" style="">
      <ul>
          <li data-goods="common" class="f-child curr">常规优惠<em class="yd-icon"></em></li>
          <li data-goods="yun" class="f-child">云优惠推荐(热)<em class="yd-icon"></em></li>
      </ul>
    </div> -->
    <div class="selector_box">
            <div id="selector_fixed" class="fl1">
       
    <div class="yd-selectMenu" style="">
      <ul>
          <li data-goods="common" class="f-child curr">常规优惠<em class="yd-icon"></em></li>
          <li data-goods="yun" class="f-child">云优惠推荐(热)<em class="yd-icon"></em></li>
          <li data-goods="jd" class="f-child">京东优惠券<em class="yd-icon"></em></li>
      </ul>
    </div>
                <ul class="goods_selector">
 <li {{if context.arr_query.cid}}class="current"{{/if}}><a href="{{cate_url}}cid=">全部</a></li>
 				{{each categorys as value i}}
    <li {{if value.c_id==context.arr_query.cid}}class="active"{{/if}}><a href="{{cate_url}}cid={{value.c_id}}"><span {{if value.c_id==context.arr_query.cid}}class="active"{{/if}}>{{value.short_name}}<em></em></span></a></li>
				{{/each}}
                </ul>
            </div>
        </div>

        <div class="selector_box">
            <div id="selector_fixed" class="fl">
                <ul class="goods_selector" id="goods_selector">
                    <li class="{{if !context.arr_query.sort||context.arr_query.sort=='default'}}active{{/if}}"><a href="{{sort_url}}sort=default" class="{{if !context.arr_query.sort||context.arr_query.sort=='default'}}red{{/if}}">默认排序</a></li>
                    <li class="{{if context.arr_query.sort=='coupon'}}active{{/if}}"><a href="{{sort_url}}sort=coupon&order_next=ASC" class="{{if context.arr_query.sort=='coupon'}}active{{/if}}">即将抢完</a></li>
                    <li class="{{if context.arr_query.sort=='volume'}}active{{/if}}"><a href="{{sort_url}}sort=volume&order_next=DESC" class="{{if context.arr_query.sort=='volume'}}active{{/if}}">销量优先</a></li>
                    <li class="{{if context.arr_query.sort=='coupon_price'}}active{{/if}}"><a href="{{sort_url}}sort=coupon_price&order_next=DESC" class="{{if context.arr_query.sort=='coupon_price'}}active{{/if}}">优惠度</a></li>
                </ul>
            </div>
            <div class="souquan_number fr">
                <!-- <span class="souquan_circle"></span>共300.55万张内部优惠券，已帮找到 106352 张券 -->
            </div>
        </div>
        <div class="goods_list">
            <ul id="goods_list"></ul>
        </div>
        <div id="site_loading" class="loading_area" style="display: none;" data-goods="common" data-cid="{{context.arr_query.cid}}" data-q="{{context.arr_query.q}}" data-f="0" data-pagenum="1">
            <p><img class="loading-ic" src="https://i.huim.com/content_new/images/loading.gif" alt="加载">小编为您加载中....</p>
        </div>

        <p class="no_data" id="no_data">已经到底啦</p>
    </div>
    <!-- /列表 -->
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})