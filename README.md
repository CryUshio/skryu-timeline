# Picasso-Timeline

A timeline management project.

组件内引用了 `Promise`，如果有必要，请自行引入 `polyfill`

# Demo

```
npm run example
```

# API

### add

Add handler to timeline.

```
new Timeline().add(option);

option {
  handler: Function;
  wait?: number;
}
```

### action

Add action to timeline. An action will block the timeline until you call a `trigger` function.

```
new Timeline().action(option);

option {
  name?: string; // default ''
  handler?: Function;
  wait?: number;
}
```

### run

Start the timeline.

```
new Timeline().run();
```

### callback

Syntactic sugar of `add`.

```
new Timeline().callback(handler: Function);
```

### trigger

Dispatch the action.

```
new Timeline().trigger(name?: string);
```

### abort

Abort the timeline.

```
new Timeline().run().abort(handler?: Function);
```

### reset

Abort and reset the timeline.

```
new Timeline().reset(handler?: Function);
```

# Hint

`abort` and `reset` can only be called after `run`.
