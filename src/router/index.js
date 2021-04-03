import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login"
import Register from "@/views/Register"
import FindBack from "@/views/FindBack"

import Statistics from "@/views/Statistics"
import Home from "@/views/Home"

import store from "@/store"

import getMenuRouter from './roleToRouter'

Vue.use(VueRouter)

// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

const asyncRroutes = [{
  path: "/product",
  name: 'Product',
  meta: {
    title: '商品',
    icon: 'dropbox'
  },
  component: Home,
  children: [{
    path: "/list",
    name: 'ProductList',
    meta: {
      title: '商品列表',
      icon: 'unordered-list'
    },
    component: () => import("@/views/ProductList"),
  }, {
    path: "/add",
    name: 'ProductAdd',
    meta: {
      title: '添加商品',
      icon: 'file-add'
    },
    component: () => import("@/views/ProductAdd"),
  }, {
    path: "/category",
    name: 'Category',
    meta: {
      title: '类目管理',
      icon: 'profile'

    },
    component: () => import("@/views/Category"),
  }]
}]
const routes = [{
    path: "/",
    name: 'Home',
    meta: {
      title: '首页',
      icon: 'home'
    },
    component: Home,
    children: [{
      path: "/statistics",
      name: 'Statistics',
      meta: {
        title: '统计',
        icon: 'line-chart'
      },
      component: Statistics,
    }]
  },
  {
    path: "/login",
    name: 'Login',
    meta: {
      title: '登陆',
      icon: 'login'
    },
    component: Login,
  },
  {
    path: "/register",
    name: 'Register',
    meta: {
      title: '注册'
    },
    component: Register,
  },
  {
    path: "/findBack",
    name: 'FindBack',
    meta: {
      title: '找回密码'
    },
    component: FindBack,
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})
let isFirstEnter = true;
router.beforeEach(async (to, from, next) => {
  if (to.path !== '/login' && to.path !== '/register' && to.path !== '/findBack') {
    if (store.state.user.userInfo.appkey &&
      store.state.user.userInfo.username &&
      store.state.user.userInfo.email &&
      store.state.user.userInfo.role) {
      if (isFirstEnter) {
        let resultMenuRouter = getMenuRouter(store.state.user.userInfo.role, asyncRroutes);
        let MenuRouter = routes.concat(resultMenuRouter).filter(item => {
          if (item.name == 'Login' || item.name == 'Register' || item.name == 'FindBack') {
            return false;
          } else {
            return true;
          }
        })
        // store.commit('menu/setMenuRouter', MenuRouter)
        store.dispatch('menu/asyncSetMenuRouter', MenuRouter).then(() => {
          resultMenuRouter.forEach((item) => {
            router.addRoute(item);

          })
          next()
        })
        isFirstEnter = false;
      }
      return next()

    } else {
      return next('/login')
    }
  }
  return next()
})



export default router