#### scp2 插件

1. 安装
   
   `npm install scp2 或者yarn add scp2`
2. 根目录下创建deloy文件夹，加入构建js
   ```javascript
   const scpClient = require("scp2");
   const ora = require("ora");
   const chalk = require("chalk");
   const spinner = ora("正在发布到服务器...");
   var Client = require("ssh2").Client; // 连接服务器
   var conn = new Client();
   const serve = {
       name: 'A-生产环境',
       domain: 'www.prod.com',// 域名
       host: '47.96.228.199',// ip
       port: 22,// 端口
       username: '', // 登录服务器的账号
       password: '',// 登录服务器的账号
       path: '/usr/my-blog/blob-serve/public/dist' // 发布至静态服务器的项目路径
   }
   conn
     .on("ready", function() {
       // rm 删除dist文件，\n 是换行 换行执行 重启nginx命令 我这里是用docker重启nginx
       // /usr/my-blog/blob-serve/public/dist 服务器端存放打包后的地址
       conn.exec("rm -rf /usr/my-blog/blob-serve/public/dist", function(
         err,
         stream
       ) {
         if (err) throw err;
         stream
           .on("close", function(code, signal) {
             // 在执行shell命令后，把开始上传部署项目代码放到这里面
             spinner.start();
             scpClient.scp(
               "./dist",
               {
                 host: server.host,
                 port: server.port,
                 username: server.username,
                 password: server.password,
                 path: server.path,
               },
               function(err) {
                 spinner.stop();
                 if (err) {
                   console.log(chalk.red("发布失败.\n"));
                   throw err;
                 } else {
                   console.log(chalk.green("Success! 成功发布到服务器"));
                 }
               }
             );
             conn.end();
           })
           .on("data", function(data) {
             console.log("STDOUT: " + data);
           })
           .stderr.on("data", function(data) {
             console.log("STDERR: " + data);
           });
       });
     })
     .connect({
       host: server.host,
       port: server.port,  
       username: server.username,
       password: server.password,
     });
   ```

3. package中修改脚本
   
   `"deploy":"npm run build && node ./deploy"`

***注意：gitignore 需要加入  /deploy， 不然你的服务器存在安全隐患，用户名，密码别人可以获取到***
