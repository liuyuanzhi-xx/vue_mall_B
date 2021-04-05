<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>
import { getCategory } from "@/api/category";
export default {
  components: {},
  async created() {
    let category = await getCategory();
    if (category.status === "success") {
      this.$store.commit("category/setCategoryList", category.data.data);
    } else {
      this.$Message.error(`获取类目信息失败`);
    }
  },
};
</script>
<style lang="less">
#app {
  // height: 100vh;
}
</style>
