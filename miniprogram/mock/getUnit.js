function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var e;

module.exports = {
    data: (e = {
        unitVRURL: "http://www.tujia.com",
        unitVideoURL: "http://www.tujia.com",
        unitVideoTimeSpan: "1.09",
        cameraLink: "http://www.tujia.com",
        promotionLinks: [ {
            enabled: !0,
            navigateUrl: "string",
            text: "大促期间优惠多多",
            title: "大促"
        }, {
            enabled: !0,
            navigateUrl: "",
            text: "大促期间优惠多多",
            title: "预热"
        } ],
        cancelRules: [ {
            deleted: !0,
            introduction: "入住前1天",
            isDeleted: !1,
            strDate: "3.24",
            strTime: "12:00",
            tip: "取消订单，定金全部退还"
        }, {
            deleted: !0,
            introduction: "入住当天",
            isDeleted: !1,
            strDate: "3.24",
            strTime: "12:00",
            tip: "取消订单，定金全部退还"
        } ],
        cancelText: "取消订单定金不退。提前离店，剩余房费不退",
        unitTags: [ {
            unitTagType: 1,
            introducion: "途家臻选房屋，服务优质，设施可靠，您的出行入住首选。",
            isVisibleInUnitList: !0,
            isUpShow: !0,
            text: "优选",
            color: "#fd8238",
            background: {
                color: "#ffffff",
                image: "https://staticfile.tujia.com/Mobile/Images/app/unit_tag_preferredunit_v3.png"
            },
            border: {
                width: 0,
                color: "#fd8238"
            }
        }, {
            unitTagType: 13,
            introducion: null,
            isVisibleInUnitList: !0,
            isUpShow: !1,
            text: "暖冬促销",
            color: "#44d39f",
            background: {
                color: "#ebfbf5",
                image: "https://staticfile.tujia.com/Mobile/Images/app/icon_warmwinter.png"
            },
            border: {
                width: 0,
                color: "#fd8238"
            }
        }, {
            unitTagType: 14,
            introducion: "新上线的优质好房源，免押金，无忧住",
            isVisibleInUnitList: !0,
            isUpShow: !1,
            text: "超赞新房",
            color: "#44d39f",
            background: {
                color: "#ebfbf5",
                image: "https://staticfile.tujia.com/Mobile/Images/app/icon_swesomenew.png"
            },
            border: {
                width: 0,
                color: "#fd8238"
            }
        }, {
            unitTagType: 12,
            introducion: "拥有独立的房间，与房东或其他客人合用部分公共区域。",
            isVisibleInUnitList: !0,
            isUpShow: !1,
            text: "独立单间",
            color: "#fd8238",
            background: {
                color: "#ffffff",
                image: "https://staticfile.tujia.com/Mobile/Images/app/icon_separatesingleroom.png"
            },
            border: {
                width: 0,
                color: "#fd8238"
            }
        }, {
            unitTagType: 10,
            introducion: "连住多天可享受超值折扣价",
            isVisibleInUnitList: !0,
            isUpShow: !1,
            text: "连住优惠",
            color: "#44d39f",
            background: {
                color: "#ebfbf5",
                image: null
            },
            border: {
                width: 0,
                color: "#fd8238"
            }
        }, {
            unitTagType: 15,
            introducion: "途家自营民宿，提供星级纯棉床品、独立封装浴巾、订制牙具套装每客一换，专业保洁团队清扫，让您睡的安心住的放心。",
            isVisibleInUnitList: !0,
            isUpShow: !1,
            text: "自营民宿",
            color: "#44d39f",
            background: {
                color: "#ebfbf5",
                image: "https://staticfile.tujia.com/Mobile/Images/app/icon_istujiamanage.png"
            },
            border: {
                width: 0,
                color: "#fd8238"
            }
        }, {
            unitTagType: 2,
            introducion: "途家摄影师实地拍摄，呈现房屋的优秀品质特色。",
            isVisibleInUnitList: !0,
            isUpShow: !1,
            text: "实拍",
            color: "#fd8238",
            background: {
                color: "#ffffff",
                image: "https://staticfile.tujia.com/Mobile/Images/app/unit_tag_realphoto.png"
            },
            border: {
                width: 0,
                color: "#fd8238"
            }
        }, {
            unitTagType: 3,
            introducion: "途家团队实地上门验真，确保房屋介绍、设施服务真实有效。",
            isVisibleInUnitList: !0,
            isUpShow: !1,
            text: "验真",
            color: "#fd8238",
            background: {
                color: "#ffffff",
                image: "https://staticfile.tujia.com/Mobile/Images/app/unit_tag_authenticated.png"
            },
            border: {
                width: 0,
                color: "#fd8238"
            }
        }, {
            unitTagType: 4,
            introducion: "720° 全景图片，身临其境探索房屋每个角落。",
            isVisibleInUnitList: !1,
            isUpShow: !1,
            text: "全景",
            color: "#fd8238",
            background: {
                color: "#ffffff",
                image: null
            },
            border: {
                width: 0,
                color: "#fd8238"
            }
        }, {
            unitTagType: 5,
            introducion: "到达门店入住时，使用途家手机APP或手机H5网站，找到需到店支付的订单进行当面支付操作，可使用途游卡、积分、余额支付，更方便、更省钱。",
            isVisibleInUnitList: !1,
            isUpShow: !1,
            text: "当面付",
            color: "#fd8238",
            background: {
                color: "#ffffff",
                image: "https://staticfile.tujia.com/Mobile/Images/app/unit_tag_facetofacepay.png"
            },
            border: {
                width: 0,
                color: "#fd8238"
            }
        }, {
            unitTagType: 8,
            introducion: "下单即有房，无需等待确认。",
            isVisibleInUnitList: !0,
            isUpShow: !1,
            text: "闪订",
            color: "#fd8238",
            background: {
                color: "#ffffff",
                image: "https://staticfile.tujia.com/Mobile/Images/app/unit_tag_expressbooking.png"
            },
            border: {
                width: 0,
                color: "#fd8238"
            }
        }, {
            unitTagType: 6,
            introducion: "支付宝芝麻信用 - 芝麻分在600分及以上，即可享受免押金入住特权，预订房屋前请前往途家个人中心进行绑定，绑定后即可享受信用免押金。",
            isVisibleInUnitList: !0,
            isUpShow: !1,
            text: "免押金",
            color: "#fd8238",
            background: {
                color: "#ffffff",
                image: "https://staticfile.tujia.com/Mobile/Images/app/unit_tag_sesamecredit.png"
            },
            border: {
                width: 0,
                color: "#fd8238"
            }
        }, {
            unitTagType: 7,
            introducion: "可通过手机、密码、磁卡等方式智能开启门锁。",
            isVisibleInUnitList: !0,
            isUpShow: !1,
            text: "智能门锁",
            color: "#fd8238",
            background: {
                color: "#ffffff",
                image: "https://staticfile.tujia.com/Mobile/Images/app/unit_tag_smartdoorlock.png"
            },
            border: {
                width: 0,
                color: "#fd8238"
            }
        }, {
            unitTagType: 9,
            introducion: "超值打包套餐，预订更优惠。",
            isVisibleInUnitList: !1,
            isUpShow: !1,
            text: "套餐",
            color: "#fd8238",
            background: {
                color: "#ffffff",
                image: "https://staticfile.tujia.com/Mobile/Images/app/unit_tag_productpackage.png"
            },
            border: {
                width: 0,
                color: "#fd8238"
            }
        } ],
        unitTrafficInfos: [ {
            title: "交通周边",
            introduction: "距离北京西站12.4公里，乘坐出租车约43分钟；\n距离北京南站7.9公里，乘坐出租车约29分钟；\n距离北京首都国际机场29公里，乘坐出租车约50分钟；\n距离北京南苑机场15公里，乘坐出租车约47分钟。"
        } ],
        hotelUrl: "/hotel/index/20934/",
        promotionText: null,
        promotionLink: null,
        cityName: "北京",
        isWorldCity: !1,
        unitTagsBitValue: 6273
    }, t(e, "cameraLink", null), t(e, "roomCountSummary", "1室0厅 1卫1厨"), t(e, "unitSimpleIntros", [ "普通公寓 55平米", "整租房源 可带宠物 聚会 做饭" ]), 
    t(e, "bedSummary", "宜住2人 1床"), t(e, "bedDescriptions", [ "大床(2×1.5米) 1张" ]), t(e, "unitCommentSummary", {
        totalCount: 43,
        recommendedCount: 43,
        recommendedPercentage: 100,
        pictureCommentCount: 19,
        overall: 5,
        cleanliness: 5,
        services: 4.9,
        houseFacilities: 5,
        houseDecoration: 5,
        surrounding: 0,
        traffic: 4.9,
        commentSample: "非常干净、整洁，房东热情周到，在此谢谢了！",
        commentSampleOwner: "enliang",
        commentSampleSubmitTime: "2017-10-26T13:05:21.017+08:00",
        commentSampleCustomerAvatarUrl: "https://staticfile.tujia.com/upload/customeravatar/day_160511/201605111645054545_m.jpg",
        scoreTitle: "超赞！"
    }), t(e, "landlordInfo", {
        id: 20934,
        logoUrl: "https://pic.tujia.com/upload/LandlordStoreLogo/day_161116/201611161711321546.jpg",
        isExpressBooking: !0,
        hasInvoice: !0,
        hostID: 3776821,
        chatID: 3776821,
        serviceHotline: "4006061230,30162%23",
        serviceHotlineDescription: "拨打400-606-1230转30162",
        serviceHotlineTip: "",
        realTimeServiceHotlinePattern: '{"CustomerLoginID":null,"DefaultServiceHotline":"4006061230,30162%23","DefaultServiceHotlineDescription":"拨打400-606-1230转30162","HotelType":1,"Identifier":"20934","IsNewHotel":false}',
        isChatVisible: !0,
        chatType: 2,
        chatName: "Coming Home",
        isChatNameVisible: !0,
        zmCreditDetail: "",
        verifiedDetail: "实名认证",
        hotelBrandDetail: "",
        ownerName: null
    }), t(e, "featureTagList", [ "六宫粉黛", "佳丽无颜色", "三千人" ]), t(e, "unitHighLights", [ "厨房里锅碗瓢盆、油盐酱醋一应俱全，煎炒烹炸中体会幸福滋味。", "记性不好总忘这忘那？没关系，写在门口的小黑板上就好啦！", "周边多路公交、地铁线路汇集，轻松直达天安门、火车站。" ]), 
    t(e, "unitFacilityGroups", [ {
        groupName: "居家",
        unitFacilities: [ {
            name: "电视",
            icon: "tv",
            isDeleted: !1
        }, {
            name: "冰箱",
            icon: "icebox",
            isDeleted: !1
        }, {
            name: "洗衣机",
            icon: "washingmachine",
            isDeleted: !1
        }, {
            name: "无线网络",
            icon: "wifi",
            isDeleted: !1
        }, {
            name: "空调",
            icon: "airconditioner",
            isDeleted: !1
        }, {
            name: "暖气",
            icon: "heating",
            isDeleted: !1
        }, {
            name: "电热水壶",
            icon: "kettle",
            isDeleted: !1
        }, {
            name: "电吹风",
            icon: "hairdryer",
            isDeleted: !1
        }, {
            name: "熨斗/挂烫机",
            icon: "electriciron",
            isDeleted: !1
        }, {
            name: "洗衣粉",
            icon: "detergent",
            isDeleted: !1
        }, {
            name: "晾衣架",
            icon: "dryingrack",
            isDeleted: !1
        }, {
            name: "打扫工具",
            icon: "cleantool",
            isDeleted: !1
        }, {
            name: "拖鞋",
            icon: "slipper",
            isDeleted: !1
        } ]
    }, {
        groupName: "卫浴",
        unitFacilities: [ {
            name: "全天热水",
            icon: "hotwater",
            isDeleted: !1
        }, {
            name: "独立卫浴",
            icon: "independentbathroom",
            isDeleted: !1
        }, {
            name: "毛巾",
            icon: "towel",
            isDeleted: !1
        }, {
            name: "浴巾",
            icon: "bathtowel",
            isDeleted: !1
        }, {
            name: "牙具",
            icon: "toothbrush",
            isDeleted: !1
        }, {
            name: "香皂",
            icon: "soap",
            isDeleted: !1
        }, {
            name: "洗发水",
            icon: "hairandbodylotion",
            isDeleted: !1
        }, {
            name: "卫生纸",
            icon: "tissues",
            isDeleted: !1
        } ]
    }, {
        groupName: "餐厨",
        unitFacilities: [ {
            name: "燃气灶",
            icon: "gasstove",
            isDeleted: !1
        }, {
            name: "烹饪锅具",
            icon: "cookingpots",
            isDeleted: !1
        }, {
            name: "刀具菜板",
            icon: "cuttingtool",
            isDeleted: !1
        }, {
            name: "调料",
            icon: "seasoning",
            isDeleted: !1
        }, {
            name: "电饭煲",
            icon: "ricecooker",
            isDeleted: !1
        }, {
            name: "餐具",
            icon: "tableware",
            isDeleted: !1
        }, {
            name: "微波炉",
            icon: "microwaveoven",
            isDeleted: !1
        }, {
            name: "洗涤用具",
            icon: "washer",
            isDeleted: !1
        } ]
    }, {
        groupName: "周边500米",
        unitFacilities: [ {
            name: "超市",
            icon: "supermarket",
            isDeleted: !1
        }, {
            name: "菜市场",
            icon: "vegetablemarket",
            isDeleted: !1
        }, {
            name: "餐厅",
            icon: "conferenceroom",
            isDeleted: !1
        }, {
            name: "药店",
            icon: "pharmacy",
            isDeleted: !1
        }, {
            name: "提款机",
            icon: "atm",
            isDeleted: !1
        } ]
    }, {
        groupName: "特色及其他",
        unitFacilities: [ {
            name: "智能门锁",
            icon: "smartdoorlock",
            isDeleted: !1
        }, {
            name: "保安",
            icon: "securityguard",
            isDeleted: !1
        }, {
            name: "门禁系统",
            icon: "accesscontrol",
            isDeleted: !1
        }, {
            name: "电梯",
            icon: "elevator",
            isDeleted: !1
        }, {
            name: "有窗户",
            icon: "window",
            isDeleted: !1
        } ]
    }, {
        groupName: "服务",
        unitFacilities: [ {
            name: "行李寄存",
            icon: "luggage",
            isDeleted: !0
        }, {
            name: "洗衣服务",
            icon: "wesh",
            isDeleted: !0
        }, {
            name: "早餐",
            icon: "breakfast",
            isDeleted: !0
        }, {
            name: "针线包",
            icon: "sewingkit",
            isDeleted: !0
        }, {
            name: "代收快递",
            icon: "collectdilivery",
            isDeleted: !0
        } ]
    } ]), t(e, "checkInRules", [ {
        checkInRuleFloat: !0,
        items: [ {
            deleted: !0,
            introduction: "接待儿童",
            isDeleted: !1,
            textLink: {
                enabled: !1,
                navigateUrl: "",
                text: "",
                title: "string"
            },
            tip: "接待6岁以下儿童"
        }, {
            deleted: !0,
            introduction: "接待老人",
            isDeleted: !1,
            textLink: {
                enabled: !1,
                navigateUrl: "",
                text: "",
                title: "string"
            },
            tip: "接待60岁以上老人"
        }, {
            deleted: !0,
            introduction: "接待外宾",
            isDeleted: !1,
            textLink: {
                enabled: !1,
                navigateUrl: "",
                text: "",
                title: "string"
            },
            tip: ""
        } ],
        title: "房屋守则"
    }, {
        checkInRuleFloat: !0,
        items: [ {
            introduction: "卫生打扫",
            tip: "1客1扫",
            textLink: null,
            isDeleted: !1
        }, {
            introduction: "入住退房",
            tip: "入住时间14:00后 | 退房时间12:00前",
            textLink: null,
            isDeleted: !1
        }, {
            introduction: "接待时间",
            tip: "00:00~24:00",
            textLink: null,
            isDeleted: !1
        }, {
            introduction: "自助入住",
            tip: "通过智能门锁自助入住",
            textLink: null,
            isDeleted: !1
        }, {
            introduction: "提供发票",
            tip: "途家收费提供发票",
            textLink: null,
            isDeleted: !1
        } ],
        title: "房屋服务"
    } ]), t(e, "checkinOtherInfo", [ {
        title: "加人",
        checkInRuleFloat: !1,
        items: [ {
            introduction: "每增加一位加收100元",
            isDeleted: !1,
            textLink: null
        } ]
    }, {
        title: "加床",
        checkInRuleFloat: !1,
        items: [ {
            introduction: "可加床1张，每天100元",
            isDeleted: !1,
            textLink: null
        } ]
    }, {
        title: "做饭",
        checkInRuleFloat: !1,
        items: [ {
            introduction: "可做饭无",
            isDeleted: !1,
            textLink: null
        } ]
    }, {
        title: "聚会",
        checkInRuleFloat: !1,
        items: [ {
            introduction: "允许聚会",
            isDeleted: !1,
            textLink: null
        } ]
    }, {
        title: "商业拍摄",
        checkInRuleFloat: !1,
        items: [ {
            introduction: "不允许",
            isDeleted: !1,
            textLink: null
        } ]
    }, {
        title: "卫生",
        checkInRuleFloat: !1,
        items: [ {
            introduction: "1客1扫进行卫生清洁，免费提供",
            isDeleted: !1,
            textLink: null
        } ]
    }, {
        title: "床品",
        checkInRuleFloat: !1,
        items: [ {
            introduction: "1客1换，免费提供",
            isDeleted: !1,
            textLink: null
        } ]
    }, {
        title: "牙具",
        checkInRuleFloat: !1,
        items: [ {
            introduction: "1客1换，免费提供",
            isDeleted: !1,
            textLink: null
        } ]
    }, {
        title: "毛巾",
        checkInRuleFloat: !1,
        items: [ {
            introduction: "1客1换，免费提供",
            isDeleted: !1,
            textLink: null
        } ]
    }, {
        title: "其他须知",
        checkInRuleFloat: !1,
        items: [ {
            introduction: " 请小伙伴仔细阅读下面的交易规则！",
            isDeleted: !1,
            textLink: null
        }, {
            introduction: "1，预定前请把所有要入住人的证件输入到房客信息，主人会一一查实，否则不准入住！",
            isDeleted: !1,
            textLink: null
        }, {
            introduction: "2，剧组或者拍摄人员，拍摄费用另议！拍摄时间只限白天！10：00~20：00，另外剧组拍摄不接受提前布景，或者看房！",
            isDeleted: !1,
            textLink: null
        }, {
            introduction: "3，主人最讨厌吸烟的同志！如果发现客厅、卧室及其他角落有烟灰或者烟头，要扣100RMB押金！",
            isDeleted: !1,
            textLink: null
        }, {
            introduction: "4，房子里面的任何物品损坏，都要照价赔偿！",
            isDeleted: !1,
            textLink: null
        }, {
            introduction: "5，预订成功并且支付定金的小伙伴，是不允许退房的！",
            isDeleted: !1,
            textLink: null
        }, {
            introduction: "6，关于卫生主人要提醒您！制造的垃圾，都要自己动手收走！否则也要扣取押金100元！",
            isDeleted: !1,
            textLink: null
        }, {
            introduction: "7，入住的时间和退房的时间一定要提前确认好告诉主人！",
            isDeleted: !1,
            textLink: null
        }, {
            introduction: "8，要发票的小伙伴一定要提前说，否则退房以后概不受理！ ",
            isDeleted: !1,
            textLink: null
        } ]
    } ]), t(e, "relatedPosition", " - 近九龙山地铁站"), t(e, "unitId", 124072), t(e, "cityId", 48), 
    t(e, "unitName", "国贸百子湾后现代城清新浪漫双人房"), t(e, "unitInstanceCount", 1), t(e, "businessType", 4), 
    t(e, "businessTypeName", "个人房东"), t(e, "deposit", {
        depositFree: "是否信用免押金",
        depositLink: "http://www.tujia.com",
        depositText: "在线支付¥200",
        depositTip: "提示"
    }), t(e, "defaultPictureURL", "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051318052532_700_467.jpg"), 
    t(e, "pictureList", [ {
        title: "卧室",
        url: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051318052532_700_467.jpg",
        albumUrl: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051318052532_1100_733.jpg"
    }, {
        title: "卧室",
        url: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/20170405131806740_700_467.jpg",
        albumUrl: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/20170405131806740_1100_733.jpg"
    }, {
        title: "卫生间",
        url: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051317573018_700_467.jpg",
        albumUrl: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051317573018_1100_733.jpg"
    }, {
        title: "厨房",
        url: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051317461127_700_467.jpg",
        albumUrl: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051317461127_1100_733.jpg"
    }, {
        title: "客厅",
        url: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051317358135_700_467.jpg",
        albumUrl: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051317358135_1100_733.jpg"
    }, {
        title: "客厅",
        url: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051317303192_700_467.jpg",
        albumUrl: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051317303192_1100_733.jpg"
    }, {
        title: "庭院",
        url: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051317589983_700_467.jpg",
        albumUrl: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051317589983_1100_733.jpg"
    }, {
        title: "卧室",
        url: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051317546624_700_467.jpg",
        albumUrl: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051317546624_1100_733.jpg"
    }, {
        title: "走廊",
        url: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051319255030_700_467.jpg",
        albumUrl: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051319255030_1100_733.jpg"
    }, {
        title: "客厅",
        url: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051318038700_700_467.jpg",
        albumUrl: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051318038700_1100_733.jpg"
    }, {
        title: "客厅",
        url: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051317367252_700_467.jpg",
        albumUrl: "https://pic.tujia.com/upload/landlordunit/day_170405/thumb/201704051317367252_1100_733.jpg"
    } ]), t(e, "houseTypeName", "1室1卫"), t(e, "unitSourceType", 1), t(e, "timeZone", 8), 
    t(e, "recommendedGuests", 2), t(e, "introduction", "公寓坐落于百子湾家园，\n毗邻双井、国贸、大望路等热闹商圈，环境优美安静，\n茶余饭后在楼下溜达溜达也是很惬意的。小区附近超市、餐饮、咖啡馆等比比皆是，\n吃喝完全不用愁，居住条件非常便利。公寓为小清新一室一卫格局，面积为55平米。房东把家里布置的颇有情调，装饰着小花篮的餐桌，点缀着装饰画的墙壁，立在门口方便写备忘的小黑板，以及角落里的精美小物，这一切无不体现着房东的用心和品位。家里还提供了很便利的厨房用品和极速wifi，\n让您真的觉得就像在家里一样舒适自在。小区紧靠百子湾路，交通四通八达，周边有地铁7号线百子湾站、地铁1号线四惠东站，楼下还有581路、专113路、专87路等多条公交线路站点。公寓离北京站、首都国际机场也都不太远，往来很方便。距离首都国际机场29.5公里，约45分钟车程；距离北京站9.7公里，约23分钟车程；距离北京西站19.7公里，约43分钟车程；距离北京南站16.7公里，\n约38分钟车程；距离市中心11.5公里，约34分钟车程。"), 
    t(e, "translatedIntroduction", null), t(e, "introductionTransDes", null), t(e, "longitude", 116.490798), 
    t(e, "latitude", 39.905277), t(e, "geoCoordSysType", "bd09ll"), t(e, "address", "北京朝阳区百子湾路16号附近后现代城B区-6号楼(B座)"), 
    t(e, "shareSetting", null), t(e, "unitDetailUrl", "https://go.tujia.com/1054/?id=124072&uid=124072&tjmcode=6"), 
    t(e, "houseResource", 1), t(e, "liveWithHouseowner", !0), e),
    isSuccess: !0,
    errorNo: 0,
    errorMsg: null
};