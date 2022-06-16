先来说说重复发送ajax请求带来的问题

> 场景一：用户快速点击按钮，多次相同的请求打到服务器，给服务器造成压力。如果碰到提交表单操作，而且恰好后端没有做兼容处理，那么可能会造成数据库中插入两条及以上的相同数据
> 
> 场景二：用户频繁切换下拉筛选条件，第一次筛选数据量较多，花费的时间较长，第二次筛选数据量较少，请求后发先至，内容先显示在界面上。但是等到第一次的数据回来之后，就会覆盖掉第二次的显示的数据。筛选结果和查询条件不一致，用户体验很不好

常用解决方案

1. 状态变量 --- 目前使用的办法
2. 函数节流和函数防抖
3. 请求拦截和请求取消

作为一个成熟的ajax应用，它应该能自己在pending过程中选择请求拦截和请求取消

- 请求拦截

用一个数组存储目前处于pending状态的请求。发送请求前先判断这个api请求之前是否已经有还在pending的同类，即是否存在上述数组中，如果存在，则不发送请求，不存在就正常发送并且将该api添加到数组中。等请求完结后删除数组中的这个api。

- 请求取消

用一个数组存储目前处于pending状态的请求。发送请求时判断这个api请求之前是否已经有还在pending的同类，即是否存在上述数组中，如果存在，则找到数组中pending状态的请求并取消，不存在就将该api添加到数组中。然后发送请求，等请求完结后删除数组中的这个api

通过axios 的 cancel token，我们可以轻松做到请求拦截和请求取消

```javascript
import axios from 'axios'
let pendingAjax = []
const fastClickMsg = '数据请求中，请稍后'
const CancelToken = axios.CancelToken
const removePendingAjax = (config, c) => {
  const url = config.url
  const index = pendingAjax.findIndex(i => i === url)
  if (index > -1) {
    c ? c(fastClickMsg) : pendingAjax.splice(index, 1)
  } else {
    c && pendingAjax.push(url)
  }
}

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.cancelToken = new CancelToken(c => {
      removePendingAjax(config, c)
    })
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    removePendingAjax(response.config)
    return new Promise((resolve, reject) => {
      if (+response.data.code !== 0) {
        reject(new Error('network error:' + response.data.msg))
      } else {
        resolve(response)
      }
    })
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    Message.error(error)
    return Promise.reject(error)
  }
)
export default axios
```
[axios请求的缓存与重复请求过滤的封装](https://juejin.cn/post/6844904167840940040)