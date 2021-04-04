<template>
  <a-form-model
    layout="inline"
    :model="formInline"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <a-form-model-item label="检索关键字:">
      <a-input v-model="formInline.searchWord" placeholder="请输入关键字">
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类目:">
      <a-select
        show-search
        placeholder="请选择类目"
        style="width: 200px"
        allowClear
        v-model="formInline.category"
      >
        <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
          {{ c.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" html-type="submit">
        搜索
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { searchProduct } from "@/api/product";
export default {
  props: {
    categoryList: {
      type: Array,
    },
  },
  data() {
    return {
      formInline: {
        category: "",
        searchWord: "",
      },
      showList: [],
    };
  },
  methods: {
    async handleSubmit(e) {
      console.log(this.formInline);
      this.$emit("search", this.formInline);
    },
    // handleChange(e) {
    //   //   categoryList.filter((item) => {
    //   //       return item.category == this.formInline.category
    //   //   });
    // },
  },
  async created() {},
};
</script>
