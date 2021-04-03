import axios from "axios";

const ins = axios.create(); // 创建一个axios的实例
ins.interceptors.response.use(function (resp) {
    console.log(resp)
    if (resp.status == 0) {
        return null;
    }
    return resp.data;
});

export default ins;