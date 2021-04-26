<template>
  <div class="productAddContainer">
    <a-steps :current="current" style="max-width:500px;margin:0 auto">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <div v-show="current === 0">
        <div v-if="form.category != '' || $route.name === 'ProductAdd'">
          <BaseForm :form="form" @next="next" />
        </div>
      </div>
      <div v-show="current == 1">
        <div v-if="form.category != '' || $route.name === 'ProductAdd'">
          <SaleForm :form="form" @prev="prev" @submit="submit" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { productDetail, editProduct, addProduct } from "@/api/product";

import BaseForm from "./BaseForm";
import SaleForm from "./SaleForm";

export default {
  components: {
    BaseForm,
    SaleForm,
  },
  data() {
    return {
      current: 0,
      form: {
        title: "",
        desc: "",
        category: "",
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: "",
        inventory: 0,
        images: [],
      },
      categoryList: [],
      categoryChildrens: [],
      steps: [
        {
          title: "填写商品基本信息",
        },
        {
          title: "填写商品销售信息",
        },
      ],
    };
  },
  methods: {
    next(e) {
      this.form = e;
      this.current++;
    },
    prev(e) {
      this.form = e;
      this.current--;
    },
    async submit(e) {
      this.form = e;
      // console.log((this.$route.name = "ProductEdit"));
      if (this.$route.name === "ProductEdit") {
        const res = await editProduct(this.form);
        if (res.status === "success") {
          this.$Message.success(`编辑成功！`);
          this.$router.push({ name: "ProductList" });
        } else {
          this.$Message.error(`编辑失败！`);
        }
      } else {
        const res = await addProduct(this.form);
        this.$router.push({ name: "ProductAdd" });
        this.$router.go(0);
        if (res.status === "success") {
          this.$Message.success(`新增成功！`);
          this.$router.push({ name: "ProductAdd" });
        } else {
          this.$Message.error(`新增失败！`);
        }
      }
    },
  },
  async created() {
    const id = this.$router.history.current.params.id;
    if (id) {
      let res = await productDetail(id);
      this.form = res.data;
    }
  },
  watch: {
    "$route.name"(newVal, oldVal) {
      if (newVal === "ProductAdd") {
        this.form = {
          title: "",
          desc: "",
          category: "",
          c_items: [],
          tags: [],
          price: 0,
          price_off: 0,
          unit: "",
          inventory: 0,
          images: [],
        };
      }
    },
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  text-align: center;
  margin-top: 24px;
}
</style>
