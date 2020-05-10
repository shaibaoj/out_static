define(function() {
    return (function(){/*
<!-- 主内容 -->
<div class="container grid_auto">
    <div class="miaoquan_area">
        <div class="miaoquan_title cf">
            <h4>领券直播汇</h4>
            <div class="tit_update">优惠直播汇总<span class="update_num">{{query_count}}</span>条</div>
        </div>        
<form action="{{context.document_url}}" method="get">
<input type="hidden" name="action" value="quan_list"  />
<input type="hidden" name="jiu" value="{{context.arr_query.jiu}}"  />
<input type="hidden" name="ershi" value="{{context.arr_query.ershi}}"  />
<input type="hidden" name="tuijian" value="{{context.arr_query.tuijian}}"  />
<input type="hidden" name="tmall" value="{{context.arr_query.tmall}}"  />
<input type="hidden" name="sort" value="{{context.arr_query.sort}}"  />
<input type="hidden" name="order_next" value="{{context.arr_query.order_next}}"  />
</form>
        <div class="miaoquan_leimu cf">
            <ul>
                <li {{if context.arr_query.cid}}class="current"{{/if}}><a href="<?php echo $cate_url; ?>cid=">全部</a></li>
 				{{each categorys as value i}}
                 <li {{if value.c_id==context.arr_query.cid}}class="current"{{/if}}><a href="{{cate_url}}cid={{value.c_id}}">{{value.short_name}}</a></li>
				{{/each}}
            </ul>
            <span class="s_line"></span>
            {{if context.arr_query.jiu==1}}
            <a class="selc_quan selc_current" href="{{sort_url}}sort=default" title="点击选择">
                <span class="selc_quan_icon"></span>
                <span class="selc_quan_nav">9块9封顶</span>
            </a>
            {{else}}
            <a class="selc_quan" href="{{sort_url}}sort=default&amp;jiu=1" title="点击选择">
                <span class="selc_quan_icon"></span>
                <span class="selc_quan_nav">9块9封顶</span>
            </a>
            {{/if}}
        </div>

        <div class="goods_list">
            <ul id="goods_list"></ul>
        </div>

        <div id="site_loading" class="show-more-btn loading_area" style="display: none;" data-goods="common" data-sort="{{context.arr_query.sort}}" data-order_next="{{context.arr_query.order_next}}" data-jiu="{{context.arr_query.jiu}}" data-cid="{{context.arr_query.cid}}" data-f="0" data-pagenum="1" data-pageindex="0" data-time="">
            <p><img class="loading-ic" src="https://i.huim.com/content_new/images/loading.gif" alt="加载">小编为您加载中....</p>
        </div>
        <p class="no_data" id="no_data">已经到底啦</p>
    </div>
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})