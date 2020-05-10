
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-dns-prefetch-control" content="on"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta content="telephone=no" name="format-detection"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
        <title><?php echo $cms_title; ?></title>
        <meta name="description" content="<?php echo $user_cms['description']; ?>"/>
        <meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
        <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
        <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
        <link rel="stylesheet" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/m/<?php echo $taoke_cms['css']; ?>.css?t=0616002">
    </head>
    <body>
    <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/top.php');?>
    <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>
    <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header-banner.php');?> 
        
<div class="index-wrapper index-img">
    <div class="swiper-container swiper-container-img" style="width: 100%;">
        <div class="swiper-wrapper">
        <?php
            foreach ($cms_user_haibao_arr as $key => $taoke_haibao_item) {
            ?>  
        <div class="swiper-slide">
            <a href="<?php if(!empty($taoke_haibao_item['num_iid'])){ echo $model_base_url.'?action=quan&id='.$taoke_haibao_item['num_iid']; }else{ if($taoke_haibao_item['custom']==1){ echo $taoke_haibao_item['href']; }else{ echo $model_base_url.$taoke_haibao_item['href']; } } ?>" >
                <img style="width: 100%;" src="<?php echo $taoke_haibao_item['img']; ?>"/>
            </a>
        </div>
         <?php }  ?>  
        </div>
        <div class="swiper-pagination swiper-pagination-img"></div>
    </div>
    
    <div class="icon-link-wrapper">
        <ul class="icon-url-list clearfix">
            <li class="icon-product">
                <a href="<?php echo $model_base_url; ?>?action=product_list" >
                    <i></i>
                    <span>超级返</span>
                </a>
            </li>
            <?php if($user_cms_data['mall_all']==1){ ?>
            <li class="icon-mall">
                <a href="<?php echo $model_base_url; ?>?action=mall" >
                    <i></i>
                    <span>全网返利</span>
                </a>
            </li>
            <style type="text/css">
            .index-wrapper .icon-link-wrapper .icon-url-list li {width: 20%;}
            </style>
            <?php } ?>
            <li class="icon-99by">
                <a href="<?php echo $model_base_url; ?>?action=quan_list" >
                    <i></i>
                    <span>领券直播</span>
                </a>
            </li>
            <li class="icon-rqb">
                <a href="<?php echo $model_base_url; ?>?action=top" >
                    <i></i>
                    <span>超级人气榜</span>
                </a>
            </li>
            <li class="icon-member">
                <a href="<?php echo $model_base_url; ?>?action=member" >
                    <i></i>
                    <span>个人中心</span>
                </a>
            </li>
        </ul>
    </div>
</div>

<section class="malls_index index-mall">
    <h2 class="index-title">
        返利商城
        <a href="<?php echo $model_base_url; ?>?action=mall" class="more">
            更多商城
            <span class="icon-rightarrow"></span>
        </a>
    </h2>
    <div class="swiper-container swiper-container-mall" style="width: 100%;">
        <div class="swiper-wrapper">
        <?php
            $mall_count_i = 0;
            foreach ($mall_list as $key => $mall_item) {
                $mall_count_i = $mall_count_i +1;
                if($mall_count_i>4){
                    $mall_count_i = 1;
                }
            ?>  
            <?php if($mall_count_i==1){ ?>
        <div class="swiper-slide" data-role="item">
            <ul>
            <?php } ?>
                <li class="rebate-mall-buy" >
                    <a href="<?php echo $model_base_url; ?>?action=mall_item&id=<?php echo $mall_item['id']; ?>">
                    <img width="66" src="<?php echo $mall_item['pic_url']; ?>" alt="<?php echo $mall_item['sitename']; ?>">
                    <?php if(!empty($mall_item['commission_rate'])){ ?><span>最高返现<i><?php echo $mall_item['commission_rate']; ?></i></span><?php } ?>
                </a>
                </li>
            <?php if($mall_count_i==4){ ?>    
            </ul>    
        </div>
        <?php } ?>
         <?php }  ?>  
        </div>
        <div class="swiper-pagination swiper-pagination-mall"></div>
    </div>

</section>

<script>
        (function(){
            window.onresize = function(){
                $('.swiper-slide').height($('.swiper-container').width()/414*173);
                $('.swiper-container').height($('.swiper-container').width()/414*173);
            }
            $('.swiper-slide').height($('.swiper-container').width()/414*173);
            $('.swiper-container').height($('.swiper-container').width()/414*173);
        })()
    </script>
    <style>
        .swiper-pagination{
            position:absolute;
            text-align:center;
            -webkit-transition:.3s;
            -moz-transition:.3s;
            -o-transition:.3s;
            transition:.3s;
            -webkit-transform:translate3d(0,0,0);
            -ms-transform:translate3d(0,0,0);
            -o-transform:translate3d(0,0,0);
            transform:translate3d(0,0,0);
            z-index:10
        }
        .swiper-pagination-bullet{
            width:8px;
            height:8px;
            display:inline-block;
            border-radius:100%;
            background:#000;
            opacity:.1
        }
        .swiper-pagination-bullet-active{
            width:6px;
            height:6px;
            opacity:1;
            background:white;
            border: #000 1px solid;
            opacity:.1
        }
    </style>

