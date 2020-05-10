
$(function () {
//返回顶部
    scrollTopRun = function () {
        var scrollTopBtn = $("#scrollTop");
        var scrollHeight = $(document).scrollTop();
        var screenWidth = $(window).width();
        if (screenWidth <= 200) {
            scrollTopBtn.hide();
        } else {
            if (scrollHeight > 1000) {
                scrollTopBtn.show();
                scrollTopBtn.unbind();
                scrollTopBtn.bind("click", function () {
                    $('body,html').animate({scrollTop: 0}, 300);
                });
            } else {
                scrollTopBtn.hide();
            }
        }
        setTimeout("scrollTopRun()", 500);
    };
//0.5秒检测一次，是否需要显示返回顶部按钮
    scrollTopRun();
});
    
$(function () {
    /**
     * 替换所有匹配exp的字符串为指定字符串
     * @param exp 被替换部分的正则
     * @param newStr 替换成的字符串
     */
    String.prototype.replaceAll = function (exp, newStr) {
        return this.replace(new RegExp(exp, "gm"), newStr);
    };

    /**
     * 原型：字符串格式化
     * @param args 格式化参数值
     */
    String.prototype.format = function (args) {
        var result = this;
        if (arguments.length < 1) {
            return result;
        }

        var data = arguments; // 如果模板参数是数组
        if (arguments.length == 1 && typeof (args) == "object") {
            // 如果模板参数是对象
            data = args;
        }
        for (var key in data) {
            var value = data[key];
            if (undefined != value) {
                result = result.replaceAll("\\{" + key + "\\}", value);
            }
        }
        return result;
    };
});
    
//延迟加载图片
$(function() {
    $("img.lazy").lazyload({effect: "fadeIn"});
});
    
//记录当前用户登陆的一些信息
function CurrentUser(){

    var current_user = {};
    var self=this;

    this.set = function(param,value){
        current_user[param] = value;
    };
    this.get = function(param){
        return current_user[param];
    };
    this.is_login = function(){
        return current_user['is_login']?true:false;
    };
}
    
function Urls() {
    var urls = {};
    this.set = function (param, value) {
        urls[param] = value;
    };
    this.get = function (param) {
        return urls[param];
    };
}

function AjaxUrls() {

    var ajax_urls = {};
    this.set = function (param, value) {
        //在url末尾添加时间戳，ajax接口更新的时候，这样就不会有缓存
        var timestamp = new Date().getTime();
        if(value.indexOf('?')>=0){
            value+="&_="+timestamp;
        }
        else{
            value+="?_="+timestamp;
        }
        ajax_urls[param] = value;
    };
    this.get = function (param) {
        return ajax_urls[param];
    };

}


function Config(){
    //记录一些URL
    this.urls = new Urls();
    this.ajax_urls = new AjaxUrls();
}

$(window).scroll(function() {
    if ($(window).scrollTop() > 30) {
        $("#top-header").addClass("fixedNav hui-fadeinT");
    } else {
        $("#top-header").removeClass("fixedNav hui-fadeinT");
    }
});

if ($('#kw').length > 0) {
    //关键词搜索
    $(document).on("click", '#js-eb-search-btn', function() {
        if ($.trim($('#kw').val()) != "") {
            $('#filterForm').submit();
        }
        return false;
    });
    
    //按回车键搜索的事件
    $(document).on('keydown', '#kw', function(event) {
        if (event.keyCode == 13 && $.trim($('#kw').val()) != "") {
            $('#js-eb-search-btn').click();
        }
    });
    
    //切换搜索
    $(document).on('click','.search-tabs li',function(){
        var s = $(this).attr('data-s');
        var a=$(this).clone();
        if (s == 1) {
            $(this).parent().parent().find('#mod').val('index');
        }else if (s == 2) {
            $(this).parent().parent().find('#mod').val('queqiao');
        }else if (s == 3) {
            $(this).parent().parent().find('#mod').val('promo');
        }
        $('#kw').attr('placeholder', $(this).attr('data-p'));
        $(a).addClass('current');
        $('.search-tabs li').removeClass('current');
        $(this).remove();
        $(".search-tabs").prepend(a);
    });
    $('.search-tabs').hover(function() {
        $(this).find('li').not('.current').show();
    }, function() {
        $(this).find('li').not('.current').hide();
    });

    //删除搜索框关键词的事件
    $('#del').bind("click", function() {
        $('#kw').val('').focus();
        $('#filterForm').submit();
    });
    
    //搜索下拉
    /*
    var cache = {};
    $("#kw").autocomplete({
        minLength: 1,
        appendTo: "#J_searchbox",
        position: {
            my: "left top+2",
            at: "left-3 bottom+1"
        },
        open: function() {
            $('.ui-autocomplete').width(431);
        },
        delay: 0,
        source: function(request, response) {
            var term = request.term;
            $.ajax({
                url : "http://suggest.taobao.com/sug",
                dataType : "jsonp",
                data : {
                    q : term,
                    code : "utf-8"
                },
                success : function(data) {
                    cache[term] = data.result;
                    response(data.result);
                }
            });
        },
        select: function(event, ui) {
            $("#kw").val(ui.item[0]);
            $('#js-eb-search-btn').click();
            return false;
        }
    }).data("ui-autocomplete")._renderItem = function(ul, item) {
        return $("<li>").append(item[0]).appendTo(ul);
    };
    setInterval(function() {
        if ($.trim($('#kw').val()) != "") {
            $('#del').fadeIn();
        } else {
            $('#del').fadeOut();
        }
    },
    100);
    */
}
    
