1. pointer-events: none 真是个神奇的属性。
2. 该属性有什么用？
pointer-events: none 顾名思义，就是鼠标事件拜拜的意思。元素应用了该 CSS 属性，链接啊，点击啊什么的都变成了 “浮云牌酱油”。pointer-events: none 的作用是让元素实体 “虚化”。例如一个应用 pointer-events: none 的按钮元素，则我们在页面上看到的这个按钮，只是一个虚幻的影子而已，您可以理解为海市蜃楼，幽灵的躯体。当我们用手触碰它的时候可以轻易地没有任何感觉地从中穿过去。
大家都知道 input[type=text|button|radio|checkbox] 支持 disabled 属性，可以实现事件的完全禁用。如果其他标签需要类似的禁用效果，可以试试 pointer-events: none

举个简单的例子：
<ahref="http://sf.gg"style="pointer-events:none">clickme</a>
这个链接，你是点不了的，并且 hover 也没有效果。（值得一提的是，仅仅是鼠标事件失效，用 tab 键还是可以选中该链接的，然后 enter 打开，这个时候可以去掉 a 标签的 href 属性，就不能让 tab 键选中了）

3. 一个项目中应用的例子：项目中使用基于canvas的一个背景动画，在画布层级上加上一层遮罩，发现画布一层动效不起作用。重新调整层级，发现遮罩层动效不起作用了。pointer-events适用于这种场景
在上一层级中加入pointer-events: none属性，在底层级加入 pointer-events: auto属性，你会发现底层级动效正常了，上一层级失效，这时你需要在想要效果的层级需要操作的元素上加入 pointer-events: auto属性，大功告成，完美解决层级影响动效的问题。

4. 浏览器兼容性：
Firefox 3.6+和chrome 2.0+ 以及safari 4.0+都支持这个CSS3属性，IE6/7/8/9都不支持，Opera在SVG中支持该属性但是HTML中不支持。
