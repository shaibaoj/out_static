
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="language" content="zh-CN">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
<meta name="renderer" content="webkit">
<title><?php echo $coupon_goods['title']; ?>-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
<meta name="description" content="<?php echo $user_cms['description']; ?>"/>
<meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
<link rel="stylesheet" type="text/css" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/detail.css?v=09181" />
</head>
<body>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/top.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>
<div id="dtk_mian">
<style>
    html body {
        background-color: #fff;
    }

    .goods-list ul li:hover {
        border: 1px solid #de366e;
    }
</style>
<div class="search-wrap main-container" style="background: url('https://img.alicdn.com/imgextra/i1/2508158775/TB2rPoSXqi5V1Bjy1zdXXaRkVXa_!!2508158775.jpg') top center no-repeat;">
</div>
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
<span class="text-wrap-span">
已领券<i><?php echo $coupon_goods['applied_count']; ?></i>张，手慢无
</span>
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
<a rel="nofollow" class="coupon-btn" href="https://uland.taobao.com/quan/detail?sellerId=<?php echo $user_num_id; ?>&activityId=<?php echo $activity_id; ?>" target="_blank" title="领券后请点击右边按钮下单">点击领取</a>
</div>
<div class="double-arrow">
<span></span>
</div>
<?php } ?>
<a class="buy-step-sec buy-btn cnzzCounter" data-cnzz-type="1" data-cnzz="<?php echo $coupon_goods['num_iid']; ?>" rel="nofollow" href="<?php echo $taoke_item_url; ?>" biz-itemid="<?php echo $goods_coupon['num_iid']; ?>" isconvert="1" target="_blank">去<?php echo $user_type_name; ?>下单</a>
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
<div class="jipin-wrap">
<img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/jinpintuijian.png" alt="">
</div>
<div class="goods-list main-container">
<ul class="clearfix">
<?php $coupon_goods_list = $coupon_goods_list2; $page_model = 'quan_list'; ?>    
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>
</ul>
</div>
<script>
    (function(){
        // 领券箭头移动
        var direction='right';
        $(".buy-step").hover(function(){
            var css={
                'margin-left':'-12px'
            };
            if(direction==='right'){
                direction='left';
                css['margin-left']='-5px';
            }else{
                direction='right';
            }
            $('.double-arrow span').animate(css,arguments.callee);
        },function(){
            $('.double-arrow span').stop().css("margin-left","-12px");
        })
        // 右侧广告位
        var list = $(".pos-goods-list"),
            goods = $(".pos-goods"),
            hg = goods.outerHeight(true),
            len = goods.length,
            time = 500,
            timer = null;
        list.height(hg * len);
        $(".top-btn").on("click",function(){
            var _this = $(this),
                _top = parseInt(list.css("top"));
            if(_this.hasClass("disabled") || list.is(":animated")){
                return;
            }
            list.animate({
                "top" : _top + hg * 3
            },time,function(){
                if(parseInt(list.css("top")) == 0){
                    _this.addClass("disabled");
                    list.removeClass("top").addClass("bot");
                }else{
                    list.removeClass("bot").addClass("top");
                }
                $(".bot-btn").removeClass("disabled");
            });
        });
        $(".bot-btn").on("click",function(){
            var _this = $(this),
                _top = parseInt(list.css("top"));
            if(_this.hasClass("disabled") || list.is(":animated")){
                return;
            }
            list.animate({
                "top" : _top - hg * 3
            },time,function(){
                if(Math.abs(parseInt(list.css("top"))) == hg * (len - 3)){
                    _this.addClass("disabled");
                    list.removeClass("bot").addClass("top");
                }else{
                    list.removeClass("top").addClass("bot");
                }
                $(".top-btn").removeClass("disabled");
            });
        });
        timer = setInterval(function(){
            if(list.hasClass("bot")){
                $(".bot-btn").trigger("click");
            }else if(list.hasClass("top")){
                $(".top-btn").trigger("click");
            }
        },time * 10);
        $(".pos-right").hover(function(){
            clearInterval(timer);
        },function(){
            timer = setInterval(function(){
                if(list.hasClass("bot")){
                    $(".bot-btn").trigger("click");
                }else if(list.hasClass("top")){
                    $(".top-btn").trigger("click");
                }
            },time * 10);
        })
    })();
</script>
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
