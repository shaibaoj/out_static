/*!
 *  Echo v1.4.0
 *  Lazy-loading with data-* attributes, offsets and throttle options
 *  Project: https://github.com/toddmotto/echo
 *  by Todd Motto: http://toddmotto.com
 *  Copyright. MIT licensed.
 */
window.Echo = (function(window, document, undefined) {

	'use strict';
	var store = [],
	offset,
	throttle,
	poll;

	var _inView = function(el) {
		var coords = el.getBoundingClientRect();
		return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset));
	};

	var _pollImages = function() {
		for (var i = store.length; i--;) {
			var self = store[i];
			if (_inView(self)) {
				self.src = self.getAttribute('data-echo');
				store.splice(i, 1);
			}
		}
	};

	var _throttle = function() {
		clearTimeout(poll);
		poll = setTimeout(_pollImages, throttle);
	};

	var init = function(obj) {
		var nodes = document.querySelectorAll('[data-echo]');
		var opts = obj || {};
		offset = opts.offset || 0;
		throttle = opts.throttle || 250;

		for (var i = 0; i < nodes.length; i++) {
			store.push(nodes[i]);
		}

		_throttle();

		if (document.addEventListener) {
			window.addEventListener('scroll', _throttle, false);
		} else {
			window.attachEvent('onscroll', _throttle);
		}
	};

	return {
		init: init,
		render: _throttle
	};

})(window, document);
/**
 * pagination分页插件
 * @version 1.3.1
 * @author mss
 * @url http://maxiaoxiang.com/jQuery-plugins/plugins/pagination.html
 *
 * @调用方法
 * $(selector).pagination();
 */
;(function (factory) {
    if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        // AMD或CMD
        define([ "jquery" ],factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        //Browser globals
        factory(jQuery);
    }
}(function ($) {

	//配置参数
	var defaults = {
		totalData: 0,			//数据总条数
		showData: 0,			//每页显示的条数
		pageCount: 9,			//总页数,默认为9
		current: 1,				//当前第几页
		prevCls: 'prev',		//上一页class
		nextCls: 'next',		//下一页class
		prevContent: '<',		//上一页内容
		nextContent: '>',		//下一页内容
		activeCls: 'active',	//当前页选中状态
		coping: false,			//首页和尾页
		isHide: false,			//当前页数为0页或者1页时不显示分页
		homePage: '',			//首页节点内容
		endPage: '',			//尾页节点内容
		keepShowPN: false,		//是否一直显示上一页下一页
		count: 3,				//当前页前后分页个数
		jump: false,			//跳转到指定页数
		jumpIptCls: 'jump-ipt',	//文本框内容
		jumpBtnCls: 'jump-btn',	//跳转按钮
		jumpBtn: '跳转',		//跳转按钮文本
		callback: function(){}	//回调
	};

	var Pagination = function(element,options){
		//全局变量
		var opts = options,//配置
			current,//当前页
			$document = $(document),
			$obj = $(element);//容器

		/**
		 * 设置总页数
		 * @param int page 页码
		 * @return opts.pageCount 总页数配置
		 */
		this.setPageCount = function(page){
			return opts.pageCount = page;
		};

		/**
		 * 获取总页数
		 * 如果配置了总条数和每页显示条数，将会自动计算总页数并略过总页数配置，反之
		 * @return int p 总页数
		 */
		this.getPageCount = function(){
			return opts.totalData || opts.showData ? Math.ceil(parseInt(opts.totalData) / opts.showData) : opts.pageCount;
		};

		/**
		 * 获取当前页
		 * @return int current 当前第几页
		 */
		this.getCurrent = function(){
			return current;
		};

		/**
		 * 填充数据
		 * @param int index 页码
		 */
		this.filling = function(index){
			var html = '';
			current = index || opts.current;//当前页码
			var pageCount = this.getPageCount();//获取的总页数
			if(opts.keepShowPN || current > 1){//上一页
				html += '<a href="javascript:;" class="'+opts.prevCls+'">'+opts.prevContent+'</a>';
			}else{
				if(opts.keepShowPN == false){
					$obj.find('.'+opts.prevCls) && $obj.find('.'+opts.prevCls).remove();
				}
			}
			if(current >= opts.count + 2 && current != 1 && pageCount != opts.count){
				var home = opts.coping && opts.homePage ? opts.homePage : '1';
				html += opts.coping ? '<a href="javascript:;" data-page="1">'+home+'</a><span>...</span>' : '';
			}
			var end = current + opts.count;
			var start = '';
			//修复到最后一页时比第一页少显示两页
			start = current === pageCount ? current - opts.count - 2 : current - opts.count;
			((start > 1 && current < opts.count) || current == 1) && end++;
			(current > pageCount - opts.count && current >= pageCount) && start++;
			for (;start <= end; start++) {
				if(start <= pageCount && start >= 1){
					if(start != current){
						html += '<a href="javascript:;" data-page="'+start+'">'+ start +'</a>';
					}else{
						html += '<span class="'+opts.activeCls+'">'+start+'</span>';
					}
				}
			}
			if(current + opts.count < pageCount && current >= 1 && pageCount > opts.count){
				var end = opts.coping && opts.endPage ? opts.endPage : pageCount;
				html += opts.coping ? '<span>...</span><a href="javascript:;" data-page="'+pageCount+'">'+end+'</a>' : '';
			}
			if(opts.keepShowPN || current < pageCount){//下一页
				html += '<a href="javascript:;" class="'+opts.nextCls+'">'+opts.nextContent+'</a>'
			}else{
				if(opts.keepShowPN == false){
					$obj.find('.'+opts.nextCls) && $obj.find('.'+opts.nextCls).remove();
				}
			}
			html += opts.jump ? '<input type="text" class="'+opts.jumpIptCls+'"><a href="javascript:;" class="'+opts.jumpBtnCls+'">'+opts.jumpBtn+'</a>' : '';
			$obj.empty().html(html);
		};

		//绑定事件
		this.eventBind = function(){
			var that = this;
			var pageCount = that.getPageCount();//总页数
			var index = 1;
			$obj.off().on('click','a',function(){
				if($(this).hasClass(opts.nextCls)){
					if($obj.find('.'+opts.activeCls).text() >= pageCount){
						$(this).addClass('disabled');
						return false;
					}else{
						index = parseInt($obj.find('.'+opts.activeCls).text()) + 1;
					}
				}else if($(this).hasClass(opts.prevCls)){
					if($obj.find('.'+opts.activeCls).text() <= 1){
						$(this).addClass('disabled');
						return false;
					}else{
						index = parseInt($obj.find('.'+opts.activeCls).text()) - 1;
					}
				}else if($(this).hasClass(opts.jumpBtnCls)){
					if($obj.find('.'+opts.jumpIptCls).val() !== ''){
						index = parseInt($obj.find('.'+opts.jumpIptCls).val());
					}else{
						return;
					}
				}else{
					index = parseInt($(this).data('page'));
				}
				that.filling(index);
				typeof opts.callback === 'function' && opts.callback(that);
			});
			//输入跳转的页码
			$obj.on('input propertychange','.'+opts.jumpIptCls,function(){
				var $this = $(this);
				var val = $this.val();
				var reg = /[^\d]/g;
	            if (reg.test(val)) {
	                $this.val(val.replace(reg, ''));
	            }
	            (parseInt(val) > pageCount) && $this.val(pageCount);
	            if(parseInt(val) === 0){//最小值为1
	            	$this.val(1);
	            }
			});
			//回车跳转指定页码
			$document.keydown(function(e){
		        if(e.keyCode == 13 && $obj.find('.'+opts.jumpIptCls).val()){
		        	var index = parseInt($obj.find('.'+opts.jumpIptCls).val());
		            that.filling(index);
					typeof opts.callback === 'function' && opts.callback(that);
		        }
		    });
		};

		//初始化
		this.init = function(){
			this.filling(opts.current);
			this.eventBind();
			if(opts.isHide && this.getPageCount() == '1' || this.getPageCount() == '0') $obj.hide();
		};
		this.init();
	};

	$.fn.pagination = function(parameter,callback){
		if(typeof parameter == 'function'){//重载
			callback = parameter;
			parameter = {};
		}else{
			parameter = parameter || {};
			callback = callback || function(){};
		}
		var options = $.extend({},defaults,parameter);
		return this.each(function(){
			var pagination = new Pagination(this, options);
			callback(pagination);
		});
	};

}));

