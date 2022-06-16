1. 交集
   
   集合论中，设A，B是两个集合，由所有属于集合A且属于集合B的元素所组成的集合，叫做集合A与集合B的交集（intersection），记作A∩B。
2. 并集
   
   给定两个集合A，B，把他们所有的元素合并在一起组成的集合，叫做集合A与集合B的并集，记作A∪B，读作A并B。
3. 补集
   
   一般指绝对补集，即一般地，设S是一个集合，A是S的一个子集，由S中所有不属于A的元素组成的集合，叫做子集A在S中的绝对补集。在集合论和数学的其他分支中，存在补集的两种定义：相对补集和绝对补集。

![800003022.jpg](https://gitee.com/hejf01/pic/raw/master/8601a18b87d6277fc79bbcee2a381f30e824fc5f.jfif)

这样一个需求，原数组arr1，组件返回数组arr2，最后需要目标数组targetArr

目标数组targetArr中包含arr1与arr2相同的部分，并且删除arr1不在arr2中的元素

分析：

1. 创建一个新的数组，取arr1与arr2的交集
2. 再创建一个数组，取arr2在arr1中的补集
3. 合并两个创建的数据，得到targetArr

```javascript
        let arr1 = [{id: 1, name: '123'}]
        let arr2 = [{id: 1, name: '123'},{id:2, name: '222'}]
        const arr1Ids = arr1.map(d => d.id)
        const arr2Ids = arr2.map(d => d.id)
        const arr3 = arr2.map(t => {
          if (!arr1.includes(t.id)) {
            return t
          }
        })
        // arr3即为两个数组的差集
        const arr4 = arr1.map(t => {
         if (arr2Ids.includes(t.id)) {
              return t
            }
        })
        // arr4为arr2在arr1中的补集
        this.form.dtoList = [...arr3.filter(a => a), ...arr4.filter(a => a)]
```

这样一个例子，是项目中常用到的一个算法，也许会有更简单的，目前这是我自己的想法。

guozhi-web\src\pages\slcs\viewService\adminActivity\SlcsCreate.vue --- 217
