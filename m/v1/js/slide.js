/**
 * Created by lbb on 2016/7/12.
 */
$(function(){
    var $stop=$(".fixeds").offset().top;
    var touchScroll = {
        scroll:function(parameter){
            var scrollPage =parameter,
                sddd=30,
                scrollTop=$(document).scrollTop();

            function touchstart(event){
                scrollTop=$(document).scrollTop();
                $stop=$(".fixeds").offset().top
            };
            function touchMove(event){
                $stop=$(".fixeds").offset().top
                scrollTop = $(document).scrollTop();
/**
                if(scrollTop>0){
                    $('.nav-info').addClass('curr')
                }else{
                    $('.nav-info').removeClass('curr')
                }
 **/
                if(scrollTop>$('.fixeds').position().top){
                    $('.fixed-main').addClass('currs')
                }else{
                    $('.fixed-main').removeClass('currs')
                }

            };
            function touchEnd(event){
                $stop=$(".fixeds").offset().top
                scrollTop = $(document).scrollTop();
                if(scrollTop>$('.fixeds').position().top){
                    $('.fixed-main').addClass('currs')
                }else{
                    $('.fixed-main').removeClass('currs')
                }
            };

            $(document).scroll(function(){
                console.log(11);
                touchMove()
                scrollTop = $(document).scrollTop();
            });

            scrollPage.addEventListener("touchstart",touchstart);
            scrollPage.addEventListener("touchmove",touchMove);
            scrollPage.addEventListener("touchend",touchEnd);
            scrollPage.addEventListener("touchcancel",touchEnd);
        }
    };

    //Ê×Ò³

        touchScroll.scroll(document);

    $('.special-tit div').on('click',function(){
        var i=$(this).index();
        $(this).find('span').addClass('curr');
        $("html,body").animate({scrollTop:$stop},200);
        $(this).siblings().find('span').removeClass('curr');
        $('.listM').eq(i).show()
            .siblings().hide();
    })
});