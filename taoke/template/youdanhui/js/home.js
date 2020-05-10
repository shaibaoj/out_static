(function () {
    var $loadingBox = $("#loading_box"),
	$goodsBox = $('#goods_list'),
    $menu = $('#nav_area'),
    waiting = false,
    isMore = true,
    sildeNum = 4,
    $noData = $('#no_data'),
    $time = $('#time'),
    tags = '',
    $copyright = $('.copyright_box'),
    $listNodata = $('#list_nodata'),
	time = 0;
    var funList = {
        //初始化插件
        setting: function () {
            lazyLoading($("img.lazyload"));
            var swiper = new Swiper('#nav_area', {
                slidesPerView: sildeNum,
                paginationClickable: true,
                spaceBetween: 0,
                freeMode: true
            });
            //倒计时
            runTimer({
                el:$('.timer'),
                endTxt:'已结束'
            });
            //设置菜单导航的宽度
            $('.nav_tab').width('1000px');
            showTkl($goodsBox);
            //this.addAPPLoad();
        },
        //新增下载块
        addAPPLoad:function(){
            $goodsBox.find('li').eq(9).append('<li class="list_logo border_new"><i class="fl list_icon_logo icons"></i><div class="fl logo_info"><div><span class="logo_text">惠喵App</span><span class="logo_other">·更多半价秒杀优惠</span></div><i class="icon_star icons"></i></div><a data-url="http://a.mlinks.cc/AAS5?homeid=huim%3a%2f%2findex?" href="javascript:;" class="ano_bg com_btn fr app_url">打开App</a></li>');
            /*mcBtn1 = doc.querySelectorAll('.app_url');
            options = [
            {
                mlink: mlink,
                button: mcBtn1
            },
            ];
            new Mlink(options);*/
        },
        //滚动加载更多
        loadMore: function () {
            var windowHeight = $(window).height(),
                that = this,
                menuOffsetTop = $menu.offset().top;
            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();
                if(scrollTop >= menuOffsetTop){
                    $menu.addClass('menu_fixed');
                }else{
                    $menu.removeClass('menu_fixed');
                }
                if(!isMore||waiting){
                    return false;
                }
                if(scrollTop + windowHeight > $(document).height() -  200) {
                    that.setDate($loadingBox,'more');
                }
            });
        },
        //导航菜单
        menuLoad:function(){
            var itemWidth = $('.swiper-slide').width(),
                that = this,
                $navTab = $('.nav_tab'),
                slidWidth = 0,
                temTags = '',
                $loadingBox2 = $('#loading_box2'),
                maxSildeWidth = itemWidth*($navTab.find('li').length - sildeNum),
                windowWidth = $(window).width()/2;
            $menu.on('click','li',function(e){
                if($(this).hasClass('active')){
                    return false;
                }
                $goodsBox.html('');
                slidWidth = -itemWidth*$(this).index() + windowWidth;
                //设置区间值
                if(slidWidth > 0){
                    slidWidth = 0;
                }else if(slidWidth < -maxSildeWidth){
                    slidWidth = -maxSildeWidth;
                }
                $navTab.attr('style','width: 1000px; transition-duration: 300ms; transform: translate3d('+slidWidth+'px, 0px, 0px);');
                $(this).addClass('active').siblings().removeClass('active');
                //页面初始化
                $(window).scrollTop(0);
                temTags = $(this).find('a').html();
                if(temTags == '全部'){
                    tags = '';
                }else{
                    tags = temTags;
                }
                isMore = true;
                $noData.hide();
                $listNodata.hide();
                $copyright.hide();
                that.setDate($loadingBox2);
            });
        },
        //获取数据
        setDate: function ($loading,loadingType) {
            var that = this;
            time = $time.data('time');
            if (waiting) {
                return false;
            }
            if(loadingType!='more'){
                time = '';
            }
            waiting = true;
            $loading.show();
            $.ajax({
                url: all_config.youdanhui_url,
                data: {action:"goods","id":time,"tags":tags},
                type: 'GET',
                dataType: 'jsonp',
                jsonp:"callback",
//                jsonpCallback:"success_jsonpCallback",
                success: function (data) {
                    $loading.hide();
                    waiting = false;
                    //无数据
//                    if (data.indexOf('li') > -1) {
//                        if(loadingType == 'more'){
//                            $goodsBox.append(data);
//                        }else{
//                            $goodsBox.html(data);
//                        }
//                    }else{
//                        isMore = false;
//                        if(loadingType == 'more'){
//                            $copyright.show();
//                            $noData.show();
//                        }else{
//                            $listNodata.show();
//                        }
//                    }
                    if (data.result.map.content == "") {
                    	isMore = false;
                        if(loadingType == 'more'){
                            $copyright.show();
                            $noData.show();
                        }else{
                            $listNodata.show();
                        }
                    }else{
                    	if(loadingType == 'more'){
                            $goodsBox.append(data.result.map.content);
                        }else{
                            $goodsBox.html(data.result.map.content);
                        }
                    }
                    
                    lazyLoading($("img.lazyload"));
                    runTimer({
                        el:$('.timer'),
                        endTxt:'已结束'
                    });
                    //列表加下载块并配置魔窗
                    /*if(loadingType!='more'){
                        that.addAPPLoad();
                    }*/
                },
                error: function () {
                    $loading.hide();
                    promptPop({ content: '系统错误,请重试' });
                }
            });
        },
        init: function () {
            this.setting();
            this.loadMore();
            this.menuLoad();
//            showTkl($goodsBox);
            this.setDate($('#loading_box2'));
        }
    }
    funList.init();
})();

///点击统计
function TrackClick(id) {
    $.ajax({
        type: "POST",
        url: "/ajax/TrackClick",
        data: "id=" + id
    });
}