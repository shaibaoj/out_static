<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-dns-prefetch-control" content="on"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta content="telephone=no" name="format-detection"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
        <title>超级返-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
        <meta name="description" content="<?php echo $user_cms['description']; ?>"/>
        <meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
                <link href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/ext/swiper/3.3.1/css/swiper.min.css?v=201702221401" rel="stylesheet">
        <link href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/wap_common.css?v=201702221401" rel="stylesheet">
        <link href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/wapcat.css?v=201702221401" rel="stylesheet"/>
        <script src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/js/jquery.2.0.min.js?v=201702221401"></script>
        <script src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/ext/swiper/3.3.1/js/swiper.jquery.min.js?v=201702221401"></script>
        <script src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/js/lazyload.js?v=201702221401"></script>
        <link href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/s.css?v=201702221401" rel="stylesheet">
        <link rel="stylesheet" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/m/<?php echo $taoke_cms['css']; ?>.css?t=0616002">
        <link rel="stylesheet" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/product.css?t=0616002">

        <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/url.php');?>
        <script>try{document.body.innerHTML=document.body.innerHTML.replace(/\ufeff/g,'');}catch(e){}</script>
    </head>
    <style>
        html {
            background: none
        }
    </style>
<body>
    <?php if(empty($arr_query['cid'])){ ?>
    <div class="main-title clearfix">
        <a href="javascript:void(0)" class="main-back"></a>
        <div class="menu-detail">
            超级返
        </div>
        <a class="mui-action-menu main-home" href="/"></a>
    </div>
    <?php }else{ ?>
    <div class="main-title clearfix">
            <a href="javascript:void(0)" class="main-back"></a>
            <div class="menu-cat">
                <span id="menu-cat-btn"><?php echo $category['short_name']; ?><i></i></span>
            </div>
            <a class="mui-action-menu main-home" href="/"></a>
    </div>
    <?php } ?>
    <!-- 主界面具体展示内容 -->
    <?
    $base_url = $model_url;
    if(!empty($arr_query['q'])){
        if(strstr($base_url,"?")){$base_url = $base_url.'&';}else{$base_url = $base_url.'?';}
        $base_url = $base_url.'q='.$arr_query['q'];
    }
    if(!empty($arr_query['jiu'])){
        if(strstr($base_url,"?")){$base_url = $base_url.'&';}else{$base_url = $base_url.'?';}
        $base_url = $base_url.'jiu='.$arr_query['jiu'];
    }
    if(!empty($arr_query['ershi'])){
        if(strstr($base_url,"?")){$base_url = $base_url.'&';}else{$base_url = $base_url.'?';}
        $base_url = $base_url.'ershi='.$arr_query['ershi'];
    }
    if(!empty($arr_query['tuijian'])){
        if(strstr($base_url,"?")){$base_url = $base_url.'&';}else{$base_url = $base_url.'?';}
        $base_url = $base_url.'tuijian='.$arr_query['tuijian'];
    }

    $sort_url = $base_url;
    if(!empty($arr_query['cid'])){
        if(strstr($sort_url,"?")){$sort_url = $sort_url.'&';}else{$sort_url = $sort_url.'?';}
        $sort_url = $sort_url.'cid='.$arr_query['cid'];
    }
    $volume_order_next ="DESC";
    if($sort=='volume'&&$arr_query['order_next']=='DESC'){
         $volume_order_next ="ASC";
    }
    $price_order_next ="ASC";
    if($sort=='price'&&$arr_query['order_next']=='ASC'){
         $price_order_next ="DESC";
    }
    $coupon_order_next ="ASC";
    if($sort=='coupon'&&$arr_query['order_next']=='ASC'){
         $coupon_order_next ="DESC";
    }
    $coupon_price_order_next ="DESC";
    if($sort=='coupon_price'&&$arr_query['order_next']=='DESC'){
         $coupon_price_order_next ="ASC";
    }
    if(strstr($sort_url,"?")){$sort_url = $sort_url.'&';}else{$sort_url = $sort_url.'?';}
