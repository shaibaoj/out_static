var vmminxCommonData={methods:{navToPage:function(path){window.location.href=path},navAction:function(item){item.action.path?this.navTo(item.action.path,item.action.params):"load_action"===item.action.actionh5?this.loadAction(item.action):"web"!==item.action.actionh5&&"copy"!==item.action.actionh5||this.openWeb(item.action)},loadAction:function(action){var self=this,options={};options=Object.assign(options,action.params),ajaxPost("/cms/load/view",options,function(res){0==res.info.status&&self.navAction(res.data.item)},function(){})},openWeb:function(action){window.location.href=action.params.webUrl},navTo:function(path,params){var paramsUrl=parseParams(params);window.location.href=path+"?"+paramsUrl},toNav:function(item){this.navAction(item)}}},vmminxAppData={data:{app_url:"/app.app.view",app:{detail:{},jump_url:"",downloads:0,notice:!1,show:!1,btnText:"一键复制",copyStatus:!1}},methods:{queryApp:function(){var $this=this;ajaxPost(URLPrefix.baseUrl+$this.app_url,{},function(result){if(0==result.code&&result.data.detail){$this.app.detail=result.data.detail;var androidUrl=result.data.detail.android_url,iosUrl=result.data.detail.ios_url;"iphone"==URLPrefix.ua.match(/iphone/i)||"ipad"==URLPrefix.ua.match(/ipad/i)?$this.app.jump_url=iosUrl:$this.app.jump_url=androidUrl}})},showApp:function(){this.app.show=!0},hideApp:function(){this.app.show=!1},downloads_url:function(){(!mobileUtil.isIOS||!mobileUtil.isWeixin)&&mobileUtil.isAndroid&&mobileUtil.isWeixin&&this.app.jump_url.indexOf("app.qq.com")<=0?this.app.notice=!0:location.href=this.app.jump_url},appCopyContent:function(){var $this=this,clipboard=new ClipboardJS(".appCopy",{target:function(){return document.querySelector(".shareapp-code")}});clipboard.on("success",function(e){layer.msg("复制成功",{time:1500}),e.clearSelection(),clipboard.destroy(),$this.app.btnText="复制成功",$this.app.copyStatus=!0,setTimeout(function(){$this.app.btnText="一键复制",$this.app.copyStatus=!1},2e3)}),clipboard.on("error",function(e){layer.msg("由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！",{icon:2}),$this.app.btnText="复制失败"})},get_downloads:function(){var $this=this;ajaxPost(URLPrefix.baseUrl+"/app.app.downloads",{},function(result){0==result.info.status&&($this.app.downloads=result.data.downloads,setTimeout(function(){$this.get_downloads()},1e3))})},hideNotice:function(){this.app.notice=!this.app.notice}}};