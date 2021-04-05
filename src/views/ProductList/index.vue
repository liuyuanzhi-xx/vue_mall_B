<template>
  <div class="productList">
    <SearchBar :categoryList="categoryList" @search="handleSearch" />

    <a-button
      type="primary"
      @click="handleAdd"
      style="float:right;margin-top:-35px"
      >添加商品</a-button
    >

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
import { searchProduct, deleteProduct } from "@/api/product";
import { getCategoryList } from "@/utils/category";
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
      const _this = this;
      this.$confirm({
        title: "你确定要删除吗",
        content: (h) => <div>你确定要删除{e.title}商品吗？</div>,
        okText: "是",
        okType: "danger",
        cancelText: "否",
        async onOk() {
          let res = await deleteProduct(e.id);
          if (res.status === "success") {
            _this.getProductList();
            _this.$Message.success(`删除成功!`);
          } else {
            _this.$Message.error(`删除失败!`);
          }
        },
        onCancel() {
          // console.log("Cancel");
        },
      });
    },
    async handleEdit(e) {
      this.$router.push({
        name: "ProductEdit",
        params: {
          id: e.id,
        },
      });
    },
    handleAdd() {
      this.$router.push({ name: "ProductAdd" });
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
    this.categoryList = await getCategoryList();
    this.categoryList.forEach((item) => {
      this.categoryNames[item.id] = item.name;
    });
    this.getProductList();
  },
};
</script>

<style></style>
