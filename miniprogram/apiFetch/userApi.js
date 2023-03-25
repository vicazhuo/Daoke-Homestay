function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

e(require("./tjFetch2.js"));

var t = e(require("./tjFetch.js")), u = {
  getredpacketcount: "v2.bingo/getredpacketcount",
  getmembercongif: "v2.config/getmemberconfigs",
  getuserMoneys: "v2.user/getmoney",
  getAboutInfo:  "v2.bingo/getAboutInfo"

}, d = {};
d.getuserMoney = function () {
  return t.default.post(u.getuserMoneys);
},
d.getAboutinfo=function(){

  return t.default.post(u.getAboutInfo);
},
d.getMemberConfig = function () {
  return t.default.post(u.getmembercongif);
}, 
d.getredpacketcount = function() {
    return t.default.post(u.getredpacketcount);
}, 
d.saveinvoiceInfo = function (data) {

  return t.default.post(u.saveinvoiceInfo,{
    params: {invoiceInfo: data},
    isLoading: !0});
}
d.getInvoiceInfo = function (data){
  return t.default.post(u.getInvoiceInfo,{
    params: data,
    isLoading: !0
  });
}
d.getInvoiceList = function (data) {
  return t.default.post(u.getInvoiceList, {
    params: data,
    isLoading: !0
  });
}
exports.default = d;