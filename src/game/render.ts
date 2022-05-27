import { Food } from "./Food";
import { Snake } from "./Snake";
import { Map, mapType, SnakeBodies, SnakeHead } from "@/types";

export function render(map: Map, snake: Snake, food: Food) {
  reset(map);
  _renderSnakeHead(map, snake.head);
  _renderSnakeBody(map, snake.bodies);
  _renderFood(map, food);
}

export function reset(map: Map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] !== mapType.normal) {
        map[i][j] = mapType.normal;
      }
    }
  }
}

function _renderSnakeBody(map: Map, bodies: SnakeBodies) {
  for (let i = 0; i < bodies.length; i++) {
    const row = bodies[i].y;
    const col = bodies[i].x;
    map[row][col] = mapType.body;
  }
}

function _renderSnakeHead(map: Map, bodies: SnakeHead) {
  const row = bodies.y;
  const col = bodies.x;
  map[row][col] = mapType.head;
}

function _renderFood(map: Map, food: Food) {
  const row = food.y;
  const col = food.x;
  map[row][col] = mapType.food;
}
