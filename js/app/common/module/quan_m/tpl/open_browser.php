
<!doctype html>
<html class="no-js">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
<title>优惠券</title>
<link href="//cdn.bootcss.com/amazeui/2.7.2/css/amazeui.min.css" rel="stylesheet">
<link href="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/css/style.css?v=201702221401" rel="stylesheet"/>
<script src="//cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="//cdn.bootcss.com/amazeui/2.7.2/js/amazeui.min.js"></script>
<script src="//cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js"></script>
<script>$(function() {FastClick.attach(document.body);});</script>
<script type="text/javascript" src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<!-- 微信自定义接口 -->
<script>
	wx.config();
	wx.ready(function(){
        wx.hideMenuItems({
           menuList: ["menuItem:share:timeline"]
        });
		wx.onMenuShareAppMessage({
			title: document.title,
			desc: "",
			link: window.location.href ,
			imgUrl: ""
		}); 
		wx.onMenuShareTimeline({
			title: document.title,
			desc: "",
			link: window.location.href,
			imgUrl: ""
		});
	});
</script><!-- 微信自定义接口 -->

</head>

<body>

<?php
if(!empty($tao_dianjin)
    &&(
        !empty($user_cms_domain['tdj'])
        ||!empty($user_cms['tdj'])
        ||(!empty($pid_default)&&TaobaoUtil::is_pid($pid_default))
        ||!empty($user_cms['pc_pid'])&&TaobaoUtil::is_pid($user_cms['pc_pid'])
        )
    // &&!cacheHelper::isMicroMessenger()
    ){
?>
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<link rel="stylesheet" type="text/css" href="//g.alicdn.com/thx/cube/1.2.1/neat-min.css">
<link rel="stylesheet" type="text/css" href="//g.alicdn.com/mm/sem-centre/0.2.5/ticket/index.css">
<div class="body-wrap">
    <!-- <div mx-view="app/common/share/index"
        mx-init="{title:&quot;【天天特价】安徽特产宣城香菜自制下饭菜5...  原价15.8元，抢券立省3元&quot;}"
        data-spm="2192021" class="share-kl" id="mx_8">
        <div mx-click="showKouling()" class="share-con">
            <span class="kouling-share"
                data-spm-click="gostr=/aitaobao.3;locaid=dclickshare"><svg
                    width="1em" height="1em" viewBox="0 0 212.5 200" version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g class="transform-group">
                    <g transform="scale(0.1953125, 0.1953125)">
                    <path
                        d="M85.258845 1024.000025c-47.011309 0-85.258857-37.315047-85.258857-83.178855l0-662.139583c0-45.863808 38.247548-83.178855 85.258857-83.178855l211.680266 0 0 63.65258-211.680266 0c-11.913765 0-21.611277 8.760011-21.611277 19.526275l0 662.139583c0 10.766264 9.692512 19.526275 21.611277 19.526275l860.201082 0c11.948765 0 21.675027-8.760011 21.675027-19.526275L967.134954 703.277122l63.64758 0 0 237.544049c0 45.863808-38.276298 83.178855-85.322607 83.178855L85.258845 1024.000025 85.258845 1024.000025zM447.5293 794.375986c-0.33625-1.821252-30.453788-187.143985 91.026364-361.132954 85.161357-121.992653 224.175282-205.650259 413.43302-248.877813l-230.71154-124.833907 32.235041-59.531325 333.98542 180.678977L891.914859 489.849353l-57.201322-36.201296L962.642448 251.362804C792.925984 290.884103 669.140829 364.834196 594.506985 471.36308 541.494418 546.988175 522.720645 628.687028 516.309387 683.907097c-6.885009 59.296325-1.582502 102.026378-0.952501 106.703884l1.357502 10.850014-67.710085 0.863751L447.5293 794.375986 447.5293 794.375986zM456.968062 792.623484c-1.391252-7.485009-27.670035-186.132734 89.457612-353.887945C639.424541 305.517872 797.813491 218.901513 1017.022516 181.176465l8.25626 47.78381C819.591018 264.32657 672.017082 344.00917 586.645725 465.855573 480.963092 616.617013 505.650623 790.338481 505.855624 791.998483L456.968062 792.623484 456.968062 792.623484 456.968062 792.623484zM888.936105 476.606837l-40.981302-25.937533L1005.098751 202.187742 734.288411 55.658807l23.096279-42.651304 316.504148 171.225215L888.936105 476.606837 888.936105 476.606837zM888.936105 476.606837"
                        fill="#fff"></path></g></g></svg></span>
        </div>
    </div>
    <div class="shop-info">
       <span class="shop-logo"><img class="logo"
            src="//img.alicdn.com/bao/uploaded//75/89/TB17vbOGFXXXXbwXFXXSutbFXXX.jpg_200x200.jpg_.webp"></span><span
            class="shop-title">忆江南美食宣城鸭脚包</span> 
        <div id="mx_6">
            <div class="coupons-wrap noFollow">
                <a data-type="0" biz-itemid="<?php echo $b_num_iid; ?>" data-tmpl="470x190" data-tmplid="635" data-rd="2" data-style="2" data-border="1" href="<?php echo $b_link; ?>"><?php echo $b_link; ?></a>
                <a data-type="0" biz-itemid="<?php echo $b_num_iid; ?>" data-tmpl="230x45" data-tmplid="225" data-rd="2" data-style="2" data-border="1" href="<?php echo $b_link; ?>"><?php echo $b_link; ?></a>
                <!-- <div class="coupons-container js-can" mx-click="getCoupons()">
                    <span class="coupons-price"><strong>¥</strong>3</span><span
                        class="coupons-info">使用期限</span> <span class="coupons-data"><span
                        class="coupons-data-icon">限</span>2017.03.23-2017.03.29</span> <span
                        class="coupons-btn">立即领券</span>
                </div>
            </div>
        </div>
    </div> 
    <!-- <div class="item-detail-view">
    </div> -->
    <div class="activity-rules">
       <a data-type="0" biz-itemid="<?php echo $b_num_iid; ?>" data-tmpl="290x380" data-tmplid="5" data-rd="2" data-style="2" data-border="1" href="<?php echo $b_link; ?>">立即前往购买</a>
        <a data-type="0" biz-itemid="<?php echo $b_num_iid; ?>" data-tmpl="230x45" data-tmplid="225" data-rd="2" data-style="2" data-border="1" href="<?php echo $b_link; ?>"><?php echo $b_link; ?></a>
    </div>
    <div class="activity-rules">
        <div class="activity-title">
            <span class="line"></span> <span class="title">活动说明</span>
        </div>
        <span class="rule-line">1. 点击上面图片中的商品即可购买啦。</span> 
        <span
            class="rule-line">2.
            因商品参与其它活动等原因，此时商品最终成交价以您实际付款时提示金额为准。</span> 
    </div>
    <div class="activity-rules">
        <div class="activity-title">
            <span class="line"></span> <span class="title">规则声明</span>
        </div>
        <span class="rule-line">商品为商城商品，本站为展示，购买价格以实际为准。</span>
    </div>
</div>

<style type="text/css">
.body-wrap {
  width: 100%;
  margin: 0 auto;
  position: relative;
  background: url(//gw.alicdn.com/tps/TB1BO9DNpXXXXabaXXXXXXXXXXX-750-1040.jpg) no-repeat;
  background-size: 15rem auto;
  overflow: hidden;
}
</style>


<?php if(
    (!empty($pid_default)&&TaobaoUtil::is_pid($pid_default))
        ||(!empty($user_cms['pc_pid'])&&TaobaoUtil::is_pid($user_cms['pc_pid']))
){ ?>

<script type="text/javascript">
    (function(win,doc){
        var s = doc.createElement("script"), h = doc.getElementsByTagName("head")[0];
        if (!win.alimamatk_show) {
            s.charset = "gbk";
            s.async = true;
            s.src = "https://alimama.alicdn.com/tkapi.js";
            h.insertBefore(s, h.firstChild);
        };
        var o = {
            pid: "mm_<?php if(!empty($pid_default)&&TaobaoUtil::is_pid($pid_default)){ echo trim($pid_default); }else{ echo trim($user_cms['pc_pid']); } ?>",/*推广单元ID，用于区分不同的推广渠道*/
            appkey: "",/*通过TOP平台申请的appkey，设置后引导成交会关联appkey*/
            unid: "",/*自定义统计字段*/
            type: "click" /* click 组件的入口标志 （使用click组件必设）*/
        };
        win.alimamatk_onload = win.alimamatk_onload || [];
        win.alimamatk_onload.push(o);
    })(window,document);
</script>
<?php }else{ ?>

<?php if(!empty($user_cms_domain['tdj'])){ ?>
<?php echo $user_cms_domain['tdj']; ?>
<?php }else{ ?>
<?php echo $user_cms['tdj']; ?>
<?php } ?>
<?php } ?>

<script type="text/javascript">
//$("html").attr("style","font-size: 42.6667px;");
</script>
<?php }else{ ?>

<div class="am-modal am-modal-alert" tabindex="-1" id="fq_alert">
  <div class="am-modal-dialog">
    <div class="am-modal-hd" id="fq_alert_title"></div>
    <div class="am-modal-bd" id="fq_alert_info">
    </div>
    <div class="am-modal-footer">
      <span class="am-modal-btn">确定</span>
    </div>
  </div>
</div>

<div class="am-modal am-modal-confirm" tabindex="-1" id="fq_confirm">
  <div class="am-modal-dialog">
    <div class="am-modal-hd" id="fq_confirm_title"></div>
    <div class="am-modal-bd" id="fq_confirm_info"></div>
    <div class="am-modal-footer">
      <span class="am-modal-btn" data-am-modal-confirm>确定</span>
    </div>
  </div>
</div>

<!-- 虚拟消息框 -->

<!--悬浮图标-->
<!--悬浮图标-->

<script>
    
    function dangling(time,status){
            if(status == 1){
                $('.fq-custom').css('animation','myfirst 0.6s linear 1s infinite alternate');
            }else{
                $('.fq-custom').css('animation','none');
            }
            var t = setInterval(function(){
                if(status == 1){
                    dangling(1000,0);
                }else{
                    dangling(5000,1);
                }
                clearInterval(t);
            },time);
    }
        setTimeout(dangling(1000,0),4000);  
</script>

<!--iphone/android弹窗提示打开手机浏览器-->
<div class="safari_top">

    <div class="tinymask am-padding-0 am-margin-0"></div>
    <div class="safari_img am-text-right" onclick="hidetip()">
        <img id="go_tip" src="<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/jump_coupon_android.png" alt="" />
        <div class="fq-text-white am-text-center am-text-sm" style="position:relative; top:-20px;">
            温馨提示：
            <br />
            有【手机淘宝】的选择淘口令购买方式更方便哦~
        </div>
		
		<div class="fq-text-white am-text-center am-text-sm am-round"  >
		<span class="am-round am-padding-vertical-sm am-margin-top am-padding-horizontal am-inline-block more_coupon" style="background:rgba(254, 222, 20, 0.6);box-shadow: 0 0 0 11px rgba(254, 222, 20, 0.2);">查看更多优惠券</span>
			
        </div>
    </div>
</div>

<!--iphone/android弹窗领取优惠券-->
<style>
    body {
        background:#f54d23;   
    }
    .safari_img {
        z-index: 2000;
        position: fixed;
        top: 10px;
        right: 0;
        position: fixed;
        z-index: 2000;
    }
    .safari_img img {
        width: 100%;
        margin: 0px;
    }
    .tinymask {

        z-index: 2000;

        width: 100%;

        height: 100%;

        position: fixed;

        top: 0;

        left: 0;

        -webkit-tap-highlight-color: transparent;

    }
</style>
    
<script>
    //自动focus定时器初始化
    var timer0 = "";
    var timer1 = "";
    $(function(){
        var ua = navigator.userAgent.toLowerCase();

        if (ua.match(/iphone/i) == "iphone" || ua.match(/ipad/i) == "ipad") {

            $(".safari_top").css("display", "block");

            $("#go_tip").attr("src", "<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/jump_coupon_ios.png");

        } else {

            $(".safari_top").css("display", "block");

            $("#go_tip").attr("src", "<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/jump_coupon_android.png");

        }
    });

</script> 

<script>

   $(document).ready(function(e){
   		//内部方法

        function is_weixin() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger" 
                //|| ua.match(/qq\//i) == "qq/"
                ) {
                return true;
            } else {
                return false;
            }

        }

        function is_ios() {

            var ua = navigator.userAgent.toLowerCase();

            if (ua.match(/iphone/i) == "iphone" || ua.match(/ipad/i) == "ipad") {

                return true;
            } 
        }

        function openApp(url) {

            try{
            
             var tb_url = url.replace("http://", "").replace("https://", "");

            var ifr = document.createElement('iframe');

            ifr.src = 'taobao://' + tb_url;

            ifr.style.display = 'none';

            document.body.appendChild(ifr);

            }catch(e){  
            }
            window.location = url;
        }

        function openIphoneApp_ios_9(url) {
            try{
             var tb_url = url.replace("http://", "").replace("https://", "");
            window.location = "taobao://" + tb_url;
        }catch(e){  
        }
            window.setTimeout(function () { window.location = url; }, 4000)
        }
     //函数执行

        var isWeixin = is_weixin();

        if (isWeixin) {

            var is_ios = is_ios();

            //is_ios = 0;

            if (is_ios) {
                $("#go_tip").attr("src", "<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/jump_coupon_ios.png");
            } else {

                $("#go_tip").attr("src", "<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/jump_coupon_android.png");
            }

        } else {

            //<empty name="prize_detail.coupons"> 

            var is_ios = is_ios();

            //is_ios=0;

            if (is_ios) {

                $("#go_tip").attr("src", "<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/jump_coupon_ios.png");
            } else {
                $("#go_tip").attr("src", "<?php echo $url_prefix_item['search_static_css']; ?>/taoke/template/cms/<?php echo $taoke_cms['path']; ?>/images/jump_coupon_android.png");
            }
       
     
       $("body").html("<center style=\"margin-top: 10px;\">唤醒手机淘宝中...</center>");
            //只在有优惠券的时候执行
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/iphone os 9/i) == "iphone os 9") {
                openIphoneApp_ios_9('<?php echo urldecode($arr_query['link']) /*iconv("utf-8","gb2312//IGNORE",$arr_query['q'])*/; ?>');
            } else {
                openApp('<?php echo urldecode($arr_query['link']) /*iconv("utf-8","gb2312//IGNORE",$arr_query['q'])*/; ?>');
            }

        }
      

    });

    $('.more_coupon').click(function(){
          window.location.href ='<?php echo $model_base_url; ?>';
    })

</script>
<?php } ?>
</body>
</html>