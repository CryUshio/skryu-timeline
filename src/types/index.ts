export interface TimelineType {
  lockWhenRunning?: boolean;
}

export interface TimelineAdd {
  handler: Function;
  wait?: number;
}

export interface TimelineAction {
  name?: string | boolean;
  handler?: Function;
  wait?: number;
}

export interface TimelineStep {
  actionName: string | boolean;
  handler: Function;
  wait: number;
}
