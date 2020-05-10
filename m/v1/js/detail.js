/**
 * Created by lbb on 2016/7/12.
 */

/********************生成商品属性之间对应后的库存数据json(主要应用在sku属性选择)*************************/
var sku_attrcheck_json=[],sku_attrcheck_json2=[];
function sku_each_addno(){
    var json = PCfg.skumap,json2 =[],json3=[],json4=[],json5=[],json2_1=[],json2_2=[],json2_3=[],len;
    for(var item in json){
        if(json[item]['quantity'] == 0){
            json2.push(item);
        }
    }
    for(var i=0;i<json2.length;i++){
        json3.push(json2[i].split(":")[0]);
        json2_1.push(json2[i].split(":")[1])
    }
    for(var i=0;i<json3.length;i++){
        var items = json3[i];
        if(json4.indexOf(items) == -1) {
            json4.push(items);
        }
    }
    for(var i=0;i<json2_1.length;i++){
        var items = json2_1[i];
        if(json2_2.indexOf(items) == -1) {
            json2_2.push(items);
        }
    }
    for(var i=0;i<json4.length;i++){
        var a = {};
        a[json4[i]] = [];
        json5.push(a);
    }

    for(var i=0;i<json2_2.length;i++){
        var a = {};
        a[json2_2[i]] = [];
        json2_3.push(a);
    }
    for(var i=0;i<json2.length;i++){
        for(var j=0;j<json5.length;j++){
            for(var key in json5[j]){
                if(key == json2[i].split(":")[0]){
                    json5[j][key].push( json2[i].split(":")[1])
                }}}

        for(var z = 0;z<json2_3.length;z++){
            for(var key in json2_3[z]){
                if(key == json2[i].split(":")[1]){
                    json2_3[z][key].push( json2[i].split(":")[0])
                }}}
    }

    sku_attrcheck_json = json5;
    sku_attrcheck_json2 = json2_3;

};
sku_each_addno();
/***********************************************************************************************/

/********************sku选择属性选择后进行的处理***************/
function sku_attr_click_quantiy(){
    var odl = $("#goods-detal-form .il_sel_attr"),obj1 = odl.eq(0).find("li.il_attrinfo"),obj2 = odl.eq(1).find("li.il_attrinfo");
    var priceTxt = $("#lib_sku_price"),old_price = priceTxt.html();
    if(odl.length == 1){
        obj1.each(function(i){
            for(var j = 0; j<sku_attrcheck_json.length;j++){
                for(var key in sku_attrcheck_json[j]){
                    if($(this).attr("data-id") == key){
                        $(this).addClass("no_quantity");
                    }
                }
            }
        })}

    obj1.each(function(i){
        $(this).on("click",function(){
            showAlertWindow();
            return false;

            if($(this).hasClass("no_quantity")){
                return false;
            }
            obj2.removeClass("no_quantity");

            for(var t=0;t<sku_attrcheck_json.length;t++){
                for(var key in sku_attrcheck_json[t]){
                    if(key == $(this).attr("data-id")){
                        attr_addnoc(sku_attrcheck_json[t][key],obj2)
                    }
                }
            }
            if($(this).attr("data-check")==1){
                obj1.attr("data-check","1").eq(i).attr("data-check","2");
                obj1.removeClass("check").eq(i).addClass("check");

            }else{
                obj1.removeClass("check");
                obj2.removeClass("no_quantity");

                $(this).attr("data-check","1");
                //$("#lib_sku_quantity").html($("#lib_sku_quantity").attr("data-totalnum"));
                $(".buy-sku-btn span.btn1").css("display","block");
                $(".buy-sku-btn span.btn2").css("display","none");
            }
            attr_changePrice();
        })
    })

    obj2.each(function(i,e){

        $(this).on("click",function(){
            showAlertWindow();
            return false;

            if($(this).hasClass("no_quantity")){
                return false;
            }

            obj1.removeClass("no_quantity");
            for(var t=0;t<sku_attrcheck_json2.length;t++){
                for(var key in sku_attrcheck_json2[t]){
                    if(key == $(this).attr("data-id")){

                        attr_addnoc(sku_attrcheck_json2[t][key],obj1)
                    }
                }
            }
            if($(this).attr("data-check")==1){
                obj2.attr("data-check","1").eq(i).attr("data-check","2");
                obj2.removeClass("check").eq(i).addClass("check");

            }else{
                obj2.removeClass("check");
                obj1.removeClass("no_quantity");

                $(this).attr("data-check","1");
                //$("#lib_sku_quantity").html($("#lib_sku_quantity").attr("data-totalnum"));
                $(".buy-sku-btn span.btn1").css("display","block");
                $(".buy-sku-btn span.btn2").css("display","none");
            }
            attr_changePrice();
        })
    })

    function attr_addnoc(arr,objs){
        var len = objs.length;
        objs.each(function(i){
            if(arr.indexOf($(this).attr("data-id"))!==-1){

                $(this).addClass("no_quantity");

            }else{
                $(this).removeClass("no_quantity");

            }
        })

    }

    //根据key值变换价格
    function attr_changePrice(){
        var keyo="";
        if(odl.length==1){

            obj1.each(function(){
                if($(this).hasClass("check")){
                    keyo=$(this).attr("data-id");
                }
            })
        }
        if(odl.length==2){
            var key_1 ="",key_2="";
            obj1.each(function(){
                if($(this).hasClass("check")){

                    key_1=$(this).attr("data-id");
                }
            })
            obj2.each(function(){
                if($(this).hasClass("check")){
                    key_2=$(this).attr("data-id");
                }
            });
            keyo = key_1+":"+key_2;
        }

        for(var key in PCfg.skumap){
            if(keyo == key){

                priceTxt.html('￥'+PCfg.skumap[keyo]['price']);
                return false
            }else{

                priceTxt.html(old_price);
            }
        }
    }

}
sku_attr_click_quantiy();
/***********************************************************************************************/


