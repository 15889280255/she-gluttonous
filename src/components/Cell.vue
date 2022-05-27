<template>
  <div class="cellBox" :class="classes"></div>
</template>

<script setup lang="ts">
import { mapType } from "@/types";
import { computed, defineProps } from "vue";
const props = defineProps(["type"]);

// 小格子的颜色
const classes = computed(() => {
  return {
    head: props.type === mapType.head,
    body: props.type === mapType.body,
    food: props.type === mapType.food,
  };
});
</script>

<style lang="scss" scoped>
.cellBox {
  border: 1px solid rgb(255, 255, 255);
  width: 50px;
  height: 50px;
  @media screen and (max-width: 750px) {
    width: 30px;
    height: 30px;
  }
  border-radius: 8px;
  margin: 2px;
}

.head {
  background-image: url("../assets/she2.png");
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 10px #1e88e5, 0 0 20px #1e88e5, 0 0 40px #1e88e5;
}
.body {
  background: rgb(211, 245, 22);
  box-shadow: 0 0 5px #76ff03, 0 0 5px #76ff03, 0 0 10px #76ff03;
}
.food {
  // background-image: url("../assets/food.gif");
  background-image: url("../assets/food2.jpg");
  background-size: 100% 100%;
}

</style>
