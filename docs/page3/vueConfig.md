vue-lic3脚手架（vue.config.js）

##### publicPath

类型：String

默认：'/'

部署应用包时的基本 URL。默认情况下，Vue CLI会假设你的应用是被部署在一个域名的根路径上，例如https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在https://www.my-app.com/my-app/，则设置publicPath为/my-app/

这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，也可以用在类似 Cordova hybrid 应用的文件系统中。

##### productionSourceMap

类型：boolean

默认：true

不允许打包时生成项目来源映射文件，在生产环境下可以显著的减少包的体积

> 注 Source map的作用：针对打包后的代码进行的处理，就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便

##### assetsDir

放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录,默认是''

##### indexPath

指定生成的 index.html 的输出路径(相对于outputDir)。也可以是一个绝对路径。默认是'index.html'

##### lintOnSave

是否在每次保存时使用eslint检查，这个对语法的要求比较严格，对自己有要求的同学可以使用

##### css

```javascript
css: {
    //是否启用css分离插件，默认是true，如果不启用css样式分离插件，打包出来的css是通过内联样式的方式注入至dom中的，
    extract: true,
    sourceMap: false,//效果同上
    modules: false,// 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
  }
```

##### devServer

本地开发服务器配置

##### pluginOptions

这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项，例如：

```javascript
{
    //定义一个全局的less文件，把公共样式变量放入其中，这样每次使用的时候就不用重新引用了
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        './src/assets/public.less'
      ]
    }
}
```

##### chainWebpack

是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。例如：

```javascript
chainWebpack(config) { 
//添加一个路径别名 假设有在assets/img/menu/目录下有十张图片，如果全路径require("/assets/img/menu/img1.png")
//去引入在不同的层级下实在是太不方便了，这时候向下方一样定义一个路劲别名就很实用了
    config.resolve.alias
      //添加多个别名支持链式调用
      .set("assets", path.join(__dirname, "/src/assets"))
      .set("img", path.join(__dirname, "/src/assets/img/menu"))
      //引入图片时只需require("img/img1.png");即可
}
```
