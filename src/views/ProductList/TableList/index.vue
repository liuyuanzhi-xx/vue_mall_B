<template>
  <a-table
    :columns="columns"
    :data-source="showData"
    :pagination="pager"
    @change="changePage"
  >
    <a slot="operation" slot-scope="text, record">
      <a-button
        type="primary"
        @click="handleEdit(record)"
        style="margin-right:5px"
        >编辑</a-button
      >
      <a-button type="danger" @click="handleDelete(record)">
        删除
      </a-button>
    </a>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    scopedSlots: { customRender: "id" },
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    // width: 80,
    ellipsis: true,
  },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc",
    ellipsis: true,
  },
  {
    title: "类目",
    dataIndex: "categoryName",
    key: "category",
    ellipsis: true,
  },
  {
    title: "预售价格",
    dataIndex: "price",
    key: "price",
    ellipsis: true,
  },
  {
    title: "折扣价格",
    dataIndex: "price_off",
    key: "price_off",
    ellipsis: true,
  },
  {
    title: "标签",
    dataIndex: "tags",
    key: "tags",
    ellipsis: true,
  },
  {
    title: "限制购买数量",
    dataIndex: "inventory",
    key: "inventory",
    // ellipsis: true,
  },
  {
    title: "上架状态",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    customRender(text, record) {
      return record.status === 1 ? "上架" : "下架";
    },
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width: 200,
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    pager: {
      type: Object,
    },
  },
  computed: {
    showData() {
      if (this.data.length != 0) {
        return this.data.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        });
      }
      return [];
    },
  },
  data() {
    return {
      columns,
    };
  },
  methods: {
    changePage(e) {
      this.$emit("changePage", e);
    },
    handleDelete(e) {
      // console.log(e);
      this.$emit("delete", e);
    },
    handleEdit(e) {
      // console.log(e);
      this.$emit("edit", e);
    },
  },
  updated() {
    console.log(this.data);
  },
};
</script>
