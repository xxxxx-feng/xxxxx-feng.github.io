**什么是 options 请求？**

> HTTP 的 OPTIONS 方法 用于获取目的资源所支持的通信选项。客户端可以对特定的 URL 使用 OPTIONS 方法，也可以对整站（通过将 URL 设置为"*"）使用该方法。
> 
> 用 options 请求去嗅探某个请求在对应的服务器中都支持哪种请求方法。

**options请求的原因？**

因为在跨域的情况下，在浏览器发起"复杂请求"时主动发起的。跨域共享标准规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。

**options请求的作用？**

1. 获取服务器支持的HTTP请求方法；
2. 用来检查服务器的性能。

**什么时候会触发OPTIONS请求?**

当请求满足下述任一条件时，即应首先发送预检请求（使用OPTIONS）：

1. 使用了下面任一 HTTP 方法：

> PUT
> 
> DELETE
> 
> CONNECT
> 
> OPTIONS
> 
> TRACE
> 
> PATCH

2. 人为设置了对 CORS 安全的首部字段集合之外的其他首部字段。该集合为：

> Accept
> 
> Accept-Language
> 
> Content-Language
> 
> Content-Type (but note the additional requirements below)
> 
> DPR
> 
> Downlink
> 
> Save-Data
> 
> Viewport-Width
> 
> Width

3. Content-Type 的值不属于下列之一:

> application/x-www-form-urlencoded
> 
> multipart/form-data
> 
> text/plain
