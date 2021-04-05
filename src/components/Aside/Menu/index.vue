<template>
  <div>
    <a-menu
      :default-selected-keys="[defaultSelected]"
      :default-open-keys="[defaultOpen]"
      :selectedKeys="[defaultSelected]"
      mode="inline"
      theme="dark"
    >
      <template v-for="item in $store.state.menu.menuRouter">
        <a-sub-menu :key="item.name || item.meta.name" v-if="!item.meta.hidden">
          <span slot="title"
            ><a-icon :type="item.meta.icon" /><span>{{
              item.meta.title
            }}</span></span
          >
          <template v-for="children in item.children">
            <a-menu-item
              :key="children.name || children.meta.name"
              v-if="!children.meta.hidden"
            >
              <router-link :to="children.path">
                <a-icon :type="children.meta.icon" /><span>{{
                  children.meta.title
                }}</span>
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    defaultSelected() {
      console.log(
        this.$route.matched[1]
          ? this.$route.matched[1].name || this.$route.matched[1].meta.name
          : ""
      );
      return this.$route.matched[1]
        ? this.$route.matched[1].name || this.$route.matched[1].meta.name
        : "";
    },
    defaultOpen() {
      console.log(
        this.$route.matched[0]
          ? this.$route.matched[0].name || this.$route.matched[0].meta.name
          : ""
      );
      return this.$route.matched[0]
        ? this.$route.matched[0].name || this.$route.matched[0].meta.name
        : "";
    },
  },
  created() {
    // console.log(this.$store.state.menu.menuRouter);
  },
};
</script>
