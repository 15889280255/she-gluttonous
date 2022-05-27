import { Direction, mapType, SnakeBodies, SnakeHead } from "@/types";
import { emitEvent } from "@/utils";
import { Food } from "./Food";
import { hitFence, hitSelf } from "./hit";

export class Snake {
  bodies: SnakeBodies;
  head: SnakeHead;

  direction: Direction;
  constructor() {
    this.direction = "Right";
    this.head = {
      x: 1,
      y: 0,
      status: mapType.head,
    };
    this.bodies = [
      {
        x: 0,
        y: 0,
        status: mapType.body,
      },
    ];
  }

  // 检查有没有吃到食物
  checkEat(food: Food) {
    if (this.head.x === food.x && this.head.y === food.y) {
      food.change(this);
      this.bodies.unshift({
        x: food.x,
        y: food.y,
        status: mapType.body,
      });
      emitEvent.emit("Score");
    }
  }

  // 控制蛇移动
  move(food: Food) {
    // 判断是否游戏结束
    if (
      hitFence(this.head, this.direction) ||
      hitSelf(this.head, this.bodies)
    ) {
      throw new Error("游戏结束");
    }

    const headX = this.head.x;
    const headY = this.head.y;
    const bodyX = this.bodies.at(-1)?.x;
    const bodyY = this.bodies.at(-1)?.y;

    switch (this.direction) {
      case "Up":
        if (headY - 1 === bodyY && headX === bodyX) {
          // 按键与当前反向相反
          moveDown(this.head, this.bodies);
          this.direction = "Down";
          return;
        }
        moveUp(this.head, this.bodies);
        break;
      case "Down":
        if (headY + 1 === bodyY && headX === bodyX) {
          moveUp(this.head, this.bodies);
          this.direction = "Up";
          return;
        }
        moveDown(this.head, this.bodies);
        break;
      case "Left":
        if (headY === bodyY && headX - 1 === bodyX) {
          moveRight(this.head, this.bodies);
          this.direction = "Right";
          return;
        }
        moveLeft(this.head, this.bodies);
        break;
      case "Right":
        if (headY === bodyY && headX + 1 === bodyX) {
          moveLeft(this.head, this.bodies);
          this.direction = "Left";
          return;
        }
        moveRight(this.head, this.bodies);
        break;

      default:
        break;
    }

    this.checkEat(food);
  }

  changeDirection(direction: Direction) {
    if (
      direction === "Left" &&
      this.direction !== "Left" &&
      this.direction !== "Right"
    ) {
      this.direction = "Left";
      return;
    }
    if (
      direction === "Right" &&
      this.direction !== "Left" &&
      this.direction !== "Right"
    ) {
      this.direction = "Right";
      return;
    }
    if (
      direction === "Up" &&
      this.direction !== "Down" &&
      this.direction !== "Up"
    ) {
      this.direction = "Up";
      return;
    }
    if (
      direction === "Down" &&
      this.direction !== "Up" &&
      this.direction !== "Down"
    ) {
      this.direction = "Down";
      return;
    }
  }
}

function moveDown(head: SnakeHead, bodies: SnakeBodies) {
  head.y++;
  bodies.push({
    x: head.x,
    y: head.y - 1,
    status: mapType.body,
  });
  bodies.shift();
}

function moveUp(head: SnakeHead, bodies: SnakeBodies) {
  head.y--;
  bodies.push({
    x: head.x,
    y: head.y + 1,
    status: mapType.body,
  });
  bodies.shift();
}

function moveRight(head: SnakeHead, bodies: SnakeBodies) {
  head.x++;
  bodies.push({
    x: head.x - 1,
    y: head.y,
    status: mapType.body,
  });
  bodies.shift();
}
function moveLeft(head: SnakeHead, bodies: SnakeBodies) {
  head.x--;
  bodies.push({
    x: head.x + 1,
    y: head.y,
    status: mapType.body,
  });
  bodies.shift();
}
