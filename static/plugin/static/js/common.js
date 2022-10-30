
Vue.use(VueStorage, {
    namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
});
window.eventBus = new Vue();

var URLPrefix = {
    namespace:'pro__',
    api_url:"https://www.haopintui.net/api/plugin/business",
    times:"",
    url_sign:"",
    token: ''
};

URLPrefix.times = new Date().getTime();
URLPrefix.url_sign = $.md5("" + URLPrefix.times);

function parseParams(data) {
    try {
        var tempArr = [];
        for (var i in data) {
            var key = encodeURIComponent(i);
            var value = encodeURIComponent(data[i]);
            tempArr.push(key + '=' + value);
        }
        var urlParamsStr = tempArr.join('&');
        return urlParamsStr;
    } catch (err) {
        return '';
    }
}

function getUrlSearch(url, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url.slice(url.indexOf('?') + 1).match(reg);
    if (r != null) {
        try {
            return decodeURIComponent(r[2]);
        } catch (_e) {
            return null;
        }
    }
    return null;
}

var page = function (str, content) {
    if (!content) content = '';
    setTimeout(function () {
        window.location.href = str + '.html' + content;
    }, 50);

};
var pageAll = function (str) {
    setTimeout(function () {
        window.open(str);
    }, 50);
};

function Request(name) {
    var str = location.href;
    if (str.indexOf(name) != -1) {
        var num = str.indexOf(name);
        str = str.substring(num + name.length + 1);
        return str;
    }
}

var ajaxGet = function (url, data, successfun, errorfun) {
    var temp_errorfun = function (xhr, type) {
    };
    if (errorfun) {
        temp_errorfun = errorfun;
    }
    $.ajax({
        type: 'GET',
        url: url.indexOf('http') === 0 ? url : URLPrefix.api_url + url,
        data: Object.assign(data,{
            times:URLPrefix.times,
            url_sign:URLPrefix.url_sign,
            member_token:URLPrefix.token,
        }),
        dataType: 'json',
        timeout: 30000,
        success: successfun,
        error: temp_errorfun,
        xhrFields: {
            withCredentials: true
        },
    });
};

var ajaxPost = function (url, data, successfun, errorfun) {
    var temp_errorfun = function (xhr, type) {

    };
    if (errorfun) {
        temp_errorfun = errorfun;
    }
    $.ajax({
        type: 'POST',
        url: url.indexOf('http') === 0 ? url : URLPrefix.api_url + url,
        data: Object.assign(data,{
            times:URLPrefix.times,
            url_sign:URLPrefix.url_sign,
            member_token:URLPrefix.token,
        }),
        dataType: 'json',
        timeout: 30000,
        success: successfun,
        error: temp_errorfun,
        xhrFields: {
            withCredentials: true
        },
    });
};

var ajaxGetJsonp = function (url, data, successfun, errorfun) {  //jsonp跨域请求
    var temp_errorfun = function (xhr, type) {
    };
    if (errorfun) {
        temp_errorfun = errorfun;
    }
    $.ajax({
        type: 'GET',
        url: url,
        data: data,
        dataType: 'jsonp',
        timeout: 30000,
        success: successfun,
        error: temp_errorfun,
        xhrFields: {
            withCredentials: true
        },
    });
};

var HTTPurl = window.location.protocol;
var isHTTPurl = HTTPurl.substring(0, HTTPurl.length - 1);
var config = {
    goods: {},
    _url: "",
    urls: "/",
    cookies:{
        token:''
    },
    data:{
        queryInit:false,
        goods:{},
        campaignItems:[],
    },
    isHTTP: function () {
        var HTTPurl = window.location.protocol;
        var isHTTP = HTTPurl.substring(0, HTTPurl.length - 1);
        return isHTTP;
    },
    getUrl: function (str) {
        var reg = new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]", "ig");
        var r = str.match(reg)
        if (r != null) return r; return null;
    },
    getVideoUrl: function (str) {  //匹配视频地址
        var reg = new RegExp("(https?|ftp|file|http)://[-A-Za-z0-9+&@@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@@#/%=~_|]+.mp4", "ig");
        var r = str.match(reg)
        if (r != null) return r; return null;
    },
    ImgSizeFun: function (Arr, strArr) {
        for (var i = 0; i < strArr.length; i++) {
            Arr[i] = strArr[i] + config.ImgSize;
        }
        return Arr;
    },
    addPlugin: function(){
        $body = $('body');
        $body.prepend('<div id="hpt-plugin" class="hpt-plugin" style="display:none">'+
            '<hpt-tools></hpt-tools>'+
        '</div>');
    },
    addPluginMin: function(){
        $('ul.tb-meta,.tm-fcs-panel,.description,.detail-ind,.base-area,.item-service').after('\
        <div id="hpt-plugin-min" class="hpt-plugin hpt-plugin-min" style="display:none">\
        <hpt-tools-min></hpt-tools-min>\
        </div>\
        ');
    },
    expand: function(){
        $body = $('body');
        $body.css('padding-top','38px');

        $plugin = $('#hpt-plugin');
        $plugin.css('top','0px');
        $plugin.css('left','0px');
        $plugin.css('width','100%');
        $plugin.css('min-width','1200px');
    },
    contract: function(){
        $body = $('body');
        $body.css('padding-top','0px');

        $plugin = $('#hpt-plugin');
        $plugin.css('top','80px');
        $plugin.css('left','0px');
        $plugin.css('width','80px');
        $plugin.css('border-top','1px solid rgb(229, 229, 229)');
        $plugin.css('border-right','1px solid rgb(229, 229, 229)');
        $plugin.css('min-width','80px');
    },
    initPlugin: function(){
        chrome.storage.local.get('plugin_status', function (result) {
            if(result['plugin_status'] == 1){
                config.contract();
            }else{
                config.expand();
            }
        });
    },
    showPlugin: function(){
        $body = $('#hpt-plugin');
        $body.show();
        config.initPlugin();
    },
    showPluginMin: function(){
        $body = $('#hpt-plugin-min');
        $body.show();
    },
};

config._url = window.location.href;
config.addPlugin();
config.addPluginMin();

var tools_commission =
  '\
<div class="tier">\
    <div style="">\
        <div class="drop">\
            <p class="ibar" v-if="goods && goods.click">最高佣金 {{goods.click.commission_rate}}% <span>({{goods.click.commission}}元)</span></p>\
            <p class="ibar" v-else>最高佣金 <span>暂无</span></p>\
            <div class="campaign">\
                <table>\
                    <thead>\
                        <tr>\
                            <th style="width: 25%;">计划名称</th>\
                            <th style="width: 17%;">佣金比例</th>\
                            <th style="width: 17%;">佣金类型</th>\
                            <th style="width: 17%;">人工审核</th>\
                            <th style="width: 12%;">操作</th>\
                            <th style="width: 12%;">详情</th>\
                        </tr>\
                    </thead>\
                    <tbody>\
                        <!---->\
                        <tr v-for="(item,index) in campaignItems">\
                            <td>\
                            <a v-if="goods && goods.goods" :href="\'http://pub.alimama.com/promo/search/index.htm?queryType=2&amp;q=https%3A%2F%2Fdetail.tmall.com%2Fitem.htm%3Fid%3D\'+goods.goods.item_id" target="_blank">{{item.campaign_type_name}}</a>\
                            </td>\
                            <td>{{item.commission_rate}}%</td>\
                            <td><span class="simp-8">{{item.campaign_name}}</span></td>\
                            <td>否</td>\
                            <td></td>\
                            <td>\
                            <a v-if="goods && goods.goods" :href="\'http://pub.alimama.com/promo/search/index.htm?queryType=2&amp;q=https%3A%2F%2Fdetail.tmall.com%2Fitem.htm%3Fid%3D\'+goods.goods.item_id" target="_blank">详情</a>\
                            </td>\
                            <!---->\
                            <!---->\
                            <!---->\
                            <!---->\
                        </tr>\
                    </tbody>\
                </table>\
                <div class="qing-addin">\
                    <div class="qing-addin-wv">\
                        <p>当前版本：v2.0.1</p>\
                        <p><a href="https://www.haopintui.net" target="_blank">https://www.haopintui.net</a></p>\
                    </div>\
                    <div class="qing-addin-qr">\
                        <p>微信扫码<br>领取福利</p> <img src="https://cdn.jsdelivr.net/gh/shaibaoj/out_static/static/platform/images/web/plugin/code.png" width="82"\
                            height="82">\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>\
';

