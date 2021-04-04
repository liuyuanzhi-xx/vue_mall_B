import Vue from 'vue'
import VueRouter from 'vue-router'



import {
  routes
} from './routes'
import {
  setMenuRouter,
} from './roleToRouter'


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


const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach(async (to, from, next) => {
  setMenuRouter(to, from, next);
})



export default router