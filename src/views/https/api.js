import { http } from './http';


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

export function userinfo() {
    return http('/blade-user/servicerOne', 'GET', {
    }).then(res => {
        return res;
    })
}

// 首页商品分类

export function listclass(obj) {
    return http('/blade-goods/servicergoods/page', 'GET', {}, {
        id: obj.id,
    }).then(res => {
        return res;
    })
}

// 商品详情

export function listshopinfo(obj) {
    return http('/blade-goods/servicergoods/detail', 'GET', {}, {
        userId: obj.userId,
    }).then(res => {
        return res;
    })
}

// 供应商商品接口
export function servicergoods(obj) {
    return http('/blade-goods/servicergoods/page', 'GET', {}, {
        userId: '1123598821738675203',
        size: obj.size,
        current: obj.current
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
    return http('/blade-goods/usergoodscar/save', 'POST',  {
        goodsCount: obj.goodsCount,
        goodsId: obj.goodsId
    },{}).then(res => {
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
        ids:id
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
        isDefault: "0",
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
        updateUser: "0"
    } ,{}).then(res => {
        return res;
    })
}

// 用户地址修改

export function userexpxiugai(obj) {
    return http('/blade-logistics/userexpress/submit', 'POST', {
        createDept: "0",
        createTime: "",
        createUser: "0",
        isDefault: "0",
        isDeleted: "0",
        id:obj.id,
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
    } ,{}).then(res => {
        return res;
    })
}
