# Picasso-Timeline

A timeline management progress

组件内引用了 `Promise`，如果有必要，请自行引入 `polyfill`

# Demo

```
npm run example
```

# API

#### add

Add handler to process.

```
new Timeline().add(option);

option {
  handler: Function;
  wait?: number;
}
```

#### action

Add action to process.

```
new Timeline().action(option);

option {
  actionName?: string; // default ''
  handler?: Function;
  wait?: number;
}
```

#### run

Start the timeline.

```
new Timeline().run();
```

#### callback

Syntactic sugar of `action`.

```
new Timeline().callback(handler:? Function);
```

#### trigger

Dispatch action.

```
new Timeline().callback(actionName?: string);
```

#### abort

Abort the timeline.

```
new Timeline().abort();
```

#### reset

Abort and rest the timeline.

```
new Timeline().reset(handler?: Function);
```

# Hint

`abort` and `reset` can only be called after `run`.