Vue.use(VueStorage, {
    namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
});

URLPrefix.token = Vue.ls.get('member_token')

function parseParams(data) {
    try {
        var tempArr = [];
        for (var i in data) {
            var key = encodeURIComponent(i);
            var value = encodeURIComponent(data[i]);
            tempArr.push(key + '=' + value);
        }
        var urlParamsStr = tempArr.join('&');
        return urlParamsStr;
    } catch (err) {
        return '';
    }
}

function getUrlSearch(url, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url.slice(url.indexOf('?') + 1).match(reg);
    if (r != null) {
        try {
            return decodeURIComponent(r[2]);
        } catch (_e) {
            return null;
        }
    }
    return null;
}

var page = function (str, content) {
    if (!content) content = '';
    setTimeout(function () {
        window.location.href = str + '.html' + content;
    }, 50);

};
var pageAll = function (str) {
    setTimeout(function () {
        window.open(str);
    }, 50);
};

function Request(name) {
    var str = location.href;
    if (str.indexOf(name) != -1) {
        var num = str.indexOf(name);
        str = str.substring(num + name.length + 1);
        return str;
    }
}

var HTTPurl = window.location.protocol;
var isHTTPurl = HTTPurl.substring(0, HTTPurl.length - 1);
var config = {
    _url: "",
    urls: "/",
    isHTTP: function () {
        var HTTPurl = window.location.protocol;
        var isHTTP = HTTPurl.substring(0, HTTPurl.length - 1);
        return isHTTP;
    },
    getUrl: function (str) {
        var reg = new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]", "ig");
        var r = str.match(reg)
        if (r != null) return r; return null;
    },
    getVideoUrl: function (str) {  //匹配视频地址
        var reg = new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]+.mp4", "ig");
        var r = str.match(reg)
        if (r != null) return r; return null;
    },
    ImgSizeFun: function (Arr, strArr) {
        for (var i = 0; i < strArr.length; i++) {
            Arr[i] = strArr[i] + config.ImgSize;
        }
        return Arr;
    }
};

var ajaxGet = function (url, data, successfun, errorfun) {
    var temp_errorfun = function (xhr, type) {
    };
    if (errorfun) {
        temp_errorfun = errorfun;
    }
    $.ajax({
        type: 'GET',
        url: url.indexOf('http') === 0 ? url : URLPrefix.api_url + url,
        data: Object.assign(data,{
            times:URLPrefix.times,
            url_sign:URLPrefix.url_sign,
            member_token:URLPrefix.token,
        }),
        dataType: 'json',
        timeout: 30000,
        success: successfun,
        error: temp_errorfun,
        xhrFields: {
            withCredentials: true
        },
    });
};

var ajaxPost = function (url, data, successfun, errorfun) {
    var temp_errorfun = function (xhr, type) {

    };
    if (errorfun) {
        temp_errorfun = errorfun;
    }
    $.ajax({
        type: 'POST',
        url: url.indexOf('http') === 0 ? url : URLPrefix.api_url + url,
        data: Object.assign(data,{
            times:URLPrefix.times,
            url_sign:URLPrefix.url_sign,
            member_token:URLPrefix.token,
        }),
        dataType: 'json',
        timeout: 30000,
        success: successfun,
        error: temp_errorfun,
        xhrFields: {
            withCredentials: true
        },
    });
};