?>
 
    <div class="i_super_mlnavbg">
        <div id="fix-both" class="i_super_nav ui-navigator" style="display: block;">
            <div class="ui-navigator-wrapper" data--iscroll-="iscroll0" style="overflow: hidden;">
                <ul class="ui-navigator-list" style="width: 1536px; transition-property: -webkit-transform; transform-origin: 0px 0px 0px; transform: translate(0px, 0px) translateZ(0px);">
                    <li><a href="<?php echo $model_url; ?>" class="<?php if(empty($arr_query['type_name'])){ ?>cur<?php } ?>" >全部</a></li>
                    <?php
                foreach ($porduct_type_list as $key => $type_item) {
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
                foreach ($porduct_type_list as $key => $type_item) {
                ?>     
                 <li><a href="<?php echo $model_url; ?>&type_name=<?php echo $type_item['name']; ?>" class="<?php if($type_item['name']==urldecode($arr_query['type_name'])){ ?>cur<?php } ?>" ><?php echo $type_item['name']; ?></a></li>
                <?php } ?>    
            </ul>
        </div>
    </div>

    <!-- 主界面具体展示内容 -->
<div class="goods-list">
         
</div>
<div  class="pullup-goods">
    <div class="label">商品加载中...</div>
</div>
<script language="javascript">

    var page = 1;
    var isFinish = false;
    var isLoading = false;
    var $pullUp = null;
    var needLoadMore = false;

    var maxScrollY = 0;
    var windowHeight = 0;
    $(document).ready(function () {
        maxScrollY = $(document).height();
        windowHeight = $(window).height();
        $(window).on('resize', function () {
            windowHeight = $(window).height();
        });
         $(window).scroll(function (e) {
            if (isFinish || isLoading) {
                return;
            }
            var y = $(document).scrollTop();
            maxScrollY = $(document).height();
            windowHeight = $(window).height();
            if (maxScrollY==windowHeight) {
                windowHeight = document.body.clientHeight;
            }
            if (Math.abs(maxScrollY - windowHeight - y) > 100) {
                return;
            }
            var $wrapper = $(this);
            if (!$pullUp) {
                $pullUp = $wrapper.find('.pullup-goods');
            }
            var data = null;
            getData($wrapper, data, 1);
        });

        function getData($wrapper, data, direction) {
            if (isFinish) {
                return;
            }
            isLoading = true;
            if (!$pullUp) {
                $pullUp = $wrapper.find('.pullup-goods');
            }
            var labelTag = $($pullUp).find('.label');
            var tPaht = "//yun.cms.shaibaoj.com/ajax.php";
            $.ajax(tPaht,{
               data: {
                    app_id:'<?php echo $app_id; ?>',
                    documentUrl:'<?php echo $model_base_url; ?>',
                    type_name:'<?php echo urldecode($arr_query['type_name']) /*iconv("utf-8","gb2312//IGNORE",$arr_query['type_name'])*/; ?>',
                    action:'product_list',
                    ajax: '1', ipage: page
                },
                dataType: 'jsonp',
                type: 'get',
                error: function (xhr, type, errorThrown) {
                    getData($wrapper, data, direction);
                },
                success: function (result, status, xhr) {
                    needLoadMore = false;
                    if (result.result.map.status == 0) {
                        // if(result.data.pageStatus === false){
                        //     isLoading = false;
                        //     $('.pullup-goods .label').html('没有更多商品啦');
                        //     isFinish = true;
                        // }
                        $('.goods-list').append(result.result.map.content);
//                        myScroll.refresh();
                        $("img.lazy").lazyload();
                        aClick();
                        maxScrollY = $(document).height();
                        isLoading = false;
                        page++;
                        $('.goods-list').attr('data-page',page);
                        //$(labelTag).html('上拉加载更多商品');
                    } else {
//                        myScroll.refresh();
                        maxScrollY = $(document).height();
                        isLoading = false;
                        $(labelTag).html('没有更多商品啦');
                        isFinish = true;
                    }
                }
            });
        }
        getData($(window), null, 1);
    });
$("img.lazy").lazyload();
</script>

<div class="toTop">&#xe601;</div>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/cat.php');?>     
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/menu.php');?>     
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
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