
<!doctype html>
<html class="no-js">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
<title><?php echo $coupon_goods['title']; ?>-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
</head>
<body>
<div class="am-modal am-modal-alert" tabindex="-1" id="fq_alert">
  <div class="am-modal-dialog">
    <div class="am-modal-hd" id="fq_alert_title"></div>
    <div class="am-modal-bd" id="fq_alert_info">
    </div>
    <div class="am-modal-footer">
      <span class="am-modal-btn">确定</span>
    </div>
  </div>
</div>

<div class="am-modal am-modal-confirm" tabindex="-1" id="fq_confirm">
  <div class="am-modal-dialog">
    <div class="am-modal-hd" id="fq_confirm_title"></div>
    <div class="am-modal-bd" id="fq_confirm_info"></div>
    <div class="am-modal-footer">
      <span class="am-modal-btn" data-am-modal-confirm>确定</span>
    </div>
  </div>
</div>


<!-- 微信自定义接口 -->
<script>
    var content='';
    if("15"==0){
    content = document.title;
    }else{
    content =  "【在售<?php echo coreAppCache::number_format($goods_price); ?>元，券后<?php echo coreAppCache::number_format($goods_buy_price); ?>元】<?php echo $coupon_goods['title']; ?>";
    }
    //alert(content); 
    var option = {
        title:content,  
        desc: "<?php echo $coupon_goods['title']; ?>",
        link: window.location.href ,
        imgUrl: "<?php echo $data_img; ?>"
    };
       //console.log(option);
    wx.config({"debug":false,"beta":false,"appId":"","nonceStr":"","timestamp":"","url":window.location.href,"signature":"","jsApiList":["onMenuShareAppMessage","onMenuShareTimeline","chooseImage","uploadImage","downloadImage","hideMenuItems"]});
    wx.ready(function(){
            wx.onMenuShareAppMessage(option); 
            wx.onMenuShareTimeline(option);
    });
</script>
<!-- 微信自定义接口 -->

<style>
    body {
        background-color: #f3f3f3;
        color: #3d0505;
    }

    .am-gallery {
        padding: 0.5rem;
    }

    .fq-img {
        width: 148px;
        height: 148px;
    }

    .fq-goods-border {
       border: .1rem #f54d23 dashed;
    }

    .fq-coupon-border {
        border: .1rem #f54d23 solid;
    }

    .am-form-field {
        border: 0;
    }

        .am-form-field:focus {
            background: 0;
            border: 0;
            -webkit-box-shadow: none;
            box-shadow: none;
        }

    .fq-explain {
        position: absolute;
        width: 180px;
        margin-top: -22px;
        right: 20%;
        left: 20%;
    }

    .fq-goods {
        border: #f3f3f3 solid .1rem;
        background: #fff;
        color: #3d0505;
    }

    .am-thumbnail {
        border: none;
    }

    .line-clamp {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /*这里修改为要显示的行数*/
        -webkit-box-orient: vertical;
        line-height: 1.6;
        max-height: 46px;
        min-height: 46px;
    }


    .fq-price {
        color: #f54d23;
    }


     .fq-reason{
        color:#8f8f8f;
     }

    .fq-title,
    .fq-title:hover,
    .fq-title:focus {
        color: #3d0505;
    }

    .fq-abstract-color {
        color: #f54d23;
        line-height:1.6;
    }

    .fq-post {
        background-color: #5EB95E;
    }

    .fq-coupon {
        background-color: #A19CF3;
        clear: right;
    }

    .am-tab-panel img {
        width: 100%;
    }

    .am-gotop-fixed {
        width: 40px;
    }

        .am-gotop-fixed .am-gotop-icon {
            line-height: 40px;
        }

    .fq-abstract {
        color: #8f8f8f;
        position: relative;
        top: 2px;
    }

    .fq-receive {
        height: 58px;
        border: #f54d23 .1rem dashed;
        background: #f3e7e3;
    }

        .fq-receive span {
            color: #f54d23;
        }

        .fq-receive a {
            background: #f54d23;
            color: white;
        }

    .am-slider-a1 {
        -webkit-box-shadow: none;
        box-shadow: none;
    }

        .am-slider-a1 .am-control-nav {
            display: none;
        }


    .stamp01 {
        background: #F39B00;
        background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 5px, #F39B00 5px);
        background-size: 15px 15px;
        background-position: 9px 3px;
    }

        .stamp01::before {
            background-color: #F39B00;
        }


    .stamp * {
        list-style: none;
        font-family: "Microsoft YaHei",'Source Code Pro', Menlo, Consolas, Monaco, monospace;
    }


    .stamp {
        width: 300px;
        height: 70px;
        position: relative;
        overflow: hidden;
    }

    .stamp::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 10px;
        right: 8px;
        z-index: 0;
    }

    .stamp::after {
        content: '';
        position: absolute;
        left: 10px;
        top: 10px;
        right: 10px;
        bottom: 10px;
        box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.5);
        z-index: -2;
    }

    .stamp i {
        position: absolute;
        left: 10%;
        top: 0;
        height: 190px;
        width: 390px;
        background-color: rgba(255,255,255,.15);
        transform: rotate(-30deg);
    }

    .stamp .par {
        position: relative;
        width: 60%;
        border-right: 2px dashed rgba(255,255,255,.3);
    }

        .stamp .par span {
            font-size: 30px;
        }

        .stamp .par sub {
            position: relative;
            top: -5px;
            color: rgba(255,255,255,.8);
        }

    .stamp .copy {
        position: relative;
        display: inline-block;
        font-size: 20px;
        width: 38%;
        height: 100%;
        z-index: 4;
    }

    .stamp .copy a {
        color: white;
    }
