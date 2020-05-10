
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

        <div class="i_super_mlnavbg">
                <div id="fix-both" class="i_super_nav ui-navigator" style="display: block;">
                    <div class="ui-navigator-wrapper" data--iscroll-="iscroll0" style="overflow: hidden;">
                        <ul class="ui-navigator-list" style="width: 1536px; transition-property: -webkit-transform; transform-origin: 0px 0px 0px; transform: translate(0px, 0px) translateZ(0px);">
                            <li><a href="<?php echo $model_url; ?>" class="<?php if(empty($arr_query['type_name'])){ ?>cur<?php } ?>" >全部</a></li>
                            <?php
                        foreach ($mall_type_list as $key => $type_item) {
                        ?>     
                         <li><a href="<?php echo $model_url; ?>&type_name=<?php echo $type_item['name']; ?>" class="<?php if($type_item['name']==urldecode($arr_query['type_name'])){ ?>cur<?php } ?>" ><?php echo $type_item['name']; ?></a></li>

                        <?php } ?>                            
                        </ul>
                    </div>
                </div>
                <script type="text/javascript">
                    // (function () {
                    //     /*组件初始化js begin*/
                    //     $('#fix-both').navigator({     //左右都有fix元素
                    //         isScrollToNext: false,      //出现半个tab时，不跳动到下一个tab
                    //         isShowShadow: false       //不显示左右阴影
                    //     });
                    // })();
                </script>
                <div class="i_super_mlnav_name" style="display: none;">切换分类</div>
                <div class="nav_icon_bg"><a href="javascript:void(0);" onmousedown="Oshow()" id="nav_icon" class="nav_icon"></a></div>
                <div class="i_super_mlnav_bg1" style="display: none;">
                    <ul class="i_super_mlnav" id="i_super_mlnav" style="top: -10rem;">
                        <li><a href="<?php echo $model_url; ?>" class="<?php if(empty($arr_query['type_name'])){ ?>cur<?php } ?>" >全部</a></li>
                            <?php
                        foreach ($mall_type_list as $key => $type_item) {
                        ?>     
                         <li><a href="<?php echo $model_url; ?>&type_name=<?php echo $type_item['name']; ?>" class="<?php if($type_item['name']==urldecode($arr_query['type_name'])){ ?>cur<?php } ?>" ><?php echo $type_item['name']; ?></a></li>
                        <?php } ?>    
                    </ul>
                </div>
            </div>

<div class="fx_list">
        <ul>
              <?php
                    foreach ($mall_list as $key => $mall_item) {
                    ?>     
            <li><a href="<?php echo CPS::query_common_url($mall_item['domain_url'],$mall_item['id'],$user_cms['user_id'],$user_cms['app_id'],$agent_id,0); ?>" data-url="http://<?php echo $mall_item['domain_url']; ?>"  data-mallid="<?php echo $mall_item['id']; ?>" data-uid="<?php echo $user_cms['user_id']; ?>" data-pid="<?php echo $user_cms['app_id']; ?>" data-aid="<?php echo $agent_id; ?>" class="mall-click">
                <img src="<?php echo $mall_item['pic_url']; ?>"><span><?php echo $mall_item['sitename']; ?></span></a></li>
         <?php } ?>
    </ul>
    <div class="clear"></div>
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