(function($) {
    var base = {
        init: function() {
            var _this = this;
        },
        pid_list: function() {
            $.getJSON(URLPrefix.api_url+g_config.ajax_urls.get('user_ajax'), {
                entity:'pid',
                times:URLPrefix.times,
                url_sign:URLPrefix.url_sign,
                member_token:URLPrefix.token,
            }, function(data){
                $("#promotion-box>.chooses").html('');
                var html="";
                var id = '';
                var pid = '';
                if(data.items){
                    $.each(data.items, function(i,item){
                        id = (item.user_pid_id!=null?item.user_pid_id:'');
                        pid = (item.pid!=null?item.pid:'');
                        html = html+'<div promotion-media-id="'+(item.user_pid_id!=null?item.user_pid_id:'')+'" pid="'+(item.pid!=null?item.pid:'')+'" class="promotion-media-choose">'+(item.pid_name!=null?item.pid_name:'')+'</div>';
                    });
                    html=html+"<div style='clear:both'></div>";
                }		
                $("#promotion-box>.chooses").html(html);
                if(html!=''){					
                    $("#promotion-box").show();
                    HPT.pid_set(id,pid,'');
                }
            })
        },
        pid_set:function(id,pid,qz){
            $.getJSON(URLPrefix.api_url+g_config.ajax_urls.get('user_ajax'), {
                entity:'pid_default',
                'qz':qz,
                'id':id,
                'pid':pid,
                times:URLPrefix.times,
                url_sign:URLPrefix.url_sign,
                member_token:URLPrefix.token,
            }, function(data){
                var pid_id = data.items.id;
                var pid_pid = data.items.pid;
                if(pid_id!== undefined&&pid_id!=''&&pid_pid!== undefined&&pid_pid!=''){
                    var $item = $("div[promotion-media-id="+pid_id+"]",$("#promotion-box"));
                    if($item&&$item.length > 0){						
                        $('.promotion-media-choose').removeClass('active');
                        $item.addClass("active");
                        $(".pid-text").attr("pid",pid_pid).text($item.text());
                        current_user.set('current_pid',pid_pid);
                    }
                }
            })
        },
        qunfa: function(num_iid) {
            $.post(URLPrefix.api_url+'/api/user/tools/zhushou/qunfa', {
                num_iid:num_iid,
                times:URLPrefix.times,
                url_sign:URLPrefix.url_sign,
                member_token:URLPrefix.token,
            }, function(data){
                if(data.info.status == 0){
                    layer.msg(data.info.status_err, {icon: 1,time: 1000},function(){});
                }else{
                    layer.msg(data.info.status_err, {icon: 2,time: 1000},function(){
                        // window.location.href = '/user/affiliate';
                    });
                }
            });
        },
        agent_list: function() {
            $.getJSON(URLPrefix.api_url+g_config.ajax_urls.get('user_ajax'), {
                entity:'agent',
                times:URLPrefix.times,
                url_sign:URLPrefix.url_sign,
                member_token:URLPrefix.token,
            }, function(data){
                $("#promotion-box>.chooses").html('');
                var html="";
                if(data!== undefined && data.result!==undefined){
                    data = data.info; 
                }
                var aid = '';
                var uid = '';
                if(data.items){
                    $.each(data.items, function(i,item){
                        aid = (item.user_cms_user_item_id!=null?item.user_cms_user_item_id:'');
                        uid = (item.user_id!=null?item.user_id:'');
                        html = html+'<div aid="'+(item.user_cms_user_item_id!=null?item.user_cms_user_item_id:'')+'" uid="'+(item.user_id!=null?item.user_id:'')+'" pid="'+(item.app_id!=null?item.app_id:'')+'" class="promotion-media-choose">'+(item.agent.user_name!=null?item.agent.user_name:'')+'</div>';
                    });
                    html=html+"<div style='clear:both'></div>";
                }		
                $("#promotion-box>.chooses").html(html);
                if(html!=''){					
                    $("#promotion-box").show();
                    HPT.agent_set(aid,uid,'');
                }
                
            })
        },
        agent_set:function(aid,uid,qz){
            $.getJSON(URLPrefix.api_url+g_config.ajax_urls.get('user_ajax'), {
                entity:'agent_default',
                'qz':qz,
                'aid':aid,
                'uid':uid,
                times:URLPrefix.times,
                url_sign:URLPrefix.url_sign,
                member_token:URLPrefix.token,
            }, function(data){
                if(data!== undefined && data.result!==undefined){
                    data = data.info; 
                }
                var agent_aid = data.items.aid;
                var agent_uid = data.items.uid;
                if(agent_aid!== undefined&&agent_aid!=''&&agent_uid!== undefined&&agent_uid!=''){
                    var $item = $("div[aid="+agent_aid+"]",$("#promotion-box"));
                    $('.promotion-media-choose').removeClass('active');
                    $item.addClass("active");
                    $(".pid-text").attr("aid",agent_aid).text($item.text());
                    current_user.set('current_agent_aid',agent_aid);
                }
            })
        },
        qunfa_product: function(id) {
            $.getJSON(URLPrefix.api_url+g_config.ajax_urls.get('user_info')
                    , {
                        action:'user',
                        mod:'qunfa_product',
                        id:id,
                        times:URLPrefix.times,
                        url_sign:URLPrefix.url_sign,
                        member_token:URLPrefix.token,
                    }, function(data){
                if(data.info.status == 1){
                    layer.msg(data.info.status_err, {icon: 1,time: 1000},function(){});
                }else{
                    layer.msg(data.info.status_err, {icon: 2,time: 1000},function(){
//						window.location.href = URLPrefix.api_url+'/user.php?action=affiliate';
                    });
                }
            });
        },
    }
    window.HPT = base;
    window.HPT.init();
})(jQuery);


