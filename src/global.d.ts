declare interface TimelineType {
  lockWhenRunning?: boolean;
}

declare interface TimelineStep {
  action: Function;
  wait: number;
}
