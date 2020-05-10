
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-dns-prefetch-control" content="on"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta content="telephone=no" name="format-detection"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
    <title><?php echo $product['productName']; ?>-<?php echo $user_cms['siteName']; ?></title>
    <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
    <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
    <link href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/wapshow.css?v=201702221401" rel="stylesheet"/>
    <script src="//cdn.bootcss.com/amazeui/2.7.2/js/amazeui.min.js"></script>
    <link href="//cdn.bootcss.com/amazeui/2.7.2/css/amazeui.min.css" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/m/<?php echo $taoke_cms['css']; ?>.css?t=0616002">
</head>
<body>
<div class="main-title clearfix">
    <a href="javascript:void(0)" class="main-back"></a>
    <div class="menu-detail">商品详情</div>
    <a class="mui-action-menu main-more" href="javascript:void(0)" id="mui-action-menu"></a>
</div>
<!-- 主界面具体展示内容 -->
<div class="detail-wrapper">
    <a target="_blank" class="mall-click" href="<?php echo CPS::query_common_url($product['url'],$product['mall']['id'],$user_cms['user_id'],$user_cms['app_id'],$agent_id,0); ?>" data-url="<?php echo $product['url']; ?>"  data-mallid="<?php echo $product['mall']['id']; ?>" data-uid="<?php echo $user_cms['user_id']; ?>" data-pid="<?php echo $user_cms['app_id']; ?>" data-aid="<?php echo $agent_id; ?>" >
        <div class="img">
            <!-- $this->isIOS==2 表示微信端-->
            <img src="<?php echo $product['picUrl']; ?>">
        </div>
        <div class="title-wrapper clearfix">
            <span class="tmall"></span>
            <?php echo $product['productName']; ?>
        </div>
    </a>
        <div class="recommend-wrapper">
            <div class="text">
                <?php if(!empty($product['describe'])){ ?>
                <span>小编推荐：</span><?php echo $product['describe']; ?>
                <?php } ?>
            </div>
        </div>
        <div class="goods-jq clearfix">
        <div class="goods-price fl"><b>￥<?php echo coreAppCache::number_format($product['goods_buy_price']); ?></b>
        <?php if(!empty($product['user_goods_commission'])){ ?>
        (<b>预计返<?php echo coreAppCache::number_format($product['user_goods_commission']); ?></b>)
        <?php } ?>
        </div>
        <?php if(!empty($product['coupon_money'])){ ?>
        <div class="goods-quan fl">优惠券：<b><?php echo  coreAppCache::number_format($product['coupon_money']); ?></b>元</div>
        <?php } ?>
    </div>
</div>

<!-- $this->isIOS==2 表示微信端-->
<div class="tuwen-tkl">
    <div class="weixin-tip">
        <div class="wechat-line"></div>
        <div class="wechat-brow"></div>
        <div class="wechat-mask"></div>
    </div>
   

</div>

<script>
document.addEventListener("selectionchange", function (e) {
    if (window.getSelection().anchorNode.parentNode.id == 'code1_ios' && document.getElementById('code1_ios').innerText != window.getSelection()) {
        var key = document.getElementById('code1_ios');
        window.getSelection().selectAllChildren(key);
    }
    if (window.getSelection().anchorNode.parentNode.id == 'code2_ios' && document.getElementById('code2_ios').innerText != window.getSelection()) {
        var key = document.getElementById('code2_ios');
        window.getSelection().selectAllChildren(key);
    }
}, false);
</script>
<div class="pos-box clearfix">
    <div class="pos-title">
        <p><i></i>精品推荐<b></b></p>
    </div>
    <div class="ads-list" data-page="0">
        <?php $product_list = $product_list2; $page_model = 'quan'; ?>    
        <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>         
    </div>
</div>
<!-- <div class="buy-wrapper img"  >
    <span class="price">券后价：<i>&yen;<b style="font-size:22px;"><?php echo coreAppCache::number_format($goods_buy_price); ?></b></i></span>
    <a href="<?php echo $taoke_item_m_url; ?>" class="buy-btn ui-link" rel="nofollow" 
    <?php if($goods_quan_type!=1){ ?>  biz-itemid="<?php echo $product['num_iid']; ?>" isconvert="1" <?php } ?>
        class="buy-btn" target="_blank">去<?php echo $user_type_name; ?></a>
    <a href="/index.php?r=p/q&id=1921097"  class="coupon-btn normal-btn ui-link">
            <span class="coupon-btn-l">&yen;<i><?php echo  coreAppCache::number_format($goods_coupon_price); ?></i>券</span>
            <span class="coupon-btn-r">点击<br/>领取</span>
    </a>
</div> -->

<link href="//cdn.bootcss.com/amazeui/2.7.2/css/amazeui.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_l1c96mq0nbivygb9.css">

