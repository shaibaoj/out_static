var defaultImg="//static.cdn.youdanhui.com/static/platform/images/web/tools/img.png",vmToolEx=new Vue({el:"#vmToolEx",data:{goodsId:"",Bjurl:"",ImgSize:"_400x400.jpg",oindexGoodsId:""},mounted:function(){},methods:{celarBtn:function(){""!=$(".contentBox").html()?layer.alert("是否清空文案",{title:"提示",btn:["确定","取消"],yes:function(index,layero){$(".contentBox").empty(),layer.close(index)},cancel:function(index,layero){}}):layer.msg("文案为空",{time:1200})},picBtn:function(){var self=this,getidreg=/[\?&]id=(\d+)/;if(null!=this.Bjurl.match(getidreg)){var id_arr=this.Bjurl.match(getidreg)[1];null!=id_arr?(self.goodsId=id_arr,self.oindexGoodsId=self.goodsId,self.$nextTick(function(){self.$refs.vmpic.ajaxIrealpic(!0)})):layer.msg("请输入有效的商品链接！",{time:1500,shade:.1,shadeClose:!0})}else layer.msg("无效的商品链接！",{time:1500,shade:.1,shadeClose:!0})}}});