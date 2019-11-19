declare interface TimelineType {
  lockWhenRunning?: boolean;
}

declare interface TimelineAdd {
  handler: Function;
  wait?: number;
}

declare interface TimelineAction {
  actionName?: string | boolean;
  handler?: Function;
  wait?: number;
}

declare interface TimelineStep {
  actionName: string | boolean;
  handler: Function;
  wait: number;
}
