$(function(){Vue.use(VueLazyload,{error:"",loading:loadImage});var a=new Vue({el:"#every",data:{spDataLen:data.top_show.length,spData:data.top_show,nowTime:data.this_show_time,nowData:data.show_data[data.this_show_time],nowTimes:data.now_time,noStart:!1},methods:{jump:function(t,a){this.nowData=data.show_data[t],$(".swiper-slide").find("div").removeClass("act"),$(".swiper-slide[data-time='"+t+"']").find("div").addClass("act"),this.nowTime!==t?$(".super_list").hide():0<this.spDataLen&&$(".super_list").show();for(var i=0;i<this.nowData.length;i++)$(".line").eq(i).attr("data-type1",this.nowData[i].hd_leixing);this.noStart=0!==a},linkUrl:function(t,a){window.open(t+a)},time_list:function(){var t=this;setInterval(function(){var a=0;if(0<t.spData.length){for(var i=0;i<t.spData.length;i++)--t.spData[i].un_progress_bar,t.spData[i].un_progress_bar+=1;t.nowTimes+=1,a=1}if(void 0!==t.nowData){if(0<t.nowData.length)for(var e=0;e<t.nowData.length;e++)--t.nowData[e].un_progress_bar,t.nowData[e].un_progress_bar+=1;0==a&&(t.nowTimes+=1)}},1e3)}},filters:{time_sort:function(t,a){if((t-=Date.parse(new Date)/1e3)<=0)return"限时优惠已结束";var s=null,n=(Math.floor(t/60/60/24),Math.floor(t/60/60%24)),o=Math.floor(t/60%60);return(n=n<10?"0"+n:n)+" : "+(o=o<10?"0"+o:o)+" : "+(s=(s=Math.floor(t%60))<10?"0"+s:s)},int:function(t){return parseInt(t)+"%"}},mounted:function(){this.time_list()},updated:function(){this.$nextTick(function(){})}}),a=$(".swiper-slide[data-time='"+a.nowTime+"']").index(),i=new Swiper(".swiper-container",{direction:"horizontal",slidesPerView:8,initialSlide:a,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{slideChange:function(){this.isEnd?$(".swiper-button-next").animate({marginRight:"-40px"},200):$(".swiper-button-next").animate({marginRight:"0"},200),this.activeIndex<1?$(".swiper-button-prev").animate({marginLeft:"-40px"},300):$(".swiper-button-prev").animate({marginLeft:"0"},300)}}});$(".swiper-slide").click(function(){i.slideTo(parseInt(i.clickedIndex-3),1e3,!1)}),$(window).scroll(function(){170<$(window).scrollTop()?($(".fix_bar").addClass("fixed"),$(".top_block").css("marginTop","110px")):($(".fix_bar").removeClass("fixed"),$(".top_block").css("marginTop",0))})});