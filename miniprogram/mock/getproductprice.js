module.exports = {
    data: {
        cachKey: "string",
        commonContact: {
            Birthday: "string",
            ContactCardNumber: "string",
            ContactMobile: "string",
            ContactName: "string",
            EnumContactCardType: 0,
            EnumSex: 0,
            ID: 0,
            countryCode: "string"
        },
        giftDetailList: [ {
            dailyPrice: [ {
                amount: 0,
                available: 0,
                day: {
                    day: 0,
                    month: 0,
                    year: 0
                }
            } ],
            maxCount: 0,
            minCount: 0,
            name: "礼品卡",
            picUrl: "string",
            productDes: "string",
            productId: 0,
            required: !1
        } ],
        giftList: [ {
            Description: "string",
            GiftCount: 0,
            ImageURL: "string",
            MaxAvailableQuantityPerOrder: 0,
            MinAvailableQuantityPerOrder: 0,
            Name: "string",
            ProductID: 0
        } ],
        prePayAmount: 0,
        returnCashList: [ {
            returnCashAmount: 111,
            returnCashName: "返现",
            returnCashType: 0
        } ],
        sharingTypeName: "string",
        showTips: [ {
            color: "string",
            picUrl: "string",
            text: "string",
            tipType: 0
        } ],
        ticketDetailList: [ {
            dailyPrice: [ {
                amount: 0,
                available: 0,
                day: {
                    day: 0,
                    month: 0,
                    year: 0
                }
            } ],
            maxCount: 0,
            minCount: 0,
            name: "string",
            picUrl: "string",
            productDes: "string",
            productId: 0,
            required: !1,
            verifyType: 0
        } ],
        ticketList: [ {
            EnumAuthenticationMode: 0,
            EnumAuthenticationStrength: 0,
            ImageURL: "string",
            MaxAvailableQuantityPerOrder: 0,
            MinAvailableQuantityPerOrder: 0,
            Name: "string",
            ProductID: 0,
            ServiceTime: "string",
            TicketCount: 0,
            TicketUseTime: "2017-11-23T02:15:00.954Z"
        } ],
        totalAmount: 999,
        unitAllInfo: {
            chargeItemList: [ {
                price: 1e3,
                date: "2017-11-23 02:15:00"
            } ],
            product: {
                expressBooking: !0,
                id: 0,
                insuranceList: [ {
                    ID: 0,
                    description: "意外保险",
                    detail: "string",
                    insuranceName: "人寿保险",
                    maxCopy: 0
                } ],
                name: "房屋名字",
                prePayAndDepositType: "string",
                productPackageId: 0,
                requriedInsurance: !0,
                strategyName: "string"
            },
            showChargeItemList: !0,
            unit: {
                cityName: "string",
                cleanServiceFee: 0,
                defaultPictureURL: "string",
                enumCooperationMode: 0,
                exempteDeposit: !0,
                exempteDepositDes: "string",
                extraBedLimit: 2,
                hasOnlineDeposit: !0,
                maxPeopleLimit: 5,
                minPeopleLimit: 1,
                offlineDeposit: 0,
                onlineDeposit: 100,
                recommendedGuests: 0,
                remark: !0,
                supportFullPrepay: !0,
                unitEarnest: 0,
                unitID: 0,
                unitName: "北京公寓",
                unitSourceType: 0,
                isExempteDeposit: !1
            },
            unitPrice: {
                cancelRule: [ "取消规则是什么，巴巴爸爸不不不" ],
                checkInHour: 10,
                checkInHourList: [ 0 ],
                checkInRule: [ "string" ],
                checkInTimePrompt: "string",
                commentDesList: [ {
                    DesList: [ "string" ],
                    Title: "string"
                } ],
                deposit: !0,
                hasOverTimeDeposit: !0,
                lastArriveTime: "string",
                maxBookingCount: 4,
                mayiCouponinfo: "string",
                minBookingCount: 0,
                needImageValidate: !0,
                needMobileValidate: !0,
                overTime: !0,
                overTimePreAmount: 20,
                overTimeReturnConsumption: 0,
                overTimeReturnType: 0,
                overTimeRuleList: [ "string" ],
                overTimeSpecialReturnCashTitile: "特殊返现原因说明",
                overTimeSpecialReturnConsumption: 0,
                overtimeDepositeTypeDes: "string",
                preAmount: 303,
                prePayRule: [ "string" ],
                returnConsumption: 0,
                returnIntegration: 0,
                returnTasteAmount: 0,
                returnType: 0,
                ruleList: [ "string" ],
                specialReturnCashTitle: "string",
                specialReturnConsumption: 0,
                supportFullPrepay: !0,
                supportInvoices: !0,
                totalAmount: 888,
                unitGroupServiceCategoryList: [ {
                    CreateTime: "2017-11-23T02:15:00.955Z",
                    EnumChargeType: 0,
                    ID: 0,
                    IsActive: !0,
                    IsNeeded: !0,
                    Number: 0,
                    Remark: "string",
                    Title: "string",
                    UnitGroupID: 0,
                    UnitGroupServiceCategoryGlobalID: "string",
                    UnitGroupServiceList: [ {
                        Charge: 0,
                        CreateTime: "2017-11-23T02:15:00.955Z",
                        Description: "已选择",
                        EnumChargeType: 0,
                        EnumHouseServiceType: 4,
                        EnumSubHouseServiceType: 256,
                        HouseServiceID: 0,
                        HouseServiceName: "加床",
                        ID: 0,
                        IsNeeded: !0,
                        Number: 0,
                        Remark: "可加儿童床",
                        UnitGroupID: 0,
                        UnitGroupServiceCategoryID: 0,
                        iconUrl: "string"
                    }, {
                        Charge: 0,
                        CreateTime: "2017-11-23T02:15:00.955Z",
                        Description: "已选择",
                        EnumChargeType: 0,
                        EnumHouseServiceType: 1,
                        EnumSubHouseServiceType: 1,
                        HouseServiceID: 0,
                        HouseServiceName: "接机",
                        ID: 0,
                        IsNeeded: !0,
                        Number: 0,
                        Remark: "string",
                        UnitGroupID: 0,
                        UnitGroupServiceCategoryID: 0,
                        iconUrl: "string"
                    } ]
                } ]
            }
        },
        unitDetailDesc: "string",
        userName: "用户名称",
        virtalPay: {
            ConflictDes: "string",
            CustomerAccount: {
                SurplusAmount: 0,
                UsedAmount: 0
            },
            DefaultVirtualPayType: 0,
            DiamondCardInfo: {
                Amount: 0,
                ReturnCashType: 0,
                ReturnDes: "string"
            },
            GiftCards: [ {
                CanUseAmount: 0,
                CardNo: "CardNo值",
                TicketCardID: 0,
                UseAmount: 0
            } ],
            GrayedPayType: 0,
            HasHouseReduceForApp: !0,
            HouseReduceInfo: {
                FirstCash: 0,
                HouseCash: 0
            },
            IntegrationPay: {
                CanUseAmount: 10,
                CanUseScore: 100,
                UsedAmount: 0
            },
            MemberReduceInfo: {
                Amount: 0,
                ReturnCashReason: "string",
                ReturnCashType: 0,
                ReturnDes: "string"
            },
            PrepayCards: [ {
                CardNo: "string",
                ID: 0,
                LeftAmount: 0,
                Selected: !0,
                ToDate: "2017-11-23T02:15:00.955Z",
                UsedAmount: 0
            } ],
            Promos: [ {
                Amount: 20,
                FromDate: "2017-11-23T02:15:00.955Z",
                LimitAmount: 100,
                PromoCode: "站外红包",
                PromoID: 0,
                PromoName: "红包",
                Rate: 0,
                Selected: !0,
                ToDate: "2017-11-23T02:15:00.955Z"
            } ],
            ShowVirtualPayType: 28,
            Summary: "string",
            TotalReduce: 0
        }
    },
    errcode: 0,
    errmsg: null,
    ret: !0,
    trace: "string",
    ver: "string"
};