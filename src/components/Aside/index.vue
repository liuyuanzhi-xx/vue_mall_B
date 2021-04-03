<template>
  <div class="asideContainer">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <Menu />
      <!-- <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu> -->
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
  height: 100%;
  background-color: #001529;
}
</style>
