import { Map, mapType } from "../types";

const clientWidth = document.documentElement.clientHeight;
const clientHeight = document.documentElement.clientWidth;
console.log("clientWidth: clientHeight:", clientWidth, clientHeight);

// export const gameRow =
//   clientWidth > 1000
//     ? Math.floor(clientHeight / 160)
//     : Math.floor(clientHeight / 35);

// export const gameCol =
//   clientWidth > 1000
//     ? Math.floor(clientWidth / 32)
//     : Math.floor(clientWidth / 60);
export const gameRow =
  clientWidth > 1000
    ? Math.floor(clientWidth / 60)
    : Math.floor(clientWidth / 50);

export const gameCol =
  clientWidth > 1000
    ? Math.floor(clientHeight / 70)
    : Math.floor(clientHeight / 40);

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
