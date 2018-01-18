<template>
<div id="app">
	<keep-alive>
		<router-view class="router-view"></router-view>
	</keep-alive>
	<transition name="slide">
		<router-view name="detail"></router-view>
	</transition>
	<div class="nav-wrap">
		<div class="nav-list">
			<router-link class="nav-item" to="/home"><i class="fa icon fa-home"></i><span>主页</span></router-link>
			<router-link class="nav-item" to="/shopcart"><i class="fa icon fa-cart-plus"></i><span>购物车</span></router-link>
			<router-link class="nav-item" to="/usercenter"><i class="fa icon fa-user"></i><span>个人中心</span></router-link>
		</div>
	</div>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app .router-view{
	position: absolute;
	top:0;
	bottom:50px;
	right: 0;
	left: 0;
	overflow: hidden;
	z-index: 2;
}
#app .nav-wrap{
	position: absolute;
	bottom: 0;
	left: 0;
	height: 50px;
	width:100%;
	background: #fff;
	z-index: 1;
}
#app .nav-wrap .nav-list{
	display:flex;
	height: 100%;
}
#app .nav-wrap .nav-list .nav-item{
	flex:1;
	text-align: center;
	padding-top:3px;
}
#app .nav-wrap .nav-list .nav-item.active .icon{
	color:#c60023;
}
#app .nav-wrap .nav-list .nav-item.active span{
	color:#c60023;
}
#app .nav-wrap .nav-list .nav-item .icon{
	font-size:30px;
	color:#c0c4cc;
}
#app .nav-wrap .nav-list .nav-item span{
	display:block;
	font-size:12px;
	line-height: 12px;
	color:#c0c4cc;
}
.slide-enter-active, .slide-leave-active {
  transition:.5s all;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform:translateX(100px);
}
</style>
