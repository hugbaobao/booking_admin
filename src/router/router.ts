import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 引入模块
// import { modulePathsHlj } from '@/router/module/hlj'

let routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/view/firstfloor/login/Login.vue'),
  },
  {
    path: '/home',
    redirect: '/home/content/room',
    //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import('@/view/firstfloor/Container.vue'),
    children: [
      {
        path: 'charts',
        name: 'charts',
        component: () => import('@/view/container/Charts.vue'),
        meta: {
          title: '用户管理',
          sidegroup: 'sub1',
          icon: '',
        },
      },
      {
        path: 'content',
        name: 'content',
        meta: {
          title: '内容管理',
        },
        children: [
          {
            path: 'room',
            name: 'room',
            component: () => import('@/view/container/content/Room.vue'),
            meta: {
              title: '房间预定',
              icon: '',
            },
          },
          {
            path: 'trip',
            name: 'trip',
            component: () => import('@/view/container/content/Trip.vue'),
            meta: {
              title: '行程助手',
              icon: '',
            },
          },
          {
            path: 'home',
            name: 'home',
            component: () => import('@/view/container/content/Home.vue'),
            meta: {
              title: '首页',
              icon: '',
            },
          },
          {
            path: 'shop',
            name: 'shop',
            component: () => import('@/view/container/content/Shop.vue'),
            meta: {
              title: '商城',
              icon: '',
            },
          },
          {
            path: 'personal',
            name: 'personal',
            component: () => import('@/view/container/content/Personal.vue'),
            meta: {
              title: '个人中心',
              icon: '',
            },
          },
        ],
      },
      {
        path: 'examine',
        name: 'examine',
        meta: {
          title: '内容审核',
        },
        children: [
          {
            path: 'trip',
            name: 'trip',
            component: () => import('@/view/container/examine/Trip.vue'),
            meta: {
              title: '旅行攻略',
              icon: '',
            },
          },
          {
            path: 'center',
            name: 'center',
            component: () => import('@/view/container/examine/Center.vue'),
            meta: {
              title: '共创中心',
              icon: '',
            },
          },
        ],
      },
      {
        path: 'pover',
        name: 'pover',
        component: () => import('@/view/container/pover/Pover.vue'),
        meta: {
          title: '账号管理',
        },
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/view/container/order/Order.vue'),
        meta: {
          title: '订单管理',
        },
      },
      {
        path: 'hotel',
        name: 'hotel',
        component: () => import('@/view/container/hotel/Hotel.vue'),
        meta: {
          title: '酒店订单',
        },
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/view/container/coupon/Coupon.vue'),
        meta: {
          title: '优惠券',
        },
      },
    ],
  },
  {
    path: '/error',
    component: () => import('@/view/firstfloor/Error.vue'),
  },
  {
    path: '/:catchAll(.*)', // 解决Vue Router warn的问题
    // hidden: true,
    component: () => import('@/view/firstfloor/Error.vue'),
  },
]

//base 直接加在 createWebHistory 中
// const routerHistory = createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH);
// 路由
const router = createRouter({
  history: createWebHistory(),
  // history: routerHistory,
  routes,
})

// 前置守卫
// router.beforeEach(async (to, from, next) => {
//   const isAuthenticated = sessionStorage.getItem('token')
//   if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   else next()
// })

// 导出
export default router
