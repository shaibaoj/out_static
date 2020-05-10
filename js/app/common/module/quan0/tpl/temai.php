
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="language" content="zh-CN">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
<meta name="renderer" content="webkit">
<title>特卖精选-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
<meta name="description" content="<?php echo $user_cms['description']; ?>"/>
<meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
<link rel="stylesheet" type="text/css" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/JinXuan.css?v=09181" />
</head>
<body>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/top.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>

<div id="dtk_mian">
<style>
    .cat-wrap .cat-list ul li a {
        color: #4C4C4C;
    }

    .goods-list ul li:hover {
        border: 1px solid #df1956;
    }
</style>
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
<div class="search-wrap main-container">
<form action="<?php echo $model_base_url; ?>" method="get" class="search-form">
<input type="hidden" name="action" value="search">
<input type="text" name="q" value="" placeholder="^_^ 搜商品">
<input type="submit" value="">
</form>
</div>
<div class="cat-wrap main-container">
<div class="cat-list clearfix">
<ul class="clearfix">
<li class="active"><a class="cnzzCounter" data-cnzz-type="53" data-cnzz="100" href="/index.php?r=j&cid=0&u=1">全部特卖（<?php echo $goods_count; ?>）</a></li>
<?php
        foreach ($taoke_cms_category_list as $key => $category_item) {
    ?>     
<li <?php if($category_item['c_id']==$_GET['cid']){ ?>class="active"<?php } ?>  ><a class="cnzzCounter" data-cnzz-type="52" data-cnzz="2"  href="<?php echo $model_url; ?>$action=quan_list&cid=<?php echo $category_item['c_id']; ?>"><?php echo $category_item['short_name']; ?></a><span></span></li>
 <?php } ?>  
</ul>
</div>
<div class="sort-wrap">
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
<span class="sort-text">排序：</span>
<a class="<?php if(empty($sort)||$sort=='default'){?>active<?php } ?>" href="<?php echo $sort_url; ?>sort=default">更新时间</a>
<a class="<?php if($sort=='volume'){?>active<?php } ?>" href="<?php echo $sort_url; ?>sort=volume&order_next=DESC" style="margin-left:5px;">销量</a>
</div>
</div>
<div class="tag-wrap main-container clearfix" style="background:#FFF3EA;border: #E6D5C8 1px dashed;">
<div class="fixed-wrap clearfix">
<a data-cnzz-type="51" data-cnzz="919" href="<?php echo $model_url; ?>&jiu=<?php if($arr_query['jiu']==1){ echo "0"; }else{ echo "1"; } ?>" class="cnzzCounter tag-99 tag-fixed clearfix <?php if($arr_query['jiu']==1){ echo "active"; } ?> " style="margin-right: 20px;">
<span class="icon"></span>
<span class="text">九块九</span>
</a>
<a data-cnzz-type="51" data-cnzz="920" href="<?php echo $model_url; ?>&ershi=<?php if($arr_query['ershi']==1){ echo "0"; }else{ echo "1"; } ?>" class="cnzzCounter tag-20 tag-fixed clearfix <?php if($arr_query['ershi']==1){ echo "active"; } ?> " style="margin-right: 20px;">
<span class="icon"></span>
<span class="text">20封顶</span>
</a>
<a data-cnzz-type="51" data-cnzz="921" href="<?php echo $model_url; ?>&tuijian=<?php if($arr_query['tuijian']==1){ echo "0"; }else{ echo "1"; } ?>" class="cnzzCounter tag-boutique tag-fixed clearfix <?php if($arr_query['tuijian']==1){ echo "active"; } ?>">
<span class="icon"></span>
<span class="text">小编推荐</span>
</a>
</div>
<div class="split" style="background-color: #E6D6CA;height: 20px; margin-top:7px;"></div>
<div class="tags">
<span class="text" style="margin-left: 50px; color:#969696">热搜标签：</span>
<a class="" href="<?php echo $model_base_url; ?>?action=search&q=%E8%A1%AC%E8%A1%AB">衬衫</a>
	<a class="" href="<?php echo $model_base_url; ?>?action=search&q=%E5%A9%B4%E5%84%BF">婴儿</a>
	<a class="" href="<?php echo $model_base_url; ?>?action=search&q=%E5%86%85%E8%A1%A3">内衣</a>
	<a class="" href="<?php echo $model_base_url; ?>?action=search&q=%E8%BF%9E%E8%A1%A3%E8%A3%99">连衣裙</a>
	<a class="" href="<?php echo $model_base_url; ?>?action=search&q=%E6%B0%B4%E6%9D%AF">水杯</a>
	<a class="" href="<?php echo $model_base_url; ?>?action=search&q=%E9%9B%B6%E9%A3%9F">零食</a>
	<a class="" href="<?php echo $model_base_url; ?>?action=search&q=%E7%9F%AD%E8%A3%A4">短裤</a>
	<a class="" href="<?php echo $model_base_url; ?>?action=search&q=%E9%98%B2%E6%99%92">防晒</a>
	<a class="" href="<?php echo $model_base_url; ?>?action=search&q=%E8%BF%90%E5%8A%A8">运动</a>
</div>
</div>
<div class="goods-list main-container">
<ul class="clearfix">
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>
</ul>
</div>
<div class="pager main-container" style="margin: 20px auto;">
	<div id="yw0" class="pager">
		<?php 
	    $pager_url = $model_url;
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

<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
</body>
</html>
