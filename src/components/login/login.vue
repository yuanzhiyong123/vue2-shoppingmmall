<template>
    <div class="user-login">
        <div class="login-header">
            <div class="back" @click="goBack"><i class="fa fa-chevron-left"></i></div>
            <div class="title">用户登录</div>
        </div>
        <div class="login-wrap">
            <el-form :model="ruleForm2" status-icon required ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username" label-width="55px">
                    <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" label-width="55px">
                    <el-input type="password" v-model="ruleForm2.password"></el-input>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-button class="submit" id="submit" type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                </el-form-item>
            </el-form>
            <div class="go-register-wrap">
                <router-link class="go-register" to="/register">去注册>></router-link>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/header.vue'
import Service from '@/common/js/services.js'
const _service=new Service();
export default {
    data(){
        return{
            ruleForm2: {
                username: '',
                password: ''
            }
        }
    },
    mounted(){
        // _service.checkLogin().then(res=>{
        //     console.log(res);
        // }).catch(err=>{
        //     console.log(err);
        // });
    },
    methods:{
        goBack(){
            this.$router.back();
        },
        submitForm(){
            _service.login({
                username:this.ruleForm2.username,
                password:this.ruleForm2.password
            }).then(res=>{
                this.$store.commit('login',res.data);
                this.$router.push({path:'/usercenter'});
            }).catch(err=>{
                this.$message({
                    showClose:true,
                    message:err,
                    type:'error'
                });
            });
        }
    },
    components:{
        'v-header':Header
    }
}
</script>


<style >
.user-login{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #ccc;
    z-index: 3;
}
.user-login .login-header{
    width:100%;
    height: 50px;
    position: relative;
    background: #fff;
}
.user-login .login-header .back{
    position:absolute;
    top:11px;
    left: 5px;
}
.user-login .login-header .back .fa-chevron-left{
    font-size:26px;
    color:#333;
}
.user-login .login-header .title{
    width:100%;
    height: 100%;
    line-height: 50px;
    text-align: center;
    font-size:18px;
    color:#333;
}

.login-wrap{
    padding: 40px;
    background: #fff;
    margin-top: 100px;
}
.login-wrap .submit{
    width:100%;
}
.login-wrap .go-register-wrap{
    text-align: right;
}
</style>

