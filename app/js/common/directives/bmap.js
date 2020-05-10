"use strict";define(function(require){var app=require("app");app.directive("baiduMap",function(){return{restrict:"E",replace:!0,scope:{mapId:"=",lat:"=",lng:"=",address:"=",callback:"&",hideForm:"@"},template:'<div class="sys-flex map"><div class="mr10"><span class="baidu-map" ng-click="initMap()"></span></div><div class="address-secect" ng-hide="hideForm"><input type="text" class="desc wd400" ng-model="address" ng-click="initMap()" placeholder="详细地址" /></div><div class="map"><input type="text" ng-hide="hideForm" class="wd200" ng-model="lonlat" class="lonlat" placeholder="坐标" ng-click="initMap()"/></div><div ng-show="isShow" class="map-dialog" ng-click="isShow=false"></div><div ng-show="isShow" class="map-container"><div><div style="position: absolute;z-index: 999;top: 5px;left: 5px;"><input type="text" class="wd300" placeholder="输入要搜索的地址" ng-model="searchValue" /><button class="wd40 btn-primary" style="position: absolute;right:0;border-top-right-radius: 3px;border-bottom-right-radius: 3px;height:39px;line-height:39px;top:1px;" ng-click="search( )">搜索</button></div><div id="map{{mapId}}" style="width: 100%;height: 100%;position: absolute;"></div></div></div></div>',link:function(scope,element,attrs,ctrl){scope.$watch("",function(){scope.lonlat=scope.lng&&scope.lat?[scope.lng,scope.lat].join():""});var initMap=function(){var top_left_control=new BMap.ScaleControl({anchor:BMAP_ANCHOR_TOP_LEFT}),top_left_navigation=new BMap.NavigationControl,top_right_navigation=new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_RIGHT,type:BMAP_NAVIGATION_CONTROL_SMALL}),map=new BMap.Map("map"+scope.mapId),x=scope.lng?scope.lng:118.78333,y=scope.lat?scope.lat:32.05;map.centerAndZoom(new BMap.Point(x,y),11),map.enableScrollWheelZoom(!0),map.addControl(top_left_control),map.addControl(top_left_navigation),map.addControl(top_right_navigation),scope.search=function(){removeEvent(map),map=new BMap.Map("map"+scope.mapId),addEvent(map);var local=new BMap.LocalSearch(map,{renderOptions:{map:map}});scope.searchValue&&local.search(scope.searchValue)},addEvent(map)},addEvent=function(map){map.addEventListener("click",function(e){var gc=new BMap.Geocoder,pt=e.point;gc.getLocation(pt,function(rs){var addComp=rs.addressComponents,address=addComp.province+addComp.city+addComp.district+addComp.street+addComp.streetNumber;formatData(address,e),removeEvent(map)}),closeMap()})},closeMap=function(){setTimeout(function(){scope.$apply(function(){scope.isShow=!1})},500)},removeEvent=function(map){map.removeEventListener("click")},formatData=function(address,e){var lonlat=[e.point.lng,e.point.lat];scope.lng=e.point.lng,scope.lat=e.point.lat,scope.lonlat=lonlat.join(","),scope.address=address},init=function(){scope.initMap=function(){scope.isShow=!0,setTimeout(function(){initMap()},500)}};init()}}})});
