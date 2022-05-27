<template>
  <!-- 过渡动画  添加了0.3s的淡入淡出  显得更加平滑 -->
  <transition name="base">
    <!-- 遮罩层 -->
    <div class="controller-box" v-if="gameStatus !== gameType.ing">
      <div v-if="gameStatus === gameType.ready" class="show-btns">
        <div class="startGameCard">
          <span class="artWord">贪吃佘</span>
          <button class="pulse-button" @click="emit('start')">开始游戏</button>
          <div class="options-tips">
            <p>通过按键 ↑ ↓ ← → 进行操作;</p>
          </div>
        </div>
      </div>
      <div v-if="gameStatus === gameType.end" class="show-btns">
        <div class="gameEnd">
          <div class="artWord">得分：{{ score }}</div>
          <button @click="emit('replay')" class="pulse-button">
            游戏结束,再来一局
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { getScore } from "@/game";
import { gameType } from "@/types";
import { defineProps, defineEmits, PropType, ref } from "vue";

const emit = defineEmits(["start", "replay"]);

defineProps({
  gameStatus: {
    type: Number as PropType<gameType>,
    default: ref(gameType.ready),
  },
});

defineExpose({
  gameType,
});

const score = getScore();
</script>

<style lang="scss" scoped>
.controller-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  // 模糊滤镜
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;

  .startGameCard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
    font-style: italic;
    padding: 0.5rem;
    width: 6rem;
    height: 3.5rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    background-color: rgba(253, 253, 253, 0.315);
    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
    border: 2px rgba(255, 255, 255, 0.4) solid;
    border-bottom: 2px rgba(40, 40, 40, 0.35) solid;
    border-right: 2px rgba(40, 40, 40, 0.35) solid;
  }
  .artWord {
    text-align: center;
    font-size: 0.8rem;
    margin-bottom: 0;
    margin-top: 0;
    line-height: 1;
    text-decoration: none;
    color: #fff;
    font-family: Monoton;
    animation: neon1 1.5s ease-in-out infinite alternate;
  }
  @keyframes neon1 {
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #27e4f1,
        0 0 70px #11c7ff, 0 0 80px #56dadf, 0 0 100px #2ef0f0, 0 0 150px #32e2d9;
    }
    to {
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff1177,
        0 0 35px #ff1177, 0 0 40px #ff1177, 0 0 50px #ff1177, 0 0 75px #ff1177;
    }
  }

  .pulse-button {
    margin-top: 0.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    font-size: 0.2rem;
    font-weight: light;
    font-family: "Trebuchet MS", sans-serif;
    text-transform: uppercase;
    text-align: center;
    line-height: 100px;
    letter-spacing: -1px;
    color: white;
    border: none;
    border-radius: 50%;
    background: #5a99d42c;
    cursor: pointer;
    box-shadow: 0 0 0 0 rgba(#5ad0d4, 0.5);
    -webkit-animation: pulse 1.5s infinite;
  }
  .pulse-button:hover {
    -webkit-animation: none;
  }

  @-webkit-keyframes pulse {
    0% {
      transform: scale(0.9);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 50px rgba(#5a99d4, 0);
    }
    100% {
      transform: scale(0.9);
      box-shadow: 0 0 0 0 rgba(#5a99d4, 0);
    }
  }

  .gameEnd {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  .show-btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .limit {
      width: 300px;
    }
  }

  .options-tips {
    color: #f0d095;
    font-size: 12px;
    p {
      padding: 5px 0;
    }
  }
}
//淡入淡出
.base-enter-active,
.base-leave-active {
  transition: all 0.3s ease;
}
.base-enter-to,
.base-leave-from {
  opacity: 1;
}
.base-enter-from,
.base-leave-to {
  opacity: 0;
}
</style>
