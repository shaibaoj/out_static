define(function() {
    return (function(){/*
<div class="header-bottom"></div>
<div class="ymb-container">
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
<div id="filter">
<div class="row filter mt20">
<div class="col-xs-12">
<ul class="filter-nav">
<li class="<?php if(empty($arr_query['cid'])){ ?>cur<?php } ?>"><a class="cnzzCounter" data-cnzz-type="51" data-cnzz="100" href="<?php echo $cate_url; ?>cid=">全部（<?php echo $count; ?>）</a></li>
<?php
       foreach ($taoke_cms_category_list as $key => $category_item) {
    ?>     
<li <?php if($category_item['c_id']==$arr_query['cid']){ ?>class="cur"<?php } ?>  ><a class="cnzzCounter" data-cnzz-type="52" data-cnzz="2"  href="<?php echo $cate_url; ?>cid=<?php echo $category_item['c_id']; ?>"><?php echo $category_item['short_name']; ?></a><span></span></li>
 <?php } ?>  

</ul>
</div>
</div>
<div id="filter-other" class="row filter-bottom">
<div class="col-xs-8">
<div class="filter-type pull-left">
<a href="<?php echo $type_url; ?>tmall=1"><img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/tmall_search_2x.png" height="26"></a>
<a href="<?php echo $type_url; ?>tmall=0"><img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/taobao_search_2x.png" height="26"></a>
</div>
<form action="<?php echo $model_url; ?>" method="get">
<input type="hidden" name="action" value="search"  />
<input type="hidden" name="q" value="<?php echo urldecode($arr_query['q']); ?>"  />
<input type="hidden" name="jiu" value="<?php echo $arr_query['jiu']; ?>"  />
<input type="hidden" name="ershi" value="<?php echo $arr_query['ershi']; ?>"  />
<input type="hidden" name="tuijian" value="<?php echo $arr_query['tuijian']; ?>"  />
<input type="hidden" name="tmall" value="<?php echo $arr_query['tmall']; ?>"  />
<input type="hidden" name="sort" value="<?php echo $arr_query['sort']; ?>"  />
<input type="hidden" name="order_next" value="<?php echo $arr_query['order_next']; ?>"  />
<div class="filter-item filter-condition pull-left filter-sells">
<span class="input-wrap-inner">
<span>销量：</span>
<input type="text" class="form-control input-sm" name="volume" value="<?php echo $arr_query['volume']; ?>" />
<span>以上</span>
<button class="btn btn-rect btn-primary btn-sm">确定</button>
</span>
</div>
<div class="filter-item filter-condition pull-left filter-price">
<span class="input-wrap-inner">
<span>价格：</span>
<input type="text" class="form-control input-sm" name="price1" value="<?php echo $arr_query['price1']; ?>" />
<span>-</span>
<input type="text" class="form-control input-sm" name="price2" value="<?php echo $arr_query['price2']; ?>" />
<button class="btn btn-rect btn-primary btn-sm">确定</button>
</span>
</div>
</form>
</div>
<div class="col-xs-4">
<ul class="filter-condition pull-right">
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
<li><a class="btn btn-sm <?php if(empty($sort)||$sort=='default'){?>btn-primary<?php }else{ ?> btn-default<?php } ?>" href="<?php echo $sort_url; ?>sort=default">默认</a></li>
<li><a class="btn btn-sm <?php if($sort=='coupon'){?>btn-primary<?php }else{ ?> btn-default<?php } ?>" href="<?php echo $sort_url; ?>sort=coupon&order_next=ASC" style="margin-left:5px;">即将抢完</a></li>
<li><a class="btn btn-sm <?php if($sort=='volume'){?>btn-primary<?php }else{ ?> btn-default<?php } ?>" href="<?php echo $sort_url; ?>sort=volume&order_next=DESC" style="margin-left:5px;">销量</a></li>
<li><a class="btn btn-sm <?php if($sort=='coupon_price'){?>btn-primary<?php }else{ ?> btn-default<?php } ?>" href="<?php echo $sort_url; ?>sort=coupon_price&order_next=DESC" style="margin-left:5px;">优惠最多</a></li>
</ul>
</div>
</div>
</div> 

<div id="list">
<div class="row product">
<div >
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>

</div>
<div class="col-xs-12 mt20 text-center">
<div id="yw0" class="pager">
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
    */}).toString().split("\n").slice(1,-1).join("\n")
})