<section class="index-activity">
    <div class="activity-show">
        <a class="spread-left goto-click" href="<?php echo $model_base_url; ?>?action=quan_list&jiu=1" >
            <img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/index/99.jpg">
        </a>
        <div class="activity-right">
            <a class="goto-click" href="<?php echo $model_base_url; ?>?action=product_list" >
                <img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/index/fan.jpg">
            </a>
            <a class="goto-click" href="<?php echo $model_base_url; ?>?action=quan_list&jiu=1">
                <img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/index/deal.jpg">
            </a>
        </div>
    </div>
</section>

<div class="i_super_name">
    <em class="symol"></em>
    <span class="name">超级返</span>
    <span class="word">/ 每日10点上新  100%正品</span>
    <span class="more">
        <a href="<?php echo $model_base_url; ?>?action=product_list">前往<em></em></a>
    </span>
</div>

<div class="you-wrapper clearfix" style="display:none">
    <div class="title-wrapper fl"></div>
    <div class="text fl">
        <span class="mui-badge mui-badge-blue main-badge"><?php echo $count; ?></span>
    </div>
</div>
<div class="goods-list" data-page="2">
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/product1.php');?>
</div>
<div class="pullup-goods">
    <div class="label">商品加载中...</div>
</div>
<script language="javascript">
    if(window.history.state){
        $('.goods-list').html(window.history.state.list);
        var page = window.history.state.page;
    }else{
        var page = 1;
    }

    var isFinish = false;
    var isLoading = false;
    var $pullUp = null;
    var needLoadMore = false;
    var maxScrollY = 0;
    var windowHeight = 0;
    $(document).ready(function () {

        var mySwiper = new Swiper('.index-img .swiper-container', {
            pagination: '.index-img .swiper-pagination',
            loop: true,
            autoplay: 2500
        });

        var mySwiper1 = new Swiper('.index-mall .swiper-container', {
            pagination: '.index-mall .swiper-pagination',
            // loop: true,
            // autoplay: 2500
        });

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
            $.ajax(tPaht, {
                data: {
                    app_id:'<?php echo $app_id; ?>',
                    documentUrl:'<?php echo $model_base_url; ?>',
                    action:'quan_list',
                    ajax: '1',
                    ipage: page
                },
                type: 'get',
                dataType: 'jsonp',
                error: function (xhr, type, errorThrown) {
                    getData($wrapper, data, direction);
                },
                success: function (result, status, xhr) {
                    needLoadMore = false;
                    if (result.result.map.status == 0) {
                        $('.goods-list').append(result.result.map.content);
                        // myScroll.refresh();
                        $("img.lazy").lazyload();
                        aClick();
                        maxScrollY = $(document).height();
                        isLoading = false;
                        page++;
                        $('.goods-list').attr('data-page',page);
                    } else {
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
<?
    $base_url = $model_base_url;
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

    $cate_url = $base_url;
    if(!empty($arr_query['sort'])){
        if(strstr($cate_url,"?")){$cate_url = $cate_url.'&';}else{$cate_url = $cate_url.'?';}
        $cate_url = $cate_url.'sort='.$arr_query['sort'];
    }
    if(!empty($arr_query['order_next'])){
        if(strstr($cate_url,"?")){$cate_url = $cate_url.'&';}else{$cate_url = $cate_url.'?';}
        $cate_url = $cate_url.'order_next='.$arr_query['order_next'];
    }
    if(strstr($cate_url,"?")){$cate_url = $cate_url.'&';}else{$cate_url = $cate_url.'?';}
?>
<nav id="show-top-menu">
    <div class="mask" id="menu-mask"></div>
    <div class="menu-content">
        <ul class="main-cat">
            <?php
            foreach ($taoke_cms_category_list as $key => $category_item) {
            ?>     
            <li class="cat-item mm-nolistview">
                <a rel="external" href="<?php echo $model_base_url; ?>?action=quan_list&cid=<?php echo $category_item['c_id']; ?>"><?php echo $category_item['short_name']; ?></a>
            </li>
            <?php } ?> 
        </ul>
        <span class="up-menu">收起分类</span>
    </div>
</nav>

<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/menu.php');?>     
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>     
</body>
</html>