var ajaxGetJsonp = function (url, data, successfun, errorfun) {  //jsonp跨域请求
    var temp_errorfun = function (xhr, type) {
    };
    if (errorfun) {
        temp_errorfun = errorfun;
    }
    $.ajax({
        type: 'GET',
        url: url,
        data: data,
        dataType: 'jsonp',
        timeout: 30000,
        success: successfun,
        error: temp_errorfun,
        xhrFields: {
            withCredentials: true
        },
    });
};

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
        var code = content.replace(/&lt;/g,'<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        var clipboardBtn = new ClipboardJS('.copytext-btn', {
            // text () {
            //     return code
            // }
            target: function(trigger) {
                return $this.closest(".goods").find(".media-text-area")[0];
            }
        });

        clipboardBtn.on('success', function(e) {
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
        init:function (){
            this.query()
        },
        query:function(){
            var $this = this;
            ajaxPost("/api/user/home/user", {}, function(res) {
                if(res.data && res.data.user && res.data.user.user_id){
                    $this.user = res.data.user;
                }
                $this.queryInit = true;
            })
        },
        logout:function(){
            Vue.ls.remove('member_token')
            window.location.href="/";
        }
    }
});
var vmHTTPurl = window.location.protocol.substring(0, window.location.protocol.length - 1);
var vmHostUrl = window.location.host.split('.')[1] == 'haopintui' ? 'haopintui.net' : window.location.host.split('.')[1] + '.' + window.location.host.split('.')[2];
var vmComData = {
    vmUrl: URLPrefix.api_url,
};

var vmTestInput = {
    isPhoneNo: function (phone) {
        var pattern = '/^1[3456789]\d{9}$/';
        return pattern.test(phone);
    },
    isNumber: function (number) {
        var pattern = '/^[0-9]*$/';
        return pattern.test(number);
    },
    isQQ: function (qq) {
        var pattern = '/^[1-9][0-9]{4,14}/';
        return pattern.test(qq);
    },
    vmPageAll: function (str) {
        setTimeout(function () {
            window.open(str);
        }, 20);
    },
};
var vmUrlSearchs = null;
function vmRequest(name) {
    if (!vmUrlSearchs) {
        vmUrlSearchs = new vmUrlSearch();
    }
    return vmUrlSearchs[name];
};

function vmUrlSearch() {
    var name, value;
    var str = location.href;
    var num = str.indexOf("?");
    str = str.substr(num + 1);
    var arr = str.split("&");
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
};
var vmAjaxGet = function (site, data, successfun, errorfun) {
    var temp_errorfun = function (xhr, type) { };
    if (errorfun) {
        temp_errorfun = errorfun;
    }
    $.ajax({
        type: 'GET',
        url: vmComData.vmUrl + site,
        data: Object.assign(data,{
            times:URLPrefix.times,
            url_sign:URLPrefix.url_sign,
            member_token:URLPrefix.token,
        }),
        dataType: 'json',
        timeout: 30000,
        success: successfun,
        error: temp_errorfun,
        xhrFields: {
            withCredentials: true
        },
    });
};
var vmAjaxPost = function (site, data, successfun, errorfun) {
    var temp_errorfun = function (xhr, type) {

    };
    if (errorfun) {
        temp_errorfun = errorfun;
    }
    $.ajax({
        type: 'POST',
        url: vmComData.vmUrl + site,
        data: Object.assign(data,{
            times:URLPrefix.times,
            url_sign:URLPrefix.url_sign,
            member_token:URLPrefix.token,
        }),
        dataType: 'json',
        timeout: 30000,
        success: successfun,
        error: temp_errorfun,
        xhrFields: {
            withCredentials: true
        },
    });
};
var vmAjaxGetJsonp = function (site, data, successfun, errorfun) {
    var temp_errorfun = function (xhr, type) {
    };
    if (errorfun) {
        temp_errorfun = errorfun;
    }
    $.ajax({
        type: 'GET',
        url: vmComData.vmUrl + site,
        data: Object.assign(data,{
            times:URLPrefix.times,
            url_sign:URLPrefix.url_sign,
            member_token:URLPrefix.token,
        }),
        dataType: 'jsonp',
        timeout: 30000,
        success: successfun,
        error: temp_errorfun,
        xhrFields: {
            withCredentials: true
        },
    });
};

