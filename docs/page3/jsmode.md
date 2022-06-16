1. **单例模式**

单例模式的定义是，保证一个类仅有一个实例，并提供一个访问它的全局访问点。

有一些对象，比如线程池/全局缓存/浏览器中的 window 对象等等，我们只需要一个实例。

开发中的VUE实例

```javascript
const createLoginLayer = () => {
    const div = document.createElement('div')
    div.innerHTML = '我是登录弹窗'
    div.style.display = 'none'
    console.log(123)

    document.body.appendChild(div)
    return div
}
const createSingle = (function () {
    var instance = {}
    return function (fn) {
        if (!instance[fn.name]) {
            instance[fn.name] = fn.apply(this, arguments)
        }
        return instance[fn.name]
    }
})()
const createIframe = function () {
    const iframe = document.createElement('iframe')
    document.body.appendChild(iframe)
    iframe.style.display = 'none'
    return iframe
}
const createSingleLoginLayer = createSingle(createLoginLayer)
const createSingleIframe = createSingle(createIframe)
document.getElementById('loginBtn').onclick = () => {
    const loginLayer = createSingleLoginLayer
    const iframe = createSingleIframe
    loginLayer.style.display = 'block'
    iframe.style.display = 'block'
}
```

> 将创建实例对象 createLoginLayer / createIframe 的职责和管理单例对象 createSingle 的职责分离，符合单一职责原则；
> 
> 通过闭包存储实例，并进行判断，不管点击登录按钮多少次，只创建一个登录浮窗实例；
> 
> 易于扩展，当下次需要创建页面中唯一的 iframe / script 等其他标签时，可以直接复用该逻辑。

2. **策略模式**

策略模式的定义是，定义一系列算法，把它们一个个封装起来，并且使它们可以相互替换。

```javascript
// 表单校验
// 表单dom
const registerForm = document.getElementById('registerForm')

// 表单规则
const rules = {
    userName: [
        {
            strategy: 'isNonEmpty',
            errorMsg: '用户名不能为空'
        },
        {
            strategy: 'minLength:10',
            errorMsg: '用户名长度不能小于10位'
        }    
    ],
    password: [
        {
            strategy: 'minLength:6',
            errorMsg: '密码长度不能小于6位'
        }
    ],
    phoneNumber: [
        {
            strategy: 'isMobile',
            errorMsg: '手机号码格式不正确'
        }
    ]
}

// 策略类
var strategies = { 
    isNonEmpty: function(value, errorMsg) { 
        if (value === '') { 
            return errorMsg; 
        } 
    },
     minLength: function(value, errorMsg, length) { 
        console.log(length)
        if (value.length < length) { 
            return errorMsg; 
        } 
    },
     isMobile: function(value, errorMsg) { 
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) { 
            return errorMsg; 
        } 
    } 
};  

// 验证类
const Validator = function () {
    this.cache = []
}

// 添加验证方法
Validator.prototype.add = function ({ dom, rules}) {
    rules.forEach(rule => {
        const { strategy, errorMsg } = rule
        console.log(rule)
        const [ strategyName, strategyCondition ] = strategy.split(':')
        console.log(strategyName)
        const { value } = dom
        this.cache.push(strategies[strategyName].bind(dom, value, errorMsg, strategyCondition))
    })
}

// 开始验证
Validator.prototype.start = function () {
    let errorMsg
    this.cache.some(cacheItem => {
            const _errorMsg = cacheItem()
            if (_errorMsg) {
                    errorMsg = _errorMsg
                    return true
            } else {
                    return false
            }
    })

    return errorMsg
}

// 验证函数
const validatorFn = () => {
    const validator = new Validator()
    console.log(validator.add)

    Object.keys(rules).forEach(key => {
        console.log(2222222, rules[key])
        validator.add({
            dom: registerForm[key],
            rules: rules[key]
        })
    })

    const errorMsg = validator.start()
    return errorMsg
}


// 表单提交
registerForm.onsubmit = () => {
    const errorMsg = validatorFn()
    if (errorMsg) {
        alert(errorMsg)
        return false
    }
    return false
}
```

> 策略模式是一种常用且有效的设计模式
> 
> 策略模式利用组合/委托和多态等技术和思想，可以有效的避免多重条件选择语句；
> 
> 策略模式提供了对开放-封闭原则的完美支持，将算法封装中独立的策略类中，使得它们易于切换/理解/扩展；
> 
> 在策略模式中利用组合和委托来让 Context 拥有执行算法的能力，这也是继承的一种更轻便的代替方案。

