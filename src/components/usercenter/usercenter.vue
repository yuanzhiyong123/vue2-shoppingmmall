<template>
    <div class="user-center">
        <div class="user-con">
            <v-header title="个人中心"></v-header>
            <div class="avata-wrap">
                <div class="avata-con">
                    <img class="avata" src="./avata.png" alt="头像" width="100%" height="100%" />
                </div>
                <div class="name-wrap" v-if="login">
                    <p class="name">{{username}}</p>
                </div>
                <div class="login-con" v-else>
                    <router-link class="login" to="/login" >登录/注册</router-link>
                </div>
            </div>
            <ul class="user-list">
                <li class="user-item" v-for="item in userList" >
                    <i class="fa item-icon" :class="item.icon"></i>
                    <span class="title">{{item.title}}</span>
                    <i class="fa fa-angle-right icon-arrow"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header.vue'
export default {
    data(){
        return {
            userList:[
                {title:'我的订单',icon:'fa-shopping-cart'},
                {title:'我的收货地址',icon:'fa-map-marker'},
                {title:'联系客服',icon:'fa-phone-square'}
            ]
        }
    },
    computed:{
        login(){
            if(this.$store.state.userInfo.username){
                console.log(this.$store.state.userInfo);
                return true;
            }else{
                console.log(this.$store.state.userInfo);
                return false;
            }
        },
        username(){
            console.log(333);
            return this.$store.state.userInfo.username
        }
    },
    components:{
        'v-header':Header
    }
}
</script>

<style>
.user-center .avata-wrap{
    padding-top:40px;
    padding-bottom: 20px;
    width:100%;
    background: #f55;
    box-sizing:border-box;
}
.user-center .avata-wrap .avata-con{
    width:80px;
    height: 80px;
    margin:0px auto 10px;
}
.user-center .name-wrap .name,.user-center .avata-wrap .login-con{
    font-size: 20px;
    color: #fff;
    text-align: center;
}
.user-center .avata-wrap .login-con .login{
    color: #fff;
}
.user-center .user-list{
    padding:10px;
    margin-top:15px;
    background: #fff;
}
.user-center .user-list .user-item{
    position: relative;
    height: 60px;
    line-height: 60px;
    border-bottom:1px solid #ccc;
    padding-left: 30px;
}
.user-center .user-list .user-item .item-icon{
    position: absolute;
    top:50%;
    left: 0px;
    margin-top:-12px;
    font-size: 24px;
    color: #c60023;
}
.user-center .user-list .user-item .title{
    font-size:18px;
    color: #333;
}
.user-center .user-list .user-item .icon-arrow{
    position: absolute;
    right: 5px;
    top:50%;
    margin-top:-12px;
    font-size: 24px;
    color: #333;
}

</style>
