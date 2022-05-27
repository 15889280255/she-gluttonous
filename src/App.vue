<template>
  <div class="appContent">
    <Map :map="state.map"></Map>
    <Controller @start="start" @replay="replay" :gameStatus="gameStatus" />
    <ButtonGroup @changeDirection="change" />
    {{ score }}
  </div>
</template>

<script setup lang="ts">
import Map from "@/components/Map.vue";
import Controller from "@/components/Controller.vue";
import ButtonGroup from "@/components/ButtonGroup.vue";
import { ref } from "vue";
import {
  changeDirection,
  getScore,
  initGame,
  replayGame,
  startGame,
} from "./game";
import { Direction, gameType, StateType } from "./types";

// 地图
const state = ref<StateType>({
  map: [],
});

// 游戏状态
const gameStatus = ref(gameType.ready) as any;

// 开始游戏
const start = () => {
  startGame();
};

// 再来一局
const replay = () => {
  replayGame();
};

// 修改方向
const change = (direction: Direction) => {
  console.log("direction: ", direction);
  changeDirection(direction);
};

// 初始化游戏
initGame(state.value.map, gameStatus);
const score = getScore();
</script>

<style>
html,
body {
  padding: 0;
  overflow: hidden;
  background-size: cover;
  background-repeat: space;
  @media screen and (max-width: 750px) {
    background-size: contain;
  }
  font-size: calc(100vw / 375 * 100);
  @media screen and (min-width: 448px) {
    font-size: 100px;
  }
}

.appContent {
  margin: auto;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  padding-left: 10px;
}
@media screen and (max-width: 750px) {
  .appContent {
    padding-left: 0px;
    padding-top: 10px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
  }
}
</style>
