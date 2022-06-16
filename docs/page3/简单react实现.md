```javascript
/*
 * @Author: hejianfang
 * @Email: hejianfang@meishubao.com
 * @Date: 2021-08-25 10:40:44
 * @LastEditors: hejianfang
 * @LastEditTime: 2021-08-25 19:17:53
 * @Description: 手写实现react
 */
/**
 * 创建虚拟 DOM 结构
 * @param {type} 标签名
 * @param {props} 属性对象
 * @param {children} 子节点
 * @return {element} 虚拟 DOM
 */
const createTextElement = (text) => {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}
const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      )
    }
  }
}
const isEvent = key => key.startsWith('on')
const isProperty = key => key !== 'children' && !isEvent(key)
const isNew = (prev, next) => key => prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)
const updateDom = (dom, prevProps, nextProps) => {
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.removeEventListener(
        eventType,
        prevProps[name]
      )
    })

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ''
    })

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    })
}
/**
 * createDom 创建 DOM 节点
 * @param {fiber} fiber 节点
 * @return {dom} dom 节点
 */
const createDom = (fiber) => {
  // 如果是文本类型，创建空的文本节点，如果不是文本类型，按 type 类型创建节点
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type)
  updateDom(dom, {}, fiber.props)
  // 返回 dom
  return dom
}
// 下一个工作单元
let nextUnitOfWork = null
let deletions = null
/**
 * 协调子节点
 * @param {fiber} fiber
 * @param {elements} fiber 的 子节点
 */
const reconcileChildren = (fiber, elements) => {
  let index = 0
  let prevSibling = null
  let oldFiber = fiber.alternate && fiber.alternate.child
  // eslint-disable-next-line no-unmodified-loop-condition
  while (index < elements.length || oldFiber != null) {
    const element = elements[index]
    let newFiber = null
    const sameType = oldFiber && element && element.type === oldFiber.type
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: fiber,
        alternate: oldFiber,
        effectTag: 'UPDATE'
      }
    }
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: fiber,
        alternate: null,
        effectTag: 'PLACEMENT'
      }
    }
    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETION'
      deletions.push(oldFiber)
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }
    if (index === 0) {
      fiber.child = newFiber
    } else if (element) {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
}
const updateHostComponent = (fiber) => {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  reconcileChildren(fiber, fiber.props.children)
}
// function updateRender () {
//   wipRoot = {
//     dom: currentRoot.dom,
//     props: currentRoot.props,
//     alternate: currentRoot
//   }

//   // 设置下一个工作单元
//   nextUnitOfWork = wipRoot

//   // 清空需删除的节点
//   deletions = []
// }
let wipFiber = null
// initial 表示初始参数，在本例中，initail=1
const useState = (initial) => {
  // 是否有旧钩子，旧钩子存储了上一次更新的 hook
  const oldHook =
      wipFiber.alternate &&
      wipFiber.alternate.hook
  // 初始化钩子，钩子的状态是旧钩子的状态或者初始状态
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  }
  // 从旧的钩子队列中获取所有动作，然后将它们一一应用到新的钩子状态
  const actions = oldHook ? oldHook.queue : []
  actions.forEach(action => {
    hook.state = action(hook.state)
  })
  // 设置钩子状态
  const setState = action => {
    // 将动作添加至钩子队列
    hook.queue.push(action)
    // 更新渲染
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    }
    nextUnitOfWork = wipRoot
    deletions = []
  }

  // 把钩子添加至工作单元
  wipFiber.hook = hook

  // 返回钩子的状态和设置钩子的函数
  return [hook.state, setState]
}
const updateFunctionComponent = (fiber) => {
  wipFiber = fiber
  // 当前工作单元 fiber 的 hook
  wipFiber.hook = []
  // 省略
  // fiber.type 就是函数组件本身，fiber.props 就是函数组件的参数
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}
/**
 * performUnitOfWork 处理工作单元
 * @param {fiber} fiber
 * @return {nextUnitOfWork} 下一个工作单元
 */
const performUnitOfWork = (fiber) => {
  // 是否是函数类型组件
  const isFunctionComponent = fiber && fiber.type && fiber.type instanceof Function
  // 如果是函数组件，执行 updateFunctionComponent 函数
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    // 如果不是函数组件，执行 updateHostComponent 函数
    updateHostComponent(fiber)
  }
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}
let wipRoot = null
let currentRoot = null
const commitWork = (fiber) => {
  if (!fiber) return
  let domParentFiber = fiber.parent
  // 如果 fiber.parent 没有 dom 节点，则继续找 fiber.parent.parent.dom，直到有 dom 节点。
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent
  }
  const domParent = domParentFiber.dom
  if (
    fiber.effectTag === 'PLACEMENT' &&
    fiber.dom != null
  ) {
    domParent.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'DELETION') {
    commitDeletion(fiber.dom, domParent)
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  }
  // 渲染子节点
  commitWork(fiber.child)
  // 渲染兄弟节点
  commitWork(fiber.sibling)
}
// 全部工作单元完成后，将 fiber tree 渲染为真实 DOM；
const commitRoot = () => {
  deletions.forEach(commitWork)
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  // 需要设置为 null，否则 workLoop 在浏览器空闲时不断的执行。
  wipRoot = null
}

/**
* performUnitOfWork 处理工作单元
* @param {fiber} fiber
*/
// 删除节点
const commitDeletion = (fiber, domParent) => {
  // 如果该 fiber 有 dom 节点，直接删除
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else {
  // 如果该 fiber 没有 dom 节点，则继续找它的子节点进行删除
    commitDeletion(fiber.child, domParent)
  }
}

/**
 * workLoop 工作循环函数
 * @param {deadline} 截止时间
 */
const workLoop = (deadline) => {
  // 是否应该停止工作循环函数
  let shouldYield = false
  // 如果存在下一个工作单元，且没有优先级更高的其他工作时，循环执行
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    // 如果截止时间快到了，停止工作循环函数
    shouldYield = deadline.timeRemaining() < 1
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
  // 通知浏览器，空闲时间应该执行 workLoop
  requestIdleCallback(workLoop)
}
// 通知浏览器，空闲时间应该执行 workLoop
requestIdleCallback(workLoop)
/**
 * 将 fiber 添加至真实 DOM
 * @param {element} fiber
 * @param {container} 真实 DOM
 */
const render = (ele, container) => {
  wipRoot = {
    dom: container,
    props: {
      children: [ele]
    },
    alternate: currentRoot
  }
  // 下一个工作单元是根节点
  nextUnitOfWork = wipRoot
  deletions = []
}
const myReact = {
  createElement,
  render,
  useState
}
/** @jsx myReact.createElement */
const container = document.getElementById('container')
function Counter () {
  const [state, setState] = myReact.useState(1)
  return (
      <h1 onClick={() => setState(c => c + 2)}>
      Count: {state}
      </h1>
  )
}
const element = <Counter />

myReact.render(element, container)
```

jsx需要babel转义

