import { Direction, SnakeBodies, SnakeHead } from "@/types";
import { gameCol, gameRow } from "./map";

// 撞墙
export function hitFence(head: SnakeHead, direction: Direction) {
  let isHitFence = false;
  switch (direction) {
    case "Up":
      isHitFence = head.y - 1 < 0;
      break;
    case "Down":
      isHitFence = head.y + 1 > gameRow - 1;
      break;
    case "Left":
      isHitFence = head.x - 1 < 0;
      break;
    case "Right":
      isHitFence = head.x + 1 > gameCol - 1;
  }

  return isHitFence;
}

// 撞自己
export function hitSelf(head: SnakeHead, bodies: SnakeBodies) {
  // 获取蛇头坐标
  const sX = head.x;
  const sY = head.y;

  // 获取身体
  const sBodies = bodies;

  const isHitSelf = sBodies.some((body) => {
    return body.x === sX && body.y === sY;
  });

  return isHitSelf;
}
