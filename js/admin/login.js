
//商家登录
$(function() {

    $("#loginseller").click(function() {
        $(this).html("确认中...");
        var sellname = $('input[name=sellername]'),sellpwd = $('input[name=sellerpassword]');
        var username = $.trim(sellname.attr("value")),password = $.trim(sellpwd.attr("value")),remember = $('input[name=sellerremember]').attr('checked') == 'checked' ? 1 : 0;
        var itart = true;

        removetip(sellname)
        removetip(sellpwd)
        if(username == "") {
            addtip2(sellname,"wrong","用户名不得为空");
            $(this).html("登录");
            itart = false;

        }
        if(password == "") {
            addtip2(sellpwd,"wrong","密码不得为空");
            $(this).html("登录");
            itart = false;
        }
        if(password == ""&& username == "") {
            addtip2(sellpwd,"wrong","请输入用户名和密码");
            $(this).html("登录");
            itart = false;
        }
        data = 'username='+username+'&password='+password;

        if(itart){
            $.ajax({
                url:'/admin/ajax/login.php',
                data:data,
                type:"POST",
                dataType:'json',
                success:function(ret) {
                    $("#loginseller").html("登录");

                    if(ret.state == 'ok') {

                        location.href = ret['referurl']? ret['referurl']: '/admin/index/index';
                    } else if(ret.state == 'wrong_pwd') {
                        addtip2(sellpwd,"wrong","密码与账号不匹配");
                    } else if(ret.state == 'wrong_account'){
                        addtip2(sellname,"wrong","该号码不存在或者不是卖家账户");
                    }else if(ret.state == 'less_passwd'){
                        addtip2(sellname,"wrong",ret.msg);
                    }else if(ret.state == 'no_account'){
                        addtip2(sellname,"wrong","账号不得为空");
                    } else {
                    	 addtip2(sellpwd,"wrong","密码与账号不匹配");
                    }
                }
            })
        }
    })

})

//添加错误提示1
function addtip1(o,cur,str){
    $(o).parent().find("span.tip").remove()
   var ele = '<i class="'+cur+'"></i>'+str;
  $(".login_tipinfod1").css("display","block")
  $(".tip_info_d1").html(ele);
   $(o).addClass(cur);
    if(cur=="suc"){
        $(o).removeClass("wrong");
    }
}

//商家添加错误提示2
function addtip2(o,cur,str){
    $(o).parent().find("span.tip").remove()
    var ele = '<i class="'+cur+'"></i>'+str;
    $(".login_tipinfod2").css("display","block")
    $(".tip_info_d2").html(ele)
    $(o).addClass(cur);
    if(cur=="suc"){
        $(o).removeClass("wrong");
    }
}
function removetip(o){
    $(".login_tipinfod").css("display","none");

    $(o).removeClass("wrong");
}

function timebtn(){
    var time,od = $(".timebtn"),num=60,odd = $(".yzmbtn"),str;
    od.css("display","block");
    odd.css("display","none");
     time= setInterval(function(){
         if(num==0){
             od.css("display","none");
             odd.css("display","block");
         }else{
             num--;
             str = "重新发送（"+num+")";
             od.html(str)
         }
     },1000)
}

$(".logi_warp img").animate({"opacity":"1"},2000)





