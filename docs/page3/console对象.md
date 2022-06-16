<!--
 * @Author: hejianfang
 * @Email: hejianfang@meishubao.com
 * @Date: 2021-08-17 18:06:15
 * @LastEditors: hejianfang
 * @LastEditTime: 2021-08-17 18:06:15
 * @Description: 
-->
**console.table()**

对于某些复合类型的数据，console.table方法可以将其转为表格显示。

**console.count()**

count方法用于计数，输出它被调用了多少次。

**console.dir()**

dir方法用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示。

该方法对于输出 DOM 对象非常有用，因为会显示 DOM 对象的所有属性。

**console.dirxml()**

dirxml方法主要用于以目录树的形式，显示 DOM 节点。

**console.time()，console.timeEnd()**

这两个方法用于计时，可以算出一个操作所花费的准确时间。

```javascript
console.time('Array initialize');

var array= new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
  array[i] = new Object();
};

console.timeEnd('Array initialize');
// Array initialize: 1914.481ms
```

**console.trace()，console.clear()**

console.trace方法显示当前执行的代码在堆栈中的调用路径。

console.clear方法用于清除当前控制台的所有输出，将光标回置到第一行。如果用户选中了控制台的“Preserve log”选项，console.clear方法将不起作用。
