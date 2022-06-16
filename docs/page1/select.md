```javascript
 compactObj(obj) {
      for (var i in obj) {
        if (String(obj[i]) === 'null' || String(obj[i]) === '') {
          delete obj[i]
        }
      }
      return obj
    },
    handleData(condition, data) {
      let newCondition = this.compactObj(condition)
      let newData = data.filter((item) => {
        return Object.keys(newCondition).every((key) => {
          return String(item[key]).toLowerCase().includes(String(newCondition[key]).trim().toLowerCase())
        })
      })
      return newData
    },
```
