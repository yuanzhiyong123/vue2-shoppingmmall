<template>
    <div class="home">
        <div class="mescroll" id="home-con">
            <div class="search-wrap">
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search">
                </el-input>
            </div>
            <div class="banner-wrap">
                <el-carousel height="150px">
                    <el-carousel-item v-for="item in bannerArr" >
                        <img class="banner-img" :src="item.url" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="product-wrap">
                <ul class="product-list" v-loading="productList.length===0" element-loading-text="拼命加载中" element-loading-background="#f2f0f0"
                element-loading-spinner="el-icon-loading">
                    <li class="product-item" v-for="item in productList">
                        <router-link :to="{path:'/detail',query:{id:item.id}}">
                            <div class="img-con">
                                <img class="img" :src="item.imageHost+item.mainImage" alt="">
                            </div>
                            <div class="price-con">
                                <span class="price">￥{{item.price}}</span>
                            </div>
                            <div class="intro-wrap">
                                <p class="intro">{{item.name}}</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import 'mescroll.js/mescroll.min.css';
import MEscroll from 'mescroll.js/mescroll.min.js';
import Services from '@/common/js/services';
const _service=new Services();
export default {
    data(){
        return{
            bannerArr:[
                {"url":require('./banner1.jpg')},
                {"url":require('./banner2.jpg')},
                {"url":require('./banner3.jpg')},
                {"url":require('./banner4.jpg')},
                {"url":require('./banner5.jpg')},
            ],
            productList:[],
            params:{
                keyword         :  'i',
                categoryId      :  '',
                orderBy         : 'default',
                pageNum         : 1,
                pageSize        : 18
            }
        }
    },
    created(){
        _service.getProductList(this.params).then(res=>{
            let _this=this;
            _this.productList=res.data.list;
            this.initScroll();
        }).catch(err=>{
            this.$message({
                showClose:true,
                message:'哪里出错了吧~',
                type:'error'
            });
        });
    },
    methods:{
        initScroll(){
            this.mescroll = new MEscroll("home-con", { //第一个参数"mescroll"对应上面布局结构div的id
	       		//如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
	       		//解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
				down: {
                    auto: false,
					callback: this.downCallback //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
				},
				up: {
                    auto: false,
					callback: this.upCallback, //上拉加载的回调
					// isBounce: false //如果您的项目是在iOS的微信,QQ,Safari等浏览器访问的,建议配置此项.解析(必读)
				}
            });
        },
        upCallback(){
            _service.getProductList(this.params).then(res=>{
                let _this=this;
                setTimeout(()=>{
                    _this.mescroll.endSuccess(300, true);
                    console.log(res.data.list);
                    let list=res.data.list
                    for(let i=0; i<list.length; i++){
                        _this.productList.push(list[i]);
                    }
                },500);
            }).catch(err=>{
                this.$message({
                    showClose:true,
                    message:'哪里出错了吧~',
                    type:'error'
                });
            });
        },
        downCallback(){
            _service.getProductList(this.params).then(res=>{
                this.mescroll.endSuccess();
                console.log(res.data.list);
                let list=res.data.list
                // this.productList.length=0;
                for(let i=0; i<list.length; i++){
                    if(parseInt(Math.random()*list.length)==i){
                        this.productList.unshift(list[i]);
                    }
                }
            }).catch(err=>{
                this.$message({
                    showClose:true,
                    message:'哪里出错了吧~',
                    type:'error'
                });
            });
        }
    }
}
</script>

<style>
.home .search-wrap{
    padding: 10px 20px;
    margin-bottom: 5px;
    background: #cbcfd4;
}
.home .banner-wrap .banner-img{
    width: 100%;
    height: 100%;
}
.home .banner-wrap .el-carousel__indicators{
    width:100%;
    text-align: center;
}
.home .product-wrap{
    padding:10px 3px;
}
.home .product-wrap .product-list{
    overflow: hidden;
    min-height: 400px;
}
.home .product-wrap .product-list .product-item{
    float: left;
    width:50%;
    margin-bottom:5px;
    padding:3px;
    box-sizing:border-box;
    overflow: hidden;
}
.home .product-wrap .product-list .product-item .img-con{
    width:100%;
    height: 230px;;
}
.home .product-wrap .product-list .product-item .img{
    width:100%;
    height: 100%;
}
.home .product-wrap .product-list .product-item .intro{
    font-size: 14px;
    line-height: 23px;
    height: 46px;
    overflow: hidden;
    background: #fff;
    color:#333;
}
.home .product-wrap .product-list .product-item .price-con{
    font-size:14px;
    color:#c60023;
    line-height: 16px;
    background: #fff;
}
</style>
