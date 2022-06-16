<!--
 * @Author: hejianfang
 * @Email: hejianfang@meishubao.com
 * @Date: 2021-08-17 18:06:33
 * @LastEditors: hejianfang
 * @LastEditTime: 2021-08-17 18:06:44
 * @Description: 
-->
### Object对象

Object对象的原生方法分成两类：Object本身的方法与Object的实例方法。

如果Object方法的参数是一个对象，它总是返回该对象，即不用转换。

利用这一点，可以写一个判断变量是否为对象的函数。

```javascript
function isObject(value) {
  return value === Object(value);
}

isObject([]) // true
isObject(true) // false
```

### 数组对象

Array.isArray()

方法返回一个布尔值，表示参数是否为数组。它可以弥补typeof运算符的不足。

slice()

slice()方法用于提取目标数组的一部分，返回一个新数组，原数组不变。

> 改变原数组的方法：push,pop,shift,unshift,reverse,splice,sort,
> 
> 不改变的方法：join,concat,slice,map.foreach,filter,some,every,reduce,reduceright,indexof,lastindexof

### 数值对象

toLocaleString方法接受一个地区码作为参数，返回一个字符串，表示当前数字在该地区的当地书写形式。

```javascript
(123).toLocaleString('zh-Hans-CN-u-nu-hanidec')
// "一二三"
```

### String对象

charAt方法返回指定位置的字符，参数是从0开始编号的位置。

charCodeAt()方法返回字符串指定位置的 Unicode 码点（十进制表示），相当于String.fromCharCode()的逆操作。

concat方法用于连接两个字符串，返回一个新字符串，不改变原字符串。

slice()方法用于从原字符串取出子字符串并返回，不改变原字符串。它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。

substring方法用于从原字符串取出子字符串并返回，不改变原字符串，跟slice方法很相像。它的第一个参数表示子字符串的开始位置，第二个位置表示结束位置（返回结果不含该位置）。应该优先使用slice

substr方法用于从原字符串取出子字符串并返回，不改变原字符串，跟slice和substring方法的作用相同。

indexOf方法用于确定一个字符串在另一个字符串中第一次出现的位置，返回结果是匹配开始的位置。如果返回-1，就表示不匹配。

lastIndexOf方法的用法跟indexOf方法一致，主要的区别是lastIndexOf从尾部开始匹配，indexOf则是从头部开始匹配。

trim方法用于去除字符串两端的空格，返回一个新字符串，不改变原字符串。

toLowerCase方法用于将一个字符串全部转为小写，toUpperCase则是全部转为大写。它们都返回一个新字符串，不改变原字符串。

match方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回null。

search方法的用法基本等同于match，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回-1。

replace方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有g修饰符的正则表达式）。

split方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。

### Math对象

Math对象提供以下一些静态方法。

- Math.abs()：绝对值
- Math.ceil()：向上取整
- Math.floor()：向下取整
- Math.max()：最大值
- Math.min()：最小值
- Math.pow()：幂运算
- Math.sqrt()：平方根
- Math.log()：自然对数
- Math.exp()：e的指数
- Math.round()：四舍五入
- Math.random()：随机数