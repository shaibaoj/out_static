
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <title>超级人气榜-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
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
		<a href="/index.php?r=/quan/hotsell"><span class="red">全部优惠<em>(100)</em></span></a>
		 <?php
    foreach ($taoke_cms_category_list as $key => $category_item) {
?>     
<a href="<?php echo $model_url; ?>&cid=<?php echo $category_item['c_id']; ?>"><span <?php if($category_item['c_id']==$arr_query['cid']){ ?>class="red"<?php } ?>><?php echo $category_item['short_name']; ?><em></em></span></a>
<?php } ?>
	</div>
</div>
<div class="list-info page-all mb30">
	<div class="list-info-cont">
		<ul class="list-warp clearfix">
			<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>
		</ul>
	</div>
</div>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
</body>
</html>

