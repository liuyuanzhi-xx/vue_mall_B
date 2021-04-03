import {
    getUserCookie
} from "@/utils/userCookie";
export default {
    namespaced: true,
    state: {
        userInfo: getUserCookie(),
        // userInfo: {},

    },
    mutations: {
        setLogined(state, payload) {
            state.userInfo = payload;
        },
    },
    actions: {}

}