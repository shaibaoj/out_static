/**
 * Created by lbb on 2016/7/14.
 */

    $('#touchBox').css('width',5000)
    var touchSpecial={
        move:function(parameter){
            var special=document.getElementById(parameter),
                flage=false,
                startX,
                startY,
                endX,
                nums= 1,
                winWidth=$(window).width();
            $("#"+parameter).find(".touchItem").css({"width":parseInt(winWidth *1)});
            var totalPage= $("#"+parameter).find(".touchItem").length,//当前条数
                current= 1,
                pageSize=1;

            var first=$("#"+parameter).find(".touchItem:lt(1)").clone(),
                lastNumber=totalPage-2,
                last=$("#"+parameter).find(".touchItem:gt("+lastNumber+")").clone();

            $('.current-index').text(1+'/'+totalPage);
            //debugger;
            $("#"+parameter).find(".ulBox").prepend(last).append(first);
            $("#"+parameter).find(".touchItem").eq(pageSize).addClass("active");
            var liwidth=$("#"+parameter).find(".touchItem").eq(pageSize).outerWidth();
            var leftval=(pageSize*liwidth);
            //debugger;
            $(".ulBox").css({left:-leftval});
            function touchstart(event){
                if(!$("#"+parameter).is("animated")){
                    flage=true;
                    var touchObj=event.touches[0];
                    startX=touchObj.pageX;
                    startY=touchObj.pageY;
                }else{
                    flage=false;
                }
            };
            //移动
            function touchMove(event){
                if(flage && Math.abs(event.touches[0].pageX-startX) > Math.abs(event.touches[0].pageY-startY)){
                    event.preventDefault();
                    var touchObj=event.touches[0];
                    endX=touchObj.pageX-startX;
                    $(".ulBox").css({left: -(current*liwidth)+endX});
                }else{
                    flage=false;
                }
            };
            function touchEnd(event){
                if(flage){
                    if(endX < 0 && Math.abs(endX) >50){
                        moveObj("right");
                        endX=0;
                        nums++
                    } else if(endX < 0 && Math.abs(endX) <50){
                        $(".ulBox").animate({left: -(current*liwidth)},100);
                    } else if(endX >0 && Math.abs(endX) >50){
                        moveObj("left");
                        endX=0;
                        nums--
                    }else if(endX >0 && Math.abs(endX) <50){
                        $(".ulBox").animate({left: -(current*liwidth)},100);
                    }
                    if(nums>totalPage){
                        nums=1
                    }else if(nums<1){
                        nums=totalPage
                    }
                    $('.current-index').text(nums+'/'+totalPage);
                }else{
                    flage=false;
                }
            };

            function moveObj(dir){
                if(dir=="right"){
                    if(!$(".ulBox").is(":animated")){
                        current++;
                        $("#"+parameter).find(".touchItem").removeClass("active").eq(current).addClass("active");
                        $(".ulBox").animate({left:-(current*liwidth)},function(){
                            if(current>totalPage){
                                current=1;
                                $("#"+parameter).find(".touchItem").removeClass("active").eq(current).addClass("active");
                                $(".ulBox").css({left:-(current*liwidth)});
                            }
                        });
                    }

                }else if(dir=="left") {
                    if (!$(".ulBox").is(":animated")) {
                        current--;
                        $("#" + parameter).find(".touchItem").removeClass("active").eq(current).addClass("active");
                        $(".ulBox").animate({left: -(current * liwidth)}, function () {
                            if (current < 1) {
                                current = totalPage;
                                $("#" + parameter).find(".touchItem").removeClass("active").eq(current).addClass("active");
                                $(".ulBox").css({left: -(current * liwidth)});
                            }
                        });
                    };
                }
            };
            special.addEventListener("touchstart",touchstart);
            special.addEventListener("touchmove",touchMove);
            special.addEventListener("touchend",touchEnd);

        }
    }
    // 商品评论
    if($("#touchBox").length){
        touchSpecial.move("touchBox");
    }