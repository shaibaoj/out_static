
<!doctype html>
<html class="no-js">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
<title><?php echo $cms_title; ?></title><!--网站标题-->
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
    <?php $coupon_goods_list = $coupon_goods_list_old; $page_model = 'quan_list'; ?>    
    <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?> 
    </ul>
    <div id="totalheight" alt="0"></div>
    <div class='am-text-center am-margin-vertical-sm am-text-sm am-text-danger loading'></div>
    <!-- 全部推荐商品结束 -->
<!--     <ul class="am-pagination am-pagination-centered am-text-xs" id="page" style="margin: 1rem 0 0 0;"></ul>
 -->    <div class="pager" id="page">
        <?php 
        $pager_url = $model_base_url.'?action=quan_list';
        if(!empty($arr_query['cid'])){
            if(strstr($pager_url,"?")){$pager_url = $pager_url.'&';}else{$pager_url = $pager_url.'?';}
            $pager_url = $pager_url.'cid='.$arr_query['cid'];
        }
        if(!empty($arr_query['sort'])){
            if(strstr($pager_url,"?")){$pager_url = $pager_url.'&';}else{$pager_url = $pager_url.'?';}
            $pager_url = $pager_url.'sort='.$arr_query['sort'];
        }
        if(!empty($arr_query['order_next'])){
            if(strstr($pager_url,"?")){$pager_url = $pager_url.'&';}else{$pager_url = $pager_url.'?';}
            $pager_url = $pager_url.'order_next='.$arr_query['order_next'];
        }
        echo coreClass::pager_cms($count,$displaypg=60,$shownum=1,$showtext=0,$showselect=0,$showlvtao=11,$ipage=$arr_query['ipage'],$url=$pager_url,$index='',$max_page=1000); 
        ?>
    </div>  
    <div style="" class="am-text-xs am-text-center am-margin-vertical-sm">
        <?php echo $user_cms['siteName']; ?>
    </div>
</div>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?> 
</body>
</html>