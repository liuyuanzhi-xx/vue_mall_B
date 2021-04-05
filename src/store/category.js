import {
    getCategory
} from "@/api/category"
export default {
    namespaced: true,
    state: {
        categoryList: []

    },
    mutations: {
        setCategoryList(state, payload) {
            state.categoryList = payload

        }
    },
    actions: {}

}