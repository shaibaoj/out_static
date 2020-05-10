
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title><?php echo $coupon_goods['title']; ?>-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
<meta name="description" content="<?php echo $user_cms['description']; ?>"/>
<meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
<link rel="stylesheet" type="text/css" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/umeditor.min.css" />
</head>
<body>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/top.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>                   
<div class="header-bottom"></div>

<div class="detail-wrap main-container">
<div class="nav-wrap">
<div class="text">当前位置：<a href="<?php echo $model_base_url; ?>">首页</a>
    &gt;<a href="<?php echo $model_base_url.'?action=quan_list'; ?>">领券直播</a>
    &gt;&nbsp;优惠详情
</div>
</div>
<div class="detail-row clearfix">
<a rel="nofollow" href="<?php echo $taoke_item_m_url; ?>" biz-itemid="<?php echo $coupon_goods['num_iid']; ?>" isconvert="1" target="_blank" class="img cnzzCounter" data-cnzz-type="1" data-cnzz="<?php echo $goods_coupon['num_iid']; ?>">
    <img src="<?php echo $data_img; ?>_400x400.jpg" alt=""></a>
<div class="detail-col">
<a class="title clearfix cnzzCounter " rel="nofollow" href="<?php echo $taoke_item_m_url; ?>" biz-itemid="<?php echo $coupon_goods['num_iid']; ?>" isconvert="1" target="_blank" data-cnzz-type="1" data-cnzz="<?php echo $goods_coupon['num_iid']; ?>">
<span class="tmall"></span>
<span class="title"><?php echo $coupon_goods['title']; ?></span>
</a>
<?php if(!empty($coupon_goods['comment'])){ ?>
<div class="desc"> <span>推荐理由：</span><?php echo $coupon_goods['comment']; ?></div>
<?php } ?>
<div class="coupon-wrap clearfix">
<span class="now-price"><?php if(!empty($goods_coupon_price)){ ?><b>(独享)</b>券后价<?php } ?>&nbsp;&nbsp;&nbsp;&nbsp;<b>&yen;<i><?php echo coreAppCache::number_format($goods_buy_price); ?></i></b></span>
<span class="org-price">在售价&nbsp;&nbsp;&yen;<i><?php echo $goods_price; ?></i></span>
</div>
<div class="text-wrap">
<?php if(!empty($coupon_goods['applied_count'])){ ?>
<span class="text-wrap-span">
已领券<i><?php echo $coupon_goods['applied_count']; ?></i>张，手慢无
</span>
<?php } ?>
<span>已有<i><?php echo $coupon_goods['volume']; ?></i>人购买</span>
</div>
<div class="buy-step clearfix">

<?php if($goods_quan_type==1){ ?>
<a class="buy-step-sec buy-btn cnzzCounter" data-cnzz-type="1" href="<?php echo $model_base_url; ?>?action=market_url&browser=0&id=<?php echo $coupon_goods['num_iid']; ?>&pid=<?php if(!empty($pid_default)&&TaobaoUtil::is_pid($pid_default)){ echo trim($pid_default); }else{ echo trim($user_cms['pc_pid']); } ?>&link=<?php echo urlencode($taoke_item_m_url); ?>" rel="nofollow" target="_blank">去下单</a>
<br/>
<div class="">淘宝app扫描下单
<img src="http://gqrcode.alicdn.com/img?type=hv&text=<?php echo urlencode($taoke_item_m_url); ?>&h=300&w=300" width="100" />
</div>
<?php } ?>

<?php if($goods_quan_type!=1){ ?>
<?php if(!empty($goods_coupon_price)){ ?>
<div class="buy-step-text">购买流程</div>
<div class="buy-step-first">
<span>
<i>优惠券</i>
<b>&yen;<?php echo coreAppCache::number_format($goods_coupon_price); ?></b>
</span>
<a rel="nofollow" class="coupon-btn" href="https://shop.m.taobao.com/shop/coupon.htm?seller_id=<?php echo $user_num_id; ?>&activityId=<?php echo $activity_id; ?>" target="_blank" title="领券后请点击右边按钮下单">领取</a>
</div>
<div class="double-arrow">
<span></span>
</div>
<?php } ?>
<a class="buy-step-sec buy-btn cnzzCounter" data-cnzz-type="1" data-cnzz="<?php echo $coupon_goods['num_iid']; ?>" rel="nofollow" href="<?php echo $taoke_item_url; ?>" biz-itemid="<?php echo $goods_coupon['num_iid']; ?>" isconvert="1" target="_blank">去下单</a>
<?php } ?>

