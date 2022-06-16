**rem 布局的本质是等比缩放，一般是基于宽度**，试想一下如果 UE 图能够等比缩放，那该多么美好啊

假设我们将屏幕宽度平均分成 100 份，每一份的宽度用 x 表示，x = 屏幕宽度 / 100，如果将 x 作为单位，x 前面的数值就代表屏幕宽度的百分比

```css
p {
  width: 50x;
} /* 屏幕宽度的50% */
```

如果想要页面元素随着屏幕宽度等比变化，我们需要上面的 x 单位，不幸的是 css 中并没有这样的单位，幸运的是在 css 中有 rem，通过 rem 这个桥梁，可以实现神奇的 x

通过上面对 rem 的介绍，可以发现，如果子元素设置 rem 单位的属性，通过更改 html 元素的字体大小，就可以让子元素实际大小发生变化

```css
html {
  font-size: 16px;
}
p {
  width: 2rem;
} /* 32px*/

html {
  font-size: 32px;
}
p {
  width: 2rem;
} /*64px*/
```

如果让 html 元素字体的大小，恒等于屏幕宽度的 1/100，那 1rem 和 1x 就等价了

```scss
html {
  fons-size: width / 100;
}
p {
  width: 50rem;
} /* 50rem = 50x = 屏幕宽度的50% */
```

如何让 html 字体大小一直等于屏幕宽度的百分之一呢？ 可以通过 js 来设置，一般需要在页面 dom ready、resize 和屏幕旋转中设置

```javascript
document.documentElement.style.fontSize =
  document.documentElement.clientWidth / 100 + "px";
```

那么如何把 UE 图中的获取的像素单位的值，转换为已 rem 为单位的值呢？公式是元素宽度 / UE 图宽度 * 100，让我们举个例子，假设 UE 图尺寸是 640px，UE 图中的一个元素宽度是 100px，根据公式 100/640*100 = 15.625

```scss
$ue-width: 640; /* ue图的宽度 */

@function px2rem($px) {
  @return #{$px/$ue-width * 100}rem;
}

p {
  width: px2rem(100);
}
```

但是上面的方案还有个问题，就是分成 100 份的话，假设屏幕宽度 320，此时 html 大小是 3.2px，但浏览器支持最小字体大小是 12px，怎么办？那就分成 10 份呗，只要把上面的 100 都换成 10 就好了

#### 比 Rem 更好的方案

上面提到想让页面元素随着页面宽度变化，需要一个新的单位 x，x 等于屏幕宽度的百分之一，css3 带来了 rem 的同时，也带来了 vw 和 vh

> vw —— 视口宽度的 1/100；vh —— 视口高度的 1/100 —— MDN

聪明的你也许一经发现，这不就是单位 x 吗，没错根据定义可以发现 1vw=1x，有了 vw 我们完全可以绕过 rem 这个中介了，下面两种方案是等价的，可以看到 vw 比 rem 更简单，毕竟 rem 是为了实现 vw 么

```css
/* rem方案 */
html {
  fons-size: width / 100;
}
p {
  width: 15.625rem;
}

/* vw方案 */
p {
  width: 15.625vw;
}
```

vw 还可以和 rem 方案结合，这样计算 html 字体大小就不需要用 js 了

```css
html {
  fons-size: 1vw;
} /* 1vw = width / 100 */
p {
  width: 15.625rem;
}
```

虽然 vw 各种优点，但是 vw 也有缺点，首先 vw 的兼容性不如 rem 好，使用之前要看下

另外，在使用弹性布局时，一般会限制最大宽度，比如在 pc 端查看我们的页面，此时 vw 就无法力不从心了，因为除了 width 有 max-width，其他单位都没有，这时样式就会混乱，而 rem 可以通过控制 html 根元素的 font-size 最大值，而轻松解决这个问题
