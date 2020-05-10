// JavaScript Document
$(function() {
	//图片切换
	$(".thumb-cont-inner li").hover(function(){
		$(".thumb-cont-inner li").removeClass("active");
		$(this).addClass("active");
		src= $(this).find("img").attr("src");
		if(src){
			$(".main-img-cont img").attr("src",src.replace(/_60x60/,"_440x440"));
		}
	});

	$("#bili").hover(function(){
		layer.tips('佣金比例 x 分成比例 = 最终比例', '#bili', {tips: [1, '#3bb4f2'],time: 5000});
    },function() {});

    var $items = function() {
        var scr = $(document).scrollTop();
        if( scr < $(".bady-part").offset().top-5){
            $("#bady-tab").removeClass("fixed hui-fadeinT");
            $(".bady-part .information,.bady-part .bady_info").css("padding-top",0);
            $(".gobuy").hide();
        }else{
            $("#bady-tab").addClass("fixed hui-fadeinT");
            $(".gobuy").show();
           
        }
        var i = $(".bady-part .information").size()-1;
        for(i=i;i>0;i--){
            if($(".bady-part .information").eq(i).offset().top-$(".bady-tab").height() <= scr){
                break;
            }
        }
        $(".bady-part .bady-tab a").removeClass("active").eq(i).addClass("active");
        i == 0?$(".bady-part .size_info").show():$(".bady-part .size_info").hide();
    };
    $(window).bind("scroll", $items);
    $items();
    $(window).scrollTop(0);
    $(".bady-tab li").each(function(k){
        $(this).is(":hidden") && $(this).remove() && $(".bady-part .information").eq(k).remove();
    });
    $(".bady-tab .size_info a").each(function(k){
        $(this).is(":hidden") && $(this).remove() && $(".bady-part .bady_info").eq(k).remove();
    });
    $(".bady-tab li").click(function(){
        if($(this).hasClass("active")) return;
        $(this).index() == 0?$(".bady-part .size_info").show():$(".bady-part .size_info").hide();
        $(".bady-part .information").css("padding-top",0).eq($(this).index()).css("padding-top",$(this).index() == 0?$(".bady-tab").height()+10:$(".bady-tab").height());
        $('body,html').animate({scrollTop:$(".bady-part .information").eq($(this).index()).offset().top},300);
    });
	
	$(window).load(function() {
		$('#container').highcharts({
			chart: {
				plotBorderColor: '#E6E6E6',
				plotBorderWidth: 1
			},
			exporting: {
				enabled: true
			},
			plotOptions: {
				series: {
					shadow: false,
					lineWidth: 2
				}
			},
			title: {
				text: ''
			},
			colors: ['#ff8200'],
			xAxis: {
				type: 'datetime',
				title: {
					text: null
				},
				labels: {
					formatter: function() {
						var vDate=new Date(this.value);
						return (vDate.getMonth()+1)+"/"+vDate.getDate(); 
					},
					align: 'center'
				},
				lineWidth: 0,
				tickColor: '#E6E6E6',
				tickWidth: 1,
				tickLength: 5,
				gridLineWidth: 1,
				gridLineColor: '#E6E6E6'
			},
			yAxis: {
				title: {
					text: null
				},
				gridLineColor: '#E6E6E6'
       		},
			tooltip: {
				borderWidth: 0,
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
				borderRadius: 8,
				shadow: false,
				style: {
					color:'#fff'
				},
				formatter: function() {
					return '日期：' + Highcharts.dateFormat('%Y/%m/%d', this.x) + '<br/>' + this.series.name + '：¥' + this.y;
				}
			},
			legend: {
				enabled: false
			},
			series: [{
				name: '价格',
				data: getData()
			}],
		});
	});
});


function getData(){
    var jsonData='';
    var iid=$('#container').attr('data-iid');
    $.ajax({
        type: 'POST',
        url: URLPrefix.taoke_url+'/ajax.php?action=zoushi',
        data: {'num_iid' : iid},
        async: false,
        cache: false,
        dataType: 'json',
        success: function(data){
            jsonData = data.result.map.item.priceHistory;
			$('#PricePoint').html(data.result.map.item.PricePoint);
        }
    });
    return jsonData;
}