</style>

<header style="position:relative;z-index:999;background:#F54D23;">
    <a href="javascript:void(0);"  onclick="back();" style="position:absolute;top:2px;color:#fff;width:45px;height:100%;padding-left:10px;font-size:45px;" class="am-inline-block am-text-middle am-icon-angle-left"></a><div class="am-per-center am-text-center am-padding-vertical-sm" style="color:#fff;font-size:16px;">仅需一步 立享优惠</div>
</header>

<script>
     function back(){
       var last_page_url = (document.referrer);
       if(last_page_url){
            window.history.back(-1);
        }else{
            window.location.href ='<?php echo $model_base_url; ?>';
        }
    }
    
</script>

<div class="fq-whole am-text-sm">
    <div class="fq-subject">
        <div class="am-inline-block am-gallery am-gallery-default  fq-background-white" data-am-widget="gallery" data-am-gallery="{ pureview: true }" style="width: 100%">
            <img src="<?php echo $data_img; ?>_310x310.jpg" class="fq-img am-fl am-inline-block >" />
            <div class="am-margin-bottom-sm">
                <strong data-id="<?php echo $coupon_goods['num_iid']; ?>" class="am-padding-left-xs line-clamp"><?php echo $coupon_goods['title']; ?></strong>
            </div>

            <div class="am-inline-block am-text-sm am-fl fq-post fq-text-white am-margin-left-xs am-padding-horizontal-xs">包邮</div>
            <div class="am-inline-block am-text-sm am-fl fq-coupon fq-text-white am-padding-horizontal-xs">
                <span class="am-text-white"><?php echo  coreAppCache::number_format($goods_coupon_price); ?></span>元优惠券
            </div>
            <br />
            <div class="am-inline-block fq-price am-padding-horizontal-xs am-margin-top-sm">
                <span class="am-text-sm am-padding-right-xs">券后</span>
                <strong class="am-text-xl"><?php echo coreAppCache::number_format($goods_buy_price); ?></strong>
            </div>

            <div>
                <div class="am-text-xs am-inline-block am-margin-left-xs"  style="text-decoration: line-through; color:#8f8f8f" >在售价<span class="am-padding-left-xs"><?php echo coreAppCache::number_format($goods_price); ?></span></div>
                <div class="am-text-xs am-fr" style="position: relative; top: 2px;  color:#8f8f8f"><span class="am-margin-left-xs"><span class="am-padding-right-xs">已售</span><?php echo $coupon_goods['volume']; ?></span></div>
            </div>
            <a <?php if($goods_quan_type!=1){ ?>  biz-itemid="<?php echo $coupon_goods['num_iid']; ?>" isconvert="1" <?php } ?> data-href="<?php echo $taoke_item_m_url; ?>" class="am-center am-block am-text-center am-text-sm am-padding-vertical-xs go_to_coupon" style="margin-left: 150px; color:#f54d23; border:.1rem solid #f54d23; clear:right">领券购买</a>
            <?php if(!empty($coupon_goods['comment'])){ ?>
            <hr class=" am-margin-bottom-0 am-margin-top-xs" style="border-top: .1rem solid #d1cfcf" />            
            <div class="am-margin-top-xs">
                <div class="am-text-xs fq-reason">推荐理由：<span><?php echo $coupon_goods['comment']; ?></span></div>            
            </div>
            <?php } ?>
        </div>

        <!--淘口令-->
        <?php if(!empty($taoke_item_coupon_link_tao_token)){ ?>
        <div class="am-margin-vertical am-padding-vertical-sm fq-background-white" style="box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); -webkit-box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); background:#fff6f4">
            <!--二合一淘口令开始-->
            <!-- <div class="step_one am-text-sm am-margin-left-sm"><strong> 复制淘口令：</strong></div> -->
            <div class="am-margin-top-sm  am-margin-horizontal-sm">
                <div class="fq-goods-border am-text-center am-margin-top-sm am-padding-vertical-sm am-padding-horizontal-sm fq-background-white">
                    <div class="fq-explain  am-center am-text-center">
                        <span class="am-padding-horizontal-sm fq-nowrap " style="color:white; background:#f54d23">长按框内 > 全选 > 复制</span>
                    </div>
                    <span id="copy_key_ios" class="fq-abstract-color">复制框内整段文字，「领取优惠券」并购买 复制信息，打开→手机淘宝→<?php echo $taoke_item_coupon_link_tao_token; ?></span>
                    <textarea style="display: none;" id="copy_key_android" type="text" class="am-form-field am-text-center am-text-sm fq-abstract-color " oninput="regain();">复制框内整段文字，即可「领取优惠券」并购买 复制信息，打开→手机淘宝→<?php echo $taoke_item_coupon_link_tao_token; ?></textarea>
                </div>
            </div>

            <!--二合一淘口令结束-->
<!--二合一淘口令结束-->
                            <div class="copy_toowords" style="display:none;">
                <div class="share_content am-margin-bottom am-badge-success am-badge" id="share_content"></div>
                <div class="am-text-center am-margin-top-sm ">
                    <a class="am-padding-vertical-xs am-padding-horizontal-lg am-round am-inline-block share" style="background: #f54d23; color: white;" data-taowords="<?php echo $taoke_item_coupon_link_tao_token; ?>">
                        一键复制
                    </a>
                </div>
            </div>

        </div>
        <?php } ?>
        <!--商品图文详情-->
        <div class="am-panel-group am-margin-vertical-sm" id="accordion">
            <div class="am-panel am-padding-horizontal-sm">
                <div class="am-panel-hd am-padding-left-0 am-padding-right-0">
                    <h4 class="am-panel-title" data-am-collapse="{parent: '#accordion', target: '#product-details'}" data-itemid="<?php echo $coupon_goods['num_iid']; ?>">
                        商品图文详情<span class="am-text-primary am-text-xs">（点击展开）</span>
                        <i class="am-icon-angle-right am-fr am-icon-sm" id="change_icon"></i>
                    </h4>

                </div>
                <div id="product-details" class="am-panel-collapse am-collapse">
                    <div class="am-panel-bd am-padding-0" style="border-top: 0">
                        <div class="am-tab-panel am-fade am-in am-active" id="tab1">
                            <div class="am-padding-top-sm" style="width:100%;overflow:auto;"></div>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--商品图文详情-->
        <!--更多商品-->

        <div class="am-text-sm am-text-center am-margin-vertical-xs am-text-success">↓ 猜您喜欢 ↓</div>
        <!--商品轮播-->
        <div data-am-widget="slider" class="am-slider am-slider-a1" data-am-slider='{&quot;directionNav&quot;:false}' style="margin-bottom: 1rem">
            <ul class="am-slides">
                <li>
                        <ul class="am-avg-sm-4">
                <?php
    foreach ($coupon_goods_list2 as $key => $coupon_goods_item) {
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
<li class="fq-goods am-text-center">
    <a class="am-block" href="<?php echo $model_base_url; ?>?action=quan&mod_action=ma&id=<?php echo $coupon_goods_item['num_iid']; ?>">
        <img class="am-thumbnail am-margin-bottom-0 am-block" src="<?php echo $coupon_goods_item_pic_url; ?>_310x310.jpg" />
    </a>
    <a class="am-block am-text-xs am-text-truncate  fq-title">
        <span data-id="105816036"><?php echo $coupon_goods_item['title']; ?></span>
    </a>
    <div class="am-inline-block" style="clear: both; width: 100%">
        <div class="am-fl fq-price am-padding-left-xs">
            <span class="am-text-xs am-padding-right-xs">券后</span>
            <strong class="fq-text-default"><?php echo $goods_buy_price; ?></strong>
        </div>
    </div>
</li>

<?php if($key>0&&$key%4==3&&($key+1)<count($coupon_goods_list2)){ ?>
    </ul>
</li>
<li>
    <ul class="am-avg-sm-4">
<?php } ?>

<?php
}
?>
      </ul>
    </li>                                     