var tools_coupon =
  '\
<div class="tier">\
    <div>\
        <div class="drop">\
            <div class="coupon-hide">\
                <table>\
                    <thead>\
                        <tr>\
                            <th style="width: 32%;">优惠券信息</th>\
                            <th style="width: 18%;">有效期</th>\
                            <th style="width: 23%;">剩余数量</th>\
                            <th style="width: 10%;">转链</th>\
                            <th style="width: 9%;">复制</th>\
                            <th style="width: 9%;">领券</th>\
                        </tr>\
                    </thead>\
                    <tbody>\
                        <tr v-for="(item,index) in coupons">\
                            <td><a\
                            :href="\'https://uland.taobao.com/quan/detail?sellerId=\'+goods.goods.seller_id+\'&amp;activityId=\'+item.activity_id"\
                                    target="_blank">满{{item.condition}}减 {{item.money}}</a><i title="联盟券，放心使用"\
                                    class="qing-icon-1"></i></td>\
                            <td>{{item.start_date}} ~ {{item.end_date}}</td>\
                            <td>{{item.applied_count}} / {{item.total_count}}</td>\
                            <td><a :href="\'https://www.haopintui.net/quan/\'+goods.goods.id" target="_blank">转链</a></td>\
                            <td><a class="copy-coupon" href="javascript:;" @click="copyText(\'.copy-coupon\',\'https://uland.taobao.com/quan/detail?sellerId=\'+goods.goods.seller_id+\'&amp;activityId=\'+item.activity_id)">复制</a></td>\
                            <td><a href="javascript:;" @click="couponDraw(\'https://uland.taobao.com/quan/detail?sellerId=\'+goods.goods.seller_id+\'&amp;activityId=\'+item.activity_id,500,400)">领券</a></td>\
                            <!---->\
                        </tr>\
                        <tr v-if="goodsCoupon">\
                            <!---->\
                            <td><a :href="\'https://www.haopintui.net/quan/\'+goods.goods.id"\
                                target="_blank">满{{goodsCoupon.condition}}减 {{goodsCoupon.money}}</a><i title="联盟券，放心使用"\
                                class="qing-icon-1"></i></td>\
                            <td>{{goodsCoupon.start_date}} ~ {{goodsCoupon.end_date}}</td>\
                            <td>100000 / 100000</td>\
                            <td><a :href="\'https://www.haopintui.net/quan/\'+goods.goods.id" target="_blank">转链</a></td>\
                            <td>\
                                <!----> <i class="qing-icon-7"></i></td>\
                            <td></td>\
                        </tr>\
                    </tbody>\
                </table>\
            </div>\
            <div class="coupon-shop" style="display:none"><a href="javascript:;" class="initial">查询商家优惠券</a></div>\
            <div class="coupon-shop" style="display:none">\
                <div class="qing-title">\
                    <p><span>商家优惠券</span></p>\
                </div>\
                <table>\
                    <thead>\
                        <tr>\
                            <th style="width: 30%;">优惠券信息</th>\
                            <th style="width: 30%;">有效期\
                            </th>\
                            <th style="width: 20%;">复制</th>\
                            <th style="width: 20%;">领券</th>\
                        </tr>\
                    </thead>\
                    <tbody>\
                        <tr>\
                            <td colspan="4" class="center">等待查询</td>\
                        </tr>\
                    </tbody>\
                </table>\
            </div>\
        </div>\
    </div>\
</div>\
';

var tools_volume =
  '\
<div class="tier-special">\
    <div class="drop">\
        <p>月支出佣金：<span>5576.32元</span></p>\
        <div class="navs">\
            <ul class="qing-clear">\
                <li @click="changTrends(0)" :class="[trends==0?\'active\':\'\']">销量变化</li>\
                <li @click="changTrends(1)" :class="[trends==1?\'active\':\'\']">历史券后价</li>\
            </ul>\
        </div>\
        <div style="">\
            <div class="sales" :style="{\'display\':trends==1?\'none\':\'\'}">\
                <ul class="date qing-clear">\
                    <li class="">1-4</li>\
                    <li class="">1-5</li>\
                    <li class="">1-6</li>\
                    <li class="">1-7</li>\
                    <li class="">1-8</li>\
                    <li class="active">1-9\
                    </li>\
                    <li class="">1-10</li>\
                </ul>\
                <div class="ibar"><span>单日销量 ：\
                <b v-if="goods && goods.goods && goods.goods.day_sales">{{goods.goods.day_sales}}</b>\
                <b v-else>暂无</b>\
                </span></div>\
                <div class="tips" style="display: none;">获取中</div>\
                <div class="node"\
                    style="-webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: rgb(255, 255, 255);"\
                    _echarts_instance_="ec_1578588261043">\
                    <div\
                        style="position: relative; overflow: hidden; width: 454px; height: 200px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;">\
                        <canvas width="908" height="400" data-zr-dom-id="zr_0"\
                            style="position: absolute; left: 0px; top: 0px; width: 454px; height: 200px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"\
                            data-spm-anchor-id="a220o.1000855.0.i4.6acd61c0nQSLIh"></canvas></div>\
                    <div style="display: none;"></div>\
                    <div\
                        style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px sans-serif; padding: 5px; left: 314px; top: 71px;">\
                        时间：16:02<br>销量：39180</div>\
                </div>\
            </div>\
        </div>\
        <div style="display: none;">\
            <div class="group">\
                <ul class="date qing-clear">\
                    <li class="">1-4</li>\
                    <li class="">1-5</li>\
                    <li class="">1-6</li>\
                    <li class="">1-7</li>\
                    <li class="">1-8</li>\
                    <li class="">1-9</li>\
                    <li class="active">1-10</li>\
                </ul>\
                <div class="ibar">\
                    <span>暂无联盟采集记录 <a href="https://www.haopintui.net" target="_blank">我也想被收录？</a></span>\
                </div>\
                <!---->\
                <div class="tips">\
                    <p>我也想被收录？<br>\
                        <a href="https://www.haopintui.net" target="_blank">请点击查看《联盟推广采集记录条件》</a>\
                    </p>\
                </div>\
                <!---->\
            </div>\
        </div>\
        <div :style="{\'display\':trends==0?\'none\':\'\'}">\
            <div class="price">\
                <div class="ibar"><span>券后历史最低价 ：<b>暂无</b></span></div>\
                <div class="tips">暂无数据</div>\
                <div class="node" style="display: none;"></div>\
            </div>\
        </div>\
    </div>\
</div>\
';

