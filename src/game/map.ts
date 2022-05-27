import { Map, mapType } from "../types";

const clientWidth = document.documentElement.clientHeight - 20;
const clientHeight = document.documentElement.clientWidth - 40;

export const gameRow =
  clientWidth > 700
    ? Math.floor(clientHeight / 120)
    : Math.floor(clientHeight / 25);

export const gameCol =
  clientWidth > 700
    ? Math.floor(clientWidth / 32)
    : Math.floor(clientWidth / 60);

// 初始化地图  现在所有的位置type都是0
export function initMap(map: Map) {
  for (let i = 0; i < gameRow; i++) {
    const arr: Array<number> = [];
    for (let j = 0; j < gameCol; j++) {
      arr.push(mapType.normal);
    }
    map.push(arr);
  }
  return map;
}
