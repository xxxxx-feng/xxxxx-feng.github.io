<!--
 * @Author: hejianfang
 * @Email: hejianfang@meishubao.com
 * @Date: 2021-08-13 16:20:44
 * @LastEditors: hejianfang
 * @LastEditTime: 2021-08-13 16:21:08
 * @Description: 
-->
> HTML的职责是告诉浏览器如何组织页面，以及搭建页面的基本结构；
> 
> CSS用来装饰HTML，丰富页面元素；
> 
> JavaScript可以丰富页面功能，使静态页面动起来。

> <!DOCTYPE html> 表示文档类型，告诉浏览器如何解析网页。

> head的子元素一般包含7个
> 
> - meta：设置网页的元数据。
> 
> <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
> 
> 1. charset属性：用来指定网页的编码方式。
> 2. name属性、content属性：name表示元数据的名字，content表示元数据的值
> 3. http-equiv属性、content属性：http-equiv用来覆盖http回应的头信息字段，content是对应的子段内容
> 
> - link：链接外部样式表
> - title：设置网页标题
> - style：放置内嵌的样式表
> - noscript：浏览器不支持脚本时，所要显示的内容
> - base：设置网页内部相对URL的计算基准

tableindex：表示浏览器允许使用tab键获取焦点。为负整数时，可以获取焦点但不参与tab键对网页元素的遍历。

data-属性：用于放置自定义数据。只能通过css或javascript利用。

```html
/* HTML 代码如下
<div data-role="mobile">
Mobile only content
</div>
*/
div[data-role="mobile"] {
  display:none;
}

/* HTML 代码如下
<div class="test" data-content="This is the div content">test</div>​
*/
.test {
  display: inline-block;
}
.test:after {
  content: attr(data-content);
}
```

> **文本标签**
> 
> <blockquote>是一个块级标签，表示引用他人的话。浏览器会在样式上，与正常文本区别显示。
> 
> <blockquote>标签有一个cite属性，它的值是一个网址，表示引言来源，不会显示在网页上。
> 
> <cite> 标签表示引言出处或者作者，浏览器默认使用斜体显示这部分内容。
> 
> <code>标签是一个行内元素，表示标签内容是计算机代码，浏览器默认会以等宽字体显示。

HTML结构：

```html
<html>
  <head></head>
  <body></body>
</html>
<html> 是页面的根元素，它描述完整的网页
<head> 包含在HTML页面，但不显示在看到的页面里
<body> 用户最后看到的内容
```

浏览器加载页面时会使用GUI渲染线程和JavaScript引擎线程，GUI负责渲染浏览器的HTML元素，JavaScript负责处理脚本程序。JS在执行中，可能会有操作DOM的操作，所以和渲染线程为互斥关系，GUI会等待JS执行后，再继续工作。

浏览器在渲染页面的过程需要解析 HTML、CSS 以得到 DOM 树和 CSS 规则树，它们结合后才生成最终的渲染树并渲染。因此，我们还常常将 CSS 放在`<head>`里，可用来避免浏览器渲染的重复计算。

**HTML和DOM有什么不同？**

DOM是用来操作和描述HTML文档的接口。浏览器用HTML来描述网页的结构并渲染，DOM就可以获取网页结构并进行操作。我们会使用JS来操作DOM，从而实现页面的动态变化，以及用户的交互操作。

**操作 DOM**

除了获取 DOM 结构以外，通过 HTML DOM 相关接口，我们还可以使用 JavaScript 来访问 DOM 树中的节点，也可以创建或删除节点。

```javascript
// 获取到 class 为 swiper-control 的第一个节点，这里得到我们的滚动控制面板
const controlPanel = document.getElementsByClassName("swiper-control")[0];
// 获取滚动控制面板的第一个子节点
// 这里是“就业率口碑训练营限时抄底”文本所在的子列
const firstChild = controlPanel.firstElementChild;
// 删除滚动控制面板的子节点
controlPanel.removeChild(firstChild);
```

虚拟 DOM 其实是用来模拟真实 DOM 的中间产物，它的设计大致可分成 3 个过程：

1. 用 JavaScript 对象模拟 DOM 树，得到一棵虚拟 DOM 树；
2. 当页面数据变更时，生成新的虚拟 DOM 树，比较新旧两棵虚拟 DOM 树的差异；
3. 把差异应用到真正的 DOM 树上。

**事件委托**

浏览器中各个元素从页面中接收事件的顺序包括事件捕获阶段、目标阶段、事件冒泡阶段。其中，基于事件冒泡机制，我们可以实现将子元素的事件委托给父级元素来进行处理，这便是事件委托。

使用事件委托的方式，我们可以大量减少浏览器对元素的监听，也是在前端性能优化中比较简单和基础的一个做法。
