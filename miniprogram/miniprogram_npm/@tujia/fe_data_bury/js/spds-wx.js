var n = require("./spds").default.configFunction;

Page = function() {
    return arguments[0]._tj_page_ = !0, n.originalPage(n.argumentsHandler(arguments[0]));
}, App = function() {
    return arguments[0]._tj_app_ = !0, n.originalApp(n.argumentsHandler(arguments[0]));
}, Component = function() {
    return arguments[0]._tj_component_ = !0, n.originalComponent(n.comArgumentsHandler(arguments[0]));
};