var tools_wenan =
  '\
<div class="tier">\
    <div class="akey-copy">\
        <div class="akey-copy-content"><b></b>\
            <div id="akey-copy-content-copy">\
                <img :src="picUrl" width="115" height="115">\
                <p v-if="goods && goods.goods">{{goods.goods.title}}</p>\
                <p v-if="goods && goods.price">【原价】{{goods.price.price}}</p>\
                <p v-if="goods && goods.price">【到手价】{{goods.price.buy_price}}</p>\
                <p  v-if="goods && goods.goods && goods.coupon" class="akey-copy-content-coupon-url">领券:\
                    https://uland.taobao.com/quan/detail?sellerId={{goods.goods.seller_id}}&amp;activityId={{goods.coupon.activity_id}}\
                </p>\
                <p v-if="goods && goods.goods">下单: https://detail.tmall.com/item.htm?id={{goods.goods.item_id}}</p>\
                <p v-if="goods && goods.goods">已抢 {{goods.goods.volume_str}}+ 件，到手好价，需要的可以去看看！</p>\
            </div>\
        </div>\
    </div>\
    </div>\
    ';

var tools_shop =
  '\
    <div class="tier">\
    <div style="">\
        <div class="store">\
            <h6>店铺联系方式：</h6>\
            <ul>\
                <li class="info">\
                    <div class="hpt-col-1"><i class="i-1"></i>旺旺</div>\
                    <div v-if="shopInfo && shopInfo.wangwang" class="hpt-col-3"><a href="javascript:;">{{shopInfo.wangwang}}</a></div>\
                    <div v-if="shopInfo && shopInfo.wangwang" class="hpt-col-4"><a href="javascript:;">复制</a></div>\
                    <div v-if="!shopInfo" class="hpt-col-2"><a href="http://www.alimama.com/member/login.htm" target="_blank">登录淘宝联盟</a></div>\
                    <!---->\
                </li>\
                <li class="info">\
                    <div class="hpt-col-1"><i class="i-2"></i>QQ</div>\
                    <div v-if="shopInfo && shopInfo.qq" class="hpt-col-3"><a href="javascript:;">{{shopInfo.qq}}</a></div>\
                    <div v-if="shopInfo && shopInfo.qq" class="hpt-col-4"><a href="javascript:;">复制</a></div>\
                    <div v-if="!shopInfo" class="hpt-col-2"><a href="http://www.alimama.com/member/login.htm" target="_blank">登录淘宝联盟</a></div>\
                    <!---->\
                </li>\
                <li class="info">\
                    <div class="hpt-col-1"><i class="i-3"></i>微信</div>\
                    <div v-if="shopInfo && shopInfo.weixin" class="hpt-col-3"><a href="javascript:;">{{shopInfo.weixin}}</a></div>\
                    <div v-if="shopInfo && shopInfo.weixin" class="hpt-col-4"><a href="javascript:;">复制</a></div>\
                    <div v-if="!shopInfo" class="hpt-col-2"><a href="http://www.alimama.com/member/login.htm" target="_blank">登录淘宝联盟</a></div>\
                    <!---->\
                </li>\
                <li class="info" v-if="goods && goods.goods" >\
                    <p>登录无效？访问可能受限，点此<a :href="\'http://pub.alimama.com/myunion.htm?#!/promo/self/shop_detail?userNumberId=\'+goods.goods.seller_id"\
                            target="_blank" style="color: rgb(57, 156, 255);">解除限制</a></p>\
                </li>\
            </ul>\
        </div>\
    </div>\
</div>\
';

var tools_platform =
  '\
<div class="tier">\
    <div class="plats">\
        <ul>\
            <li style="display:none">\
                <div class="qing-clear">\
                    <div class="hpt-col-1"><i class="i-1"></i>好品推</div>\
                    <div class="hpt-col-3">\
                        <div class="hpt-cell-1"><a\
                            href="https://www.haopintui.net/quan/605639136423"\
                            target="_blank">6.9元</a></div>\
                        <div class="hpt-cell-2">券 <a\
                            href="https://www.haopintui.net/quan/605639136423" target="_blank">3元</a>\
                        </div>\
                        <div class="hpt-cell-3"><a\
                            href="https://www.haopintui.net/quan/605639136423"\
                            target="_blank">01-10</a> 到期</div>\
                        <div class="hpt-cell-4">三张券</div>\
                    </div>\
                </div>\
            </li>\
            <li>\
                <div class="qing-clear">\
                    <div class="hpt-col-1"><i class="i-2"></i>好品推</div>\
                    <div class="hpt-col-2">\
                        <div class="hpt-cell-2"><a href="https://www.haopintui.net/user/apply/business"\
                                target="_blank" class="special">去放单</a></div>\
                        <div class="hpt-cell-3">\
                            <div class="hpt-cell-3-info"><i class="i-8 hpt-cell-3-info-icon"></i>\
                                <span class="hpt-cell-3-info-txt">开放入驻中！</span></div>\
                        </div>\
                    </div>\
                </div>\
            </li>\
            <!---->\
        </ul>\
    </div>\
</div>\
';

var tools_transform =
  '\
<div class="tools_transform hide">\
    <div class="spin">\
        <div class="l-box">\
            <h1>使用以下信息进行推广</h1>\
            <div class="turn-info">\
                <div class="coupon">\
                    <h6 v-if="goods && goods.click">{{goods.click.commission_rate}}%</h6>\
                    <p>最高佣金</p>\
                </div>\
                <div class="campaign">\
                    <h6 v-if="goods && goods.coupon">满{{goods.coupon.condition}}减 {{goods.coupon.money}}</h6>\
                    <p>优惠券</p>\
                </div>\
            </div>\
            <h1>可用图片素材</h1>\
            <div class="imgs-box">\
                <ul class="imgs" v-if="goods && goods.goods">\
                    <li v-for="(item,index) in goods.goods.p_list" @click="changePic(index)" :class="[index == transformData.picIndex?\'active\':\'\']"><i></i>\
                    <img :src="item">\
                    </li>\
                </ul>\
            </div>\
        </div>\
        <div class="r-box"><a href="javascript:;" class="close"></a>\
            <ul>\
                <li><a href="javascript:;" @click="changeTransform(0)" :class="[0 == transformData.transformIndex?\'active\':\'\']" style="z-index: 1;">通用</a></li>\
                <li><a href="javascript:;" @click="changeTransform(1)" :class="[1 == transformData.transformIndex?\'active\':\'\']" style="z-index: 2;">微信</a></li>\
                <li><a href="javascript:;" @click="changeTransform(2)" :class="[2 == transformData.transformIndex?\'active\':\'\']" style="z-index: 3;">QQ</a></li>\
            </ul>\
            <div :class="[\'area\',\'skin-\'+(transformData.transformIndex+1)]" id="qing-spin-copy">\
                <img :src="transformPreview" width="115" height="115">\
                <p v-if="goods && goods.goods">{{goods.goods.d_title}}</p>\
                <p v-if="goods && goods.price">【原价】{{goods.price.price}}</p>\
                <p v-if="goods && goods.price">【到手价】{{goods.price.buy_price}}</p>\
                <p v-if="goods && goods.goods">{{goods.goods.comment}}</p>\
                <!---->\
                <!---->\
                <!---->\
                <p v-if="0 == transformData.transformIndex||2 == transformData.transformIndex">👉点击购买<span>{{transformData.shortLink}}</span></p>\
                <p v-if="0 == transformData.transformIndex||1 == transformData.transformIndex">👉也可长按复制这条信息，打开手机淘宝下单<span>{{transformData.token}}</span></p>\
            </div>\
            <div class="pid">\
                <div class="pid-input" @click="selectPid()">\
                    <input type="text" placeholder="请选择要使用的PID" :value="transformPid"><i></i>\
                </div>\
                <div id="spin-list" :class="[\'pid-list\',transformData.pidView==false?\'hide\':\'\']">\
                    <dl>\
                        <template v-if="pidList && pidList.length>0">\
                        <dd v-for="(item,index) in pidList" @click="changePid(index)" ><span class="pid-name">{{item.name}}</span>|<span class="pid-number">{{item.pid}}</span></dd>\
                        </template>\
                        <dt v-else>未登录淘宝联盟或未添加PID，请登录<a @click="openAlimama()" href="http://www.alimama.com/member/login.htm" target="_blank">淘宝联盟</a>\
                        并<a @click="openAlimama()" href="http://pub.alimama.com/myunion.htm?#!/manage/site/site?tab=4&amp;toPage=1" target="_blank">添加PID</a></dt>\
                    </dl>\
                </div>\
            </div>\
            <div class="operate">\
                <a href="javascript:;" @click="transformUrl()" class="make">生成文案</a>\
                <a href="javascript:;" @click="transformCopy()" class="copy-transform">一键复制</a>\
            </div>\
            <p>*自动采用最高佣金保障您的推广效果*<a href="https://www.haopintui.net/online.html" target="_blank" class="blue">使用问题和建议？请点这里&gt;</a></p>\
            <a :href="alimamaUrl" target="_blank">去淘宝联盟转链 &gt;</a>\
        </div>\
    </div>\
</div>\
';

