<template>
    <div class="detail">
        <div class="content-wrap" ref="detail">
            <div>
                <div class="detail-con">
                    <div class="img-wrap">
                        <el-carousel height="250px">
                            <el-carousel-item v-for="item in productDetail.subImages" >
                                <img class="img" :src="productDetail.imageHost+item" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="intro-wrap">
                        <h1 class="title">{{productDetail.name}}</h1>
                        <div class="price-wra">
                            <span class="price">￥{{productDetail.price}}</span>
                        </div>
                    </div>
                </div>
                <div class="main-wrap" v-html="productDetail.detail" v-loading="loading">
                </div>
            </div>
        </div>
        <div class="btn-wrap">
            <ul class="btn-con">
                <el-button class="btn-item btn-cart" @click="addCart">加入购物车</el-button>
                <el-button class="btn-item btn-pay" @click="payNow">立即购买</el-button>
            </ul>
        </div>
        <div class="back-wrap" @click="goBack">
            <i class="fa fa-chevron-left"></i>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import Service from '@/common/js/services.js'
const _service= new Service();
export default {
    data(){
        return {
            productDetail:{},
            loading:false
        }
    },
    mounted(){
        this.loading=true;
        _service.getProductDetail(this.$route.query.id).then(res=>{
            this.productDetail=res.data;
            this.filter(this.productDetail);
            this.loading=false;
            this.$nextTick(()=>{
                new BScroll(this.$refs.detail,{

                })
            });
        }).catch(err=>{
            this.$message({
                showClose:true,
                message:'哪里出错了吧~',
                type:'error'
            });
        });
    },
    methods:{
        filter(data){
            data.subImages=data.subImages.split(',');
        },
        addCart(){
            if(this.getProductId(this.productDetail.id)){
                this.$message({
                    showClose:true,
                    message:'亲,此商品已经在购物车了~',
                    type:"warning"
                });
            }else{
                this.productDetail.count=1;
                this.productDetail.select=true;
                this.$store.commit('add',this.productDetail);
                this.$message({
                    showClose:true,
                    message:'加入购物车成功！',
                    type:"success"
                });
            }
        },
        payNow(){
            this.$message({
                showClose:true,
                message:'正在开发中~',
                type:'warning'
            });
        },
        goBack(){
            this.$router.back();
        },
        getProductId(id){
            let orderList=this.$store.state.orderList;
            for(let i=0; i<orderList.length; i++){
                if(orderList[i].id===id){
                    return true;
                }
            }
            return false;
        }
    }
}
</script>
<style>
.detail{
    position: absolute;
    top:0;
    bottom:0;
    right: 0;
    left: 0;
    background: #f2f0f0;
    z-index: 3;
}
.detail .content-wrap{
    position: absolute;
    top:0;
    bottom:0;
    right: 0;
    left: 0;
    /* background: #ccc; */
    z-index: 1;
    overflow: hidden;
}
.detail .content-wrap .main-wrap{
    margin:8px;
    padding:0 3px;
}
.detail .content-wrap .main-wrap img{
    display: block;
    width:100%;
}
.detail .img-wrap .img{
    width: 100%;
    height: 100%;
}
.detail .intro-wrap{
    padding:5px;
    background: #fff;
}
.detail .intro-wrap .title{
    font-size:18px;
    color:#111;
    font-weight:normal;
    line-height:26px;
}
.detail .intro-wrap .price{
    font-size:20px;
    color:#c60023;
    line-height:20px;
}

.detail .btn-wrap{
    position: fixed;
    bottom:0;
    right: 0;
    left: 0;
    height: 50px;
    /* background: red; */
    z-index: 1;
}
.detail .btn-wrap .btn-con{
    display:flex;
    width: 100%;
    height: 100%;
}
.detail .btn-wrap .btn-con .btn-item{
    flex:1;
    height: 100%;
    margin:0;
}
.detail .btn-wrap .btn-con .btn-item.btn-cart{
    background: #6a5e5e;
    color:#fff;
}
.detail .btn-wrap .btn-con .btn-item.btn-pay{
    background: #c60023;
    color:#fff;
}
.detail .back-wrap{
    position: absolute;
    top:5px;
    left: 5px;
    width:30px;
    height:30px;
    line-height: 30px;
    text-align: center;
    font-size:22px;
    z-index:3;
    color:#333;
}
</style>
