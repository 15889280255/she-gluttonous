import { Food } from "./Food";
import { Snake } from "./Snake";
import { gameStatus, gameType, Map } from "../types";
import { addTicker, stopTicker } from "@/utils/ticker";
import { emitEvent, intervalTimer } from "@/utils";
import { render, reset } from "./render";
import { Ref, ref } from "vue";

export class GameControl {
  snake: Snake;
  score: Ref<number>;
  private _food: Food;
  private _map: Map;
  private _gameStatus: gameStatus;

  constructor(map: Map, type: gameStatus) {
    this._map = map;
    this.snake = new Snake();
    this._food = new Food();
    this._gameStatus = type;
    this.score = ref(0);
    emitEvent.on("Score", () => {
      this.score.value++;
    });
  }

  start() {
    // 绑定键盘按下事件
    document.addEventListener("keydown", this.keydownHandler.bind(this));

    addTicker(this.handlerTicker.bind(this));
    this._gameStatus.value = gameType.ing;
  }

  keydownHandler(event: KeyboardEvent) {
    // 通过按钮修改蛇方向
    switch (event.key) {
      case "ArrowUp":
        this.snake.direction = "Up";
        break;
      case "ArrowLeft":
        this.snake.direction = "Left";
        break;
      case "ArrowDown":
        this.snake.direction = "Down";
        break;
      case "ArrowRight":
        this.snake.direction = "Right";
        break;

      default:
        break;
    }
  }

  private _timeInterval = 200;

  private _isMove = intervalTimer(this._timeInterval);

  handlerTicker(n: number) {
    if (this._isMove(n)) {
      try {
        this.snake.move(this._food);
      } catch (error) {
        this._gameStatus.value = gameType.end;
        stopTicker();
      }
    }
    render(this._map, this.snake, this._food);
  }

  replay() {
    reset(this._map);
    this.snake.direction = "Right";
    this.snake = new Snake();
    this._food = new Food();
    this._gameStatus.value = gameType.ing;
    this.score.value = 0;
    stopTicker();
    addTicker(this.handlerTicker.bind(this));
  }
}
