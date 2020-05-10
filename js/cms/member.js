
(function($) {
	var base = {
		init: function() {
            var _this = this;
        },
        query_order: function() {
        	$.post(cms_config.s+"/cms/member/order/list", {
      		   	app_id:cms_config.app_id,
      		   	url_sign:cms_config.url_sign,
				time:cms_config.time,
				// orders: '1', 
				// maxMoney: 0.01,
				page_platform:'cms', 
				hpt_token:window.localStorage.getItem('token'), 
      		    action:'member',
			}, function(data){

				var html_list = '';
				if(data.data.items){
					$.each(data.data.items, function(i,item){
						html_list= html_list+"<li><div><span>"+item.create_date+"</span><span>"+item.money+"元</span><span>"+item.points+"</span><span>"+item.status_name+"</span><span>"+item.memo+"</span></div></li>";
					});
				}		
				$("#member_list").html(html_list);
			})
		},
		query_point: function() {
			$.post(cms_config.s+"/cms/member/point/list", {
      		   app_id:cms_config.app_id,
      		   url_sign:cms_config.url_sign,
				 time:cms_config.time,
				 maxPoints: 0.01,
      		   action:'point',
				 page_platform:'cms', 
				 hpt_token:window.localStorage.getItem('token'), 
			}, function(data){
				var html_list = '';
				if(data.data.items){
					$.each(data.data.items, function(i,item){
						html_list= html_list+"<li><div><span>"+item.create_date+"</span><span>"+item.points+"</span><span>"+item.status_name+"</span><span>"+item.pay_memo+"</span></div></li>";
					});
				}		
				$("#member_list").html(html_list);
			})
		},
		query_cash: function() {
        	$.post(cms_config.s+"/cms/member/payment/list", {
      		   app_id:cms_config.app_id,
      		   url_sign:cms_config.url_sign,
      		   time:cms_config.time,
      		   action:'cash',
				 page_platform:'cms', 
				 hpt_token:window.localStorage.getItem('token'), 
			}, function(data){
				var html_list = '';
				if(data.data.items){
					$.each(data.data.items, function(i,item){
						html_list= html_list+"<li><div><span>"+item.create_date+"</span><span>"+item.money+"元</span><span>"+item.status_name+"</span><span>"+item.pay_memo+"</span></div></li>";
					});
				}		
				$("#member_list").html(html_list);
			})
		},
		query_click: function() {
			$(".mall-click").each(function(i,o){ 
				$this = $(o);
				$click_item = cms_config.click_url;
				$click_item = $click_item+"?url="+encodeURIComponent($this.data("url"));
				$click_item = $click_item+"&mall_id="+$this.data("mallid");
				$click_item = $click_item+"&u_id="+$this.data("uid");
				$click_item = $click_item+"&p_id="+$this.data("pid");
				if(cms_config.agent_id&&cms_config.agent_id!=''){
					$click_item = $click_item+"&a_id="+cms_config.agent_id;
				}else{					
					$click_item = $click_item+"&a_id="+$this.data("aid");
				}
				$click_item = $click_item+"&m_id="+cms_config.m_id;
				$this.attr("href",$click_item);
			});
		},
		query_agent: function() {
        	$.post(cms_config.login_url, {
      		   app_id:cms_config.app_id,
      		   url_sign:cms_config.url_sign,
      		   time:cms_config.time,
      		   action:'agent',
				page_platform:'cms', 
				hpt_token:window.localStorage.getItem('token'), 
      		   'base_url':cms_config.base_url,
      		   'cms_host':cms_config.cms_host,
			}, function(data){
				if(data.user_agent&&data.user_agent.agent_url&&data.user_agent.agent_url!=''){
					$("#agent_url").show();
					$("#agent_url .agent_url").html(data.user_agent.agent_url);
				}
			})
		},
	}
	window.HPT_MEMBER = base;
	window.HPT_MEMBER.init();
})(jQuery);


