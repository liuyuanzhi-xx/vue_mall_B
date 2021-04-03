import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login"
import Register from "@/views/Register"
import FindBack from "@/views/FindBack"
// import Statistics from "@/views/Statistics"
import Home from "@/views/Home"
import store from "@/store"


Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: 'Home',
    component: Home,
  },
  {
    path: "/login",
    name: 'Login',
    component: Login,
  },
  {
    path: "/register",
    name: 'Register',
    component: Register,
  },
  {
    path: "/findBack",
    name: 'FindBack',
    component: FindBack,
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && to.path !== '/register' && to.path !== '/findBack') {
    if (store.state.user.userInfo.appkey &&
      store.state.user.userInfo.username &&
      store.state.user.userInfo.email &&
      store.state.user.userInfo.role) {
      next()
    } else {
      next('/login')
    }
  }
  next()
})



export default router