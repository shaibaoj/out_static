"use strict";define(function(require){var app=require("app");app.directive("agreementModal",function(){return{restrict:"EA",scope:{showmodal:"=",agreenment:"&",cancel:"&",close:"&"},replace:!0,templateUrl:"common/directives/agreement-modal.html",link:function(scope,el,attrs){}}})});