</ul>
        </div>

        <!--更多商品-->

        <div data-am-widget="gotop" class="am-gotop am-gotop-fixed">
            <a href="#top">
                <i class="am-gotop-icon am-icon-chevron-up am-round"></i>
            </a>
        </div>

    </div>
</div>


<script>

$(function () {
    $(".go_to_coupon").click(function () {
        var _url = $(this).data("href");
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            if (/iphone|ipad|ipod/.test(ua)) {
                var img_url = "<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/wechat-ios.png";
            } else if (/android|adr|linux/.test(ua)) {
                var img_url = "<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/wechat-android.png";
            }else{
                var img_url = "<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/wechat-android.png";
            }
            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                shadeClose: true,
                shade: 0.6,
                offset: "125px",
                skin: 'mask-tips',
                content: '<img class="wechat-bg" src="' + img_url + '" /><img class="wechat-arrow" src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/wechat-arrow.png" />'
            })
        } else {
            window.location.href = _url;
        }
    });
});

$(function () {
    //事件监听
    //------------------------------------------
     var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/iphone os 10/i) == "iphone os 10") {
        
            $('.copy_toowords').show();
            
            var clipboard = new Clipboard('.share', {
                target: function() {
                    return document.querySelector('.share_content');
                }
            });

            clipboard.on('success', function(e){
                e.trigger.innerHTML="已复制";
                e.trigger.style.backgroundColor="#9ED29E";
                e.trigger.style.borderColor="#9ED29E";
                $(".share_content").hide();
                console.info('Action:', e.action);
                console.info('Text:', e.text);
                console.info('Trigger:', e.trigger);
                e.clearSelection();
            });

            clipboard.on('error', function(e) {
                $(".share_content").hide();
                $("#fq_alert_info").html("<div class=\"am-text-danger\">由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！</div><div class=\"am-margin\" style=\"text-align: left;\">"+$(".share_content").html()+"</div>");
                $('#fq_alert').modal();
            });
                

        }else{     
                document.addEventListener("selectionchange", function (e) {
        if (window.getSelection().anchorNode.parentNode.id == 'copy_key_ios' && document.getElementById('copy_key_ios').innerText != window.getSelection()) {
            var key = document.getElementById('copy_key_ios');
            window.getSelection().selectAllChildren(key);
        }
        if (window.getSelection().anchorNode.parentNode.id == 'copy_key_ios1' && document.getElementById('copy_key_ios1').innerText != window.getSelection()) {
            var key = document.getElementById('copy_key_ios1');
            window.getSelection().selectAllChildren(key);
        }
        if (window.getSelection().anchorNode.parentNode.id == 'copy_key_ios2' && document.getElementById('copy_key_ios2').innerText != window.getSelection()) {
            var key = document.getElementById('copy_key_ios2');
            window.getSelection().selectAllChildren(key);
        }
        if (window.getSelection().anchorNode.parentNode.id == 'copy_key_ios3' && document.getElementById('copy_key_ios3').innerText != window.getSelection()) {
            var key = document.getElementById('copy_key_ios3');
            window.getSelection().selectAllChildren(key);
        }
        if (window.getSelection().anchorNode.parentNode.id == 'copy_key_ios4' && document.getElementById('copy_key_ios4').innerText != window.getSelection()) {
            var key = document.getElementById('copy_key_ios4');
            window.getSelection().selectAllChildren(key);
        }
    }, false);
        
        }    


});

