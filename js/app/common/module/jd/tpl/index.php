
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<title><?php echo $cms_title; ?></title><!--网站标题-->
<meta name="description" content="<?php echo $user_cms['description']; ?>"/>
<meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
<link rel="stylesheet" type="text/css" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/index.css?v=20170209">
</head>
<body>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/top.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header-banner.php');?>
<div class="nav-slider page-all mb20 clearfix">
    <div class="slider-left fl">
        <div class="nav-warp">
            <ul class="clearfix">
                <?php
       foreach ($taoke_cms_category_list as $key => $category_item) {
    ?>     
 <li><a href="<?php echo $model_base_url; ?>?action=product_list&cid=<?php echo $category_item['c_id']; ?>"><i class="icon iconfont"><?php echo $category_item['icon']; ?></i><span><?php echo $category_item['title']; ?></span></a></li>
 <?php } ?>  
            </ul>
        </div>
    </div>
    <div class="slider-right fr">
        <div class="slider-cont">
            <img src="http://g.ligoucdn.cn/tkcms/imgs/bg_img_03.jpg">
            <div class="share-group mb15">
        <div class="bdsharebuttonbox" data-tag="detail">
    <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
    <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
    <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
    <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
    <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
    <a href="#" class="bds_more" data-cmd="more"></a>
</div>

<script>
window._bd_share_config={
    common:{
        bdSnsKey:{},
        bdText:"<?php echo $user_cms['title']; ?>",        
        bdDesc:"<?php echo $user_cms['description']; ?>",        
        bdMini:"2",
        bdMiniList:false,
        bdPic:"<?php echo $logo; ?>",        
        bdStyle:"0",
        bdSize:"16"
    },
    share:{}
};
with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='//bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
</script>
            </div>
            <?php if(!empty($user_cms['addLinks'])){ ?>
            <a href="<?php echo $user_cms['addLinks']; ?>" target="_blank" class="add-btn inline-block" rel="nofollow">快点加入吧</a>
            <h1>更多福利请加入我们社群</h1>
            <!-- <h1 class="red">QQ群号：</h1> -->
            <?php } ?>
        </div>
    </div>
    <div class="slider-center">
        <nj-scroll direction="x">
            <nj-scroll-items>
            <?php
        foreach ($cms_user_haibao_arr as $key => $taoke_haibao_item) {
    ?>  
<a href="<?php if(!empty($taoke_haibao_item['num_iid'])){ echo $model_base_url.'?action=quan&id='.$taoke_haibao_item['num_iid']; }else{ if($taoke_haibao_item['custom']==1){ echo $taoke_haibao_item['href']; }else{ echo $model_base_url.$taoke_haibao_item['href']; }} ?>" target="_blank" rel="nofollow"><img src="<?php echo $taoke_haibao_item['img']; ?>"></a>
 <?php }  ?>  
            </nj-scroll-items>
            <nj-scroll-page></nj-scroll-page>
        </nj-scroll>
    </div>
</div>

<?php $coupon_goods_list = $coupon_goods_miaosha_list;$page_model = 'miaosha';?>
<?php if(!empty($coupon_goods_list)){ ?>
<div class="list-info page-all mb20">
    <h1 class="list-info-title"><i class="icon-img icon-jian"></i>小编推荐<img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/tit_11.jpg" alt=""></h1>
    <div class="list-info-cont">
        <ul class="list-warp clearfix">
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/goods.php');?>
            </ul>
    </div>
</div>
<?php } ?>
<div class="list-info page-all mb30">
    <h1 class="list-info-title"><i class="icon-img icon-miao"></i>领券秒杀<img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/tit_11.jpg" alt=""></h1>
    <div class="list-info-cont" id="listArea">
        <ul class="list-warp clearfix" id="content_goods">
                <?php $coupon_goods_list = $coupon_goods_list_old; $page_model = 'quan_list'; ?>    
                   </ul>
        <div class="see-more">
            <a href="<?php echo $model_base_url; ?>?action=product_list" target="_blank">查看更多领券秒杀优惠 &gt;&gt;</a>
        </div>
    </div>
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
                ajax: '1',
                action:'product_list',
                ipage: 1
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

