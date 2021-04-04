module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        proxy: {
            "/": {
                //   "/api" 代表要拦截的请求
                target: "https://mallapi.duyiedu.com", //目标服务器地址
            },
        },
    }

}