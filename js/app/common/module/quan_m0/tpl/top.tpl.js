define(function() {
    return (function(){/*
<!-- 主内容 -->
<div class="container grid_auto">
    <div class="miaoquan_area">
        <div class="miaoquan_title cf">
            <h4>超级人气榜</h4>
        </div>        
        <div class="miaoquan_leimu cf">
            <ul>

  <li {{if context.arr_query.cid}}class="current"{{/if}}><a href="<?php echo $cate_url; ?>cid=">全部</a></li>
 				{{each categorys as value i}}
                 <li {{if value.c_id==context.arr_query.cid}}class="current"{{/if}}><a href="{{cate_url}}cid={{value.c_id}}">{{value.short_name}}</a></li>
				{{/each}}
            </ul>
            <span class="s_line"></span>
        </div>
        <div class="miaoquan_items cf">
            <ul id="goods_list">
                
            </ul>
        </div>
    </div>
</div>
<div id="site_loading" class="show-more-btn loading_area" style="display: none;" data-goods="common" data-cid="{{context.arr_query.cid}}" data-f="0" data-pagenum="1" data-pageindex="0" data-time=""> </div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})