var tools_tools =
  '\
<div class="chain hide">\
    <div class="setting qing-clear">\
        <p>设置话术模板：</p>\
        <ul>\
            <li><a href="javascript:;" @click="insert(\'{短标题}\')">{短标题}</a></li>\
            <li><a href="javascript:;" @click="insert(\'{介绍}\')">{介绍}</a></li>\
            <li><a href="javascript:;" @click="insert(\'{店铺类型}\')">{店铺类型}</a></li>\
            <li><a href="javascript:;" @click="insert(\'{原价}\')">{原价}</a></li>\
            <li><a href="javascript:;" @click="insert(\'{券后价}\')">{券后价}</a></li>\
            <li><a href="javascript:;" @click="insert(\'{销量}\')">{销量}</a></li>\
            <li><a href="javascript:;" @click="insert(\'{佣金比例}\')">{佣金比例}</a></li>\
            <li><a href="javascript:;" @click="insert(\'{领券链接}\')">{领券链接}</a></li>\
            <li><a href="javascript:;" @click="insert(\'{券满}\')">{券满}</a></li>\
            <li><a href="javascript:;" @click="insert(\'{券额}\')">{券额}</a></li>\
            <li><a href="javascript:;" @click="insert(\'{优惠券剩余数量}\')">{优惠券剩余数量}</a></li>\
            <li><a href="javascript:;" @click="insert(\'{优惠券有效限期}\')">{优惠券有效限期}</a></li>\
            <li><a href="javascript:;" @click="insert(\'{二合一长链接}\')">{二合一长链接}</a></li>\
            <li><a href="javascript:;" @click="insert(\'{二合一短链接}\')">{二合一短链接}</a></li>\
            <li><a href="javascript:;" @click="insert(\'{淘口令}\')">{淘口令}</a></li>\
        </ul>\
    </div>\
    <p class="tips">请勿在文案中输入￥，会和淘口令冲突。\
        <a href="javascript:;" @click="clearTemplate()">清空模板</a>\
        <a href="javascript:;" @click="restTemplate()">默认模板</a>\
        <a href="javascript:;" @click="saveTemplate()">保存模板</a>\
    </p>\
    <textarea class="word" v-model="toolsData.template" id="content_tools"></textarea>\
    <p class="tips">必须输入相匹配的优惠券和商品，否则打不开。不支持淘宝外部短链接。</p>\
    <textarea placeholder="你可以输入优惠券地址和商品普通地址（只输入商品地址会自动匹配默认券，无券则转链失败）\
https://detail.tmall.com/item.htm?id=xxxxxx\
https://market.m.taobao.com/apps/aliyx/coupon/detail.html?wh_weex=true&amp;sellerId=xxxxxx&amp;activityId=xxxxxx\
或者别人的二合一链接（网址不带“?e=”的）\
http://uland.taobao.com/coupon/edetail?activityId=xxxxxxx" class="link" v-model="toolsData.contentCopy"></textarea>\
    <div class="pid qing-clear">\
        <p>选择PID：</p>\
        <div class="pid-box">\
            <div class="pid-input" @click="selectPid()">\
                <input type="text" placeholder="请选择PID，未设置PID请手动输入" :value="transformPid"><i></i>\
            </div>\
            <div class="pid-list" :class="[\'pid-list\',transformData.pidView==false?\'hide\':\'\']">\
                <dl>\
                    <template v-if="pidList && pidList.length>0">\
                    <dd v-for="(item,index) in pidList" @click="changePid(index)" ><span class="pid-name">{{item.name}}</span>|<span class="pid-number">{{item.pid}}</span></dd>\
                    </template>\
                    <dt v-else>未登录淘宝联盟或未添加PID，请登录<a @click="openAlimama()" href="http://www.alimama.com/member/login.htm" target="_blank">淘宝联盟</a>\
                    并<a @click="openAlimama()" href="http://pub.alimama.com/myunion.htm?#!/manage/site/site?tab=4&amp;toPage=1" target="_blank">添加PID</a></dt>\
                </dl>\
            </div>\
        </div>\
        <a href="http://pub.alimama.com/myunion.htm?#!/manage/zone/zone?tab=3&amp;toPage=1" target="_blank">管理</a>\
    </div>\
    <a href="javascript:;" class="make" @click="transformContent()">生成</a>\
</div>\
';

var tools_tools_result =
  '\
<div class="chain-result hide">\
    <div class="address"><span>链接地址：</span><input class="tools-input-token" v-if="toolsData.goods && toolsData.goods.click" type="text" v-model="toolsData.goods.click.password_token"><a href="javascript:;" class="tools-a-token" @click="copyBtn(\'.tools-a-token\',\'.tools-input-token\')">复制</a></div>\
    <div class="password"><span>淘口令：</span><input class="tools-input-url" v-if="toolsData.goods && toolsData.goods.click" type="text" v-model="toolsData.goods.click.short_url"><a href="javascript:;" class="tools-a-url" @click="copyBtn(\'.tools-a-url\',\'.tools-input-url\')">复制</a></div>\
    <div contenteditable="true" id="qing-chain-content" class="content" v-html="toolsData.content"></div>\
    <a href="javascript:;" class="tools-copy" @click="copyBtn(\'.tools-copy\',\'#qing-chain-content\')">复制</a>\
</div>\
';

var tools_login =
  '\
<div class="hpt-login hide">\
<p>请登录后并刷新页面</p> <a href="https://www.haopintui.net/check_login" @click="openHptLogin" target="_blank">先检查登陆</a>\
</div>\
';

