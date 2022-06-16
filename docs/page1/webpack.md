### webpack.DefinePlugin

> DefinePlugin 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。如果在开发构建中，而不在发布构建中执行日志记录，则可以使用全局常量来决定是否记录日志。这就是 DefinePlugin 的用处，设置它，就可以忘记开发和发布构建的规则。

- 用法

> 1. 每个传进 DefinePlugin 的键值都是一个标志符或者多个用 . 连接起来的标志符。
> 2. 如果这个值是一个字符串，它会被当作一个代码片段来使用。
> 3. 如果这个值不是字符串，它会被转化为字符串(包括函数)。
> 4. 如果这个值是一个对象，它所有的 key 会被同样的方式定义。
> 5. 如果在一个 key 前面加了 typeof,它会被定义为 typeof 调用。
> 6. 这些值会被内联进那些允许传一个代码压缩参数的代码中，从而减少冗余的条件判断。

```javascript
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify("5fa3b9"),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: "1+1",
  "typeof window": JSON.stringify("object")
})
```

```javascript
console.log("Running App version " + VERSION);
if(!BROWSER_SUPPORTS_HTML5) require("html5shiv");
```

> 注意，因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号。通常，有两种方式来达到这个效果，使用 '"production"', 或者使用 JSON.stringify('production')。
> 
> 1 这是一个定义全局变量的插件,定义的变量可以在webpack打包范围内任意javascript环境内访问,甚至在项目根目录之外的js里也可以使用(前提是这个js被项目引用)
2 使用字符串或JSON.stringify()转换值,推荐使用JSON.stringify(),可以转换json对象

config/env.js

```javascript
const env = process.env.NODE_ENV;
const config = {
  development: {
    api: 'www.baidu.com'
  },
  production: {
    api: 'www.jd.com'
  }
};
module.exports = config[env];
```

webpack.config.js

```
const envConfig= require('./config/env');
module.exports = {
  ...
  plugins: [
    new webpack.DefinePlugin({
      envConfig: JSON.stringify(envConfig)
    })
  ]
  ...
}

// 输出
console.log(envConfig) // {api: "www.baidu.com"}
```
