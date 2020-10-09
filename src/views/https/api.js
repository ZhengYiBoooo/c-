import { http } from './http';


// 获取token
export function logintoken(obj) {
    return http('/blade-auth/oauth/token', 'POST', {
    }, {
        password: obj.password,
        tenantId: '000000',
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