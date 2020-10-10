

import axios from 'axios';
import store from '../../store/index'
axios.defaults.baseURL = "/api"

axios.interceptors.response.use(function (response) {
    if (response.status === 400) {
        router.push({
            name: 'Login'
        })
    }
    console.log('拦截器', response)
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export const http = (url, method = "get", data, params) => {
    return new Promise((resolve, reject) => {
        axios({

            // 'Blade-Auth': 'bearer ' + store.state.access_token,
            url,
            method,
            headers: {
                Authorization: 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0',
                'Tenant-Id': '000000'
            },
            data,
            params,
        }).then(res => {
            if (res.status >= 200 && res.status < 300 || res.status == 304) {
                resolve(res.data);
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err)
        })
    })
}