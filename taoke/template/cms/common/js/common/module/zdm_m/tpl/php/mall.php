
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-dns-prefetch-control" content="on"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta content="telephone=no" name="format-detection"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
        <title>全网商城-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
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
        <link rel="stylesheet" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/mall.css?t=0616002">
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
        <span>全网购</span>
    </div>
    <a class="mui-action-menu main-home" href="<?php echo $model_base_url; ?>"></a>
</div>

<div class=" mall-index">
    <!-- <div class="header-top">
        <section id="search" style="top: 44px;">
            <div class="box-search">
                <input id="search-text" type="text" value="输入商城名称搜索" style="color: rgb(197, 197, 197);">
                <span class="icon-search"></span>
            <div class="cancel hide">
                <span>取消</span>
            </div>
            </div>
        </section>
    </div> -->

    <section id="list">
        <div class="wrapper">
            <div class="type-wrapper">
                <div class="type-list">
                
                    <div data-type="2" data-val="0" data-index="0" class="type-item <?php if(empty($arr_query['type_name'])){ ?>selected<?php } ?>" data-show="1">
                        <span><a href="<?php echo $model_url; ?>">推荐商城</a></span>
                    </div>
                    <?php
                    foreach ($mall_type_list as $key => $type_item) {
                    ?>     
                    <div data-type="2" data-val="6" data-index="1" class="type-item <?php if($type_item['name']==urldecode($arr_query['type_name'])){ ?>selected<?php } ?>" data-show="1"><span><a href="<?php echo $model_url; ?>&type_name=<?php echo $type_item['name']; ?>"><?php echo $type_item['name']; ?></a></span></div>
                    <?php } ?>                        
                </div>
            </div>
            <div class="malls-box">
                <div class="malls-wrapper">
                    <div class="malls-list">
                        <?php
                            foreach ($mall_list as $key => $mall_item) {
                        ?>    
                        <a href="<?php echo $model_base_url; ?>?action=mall_item&id=<?php echo $mall_item['id']; ?>" >
                            <div class="malls-item">
                                <img class="mall-logo" src="<?php echo $mall_item['pic_url']; ?>">
                                <span class="mall-name"><?php echo $mall_item['sitename']; ?></span>
                                <span class="mall-rate">
                                    <?php if(!empty($mall_item['commission_rate'])){ ?>
                                    最高<?php echo $mall_item['commission_rate']; ?>
                                    <?php } ?>
                                </span>
                            </div>
                        </a>
                         <?php } ?>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>

</div>

<div class="toTop">&#xe601;</div>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/cat.php');?>  
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/menu.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
<script language="javascript">
$("img.lazy").lazyload();
</script>
<script>
function Ohide(){
        $('#nav_icon').removeClass("nav_icon1");
        $('.i_super_nav').show();
        $('.i_super_mlnav_name').hide();
        $('#i_super_mlnav').animate({ top: "-10rem",}, 500); 
        $('.i_super_mlnav_bg1').delay(500).hide(0);
        }
    function Oshow(){
        oNavicon=$('#nav_icon').attr('class');
        if(oNavicon.indexOf("nav_icon1")==-1){
            $('#nav_icon').addClass("nav_icon1");
            $('.i_super_nav').hide();
            $('.i_super_mlnav_name').show();
            $('.i_super_mlnav_bg1').show(); 
            $('#i_super_mlnav').animate({ top: "0",}, 500);
             }
        else{
            Ohide();
        }
    }

    
var swiper = new Swiper('.ui-navigator-wrapper', {
    // pagination: '.swiper-pagination',
    paginationClickable: true,
    slidesPerView: 5,
    spaceBetween: 50,
    breakpoints: {
        1024: {
            slidesPerView: 4,
            spaceBetween: 40
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 10
        }
    }
});
</script>
</body>
</html>
