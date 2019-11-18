import { sleep } from './utils';

/**
 * @function add - add action to process
 * @function run - start timeline
 * @function callback - dispatch when process done
 * @function catch - throw error on progress
 * @function abort - stop timeline and reset
 */
class Timeline {
  private _process: TimelineStep[] = [];

  private _step: number = 0;

  private _callback: Function = () => {};

  private _lockWhenRunning: boolean;

  private _lock: boolean = false;

  private _catch: Function = (e: PromiseRejectionEvent) => {
    console.log(e);
  };

  private _abort: boolean = false;

  constructor({ lockWhenRunning }: TimelineType) {
    this._lockWhenRunning = lockWhenRunning || false;
  }

  private _push = (timelineStep: TimelineStep) => {
    this._process.push(timelineStep);
  };

  private _addCallback = (callback: Function) => {
    this._callback = callback;
    return {
      abort: this._abort,
    };
  };

  private _addCatch = (handler: Function) => {
    this._catch = handler;
  };

  private _triggerAbort = () => {
    this._abort = true;
  };

  private _tick = () => {
    if (this._abort) {
      this._lock = false;
      return;
    }

    const processLength = this._process.length;
    const step = this._step;
    if (step >= processLength) {
      this._lock = false;
      this._callback();
      return;
    }

    const { action, wait } = this._process[this._step];
    Promise.resolve(action()).then(
      () => {
        sleep(wait).then(() => {
          this._step++;
          this._tick();
        });
      },
      (e: PromiseRejectionEvent) => {
        console.error('Some errors occurred.');
        this._catch(e);
      }
    );
  };

  add = (action: Function, wait?: number): Timeline => {
    this._push({
      action,
      wait: wait || 0,
    });
    return this;
  };

  run = () => {
    if (this._lockWhenRunning) {
      if (this._lock) {
        return;
      }
      this._lock = true;
    }

    this._step = 0;
    this._abort = false;
    this._tick();
    return {
      abort: this._triggerAbort,
      callback: this._addCallback,
      catch: this._addCatch,
    };
  };
}

export default Timeline;
