define(function() {
    return (function(){/*
<div class="container grid_auto cf">
<div class="container_inner">
    <!-- 爆料详情  -->
    <div class="detial_content fl">
        <div class="bread_crumbs">
            <a href="{{context.document_url}}?action=deal">全网爆料</a>
            <span class="arrow">&gt;</span><a href="{{context.document_url}}?action=deal&mall_name={{item.shopName}}">{{item.shopName}}</a>
            <span class="arrow">/</span><a href="{{context.document_url}}?action=deal&cname={{item.Category1Name}}">{{item.Category1Name}}</a>
            <span class="arrow">&gt;</span><span class="detail_tit_s">{{item.title}}{{item.subTitle}}</span>
        </div>
        <h4 class="detial_tit">{{item.title}}<span>{{item.subTitle}}</span></h4>
        <div class="detail_info cf">
            <div class="detail_pic">
                <a target="_blank" class="pic_wrap mall-click" href="{{item.click_url}}" data-url="{{item.url}}"  data-mallid="" data-uid="{{cms.user_id}}" data-pid="{{cms.app_id}}" data-aid="{{context.agent_id}}"  >
                    <img src="{{item.picUrl}}"/>
                    <span class="bl_info zhi_ico"></span>
                </a>
            </div>

            <div class="detail_main">
                <div class="detail_dec"><span class="tuijian_area"><i class="ico_rec"></i>爆料理由</span>
                    <p>
                        <p>
                            <a class="mall-click" href="{{item.click_url}}" data-url="{{item.url}}"  data-mallid="" data-uid="{{cms.user_id}}" data-pid="{{cms.app_id}}" data-aid="{{context.agent_id}}" rel="nofollow" target="_blank">{{item.shopName}}</a>
                            {{item.recommendedReason}}
                        </p>
                        <a class="hide" href="#" rel="nofollow">更多神价格、0元单等优惠信息请前往{{cms.short_name}}查看</a>
                    </p>
                </div>

                <div class="detail_active">
                    <a class="buy_btn mall-click" target="_blank" href="{{item.click_url}}" data-url="{{item.url}}"  data-mallid="" data-uid="{{cms.user_id}}" data-pid="{{cms.app_id}}" data-aid="{{context.agent_id}}">购买拿返利</a>
                    <span>{{item.publishTime}}</span>
                    <span>{{item.shopName}}</span>
                </div>

            </div>
        </div>

        <!-- 介绍爆料 -->
        <div class="detail_slogan">
            <span class="slogan_icon"></span>
            <p>{{cms.siteName}}是汇集网购优惠的分享频道，主打更快、更广、更多的特色，如果您发现了超值的网购优惠信息，也可以进行爆料分享；若发现爆料商品已经无优惠，您也可以进行失效提醒；
            </p>
        </div>

        <!-- 介绍爆料end -->
        <!-- 评论区 -->
        <div class="comment_area" id="comment">
            <div class="comment_title cf">
                <div class="comment_num fl"><i></i>评论<span></span></div>
            </div>
            <div class="com_form_info cf">
                <div class="com_form_user fl">
                    <img class="current_pic_user" src="{{context.static_url}}/taoke/template/cms/{{taoke_cms.path}}/images/user.jpg" alt="用户头像" />
                    <a class="com_login" href="javascript:void(0);">评论权限暂时未开放</a>                        
                </div>
               
                <div class="com_form_box fr">
                    <div class="invite_login">
                        想评论，请先<a href="javascript:void()">评论权限暂时未开放</a>哦~
                    </div>
                </div>
                
            </div>

            <!-- 回复列表 -->
            <div class="comment_dec" id="div_Main" >

                <div class="comment_not" style="display:none">
                    发表优秀评论还可获得奖励哦~~
			    </div>
                <div class="comment_page">
                 <!-- 翻页区   -->
                    <span class="page_area"></span>
                    <div id="divpageinfo" style="display:none"></div>    
                    <div id="clspnum" style="display:none">0</div>    
                </div>
            </div>

            <!-- 回复列表 end -->
                                
        </div>
        <!-- 评论区end -->

    </div>
    <!-- 爆料详情 end -->
    <!-- 右侧 -->
    <div class="detial_side fr">
        
    </div>
    <!-- 右侧 end-->
</div>
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})