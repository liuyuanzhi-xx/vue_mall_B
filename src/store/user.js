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
    },
    actions: {
        // async fetchBanner(ctx) {
        //     if (ctx.state.data.length) {
        //         return
        //     }
        //     ctx.commit("setLoading", true);
        //     let resp = await getBanner()
        //     ctx.commit("setData", resp);
        //     ctx.commit("setLoading", false)
        // }
    }

}