var vmminxShopData = {  //公共方法
    data: {
        oPublic: {
            reportImg: '',
            loadingImg: URLPrefix.static_url+"/static/platform/images/web/common/loading.png",
            loadingShow: false, //是否显示加载(加载动画)
            wholeShow: false, //数据加载完显示(全局)

            setTimeoutClear: '', //定时器(是否显示商品加载)
            setTime: 300,

            isDatanull: false, //商品数据为空的时候
            offsetTop: ''
        },
        publicList: { //商品列表数据
            productList: "", //列表数据

            pageNumber: 1, //页数
            pageInput: 1, //跳到第几页
            count: '', //总的页数

        },
        oHidePopup: {
            // hideVideo: false, //在线转链
            hideOnLineLin: false, //在线转链
            // hideJb: false, //举报
            hideEchartCheck: false, //成交量
            // hideFeedback: false //建议
        },

        oToken: {
            token: '',
            toeknTime: '',
            toeknBoolean: false
        },
        oGetTop: { //上榜
            getTopData: [], //返回上榜的数据
        },
    },
    created: function () {

    },
    mounted: function () {
    },
    filters: {
        numText: function (number) {
            if (number < 10000) return number;
            if (number >= 10000) {
                var number_2 = Math.round((number / 10000) * 100) / 100 + '万';
                return number_2;
            }
        },
        conversion: function (number) {
            if (number) {
                if (number.length <= 4) return number;
                if (number.length >= 5) {
                    var number_2 = Math.round((number / 10000) * 100) / 100 + '万';
                    return number_2;
                }
            }
        },
    },
    watch: {
        'publicList.pageInput': function (newValue) {  //监听分页的值
            var self = this;
            if (newValue > self.publicList.count) {
                self.publicList.pageInput = self.publicList.count;
            }
            if (newValue < 1 && newValue != '') {
                self.publicList.pageInput = 1;
            }
        },

    },
    methods: {
        getonFun: function (data) { //上榜
            var self = this;
            var JsonData = []; //需要传过去的
            var commodityData = {};
            var dataArr = [];
            for (i = 0, len = data.length; i < len; i++) {
                commodityData = {
                    id: data[i].id,
                    cid: data[i].fqcat
                };
                dataArr.push(commodityData);
            }
            JsonData = JSON.stringify(dataArr);
            vmAjaxPost("/indexapi/get_top_list", {
                request_json: JsonData
            }, function (data) {
                if (data.status == '200') {
                    var objData = {};
                    for (var j in data.request_array) {
                        objData[data.request_array[j].id] = data.request_array[j];
                    }
                    self.oGetTop.getTopData = objData;
                }
            }, function () {

            })
        },
        producLink: function (id) { //跳到淘宝去
            vmTestInput.vmPageAll("https://detail.tmall.com/item.htm?id=" + id);
        },
        ReportreadFile: function (event) { //举报/意见反馈上传图片
            var self = this;
            var file = event.target.files[0];
            if (file) {
                if (!/image\/\w+/.test(file.type)) {
                    layer.msg('文件必须为图片哦！', {
                        icon: 2
                    });
                    return false;
                }
                if (file.size >= 5120000) {
                    layer.msg('图片大小过大，应小于5M！', {
                        icon: 2
                    });
                    return
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    self.QiniuUpload(file, self.oToken.token);
                    self.oPublic.reportImg = this.result;
                }
            }

        },
        ajaxGetToken: function () { //获取token
            var self = this;
            if (!self.oToken.toeknBoolean) {
                vmAjaxPost("/indexapi/get_qiniu_token", {}, function (data) {
                    if (data.status == '200') {
                        self.oToken.token = data.qiniu_token;
                        self.oToken.toeknBoolean = true;
                        clearTimeout(self.oToken.toeknTime);
                        self.setIntervalFun();
                    } else {
                        clearTimeout(self.oToken.toeknTime);
                        self.oToken.toeknBoolean = false;
                        self.oToken.token = '';
                    }

                }, function () {
                    clearTimeout(self.oToken.toeknTime);
                    self.oToken.toeknBoolean = false;
                })
            }
        },
        setIntervalFun: function () {  //计算token过期时间
            var self = this;
            this.oToken.toeknTime = setInterval(function () {
                self.oToken.toeknBoolean = false;
            }, 1000 * 5 * 60);
        },
        QiniuUpload: function (f, token) { //七牛云
            var self = this;
            var Qiniu_UploadUrl = vmHTTPurl + "://up.qbox.me";
            var xhr = new XMLHttpRequest();
            xhr.open('POST', Qiniu_UploadUrl, true);
            var formData, startDate;
            formData = new FormData();
            formData.append('token', token);
            formData.append('file', f);
            var taking;
            //处理图片
            xhr.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var nowDate = new Date().getTime();
                    taking = nowDate - startDate;
                    var x = (evt.loaded) / 1024;
                    var y = taking / 1000;
                    var uploadSpeed = (x / y);
                    var formatSpeed;
                    if (uploadSpeed > 1024) {
                        formatSpeed = (uploadSpeed / 1024).toFixed(2) + "Mb\/s";
                    } else {
                        formatSpeed = uploadSpeed.toFixed(2) + "Kb\/s";
                    }

                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                }
            }, false);

            xhr.onreadystatechange = function (response) {
                if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
                    var obj = JSON.parse(xhr.responseText);
                    var urlLink = obj.hash;
                    self.oPublic.reportImg = urlLink;
                } else if (xhr.status != 200 && xhr.responseText) { }
            };
            startDate = new Date().getTime();
            xhr.send(formData);
        },
        widthFun: function (item) { //计算优惠券的百分比
            if (item.down_type != 0) {
                return 'width:' + 0 + '%';
            }
            var str = Math.round((item.couponreceive / item.couponnum) * 100);
            return 'width:' + str + '%';
        },
        pageSkipp: function (id) { //跳到内页
            vmTestInput.vmPageAll("/quan/" + id);
        },
        moveinIcon: function (name, event) { //商品图标鼠标移入
            layer.tips(name, $(event.target), {
                time: 0,
                tips: [2, '#4d77ff'],
            });
        },
        ComremoveLayerTips: function () { //商品图标鼠标移入
            var index = layer.tips();
            layer.close(index);
        },
        inCopywriting: function (event) { //显示文案
            var copy = $(event.target).attr('datatips');
            layer.tips(copy, $(event.target), {
                time: 0,
                tips: [2, '#5cadff'],
                area: '440px'
            });
        },
        copywritingBtn: function () { //复制文案
            var clipboard = new ClipboardJS('.public-copy', {
                target: function () {
                    return document.querySelector('.layui-layer-content');
                }
            });
            clipboard.on('success', function (e) {
                layer.msg('已复制', {
                    time: 1500
                });
                e.clearSelection();
                clipboard.destroy();
            });
            clipboard.on('error', function (e) {
                layer.msg('由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！', {
                    icon: 2
                });
            });
        },
        arrowTopFun: function () { //点击回到顶部
            $("body,html").stop(true, true).animate({
                "scrollTop": 0
            });
        },

        echartCheckFunBtn: function (itemid) { //成交量
            this.oHidePopup.hideEchartCheck = true;
            this.publicPopup(".js-popupEcharts");
            echartCheckFun(itemid);
        },
        echartCheckShut: function () { //成交量-关闭
            this.oHidePopup.hideEchartCheck = false;
            this.publicClose();
        },
        onLineLinBtn: function (itemId) { //在线转链图表
            this.oHidePopup.hideOnLineLin = true;
            this.publicPopup('.js-popupOnLineLin');
            onLineLinFun(itemId);
        },
        onLineLinShut: function () { //在线转链图表-关闭
            this.oHidePopup.hideOnLineLin = false;
            this.publicClose();
        },
        echoImg: function () { //懒加载
            Echo.init({
                offset: 0,
                throttle: 0
            });
        },
        publicPopup: function (className) { //公共弹窗
            layer.open({
                type: 1,
                shift: 0,
                title: false,
                closeBtn: 0,
                shade: 0.4,
                content: $(className)
            });
        },
        publicClose: function () { //公共弹窗关闭
            layer.closeAll();
        },
    }
};