$(function(){
   $.post(cms_config.s+"/cms/member/member/info", {
	   app_id:cms_config.app_id,
	   url_sign:cms_config.url_sign,
	   time:cms_config.time,
	   ag_id:$("#member_agent_id").val(),
	   hpt_token:window.localStorage.getItem('token'), 
	   page_platform:'cms', 
	   action:'info'
   }, function(data){
	   if(data.data.user.id){	
		   $(".app_member_login").hide();
		   $(".app_member").show();
		   cms_config.m_id = data.data.user.id;
	   }else{
		$(".app_member_login").show();
		$(".app_member").hide();
	   }
	   if(data.data.user_data){	
			if($("#member_money").length>0){
				$("#member_money").html(data.data.user_data.money);
			}
			if($("#member_money_available").length>0){
				$("#member_money_available").html(data.data.user_data.money_available);
			}

			if($("#member_points").length>0){
				$("#member_points").html(data.data.user_data.points);
			}
			if($("#member_points_available").length>0){
				$("#member_points_available").html(data.data.user_data.points_available);
			}		
		}
		if($("#member-qq").length>0){
			$("#member-qq").val(data.data.user.qq);
		}
		if($("#member-email").length>0){
			$("#member-email").val(data.data.user.email);
		}
		if($("#member-mobile").length>0){
			$("#member-mobile").val(data.data.user.mobile);
		}
		if($("#member-alipay").length>0){
			$("#member-alipay").val(data.data.user.alipay);
		}

	//    if(data.result.map.ag_id&&data.result.map.ag_id!=''){
	// 	   cms_config.agent_id = data.result.map.ag_id;
	//    }
	   HPT_MEMBER.query_click();
   });
   
});