var ua = navigator.userAgent.toLowerCase();
if (ua.match(/iphone/i) == "iphone" || ua.match(/ipad/i) == "ipad") {

    $('.fq-explain span').html("长按框内 > 拷贝");

} else {
    $("#copy_key_ios").hide();
    $("#copy_key_ios1").hide();
    $("#copy_key_ios2").hide();
    $("#copy_key_ios3").hide();
    $("#copy_key_ios4").hide();
    $("#copy_key_android").show();
    $("#copy_key_android1").show();
    $("#copy_key_android2").show();
    $("#copy_key_android3").show();
    $("#copy_key_android4").show();
}

//获取宝贝详情
$('.am-panel-title').click(function () {
    //详情显影
    if ($("#product-details").is(":hidden")) {
        $("#change_icon").removeClass('am-icon-angle-right').addClass('am-icon-angle-down');
        $('.am-tab-panel').html('<span class="am-center am-text-center am-margin-vertical-xs">图片努力加载中<i class="am-icon-spinner am-icon-pulse am-margin-left-xs"></i></span>');
    } else {
        $("#change_icon").removeClass('am-icon-angle-down').addClass('am-icon-angle-right');
    }
    var itemid = $(this).attr('data-itemid');
    getiteminfo(itemid);
});

 $(".share").on('click', function() {

           
            var taowords = $(this).attr('data-taowords');
            console.log(taowords);
           $('.share_content').html(taowords);
       })  