// 举报组件
Vue.component('component-report', {
    mixins: [vmminxShopData],
    props: ["dyajaxurl"],
    data: function () {
        return {
            oPublic: {
                reportImg: '',
            },
            oHidePopup: {
                hideJb: false
            },
            oReport: { //举报
                reportLSelected: 0, //选中第几个
                reportL: '', //理由
                reportQQ: '', //qq
                isId: '', //自增id
                oIndex: '' //存放举报选中的下标(用来查找是否可以举报)
            },
            oReportSelected: [
                {
                    id: 0,
                    describe: "请选择理由",
                },
                {
                    id: 1,
                    describe: "首页评论有拉人信息",
                },
                {
                    id: 2,
                    describe: "低佣或关闭佣金",
                },
                {
                    id: 3,
                    describe: "优惠券无法使用",
                },
                {
                    id: 4,
                    describe: "商家发短信或返现卡加微信拉人",
                },
                {
                    id: 5,
                    describe: "价格不符",
                },
                {
                    id: 6,
                    describe: "文案不符",
                },
                {
                    id: 7,
                    describe: "商品已下架",
                },
                {
                    id: 8,
                    describe: "有更高优惠券",
                },
                {
                    id: 9,
                    describe: "涉嫌刷榜",
                },
                {
                    id: 10,
                    describe: "其他",
                }

            ],
            oToken: {
                token: '',
                toeknTime: '',
                toeknBoolean: false
            },
        }
    },
    methods: {
        jbPrdoucBtn: function (item, index, number) { //举报弹窗
            if (item.report_status == 1 || item.report_status == 100) {
                layer.msg('该宝贝已被举报过，待处理中', {
                    icon: 5
                });
                return;
            }
            this.oReport.isId = item.id;
            this.oReport.oIndex = index;

            this.oHidePopup.hideJb = true;
            this.publicPopup('.js-PopupReport');
            this.ajaxGetToken();
        },
        getCouponSelected: function (id) { //举报选中
            if (id == 0) {
                this.oReport.reportL = '';
                return;
            }
            if (id == 8) {
                layer.msg('请输入更高优惠券链接或联系群管理员');
                this.oReport.reportL = '';
                return;
            }
            this.oReport.reportL = this.oReportSelected[id].describe;
        },
        ReportBtn: function () { //举报提交
            var self = this;
            if (self.oReport.reportLSelected == 0) {
                layer.msg('请先选择理由', {
                    time: 1500
                });
                return;
            } else if (self.oReport.reportL == '' && self.oReport.reportLSelected != 8) {
                layer.msg('请输入举报理由', {
                    time: 1500
                });
                return;
            } else if (self.oReport.reportLSelected == 8 && self.oReport.reportL == '') {
                layer.msg('请输入更高优惠券链接', {
                    time: 1500
                });
                return;
            } else if (self.oReport.reportQQ == '') {
                layer.msg('请输入您的联系QQ', {
                    time: 1500
                });
                return;
            }
            // else if (!vmTestInput.isQQ(this.oReport.reportQQ)) {
            //     layer.msg('请输入正确的QQ', {
            //         time: 1500
            //     });
            // }
            if (self.oPublic.reportImg == '' && (self.oReport.reportLSelected != 3 && self.oReport
                .reportLSelected != 10)) {
                layer.msg('请先上传符合要求的图片', {
                    time: 1500
                });
                return;
            }
            var url = self.dyajaxurl ? "/indexapi/trill_report" : "/indexapi/report";
            vmAjaxPost(url, {
                id: self.oReport.isId,
                report_type: self.oReport.reportLSelected,
                report_reason: self.oReport.reportL,
                report_qq: self.oReport.reportQQ,
                report_image: self.oPublic.reportImg
            }, function (data) {
                if (data.status == '200') {
                    self.jbPrdoucShut();
                    layer.msg(data.message, {
                        icon: 1,
                        time: 2000
                    });

                    //篡改临时假数据让举报那里判断是否举报过
                    // if (!Callback) {
                    //     self.publicList.productList[self.oReport.oIndex].report_status = 100;
                    // } else {
                    //     Callback();
                    // }
                } else {
                    self.jbPrdoucShut();
                    layer.msg(data.message, {
                        icon: 2,
                        time: 2000
                    });
                }

            }, function () {

            })
        },
        jbPrdoucShut: function () { //  举报弹窗-关闭
            this.oHidePopup.hideJb = false;
            layer.closeAll();

            this.oReport.isId = "";
            this.oReport.reportLSelected = 0;
            this.oReport.reportL = "";
            this.oReport.reportQQ = "";
            this.oPublic.reportImg = "";
        },
    },
    template:
        '<div class="inJu-wrap comPopupHide js-PopupReport">' +
        '<div class="in-modal-inner" v-if="oHidePopup.hideJb">' +
        '<p class="in-modal-hd">您确定要举报该商品吗？</p>' +
        '<p class="in-modal-p">请输入举报理由，我们会对商品进行相应处理</p>' +
        '<ul class="in-modal-list">' +
        '<li>' +
        '<span>选择理由</span>' +
        '<select v-model="oReport.reportLSelected" @change="getCouponSelected(oReport.reportLSelected)">' +
        '<option :value="item.id" v-for="item in oReportSelected">{{item.describe}}</option>' +
        '</select>' +
        '</li>' +
        '<li v-if="oReport.reportLSelected !=8">' +
        '<span>举报理由</span>' +
        '<input type="text" maxlength="20" placeholder="请输入举报理由" v-model="oReport.reportL" :disabled="oReport.reportLSelected ==0?true:false">' +
        '</li>' +
        '<li v-else>' +
        '<span>优惠券链接</span>' +
        '<input type="text" maxlength="20" placeholder="请输入更高优惠券链接" v-model="oReport.reportL">' +
        '</li>' +
        '<li>' +
        '<span>联系Q号</span>' +
        '<input type="number" placeholder="请输入您的联系QQ" v-model="oReport.reportQQ" maxlength="11" >' +
        '</li>' +
        '</ul>' +
        '<div class="in-modal-up">' +
        '<span>上传截图</span>' +
        '<div class="in-modal-img" v-if="oPublic.reportImg"><img :src="oPublic.reportImg"></div>' +
        '<div class="in-modal-upbox">' +
        '<em>+</em>' +
        '<input type="file" @change="ReportreadFile($event)">' +
        '</div>' +
        '<p class="in-modal-tips" v-if="oReport.reportLSelected == 1">（截图需包含ID,评价时间和系统时间）</p>' +
        '</div>' +
        '<div class="in-modal-footer">' +
        '<span class="in-modal-btn comHover-color" @click="ReportBtn()">提交</span>' +
        '<span class="in-modal-btn comHover-color" @click="jbPrdoucShut()">取消</span>' +
        '</div>' +
        '</div>' +
        '</div>'
});


