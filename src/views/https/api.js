import { http } from './http';
import { Toast } from 'vant';

// 获取token
export function logintoken(obj) {
    return http('/blade-auth/oauth/token', 'POST', {
    }, {
        grant_type: 'servicer',
        tenantId: '000000',
        phone: obj.phone,
        servicerId: obj.servicerId,
        userId: obj.userId,
        username: obj.username
    }).then(res => {
        return res;
    })
}

// 获取商品

export function shoplist() {
    return http('/blade-goods/goodscategory/list', 'GET', {
    },
    ).then(res => {
        return res;
    })
}

// 首页商家信息

export function userinfo(obj) {
    return http('/blade-user/servicerOne', 'GET', {
    }, {
        id: obj.id
    }).then(res => {
        return res;
    })
}

// 首页商品分类

export function listclass(obj) {
    return http('/blade-goods/servicergoods/page', 'GET', {}, {
        userId: obj.userId,

    }).then(res => {
        return res;
    })
}

// 首页商品点击分类

export function listclassclick(obj) {
    return http('/blade-goods/servicergoods/page', 'GET', {}, {
        userId: obj.userId,
        size:'500',
        goodsCategoryId: obj.goodsCategoryId
    }).then(res => {
        return res;
    })
}
// 商品详情

export function listshopinfo(obj) {
    return http('/blade-goods/servicergoods/detail', 'GET', {}, {
        id: obj.id,
    }).then(res => {
        return res;
    })
}

// 供应商商品接口
export function servicergoods(obj) {
    return http('/blade-goods/servicergoods/page', 'GET', {}, {
        userId: obj.userId,
    }, {
    }).then(res => {
        return res;
    })
}


// 购物车列表
export function usercarlist(obj) {
    return http('/blade-goods/usergoodscar/list', 'GET', {}, {
    }).then(res => {
        return res;
    })
}

// 购物车添加
export function usercarsave(obj) {
    return http('/blade-goods/usergoodscar/save', 'POST', {
        goodsId: obj.goodsId
    }, {}).then(res => {
        return res;
    })
}

// 购物车删除
export function usergoremove(obj) {
    return http('/blade-goods/usergoodscar/remove', 'POST', {}, {
        ids: obj.ids
    }).then(res => {
        return res;
    })
}

// 购物车修改
export function userupdate(obj) {
    return http('/blade-goods/usergoodscar/update', 'POST', {
        goodsCount: obj.goodsCount,
        id: obj.id
    }, {}).then(res => {
        return res;
    }).catch(err => {
        return err;
    })
}

// 购物车快递总运费
export function shopcarfree(obj) {
    return http('/blade-goods/usergoodscar/fee', 'GET', {}, {
        countryId: obj.countryId,
        ids: obj.ids
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    })
}

// 用户地址信息

export function userexpress(obj) {
    return http('/blade-logistics/userexpress/page', 'GET', {}, {
    }).then(res => {
        return res;
    })
}

// 用户地址删除

export function userexremove(id) {
    return http('/blade-logistics/userexpress/remove', 'POST', {}, {
        ids: id
    }).then(res => {
        return res;
    })
}
// 用户地址新增

export function userexpsubmit(obj) {
    return http('/blade-logistics/userexpress/submit', 'POST', {
        createDept: "0",
        createTime: "",
        createUser: "0",
        isDefault: obj.isDefault,
        isDeleted: "0",
        label: obj.label,
        shippingAddress: obj.shippingAddress,
        shippingCityId: obj.shippingCityId,
        shippingCountryId: obj.shippingCountryId,
        shippingName: obj.shippingName,
        shippingProvinceId: obj.shippingProvinceId,
        shippingTel: obj.shippingTel,
        status: "0",
        updateTime: "",
        updateUser: "0",
    }, {}).then(res => {
        return res;
    })
}

// 用户地址详情

export function userexpsuinfos(obj) {
    return http('/blade-logistics/userexpress/detail', 'GET', {
    }, {
        userId: obj.userId
    }).then(res => {
        return res;
    })
}


// 用户地址详情2

export function userexpsuinfos2(obj) {
    return http('/blade-logistics/userexpress/detail', 'GET', {
    }, {
        id: obj.id
    }).then(res => {
        return res;
    })
}




// 用户地址修改

