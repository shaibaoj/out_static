"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
function(obj) {
	return typeof obj
} : function(obj) {
	return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
};
define(function(require) {
	var app = require("app");
	require("common/services/modulemarket"), require("common/modal/up_module_config"), require("common/directives/stringtonumber"), app.controller("UpModuleCtrl", ["$rootScope", "$scope", "utils", "http", "config", "modalParams", "moduleMarket", "upload", "upmodule", "$mdDialog", "$timeout", function($rootScope, $scope, utils, http, config, modalParams, moduleMarket, upload, upmodule, $mdDialog, $timeout) {
		var vm = $scope.vm = {};
		angular.extend(vm, {
			reduces: [],
			pics: [],
			tags: [],
			moreTags: [],
			compsceneids: [],
			defaultCategorie: "",
			init: function() {
				vm.checkIsIn = !0, vm.type = modalParams.type, vm.action = modalParams.action, vm.btnconfig = upmodule, vm.getmodulelist(), vm.saveLoading = "init", vm.pagetype = "detail" == modalParams.pagetype ? "detail" : "", modalParams.uniqueid && $timeout(function() {
					vm.getCategories()
				}, 1), modalParams.modeldetail && (vm.groupType = modalParams.modeldetail.type, vm.getGroupStyle())
			},
			getmodulelist: function() {
				moduleMarket.getProductTag().then(function(data) {
					vm.tags = data.result.tags, "update" == vm.action && vm.getModuleDetail()
				})
			},
			setScene: function(tag) {
				vm.sceneId = tag.id
			},
			setStyle: function(tag) {
				vm.styleId = tag.id
			},
			setColor: function(tag) {
				vm.colorId = tag.id
			},
			setCompScene: function(tag, index) {
				if (vm.compscene = !0, !tag.isCheck) {
					var _ret = function() {
							var num = 1;
							if (A.forEach(vm.tags[7], function(val) {
								val.isCheck && num++
							}), num > 3) return utils.error("最多显示3个场景"), {
								v: void 0
							}
						}();
					if ("object" === ("undefined" == typeof _ret ? "undefined" : _typeof(_ret))) return _ret.v
				}
				vm[tag.id] = !vm[tag.id];
				var isCheck = vm.tags[7][index].isCheck;
				vm.tags[7][index].isCheck = !isCheck
			},
			setIndexPic: function(reduce) {
				vm.icon = reduce.info.url
			},
			addTags: function() {
				vm.copyTags = [];
				var url = config.getAPI("template_system.addtags"),
					params = {
						name: vm.currentTag,
						group: "custom",
						platform: "dingdone"
					};
				if (vm.moreTags && 3 == vm.moreTags.length) return utils.error("新增标签不能大于3个"), void(vm.currentTag = "");
				for (var k in vm.moreTags) vm.copyTags.push(vm.moreTags[k].name);
				vm.currentTag && $.inArray(vm.currentTag, vm.copyTags) === -1 ? http(url, {
					method: "post",
					data: params
				}).then(function(resp) {
					vm.currentTag = "", vm.moreTags.push(resp.result)
				}) : utils.error("已经存在相同关键字!")
			},
			removeTag: function(id, $index) {
				var url = config.getAPI("template_system.deltags"),
					params = {
						id: id
					};
				http(url, {
					method: "delete",
					params: params
				}).then(function(resp) {
					vm.moreTags.splice($index, 1)
				})
			},
			getCategories: function() {
				vm.categories = [];
				var url = config.getAPI("template_system.getCategories"),
					params = {
						unique_id: modalParams.uniqueid
					};
				http(url, {
					method: "get",
					params: params
				}).then(function(resp) {
					"success" == resp.error_message && (A.forEach(resp.result, function(val, key) {
						vm.categories.push(val)
					}), vm.defaultCategorie ? A.forEach(vm.categories, function(val, key) {
						vm.defaultCategorie == val.slug && vm.changeCategorie(key)
					}) : vm.changeCategorie(0))
				})
			},
			getGroupStyle: function() {
				var url = config.getAPI("pagedesign.getGroupStyle");
				http(url).then(function(resp) {
					vm.groupStyle = resp.result, A.forEach(vm.groupStyle, function(val) {
						val.uniqueid == modalParams.modeldetail.uniqueid && (vm.currentCategorieSlug = val.uniqueid, vm.groupname = val.name)
					})
				})
			},
			changeCategorie: function(index) {
				vm.categories.length > 0 && (vm.currentCategorie = vm.categories[index], vm.currentCategorieSlug = vm.categories[index].slug)
			},
			_saveUp: function() {
				if (!vm._checkText() || !vm._checkSure()) return vm.saveLoading = "fail", void utils.error("请确保提交的值正确！");
				vm.saveLoading = !1, vm.concatTags(), vm.collectEdition();
				var url = config.getAPI("template_system.upmodule").replace("{level}", vm.type),
					params = {
						level: vm.type,
						id: modalParams.key,
						name: vm.verify_name,
						type: "template",
						platform: "dingdone",
						brief: vm.verify_description,
						content: vm.verify_function,
						icon: modalParams.appIcon,
						thumb: vm.icon || "",
						channels: ["dd_generic_pre", "dd_generic"],
						meta: vm.edition,
						pics: vm.pics,
						on_shelf: !0,
						tags: vm.allTags,
						template_id: vm.template_id,
						category: vm.currentCategorieSlug || vm.pagetype,
						unit_price: 0
					};
				http(url, {
					method: "post",
					data: params
				}).then(function(resp) {
					vm.saveLoading = "complete", "up" == vm.action ? utils.success(upmodule[vm.type].update.updateName + "上架成功！") : utils.success(upmodule[vm.type].update.updateName + "更新成功！"), $mdDialog.hide(resp.result)
				})
			},
			concatTags: function() {
				vm.origin = [], vm.origin_old = [vm.sceneId, vm.styleId, vm.colorId], A.forEach(vm.origin_old, function(val) {
					void 0 !== val && vm.origin.push(val)
				}), vm.moreTagsId = [], A.forEach(vm.moreTags, function(val) {
					vm.moreTagsId.push(val.id)
				}), vm.compTagsId = [], A.forEach(vm.tags[7], function(val) {
					val.isCheck && vm.compTagsId.push(val.id)
				}), vm.allTags = vm.origin.concat(vm.moreTagsId, vm.compTagsId)
			},
			_checkText: function() {
				return vm.copyErrorText = [], A.forEach(upmodule[vm.type][vm.action].checkIn, function(val) {
					(!vm[val] || vm[val] && 0 == vm[val].length) && vm.copyErrorText.push(val)
				}), !(vm.copyErrorText.length > 0)
			},
			_checkSure: function() {
				return vm.copyErrorSure = [], A.forEach(upmodule[vm.type][vm.action].checkSure, function(val) {
					vm[val + "IsError"] && vm.copyErrorSure.push(val)
				}), !(vm.copyErrorSure.length > 0)
			},
			collectEdition: function() {
				vm.verify_edition = vm.verify_edition ? vm.verify_edition : "", vm.edition = [{
					key: "version",
					value: '[{"version":1.0, "brief":"' + vm.verify_edition + '"}]'
				}], "update" == vm.action && (vm.edition = [{
					id: vm.verificationValue.id,
					key: "version",
					value: vm.verifyValue.replace(/]/g, ',{"version":' + vm.verifyFirst + "." + vm.verifyEnd + ', "brief":"' + vm.verify_edition + '"}]')
				}].concat(vm.thumbVersion))
			},
			delPages: function($index, url) {
				vm.reduces.splice($index, 1), 0 == vm.reduces.length && (vm.icon = ""), "app" == modalParams.type ? vm.verification.verifyPage(vm.reduces) : vm.verification.verifySinglePage(vm.reduces), url && url == vm.icon && vm.setIndexPic(vm.reduces[0])
			},
			getModuleDetail: function() {
				var url = config.getAPI("template_system.getCategorieDetail");
				http(url, {
					method: "get",
					params: {
						product_id: modalParams.updateId
					}
				}).then(function(resp) {
					vm.updateObject = resp.result, vm.verify_name = vm.updateObject.name, vm.verify_description = vm.updateObject.brief, vm.verify_function = vm.updateObject.content, A.forEach(vm.updateObject.pics, function(pic) {
						var obj = {
							info: {
								url: pic
							}
						};
						vm.reduces.push(obj)
					}), vm.icon = vm.updateObject.thumb, A.forEach(vm.updateObject.tags, function(tag, key) {
						switch (key) {
						case "class":
							break;
						case "style":
							vm.styleId = tag[0].id;
							break;
						case "color":
							vm.colorId = tag[0].id;
							break;
						case "scene":
							vm.sceneId = tag[0].id, "component" == vm.type && (vm.sceneId = void 0, A.forEach(tag, function(val) {
								vm[val.id] = !0, A.forEach(vm.tags[7], function(v) {
									val.id == v.id && (v.isCheck = !0)
								})
							}));
							break;
						case "custom":
							A.forEach(tag, function(val) {
								vm.moreTags.push(val)
							})
						}
					}), vm.template_id = vm.updateObject.id, vm.defaultCategorie = vm.updateObject.category, vm.getverifyValue(), vm.edition = [{
						id: vm.verificationValue.id,
						key: "version",
						value: vm.verifyValue.replace(/]/g, ',{"version":' + vm.verifyFirst + "." + vm.verifyEnd + ', "brief":"' + vm.verify_edition + '"}]')
					}].concat(vm.thumbVersion)
				})
			},
			getverifyValue: function() {
				vm.thumbVersion = [], A.forEach(vm.updateObject.meta, function(val) {
					if ("version" == val.key) {
						var dotIndex = 0;
						dotIndex = val.value.lastIndexOf("."), vm.verifyFirst = val.value.substring(dotIndex - 1, dotIndex), vm.verifyEnd = val.value.substring(dotIndex + 1, dotIndex + 2), vm.oldFirst = vm.verifyFirst, vm.oldEnd = vm.verifyEnd, vm.verifyValue = val.value, vm.verificationValue = val
					} else vm.thumbVersion.push(val)
				})
			},
			upload: function(file, flag) {
				this._upload(file, flag)
			},
			_upload: function(file, flag) {
				var url = config.getAPI("upload");
				vm.reducesLoading = !1, upload(url, file, null, null, "upPic").then(function(pic) {
					var obj = {
						info: pic
					};
					vm.reduces.push(obj), vm.pics.push(pic.url), vm.icon || vm.setIndexPic(vm.reduces[0]), "app" == flag ? vm.verification.verifyPage(vm.reduces) : vm.verification.verifySinglePage(vm.reduces), vm.reducesLoading = "complete"
				}, function(reason) {
					vm.reducesLoading = "fail"
				})
			},
			close: function() {
				$mdDialog.cancel()
			},
			verification: {
				verifyText: function(value, minText, maxText, flag) {
					value && value.length >= minText && value.length <= maxText ? vm[flag + "IsError"] = !1 : vm[flag + "IsError"] = !0
				},
				verifySinglePage: function(reduces) {
					1 == reduces.length ? vm.singleIsError = !1 : vm.singleIsError = !0
				},
				verifyPage: function(reduces) {
					reduces.length >= 4 && reduces.length <= 8 ? vm.pageIsError = !1 : vm.pageIsError = !0
				},
				verifyVersion: function() {
					vm.verifyFirst && vm.verifyEnd && "null" != vm.verifyFirst && "null" != vm.verifyEnd ? vm.verifyFirst > vm.oldFirst ? vm.versionIsError = !1 : vm.verifyFirst == vm.oldFirst ? vm.versionIsError = !(vm.verifyEnd > vm.oldEnd) : vm.versionIsError = !0 : vm.versionIsError = !0
				}
			}
		}), vm.init()
	}])
});