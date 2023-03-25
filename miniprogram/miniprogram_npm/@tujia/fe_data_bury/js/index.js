var e = require("./spds").default, r = e.databurying, i = e.configFunction, t = require("./env").default, a = t.isWxApp, n = t.isAliApp, o = require("./spds-zfb"), p = o.createNewApp, u = o.createNewPage, l = o.createNewComponent, s = {}, c = function() {
    var e = arguments[0];
    if (e) {
        var i = 2 > arguments.length ? [] : [].slice.call(arguments, 1);
        if ("init" !== e) return r.proxy(e, i);
        i.length < 1 ? console.log("初始化  埋点 SDK 失败。请使用 databury('init','接口域名',options);") : r.init(i[0], i[1]);
    }
};

a ? (i.originalPage = Page, i.originalApp = App, i.originalComponent = Component, 
require("./spds-wx"), s = {
    databury: c
}) : n && (s = {
    databury: c,
    createNewApp: p,
    createNewPage: u,
    createNewComponent: l
}), module.exports = s;