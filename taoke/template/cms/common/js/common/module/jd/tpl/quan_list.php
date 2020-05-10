<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<title>领券优惠直播-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
<meta name="description" content="<?php echo $user_cms['description']; ?>"/>
<meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
<link rel="stylesheet" type="text/css" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/quan_list.css?v=20170209">
</head>
<body>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/top.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header-banner.php');?>
<?
    $base_url = $model_url;
    if(!empty($arr_query['q'])){
        if(strstr($base_url,"?")){$base_url = $base_url.'&';}else{$base_url = $base_url.'?';}
        $base_url = $base_url.'q='.$arr_query['q'];
    }
    if(!empty($arr_query['jiu'])){
        if(strstr($base_url,"?")){$base_url = $base_url.'&';}else{$base_url = $base_url.'?';}
        $base_url = $base_url.'jiu='.$arr_query['jiu'];
    }
    if(!empty($arr_query['ershi'])){
        if(strstr($base_url,"?")){$base_url = $base_url.'&';}else{$base_url = $base_url.'?';}
        $base_url = $base_url.'ershi='.$arr_query['ershi'];
    }
    if(!empty($arr_query['tuijian'])){
        if(strstr($base_url,"?")){$base_url = $base_url.'&';}else{$base_url = $base_url.'?';}
        $base_url = $base_url.'tuijian='.$arr_query['tuijian'];
    }

    $cate_url = $base_url;
    if(!empty($arr_query['sort'])){
        if(strstr($cate_url,"?")){$cate_url = $cate_url.'&';}else{$cate_url = $cate_url.'?';}
        $cate_url = $cate_url.'sort='.$arr_query['sort'];
    }
    if(!empty($arr_query['order_next'])){
        if(strstr($cate_url,"?")){$cate_url = $cate_url.'&';}else{$cate_url = $cate_url.'?';}
        $cate_url = $cate_url.'order_next='.$arr_query['order_next'];
    }
    if(strstr($cate_url,"?")){$cate_url = $cate_url.'&';}else{$cate_url = $cate_url.'?';}
?>
    <div class="tk-list-choice page-all mb20">
        <div class="list-choice-first clearfix">
            <a href="<?php echo $cate_url; ?>?cid="><span <?php if(empty($arr_query['cid'])){ ?>class="red"<?php } ?>>全部优惠<em>(<?php echo $goods_count; ?>)</em></span></a>
            <?php
       foreach ($taoke_cms_category_list as $key => $category_item) {
    ?>     
    <a href="<?php echo $cate_url; ?>cid=<?php echo $category_item['c_id']; ?>"><span <?php if($category_item['c_id']==$arr_query['cid']){ ?>class="red"<?php } ?>><?php echo $category_item['short_name']; ?><em></em></span></a>
 <?php } ?>  
        </div> 
        <div class="list-choice-two clearfix">
            <?
    $sort_url = $base_url;
    if(!empty($arr_query['cid'])){
        if(strstr($sort_url,"?")){$sort_url = $sort_url.'&';}else{$sort_url = $sort_url.'?';}
        $sort_url = $sort_url.'cid='.$arr_query['cid'];
    }
    $volume_order_next ="DESC";
    if($sort=='volume'&&$arr_query['order_next']=='DESC'){
         $volume_order_next ="ASC";
    }
    $price_order_next ="ASC";
    if($sort=='price'&&$arr_query['order_next']=='ASC'){
         $price_order_next ="DESC";
    }
    $coupon_order_next ="ASC";
    if($sort=='coupon'&&$arr_query['order_next']=='ASC'){
         $coupon_order_next ="DESC";
    }
    $coupon_price_order_next ="DESC";
    if($sort=='coupon_price'&&$arr_query['order_next']=='DESC'){
         $coupon_price_order_next ="ASC";
    }
    if(strstr($sort_url,"?")){$sort_url = $sort_url.'&';}else{$sort_url = $sort_url.'?';}
?>
            <div class="fl">
                <span class="option"><a href="<?php echo $sort_url; ?>sort=default" class="<?php if(empty($sort)||$sort=='default'){?>red<?php } ?>">默认排序</a></span>|
                <span class="option"><a href="<?php echo $sort_url; ?>sort=coupon&order_next=ASC" class="<?php if($sort=='coupon'){?>active<?php } ?>">即将抢完</a></span>|
                <span class="option"><a href="<?php echo $sort_url; ?>sort=volume&order_next=DESC" class="<?php if($sort=='volume'){?>active<?php } ?>">销量优先</a></span>|
                <span class="option"><a href="<?php echo $sort_url; ?>sort=coupon_price&order_next=DESC" class="<?php if($sort=='coupon_price'){?>active<?php } ?>">优惠度</a></span>
            </div>
            <div class="fr"></div>
        </div>
    </div>

    <div class="list-info page-all mb30">
        <div class="list-info-cont" id="listArea">
            <ul class="list-warp clearfix">
                <?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>
            </ul>
            <div class="preview-list-footer">
                <div class="pagination-warp">
                    <div> 
                        <?php 
        $pager_url = $base_url;
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
                </div>
            </div>
        </div>
    </div>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
</body>
</html>

