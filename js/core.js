var F_createEle = function(ele){
    var div = document.createElement('div');
    div.id = "likeico";
    div.innerHTML = "<span class='heart_left'></span><span class='heart_right'></span>";
    ele.append(div);
}
var Mylike_add = function(event) {
    if(!$.meguo.dialog.islogin()) return !1;
    var obj = $(this);
    var parent = obj;
    var id = parent.attr('lkid');
    var s = parent.attr('lks');
    var price = parent.attr('lprice');
    var c_price = parent.attr('lcprice');
    var endtime = parent.attr('lendtime');
    var discount = parent.attr('ldiscount');
    var title = parent.attr('ltitle');
    var pic_url = parent.attr('limgurl');
    var coupon_rate = parent.attr('lcoupon_rate');
    var module = parent.attr('lmodule');
    F_createEle(obj);
    setTimeout(function(){$("#likeico").remove()}, 600);
    var url =  MEGUOER.root +"/ajax/like?callback=?";
    $.getJSON(url, {pid:id,status:s,check:0,price:price,module:module,c_price:c_price,endtime:endtime,discount:discount,title:title,pic_url:pic_url,coupon_rate:coupon_rate},function(data){
            if(data.status == 1001){
                parent.attr('lks',0);
                obj.find('i.like-ico').addClass('l-active');
                obj.closest('li').find('.like-ceng').show();
                $("#likeico").removeClass('unliked').addClass('like-big').addClass('demo1');
                parent.css('display','block');
            } else if(data.status == 1002){
                parent.attr('lks',1);
                obj.find('i.like-ico').removeClass('l-active');
                $("#likeico").removeClass('l-active').addClass('unliked').removeClass('demo1');
                obj.closest('li').find('.like-ceng').hide();
                parent.css('display','');
            }else if(data.status == 1003){
                $.meguo.tip({content:data.msg, icon:'error'});
            }else if(data.status == 1004){
                $.meguo.tip({content:data.msg,icon:'error'});
            }else if(data.status == 1005){
                $.meguo.tip({content:data.msg,icon:'error'});
            }
        }
    ).error(function() {$.meguo.tip({content:"请求超时",icon:'error'});});
}
var Pause_click = function(){
    $("a.my-like").on('click', _.throttle( Mylike_add, 300 ) );
    $(".list-good").on('mouseleave',function(){$('.like-ceng',$(this)).hide();});
    if(MEGUOER.uid != "") {
        var url =  MEGUOER.root +"/ajax/like?callback=?";
        $.getJSON(url, {check:1}, function(data){
                if(data.status == 1000){
                    var s = data.data;
                    if(s!=null){
                        $('.my-like').each(function(i){
                            var sid = $(this).attr('lkid');
                            for(var i=0;i<s.length;i++){
                                if(s[i] == sid){
                                    $(this).css('display','block');
                                    $(this).attr('lks',0);
                                    $('i.like-ico',$(this)).addClass('l-active');
                                }
                            }
                        });
                    }

                }
            }
        ).error(function() {});
    }
}

/*收藏*/
function AddFavorite(b) {
    CloseNLRAF(true);
    var c = null;
    if (b == "childreTop") {
        var c = SITEURL;
    } else {
        if (b == "welcomefavorite") {
            var c = SITEURL+"?from=fav"
        } else {
            var c = location.href + (b == true ? "?from=topfavorite": "")
        }
    }
    if ($.browser.msie) {
        try {
            window.external.addFavorite(c, ""+WEBNICK+"-省钱，从"+WEBNICK+"开始。")
        } catch(a) {
            alert("请按键盘 CTRL键 + D 把"+WEBNICK+"放入收藏夹，折扣信息一手掌握！")
        }
    } else {
        if ($.browser.mozilla) {
            try {
                window.sidebar.addPanel(""+WEBNICK+"-网购，从"+WEBNICK+"开始。", c, "")
            } catch(a) {
                alert("请按键盘 CTRL键 + D 把"+WEBNICK+"放入收藏夹，折扣信息一手掌握！")
            }
        } else {
            alert("请按键盘 CTRL键 + D 把"+WEBNICK+"放入收藏夹，折扣信息一手掌握！")
        }
    }
    return false
}

function CloseNLRAF(a) {
    if (a) {
        $.cookie("NLRAF", "true", {
            path: "/",
            expires: 30
        })
    } else {
        $.cookie("NLRAF", "true", {
            path: "/"
        })
    }
    $("#afp").slideUp()
}


$(function(){
  $(window).scroll(function(){
    var top = $(window).scrollTop();
    if(top >= 500){
        $('#left-fix').css("display","block");
        $('#right-fix').css({"margin-top":"-150px","top":"30%"});
        $(".affix").css("display","block");
    }else{
        $('#left-fix').css("display","none");
        $('#right-fix').css({"margin-top":"0","top":"40%"});
        $(".affix").css("display","none");
    }

  });
   

  $('#sign').hover(function(){
    $(this).find('p').show();
    $(this).find('span').hide();
  },function(){
     $(this).find('p').hide();
     $(this).find('span').show();
  })
  $('.shoping,.favorite_trigger').hover(function(){
    $(this).find('p').show();
    $(this).find('.s_img').show();
    $(this).find('span').hide();
  },function(){
     $(this).find('p').hide();
     $(this).find('.s_img').hide();
     $(this).find('span').show();
  })
  $('#goTops').hover(function(){
    $(this).find('p').show();
    $(this).find('span').hide();
  },function(){
     $(this).find('p').hide();
     $(this).find('span').show();
  })
})

