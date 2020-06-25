var vmToolEx = new Vue({
	el: "#vmToolEx",
	data: {
		fontSizeList: "12 14 16 18 20 22 24 26 28 30 32".split(" "),
		fontSizeLists: "16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48".split(" "),
		isfontShow: !1,
		fontSizeSelected: 16,
		colors: {
			r: 255,
			g: 0,
			b: 0
		},
		fontColor: "#409EFF",
		goodsId: "",
		fontAbout: {
			round: [{
				title: "文字一",
				className: "round-text1",
				text: "我们券后只需",
				fontColor: "#fff",
				fontFamily: "Microsoft Yahei",
				fontSize: 16,
				isfontShow: !1
			}, {
				title: "文字二",
				className: "round-text2",
				text: "29.9",
				fontColor: "#fff",
				fontFamily: "Microsoft Yahei",
				fontSize: 28,
				isfontShow: !1
			}, {
				title: "文字三",
				className: "round-text3",
				text: "比促销价更优惠",
				fontColor: "#fff",
				fontFamily: "Microsoft Yahei",
				fontSize: 16,
				isfontShow: !1
			}, {
				title: "文字四",
				className: "round-text4",
				text: "速度抢",
				fontColor: "#fff",
				fontFamily: "Microsoft Yahei",
				fontSize: 16,
				isfontShow: !1
			}],
			oblong: [{
				title: "文字一",
				className: "oblong-text1",
				text: "￥19.9￥",
				fontColor: "#fff",
				fontFamily: "Microsoft Yahei",
				fontSize: 16,
				isfontShow: !1
			}, {
				title: "文字二",
				className: "oblong-text2",
				text: "天猫Tmall",
				fontColor: "#fff",
				fontFamily: "Microsoft Yahei",
				fontSize: 16,
				isfontShow: !1
			}, {
				title: "文字三",
				className: "oblong-text3",
				text: "省60元",
				fontColor: "#fff",
				fontFamily: "Microsoft Yahei",
				fontSize: 16,
				isfontShow: !1
			}],
			oSpikes: [{
				title: "栏顶(上)",
				text: "精选必抢单",
				fontSize: 40,
				fontColor: "#fff",
				number: 1
			}, {
				title: "栏顶(下)",
				text: "明日预告",
				fontSize: 30,
				fontColor: "#fff",
				number: 2
			}]
		},
		bgTips: {
			round: "#ffffff"
		},
		predefineColors: "#ffffff;#ff4500;#ff8c00;#ffd700;#90ee90;#00ced1;#1e90ff;#c71585;rgb(255, 120, 0)".split(";"),
		ExplaninArr: {
			box0: {
				explainText: "点击上传主图",
				exImg: ""
			},
			box1: {
				explainText: "点击上传左副图",
				exImg: ""
			},
			box2: {
				explainText: "点击上传右副图",
				exImg: ""
			}
		},
		tipsType: 0,
		roundTips: [{
			class: ""
		}, {
			class: ""
		}, {
			class: "word3"
		}, {
			class: "word5"
		}],
		roundTipsC: "",
		oblongTips: [{
			imgurl: URLPrefix.static_url + "/static/platform/images/web/tools/chang1.png",
		}, {
			imgurl: URLPrefix.static_url + "/static/platform/images/web/tools/chang2.png"
		}, {
			imgurl: URLPrefix.static_url + "/static/platform/images/web/tools/chang3.png"
		}],
		oblongTipsC: "",
		curRoundTips: -1,
		curOlongTips: -1,
		tbUrl: "",
		shopUrl: Request("shopUrl") ? Request("shopUrl") : "",
		goodsImg: {
			mainImgs: ["", "", ""],
			realImgs: ["", "", ""],
			marketImgs: ["", "", ""],
			arraygoodsDATA: ""
		},
		imgMakeUrl: "",
		picCanvas: "",
		activeMakeImgBox: 0,
		objSpike: {
			style: [{
				name: "缤纷_单列",
				className: "TspikeBg0",
				number: 0
			}, {
				name: "蓝色_单列",
				className: "TspikeBg1",
				number: 1
			}, {
				name: "橙黄色_单列",
				className: "TspikeBg2",
				number: 2
			}],
			oDefinTypeset: [{
				name: "单行标题",
				className: "",
				number: 0
			}, {
				name: "多行标题",
				className: "Tspstyle0",
				number: 1
			}],
			defineTypesetName: "单行标题",
			definTypeset: "",
			isTypesetShow: !1,
			defineName: "缤纷_单列",
			defineclass: "TspikeBg0",
			isStyleShow: !1,
			count: 0,
			countArr: [{
				title: {
					tit: "商品标题",
					name: "三只松鼠",
					size: "18",
					color: "#fff"
				},
				money: {
					tit: "原价",
					name: "50.0",
					size: "16",
					color: "#fff"
				},
				quan: {
					tit: "券后价",
					name: "10.0",
					size: "16",
					color: "#fff"
				},
				time: {
					tit: "日期",
					name: "3月14号 上午10:00",
					size: "16",
					color: "#fff"
				},
				image: ""
			}, {
				title: {
					tit: "商品标题",
					name: "三只松鼠",
					size: "18",
					color: "#fff"
				},
				money: {
					tit: "原价",
					name: "50.0",
					size: "16",
					color: "#fff"
				},
				quan: {
					tit: "券后价",
					name: "10.0",
					size: "16",
					color: "#fff"
				},
				time: {
					tit: "日期",
					name: "3月14号 上午10:00",
					size: "16",
					color: "#fff"
				},
				image: ""
			}],
			upImg: [],
			swpierImg: [
				URLPrefix.static_url + "/static/platform/images/web/tools/Tsps1.png",
				URLPrefix.static_url + "/static/platform/images/web/tools/Tsps2.png",
				URLPrefix.static_url + "/static/platform/images/web/tools/Tsps3.png",
			],
			defineSwpierImg: URLPrefix.static_url + "/static/platform/images/web/tools/Tsps1.png",
			clickRecord: 0
		},
		fontFamilyList: [{
			ch: "宋体",
			en: "SimSun"
		}, {
			ch: "Arial",
			en: "Arial"
		}, {
			ch: "黑体",
			en: "SimHei"
		}, {
			ch: "微软雅黑",
			en: "Microsoft Yahei"
		}, {
			ch: "微软正黑体",
			en: "Microsoft JhengHei"
		}, {
			ch: "楷体",
			en: "KaiTi"
		}, {
			ch: "新宋体",
			en: "NSimSun"
		}, {
			ch: "仿宋",
			en: "FangSong"
		}, {
			ch: "Times New Roman",
			en: "Times New Roman"
		}, {
			ch: "Helvetica",
			en: "Helvetica"
		}, {
			ch: "Verdana",
			en: "Verdana"
		}, {
			ch: "Tahoma",
			en: "Tahoma"
		}],
		ImgSize: "_400x400.jpg",
		hoverIndex: -1,
		Token: {
			isToken: "",
			tokenTime: "",
			tokenBoolean: !1
		},
		oFiery: {
			FierySpike: {
				style: [{
					name: "缤纷_单列1",
					className: "FieryBg0",
					number: 0
				}, {
					name: "缤纷_单列2",
					className: "FieryBg1",
					number: 1
				}, {
					name: "缤纷_单列3",
					className: "FieryBg2",
					number: 2
				}]
			},
			FieryoSpikes: [{
				title: "栏顶(上)",
				text: "爆款汇总",
				fontSize: 40,
				fontColor: "#fff",
				number: 1
			}, {
				title: "栏顶(下)",
				text: "每日更新最火爆优质商品",
				fontSize: 16,
				fontColor: "#fff",
				number: 2
			}],
			FieryCountArr: [{
				title: {
					tit: "品牌",
					name: "[三只松鼠]",
					size: "16",
					color: "#fff"
				},
				money: {
					tit: "标题",
					name: "零食大礼包",
					size: "16",
					color: "#fff"
				},
				quan: {
					tit: "出单量",
					name: "6666",
					size: "32",
					color: "#fff"
				},
				time: {
					tit: "日期",
					name: "3.20",
					size: "16",
					color: "#fff"
				},
				image: ""
			}, {
				title: {
					tit: "品牌",
					name: "[三只松鼠]",
					size: "16",
					color: "#fff"
				},
				money: {
					tit: "标题",
					name: "零食大礼包",
					size: "16",
					color: "#fff"
				},
				quan: {
					tit: "出单量",
					name: "6666",
					size: "32",
					color: "#fff"
				},
				time: {
					tit: "日期",
					name: "3.20",
					size: "16",
					color: "#fff"
				},
				image: ""
			}, {
				title: {
					tit: "品牌",
					name: "[三只松鼠]",
					size: "16",
					color: "#fff"
				},
				money: {
					tit: "标题",
					name: "零食大礼包",
					size: "16",
					color: "#fff"
				},
				quan: {
					tit: "出单量",
					name: "6666",
					size: "32",
					color: "#fff"
				},
				time: {
					tit: "日期",
					name: "3.20",
					size: "16",
					color: "#fff"
				},
				image: ""
			},
			{
				title: {
					tit: "品牌",
					name: "[三只松鼠]",
					size: "16",
					color: "#fff"
				},
				money: {
					tit: "标题",
					name: "零食大礼包",
					size: "16",
					color: "#fff"
				},
				quan: {
					tit: "出单量",
					name: "6666",
					size: "32",
					color: "#fff"
				},
				time: {
					tit: "日期",
					name: "3.20",
					size: "16",
					color: "#fff"
				},
				image: ""
			}],
			FieryDefineName: "缤纷_单列",
			FieryDefineclass: "FieryBg0",
			FieryIsStyleShow: !1,
			FieryswpierImg: [URLPrefix.static_url + "/static/platform/images/web/tools/TspFierySwiper0.png"],
			FierydefineSwpierImg: URLPrefix.static_url + "/static/platform/images/web/tools/TspFierySwiper0.png",
			FieryclickRecord: 0
		}
	},
	methods: {
		drop: function (a, b) { },
		allowDrop: function (a) {
			a.preventDefault()
		},
		drag: function (a) {
			if (1 == this.tipsType || 0 == this.tipsType) a.dataTransfer.setData("Text", a.target.id), a.dataTransfer.setData("img_url", a.target.src), a.dataTransfer.dropEffect = "copy";
			2 == this.tipsType && (a.dataTransfer.setData("Text", a.target.id), a.dataTransfer.setData("img_url", a.target.src), a.dataTransfer.dropEffect = "copy");
			3 == this.tipsType && (a.dataTransfer.setData("Text", a.target.id), a.dataTransfer.setData("img_url", a.target.src), a.dataTransfer.dropEffect = "copy")
		},
		file: function (a) {
			document.getElementById(a).click()
		},
		readFile: function (a, b) {
			var d = this;
			if (a = a.target.files[0]) {
				if (!/image\/\w+/.test(a.type)) return layer.alert("文件必须为图片哦！", {
					icon: 5
				}), !1;
				if (512E4 <= a.size) layer.msg("图片大小过大，应小于5M！", {
					icon: 2
				});
				else {
					var c = new FileReader;
					c.readAsDataURL(a);
					c.onload = function (a) {
						d.ExplaninArr[b].exImg = this.result
					}
				}
			}
		},
		isFileReader: function () {
			if ("undefined" === typeof FileReader) return layer.alert("您的浏览器不支持图片上传，请升级您的浏览器", {
				icon: 5
			}), !1
		},
		setdisabled: function (a) {
			document.getElementById(a).setAttribute("disabled", "disabled")
		},
		ajaxGetToken: function () {
			var $this = this;
			layer.msg("正在合成中...", {
				icon: 16,
				shade: .1,
				skin: "mylayer-border-radius",
				time: !1
			});
			this.unitePic('#imgMakeBox', '#imgGroupBig', function (obj) {
				layer.closeAll();
				$this.imgMakeUrl = obj.img;
				layer.msg("合成图片成功", {
					icon: 1,
					time: 1500
				})
			});
		},
		setIntervalFun: function () {
			var a = this;
			this.Token.tokenTime = setInterval(function () {
				a.Token.tokenBoolean = !1
			}, 3E5)
		},
		unitePic: function (copyClass, copyImgClass, callback) {
			var $this = this;
			html2canvas(document.querySelector(copyClass), {
				allowTaint: false,
				useCORS: true,
				// scale: scale, // 添加的scale 参数
				// canvas: canvas, //自定义 canvas
				logging: true, //日志开关，便于查看html2canvas的内部执行流程
			}).then(function (canvas) {
				var b = canvas.toDataURL("image/png", 1.0);
				var image = new Image();
				image.src = b;
				document.querySelector(copyImgClass).append(image);
				callback({
					img: b
				});
			})
		},
		addRoundTips: function (a, b, d) {
			this.curRoundTips = b;
			this.roundTipsC = a.currentTarget.innerHTML
		},
		addOlongTips: function (a, b, d) {
			this.curOlongTips = b;
			this.oblongTipsC = a.currentTarget.innerHTML
		},
		countPotionRound: function () {
			var a = document.getElementById("imgMakeBox"),
				b = a.offsetHeight,
				d = a.offsetWidth,
				c = a.getElementsByClassName("tipsInuse-round")[0],
				f = a.getElementsByClassName("tipsInuse-oblong")[0];
			a = {};
			if (this.roundTipsC) {
				var e = c.style.top;
				c = c.style.left;
				e = e && parseInt(e);
				c = c && parseInt(c);
				if ("" != e || "" != c) toprB = this.countPercentage(e, b), leftrB = this.countPercentage(c, d), a.round = {
					top: toprB,
					left: leftrB
				}
			}
			this.oblongTipsC && (c = f.style.top, f = f.style.left, c = c && parseInt(c), f = f && parseInt(f), "" != c || "" != f) && (topoB = this.countPercentage(c, b), leftoB = this.countPercentage(f, d), a.oblong = {
				top: topoB,
				left: leftoB
			});
			return a
		},
		countPercentage: function (a, b) {
			return Math.round(a / b * 1E4) / 100 + "%"
		},
		dragTips: function (a, b, d) {
			b = document.getElementById(b);
			var c = document.getElementById(d);
			a = a || window.event;
			var f = b.offsetWidth - c.offsetWidth,
				e = b.offsetHeight - c.offsetHeight;
			c.startX = a.clientX - c.offsetLeft;
			c.startY = a.clientY - c.offsetTop;
			document.onmousemove = function (a) {
				localStorage.removeItem("left1");
				localStorage.removeItem("top1");
				var b = a.clientX - c.startX,
					d = a.clientY - c.startY;
				a = a || window.event;
				0 >= a.clientX - c.startX && (c.style.left = "0px", b = 0);
				0 >= a.clientY - c.startY && (c.style.top = "0px", d = 0);
				a.clientX - c.startX >= f && (c.style.left = f + "px", b = f);
				a.clientY - c.startY >= e && (c.style.top = e + "px", d = e);
				c.style.left = b + "px";
				c.style.top = d + "px";
				localStorage.setItem("left1", b);
				localStorage.setItem("top1", d)
			};
			document.onmouseup = function () {
				document.onmousemove = null;
				document.onmouseup = null
			}
		},
		seeImg: function (a) {
			layer.open({
				type: 1,
				title: !1,
				closeBtn: 0,
				area: "300px",
				shadeClose: !0,
				content: '<div class="seeImgWrap"><img src="' + a + '"></div>'
			})
		},
		getGoodsImgs: function (init) {
			var a = this;
			layer.load(2, {
				shade: .1
			});
			var b = /[\?&]id=(\d+)/;
			if (null != this.tbUrl.match(b)) {
				var d = this.tbUrl.match(b)[1];
				null != d ? ajaxPost("/api/common/goods/view", {
					id: d,
				}, function (c) {
					layer.closeAll();
					if (0 == c.info.status) {
						a.goodsId = d;
						var b = c.data.item.goods;

						a.goodsImg.arraygoodsDATA = c.data;
						layer.msg(c.message, {
							icon: 1
						});
						if ("" != b.p_list) {
							a.goodsImg.mainImgs = [];
							for (var e = 0; e < b.p_list.length; e++) {
								a.goodsImg.mainImgs[e] = b.p_list[e];
							}
						} else {
							a.goodsImg.mainImgs = ["", "", ""];
						}
						c = b.array_all;
						if ("" != c && 2 == a.tipsType) {
							var g = [];
							for (e = 0; e < a.objSpike.countArr.length; e++)"" == a.objSpike.countArr[e].image && g.push(e);
							0 < g.length ? (e = g[0], a.objSpike.countArr[e].title.name = c.itemshorttitle, a.objSpike.countArr[e].money.name = c.itemprice, a.objSpike.countArr[e].quan.name = c.itemendprice, a.objSpike.countArr[e].time.name = c.couponstarttime, a.objSpike.countArr[e].image = c.itempic) : 0 >= g.length && 0 >= a.objSpike.countArr.length && (a.styleAdd(), a.objSpike.countArr[0].title.name = c.itemshorttitle, a.objSpike.countArr[0].money.name = c.itemprice, a.objSpike.countArr[0].quan.name = c.itemendprice, a.objSpike.countArr[0].time.name = c.couponstarttime, a.objSpike.countArr[0].image = c.itempic)
						}
						if ("" != c && 3 == a.tipsType) {
							g = [];
							for (e = 0; e < a.oFiery.FieryCountArr.length; e++)"" == a.oFiery.FieryCountArr[e].image && g.push(e);
							0 < g.length ? (e = g[0], a.oFiery.FieryCountArr[e].title.name = c.shopname, a.oFiery.FieryCountArr[e].money.name = c.itemshorttitle, a.oFiery.FieryCountArr[e].quan.name = b.itemsale, a.oFiery.FieryCountArr[e].time.name = c.couponstarttime_plus, a.oFiery.FieryCountArr[e].image = c.itempic) : 0 >= g.length && 0 >= a.oFiery.FieryCountArr.length && (a.styleAdd(), a.oFiery.FieryCountArr[0].title.name = c.shopname, a.oFiery.FieryCountArr[0].money.name = c.itemshorttitle, a.oFiery.FieryCountArr[0].quan.name = b.itemsale, a.oFiery.FieryCountArr[0].time.name = c.couponstarttime_plus, a.oFiery.FieryCountArr[0].image = c.itempic)
						}
						if(init){
							if(a.goodsImg.mainImgs.length>0 && a.goodsImg.mainImgs[0]!=''){
								a.addImgMake(a.goodsImg.mainImgs[0],"box0");
							}
							if(a.goodsImg.mainImgs.length>1 && a.goodsImg.mainImgs[1]!=''){
								a.addImgMake(a.goodsImg.mainImgs[1],"box1");
							}
							if(a.goodsImg.mainImgs.length>2 && a.goodsImg.mainImgs[2]!=''){
								a.addImgMake(a.goodsImg.mainImgs[2],"box2");
							}
						}
						// if ("" != b.itempic_copy) {
						// 	for (a.goodsImg.marketImgs = [], e = 0; e < b.itempic_copy.length; e++){
						// 		a.goodsImg.marketImgs[e] = b.itempic_copy[e] + "_600x600.jpg";
						// 	}
						// }
						// else {
						// 	a.goodsImg.marketImgs = ["", "", ""];
						// }
						a.$forceUpdate()
					} else 100 == c.info.status ? loginFun() : layer.alert(c.info.status_err, {
						icon: 2
					})
				}, function () {
					layer.closeAll();
					layer.alert("网络错误", {
						icon: 5
					})
				}) : (layer.closeAll(), layer.msg("你输入的信息中没有获取到产品id，请重新输入有效的商品链接"))
			} else layer.closeAll(), layer.msg("无效的商品链接！", {
				time: 1500,
				shade: .1,
				shadeClose: !0
			})
		},
		cleanImg: function (a) {
			this.ExplaninArr[a].exImg = ""
		},
		cleanTips: function (a) {
			a.currentTarget.innerHTML = ""
		},
		cleanTipsRound: function () {
			this.roundTipsC = ""
		},
		cleanTipsOblong: function () {
			this.oblongTipsC = ""
		},
		hoverAdd: function (a) {
			this.hoverIndex = a != this.hoverIndex ? a : -1
		},
		addImgMake: function (a, b) {
			this.ExplaninArr[b].exImg = a;
			this.hoverIndex = -1
		},
		copy: function () {
			this.imgMakeUrl ? layer.msg("复制成功", {
				icon: 1,
				itme: 1500
			}) : layer.msg("暂无合成图片", {
				icon: 2,
				itme: 1500
			});
			var a = new ClipboardJS(".copyUrl", {
				target: function () {
					return document.querySelector(".unitePic")
				}
			});
			a.on("success", function (a) {
				if (0 == a.trigger.disabled || void 0 == a.trigger.disabled) a.trigger.disabled = !0, setTimeout(function () {
					a.trigger.disabled = !1
				}, 2E3)
			});
			a.on("error", function () {
				a.destroy()
			})
		},
		downImgMake: function () {
			this.imgMakeUrl ? this.downloadIamge(this.imgMakeUrl, Math.round(1E3 * Math.random())) : layer.msg("暂无合成图片", {
				icon: 2,
				itme: 1500
			})
		},
		downloadIamge: function (a, b) {
			var d = new Image;
			d.setAttribute("crossOrigin", "anonymous");
			d.onload = function () {
				var a = document.createElement("canvas");
				a.width = d.width;
				a.height = d.height;
				a.getContext("2d").drawImage(d, 0, 0, d.width, d.height);
				a = a.toDataURL("image/png");
				var f = document.createElement("a"),
					e = new MouseEvent("click");
				f.download = b || "图片";
				f.href = a;
				f.dispatchEvent(e)
			};
			d.src = a
		},
		setFontColor: function (a, b) {
			a = document.getElementsByClassName(a);
			for (var d = a.length, c = 0; c < d; c++) a[c].style.color = b
		},
		getContrastYIQ: function (a) {
			var b = parseInt(a.substr(0, 2), 16),
				d = parseInt(a.substr(2, 2), 16);
			a = parseInt(a.substr(4, 2), 16);
			return 128 <= (299 * b + 587 * d + 114 * a) / 1E3 ? "black" : "gray"
		},
		setFontSize: function (a, b, d) {
			a = document.getElementsByClassName(a);
			d = a.length;
			b /= 16;
			for (var c = 0; c < d; c++) a[c].style.fontSize = b + "em"
		},
		setFontFamily: function (a, b) {
			a = document.getElementsByClassName(a);
			for (var d = a.length, c = 0; c < d; c++) a[c].style.fontFamily = b
		},
		openCloseFontFamily: function (a, b, d, c) {
			d = c.currentTarget;
			0 == d.getAttribute("data-open") ? (d.setAttribute("data-open", "1"), this.fontAbout[b][a].isfontShow = !0) : (d.setAttribute("data-open", "0"), this.fontAbout[b][a].isfontShow = !1)
		},
		blurf: function (a, b, d, c) {
			d && (this.fontAbout[b][a].isfontShow = !1, setTimeout(function () {
				for (var a = document.getElementsByClassName("butText"), c = a.length, b = 0; b < c; b++) a[b].setAttribute("data-open", "0")
			}, 300))
		},
		setTipsBg: function (a, b) {
			a = document.getElementsByClassName(a);
			for (var d = a.length, c = 0; c < d; c++) a[c].style.backgroundColor = b
		},
		setStyle: function (a, b) {
			2 == this.tipsType && (this.objSpike.isStyleShow = !1, this.objSpike.defineName = b, this.objSpike.defineclass = a);
			3 == this.tipsType && (this.oFiery.FieryIsStyleShow = !1, this.oFiery.FieryDefineName = b, this.oFiery.FieryDefineclass = a)
		},
		TypesetBtn: function (a) {
			this.objSpike.isTypesetShow = !1;
			this.objSpike.defineTypesetName = a.name;
			this.objSpike.definTypeset = a.className;
			if (0 == a.number) for (a = 0; a < this.objSpike.countArr.length; a++) this.objSpike.countArr[a].money.size = 16;
			else for (a = 0; a < this.objSpike.countArr.length; a++) this.objSpike.countArr[a].money.size = 12
		},
		regstyleBtn: function () {
			this.objSpike.isTypesetShow = !1;
			this.objSpike.isStyleShow = !1
		},
		styleAdd: function () {
			if (2 == this.tipsType) {
				if (20 <= this.objSpike.countArr.length) {
					layer.msg("不能再添加了", {
						icon: 2
					});
					return
				}
				this.objSpike.countArr.push({
					title: {
						tit: "商品标题",
						name: "三只松鼠",
						size: "18",
						color: "#fff"
					},
					money: {
						tit: "原价",
						name: "50.0",
						size: "16",
						color: "#fff"
					},
					quan: {
						tit: "券后价",
						name: "10.0",
						size: "16",
						color: "#fff"
					},
					time: {
						tit: "日期",
						name: "3月14号 上午10:00",
						size: "16",
						color: "#fff"
					},
					image: ""
				});
				"Tspstyle0" == this.objSpike.definTypeset && (this.objSpike.countArr[this.objSpike.countArr.length - 1].money.size = 12)
			}
			3 == this.tipsType && (20 <= this.oFiery.FieryCountArr.length ? layer.msg("不能再添加了", {
				icon: 2
			}) : this.oFiery.FieryCountArr.push({
				title: {
					tit: "品牌",
					name: "[三只松鼠]",
					size: "16",
					color: "#fff"
				},
				money: {
					tit: "标题",
					name: "零食大礼包",
					size: "16",
					color: "#fff"
				},
				quan: {
					tit: "出单量",
					name: "6666",
					size: "32",
					color: "#fff"
				},
				time: {
					tit: "日期",
					name: "3.20",
					size: "16",
					color: "#fff"
				},
				image: ""
			}))
		},
		styleDelete: function (a, b) {
			2 == this.tipsType && this.objSpike.countArr.splice(b, 1);
			3 == this.tipsType && this.oFiery.FieryCountArr.splice(b, 1)
		},
		stylFile: function (a, b) {
			if (a = a.target.files[0]) {
				if (2 == this.tipsType) {
					if (!/image\/\w+/.test(a.type)) return layer.alert("文件必须为图片哦!", {
						icon: 2
					}), !1;
					if (512E4 <= a.size) {
						layer.msg("图片大小过大，应小于5M！", {
							icon: 2
						});
						return
					}
					var d = new FileReader;
					d.readAsDataURL(a);
					d.onload = function (a) {
						b.image = this.result
					}
				}
				if (3 == this.tipsType) {
					if (!/image\/\w+/.test(a.type)) return layer.alert("文件必须为图片哦!", {
						icon: 2
					}), !1;
					512E4 <= a.size ? layer.msg("图片大小过大，应小于5M！", {
						icon: 2
					}) : (d = new FileReader, d.readAsDataURL(a), d.onload = function (a) {
						b.image = this.result
					})
				}
			}
		},
		drop_img: function (a, b) {
			2 == this.tipsType ? b.image = a.dataTransfer.getData("img_url") : 3 == this.tipsType ? b.image = a.dataTransfer.getData("img_url") : this.ExplaninArr[b].exImg = a.dataTransfer.getData("img_url")
		},
		tipsTypeBtn: function (a) {
			this.tipsType = a;
			this.imgMakeUrl = "";
			2 == a && (this.objSpike.defineSwpierImg = this.objSpike.swpierImg[0])
		},
		spikeBtn: function (a, b) {
			2 == this.tipsType && (this.objSpike.clickRecord = b);
			3 == this.tipsType && (this.oFiery.FieryclickRecord = b);
			this.AddDefaultData()
		},
		AddDefaultData: function () {
			var a = this.goodsImg.arraygoodsDATA.array_all,
				b = this.goodsImg.arraygoodsDATA;
			"" != a && void 0 != a && 2 == this.tipsType && "" == this.objSpike.countArr[this.objSpike.clickRecord].image && (this.objSpike.countArr[this.objSpike.clickRecord].title.name = a.itemshorttitle, this.objSpike.countArr[this.objSpike.clickRecord].money.name = a.itemprice, this.objSpike.countArr[this.objSpike.clickRecord].quan.name = a.itemendprice, this.objSpike.countArr[this.objSpike.clickRecord].time.name = a.couponstarttime, this.objSpike.countArr[this.objSpike.clickRecord].image = a.itempic);
			"" != a && void 0 != a && 3 == this.tipsType && "" == this.oFiery.FieryCountArr[this.oFiery.FieryclickRecord].image && (this.oFiery.FieryCountArr[this.oFiery.FieryclickRecord].title.name = a.shopname, this.oFiery.FieryCountArr[this.oFiery.FieryclickRecord].money.name = a.itemshorttitle, this.oFiery.FieryCountArr[this.oFiery.FieryclickRecord].quan.name = b.itemsale, this.oFiery.FieryCountArr[this.oFiery.FieryclickRecord].time.name = a.couponstarttime_plus, this.oFiery.FieryCountArr[this.oFiery.FieryclickRecord].image = a.itempic)
		},
		getRealpic: function () {
			"" == this.goodsId ? layer.msg("请先获取商品", {
				tiem: 2E3,
				shade: .1,
				shadeClose: !0
			}) : this.$refs.vmpic.ajaxIrealpic(!0)
		}
	},
	directives: {
		focus: {
			inserted: function (a) {
				a.focus()
			}
		}
	},
	mounted: function () {
		this.shopUrl && (this.tbUrl = decodeURIComponent(decodeURIComponent(this.shopUrl)));
		if (document.images) {
			img1 = new Image,
				img2 = new Image,
				img3 = new Image,
				img4 = new Image,
				img5 = new Image,
				img1.src = this.objSpike.swpierImg[0],
				img2.src = this.objSpike.swpierImg[1],
				img3.src = this.objSpike.swpierImg[2],
				img4.src = URLPrefix.static_url + "/static/platform/images/web/tools/Tsp1.png",
				img5.src = URLPrefix.static_url + "/static/platform/images/web/tools/Tsp2.png";
		}
		if (this.tbUrl != '') {
			this.getGoodsImgs(true);
		}
	},
	created: function () {
		this.isFileReader()
	},
	computed: {},
	watch: {}
});