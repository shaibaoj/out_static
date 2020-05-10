
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
<title><?php echo $coupon_goods['title']; ?>-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
<link href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/wapshow.css?v=1004001" rel="stylesheet"/>
</head>
<body>
<div id="load-more">
<div>
<div class="main-title clearfix">
<span class="mui-action-menu mui-pull-left" rel="external" data-ajax="false" onclick="back();" style="font-family: iconfont;color: #FFFFFF;font-size: 37px;line-height: 44px;margin-left: 9px;float: none;position: absolute;z-index: 5;">
&#xe600;</span>
<h1 class="mui-title main-title-text">商品详情</h1>
<a href="<?php echo $model_base_url; ?>" rel="external" class="main-home cnzzCounter" data-cnzz-type="51" data-cnzz="0"></a>
</div>
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

<div class="detail-wrapper">
<div class="img" style="max-width: 310px">
<a class="normal-img" data-href="<?php echo $taoke_item_url; ?>">
<img style="display: inline;" src="<?php echo $data_img; ?>_310x310.jpg">
</a>
<?php if($coupon_goods['total_count']<100){ ?>
<span>即将领完，抓紧机会！</span>
<?php }else{ ?>
<span>已有<?php echo $coupon_goods['applied_count']; ?>人领取</span>
<?php } ?>
</div>
<div class="title-wrapper clearfix">
<span class="tmall"></span><?php echo $coupon_goods['title']; ?></div>
<div class="recommend-wrapper">

<!--淘口令-->
<?php if(!empty($taoke_item_coupon_link_tao_token)){ ?>
<div class="am-margin-vertical am-padding-vertical-sm fq-background-white" style="box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); -webkit-box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); background:#fff6f4;font-size: 12px;">
    <!--二合一淘口令开始-->
    <!-- <div class="step_one am-text-sm am-margin-left-sm"><strong> 复制淘口令：</strong></div> -->
    <div class="am-margin-top-sm  am-margin-horizontal-sm">
        <div class="fq-goods-border am-text-center am-margin-top-sm am-padding-vertical-sm am-padding-horizontal-sm fq-background-white">
            <div class="fq-explain  am-center am-text-center">
                <span class="am-padding-horizontal-sm fq-nowrap " style="color:white; background:#f54d23">长按框内 > 全选 > 复制</span>
            </div>
            <span id="copy_key_ios" class="fq-abstract-color">复制框内整段文字，打开「手机淘宝」即可「领取优惠券」并购买 复制信息，打开→手机淘宝→<?php echo $taoke_item_coupon_link_tao_token; ?></span>
            <textarea style="display: none;" id="copy_key_android" type="text" class="am-form-field am-text-center am-text-sm fq-abstract-color " oninput="regain();">复制框内整段文字，打开「手机淘宝」即可「领取优惠券」并购买 复制信息，打开→手机淘宝→<?php echo $taoke_item_coupon_link_tao_token; ?></textarea>
        </div>
    </div>

    <!--二合一淘口令结束-->
</div>
<?php } ?>

<!--商品图文详情-->
<div class="am-panel-group am-margin-vertical-sm" id="accordion" style="font-size: 1.6rem;">
    <div class="am-panel am-padding-horizontal-sm">
        <div class="am-panel-hd am-padding-left-0 am-padding-right-0">
            <h4 class="am-panel-title" data-am-collapse="{parent: '#accordion', target: '#product-details'}" data-itemid="<?php echo $coupon_goods['num_iid']; ?>">
                商品图文详情<span class="am-text-primary am-text-xs" style="color: #0e90d2;">（点击展开）</span>
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

<?php if(!empty($coupon_goods['comment'])){ ?>
<div class="text"><span>小编推荐</span><?php echo $coupon_goods['comment']; ?></div>
<?php } ?>
</div>
</div>
<div class="pos-box clearfix">
<p class="pos-title"><i></i>精品推荐</p>
<div class="ads-list">

<?php $coupon_goods_list = $coupon_goods_list2; $page_model = 'quan'; ?>    
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>

</div>
</div>
<div class="buy-wrapper" style="padding-right: 0;">
<span class="price">券后价：<i>&yen;<b style="font-size:22px;"><?php echo coreAppCache::number_format($goods_buy_price); ?></b></i></span>
<span class="coupon">&yen;<?php echo coreAppCache::number_format($goods_price); ?></span>
<a style="background-color: #fc3616;
    color: #ffffff;
    float: right;
    width: 120px;
    text-align: center;
    font-size: 16px;" <?php if($goods_quan_type!=1){ ?>  biz-itemid="<?php echo $coupon_goods['num_iid']; ?>" isconvert="1" <?php } ?> class="normal-btn" data-href="<?php echo $model_base_url; ?>?action=market_url&browser=0&id=<?php echo $coupon_goods['num_iid']; ?>&pid=<?php if(!empty($pid_default)&&TaobaoUtil::is_pid($pid_default)){ echo trim($pid_default); }else{ echo trim($user_cms['pc_pid']); } ?>&link=<?php echo urlencode($taoke_item_m_url); ?>">购买&nbsp;&gt;</a>
    
<a class="normal-btn" data-href="<?php echo $taoke_coupon_url; ?>" style="float: right; background: #f69919; line-height: 20px; text-align: center; color: #ffffff; font-size: 12px; width: 64px; height: 50px; padding-top: 4px;">
<?php if($goods_quan_type!=1){ ?>先<?php } ?>领券<br><span style="font-size: 15px;color: #ffffff; "><?php echo  coreAppCache::number_format($goods_coupon_price); ?>元</span>
</a>
</div>
<script>
    $(function () {
        $(".buy-wrapper .normal-btn, .detail-wrapper .img > a.normal-img").click(function () {
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
});

var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/iphone/i) == "iphone" || ua.match(/ipad/i) == "ipad") {

        $('.fq-explain span').html("长按框内 > 拷贝");
        $('.fq-explain span').css('background', 'white');

        $('input').focus(function () {
            window.setTimeout('scrollBottom()', 300);
        });

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

    function scrollBottom() {
        window.scrollTo(0, 250);
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
<style type="text/css">
.fq-goods {
        border: .2rem #f3e7e3 dashed;
    }
     .fq-coupon {
        border: .2rem #f3e7e3 solid;
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
    color: #f54d23;
}
.am-padding-horizontal-xs {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.am-padding-horizontal-sm {
  padding-left: 1rem;
  padding-right: 1rem;
}
.am-padding-horizontal-lg {
  padding-left: 2.4rem;
  padding-right: 2.4rem;
}
.am-padding-horizontal-xl {
  padding-left: 3.2rem;
  padding-right: 3.2rem;
}
.am-tab-panel img {
    width: 100%;
}
</style>
</div>
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