<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>用户登录-<?php echo $user_cms['siteName']; ?></title>
  <meta name="description" content="<?php echo $user_cms['description']; ?>"/>
  <meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
<link rel="stylesheet" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/m/<?php echo $taoke_cms['css']; ?>.css?t=0616002">
</head>
<body class="login-container">
  <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/top.php');?>
  <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>
  <div class="login-box">
    <form action="" class="am-form" data-am-validator>
      <div class="am-form-group">
        <label for="doc-vld-name-2"><i class="am-icon-user"></i></label>
        <input type="text" id="user_name" placeholder="输入帐号名" />
      </div>

      <div class="am-form-group">
        <label for="doc-vld-email-2"><i class="am-icon-key"></i></label>
        <input type="password" id="password" placeholder="输入密码" />
      </div>
      <button id="btn-login" class="am-btn am-btn-secondary"  type="button">登录</button>
      <p id="user_name_warn"></p>
      <a class="am-btn am-btn-secondary" href="<?php echo $model_base_url; ?>?action=register">注册帐号</a>
    </form>
  </div>
  <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/menu.php');?>     
  <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
</body>
</html>
