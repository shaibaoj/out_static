<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-dns-prefetch-control" content="on"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta content="telephone=no" name="format-detection"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
        <title>个人中心-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
        <meta name="description" content="<?php echo $user_cms['description']; ?>"/>
        <meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
                <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
<link href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/wapshow.css?v=201702221401" rel="stylesheet"/>
    <script src="//cdn.bootcss.com/amazeui/2.7.2/js/amazeui.min.js"></script>
    <link href="//cdn.bootcss.com/amazeui/2.7.2/css/amazeui.min.css" rel="stylesheet">
<link rel="stylesheet" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/m/<?php echo $taoke_cms['css']; ?>.css?t=0616002">
    </head>
<body>
<div class="main-title clearfix">
    <a href="javascript:void(0)" class="main-back"></a>
    <div class="menu-detail">积分中心</div>
    <a class="mui-action-menu main-more" href="javascript:void(0)" id="mui-action-menu"></a>
</div>

<div class="main">
    <div class="app">
        <div class="userBox">
            <!-- 新增我的订单入口 -->
            <div class="userItem">
                <a href="#">
                    <em class="iconfont icon-daifukuan"></em><span>预计总积分:<em id="member_points"></em>个</span>                   
                </a>
                <a href="#">
                    <em class="iconfont icon-daifahuo"></em><span>可用积分:<em id="member_points_available"></em>个</span>                    
                </a>
            </div>
            <div class="activate-show coupon-active">
                <div class="activate-box">
                    <input type="text" autocomplete="off" placeholder="输入要兑换的积分数" x-webkit-speech="" name="activate_code" id="point-code" class="activate-key normalInput">
                </div>
                <p class="wap-tips err" style="display: none;"></p>
                <a class="activate-btn active exchange-btn" href="javascript:void(0);" id="act_btn">兑换积分</a>
            </div>
            <ul id="member_list"></ul>
            <input id="member_point" type="hidden" />
        </div>
        <div id="foot">
            <!-- <div class="foot-nav">
                <a href="#">返回首页</a>
                <a href="javascript:void(0);" class="joa_load_app">客户端</a>
                <a href="#" id="pcJuanpi">电脑版</a>
            </div> -->
            <div class="cut-line"></div>
            <div class="foot-copyright"></div>
            <h2>copyright © </h2>
        </div>
    </div>
</div>

<div class="toTop">&#xe601;</div>
<nav id="detail-top-menu">
    <div class="arrow"></div>
    <div class="mask show" id="menu-mask"></div>
    <div class="detail-menu-content">
        <ul class="main-detail">
            <li>
                <a href="<?php echo $model_base_url; ?>">首页</a>
            </li>
            <!-- <li>
                <a href="/index.php?r=index/classify">搜索/分类</a>
            </li>
            <li>
                <a href="/index.php?r=index/customService">客服</a>
            </li> -->
        </ul>
    </div>
</nav>
<div class="toTop">&#xe601;</div>   
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/function.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
<script type="text/javascript">
function hideDetail(){
    $('#detail-top-menu').removeClass('show');
}
$('body').click(function(e){
    if($('#detail-top-menu').hasClass('show')){
        hideDetail();
    }else{
        if(e.target.id == "mui-action-menu"){

            $('#detail-top-menu').addClass('show');
        }
    }
});
</script>
</body>
</html>