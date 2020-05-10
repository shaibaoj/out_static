function function_exists(){
	if (typeof func_name === 'string') {
		func_name = this.window[func_name];
	}
	return typeof func_name === 'function';
}

function setCookie(name,value) {
	var hour = arguments[2]? arguments[2]: 24;
    var exp = new Date();
    exp.setTime(exp.getTime() + hour*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ';path=/';
}

function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString() + ';path=/';
}

function getRequestQuery(name) {

	var uri = arguments[1] ? arguments[1] : window.location.search;

	var arr = parseURL(uri);
	if (arr['params'])
		return unescape(arr['params'][name]);
	return null;

	/*var uri = arguments[1] ? arguments[1] : window.location.search;
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = uri.substr(1).match(reg);
	console.log( r );
	if (r != null) return unescape(r[2]); return null;*/
}

//全角转换成半角
function SBCcase2Str( str ){
	var tmp = "";
	for(var i=0;i<str.length;i++) {
		if( str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375 ) {
			tmp += String.fromCharCode( str.charCodeAt(i) - 65248);
		} else {
			tmp += String.fromCharCode( str.charCodeAt(i) );
		}
	}
	return tmp;
}

function parseURL(url) {
	var a =  document.createElement('a');
	a.href = url;
	return {
		source: url,
		protocol: a.protocol.replace(':',''),
		host: a.hostname,
		port: a.port,
		query: a.search,
		params: (function(){
			var ret = {},
				seg = a.search.replace(/^\?/,'').split('&'),
				len = seg.length, i = 0, s;
			for (;i<len;i++) {
				if (!seg[i]) { continue; }
				s = seg[i].split('=');
				ret[s[0]] = s[1];
			}
			return ret;
		})(),
		file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
		hash: a.hash.replace('#',''),
		path: a.pathname.replace(/^([^\/])/,'/$1'),
		relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
		segments: a.pathname.replace(/^\//,'').split('/')
	};
}

function getRootNode(node, classname){

	if( !node ) return node;
	if( node.nodeName.toLowerCase() == 'body' ) return node;
	if( classname == '' ) return node;
	if( node.className.indexOf(classname) > -1 ) return node;

	if( node.parentNode.className.indexOf(classname) > -1 )
		return node.parentNode;
	else
		return getRootNode(node.parentNode, classname);
}


//
function loadScript(url, callback){
	callback=callback||function(){};
	var script = document.createElement("script")
	script.type = "text/javascript";
	if (script.readyState){  //IE
		script.onreadystatechange = function(){
			if (script.readyState == "loaded" ||  script.readyState == "complete"){
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {  //Others: Firefox, Safari, Chrome, and Opera
		script.onload = function(){
			callback();
		};
	}
	script.src = url;
	document.body.appendChild(script);
}

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.chinaeseLen = function() {
	var realLength = 0, len = this.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = this.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
			realLength += 0.5;
        else
			realLength += 1;
    }
    return Math.ceil(realLength);
}

//yyyy-MM-dd hh:mm:ss
Date.prototype.format = function(format){

	var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
		"S" : this.getMilliseconds() //millisecond
	}

	if(/(y+)/.test(format))
		format=format.replace(RegExp.$1, (this.getFullYear()+"").substr(4- RegExp.$1.length));

	for(var k in o)
		if( new RegExp("("+ k +")").test(format) )
			format = format.replace(RegExp.$1, RegExp.$1.length==1? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));

	return format;
}

var CommAJAX = {
	Url:'',
	Mask:false,
	Panel:false,
	SendType:'GET',
	DataType:'json',
	Data:'',
	resetAll:function(){
		this.Url = '';
		this.Mask = false;
		this.Panel = false;
		this.SendType = 'GET';
		this.DataType = 'json';
		this.Data = '';
	},
	createUrlData:function( a ) {
		var v = '';
		for( k in a ){
			v = a[k];
			if( v ) this.Data += '&'+ k +'=' + encodeURIComponent( v );
		}
	},
	process:function( CallbackSuccess, CallbackError ){
		if(this.Mask) this.mask();
		$.ajax({
			url: this.Url +'&rand=' + Math.random(),
			data: this.Data,
			type: this.SendType,
			dataType: this.DataType,
			timeout: 5000,
			error: function(data){
				if (typeof(CallbackError) === "function") {
					CallbackError.call(self, data);
				}
				CommAJAX.resetAll();
			},
			success: function(data){
				//console.log(data['checked']);
				if (typeof(CallbackSuccess) === "function") {
					CallbackSuccess.call(self, data);
				}
				CommAJAX.resetAll();
			}
		});
	},
	mask:function(){
		var mask = document.getElementById('pagemasker');
		if( !mask ){
			var mask = document.createElement('div');
			mask.setAttribute('id','pagemasker');
			document.getElementsByTagName('body')[0].appendChild(mask);
		}
		var height = jQuery(document).height() + 'px';
		var width = jQuery(window).width() + 'px';
		jQuery(mask).css({
			'position': 'absolute',
			'z-index': '9990',
			'width': width,
			'height': height,
			'filter': 'alpha(opacity=0.5)',
			'opacity': 0.5,
			'top': 0,
			'left': 0,
			'background': '#CCC',
			'display': 'block'
		});
	},
	closemask:function(){
		var mask = document.getElementById('pagemasker');
		if( !mask ) return;
		mask = jQuery(mask);
		mask.css({'z-index':-9990, 'display':'none'});
		return false
	}
}

// 信息提示
var Dialog = {

	show: function(msg){
		var auto_hide = arguments[1] ? arguments[1] : false;
		var delaytime = arguments[2] ? arguments[2] : 2;
		var html = '';
		var dialog = document.getElementById('id-dialog');
		if( !dialog ){
			height = !auto_hide? 120: 75;
			dialog = document.createElement('div');
			dialog.id = 'id-dialog';
			/*dialog.style = 'position:absolute; top:-999px; left:-999px; width:250px; height:100px;'+
							'background-color:#FFF; border-width: 2px; border-style: solid; border-color: #CCC;'+
							'text-align:center; vertical-align:middle; display:none;';*/
			dialog.style.position = 'absolute';
			dialog.style.top = '-999px';
			dialog.style.left = '-999px';
			dialog.style.width = '318px';
			dialog.style.height = height + 'px';
			dialog.style.backgroundColor = '#FFFFFF';
			dialog.style.border = '1px solid #333';
			dialog.style.textAlign = 'center';
			dialog.style.verticalAlign = 'middle';
			dialog.style.display = 'block';
			dialog.style.zIndex = 999999;

			document.getElementsByTagName('body')[0].appendChild(dialog);
		}
		html = '<div style="position:absolute; width:318px; height:'+ height +'px; line-height:25px; left:0px; top:0px;' +
							'text-align:center;font-weight:bold;margin-top:25px;' +
							'font-size:14px;">' + msg + '</div>'+
                            '<a id="id-dialog_close" class="hpz-gico" style="position: absolute;right: 10px;top: 10px; display: inline-block;width: 14px;height: 14px;background-position: -261px 0"></a>';
		if( !auto_hide ) html += '<div style="position:absolute; width:318px; height:54px; left:0; bottom:0; text-align:center;line-height: 22px;overflow: hidden">' +
							'<a id="id-dialog_sure" style="border: 1px solid #ff3355;border-radius: 2px;display: inline-block;width: 48px;height: 22px;background: #ff3355; color: #ffffff;margin: 0 10px 0 103px; float: left">确定</a>' +
                            '&nbsp;&nbsp;<a id="id-dialog_cannel"  style="border: 1px solid #ddd;border-radius: 2px;display: inline-block;width: 48px;height: 22px;float: left;color: #333;*margin-top:-22px">取消</a></div>';
		dialog.innerHTML = html;
		dialog.style.display = 'block';
		this.setPos('id-dialog');
		//

		if( !auto_hide ){
			document.getElementById('id-dialog_sure').onclick = function(){Dialog.hide()};
			document.getElementById('id-dialog_cannel').onclick = function(){Dialog.hide()};
            document.getElementById('id-dialog_close').onclick = function(){Dialog.hide()};
		} else {
			setTimeout(function(){Dialog.hide();}, delaytime * 1000);
		}
	},

	confirm: function(msg){
		var callback = arguments[1] ? arguments[1] : false;
		var html = '';
		var dialog = document.getElementById('id-dialog');
		if( !dialog ){
			height = 120;
			dialog = document.createElement('div');
			dialog.id = 'id-dialog';
			/*dialog.style = 'position:absolute; top:-999px; left:-999px; width:250px; height:100px;'+
							'background-color:#FFF; border-width: 2px; border-style: solid; border-color: #CCC;'+
							'text-align:center; vertical-align:middle; display:none;';*/
			dialog.style.position = 'absolute';
			dialog.style.top = '-999px';
			dialog.style.left = '-999px';
			dialog.style.width = '250px';
			dialog.style.height = height + 'px';
			dialog.style.backgroundColor = '#FFFFFF';
			dialog.style.border = '2px solid #cccccc';
			dialog.style.textAlign = 'center';
			dialog.style.verticalAlign = 'middle';
			dialog.style.display = 'block';
			dialog.style.zIndex = 999999;

			document.getElementsByTagName('body')[0].appendChild(dialog);
		}
		html = '<div style="position:absolute; width:250px; height:'+ height +'px; line-height:25px; left:0px; top:0px;' +
							'text-align:center;font-weight:bold;margin-top:20px;' +
							'font-size:14px;">' + msg + '</div>';
		html += '<div style="position:absolute; width:250px; height:60px; left:0px; top:95px; text-align:center;">' +
							'<a id="id-dialog_sure">确定</a>&nbsp;&nbsp;<a id="id-dialog_cannel">取消</a></div>';
		dialog.innerHTML = html;
		dialog.style.display = 'block';
		this.setPos('id-dialog');

		document.getElementById('id-dialog_sure').onclick = function(){
			if(typeof callback=='function'){
				callback();
			}
			Dialog.hide();
		};
		document.getElementById('id-dialog_cannel').onclick = function(){
			Dialog.hide();
		};
	},

	hide: function (){
		var dialog = document.getElementById('id-dialog');
		if( dialog ) dialog.style.display = 'none';
	},

	setPos : function (displayid){
		var div = document.getElementById(displayid);
		div.style.display = 'block';

		var screen_h = parseInt(window.innerHeight? window.innerHeight: document.documentElement.offsetHeight);
		var screen_w = parseInt(window.innerWidth? window.innerWidth: document.documentElement.offsetWidth);
		var top = ( screen_h - div.clientHeight ) / 2;
		var left = ( screen_w - div.clientWidth ) / 2;

		var styleInfo = window.getComputedStyle ? window.getComputedStyle(div, "") : div.currentStyle;
		if( styleInfo.position != 'fixed' ){
			var posX, posY;
			if (window.innerHeight) {
				posX = window.pageXOffset;
				posY = window.pageYOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) {
				posX = document.documentElement.scrollLeft;
				posY = document.documentElement.scrollTop;
			} else if (document.body) {
				posX = document.body.scrollLeft;
				posY = document.body.scrollTop;
			}
			top = posY + top;
		}

		div.style.top = top + 'px';
		div.style.left = left + 'px';

		//div.style.top = "30%";
		//div.style.left = "30%";


	}
}

var CountDown = {

	running_time: 0,

	time_today: 0,

	time_curr: 0,

	time_cache: {},

	time_list: {},

	timer: null,

	start: function(){
		//获取服务器当前时间
		var data = PageTime;

		CountDown.time_curr = parseFloat(data[1]);
		CountDown.time_today = parseFloat(data[0]);

		var item_lefttime = $('.t_countdown');
		var lefttime = 0, _tmp = 0;
		var dom = null, pdom = null;

		for( var i=0, length = item_lefttime.size(); i < length; i++ ){
			dom = item_lefttime.eq(i)[0];

			lefttime = parseInt(dom.getAttribute('data-endtime'));
			showtype = parseInt(dom.getAttribute('data-showtype'));
			_tmp = parseInt(dom.getAttribute('data-starttime'));
			if( !isNaN( _tmp ) && _tmp > CountDown.time_curr ) {
				lefttime = _tmp;
				pdom = dom.previousSibling;
				if( pdom && pdom.nodeType == 1 )
					if( pdom.getAttribute('data-title') )
						pdom.innerHTML = pdom.getAttribute('data-title');
			} else if( lefttime < CountDown.time_curr ) {
				pdom = dom.previousSibling;
				if( pdom && pdom.nodeType == 1 )
					if( pdom.getAttribute('data-endtitle') )
						pdom.innerHTML = pdom.getAttribute('data-endtitle');
				continue;
			}

			lefttime = lefttime - CountDown.time_curr;

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
			if( time_left < 0 ) continue;

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


		if( d > 0 )
			_d = left + d + right + '天 ';
		else
			_d = '';

		if( h < 10 )
			_h = '0' + h
		else
			_h = h;

		_h = left + _h + right;

		if( m < 10 )
			_m = '0' + m;
		else
			_m = m;

		_m = left + _m + right;

		if (s < 10 )
			_s = '0' + s;
		else
			_s = s;

		_s = left + _s + right;

		_str = _d + _h + '时' + _m + '分' + _s + '秒';

		dom.innerHTML = _str;

	}

}

var Notify = {

	call: function(){
		
		if( typeof( LazyloadBlock ) != 'undefined' && typeof( LazyloadBlock.resize ) == 'function' ) {
			LazyloadBlock.resize();
			LazyloadBlock.MaxHeight = LazyloadBlock.MaxHeight - 1;
			//LazyloadBlock.loop();
		}

	}

};

(function(){
	var price = '';
	var result = null;
	var items = $('li.val_item_price');
	for( var i=0; i<items.size(); i++ ){
		price = items.eq(i).attr('data-price');
		if( price.indexOf('.') > -1 ) {
			result = price.split('.');
			items.eq(i).find('cite.price_int').html(result[0]);
			items.eq(i).find('em.price_float').html('.' + result[1]);
		} else {
			continue;
		}
	}
})();

var SPageInit = {

	init: function(){
		//
		SPageInit.priceSplit();
		SPageInit.daysLeft();
	},

	TimeLeftNode: {},
	daysLeft: function(){

		//var items = $('span.val_timeleft');
		//var s = 0, e = 0, d = 0;
		//for( var i=0; i<items.size(); i++ ){
		//	s = items.eq(i).attr('data-starttime');
		//	e = items.eq(i).attr('data-endtime');
        //
		//	s = parseInt(s);
		//	e = parseInt(e);
        //
		//	/*TimeLeftNode[i] = {};
		//	TimeLeftNode[i]['node'] = items.eq(i)[0];
		//	TimeLeftNode[i]['time'] = e - s;*/
		//	d = Math.ceil( ( e - s ) / 86400 );
		//	items.eq(i)[0].innerHTML = '剩余'+ d +'天';
        //
		//}

		$(".h-goodsli  span.val_timeleft").each(function(i,e){
			var now = new Date();

			var leftTime=$(this).attr("data-endtime")*1000-PageTime[1]*1000;

			var leftsecond = parseInt(leftTime/1000);
			var day1=Math.floor(leftsecond/60/60/24);
			var hour=Math.floor((leftsecond-day1*24*60*60)/3600);
			var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60);
			var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);
			var day1=day1+1;
			if(leftTime>0){
				$(this).html("剩余"+day1+"天")
			}else{
				$(this).html("剩余0天")
			}
		});

	},

	priceSplit: function(){

		var price = '';
		var result = null;
		var items = $('div.val_item_price');
		for( var i=0; i<items.size(); i++ ){
			price = items.eq(i).attr('data-price');
			if( price.indexOf('.') > -1 ) {
				result = price.split('.');
				items.eq(i).find('em.price_int').html(result[0]);
				items.eq(i).find('span.price_float').html('.' + result[1]);
			} else {
				continue;
			}
		}

	}

}

