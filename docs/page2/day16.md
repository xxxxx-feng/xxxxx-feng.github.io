**JS 实现找出字符串中第一个不重复的字符**

```javascript
let str = "aabbc"; //测试用字符串
for (let x of str) {
  let reg = new RegExp(`${x}`, "g"); //创建正则
  if (str.match(reg).length == 1) {
    // 匹配正则, 如果匹配超过1个, 则表示有重复, 跳过,
    // 如果只匹配到一个, 则输出
    console.log(x); //输出第一个不重复的字符
    break; //终止循环
  }
} // c
// for (let i = 0; i < str.length; i++) {
//   if (!str.includes(str[i], i+ 1)) {
//     console.log(str[i]);
//     break;
//   }
// } // a
for (let i = 0; i < str.length; i++) {
  var c = str.charAt(i);
  if (str.indexOf(c) == i && str.indexOf(c, i + 1) == -1) {
    console.log(c);
    break;
  }
} // c
for (let i = 0; i < str.length; i++) {
  if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
    console.log(str[i]);
    break;
  }
} // c
const sin = (val) => {
  const re = new Set()
  for (let index = 0; index < val.length; index++) {
    re.has(val[index]) ? re.delete(val[index]) : re.add(val[index])
  }
  return [...re][0]
}
console.log(sin([1, 1, 2, 3, 5, 4])) // 2

```
![最优方案](~public/page2/day16.png)
推荐第三、第四种解法