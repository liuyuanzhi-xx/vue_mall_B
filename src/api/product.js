import request from "@/api/request"
export async function searchProduct(options) {
    // console.log(options)
    return await request.get("/products/all", {
        params: options
    });
}
export async function deleteProduct(id) {
    // console.log(options)
    return await request.delete(`/products/${id}`);
}
export async function productDetail(id) {
    // console.log(options)
    return await request.get(`/products/${id}`);
}
export async function editProduct(options) {
    // console.log(options)
    return await request.put(`/products/edit`, options);
}