<!--底部菜单-->
<div class="fq-grandeur-menu fq-background-white">
    <ul class="am-avg-sm-2">
        <li>
            <ul class="am-avg-sm-2 am-padding-left-xs">
                <li>
                    <a href="<?php echo $model_base_url; ?>" class="am-padding-vertical-sm am-block">
                        <i class="icon-shouye iconfont am-text-center am-vertical-align-middle"></i>
                        <span class="fq-grandeur-index am-text-sm am-text-center am-vertical-align-middle">首页</span>
                    </a>
                </li>
                <li>
                    <div class="am-inline-block" data-am-modal="{target:'#qrcode_large'}">
                        <!-- <a class="am-padding-vertical-sm am-block">
                            <i class="icon-liaotiankefu iconfont am-text-center am-vertical-align-middle"></i>
                            <span class="fq-grandeur-service am-text-sm am-text-center am-vertical-align-middle">客服</span>
                        </a> -->
                    </div>
                </li>
            </ul>
        </li>
        <?php if(!empty($taoke_item_coupon_link_tao_token)){ ?>
        <li>
            <ul class="am-avg-sm-2 am-text-center">
                <li>
                    <button type="button" class="fq-browser fq-text-white am-btn am-padding-horizontal-xs am-text-sm">
                        <a class="mall-click" href="<?php echo CPS::query_common_url($product['url'],$product['mall']['id'],$user_cms['user_id'],$user_cms['app_id'],$agent_id,0); ?>" data-url="<?php echo $product['url']; ?>"  data-mallid="<?php echo $product['mall']['id']; ?>" data-uid="<?php echo $user_cms['user_id']; ?>" data-pid="<?php echo $user_cms['app_id']; ?>" data-aid="<?php echo $agent_id; ?>">
                            前往购买
                        </a>
                    </button>
                </li>
               
                <li>
                    <button type="button" class="fq-amoy fq-text-white am-btn am-padding-horizontal-xs am-text-sm" data-am-modal="{target: '#doc-modal-1', closeViaDimmer: 0}">
                        淘口令购买
                    </button>
                </li>
            </ul>
        </li>
        <?php }else{ ?>
        <li>
            <ul class="am-avg-sm-2 am-text-center">
                <li>
                    <button type="button" class="fq-browser fq-amoy fq-text-white am-btn am-padding-horizontal-xs am-text-sm">
                        <a href="<?php echo $product['coupon_url']; ?>" >
                            先领<?php echo  coreAppCache::number_format($product['coupon_money']); ?>元券
                        </a>
                    </button>
                </li>
                <li>
                    <button type="button" class="fq-browser fq-text-white am-btn am-padding-horizontal-xs am-text-sm">
                        <a class="mall-click" href="<?php echo CPS::query_common_url($product['url'],$product['mall']['id'],$user_cms['user_id'],$user_cms['app_id'],$agent_id,0); ?>" data-url="<?php echo $product['url']; ?>"  data-mallid="<?php echo $product['mall']['id']; ?>" data-uid="<?php echo $user_cms['user_id']; ?>" data-pid="<?php echo $user_cms['app_id']; ?>" data-aid="<?php echo $agent_id; ?>">
                            前往购买
                        </a>
                    </button>
                </li>
            </ul>
        </li>
        <?php } ?>
    </ul>
</div>

<div class="fq-amoy-buy am-modal am-modal-no-btn" tabindex="-1" id="doc-modal-1">
    <div class="fq-background-white am-modal-dialog">
        <div class="am-modal-hd">
            淘口令购买
            <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
        </div>
        <div class="am-modal-bd am-padding-0">
            <!--淘口令-->
            <!--二合一淘口令开始-->
            <div class="am-margin-vertical am-margin-horizontal-lg">
                <div class="fq-goods-border fq-background-white am-text-center am-margin-top am-padding-vertical am-padding-horizontal-sm">
                    <div class="fq-explain am-center am-text-center">
                        <span class="fq-nowrap fq-text-white am-padding-horizontal-sm">长按框内 > 全选 > 复制</span>
                    </div>
                    <span id="copy_key_ios"><?php echo $taoke_item_coupon_link_tao_token; ?></span>
                    <textarea style="display: none;height:33px" id="copy_key_android" type="text" class="am-form-field am-text-center am-text-sm" oninput="regain();"><?php echo $taoke_item_coupon_link_tao_token; ?></textarea>
                </div>
            </div>
            <!--二合一淘口令结束-->
            <div class="copy_taowords am-margin-bottom" style="display:none;">
                <div class="am-text-center am-margin-top-sm">
                     <div class="share_content am-margin-bottom am-badge-success am-badge"></div>
                    <a class="share am-padding-vertical-xs am-padding-horizontal-lg am-round am-inline-block" data-taowords="<?php echo $taoke_item_coupon_link_tao_token; ?>">
                        一键复制
                    </a>
                    <div class="am-margin-top-sm am-text-xs am-text-primary am-margin-horizontal-sm">点击复制后，请打开【手机淘宝】购买！</div>
                </div>
            </div>
            <div class="fq-instructions am-text-left am-text-xs am-padding-vertical-sm am-padding-horizontal-lg">
                <span>
                    <span>使用说明：</span>
                    <span>复制淘口令后打开【手机淘宝】即可领取优惠券购买！</span>
                </span>
                <br />
                <span>
                    <span>温馨提示：</span>
                    手机无【手机淘宝】者，可选择浏览器购买方式哦~
                </span>
            </div>
        </div>
    </div>
