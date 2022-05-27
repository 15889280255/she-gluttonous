import { Ref } from "vue";

export type Map = Array<Array<number>>;

// 地图
export interface StateType {
  map: Map;
}

// 地图格子类型 0普通 -1食物 1蛇身 2蛇头
export enum mapType {
  food = -1,
  normal = 0,
  body = 1,
  head = 2,
}

// 游戏状态 1未开始 2进行中 3已结束
export enum gameType {
  ready = 1,
  ing = 2,
  end = 3,
}

export type gameStatus = Ref<gameType>;

export interface SnakeHead {
  x: number;
  y: number;
  status: number;
}

export type SnakeBody = SnakeHead;

export type SnakeBodies = SnakeBody[];

// 方向
export type Direction = "Right" | "Left" | "Up" | "Down";
