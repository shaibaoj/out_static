<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1">
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
<div class="header-bottom"></div>
<style>
.fl {
    float: left;
}

.fr {
    float: right;
}
ul,
ol {
    padding: 0;
}
ul li {
    list-style: none;
}
#banner {
    width: 100%;
    height: 300px;
}

#banner .banner_con {
    width: 1200px;
    height: 300px;
    margin: 0 auto;
}

#banner .list {
    height: 300px;
    width: 180px;
    /*background-color: #fbeaf4;*/
    filter:alpha(opacity=80);-moz-opacity:0.8;-khtml-opacity:0.8;opacity:0.8;background-color:#000;
}

#banner .list ul li {
    width: 100%;
    height: 37px;
    line-height: 37px;
    box-sizing: border-box;
    padding-left: 45px;
    font-size: 14px;
}

#banner .list ul li i {
    color: #fff;
}

#banner .list ul li a {
    padding-left: 10px;
    color: #fff;
}

#banner .list ul li:hover {
    /*background-color: orange;*/
    filter:alpha(opacity=60);-moz-opacity:0.6;-khtml-opacity:0.6;opacity:0.6;background-color:#000;
}

#banner .list ul li a:hover {
    text-decoration: none;
}

#banner .unslider {
    width: 720px;
    height: 300px;
}

#banner .rightPic {
    width: 300px;
    height: 300px;
}

.banner {
    position: relative;
    overflow: auto;
    text-align: center;
}

.banner li {
    list-style: none;
}

.banner ul li {
    float: left;
}

#dtk_mian {
    background: url("<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/common/images/bg/1.png") top center repeat-y;
}


body #content .discount .dis_product .pro_detail {
    border: 1px solid #e0e0e0;
}

#banner .list ul li:hover {
    background-color: #efdfe4;
}

#b04 .dots {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
}

#b04 .dots li {
    display: inline-block;
    width: 14px;
    height: 14px;
    margin: 0 4px;
    text-indent: -999em;
    border: 1px solid #fff;
    border-radius: 100%;
    cursor: pointer;
    opacity: .4;
    -webkit-transition: background .5s, opacity .5s;
    -moz-transition: background .5s, opacity .5s;
    transition: background .5s, opacity .5s;
    background-color: #999;
}

#b04 .dots li.active {
    background: white;
    opacity: 1;
}

#b04 .arrow {
    position: absolute;
    top: 100px;
}

#b04 #al {
    left: 15px;
}

#b04 #ar {
    right: 15px;
}


</style>
<div id="banner">
<div class="banner_con clearfix">
<div class="list fl">
<ul>
<?php
       foreach ($taoke_cms_category_list as $key => $category_item) {
    ?>     
    <li><i class="iconfont"><?php echo $category_item['icon']; ?></i><a class="cnzzCounter" data-cnzz-type="50" data-cnzz="8" href="<?php echo $model_base_url; ?>?action=quan_list&cid=<?php echo $category_item['c_id']; ?>"><?php echo $category_item['title']; ?></a></li>
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
<a href="<?php if(!empty($taoke_haibao_item['num_iid'])){ echo $model_base_url.'?action=quan&id='.$taoke_haibao_item['num_iid']; }else{ if($taoke_haibao_item['custom']==1){ echo $taoke_haibao_item['href']; }else{ echo $model_base_url.$taoke_haibao_item['href']; } } ?>" target="_blank" class="cnzzCounter" data-cnzz-type="1" data-cnzz="<?php echo $taoke_haibao_item['id']; ?>">
<img style="border: 0" src="<?php echo $taoke_haibao_item['img']; ?>" width="720" height="300">
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
    with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = '//bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];</script>
</div>
<a href="<?php echo $model_base_url.'?action=top'; ?>" target="_blank" style="position: absolute;
    display: block;
    width: 100%;
    height: 143px;
    top: 156px;"></a>
<img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/index-left.jpg" alt="" width="300" height="300">
</div>
</div>
</div>

<div class="ymb-container">
<div class="row promo-small mt20">
<div class="col-xs-3"><a href="<?php echo $model_base_url; ?>?action=quan_list&ershi=1"><img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/temp/1.jpg" width="100%" height="185"></a></div>
<div class="col-xs-3"><a href="<?php echo $model_base_url; ?>?action=top"><img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/temp/2.jpg" width="100%" height="185"></a></div>
<div class="col-xs-3"><a href="<?php echo $model_base_url; ?>?action=quan_list&"><img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/temp/3.jpg" width="100%" height="185"></a></div>
<div class="col-xs-3"><a href="<?php echo $model_base_url; ?>?action=quan_list&time=today"><img src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/temp/4.jpg" width="100%" height="185"></a></div>
</div>
<div class="row mt20 product" id="hot">
<div class="title">
<div class="col-xs-6">
<a href="<?php echo $model_base_url; ?>?action=quan_list" class="btn btn-primary pull-left">爆款专区</a>
<span class="text-sm">店铺爆款 品质保证</span>
</div>
<div class="col-xs-6 text-right">
<a class="text-sm" href="<?php echo $model_base_url; ?>?action=quan_list">查看更多 <i class="fa fa-arrow-circle-o-right"></i></a>
</div>
</div>
<div id="content_goods">

</div>
</div>

<div class="pager">
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

<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
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
<script language="javascript">
$(document).ready(function () {
    getData($('#content_goods'), null, 1);
    function getData($wrapper, data, direction) {
        var tPaht = "//yun.cms.shaibaoj.com/ajax.php";
        $.ajax(tPaht, {
            data: {
                app_id:'<?php echo $app_id; ?>',
                documentUrl:'<?php echo $model_base_url; ?>',
                ajax: '1', ipage: 1},
                type: 'get',
                dataType: 'jsonp',
            error: function (xhr, type, errorThrown) {
                getData($wrapper, data, direction);
            },
            success: function (result, status, xhr) {
                if (result.result.map.status == 0) {
                    $wrapper.html(result.result.map.content);
                } else {
                    
                }

            }
        });
    }
});
</script>
</body>
</html>
