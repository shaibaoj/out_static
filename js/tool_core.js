/** Lazy Load - jQuery plugin for lazy loading images*/
(function(a,b){$window=a(b),a.fn.lazyload=function(c){function f(){var b=0;d.each(function(){var c=a(this);if(e.skip_invisible&&!c.is(":visible"))return;if(!a.abovethetop(this,e)&&!a.leftofbegin(this,e))if(!a.belowthefold(this,e)&&!a.rightoffold(this,e))c.trigger("appear");else if(++b>e.failure_limit)return!1})}var d=this,e={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null};return c&&(undefined!==c.failurelimit&&(c.failure_limit=c.failurelimit,delete c.failurelimit),undefined!==c.effectspeed&&(c.effect_speed=c.effectspeed,delete c.effectspeed),a.extend(e,c)),$container=e.container===undefined||e.container===b?$window:a(e.container),0===e.event.indexOf("scroll")&&$container.bind(e.event,function(a){return f()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,c.one("appear",function(){if(!this.loaded){if(e.appear){var f=d.length;e.appear.call(b,f,e)}a("<img />").bind("load",function(){c.hide().attr("src",c.data(e.data_attribute))[e.effect](e.effect_speed),b.loaded=!0;var f=a.grep(d,function(a){return!a.loaded});d=a(f);if(e.load){var g=d.length;e.load.call(b,g,e)}}).attr("src",c.data(e.data_attribute))}}),0!==e.event.indexOf("scroll")&&c.bind(e.event,function(a){b.loaded||c.trigger("appear")})}),$window.bind("resize",function(a){f()}),f(),this},a.belowthefold=function(c,d){var e;return d.container===undefined||d.container===b?e=$window.height()+$window.scrollTop():e=$container.offset().top+$container.height(),e<=a(c).offset().top-d.threshold},a.rightoffold=function(c,d){var e;return d.container===undefined||d.container===b?e=$window.width()+$window.scrollLeft():e=$container.offset().left+$container.width(),e<=a(c).offset().left-d.threshold},a.abovethetop=function(c,d){var e;return d.container===undefined||d.container===b?e=$window.scrollTop():e=$container.offset().top,e>=a(c).offset().top+d.threshold+a(c).height()},a.leftofbegin=function(c,d){var e;return d.container===undefined||d.container===b?e=$window.scrollLeft():e=$container.offset().left,e>=a(c).offset().left+d.threshold+a(c).width()},a.inviewport=function(b,c){return!a.rightofscreen(b,c)&&!a.leftofscreen(b,c)&&!a.belowthefold(b,c)&&!a.abovethetop(b,c)},a.extend(a.expr[":"],{"below-the-fold":function(c){return a.belowthefold(c,{threshold:0,container:b})},"above-the-top":function(c){return!a.belowthefold(c,{threshold:0,container:b})},"right-of-screen":function(c){return a.rightoffold(c,{threshold:0,container:b})},"left-of-screen":function(c){return!a.rightoffold(c,{threshold:0,container:b})},"in-viewport":function(c){return!a.inviewport(c,{threshold:0,container:b})},"above-the-fold":function(c){return!a.belowthefold(c,{threshold:0,container:b})},"right-of-fold":function(c){return a.rightoffold(c,{threshold:0,container:b})},"left-of-fold":function(c){return!a.rightoffold(c,{threshold:0,container:b})}})})(jQuery,window)
/** Cookie - jQuery plugin for cookie*/
jQuery.cookie=function(name,value,options){if(typeof value!="undefined"){options=options||{};if(value===null){value="";options.expires=-1}var expires="";if(options.expires&&(typeof options.expires=="number"||options.expires.toUTCString)){var date;if(typeof options.expires=="number"){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000))}else{date=options.expires}expires="; expires="+date.toUTCString()}var path=options.path?"; path="+options.path:"";var domain=options.domain?"; domain="+options.domain:"";var secure=options.secure?"; secure":"";document.cookie=[name,"=",encodeURIComponent(value),expires,path,domain,secure].join("")}else{var cookieValue=null;if(document.cookie&&document.cookie!=""){var cookies=document.cookie.split(";");for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+"=")){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break}}}return cookieValue}};
/***********SLIDE_SHOW**********/
(function($){var plugin={};var defaults={mode:"horizontal",slideSelector:"",infiniteLoop:true,hideControlOnEnd:false,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:false,captions:false,ticker:false,tickerHover:false,adaptiveHeight:false,adaptiveHeightSpeed:500,video:false,useCSS:true,preloadImages:"visible",responsive:true,slideZIndex:50,viewportClass:"slideBox",touchEnabled:true,swipeThreshold:50,oneToOneTouch:true,preventDefaultSwipeX:true,preventDefaultSwipeY:false,pager:true,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:false,nextText:">",prevText:"<",auto:true,pause:4000,autoStart:true,autoDirection:"next",autoHover:false,autoDelay:0,autoSlideForOnePage:false,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};$.fn.bxSlider=function(options){if(this.length==0){return this}if(this.length>1){this.each(function(){$(this).bxSlider(options)});return this}var slider={};var el=this;plugin.el=this;var windowWidth=$(window).width();var windowHeight=$(window).height();var init=function(){slider.settings=$.extend({},defaults,options);slider.settings.slideWidth=parseInt(slider.settings.slideWidth);slider.children=el.children(slider.settings.slideSelector);if(slider.children.length<slider.settings.minSlides){slider.settings.minSlides=slider.children.length}if(slider.children.length<slider.settings.maxSlides){slider.settings.maxSlides=slider.children.length}if(slider.settings.randomStart){slider.settings.startSlide=Math.floor(Math.random()*slider.children.length)}slider.active={index:slider.settings.startSlide};slider.carousel=slider.settings.minSlides>1||slider.settings.maxSlides>1;if(slider.carousel){slider.settings.preloadImages="all"}slider.minThreshold=(slider.settings.minSlides*slider.settings.slideWidth)+((slider.settings.minSlides-1)*slider.settings.slideMargin);slider.maxThreshold=(slider.settings.maxSlides*slider.settings.slideWidth)+((slider.settings.maxSlides-1)*slider.settings.slideMargin);slider.working=false;slider.controls={};slider.interval=null;slider.animProp=slider.settings.mode=="vertical"?"top":"left";slider.usingCSS=slider.settings.useCSS&&slider.settings.mode!="fade"&&(function(){var div=document.createElement("div");var props=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in props){if(div.style[props[i]]!==undefined){slider.cssPrefix=props[i].replace("Perspective","").toLowerCase();slider.animProp="-"+slider.cssPrefix+"-transform";return true}}return false}());if(slider.settings.mode=="vertical"){slider.settings.maxSlides=slider.settings.minSlides}el.data("origStyle",el.attr("style"));el.children(slider.settings.slideSelector).each(function(){$(this).data("origStyle",$(this).attr("style"))});setup()};var setup=function(){el.wrap('<div class="'+slider.settings.viewportClass+'"></div>');slider.viewport=el.parent();slider.loader=$('<div class="slideLoading" />');slider.viewport.prepend(slider.loader);el.css({width:slider.settings.mode=="horizontal"?(slider.children.length*100+215)+"%":"auto",position:"relative"});if(slider.usingCSS&&slider.settings.easing){el.css("-"+slider.cssPrefix+"-transition-timing-function",slider.settings.easing)}else{if(!slider.settings.easing){slider.settings.easing="swing"}}var slidesShowing=getNumberSlidesShowing();slider.viewport.css({width:"100%",overflow:"hidden",position:"relative"});slider.viewport.parent().css({maxWidth:getViewportMaxWidth()});if(!slider.settings.pager){slider.viewport.parent().css({margin:"0 auto 0px"})}slider.children.css({"float":slider.settings.mode=="horizontal"?"left":"none",listStyle:"none",position:"relative"});slider.children.css("width",getSlideWidth());if(slider.settings.mode=="horizontal"&&slider.settings.slideMargin>0){slider.children.css("marginRight",slider.settings.slideMargin)}if(slider.settings.mode=="vertical"&&slider.settings.slideMargin>0){slider.children.css("marginBottom",slider.settings.slideMargin)}if(slider.settings.mode=="fade"){slider.children.css({position:"absolute",zIndex:0,display:"none"});slider.children.eq(slider.settings.startSlide).css({zIndex:slider.settings.slideZIndex,display:"block"})}slider.controls.el=$('<div class="controlBase" />');if(slider.settings.captions){appendCaptions()}slider.active.last=slider.settings.startSlide==getPagerQty()-1;if(slider.settings.video){el.fitVids()}var preloadSelector=slider.children.eq(slider.settings.startSlide);if(slider.settings.preloadImages=="all"){preloadSelector=slider.children}if(!slider.settings.ticker){if(slider.settings.pager){appendPager()}if(slider.settings.controls){appendControls()}if(slider.settings.controls||slider.settings.pager){slider.viewport.after(slider.controls.el)}}else{slider.settings.pager=false}loadElements(preloadSelector,start)};var loadElements=function(selector,callback){var total=selector.find("img, iframe").length;
if(total==0){callback();return}var count=0;selector.find("img, iframe").each(function(){$(this).one("load",function(){if(++count==total){callback()}}).each(function(){if(this.complete){$(this).load()}})})};var start=function(){if(slider.settings.infiniteLoop&&slider.settings.mode!="fade"&&!slider.settings.ticker){var slice=slider.settings.mode=="vertical"?slider.settings.minSlides:slider.settings.maxSlides;var sliceAppend=slider.children.slice(0,slice).clone().addClass("bx-clone");var slicePrepend=slider.children.slice(-slice).clone().addClass("bx-clone");el.append(sliceAppend).prepend(slicePrepend)}slider.loader.remove();setSlidePosition();if(slider.settings.mode=="vertical"){slider.settings.adaptiveHeight=true}slider.viewport.height(getViewportHeight());el.redrawSlider();slider.settings.onSliderLoad(slider.active.index);slider.initialized=true;if(slider.settings.responsive){$(window).bind("resize",resizeWindow)}if(slider.settings.auto&&slider.settings.autoStart&&(getPagerQty()>1||slider.settings.autoSlideForOnePage)){initAuto()}if(slider.settings.ticker){initTicker()}if(slider.settings.pager){updatePagerActive(slider.settings.startSlide)}if(slider.settings.controls){updateDirectionControls()}if(slider.settings.touchEnabled&&!slider.settings.ticker){initTouch()}};var getViewportHeight=function(){var height=0;var children=$();if(slider.settings.mode!="vertical"&&!slider.settings.adaptiveHeight){children=slider.children}else{if(!slider.carousel){children=slider.children.eq(slider.active.index)}else{var currentIndex=slider.settings.moveSlides==1?slider.active.index:slider.active.index*getMoveBy();children=slider.children.eq(currentIndex);for(i=1;i<=slider.settings.maxSlides-1;i++){if(currentIndex+i>=slider.children.length){children=children.add(slider.children.eq(i-1))}else{children=children.add(slider.children.eq(currentIndex+i))}}}}if(slider.settings.mode=="vertical"){children.each(function(index){height+=$(this).outerHeight()});if(slider.settings.slideMargin>0){height+=slider.settings.slideMargin*(slider.settings.minSlides-1)}}else{height=Math.max.apply(Math,children.map(function(){return $(this).outerHeight(false)}).get())}if(slider.viewport.css("box-sizing")=="border-box"){height+=parseFloat(slider.viewport.css("padding-top"))+parseFloat(slider.viewport.css("padding-bottom"))+parseFloat(slider.viewport.css("border-top-width"))+parseFloat(slider.viewport.css("border-bottom-width"))}else{if(slider.viewport.css("box-sizing")=="padding-box"){height+=parseFloat(slider.viewport.css("padding-top"))+parseFloat(slider.viewport.css("padding-bottom"))}}return height};var getViewportMaxWidth=function(){var width="100%";if(slider.settings.slideWidth>0){if(slider.settings.mode=="horizontal"){width=(slider.settings.maxSlides*slider.settings.slideWidth)+((slider.settings.maxSlides-1)*slider.settings.slideMargin)}else{width=slider.settings.slideWidth}}return width};var getSlideWidth=function(){var newElWidth=slider.settings.slideWidth;var wrapWidth=slider.viewport.width();if(slider.settings.slideWidth==0||(slider.settings.slideWidth>wrapWidth&&!slider.carousel)||slider.settings.mode=="vertical"){newElWidth=wrapWidth}else{if(slider.settings.maxSlides>1&&slider.settings.mode=="horizontal"){if(wrapWidth>slider.maxThreshold){}else{if(wrapWidth<slider.minThreshold){newElWidth=(wrapWidth-(slider.settings.slideMargin*(slider.settings.minSlides-1)))/slider.settings.minSlides}}}}return newElWidth};var getNumberSlidesShowing=function(){var slidesShowing=1;if(slider.settings.mode=="horizontal"&&slider.settings.slideWidth>0){if(slider.viewport.width()<slider.minThreshold){slidesShowing=slider.settings.minSlides}else{if(slider.viewport.width()>slider.maxThreshold){slidesShowing=slider.settings.maxSlides}else{var childWidth=slider.children.first().width()+slider.settings.slideMargin;slidesShowing=Math.floor((slider.viewport.width()+slider.settings.slideMargin)/childWidth)}}}else{if(slider.settings.mode=="vertical"){slidesShowing=slider.settings.minSlides}}return slidesShowing};var getPagerQty=function(){var pagerQty=0;if(slider.settings.moveSlides>0){if(slider.settings.infiniteLoop){pagerQty=Math.ceil(slider.children.length/getMoveBy())}else{var breakPoint=0;var counter=0;while(breakPoint<slider.children.length){++pagerQty;breakPoint=counter+getNumberSlidesShowing();counter+=slider.settings.moveSlides<=getNumberSlidesShowing()?slider.settings.moveSlides:getNumberSlidesShowing()}}}else{pagerQty=Math.ceil(slider.children.length/getNumberSlidesShowing())}return pagerQty};var getMoveBy=function(){if(slider.settings.moveSlides>0&&slider.settings.moveSlides<=getNumberSlidesShowing()){return slider.settings.moveSlides}return getNumberSlidesShowing()};var setSlidePosition=function(){if(slider.children.length>slider.settings.maxSlides&&slider.active.last&&!slider.settings.infiniteLoop){if(slider.settings.mode=="horizontal"){var lastChild=slider.children.last();var position=lastChild.position();setPositionProperty(-(position.left-(slider.viewport.width()-lastChild.outerWidth())),"reset",0)
}else{if(slider.settings.mode=="vertical"){var lastShowingIndex=slider.children.length-slider.settings.minSlides;var position=slider.children.eq(lastShowingIndex).position();setPositionProperty(-position.top,"reset",0)}}}else{var position=slider.children.eq(slider.active.index*getMoveBy()).position();if(slider.active.index==getPagerQty()-1){slider.active.last=true}if(position!=undefined){if(slider.settings.mode=="horizontal"){setPositionProperty(-position.left,"reset",0)}else{if(slider.settings.mode=="vertical"){setPositionProperty(-position.top,"reset",0)}}}}};var setPositionProperty=function(value,type,duration,params){if(slider.usingCSS){var propValue=slider.settings.mode=="vertical"?"translate3d(0, "+value+"px, 0)":"translate3d("+value+"px, 0, 0)";el.css("-"+slider.cssPrefix+"-transition-duration",duration/1000+"s");if(type=="slide"){el.css(slider.animProp,propValue);el.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){el.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");updateAfterSlideTransition()})}else{if(type=="reset"){el.css(slider.animProp,propValue)}else{if(type=="ticker"){el.css("-"+slider.cssPrefix+"-transition-timing-function","linear");el.css(slider.animProp,propValue);el.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){el.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");setPositionProperty(params["resetValue"],"reset",0);tickerLoop()})}}}}else{var animateObj={};animateObj[slider.animProp]=value;if(type=="slide"){el.animate(animateObj,duration,slider.settings.easing,function(){updateAfterSlideTransition()})}else{if(type=="reset"){el.css(slider.animProp,value)}else{if(type=="ticker"){el.animate(animateObj,speed,"linear",function(){setPositionProperty(params["resetValue"],"reset",0);tickerLoop()})}}}}};var populatePager=function(){var pagerHtml="";var pagerQty=getPagerQty();for(var i=0;i<pagerQty;i++){var linkContent="";if(slider.settings.buildPager&&$.isFunction(slider.settings.buildPager)){linkContent=slider.settings.buildPager(i);slider.pagerEl.addClass("controlCustom")}else{linkContent=i+1;slider.pagerEl.addClass("controlDefault")}pagerHtml+='<div class="control"><a href="" data-slide-index="'+i+'" class="controlLink">'+linkContent+"</a></div>"}slider.pagerEl.html(pagerHtml)};var appendPager=function(){if(!slider.settings.pagerCustom){slider.pagerEl=$('<div class="controlBox" />');if(slider.settings.pagerSelector){$(slider.settings.pagerSelector).html(slider.pagerEl)}else{slider.controls.el.addClass("hasControl").append(slider.pagerEl)}populatePager()}else{slider.pagerEl=$(slider.settings.pagerCustom)}slider.pagerEl.on("click","a",clickPagerBind)};var appendControls=function(){slider.controls.next=$('<a class="arrowNext" href="">'+slider.settings.nextText+"</a>");slider.controls.prev=$('<a class="arrowPrev" href="">'+slider.settings.prevText+"</a>");slider.controls.next.bind("click",clickNextBind);slider.controls.prev.bind("click",clickPrevBind);if(slider.settings.nextSelector){$(slider.settings.nextSelector).append(slider.controls.next)}if(slider.settings.prevSelector){$(slider.settings.prevSelector).append(slider.controls.prev)}if(!slider.settings.nextSelector&&!slider.settings.prevSelector){slider.controls.directionEl=$('<div class="arrowBox" />');slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);slider.controls.el.addClass("hasArrowBox").append(slider.controls.directionEl)}};var appendCaptions=function(){slider.children.each(function(index){var title=$(this).find("img:first").attr("title");if(title!=undefined&&(""+title).length){$(this).append('<div class="slideTitle"><span>'+title+"</span></div>")}})};var clickNextBind=function(e){el.goToNextSlide();e.preventDefault()};var clickPrevBind=function(e){el.goToPrevSlide();e.preventDefault()};var clickPagerBind=function(e){var pagerLink=$(e.currentTarget);if(pagerLink.attr("data-slide-index")!==undefined){var pagerIndex=parseInt(pagerLink.attr("data-slide-index"));if(pagerIndex!=slider.active.index){el.goToSlide(pagerIndex)}e.preventDefault()}};var updatePagerActive=function(slideIndex){var len=slider.children.length;if(slider.settings.pagerType=="short"){if(slider.settings.maxSlides>1){len=Math.ceil(slider.children.length/slider.settings.maxSlides)}slider.pagerEl.html((slideIndex+1)+slider.settings.pagerShortSeparator+len);return}slider.pagerEl.find("a").removeClass("active");slider.pagerEl.each(function(i,el){$(el).find("a").eq(slideIndex).addClass("active")})};var updateAfterSlideTransition=function(){if(slider.settings.infiniteLoop){var position="";if(slider.active.index==0){position=slider.children.eq(0).position()}else{if(slider.active.index==getPagerQty()-1&&slider.carousel){position=slider.children.eq((getPagerQty()-1)*getMoveBy()).position()}else{if(slider.active.index==slider.children.length-1){position=slider.children.eq(slider.children.length-1).position()}}}if(position){if(slider.settings.mode=="horizontal"){setPositionProperty(-position.left,"reset",0)
}else{if(slider.settings.mode=="vertical"){setPositionProperty(-position.top,"reset",0)}}}}slider.working=false;slider.settings.onSlideAfter(slider.children.eq(slider.active.index),slider.oldIndex,slider.active.index)};var updateDirectionControls=function(){if(getPagerQty()==1){slider.controls.prev.addClass("disabled");slider.controls.next.addClass("disabled")}else{if(!slider.settings.infiniteLoop&&slider.settings.hideControlOnEnd){if(slider.active.index==0){slider.controls.prev.addClass("disabled");slider.controls.next.removeClass("disabled")}else{if(slider.active.index==getPagerQty()-1){slider.controls.next.addClass("disabled");slider.controls.prev.removeClass("disabled")}else{slider.controls.prev.removeClass("disabled");slider.controls.next.removeClass("disabled")}}}}};var initAuto=function(){if(slider.settings.autoDelay>0){var timeout=setTimeout(el.startAuto,slider.settings.autoDelay)}else{el.startAuto()}if(slider.settings.autoHover){el.hover(function(){if(slider.interval){el.stopAuto(true);slider.autoPaused=true}},function(){if(slider.autoPaused){el.startAuto(true);slider.autoPaused=null}})}};var initTicker=function(){var startPosition=0;if(slider.settings.autoDirection=="next"){el.append(slider.children.clone().addClass("bx-clone"))}else{el.prepend(slider.children.clone().addClass("bx-clone"));var position=slider.children.first().position();startPosition=slider.settings.mode=="horizontal"?-position.left:-position.top}setPositionProperty(startPosition,"reset",0);slider.settings.pager=false;slider.settings.controls=false;if(slider.settings.tickerHover&&!slider.usingCSS){slider.viewport.hover(function(){el.stop()},function(){var totalDimens=0;slider.children.each(function(index){totalDimens+=slider.settings.mode=="horizontal"?$(this).outerWidth(true):$(this).outerHeight(true)});var ratio=slider.settings.speed/totalDimens;var property=slider.settings.mode=="horizontal"?"left":"top";var newSpeed=ratio*(totalDimens-(Math.abs(parseInt(el.css(property)))));tickerLoop(newSpeed)})}tickerLoop()};var tickerLoop=function(resumeSpeed){speed=resumeSpeed?resumeSpeed:slider.settings.speed;var position={left:0,top:0};var reset={left:0,top:0};if(slider.settings.autoDirection=="next"){position=el.find(".bx-clone").first().position()}else{reset=slider.children.first().position()}var animateProperty=slider.settings.mode=="horizontal"?-position.left:-position.top;var resetValue=slider.settings.mode=="horizontal"?-reset.left:-reset.top;var params={resetValue:resetValue};setPositionProperty(animateProperty,"ticker",speed,params)};var initTouch=function(){slider.touch={start:{x:0,y:0},end:{x:0,y:0}};slider.viewport.bind("touchstart",onTouchStart)};var onTouchStart=function(e){if(slider.working){e.preventDefault()}else{slider.touch.originalPos=el.position();var orig=e.originalEvent;slider.touch.start.x=orig.changedTouches[0].pageX;slider.touch.start.y=orig.changedTouches[0].pageY;slider.viewport.bind("touchmove",onTouchMove);slider.viewport.bind("touchend",onTouchEnd)}};var onTouchMove=function(e){var orig=e.originalEvent;var xMovement=Math.abs(orig.changedTouches[0].pageX-slider.touch.start.x);var yMovement=Math.abs(orig.changedTouches[0].pageY-slider.touch.start.y);if((xMovement*3)>yMovement&&slider.settings.preventDefaultSwipeX){e.preventDefault()}else{if((yMovement*3)>xMovement&&slider.settings.preventDefaultSwipeY){e.preventDefault()}}if(slider.settings.mode!="fade"&&slider.settings.oneToOneTouch){var value=0;if(slider.settings.mode=="horizontal"){var change=orig.changedTouches[0].pageX-slider.touch.start.x;value=slider.touch.originalPos.left+change}else{var change=orig.changedTouches[0].pageY-slider.touch.start.y;value=slider.touch.originalPos.top+change}setPositionProperty(value,"reset",0)}};var onTouchEnd=function(e){slider.viewport.unbind("touchmove",onTouchMove);var orig=e.originalEvent;var value=0;slider.touch.end.x=orig.changedTouches[0].pageX;slider.touch.end.y=orig.changedTouches[0].pageY;if(slider.settings.mode=="fade"){var distance=Math.abs(slider.touch.start.x-slider.touch.end.x);if(distance>=slider.settings.swipeThreshold){slider.touch.start.x>slider.touch.end.x?el.goToNextSlide():el.goToPrevSlide()}}else{var distance=0;if(slider.settings.mode=="horizontal"){distance=slider.touch.end.x-slider.touch.start.x;value=slider.touch.originalPos.left}else{distance=slider.touch.end.y-slider.touch.start.y;value=slider.touch.originalPos.top}if(!slider.settings.infiniteLoop&&((slider.active.index==0&&distance>0)||(slider.active.last&&distance<0))){setPositionProperty(value,"reset",200)}else{if(Math.abs(distance)>=slider.settings.swipeThreshold){distance<0?el.goToNextSlide():el.goToPrevSlide()}else{setPositionProperty(value,"reset",200)}}}slider.viewport.unbind("touchend",onTouchEnd)};var resizeWindow=function(e){if(!slider.initialized){return}var windowWidthNew=$(window).width();var windowHeightNew=$(window).height();if(windowWidth!=windowWidthNew||windowHeight!=windowHeightNew){windowWidth=windowWidthNew;windowHeight=windowHeightNew;
el.redrawSlider();slider.settings.onSliderResize.call(el,slider.active.index)}};el.goToSlide=function(slideIndex,direction){if(slider.working||slider.active.index==slideIndex){return}slider.working=true;slider.oldIndex=slider.active.index;if(slideIndex<0){slider.active.index=getPagerQty()-1}else{if(slideIndex>=getPagerQty()){slider.active.index=0}else{slider.active.index=slideIndex}}slider.settings.onSlideBefore(slider.children.eq(slider.active.index),slider.oldIndex,slider.active.index);if(direction=="next"){slider.settings.onSlideNext(slider.children.eq(slider.active.index),slider.oldIndex,slider.active.index)}else{if(direction=="prev"){slider.settings.onSlidePrev(slider.children.eq(slider.active.index),slider.oldIndex,slider.active.index)}}slider.active.last=slider.active.index>=getPagerQty()-1;if(slider.settings.pager){updatePagerActive(slider.active.index)}if(slider.settings.controls){updateDirectionControls()}if(slider.settings.mode=="fade"){if(slider.settings.adaptiveHeight&&slider.viewport.height()!=getViewportHeight()){slider.viewport.animate({height:getViewportHeight()},slider.settings.adaptiveHeightSpeed)}slider.children.filter(":visible").fadeOut(slider.settings.speed).css({zIndex:0});slider.children.eq(slider.active.index).css("zIndex",slider.settings.slideZIndex+1).fadeIn(slider.settings.speed,function(){$(this).css("zIndex",slider.settings.slideZIndex);updateAfterSlideTransition()})}else{if(slider.settings.adaptiveHeight&&slider.viewport.height()!=getViewportHeight()){slider.viewport.animate({height:getViewportHeight()},slider.settings.adaptiveHeightSpeed)}var moveBy=0;var position={left:0,top:0};if(!slider.settings.infiniteLoop&&slider.carousel&&slider.active.last){if(slider.settings.mode=="horizontal"){var lastChild=slider.children.eq(slider.children.length-1);position=lastChild.position();moveBy=slider.viewport.width()-lastChild.outerWidth()}else{var lastShowingIndex=slider.children.length-slider.settings.minSlides;position=slider.children.eq(lastShowingIndex).position()}}else{if(slider.carousel&&slider.active.last&&direction=="prev"){var eq=slider.settings.moveSlides==1?slider.settings.maxSlides-getMoveBy():((getPagerQty()-1)*getMoveBy())-(slider.children.length-slider.settings.maxSlides);var lastChild=el.children(".bx-clone").eq(eq);position=lastChild.position()}else{if(direction=="next"&&slider.active.index==0){position=el.find("> .bx-clone").eq(slider.settings.maxSlides).position();slider.active.last=false}else{if(slideIndex>=0){var requestEl=slideIndex*getMoveBy();position=slider.children.eq(requestEl).position()}}}}if("undefined"!==typeof(position)){var value=slider.settings.mode=="horizontal"?-(position.left-moveBy):-position.top;setPositionProperty(value,"slide",slider.settings.speed)}}};el.goToNextSlide=function(){if(!slider.settings.infiniteLoop&&slider.active.last){return}var pagerIndex=parseInt(slider.active.index)+1;el.goToSlide(pagerIndex,"next")};el.goToPrevSlide=function(){if(!slider.settings.infiniteLoop&&slider.active.index==0){return}var pagerIndex=parseInt(slider.active.index)-1;el.goToSlide(pagerIndex,"prev")};el.startAuto=function(preventControlUpdate){if(slider.interval){return}slider.interval=setInterval(function(){slider.settings.autoDirection=="next"?el.goToNextSlide():el.goToPrevSlide()},slider.settings.pause);if(slider.settings.autoControls&&preventControlUpdate!=true){updateAutoControls("stop")}};el.stopAuto=function(preventControlUpdate){if(!slider.interval){return}clearInterval(slider.interval);slider.interval=null;if(slider.settings.autoControls&&preventControlUpdate!=true){updateAutoControls("start")}};el.getCurrentSlide=function(){return slider.active.index};el.getCurrentSlideElement=function(){return slider.children.eq(slider.active.index)};el.getSlideCount=function(){return slider.children.length};el.redrawSlider=function(){slider.children.add(el.find(".bx-clone")).width(getSlideWidth());slider.viewport.css("height",getViewportHeight());if(!slider.settings.ticker){setSlidePosition()}if(slider.active.last){slider.active.index=getPagerQty()-1}if(slider.active.index>=getPagerQty()){slider.active.last=true}if(slider.settings.pager&&!slider.settings.pagerCustom){populatePager();updatePagerActive(slider.active.index)}};el.destroySlider=function(){if(!slider.initialized){return}slider.initialized=false;$(".bx-clone",this).remove();slider.children.each(function(){$(this).data("origStyle")!=undefined?$(this).attr("style",$(this).data("origStyle")):$(this).removeAttr("style")});$(this).data("origStyle")!=undefined?this.attr("style",$(this).data("origStyle")):$(this).removeAttr("style");$(this).unwrap().unwrap();if(slider.controls.el){slider.controls.el.remove()}if(slider.controls.next){slider.controls.next.remove()}if(slider.controls.prev){slider.controls.prev.remove()}if(slider.pagerEl&&slider.settings.controls){slider.pagerEl.remove()}$(".slideTitle",this).remove();if(slider.controls.autoEl){slider.controls.autoEl.remove()}clearInterval(slider.interval);if(slider.settings.responsive){$(window).unbind("resize",resizeWindow)
}};el.reloadSlider=function(settings){if(settings!=undefined){options=settings}el.destroySlider();init()};init();return this}})(jQuery);
/*! idTabs v3.0 ~ Sean Catchpole - Copyright 2010 MIT/GPL */
(function($){var idTabs,undefined,href=function(e){return $(e).attr("href")},type=function(o){return o===null&&"Null"||o===undefined&&"Undefined"||({}).toString.call(o).slice(8,-1)};$.fn.idTabs=function(){var s=idTabs.args.apply(this,arguments),action=s.update&&"update"||s.remove&&"remove"||"bind";s.area=this;idTabs[action](s);return this};idTabs=$.idTabs=function(tabarea,options,data){var e,tabs,items,test=$(),meta=$.metadata?$(tabarea).metadata():{},s={tab:idTabs.tab,item:idTabs.item};s=$.extend(s,idTabs.settings,meta,options||{});s.tabarea=$(tabarea);s.data=data||"idTabs"+ +new Date;$.each({selected:".",event:"!",start:"#"},function(n,c){if(type(s[n])=="String"&&s[n].indexOf(c)==0){s[n]=s[n].substr(1)}});if(s.start===null){s.start=-1}items=[];s.tabs=tabs=$("a[href^=#]",tabarea);tabs.each(function(){test=s.item(href(this));if(test.length){items=items.concat(test.get())}});s.items=$(items).hide();e="idTabs."+s.event;data=s.tabarea.data("idTabs")||{};data[e]=s;s.tabarea.data("idTabs",data);tabs.trigger(e).data(s.data,s).bind(e,{s:s},function(){return idTabs.unbind.apply(this,arguments)}).bind(s.event,{s:s},idTabs.find);type(s.start)=="Number"&&(s.start<0||(test=tabs.eq(s.start)).length)||type(s.start)=="String"&&(test=tabs.filter("a[href=#"+s.start+"]")).length||(test=tabs.filter("."+s.selected).removeClass(s.selected)).length||(s.start===undefined&&(test=tabs.eq(0)).length);if(test.length){test.trigger(s.event)}return s};idTabs.args=function(){var a,i=0,s={},args=arguments,str=function(_,a){if(a.indexOf(".")==0){s.selected=a}else{if(a.indexOf("!")==0){if(/^!(true|false)$/i.test(a)){s.toggle=/^!true$/i.test(a)}else{s.event=a}}else{if(a.indexOf(":")==0){a=a.substr(1).toLowerCase();if(a.indexOf("!")==0){s[a.substr(1)]=false}else{s[a]=true}}else{if(a){s.start=a}}}}};while(i<args.length){a=args[i++];switch(type(a)){case"Object":$.extend(s,a);break;case"Boolean":s.change=a;break;case"Number":s.start=a;break;case"Function":s.click=a;break;case"Null":s.start=a;break;case"String":$.each(a.split(/\s+/g),str);default:break}}return s};idTabs.bind=function(s){if(!s){return}var data="idTabs"+ +new Date;if(s.grouped){$.idTabs(s.area,s,data)}else{s.area.each(function(){$.idTabs(this,s,data)})}};idTabs.update=function(s){if(!s){return}s.update=false;var self,data,n,e=s.event;e=(e+"").indexOf("!")==0&&e.substr(1)||e;e=e?"idTabs."+e:"";return s.area.each(function(){self=$(this);data=self.data("idTabs");if(!data){return}if(e){n=$.extend({},data[e],s);idTabs.remove(data[e]);idTabs(n.tabarea,n,n.data)}else{for(e in data){if(!Object.hasOwnProperty.call(data,e)){continue}n=$.extend({},data[e],s);idTabs.remove(data[e]);idTabs(n.tabarea,n,n.data)}}})};idTabs.remove=function(s){if(!s){return}var data,tabs,e=s.event;e=(e+"").indexOf("!")==0&&e.substr(1)||e;e="idTabs"+(e?"."+e:"");return s.area.each(function(){data=$(this).data("idTabs");delete data["idTabs."+s.event];$(this).data("idTabs",data);tabs=s.tabs||$("a[href^=#]",this);if(!tabs.length&&$(this).is("a[href^=#]")){tabs=$(this)}tabs.trigger(e)})};idTabs.find=function(e){var self=this,ret=false,s=e.data.s;$("a[href="+href(this)+"]:first",s.area).each(function(){var t=$(this).data(s.data);if(t){ret=idTabs.showtab.call(t.tabarea==s.tabarea?self:this,t,e)||ret}});return ret};idTabs.showtab=function(s,e){if(!s||!s.toggle&&$(this).is("."+s.selected)){return s&&s.change}var id=href(this);if(s.click&&s.click.call(this,id,s,e)==false){return s.change}if(s.toggle&&$(this).is("."+s.selected)){id=null}return idTabs.show.call(this,id,s,e)};idTabs.show=function(id,s){s.tabs.removeClass(s.selected);s.tab(id).addClass(s.selected);s.items.hide();s.item(id).show();return s.change};idTabs.unbind=function(e){var s=e.data.s;$(this).removeData(s.data).unbind("idTabs."+s.event);return false};idTabs.extend=function(){var args=arguments;return function(){[].push.apply(args,arguments);this.idTabs.apply(this,args)}};idTabs.tab=function(id){if(!id){return $([])}return $("a[href="+id+"]",this.tabarea)};idTabs.item=function(id){if(!id){return $([])}var item=$(id);return item.length?item:$("."+id.substr(1))};idTabs.settings={start:undefined,change:false,click:null,selected:".selected",event:"!click",toggle:false,grouped:false};idTabs.version="3.0"})(jQuery);