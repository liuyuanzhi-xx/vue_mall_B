import store from '@/store'

import {
    removeUserCookie
} from "@/utils/userCookie"

let isFirstEnter = true;
export function logOut() {
    isFirstEnter = true;
    store.commit("user/removeUserInfo");
    store.commit("menu/removeMenuRouter");
    removeUserCookie();
}
export function setMenuRouter(to, from, next) {
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
}