</div>
<div class="copy_taoword_content am-margin-bottom am-badge-success am-badge" id="copy_taoword_content"></div>

<nav id="detail-top-menu">
    <div class="arrow"></div>
    <div class="mask show" id="menu-mask"></div>
    <div class="detail-menu-content">
        <ul class="main-detail">
            <li>
                <a href="<?php echo $model_base_url; ?>">首页</a>
            </li>
            <!-- <li>
                <a href="/index.php?r=index/classify">搜索/分类</a>
            </li>
            <li>
                <a href="/index.php?r=index/customService">客服</a>
            </li> -->
        </ul>
    </div>
</nav>
<div class="toTop">&#xe601;</div>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/function.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
<script src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/js/cms_detail.js?v=201702221401"></script>

<script>
    $(function () {
        //事件监听
        //------------------------------------------
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/iphone os 10/i) == "iphone os 10") {
            $('.fq-amoy-buy .copy_taowords').show();
            var clipboard = new Clipboard('.share', {
                target: function() {
                                    
                    return document.querySelector('.copy_taoword_content');
                }
            });
            clipboard.on('success', function(e){
                e.trigger.innerHTML="已复制";
                e.trigger.style.backgroundColor="#9ED29E";
                e.trigger.style.borderColor="#9ED29E";
                //var conpycontent=$(".share_content").html();
                //console.log(conpycontent);
               $(".copy_taoword_content").html('');
                console.info('Action:', e.action);
                console.info('Text:', e.text);
                console.info('Trigger:', e.trigger);
                e.clearSelection();
            });
            clipboard.on('error', function(e) {
                $(".copy_taoword_content").html('');
                $("#fq_alert_info").html("<div class=\"am-text-danger\">由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！</div><div class=\"am-margin\" style=\"text-align: left;\">"+$(".copy_taoword_content").html()+"</div>");
                $('#fq_alert').modal();
            });
            if('' == 1){
                //复制推广
                var clipboard_select = new Clipboard('.share_generalize', {
                    target: function(trigger) {
                        return document.querySelector('.agent_content');
                    }
                });

                clipboard_select.on('success', function(e){
                    $(".agent_content").hide();
                    e.trigger.innerHTML="已复制";
                    e.trigger.style.backgroundColor="#9ED29E";
                    e.trigger.style.borderColor="#9ED29E";
                    e.clearSelection();
                });

                clipboard_select.on('error', function(e) {
                    $(".agent_content").hide();
                    $("#fq_alert_info").html("<div class=\"am-text-danger\">由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！</div>");
                    $('#fq_alert').modal();
                    $(".agent_content").html('');
                });
            }
        }
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
            if (window.getSelection().anchorNode.parentNode.id == 'copy_key_ios5' && document.getElementById('copy_key_ios5').innerText != window.getSelection()) {
                var key = document.getElementById('copy_key_ios5');
                window.getSelection().selectAllChildren(key);
            }
        }, false);
    });
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
        if (window.getSelection().anchorNode.parentNode.id == 'copy_key_ios5' && document.getElementById('copy_key_ios5').innerText != window.getSelection()) {
            var key = document.getElementById('copy_key_ios5');
            window.getSelection().selectAllChildren(key);
        }
    }, false);

    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/iphone/i) == "iphone" || ua.match(/ipad/i) == "ipad") {

        $('.fq-explain span').html("长按框内 > 拷贝");

    } else {
        $("#copy_key_ios").hide();
        $("#copy_key_ios1").hide();
        $("#copy_key_ios2").hide();
        $("#copy_key_ios3").hide();
        $("#copy_key_ios4").hide();
        $('#copy_key_ios5').hide();
        $("#copy_key_android").show();
        $("#copy_key_android1").show();
        $("#copy_key_android2").show();
        $("#copy_key_android3").show();
        $("#copy_key_android4").show();
        $("#copy_key_android5").show();
    }
    $(".fq-amoy-buy .share").on('click', function() {
        var taowords = $(this).attr('data-taowords');
        console.log(taowords);
        $('.copy_taoword_content').html(taowords);
    })


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
    if(document.getElementById("copy_key_android5")){
        var taokouling_value5 = document.getElementById("copy_key_android5").value;
        function regain5() {
            document.getElementById('copy_key_android5').value = taokouling_value4;
        }
    }
</script>

<script language="javascript">
$("img.lazy").lazyload();
</script>
</body>
</html>