Vue.component("hpt-coupon", {
  props: ["value", "goods", "id", "campaignItems"],
  data: function () {
    return {
      query: {
        coupons: false,
      },
      coupons: [],
      goodsCoupon: null,
      shopInfo: null,
      trends: 0,
      pidList: [],
      transformData: {
        picIndex: 0,
        transformIndex: 0,
        pidView: false,
        pidIndex: 0,
        shortLink: "{二合一链接}",
        token: "{淘口令}",
      },
      toolsData: {
        defaultTemplate:
          "\
{短标题}\r\n\
券后【{券后价}元】包邮秒杀\r\n\
--------------------------------------\r\n\
{介绍}\r\n\
--------------------------------------\r\n\
领券下单链接: {二合一短链接},或者复制这段描述{淘口令}，打开☞手机淘◇寳☜即可领券购买！",
        template:
          "\
{短标题} \r\n\
券后【{券后价}元】包邮秒杀 \r\n\
领券下单: {二合一短链接} \r\n\
--------------------------------------\r\n\
{介绍} \r\n\
--------------------------------------\r\n\
本群专享优惠！已抢{销量}件！\r\n\
下单方式：复制这段描述{淘口令}，打开☞手机淘◇寳☜即可领券购买！",
        goods: null,
        api: null,
        layerOpenIndex: 0,
        content: "",
        contentCopy: "",
      },
    };
  },
  mounted: function () {
    this.init();
  },
  methods: {
    init: function () {
      this.query_shop();
      this.query_pidList();
      this.initTemplate();
    },
    query_coupons: function () {
      var $this = this;
      if ($this.goods && $this.goods.goods) {
        ajaxPost(
          "",
          {
            action: "coupon",
            id: this.goods.goods.item_id,
          },
          function (res) {
            if (res.data && res.data.items) {
              $this.coupons = res.data.items;
            }
            if (res.data && res.data.goods_coupon) {
              $this.goodsCoupon = res.data.goods_coupon;
            }
          }
        );
      }
    },
    query_shop: function () {
      var $this = this;
      if ($this.goods && $this.goods.goods && !this.shopInfo) {
        chrome.extension.sendMessage(
          {
            greeting: "getAjax",
            url:
              "https://pub.alimama.com/shopdetail/shopinfo.json?oriMemberId=" +
              this.goods.goods.seller_id +
              "&t=1578739654063&pvid=53_171.43.249.195_1466_1578739653470&_tb_token_=" +
              config.cookies.token +
              "&_input_charset=utf-8",
          },
          function (response) {
            if (response && response.content) {
              var data = JSON.parse(response.content);
              if (data && data.data && data.data.card.jsonData) {
                $this.shopInfo = {
                  weixin:
                    data.data.card.jsonData["微信"] != null
                      ? data.data.card.jsonData["微信"]
                      : "",
                  qq:
                    data.data.card.jsonData["QQ"] != null
                      ? data.data.card.jsonData["QQ"]
                      : "",
                  wangwang:
                    data.data.card.jsonData["旺旺"] != null
                      ? data.data.card.jsonData["旺旺"]
                      : "",
                };
              }
            }
          }
        );
      }
    },
    query_pidList: function () {
      var $this = this;
      if (config.cookies.token) {
        var url =
          "https://pub.alimama.com/common/adzone/adzoneManage.json?tab=3&toPage=1&perPageSize=40&gcid=8&t=1578815409408&_tb_token_=" +
          config.cookies.token +
          "&_input_charset=utf-8";
        chrome.extension.sendMessage(
          { greeting: "getAjax", url: url },
          function (response) {
            if (response && response.content) {
              var data = JSON.parse(response.content);
              if (data && data.data && data.data.pagelist) {
                var pidList = [];
                for (var i = 0; i < data.data.pagelist.length; i++) {
                  var pidItem = data.data.pagelist[i];
                  pidList.push({
                    name: pidItem["name"],
                    pid: pidItem["adzonePid"],
                    adzoneid: pidItem["adzoneid"],
                    siteid: pidItem["siteid"],
                    memberid: pidItem["memberid"],
                  });
                }
                $this.pidList = pidList;
              }
            }
          }
        );
      } else {
      }
    },
    couponDraw: function (url, width, height) {
      layer.open({
        type: 2,
        area: [width + "px", height + "px"],
        fixed: false, //不固定
        shadeClose: true,
        maxmin: true,
        content: url,
      });
    },
    changTrends: function (trends) {
      $this = this;
      $this.trends = trends;
    },
    transform: function () {
      layer.open({
        type: 1,
        title: false,
        // closeBtn: 0,
        area: ["auto"],
        skin: "layui-layer-nobg", //没有背景色
        shadeClose: true,
        content: $(".tools_transform"),
        zIndex: 99900,
      });
    },
    tools: function () {
      this.toolsData.api = null;
      this.toolsData.goods = null;
      this.toolsData.layerOpenIndex = layer.open({
        type: 1,
        title: false,
        // closeBtn: 0,
        area: ["auto"],
        skin: "layui-layer-nobg", //没有背景色
        shadeClose: true,
        content: $(".chain"),
      });
    },
    copyBtn: function (clickClass, copyClass) {
      //复制公共方法
      var self = this;
      var clipboard = new ClipboardJS(clickClass, {
        target: function () {
          return document.querySelector(copyClass);
        },
      });
      clipboard.on("success", function (e) {
        layer.msg("复制成功！", {
          shade: 0.4,
          time: 1500,
          shadeClose: true,
          zIndex: 100000000000,
        });
        e.clearSelection();
        clipboard.destroy();
      });
      clipboard.on("error", function (e) {
        layer.msg(
          "由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！",
          {
            icon: 2,
            zIndex: 100000000000,
          }
        );
      });
    },
    copyText: function (clickClass, content) {
      var clipboard = new ClipboardJS(clickClass, {
        text: function () {
          return content;
        },
      });
      clipboard.on("success", function () {
        layer.msg("复制成功！", {
          shade: 0.4,
          time: 1500,
          shadeClose: true,
          zIndex: 100000000000,
        });
        clipboard.destroy();
      });
      clipboard.on("error", function () {
        layer.msg(
          "由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！",
          {
            icon: 2,
            zIndex: 100000000000,
          }
        );
      });
    },
    changePic: function (picIndex) {
      $this = this;
      $this.transformData.picIndex = picIndex;
    },
    changePid: function (pidIndex) {
      $this = this;
      $this.transformData.pidIndex = pidIndex;
      $this.transformData.pidView = false;
    },
    changeTransform: function (transformIndex) {
      $this = this;
      $this.transformData.transformIndex = transformIndex;
    },
    selectPid: function () {
      this.transformData.pidView = !this.transformData.pidView;
    },
    transformUrl: function () {
      var $this = this;
      var pid = "";
      if (this.pidList && this.pidList.length > this.transformData.pidIndex) {
        pid = this.pidList[this.transformData.pidIndex]["pid"];
      }
      if (pid && pid != "") {
        ajaxPost(
          "",
          {
            action: "item",
            method: "transform",
            item_id: this.goods.goods.item_id,
            platform_type: this.goods.goods.platform_type,
            pid: pid,
          },
          function (res) {
            if (res.data && res.data.api && res.data.api.password_token) {
              $this.transformData.token = res.data.api.password_token;
            }
            if (res.data && res.data.api && res.data.api.short_url) {
              $this.transformData.shortLink = res.data.api.short_url;
            }
            if (res.code > 0) {
              if (res.code == 100) {
                $this.openLogin();
              } else {
                layer.msg(res.message, {
                  shade: 0.4,
                  time: 1500,
                  shadeClose: true,
                  zIndex: 100000000000,
                });
              }
            }
          }
        );
      } else {
        layer.msg("请选择广告位", {
          shade: 0.4,
          time: 1500,
          shadeClose: true,
          zIndex: 100000000000,
        });
      }
    },
    transformCopy: function () {
      this.copyBtn(".copy-transform", "#qing-spin-copy");
    },
    transformContent: function () {
      var $this = this;
      var pid = "";
      if (this.pidList && this.pidList.length > this.transformData.pidIndex) {
        pid = this.pidList[this.transformData.pidIndex]["pid"];
      }
      if (pid && pid != "") {
        ajaxPost(
          "",
          {
            action: "item",
            method: "tools",
            template: this.toolsData.template,
            content: this.toolsData.contentCopy,
            pid: pid,
          },
          function (res) {
            if (res.data && res.data.goods && res.data.goods.goods) {
              $this.toolsData.goods = res.data.goods;
            }
            if (res.data && res.data.api && res.data.api.password_token) {
              $this.toolsData.api = res.data.api;
            }
            if ($this.toolsData.api && $this.toolsData.goods) {
              var pic_url =
                "https://img.marsnews.work/imgcdn/" +
                $.md5("" + $this.toolsData.goods.goods.pic_url) +
                ".jpg?src=" +
                encodeURIComponent($this.toolsData.goods.goods.pic_url);

              var content = $this.toolsData.template.replace(
                /\{标题\}/g,
                $this.toolsData.goods.goods.title
              );
              content = content.replace(
                /\{短标题\}/g,
                $this.toolsData.goods.goods.title
              );
              content = content.replace(
                /\{在售价\}/g,
                parseFloat($this.toolsData.goods.price.price)
              );
              content = content.replace(
                /\{券后价\}/g,
                parseFloat($this.toolsData.goods.price.buy_price)
              );
              content = content.replace(
                /\{推荐语\}/g,
                $this.toolsData.goods.goods.comment
              );
              content = content.replace(
                /\{介绍\}/g,
                $this.toolsData.goods.goods.comment
              );
              content = content.replace(
                /\{券额\}/g,
                parseFloat($this.toolsData.goods.coupon.money)
              );
              content = content.replace(
                /\{图片\}/g,
                '<img src="' + pic_url + '" width="115" height="115">'
              );
              content = content.replace(
                /\{淘口令\}/g,
                $this.toolsData.goods.click.password_token
              );
              content = content.replace(
                /\{二合一\}/g,
                $this.toolsData.goods.click.short_url
              );
              content = content.replace(
                /\{二合一长链接\}/g,
                $this.toolsData.goods.click.url
              );
              content = content.replace(
                /\{二合一短链接\}/g,
                $this.toolsData.goods.click.short_url
              );
              content = content.replace(
                /\{二合一淘点金短链接\}/g,
                $this.toolsData.goods.click.short_url
              );
              content = content.replace(
                /\{二合一淘口令\}/g,
                $this.toolsData.goods.click.password_token
              );
              content = content.replace(
                /\{店铺类型\}/g,
                $this.toolsData.goods.goods.user_type_name
              );
              content = content.replace(
                /\{原价\}/g,
                $this.toolsData.goods.price.price
              );
              content = content.replace(
                /\{销量\}/g,
                $this.toolsData.goods.goods.volume
              );
              content = content.replace(
                /\{佣金比例\}/g,
                $this.toolsData.goods.click.commission_rate
              );
              content = content.replace(
                /\{领券链接\}/g,
                $this.toolsData.goods.click.short_url
              );
              content = content.replace(
                /\{券满\}/g,
                $this.toolsData.goods.coupon.condition
              );
              content = content.replace(
                /\{优惠券剩余数量\}/g,
                $this.toolsData.goods.coupon.Token
              );
              content = content.replace(
                /\{优惠券有效限期\}/g,
                $this.toolsData.goods.coupon.endTime
              );
              $this.toolsData.content = content;

              layer.close($this.toolsData.layerOpenIndex);
              layer.open({
                type: 1,
                title: false,
                // closeBtn: 0,
                area: ["auto"],
                skin: "layui-layer-nobg", //没有背景色
                shadeClose: true,
                content: $(".chain-result"),
              });
            } else {
              if (res.message && res.code > 0) {
                layer.msg(res.message, {
                  shade: 0.4,
                  time: 1500,
                  shadeClose: true,
                  zIndex: 100000000000,
                });
              }
            }
          }
        );
      } else {
        layer.msg("请选择广告位", {
          shade: 0.4,
          time: 1500,
          shadeClose: true,
          zIndex: 100000000000,
        });
      }
    },
    openAlimama: function () {
      layer.confirm(
        "您是否已经成功登录淘宝联盟？",
        {
          icon: 3,
          btn: ["是", "否"],
          zIndex: 100000000001,
        },
        function () {
          window.location.reload();
        }
      );
    },
    insert: function (myValue) {
      var myField = document.getElementById("content_tools");
      var content = "";
      if (myField.selectionStart || myField.selectionStart === 0) {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        content =
          myField.value.substring(0, startPos) +
          myValue +
          myField.value.substring(endPos, myField.value.length);
        myField.focus();
        myField.setSelectionRange(
          endPos + myValue.length,
          endPos + myValue.length
        );
      } else {
        content += myValue;
      }
      this.toolsData.template = content;
    },
    saveTemplate: function () {
      chrome.storage.local.set(
        { template: this.toolsData.template },
        function () {}
      );
    },
    initTemplate: function () {
      chrome.storage.local.get("template", function (result) {
        if (result["template"] && result["template"] != "") {
          this.toolsData.template = result["template"];
        }
      });
    },
    restTemplate: function () {
      this.toolsData.template = this.toolsData.defaultTemplate;
    },
    clearTemplate: function () {
      this.toolsData.template = "";
    },
    openLogin: function () {
      layer.open({
        type: 1,
        title: false,
        // closeBtn: 0,
        area: ["auto"],
        skin: "layui-layer-nobg", //没有背景色
        shadeClose: false,
        shade: 0,
        content: $(".hpt-login"),
        zIndex: 100000000009,
      });
    },
    openHptLogin: function () {},
  },
  computed: {
    alimamaUrl: function alimamaUrl() {
      return (
        "https://pub.alimama.com/promo/search/index.htm?fn=search&q=" +
        encodeURIComponent(window.location.href)
      );
    },
    picUrl: function picUrl() {
      if (this.goods && this.goods.goods) {
        return (
          "https://img.marsnews.work/imgcdn/" +
          $.md5("" + this.goods.goods.pic_url) +
          ".jpg?src=" +
          encodeURIComponent(this.goods.goods.pic_url)
        );
      } else {
        return "";
      }
    },
    transformPreview: function transformPreview() {
      if (this.goods && this.goods.goods) {
        return (
          "https://img.marsnews.work/imgcdn/" +
          $.md5("" + this.goods.goods.p_list[this.transformData.picIndex]) +
          ".jpg?src=" +
          encodeURIComponent(
            this.goods.goods.p_list[this.transformData.picIndex]
          )
        );
      } else {
        return "";
      }
    },
    transformPid: function transformPid() {
      if (this.pidList && this.pidList.length > this.transformData.pidIndex) {
        return (
          this.pidList[this.transformData.pidIndex]["name"] +
          ":" +
          this.pidList[this.transformData.pidIndex]["pid"]
        );
      } else {
        return "";
      }
    },
  },
  template:
    '<ul class="l">' +
    '<li><a href="https://www.haopintui.net" target="_blank" class="logo"></a>' +
    tools_transform +
    tools_login +
    "</li>" +
    "<li :class=\"[value == 1?'hide':'']\">" +
    '<div class="sign-2"><a href="javascript:;" class="bulk"><i class="icon i-1"></i>最高佣金\
        <span v-if="goods && goods.click">{{goods.click.commission_rate}}%</span>\
        <span v-else>暂无</span>\
        </a></div>' +
    tools_commission +
    "</li>" +
    "<li :class=\"[value == 1?'hide':'']\">" +
    '<div class="sign-2"><a @mouseover="query_coupons()" href="javascript:;" class="bulk"><i class="icon i-2"></i>优惠券\
        <span v-if="goods && goods.coupon">{{goods.coupon.money}}元</span>\
        <span v-else>暂无</span>\
        </a></div>' +
    tools_coupon +
    "</li>" +
    "<li :class=\"[value == 1?'hide':'']\">" +
    '<div class="sign-special">' +
    '<a href="javascript:;" class="bulk"><i class="icon i-3"></i>月推广\
        <span v-if="goods && goods.goods">{{goods.goods.volume}}件</span>\
        <span v-else>暂无</span>\
        </a>' +
    tools_volume +
    "</div>" +
    "</li>" +
    "<li  :class=\"[value == 1?'hide':'']\" style=\"border-right: none;\">" +
    '\
        <a v-if="goods && goods.goods" :href="\'https://www.haopintui.net/quan/\'+goods.goods.id" target="_blank" class="elink">高效转链</a>\
        <a v-else href="javascript:void(0)" class="elink">高效转链</a>\
        ' +
    "</li>" +
    "<li :class=\"[value == 1?'hide':'']\">" +
    '<a href="javascript:;" @click="transform" class="spin">超级推广</a>' +
    "</li>" +
    "<li :class=\"[value == 1?'hide':'']\">" +
    '<div class="sign-3 backgreen"><a :href="alimamaUrl" target="_blank">联盟转链</a> <!----></div>' +
    "</li>" +
    "<li :class=\"[value == 1?'hide':'']\">" +
    '<div class="sign-3 backgreen"><a class="copywri" @click="copyBtn(\'.copywri\',\'#akey-copy-content-copy\')">导购文案</a> <!----></div>' +
    tools_wenan +
    "</li>" +
    "<li :class=\"[value == 1?'hide':'']\">" +
    '<div class="sign-3"><a @click="tools()" href="javascript:;">转二合一</a> <!----></div>' +
    tools_tools +
    tools_tools_result +
    "</li>" +
    "<li :class=\"[value == 1?'hide':'']\">" +
    '<div class="sign-3">\
        <a v-if="shopInfo && shopInfo.qq" class="special" href="javascript:;">有店铺信息</a> \
        <a v-else href="javascript:;">店铺信息</a> \
        <!----></div>' +
    tools_shop +
    "</li>" +
    "<li :class=\"[value == 1?'hide':'']\">" +
    '<div class="sign-3"><a href="https://www.haopintui.net/user/apply/business" target="_blank">放单</a> <!----></div>' +
    tools_platform +
    "</li>" +
    "</ul>",
});

