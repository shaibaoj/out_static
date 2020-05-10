define(function() {
    return (function(){/*
<!-- 页脚 -->
<div class="footer">
    <div class="grid_auto footer_container">
        <div class="footer_item cf">
            <dl>
                <dt>关于我们</dt>
            </dl>
            <dl>
                <dt>联系我们</dt>
                {{if cms.qq}}
                <dd><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin={{cms.qq}}&site=qq&menu=yes">联系我们</a></dd>
                {{/if}}
            </dl>
            <dl>
                <dt>网站地图</dt>
            </dl>
            <dl>
                <dt>实时推送</dt>
            </dl>
            <div class="site_m fr">
                <!-- <dl>
                    <dt>手机客户端</dt>
                    <dd><a target="_blank" href="{{context.document_url}}?action=app"><img src="" alt="{{context.document_url}}" /></a></dd>
                    <dd>{{context.document_url}}</dd>
                </dl> -->
            </div>
        </div>
        <div class="site_copy">
            <p class="copyright">版权所有，未经书面许可，禁止一切形式的转载；&copy2015-2017 {{cms.siteName}}, All Rights Reserved.</p>
            <div class="footer_trust cf">
                {{cms.beianhao}}
            </div>
            <div class="you_lian"></div>
        </div>
    </div>
</div>
<!-- 页脚 end -->
    */}).toString().split("\n").slice(1,-1).join("\n")
})