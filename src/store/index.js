import Vuex from "vuex"
import Vue from "vue"
import user from "./user"
import menu from "./menu"

Vue.use(Vuex); //应用vuex插件

const store = new Vuex.Store({
    modules: {
        user,
        menu
    },
    strict: true
})

window.store = store;
export default store;