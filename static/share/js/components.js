
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