var n = require("./spds").default, t = n.databurying, e = n.configFunction;

module.exports = {
    databurying: t,
    createNewApp: function(n) {
        if (n) {
            var r = n;
            return function() {
                return t.initClass(), arguments[0]._tj_app_ = !0, r(e.argumentsHandler(arguments[0]));
            };
        }
    },
    createNewPage: function(n) {
        if (n) {
            var r = n;
            return function() {
                return t.initClass(), arguments[0]._tj_page_ = !0, r(e.argumentsHandler(arguments[0]));
            };
        }
    },
    createNewComponent: function(n) {
        if (n) {
            var r = n;
            return function() {
                return t.initClass(), arguments[0]._tj_component_ = !0, r(e.comArgumentsHandler(arguments[0]));
            };
        }
    }
};