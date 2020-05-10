define(function() {
    return (function(){/*
<!-- 主内容 -->
<div class="container grid_auto">
    <div class="miaoquan_area">
        <div class="miaoquan_title cf">
            <h4>全网商城</h4>
        </div>
        <div class="miaoquan_items cf">
            <div id="main" class="clearfix">
            
			    <div class="box-nav-site clearfix" id="J_nav_site">
			        <!-- 左侧 分类 -->
			        <div class="tit">
			            <ul>
						  <li {{if context.arr_query.type_name}}class="cur"{{/if}}><a href="{{context.document_url}}?action=mall&cid=">全部</a></li>
 				{{each mall_type_list as value i}}
                 <li {{if value.name==context.arr_query.type_name}}class="cur"{{/if}}><a href="{{context.document_url}}?action=mall&type_name={{value.name}}">{{value.name}}</a></li>
				{{/each}}
			            </ul>
			        </div>
			        <div class="con">
			            <div class="mall-pane" style="margin-bottom: 5px;display:block;">
			                <!-- list-mall 商城 -->
			                <div class="list-mall" id="list_malls_v" style="z-index: 1;">
			                    <ul class="clearfix">
								{{each list as value i}}
			                        <li class="" style="z-index: 1;">
			                        	<a href="{{value.click_url}}" data-url="http://{{value.domain_url}}"  data-mallid="{{value.id}}" data-uid="{{cms.user_id}}" data-pid="{{cms.app_id}}" data-aid="{{context.agent_id}}" target="_blank" class="link-mall mall-click">
			                                <img src="{{value.pic_url}}" alt="{{value.sitename}}">
			                                <span class="info">
			                                	{{value.sitename}}<em></em><span></span>
			                                </span>
			                            </a>
			                            <a href="{{value.click_url}}" data-url="http://{{value.domain_url}}"  data-mallid="{{value.id}}" data-uid="{{cms.user_id}}" data-pid="{{cms.app_id}}" data-aid="{{context.agent_id}}" class="btn btn-1-25 mall-click" target="_blank"><span>购物拿返利<i></i></span></a>
			                        </li>
								{{/each}}
			                    </ul>
			                </div>
			            </div>
					</div>            
		        </div>
		        
		    </div>
        </div>
    </div>
</div>
<div id="site_loading" class="show-more-btn loading_area" style="display: none;" data-goods="common" data-type-name="{{context.arr_query.type_name}}" data-f="0" data-pagenum="1" data-pageindex="0" data-time=""> </div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})