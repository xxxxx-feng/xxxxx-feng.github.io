专注于业务开发，避免发布项目时频繁切换分支，合并分支及创建 tag 的过程

源码地址：https://github.com/hejianfang/release-tool

### 工作流：

1. dev，test, prod 本地版本库检测&推送 -> 切换分支 -> 合并分支 -> 推送 -> 返回
2. online 本地版本库检测&推送 -> 合并分支 -> 创建 tag -> 推送 -> 生成工单

配置文件：

```javascript
module.exports = {
    // 项目信息  用于进行merge request检查
    git: '',             // git地址 (https或ssh)
    projectId: '',       // gitlab 项目id
    privateToken: '',    // 非必填
    // 各发布阶段对应分支   支持字符串与对象
    stages: {
        dev: ''             // 开发环境
        test: '',           // 测试环境
        gray: '',           // 预发环境
        online: {           // 生产环境
            branch: '',
            appJob: ''
        }
    }
}
```

使用到的库：

> inquirer：交互式命令行美化工具
>
> minimist：轻量级的命令行参数解析引擎
>
> node-fetch：将 Fetch API 引入 Node.js 的轻量级模块
>
> npmlog：npm 使用的记录器工具
>
> simple-git：用于在 node.js 应用程序中运行 git 命令的轻量级接口