// 建议反馈
Vue.component('component-feedback', {
    mixins: [vmminxShopData],
    data: function () {
        return {
            oPublic: {
                reportImg: '',
            },
            oFeedback: { //建议反馈
                accountsId: '',
                qq: '', //qq
                feedback: '',
            },
            oHidePopup: {
                hideFeedback: false //建议
            },
            oToken: {
                token: '',
                toeknTime: '',
                toeknBoolean: false
            },
        }
    },
    methods: {
        feedbackSubBtn: function () { //建议反馈提交
            var self = this;
            if (self.oFeedback.feedback == '' || self.oFeedback.qq == '') {
                layer.msg('请输入您宝贵的建议或者QQ！', {
                    time: 2000
                });
                return;
            }
            if (self.oFeedback.feedback.length < 5) {
                layer.msg('建议反馈字数为5以上！', {
                    time: 2000
                });
                return;
            }
            vmAjaxPost("/indexapi/api_get_advise", {
                seller_id: self.oFeedback.accountsId,
                advise_qq: self.oFeedback.qq,
                advise_problem: self.oFeedback.feedback,
                advise_photo: self.oPublic.reportImg
            }, function (data) {
                if (data.status == '200') {
                    self.feedbackShut();
                    layer.msg(data.message, {
                        icon: 1,
                        time: 2000
                    });

                } else {
                    self.feedbackShut();
                    layer.msg(data.message, {
                        icon: 2,
                        time: 2000
                    });
                }

            }, function () {

            })
        },
        feedbackBtn: function () { //建议
            this.oHidePopup.hideFeedback = true;
            this.publicPopup('.js-Popupfeedback');
            this.ajaxGetToken();
        },
        feedbackShut: function () { //建议-关闭
            this.oHidePopup.hideFeedback = false;
            this.publicClose();

            this.oFeedback.accountsId = '';
            this.oFeedback.qq = '';
            this.oFeedback.feedback = '';
            this.oPublic.reportImg = '';
        },
    },
    template:
        '<div class="infeedback comPopupHide js-Popupfeedback">' +
        '<div class="infeedback-inner" v-if="oHidePopup.hideFeedback">' +
        '<div class="infeedback-t">' +
        '<i>您的建议</i>' +
        '<em class="iconfont hdk-chenghao comHover-color" @click="feedbackShut()"></em>' +
        '</div>' +
        '<ul class="infeedback-list">' +
        '<li>' +
        '<span>好品推帐号ID：</span>' +
        '<input type="text" placeholder="请输入放单账号ID(选填，没有可不填)" v-model="oFeedback.accountsId">' +
        '</li>' +
        '<li>' +
        '<span>建议人QQ：</span>' +
        '<input type="number" placeholder="请输入您的QQ" maxlength="11" v-model="oFeedback.qq">' +
        '</li>' +
        '<li>' +
        '<span>你的建议：</span>' +
        '<textarea placeholder="请至少输入5个字" class="infeedback-text" v-model.trim="oFeedback.feedback"></textarea>' +
        '</li>' +
        '<li>' +
        '<span>上传图片：</span>' +
        '<img :src="oPublic.reportImg" v-if="oPublic.reportImg">' +
        '<div class="infeedback-upImg">' +
        '<input type="file" @change="ReportreadFile($event)">' +
        '<i class="iconfont hdk-jia1"></i>' +
        '</div>' +
        '</li>' +
        '</ul>' +
        '<em class="infeedSub" @click="feedbackSubBtn()">提交</em>' +
        '</div>' +
        '</div>'
});

