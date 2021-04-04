export default {
    namespaced: true,
    state: {
        menuRouter: {},
    },
    mutations: {
        setMenuRouter(state, payload) {
            Object.assign(state.menuRouter, payload)
            // state.menuRouter = payload;
        },
        removeMenuRouter(state) {
            state.menuRouter = {};
        }
    },
    actions: {
        asyncSetMenuRouter({
            commit
        }, payload) {
            commit("setMenuRouter", payload)
        }
    }

}
// export default {
//     namespaced: true,
//     state: {
//         menuRouter: {}
//     },
//     mutations: {
//         setMenuRouter(state, payload) {
//             state.menuRouter = payload;
//         }
//     },
//     actions: {
//         asyncSetMenuRouter({
//             commit
//         }, payload) {
//             commit("setMenuRouter", payload)
//         }
//     }
// }