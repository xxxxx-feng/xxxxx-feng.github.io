项目中，全局loading一般是在整体内容区域进行展示，项目在调用接口的时候展示，接口调用完成后隐藏，防止在页面接口请求过程中用户进行意料之外的操作。这次就是对loading的一个处理过程

一次尝试：

```javascript
let count = 0
let loading = false
const getApi = () => {
  count++
  loading = true
  promise.resolve().then(res => {
   count--
   if (count === 0) {
    loading = false
   }
  })
}
```