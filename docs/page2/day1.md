**css的重绘与回流**

重绘：当节点需要更改外观而不会影响布局。当元素的一部分属性发生改变，如外观、背景、颜色等不会引起布局变化，只需要浏览器根据元素的新属性重新绘制，使元素呈现新的外观叫做重绘。 
重排(回流)：DOM结构的修改引发DOM几何尺寸变化的时候，发生回流。需要DOM树重新计算的过程
常见的几何属性有width、height、padding、margin、left、top、border 或者是DOM节点发生增减移动。
减少重绘和回流的办法。
使用css3新增属性：translate替代top等方向值。
避免频繁使用style，而是采用class。

![800003022.jpg](https://pic4.zhimg.com/v2-3a63706bdaf46be6c20d9e5cc111c7e5_1440w.jpg?source=172ae18b)

<br/>

**借鉴于** [你真的了解回流和重绘吗?](https://zhuanlan.zhihu.com/p/52076790)

从上面这个图上，我们可以看到，浏览器渲染过程如下：

1. HTML经过Parser(解析)，生成 DOM树；同样的style经过Parser(解析)，生成CSSOM树
2. DOM树与CSSOM树结合生成渲染树(Render Tree)
3. Layout(回流)：根据生成的渲染树，进行回流，得到节点的几何信息(位置，大小等)
4. Painting(重绘)：根据渲染树以及得到的几何信息，得到节点的绝对像素
5. Display:将像素发送给GPU，展示在页面上。（这一步其实还有很多内容，比如会在GPU将多个合成层合并为同一个层，并展示在页面中。而css3硬件加速的原理则是新建合成层）

继续研究每一步都做了什么？

### 生成渲染树

![800003022.jpg](https://gitee.com/hejf01/pic/raw/master/render-tree-construction.png)

为了构建渲染树，浏览器主要完成了以下工作：

1. 从DOM树的根节点开始遍历每个可见的节点。
2. 找到每个可见的节点，找到并应用CSSOM树中相对应的规则
3. 根据可见节点以及其对应的样式，组合生成渲染树。

第一步中，不可见节点：

- 一些不会渲染输出的节点，比如script、meta、link等。
- 一些通过css进行隐藏的节点，比如display:none。注意，利用visibility和opacity隐藏的节点，还是会显示在渲染树上的。只有display:none的节点才不会显示在渲染树上。

反思，vue中的v-if和v-show的原理是什么？

[Vue 3 中 v-if 和 v-show 指令实现的原理（源码分析）](https://segmentfault.com/a/1190000039005215)

v-if 指令的实现较为简单，基于数据驱动的理念，当 v-if 指令对应的 value 为 false 的时候会预先创建一个注释节点在该位置，然后在 value 发生变化时，命中派发更新的逻辑，对新旧组件树进行 patch，从而完成使用 v-if 指令元素的动态显示隐藏。

v-show

```javascript
function setDisplay(el: VShowElement, value: unknown): void {
  el.style.display = value ? el._vod : 'none'
}
```

- 首先，由 widthDirectives 来生成最终的 VNode。它会给 VNode 上绑定 dir 属性，即 vShow 定义的在生命周期中对元素 CSS display 属性的处理
- 其次，在 patchElement 的阶段，会注册 postRenderEffect 事件，用于调用 vShow 定义的 update 生命周期处理 CSS display 属性的逻辑
- 最后，在派发更新的结束，调用 postRenderEffect 事件，即执行 vShow 定义的 update 生命周期，更改元素的 CSS display 属性

有点跑题了啊，完全没有解释我的疑惑，也让我明白了

DOM树与渲染树，DOM树就是控制台看到的树，display:none是会出现在DOM树的，在渲染树被移除了，所以不是布局的一部分。

v-if的原理，也就是在DOM树中已经不存在了，会出现一个注释的占位节点

至此v-if 和v-show的原理已经明白

### 回流

我们通过构造渲染树，我们将可见DOM节点以及它对应的样式结合起来，可是我们还需要计算它们在设备视口(viewport)内的确切位置和大小，这个计算的阶段就是回流。

为了弄清每个对象在网站上的确切大小和位置，浏览器从渲染树的根节点开始遍历，我们可以以下面这个实例来表示：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Critial Path: Hello world!</title>
  </head>
  <body>
    <div style="width: 50%">
      <div style="width: 50%">Hello world!</div>
    </div>
  </body>
</html>
```

我们可以看到，第一个div将节点的显示尺寸设置为视口宽度的50%，第二个div将其尺寸设置为父节点的50%。而在回流这个阶段，我们就需要根据视口具体的宽度，将其转为实际的像素值。（如下图）

![vscode.jpg](https://gitee.com/hejf01/pic/raw/master//layout-viewport.png)

### 重绘

最终，我们通过构造渲染树和回流阶段，我们知道了哪些节点是可见的，以及可见节点的样式和具体的几何信息(位置、大小)，那么我们就可以将渲染树的每个节点都转换为屏幕上的实际像素，这个阶段就叫做重绘节点。

既然知道了浏览器的渲染过程后，我们就来探讨下，何时会发生回流重绘。

- 添加或删除可见的DOM元素
- 元素的位置发生变化
- 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
- 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
- 页面一开始渲染的时候（这肯定避免不了）
- 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

##### 注意：回流一定会触发重绘，而重绘不一定会回流

根据改变的范围和程度，渲染树中或大或小的部分需要重新计算，有些改变会触发整个页面的重排，比如，滚动条出现的时候或者修改了根节点。

### 浏览器的优化机制

现代的浏览器都是很聪明的，由于每次重排都会造成额外的计算消耗，因此大多数浏览器都会通过队列化修改并批量执行来优化重排过程。浏览器会将修改操作放入到队列里，直到过了一段时间或者操作达到了一个阈值，才清空队列。但是！当你获取布局信息的操作的时候，会强制队列刷新，比如当你访问以下属性或者使用以下方法：

- offsetTop、offsetLeft、offsetWidth、offsetHeight
- scrollTop、scrollLeft、scrollWidth、scrollHeight
- clientTop、clientLeft、clientWidth、clientHeight
- getComputedStyle()
- getBoundingClientRect

以上属性和方法都需要返回最新的布局信息，因此浏览器不得不清空队列，触发回流重绘来返回正确的值。因此，我们在修改样式的时候，最好避免使用上面列出的属性，他们都会刷新渲染队列。如果要使用它们，最好将值缓存起来。

### 减少回流和重绘

1. 最小化重绘和重排
   > 1. 使用cssText
   >    
   >    const el = document.getElementById('test'); 
el.style.cssText += 'border-left: 1px; border-right: 2px; padding: 5px;'; 
   > 2. 修改CSS的class
   >    
   >    const el = document.getElementById('test'); 
el.className += ' active'; 
2. 批量修改DOM
   > 1. 使元素脱离文档流
   >    
   >    有三种方式可以让DOM脱离文档流：
   >    1. 隐藏元素，应用修改，重新显示
   >    2. 使用文档片段(document fragment)在当前DOM之外构建一个子树，再把它拷贝回文档。
   >    3. 将原始元素拷贝到一个脱离文档的节点中，修改节点后，再替换原始的元素。
   > 2. 对其进行多次修改
   > 3. 将元素带回到文档中。
3. 避免触发同步布局事件
   ```javascript
   // 优化前
   function initP() {
       for (let i = 0; i < paragraphs.length; i++) {
           paragraphs[i].style.width = box.offsetWidth + 'px';
       }
   }
   // 优化后
   const width = box.offsetWidth;
   function initP() {
       for (let i = 0; i < paragraphs.length; i++) {
           paragraphs[i].style.width = width + 'px';
       }
   }
   ```
4. 对于复杂动画效果,使用绝对定位让其脱离文档流
   > 对于复杂动画效果，由于会经常的引起回流重绘，因此，我们可以使用绝对定位，让它脱离文档流。否则会引起父元素以及后续元素频繁的回流。
5. css3硬件加速（GPU加速）
   > 使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。但是对于动画的其它属性，比如background-color这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。
   > 
   > 常见的触发硬件加速的css属性：
   > 
   > 1. transform
   > 2. opacity
   > 3. filters
   > 4. Will-change
   > 
   > 问题： 
   > 
   > 如果你为太多元素使用css3硬件加速，会导致内存占用较大，会有性能问题。
   > 
   > 在GPU渲染字体会导致抗锯齿无效。这是因为GPU和CPU的算法不同。因此如果你不在动画结束的时候关闭硬件加速，会产生字体模糊。
