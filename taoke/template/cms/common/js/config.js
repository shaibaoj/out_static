"use strict";

require.config({
    baseUrl: cms_all_config.config_js_url,
    paths: {
//        jquery: 'lib/jquery/jquery.2.0.min',
        jquery: 'lib/jquery/1.12.4/jquery.min',
        director: 'lib/director/1.2.8/director.min',
        zepto: 'lib/zepto/1.2.0/zepto.min',
        template: 'lib/art-template/template-web',
        underscore: 'lib/underscore/underscore-min',
        text:"lib/text/2.0.14/text",
        css:"lib/require-css/css.min", 
    },
    shim: {
        template: {
            exports: 'template'
        },
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$',
//            deps: ['template'],
        },
        director: {
            exports: 'Router'
        }
    },
    waitSeconds: 0,
//    urlArgs: "1"
	urlArgs: "2017100101"+new Date().getTime()
});

require(['jquery', 'router', 'underscore','template'], function($, router, _,_template){
	window.appView = $('body');      //用于各个模块控制视图变化
	window.$ = $;                          //暴露必要的全局变量，没必要拘泥于requirejs的强制模块化
	window._ = _;
	window._template = _template;
	window.context = {};
    router.init();                      //开始监控url变化
});