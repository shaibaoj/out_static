window.Echo=function(window,document){"use strict";function _pollImages(){for(var i=store.length;i--;){var self=store[i];void 0,(0<=(coords=self.getBoundingClientRect()).top&&0<=coords.left&&coords.top)<=(window.innerHeight||document.documentElement.clientHeight)+parseInt(offset)&&(self.src=self.getAttribute("data-echo"),store.splice(i,1))}var coords}function _throttle(){clearTimeout(poll),poll=setTimeout(_pollImages,throttle)}var offset,throttle,poll,store=[];return{init:function(obj){var nodes=document.querySelectorAll("[data-echo]"),opts=obj||{};offset=opts.offset||0,throttle=opts.throttle||250;for(var i=0;i<nodes.length;i++)store.push(nodes[i]);_throttle(),document.addEventListener?window.addEventListener("scroll",_throttle,!1):window.attachEvent("onscroll",_throttle)},render:_throttle}}(window,document);