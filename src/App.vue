<template>
  <div class="appContent">
    <Map :map="state.map"></Map>
    <Controller @start="start" @replay="replay" :gameStatus="gameStatus" />
    <ButtonGroup class="ButtonGroup" @changeDirection="change" />
    <span class="score">{{ score }}</span>
    <audio controls ref="audio" class="audio" loop autoplay>
      <source
        src="https://img.tukuppt.com/newpreview_music/09/01/69/5c8a0553e18db46234.mp3"
        type="audio/mpeg"
      />
    </audio>
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

const audio = ref(null);

// 地图
const state = ref<StateType>({
  map: [],
});

// 游戏状态
const gameStatus = ref(gameType.ready) as any;

// 开始游戏
const start = () => {
  startGame();
  // @ts-ignore
  audio.value.play();
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
  background-color: rgb(0, 0, 0);
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
.ButtonGroup {
  margin-left: 1rem;
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
.audio {
  position: absolute;
  z-index: -1;
  visibility: hidden;
}
.score {
  font-size: 1rem;
  color: white;
}
</style>
