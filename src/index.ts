import { sleep } from './utils';

/**
 * @function add - add handler to process
 * @function action - add action to process
 * @function run - start timeline
 * @function trigger - trigger action
 * @function callback - dispatch when process done
 * @function abort - stop timeline and reset
 *
 * @demo
 * const timeline = new Timeline().add().add().action({ actionName: '1' }).add().callback().run();
 * timeline.trigger('1');
 */
class Timeline {
  // main stream
  private _process: TimelineStep[] = [];

  // progress
  private _step: number = 0;

  // callback when process end
  private _callback: Function = () => {};

  // if lock when progress running
  private _lockWhenRunning: boolean;

  // flag that prevent action when running
  private _lock: boolean = false;

  // action map
  private _actionMap: { [actionName: string]: number[] } = {};

  // triggered action name
  private _triggerName: string | boolean = false;

  // abort flag
  private _abort: boolean = false;

  constructor({ lockWhenRunning }: TimelineType = {}) {
    this._lockWhenRunning = typeof lockWhenRunning === 'undefined' ? true : lockWhenRunning;
  }

  private _push = (timelineStep: TimelineStep) => {
    this._process.push(timelineStep);
  };

  private _isLock = () => {
    if (this._lockWhenRunning) {
      return this._lock;
    }
    return false;
  };

  private _triggerAbort = () => {
    this._abort = true;
  };

  private _tick = (step: number) => {
    if (this._abort) {
      this._lock = false;
      this._abort = false;
      return;
    }

    const processLength = this._process.length;
    if (step >= processLength) {
      this._lock = false;
      this._callback();
      return;
    }

    const { actionName, handler, wait } = this._process[step];
    // triggered action
    if (actionName !== false) {
      // triggered action is not execute in order
      if (actionName !== this._triggerName) {
        this._lock = false;
        return;
      }
      // reset trigger flag
      this._triggerName = false;
    }

    Promise.resolve(handler()).then(
      () => {
        sleep(wait).then(() => {
          // if triggered action, the old process should be killed
          if (step < this._step) {
            return;
          }

          this._step++;
          this._tick(step + 1);
        });
      },
      (e: PromiseRejectionEvent) => {
        console.error('Some errors occurred: ', e, '\nstep: ', step);
      }
    );
  };

  add = ({ handler, wait }: TimelineAdd): Timeline => {
    this._push({
      actionName: false,
      handler: handler || (() => {}),
      wait: wait || 0,
    });
    return this;
  };

  action = ({ actionName, handler, wait }: TimelineStep): Timeline => {
    actionName = actionName || '';

    if (!this._actionMap[String(actionName)]) {
      this._actionMap[String(actionName)] = [];
    }
    this._actionMap[String(actionName)].push(this._process.length);

    this._push({
      actionName,
      handler: handler || (() => {}),
      wait: wait || 0,
    });
    return this;
  };

  callback = (callback: Function) => {
    this.add({ handler: callback, wait: 0 });
    return this;
  };

  trigger = (name: string) => {
    if (this._isLock()) {
      return;
    }

    // set trigger flag
    this._triggerName = name;
    // jump to action
    const actionIndex = this._actionMap[name].shift();
    this._step = typeof actionIndex !== 'undefined' ? actionIndex : this._step;
    this.run();
  };

  run = () => {
    if (this._isLock()) {
      return;
    }

    this._lock = true;
    this._tick(this._step);
    return {
      abort: this._triggerAbort,
    };
  };
}

export default Timeline;
