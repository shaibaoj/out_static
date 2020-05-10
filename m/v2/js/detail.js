

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

$(function() {
	 var winWidth=$(window).width();
     $("#touchBox").find(".touchItem").css({"width":parseInt(winWidth *1)});
	
});
