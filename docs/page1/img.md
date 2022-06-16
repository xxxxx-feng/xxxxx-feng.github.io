```javascript
const getImageHeight = () => {
  return new Promise((resolve) => {
    let img = new Image();
    img.onload = () => {
      resolve(img.height);
      // img.width
    };
    img.src =
      "https://s1.meixiu.mobi/android-images/2021-10-13/359afa5d3e474b2f83595a4cc8875e7f.jpeg";
  });
};
getImageHeight().then((res) => {});
```