// 视频组件
Vue.component('component-video', {
    data: function () {
        return {
            oHidePopup: {
                hideVideo: false,
            },
            oVideo: {
                mp4link: '',
                swfLlink: '',
                videoTab: 0
            },
        }
    },
    methods: {
        playVideoBtn: function (id) { //视频播放
            this.oVideo.mp4link = "http://cloud.video.taobao.com/play/u/1/p/1/e/6/t/1/" + id + ".mp4";
            this.oVideo.swfLlink = "//cloud.video.taobao.com/play/u/2599950707/p/1/e/1/t/1/" + id +
                ".swf";

            this.oHidePopup.hideVideo = true;
            layer.open({
                type: 1,
                shift: 0,
                title: false,
                closeBtn: 0,
                shade: 0.4,
                content: $(".js-popupVideo")
            });
        },
        videoTabBtn: function (index) { //视频 赋值下标
            this.oVideo.videoTab = index;
        },
        playVideoShut: function () { //视频-关闭弹窗
            this.oVideo.videoTab = 0;
            this.oVideo.mp4link = '';
            this.oVideo.swfLlink = '';
            this.oHidePopup.hideVideo = false;
            layer.closeAll();
        },
    },
    template:
        '<div class="video-modal-dialog comPopupHide js-popupVideo">' +
        '<div v-if="oHidePopup.hideVideo">' +
        '<div class="video-modal-hd">' +
        '<span>查看视频</span>' +
        '<i class="iconfont hdk-close" @click="playVideoShut()"></i>' +
        '</div>' +
        '<div class="video-modal-bd">' +
        '<div class="video-show">' +
        '<video class="video-box" autoplay="autoplay" :src="oVideo.mp4link" controls="controls" v-if="oVideo.videoTab == 0"></video>' +
        '<object class="video-box" type="application/x-shockwave-flash" :data="oVideo.swfLlink"  v-if="oVideo.videoTab == 1"></object>' +
        '</div>' +
        '</div>' +
        '<div class="video-modal-footer">' +
        '<span>下载视频请右键点击“视频另存为(V)...”</span>' +
        '<div class="video-btns">' +
        '<span class="video_source" :class="[oVideo.videoTab == 0?\'video-active\':\'\']" @click="videoTabBtn(0)">视频源1</span>' +
        '<span class="video_source" :class="[oVideo.videoTab == 1?\'video-active\':\'\']" @click="videoTabBtn(1)">视频源2</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div> ',
});




// 加载动画组件
Vue.component('component-loading', {
    props: ['vmpublicc'],
    data: function () {
        return {

        }
    },
    methods: {

    },
    template:
        '<div class="loadingBox" v-if="vmpublicc">' +
        '<div class="loading overall-loading">' +
        '<div class="outer"></div>' +
        '<div class="inner"></div>' +
        '<div class="loading-text">数据加载中，请稍后...</div>' +
        '</div>' +
        '</div>',
});


// 暂无数据提示
Vue.component('component-datanull', {
    props: ['vmdatanull', 'vmmsg', 'vmrescreen', 'vmnullimg'],
    data: function () {
        return {
            nullImg0: 'https://www.haodanku.com/Public/assets/home/images/item/Index-null.png',
            // nullImg1:'https://www.haodanku.com/Public/assets/home/images/item/Index-null1.png',   //当图片不一样的时候
        }
    },
    methods: {
        resBtn: function () {
            this.$emit("vmresbtn");
        }
    },
    template:
        '<div class="inNull animatedFade animatedNaneBottom" v-if="vmdatanull">' +
        '<img :src="nullImg0" class=" comUser-select" v-if="vmnullimg ==undefined">' +
        // '<img :src="nullImg1" class=" comUser-select" v-else>'+
        '<p>{{vmmsg ==undefined?"抱歉，暂时没有筛选到合适商品":vmmsg}}</p>' +
        '<span v-if="vmmsg ==undefined">我们会努力寻找更多的商品哦~</span>' +
        '<em @click="resBtn" v-if="vmrescreen">重新筛选</em>' +
        '</div>'
});


// 分页
Vue.component('component-page', {
    props: ['publiclist'],
    data: function () {
        return {

        }
    },
    methods: {
        pagebtn: function () {
            this.$emit("pagejump");
        },
        pagesurebtn: function () {
            this.$emit("pagesurebtn");
        },
    },
    template:
        '<div class="inPage-wrap vmpage" v-if="publiclist.count >1">' +
        '<div class="inPage"></div>' +
        '<div class="inPage-y">' +
        '<span @click="pagebtn()" v-if="publiclist.count != publiclist.pageNumber">{{publiclist.count}}</span>' +
        '<em>共{{publiclist.count}}页</em>' +
        '</div>' +
        '<p class="inPage-input">' +
        '<em>到第</em>' +
        '<input type="number" v-model="publiclist.pageInput"  @keyup.enter="pagesurebtn()">' +
        '<i>页</i>' +
        '<span class="comHover-color" @click="pagesurebtn()">确定</span>' +
        '</p>' +
        '</div>'
});

// 侧边栏
Vue.component('component-rightfixed', {
    mixins: [vmminxShopData],
    props: ['publiclist', 'opublic', 'nocopy'],
    data: function () {
        return {

        }
    },
    mounted: function () {

    },
    methods: {
        clickpagebtn: function (number) {
            this.$emit("clickpage", number);
        },
        feedbackbtn: function () {
            this.$emit("feedbackbtn");
        },
        copyAllBtn: function () { //一键复制
            var clipboard_all = new ClipboardJS('.copy_all', {
                target: function (trigger) {
                    return document.querySelector('.all_article');
                }
            });
            clipboard_all.on('success', function (e) {
                $('#all_article').html('');
                layer.msg('复制成功！', {
                    icon: 1,
                    tiem: 2000
                });
                e.clearSelection();
                // clipboard.destroy();
                // console.log(e);
            });
            clipboard_all.on('error', function (e) {
                $('#all_article').html('');
                layer.msg('由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！', {
                    icon: 2
                });
            });
            var all_content = '';
            $(".fq-copy").each(function () {
                content = $(this).attr('datatips');
                all_content = all_content + content + '<br/>';
            });
            $('#all_article').html(all_content);
        },
    },
    template:
        '<div class="inFixed comUser-select">' +
        '<p class="inFixed-page">{{publiclist.pageNumber}}/{{publiclist.count}}</p>' +
        '<div class="inFixed-box">' +
        '<a href="javascript:" @click="clickpagebtn(-1)" v-if="!opublic.loadingShow && publiclist.pageNumber != 1">向上一页</a>' +
        '<a href="javascript:" class="js-noClick" v-else>向上一页</a>' +
        '<a href="javascript:" @click="clickpagebtn(+1)" v-if="!opublic.loadingShow && publiclist.count != publiclist.pageNumber">向下一页</a>' +
        '<a href="javascript:" class="js-noClick" v-else>向下一页</a>' +
        '<a href="/index/help_index.html" target="_blank">帮助中心</a>' +
        '<a href="javascript:" @click="feedbackbtn()">建议反馈</a>' +
        '<a href="javascript:" id="contact_service">联系客服</a>' +
        '<a href="javascript:" class="copy_all" @click="copyAllBtn()" v-if="nocopy==undefined">一键复制</a>' +
        '<div class="contact-kefu"><img src="" alt="好品推公众号">' +
        '<div class="contact-tips"><span>关注好品推公众号</span> <span>向在线客服提问</span></div>' +
        '</div>' +
        '</div>' +
        '<i class="inFixed-arrowTop" @click="arrowTopFun()"></i>' +
        '</div>'

});



