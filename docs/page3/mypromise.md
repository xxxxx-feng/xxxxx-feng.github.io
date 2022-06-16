<!--
 * @Author: hejianfang
 * @Email: hejianfang@meishubao.com
 * @Date: 2021-08-24 20:06:37
 * @LastEditors: hejianfang
 * @LastEditTime: 2021-08-24 20:06:38
 * @Description: 
-->
```javascript
// 定义三种状态
const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}
function resolvePromise (promise, x, resolve, reject) {
  // 如果 promise2 === x， 执行 reject，错误原因为 TypeError
  if (promise === x) {
    reject(new TypeError('The promise and the return value are the same'))
  }
  // 如果 x 是函数或对象
  if (typeof x === 'object' || typeof x === 'function') {
    if (x === null) {
      return resolve(x)
    }
    let then
    try {
      then = x.then
    } catch (error) {
      return reject(error)
    }

    // 如果 x.then 是函数
    if (typeof then === 'function') {
      let called = false
      try {
        then.call(x, y => {
          // resolve的结果依旧是promise 那就继续解析
          if (called) return
          called = true
          resolvePromise(promise, y, resolve, reject)
        }, err => {
          if (called) return
          called = true
          reject(err)// 失败了
        })
      } catch (error) {
        if (called) return
        reject(error)
      }
    } else {
      // 如果 x.then 不是函数
      resolve(x)
    }
  } else {
    // 如果 x 不是 promise 实例
    resolve(x)
  }
}
class MyPromise {
  // 使用new时会调用construtor
  constructor (executor) {
    // 初始状态
    this.status = STATUS.PENDING
    // 成功返回值
    this.value = null
    // 失败返回值
    this.reason = null
    // 成功回调
    this.onFulfilledCallback = []
    // 失败回调
    this.onRejectedCallback = []
    // 执行器,bind绑定上下文
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  // 修改 Promise 状态，并定义成功返回值
  resolve (value) {
    if (this.status === STATUS.PENDING) {
      this.status = STATUS.FULFILLED
      this.value = value
      while (this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()(value)
      }
    }
  }

  // 修改 Promise 状态，并定义失败返回值
  reject (err) {
    if (this.status === STATUS.PENDING) {
      this.status = STATUS.REJECTED
      this.reason = err
      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(err)
      }
    }
  }

  then (onFulfilled, onRejected) {
    // 如果 onFulfilled 不是函数，则必须忽略它；
    // 如果 onRejected 不是函数，则必须忽略它；
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    const realOnRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = realOnFulfilled(this.value)
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      const rejectedMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = realOnRejected(this.reason)
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.status === STATUS.PENDING) {
        this.onFulfilledCallback.push(fulfilledMicrotask)
        this.onRejectedCallback.push(rejectedMicrotask)
      } else if (this.status === STATUS.FULFILLED) {
        fulfilledMicrotask()
      } else if (this.status === STATUS.REJECTED) {
        rejectedMicrotask()
      }
      // if (this.status === STATUS.PENDING) {
      //   this.onFulfilledCallback.push(() => {
      //     /**
      //      * 这段逻辑不可抽离出去，抽离出去会报错 cannot access 'promise2' before initialization
      //      * 猜测可能在执行函数，将抽离出去的代码返回时，new Promise还没有执行完毕
      //      */
      //     setTimeout(() => {
      //       const x = onFulfilled(this.value)
      //       resolvePromise(promise2, x, resolve, reject)
      //     }, 0)
      //   })
      //   this.onRejectedCallback.push(() => {
      //     setTimeout(() => {
      //       const x = onRejected(this.value)
      //       resolvePromise(promise2, x, resolve, reject)
      //     }, 0)
      //   })
      // } else if (this.status === STATUS.FULFILLED) {
      //   setTimeout(() => {
      //     const x = onFulfilled(this.value)
      //     resolvePromise(promise2, x, resolve, reject)
      //   }, 0)
      // } else if (this.status === STATUS.REJECTED) {
      //   setTimeout(() => {
      //     const x = onRejected(this.error)
      //     resolvePromise(promise2, x, resolve, reject)
      //   }, 0)
      // }
    })
    return promise2
  }
}
// const mypromise = new MyPromise((resolve, reject) => {
//   setTimeout(() => resolve('成功'), 1000)
// })
// const mypromise2 = new MyPromise((resolve, reject) => {
//   setTimeout(() => resolve('成功2'), 1000)
// })
// const mypromise3 = new MyPromise((resolve, reject) => {
//   resolve('成功3')
// })
// mypromise.then((res) => {
//   console.log(res, '1')
//   return mypromise2
// }).then(res => {
//   console.log(res, '2')
//   return '123'
// }).then(res => {
//   console.log(res, '3')
// })
MyPromise.deferred = function () {
  const result = {}
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve
    result.reject = reject
  })

  return result
}
module.exports = MyPromise
```

![测试](https://files.catbox.moe/3qt7hj.png)

