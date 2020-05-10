define(function() {
    return (function(){/*
<!-- 网站顶部 -->
<div class="top_sitebar">
    <div class="grid_auto sitebar_container cf">
        <div class="sitebar_entry fl"><div class="header-info"></div></div>
        <div class="sitebar_topnav fr"></div>
    </div>    
</div>
<!-- 网站顶部 end -->
<!-- 头部 -->
<div class="header">
    <div class="grid_auto header_container cf">
        <!-- 活动专题红包 -->
        <a class="site_logo fl" href="{{context.document_url}}">
        		{{if cms.logoTxt}}<img src="{{cms.logoTxt}}" alt="{{cms.title}}">{{/if}}
        </a>
        <!-- 搜索栏 -->
        <form class="search_contain fl" id="search_contain" action="{{context.document_url}}">
            <input type="hidden" name="action" value="search">
            <div class="cf search_contain_left">
                <div class="search_contain_box fl"><i class="com_search_icon"></i><input type="text" name="q" id="search_info" class="search_info txt_focus" value="" lang="粘贴宝贝标题或输入关键词找优惠券" autocomplete="off" placeholder="粘贴宝贝标题或输入关键词找优惠券" /></div>
                <script></script>
                <input type="submit" class="fr search_btn" value="找优惠" />
                <ul class="search_items" id="search_items"></ul>
            </div>
            <!-- 热搜词 -->
            <div class="hot_search_box cf">
                <ul class="hot_search_list fl" id="hot_search_list">
                    <!-- <li>
                       <a href="/souquan?key=风扇">风扇</a>
                    </li> -->
                </ul>
<!--                 <a class="fr sq_help" href="/souquan/"><i></i><span>找券帮助</span></a>
 -->            </div>
            <!-- /热搜词 -->
        </form>
        <!-- /搜索栏 -->
        <!-- <a class="fr base_download" target="_blank" href="/push"><img src="//i.huim.com/content_new/images/base_download.png" alt=""></a> -->
    </div>
    <!-- 导航 -->
   <div class="site_nav">
	    <div class="grid_auto nav_container">
	        <ul class="navigation fl" id="nav_content">
	            <li><a href="{{context.document_url}}" class="{{if context.arr_query.action=='index'||!context.arr_query.action}}current{{/if}}">首页</a></li>
	            <li><a href="{{context.document_url}}?action=deal" class="{{if context.arr_query.action=='deal'}}current{{/if}}"><em class="ico_site ico_hot"></em>优品汇</a></li>
	            <li>
	                <a href="{{context.document_url}}?action=quan_list" class="{{if context.arr_query.action=='quan_list'&&!context.arr_query.jiu}}current{{/if}}">
	                    直播领券
	                </a>
	            </li>
	            <li><a href="{{context.document_url}}?action=top" class="{{if context.arr_query.action=='top'}}current{{/if}}">超人气榜</a></li>
	            <li><a href="{{context.document_url}}?action=mall" class="{{if context.arr_query.action=='mall'}}current{{/if}}">
	                <em class="ico_site ico_hot"></em>全网商城</a>
	            </li>
	<!--        <li><a href="{{context.document_url}}?action=fuli" class="{{if context.arr_query.action=='fuli'}}current{{/if}}">福利</a></li>
	 -->            <!-- <li style="width:140px; height:38px; margin-top:-6px;margin-left:10px;">
	                <a target="_blank" style="width:140px;height:38px;background:none;" href="{{context.document_url}}?action=quan_list">
	                    <img src="{{context.static_url}}/taoke/template/cms/{{taoke_cms.path}}/images/home_app.png" alt="" />
	                </a>
	            </li> -->
	        </ul>
	    </div>
	</div>
    <!-- 导航 end -->
</div>
<!-- 头部 end -->
    */}).toString().split("\n").slice(1,-1).join("\n")
})