import request from "@/api/request"
export async function searchProduct(options) {
    // console.log(options)
    return await request.get("/products/all", {
        params: options
    });
}