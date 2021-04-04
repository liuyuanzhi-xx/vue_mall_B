import {
    getUserCookie
} from "@/utils/userCookie";
export default {
    namespaced: true,
    state: {
        userInfo: getUserCookie(),

    },
    mutations: {
        setLogined(state, payload) {
            state.userInfo = payload;
        },
        removeUserInfo(state) {
            state.userInfo = {};
        }
    },
    actions: {}

}