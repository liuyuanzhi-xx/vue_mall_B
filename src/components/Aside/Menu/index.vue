<template>
  <div>
    <a-menu
      :default-selected-keys="[
        $route.matched[1]
          ? $route.matched[1].name || $route.matched[1].meta.name
          : '',
      ]"
      :default-open-keys="[
        $route.matched[0]
          ? $route.matched[0].name || $route.matched[0].meta.name
          : '',
      ]"
      mode="inline"
      theme="dark"
    >
      <a-sub-menu
        v-for="item in $store.state.menu.menuRouter"
        :key="item.name || item.meta.name"
      >
        <span slot="title"
          ><a-icon :type="item.meta.icon" /><span>{{
            item.meta.title
          }}</span></span
        >
        <a-menu-item
          v-for="children in item.children"
          :key="children.name || children.meta.name"
        >
          <router-link :to="children.path">
            <a-icon :type="children.meta.icon" /><span>{{
              children.meta.title
            }}</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    // console.log(this.$store.state.menu.menuRouter);
  },
};
</script>
