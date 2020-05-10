
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="language" content="zh-CN">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
<meta name="renderer" content="webkit">
<title><?php echo $cms_title; ?></title><!--网站标题-->
<meta name="description" content="<?php echo $user_cms['description']; ?>"/>
<meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
</head>
<body>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/top.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header-banner.php');?>

<div id="dtk_mian">
<link rel="stylesheet" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/iconfont.css?v=20160621">
<link rel="stylesheet" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/index.css?v=810">
<style>
        #dtk_mian {
        background: url("<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/common/images/bg/1.png") top center repeat-y;
    }
    body #content .discount .dis_product .pro_detail {
        border: 1px solid #e0e0e0;
    }
    #banner .list ul li:hover {
        background-color: #efdfe4;
    }
</style>
<div id="banner">
<div class="banner_con clearfix">
<div class="list fl">
<ul>
<?php
       foreach ($taoke_cms_category_list as $key => $category_item) {
    ?>     
    <li><i class="iconfont"><?php echo $category_item['icon']; ?></i><a href="<?php echo $model_base_url; ?>?action=quan_list&cid=<?php echo $category_item['c_id']; ?>"><?php echo $category_item['title']; ?></a></li>
 <?php } ?>  

</ul>
</div>
<div class="unslider fl">
<div class="banner" id="b04">
<ul style="width: 720px;height: 300px;overflow: hidden;">
<?php
        foreach ($cms_user_haibao_arr as $key => $taoke_haibao_item) {
    ?>  
<li>
<a href="<?php if(!empty($taoke_haibao_item['num_iid'])){ echo $model_base_url.'?action=quan&id='.$taoke_haibao_item['num_iid']; }else{ if($taoke_haibao_item['custom']==1){ echo $taoke_haibao_item['href']; }else{ echo $model_base_url.$taoke_haibao_item['href']; }} ?>" target="_blank">
<img src="<?php echo $taoke_haibao_item['img']; ?>" width="720" height="300">
</a>
</li>
 <?php }  ?>  
</ul>
<a href="javascript:void(0);" class="unslider-arrow04 prev"><img class="arrow" id="al" src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/arrowl.png" alt="prev" width="25" height="50"></a>
<a href="javascript:void(0);" class="unslider-arrow04 next"><img class="arrow" id="ar" src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/arrowr.png" alt="next" width="25" height="50"></a>
</div>
</div>
<div class="rightPic fr" style="position: relative">
<div class="bdshare" style="position: absolute;top: 95px;left: 76px;">
<div class="bdsharebuttonbox"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a><a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
</div>
<script>window._bd_share_config = {
        "common": {
            "bdSnsKey": {},
            "bdText": "最近发现了一个领内部优惠券的网站，都是限时限量抢购，一般人享受不到的！性价比超高哦，分享给大家，保证你会惊喜滴！",

            "bdMini": "2",
            "bdMiniList": false,
            "bdPic": "",
            "bdStyle": "0",
            "bdSize": "24"
        }, "share": {}
    };
    with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];</script>
</div>
<a href="<?php echo $model_base_url.'?action=top'; ?>" target="_blank" style="position: absolute;
    display: block;
    width: 100%;
    height: 143px;
    top: 156px;"></a>
<img src="https://img.alicdn.com/imgextra/i1/2508158775/TB2.RPGqFXXXXaBXXXXXXXXXXXX_!!2508158775.jpg" alt="" width="300" height="300">
</div>
</div>
</div>
<div id="content" style="padding-bottom: 58px;">
<div class="divider" style="text-align: left;padding: 0 10px;width: 1178px;border: 1px solid #ffd6d6; color: #9c9c9c;background-color: #FDFCE7;">
小编说：<?php echo $cms_signature; ?></div>
<div class="discount" style="display:none">
<div class="discount_head clearfix" style="margin-bottom: 10px;">
<div class="dishead_left fl" style="color: #fbacc2">
<h1 style="color: #585858;font-weight: normal;">领券秒杀精选</h1>
<span class="color_p pd">/</span>
<span class="color_p">实时更新</span>
<span class="color_p">/</span>
<span class="color_p">商家内部券</span>
</div>
<div class="dishead_right fr" style="color: #fbacc2">
<span class="color_p">/</span>
<span class="color_p">将优选、性价比做到极致</span>
<span class="color_p">/</span>
</div>
</div>
<div class="dis_product">
<style type="text/css">
    .addLeft{
        float: left;
    }
</style>
<?php $coupon_goods_list = $coupon_goods_miaosha_list;$page_model = 'miaosha';?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>

</div>
</div>
<div class="quality"  style="display:none">
<div class="discount_head clearfix" style="margin-bottom: 10px;">
<div class="dishead_left fl" style="color: #fbacc2">
<h1 style="color: #585858;font-weight: normal;">特卖精选</h1>
<span class="color_p pd">/</span>
<span class="color_p">人气款、评价好、性价比高</span>
<span class="color_p">/</span>
</div>
<div class="dishead_right fr">
<span class="color_p"><a style="color: #505050;font-size: 14px;" href="<?php echo $model_base_url.'?action=temai'; ?>">查看更多</a></span>
<span class="color_p" style="color: #505050;">»</span>
</div>
</div>
<ul class="clearfix index-boutique">
<?php $coupon_goods_list = $coupon_goods_temai_list;$page_model = 'temai';?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>
</ul>
</div>
<div class="live">
<div class="discount_head clearfix" style="margin-bottom: 10px;">
<div class="dishead_left fl">
<h1 style="font-weight: normal;">领券优惠直播<span class="tatal" style="background-color: #5dcac5;color: #FFFFFF;padding: 3px 7px;border-radius: 15px; font-family: 'Arial'; margin-left: 10px;"><?php echo $count; ?></span>
</h1>
</div>
<div class="dishead_right fr">
<a href="<?php echo $model_base_url.'?action=quan_list'; ?>"><span style="color: #505050;font-size: 14px;" class="color_p">更多优惠 »</span></a>
</div>
</div>
<div class="goods-list main-container">
<ul class="clearfix" id="content_goods">
<?php $coupon_goods_list = $coupon_goods_list_old; $page_model = 'quan_list'; ?>    
</ul>
</div>
</div>
<div class="mainbody_6" style="margin: 0 auto;margin-bottom: 0px;margin-top: 26px;">
    <div id="yw0" class="pager">
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
</div>

</div>
<script>
    $(document).ready(function (e) {
        var unslider04 = $('#b04').unslider({
                dots: true
        }),
        data04 = unslider04.data('unslider');

        $('.unslider-arrow04').click(function () {
            var fn = this.className.split(' ')[1];
            data04[fn]();
        });
    });
</script>
</div>

<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
<script language="javascript">
$(document).ready(function () {
    getData($('#content_goods'), null, 1);
    function getData($wrapper, data, direction) {
        var tPaht = "//yun.cms.shaibaoj.com/ajax.php";
        $.ajax(tPaht, {
            data: {
                app_id:'<?php echo $app_id; ?>',
                documentUrl:'<?php echo $model_base_url; ?>',
                ajax: '1', ipage: 1
            },
            type: 'get',
            dataType: 'jsonp',
            error: function (xhr, type, errorThrown) {
                getData($wrapper, data, direction);
            },
            success: function (result, status, xhr) {
                if (result.result.map.status == 0) {
                    $wrapper.html(result.result.map.content);
                }
            }
        });
    }
});
</script>
</body>
</html>
