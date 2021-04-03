import request from "@/api/request"
export async function login(options) {
    return await request.post("/passport/login", options);
}
export async function getCode(options) {
    return await request.post("/passport/getCode", options);
}
export async function logon(options) {
    return await request.post('/passport/logon', options);
}
export async function findBack(options) {
    return await request.post('/passport/findBack', options)
}