Vue.component("hpt-coupon-min", {
  props: ["value", "goods", "id", "campaignItems"],
  data: function () {
    return {
      query: {
        coupons: false,
      },
      coupons: [],
      goodsCoupon: null,
      shopInfo: null,
      trends: 0,
      pidList: [],
    };
  },
  mounted: function () {
    this.init();
  },
  methods: {
    init: function () {
      this.query_shop();
      this.query_pidList();
    },
    query_coupons: function () {
      var $this = this;
      if ($this.goods && $this.goods.goods) {
        ajaxPost(
          "",
          {
            action: "coupon",
            id: this.goods.goods.item_id,
          },
          function (res) {
            if (res.data && res.data.items) {
              $this.coupons = res.data.items;
            }
            if (res.data && res.data.goods_coupon) {
              $this.goodsCoupon = res.data.goods_coupon;
            }
          }
        );
      }
    },
    query_shop: function () {
      var $this = this;
      if ($this.goods && $this.goods.goods && !this.shopInfo) {
        chrome.extension.sendMessage(
          {
            greeting: "getAjax",
            url:
              "https://pub.alimama.com/shopdetail/shopinfo.json?oriMemberId=" +
              this.goods.goods.seller_id +
              "&t=1578739654063&pvid=53_171.43.249.195_1466_1578739653470&_tb_token_=" +
              config.cookies.token +
              "&_input_charset=utf-8",
          },
          function (response) {
            if (response && response.content) {
              var data = JSON.parse(response.content);
              if (data && data.data && data.data.card.jsonData) {
                $this.shopInfo = {
                  weixin:
                    data.data.card.jsonData["微信"] != null
                      ? data.data.card.jsonData["微信"]
                      : "",
                  qq:
                    data.data.card.jsonData["QQ"] != null
                      ? data.data.card.jsonData["QQ"]
                      : "",
                  wangwang:
                    data.data.card.jsonData["旺旺"] != null
                      ? data.data.card.jsonData["旺旺"]
                      : "",
                };
              }
            }
          }
        );
      }
    },
    query_pidList: function () {
      var $this = this;
      if (config.cookies.token) {
        var url =
          "https://pub.alimama.com/common/adzone/adzoneManage.json?tab=3&toPage=1&perPageSize=40&gcid=8&t=1578815409408&_tb_token_=" +
          config.cookies.token +
          "&_input_charset=utf-8";
        chrome.extension.sendMessage(
          { greeting: "getAjax", url: url },
          function (response) {
            if (response && response.content) {
              var data = JSON.parse(response.content);
              if (data && data.data && data.data.pagelist) {
                var pidList = [];
                for (var i = 0; i < data.data.pagelist.length; i++) {
                  var pidItem = data.data.pagelist[i];
                  pidList.push({
                    name: pidItem["name"],
                    pid: pidItem["adzonePid"],
                    adzoneid: pidItem["adzoneid"],
                    siteid: pidItem["siteid"],
                    memberid: pidItem["memberid"],
                  });
                }
              }
            }
          }
        );
      } else {
      }
    },
    couponDraw: function (url, width, height) {
      layer.open({
        type: 2,
        area: [width + "px", height + "px"],
        fixed: false, //不固定
        shadeClose: true,
        maxmin: true,
        content: url,
      });
    },
    changTrends: function (trends) {
      $this = this;
      $this.trends = trends;
    },
    transform: function () {
      layer.open({
        type: 1,
        title: false,
        // closeBtn: 0,
        area: ["auto"],
        skin: "layui-layer-nobg", //没有背景色
        shadeClose: true,
        content: $(".tools_transform"),
      });
    },
    tools: function () {
      layer.open({
        type: 1,
        title: false,
        // closeBtn: 0,
        area: ["auto"],
        skin: "layui-layer-nobg", //没有背景色
        shadeClose: true,
        content: $(".chain"),
      });
    },
    copyBtn: function (clickClass, copyClass) {
      //复制公共方法
      var self = this;
      var clipboard = new ClipboardJS(clickClass, {
        target: function () {
          return document.querySelector(copyClass);
        },
      });
      clipboard.on("success", function (e) {
        layer.msg("复制成功！", {
          shade: 0.4,
          time: 1500,
          shadeClose: true,
        });
        e.clearSelection();
        clipboard.destroy();
      });
      clipboard.on("error", function (e) {
        layer.msg(
          "由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！",
          {
            icon: 2,
          }
        );
      });
    },
    copyAllBtn: function () {
      //一键复制
      var clipboard_all = new ClipboardJS(".copy_all", {
        target: function (trigger) {
          return document.querySelector(".all_article");
        },
      });
      clipboard_all.on("success", function (e) {
        $("#all_article").html("");
        layer.msg("复制成功！", {
          icon: 1,
          tiem: 2000,
        });
        e.clearSelection();
        // clipboard.destroy();
        // console.log(e);
      });
      clipboard_all.on("error", function (e) {
        $("#all_article").html("");
        layer.msg(
          "由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！",
          {
            icon: 2,
          }
        );
      });
      var all_content = "";
      $(".fq-copy").each(function () {
        content = $(this).attr("datatips");
        all_content = all_content + content + "<br/>";
      });
      $("#all_article").html(all_content);
    },
  },
  computed: {
    alimamaUrl: function alimamaUrl() {
      return (
        "https://pub.alimama.com/promo/search/index.htm?fn=search&q=" +
        encodeURIComponent(window.location.href)
      );
    },
    picUrl: function picUrl() {
      if (this.goods && this.goods.goods) {
        return (
          "https://img.marsnews.work/imgcdn/" +
          $.md5("" + this.goods.goods.pic_url) +
          ".jpg?src=" +
          encodeURIComponent(this.goods.goods.pic_url)
        );
      } else {
        return "";
      }
    },
  },
  template:
    '<ul class="l">' +
    '<li><a href="https://www.haopintui.net" target="_blank" class="logo"></a></li>' +
    "<li :class=\"[value == 1?'hide':'']\">" +
    '<div class="sign-2"><a href="javascript:;" class="bulk"><i class="icon i-1"></i>佣金\
        <span v-if="goods && goods.click">{{goods.click.commission_rate}}%</span>\
        <span v-else>暂无</span>\
        </a></div>' +
    tools_commission +
    "</li>" +
    "<li :class=\"[value == 1?'hide':'']\">" +
    '<div class="sign-2"><a @mouseover="query_coupons()" href="javascript:;" class="bulk"><i class="icon i-2"></i>券\
        <span v-if="goods && goods.coupon">{{goods.coupon.money}}元</span>\
        <span v-else>暂无</span>\
        </a></div>' +
    tools_coupon +
    "</li>" +
    "<li :class=\"[value == 1?'hide':'']\">" +
    '<div class="sign-special">' +
    '<a href="javascript:;" class="bulk"><i class="icon i-3"></i>推广\
        <span v-if="goods && goods.goods">{{goods.goods.volume}}件</span>\
        <span v-else>暂无</span>\
        </a>' +
    tools_volume +
    "</div>" +
    "</li>" +
    "<li  :class=\"[value == 1?'hide':'']\" style=\"border-right: none;\">" +
    '\
        <a v-if="goods && goods.goods" :href="\'https://www.haopintui.net/quan/\'+goods.goods.id" target="_blank" class="elink">高效转链</a>\
        <a v-else href="javascript:void(0)" class="elink">高效转链</a>\
        ' +
    "</li>" +
    "<li :class=\"[value == 1?'hide':'']\">" +
    '<a href="javascript:;" @click="transform" class="spin">超级推广</a>' +
    "</li>" +
    "</ul>",
});


