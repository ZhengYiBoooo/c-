
import {axios} from 'axios';
const baseURL = `/api`
const http=(url,method,data,param)=>{
    return new Promise((resolve,reject)=>{
        axios({
            url: baseURL+url,
            method,
            headers:{
                Authorization:'Basic c3dvcmQ6c3dvcmRfc2VjcmV0',
            },
            data,
            param,
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}
export default http;