# Skryu-Timeline

## 简介

`Skryu-Timeline` 是一个时间线管理模板。基于**相对时间**的 `Timeline` 让每个动画或事件的相对开始时间得到有效控制，是制作 `parallax（视差）` 和 **交互式动画** 的利器。而时间线的每一个步骤，你都可以随心所欲的发挥，包括音视频播放，动画的播放，进行交互等。`Skryu-Timeline` 采用了链式调用，提供了多种方法满足你的需求，可扩展性极强。

## Note

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

### constructor

创建 `timeline` 实例。

Create a Timeline instance.

```ts
new Timeline(option: object);
```

**option**
var | type | comment
--|--|--
lockWhenRunning?| Boolean| 默认 `true`，时间线运行时无法触发 `action`。

### add

添加 `handler` 到时间线。

Add handler to timeline.

```ts
new Timeline().add(option: object);
```

**option**
var | type | comment
--|--|--
handler| Function| 自定义执行函数。
wait?| Number| 执行下一步骤的等待时间。

**return**
`this`

### action

添加 `action` 到时间线。`action` 会阻塞时间线，直到对应的事件被触发。

Add `action` to timeline. An action will block the timeline until you call a `trigger` function.

```ts
new Timeline().action(option: object);
```

**option**
var | type | comment
--|--|--
name?| String| 用于标记事件，可使用同一个值。默认为 `''`。
handler?| Function| 自定义执行函数。
wait?| Number| 执行下一步骤的等待时间。

**return**
`this`

### run

启动 `timeline`。

Start Timeline.

```ts
new Timeline().run();
```

**return**
API | type
--|--
abort| Function
reset| Function
trigger| Function

### callback

`add` 的语法糖。

Syntactic sugar of `add`.

```ts
new Timeline().callback(handler: Function);
```

**option**
var | type | comment
--|--|--
handler| Function| 自定义执行函数。

**return**
`this`

### trigger

触发一个 `action`，触发后时间线将继续。

Dispatch an `action`.

```ts
new Timeline().callback(name?: String);
```

**option**
var | type | comment
--|--|--
name?| String| 和定义的 `action` 的 `name` 相同。

**return**
`null`

### abort

终止 `timeline`。

Abort the timeline.

```ts
new Timeline().run().abort(handler?: Function);
```

**option**
var | type | comment
--|--|--
handler| Function| 自定义执行函数。

**return**
API | type
--|--
reset| Function

### reset

终止并重置 `timeline`。

Abort and reset the timeline.

```ts
new Timeline().run().reset(handler?: Function);
```

**option**
var | type | comment
--|--|--
handler| Function| 自定义执行函数。

**return**
API | type
--|--
run| Function

# Hint

1. 如果 `lockWhenRunning` 设置为 `false`，触发 `action` 后将会直接跳转到 `action` 所在步骤，中间步骤将不会执行。

2. 相同 `name` 的 `action` 只能按注册顺序触发，不同 `name` 的 `action` 互不相干。
