var Generater = {
    get_short_url:function(url,title,pic_url,price,coupon,succ_func,err_func) {
        var data = {
            url: url,
            title: title,
            pic: pic_url,
            price: price,
            coupon: coupon
        };


        //通过jsonp获取生成的短链接
        $.ajax({
            type: "get",
            data: data,//jsonp方式的参数都是以get形式传入
            url: g_config.ajax_urls.get('short'),
            dataType: "jsonp",
            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            success: function(data){
                if(data.status=='success')
                    succ_func(data);
                else
                    err_func();
            },
            error:err_func
        });

    },
    
    //生成淘口令
    get_tkl:function(url,title,pic_url,succ_func,err_func) {
        var data = {
            url: url,
            text: title,
            pic: pic_url
        };


        //通过jsonp获取生成的淘口令
        $.ajax({
            type: "post",
            data: data,
            url: g_config.ajax_urls.get('tkl'),
            dataType: "json",
            async:true,
            success: function(data){
                if(data.status=='success')
                    succ_func(data);
                else
                    err_func();
            },
            error: err_func
        });

    }
};