/********************点击加入购物车，立即购买按钮点击后进行的处理***************/
//function click_botBuyBtn(){
//
//    $('.bottomMenu .buy,.bottomMenu .join').on('click',function(){
//        showAlertWindow();
//        return false;
//        if(PCfg.u.loginstate==0){
//            window.location.href="/?r=mob/user/loginv3";
//            return false
//        }
//
//
//        var $buyBtn=$('#btn_buynow');
//        if($(this).attr('class').indexOf('join')==-1){
//            $buyBtn.attr('data-pay',2);
//            $buyBtn.attr('data-iscart',0);
//        }
//        if($(this).attr('class').indexOf('buy')==-1){
//            $buyBtn.attr('data-pay',2);
//            $buyBtn.attr('data-iscart',1);
//        }
//        shopform_show()
//
//    })
//
//    function shopform_show(){  //对弹窗样式的改变
//        $('html,body').addClass('ovfHiden');
//        $("#goods-detal-form").removeClass("shopform-hidden");
//    }
//
//    $("#goods-detal-form .item-close").on("click",function(){
//        $('html,body').removeClass('ovfHiden');
//        $("#goods-detal-form").addClass("shopform-hidden");
//    })
//
//}
//click_botBuyBtn();
/***********************************************************************************************/


/******************领取优惠券**********************/
function get_cuponFn(){


    $('.item-youhui').on('click',function(){
        showAlertWindow();
        return false;
        $('.item-mask').show();
        $('.item-coupn').show();
    })

    $('.coupn-btn').on('click',function(){
        var i=$(this).index(),
            item_id=this.getAttribute('data-coupon_id');
        $.ajax({
            url: '/?r=mall/cart/coupon&mod=get&coupon_id='+item_id,
            type: 'GET',
            data: '',
            dataType: 'json',
            success: function (re) {
                if(re.errno!=1){
                    alert(re.msg);
                }else{
                    $('.item-coupon').find('span').text($('.coupn-btn').eq(i).siblings().find('.coupn-minus').text())
                    $('.coupn-btn a').eq(i).html('已领取');
                }
            }
        })
    })

    $('.item-close').on('click',function(){
        $('.item-mask').hide();
        $('.item-coupn').hide();
    })
}
get_cuponFn();
/***********************************************************************************************/


