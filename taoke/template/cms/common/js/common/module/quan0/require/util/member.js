define([], function() {
	return {
		init:function(){
			 var _this = this;
			 $.getJSON(cms_all_config.login_url, {
				   app_id:cms_all_config.app_id,
				   url_sign:cms_all_config.url_sign,
				   time:cms_all_config.time,
				   ag_id:$("#member_agent_id").val(),
				   action:'info'
			   }, function(data){
				   if(data.result.map.user_login_show != -1){		   
					   if(data.result.map.status == 1){
						   $(".header-info").before($("#toolbar_member"));
						   $(".user",$("#toolbar_member")).html(data.result.map.user.user_name);
						   cms_all_config.m_id = data.result.map.user.user_id;
						   $("#toolbar_member").show();
					   }else{
						   $(".header-info").before($("#toolbar"));
						   $("#toolbar").show();
					   }
				   }
				   if(data.result.map.ag_id&&data.result.map.ag_id!=''){
					   cms_all_config.agent_id = data.result.map.ag_id;
				   }
				   _this.query_click();
			   });
			 
			 $('#btn-register').click(function () {
				   $.getJSON(cms_all_config.login_url, {
					   app_id:cms_all_config.app_id,
					   url_sign:cms_all_config.url_sign,
					   time:cms_all_config.time,
					   action:'register',
					   user_name:$('#user_name').val(),
					   passwd:$('#password').val(),
					   qq:$('#qq').val(),
					   mobile:$('#mobile').val(),
					   email:$('#email').val(),
				   }, function(data){
					   if(data.result.map.status == 1){
						   window.location.href=cms_all_config.base_url;
					   }else{
						   $('#user_name_warn').html('<strong class="error "></strong><p class="msg_error">'+data.result.map.status_err+'</p>');
					   }
				   });        
			    });
			   
			   $('#btn-login').click(function () {
				   $.getJSON(cms_all_config.login_url, {
					   app_id:cms_all_config.app_id,
					   url_sign:cms_all_config.url_sign,
					   time:cms_all_config.time,
					   action:'login',
					   user_name:$('#user_name').val(),
					   passwd:$('#password').val(),
				   }, function(data){
					   if(data.result.map.status == 1){
						   window.location.href=cms_all_config.base_url;
					   }else{
						   $('#user_name_warn').html('<strong class="error "></strong><p class="msg_error">'+data.result.map.status_err+'</p>');
					   }
				   });        
			    });
			   
			   $('#btn_logout').click(function () {
				   $.getJSON(cms_all_config.login_url, {
					   app_id:cms_all_config.app_id,
					   url_sign:cms_all_config.url_sign,
					   time:cms_all_config.time,
					   action:'logout',
				   }, function(data){
					   if(data.result.map.status == 1){
						   window.location.href=cms_all_config.base_url;
					   }else{
						   window.location.href=cms_all_config.base_url;
					   }
				   });        
			    });
			   
			   $('.tb-btn').click(function () {
				   $.getJSON(cms_all_config.login_url, {
					   app_id:cms_all_config.app_id,
					   url_sign:cms_all_config.url_sign,
					   time:cms_all_config.time,
					   action:'input_taobao_order',
					   order_no:$('#activate-code').val(),
				   }, function(data){
					   if(data.result.map.status == 1){
						   $('.coupon-active>.err').html(data.result.map.status_err).css("color","#5eb95e").show();
						   $('#activate-code').val('');
						   HPT_MEMBER.query_order();
					   }else{
						   $('.coupon-active>.err').html(data.result.map.status_err).css("color","#ff464e").show();
					   }
				   });    
			    });
			   
			   $('.payment-btn').click(function () {
				   $.getJSON(cms_all_config.login_url, {
					   app_id:cms_all_config.app_id,
					   url_sign:cms_all_config.url_sign,
					   time:cms_all_config.time,
					   action:'input_payment_money',
					   input_payment_money:$('#money-code').val(),
				   }, function(data){
					   if(data.result.map.status == 1){
						   $('.coupon-active>.err').html(data.result.map.status_err).css("color","#5eb95e").show();
						   $('#money-code').val('');
						   HPT_MEMBER.query_cash();
					   }else{
						   $('.coupon-active>.err').html(data.result.map.status_err).css("color","#ff464e").show();
					   }
				   });    
			    });
			   
			   $('.exchange-btn').click(function () {
				   $.getJSON(cms_all_config.login_url, {
					   app_id:cms_all_config.app_id,
					   url_sign:cms_all_config.url_sign,
					   time:cms_all_config.time,
					   action:'input_exchange_points',
					   input_exchange_points:$('#point-code').val(),
				   }, function(data){
					   if(data.result.map.status == 1){
						   $('.coupon-active>.err').html(data.result.map.status_err).css("color","#5eb95e").show();
						   $('#point-code').val('');
						   HPT_MEMBER.query_point();
					   }else{
						   $('.coupon-active>.err').html(data.result.map.status_err).css("color","#ff464e").show();
					   }
				   });    
			    });
			   
			   $('.setting-btn').click(function () {
				   $.getJSON(cms_all_config.login_url, {
					   app_id:cms_all_config.app_id,
					   url_sign:cms_all_config.url_sign,
					   time:cms_all_config.time,
					   action:'input_setting',
					   email:$('#member-email').val(),
					   qq:$('#member-qq').val(),
					   mobile:$('#member-mobile').val(),
					   alipay:$('#member-alipay').val(),
					   passwd:$('#member-passwd').val(),
				   }, function(data){
					   if(data.result.map.status == 1){
						   $('#err').html(data.result.map.status_err).css("color","#5eb95e").show();
						   $('#point-passwd').val('');
//						   HPT_MEMBER.query_setting();
					   }else{
						   $('#err').html(data.result.map.status_err).css("color","#ff464e").show();
					   }
				   });    
			    });
			   
			   $('.passwd-btn').click(function () {
				   $.getJSON(cms_all_config.login_url, {
					   app_id:cms_all_config.app_id,
					   url_sign:cms_all_config.url_sign,
					   time:cms_all_config.time,
					   action:'input_passwd',
					   new_passwd:$('#member-passwd-new').val(),
					   passwd:$('#member-passwd').val(),
				   }, function(data){
					   if(data.result.map.status == 1){
						   $('#err').html(data.result.map.status_err).css("color","#5eb95e").show();
						   $('#point-passwd').val('');
					   }else{
						   $('#err').html(data.result.map.status_err).css("color","#ff464e").show();
					   }
				   });    
			    });
			   
			   if($("#member_home").length>0){
				   _this.query_order();
				   _this.query_agent();
			   }
			   if($("#member_point").length>0){
				   _this.query_point();
			   }
			   if($("#member_cash").length>0){
				   _this.query_cash();
			   }
			   if($("#member_setting").length>0){
				   _this.query_setting();
			   }
			   _this.show_menu();
		 },
		 show_menu:function(){
			// 移入到用户名上
		    $(".user_info").hover(function () {
		        $(this).addClass("show_info");
		    }, function () {
		        $(this).removeClass("show_info");
		    });

		    // 移入到更多上
		    $(".topnav_more").hover(function () {
		        $(this).addClass("more_hover");
		    }, function () {
		        $(this).removeClass("more_hover");
		    });
		 },
		 query_order: function() {
		 	$.getJSON(cms_all_config.login_url, {
      		   app_id:cms_all_config.app_id,
      		   url_sign:cms_all_config.url_sign,
      		   time:cms_all_config.time,
      		   action:'member',
			}, function(data){
				if(data!== undefined && data.result!==undefined){
					data = data.result.map; 
				}
				$("#member_money").html(data.user_data.money);
				$("#member_money_available").html(data.user_data.money_available);
				$("#member_points").html(data.user_data.points);
				var html_list = '';
				if(data.items){
					$.each(data.items, function(i,item){
						html_list= html_list+"<li><div><span>"+item.create_date+"</span><span>"+item.money+"元</span><span>"+item.points+"</span><span>"+item.status_name+"</span><span>"+item.memo+"</span></div></li>";
					});
				}		
				$("#member_list").html(html_list);
			})
		},
		query_point: function() {
			$.getJSON(cms_all_config.login_url, {
      		   app_id:cms_all_config.app_id,
      		   url_sign:cms_all_config.url_sign,
      		   time:cms_all_config.time,
      		   action:'point',
			}, function(data){
				if(data!== undefined && data.result!==undefined){
					data = data.result.map; 
				}
				$("#member_points").html(data.user_data.points);
				$("#member_points_available").html(data.user_data.points_available);
				var html_list = '';
				if(data.items){
					$.each(data.items, function(i,item){
						html_list= html_list+"<li><div><span>"+item.create_date+"</span><span>"+item.points+"</span><span>"+item.status_name+"</span><span>"+item.pay_memo+"</span></div></li>";
					});
				}		
				$("#member_list").html(html_list);
			})
		},
		query_cash: function() {
			$.getJSON(cms_all_config.login_url, {
      		   app_id:cms_all_config.app_id,
      		   url_sign:cms_all_config.url_sign,
      		   time:cms_all_config.time,
      		   action:'cash',
			}, function(data){
				if(data!== undefined && data.result!==undefined){
					data = data.result.map; 
				}
				$("#member_money").html(data.user_data.money);
				$("#member_money_available").html(data.user_data.money_available);
				var html_list = '';
				if(data.items){
					$.each(data.items, function(i,item){
						html_list= html_list+"<li><div><span>"+item.create_date+"</span><span>"+item.money+"元</span><span>"+item.status_name+"</span><span>"+item.pay_memo+"</span></div></li>";
					});
				}		
				$("#member_list").html(html_list);
			})
		},
		query_setting: function() {
        		$.getJSON(cms_all_config.login_url, {
      		   app_id:cms_all_config.app_id,
      		   url_sign:cms_all_config.url_sign,
      		   time:cms_all_config.time,
      		   action:'setting',
			}, function(data){
				if(data!== undefined && data.result!==undefined){
					data = data.result.map; 
				}
				$("#member-qq").val(data.user.qq);
				$("#member-email").val(data.user.email);
				$("#member-mobile").val(data.user.mobile);
				$("#member-alipay").val(data.user.alipay);
			})
		},
		query_click: function() {
			$(".mall-click").each(function(i,o){ 
				$this = $(o);
				$click_item = cms_all_config.click_url;
				$click_item = $click_item+"?url="+encodeURIComponent($this.data("url"));
				$click_item = $click_item+"&mall_id="+$this.data("mallid");
				$click_item = $click_item+"&u_id="+$this.data("uid");
				$click_item = $click_item+"&p_id="+$this.data("pid");
				if(cms_all_config.agent_id&&cms_all_config.agent_id!=''){
					$click_item = $click_item+"&a_id="+cms_all_config.agent_id;
				}else{					
					$click_item = $click_item+"&a_id="+$this.data("aid");
				}
				$click_item = $click_item+"&m_id="+cms_all_config.m_id;
				$this.attr("href",$click_item);
			});
		},
		query_agent: function() {
			$.getJSON(cms_all_config.login_url, {
      		   app_id:cms_all_config.app_id,
      		   url_sign:cms_all_config.url_sign,
      		   time:cms_all_config.time,
      		   action:'agent',
      		   'base_url':cms_all_config.base_url,
      		   'cms_host':cms_all_config.cms_host,
			}, function(data){
				if(data!== undefined && data.result!==undefined){
					data = data.result.map; 
				}
				if(data.user_agent&&data.user_agent.agent_url&&data.user_agent.agent_url!=''){
					$("#agent_url").show();
					$("#agent_url .agent_url").html(data.user_agent.agent_url);
				}
			})
		},
	};
});