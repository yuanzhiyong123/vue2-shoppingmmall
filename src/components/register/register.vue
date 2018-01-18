<template>
    <div class="register">
        <div class="register-header">
            <div class="title">用户注册</div>
        </div>
      <div class="register-wrap">
          <ul class="user-info">
              <li class="username user-info-item">
                  <el-input @blur="checkUsername" v-model="formData.username" placeholder="请输入用户名"></el-input>
              </li>
              <li class="password user-info-item">
                  <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
              </li>
              <li class="password-confirm user-info-item">
                  <el-input type="password" v-model="formData.passwordConfirm" placeholder="请再次输入密码"></el-input>
              </li>
              <li class="email user-info-item">
                  <el-input v-model="formData.email" placeholder="请输入邮箱地址"></el-input>
              </li>
              <li class="phone user-info-item">
                  <el-input v-model="formData.phone" placeholder="请输入电话"></el-input>
              </li>
              <li class="question user-info-item">
                  <el-input v-model="formData.question" placeholder="请输入提示问题"></el-input>
              </li>
              <li class="answer user-info-item">
                  <el-input v-model="formData.answer" placeholder="请输入提示问题答案"></el-input>
              </li>
              <li class="register-btn-wrap user-info-item">
                  <el-button @click="register" type="primary" class="register-btn">注册</el-button>
              </li>
              <li class="go-login-wrap user-info-item">
                  <router-link to="/login" class="go-login">去登录>></router-link>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
import Services from '@/common/js/services.js'
const _service= new Services();
export default {
    data(){
        return {
            formData : {
                username        : '',
                password        : '',
                passwordConfirm : '',
                phone           : '',
                email           : '',
                question        : '',
                answer          : ''
            },
            errForm:{
                status:true,
                msg:''
            }
        }
    },
    methods:{
        checkUsername(){
            if(!this.validate(this.formData.username)){
                return;
            }
            _service.checkUsername(this.formData.username).then(res=>{
                console.log(res.msg);
            }).catch(err=>{
                this.$message({
                    showClose:true,
                    message:err,
                    type:'error'
                });
            });
        },
        register(){
            this.checkFormDate();
            if(this.errForm.status){
                _service.register(this.formData).then(res=>{
                    this.resultTip(res.msg,'success');
                }).catch(err=>{
                    this.resultTip(err,'error');
                });
            }else{
                this.resultTip(this.errForm.msg,'error');
            }
        },
        validate(data){
            if(data){
                return true;
            }else{
                return false;
            }
        },
        resultTip(msg,type){
            this.$message({
                showClose:true,
                message:msg,
                type:type
            });
        },
        checkFormDate(){
            if(!this.validate(this.formData.username)){
                this.errForm.status=false;
                this.errForm.msg='用户名不能为空'
                return;
            }
            if(!this.validate(this.formData.password)){
                this.errForm.status=false;
                this.errForm.msg='密码不能为空'
                return;
            }
            if(!this.validate(this.formData.passwordConfirm)){
                this.errForm.status=false;
                this.errForm.msg='重新输入密码不能为空'
                return;
            }
            if(this.formData.passwordConfirm!==this.formData.password){
                this.errForm.status=false;
                this.errForm.msg='两次输入密码不一致'
                return;
            }
            if(!this.validate(this.formData.email)){
                this.errForm.status=false;
                this.errForm.msg='邮箱不能为空'
                return;
            }
            if(!this.validate(this.formData.phone)){
                this.errForm.status=false;
                this.errForm.msg='电话不能为空'
                return;
            }
            if(!this.validate(this.formData.question)){
                this.errForm.status=false;
                this.errForm.msg='问题不能为空'
                return;
            }
            if(!this.validate(this.formData.answer)){
                this.errForm.status=false;
                this.errForm.msg='答案不能为空'
                return;
            }
            this.errForm.status=true;
        }
    }
}
</script>
<style>
.register .user-info{
    padding:20px;
    padding-top:60px;
    background: #fff;
}
.register .user-info .user-info-item{
    margin-bottom:10px;
}
.register .user-info .user-info-item .register-btn{
    width:100%;
}
.register .user-info .go-login-wrap{
    text-align:right;
}
.register .register-header{
    width: 100%;
    height: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: #333;
    background: #fff;
    margin-bottom: 2px;
}
</style>
