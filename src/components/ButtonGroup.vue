<template>
  <div class="buttonGroup">
    <button class="up" @click="change('Up')">↑</button>
    <button class="left" @click="change('Left')">←</button>
    <button class="down" @click="change('Down')">↓</button>
    <button class="right" @click="change('Right')">→</button>
  </div>
</template>

<script setup lang="ts">
import { Direction } from "../types";

const emit = defineEmits(["changeDirection"]);
function change(direction: Direction) {
  emit("changeDirection", direction);
}
</script>

<style lang="scss" scoped>
.buttonGroup {
  width: 2rem;
  height: 1rem;
  display: grid;
  grid-template-columns: 0.45rem 0.45rem 0.45rem;
  grid-template-areas: ". up ." "left down right";
  column-gap: 10px;
  row-gap: 10px;
  .up {
    grid-row-start: 1;
    grid-column-start: 2;
  }
  .left {
    grid-row-start: 2;
  }
  .down {
    grid-row-start: 2;
  }
  .right {
    grid-row-start: 2;
  }
  button {
    width: 0.45rem;
    height: 0.45rem;
  }
}
</style>
