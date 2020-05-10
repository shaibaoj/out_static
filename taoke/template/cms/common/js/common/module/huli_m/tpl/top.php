
<!doctype html>
<html class="no-js">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
<title>超级人气榜-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
<meta name="description" content="<?php echo $user_cms['description']; ?>"/>
<meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
</head>
<body>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>
<div class="main">
    <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header-menu.php');?>
    <!--banner-->
    <div data-am-widget="slider" class="am-slider am-slider-a1 banner" style="margin-top:1rem;">
        <ul class="am-slides mybanner">
            <?php
                foreach ($cms_user_haibao_arr as $key => $taoke_haibao_item) {
            ?>  
             <li><a href="<?php if(!empty($taoke_haibao_item['num_iid'])){ echo $model_base_url.'?action=quan&id='.$taoke_haibao_item['num_iid']; }else{ if($taoke_haibao_item['custom']==1){ echo $taoke_haibao_item['href']; }else{ echo $model_base_url.$taoke_haibao_item['href']; }} ?>"><img src="<?php echo $taoke_haibao_item['img']; ?>" /></a></li>
         <?php }  ?>          
        </ul>
    </div>    <!--banner-->
    <!--banner-->
    <!-- 单独推荐商品开始 -->
    
    <!-- 单独推荐商品结束 -->
    <!-- 全部推荐商品开始 -->
    <ul class="am-avg-sm-2 am-margin-top-sm item_list">
    <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?> 
    </ul>

    <div style="" class="am-text-xs am-text-center am-margin-vertical-sm">
        <?php echo $user_cms['siteName']; ?> ©版权所有
    </div>
</div>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?> 
</body>
</html>



