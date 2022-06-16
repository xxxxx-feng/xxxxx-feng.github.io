**js跨域如何解决**

目前暂时已知的跨域方法是：

1. jsonp跨域，原理：script标签没有跨域限制的漏洞实现的一种跨域方法，只支持get请求。安全问题会受到威胁。
2. cors跨域，通过后端服务器实现，Access-Control-Allow-Origin。
3. postMessage window的一个属性方法。
4. websocket
5. nginx反向代理
6. iframe跨域

**webpack proxy跨域**

首先需要明白webpack proxy跨域只能用作与开发阶段，临时解决本地请求服务器产生的跨域问题。并不适合线上环境。配置在webpack的devServer属性中。webpack中的devsever配置后，打包阶段在本地临时生成了一个node服务器，浏览器请求服务器相当于请求本地服务。