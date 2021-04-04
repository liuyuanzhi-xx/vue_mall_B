<template>
  <div class="dropDownContainer">
    <a-dropdown>
      <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
        {{ $store.state.user.userInfo.username }} <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;" @click="handleClick">退出</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script>
import { logOut } from "@/router/roleToRouter";
export default {
  methods: {
    handleClick() {
      logOut();
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>
<style lang="less">
.dropDownContainer {
  position: absolute;
  top: 0;
  right: 30px;
  font-size: 15px;
}
</style>
