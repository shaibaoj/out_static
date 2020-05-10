$(document).ready(function(){
    var navli=$(".goods_b_nav li"),
        navul=$(".goods_b_nav"),
        speed=200;
    function goodsclick(){
        n=navul.find("li.on").index();
        navul.stop().animate({backgroundPosition:navli.width()*n},speed)
    }
    goodsclick();
    navli.hover(
        function(){
            n=$(this).index();
            navul.stop().animate({backgroundPosition:navli.width()*n},speed);
        },function(){
            goodsclick();

        }
    )

})