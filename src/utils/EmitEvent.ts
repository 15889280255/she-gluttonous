interface EventFace {
  on: (name: string, callback: Function) => void;
  emit: (name: string, ...args: Array<any>) => void;
  off: (name: string, fn: Function) => void;
  once: (name: string, fn: Function) => void;
}

interface EventMap {
  [key: string]: Array<Function>;
}

export class EmitEvent implements EventFace {
  private _eventMap: EventMap;

  constructor() {
    this._eventMap = {};
  }

  on(name: string, callback: Function) {
    const callbackList = this._eventMap[name] || [];
    callbackList.push(callback);
    this._eventMap[name] = callbackList;
  }

  emit(name: string, ...args: any[]) {
    let eventList = this._eventMap[name];
    if (eventList?.length > 0) {
      eventList.forEach((fn) => {
        fn.apply(this, args);
      });
    } else {
      console.error("该事件未监听");
    }
  }

  off(name: string, fn: Function) {
    const eventList = this._eventMap[name];
    if (eventList?.length && fn) {
      const index = eventList.findIndex((fns) => fns === fn);
      eventList.splice(index, 1);
    } else {
      console.error("该事件未监听");
    }
  }
  once(name: string, fn: Function) {
    const onceEvent = (...args: Array<any>) => {
      fn.apply(this, args);
      this.off(name, fn);
    };
    this.on(name, onceEvent);
  }
}
