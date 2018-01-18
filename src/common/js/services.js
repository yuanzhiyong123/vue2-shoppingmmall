import axios from 'axios';
class Services {
    request(params){
        return new Promise((resolve,reject)=>{
            axios({
                method:params.method||'get',
                url:params.url||'',
                params:params.params||null
            }).then(res=>{
                if(res.data.status===0){
                    resolve(res.data);
                }else{
                    reject(res.data.msg);
                }
            }).catch(err=>{
                reject(err);
            });
        });
    }
    getProductList(params){
        return this.request({
            method:'get',
            url:'/api/product/list.do',
            params:params
        });
    }
    getProductDetail(productId){
        return this.request({
            method:'get',
            url:'/api/product/detail.do',
            params:{
                productId:productId
            }
        });
    }
    login(userInfo){
        return this.request({
            method:'post',
            url:'/api/user/login.do',
            params:userInfo
        });
    }
    checkLogin(){
        return this.request({
            method:'post',
            url:'/api/user/get_user_info.do',
        });
    }
    register(userInfo){
        return this.request({
            method:'post',
            url:'/api/user/register.do',
            params:userInfo
        });
    }
    checkUsername(username){
        return this.request({
            method:'post',
            url:'/api/user/check_valid.do',
            params:{
                type    : 'username',
                str     : username
            }
        });
    }
}
export default Services;