// 产品来源品牌tips组件
Vue.component('component-brandicon', {
    mixins: [vmminxShopData],
    props: ['item'],
    data: function () {
        return {

        }
    },
    methods: {

    },
    template:
        '<div style="display:inline-block">' +
        '<span class="inProduc-l-Tm" v-if="item.shoptype==\'B\'" @mouseenter="moveinIcon(\'天猫\',$event)" @mouseleave="ComremoveLayerTips()"></span>' +
        '<span v-if="item.shoptype==\'C\'" @mouseenter="moveinIcon(\'淘宝\',$event)" @mouseleave="ComremoveLayerTips()">淘</span>' +
        '<span v-if="item.is_foreshow == 2" @mouseenter="moveinIcon(\'快抢\',$event)" @mouseleave="ComremoveLayerTips()">快</span>' +
        '<span v-if="item.videoid == 2" @mouseenter="moveinIcon(\'视频\',$event)" @mouseleave="ComremoveLayerTips()">视</span>' +
        '<span v-if="item.activity_type == \'淘抢购\'" @mouseenter="moveinIcon(\'淘抢购\',$event)" @mouseleave="ComremoveLayerTips()">抢</span>' +
        '<span v-if="item.activity_type == \'聚划算\'" @mouseenter="moveinIcon(\'聚划算\',$event)"  @mouseleave="ComremoveLayerTips()">聚</span>' +
        '<span v-if="item.is_brand == 1" @mouseenter="moveinIcon(\'品牌单\',$event)" @mouseleave="ComremoveLayerTips()">品</span>' +
        '<div class="inIconActive" v-if="item.activity_plan !=0">' +
        '<img :src="iconItem.img" v-for="(iconItem,index) in item.activity_info" @mouseenter="moveinIcon(iconItem.name,$event)" @mouseleave="ComremoveLayerTips()">' +
        '</div>' +
        '</div>'
});



//实拍图--小工具
Vue.component('vmPic', {
    props: ['goodsid'],
    data: function () {
        return {
            loadmsg: true,
            cacheId: '',  //缓存Id
            realPicoPage: {
                pageNumber: 1,
                pageImgAll: [],
            },
        }
    },
    mounted: function () {
        var self = this;
        var nScrollHight = 0;
        var nScrollTop = 0;
        var nDivHight = $(".realpic-box").height();
        $(".realpic-box").scroll(function () {
            nScrollHight = $(this)[0].scrollHeight;
            nScrollTop = $(this)[0].scrollTop;
            if (nScrollTop + nDivHight >= nScrollHight) {
                if (self.loadmsg) {
                    self.ajaxIrealpic();
                }
            }
        });

    },
    methods: {
        ajaxIrealpic: function (abs) {
            var self = this;
            if (abs) {
                if (self.cacheId == self.goodsid && self.realPicoPage.pageImgAll != '') {
                    self.CallbackRealpic();
                    return;
                } else {
                    self.realPicoPage = {
                        pageNumber: 1,
                        pageImgAll: [],
                    };
                    self.loadmsg = true;
                    layer.load(2, { shade: 0.1 });
                    self.cacheId = self.goodsid;
                }
            } else {
                self.realPicoPage.pageNumber += 1;
            }
            vmAjaxPost("/tool/get_evaluate_imageurl", {
                itemid: self.goodsid,
                page: self.realPicoPage.pageNumber
            }, function (data) {
                layer.closeAll('loading');
                if (data.code == '200') {
                    if (data.evaluate_imageurl != 0) {
                        self.realPicoPage.pageImgAll = self.realPicoPage.pageImgAll.concat(data.evaluate_imageurl);
                        if (self.realPicoPage.pageImgAll.length < 6) {
                            self.ajaxIrealpic();
                        }
                    } else {
                        self.loadmsg = false;
                        if (abs) {
                            layer.msg('没有实拍图哦', {
                                time: 1500,
                                shade: 0.1,
                                shadeClose: true
                            });
                        }
                        return;
                    }
                    self.$nextTick(function () {
                        if (abs) {
                            self.CallbackRealpic();
                        }

                    })

                } else if (data.code == '-1') {
                    layer.msg('请先登录', {
                        time: 1500,
                        shade: 0.1,
                        shadeClose: true
                    });
                } else {
                    layer.msg(data.msg, {
                        icon: 2,
                        shade: 0.1,
                        shadeClose: true
                    });
                }

            })
        },
        CallbackRealpic: function () {
            layer.open({
                type: 1,
                shift: 0,
                title: '获取实拍图',
                closeBtn: 2,
                shade: 0.4,
                area: ['850px', '720px'],
                content: $('.js-realPic')
            });
        },
    },
    template:

        '<div class="realPic js-realPic">' +
        '<div class="realpic-box">' +
        '<ul class="realPic-list clearfix">' +
        '<li v-for="(item,index) in realPicoPage.pageImgAll"><img :src="item"></li>' +
        '</ul>' +
        '<p class="realpic-loading" v-if="loadmsg"> <i class="iconfont hdk-jiazai vmIconLoad"></i><em>数据加载中...</em></p>' +
        '<p class="realpic-loading" v-else>数据已经加载完了</p>' +
        '</div>' +
        '</div>'
});


// // 记录访问量
// vmAjaxPost(vmHTTPurl + "://api." + vmHostUrl + "/Statistics/index", {
//     request_head: vmHTTPurl,
//     url: window.location.href,
//     content: document.title.split('-')[0],
// }, function (data) {

// })
