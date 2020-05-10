// JavaScript Document

var SItemSku = {

    il_sel_attr2: null,
    il_attrinfo: null,
    OQuantity: null,
    OPrice: null,
    OMajorImgBox: null,
    OOrderQuantity: null,
    OBtnAdd: null,
    OBtnSub: null,

    init: function(){
        //
        this.il_sel_attr2 = $('div.il_sel_attr2');// 例如：颜色对象
        this.il_sel_attr3 = $('div.il_sel_attr3');// 例如：颜色对象
        this.il_attrinfo = $('li.il_attrinfo');// 例如：具体的颜色对象，比如红色
        this.OQuantity = document.getElementById('lib_sku_quantity');// 显示库存的对象
        this.OPrice = document.getElementById('lib_sku_price');// 显示价格的对象
        this.OMajorImgBox = document.getElementById('major_img_box');// 显示主图的对象
        this.OOrderQuantity = document.getElementById('order_quantity');// 购买的数量对象
        this.OBtnAdd = document.getElementById('opt_add_quantity');// 增加按钮对象
        this.OBtnSub = document.getElementById('opt_sub_quantity');// 减少按钮对象
        this.lib_sku_work= document.getElementById('lib_sku_work');

        //
        this.il_attrinfo.click(function(){
            SItemSku.selectSku(this);
        });

        //
        $(this.OBtnAdd).click(function(){
            if(SItemSku.isFullSel()){
                //console.log(SItemSku.isFullSel())
                SItemSku.addQuantity(this);
            }else{
                itemWindow('请选择颜色与尺码',211,311,1);
            }
        });

        //
        $(this.OBtnSub).click(function(){
            if(SItemSku.isFullSel()){
                SItemSku.subQuantity(this);
            }else{
                itemWindow('请选择颜色与尺码',211,311,1);
            }
        });

    },

    // 购买数加1
    addQuantity: function(node){
        var limit = parseInt(this.OOrderQuantity.getAttribute('data-limit'));
        var n = parseInt(this.OOrderQuantity.value);
        limit = isNaN(limit)? 0: limit;
       // alert(11111233)
        n = isNaN(n)? 0: n;
        var n_curr = n+1;
        n = ( n_curr < limit || limit == 0 ) ? n_curr: limit;

		if( true == this.isFullSel() ){
			var attr = this.getSelAttrQuantity(); //console.log( attr );
			if( attr['quantity'] < n ) n = attr['quantity'];
            if(parseInt(this.OOrderQuantity.getAttribute('data-limit'))>0){
                if(n_curr>parseInt(this.OOrderQuantity.getAttribute('data-limit'))){
                    itemWindow('您所购买的数量已经超出限购数量',211,311,1);
                }
            }
		}

        this.OOrderQuantity.value = n;

        /*if (typeof(callback) === "function") {
         callback.call(self);
         }*/

    },

    // 购买数减1
    subQuantity: function(node){

        var n = parseInt(this.OOrderQuantity.value);
        //console.log(n);

        n = isNaN(n)? 0: n;

        var n_curr = n-1;

        n = n_curr > 0 ? n_curr: 1;

        this.OOrderQuantity.value = n;

    },

    // 获取购买数
    getQuantity: function(node){

        var n = parseInt(this.OOrderQuantity.value);

        return isNaN(n)? 0: n;

    },

    // 选择某一个属性
    selectSku: function(node){

        var img = '', sku = '';

        var root = getRootNode( node, 'il_sel_attr2' );

        if( img = this.changeSelAttrInfo( root, node ) ){
            this.OMajorImgBox.src = img + '_400x400.jpg';
        }

        sku = this.getSelAttrQuantity();//
        this.getSelAttrword();
        if( typeof(sku) != 'undefined' ){
            console.log(sku['quantity'])
            this.OQuantity.innerHTML = sku['quantity']+'件';
           // onwword = $('.il_attrinfo .curr ')[0].innerHTML;
           // console.log($('.il_attrinfo.curr').html())

        }

    },

    // 改变勾选的对象，如果有图片则传出图片地址，否这返回 false
    changeSelAttrInfo: function( root, node ){
        /**
        var children = $(root).children('div.il_attrinfo');
        for( var i=0; i<children.size();i++  ){
            children.eq(i).removeClass('curr');
        }
         **/
        var img = $(node).attr('data-src');
        return img;

    },

    //skuwork
    getSelAttrword: function(){
        var attr = Array();
        var word = [];
        var one = null, son = null;
        for( var i=0; i<this.il_sel_attr3.size();i++ ){
            one = this.il_sel_attr3.eq(i);
            son1 = one.children('dl').children('dd').children('ul');
            if(son1.children('li.check').size()>0){
                son = son1.children('li.check')[0];
                word.push(son.innerHTML);
            }

        }
        this.lib_sku_work.innerHTML= word.join(':');
        //alert(son);


    },
    // sku数量匹配选择
    getSelAttrQuantity: function(){
        var cB=$('.checkBoc'),
            attr = Array(),
            one = null,
            son = null,
            le=$('.shopform'),
            le2=$('.shopform2'),
            sobj=le.find('.item-color').find('li'),
            sobj2=le.find('.item-color').find('li'),
            cObj2=le.find('.item-size').find('li'),
            cSize=cB.attr('data-size'),
            cColor=cB.attr('data-color');
        if(cSize){
            $('.shopform3 .item-size ul li').eq(parseInt(cSize)).addClass('check');
        }
        if(cColor){
            $('.shopform3 .item-color ul li').eq(parseInt(cColor)).addClass('check');
        }

        for( var i=0; i<this.il_sel_attr3.size();i++ ){
            one = this.il_sel_attr3.eq(i);
            son1 = one.children('dl').children('dd').children('ul');
            son = son1.children('li.check')[0];
            if( son ){
                attr.push(son.getAttribute('data-id'));
            } else {
                attr.push(0);
            }
        }

        /**判断所选的其余选项是否库存为空**/
        //function checkLei(){
        //    if(checkType=='iSize'){
        //        for (var j = 0; j < sobj.length; j++) {
        //            var attrs = Array();
        //            for( var i=0; i<le.find('.item-size').find('li').length;i++ ){
        //                var so2=le.find('.item-size').find('li');
        //                if(so2.eq(i).attr('class').indexOf('curr')!==-1){
        //                    attrs.push(le.find('.item-size').find('li').eq(i).attr('data-id'));
        //                    attrs.push(sobj.eq(j).attr('data-id'));
        //                    sobj.eq(j).removeClass('curr2')
        //                    if(PCfg.skumap[attrs.join(':')].quantity==0){
        //                        sobj.eq(j).addClass('curr2').removeClass('curr');
        //                    }
        //                    var attrs = Array();
        //                }
        //            }
        //        }
        //    }else{
        //        for( var i=0; i<le.find('.item-size').find('li').length;i++ ){
        //            var attrs = Array();
        //            var so2=le.find('.item-color').find('li');
        //            for (var j = 0; j < sobj2.length; j++) {
        //                if(so2.eq(j).attr('class').indexOf('curr')!==-1){
        //                    attrs.push(le.find('.item-size').find('li').eq(i).attr('data-id'));
        //                    attrs.push(sobj2.eq(j).attr('data-id'));
        //                    cObj2.eq(i).removeClass('curr2')
        //                    if(PCfg.skumap[attrs.join(':')].quantity==0){
        //                        cObj2.eq(i).addClass('curr2').removeClass('curr');
        //                    }
        //                    var attrs = Array();
        //                }
        //            }
        //        }
        //    }
        //}
        //
        //checkLei()

        return PCfg.skumap[ attr.join(':') ];

    },

    // 获取选择的sku
    getSelAttrInfo: function(){
        var attr = Array();
        var attrid = Array();
        var one = null, son = null;

        for( var i=0; i<this.il_sel_attr3.size();i++ ){
            one = this.il_sel_attr3.eq(i);
            son1 = one.children('dl').children('dd').children('ul');
            son = son1.children('li.check')[0];
            if( son ){
                attr.push(son.getAttribute('data-value'));
                attrid.push(son.getAttribute('data-id'));
            } else {
                attr.push(0);
                attrid.push(0);
            }
        }
        return [attr.join(';'), attrid.join(':'), PCfg.skumap[ attrid.join(':') ]];

    },

    // 检查sku是否已全部选择，返回没有选择项的id值，成功返回true
    isFullSel: function(){

        var attr = Array();
        var one = null, son = null;

        for( var i=0; i<this.il_sel_attr3.size();i++ ){
            one = this.il_sel_attr3.eq(i);
            son1 = one.children('dl').children('dd').children('ul');
            son = son1.children('li.check')[0];

            if( son ){

            } else {
                return one[0].getAttribute('data-name');
            }
        }

        return true;

    }

};
startup.add( function(){SItemSku.init()}, Array() );

