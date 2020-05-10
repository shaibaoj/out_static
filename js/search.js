
var config = {};
// 加载更多数据
// dataurl： 请求数据对应的地址
// databox : 反回数据后装载到对应的容器
// autoload : 是否自动加载 1为是，0为否
config.isloading = true;
config.pindex=0;
config.url_ex=true;
config.url_ex_pageCount=99;
config.url_ex_loading_count=0;
function getMoreData(dataurl, databox, autoload,dataurl_ex) {
    if (!config.isloading) {
        return false;
    }
    config.isloading = false;
    if (autoload=="undefined"){
        autoload = 0;
    };
    var showBtn = $(".show-more-btn");
    var pnum = Number(showBtn.attr("data-pagenum"));
    var pindex = config.pindex + 1;

    $(".list-loading").show();
    if (config.url_ex&&typeof(dataurl_ex) != "undefined") {
    	dataurl = dataurl_ex;
    }
    $.ajax({
        url: dataurl,
        data: "ipage=" + pindex,
//        dataType:'jsonp',                     //指定为jsonp类型
//        jsonp:'callback',   
        success: function (data) {
            if(!config.url_ex&&typeof(dataurl_ex) != "undefined"&&$.trim(data)==''){
            	config.url_ex = true;
            	showBtn.attr("data-pageindex","0");
            	pindex = 0;
            	
            	config.isloading = true;
            	config.pindex =  pindex;
            	config.url_ex_loading_count=0;
            	getMoreData(dataurl, databox, autoload,dataurl_ex);
            }
            else if(config.url_ex_pageCount<=pindex||$.trim(data)=='1'){
            	config.url_ex_loading_count=0;
            	$(".list-loading").html("<span><span>暂时没有了哦，过几天有了再来看哈....</span></span>").show();
            }
            else if(config.url_ex&&typeof(dataurl_ex) != "undefined"&&config.url_ex_loading_count<10&&($.trim(data)==''||$(data).find("img").length<5)&&config.url_ex_pageCount>pindex){
            	config.isloading = true;
            	config.pindex =  pindex;
            	if($.trim(data)!=''){
                    $boxes = $(data);
                	$('#' + databox).append($boxes);
                	config.url_ex_loading_count = config.url_ex_loading_count+$boxes.find("img").length;
            	}
            	getMoreData(dataurl, databox, autoload,dataurl_ex);
            }
            else{
            	 config.url_ex_loading_count=0;
            	 $(".list-loading").hide();
                 if (pindex < pnum) {
                     $(".show-more-btn").show();
                 }

                 if (autoload) {
                     $(".show-more-btn").hide();
                     if (pindex > pnum) {
                         $(".list-loading").hide();
                     }
                 }
                 if($.trim(data)!=''){
                	 $(".yd-selectMenu").show();
                 }
                 config.pindex =  pindex;
                 $boxes = $(data);
                 $('#' + databox).append($boxes);
                 
                 var timeId = new Date().getTime();
                 $(".list-loading").html("<span><i id='"+timeId+"' class='loading-ic'></i><span>小编为您加载中....</span></span>").show();
                 $("#"+timeId).appear(function(){
                	 getMoreData(dataurl, databox, autoload,dataurl_ex);
				});
                 config.isloading = true;
            }
        }
    });
}