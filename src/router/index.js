import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home.vue'
import Shopcart from '@/components/shopcart/shopcart.vue'
import Usercenter from '@/components/usercenter/usercenter.vue'
import Detail from '@/components/detail/detail.vue'
import Login from '@/components/login/login.vue'
import Register from '@/components/register/register.vue'

Vue.use(Router)

export default new Router({
	linkActiveClass :'active',
	routes: [
		{
		path: '/',
		redirect:'/home',
		},
		{
			path: '/home',
			name: 'Home',
			component: Home
		},
		{
		path:'/shopcart',
		name:'Shopcart',
		component:Shopcart
		},
		{
			path:'/usercenter',
			name:'Usercenter',
			component:Usercenter
		},
		{
			path:'/detail',
			name:'Detail',
			components:{
				detail:Detail
			}
		},
		{
			path:'/login',
			name:'Login',
			components:{
				detail:Login
			}
		},
		{
			path:'/register',
			name:'Register',
			components:{
				detail:Register
			}
		}
	]
})
