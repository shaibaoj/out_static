/**
 * Created by boli on 2016/5/14.
 */
$(function(){
    //导航移动 start
    var touchnav={
        move:function(parameter){
            var nav=document.getElementById(parameter),
                flage=false,
                startX,
                startY,
                endX;
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
                }else{
                    flage=false;
                }
            };
            function touchEnd(event){
                if(flage){
                    if(endX < 0 && Math.abs(endX) >30){
                       //alert("向左");
                        moveLeft("right");
                        endX=0;
                    }else if(endX >0 && Math.abs(endX) >30){
                        moveLeft("left");
                        endX=0;
                    }
                }else{
                    flage=false;
                }
            };
            var j=$("#"+parameter).width()/$("#"+parameter).find("li").eq(0).outerWidth();
                 m=0;
            function moveLeft(dir){
               var liCountW= 0,
                   $obj=$("#"+parameter).find("li"),
                   liw=$obj.eq(0).outerWidth(),
                   ulLeft=parseInt($("#"+parameter).find("ul").css("left"));
                   liConut=$("#"+parameter).find("li").length;

                if(dir=="right"){
                    if(j<=liConut){
                        //alert("li总宽"+liCountW+"内容："+(Math.abs(ulLeft)+objw));
                        m++;
                        j++;
                        $("#"+parameter).find("ul").animate({"left":-(m*liw)},200);
                    }
                }else if(dir=="left"){
                    if(m>0){
                        m--;
                        j--;
                        $("#"+parameter).find("ul").animate({"left":-(m*liw)},200);

                    }
                }

            };
            nav.addEventListener("touchstart",touchstart);
            nav.addEventListener("touchmove",touchMove);
            nav.addEventListener("touchend",touchEnd);
        }
    };
    if($("#nav").length){
        touchnav.move("nav");
    }
    //导航移动end
    var touchSpecial={
        move:function(parameter){
            var special=document.getElementById(parameter),
                flage=false,
                startX,
                startY,
                endX,
                 winWidth=$(window).width();
            $("#"+parameter).find(".special-li").css({"width":parseInt(winWidth *0.8)});
            var totalPage= $("#"+parameter).find(".special-li").length,//当前条数
                current= 2,
                pageSize=2;
            var first=$("#"+parameter).find(".special-li:lt(2)").clone();
            var lastNumber=totalPage-3;
            var last=$("#"+parameter).find(".special-li:gt("+lastNumber+")").clone();
            //debugger;
            $("#"+parameter).find("#special-ul").prepend(last).append(first);
            $("#"+parameter).find(".special-li").eq(pageSize).addClass("active");
            var liwidth=$("#"+parameter).find(".special-li").eq(pageSize).outerWidth();
            var leftval=(pageSize*liwidth)-parseInt(((winWidth- liwidth)/ 2));
            //debugger;

            $(".banner-animate").css({left:-leftval});
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
                }else{
                    flage=false;
                }
            };
            function touchEnd(event){
                if(flage){
                    if(endX < 0 && Math.abs(endX) >50){
                        moveObj("right");
                        endX=0;
                    }else if(endX >0 && Math.abs(endX) >50){
                        moveObj("left");
                        endX=0;
                    }
                }else{
                    flage=false;
                }
            };
            function moveObj(dir){
                if(dir=="right"){
                    if(!$(".banner-animate").is(":animated")){
                        current++;
                        $("#"+parameter).find(".special-li").removeClass("active").eq(current).addClass("active");
                        $(".banner-animate").animate({left:-((current*liwidth)-parseInt(((winWidth- liwidth)/ 2)))},function(){
                            if(current>totalPage){
                                current=1;
                                $("#"+parameter).find(".special-li").removeClass("active").eq(current).addClass("active");
                                $(".banner-animate").css({left:-((current*liwidth)-parseInt(((winWidth- liwidth)/ 2)))});
                            }
                        });
                    }

                }else if(dir=="left") {
                    if (!$(".banner-animate").is(":animated")) {
                        current--;
                        $("#" + parameter).find(".special-li").removeClass("active").eq(current).addClass("active");
                        $(".banner-animate").animate({left: -((current * liwidth) - parseInt(((winWidth - liwidth) / 2)))}, function () {
                            if (current < 2) {
                                current = totalPage + 1;
                                $("#" + parameter).find(".special-li").removeClass("active").eq(current).addClass("active");
                                $(".banner-animate").css({left: -((current * liwidth) - parseInt(((winWidth - liwidth) / 2)))});
                            }
                        });
                    }
                    ;
                }
            };
            special.addEventListener("touchstart",touchstart);
            special.addEventListener("touchmove",touchMove);
            special.addEventListener("touchend",touchEnd);

        }
    }
    if($("#special").length){
        touchSpecial.move("special");
    }

    //广告区域移动 start
    var touchAd={
        move:function(parameter){
            var ad=document.getElementById(parameter),
                flage=false,
                startX,
                startY,
                endX,
                objLeft,
                moveX,
                winWidth=$(window).width(),
                contentWidth= (($("#"+parameter).find(".ad-list").length-2)*(parseInt(winWidth *0.4)))-((parseInt(winWidth *0.4))/2)+10;

                $("#"+parameter).find(".ad-list").css({"width":parseInt(winWidth *0.4)});



            function touchstart(event){
                if(!$("#"+parameter).is("animated")){
                    flage=true;
                    var touchObj=event.touches[0];
                    startX=touchObj.pageX;
                    startY=touchObj.pageY;
                    objLeft=$("#"+parameter).css("left");
                    if(objLeft=="auto"){
                        objLeft=0;
                    }else{
                        objLeft=Math.abs(parseInt($("#"+parameter).css("left")))
                    }

                }else{
                    flage=false;
                }
            };
            //移动
            function touchMove(event){
                if(flage && !$("#"+parameter).is("animated") && Math.abs(event.touches[0].pageX-startX) > Math.abs(event.touches[0].pageY-startY)){
                    event.preventDefault();
                    var touchObj=event.touches[0];
                    endX=touchObj.pageX-startX;
                    moveX=Math.abs(endX);
                    if(endX<0){
                        $("#"+parameter).css({"left":-(objLeft+moveX)});
                    }else if(endX>0){
                        $("#"+parameter).css({"left":-(objLeft-moveX)});
                    }
                }else{
                    flage=false;
                }
            };

            function touchEnd(event){

                if(flage && !$("#"+parameter).is("animated")){

                    if(endX < 0){
                        $(".slide-menuNav div.left-go-con").css("display","block")
                        if(contentWidth<(objLeft+moveX)){
                            console.log(3333)
                            $("#"+parameter).animate({"left":-(contentWidth)},500);

                        }else{

                            $("#"+parameter).animate({"left":-(objLeft+moveX)},500);

                        }

                    }else if(endX >0){

                        if((objLeft-moveX)<0){
                            $("#"+parameter).animate({"left":0},500);

                        }else{

                            $("#"+parameter).animate({"left":-(objLeft-moveX)},500);
                        }


                    }
                }else{
                    flage=false;
                }
            };
            ad.addEventListener("touchstart",touchstart);
            ad.addEventListener("touchmove",touchMove);
            ad.addEventListener("touchend",touchEnd);
        }

    }
    //调用
    if($("#box-list-1").length){
        touchAd.move("box-list-1");
    }
    if($("#box-list-2").length){
        touchAd.move("box-list-2");
    }
    if($("#box-list-3").length){
        touchAd.move("box-list-3");
    }
    if($("#box-list-4").length){
        touchAd.move("box-list-4");
    }
    if($("#box-list-5").length){
        touchAd.move("box-list-5");
    }
    if($("#box-list-6").length){
        touchAd.move("box-list-6");
    }
    if($("#box-list-7").length){
        touchAd.move("box-list-7");
    }
    if($("#box-list-8").length){
        touchAd.move("box-list-8");
    }




    //广告区域移动 end

});

