
var vmminxCommonData = {
    methods: {
        navToPage: function (path) {
            window.location.href = path;
        },
        navAction: function (item) {
            var self = this;
            if (item.action.path) {
                self.navTo(item.action.path, item.action.params)
            } else if (item.action.actionh5 === 'load_action') {
                self.loadAction(item.action)
            } else if (item.action.actionh5 === 'web') {
                self.openWeb(item.action)
            } else if (item.action.actionh5 === 'copy') {
                self.openWeb(item.action)
            }
        },
        loadAction: function (action) {
            var self = this;
            var options = {}
            options = Object.assign(options, action.params)
            ajaxPost("/cms/load/view", options, function (res) {
                if (res.info.status == 0) {
                    self.navAction(res.data.item)
                }
            }, function () { })
        },
        openWeb: function (action) {
            window.location.href = action.params.webUrl;
        },
        navTo: function (path, params) {
            var paramsUrl = parseParams(params);
            window.location.href = path + '?' + paramsUrl;
        },
        toNav: function (item) {
            this.navAction(item)
        },
    }
};


var vmminxAppData = {
    data: {
        app_url: '/app.app.view',
        app: {
            detail: {},
            jump_url: '',
            downloads: 0,
            notice: false,
            show: false,
            btnText: '一键复制',
            copyStatus: false
        }
    },
    methods: {
        queryApp: function () {
            var $this = this;
            ajaxPost(URLPrefix.baseUrl + $this.app_url, {}, function (result) {
                if (result.code == 0 && result.data.detail) {
                    $this.app.detail = result.data.detail;

                    var androidUrl = result.data.detail.android_url;
                    var iosUrl = result.data.detail.ios_url;
                    if (URLPrefix.ua.match(/iphone/i) == "iphone" || URLPrefix.ua.match(/ipad/i) == "ipad") {
                        $this.app.jump_url = iosUrl;
                    } else {
                        $this.app.jump_url = androidUrl;
                    }
                }
            });
        },
        showApp: function () {
            this.app.show = true;
        },
        hideApp: function () {
            this.app.show = false;
        },
        downloads_url: function () {
            var $this = this;
            if (mobileUtil.isIOS && mobileUtil.isWeixin) {
                location.href = $this.app.jump_url;
            } else if (mobileUtil.isAndroid && mobileUtil.isWeixin && $this.app.jump_url.indexOf("app.qq.com") <= 0) {
                $this.app.notice = true;
            } else {
                location.href = $this.app.jump_url;
            }
        },
        appCopyContent: function () {
            var $this = this;
            var clipboard = new ClipboardJS('.appCopy', {
                target: function () {
                    return document.querySelector('.shareapp-code');
                }
            });
            clipboard.on('success', function (e) {
                layer.msg('复制成功', {
                    time: 1500
                });
                e.clearSelection();
                clipboard.destroy();
                $this.app.btnText = '复制成功';
                $this.app.copyStatus = true;
                setTimeout(function () {
                    $this.app.btnText = '一键复制';
                    $this.app.copyStatus = false;
                }, 2000);
            });
            clipboard.on('error', function (e) {
                layer.msg('由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！', {
                    icon: 2
                });
                $this.app.btnText = '复制失败';
            });
        },
        get_downloads: function () {
            var $this = this;
            ajaxPost(URLPrefix.baseUrl + "/app.app.downloads", {}, function (result) {
                if (result.info.status == 0) {
                    $this.app.downloads = result.data.downloads;
                    setTimeout(function () {
                        $this.get_downloads();
                    }, 1000);
                }
            });
        },
        hideNotice: function () {
            this.app.notice = !this.app.notice;
        },
    }
};



Vue.component('component-app', {
  props: ['app'],
  data: function () {
    return {
    }
  },
  mounted: function () {
  },
  methods: {
    showApp: function () {
      this.$emit("show-app");
    },
  },
  template:
    '<div class="app-download">' +
    '<div class= "app-icon">' +
    '<img v-if="app.detail.icon_url != \'\'" :src="app.detail.icon_url">' +
    '</div>' +
    '<div class="app-content">' +
    '<div class="app-title">{{ app.detail.name }}</div>' +
    '<div class="app-desc">{{ app.detail.description }}</div>' +
    '</div>' +
    '<div class="app-download-buttons" @click="showApp" >' +
    '<p class="app-download-botton">' +
    '<span>下载APP</span>' +
    '</p>' +
    '</div >' +
    '</div > '
});


Vue.component('component-app-bar', {
  props: ['app'],
  data: function () {
    return {

    }
  },
  methods: {
    showApp: function () {
      this.$emit("show-app");
    },
  },
  template:
    '<div class="app-bar">' +
    '<div class="app-bar-content">' +
    '<div class="app-title">{{ app.detail.name }}</div>' +
    '<div class="app-desc">{{ app.detail.description }}</div>' +
    '</div>' +
    '<div class="app-download-buttons" @click="showApp">' +
    '<p class="app-download-botton">' +
    '<span>下载APP</span>' +
    '</p>' +
    '</div>' +
    '</div>'
});

