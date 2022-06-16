```javascript
      const walkAndCopy = (tree) => {
          const copy = {}
          copy.name = tree.name
          copy.id = tree.id
          copy.parentId = tree.parentId
          if (tree.children) {
            copy.children = []
            tree.children.forEach((node) => {
              const subTree = walkAndCopy(node)
              subTree && copy.children.push(subTree)
            })
          }
          return copy
        }
        // walkAndCopy
        const handleTree = (list, parentId = null) => {
          const copy = []
          list.forEach((node, index) => {
            node.sortIndex = index + 1
            node.parentId = parentId
            copy.push(walkAndCopy(node))
          })
          return copy
        }
        handleTree(data)
```
