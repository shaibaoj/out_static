!function(e){var a={url:"",phpkey:"filedata",type:"image",filter:e.noop,before:e.noop,beforeSend:e.noop,after:e.noop,samePic:!0,default_limit_size:3145728};e.fn.ajaxUpload=function(t){return t=e.extend({},a,t),this.each(function(){var a=this;if(!e(this).data("ajaxUpload")){e(this).data("ajaxUpload",!0);var n=1,i=t.url,o=t.before,l=t.beforeSend,s=t.after,r=t.filter,f=t.phpkey,d=t.type,c=t.default_limit_size,p=e(this);e(this).on("change",function(u){var h,m,g,b,y=this.files.length;for(h=0;h<y;h++){if(console.log("t1"),m=this.files[h],c<m.size){jConfirm("亲你上传的图片大小超过3M,请压缩大小后上传!","图片大小限制提示",null,[{name:"去压缩图片",href:"https://tinypng.com",btnClass:"btn-danger"},{name:"取消",dismiss:!0,btnClass:"btn-default"}]),this.value="";break}("image"!=d||m.type.match(/image.*/))&&!function(n,d){window.FileReader&&(g=new FileReader,g.onloadend=function(e){var a=e.target;o.call(p,{data:a,file:d,index:n})},g.readAsDataURL(m)),console.log("t2"),window.FormData&&(console.log("t3"),b=new FormData,b.append(f,m),r&&r.call(p,b),e.ajax({url:i,type:"POST",data:b,processData:!1,contentType:!1,dataType:"json",beforeSend:function(e,a){l.call(p,{index:n,file:d})},success:function(i){t.samePic&&e(a).val(""),i=i||{},s.call(p,{data:i,index:n})}}))}(n++,m)}})}})}}(jQuery);
