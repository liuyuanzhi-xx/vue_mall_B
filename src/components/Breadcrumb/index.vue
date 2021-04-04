<template>
  <div class="breadcrumbContainer">
    <a-breadcrumb>
      <a-breadcrumb-item>{{
        $route.matched[0] ? $route.matched[0].meta.title : ""
      }}</a-breadcrumb-item>
      <a-breadcrumb-item
        ><router-link :to="{ name: $route.matched[1].name }">{{
          $route.matched[1] ? $route.matched[1].meta.title : ""
        }}</router-link></a-breadcrumb-item
      >
    </a-breadcrumb>
  </div>
</template>
<script>
export default {
  mounted() {},
};
</script>
<style lang="less" scoped>
.breadcrumbContainer {
  height: 64px;
  position: absolute;
  top: 0;
  left: 66px;
  .ant-breadcrumb {
    line-height: 58px;
  }
}
</style>
