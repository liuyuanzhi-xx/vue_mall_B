<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 13 }"
    :rules="rules"
  >
    <a-form-model-item label="标题" prop="title" required>
      <a-input v-model="form.title" />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
      <a-input v-model="form.desc" />
    </a-form-model-item>
    <a-form-model-item label="商品类目" required prop="category">
      <a-select
        v-model="form.category"
        placeholder="请选择商品类别"
        @change="changeCategory"
        allowClear
      >
        <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
          {{ c.name }}
        </a-select-option>
      </a-select>
      <a-select
        v-model="form.c_item"
        placeholder="请添加子类目"
        @change="changeChild"
      >
        <a-select-option v-for="c in categoryChildrens" :key="c" :value="c">
          {{ c }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品标签" prop="tags" required>
      <a-select
        mode="tags"
        placeholder="请选择"
        :default-value="['包邮，最晚次日达']"
        v-model="form.tags"
      >
        <a-select-option value="包邮，最晚次日达"
          >包邮，最晚次日达</a-select-option
        >
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="" class="next-btn" :wrapperCol="{ span: 24 }">
      <a-button type="primary" @click="next">下一步</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import { getCategoryList } from "@/utils/category";
export default {
  props: {
    form: {
      type: Object,
      default: () => [],
    },
  },
  computed: {},
  data() {
    return {
      formLayout: "horizontal",
      rules: {},
      categoryList: [],
      categoryChildrens: [],
    };
  },
  methods: {
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("next", this.form);
        }
        console.log("error submit!!");
        return false;
      });
    },
    changeCategory(e) {
      console.log(e);
      for (let item of this.categoryList) {
        if (item.id == e) {
          this.categoryChildrens = item.c_items;
          break;
        }
      }
      this.form.c_item = this.categoryChildrens[0];
    },
    changeChild(e) {
      console.log(e);
    },
  },

  async created() {
    console.log(this.form);
    this.categoryList = await getCategoryList();
    for (let item of this.categoryList) {
      if (item.id == this.form.category) {
        this.categoryChildrens = item.c_items;
        break;
      }
    }
    this.categoryChildsValue = this.form.c_item;
    this.categoryValue = this.form.category;
  },
};
</script>
