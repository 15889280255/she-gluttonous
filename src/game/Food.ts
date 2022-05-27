import { randomIntegerInRange } from "@/utils";
import { gameCol, gameRow } from "./map";
import { Snake } from "./Snake";

export class Food {
  // 食物的坐标
  x: number;
  y: number;
  status = -1;
  constructor() {
    this.x = randomIntegerInRange(0, gameCol - 1);
    this.y = randomIntegerInRange(0, gameRow - 1);
  }
  // 改变食物位置
  change(snake: Snake) {
    // 新生成一个随后位置
    const newX = randomIntegerInRange(0, gameCol - 1);
    const newY = randomIntegerInRange(0, gameRow - 1);

    // 获取蛇头坐标
    const sX = snake.head.x;
    const sY = snake.head.y;

    // 获取蛇身体
    const sBodies = snake.bodies;

    const isRepeatBody = sBodies.some((body) => {
      return body.x === newX && body.y === newY;
    });

    const isRepeatHead = newX === sX && newY === sY;

    if (isRepeatBody || isRepeatHead) {
      this.change(snake);
    } else {
      this.x = newX;
      this.y = newY;
    }
  }
}
