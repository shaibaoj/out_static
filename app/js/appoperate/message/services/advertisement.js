"use strict";define(function(require){var app=require("app");app.factory("advertisement",[function(){var currentAdvertisement={};return{saveCurrentAdvertisement:function(adverData){if(!_.isObject(adverData))throw new Error("当前广告对象数据错误");currentAdvertisement=_.isEmpty(adverData)?{}:adverData},getCurrentAdvertisement:function(){return currentAdvertisement}}}])});
