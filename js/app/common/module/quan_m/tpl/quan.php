
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-dns-prefetch-control" content="on"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta content="telephone=no" name="format-detection"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
    <title><?php echo $coupon_goods['title']; ?>-<?php echo $user_cms['siteName']; ?></title>
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
    <a href="<?php echo $model_base_url; ?>?action=market_url&browser=1&id=<?php echo $coupon_goods['num_iid']; ?>&pid=<?php if(!empty($pid_default)&&TaobaoUtil::is_pid($pid_default)){ echo trim($pid_default); }else{ echo trim($user_cms['pc_pid']); } ?>&link=<?php echo urlencode($taoke_item_m_url); ?>" >
        <div class="img">
            <!-- $this->isIOS==2 表示微信端-->
            <img src="<?php echo $data_img; ?>_310x310.jpg">
        </div>
        <div class="title-wrapper clearfix">
            <span class="tmall"></span>
            <?php echo $coupon_goods['title']; ?>
        </div>
    </a>
        <div class="recommend-wrapper">
            <?php if(!empty($taoke_item_coupon_link_tao_token)){ ?>
            <div class="am-cf">
                <input style="display:none;" id="keleTkl" value="<?php echo $coupon_goods['title']; ?>  原价<?php echo coreAppCache::number_format($goods_price); ?>元，领券后【<?php echo coreAppCache::number_format($goods_buy_price); ?>元】  复制这条信息，打开「手机淘宝」领券下单 <?php echo $taoke_item_coupon_link_tao_token; ?>">
                <p class="am-text-warning am-text-default">【淘口令购买】长按框内 &gt; 全选 &gt; 复制</p>
                <div class="detail-command-box am-panel">
                    <div class="am-panel-bd">
                        <span id="code2_ios" class="kl-tkl" style="display: none;">复制框内整段文字，打开「手机淘宝」即可「领取优惠券」并购买<?php echo $taoke_item_coupon_link_tao_token; ?> <?php echo $coupon_goods['title']; ?>  原价<?php echo coreAppCache::number_format($goods_price); ?>元，领券后【<?php echo coreAppCache::number_format($goods_buy_price); ?>元】  复制这条信息，打开「手机淘宝」领券下单 </span>
                        <textarea class="kl-tkl" id="android1" onfocus="iptNum(this, true);" oninput="iptNum(this, false);">复制框内整段文字，打开「手机淘宝」即可「领取优惠券」并购买<?php echo $taoke_item_coupon_link_tao_token; ?> <?php echo $coupon_goods['title']; ?>  原价<?php echo coreAppCache::number_format($goods_price); ?>元，领券后【<?php echo coreAppCache::number_format($goods_buy_price); ?>元】  复制这条信息，打开「手机淘宝」领券下单 </textarea>
                    </div>
                </div>
                <div class="am-text-center am-margin-top-sm">
                    <button type="button" class="am-btn am-btn-danger am-round btn-kouling am-btn-sm" data-clipboard-text="<?php echo $coupon_goods['title']; ?>  原价<?php echo coreAppCache::number_format($goods_price); ?>元，领券后【<?php echo coreAppCache::number_format($goods_buy_price); ?>元】  复制这条信息，打开「手机淘宝」领券下单 <?php echo $taoke_item_coupon_link_tao_token; ?>">  一键复制</button>
                </div>
                <p>
                    <span class="am-text-primary">点击复制后，请打开【手机淘宝】购买！ 注：若复制失败，请手动复制淘口令
                    </span>&nbsp;
                        <span class="am-text-warning ">
                          温馨提示：手机无【手机淘宝】者，可选择领券购买方式哦~
                    </span>
                    <?php if(empty($goods_coupon_price)){ ?>
                    <span style="color:red">
                        <span>特别提醒：</span>
                        云购产品为无优惠券产品，复制淘口令打开手机淘宝后，将提示优惠券已失效，请忽略提示直接点产品购买。
                    </span>
                    <?php } ?>
                </p>
            </div>
            <?php } ?>
            <div class="text">
                <?php if(!empty($coupon_goods['comment'])){ ?>
                <span>小编推荐：</span><?php echo $coupon_goods['comment']; ?>
                <?php } ?>
            </div>
        </div>
        <div class="goods-jq clearfix">
        <div class="goods-price fl"><b>￥<?php echo coreAppCache::number_format($goods_buy_price); ?></b>
        <?php if(!empty($goods_coupon_price)){ ?>    券后价<?php } ?>
        </div>
        <?php if(!empty($goods_coupon_price)){ ?>
        <div class="goods-quan fl">优惠券：<b><?php echo  coreAppCache::number_format($goods_coupon_price); ?></b>元</div>
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
    <div class="pic-detail">
        <div class="pic-detail-btn" data-goodsid="<?php echo $coupon_goods['num_iid']; ?>">
            <span class="pic-detail-btn-span">查看图文详情<i></i></span>
        </div>
        <div class="pic-detail-show"></div>
        <span class="loadding-lab">加载中，请稍后……</span>
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
        <?php $coupon_goods_list = $coupon_goods_list2; $page_model = 'quan'; ?>    
        <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>         
    </div>
    <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/yun.php');?>
</div>
<!-- <div class="buy-wrapper img"  >
    <span class="price">券后价：<i>&yen;<b style="font-size:22px;"><?php echo coreAppCache::number_format($goods_buy_price); ?></b></i></span>
    <a href="<?php echo $taoke_item_m_url; ?>" class="buy-btn ui-link" rel="nofollow" 
    <?php if($goods_quan_type!=1){ ?>  biz-itemid="<?php echo $coupon_goods['num_iid']; ?>" isconvert="1" <?php } ?>
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
                        <a href="<?php echo $model_base_url; ?>?action=market_url&browser=1&id=<?php echo $coupon_goods['num_iid']; ?>&pid=<?php if(!empty($pid_default)&&TaobaoUtil::is_pid($pid_default)){ echo trim($pid_default); }else{ echo trim($user_cms['pc_pid']); } ?>&link=<?php echo urlencode($taoke_item_m_url); ?>">
                            <?php if(empty($goods_coupon_price)){ echo "无券";} ?>浏览器购买
                        </a>
                    </button>
                </li>
               
                <li>
                    <button type="button" class="fq-amoy fq-text-white am-btn am-padding-horizontal-xs am-text-sm" data-am-modal="{target: '#doc-modal-1', closeViaDimmer: 0}">
                        <?php if(empty($goods_coupon_price)){ echo "无券";} ?>淘口令购买
                    </button>
                </li>
            </ul>
        </li>
        <?php }else{ ?>
        <li>
            <ul class="am-avg-sm-1 am-text-center">
                <li>
                    <button type="button" class="fq-browser fq-text-white am-btn am-padding-horizontal-xs am-text-sm">
                        <a href="<?php echo $model_base_url; ?>?action=market_url&browser=1&id=<?php echo $coupon_goods['num_iid']; ?>&pid=<?php if(!empty($pid_default)&&TaobaoUtil::is_pid($pid_default)){ echo trim($pid_default); }else{ echo trim($user_cms['pc_pid']); } ?>&link=<?php echo urlencode($taoke_item_m_url); ?>">
                            浏览器购买
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
                    <span id="copy_key_ios"><?php echo $coupon_goods['title']; ?>  原价<?php echo coreAppCache::number_format($goods_price); ?>元，领券后【<?php echo coreAppCache::number_format($goods_buy_price); ?>元】  复制这条信息，打开「手机淘宝」领券下单 <?php echo $taoke_item_coupon_link_tao_token; ?></span>
                    <textarea style="display: none;height:153px" id="copy_key_android" type="text" class="am-form-field am-text-center am-text-sm" oninput="regain();"><?php echo $coupon_goods['title']; ?>  原价<?php echo coreAppCache::number_format($goods_price); ?>元，领券后【<?php echo coreAppCache::number_format($goods_buy_price); ?>元】  复制这条信息，打开「手机淘宝」领券下单 <?php echo $taoke_item_coupon_link_tao_token; ?></textarea>
                </div>
            </div>
            <!--二合一淘口令结束-->
            <div class="copy_taowords am-margin-bottom" style="display:none;">
                <div class="am-text-center am-margin-top-sm">
                     <div class="share_content am-margin-bottom am-badge-success am-badge"></div>
                    <a class="share am-padding-vertical-xs am-padding-horizontal-lg am-round am-inline-block" data-taowords="<?php echo $coupon_goods['title']; ?>  原价<?php echo coreAppCache::number_format($goods_price); ?>元，领券后【<?php echo coreAppCache::number_format($goods_buy_price); ?>元】  复制这条信息，打开「手机淘宝」领券下单 <?php echo $taoke_item_coupon_link_tao_token; ?>">
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
                <?php if(empty($goods_coupon_price)){ ?>
                <span style="color:red">
                    <span>特别提醒：</span>
                    云购产品为无优惠券产品，复制淘口令打开手机淘宝后，将提示优惠券已失效，请忽略提示直接点产品购买。
                </span>
                <?php } ?>
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
            /*var clipboard_agent = new Clipboard('.share_generalize', {
                target: function(trigger) {
               
                    return document.querySelector('.share_content');
                }
            });
            clipboard_agent.on('success', function(e){
                e.trigger.innerHTML="已复制";
                e.trigger.style.backgroundColor="#9ED29E";
                e.trigger.style.borderColor="#9ED29E";
                //var conpycontent=$(".share_content").html();
                //console.log(conpycontent);
               $(".share_content").html('');
                e.clearSelection();
            });
            clipboard_agent.on('error', function(e) {
                $(".share_content").html('');
                $("#fq_alert_info").html("<div class=\"am-text-danger\">由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！</div><div class=\"am-margin\" style=\"text-align: left;\">"+$(".share_content").html()+"</div>");
                $('#fq_alert').modal();
            });
*/
            /*var clipboard_generalize = new Clipboard('.share_generalize', {
                target: function() {
                    return document.querySelector('.share_generalize_content');
                }
            });
            clipboard_generalize.on('success', function(e){
                e.trigger.innerHTML="已复制";
                e.trigger.style.backgroundColor="#9ED29E";
                e.trigger.style.borderColor="#9ED29E";
                $(".share_generalize_content").hide();
                console.info('Action:', e.action);
                console.info('Text:', e.text);
                console.info('Trigger:', e.trigger);
                e.clearSelection();
            });
            clipboard_generalize.on('error', function(e) {
                $(".share_generalize_content").hide();
                $("#fq_alert_info").html("<div class=\"am-text-danger\">由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！</div><div class=\"am-margin\" style=\"text-align: left;\">"+$(".share_generalize_content").html()+"</div>");
                $('#fq_alert').modal();
            });*/
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
    });

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

    //口令
    $('.fq-amoy').click(function () {
        $.ajax({
            url: cms_all_config.yun_cms_url,
            data: {
                app_id:'<?php echo $app_id; ?>',
                action:'market_url',
                ajax: '1',
                id: '<?php echo $coupon_goods['num_iid']; ?>',
                pid: '<?php if(!empty($pid_default)&&TaobaoUtil::is_pid($pid_default)){ echo trim($pid_default); }else{ echo trim($user_cms['pc_pid']); } ?>',
            },
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function (result) {
                if (result.result.map.status == 0) {

                }
                if(result.result.map.item.tao_token){
                    var taoken_html = "<?php echo $coupon_goods['title']; ?>"
                        +"原价<?php echo coreAppCache::number_format($goods_price); ?>元，领券后【<?php echo coreAppCache::number_format($goods_buy_price); ?>元】" 
                        +"复制这条信息，打开「手机淘宝」领券下单 "
                        +result.result.map.item.tao_token;
                    var taoken_html_copy = "复制框内整段文字，打开「手机淘宝」即可「领取优惠券」并购买"+result.result.map.item.tao_token+" <?php echo $coupon_goods['title']; ?>  原价<?php echo coreAppCache::number_format($goods_price); ?>元，领券后【<?php echo coreAppCache::number_format($goods_buy_price); ?>元】  复制这条信息，打开「手机淘宝」领券下单 "
                        ;    
                    $("#copy_key_ios").html(taoken_html);
                    $("#copy_key_android").html(taoken_html);
                    $(".fq-amoy-buy .share").attr('data-taowords',taoken_html);

                    $("#keleTkl").val(taoken_html);
                    $("#code2_ios").html(taoken_html_copy);
                    $("#android1").html(taoken_html_copy);
                    $(".btn-kouling").attr("data-clipboard-text",taoken_html);

                }
            }
        });
    });

    var market_url_count = 0;
    function get_market_url(){
        market_url_count++;
        if(market_url_count<8){
            $.ajax({
                url: cms_all_config.yun_cms_url,
                data: {
                    app_id:'<?php echo $app_id; ?>',
                    action:'market_url',
                    ajax: '1',
                    id: '<?php echo $coupon_goods['num_iid']; ?>',
                    pid: '<?php if(!empty($pid_default)&&TaobaoUtil::is_pid($pid_default)){ echo trim($pid_default); }else{ echo trim($user_cms['pc_pid']); } ?>',
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (result) {
                    if(result.result.map.item.tao_token){
                        var taoken_html = "<?php echo $coupon_goods['title']; ?>"
                            +"原价<?php echo coreAppCache::number_format($goods_price); ?>元，领券后【<?php echo coreAppCache::number_format($goods_buy_price); ?>元】" 
                            +"复制这条信息，打开「手机淘宝」领券下单 "
                            +result.result.map.item.tao_token;
                        var taoken_html_copy = "复制框内整段文字，打开「手机淘宝」即可「领取优惠券」并购买"+result.result.map.item.tao_token+" <?php echo $coupon_goods['title']; ?>  原价<?php echo coreAppCache::number_format($goods_price); ?>元，领券后【<?php echo coreAppCache::number_format($goods_buy_price); ?>元】  复制这条信息，打开「手机淘宝」领券下单 "
                            ;    
                        $("#copy_key_ios").html(taoken_html);
                        $("#copy_key_android").html(taoken_html);
                        $(".fq-amoy-buy .share").attr('data-taowords',taoken_html);

                        $("#keleTkl").val(taoken_html);
                        $("#code2_ios").html(taoken_html_copy);
                        $("#android1").html(taoken_html_copy);
                        $(".btn-kouling").attr("data-clipboard-text",taoken_html);
                        market_url_count = 10;
                    }
                    if(market_url_count<8){
                        setTimeout(get_market_url,1000*market_url_count);
                    }
                }
            });
        }
    }
    <?php 
    	    if(empty($api_url)){
    	        ?>        
    	    get_market_url();
    	        <?php
    	    }
    	    ?>
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

<style>
*,
:before,
 :after {
    box-sizing: content-box;
    -webkit-box-sizing: content-box;
}
   .kl-div {
    display: none
}

.detail-command-box p {
    margin: 0;
}

.detail-command-box {
    border: 1px dashed #ff6600;
    overflow: hidden;
}

.detail-command-box textarea {
    width: 100%;
    /*height: 100%;*/
}

.detail-command-box span,
.detail-command-box textarea {
    overflow: hidden;
    border: none;
    outline: none;
    resize: none;
    font-family: "Arial", "microsoft yahei";
}

.detail-command-box span {
    display: none;
}

.dialog {
    display: none;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.detail-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.6);
}

