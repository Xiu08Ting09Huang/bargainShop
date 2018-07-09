import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/tabbar/home'
import OrderList from '@/components/tabbar/orderList'
import GoodsList from '@/components/tabbar/goodsList'
import SuccessCode from '@/components/code/successCode'
import FailCode from '@/components/code/failCode'
import Confirm from '@/components/code/confirm'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/shop/home'
    },
    {
      path: '/shop/home',
      component: Home
    },
   
    {
      path:'/shop/orderList',
      component: OrderList
    },
    {
      path:'/shop/goodsList',
      component:GoodsList
    },
    {
      path:'/shop/successCode',
      component:SuccessCode
    },
    {
      path:'/shop/failCode/:code',
      component:FailCode
    },
    {
      path:'/shop/confirm',
      component:Confirm
    }
  ],
 
})  