Vue.component('component-app-dialog', {
  props: ['app'],
  data: function () {
    return {
    }
  },
  mounted: function () {
  },
  methods: {
    hideApp () {
      this.$emit("hide-app");
    },
    downloads_url () {
      var $this = this;
      if (mobileUtil.isIOS && mobileUtil.isWeixin) {
        location.href = $this.app.jump_url;
      } else if (mobileUtil.isAndroid && mobileUtil.isWeixin && $this.app.jump_url.indexOf("app.qq.com") <= 0) {
        $this.app.notice = true;
      } else {
        location.href = $this.app.jump_url;
      }
    },
    appCopyContent () {
      var $this = this;
      var clipboard = new ClipboardJS('.appCopy', {
        target: function () {
          return document.querySelector('.shareapp-code');
        }
      });
      clipboard.on('success', function (e) {
        layer.msg('复制成功', {
          time: 1500
        });
        e.clearSelection();
        clipboard.destroy();
        $this.app.btnText = '复制成功';
        $this.app.copyStatus = true;
        setTimeout(() => {
          $this.app.btnText = '一键复制';
          $this.app.copyStatus = false;
        }, 2000);
      });
      clipboard.on('error', function (e) {
        layer.msg('由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！', {
          icon: 2
        });
        $this.app.btnText = '复制失败';
      });
    },
  },
  template:
    '<div class="app-box dialog-box">' +
    '<div class="box-mask" @click="hideApp"></div>' +
    '<div class="box-content">' +
    '<div class="box-title">恭喜您</div>' +
    '<div class="box-content">' +
    '<p class="box-text">先复制邀请码</p>' +
    '<div class="box-invite-code">' +
    '<div class="copyBut flex-box">' +
    '<p class="flex-two">邀请码：' +
    ' <span class="shareapp-code">{{app.detail.invite_code}}</span>' +
    '</p>' +
    '<a :data-clipboard-text="app.detail.invite_code" href="javascript:;"' +
    'class="flex-one appCopy" @click="appCopyContent">复制' +
    '</a>' +
    '</div>' +
    '</div>' +
    '<p class="box-text">再打开app，点击领取福利金，即可领取福利商品</p>' +
    '<div class="box-btn animation-btn" @click="downloads_url">立即打开APP，领取福利</div>' +
    '<marquee direction="up" scrollamount="1" class="marquee">' +
    '<span>186****1198 刚刚领取了商品</span>' +
    '</marquee>' +
    '</div>' +
    '</div>' +
    '</div>'
});


Vue.component('component-buys', {
  data: function () {
    return {

    }
  },
  methods: {
  },
  template:
    '<div class="buyWrap">' +
    '<div class="buyBox" style="animation: 100s linear 0s infinite normal none running scrollItps;">' +
    '<div class="buyItem">恭喜用户<i>*</i>领取了商品</div>' +
    '</div>' +
    '</div>'
});


Vue.component('component-share-dialog', {
  props: ['share'],
  data: function () {
    return {
      btnText: '一键复制淘口令',
      copyStatus: false,
    }
  },
  mounted: function () {
  },
  methods: {
    hideShow () {
      this.$emit("hide-share");
    },
    shareCopyContent () {
      var $this = this;
      var clipboard = new ClipboardJS('.box-share-copy', {
        target: function () {
          return document.querySelector('.box-share-content');
        }
      });
      clipboard.on('success', function (e) {
        layer.msg('复制成功', {
          time: 1500
        });
        e.clearSelection();
        clipboard.destroy();
        $this.btnText = '复制成功';
        $this.copyStatus = true;
        setTimeout(() => {
          $this.btnText = '一键复制淘口令';
          $this.copyStatus = false;
        }, 2000);
      });
      clipboard.on('error', function (e) {
        layer.msg('由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！', {
          icon: 2
        });
        $this.btnText = '复制失败';
      });
    },
  },
  template:
    '<div class="share-box dialog-box">' +
    '<div class="box-mask" @click="hideShow"></div>' +
    '<div class="box-content">' +
    '<div class="box-title">温情提示</div>' +
    '<div class="box-main">' +
    '<div class="box-share-content">' +
    '<div class="box-share-message">{{share.content}}</div>' +
    '<div class="box-share-notice">' +
    '长按选择&gt;<span>拷贝</span>' +
    '</div>' +
    '</div>' +
    '<div :class="[\'box-btn\',\'box-share-copy\',copyStatus?\'status-success\':\'\']"' +
    ':data-clipboard-text="share.content" @click="shareCopyContent">' +
    '{{btnText}}</div>' +
    '<div class="notice-one">' +
    '复制成功后，分享给好友即可领取!' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'
});


Vue.component('component-banner', {
    mixins: [vmminxCommonData],
    props: ['itemData'],
    data: function () {
        return {
            
        }
    },
    methods: {
        pagebtn: function () {
            this.$emit("pagejump");
        },
        pagesurebtn: function () {
            this.$emit("pagesurebtn");
        },
    },
    template:$('#component_banner').html()
});


Vue.component('component-nav', {
    mixins: [vmminxCommonData],
    props: ['itemData', 'properties'],
    data: function () {
        return {

        }
    },
    methods: {
        pagebtn: function () {
            this.$emit("pagejump");
        },
        pagesurebtn: function () {
            this.$emit("pagesurebtn");
        },
    },
    template: $('#component_nav').html()
});

Vue.component('component-nav-list', {
    mixins: [vmminxCommonData],
    props: ['itemData'],
    data: function () {
        return {
            loading: false,
            finished: false,
            items: [],
            queryParam: {
                ipage: 0
            }
        };
    },
    methods: {
        pagesurebtn: function () {
            this.$emit("pagesurebtn");
        },
        onLoad: function () {
            this.queryItems()
        },
        queryItems: function () {
            var self = this;
            if (self && self.itemData && self.itemData.url) {
                self.loading = true;
                ajaxPost(self.itemData.url, Object.assign((self.itemData || {}).condition, {
                    ipage: self.queryParam.ipage
                }), function (res) {
                    if (res.info.status == 0) {
                        if (res.data && res.data.items) {
                            self.items.push(
                                ...res.data.items
                            );
                        } else {
                            self.finished = true;
                        }
                        self.queryParam.ipage = res.data.pager.ipage + 1;
                    }
                    self.loading = false;
                }, function () {

                })
            }
        }
    },
    template: '#component_nav_list'
});