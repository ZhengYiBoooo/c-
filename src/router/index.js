import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/about',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    children: [
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/shopcar',
        name: 'Shopcar',
        component: () => import(/* webpackChunkName: "shopcar" */ '../views/shopcar/shopcar.vue')
      },
      {
        path: '/mystyle',
        name: 'Mystyle',
        component: () => import(/* webpackChunkName: "mystyle" */ '../views/Mystyle.vue')
      },
    ]
  },
  
  {
    path: '/shop',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop.vue')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "shop" */ '../views/address/Address.vue')
  },
]

const router = new VueRouter({
  mdoe:'history',
  base: process.env.BASE_URL,
  routes
})

export default router
