$(document).ready(function() {
	/*
	// 获取当前网址的参数值
	(function($) {
		$.getUrlParam = function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) 
				return unescape(r[2]);
				
			return null;
		};
	})(jQuery);
	
	// 当前平台
	var platform = $.getUrlParam('pf') ? $.getUrlParam('pf') : 'ios';
	// $('#import-sdk').find('.' + platform).css('display', 'block');
	$('.docs-inner').find('.' + platform).css('display', 'block');
	
	// 根据当前的平台 控制当前 active
	$('#header').find('.main-nav .' + platform).addClass('active').siblings().removeClass('active');
	*/
	
	// 页面点击导航 锚点偏移的问题
	var handler = function(hash) {
		var target = document.getElementById(hash.slice(1));
		if (!target) return;
		
		// 头部导航条高度
    	var headerH = $('#header').height();

		var targetOffset = $(target).offset().top - headerH - 20;
		$('body').animate({scrollTop: targetOffset}, 400);
	};
	$('a[href^=#][href!=#]').click(function() {
		handler(this.hash);
	});
	if(location.hash)
		handler(location.hash);
	
	// tooltip
	$("[data-toggle='tooltip']").tooltip({
		html : true
	});
	
    // 手机版导航条控制
    var mobileNavbar = $('.mobile-navbar-beacon');
    $('#header .navbar-header .navbar-toggle').click(function() {
    	// $('.mobile-navbar-beacon').toggle();
    	if (mobileNavbar.hasClass('bounce-in')) {
			mobileNavbar.removeClass('bounce-in').addClass('bounce-out');
		} else {
			mobileNavbar.removeClass('bounce-out').addClass('bounce-in');
		}
    });
    // 手机版导航条被点击事，隐藏导航条
	$('.mobile-navbar-beacon li:not(.dropdown)').click(function() {
		mobileNavbar.removeClass('bounce-in').addClass('bounce-out');
	});
});
