
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
<title>特卖精选-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
<meta name="description" content="<?php echo $user_cms['description']; ?>"/>
<meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
<link rel="stylesheet" type="text/css" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/JinXuan.css?v=09181" />
<link rel="stylesheet" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/m/<?php echo $taoke_cms['css']; ?>.css?t=0616002">
</head>
<body>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/top.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>

<div class="you-wrapper">
<div class="title-wrapper">
<div class="text">用心精选&nbsp;&nbsp;每天更新百款</div>
</div>
</div>
<div class="goods-list">
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
                action:'temai',
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
//                        myScroll.refresh();
                    maxScrollY = $(document).height();
                    isLoading = false;
                    page++;
                    //                        $(labelTag).html('上拉加载更多商品');
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
});
</script>
</div>
</div>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>

</body>
</html>