$(function() {
    $(".copytext-btn",$(".goods-list")).on('click',function(o) {
        $this = $(this);
        // console.log($this.closest(".goods").html());
        var content = $this.closest(".goods").find(".media-text-area").html();
        const code = content.replace(/&lt;/g,'<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        const clipboardBtn = new ClipboardJS('.copytext-btn', {
            // text () {
            //     return code
            // }
            target: function(trigger) {
                return $this.closest(".goods").find(".media-text-area")[0];
            }
        });

        clipboardBtn.on('success', (e) => {
            e.clearSelection();
            clipboardBtn.destroy();
            // this.copied = true;
            layer.msg('复制成功', {time: 2000});
            // setTimeout(() => {
            //     this.copied = false;
            // }, 2000);
        });
        clipboardBtn.on('error', function(e) {
            console.log(e);
        });
    })

    //hover 显示复制文案
    $(document).on('mouseenter', '.copytext-btn', function(event) {
        var id = $(this).data('goods-id'),
            $box = $(this).closest('.goods').find('.media-list-box'),
            $area = $box.children('.media-text-area'),
            html = $.trim($area.html());
        if(($(window).width() - $(this).offset().left - 120) < 340) {
            $box.css({'left': -186});
            $box.children('b').css({
                left: 304,
                borderLeftColor: '#212121',
                borderLeftWidth: 9,
                borderRightColor: 'transparent',
                borderRightWidth: 5
            });
        }

        !!html && $box.show();
        if (!html) {
            $.post(URLPrefix.api_url+'/api/common/goods/viewComment', {
                num_iid:id,
                times:URLPrefix.times,
                url_sign:URLPrefix.url_sign,
                member_token:URLPrefix.token,
            }, function(res){
                if(res.data.content){
                    $area.html(res.data.content);
                    $box.show();
                }
            })
        }
    });
    $(document).on('mouseleave', '.copytext-btn', function() {
        $(this).closest('.goods').find('.media-list-box').hide();
    });

    $(document).on('mouseenter', '.goods', function() {
        $(this).find('.media-list-box').hide();
    });

    $(document).on('click', '.go-old', function() {
        window.location.href="http://old.haopintui.net";
    });
});

vmUserMenu = new Vue({
    el: "#vmUserMenu",
    data:{
        queryInit:false,
        user:{
            user_name:''
        }
    },
    mounted: function() {
        this.init()
    },
    methods:{
        init(){
            this.query()
        },
        query(){
            var $this = this;
            ajaxPost("/api/user/home/user", {}, function(res) {
                if(res.data && res.data.user && res.data.user.user_id){
                    $this.user = res.data.user;
                }
                $this.queryInit = true;
            })
        },
        logout(){
            Vue.ls.remove('member_token')
            window.location.href="/";
        }
    }
});