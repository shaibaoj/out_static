
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
        
<div class="index-wrapper">
    <div class="swiper-container" style="width: 100%;">
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
        <div class="swiper-pagination"></div>
    </div>
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
    <div class="icon-link-wrapper">
        <ul class="icon-url-list clearfix">
            <?php if($user_cms_data['mall_all']==1){ ?>
            <li class="icon-mall">
                <a href="<?php echo $model_base_url; ?>?action=mall" >
                    <i></i>
                    <span>全网购</span>
                </a>
            </li>
            <style type="text/css">
            .index-wrapper .icon-link-wrapper .icon-url-list li {width: 20%;}
            </style>
            <?php } ?>
            <li class="icon-99by">
                <a href="<?php echo $model_base_url; ?>?action=product_list&jiu=1" >
                    <i></i>
                    <span>9.9包邮</span>
                </a>
            </li>
            <!-- <li class="icon-rqb">
                <a href="<?php echo $model_base_url; ?>?action=top" >
                    <i></i>
                    <span>超级人气榜</span>
                </a>
            </li> -->
            <li class="icon-xblj">
                <a href="<?php echo $model_base_url; ?>?action=product_list&tuijian=1" >
                    <i></i>
                    <span>小编力荐</span>
                </a>
            </li>
            <li class="icon-jpsf">
                <a href="<?php echo $model_base_url; ?>?action=product_list&cid=家居家纺" >
                    <i></i>
                    <span>居家日用</span>
                </a>
            </li>

        </ul>
    </div>
</div>
<div class="you-wrapper clearfix">
    <div class="title-wrapper fl"></div>
    <div class="text fl">
        <span class="mui-badge mui-badge-blue main-badge"><?php echo $count; ?></span>
    </div>
</div>
<div class="goods-list" data-page="1"></div>
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
        var mySwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            loop: true,
            autoplay: 2500
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

        getData($("body"), null, 1);
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
                // data: {r: 'index/ajax', page: page},
                data: {
                    app_id:'<?php echo $app_id; ?>',
                    documentUrl:'<?php echo $model_base_url; ?>',
                    ajax: '1',
                    action:'product_list',
                    ipage: page
                },
                // dataType: 'json',
                type: 'get',
                dataType: 'jsonp',
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
                        // myScroll.refresh();
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

                    // if (result.result.map.status == 0) {
                    //     $('.goods-list').append(result.result.map.content);
                    //     maxScrollY = $(document).height();
                    //     isLoading = false;
                    //     page++;
                    // } else {
                    //     maxScrollY = $(document).height();
                    //     isLoading = false;
                    //     $(labelTag).html('没有更多商品啦');
                    //     isFinish = true;
                    // }

                }
            });
        }
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