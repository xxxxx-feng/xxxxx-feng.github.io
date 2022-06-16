<!--
 * @Author: hejianfang
 * @Email: hejianfang@meishubao.com
 * @Date: 2021-08-18 18:13:36
 * @LastEditors: hejianfang
 * @LastEditTime: 2021-08-18 18:13:49
 * @Description: 
-->
```javascript
function strToJson(str) {
  // eslint-disable-next-line no-new-func
  return new Function('return ' + str)()
}
```

new Function() 接收字符串，转换成函数。把"return" + str转换成函数的时候，str被转换成了对象（不是转换为JSON），然后使用(function(){return obj;})()方式立即执行new Function()生成的函数，函数只有一句return obj；执行结果就是str字符串转换而来的对象。