.detail-mask-content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    z-index: 2000;
    padding: 0 10px;
}

.detail-mask-allow {
    text-align: right;
    padding: 0 10px;
}

.detail-mask-allow img {
    width: 60px;
}

.detail-mask-command {
    width: 84%;
    margin: 0 8%;
    border-radius: 3px;
    overflow: hidden;
    font-size: 16px;
    background-color: #fff;
}

.detail-mask-command-head {
    overflow: hidden;
    padding: 20px 30px;
    background-image: -moz-linear-gradient(top, #ff7a23, #ff5700);
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ff7a23), color-stop(1, #ff5700));
    filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#ff7a23', endColorstr='#ff5700', GradientType='0');
}

.detail-mask-command-head p {
    color: #fff;
    padding-bottom: 5px;
    margin: 0;
}

.detail-mask-command-head p span {
    float: left;
    margin: 0;
    margin-right: 15px;
}

.detail-mask-command-head p img {
    width: 28px;
    height: 28px;
    margin: 0;
    vertical-align: middle;
}

.detail-mask-command-head p img.android-img {
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    margin: 0;
}

.detail-mask-command-head p i {
    margin: 0;
    color: #fff000;
}

.detail-mask-command-ios,
.detail-mask-command-android {
    overflow: hidden;
    display: none;
}

.detail-mask-con {
    padding: 10px 20px;
    text-align: center;
}

.detail-mask-con-title {
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    position: relative;
}

.detail-mask-title-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
}

