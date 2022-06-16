<!--
 * @Author: hejianfang
 * @Email: hejianfang@meishubao.com
 * @Date: 2021-08-30 10:00:55
 * @LastEditors: hejianfang
 * @LastEditTime: 2021-08-30 10:00:57
 * @Description: 
-->
1. 获取字符串中的字符数

```javascript
const characterCount = (str, char) => str.split(char).length - 1
```

这个想法非常简单。我们使用传递的参数 char 拆分字符串并获得返回数组的长度。因为每一次分割字符串，都会比分割器多一根；所以减去 1，我们有一个 characterCount 单行。

2. 检查对象是否为空

```javascript
const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object
```

在这一行中，我们检查对象的键的长度是否等于 0，以及传递的参数是否为实际对象。

3. 等待一定时间后执行

```javascript
const wait = async (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
```

4. 获取两个日期之间的天差

```javascript
const daysBetween = (date1, date2) => Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24))
```

这种单行背后的逻辑很容易理解。当两个日期相减时，返回值是以毫秒为单位的差值。要将毫秒转换为天，我们必须将其分别除以毫秒、秒、分钟和小时。

5. 重定向到另一个 URL

```javascript
const redirect = url => location.href = url
```

6. 检查设备上的触摸支持

```javascript
const touchSupported = () => ('ontouchstart' in window || DocumentTouch && document instanceof DocumentTouch)
```

7. 在元素后插入一串 HTML

```javascript
const insertHTMLAfter = (html, el) => el.insertAdjacentHTML('afterend', html)
```

8. 打乱数组

```javascript
const shuffle = arr => arr.sort(() => 0.5 - Math.random())
```

9. 在网页上获取选定的文本

```javascript
const getSelectedText = () => window.getSelection().toString()
```
