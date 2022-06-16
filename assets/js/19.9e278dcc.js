(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{382:function(t,s,a){"use strict";a.r(s);var n=a(44),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("专注于业务开发，避免发布项目时频繁切换分支，合并分支及创建 tag 的过程")]),t._v(" "),a("p",[t._v("源码地址：https://github.com/hejianfang/release-tool")]),t._v(" "),a("h3",{attrs:{id:"工作流"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#工作流"}},[t._v("#")]),t._v(" 工作流：")]),t._v(" "),a("ol",[a("li",[t._v("dev，test, prod 本地版本库检测&推送 -> 切换分支 -> 合并分支 -> 推送 -> 返回")]),t._v(" "),a("li",[t._v("online 本地版本库检测&推送 -> 合并分支 -> 创建 tag -> 推送 -> 生成工单")])]),t._v(" "),a("p",[t._v("配置文件：")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 项目信息  用于进行merge request检查")]),t._v("\n    git"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("             "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// git地址 (https或ssh)")]),t._v("\n    projectId"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("       "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// gitlab 项目id")]),t._v("\n    privateToken"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 非必填")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 各发布阶段对应分支   支持字符串与对象")]),t._v("\n    stages"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        dev"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),t._v("             "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 开发环境")]),t._v("\n        test"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("           "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 测试环境")]),t._v("\n        gray"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("           "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 预发环境")]),t._v("\n        online"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("           "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 生产环境")]),t._v("\n            branch"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            appJob"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("使用到的库：")]),t._v(" "),a("blockquote",[a("p",[t._v("inquirer：交互式命令行美化工具")]),t._v(" "),a("p",[t._v("minimist：轻量级的命令行参数解析引擎")]),t._v(" "),a("p",[t._v("node-fetch：将 Fetch API 引入 Node.js 的轻量级模块")]),t._v(" "),a("p",[t._v("npmlog：npm 使用的记录器工具")]),t._v(" "),a("p",[t._v("simple-git：用于在 node.js 应用程序中运行 git 命令的轻量级接口")])])])}),[],!1,null,null,null);s.default=e.exports}}]);