Vue.component('hpt-set', {
    props: ['value'],
    data: function () {
        return {
            goods:{},
        }
    },
    mounted: function () {

    },
    methods: {
        toggleTools: function(){
            this.$emit("toggleTools", '');
        },
        clickpagebtn: function (number) {
            this.$emit("clickpage", number);
        },
        feedbackbtn: function () {
            this.$emit("feedbackbtn");
        },
        search: function(){

        },
        openOptionUrl: function(){
            window.open(chrome.extension.getURL('html/option.html')+'?'+new Date().getTime());
        }
    },
    computed: {
        optionUrl: function optionUrl(){
            return chrome.extension.getURL('html/option.html');
        }
    },
    template:'<ul class="r">' +
    '<li :class="[value == 1?\'hide\':\'\']">\
        <div class="hpt-search">\
            <div class="search">\
                <form name="search" method="get" action="https://www.haopintui.net/" accept-charset="utf-8" target="_blank">\
                    <input type="text" name="q" placeholder="搜索关键词" autocomplete="off">\
                    <input type="hidden" name="coupon" value="1">\
                    <button type="submit" class="hpt-submit" value=""/>\
                </form>\
            </div>\
        </div>\
    </li>'+
    '<li :class="[value == 1?\'hide\':\'\']">\
        <dl>\
            <dd><a href="https://www.haopintui.net/online.html" target="_blank"\
                        class="bulk">客服</a></dd>\
            <dd style="display:none"><a :href="optionUrl" class="bulk" target="_blank">设置</a></dd>\
        </dl>\
    </li>'+
    '<li><div class="wicket" @click="toggleTools()"><span  :class="[value == 1?\'max\':\'min\']"><i></i></span></div></li>'+
    '</ul>'
});



