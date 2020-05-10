define([
		"../util/base"
		,"../util/member"
		,"css!../../css/v2/global.css"
		,"css!../../css/v2/base.css"
		,"css!../../css/member.css"
	], function(base,member) {
	return {
		isloading:true,
		client:function(){
			var _this = this;
			
			base.search();
			base.goTop();
			member.init();
			
		}
	};
});