### 讲一下let、var、const的区别

- var 没有块级作用域，支持变量提升。
- let 有块级作用域，不支持变量提升。不允许重复声明，暂存性死区。不能通过window.变量名进行访问
- const 有块级作用域，不支持变量提升，不允许重复声明，暂存性死区。声明一个变量一旦声明就不能改变，改变报错。