//采集宝贝详情的图片内容
function getiteminfo(itemid) {
    $.ajax({
        url: "https://hws.m.taobao.com/cache/mtop.wdetail.getItemDescx/4.1/?data=%7Bitem_num_id%3A" + itemid + "%7D&type=jsonp&dataType=jsonp",
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (result) {
            if (result.ret[0] == "SUCCESS::接口调用成功") {
                var len = result.data.images.length;
                var image = new Array();
                for (var i = 0; i < len; i++) {
                    image[i] = '<img src="' + result.data.images[i] + '">';
                }
                $('.am-tab-panel').html(image);
            } else {
                $("#qf_alert_info").html("宝贝数据调用失败，原因：" + result.ret[0]);
                $('#qf_alert').modal();
            }
        }
    });
}

</script>
<script>
    
    if(document.getElementById("copy_key_android")){
        var taokouling_value = document.getElementById("copy_key_android").value;
        function regain() {
        document.getElementById('copy_key_android').value = taokouling_value;
        }
    }
    if(document.getElementById("copy_key_android1")){
        var taokouling_value1 = document.getElementById("copy_key_android1").value;
        function regain1() {
        document.getElementById('copy_key_android1').value = taokouling_value1;
        }
    }
    if(document.getElementById("copy_key_android2")){
        var taokouling_value2 = document.getElementById("copy_key_android2").value;
        function regain2() {
        document.getElementById('copy_key_android2').value = taokouling_value2;
        }
    }
    if(document.getElementById("copy_key_android3")){
        var taokouling_value3 = document.getElementById("copy_key_android3").value;
        function regain3() {
        document.getElementById('copy_key_android3').value = taokouling_value3;
        }
    }
    if(document.getElementById("copy_key_android4")){
        var taokouling_value4 = document.getElementById("copy_key_android4").value;
        function regain4() {
        document.getElementById('copy_key_android4').value = taokouling_value4;
        }
    }
</script>

<script>

function post(URL, PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
    temp.style.display = "none";
    for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}

$(function(){
    $('.share_btn').on('click', function() {
        post('/index/details'+'/id/'+$(this).data('id'), {share:true});
    });
});


</script>
<div class="am-hide"><?php echo $user_cms['tj']; ?><?php echo $user_cms['tdj']; ?></div>     
<?php
if(!empty($jk_md5)&&!empty($numIid)&&!empty($app_id)){
    echo '<img src="'.$url_prefix_item['jk_url'].'/index.php?sign='.$jk_md5.'&num_iid='.$numIid.'&p_id='.$app_id.'&times='.time().'" style="width:1px;height:1px" />';
}
?>

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
