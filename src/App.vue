<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>
import Layout from "@/components/Layout";

export default {
  components: {
    Layout,
  },
  created() {},
};
</script>
<style lang="less">
#app {
  height: 100vh;
}
</style>