var SItemOrder = {

    // btn_buynow     btn_addcart

    time_click_start: 0,

    init: function(){

        $('#btn_buynow').click(function(){

            var buystate=$('#order_quantity').attr('data-new_buystate');
            var buyval=$('#order_quantity').val();
            var $buyMsg=$('#order_quantity').attr('data-new_buymsg');
            var $buylimit=$('#order_quantity').attr('data-new_buylimit');
            if(buystate==1){
                if($buylimit<buyval){
                    itemWindow($buyMsg,211,311,1);
                    return false
                }

            }


            var time_curr = Date.parse(new Date()) / 1000;
            if( SItemOrder.time_click_start == 0 || ( time_curr - SItemOrder.time_click_start ) > 2 ) {
                if($(this).attr('class').indexOf('disBtn')!=-1){
                }else{
                    SItemOrder.time_click_start = time_curr;
                    process = SItemOrder.beforeQueue();
                    if( process ){
                        var pay = this.getAttribute('data-pay');
                        var is_cart = this.getAttribute('data-iscart');

                        if( pay == '2' ){
                            switch( is_cart ){
                                case '1':
                                    SItemOrder.putCart();//加入购物车
                                    break;

                                case '0':
                                default:
                                    $(this).addClass('disBtn')
                                    SItemOrder.confirmqueue();//直接确定订单
                                    break;
                            }

                        } else if( pay == '3' ) {//不允许购买
                            alert('当前商品暂时无法购买')
                        } else {
                            alert('当前商品暂时无法购买')
                        }
                    }
                }
            }

        });


    },

    getLibId: function(){

        return document.getElementById('order_lib_id').value;

    },

    confirmOrder: function(){
        //
        var attrid = SItemSku.isFullSel(); //
        if( attrid !== true ) {
			console.log( '请选择' + attrid );
            return;
        }

        //ajaxprocess = false
        var sku = SItemSku.getSelAttrInfo();

        var postdata = {};
        postdata['i'] = {}
        postdata['i'][0] = {}
        postdata['i'][0]['lib_id'] = SItemOrder.getLibId();
        postdata['i'][0]['attrinfo'] = sku[0];
        postdata['i'][0]['sku'] = sku[1];
        //postdata['i'][0]['sku_id'] = sku[2]['id'];
        postdata['i'][0]['quantity'] = SItemSku.getQuantity();
        postdata['from'] = 'h5';

		if( PCfg.skumap[sku[1]]['quantity'] <= 0 || PCfg.skumap[sku[1]]['quantity'] < postdata['i'][0]['quantity'] ){
			alert('该款库存不足，请选择其他款。');
			return;
		}

        document.getElementsByName('order_savedata')[0].value = JSON.stringify(postdata);
        document.getElementById('form_order_confirm').onclick=function(){
            //console.log(SItemSku.il_sel_attr2+'-'+1111)
            //console.log(SItemSku.il_sel_attr2+'-'+1111)
            //console.log(SItemSku.il_sel_attr2+'-'+1111)
           // this.submit()
        }

        document.getElementById('form_order_confirm').submit();


    },

    // 加入排队
    //
    // 110;// 当前系统繁忙，请稍候再试
    blocktime: 0,
    postdata: null,
    beforeQueue: function(){

        if( SItemOrder.blocktime > Date.parse(new Date()) / 1000 ) {
            return false;
        }

        var attrid = SItemSku.isFullSel();
        if( attrid !== true ) {
            ;// 该函数定义于html文件中 //console.log( '请选择' + attrid + '，需要换提示方式2' );
            return false;
        }

        //ajaxprocess = false
        var sku = SItemSku.getSelAttrInfo();

        var postdata = {};
        postdata['i'] = {};
        postdata['i'][0] = {};
        postdata['i'][0]['lib_id'] = SItemOrder.getLibId();
        postdata['i'][0]['attrinfo'] = sku[0];
        postdata['i'][0]['sku'] = sku[1];
        //postdata['i'][0]['sku_id'] = sku[2]['id'];
        postdata['i'][0]['quantity'] = SItemSku.getQuantity();
        postdata['from'] = 'pc';
        //console.log( postdata );

        //
        if( postdata['i'][0]['quantity'] <= 0 ){
            return false;
        }

        //
        if( PCfg.skumap[sku[1]]['quantity'] <= 0 || PCfg.skumap[sku[1]]['quantity'] < postdata['i'][0]['quantity'] ){
            NoticeMsg.show( 601 );//该款库存不足，请选择其他款。
            setTimeout(function(){
                $('#id-dialog').hide()
            },3000)
            return false;
        }

        //
        if( document.getElementById('btn_buynow').getAttribute('data-pay') == 1 ) {
            ;// 该函数定义于html文件中

            return false;
        }

        //
        this.postdata = postdata;

        return true;

    },

    confirmqueue: function(){

        if( !ajaxprocess ) return;
        ajaxprocess = false;

        var url = '/?r=mall/order/confirmqueue';
        $.ajax({
            url : url,
            type : 'POST',
            data : SItemOrder.postdata,
            dataType : 'json',
            timeout:5000,
            success:function(data) {
                ajaxprocess = true;

                if( data['state'] == 'ok' ){
                    document.getElementsByName('data')[0].value = data['data'];
                    document.getElementsByName('sign')[0].value = data['sign'];
                    SItemOrder.confirmOrder();
                } else {

                    SItemOrder.blocktime = Date.parse(new Date()) / 1000 + 3;
                    NoticeMsg.show( data['errno'] );// 显示返回的提示
                    setTimeout(function(){
                        $('#id-dialog').hide()
                    },3000)

                }
            },
            error: function(){
                ajaxprocess = true;
                SItemOrder.blocktime = Date.parse(new Date()) / 1000 + 3;
            }

        })

    },
    putCart: function(){

        if( !ajaxprocess ) return;
        ajaxprocess = false;

        var url = '/?r=mall/cart/opt&save';
        $.ajax({
            url : url,
            type : 'POST',
            data : SItemOrder.postdata,
            dataType : 'json',
            timeout:5000,
            success:function(data) {
                ajaxprocess = true;

                if( data['state'] == 'ok' ){
                    SItemOrder.responsePutCart(data);
                    //$('#llb_cart_top_trigger').attr('data-isclick', 0).trigger('click');
                } else {

                    SItemOrder.blocktime = Date.parse(new Date()) / 1000 + 3;
                    //alert(data['errno']);
                    NoticeMsg.show( data['errno'] );// 显示返回的提示

                    setTimeout(function(){
                        $('#id-dialog').hide()
                    },3000)


                }
            },
            error: function(){
                ajaxprocess = true;
                SItemOrder.blocktime = Date.parse(new Date()) / 1000 + 3;
            }

        })

    },

    responsePutCart: function( data ){
        //alert('成功');
        $('.shopform3').hide();
        $('.item-mask').hide();
        NoticeMsg.show( 1 );// 显示返回的提示
        setTimeout(function(){
            $('#id-dialog').hide()
        },3000)

    }

};
startup.add( function(){SItemOrder.init()}, Array() );


