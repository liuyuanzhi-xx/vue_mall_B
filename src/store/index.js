import Vuex from "vuex"
import Vue from "vue"
import user from "./user"
import menu from "./menu"
import category from './category'
Vue.use(Vuex); //应用vuex插件

const store = new Vuex.Store({
    modules: {
        user,
        menu,
        category
    },
    strict: true
})

window.store = store;
export default store;