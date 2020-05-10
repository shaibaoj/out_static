define(function() {
    return (function(){/*
<div class="container grid_auto">
    <!-- 爆料头部 -->
     <div class="publish_head cf">
        <!-- 左侧筛选 -->
        <div class="filter_area fl">
            <div class="leimu_list filter_item cf">            
                <span class="filter_item_name">分类筛选：</span>
                <div class="filter_item_box">                   
                    <ul>
                        <li {{if !context.arr_query.cname}}class="cur_list"{{/if}}><a href="{{cate_url}}?cname=">全部分类</a></li>
			    {{each cat_list as value i}}
			    <li {{if value.name==context.arr_query.cname}}class="cur_list"{{/if}}><a href="{{cate_url}}cname={{value.name}}">{{value.name}}</a></li>
			{{/each}}
                    </ul>
                </div>
            </div>
            <!-- <div class="shop_list filter_item cf">            
                <span class="filter_item_name">商城筛选：</span>
                <div class="filter_item_box">
                    <ul>
				<li {{if !context.arr_query.mall_name}}class="cur_list"{{/if}}><a href="{{cate_url}}?mall_name=">全部商城</a></li>
				    {{each mall_list as value i}}
				    <li {{if value.name==context.arr_query.mall_name}}class="cur_list"{{/if}}><a href="{{cate_url}}mall_name={{value.name}}">{{value.name}}</a></li>
				{{/each}}
                    </ul>
                 </div>
            </div> -->

        </div>
        <!-- 左侧筛选 end -->

        

    </div>
    <script type="text/javascript">
        //投稿统计
        $(".digital_container").each(function () {
            var num = $(this).attr("data-num");
            var e = $(this).children("span");
            for (var i = e.length; i > 0; i--) {
                var tmp = num % 10;
                num = parseInt(num / 10);
                e.eq(i - 1).html(tmp);
            }
        });
    </script>
    <!-- 爆料头部 end-->


    <div class="zhi_tit cf">
        <h4>每日优惠快报</h4>     
        <div class="show_type">                
            <ul>                    
                <li class="current"><a class="type_list" title="列表模式" href="javascript:;" onclick="setStyle(0)"></a></li>
                <!-- <li><a class="type_grid" title="网格模式" href="javascript:;" onclick="setStyle(1)"></a></li> -->
            </ul>
        </div>
        <span class="fr">浏览模式</span>
    </div>

    <div id="today_zhi" class="zhi_type cf">
            <div class="zhi_container fl">
                <div id="ulmain">
                
                </div>
                <div id="site_loading" tyle="display:none" class="loading_area show-more-btn" data-s="0" data-t="0" data-goods="mall" data-goods="common" data-sort="{{context.arr_query.sort}}" data-order_next="{{context.arr_query.order_next}}" data-jiu="{{context.arr_query.jiu}}" data-cid="{{context.arr_query.cid}}"  data-cname="{{context.arr_query.cname}}"  data-mall_name="{{context.arr_query.mall_name}}" data-f="0" data-pagenum="1" data-pageindex="0" data-time="" >
                    <p><img class="loading-ic" src="https://i.huim.com/content_new/images/loading.gif" alt="加载">小编为您加载中....</p>
                </div>
            </div>
            
            <!-- 首页侧边 -->
            <div class="main_side fr">
            <!-- 热门推荐 -->
                <div class="side_item tj_hot" style="top: 15px;">
                    <div class="side_item_tit">
                        <i></i>热门推荐
                    </div>
                    <div class="side_item_content tj_hot_cot cf">
                        <ul id="deal_top"></ul>
                    </div>
                </div>
            <!-- 热门推荐 end -->
             </div>
            <!-- 首页侧边 end-->

        </div>

</div>

<div id="ui_layoutbg"></div>
<!-- 达人榜单end -->
    */}).toString().split("\n").slice(1,-1).join("\n")
})