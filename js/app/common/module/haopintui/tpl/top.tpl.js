define(function() {
    return (function(){/*
<div class="header-bottom"></div>
<div class="ymb-container">
<div class="new-goods">
<div class="row mt20">
<div class="col-xs-12 text-sm pl10">*&nbsp;每3-5分钟更新一次</div>
</div>
</div>
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
<li class="<?php if(empty($arr_query['cid'])){ ?>cur<?php } ?>"><a class="cnzzCounter" data-cnzz-type="51" data-cnzz="100" href="<?php echo $cate_url; ?>cid=">全部（100）</a></li>
<?php
       foreach ($taoke_cms_category_list as $key => $category_item) {
    ?>     
<li <?php if($category_item['c_id']==$arr_query['cid']){ ?>class="cur"<?php } ?>  ><a class="cnzzCounter" data-cnzz-type="52" data-cnzz="2"  href="<?php echo $cate_url; ?>cid=<?php echo $category_item['c_id']; ?>"><?php echo $category_item['short_name']; ?></a><span></span></li>
 <?php } ?>  

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

</div>
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})