3. **代理模式**

代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。 代理模式的关键是，当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问。

```javascript
const Flower = function () {
    return '玫瑰🌹'
}

const xiaoming = {
    sendFlower: target => {
        const flower = new Flower()
        target.receiveFlower(flower)
    }
}

const xiaodai = {
    receiveFlower: flower => {
        xiaobai.listenGoodMood().then(() => {
            xiaobai.receiveFlower(flower)
        })
    }
}

const xiaobai = {
    receiveFlower: flower => {
        console.log('收到花', flower)
    },
    listenGoodMood: fn => {
        return new Promise((reslove, reject) => {
            // 10秒后，心情变好
            reslove()
        })
    }
}

xiaoming.sendFlower(xiaodai)
```

> 小明通过小代，监听到小白心情的心情变化，选择在小白心情好时送花给小白。不仅如此，小代还可以做以下事情：
> 
> 帮助小白过滤掉一些送花的请求，这就叫做保护代理；
> 
> 帮助小明，在小白心情好时，再执行买花操作，这就叫做虚拟代理。虚拟代理把一些开销很大的对象，延迟到真正需要它的时候才去创建。

```javascript
const myImage = (() => {
    const imgNode = document.createElement('img')
    document.body.appendChild(imgNode)

    return {
        setSrc: src => {
            imgNode.src = src
        }
    }
})()

const loadingSrc = '../../../../img/loading.gif'
const imgSrc = 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa98e67c4708449eb6894c7133d93774~tplv-k3u1fbpfcp-watermark.image'

const proxyImage = (function () {
    const img = new Image()
    img.onload = () => {
        myImage.setSrc(img.src)
    }

    return {
        setSrc: src => {
            myImage.setSrc(loadingSrc)
            img.src = src
        }
    }
})()

proxyImage.setSrc(imgSrc)
```

> 通过 proxyImage 控制了对 MyImage 的访问，在 MyImage 未加载成功之前，使用 loading 图占位；
> 
> 践行单一职责原则，给 img 节点设置 src 的函数 MyImage，预加载图片的函数 proxyImage，都只有一个职责；
> 
> 践行开放-封闭原则，给 img 节点设置 src 和预加载图片的功能，被隔离在两个对象里，它们可以各自变化不影响对方。

```javascript
(async function () {
  function getArticle (currentPage, pageSize) {
    console.log('getArticle', currentPage, pageSize)
    // 模拟一个ajax请求
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        data: {
          list: [],
          total: 10,
          params: {
            currentPage, 
            pageSize
          }
        }
      })
    })
  }
  const proxyGetArticle = (() => {
    const caches = []
    return async (currentPage, pageSize) => {
      const cache = Array.prototype.join.call([currentPage, pageSize],',')
      if (cache in caches) {
        return caches[cache]
      }
      const { data, ok } = await getArticle(currentPage, pageSize)

      if (ok) {
        caches[cache] = data
      }
      return caches[cache]
    }
  })()
  // 搜索第一页
  await proxyGetArticle(1, 10)
  // 搜索第二页
  await proxyGetArticle(2, 10)
  // 再次搜索第一页
  await proxyGetArticle(1, 10)
})()
```

> 通过缓存代理，在第二次请求第一页的数据时，直接在缓存数据中拉取，无须再次从服务器请求数据。

4. **观察者模式**

观察者模式建立了一套触发机制，帮助我们完成更松耦合的代码编写。但是也不能过度使用，否则会导致程序难以追踪和理解。

当对象之间存在一对多的依赖关系时，其中一个对象的状态发生改变，所有依赖它的对象都会收到通知，这就是观察者模式。

示例：双向数据绑定

