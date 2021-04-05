import store from '@/store'
import {
    removeUserCookie
} from "@/utils/userCookie"
import {
    asyncRoutes,
    routes

} from "./routes"
import router from "./index"
const roleToRouter = {
    "coustomer": [{
        name: "Product"
    }, {
        name: "ProductList"
    }, {
        name: 'ProductAdd'
    }, {
        name: "ProductEdit"
    }],
    "admin": [{
        name: "Product"
    }, {
        name: "ProductList"
    }, {
        name: 'ProductAdd'
    }, {
        name: "ProductEdit"
    }, {
        name: "Category"
    }]
}
let isFirstEnter = true;
export function getMenuRouter(role, router) {
    const allowMenuRouter = roleToRouter[role].map(item => item.name);
    // console.log(allowMenuRouter)
    const resultMenuRouter = router.filter(item => {
        if (item.children) {
            item.children = item.children.filter(item2 => {
                if (allowMenuRouter.indexOf(item2.name) != -1 || allowMenuRouter.indexOf(item2.meta.name) != -1) return true;
                else return false;
            })
        }
        if (allowMenuRouter.indexOf(item.name) != -1 || allowMenuRouter.indexOf(item.meta.name) != -1) return true;
        else return false;
    })
    return resultMenuRouter;

}

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
                let resultMenuRouter = getMenuRouter(store.state.user.userInfo.role, asyncRoutes);
                console.log(resultMenuRouter)
                let MenuRouter = routes.concat(resultMenuRouter);
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