</div>
<div class="text2">
<span>如果您喜欢此宝贝，记得分享给您的朋友，一起享优惠：</span>
<div class="bdshare">
<div class="bdsharebuttonbox">
<a href="#" class="bds_more" data-cmd="more"></a>
<a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
<a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
<a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
</div>
<script>
    window._bd_share_config = {
        "common": {
            "bdSnsKey": {},
            "bdText": "最近发现了一个领内部优惠券的网站，都是限时限量抢购，一般人享受不到的！性价比超高哦，分享给大家，保证你会惊喜滴！",
            "bdMini": "2",
            "bdMiniList": false,
            "bdPic": "",
            "bdStyle": "0",
            "bdSize": "16"
        }, "share": {}
    };
    with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
</script>
</div>
</div>
</div>
<div class="pos-right">
<p><span>大家都在抢</span></p>
<div class="pos-box">
<div class="pos-goods-list bot">
<?php
    foreach ($coupon_goods_list1 as $key => $coupon_goods_item) {
        if(!empty($coupon_goods_item)&&!empty($coupon_goods_item['pic_url'])){
            $coupon_goods_item_pic_url = $coupon_goods_item['pic_url'];
            $coupon_goods_item_pic_url = str_replace('jpg_60x60.jpg', 'jpg', $coupon_goods_item_pic_url);
            $coupon_goods_item_pic_url = str_replace('jpg_290x290.jpg', 'jpg', $coupon_goods_item_pic_url);
        }
        $coupon_price = 0;
     if(!empty($coupon_goods_item['coupont_status'])
            &&!empty($coupon_goods_item['activity_id'])
                        &&$coupon_goods_item['coupont_status']==1  //优惠券过期
                        &&strtotime($coupon_goods_item['end_time'])>=strtotime(date('y-m-d',time()).' 00:00:00')){
         $coupon_price = $coupon_goods_item['price']-$coupon_goods_item['money'];
    }else{
        $coupon_price = $coupon_goods_item['price'];
    }

    $goods_ori_price = $coupon_goods_item['ori_price'];   //商品原始价格 
    $goods_price = $coupon_goods_item['price'];  //商品销售价格
    $goods_coupon_price = 0 ;  //券面额
    if(!empty($coupon_goods_item['activity_id'])
        &&$coupon_goods_item['coupont_status']==1  //优惠券过期
        &&strtotime($coupon_goods_item['end_time'])>=strtotime(date('y-m-d',time()).' 00:00:00')
        ){
        $goods_coupon_price = $coupon_goods_item['money'];  
    }
    $goods_commission_rate = $coupon_goods_item['commission_rate']; //佣金比例
    $goods_buy_price = $goods_price - $goods_coupon_price; //购买价格
    $goods_commission = coreAppCache::number_format($goods_buy_price*$goods_commission_rate/100); //佣金
    $goods_buy_base_price = $goods_buy_price - $goods_commission ;

    $campaign = dataHelper_taoke::get_campaign($db_taoke,$coupon_goods_item['campaign_id']);  //获取定向计划
    $event = dataHelper_taoke::get_event($db_taoke,$coupon_goods_item['tao_event_id']);  //鹊桥id

    $event_start_time = $coupon_goods_item['event_start_time']; //活动开始时间
    $event_end_time = $coupon_goods_item['event_end_time']; //活动结束时间

    $user_type_name = $coupon_goods_item['user_type']=='B'?"天猫":"淘宝";
    $activity_id = $coupon_goods_item['activity_id'];
    $user_num_id = $coupon_goods_item['user_num_id'];

    $goods_comment = $coupon_goods_item['comment'];
    $goods_title = $coupon_goods_item['title'];

    $taoke_item_url='https://detail.tmall.com/item.htm?id='.$coupon_goods_item['num_iid'];
    if(!empty($coupon_goods_item['taoke_item'])&&!empty($coupon_goods_item['taoke_item']['url'])){
         $taoke_item_url= $coupon_goods_item['taoke_item']['url'];
    }

    $goods_user_type = $coupon_goods_item['user_type'];

    ?>                                
<a class="pos-goods cnzzCounter" title="<?php echo $goods_coupon['title']; ?>" data-cnzz-type="1" data-cnzz="<?php echo $goods_coupon['num_iid']; ?>" target="_blank" href="<?php echo $model_base_url; ?>?action=quan&id=<?php echo $coupon_goods_item['num_iid']; ?>">
<img alt="<?php echo $goods_coupon['title']; ?>" src="<?php echo $coupon_goods_item_pic_url; ?>_130x130.jpg" />
<span>券后：&yen;<?php echo $goods_buy_price; ?></span>
</a>
<?php
}
?>
</div>
</div>
<div class="pos-act">
<a class="top-btn disabled" href="javascript:;"></a>
<a class="bot-btn " href="javascript:;"></a>
</div>
</div>
</div>
</div>
<div class="goods-list main-container row product">
<?php $coupon_goods_list = $coupon_goods_list2; $page_model = 'quan_list'; ?>    
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>
</div>

<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
</body>
</html>

