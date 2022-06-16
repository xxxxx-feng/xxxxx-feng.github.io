#### instanceof如何使用

instanceof运算符返回一个布尔值，表示对象是否为某个构造函数的实例。

> 基本数据类型使用 instanceof的返回结果都为false

```javascript
var v = new Vehicle();
v instanceof Vehicle // true
// 等价于
Vehicle.prototype.isPrototypeOf(v)

对象v是构造函数Vehicle的实例，所以返回true
```

那么new Vehicle() 称为什么？ ---> 实例对象

instanceof运算符的左边是实例对象，右边是构造函数。它会检查右边构造函数的原型对象（prototype），是否在左边对象的原型链上。

由于instanceof检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回true

```javascript
var d = new Date();
d instanceof Date // true
d instanceof Object // true
```

```javascript
var obj = Object.create(null);
typeof obj // "object"
obj instanceof Object // false
Object.create(null)返回一个新对象obj，它的原型是null。
------------------------------------------------------------------
右边的构造函数Object的prototype属性，不在左边的原型链上，
因此instanceof就认为obj不是Object的实例。
这是唯一的instanceof运算符判断会失真的情况（一个对象的原型是null）。
```

利用instanceof运算符，还可以巧妙地解决，调用构造函数时，忘了加new命令的问题。

```javascript
function Fubar (foo, bar) {
  if (this instanceof Fubar) {
    this._foo = foo;
    this._bar = bar;
  } else {
    return new Fubar(foo, bar);
  }
}
```

上面代码使用instanceof运算符，在函数体内部判断this关键字是否为构造函数Fubar的实例。如果不是，就表明忘了加new命令。
