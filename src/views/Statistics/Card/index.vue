<template>
  <div style="background-color: #ececec; padding: 20px;">
    <a-row :gutter="16">
      <a-col :span="8" v-for="item in content" :key="item.id">
        <a-card :title="item.title" :bordered="false">
          <p v-for="p in item.content" :key="p.id">{{ p.text }}</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: Array,
    },
  },
  created() {
    console.log(this.content);
  },
};
</script>
