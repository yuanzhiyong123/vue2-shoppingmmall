<template>
    <h1 class="header">{{title}}</h1>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:'购物车列表'
        }
    }
}
</script>
<style>
.header {
    padding-left: 10px;
    font-size: 18px;
    height: 38px;
    line-height: 38px;
    background: #db8dc0;
    border-bottom: 2px solid #333;
    color: #333;
}
</style>


