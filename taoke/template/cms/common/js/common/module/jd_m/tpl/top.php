
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-dns-prefetch-control" content="on"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta content="telephone=no" name="format-detection"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
        <title>超级人气榜-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
        <meta name="description" content="<?php echo $user_cms['description']; ?>"/>
        <meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
        <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
        <link href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/ext/swiper/3.3.1/css/swiper.min.css?v=201702221401" rel="stylesheet">
        <link href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/wap_common.css?v=201702221401" rel="stylesheet">
        <script src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/js/jquery.2.0.min.js?v=201702221401"></script>
        <script src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/ext/swiper/3.3.1/js/swiper.jquery.min.js?v=201702221401"></script>
        <script src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/js/lazyload.js?v=201702221401"></script>
        <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/url.php');?>
        <script>try{document.body.innerHTML=document.body.innerHTML.replace(/\ufeff/g,'');}catch(e){}</script>
        <link rel="stylesheet" type="text/css" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/wapcat.css?v=09181" />
        <link rel="stylesheet" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/m/<?php echo $taoke_cms['css']; ?>.css?t=0616002">
</head>
    <style>
        html {
            background: none
        }
    </style>
<body>
        <div class="main-title clearfix">
            <a href="javascript:void(0)" class="main-back"></a>
            <div class="menu-detail">
                <span>超级人气榜</span>
            </div>
            <a class="mui-action-menu main-home" href="<?php echo $model_base_url; ?>"></a>
        </div>
        <!-- 主界面具体展示内容 -->
        <style>
    .you-wrapper {
    border: 0;
    margin-top: 50px;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    }
    .you-wrapper .title-wrapper {
    padding: 0.2em 0.2em 0.2em 0.7em;
    }
    .you-wrapper .title-wrapper .text {
    color: #363535;
    border-left: 0.2em solid #ed145b;
    line-height: 1.4em;
    margin: 0.4em 0;
    padding-left: 0.5em;
    font-weight: bolder;
    position: relative;
    }
    .you-wrapper .title-wrapper .text .index {
    display: block;
    padding-top: 2px;
    line-height: 24px;
    }
    .you-wrapper .title-wrapper .main-badge {
    background-color: #7ad3c1;
    font-weight: normal;
    position: absolute;
    left: 139px;
    top: 3px;
    }
</style>
<div class="you-wrapper">
    <div class="title-wrapper">
        <div class="text">TOP100销量榜&nbsp;-&nbsp;实时更新&nbsp;随时关注</div>
    </div>
</div>
<div class="goods-list">
      <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>      
</div>

<div class="toTop">&#xe601;</div>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/cat.php');?>  
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/menu.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
<script language="javascript">
$("img.lazy").lazyload();
</script>
</body>
</html>
