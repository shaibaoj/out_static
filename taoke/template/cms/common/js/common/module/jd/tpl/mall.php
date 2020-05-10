
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <title>全网购物商城-<?php echo $user_cms['siteName']; ?></title><!--网站标题-->
        <meta name="description" content="<?php echo $user_cms['description']; ?>"/>
        <meta name="keywords" content="<?php echo $user_cms['keywords']; ?>"/>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/dns.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/link.php');?>
<link rel="stylesheet" type="text/css" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/baby_list.css?v=20170209">
<link rel="stylesheet" type="text/css" href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/mall.css?v=20170209">
</head>
<body>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/top.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header.php');?>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/header-banner.php');?>

<div class="tk-list-choice page-all mb20">
	<div class="list-choice-first clearfix">
		
	</div>
</div>
<div class="list-info page-all mb30">
	<div class="list-info-cont">

		<div id="main" class="clearfix">
            
		    <div class="box-nav-site clearfix" id="J_nav_site">
		        <!-- 左侧 分类 -->
		        <div class="tit">
		            <ul>
		            <?php
		    		foreach ($mall_type_list as $key => $type_item) {
					?>     
					<li  class="<?php if($type_item['name']==urldecode($arr_query['type_name'])){ ?>cur<?php } ?>"><i class="iconfont"></i><a href="<?php echo $model_url; ?>&type_name=<?php echo $type_item['name']; ?>"><?php echo $type_item['name']; ?></a></li>
					<?php } ?>
		            </ul>
		        </div>
		        <div class="con">
		            <div class="mall-pane" style="margin-bottom: 5px;display:block;">
		                <!-- list-mall 商城 -->
		                <div class="list-mall" id="list_malls_v" style="z-index: 1;">
		                    <ul class="clearfix">
		                         <?php
		    		foreach ($mall_list as $key => $mall_item) {
					?>     
		                        <li class="" style="z-index: 1;">
		                        	<a href="<?php echo CPS::query_common_url($mall_item['domain_url'],$mall_item['id'],$user_cms['user_id'],$user_cms['app_id'],$agent_id,0); ?>" data-url="http://<?php echo $mall_item['domain_url']; ?>"  data-mallid="<?php echo $mall_item['id']; ?>" data-uid="<?php echo $user_cms['user_id']; ?>" data-pid="<?php echo $user_cms['app_id']; ?>" data-aid="<?php echo $agent_id; ?>" target="_blank" class="link-mall mall-click">
		                                <img src="<?php echo $mall_item['pic_url']; ?>" alt="<?php echo $mall_item['sitename']; ?>">
		                                <span class="info">
		                                	<?php echo $mall_item['sitename']; ?><em></em><span></span>
		                                </span>
		                            </a>
		                            <a href="<?php echo CPS::query_common_url($mall_item['domain_url'],$mall_item['id'],$user_cms['user_id'],$user_cms['app_id'],$agent_id,0); ?>" data-url="http://<?php echo $mall_item['domain_url']; ?>"  data-mallid="<?php echo $mall_item['id']; ?>" data-uid="<?php echo $user_cms['user_id']; ?>" data-pid="<?php echo $user_cms['app_id']; ?>" data-aid="<?php echo $agent_id; ?>" class="btn btn-1-25 mall-click" target="_blank"><span>前往购物<i></i></span></a>
		                        </li>
							<?php } ?>
		                    </ul>
		                </div>
		            </div>
				</div>            
	        </div>
	        
	    </div>
   
	</div>
</div>
<?php include(constant("TAOKE_TEMPLATE_PATH")."/cms/".$taoke_cms['path'].'/util/footer.php');?>
</body>
</html>