//
var STATVC = {

	DOMAIN: '',
	request: '',

	EVT_VIEW: 1,
	EVT_CLICK: 2,

	running_time: 0,

	statlist: Array(),

	statnum: {'total':0, 'view':0},

	statpid: {},

	timer: null,

	MaxHeight: -1,

	win: $(window),
	
	loopRunTimes: 0,

	init: function(n_index,workType){
		
		var n_index = n_index== undefined ?0:n_index,
			workType = workType == undefined?1:2;  //workType 加载模式 1默认加载，2为区段加载

		//console.log( getCookie('_stat_uuid') );
		if( getCookie('_stat_uuid') == '' || getCookie('_stat_uuid') == 'undefined' || getCookie('_stat_uuid') == null ){
			setCookie('_stat_uuid', getCookie('PHPSESSID'), 240)
		}
		//console.log( getCookie('_stat_uuid') );
		
		var host = PCfg['site']['host']? PCfg['site']['host']: '';
		STATVC.DOMAIN = (host!='')? ('http://' + host): host;
		//
		if( host == 'm.huipinzhe.com' )
			STATVC.request = '/mob.php?r=app/statwap/save&';
		else
			STATVC.request = '/app/stat/save?';
		//
		STATVC.start(n_index,workType);

	},

    start: function(n,w){

		var pageurl = typeof(PCfg.page['pageurl'])!='undefined'? PCfg.page['pageurl']: __pageurl;
		var pagetitle = typeof(PCfg.page['pagetitle'])!='undefined'? PCfg.page['pagetitle']: __pagetitle;
		var pagekey = typeof(PCfg.page['pagekey'])!='undefined'? PCfg.page['pagekey']: __pagekey;
		var statlist=null;
		if(w==1) statlist = $('.id_stat_vc');
		if(w==2) statlist = $('.h-goodsli');
		var anode = null;
		
		STATVC.statnum['total'] = STATVC.statnum['total'] + statlist.size() - n;
		
		if( STATVC.statnum['total'] <= 0 ) return;

		var _pid = {};
		var disabled = 0, pid = '';
		var length = statlist.size();
		for( var i=n; i<length; i++ ){//for( var i=n; i<STATVC.statnum['total']; i++ ){
			
			if(w == 1) {
				if( typeof(STATVC.statlist[i]) != 'undefined' ) continue;//待优化
			}

			anode = statlist.eq(i);
			pid = anode.attr('data-pid');
			disabled = 0;
			if( _pid[pid] ) disabled = 2;
			_pid[pid] = 1;
			//STATVC.statlist.push({"disabled":disabled, "fulltop":(anode.offset().top + anode.outerHeight()), "top":anode.offset().top, "pageurl":encodeURIComponent(pageurl), "pagetitle":encodeURIComponent(pagetitle), "pid":anode.attr('data-pid'), "cid":anode.attr('data-cid'), "siteid": _iszx_, "type": (_iszx_ + anode.attr('data-type')), "page":pagekey, "starttime":anode.attr('data-start'), "endtime":anode.attr('data-end'), "title":anode.attr('data-title'), "pos":anode.attr('data-pos'), "info":anode.attr('data-info'), "link":encodeURIComponent(anode.attr('data-link')), "imgurl":encodeURIComponent(anode.attr('data-imgurl')) });
			STATVC.statlist.push({"disabled":disabled,
				"fulltop":(anode.offset().top + anode.outerHeight()),
				"top":anode.offset().top, "pageurl":encodeURIComponent(pageurl),
				"pagetitle":encodeURIComponent(pagetitle), "pid":anode.attr('data-pid'),
				"cid":anode.attr('data-cid'), "siteid": _iszx_, "type": anode.attr('data-type'),
				"page":pagekey, "starttime":anode.attr('data-start'), "endtime":anode.attr('data-end'),
				"title":anode.attr('data-title'), "pos":anode.attr('data-pos'), "info":anode.attr('data-info'),
				"link":encodeURIComponent(anode.attr('data-link')),
				"imgurl":encodeURIComponent(anode.attr('data-imgurl')) });
		}

		//
		if( STATVC.loopRunTimes == 0 ){
			STATVC.loop();
			STATVC.win.scroll(function() {
				STATVC.loop();
			});
			STATVC.loopRunTimes = 1;
		}

		//
		$('.id_stat_c').unbind("click").click(function() {
			STATVC.stat(STATVC.EVT_CLICK, this);
		});
		
		if( STATVC.timer == null ){
			STATVC.timer = setInterval( function(){STATVC.stat(STATVC.EVT_VIEW);}, 1000);
		}
		//setInterval( function(){timeleft.tormorrowTimeleft();}, 1000);
	},



	loop: function(){
		var height = STATVC.win.scrollTop();
		var screenheight = STATVC.win.height();
		
		// 
		if( height <= STATVC.MaxHeight ) return;
		STATVC.MaxHeight = height;

		var anode = null;
		for( var i=0; i<STATVC.statnum['total']; i++ ){
			var anode = STATVC.statlist[i];
			//console.log( height, anode['fulltop'], screenheight, anode['top'], anode['disabled'] );
			if( ( height > anode['fulltop'] ) || ( (height+screenheight) < anode['top'] ) || anode['disabled'] ) continue;
			STATVC.statlist[i]['disabled'] = 1;

		}
	},

	stat: function(evt){

		if( !evt ) return;

		var anode = null;
		var data = {};
		var count = 0;

		switch( evt ){
			case STATVC.EVT_VIEW:
				for( var i=0; i<STATVC.statnum['total']; i++ ){
					anode = STATVC.statlist[i];
					if( anode['disabled'] == 1 ) {
						STATVC.statlist[i]['disabled'] = 2;
						//anode['type'] = _iszx_ + anode['type'];
						data[i] = anode;
						count+=1;
					}
				}
				break;

			case STATVC.EVT_CLICK:
				var _this = arguments[1] ? arguments[1] : null;

				if( !_this ) return;
				var aclick = STATVC.getRoot(_this);

				for( var i=0; i<STATVC.statnum['total']; i++ ){
					anode = STATVC.statlist[i];
					if( anode['disabled'] != 3 && anode['pid'] == parseInt( aclick.getAttribute('data-pid') ) && !STATVC.statpid[anode['pid']] ) {
						STATVC.statpid[anode['pid']]=1;
						STATVC.statlist[i]['disabled'] = 3;
						//anode['type'] = _iszx_ + anode['type'];
						data[i] = anode;
						count+=1;
						break;
					}
				}
				break;

		}

		if( count > 0 ){

			if( !ajaxprocess ) return;
			ajaxprocess = false;

			$.ajax({
				url : STATVC.DOMAIN + STATVC.request + 'k=event_' + evt + '&_=' + Math.random(),
				type : 'POST',
				data :'data=' + JSON.stringify(data),
				dataType : 'json',
				timeout:3000,
				success:function(data) {
					ajaxprocess = true;
				},
				error: function(){
					ajaxprocess = true;
				}
        	})

		}
	},

	getRoot: function(node){
		if( node.className.indexOf('id_stat_vc') > -1 ){
			return node;
		} else {
			return STATVC.getRoot(node.parentNode);
		}
		/*if( node.className.indexOf('id_stat_vc') > -1 ){
			return node;
		} else if( node.parentNode.className.indexOf('id_stat_vc') > -1 )
			return node.parentNode;
		else
			return STATVC.getRoot(node.parentNode);*/
	}
}


