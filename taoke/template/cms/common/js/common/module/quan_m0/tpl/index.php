<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="x-dns-prefetch-control" content="on"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta content="telephone=no" name="format-detection"/>
<meta name="full-screen" content="yes"/>
<meta name="x5-fullscreen" content="true"/>
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>

<title><?php echo $cms_title; ?></title><!--网站标题-->
<meta name="description" content="<?php echo $user_cms['description']; ?>"/>
<meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
</head>
<body>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/top.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header-banner.php');?>

<div class="index-wrapper">
<div class="title-wrapper">
专注优惠精选
<span class="update">每天9点直播更新</span>
</div>
<div class="swiper-container" style="width: 100%;">
<div class="swiper-wrapper">

<?php
        foreach ($cms_user_haibao_arr as $key => $taoke_haibao_item) {
    ?>     
<div class="swiper-slide"><a rel="external" href="<?php if(!empty($taoke_haibao_item['num_iid'])){ echo $model_base_url.'?action=quan&id='.$taoke_haibao_item['num_iid']; }else{ if($taoke_haibao_item['custom']==1){ echo $taoke_haibao_item['href']; }else{ echo $model_base_url.$taoke_haibao_item['href']; } } ?>" class="cnzzCounter" data-cnzz-type="51" data-cnzz="<?php echo $taoke_haibao_item['id']; ?>">
	<img style="width: 100%;" src="<?php echo $taoke_haibao_item['img']; ?>"/></a>
</div>
 <?php }  ?>  

</div>

</div>
<div class="icon-link-wrapper">
<ul class="icon-url-list clearfix">
<li class="icon-meishi">
<a rel="external" href="<?php echo $model_base_url; ?>?action=quan_list&cid=6" target="_blank" class="cnzzCounter" data-cnzz-type="51" data-cnzz="6">
<img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/icon-meishi.png" alt="">
<span>好吃货</span>
</a>
</li>
<li class="icon-99">
<a rel="external" href="<?php echo $model_base_url; ?>?action=quan_list&jiu=1" class="cnzzCounter" data-cnzz-type="51" data-cnzz="919">
<img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/icon-99.png" alt="">
<span>9.9包邮</span>
</a>
</li>
<li class="icon-recommend">
<a rel="external" href="<?php echo $model_base_url; ?>?action=quan_list&tuijian=1" class="cnzzCounter" data-cnzz-type="51" data-cnzz="921">
<img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/icon-recommend.png" alt="">
<span>小编力荐</span>
</a>
</li>
<li class="icon-jujia">
<a rel="external" href="<?php echo $model_base_url; ?>?action=quan_list&cid=4" class="cnzzCounter" data-cnzz-type="51" data-cnzz="4">
<img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/icon-jujiao.png" alt="">
<span>居家日用</span>
</a>
</li>
</ul>
</div>
</div>
<div class="you-wrapper">
    <div class="title-wrapper">
        <div class="text">
            <span class="index" style="padding-top: 3px;line-height: 21px;">领券优惠直播</span>
            <span class="mui-badge mui-badge-blue main-badge" style="font-size: 14px;padding: 3px 4px;border-radius: 15px; left: 135px; top:2px;"><?php echo $count; ?></span>
        </div>
    </div>
</div>
<div class="goods-list">
<?php $coupon_goods_list = $coupon_goods_list_old; $page_model = 'quan_list'; ?>    
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>
</div>
<div style="height: 50px;display: block;line-height: 50px;color: #565656;text-align: center;background-color: #fff;" class="pullup-goods">
    <div class="label">商品加载中...</div>
</div>
<script language="javascript">
    var page = 2;
    var isFinish = false;
    var isLoading = false;
    var $pullUp = null;
    var needLoadMore = false;

    var maxScrollY = 0;
    var windowHeight = 0;

    $(document).ready(function () {

        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: 2500
        });

        maxScrollY = $(document).height();
        windowHeight = $(window).height();
        $(window).on('resize', function () {
            windowHeight = $(window).height();
        });
        $(document).on("scrollstop", function (e) {
            if (isFinish || isLoading) {
                return;
            }
            var y = $(document).scrollTop();
            maxScrollY = $(document).height();
            windowHeight = $(window).height();
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
                    ajax: '1', ipage: page},
                dataType: 'jsonp',
                // type: 'post',
                error: function (xhr, type, errorThrown) {
                    getData($wrapper, data, direction);
                },
                success: function (result, status, xhr) {
                    needLoadMore = false;
                    if (result.result.map.status == 0) {
                        $('.goods-list').append(result.result.map.content);
                        maxScrollY = $(document).height();
                        isLoading = false;
                        page++;
                    } else {
                        maxScrollY = $(document).height();
                        isLoading = false;
                        $(labelTag).html('没有更多商品啦');
                        isFinish = true;
                    }
                }
            });
        }
    });
</script>
</div>
</div>

<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>

</body>
</html>