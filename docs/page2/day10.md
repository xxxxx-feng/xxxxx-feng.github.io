**instanceof原理**

instanceOf用来判断右边的prototype是否在左边的原型链上，告诉我们左边是否是右边的实例。

```javascript
function instanceof(left, right) {
    // 获得类型的原型
    let prototype = right.prototype
    // 获得对象的原型
    left = left.__proto__
    // 判断对象的类型是否等于类型的原型
    while (true) {
        if (left === null){
            return false  
        }
        if (prototype === left){
            return true
        }
        left = left.__proto__
    }
}
```

**typeof**

typeof 检测对象，除开函数是function类型之外。像常见的数组，对象或者是正则,日期等等都是object；
需要注意一下：

```javascript
typeof Symbol() // 'symbol'
typeof null // object
typeof undefined // undefined
```

typeof null检测输出object因为js最初版本，使用的是32位系统，类型的标签存储在每个单元的低位中000是object类型。null全是0，所以当我们使用typeof进行检测的时候js错误的判断位object
