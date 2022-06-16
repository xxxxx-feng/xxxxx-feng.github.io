#### 当前阶段的问题

1. 模块数量在不断增多，模块之间耦合性变大，可维护性很低，模块拆分艰难
2. 技术升级不易，因为需要兼容版本
3. 开发启动时间，打包时间，首屏加载时间过长

![现阶段](https://gitee.com/hejf01/pic/raw/master//目前状况.png)

这些问题让我们意识到，扩展前端开发规模以便于多个团队可以同时开发一个大型且复杂的产品是一个重要但又棘手的难题。

为了要解决这些问题，我们意识到需要拆分这些应用，即进行工程优化的常规手段进行“分治”。那么要怎么拆呢？自然而然地我们就想到了微前端的概念。也从这个概念出发，参考业界优秀方案，同时也深度结合了目前业务的开发情况，对现有工程进行了微前端的实践与落地。

#### 微前端是什么？

![微前端](https://camo.githubusercontent.com/76e437cc84d77c7caa00dcd8afe9805690ca3fa3764b7d27283bd95a22b8b390/68747470733a2f2f70392d6a75656a696e2e62797465696d672e636f6d2f746f732d636e2d692d6b3375316662706663702f62653636316461663933636434613163393739333261393734343365643665377e74706c762d6b3375316662706663702d77617465726d61726b2e696d616765)

从Micro Frontends 官网可以了解到，微前端概念是从微服务概念扩展而来的，摒弃大型单体方式，将前端整体分解为小而简单的块，这些块可以独立开发、测试和部署，同时仍然聚合为一个产品出现在客户面前。可以理解微前端是一种将多个可独立交付的小型前端应用聚合为一个整体的架构风格。

基于这个思想，要开始实践微前端，目前需要干什么？

做了以下工作：

1. 调研目前开源的微前端框架，甄别对我们改动成本低的框架，最终确定qiankun.js。
2. 主应用和子应用的搭建，并且确定拆分界定。
3. 搭建前端脚手架gg-cli，便于迁移工作，使用方法已上传wiki前端工具目录下。
4. 主应用和子应用模板的编写。
5. 抽离基础与公共组件发布到npm。
6. 规范代码检查工具 eslint + prettier。
7. 优化系统之前的接口调用方式。

#### 教师平台接入实践

1. 主应用的设计

主应用也可以称作基座，主应用技术栈 vue2.0.js。

基座的职责：它是一个容器，相当于一个插槽。子应用可以向基座插拔。主应用包含了登录页，qiankun的配置与启动，各个子应用的启动与打包配置，子应用导航的收集。

qiankuan.js配置

```javascript
// startAppList.js
/**
 * 说明：启动qiankun的应用列表及配置文件
 * store为全局的主仓库，放入公用状态
 * props 主应用下发的数据
 */
import store from '../store'
const getActiveRule = (hash) => (location) => location.hash.startsWith(hash)
const props = { store }
const isDev = process.env.NODE_ENV === 'development'
const list = [
  {
    name: 'nav-app',
    entry: isDev ? '//localhost:8081' : '/subapp/nav-app/',
    activeRule: () => true,
    container: '#subapp-viewport',
    props
  },
  {
    name: 'public-app',
    entry: isDev ? '//localhost:8082' : '/subapp/public-app/',
    activeRule: getActiveRule('#/workboard'),
    container: '#subapp-viewport-rigth',
    props
  },
  {
    name: 'sbis-app',
    entry: isDev ? '//localhost:8083' : '/subapp/sbis-app/',
    activeRule: getActiveRule('#/sbis'),
    container: '#subapp-viewport-rigth',
    props
  },
  {
    name: 'asms-app',
    entry: isDev ? '//localhost:8084' : '/subapp/asms-app/',
    activeRule: getActiveRule('#/asms'),
    container: '#subapp-viewport-rigth',
    props
  }
]
export default {
  list,
  store
}
// startQiankun.js
/**
 * qiankun启动配置
 */
import appConfig from './startAppList'
import { registerMicroApps, runAfterFirstMounted, start } from 'qiankun'
const qianKunStart = (list) => {
  registerMicroApps(list, {
    beforeLoad: [
      (app) => {
        return Promise.resolve()
      }
    ],
    beforeMount: [
      (app) => {
        if (app.name !== 'navmenu') {
          appConfig.store.commit('openLoading')
        }
        return Promise.resolve()
      }
    ],
    afterMount: [
      (app) => {
        return Promise.resolve()
      }
    ],
    afterUnmount: [
      (app) => {
        return Promise.resolve()
      }
    ]
  })
  runAfterFirstMounted(() => {
    // console.log('第一个加载')
  })
  start({ singular: false })
}
const startApp = () => {
  qianKunStart(appConfig.list)
}
export default startApp
```

子应用导航收集配置

```javascript
// getMenu.js
/**
 * 获取菜单配置
 */
import store from '../src/store'
const { sub_apps } = require('./index.json')
const menuList = []
const getMenus = (ctx) => {
  ctx.keys().forEach((key) => {
    let obj = ctx(key).default
    if (obj && obj.menu) {
      if (typeof obj.menuHandler === 'function') {
        obj.menuHandler(store)
      }
      menuList.push(...Object.values(obj.menu))
    }
  })
  store.commit('SETMENU', menuList)
}
/**
 * 以下方法不能循环调用，需要逐一调用
 * 来源路径为启动应用以及租户开通模块
 * 判断方法：先判断是否启动，再判断租户是否开通
 * public-app 为工作台的主页及其相关内容，关联工作台
 * 加载工作台的导航
 */

const menu = async () => {
  let moudleList = sub_apps.map((sub) => {
    sub = sub.substring(7, sub.length - 4)
    return sub
  })
  const startApp = (app) => {
    return moudleList.includes(app)
  }
  let sysList = await store.dispatch('callInterface', {
    url: '/smartedu-uums/modules/list'
  })
  sysList = sysList.filter((m) => m.active).map((m) => m.key)
  store.commit('setActiveMoudle', sysList)
  const verifyMoudle = (moudle) => {
    return sysList.indexOf(moudle) >= 0
  }
  getMenus(require.context('../subapp/public-app', true, /menu.js$/))
  startApp('sbis') && verifyMoudle('sbis') && getMenus(require.context('../subapp/sbis-app', true, /menu.js$/))
  startApp('asms') && verifyMoudle('asms') && getMenus(require.context('../subapp/asms-app', true, /menu.js$/))
}
export default menu
```

主应用入口APP.vue改造

```javascript
// App.vue
<template>
  <div id="app">
    <!-- 子应用渲染区 -->
    <div v-if="!$route.meta.isNav || $route.meta.isFoundation">
      <div id="subapp-viewport" class="app-view-box"></div>
      <div
        class="guozhi-menu-rigth"
        :class="$store.state.isCollapse ? 'is-collapse' : 'is-open-collapse'"
        v-loading="$store.state.loading"
      >
        <div id="subapp-viewport-rigth"></div>
        <GuozhiFooter></GuozhiFooter>
      </div>
    </div>
    <!-- 主应用渲染区，用于挂载主应用触发的路由 -->
    <router-view v-if="$route.meta.isNav" />
  </div>
</template>
```

2. 子应用的设计

子应用包含：

1. nav-app 布局子应用，负责系统整体布局，可以快速变更系统整体布局方式
2. public-app 公共子应用，存放不属于各个模块的页面，比如工作台主页相关
3. asms-app 子应用
4. seps-app 子应用
5. act-app 子应用
6. tpcs-app 子应用
7. tdc-app 子应用
8. tlps-app 子应用
9. sbis-app 子应用
10. skbs-app 子应用
11. ctes-app 子应用
12. tpas-app 子应用
13. mtms-app 子应用
14. slcs-app 子应用

子应用间通信，利用基座的store进行

当然子应用也有属于自己的store

```javascript
// 在子应用的根实例上挂载基座的store，进行通信
function render(container, store) {
  instance = new Vue({
    router,
    store: sbisStore,
    data() {
      return {
        parentVuex: store || null
      }
    },
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}
```

#### 前端如何迁移

1. 创建子应用

进入根目录下的 subapp文件夹

```
// 执行以下命令
gg-cli init <子应用名字>  // 规范 模块名 + app;例如 sbis-app, tlps-app
// 此时会生成相应的子应用，复制教师平台响应代码到子应用下
```
2. 启动子应用
3. 多个子应用使用同一页面的处理

每个子应用绝对独立，不能出现页面混用，实现完全物理隔离

#### 目前架构的问题

微前端还是存在一些不足之处，当然框架本来就不能权衡所有问题，它是一个不断演变和发展的过程。

1. 启动项目 main,nav-app,public-app为必须启动
2. 打包配置，main必须进行打包
3. 配置过于繁杂

#### 未来需要做什么？

1. 子应用可视化管理
2. 启动，打包 cli，开发出符合目前的部署方式
3. 系统埋点，监控