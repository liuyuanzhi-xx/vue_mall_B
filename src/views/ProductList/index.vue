<template>
  <div class="productList">
    <SearchBar :categoryList="categoryList" @search="handleSearch" />
    <br />
    <TableList
      :data="productList"
      :pager="pager"
      @changePage="changePage"
      @delete="handleDelete"
      @edit="handleEdit"
    />
  </div>
</template>

<script>
import { searchProduct } from "@/api/product";
import { getCategory } from "@/api/category";
import SearchBar from "./SearchBar";
import TableList from "./TableList";
export default {
  components: {
    SearchBar,
    TableList,
  },
  computed: {},
  data() {
    return {
      categoryList: [],
      productList: [],
      queryFrom: {},
      categoryNames: [],
      pager: {
        current: 1,
        pageSize: 10,
        total: 1,
        showSizeChanger: true,
      },
    };
  },
  methods: {
    async handleDelete(e) {
      console.log(e);
    },
    async handleEdit(e) {
      console.log(e);
    },
    async changePage(options) {
      this.pager = options;
      this.getProductList();
    },
    async handleSearch(search) {
      this.queryFrom = search;
      this.pager.current = 1;
      this.pager.pageSize = 10;
      this.getProductList();
    },
    async getProductList() {
      let options = {
        ...this.queryFrom,
        page: this.pager.current,
        size: this.pager.pageSize,
      };
      let product = await searchProduct(options);
      if (product.status === "success") {
        this.productList = product.data.data;
        this.productList.map((item) => {
          item.categoryName = this.categoryNames[item.category];
          return item;
        });
        this.pager.total = product.data.total;
      } else {
        this.$Message.error(`获取商品信息失败`);
      }
    },
  },
  async created() {
    let category = await getCategory();
    console.log(category);
    if (category.status === "success") {
      this.categoryList = category.data.data;
      this.categoryList.forEach((item) => {
        this.categoryNames[item.id] = item.name;
      });
    } else {
      this.$Message.error(`获取类目信息失败`);
    }
    this.getProductList();
  },
};
</script>

<style></style>