Vue.component('hpt-tools', {
    data: function () {
        return {
            pluginStatus:0,
            queryInit:false,
            goods:{},
            campaignItems:[],
        }
    },
    mounted: function () {
        this.init();
    },
    methods: {
        init: function(){
            var $this = this;
            chrome.storage.local.get('plugin_status', function (result) {
                if(result['plugin_status'] == 1){
                    $this.pluginStatus = 1;
                }else{
                    $this.pluginStatus = 0;
                }
            });
            this.query_goods();
            this.query_tb_cookies();
            this.query_hpt_token();
        },
        query_goods:function(){
            var $this = this;
            ajaxPost("", {
                action:'url',
                url:config._url,
            }, function(res) {
                if(res.data && res.data.campaignItems){
                    $this.campaignItems = res.data.campaignItems;
                    eventBus.$emit("campaignItems", $this.campaignItems);
                }
                if(res.data && res.data.goods){
                    config.goods = res.data.goods;
                    config.showPlugin();
                    $this.goods = res.data.goods;
                    eventBus.$emit("goods", $this.goods);
                }
                $this.queryInit = true;
                eventBus.$emit("queryInit", $this.queryInit);
            })
        },
        query_tb_cookies: function(){
            chrome.extension.sendMessage({greeting: "cookies", data:{url: "https://pub.alimama.com/manage/overview/index.htm?spm=", name: "_tb_token_"}},function(response){
                if(response && response.token){
                    config.cookies.token = response.token;
                }
            });
        },
        query_hpt_token: function(){
            chrome.extension.sendMessage({greeting: "getAjax", url:'https://www.haopintui.net/api/info'},function(response){
                if(response && response.content){
                    var data = JSON.parse(response.content);
                    if(data && data.data && data.data.user_token && data.data.user_token != ''){
                        URLPrefix.token = data.data.user_token;
                    }
                }
            });
        },
        toggleTools: function(status){
            var $this = this;
            chrome.storage.local.get('plugin_status', function (result) {
                var pluginStatus = 0;
                if(result['plugin_status'] == 1){
                    pluginStatus = 0;
                }else{
                    pluginStatus = 1;
                }
                $this.toggleStatus(pluginStatus);
            });
        },
        toggleStatus: function(pluginStatus){
            var $this = this;
            chrome.storage.local.set({ 'plugin_status': pluginStatus }, function () {
                console.log('保存成功');
                config.initPlugin();
                $this.init();
            });
        }
    },
    template:
    '<div class="plugin-tools" v-if="queryInit">'+
        '<hpt-coupon v-model="pluginStatus" :goods="goods" :campaignItems="campaignItems"  @queryHptToken="query_hpt_token"></hpt-coupon>'+
        '<hpt-set v-model="pluginStatus" :goods="goods" @toggleTools="toggleTools"></hpt-set>'+
    '</div>'
});

Vue.component('hpt-tools-min', {
    data: function () {
        return {
            queryInit:false,
            goods:{},
            campaignItems:[],
        }
    },
    mounted: function () {
        this.init();
    },
    methods: {
        init: function(){
            $this = this;
            eventBus.$on('queryInit', function(val) {
                $this.queryInit = val;
            })
            eventBus.$on('goods', function(val) {　 
                $this.goods = val;
                config.showPluginMin();
            })
            eventBus.$on('campaignItems', function(val) {　 
                $this.campaignItems = val;
            })
        }
    },
    template:
    '<div class="plugin-tools plugin-tools-min" v-if="queryInit">'+
        '<hpt-coupon-min :goods="goods" :campaignItems="campaignItems"></hpt-coupon-min>'+
    '</div>'
});

var vmplugin = new Vue({
    el: "#hpt-plugin",
    data:{},
    mounted: function() {},
    methods:{}
});

var vmpluginmin = new Vue({
    el: "#hpt-plugin-min",
    data:{},
    mounted: function() {},
    methods:{}
});

// var link = document.createElement("link");
// link.href = 'https://shaibaoj.gitee.io/out_cdn/css/common.css';
// link.type = "text/css";
// link.rel = "stylesheet";
// document.getElementsByTagName("head")[0].appendChild(link);

// let menu = document.createElement("script");
// menu.type="text/javascript";
// menu.src="https://cdn.jsdelivr.net/gh/shaibaoj/out_static/static/js/layer.js?p="+new Date().getTime();
// document.body.appendChild(menu);

