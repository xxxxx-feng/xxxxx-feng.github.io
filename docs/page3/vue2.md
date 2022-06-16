Vuex 是一个专为 Vue.js应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

#### 怎么使用vuex

安装

```
npm install vuex -S
```

创建store

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//不是在生产环境debug为true
const debug = process.env.NODE_ENV !== 'production';
//创建Vuex实例对象
const store = new Vuex.Store({
    strict:debug,//在不是生产环境下都开启严格模式
    state:{
    },
    getters:{
    },
    mutations:{
    },
    actions:{
    }
})
export default store;
```

注入vuex

```javascript
import Vue from 'vue';
import App from './App.vue';
import store from './store';
const vm = new Vue({
    store:store,
    render: h => h(App)
}).$mount('#app')
```

#### vuex中有几个核心属性，分别是什么？

一共有5个核心属性，分别是:

- state 唯一数据源,Vue 实例中的 data 遵循相同的规则
- getters 可以认为是 store 的计算属性,就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值.

```javascript
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

- mutation 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation,非常类似于事件,通过store.commit 方法触发

```javascript
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
store.commit('increment')
```

- action Action 类似于 mutation，不同在于Action 提交的是 mutation，而不是直接变更状态，Action 可以包含任意异步操作

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

- module 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。

```javascript
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

#### ajax请求代码应该写在组件的methods中还是vuex的actions中?

如果请求来的数据是不是要被其他组件公用，仅仅在请求的组件内使用，就不需要放入vuex 的state里。

如果被其他地方复用，这个很大几率上是需要的，如果需要，请将请求放入action里，方便复用。

#### 从vuex中获取的数据能直接更改吗？

从vuex中取的数据，不能直接更改，需要浅拷贝对象之后更改，否则报错；

#### vuex中的数据在页面刷新后数据消失

用sessionstorage 或者 localstorage 存储数据

存储： sessionStorage.setItem( '名', JSON.stringify(值) )
使用： sessionStorage.getItem('名') ---得到的值为字符串类型，用JSON.parse()去引号；

也可以引入插件vuex-persist，使用方法如下：

```
安装
npm install --save vuex-persist
or
yarn add vuex-persist
引入
import VuexPersistence from 'vuex-persist'
先创建一个对象并进行配置
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
引入进vuex插件
const store = new Vuex.Store({
  state: { ... },
  mutations: { ... },
  actions: { ... },
  plugins: [vuexLocal.plugin]
}) 
通过以上设置，在图3中各个页面之间跳转，如果刷新某个视图，数据并不会丢失，依然存在，并且不需要在每个 mutations 中手动存取 storage 。
```

#### Vuex的严格模式是什么,有什么作用,怎么开启？

在严格模式下，无论何时发生了状态变更且不是由mutation函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

在Vuex.Store 构造器选项中开启,如下

```
const store = new Vuex.Store({
    strict:true,
})
```

#### 怎么在组件中批量使用Vuex的getter属性

使用mapGetters辅助函数, 利用对象展开运算符将getter混入computed 对象中

```
import {mapGetters} from 'vuex'
export default{
    computed:{
        ...mapGetters(['total','discountTotal'])
    }
}
```

组件中重复使用mutation

```
import { mapMutations } from 'vuex'
methods:{
    ...mapMutations({
        setNumber:'SET_NUMBER',
    })
}
```