//连动
function gradeLD(array) {
	// 数组，联动的数据源
	this.array = array;
	this.indexName = '';
	this.obj = '';
	this.showall = false;
	// 设置子SELECT
	// 参数：当前onchange的SELECT ID，要设置的SELECT ID
	this.subSelectChange = function(selectName1, selectName2) {
		var obj1 = document.all[selectName1];
		var obj2 = document.all[selectName2];
		var objName = this.toString();
		var me = this;
		obj1.onchange = function() {
			me.optionChange(this.options[this.selectedIndex].value, obj2.id)
		}
	}
	// 设置第一个SELECT
	// 参数：indexName指选中项,selectName指select的ID
	this.firstSelectChange = function(indexName, selectName) {
		var foption = '请选择';
		if( arguments[2] ) foption = arguments[2];

		this.obj = document.all[selectName];
		this.indexName = indexName;
		this.optionChange(this.indexName, this.obj.id, foption)
	}
	// indexName指选中项,selectName指select的ID
	this.optionChange = function(indexName, selectName, foption) {
		var obj1 = document.all[selectName];
		var me = this;
		obj1.length = 0;
		obj1.options[0] = new Option(foption, '');

		for (var i = 0; i < this.array.length; i++) {

			if(this.showall) {
				if(indexName == 0 && this.array[i][1] !== 0) {
					obj1.options[obj1.length] = new Option(this.array[i][2], this.array[i][0]);
				} else if (indexName != 0 && this.array[i][1] == indexName) {
					obj1.options[obj1.length] = new Option(this.array[i][2], this.array[i][0]);
				}
			} else  {
				if (this.array[i][1] == indexName) {
					obj1.options[obj1.length] = new Option(this.array[i][2], this.array[i][0]);
				}
			}

		}
	}
	// showall 请选择情况下默认子类目显示全部
	this.init = function( selectName1, selectName2, index1, index2, showall ){

		if(showall) {
			this.showall = true;
		}

		if( index1 == 0 && this.showall !== true ) return;

		var obj1 = document.all[selectName1];
		var obj2 = document.all[selectName2];
		var i = 0;

		for( i=0; i<obj1.length; i++ ){
			if( parseInt(obj1.options[i].value) == index1 ){
				obj1.options[i].selected = true;
				break;
			}
		}

		this.optionChange(index1, obj2.id);

		if( index2 == 0 ) return;

		for( i=0; i<obj2.length; i++ ){
			if( parseInt(obj2.options[i].value) == index2 ){
				obj2.options[i].selected = true;
				break;
			}
		}
	}
}


/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));





