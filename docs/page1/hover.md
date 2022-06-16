#### vue中动态绑定hover效果
```javascript
<template>
   <ul>
      <li v-for="item in templateList"
          :key="item.key"
          :style="handleStyleColor(item)">
          <span>{{item.name}}</span>
       </li>
    </ul>
</template>
<script>
  export default {
  data () {
    return {
      templateList: [
       {
         color: '#4954E6',
       }
      ]
    }
  },
    methods: {
      handleStyleColor (item) {
        return {
          'border-top-color': item.color,
          '--text-color': item.color
        }
      }
    }
  }
</script>
<style>
li:hover{
  span {
    color: var(--text-color)
  }
}
</style>
```

原理是用了css的属性 ---- CSS var() 函数

[var()函数](https://www.runoob.com/cssref/func-var.html)

![800003022.jpg](https://gitee.com/hejf01/pic/raw/master/20210308-141240-0586.png)
