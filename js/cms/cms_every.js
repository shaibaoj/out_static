$(function() {
	Vue.use(VueLazyload, {
		error: "",
		loading: loadImage
	});
	var t = new Vue({
		el: "#every",
		data: {
			spDataLen: data.top_show.length,
			spData: data.top_show,
			nowTime: data.this_show_time,
			nowData: data.show_data[data.this_show_time],
			nowTimes: data.now_time,
			noStart: !1
		},
		methods: {
			jump: function(t, a) {
				this.nowData = data.show_data[t], $(".swiper-slide").find("div").removeClass("act"), $(".swiper-slide[data-time='" + t + "']").find("div").addClass("act"), this.nowTime !== t ? $(".super_list").hide() : this.spDataLen > 0 && $(".super_list").show();
				for (var i = 0; i < this.nowData.length; i++) $(".line").eq(i).attr("data-type1", this.nowData[i].hd_leixing);
				0 !== a ? this.noStart = !0 : this.noStart = !1
			},
			linkUrl: function(t, a) {
				window.open(t + a)
			},
			time_list: function() {
				var t = this;
				setInterval(function() {
					var a = 0;
					if (t.spData.length > 0) {
						for (var i = 0; i < t.spData.length; i++) t.spData[i].un_progress_bar -= 1, t.spData[i].un_progress_bar += 1;
						t.nowTimes += 1, a = 1
					}
					if (void 0 !== t.nowData) {
						if (t.nowData.length > 0) for (var e = 0; e < t.nowData.length; e++) t.nowData[e].un_progress_bar -= 1, t.nowData[e].un_progress_bar += 1;
						0 == a && (t.nowTimes += 1)
					}
				}, 1e3)
			}
		},
		filters: {
			time_sort: function(t, a) {
				var i = Date.parse(new Date) / 1e3;
				if (t -= i, t <= 0) return "限时优惠已结束";
				var e, n, o, s = null;
				return e = Math.floor(t / 60 / 60 / 24), n = Math.floor(t / 60 / 60 % 24), o = Math.floor(t / 60 % 60), s = Math.floor(t % 60), e = e < 10 ? "0" + e : e, n = n < 10 ? "0" + n : n, o = o < 10 ? "0" + o : o, s = s < 10 ? "0" + s : s, n + " : " + o + " : " + s
			},
			"int": function(t) {
				return parseInt(t) + "%"
			}
		},
		mounted: function() {
			this.time_list()
		},
		updated: function() {
			this.$nextTick(function() {})
		}
	}),
		a = $(".swiper-slide[data-time='" + t.nowTime + "']").index(),
		i = new Swiper(".swiper-container", {
			direction: "horizontal",
			slidesPerView: 8,
			initialSlide: a,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev"
			},
			on: {
				slideChange: function() {
					this.isEnd ? $(".swiper-button-next").animate({
						marginRight: "-40px"
					}, 200) : $(".swiper-button-next").animate({
						marginRight: "0"
					}, 200), this.activeIndex < 1 ? $(".swiper-button-prev").animate({
						marginLeft: "-40px"
					}, 300) : $(".swiper-button-prev").animate({
						marginLeft: "0"
					}, 300)
				}
			}
		});
	$(".swiper-slide").click(function() {
		i.slideTo(parseInt(i.clickedIndex - 3), 1e3, !1)
	}), $(window).scroll(function() {
		$(window).scrollTop() > 170 ? ($(".fix_bar").addClass("fixed"), $(".top_block").css("marginTop", "110px")) : ($(".fix_bar").removeClass("fixed"), $(".top_block").css("marginTop", 0))
	})
});