export function userexpxiugai(obj) {
    return http('/blade-logistics/userexpress/submit', 'POST', {
        createDept: "0",
        createTime: "",
        createUser: "0",
        isDefault: obj.isDefault,
        isDeleted: "0",
        id: obj.id,
        label: obj.label,
        shippingAddress: obj.shippingAddress,
        shippingCityId: obj.shippingCityId,
        shippingCountryId: obj.shippingCountryId,
        shippingName: obj.shippingName,
        shippingProvinceId: obj.shippingProvinceId,
        shippingTel: obj.shippingTel,
        status: "0",
        updateTime: "",
        updateUser: "0"
    }, {}).then(res => {
        return res;
    })
}



// 商品订单表
export function b2borderlist(obj) {
    return http('/blade-order/b2corder/page', 'GET', {}, {
    }).then(res => {
        return res;
    })
}

// 商品订单H5下单添加
export function b2bordersubmit(obj) {
    return http('/blade-order/b2b2cordershop/b2cPlaceAnOrder', 'POST', {
        goodsDTOList: obj.goodsDTOList,
        noteContent: obj.noteContent,
        // 留言
        payType: obj.payType,
        shippingFare: obj.shippingFare,
        //快递费用
        shippingId: obj.shippingId,
        //快递模版ID
        storeId: obj.storeId,
        //服务商ID
        total: obj.total
        //应付金额（含快递费）
    }, {
    }).then(res => {
        return res;
    }).catch(err=>{
        return err;
    })
}

// 商品订单取消订单
export function b2borderemove(obj) {
    return http('/blade-order/b2corder/abrogateOrder', 'POST', {
    }, {
        id: obj.id
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    })
}

// 快递模版接口
export function b2express(obj) {
    return http('/blade-logistics/express/page', 'GET', {
    }, {

    }).then(res => {
        return res;
    })
}

// 订单详情页面
export function b2expinfolist(obj) {
    return http('/blade-order/b2corder/detail', 'GET', {
    }, {
        id: obj.id
    }).then(res => {
        return res;
    })
}

// 订单售后列表
export function b2exderrefundlist(obj) {
    return http('/blade-order/b2corderrefund/page', 'GET', {
    }, {
        current: '1',
        size: '10'
    }).then(res => {
        return res;
    })
}

// 订单申请退款
export function b2removeshop(obj) {
    return http('/blade-order/b2corderrefund/applyForAfterSales', 'POST', {
        applyType: obj.applyType,
        bigApplyAmount: obj.bigApplyAmount,
        cause: obj.cause,
        goodsId: obj.goodsId,
        userRemark: obj.userRemark,
        voucher: obj.voucher
    }, {
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    })
}

// 订单退款详情
export function b2cordedetail(obj) {
    return http('/blade-order/b2corderrefund/detail', 'GET', {
    }, {
        id: obj.id
    }).then(res => {
        return res;
    })
}

// 订单取消退款
export function b2dealWithAfterSales(obj) {
    return http('/blade-order/b2corderrefund/dealWithAfterSales', 'POST', {
        id: obj.id,
        status: obj.id
    }, {
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    })
}

// 本地图片转换位路径
export function b2endpoint(filed) {
    return http('/blade-resource/oss/endpoint/put-file', 'POST',
        filed
        , {
        }).then(res => {
            return res;
        })
}

// 消息列表
export function b2endmessage(obj) {
    return http('/blade_message/message/page', 'GET', {}
        , {
            current: obj.current,
            size: obj.size
        }).then(res => {
            return res;
        })
}

// 消息列表详情
export function b2enmessageinfo(obj) {
    return http('/blade_message/message/detail', 'GET', {}
        , {
            id: obj.id
        }).then(res => {
            return res;
        }).catch(err => {
            return err;
        })
}

// 订单继续支付
export function b2AnOrder(obj) {
    return http('/blade-order/b2corder/placeAnOrder', 'POST'
        , {
        }, {
        id: obj.id,
        payType: obj.payType
    }).then(res => {
        return res;
    })
}


// h5 微信支付
export function WXpay(obj, url) {
    return http(url, 'POST'
        , {
        }, {
        id: obj.id,
        payType: obj.payType
    }).then(res => {
        return res;
    })
}


// 支付订单状态监听
export function b2b2watch(obj) {
    return http('/blade-order/b2b2cordershop/detail', 'GET'
        , {
        }, {
        id: obj.id,
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    })
}


// 资金明细列表
export function financial(obj) {
    return http('/financialdetails/page', 'GET'
        , {
        }, {
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    })
}


//用户资讯
export function zixuninfo(obj) {
    return http('/blade_system/feedback/save', 'POST'
        , {
            content: obj.content,
            phone: obj.phone,
            userId: obj.userId
        }, {
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    })
}