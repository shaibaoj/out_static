var initSimilarJson  = {
    init:function(requestUrl,cate_id){
//        initSimilarJson.getSimilarItems(requestUrl,cate_id);
    },
    temp:function(data,domEle,type){
        $.each(data,function(i,item){
            var itemClass = 'tlyh-item';
            var templateHtml = $('<dl class="'+itemClass+'">'
                +"<dt><a href='"+item['url']+"'><img src='"+item['pic_url']+"_120x120.jpg' width='128' height='128'></a></dt>"
                +"<dd class='text'><a href='"+item['url']+"'>"+item['retitle']+"</a></dd>"
                +"<dd class='price'>"+item['coupon_price']+"元包邮</dd>"
                +'</dl>');
            domEle.append(templateHtml);
        })
    },
    getSimilarItems:function(requestUrl,cate_id){
        $.ajax(requestUrl,{
            data:{cate_id:cate_id},
            type:'GET',
            dataType:'json',
            beforeSend: function () {
                $(".loading").show();
            },
            success:function(result){
                if(result.status == 200){
                   
                    initSimilarJson.temp(result.yhItemsList,$('.tlyh-bd'));

                    var html = template('goods', result);
                    $(".ylike-ul").append(html);
                    $(".ylike-ul").slick({
                        dots: true,
                        infinite: true,
                        autoplay: true,
                        autoplaySpeed: 10000,
                        speed: 400,
                        slidesToShow: 5,
                        slidesToScroll: 5
                    });
                    //initSimilarJson.temp(result.itemsList,$('.ylike-ul'),'yhitems');
                    //$('img.lazy').lazyload({threshold: 200, failure_limit: 40, effect: "fadeIn"});
                    //$(".goodList").trigger("triggerItemList");
                    //$(".goodList:first").clone(true);
                    //$(".page").html(result.pages);
                }else{
                    return;
                }
            },
            complete: function () {
                $(".loading").hide();
            },
            error: function (data) {
                console.info("error: " + data.responseText);
            }
        });
    }
}