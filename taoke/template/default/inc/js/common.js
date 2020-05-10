(function($) {
    var base = {
        init: function() {
            var _this = this;
            $(window).scroll(function() {
                if ($(window).scrollTop() > 30) {
                    $("#top-header").addClass("fixedNav hui-fadeinT");
                } else {
                    $("#top-header").removeClass("fixedNav hui-fadeinT");
                }
            });
            _this.initEvent();
			_this.promoText();
            _this.sidebar();
            _this.userinfo();
        },
        initEvent:function(){
            var _this = this;
			
            $(function() {
      			$(".lazy").lazyload({
					threshold : 400,
					failure_limit : 30,
       				effect : "fadeIn"
     			});
                $(document).on('pjax:start', function() {NProgress.start();NProgress.set(0.2);NProgress.set(0.6);});
                $(document).on('pjax:end', function() {NProgress.set(0.8);NProgress.done();});
                $(document).pjax('a[data-pjax],.pagination a', '#pjax_content');
                $(document).on('submit', 'form[data-pjax]', function(event) {
                    $.pjax.submit(event, '#pjax_content')
                });

				$.Huihover('.maskWraper');
				
				//查询商品收藏状态
				 _this.likeGet($(".y-like"));
				
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
					});
					
					//搜索下拉
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
//							if (term in cache) {
//								response(cache[term]);
//								return;
//							}
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
//							var s = $('.search-tabs li.current').attr('data-s');
//							if (s>1) {
//								
////								$.getJSON(+'/index.php?mod=inc&act=ajax&do=suggest&s='+s, request, function(data) {
////									cache[term] = data.result;
////									response(data.result);
////								});
//							}
						},
						select: function(event, ui) {
							$("#kw").val(ui.item[0]);
							$('#js-eb-search-btn').click();
							return false;
						}
					}).data("ui-autocomplete")._renderItem = function(ul, item) {
//						console.log(item);
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
				}
			
				//去重和天猫
				$(document).on('click', '#only', function() {
					if($('#only_form').val()==1){
						$('#only_form').val(0);
					}else{
						$('#only_form').val(1);
					}
					$('#filterform').submit();
				});
				$(document).on('click', '#tmall,#coupon', function() {
					$('#filterform').submit();
				});
	
				$("#type").change(function(){
					$('#filterform').submit();
				});
	
				//收藏
				$(document).on('click','.y-like',function(){
					var $t=$(this);
					var id=$t.attr('data-gid');
					if(getCookie('userlogininfo') == undefined){
						_this.alertUser('login');
						return false;
					}
					$.ajax({
						type: "POST",
						url: '/index.php?mod=inc&act=ajax&do=like',
						data: 'id=' + id,
						dataType:'jsonp',
						success: function(data){
							if(data.s==0){
								_this.alertUser('login');
								return false;
							}
							else if(data.s==1){ 
								if(data.quxiao==1){
									$t.removeClass("active");
									$t.find('.like-ico').removeClass('l-active');
									$t.attr('title','加入收藏');
								}else{
									$t.addClass("active");
									$t.find('.like-ico').addClass('l-active');
									$t.attr('title','取消收藏');
								}
								layer.msg(data.r, {icon: 1,time: 2000});
							}
						 }
					});
				});
            });
        },
        layerOpen:function(title,icon,url,w,h,login,Close,Scroll){
        	if(login == 1){
        		$.getJSON(URLPrefix.taoke_url+'/common/userinfo.php?callback=?', {}, function(data){
    				if(data.result.map.user&&data.result.map.user.user_name){
    					open_layer();
    				}else{
    					HZB.layerOpen('用户登录/注册','&#xe606;',URLPrefix.taoke_url+'/user.php?action=login&back_url='+encodeURIComponent(window.location.href),590,550,0);
    					return false;
    				}
    			});
        	}else{
        		open_layer();
        	}
//			if(login == 1 && getCookie('userlogininfo') == undefined){
//				this.layerOpen('用户登录/注册','&#xe606;',URLPrefix.taoke_url+'/user.php?action=login&back_url='+encodeURIComponent(window.location.href),590,550,0);
//				return false;
//			}
			function open_layer(){
				if(title && icon){
					title='<i class="iconfont">'+icon+'</i>'+title;
				}
				if(Close == 1){
					Close = true;
				}else{
					Close = false;
				}
				if(Scroll == 1){
					Scroll = false;
				}
				if(!isNaN(w)){
					w = w+'px';
				}
				if(!isNaN(h)){
					h = h+'px';
				}
	            layer.open({
	                type: 2,
					shade: .6,
					shadeClose: Close,
					scrollbar: Scroll,
					title: title,
	                content: url,
	                area: [w, h]
	            });
			}
        },
		promoText: function() {
			var clipboard, textTipsIndex;
			clipboard = new Clipboard('.promoText', {
				target: function() {
					return document.getElementById('copy-input');
				}
			});
			clipboard.on('success', function(e) {
				return layer.msg('恭喜，复制成功！', {icon: 1});
			});
			clipboard.on('error', function(e) {
				return layer.msg('您的浏览器不支持一键复制，请升级浏览器或更换浏览器', {icon: 2});
			});
			textTipsIndex = null;
			$('.promoText').mouseenter(function() {
				var html, imgSrc, t, txt;
				if($(this).attr('data-s')==1) {
					t = '复制';
				} else {
					t = '点击复制';
				}
				$(this).text(t);
				txt = $(this).attr('data-text');
				txt = txt.replace(/\n/ig, "<br/>");
				imgSrc = $(this).attr('data-img');
				html = "<div id='copy-input' style='width:1px;height:1px;overflow:hidden'><img src='" + imgSrc + "'><br/>" + txt + "</div>";
				
				var tip_txt = txt;
				if($(this).attr('data-img-ori')!=null){
					tip_txt = "<img style='max-width:200px' src='" + $(this).attr('data-img-ori') + "'><br/>"+txt;
				}
				textTipsIndex = layer.tips(tip_txt, this, {
					time: 0,
					area: ['500px']
				});
				$('#copy-input').remove();
				return $('body').append(html);
			});
			$('.promoText').mouseleave(function() {
				layer.close(textTipsIndex);
				if($(this).attr('data-s')==1) {
					t = '文案';
				} else {
					t = '复制推广文案';
				}
				return $(this).text(t);
			});
        },
		likeGet: function($obj) {
			var b = [];
			var gid  = $obj.each(function(i){
				b[i] = $(this).attr('data-gid');
			});
			if(b.length>0) {
				var gid = b.join(',');
				$.getJSON(URLPrefix.taoke_url+'/index.php?mod=inc&act=ajax&do=like_get', {"ids":gid}, function(data){
					if(data.s == 1){
						var gid = data.r;
						$obj.each(function(i){
							var sid = $(this).attr('data-gid');
							if( gid.indexOf(sid) != -1  ) {
								$(this).attr('title','取消收藏');
								$('.like-ico',$(this)).addClass('l-active');
								$(this).addClass("active");
							}
						});
					}
				})
			}
		},
		sidebar: function() {
			var $navFun = function() {
				var e = parseInt($(window).height()),
				t = parseInt($("body").height()),
				i = parseInt($(window).scrollTop()),
				n = (parseInt($(".footer").offset().top), parseInt($(".footer").height())),
				o = t - e - n;
				i > o ? $(".side-wrap").css("bottom", n + "px") : $(".side-wrap").css("bottom", "30px")

				$(".side-block").hover(function() {
					var n = $(this).children(".main-link");
					n.addClass("main-link-hover");
					var i = n.children(".hover-text"),
					a = n.children(".icon-mini");
					if (i.length) {
						n.find(".icon-mini").hide();
					}
				},
				function() {
					var n = $(this).children(".main-link");
					n.removeClass("main-link-hover");
					n.find(".icon-mini").show();
				})
			};

			var F_nav_scroll = function () {
				if (!window.XMLHttpRequest) {
					return;          
				}else{
				//默认执行一次
					$navFun();
					$(window).bind("scroll", $navFun);
				}
			}

			var F_top = function(){
				$('body,html').animate({scrollTop:0},500);
			}
			$('.uptop-box').on('click',F_top)
			F_nav_scroll();
		},
		F_scroll:function(id, main, fix, offsetTop){
			var Obj = $(id);
			var _main = $(main);
			if (Obj.length > 0) {
				var ele_offset_top = Obj.offset().top;
				$(window).scroll(function() {
					var scro_top = $(this).scrollTop();
					var fix_foot_pos = parseInt(Obj.height()) + parseInt(scro_top);
					var mainpos = parseInt(_main.offset().top) + parseInt(_main.height());
					if (scro_top <= ele_offset_top && fix_foot_pos < mainpos) {
						if(fix){
							Obj.removeClass(fix);
						} else {
							Obj.css({
								'position': 'static',
								'top': 0
							});
						}
					} else if (scro_top > ele_offset_top && fix_foot_pos < mainpos) {
						if(fix){
							Obj.addClass(fix);
						} else {
							Obj.css({
								"position": 'fixed',
								'top': 0 + offsetTop + 'px'
							});
						}
					} else if (scro_top > ele_offset_top && fix_foot_pos > mainpos) {
						var posi = mainpos - fix_foot_pos;
						if(fix){
							Obj.addClass(fix);
						} else {
							Obj.css({
								'position': 'fixed',
								'top': posi
							});
						}
					}
				});
			}
		},
		userinfo: function() {
			$.getJSON(URLPrefix.taoke_url+'/common/userinfo.php?callback=?', {}, function(data){
				$("#user_info").hide();
				$("#user_info_login").hide();
				if(data.result.map.user&&data.result.map.user.user_name){
					$("#user_info_name").html("<i class=\"iconfont\">&#xe606;</i>&nbsp;"+data.result.map.user.user_name);
					$("#user_info").show();
					$("#user_info_guanli").show();
				}else{
					$("#user_info_login").show();
				}
			})
		},
		qunfa: function(num_iid) {
			$.getJSON(URLPrefix.taoke_url+'/user_info.php?callback=?', {action:'user',mod:'qunfa',num_iid:num_iid}, function(data){
				if(data.result.map.status == 1){
					layer.msg(data.result.map.status_err, {icon: 1,time: 1000},function(){});
				}else{
					layer.msg(data.result.map.status_err, {icon: 2,time: 1000});
				}
			});
		},
    };
    window.HZB = base;
    window.HZB.init();
	
	var CountDown = {
		running_time: 0,
		time_curr: 0,
		time_cache: {},
		time_list: {},
		timer: null,
		start: function(){
			CountDown.time_curr = Date.parse(new Date())/1000;
			
			var item_lefttime = $('.countdown');
			var lefttime = 0, _tmp = 0;
			var dom = null, pdom = null;
			
			for( var i=0, length = item_lefttime.size(); i < length; i++ ){
				dom = item_lefttime.eq(i)[0];
				lefttime = parseInt(dom.getAttribute('data-endtime')) - CountDown.time_curr;
				showtype = parseInt(dom.getAttribute('data-showtype'));
				CountDown.time_list[i] = {'obj':dom, 'lefttime':lefttime, 'showtype':showtype};
			}
			// start
			CountDown.showLeftTime();
			CountDown.timer = setInterval( function(){CountDown.showLeftTime();}, 1000);
		},
		showLeftTime: function(){
			
			var time_left = 0, d=0, h=0, m=0, s=0;
			var _d='', _h='', _m='', _s='';
			var _str = '';
			
			for( var key in CountDown.time_list ){
				//console.log( CountDown.time_list[key] );
				CountDown.time_list[key]['lefttime']-=1;
				time_left = CountDown.time_list[key]['lefttime'];
				//if( time_left < 0 ) continue;
				
				switch( CountDown.time_list[key]['showtype'] ){
					case 2:
						CountDown.showTypeDefault( CountDown.time_list[key]['obj'], time_left, 'em' );
						break;
						
					case 1:
					default:
						CountDown.showTypeDefault( CountDown.time_list[key]['obj'], time_left, '' );
						break;
				}
				
			}
			
		},
		showTypeDefault: function( dom, time_left, label ){
			var d=0, h=0, m=0, s=0;
			var _d='', _h='', _m='', _s='';
			var _str = '';
			d=0, h=0, m=0, s=0;
			d = parseInt(time_left / 86400); time_left = time_left % 86400;
			h = parseInt(time_left / 3600); time_left = time_left % 3600;
			m = parseInt(time_left / 60); time_left = time_left % 60;
			s = parseInt(time_left);
			
			if( label != '' ){
				var left = '<'+ label +'>';
				var right = '</'+ label +'>';
			} else {
				var left = '';
				var right = '';
			}
			
			if( time_left > 0 ){
				f = '0';
			} else {
				f = '';
			}
				
			_d = left + d + right + '天';
			if( h < 10 )
				_h = f + h
			else
				_h = h;
				
			_h = left + _h + right;
				
			if( m < 10 )
				_m = f + m;
			else
				_m = m;
				
			_m = left + _m + right;
				
			if (s < 10 )
				_s = f + s;
			else
				_s = s;
				
			_s = left + _s + right;
			
			_str = _d + _h.replace(/-/,'') + '时' + _m.replace(/-/,'') + '分' + _s.replace(/-/,'') + '秒';
			
			dom.innerHTML = _str;
		}
	}
	CountDown.start();
})(jQuery);