var SItemOther = {

    node: document.getElementsByName('itemlib_detail_tab'),

    init: function(){

        //
        for( var i=0; i<this.node.length; i++ ){
            if( ',1,2,3,4,5,'.indexOf(','+ (i+1) +',') > -1 ){
                $(this.node[i]).click(function(){
                    SItemOther.tab(this);
                });
            }
        }

        //
        $( document.getElementById('btn_submit_qa') ).click(function(){
            SItemOther.saveQa();
        });

    },

    tab: function( node ){

        for( var i=0; i<this.node.length; i++ ){
            if( this.node[i].getAttribute('data-nameid') == node.getAttribute('data-nameid') ){
                $(this.node[i]).removeClass('check').addClass('check');
                $('.content_box' + (i+1))[0].style.display = 'block';

            } else {
                $(this.node[i]).removeClass('check');
                $('.content_box' + (i+1))[0].style.display = 'none';
            }
        }

        Notify.call();

    },

    saveQa: function(){

        /*
         100;//未登录
         103;//请勿重复提交
         */

        var OMess = document.getElementById('message_qa');
        var postdata = {}
        postdata['message'] = OMess.value;
        postdata['lib_id'] = OMess.getAttribute('data-lib_id');

        if( postdata['message'].trim() == '' ){
            return;
        }

        //
        if( !ajaxprocess ) return;
        ajaxprocess = false;

        var url = '/?r=mall/item/qa';
        $.ajax({
            url : url,
            type : 'POST',
            data : postdata,
            dataType : 'json',
            timeout:5000,
            success:function(data) {
                ajaxprocess = true;
                if( data['state'] == 'ok' ){
                    //

                } else {
                    //提示失败
                    $('#btn_buynow').removeClass('disBtn')
                }
            },
            error: function(){
                ajaxprocess = true;
            }

        })
        //

    }

};
startup.add( function(){SItemOther.init()}, Array() );

var NoticeMsg = {

    errmap: {
        1:"成功加入购物车",

        //
        100:"未登录，请先登录",
        110:"系统繁忙，请稍后再试",

        // 问答
        103:"请勿重复提交",
        610:"提交成功，我们将尽快回复。",

        //
        601:"该款库存不足，请选择其他款。",

        //
        11000:"商品未开始或已售完",
        10010:"所选款式库存不足",
        11001:"已购买或超出限购",
        11002:"商品不支持在该设备上购买"
    },

    show: function( errno ){

        switch( errno ){
            case 100:
                $('#zhec').show();
                //$('#Judge_yon_logg_div').show();
                $('#llb_login_trigger').trigger('click');
                $('#llb_login').css('z-index', 9999);
                break;

            default:
                if( typeof( this.errmap[errno] ) == 'undefined' ){

                    Dialog.show('出错')
                } else {

                    Dialog.show(this.errmap[errno])
                }
                break;
        }

    },

    openDialog: function( msg ){

        detail_show_wo(msg);

    }

};



























