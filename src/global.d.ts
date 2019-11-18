declare interface TimelineType {
  lockWhenRunning?: boolean;
}

declare interface TimelineAdd {
  handler: Function;
  wait?: number;
}

declare interface TimelineStep extends TimelineAdd {
  actionName: string | boolean;
  wait: number;
}