$(function(){
    $('.tab_p span').hover(function(){
        $('.tab_p span').removeClass('select');
        $(this).addClass('select');
        $('.tab_qimg img').hide();
        $('.tab_qimg img').eq($(this).index()).show();
    })
})

function pageScroll() { 
  $('body,html').animate({scrollTop:0},500);
} 

$(function(){
//友情链接滚动
	var lh = 0;
	var ih = $('.links_list').height();
	var link_scroll = function(){
		setTimeout(function(){
			lh+=20;
			if(lh + 5>=ih){
				lh=0;
			}
			$('.links_list').animate({top:-lh+'px'}, 500);
			link_scroll();
		}, 5000);
	};
	link_scroll();
})

/**
 +----------------------------------------------------------
 * 下拉菜单
 +----------------------------------------------------------
 */
$(function(){
    /* 主导航 */
    $("#cateAction").hover(function(){
        $(this).addClass("hover");
        $('.cateBox',this).css('display', 'block');
    }, function(){
        $(this).removeClass("hover");
        $('.cateBox',this).css('display', 'none');
    });
    /* 顶部导航 */
    $("ul.topNav li.parent").hover(function(){
        $(this).addClass("hover");
        $('dl:first',this).css('display', 'block');
    }, function(){
        $(this).removeClass("hover");
        $('dl:first',this).css('display', 'none');
    });
    /* 分类商品 */
    $(".catGoods dt").hover(function(){
        $(this).addClass("hover");
    }, function(){
        $(this).removeClass("hover");
    });
    /* 今日特卖 */
    $(".goodList dl").hover(function(){
        $(this).addClass("hover");
        var lks = $(this).find('.my-like').attr('lks');
        if(lks==1){
            $(this).find('.my-like').show();
        }
    }, function(){
        $(this).removeClass("hover");
        var lks = $(this).find('.my-like').attr('lks');
        if(lks==1){
            $(this).find('.my-like').hide();
        }
    });
    /* 今日特卖 */
    $(".jList dl").hover(function(){
        $(this).addClass("hover");
    }, function(){
        $(this).removeClass("hover");
    });
});

/**
 +----------------------------------------------------------
 * 刷新验证码
 +----------------------------------------------------------
 */
function refreshimage()
{
  var cap =document.getElementById("captcha");
  cap.src=cap.src+'?';
}

/**
 +----------------------------------------------------------
 * 搜索框的鼠标交互事件
 +----------------------------------------------------------
 */
function formClick(name, text) {
    var obj = name;
    if (typeof(name) == "string") obj = document.getElementById(id);
    if (obj.value == text) {
        obj.value = "";
    }
    obj.onblur = function() {
        if (obj.value == "") {
            obj.value = text;
        }
    }
}

/**
 +----------------------------------------------------------
 * 无组件刷新局部内容
 +----------------------------------------------------------
 */
function dou_callback(page, name, value, target)
{
 $.ajax({
  type: "GET",
  url: page,
  data: name + "=" + value,
  dataType: "html",
  success: function(html){$("#" + target).html(html);}
 });
}

/**
 +----------------------------------------------------------
 * 收藏本站
 +----------------------------------------------------------
 */
function AddFavorite(url, title) {
    try {
        window.external.addFavorite(url, title)
    } catch(e) {
        try {
            window.sidebar.addPanel(title, url, "")
        } catch(e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加")
        }
    }
}

function setHome(obj,url){
        try{
            obj.style.behavior = 'url(#default#homepage)';
            obj.setHomePage(url);
        }catch(e){
            if(window.netscape){
                try{
                    netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
                }catch(e){
                    alert('抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车\n\n然后将[signed.applets.codebase_principal_support]的值设置为true，双击即可。');
                }
                var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                prefs.setCharPref('browser.startup.homepage',url);
            }else{
                alert('抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【' + url + '】设置为首页。');
            }
        }
    }

/**
 +----------------------------------------------------------
 * 在线客服
 +----------------------------------------------------------
 */
$(document).ready(function(e) {
    // 右侧滚动
    $("#onlineService").css("right", "0px");
    
    // 弹出窗口
    var button_toggle = true;
    $(".onlineIcon").live("mouseover",
    function() {
        button_toggle = false;
        $("#pop").show();
    }).live("mouseout",
    function() {
        button_toggle = true;
        hideRightTip()
    });
    $("#pop").live("mouseover",
    function() {
        button_toggle = false;
        $(this).show()
    }).live("mouseout",
    function() {
        button_toggle = true;
        hideRightTip()
    });
    function hideRightTip() {
        setTimeout(function() {
            if (button_toggle) $("#pop").hide()
        },
        500)
    }
    
    // 返回顶部
    $(".goTop").live("click",
    function() {
        var _this = $(this);
        $('html,body').animate({
            scrollTop: 0
        },
        500,
        function() {
            _this.hide()
        })
    });
    $(window).scroll(function() {
        var htmlTop = $(document).scrollTop();
        if (htmlTop > 0) {
            $(".goTop").show()
        } else {
            $(".goTop").hide()
        }
    })
});