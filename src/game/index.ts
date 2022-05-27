import { Direction, gameType, Map } from "@/types";
import { Ref } from "vue";
import { GameControl } from "./GameControl";
import { initMap } from "./map";

let gameControl: GameControl;
export function initGame(map: Map, gameStatus: Ref<gameType>) {
  gameControl = new GameControl(initMap(map), gameStatus);
}

export function startGame() {
  gameControl.start();
}

export function replayGame() {
  gameControl.replay();
}

export function changeDirection(direction: Direction) {
  gameControl.snake.changeDirection(direction);
}

export function getScore(): Ref<number> {
  return gameControl.score;
}
