# Skryu-Timeline

A timeline management project.

组件内引用了 `Promise`，如果有必要，请自行引入 `polyfill`。

`Promise` is referenced in the component, please import `polyfill` yourself if necessary.

# Demo

```
npm run example
```

# Quick start

```html
<main class="main">
  <div class="main-bg"></div>
  <section class="main-content">
    <section class="main-section">
      <h1 class="section-title">TIMELINE DEMO</h1>
      <p class="section-desc">AN EXPERIMENT BY PICASSO</p>
      <button class="section-btn">NEXT</button>
    </section>
  </section>
</main>
<script>
  const mainContent = document.querySelector('.main-content');
  const section = document.querySelector('.main-section');
  const btn = document.querySelector('.section-btn');
  const timeline = new Timeline();
  timeline
    .add({
      handler: () => {
        mainContent.setAttribute('style', 'background-color: rgba(0, 0, 0, .5)');
      },
      wait: 1000,
    })
    .add({
      handler: () => {
        section.classList.add('fade-in');
        btn.addEventListener('click', () => {
          timeline.trigger();
        });
      },
    })
    .action({
      handler: () => {
        // do something you want
      },
    })
    .add({
      handler: () => {
        section.classList.add('fade-out');
      },
    })
    .run();
</script>
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
