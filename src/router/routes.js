import Login from "@/views/Login"
import Register from "@/views/Register"
import FindBack from "@/views/FindBack"
import Statistics from "@/views/Statistics"
import Home from "@/views/Home"
export const routes = [{
        path: "/",
        meta: {
            name: 'Home',
            title: '首页',
            icon: 'home',
            hidden: false
        },
        component: Home,
        children: [{
            path: "/",
            name: 'Statistics',
            meta: {
                title: '统计',
                icon: 'line-chart',
                hidden: false
            },
            component: Statistics,
        }]
    },
    {
        path: "/login",
        name: 'Login',
        meta: {
            title: '登陆',
            icon: 'login',
            hidden: true
        },
        component: Login,
    },
    {
        path: "/register",
        name: 'Register',
        meta: {
            title: '注册',
            hidden: true
        },
        component: Register,
    },
    {
        path: "/findBack",
        name: 'FindBack',
        meta: {
            title: '找回密码',
            hidden: true
        },
        component: FindBack,
    }
]

export const asyncRoutes = [{
    path: "/product",
    meta: {
        name: 'Product',
        title: '商品',
        icon: 'dropbox',
        hidden: false
    },
    component: Home,
    children: [{
        path: "/list",
        name: 'ProductList',
        meta: {
            title: '商品列表',
            icon: 'unordered-list',
            hidden: false
        },
        component: () => import("@/views/ProductList"),
    }, {
        path: "/add",
        name: 'ProductAdd',
        meta: {
            title: '添加商品',
            icon: 'file-add',
            hidden: false
        },
        component: () => import("@/views/ProductAdd"),
    }, {
        path: "/edit/:id",
        name: 'ProductEdit',
        meta: {
            title: '编辑商品',
            icon: 'edit',
            hidden: true
        },
        component: () => import("@/views/ProductAdd"),
    }, {
        path: "/category",
        name: 'Category',
        meta: {
            title: '类目管理',
            icon: 'profile',
            hidden: false
        },
        component: () => import("@/views/Category"),
    }]
}]