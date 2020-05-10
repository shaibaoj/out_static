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
    <div class="menu-detail">个人中心</div>
    <a class="mui-action-menu main-more" href="javascript:void(0)" id="mui-action-menu"></a>
</div>

<div class="main">
    <div class="app">
        <div class="userCenter">
            <header id="head">
                <div class="user-box-person">
                    <a class="user" href="<?php echo $model_base_url; ?>?action=member&to_page=order">
                        <p id="member_user_name" class="tel"></p>
                    </a>
                    <span class="iconfont icon-liebiaojiantou"></span>
                </div>
            </header>
        </div>
        <div class="userBox">
            <!-- 新增我的订单入口 -->
            <div class="userItem">
                <a href="#">
                    <em class="iconfont icon-daifukuan"></em><span>总金额:<em id="member_money"></em>元</span>                   
                </a>
                <a href="#">
                    <em class="iconfont icon-daifahuo"></em><span>可用金额:<em id="member_money_available"></em>元</span>                    
                </a>
                <a href="#">
                    <em class="iconfont icon-daishouhuo"></em><span>积分:<em id="member_points"></em>个</span>                  
                </a>
            </div>
            <div class="activate-show coupon-active">
                <div class="activate-box">
                    <input type="text" autocomplete="off" placeholder="请输入淘宝、天猫订单号,其他订单自动同步，不需要输入" x-webkit-speech="" name="activate_code" id="activate-code" class="activate-key normalInput">
                </div>
                <p class="wap-tips err" style="display: none;"></p>
                <a class="activate-btn active tb-btn" href="javascript:void(0);" id="act_btn">晒订单，拿奖励</a>
            </div>

            <a href="<?php echo $model_base_url; ?>?action=member&to_page=order" class="user-item-horizontal">
                <span>订单中心</span>
                <span class="iconfont icon-liebiaojiantou fr"></span>
                <span class="label fr">全部订单</span>
            </a>
            <div class="userItems">
                <a href="<?php echo $model_base_url; ?>?action=member&to_page=point" class="user-item-horizontal">
                    <span>我的积分</span>
                    <span class="iconfont icon-liebiaojiantou fr"></span>
                </a>
                <a href="<?php echo $model_base_url; ?>?action=member&to_page=cash" id="wallet" data-mobile="" class="user-item-horizontal no-bottom">
                    <span>提现记录</span>
                    <span class="iconfont icon-liebiaojiantou fr"></span>
                    <span class="label fr" id="member_money_available_span">0.00元</span>
                </a>
            </div>
            <div class="userItems">
                <a href="<?php echo $model_base_url; ?>?action=member&to_page=setting" class="user-item-horizontal">
                    <span>个人设置</span>
                    <span class="iconfont icon-liebiaojiantou fr"></span>
                </a>
                <a href="<?php echo $model_base_url; ?>?action=member&to_page=passwd" class="user-item-horizontal">
                    <span>密码设置</span>
                    <span class="iconfont icon-liebiaojiantou fr"></span>
                </a>
                <a href="#" id="btn_logout" class="user-item-horizontal no-bottom">
                    <span>退出登录</span>
                    <span class="iconfont icon-liebiaojiantou fr"></span>
                </a>
            </div>
            <input id="member_home" type="hidden" />
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
    // $('html').removeClass('no-scroll');
    // $('body').removeClass('no-scroll');
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