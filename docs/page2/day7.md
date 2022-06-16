**简述深浅拷贝**

<u>*使用场景*</u>

日常开发中，JS 拷贝大多会在 数据保存，数据比对，数据同步 时出现，所以，当你在这些场景的时候，要记得里面隐藏有一个数据深浅拷贝的问题。

<u>*浅拷贝*</u>
通常需要拷贝的对象内部只有一层的这种对象。

<u>*常用的方法*</u>

1. Object.assign方法来实现
2. 扩展运算符 ...obj

*<u>深拷贝</u>*

通常是嵌套二层或以上的复杂对象
<u>*常用方法*</u>

1. JSON.parse(JSON.stringfy(object)); 该方法忽略掉undefined、忽略Symbol、忽略function。只适合简单深拷贝
2. 手写递归方法去实现。
3. 通过第三方库提供的深拷贝实现。

详细介绍 [实现](https://blog.csdn.net/wangfeijiu/article/details/110404803)

[JS专题之深浅拷贝](https://www.imooc.com/article/277442?block_id=tuijian_wz)

<br/>

**函数的节流和防抖**

防抖函数：将多次触发变成最后一次触发；（键盘输入）

节流函数：将多次执行变成每隔一个时间节点去执行的函数 （鼠标移动）

**call、apply区别**

相同点：都是重定向this指针的方法。
不同点：call和apply的第二个参数不相同，call是若干个参数的列表。apply是一个数组

```javascript
// 在这之前需要重新认识一下call方法的执行操作
let mock = { value : 1 };
function mockNum(){
 console.log('value',this.value)
}
mockNum.call(mock) // 改变了函数中this的指向，当前this指向了mock对象

转换一下实现方法就是

let mock = {
  value:1;
  mockNum:function(){
     console.log('value',this.value)
  }
}
mock.mockNum();
所以经过上面这个操作的演化而来的结果就是如下步骤：
1. 将函数设为一个对象的属性
2. 并将这个函数的属性调用
3. 删除该函数

Function.prototype.Mycall = function(context){
  let obj = context || window;
  obj.fn = this; //   这一步可以看做是this其实就指的当前函数。
  let args = [...arguments].slice(1); // 返回删除第一个元素的数组；
  let result = obj.fn(...args); // 调用函数
  delete obj.fn;
  return result;
}

// 操作一下
let mock = { value : 1 };
function mockNum(){
  console.log('value',this.value);
}
mockNum.Mycall(mock) // value 1
```

然后根据上面的方法再手写一个apply方法

```javascript
Function.prototype.MyApply = function (context){
    let obj = context || window;
    obj.fn = this;
    let result = arguments[1] ? obj.fn(arguments[1]) : obj.fn([]);
    delete obj.fn;
    return result;
}
let mock3 = {
  arr: [1, 2, 3, 4, 5],
};
function arrx2(arr) {
  return this.arr.concat(arr).map((x) => x * 2);
}
console.log("arrx2", arrx2.MyApply(mock3));
```

**bind**

bind方法是直接返回一个新的函数，需要手动去调用才能执行。

创建一个新函数，当这个新函数被调用时，bind()方法的第一个参数将作为运行他的this，之后的一系列参数将会在传递的实参传入作为他的参数；
特点：1. 返回一个函数。 2. 可以传入参数；
手写一个bind方法

```javascript
例如：
let foo = { value : 1 };
function bar() {
  console.log('bindFoo',this.value);
  // return this.value // 考虑到函数可能有返回值
}
let bindFoo = bar.bind(foo);
bindFoo() // 1  // 如果有返回值的情况下 bindFoo() === 1;

Function.prototype.Mybind = function(obj){
  if(typeof this !== 'function') throw new Error('not a function');
  let self = this;
  let args = [...arguments].clice(1);
  return function F(){
    if(this instanceof F){
      return new self(...args,...arguments);
    }
    return self.apply(obj,args.concat([...arguments]));
  }
}
```