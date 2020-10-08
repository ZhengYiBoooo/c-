import {http} from './http';

export function logintoken(res){
    return http('/blade-auth/oauth/token','POST',{
        password:res.password,
        tenantId:res.tenantId,
        username:res.username
    }).then(res=>{
        console.log(res);
    })
}