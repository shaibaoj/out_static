/* FILE BEGIN common/script/module/alertBox/2.0.0/alertBox.js */
(function(a, b, c) {
	if (typeof module !== "undefined" && module.exports) {
		module.exports = b(a, c)
	} else {
		if (typeof define === "function" && define.amd) {
			define(b(a, c))
		} else {
			a.AlertBox = b.call(a, a, c)
		}
	}
})(this, function(c, b) {
	var a = 0;

	function e(d) {
		if (!(this instanceof e)) {
			return new e(d).init()
		}
		this.opts = d || {};
		this.uuid = a;
		this.type = this.opts.type || "doubleBtn";
		this.alertCls = this.opts.alertCls || "";
		this.title = this.opts.title || "温馨提示";
		this.msg = this.opts.msg || "";
		this.cancelText = this.opts.cancelText || "取消";
		this.confirmText = this.opts.confirmText || "确定";
		this.cancel = this.opts.cancel || "";
		this.confirm = this.opts.confirm || "";
		this.callback = this.opts.callback || "";
		this.delay = this.opts.delay || 2000
	}
	e.prototype = {
		constructor: e,
		getEl: function(f, d) {
			return f.querySelector(d)
		},
		init: function() {
			var d = this;
			a++;
			d.setStyle();
			d.addAlertBox();
			d.type == "mini" ? d.minEvent() : d.alertEvent()
		},
		addAlertBox: function() {
			var d = this,
				f = d.getPos();
			d.getMask();
			d.getEl(b, "body").insertAdjacentHTML("beforeend", d.getHtml());
			d.alertBox = d.getEl(b, "#alertBox_" + d.uuid);
			d.alertBox.style.cssText = "width:" + parseInt(f.width - (2 * 25)) + "px;left:25px;top:" + parseInt(f.sTop + c.innerHeight / 2 - d.alertBox.offsetHeight / 2) + "px;";
			d.callback && typeof d.callback == "function" && d.type != "mini" && d.callback()
		},
		setStyle: function() {
			var f = this,
				g = b.createElement("style"),
				d = ".alert-box{position:absolute;left:0;top:0;border-radius:0.2rem;background:#FFF;-webkit-box-sizing:border-box;z-index:100;font-size:0.6rem;}.alert-msg{padding:0.4rem 0.6rem 0.6rem;text-align:center;line-height:1.8;word-break:break-all;}.alert-title{padding:0.6rem 0.6rem 0;text-align:center;}.alert-btn{display:-webkit-flex !important;display:-webkit-box;border-top:1px solid #DCDCDC;}.alert-btn a{display:block;-webkit-flex:1 !important;-webkit-box-flex:1;height:1.68rem;line-height:1.68rem;text-align:center;}.alert-btn a.alert-confirm{border-left:1px solid #DCDCDC;color:#EDA200;}.alert-btn a.alert-confirm.single{border-left:none;}.alert-mini-box{border-radius:0.2rem;background:rgba(0,0,0,.7);color:#fff;}";
			g.type = "text/css";
			g.innerText = d;
			f.getEl(b, "head").appendChild(g)
		},
		getPos: function() {
			var g = b.documentElement.offsetWidth || b.body.offsetWidth,
				f = b.documentElement.offsetHeight || b.body.offsetHeight,
				d = b.documentElement.scrollTop || b.body.scrollTop;
			if (c.innerHeight > f) {
				f = c.innerHeight
			}
			return {
				width: g,
				height: f,
				sTop: d
			}
		},
		getHtml: function() {
			var d = this,
				f = "";
			if (d.type != "mini") {
				f += '<div class="alert-box ' + d.alertCls + '" id="alertBox_' + d.uuid + '"><div class="alert-title">' + d.title + '</div><div class="alert-msg">' + d.msg + '</div><div class="alert-btn">';
				switch (d.type) {
				case "doubleBtn":
					f += '<a href="javascript:;" class="alert-cancel mr10">' + d.cancelText + '</a><a href="javascript:;" class="alert-confirm">' + d.confirmText + "</a>";
					break;
				case "onceCancel":
					f += '<a href="javascript:;" class="alert-cancel">' + d.cancelText + "</a>";
					break;
				case "onceConfirm":
					f += '<a href="javascript:;" class="alert-confirm single">' + d.confirmText + "</a>";
					break
				}
				f += "</div></div>"
			} else {
				f += '<div class="alert-box alert-mini-box ' + d.alertCls + '"  id="alertBox_' + d.uuid + '"><div class="alert-msg">' + d.msg + "</div></div>"
			}
			return f
		},
		getMask: function() {
			var f = this,
				g = f.getPos(),
				d = b.createElement("div");
			d.id = "alertMask_" + f.uuid;
			f.getEl(b, "body").appendChild(d);
			d.style.cssText = "position:absolute;left:0;top:0;width:" + g.width + "px;height:" + g.height + "px;background:rgba(0,0,0,0.3);z-index:99";
			f.type == "mini" && (d.style.backgroundColor = "rgba(255, 255, 255, 0)")
		},
		minEvent: function() {
			var d = this;
			setTimeout(function() {
				if (navigator.userAgent.match(/iPhone/i)) {
					$(d.alertBox).fadeOut(500, function() {
						d.getEl(b, "body").removeChild(d.alertBox);
						d.callback && typeof d.callback == "function" && d.callback()
					})
				} else {
					d.remove(d.alertBox);
					d.callback && typeof d.callback == "function" && d.callback()
				}
				d.remove(d.getEl(b, "#alertMask_" + d.uuid))
			}, d.delay)
		},
		alertEvent: function() {
			var f = this;
			if (f.alertBox) {
				var g = f.getEl(f.alertBox, ".alert-cancel"),
					d = f.getEl(f.alertBox, ".alert-confirm");
				g && f.reset(g, f.cancel);
				d && f.reset(d, f.confirm)
			}
		},
		reset: function(g, f) {
			var d = this;
			g.onclick = function() {
				f && typeof f == "function" && f(this);
				d.remove(d.alertBox);
				d.remove(d.getEl(b, "#alertMask_" + d.uuid))
			}
		},
		remove: function(d) {
			this.getEl(b, "body").removeChild(d)
		}
	};
	return e
}, document); 