/********************倒计时**************************/

function time_leave(){

}
time_leave()
setInterval(function(){
    $(".count-time").each(function(i,e){
        var now = new Date(),
            leftTime=$(this).data("endtime")*1000-now.getTime(),
            leftsecond = parseInt(leftTime/1000),
            day1=Math.floor(leftsecond/(60*60*24)),
            hour=Math.floor((leftsecond-day1*24*60*60)/3600),
            minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60),
            second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);
        if(leftTime>0){
            $(this).find(".show-time").html("结束时间："+day1+"天"+hour+"小时"+minute+"分"+second+"秒");
            $(this).find(".show-time2").html("距开抢"+day1+"天"+hour+"小时"+minute+"分"+second+"秒");
        }else{
            $(this).find(".show-time").html("结束时间：0天0小时0分0秒");
            $(this).find(".show-time2").html("距开抢0天0小时0分0秒");
        }
    })
}, 1000);

/***********************************************************************************************/

/********************收藏功能********************/

//$('.like-collect,.likefb').on('click',function(){
//    if(PCfg.u.loginstate==0){
//        window.location.href="/?r=mob/user/loginv3";
//        return false;
//    }
//    var spMain=$('.special-main .likefb'),
//        fav_o = $('.like-collect'),
//         txt_num = spMain.find('span'),
//         like_num = parseInt(txt_num.html());
//
//    if($(this).hasClass("curr")){
//        spMain.removeClass("curr");
//        fav_o.removeClass("curr");
//        like_num--;
//    }else{
//        spMain.addClass("curr");
//        fav_o.addClass("curr");
//        like_num++;
//    }
//
//    txt_num.html(like_num);
//    id = $('.like-collect').find('p').attr('data-pid');
//    $.ajax({
//        url:'/?r=mob/p/collection&pid='+id+'&type=5',
//        type:'POST',
//        data:"",
//        dataType:'json',
//        timeout:8000,
//        success:function(ret){
//            if(ret.state == 'error') {
//                if(ret.msg == '请先登录') {
//                    window.location.href="/?r=mob/user/login";
//                }
//            }else if(ret.errno == 1) {
//            }else{
//                alert("收藏系统出错啦，请联系客服")
//            }
//        }
//    })
//})

/***********************************************************************************************/


/********************弹窗方法************/
function itemWindow(str1,str2,str3,cv,del){
    $('.item-del .item-info').text(str1);
    $('.item-del .item-cancel').text(str2);
    $('.item-del .item-true').text(str3);
    $('.item-del').show();
    $('.item-mask2').show();
    if(cv==1){
        $('.item-del').addClass('ts');
        setTimeout(function(){
            $('.item-del').hide();
            $('.item-mask2').hide();
        },2000)
    }else{
        $('.item-del').removeClass('ts');
    }
}
/***********************************************************************************************/

function showAlertWindow(){
    var app_url = $(".appUpbk").attr('data_app-url');
    if(app_url){
        window.location.href=app_url
    }else{
        $(".appUpbk").css("display","block");
    }


}
$(".appUpbk .btn-close").on("click",function(){
    $(".appUpbk").css("display","none");
})



function todown(url){
    window.setTimeout(function(){showalert(url)}, 3000);
}
function showalert(url)
{
    if(url){
        window.location.href=url
    }else{
        window.location.href='http://m.huipinzhe.com/app'
    }

}



//返回上一级
$('.back-box').on('click',function(){
    history.go(-1);
})
//取消页面鼠标右键点击
//document.body.oncontextmenu=function(){
//    return false
//}
// 针对ios 浏览器返回会保持前一页面
$('.item-close').trigger('click');

$(".appUpbk").css("display","none");
//$('.shopCancel em').on('click',function(){
//    $('.item-share').show();
//    $('.item-mask').show();
//})
//
//$('.share-btn a').on('click',function(){
//    $('.item-share').hide();
//    $('.item-mask').hide();
//})


