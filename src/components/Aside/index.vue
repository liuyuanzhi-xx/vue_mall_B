<template>
  <div class="asideContainer">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <Menu />
    </a-layout-sider>
  </div>
</template>

<script>
import Menu from "./Menu";
export default {
  components: {
    Menu,
  },
  props: {
    collapsed: {
      type: Boolean,
    },
  },
};
</script>

<style>
.asideContainer {
  min-height: 100vh;
  background-color: #001529;
}
</style>
