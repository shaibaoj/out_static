
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="language" content="zh-CN">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
<meta name="renderer" content="webkit">
<title>超级人气榜-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
<meta name="description" content="<?php echo $user_cms['description']; ?>"/>
<meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
<link rel="stylesheet" type="text/css" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/PaoLiang.css?v=09181" />
</head>
<body>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/top.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>

<div id="dtk_mian">
<style>
    .goods-list ul li:hover {
        border: 1px solid #48BF7D;
    }
</style>
<div class="search-wrap main-container">
</div>
<div class="cat-wrap main-container">
<div class="cat-list clearfix">
<ul class="clearfix">
<li class="active">
<a href="/index.php?r=p&cid=0&u=1" class="cnzzCounter" data-cnzz-type="52" data-cnzz="100">全部榜单（100）</a></li>
 <?php
        foreach ($taoke_cms_category_list as $key => $category_item) {
    ?>     
<li <?php if($category_item['c_id']==$arr_query['cid']){ ?>class="active"<?php } ?>  ><a class="cnzzCounter" data-cnzz-type="52" data-cnzz="2"  href="<?php echo $model_url; ?>&cid=<?php echo $category_item['c_id']; ?>"><?php echo $category_item['short_name']; ?></a><span><!-- （013） --></span></li>
 <?php } ?> 
</ul>
</div>
<div class="sort-wrap" style="color: #FF0000;">
*&nbsp;每3-5分钟更新一次
</div>
</div>
<div class="goods-list main-container" style="margin-top: 20px;">
<ul class="clearfix">
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>
</ul>
</div>
</div>

<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
</body>
</html>
