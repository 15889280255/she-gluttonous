<template>
  <div class="game-box">
    <div class="row" v-for="row in gameRow" :key="row">
      <div class="col" v-for="col in gameCol" :key="col">
        <Cell :type="map[row - 1][col - 1]"></Cell>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cell from "@/components/Cell.vue";
import { gameRow, gameCol } from "@/game/map";
defineProps(["map"]);
</script>

<style lang="scss" scoped>
.game-box {
  border: 4px solid rgb(151, 226, 10);
  background: #000;
  opacity: 0.85;
  .row {
    display: flex;
  }
}
</style>
