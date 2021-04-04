import request from "@/api/request"
export async function getCategory(options) {
    return await request.get("/category/all", {
        params: options
    });
}