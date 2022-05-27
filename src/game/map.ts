import { Map, mapType } from "../types";

const clientWidth = document.documentElement.clientWidth;
const clientHeight = document.documentElement.clientHeight;
console.log("clientWidth: clientHeight:", clientWidth, clientHeight);

export const gameRow =
  clientWidth > 1000
    ? Math.floor(clientHeight / 75)
    : Math.floor(clientHeight / 60);
console.log("gameRow: ", gameRow);

export const gameCol =
  clientWidth > 1000
    ? Math.floor(clientWidth / 80)
    : Math.floor(clientWidth / 38);
console.log("gameCol: ", gameCol);

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
