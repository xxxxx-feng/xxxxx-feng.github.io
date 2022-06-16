<!--
 * @Author: hejianfang
 * @Email: hejianfang@meishubao.com
 * @Date: 2021-08-30 18:52:26
 * @LastEditors: hejianfang
 * @LastEditTime: 2021-08-30 18:52:27
 * @Description: 
-->
**JSX**

```jsx
<div class='box' id='content'>
  <div class='title'>Hello</div>
  <button>Click</button>
</div>
```

上面的 DOM 结构可以看出，要每个标签只有 3 个信息：标签名、属性、子元素，所以上面等同于下面的 JSON 结构：

```javascript
{
  tag: 'div',
  attrs: { className: 'box', id: 'content'},
  children: [
    {
      tag: 'div',
      arrts: { className: 'title' },
      children: ['Hello']
    },
    {
      tag: 'button',
      attrs: null,
      children: ['Click']
    }
  ]
}
```

当你写下这个 React 组件时：

```jsx
import React from 'react';
function MyComponent(props) {
    return <div>{props.hello}</div>
}
```

最终会被自动工具翻译成：

```jsx
import React from 'react';

function MyComponent(props) {
    return React.createElement('div', null, props.hello);
}
```

理解 JSX 语法并不困难，简单记住一句话，遇到 {} 符号内部解析为 JS 代码，遇到成对的 <> 符号内部解析为 HTML 代码。React 就是通过这个小小语法糖，实现在 JS 里面写 HTML，可能有小伙伴会说 HTML 与 JS 分离不是更好吗？责职分明，混合只会更乱。但当你体验到代码自动提示，自动检查，以及调试时精确定位到一行代码的好处时，就清楚 React 和 Vue 的差距了。

**语法糖转换**

习惯 Vue 的同学都知道很多语法糖，比如 v-if、v-for、v-bind、v-on 等，相比 Vue，React 只有一个语法糖，那就是 jsx/tsx。v-if 这些功能在 React 上都是通过原生 javascript 实现的，慢慢你会发现，其实你学的不是 React，而是 Javascipt，React 赋予你通过 js 完整控制组件的能力，这部分明显比 Vue 的语法糖更加灵活

**v-if 条件渲染**

```javascript
// vue
<template>
  <div>
    <h1 v-if="awesome1">Vue is awesome!</h1>
    <h1 v-else>else</h1>
    <h1 v-if="awesome2">Oh no</h1>
  </div>
</template>
<script>
export default{
  data() {
    return {
      awesome1: true,
      awesome2: false,
    }
  }
}
</script>
// react
import React, { useState } from 'react';
function Index() {
  const [awesome1, setAwesome1] = useState(true);
  const [awesome2, setAwesome2] = useState(false);
  return (
    <div>
      {awesome1 ? <h1>React is awesome!</h1> : <h1>else</h1>}
      {awesome2 && <h1>Oh no</h1>}
    </div>
  );
}
export default Index;
```

**v-for 列表渲染**

```javascript
// vue
<template>
  <ul id="array-rendering">
    <li v-for="item in items">
      {{ item.message }}
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
  }
}
</script>
// react
import React, { useState } from 'react';
function Index() {
  const [items, setItems] = useState([{ message: 'Foo' }, { message: 'Bar' }]);
  return (
    <ul id="array-rendering">
      {items.map((item, index) => <li key={index}>{item.message}</li>)}
    </ul>
  );
}

export default Index;
```

React 通过 js 的数组语法 map，将数据对象映射为 DOM 对象。只需学会 js，无需记住各种指令，如果要做列表过滤，直接使用 items.filter(...).map(...) 链式调用即可，语法上更加灵活，如果为了提高渲染性能，使用 useMemo 进行优化即可，类似 Vue 的 computed。

**v-model**

Vue 中 v-model 是一个数据绑定语法糖，本质上还是单向数据流，下面的子组件通过 update:title 同步 title 参数。