.detail-mask-title-box div {
    display: inline-block;
    background-color: #fff;
    padding: 0 10px;
}

.detail-mask-line {
    width: 100%;
    height: 14px;
    border-bottom: 1px dashed #e2e2e2;
}

.detail-mask-tips {
    font-size: 12px;
    color: #969696;
    padding-bottom: 10px;
    margin: 0px;
}

.detail-mask-command-box {
    border: 1px dashed #ff6600;
    margin-bottom: 15px;
    font-family: Arial;
    color: #ff6600;
    line-height: 15px;
    overflow: hidden;
}

.detail-mask-command-box textarea {
    text-align: center;
    width: 98%;
    padding-top: 10px;
    line-height: 15px;
    color: #ff6600;
    font-size: 16px;
    outline: none;
    border: none;
    resize: none;
    font-family: "Arial", "microsoft yahei";
}

.detail-mask-command-box span,
.detail-mask-command-box textarea {
    display: none;
}

.detail-mask-copy-btn {
    color: #fff;
}
</style>

<script>
    $(".btn-kouling").attr("data-clipboard-text", $("#keleTkl").val());
    var clipboard1 = new Clipboard('.btn-kouling');
    clipboard1.on('success', function(e) {
        $(".btn-kouling").text("复制成功")
        $(".btn-kouling").addClass("am-btn-success").removeClass("am-text-primary")
    });

    clipboard1.on('error', function(e) {
        $(".btn-kouling").text("复制失败")
        $(".btn-kouling").addClass("am-btn-default").removeClass("am-text-primary")
    });

    function iptNum(ths, sta) {
        if (sta) {
            taoKeyNum = ths.value;
        }
        if (ths.value != taoKeyNum) {
            ths.value = taoKeyNum;
        }
    }

    function isIOS() {
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            return true;
        } else if (/android/.test(ua)) {
            return false;
        }
    }
    if (isIOS()) {
        $(".detail-command-box" + " textarea").hide();
        $(".detail-command-box" + " span").show();

    } else {
        $(".detail-command-box" + " span").hide();
        $(".detail-command-box" + " textarea").show();

    }
    $(".detail-mask").on("click", function() {
        $(".dialog").fadeOut(100, function() {
            $(".detail-mask-command-ios, .detail-mask-command-android").hide();
        });
    });
</script>

</body>
</html>
