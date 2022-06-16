### 实现一个new的伪代码

new关键词操作

- 创建一个空的JavaScript对象（即{}）；
- 将函数的 prototype 赋值给对象的 __proto__属性 ；
- 调用函数，并将步骤1新创建的对象作为函数的this上下文 ；
- 如果该函数没有返回值或者返回值不是对象，则返回创建的对象，如果返回值是对象，则直接返回该对象。

定义

> new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。 ——（来自于MDN）

```javascript
function Car(color) {
    this.color = color;
}
Car.prototype.start = function() {
    console.log(this.color + " car start");
}
var car = new Car("black");
car.color; // 访问构造函数里的属性
// black
car.start(); // 访问原型里的属性
// black car start
```

可以看出 new 创建的实例有以下 2 个特性

1. 访问到构造函数里的属性
2. 访问到原型里的属性

#### 模拟实现

new 是关键词，不可以直接覆盖。这里使用 create 来模拟实现 new 的效果。

实现代码如下

```javascript
function create(fn, ...args) {
    // 1. 创建一个继承构造函数.prototype的空对象
    var obj = Object.create(fn.prototype);
    // 2. 让空对象作为函数 fn的上下文，并调用 fn，同时获取它的返回值
    let result = fn.call(obj, ...args);
    // 3. 如果构造函数返回一个对象，那么直接 return 它，否则返回内部创建的新对象
    return result instanceof Object ? result : obj;
};
```

测试一下

```javascript
// 测试用例
function Car(color) {
    this.color = color;
}
Car.prototype.start = function() {
    console.log(this.color + " car start");
}
var car = create(Car, "black");
car.color;
// black
car.start();
// black car start
```

##### 延伸

```javascript
function Parent(name) {
    this.name = name;
}

var child = new Parent('前端名狮');
console.log(Parent.prototype); // {constructor: function Parent(name){this.name = name}}
console.log(child.prototype); // undefined
```

JavaScript 中，万物皆对象！但对象也是有区别的。分为普通对象和函数对象，Object ，Function 是JS自带的函数对象。
函数对象会预定义一个属性就是原型对象prototype。

***注：普通对象没有prototype,但有__proto__属性。***

Parent是函数对象，Parent.prototype是存在的。

由上面的new 操作符的工作原理，我们知道它返回的是一个普通对象{}，所以它是没有prototype属性的，输出undefined
