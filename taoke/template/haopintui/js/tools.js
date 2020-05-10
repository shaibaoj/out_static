function t(t, e, o, n, i) {
    function r() {
        $(".left-part dl dt").removeClass("dt-selected"),
        e.addClass("dt-selected"),
        $(".left-part dl dt").find(".red-bg").hide(),
        t.show(),
        "none" === o.css("display") ? (o.slideDown(200), n.html("&#xe630;")) : (o.slideUp(200), n.html("&#xe642;"))
    }
    if (e.is(".dt-selected")) {
        if (0 === e.find("a").length) return void r()
    } else if (0 === e.find("a").length) return void r(); (0 === e.find("a").length || i) && i && r()
}
$(".left-part dl dt .dt-arrow").click(function(e) {
    e.stopPropagation();
    var o = $(this).siblings(".red-bg");
    0 === o.length && (o = $(this).parent().siblings(".red-bg"));
    var n = $(this).parent("dt");
    0 === n.length && (n = $(this).parent().parent("dt"));
    var i = n.next(".sub-nav"),
    r = $(this);
    t(o, n, i, r, !0)
}),
$(".left-part dl dt").on("click",function() {
    var e = $(this).find(".red-bg"),
        o = $(this),
        n = $(this).next(".sub-nav"),
        i = $(this).find(".dt-arrow");
    t(e, o, n, i, !1)
}),
$(".left-part dl dd").click(function() {
    $(".left-part dl dd").removeClass("dd-selected"),
    $(this).addClass("dd-selected")
}),
$(".left-part dl dt").next(".sub-nav").hide(),
$(".left-part dl .dd-selected").parent(".sub-nav").show(),
$(".left-part dl .dt-selected").next(".sub-nav").show(),
$(".left-part dl dt").find(".dt-arrow").html("&#xe642;"),
$(".left-part dl .dt-selected").find(".dt-arrow").html("&#xe630;")
function toolImgup(num){
        $("#tool-itempic #liact"+num).siblings('li').removeClass('active');// 删除其他兄弟元素的样式
        $("#liact"+num).addClass('active');// 添加当前元素的样式
        var itempic = $("#itempic"+num).attr('src');
        var picreg=/_30x30.jpg/g;
        var picurls = itempic.replace(picreg,'');
        itempic = itempic.replace(picreg,'_400x400.jpg');
//        itempic = itempic.replace(picreg,'');
        var picUrlsout = itempic;
        var itemiid = $("#itemiid").val();
        $.ajax({
            url: URLPrefix.taoke_url+g_config.ajax_urls.get('user_ajax'),
            type: 'get',
            data:{entity:'pic',picurl:picUrlsout},
            dataType: 'json',
            async: true,
            success: function(data){
            	if(data!== undefined && data.result!==undefined){
					data = data.result.map; 
				}
                picUrlsout = data.items.picurl;
                var result = $("#result").html();
                var reg=/<img src=".*?">/g;
                result = result.replace(reg,'<img src="'+picUrlsout+'">');
                $("#result").html(result);
            }
        });
}
function toolClipboar(){
    var clipboard = new Clipboard('.tool-copy', {
        target: function(){
            return document.querySelector('#result');
        }
    });
    clipboard.on('success', function(e) {
        return layer.msg('恭喜，复制成功！', {icon: 1});
//        layer.tips('复制成功', '.copy-copywriting-btn', {
//            tips: [1, '#f95c68'] //还可配置颜色
//        });
        return true;
    });
    clipboard.on('error', function(e) {
        return layer.msg('您的浏览器不支持一键复制，请升级浏览器或更换浏览器', {icon: 2});
    });
}
function toolClear(){
    $('#linkQuery').val('');
}

function toolGenerate(){
    $('#wenanbtn').attr('disabled','disabled');
    $('#wenanbtn').text('文案生成中,请稍候...');
    var linkQuery = $('#linkQuery').val();
    var pidnumin = $('#pidnumin').val();
    var dx = $('input[name="dx"]').prop("checked")?"1":"";
    if(pidnumin!='0' && pidnumin!='' && pidnumin!=null){
        $.ajax({
            url: g_config.ajax_urls.get('user_tools'),
            type: 'POST',
            data:{ajax:1,content:linkQuery,pid:pidnumin,dx:dx},
            dataType: 'json',
            success: function(data){
            	if(data!== undefined && data.result!==undefined){
					data = data.result.map; 
				}
                if(data.status=='1'){
//                    $("#itemiid").val(data.toolhtml.outCode.itemid);
                    var toolimg = '';
                    for (i=0; i<data.item.images_count;i++) {
                        if(i=='0'){
                            toolimg = '<li class="fadein active" id="liact'+i+'"><a href="javascript:;" onclick="return toolImgup('+i+');" rel="nofollow"><img src="'+data.item.images[i]+'_30x30.jpg" id="itempic'+i+'"></a></li>';
                        }else{
                        	toolimg = toolimg+'<li class="fadein" id="liact'+i+'"><a href="javascript:;" onclick="return toolImgup('+i+');" rel="nofollow"><img src="'+data.item.images[i]+'_30x30.jpg" id="itempic'+i+'"></a></li>';
                        }
                    };
                    $("#tool-itempic").html(toolimg);
//                    var toolhtml = '<img id="wenpic" src="'+data.toolhtml.Itemuland.data.picUrls+'"><br>复制这条消息,打开👉手机淘宝👈<br>即可查看【'+data.toolhtml.Itemuland.data.title+'】<br>原价'+data.toolhtml.Itemuland.data.Price+'元，优惠卷'+data.toolhtml.Itemuland.data.amount+'元，券后'+data.toolhtml.Itemuland.data.couponprice+'元 '+data.toolhtml.taoKoLing.model;
                    $('#result').html(data.copywriting);
                   layer.msg('恭喜，生成已成功！', {icon: 1});
                }else if(data.status=='0'){
                    layer.msg(data.status_err, {icon: 2});
                }
                $('#wenanbtn').removeAttr('disabled');
                $('#wenanbtn').text('生成文案');
            }
        });
    }else{
        layer.msg('抱歉，未检测到PID,请先设置PID！', {icon: 2});
        $('#wenanbtn').removeAttr('disabled');
        $('#wenanbtn').text('生成文案');
    }
}


(function($) {
	var base = {
		init: function() {
            var _this = this;
        },
        pid_list: function() {
			$.getJSON(URLPrefix.taoke_url+g_config.ajax_urls.get('user_ajax'), {
				entity:'pid',
			}, function(data){
				$("#pidnumin").html('');
				var html="";
				if(data!== undefined && data.result!==undefined){
					data = data.result.map; 
				}
				var id = '';
				var pid = '';
				if(data.items){
					$.each(data.items, function(i,item){
						id = (item.user_pid_id!=null?item.user_pid_id:'');
						pid = (item.pid!=null?item.pid:'');
						html = html+'<option value="'+(item.user_pid_id!=null?item.user_pid_id:'')+'" '+(item.selected!=null&&item.selected=='1'?' selected':'')+'>'+(item.pid_name!=null?item.pid_name:'')+'</option>';
					});
				}		
				$("#pidnumin").html(html);
			})
		}
	}
	window.HPT = base;
	window.HPT.init();
})(jQuery);
$(function() {
   HPT.pid_list();
});