$(function() {
   $('#btn-register').click(function () {
	$.post(cms_config.s+"/cms/register/get_token", {
		   app_id:cms_config.app_id,
		   url_sign:cms_config.url_sign,
		   time:cms_config.time,
		   action:'register',
		   user_name:$('#user_name').val(),
		   passwd:$('#password').val(),
		   qq:$('#qq').val(),
		   mobile:$('#mobile').val(),
		   email:$('#email').val(),
		   page_platform:'cms', 
		//    hpt_token:window.localStorage.getItem('token'), 
	   }, function(data){
		   if(data.info.status == 0){
			localStorage.setItem('token', data.data.token)
			   window.location.href=cms_config.base_url;
		   }else{
			   $('#user_name_warn').html('<strong class="error "></strong><p class="msg_error">'+data.info.status_err+'</p>');
		   }
	   });        
    });
   
   $('#btn-login').click(function () {
	$.post(cms_config.s+"/cms/token/login", {
		   app_id:cms_config.app_id,
		   url_sign:cms_config.url_sign,
		   time:cms_config.time,
		   action:'login',
		   username:$('#user_name').val(),
		   password:$('#password').val(),
		   page_platform:'cms', 
		//    hpt_token:window.localStorage.getItem('token'), 
	   }, function(data){
		   if(data.info.status == 0){
				localStorage.setItem('token', data.data.token)
				window.location.href = cms_config.base_url;
		   }else{
			   $('#user_name_warn').html('<strong class="error "></strong><p class="msg_error">'+data.info.status_err+'</p>');
		   }
	   });        
    });
   
   $('#btn_logout').click(function () {
		window.localStorage.removeItem('token')
		window.location.href=cms_config.base_url;    
    });
   
   $('.tb-btn').click(function () {
	$.post(cms_config.s+"/cms/member/order/input", {
		   app_id:cms_config.app_id,
		   url_sign:cms_config.url_sign,
		   time:cms_config.time,
		   action:'input_taobao_order',
		   order_no:$('#activate-code').val(),
		   page_platform:'cms', 
		   hpt_token:window.localStorage.getItem('token'), 
	   }, function(data){
		   if(data.info.status == 0){
			   $('.coupon-active>.err').html(data.info.status_err).css("color","#5eb95e").show();
			   $('#activate-code').val('');
			   HPT_MEMBER.query_order();
		   }else{
			   $('.coupon-active>.err').html(data.info.status_err).css("color","#ff464e").show();
		   }
	   });    
    });
   
   $('.payment-btn').click(function () {
	$.post(cms_config.s+"/cms/member/payment/payment", {
		   app_id:cms_config.app_id,
		   url_sign:cms_config.url_sign,
		   time:cms_config.time,
		   action:'input_payment_money',
		   input_payment_money:$('#money-code').val(),
		   page_platform:'cms', 
		   hpt_token:window.localStorage.getItem('token'), 
	   }, function(data){
		   if(data.info.status == 0){
			   $('.coupon-active>.err').html(data.info.status_err).css("color","#5eb95e").show();
			   $('#money-code').val('');
			   HPT_MEMBER.query_cash();
		   }else{
			   $('.coupon-active>.err').html(data.info.status_err).css("color","#ff464e").show();
		   }
	   });    
    });
   
   $('.exchange-btn').click(function () {
	   $.post(cms_config.s+"/cms/member/point/exchange", {
		   app_id:cms_config.app_id,
		   url_sign:cms_config.url_sign,
		   time:cms_config.time,
		   action:'input_exchange_points',
		   input_exchange_points:$('#point-code').val(),
		   page_platform:'cms', 
		   hpt_token:window.localStorage.getItem('token'), 
	   }, function(data){
		   if(data.info.status == 0){
			   $('.coupon-active>.err').html(data.info.status_err).css("color","#5eb95e").show();
			   $('#point-code').val('');
			   HPT_MEMBER.query_point();
		   }else{
			   $('.coupon-active>.err').html(data.info.status_err).css("color","#ff464e").show();
		   }
	   });    
    });
   
   $('.setting-btn').click(function () {
	$.post(cms_config.s+"/cms/member/info/change_all", {
		   app_id:cms_config.app_id,
		   url_sign:cms_config.url_sign,
		   time:cms_config.time,
		   action:'input_setting',
		   email:$('#member-email').val(),
		   qq:$('#member-qq').val(),
		   mobile:$('#member-mobile').val(),
		   alipay:$('#member-alipay').val(),
		   passwd:$('#member-passwd').val(),
		   payee_name:$('#member-payee_name').val(),
		   page_platform:'cms', 
		   hpt_token:window.localStorage.getItem('token'), 
	   }, function(data){
		   if(data.info.status == 0){
			   $('#err').html(data.info.status_err).css("color","#5eb95e").show();
			   $('#point-passwd').val('');
//			   HPT_MEMBER.query_setting();
		   }else{
			   $('#err').html(data.info.status_err).css("color","#ff464e").show();
		   }
	   });    
    });
   
   $('.passwd-btn').click(function () {
	$.post(cms_config.s+"/cms/member/info/change_password", {
		   app_id:cms_config.app_id,
		   url_sign:cms_config.url_sign,
		   time:cms_config.time,
		   action:'input_passwd',
		   new_passwd:$('#member-passwd-new').val(),
		   passwd:$('#member-passwd').val(),
		   page_platform:'cms', 
		   hpt_token:window.localStorage.getItem('token'), 
	   }, function(data){
		   if(data.info.status == 0){
			   $('#err').html(data.info.status_err).css("color","#5eb95e").show();
			   $('#point-passwd').val('');
		   }else{
			   $('#err').html(data.info.status_err).css("color","#ff464e").show();
		   }
	   });    
    });
   
   if($("#member_home").length>0){
	   HPT_MEMBER.query_order();
	   HPT_MEMBER.query_agent();
   }
   if($("#member_point").length>0){
	   HPT_MEMBER.query_point();
   }
   if($("#member_cash").length>0){
	   HPT_MEMBER.query_cash();
   }
   
});