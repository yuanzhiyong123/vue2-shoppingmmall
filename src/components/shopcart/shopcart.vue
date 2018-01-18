<template>
    <div class="shopcart">
        <div class="shopcart-wrap" ref="shopcart">
            <div>
                <v-header title="我的购物车"></v-header>
                <ul class="order-list">
                    <li class="order-item" v-for="(item,index) in orderList" :key="index">
                        <div class="checkbox-wrap" @click="togglecheck(item.id)">
                            <i class="fa fa-check-circle" :class="{'active':item.select}"></i>
                        </div>
                        <div class="img-wrap">
                            <img class="img" :src="item.imageHost+item.mainImage" alt="item.name">
                        </div>
                        <div class="intro-wrap">
                            <p class="title">{{item.name}}</p>
                            <div class="count-wrap">
                                <span class="count-btn add" @click="plus(item.id)">+</span>
                                <input class="count" type="text" readonly v-model="item.count" value="">
                                <span class="count-btn minus" @click="minus(item.id)">-</span>
                            </div>
                            <div class="price-wrap">
                                <span class="price">￥{{item.price}}元</span>
                            </div>
                        </div>
                        <div class="remove-wrap" @click="deleteOrder(item.id)">
                            <i class="fa fa-remove"></i>
                        </div>
                    </li>
                    <li class="empty" v-if="orderList.length==0">
                         <i class="fa fa-cart-arrow-down"></i>
                         <p class="empty-name">你的购物车里是空的！</p>
                    </li>  
                </ul>
            </div>
        </div>
        <div class="shopcart-footer">
            <div class="checkall-wrap" @click="toggleCheckAll">
                <i class="fa fa-check-circle" :class="{'active':allSelect}"></i>
                <span class="checkall-txt">全选</span>
            </div>
            <div class="totalprice-wrap">
                <span class="totalprice">合计：￥{{totalPrice}}元</span>
            </div>
            <div class="pay-wrap" :class="{'active':payActive}" @click="goPay">
                <span class="pay">结算</span>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import Header from '@/components/header.vue'
export default {
    data(){
        return {
            
        }
    },
    computed:{
        orderList(){
            return this.$store.state.orderList;
        },
        allSelect(){
            let list=this.orderList;
            for(let i=0; i<list.length; i++){
                if(list[i].select===false){
                    return false;
                }
            }
            return true;
        },
        totalPrice(){
            let list=this.orderList;
            let total=0;
            for(let i=0; i<list.length; i++){
                if(list[i].select===true){
                    total+=list[i].count*list[i].price;
                }
            }
            return total;
        },
        payActive(){
            let list=this.orderList;
            for(let i=0; i<list.length; i++){
                if(list[i].select===true){
                    return true;
                }
            }
            return false;
        }
    },
    methods:{
        toggleCheckAll(){
            this.$store.commit('toggleSelectAll',!this.allSelect);
        },
        togglecheck(id){
            this.$store.commit('toggleSelect',id);
        },
        plus(id){
            this.$store.commit('plus',id);
        },
        minus(id){
            this.$store.commit('minus',id);
        },
        deleteOrder(id){
            this.$store.commit('deleteOrder',id);
        },
        goPay(){
            if(this.payActive){
                this.$message({
                    showClose:true,
                    message:'支付成功￥'+this.totalPrice+'元！',
                    type:'success'
                });
            }else{
                this.$message({
                    showClose:true,
                    message:'您还没有选择商品！',
                    type:'warning'
                });
            }
        }
    },
    mounted(){
        this.$nextTick(()=>{
            new BScroll(this.$refs.shopcart,{
                click:true
            })
        });
    },
    components:{
        'v-header':Header
    }
}
</script>

<style>
.shopcart .shopcart-wrap{
    position:absolute;
    left: 0;
    top:0;
    bottom:50px;
    right:0;
    overflow: hidden;
}
.shopcart .detail-title{
    padding-left: 10px;
    font-size:18px;
    height: 38px;
    line-height: 38px;
    background: #db8dc0;
    border-bottom:2px solid #333;
    color:#333;
}
.shopcart .order-list{
    padding:5px 0 20px;
    background: #fff;
}
.shopcart .order-item{
    display: flex;
    position: relative;
    padding:10px 30px 10px 30px;
    background: #fff;
    border-bottom: 2px solid #ccc;
    margin-bottom:10px;
}
.shopcart .order-item .checkbox-wrap{
    position:absolute;
    left: 5px;
    top:55px;
}
.shopcart .order-item .checkbox-wrap .fa-check-circle{
    font-size:26px;
    color:#ccc;
}
.shopcart .order-item .checkbox-wrap .fa-check-circle.active{
    color:#f00;
}

.shopcart .order-item .img-wrap{
    flex: 0 0 110px;
    width:110px;
    height: 110px;
    margin-right:5px;
}
.shopcart .order-item .img-wrap .img{
    width:100%;
    height: 100%;
}
.shopcart .order-item .intro-wrap{
    flex: 1;
}
.shopcart .order-item .intro-wrap .title{
    font-size:16px;
    color:#333;
    line-height: 20px;
    margin-bottom:5px;
}
.shopcart .order-item .price-wrap .price{
    font-size:14px;
    color:#c60023;
}
.shopcart .order-item .count-wrap{
    margin-bottom:5px;
    font-size: 0;
}
.shopcart .order-item .count-wrap .count{
    width:35px;
    height: 30px;
    border:1px solid #333;
    line-height: 30px;
    text-align: center;
    font-size:22px;
    margin-right:-1px;
}
.shopcart .order-item .count-wrap .count-btn{
    width:30px;
    height: 30px;
    border:1px solid #333;
    display: inline-block;
    vertical-align: top;
    margin-right:-1px;
    font-size:16px;
    line-height: 30px;
    text-align: center;
}
.shopcart .order-item .remove-wrap{
    position: absolute;
    right: 5px;
    top:5px;
}
.shopcart .order-item .remove-wrap .fa-remove{
    font-size:26px;
    color:#ccc;
}
.shopcart .shopcart-footer{
    position: absolute;
    bottom:0;
    left: 0;
    height: 50px;
    width:100%;
    background: #fff;
    border:1px solid #ccc;
}
.shopcart .shopcart-footer .checkall-wrap{
    float: left;
    margin-left:20px;
    width:70px;
    height: 50px;
    line-height: 50px;
    margin-right:5px;
}
.shopcart .shopcart-footer .checkall-wrap .fa-check-circle{
    color: #ccc;
    font-size:26px;
    margin-right:3px;
}
.shopcart .shopcart-footer .checkall-wrap .fa-check-circle.active{
    color: #f00;
}
.shopcart .shopcart-footer .totalprice-wrap{
    float: left;
    /* width:110px; */
    height: 50px;
    line-height: 50px;
}
.shopcart .shopcart-footer .pay-wrap{
    float: right;
    width:110px;
    height: 50px;
    line-height: 50px;
    font-size:18px;
    color:#333;
    text-align:center;
    background: #ccc;
}
.shopcart .shopcart-footer .pay-wrap.active{
    background: #c60023;
    color:#fff;
}
.shopcart .empty{
    text-align: center;
}
.shopcart .empty .fa-cart-arrow-down{
    font-size: 200px;
    color: #ccc;
}
.shopcart .empty .empty-name{
    font-size: 22px;
    font-weight: bold;
    color: #555;
}
</style>
