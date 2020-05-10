
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-dns-prefetch-control" content="on"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta content="telephone=no" name="format-detection"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
    <title><?php echo $mall['sitename']; ?>-<?php echo $user_cms['siteName']; ?></title>
    <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
    <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
    <link href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/wapshow.css?v=201702221401" rel="stylesheet"/>
    <script src="//cdn.bootcss.com/amazeui/2.7.2/js/amazeui.min.js"></script>
    <link href="//cdn.bootcss.com/amazeui/2.7.2/css/amazeui.min.css" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/mall.css?t=0616002">
    <link rel="stylesheet" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/m/<?php echo $taoke_cms['css']; ?>.css?t=0616002">
</head>
<body>
<div class="main-title clearfix">
    <a href="javascript:void(0)" class="main-back"></a>
    <div class="menu-detail"><?php echo $mall['sitename']; ?></div>
    <a class="mui-action-menu main-more" href="javascript:void(0)" id="mui-action-menu"></a>
</div>
<div class=" mall-detail">
    <section id="detail">
        <div class="detail-wrapper">
            <div class="logo" style="background-image:url(<?php echo $mall['pic_url']; ?>);"></div>
            <div class="text-wrapper">
                <div class="rate-box">
                    <?php if(!empty($mall['commission_rate'])){ ?>
                    <span class="text">最高返现:</span>
                    <span class="rate"><?php echo $mall['commission_rate']; ?></span>
                    <span class="icon-percent"></span>
                    <?php }else{ ?>
                    <span class="text"></span>
                    <span class="rate"></span>
                    <span class="icon-percent"></span>
                    <?php } ?>
                </div>
                <div class="describe"><?php echo $mall['introduce']; ?></div>
            </div>
        </div>
        <span class="icon-goback icon-goback-gray"></span>
        <span class="main-menu main-menu-gray">
            <div class="ui-menu" style="display: none;">
                <span data-role="corner"></span>
                <ul>
                    <li><a href="/wise/" class="btn-home">首页</a></li>
                    <li><a href="/wise/ucenter" class="btn-ucenter">个人中心</a></li>
                    <li><a href="/wise/help" class="btn-help">帮助与反馈</a></li>
                    <li><a class="btn-share">分享</a></li>
                </ul>
            </div>
            <div class="ui-menu-mask" style="display: none;"></div>
        </span>
    </section>

    <section id="content">
        
        <ul class="tab-list">
            <li class="tab-item cur one" data-index="1">返利说明</li>
        </ul>
        
        <div class="wrapper">
            <div class="tab-panel" s-id="s8652608">
                <div class="list-content">
                    
                    <div class="rate-list">
                        <div class="rate-tips">
                            <i class="icon-biao"></i>
                            <p class="average-time-info">登录后，下单后根据商城情况，延迟一段时间（<strong>平均1分钟</strong>），您可以在个人中心查看返利。</p>
                        </div>
                        <!-- <div class="title">商家返利比例</div>
                        <div class="table-box first-table">
                            <div class="more-first">
                                <span>点击展开</span><span class="icon-downarrow"></span>
                            </div>
                        </div>

                        <div class="table-box second-table hide">
                            <table width="100%" border="0" cellspacing="16" cellpadding="0">
                                    <tbody><tr>
                                        <td width="60%"><span>商品类别</span></td>
                                        <td width="40%"><span>返利比例</span></td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                            <div class="more-second">
                                <span>点击展开</span><span class="icon-downarrow"></span>
                            </div>
                        </div> -->
                        <!-- <div class="rate-detail">
                            <div class="sub-title">返利详情</div>
                            <ul class="text-con">
                                <li>双12期间部分携程特价商品为APP专享，可能需跳转到携程APP下单，此部分订单无跟单无返利；</li>
                                <li>酒店返利不包含：餐饮、娱乐、酒水、通讯及政府税金等其他费用；每间酒店每晚金额超过600元的按600元计算返利</li>
                                <li>机票返利不包含：退票、儿童票、婴儿票的机票消费总金额（不含机场建设费和燃油附加税）</li>
                            </ul>
                        </div> -->

                        <div class="other">
                            <div class="sub-title">其他返利说明</div>
                            <ul class="text-con">
                                <li>购物消费前，请确保已经登录<?php echo $user_cms['siteName']; ?>，通过<?php echo $user_cms['siteName']; ?>网站返利页面进入商家进行消费，下单后在<?php echo $user_cms['siteName']; ?>订单查询页面查询到跟踪订单后，系统才能计算返利</li>
                                <li>登录<?php echo $user_cms['siteName']; ?>后跳转至第三方商家消费，购物车已有商品、已有订单必须清空后重新下单付款，否则会出现无法记录返利的情况</li>
                                <li>返利比例仅针对净销售额（即订单总金额扣除优惠券、礼品卡、商城积分、商城账户余额等抵扣部分）适用，不适用于缺货商品金额、运费金额以及退换货部分金额；特殊商家的返利根据具体政策执行</li>
                                <li>因系统自动拆分订单导致订单返利发生变化，以拆分后的订单返利为准</li>
                                <li>如因业务发展，新增品类或活动有可能不参与返还，具体以商家返还订单为准</li>
                                <li>因第三方商家系统问题，部分商品与类目返利比例会有误差，均以<?php echo $user_cms['siteName']; ?>个人中心订单详情中的返利信息为准</li>
                                <li>返利比例，是根据订单金额数返还对应比例的现金折算，返利比例为最高返利比例</li>
                                <li>去往第三方商家消费成功后，即可根据返利比例获取返利金额，实际获取金额数以<?php echo $user_cms['siteName']; ?>个人中心订单详情中的返利金额为准</li>
                                <li>如在第三方商家消费遇到任何商品或服务问题，请直接联系第三方商家解决</li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        
    </section>

</div>

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
                        <a class="mall-click" href="<?php echo CPS::query_common_url($mall['domain_url'],$mall['id'],$user_cms['user_id'],$user_cms['app_id'],$agent_id,0); ?>" data-url="<?php echo $mall['url']; ?>"  data-mallid="<?php echo $mall['id']; ?>" data-uid="<?php echo $user_cms['user_id']; ?>" data-pid="<?php echo $user_cms['app_id']; ?>" data-aid="<?php echo $agent_id; ?>">
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
            <ul class="am-avg-sm-1 am-text-center">
                <li>
                    <button type="button" class="fq-browser fq-text-white am-btn am-padding-horizontal-xs am-text-sm">
                        <a class="mall-click" href="<?php echo CPS::query_common_url($mall['domain_url'],$mall['id'],$user_cms['user_id'],$user_cms['app_id'],$agent_id,0); ?>" data-url="<?php echo $mall['url']; ?>"  data-mallid="<?php echo $mall['id']; ?>" data-uid="<?php echo $user_cms['user_id']; ?>" data-pid="<?php echo $user_cms['app_id']; ?>" data-aid="<?php echo $agent_id; ?>">
                            前往购买拿返利
                        </a>
                    </button>
                </li>
            </ul>
        </li>
        <?php } ?>
    </ul>
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

</body>
</html>
