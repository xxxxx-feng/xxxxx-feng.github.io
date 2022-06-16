(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{378:function(e,t,_){"use strict";_.r(t);var a=_(44),v=Object(a.a)({},(function(){var e=this,t=e.$createElement,_=e._self._c||t;return _("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[_("ol",[_("li",[e._v("前端写代码时为了方便会将代码写在许多文件中，但是转化成HTML代码时，会使用 "),_("code",[e._v("<script>")]),e._v("标签进行引入js代码，这样会使页面进行的http衍生请求次数的次数增多，页面加载耗能增加。使用打包过后将许多零碎的文件打包成一个整体，页面只需请求一次，js文件中使用模块化互相引用（export、import ），这样能在一定程度上提供页面渲染效率。")]),e._v(" "),_("li",[e._v("打包同时会进行编译，将ES6、Sass等高级语法进行转换编译，以兼容高版本的浏览器。")]),e._v(" "),_("li",[e._v("将代码打包的同时进行混淆，提高代码的安全性")])]),e._v(" "),_("h5",{attrs:{id:"必须要打包吗"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#必须要打包吗"}},[e._v("#")]),e._v(" 必须要打包吗？")]),e._v(" "),_("p",[e._v("上文提到的HTML需要引用有很多文件会导致请求的数量很多，但如果页面请求一次的话页面需要将许多次请求压缩成一次，就会导致页面第一次加载很慢，这也是打包过程中的一个弊端。\n但是反过来想，假如这个工程很小，那么打包还是必需的吗？为了提升一点点的效率需要多加很多的工作量，这样明显是划不来的。\n其次，打包另一个重要作用是编译，将浏览器无法识别的ES6等高级语法编辑成浏览器可识别的ES5语法，但假如有一天浏览器可以识别ES6甚至ES7等语法，那么Babel、webpack就不是必须的了。")]),e._v(" "),_("p",[e._v("但是目前为止浏览器版本、项目量级导致现在打包还是比较有必要的。")]),e._v(" "),_("h5",{attrs:{id:"打包工具"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#打包工具"}},[e._v("#")]),e._v(" 打包工具")]),e._v(" "),_("p",[e._v("webpack：")]),e._v(" "),_("ol",[_("li",[e._v("是一个用于现代 JavaScript 应用程序的_静态模块打包工具_。当 webpack 处理应用程序时，它会在内部构建一个"),_("u",[e._v(" 依赖图(dependency graph)")]),e._v("，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。")])]),e._v(" "),_("p",[e._v("依赖图(dependency graph) ：")]),e._v(" "),_("ol",[_("li",[_("p",[e._v("每当一个文件依赖另一个文件时，webpack都会将文件视为直接存在 "),_("em",[e._v("依赖关系")]),e._v(" 。这使得 webpack可以获取非代码资源，如images或web字体等。并会把它们作为 "),_("em",[e._v("依赖")]),e._v("  提供给应用程序。")])]),e._v(" "),_("li",[_("p",[e._v("当 webpack 处理应用程序时，它会根据命令行参数中或配置文件中定义的模块列表开始处理。 从入口开始，webpack 会递归的构建一个_依赖关系图_，这个依赖图包含着应用程序中所需的每个模块，然后将所有模块打包为少量的 bundle —— 通常只有一个 —— 可由浏览器加载。")])])])])}),[],!1,null,null,null);t.default=v.exports}}]);