```javascript
/**
 * 新建发布-订阅对象
 * subscrib：订阅函数，当其他对象添加订阅消息时，将回调函数 push 进 callbacks 对象数组中；
 * publish：发布函数，当发布消息时，触发 callbacks 中该消息对应的 callback.
 * 1. 订阅事件，把事件放入事件池，此时不会执行
 * 2. 发布事件，从事件池中找出对应事件进行执行
 */
/**
 *  姓名：<input v-model="user.name" type="text" /> <br />
    年龄：<input v-model="user.age" type="text" /> <br />
    输入的姓名是<span v-model="user.name"></span> <br />
    输入的年龄是<span v-model="user.age"></span> <br />
 */
const Pubsub = {
  subscrib(ev, cb) {
    this._callbacks || (this._callbacks = {});
    (this._callbacks[ev] || (this._callbacks[ev] = [])).push(cb);
  },
  publish() {
    const args = [...arguments];
    const ev = args.shift();
    if (!this._callbacks) return;
    if (!this._callbacks[ev]) return;
    this._callbacks[ev].forEach((callback) => {
      callback(...args);
    });
  },
};
// 添加onchange/onkeyup事件，触发时，发布ui更新消息 start
function eventHander(e) {
  const { target } = e;
  const { value } = target;
  const propNameWhole = target.getAttribute("v-model");
  if (propNameWhole) {
    const [, propName] = propNameWhole.split(".");
    // 发布ui更新消息
    Pubsub.publish("ui-update-event", propName, value);
  }
}
document.addEventListener("change", eventHander, false);
document.addEventListener("keyup", eventHander, false);
class Bind {
  constructor() {
    this.modelName = "";
  }
  initModel({ modelName }) {
    this.modelName = modelName;
    // 订阅ui更新消息
    Pubsub.subscrib("ui-update-event", (propName, propValue) => {
      this.updateModalData(propName, propValue);
    });
    // 订阅model更新消息，更新后所有符合条件的dom节点都会收到通知，进行更新
    Pubsub.subscrib("model-update-event", (propNameWhole, propValue) => {
      const elements = document.querySelectorAll(
        `[v-model="${propNameWhole}"]`
      );
      elements.forEach((element) => {
        const elementTagName = element.tagName.toLowerCase();
        const formTypeTagNames = ["input", "select", "textarea"];
        if (formTypeTagNames.includes(elementTagName)) {
          element.value = propValue;
        } else {
          element.innerHTML = propValue;
        }
      });
    });
  }
  loadModalData(modelData) {
    for (let propName in modelData) {
      this.updateModalData(propName, modelData[propName]);
    }
  }
  updateModalData(propName, propValue) {
    // 在BindL类上拓展属性
    // 便于this访问
    eval(this.modelName)[propName] = propValue;
    // 发布model更新消息
    Pubsub.publish(
      "model-update-event",
      `${this.modelName}.${propName}`,
      propValue
    );
  }
}
const user = new Bind();
user.initModel({
  modelName: "user",
});
user.loadModalData({
  name: "HJ",
  age: "18",
});
function incAge() {
  this.updateModalData("age", this.age / 1 + 1);
}
incAge.bind(user)();

```

模拟实现一次v-model指令的源码，并不是真正的源码

5. **装饰器模式**

装饰器模式就是给对象动态增加功能。

场景：数据上报

```javascript
const after = function (fn, afterFn) {
    return function () {
        fn.apply(this, arguments)
        afterFn.apply(this, arguments)
    }
}
const showLogin = function () {
    console.log('去登录')
}
const log = function () {
    console.log('去上报')
}
const loginBtnClick = after(showLogin, log)
loginBtnClick()
```

6. **职责链模式**

职责链模式就是当一个对象 a，有多种可能的请求对象 b、c、d、e 时，我们为 b、c、d、e 分别定义一个职责，组成一条职责链，这样 a 只需要找到 b 发起请求，然后沿着职责链继续请求，直到找到一个对象来处理 a。

```javascript
const Chain = function (fn) {
  this.fn = fn;
  this.successor = null;
};
Chain.prototype.setNextSuccessor = function (successor) {
  return (this.successor = successor);
};
Chain.prototype.passRequest = function () {
  const ret = this.fn.apply(this, arguments);
  if (ret === "nextSuccessor") {
    return (
      this.successor &&
      this.successor.passRequest.apply(this.successor, arguments)
    );
  }
  return ret;
};
const order500 = function (orderType) {
  if (orderType === 500) {
    console.log("已预付500定金，享有100优惠券");
  } else {
    return "nextSuccessor";
  }
};
const order200 = function (orderType) {
  if (orderType === 200) {
    console.log("已预付200定金，享有50元优惠券");
  } else {
    return "nextSuccessor";
  }
};
const order0 = function (orderType) {
  if (orderType === 0) {
    console.log("已预付0定金");
  }
};
const chainOrder500 = new Chain(order500);
const chainOrder200 = new Chain(order200);
const chainOrder0 = new Chain(order0);

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrder0);
chainOrder500.passRequest(0);

```

> 通过职责链模式，解耦了请求发送者和多个接收者之间的复杂关系，不再需要知道具体哪个接收者来接收发送的请求，只需要向职责链的第一个阶段发起请求。
