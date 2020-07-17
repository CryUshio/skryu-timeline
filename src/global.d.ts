declare interface TimelineType {
  lockWhenRunning?: boolean;
}

declare interface TimelineAdd {
  handler: Function;
  wait?: number;
}

declare interface TimelineAction {
  name?: string | boolean;
  handler?: Function;
  wait?: number;
}

declare interface TimelineStep {
  actionName: string | boolean;
  handler: Function;
  wait: number;
}

declare module 'skryu-timeline' {
  class Timeline {
    private _triggerAbort: (callback?: Function) => { reset: Timeline['reset'] };

    add: (options: TimelineAdd) => Timeline;

    action: (options: TimelineAction) => Timeline;

    callback: (callback: Function) => Timeline;

    trigger: (name: string) => void;

    run: () => {
      abort: Timeline['_triggerAbort'];
      reset: Timeline['reset'];
      trigger: Timeline['trigger'];
    };

    reset: (handler?: Function) => { run: Timeline['run'] };
  }
}
