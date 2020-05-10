define(function() {
    return (function(){/*
<!-- 主内容 -->
<div class="container">
    <!-- 轮播图 -->
    <div class="slider">
        <ul id="banner_list" class="banner">
            <li style="background:url(https://i.huim.com/activity/14951931627339.jpg) no-repeat center center;" ><a target="_blank" class="banner_pic" href="#"></a></li>   
        </ul>
    </div>
    <!-- 轮播图 end -->
    <div class="grid_auto banner_layer">
        <!-- 签到 -->
        <div class="sign_in">
            <div class="nosign_box" >
                <a class="sign_btn" href='javascript:void(0);'><i class="sign_date">{{ext.date_day}}</i><span class="sign_txt">每日签到领积分</span></a>
                <p class="start_sign"><span class="sign_inner">每日签到拿积分<font>>></font></span></p>
            </div>
            <div class="oksign_box" style="display:none">
                <div class="sign_success"><i class="sign_date">{{ext.date_day}}</i><span class="sign_txt">签到成功</span></div>
            </div>
        
            <div class="sign_foot">
                <a target="_blank" class="publish_btn" href="{{context.document_url}}?action=publish">优惠播报</a>
                <a target="_blank" href="{{context.document_url}}?action=mall">全网购物</a>
            </div>
        </div>
        <!-- 签到 end-->
        <div class="adtype"></div>
        <div class="banner_arrow" data-banner="arrow">
            <a href="javascript:;" class="arrow_prev" data-arrow="prev"><i></i></a>
            <a href="javascript:;" class="arrow_next" data-arrow="next"><i></i></a>
        </div>

    </div>   
</div>
<div class="home_tip_contain">
    <div class="grid_auto home_tip_box cf">
        <div class="home_tip1 home_tip">
            <i class="home_tip_icon"></i>
            <div class="home_tip_desc">
                <p class="home_tip_top">小编精选推荐</p>
                <p class="home_tip_bottom">剁手不败家</p>
            </div>
            <i class="home_tip_line"></i>
        </div>
        <div class="home_tip2 home_tip">
            <i class="home_tip_icon"></i>
            <div class="home_tip_desc">
                <p class="home_tip_top">职业买手爆料</p>
                <p class="home_tip_bottom">网罗全民挚爱</p>
            </div>
            <i class="home_tip_line"></i>
        </div>
        <div class="home_tip3 home_tip">
            <i class="home_tip_icon"></i>
            <div class="home_tip_desc">
                <p class="home_tip_top">领券超值低价</p>
                <p class="home_tip_bottom">底价折扣+领券立减</p>
            </div>
            <i class="home_tip_line"></i>
        </div>
        <div class="home_tip4 home_tip">
            <i class="home_tip_icon"></i>
            <div class="home_tip_desc">
                <p class="home_tip_top">全天数千款上新</p>
                <p class="home_tip_bottom">10点限时限量抢半价</p>
            </div>
        </div>
    </div>   
</div>
<div class="ranking_area_wrap">
    <div class="ranking_area grid_auto">
        <div class="ranking cf">
            <h4 class="fl">排行榜</h4>
            <div class="ranking_select_box fl">
                <a class="active" href="javascript:;" data-type="1">发现</a>
                <!-- <a class="select_tj" href="javascript:;" data-type="2">快报</a> -->
            </div>
            <div class="ranking_line"></div>
            <div class="search_area fr" style="display:none;">
                <div class="search_box cf">
                    <form onsubmit="return searchKey($(this))" method="get" action="">
                    <span class="search_input fl">
                        <input type="text" id="keywords" class="keywords txt_focus" name="s" value="请输入想找的宝贝" lang="请输入想找的宝贝" autocomplete="off" />
                    </span>
                    <input type="submit" class="search_submit fl" value=""/>
                    <i class="search_icon"></i>
                    </form>
                </div>
            </div>
        </div>
        <a href="javascript:;" class="arrow_btn arrow_prev"><i></i></a>
        <a href="javascript:;" class="arrow_btn arrow_next"><i></i></a>
        <div class="r_content">
            <!-- 喵券排行榜 -->
            <div class="r_content_list cf" id="miaoquan_hit">
                <ul></ul>
            </div>
            <!-- 喵券排行榜 -->
            <!-- new 推荐排行榜 contentListIndex-->
            <div class="r_content_list cf" id="tj_hit">
                <ul></ul>
            </div>
            <!-- /推荐排行榜 -->
        </div>
    </div>     
</div>

<!-- 主内容 -->
<div class="container grid_auto">
    <div class="miaoquan_area">
        <div class="miaoquan_title cf" id="type">
            <h4>超值精选<span class="mq_tip"></span></h4>
            <div class="tit_update">优惠券<span class="update_num"></span>条</div>
        </div>        

        <div class="miaoquan_leimu cf">
            <div id="mq_types">
                <div id="i_brand_name" class="">
                    <div id="index_brand" class="i_brand_name width1040">
                        <ul>
                            <li class="name"><a href="javascript:void(0)" data-goods="mall"><span class="name">优品汇</span><b></b></a></li>
                            <li><a href="javascript:void(0)" class="active" data-goods="taobao"><span class="name">领券直播</span><span class="word"><em>•</em>每天10点上新</span><b></b></a></li>
                        </ul>
                    </div>
                </div>
                <div class="mq_types_box">
                    <ul class="fl">
                        <li {{if context.arr_query.cid}}class="current"{{/if}}><a href="<?php echo $cate_url; ?>cid=">全部</a></li>
                        {{each categorys as value i}}
                         <li {{if value.c_id==context.arr_query.cid}}class="current"{{/if}}><a href="{{cate_url}}cid={{value.c_id}}">{{value.short_name}}</a></li>
						{{/each}}
                    </ul>
                    <span class="s_line fl"></span>
                    <a class="selc_quan fl " href="{{cate_url}}jiu=1" title="点击选择">
                        <span class="selc_quan_icon"></span>
                        <span class="selc_quan_nav">9块9封顶</span>
                    </a>
                </div>
            </div>
        </div>
        
        <div class="miaoquan_items cf">
            <ul id="content-item">
               
            </ul>
        </div>

        <div class="zhi_type_grid cf" _hover-ignore="1">
            <ul id="ulmain"></ul>
        </div>

        <div class="load-more">
            <img src="https://i.huim.com/content_new/images/loading1.gif"  alt="加载更多..."/>
        </div>
        <div style="display:none" class="show-more-btn" data-s="0" data-t="0" data-goods="taobao" data-jiu="{{context.arr_query.jiu}}" data-cid="{{context.arr_query.cid}}" data-f="0" data-pagenum="1" data-pageindex="0" data-time="" >
            <span>点击加载更多</span>
        </div> 
    </div>
    
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})