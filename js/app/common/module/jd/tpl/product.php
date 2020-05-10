
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<title><?php echo $product['productName']; ?>-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
<meta name="description" content="<?php echo $user_cms['description']; ?>"/>
<meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
<link rel="stylesheet" type="text/css" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/detail.css?v=20170117">
</head>
<body>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/top.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header-banner.php');?>

    <div class="list-detail page-all clearfix">
        <div class="detail-nav">
            当前位置：<a href="<?php echo $model_base_url; ?>">首页</a>
            <span>></span><?php echo $product['productName']; ?>
        </div>
        <div class="detail-left fl">
            <div class="detail-img">
                <img src="<?php echo $product['picUrl']; ?>">
            </div>
        </div>
        <div class="detail-right">
            <h1 class="detail-title">
                <span class="inline-block title-img">
                </span>
                <?php echo $product['productName']; ?>
            </h1>
            <div class="price-block">
                <p class="line-block">
                    <span class="title">价格:</span>
                    <span class="present-price">￥<em><?php echo coreAppCache::number_format($product['goods_buy_price']); ?></em></span>
                    <del>￥<?php echo coreAppCache::number_format($product['goods_price']); ?></del>
                </p>
                <?php if(!empty($product['coupon_money'])){ ?>
                <p class="line-block">
                    <span class="title">优惠:</span>
                    <span class="text"><?php echo $product['coupon_money']; ?>元优惠券</span>
                    <span  class="text">单笔满<?php echo $product['coupon_condition']; ?>元可用，每人限领1 张</span>
                </p>
                <?php } ?>
            </div>
           
            <?php if(!empty($product['describe'])){ ?>
            <div class="explain-block mb20">
                <div class="explain-title"><span class="icon-block"></span>推荐理由</div>
                <p><?php echo $product['describe']; ?></p>
            </div>
            <?php } ?>
            <div class="explain-block mb30">
                <div class="explain-title"><span class="icon-block"></span>如何购买</div>
            </div>

            <?php if(!empty($product['coupon_money'])){ ?>
            <a href="<?php echo $product['coupon_url'] ?>" class="take-quan-btn mb30" target="_blank" rel="nofollow">先领券</a>
            <?php } ?>
            <a target="_blank" class="take-quan-btn mb30 mall-click" href="<?php echo CPS::query_common_url($product['url'],$product['mall']['id'],$user_cms['user_id'],$user_cms['app_id'],$agent_id,0); ?>" data-url="<?php echo $product['url']; ?>"  data-mallid="<?php echo $product['mall']['id']; ?>" data-uid="<?php echo $user_cms['user_id']; ?>" data-pid="<?php echo $user_cms['app_id']; ?>" data-aid="<?php echo $agent_id; ?>">下单</a>

            <?php if(!empty($product['user_goods_commission'])){ ?>
            (<b>预计返<?php echo coreAppCache::number_format($product['user_goods_commission']); ?></b>)
            <?php } ?>
            <div class="share-other">
                喜欢这个宝贝？分享给好友一起享受优惠吧：
                <ul class="clearfix">
                    <div class="bdsharebuttonbox" data-tag="detail">
                        <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                        <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                        <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
                        <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
                        <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                        <a href="#" class="bds_more" data-cmd="more"></a>
                    </div>

<script>
window._bd_share_config={
    common:{
        bdSnsKey:{},
        bdMini:"2",
        bdMiniList:false,
        bdPic:"<?php echo $data_img; ?>_400x400.jpg",        
        bdStyle:"0",
        bdSize:"16"
    },
    share:{}
};
with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
</script>
                </ul>
            </div>
        </div>
    </div>
    <!-- <div class="list-info page-all mb30">
        <h1 class="list-info-title">你可能还喜欢</h1>
        <div class="list-info-cont">
            <ul class="list-warp clearfix">
                <?php $product_list = $product_list2; $page_model = 'quan_list'; ?>    
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>     
                </ul>
        </div>
    </div> -->

<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
</body>
</html>

