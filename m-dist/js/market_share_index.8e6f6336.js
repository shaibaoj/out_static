(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"373":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{"value":!0});var r,a=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),o=function get(e,t,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var a=Object.getPrototypeOf(e);return null===a?void 0:get(a,t,n)}if("value"in r)return r.value;var o=r.get;return void 0!==o?o.call(n):void 0},i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=_interopRequireDefault(n(0)),c=_interopRequireDefault(n(6)),l=n(95),p=n(96);n(599);var s=_interopRequireDefault(n(601)),f=_interopRequireDefault(n(604));function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}var d=(0,p.connect)(function(e){var t=e.order;return i({},t)})(r=function(e){function Share(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Share);var e=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Share.__proto__||Object.getPrototypeOf(Share)).apply(this,arguments));return e.config={"navigationBarTitleText":"分享有礼"},e.componentWillMount=function(){e.setState({"shareType":e.$router.params.shareType?e.$router.params.shareType:"hongbao"})},e.state={"shareType":"hongbao"},e}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Share,c.default.Component),a(Share,[{"key":"render","value":function render(){var e=this.state.shareType;return u.default.createElement(l.View,null,!e||""==e||"hongbao"==e&&u.default.createElement(s.default,{"code":"adsfd","url":"https://www.baidu.com/"}),"miandan"==e&&u.default.createElement(f.default,{"content":"今天打的奥迪收拾收拾","url":"https://www.baidu.com/"}))}},{"key":"componentDidMount","value":function componentDidMount(){o(Share.prototype.__proto__||Object.getPrototypeOf(Share.prototype),"componentDidMount",this)&&o(Share.prototype.__proto__||Object.getPrototypeOf(Share.prototype),"componentDidMount",this).call(this)}},{"key":"componentDidShow","value":function componentDidShow(){o(Share.prototype.__proto__||Object.getPrototypeOf(Share.prototype),"componentDidShow",this)&&o(Share.prototype.__proto__||Object.getPrototypeOf(Share.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){o(Share.prototype.__proto__||Object.getPrototypeOf(Share.prototype),"componentDidHide",this)&&o(Share.prototype.__proto__||Object.getPrototypeOf(Share.prototype),"componentDidHide",this).call(this)}}]),Share}())||r;t.default=d},"382":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{"value":!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n(6),o=_interopRequireDefault(a),i=_interopRequireDefault(n(23));function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function nav(e){var t="";if("category"==e.action?t="/pages/category/index":"detail"==e.action?t="/pages/detail/index":"home"==e.action?t="/pages/home/index":"login"==e.action?t="/pages/login/index":"benefits"==e.action?t="/pages/market/benefits/index":"hongbao"==e.action?t="/pages/market/hongbao/index":"invite"==e.action?t="/pages/market/invite/index":"jiu"==e.action?t="/pages/market/jiu/index":"open"==e.action?t="/pages/market/open/index":"openApp"==e.action?t="/pages/market/openApp/index":"share"==e.action?t="/pages/market/share/index":"top"==e.action?t="/pages/market/top/index":"vip"==e.action?t="/pages/market/vip/index":"favorite"==e.action?t="/pages/member/favorite/index":"history"==e.action?t="/pages/member/history/index":"income"==e.action?t="/pages/member/income/index":"order"==e.action?t="/pages/member/order/index":"payment"==e.action?t="/pages/member/payment/index":"points"==e.action?t="/pages/member/points/index":"setting"==e.action?t="/pages/member/setting/index":"search"==e.action?t="/pages/search/index":"user"==e.action?t="/pages/user/index":"web"==e.action&&(t="/pages/web/index"),""!=t)return o.default.navigateTo({"url":t})}t.default=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{"data":{}}).data;"openMini"==e.action?o.default.getEnv()===o.default.ENV_TYPE.WEB?o.default.navigateTo({"url":e.params.click_url}):(0,a.navigateToMiniProgram)({"appId":e.params.we_app_info.app_id,"path":e.params.we_app_info.page_path,"extraData":{"foo":"bar"},"envVersion":"release","success":function success(e){}}).then(function(){}):"load_action"==e.action?(0,i.default)({"url":"/cms/load/view","method":"POST","data":r({},e.params)}).then(function(e){nav(e)}):nav(e)}},"599":function(e,t,n){},"601":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{"value":!0});var r,a=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=_interopRequireDefault(n(0)),u=_interopRequireDefault(n(6)),c=_interopRequireDefault(n(377)),l=n(95),p=n(96);n(602);var s=_interopRequireDefault(n(382));function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var f=(0,p.connect)(function(e){var t=e.common;return o({},t)})(r=function(e){function Agent(){var e,t,n;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Agent);for(var r=arguments.length,a=Array(r),i=0;i<r;i++)a[i]=arguments[i];return t=n=_possibleConstructorReturn(this,(e=Agent.__proto__||Object.getPrototypeOf(Agent)).call.apply(e,[this].concat(a))),n.goPage=function(e){if("/pages/login/index"!=e.currentTarget.dataset.url||!n.props.token)if(e.currentTarget.dataset.url&&""!=e.currentTarget.dataset.url)u.default.navigateTo({"url":e.currentTarget.dataset.url});else{var t=n.props.data;(0,s.default)({"data":o({},t.action,{"params":{"tab":e.currentTarget.dataset.tab}})})}},_possibleConstructorReturn(n,t)}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Agent,u.default.Component),a(Agent,[{"key":"render","value":function render(){this.props.data;return i.default.createElement(l.View,{"className":"share-page"},i.default.createElement(l.View,null,i.default.createElement(l.Image,{"className":"img","mode":"widthFix","src":"https://img.youdanhui.cn/cms_img/2019-06-16/5d0601ef8765e.png"})),i.default.createElement(l.View,null,i.default.createElement(l.Image,{"className":"img","mode":"widthFix","src":"https://imgs.gmilesquan.com/images/promote_envelope/title.png?imageView2/0/format/png"})),i.default.createElement(l.View,{"className":"envelope envelope-open"},i.default.createElement(l.View,{"className":"envelope-open-wrap"},i.default.createElement(l.View,{"className":"envelope-open-title"},"恭喜您获得现金红包"),i.default.createElement(l.View,{"className":"envelope-open-dec"},i.default.createElement(l.View,{"className":"envelope-open-money"},i.default.createElement(l.Text,{"className":"money-tip"},"￥"),i.default.createElement(l.Text,{"className":"money-value"},"8.88"))),i.default.createElement(l.View,{"className":"envelope-open-save"},"已存入您的钱包")),i.default.createElement(l.View,{"className":"copy-btn"},i.default.createElement(l.View,{"className":"envelope-open-btn"},"立即提现")),i.default.createElement(l.View,{"className":"envelope-open-time"},"请在",i.default.createElement(l.Text,null,"27:03"),"分内提现,过期失效哦")))}}]),Agent}())||r;f.defaultProps={"data":{}},f.propTypes={"data":c.default.object},t.default=f},"602":function(e,t,n){},"604":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{"value":!0});var r,a=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=_interopRequireDefault(n(0)),u=_interopRequireDefault(n(6)),c=_interopRequireDefault(n(377)),l=n(95),p=n(96),s=_interopRequireDefault(n(605));n(606);var f=_interopRequireDefault(n(382));function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}var d=(0,p.connect)(function(e){var t=e.common;return o({},t)})(r=function(e){function Miandan(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Miandan);var e=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Miandan.__proto__||Object.getPrototypeOf(Miandan)).apply(this,arguments));return e.goPage=function(t){if("/pages/login/index"!=t.currentTarget.dataset.url||!e.props.token)if(t.currentTarget.dataset.url&&""!=t.currentTarget.dataset.url)u.default.navigateTo({"url":t.currentTarget.dataset.url});else{var n=e.props.data;(0,f.default)({"data":o({},n.action,{"params":{"tab":t.currentTarget.dataset.tab}})})}},e.goApp=function(t){var n=e.props.content.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");console.log(n);var r=new s.default(".copytext-btn",{"text":function text(){return n}});r.on("success",function(e){e.clearSelection(),r.destroy(),console.log("成功")}),r.on("error",function(e){console.log(e),console.log("失败")})},e.state={"content":""},e}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Miandan,u.default.Component),a(Miandan,[{"key":"render","value":function render(){this.props.data;return i.default.createElement(l.View,{"className":"share-page"},i.default.createElement(l.View,null,i.default.createElement(l.Image,{"className":"img","mode":"widthFix","src":"https://img.youdanhui.cn/cms_img/2019-06-17/5d0706dfba593.png"})),i.default.createElement(l.View,{"className":"content"},i.default.createElement(l.Image,{"className":"img","mode":"widthFix","src":"http://ms1.sqkb.com/dist/image/webview/eug/mentorTask/sharelanding2-coupons-41ed15ab76.png"}),i.default.createElement(l.View,{"className":"btn copytext-btn","onClick":this.goApp})))}}]),Miandan}())||r;d.defaultProps={"data":{},"content":"","url":""},d.propTypes={"data":c.default.object,"content":c.default.string,"url":c.default.string},t.default=d},"606":function(e,t,n){}}]);