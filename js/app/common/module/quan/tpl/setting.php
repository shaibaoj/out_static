
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <title>个人设置-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
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
 			<li><a href="<?php echo $model_base_url; ?>?action=member">个人中心</a></li>
            <li><a href="<?php echo $model_base_url; ?>?action=member&to_page=point">我的积分</a></li>
            <li><a href="<?php echo $model_base_url; ?>?action=member&to_page=cash">提现记录</a></li>
            <li class="active"><a href="<?php echo $model_base_url; ?>?action=member&to_page=setting">个人设置</a></li>
            <li class=""><a href="<?php echo $model_base_url; ?>?action=member&to_page=passwd">密码设置</a></li>
		    </ul>
		</div>
        <!-- 二级导航 -->

            <div class="cash-voucher fr">
                
                <div class="activate coupon-active">
                    <span>qq号码:</span>
                    <input type="text" value="" id="member-qq" autocomplete="off">
                </div>
                <div class="activate coupon-active">
                    <span>手机号:</span>
                    <input type="text" value="" id="member-mobile" autocomplete="off">
                </div>
                <div class="activate coupon-active">
                    <span>email:</span>
                    <input type="text" value="" id="member-email" autocomplete="off">
                </div>
                <div class="activate coupon-active">
                    <span>支付宝:</span>
                    <input type="text" value="" id="member-alipay" autocomplete="off">
                </div>
                <div class="activate coupon-active">
                    <span>登录密码:</span>
                    <input type="password" value="" id="member-passwd" autocomplete="off" placeholder="请输入您的登录密码">
                </div>
                <div class="activate coupon-active">
                    <div class="activate-button f_shadow setting-btn" style="cursor: default;">提交个人信息</div>
                    <span class="err" id="err" style="display:none"></span>
                </div>
                <!---->
            </div>

            <input id="member_setting" type="hidden" />
    </div>

</div>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
</body>
</html>

