函数带括号：会找到这个函数并且立即执行，括号是“函数调用运算符”，相当于在执行这样一个函数
函数不带括号：函数名只是一个变量，指向函数，并不会立即执行，只有在特定的情况下才会触发执行

```javascript
 <body>
  <div>
    <button id="btn" onclick="btnClick()">点击</button>
    <!--
      *在button标签中绑定onclick事件，
      *要写成test()，不能写成test，
      *test是指向一个function，
      *当点击按钮的时候，
      *test()就告诉浏览器执行test函数，
      *而test只是告诉了浏览器test函数，并没有要执行
       // ---------------------------------------
      *标签内的事件属性的值是由引号包裹的，
      *代表的是当点击该元素时，执行引号内的代码，直接把引号内的代码拿出来跑，
      *如果你不加括号，那就不会调用那个函数。
     -->
  </div>
  <script>
    /*
    简单来说就是带括号的是执行一次函数，不带括号的函数就是一个函数对象
    */
    let btn = document.getElementById('btn')
    console.log(btn)
    const btnClick = () => {
      console.log('点击了')
    }
    btn.onclick = btnClick()
    /**
     * btnClick() 表示直接执行，在onclick绑定时就执行了btnClick函数
     * 所以onclick绑定的东西是test执行后的结果或者返回函数，
     * 如果想绑定的是某个函数的返回函数(return function{})，就可以用οnclick=btnClick();
    */
    btn.onclick = btnClick
    /**
     * btn.onclick 只是给btn一个函数地址，会把btnClick函数绑定在按钮上，当点击的时候就执行
    */
  </script>
</body>
```

问题来了，在 vue 中，@click="handlr" 可以带括号，也可以不带括号，如何实现呢？

1. vue 初始化的时候，将 method 中的方法代理到 vue[key]的同时修饰了事件的回调函数.
   通过 initState(), initMethods(), bind() 绑定了作用域
2. vue 进入 compile 环节需要将该 div 变成 ast(抽象语法树）。当编译到该 div 时经过核心函数 genHandler(), 如果事件函数有修饰符。就处理完修饰符，添加修饰符对应的函数语句。再返回。这个过程还会单独对 native 修饰符做特殊处理。
3. compile 完后自然就 render
   ```
   _c('div',{attrs:{"id":"test1"},
   on:{"click":click1}},
   [_v("click1")]),_v(" "),
   _c('div',{attrs:{"id":"test2"},
   on:{"click":function($event){$event.stopPropagation();click2($event)}}}
   ```
4. 虚拟 dom --- > 真实 dom 的时候。会调用核心函数 add\$1() 通过 addEventListener 绑定相应事件
