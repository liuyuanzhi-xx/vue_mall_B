import store from "@/store"
import Vue from "vue"
import {
    getCategory
} from "@/api/category"
export async function getCategoryList() {
    const categoryList = store.state.category.categoryList;
    if (categoryList.length != 0) {
        return categoryList;
    } else {
        let category = await getCategory();
        if (category.status === "success") {
            store.commit("category/setCategoryList", category.data.data);
            return store.state.category.categoryList
        } else {
            return []
            Vue.$Message.error(`获取类目信息失败`);
        }
    }
}