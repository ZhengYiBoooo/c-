import { http } from './http';


// 获取token
export function logintoken(obj) {
    return http('/blade-auth/oauth/token', 'POST', {
    }, {
        grant_type:'servicer',
        tenantId: '000000',
        phone:obj.phone,
        servicerId:obj.servicerId,
        userId:obj.userId,
        username: obj.username
    }).then(res => {
        return res;
    })
}

// 获取商品

export function shoplist() {
    return http('/blade-goods/goodscategory/list', 'GET', {
    }).then(res => {
        return res;
    })
}