//appear
//eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(6($){$.4.2=6(e,f){3 g=$.E({8:1c,h:B},f);j k.s(6(){3 t=$(k);t.9=m;5(!e){t.v(\'2\',g.8);j}3 w=$(U);3 c=6(){5(!t.I(\':L\')){t.9=m;j}3 a=w.R();3 b=w.19();3 o=t.G();3 x=o.J;3 y=o.M;5(y+t.F()>=b&&y<=b+w.F()&&x+t.p()>=a&&x<=a+w.p()){5(!t.9)t.v(\'2\',g.8)}q{t.9=m}};3 d=6(){t.9=B;5(g.h){w.1b(\'u\',c);3 i=$.H(c,$.4.2.7);5(i>=0)$.4.2.7.K(i,1)}e.z(k,A)};5(g.h)t.h(\'2\',g.8,d);q t.N(\'2\',g.8,d);w.u(c);$.4.2.7.O(c);(c)()})};$.E($.4.2,{7:[],l:Q,C:6(){3 a=$.4.2.7.S;5(a>0)T(a--)($.4.2.7[a])()},D:6(){5($.4.2.l)V($.4.2.l);$.4.2.l=W($.4.2.C,X)}});$.s([\'Y\',\'Z\',\'10\',\'11\',\'12\',\'13\',\'14\',\'15\',\'16\',\'17\',\'18\',\'P\',\'1a\'],6(i,n){3 a=$.4[n];5(a){$.4[n]=6(){3 r=a.z(k,A);$.4.2.D();j r}}})})(1d);',62,76,'||appear|var|fn|if|function|checks|data|appeared||||||||one||return|this|timeout|false|||width|else||each||scroll|trigger||||apply|arguments|true|checkAll|run|extend|height|offset|inArray|is|left|splice|visible|top|bind|push|show|null|scrollLeft|length|while|window|clearTimeout|setTimeout|20|append|prepend|after|before|attr|removeAttr|addClass|removeClass|toggleClass|remove|css|scrollTop|hide|unbind|undefined|jQuery'.split('|'),0,{}))

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
        dataType:'jsonp', //指定为jsonp类型
        jsonp:'callback',   
        success: function (data) {
        	data = data.result.map;
            if(!config.url_ex&&typeof(dataurl_ex) != "undefined"&&data.status==1){
            	config.url_ex = true;
            	showBtn.attr("data-pageindex","0");
            	pindex = 0;
            	
            	config.isloading = true;
            	config.pindex =  pindex;
            	config.url_ex_loading_count=0;
            	getMoreData(dataurl, databox, autoload,dataurl_ex);
            }
            else if(config.url_ex_pageCount<=pindex||data.status==1){
            	config.url_ex_loading_count=0;
            	$(".list-loading").html("<span><span>暂时没有了哦，过几天有了再来看哈....</span></span>").show();
            }
            else if(config.url_ex&&typeof(dataurl_ex) != "undefined"&&(data.status==1)&&config.url_ex_pageCount>pindex){
            	config.isloading = true;
            	config.pindex =  pindex;
            	if($.trim(data.content)!=''){
                	$('#' + databox).append(data.content);
//                	config.url_ex_loading_count = config.url_ex_loading_count+$boxes.find("img").length;
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
                 if($.trim(data.content)!=''){
                	 $(".yd-selectMenu").show();
                 }
                 config.pindex =  pindex;
                 $('#' + databox).append(data.content);
                 
                 var timeId = new Date().getTime();
                 $(".list-loading").html("<span><i id='"+timeId+"' class='loading-ic'></i><span>小编为您加载中....</span></span>").show();
                 $("img.lazy").lazyload();
//                 $("#"+timeId).appear(function(){
//                	 getMoreData(dataurl, databox, autoload,dataurl_ex);
//				 });
                 config.isloading = true;
            }
        }
    });
}