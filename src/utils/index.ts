import { EmitEvent } from "@/utils/EmitEvent";

export function randomIntegerInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 时间累加
export function intervalTimer(interval: number) {
  let t = 0;
  return (n: number) => {
    t += n;
    if (t >= interval) {
      t = 0;
      return true;
    }
    return false;
  };
}

export const emitEvent = new EmitEvent();
