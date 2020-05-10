
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<title><?php echo $coupon_goods['title']; ?>-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
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
            当前位置：<a href="<?php echo $model_base_url; ?>">首页</a><span>></span>
            <a href="<?php echo $model_base_url; ?>?action=quan_list">内部优惠券</a>        
            <span>></span> 优惠详情
        </div>
        <div class="detail-left fl">
            <div class="detail-img">
                <img src="<?php echo $data_img; ?>_400x400.jpg">
            </div>
        </div>
        <div class="detail-right">
            <h1 class="detail-title">
                <!-- <i class="icon icon-tmall"></i> -->
                <span class="inline-block title-img">
                    <img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/<?php if($user_type=='B'){ echo "tmall";}else{echo "taobao";} ?>.png">
                </span><?php echo $coupon_goods['title']; ?>
            </h1>
            <div class="price-block">
                <p class="line-block">
                    <span class="title">价格:</span>
                    <span class="present-price">￥<em><?php echo coreAppCache::number_format($goods_buy_price); ?></em></span>
                    <del>￥<?php echo coreAppCache::number_format($goods_ori_price); ?></del>
                </p>
                <?php if(!empty($goods_coupon_price)){ ?>
                <p class="line-block">
                    <span class="title">优惠:</span>
                    <span class="text"><?php echo $coupon_goods['money']; ?>元优惠券</span>
                    <span  class="text">单笔满<?php echo $coupon_goods['condition']; ?>元可用，每人限领1 张</span>
                </p>
                <?php } ?>
            </div>
            
            <div class="quan-block mb20">
                <?php if(!empty($goods_coupon_price)&&!empty($coupon_goods['applied_count'])){ ?><i class="icon icon-tanhao"></i>已领券<span class="red"><?php echo $coupon_goods['applied_count']; ?></span>张<em>|</em> <?php } ?>
                已有<span class="red"><?php echo $coupon_goods['volume']; ?></span>人购买，手慢无
            </div>
           
            <?php if(!empty($coupon_goods['comment'])){ ?>
            <div class="explain-block mb20">
                <div class="explain-title"><span class="icon-block"></span>推荐理由</div>
                <p><?php echo $coupon_goods['comment']; ?></p>
            </div>
            <?php } ?>
            <div class="explain-block mb30">
                <div class="explain-title"><span class="icon-block"></span>如何购买</div>
            </div>

            <?php if($goods_quan_type==1){ ?>
            <a href="<?php echo $model_base_url; ?>?action=market_url&browser=0&id=<?php echo $coupon_goods['num_iid']; ?>&pid=<?php if(!empty($pid_default)&&TaobaoUtil::is_pid($pid_default)){ echo trim($pid_default); }else{ echo trim($user_cms['pc_pid']); } ?>&link=<?php echo urlencode($taoke_item_m_url); ?>" class="take-quan-btn mb30" target="_blank" rel="nofollow">去领券下单</a>
<div class="">
<img src="http://gqrcode.alicdn.com/img?type=hv&text=<?php echo urlencode($taoke_item_m_url); ?>&h=300&w=300" width="100" />
淘宝app扫描下单
</div>
<?php } ?>

<?php if($goods_quan_type!=1){ ?>  
<?php if(!empty($goods_coupon_price)){ ?>
<a href="https://shop.m.taobao.com/shop/coupon.htm?seller_id=<?php echo $user_num_id; ?>&activityId=<?php echo $activity_id; ?>" class="take-quan-btn mb30" target="_blank" rel="nofollow">先领券</a>
<?php } ?>
<a isconvert=1 biz-itemid="<?php echo $goods_coupon['num_iid']; ?>"  href="<?php echo $taoke_item_url; ?>" class="take-quan-btn mb30" target="_blank" rel="nofollow">去<?php echo $user_type_name; ?>下单</a>
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
<div class="list-info page-all mb30">
        <h1 class="list-info-title">你可能还喜欢</h1>
        <div class="list-info-cont">
            <ul class="list-warp clearfix">
                <?php $coupon_goods_list = $coupon_goods_list2; $page_model = 'quan_list'; ?>    
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>     
                </ul>
        </div>
            <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/yun.php');?>

    </div>

<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>

<script type="text/javascript">
    (function(win,doc){
        var s = doc.createElement("script"), h = doc.getElementsByTagName("head")[0];
        if (!win.alimamatk_show) {
            s.charset = "gbk";
            s.async = true;
            s.src = "https://alimama.alicdn.com/tkapi.js";
            h.insertBefore(s, h.firstChild);
        };
        var o = {
            pid: "mm_<?php if(!empty($pid_default)&&TaobaoUtil::is_pid($pid_default)){ echo trim($pid_default); }else{ echo trim($user_cms['pc_pid']); } ?>",/*推广单元ID，用于区分不同的推广渠道*/
            appkey: "",/*通过TOP平台申请的appkey，设置后引导成交会关联appkey*/
            unid: "",/*自定义统计字段*/
            type: "click" /* click 组件的入口标志 （使用click组件必设）*/
        };
        win.alimamatk_onload = win.alimamatk_onload || [];
        win.alimamatk_onload.push(o);
    })(window,document);
</script>


</body>
</html>

