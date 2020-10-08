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
  {
    path: '/myhome',
    name: 'Myhome',
    component: () => import(/* webpackChunkName: "myhome" */ '../views/myhome/Myhome.vue'),
  },

  {
    path: '/myGender',
    name: 'MyGender',
    component: () => import(/* webpackChunkName: "myGender" */ '../views/myhome/MyGender.vue')
  },

  {
    path: '/myphone',
    name: 'Myphone',
    component: () => import(/* webpackChunkName: "myphone" */ '../views/myhome/Myphone.vue')
  },

  {
    path: '/mycode',
    name: 'MyCode',
    component: () => import(/* webpackChunkName: "MyCode" */ '../views/myhome/MyCode.vue')
  },

  {
    path: '/oderall',
    name: 'Oderall',
    component: () => import(/* webpackChunkName: "Oderall" */ '../views/oder/Oderall.vue')
  },
  {
    path: '/waitpay',
    name: 'Waitpay',
    component: () => import(/* webpackChunkName: "Waitpay" */ '../views/oder/Waitpay.vue')
  },

  {
    path: '/refund',
    name: 'Refund',
    component: () => import(/* webpackChunkName: "Refund" */ '../views/oder/Refund.vue')
  },
  {
    path: '/receive',
    name: 'Receive',
    component: () => import(/* webpackChunkName: "Receive" */ '../views/other/Receive.vue')
  },

  {
    path: '/editress',
    name: 'Editress',
    component: () => import(/* webpackChunkName: "Editress" */ '../views/other/Editress.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "Contact" */ '../views/other/Contact.vue')
  },
  {
    path: '/opinion',
    name: 'Opinion',
    component: () => import(/* webpackChunkName: "Opinion" */ '../views/other/Opinion.vue')
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import(/* webpackChunkName: "Details" */ '../views/oder/Details.vue')
  },
  {
    path: '/platform',
    name: 'Platform',
    component: () => import(/* webpackChunkName: "Platform" */ '../views/oder/Platform.vue')
  },
  {
    path: '/logistics',
    name: 'Logistics',
    component: () => import(/* webpackChunkName: "Logistics" */ '../views/oder/Logistics.vue')
  },
]

const router = new VueRouter({
  mdoe: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
