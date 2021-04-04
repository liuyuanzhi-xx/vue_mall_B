import axios from "axios";
import store from "@/store"
const ins = axios.create(); // 创建一个axios的实例
ins.interceptors.request.use((config) => {
    if (config.url.includes("/passport")) {
        return config
    } else {
        return {
            ...config,
            params: {
                ...config.params,
                appkey: store.state.user.userInfo.appkey
            }
        }

    }

})
ins.interceptors.response.use(function (resp) {
    console.log(resp)
    if (resp.status == 0) {
        return null;
    }
    return resp.data;
});

export default ins;