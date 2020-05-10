
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <title>积分-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
        <meta name="description" content="<?php echo $user_cms['description']; ?>"/>
        <meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
<link rel="stylesheet" type="text/css" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/baby_list.css?v=20170209">
</head>
<body>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/top.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header-banner.php');?>

<div class="tk-list-choice page-all mb20">
	<div class="list-choice-first clearfix">
		
	</div>
</div>
<div class="list-info page-all mb30">
	<div class="my-juanpi">

        <!-- 二级导航 -->
        <div class="sider-bar">
		    <ul>
		   <!--  <li class="noboder">我的订单</li>
		    <li class="sub-menu">
		        <ul>
		            <li class="active"><a href="//user.juanpi.com/order/index">全部订单</a></li>
		            <li><a href="//user.juanpi.com/order/index/t/1">待付款</a><span></span></li>
		            <li><a href="//user.juanpi.com/order/index/t/4">运送中</a><span></span></li>
		        </ul>
		    </li> -->
<!-- 		    <li><a href="//user.juanpi.com/refund/backList">我的售后</a>
 -->		    <!-- </li> -->
 			<li><a href="<?php echo $model_base_url; ?>?action=member">个人中心</a></li>
            <li class="active"><a href="<?php echo $model_base_url; ?>?action=member&to_page=point">我的积分</a></li>
            <li><a href="<?php echo $model_base_url; ?>?action=member&to_page=cash">提现记录</a></li>
            <li><a href="<?php echo $model_base_url; ?>?action=member&to_page=setting">个人设置</a></li>
            <li class=""><a href="<?php echo $model_base_url; ?>?action=member&to_page=passwd">密码设置</a></li>
<!-- 		    <li><a href="//user.juanpi.com/coupon">我的优惠券</a></li>
		    <li class="noboder"><a target="_blank" href="//user.juanpi.com/favorite">我的收藏</a></li> -->
		    </ul>
		</div>
        <!-- 二级导航 -->

            <div class="cash-voucher fr">
                <div class="rder-infolist">
                    <div class="wallet-overview">
                        <div class="overview-item item-inlineblock">
                            <div><img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/member/money_03.png"></div>
                            <div class="overview-total">
                                <div>
                                    <div>预计总积分</div>
                                    <div class="tips-icon"><img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/member/info.png" alt=""></div>
                                </div>
                                <div class="fontsize-20">
                                    <span class="color-red" id="member_points"></span>个
                                </div>
                                <div class="hover-tips">积分为兑换礼品或者返现为现金使用，预计的总积分。<div class="triangle"></div></div>
                            </div>
                        </div>
                        <div class="overview-item segmentation">
                            <div>
                                <span><img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/member/money_02.png" alt=""></span>
                                <span class="fw-bold">
                                    可用积分：<em class="color-red" id="member_points_available"></em>
                                    <div class="tips-icon"><img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/member/info.png" alt=""></div>
                                    <div class="hover-tips">积分为兑换礼品或者返现为现金使用,可用积分是可以立即使用的。</div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="activate coupon-active">
                    <span>积分兑换金额:</span>
                    <input type="text" value="" id="point-code" autocomplete="off">
                    <div class="activate-button f_shadow exchange-btn" style="cursor: default;">输入积分</div>
                    <span class="err" style="display:none"></span>
                </div>

                <!---->
                <div class="rder-infolist detail-list">
                    <div class="title">兑换记录</div>
                    <div class="thead">
                        <span>时间</span>
                        <span>积分</span>
                        <span>状态</span>
                        <span>备注</span>
                    </div>
                    <div>
                        <ul id="member_list"></ul>
                    </div>
                </div>
                <!---->
                <input id="member_point" type="hidden" />
            </div>
        </div>

</div>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
</body>
</html>

