<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>用户注册-<?php echo $user_cms['siteName']; ?></title>
  <meta name="description" content="<?php echo $user_cms['description']; ?>"/>
  <meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
<link rel="stylesheet" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/m/<?php echo $taoke_cms['css']; ?>.css?t=0616002">
</head>
<body class="register-container">
  <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/top.php');?>
  <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>

  <div class="register-box">
      <form action="" class="am-form" data-am-validator>
        <fieldset>
          <legend>注册用户<p class="register-info">账号可以使用手机或者邮箱注册，但是仔细核对后，填入正确信息。</p></legend>
          <div class="am-form-group">
            <div class="am-g">
              <div class="am-u-md-2 am-padding-0 am-text-right">
                <label for="doc-vld-name-2" class="register-name">账号</label>
              </div>
              <div class="am-u-md-10">
                <input type="text" id="user_name" placeholder="输入用户名（至少 3 个字符）" />
              </div>
            </div>
          </div>
          <div class="am-form-group">
            <div class="am-g">
              <div class="am-u-md-2 am-padding-0 am-text-right">
                <label for="doc-vld-pwd-1" class="register-pwd">密码</label>
              </div>
              <div class="am-u-md-10">
                <input type="password" id="password" />
              </div>
            </div>
          </div>
          <div class="am-form-group">
            <div class="am-g">
              <div class="am-u-md-2 am-padding-0 am-text-right">
                <label for="doc-vld-pwd-1" class="register-pwd">qq</label>
              </div>
              <div class="am-u-md-10">
                <input type="text" id="qq" />
              </div>
            </div>
          </div>
          <div class="am-form-group">
            <div class="am-g">
              <div class="am-u-md-2 am-padding-0 am-text-right">
                <label for="doc-vld-pwd-1" class="register-pwd">手机</label>
              </div>
              <div class="am-u-md-10">
                <input type="text" id="mobile" />
              </div>
            </div>
          </div>
          <div class="am-form-group">
            <div class="am-g">
              <div class="am-u-md-2 am-padding-0 am-text-right">
                <label for="doc-vld-pwd-1" class="register-pwd">邮箱</label>
              </div>
              <div class="am-u-md-10">
                <input type="text" id="email" />
              </div>
            </div>
          </div>

          <div class="am-g">
            <div class="am-u-md-10">
              <button id="btn-register" class="am-btn am-btn-secondary" type="button">注册</button>
              <p id="user_name_warn"></p>
            </div>
          </div>
        </fieldset>
      </form>
    </div>

  <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/menu.php');?>     
  <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
</body>
</html>
