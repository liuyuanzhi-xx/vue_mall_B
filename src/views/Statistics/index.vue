<template>
  <div class="StatisticsContainer">
    <div class="cardContainer">
      <Card :content="cardList" />
    </div>
    <div class="chartsContainer">
      <Charts />
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import Charts from "./Charts";
export default {
  components: {
    Card,
    Charts,
  },
  data() {
    return {
      cardList: [
        {
          id: 1,
          title: "商品总览",
          content: [
            {
              id: 1,
              text: "cardContent1",
            },
          ],
        },
        {
          id: 2,
          title: "用户总览",
          content: [
            {
              id: 1,
              text: "cardContent2",
            },
          ],
        },
        {
          id: 3,
          title: "销售总览",
          content: [
            {
              id: 1,
              text: "cardContent3",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="less">
.StatisticsContainer {
  .cardContainer {
  }
}
</style>
