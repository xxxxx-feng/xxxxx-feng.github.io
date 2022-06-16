### 箭头函数和普通函数的区别是什么？

普通函数this：

- this总是代表它的直接调用者。
- 在默认情况下，没找到直接调用者，this指的是window。
- 在严格模式下，没有直接调用者的函数中的this是undefined。
- 使用call,apply,bind绑定，this指的是绑定的对象。

箭头函数this：

- 在使用=>定义函数的时候，this的指向是 定义时所在的对象，而不是使用时所在的对象；
- 不能够用作构造函数，这就是说，不能够使用new命令，否则就会抛出一个错误；
- 不能够使用 arguments 对象；
- 不能使用 yield 命令；

区别：

1. 箭头函数是匿名函数，不能作为构造函数，不能使用new
   ```javascript
   let func = () => {
       console.log('lll');
   }
   let fc = new func(); // TypeError: func is not a constructor
   ```

2. 箭头函数不绑定arguments，取而代之用rest参数...解决
   ```javascript
   function fn1(a){
     console.log(arguments); //[object Arguments] {0: 1}
   }
   
   let fn2 = (b)=>{
     console.log(arguments); //ReferenceError: arguments is not defined
   }
   
   let fn3 = (...c)=>{ //...c即为rest参数
     console.log(c); //[3]
   }
   fn1(1);
   fn2(2);
   fn3(3);
   ```

3. 箭头函数会捕获其所在上下文的 this 值，作为自己的 this 值
   ```javascript
   const obj = {
     a: 10,
     b: () => {
       console.log(this.a); // undefined
       console.log(this); // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
     },
     c: function() {
       console.log(this.a); // 10
       console.log(this); // {a: 10, b: ƒ, c: ƒ}
     }
   }
   obj.b(); 
   obj.c();
   ```

4. 箭头函数通过 call()  或   apply() 方法调用一个函数时，只传入了一个参数，对 this 并没有影响。
   ```javascript
   let obj2 = {
       a: 10,
       b: function(n) {
           let f = (n) => n + this.a;
           return f(n);
       },
       c: function(n) {
           let f = (n) => n + this.a;
           let m = {
               a: 20
           };
           return f.call(m,n);
       }
   };
   console.log(obj2.b(1));  // 11
   console.log(obj2.c(1)); // 11 而不是 21
   ```

5. 箭头函数没有原型属性
   ```javascript
   let a = ()=>{
     return 1;
   }
   function b(){
     return 2;
   }
   console.log(a.prototype);  // undefined
   console.log(b.prototype);   // {constructor: ƒ}
   ```

6. 箭头函数不能当做Generator函数,不能使用yield关键字