```jsx
app.component('my-component', {
  props: {
    title: String
  },
  emits: ['update:title'],
  template: `
    <input
      type="text"
      :value="title"
      @input="$emit('update:title', $event.target.value)">
  `
})
// react
// React 写法较为简单，不需要像 Vue 一样，记住各种规则，所有数据和事件通过 props 传递就行了：
import React from 'react';
interface Props {
  title: string;
  onUpdateTitle: (title: string) => void;
}
function MyComponent(props: Props) {
  return <input
    type='text'
    value={props.title}
    onInput={e => props.onUpdateTitle(e.target.value)}
  />
}
```

**事件处理**

Vue 中写法

```javascript
<template>
  <div id="inline-handler">
    <button @click="say('hi')">Say hi</button>
    <button @click="say('what')">Say what</button>
  </div>
</template>

<script>
export default {
  methods: {
    say(message) {
      alert(message)
    }
  }
}
</script>
```

react中

```jsx
import React, { useState } from 'react';
function Index() {
  const onClick = (message) => () => alert(message);
  return (
    <div id="inline-handler">
      <button onClick={onClick('hi')}>Say hi</button>
      <button onClick={onClick('what')}>Say what</button>
    </div>
  );
}
export default Index;
```

如果需要优化缓存事件处理函数，使用 useCallback 即可。可以看到 Vue 中的事件触发 this.$emit('click') 或者父组件中的代码 v-on="say('hi')" 都使用了字符串的写法，这样非常不利于类型推断，不利于代码重构。React 的函数写法或者 class 写法都直接使用 js 语法，没有而外的东西，相比 Vue 更容易通过 IDE 进行重构优化。React 中无论方法还是变量，都是采用驼峰命名法，也可以自由定制，Vue 中必须混合小写中隔线、驼峰、字符串组合，不利于统一代码规范。

**插槽**

vue中

```javascript
<template>
  <button class="btn-primary">
    <slot></slot>
  </button>
</template>
```

react

```jsx
import React from 'react';
function Index() {
  return (
    <button classNames="btn-primary">
      {props.children}
    </button>
  );
}
export default Index;
```

React 的插槽写法没有 Vue 那么复杂，也没有“备用内容”、“具名插槽”、“渲染作用域”、“作用域插槽”、“动态插槽名”，这些概念和特殊情况的处理，一切通过 JS 逻辑搞定就行了，怎么方便怎么来

**样式 & 属性**

```javascript
<template>
  <div
    class="static"
    :class="{ active: isActive, 'text-danger': hasError }"
  ></div>
</template>
<script>
export default {
  data() {
    return {
      isActive: true,
      hasError: false
    }
  }
}
</script>
```

react中

```jsx
import React, { useState } from 'react';
function Index() {
  const [isActive, setIsActive] = useState(true);
  const [hasError, setHasError] = useState(false);
  return (
    <div
      classNames={`static ${isActive ? 'active':''} ${hasError? 'text-danger':''}`}
    ></div>
  );
}
export default Index;
```

**状态管理**

Vue 的状态管理官方推荐使用 Vuex 也可采用 Redux。

**生命周期**

一般情况下 class 写法主要用到 componentDidMount 和 componentWillUnmount 钩子，React 的函数写法下可以用 useEffect 的执行函数和清理函数去模拟 mount 和 unmount 过程：

```jsx
import React, { useRef, useEffect } from 'react';

function Index() {
  const ref = useRef(null);
  
  useEffect(() => {
    console.log('mounted');

    return () => {
      console.log('will unmount');
    };
  }, []);

  return <input ref={ref}/>
}

export default Index;
```

**原生 DOM 操作**

这部分 Vue 和 React 都是采用 ref 写法，Vue：

```javascript
<template>
  <input ref="input" />
</template>

<script>
export defalut {
  methods: {
    focusInput() {
      this.$refs.input.focus()
    }
  },
  mounted() {
    this.focusInput()
  }
}
</script>
```

React 写法：

```jsx
import React, { useRef, useEffect } from 'react';

function Index() {
  const ref = useRef(null);
  
  useEffect(() => {
    ref.current?.focuse();
  }, []);

  return <input ref={ref}/>
}

export default Index;
```

useEffect 是 React hook，在依赖数组为空的时候效果类似 componentDidMount 的生命周期函数（类似 Vue 的 mounted）。此外 useRef 不止用在这里，也可以挂载一些其他的东东，实现一些复杂操作，比如 previousValue 和对象属性等。