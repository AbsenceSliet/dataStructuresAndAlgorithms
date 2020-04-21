# 单例模式

保证一个类仅有一个实例，并且提供一个访问它的全局访问点

一些对象往往只需一个，譬如线程池、全局缓存、浏览器中的 window 对象

### 实现单例模式

```js
var Singleton = function (name) {
  this.name = name;
  this.instance = null;
};
Singleton.prototype.getName = function () {
  return this.name;
};
Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  console.log(this, name);
  return this.instance;
};
var a = Singleton.getInstance("test1");
var b = Singleton.getInstance("test2");

console.log(a, b);
console.log(a === b); //true
//  另一种写法

var Singleton1 = function (name) {
  this.name = name;
  this.instance = null;
};
Singleton1.prototype.getName = function () {
  return this.name;
};
Singleton1.getInstance = (function () {
  var instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton1(name);
    }
    return instance;
  };
})();
var a1 = Singleton1.getInstance("test1");
var b2 = Singleton1.getInstance("test2");
console.log(a1, b1);
console.log(a1 === b1); //true
//  a 和 b 是同一个实例
```

---

### 透明的单例模式

```js
/**
 * 透明的单例模式
 * 实现一个单例类 CreateDiv  负责在页面上创建一个节点
 */
var CreateDiv = (function () {
  var instance;
  var CreateDiv = function (html) {
    //  返回了同一个实例
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();
    console.log(this); // 实例本身
    return (instance = this);
  };
  CreateDiv.prototype.init = function () {
    var div = document.createElement("div");
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };
  return CreateDiv;
})();
var a2 = new CreateDiv("test1");
var b2 = new CreateDiv("test2");
console.log(a2, b2);
console.log(a2 === b2); //true
// CreateDiv 做了两件事情 ,第一创建instance 并且执行初始化init函数,第二保证只有一个对象即instance
```

假设某天要利用这个类，创建很多个 div，此时这个类是不适用的， 还要去改`CreateDiv`这个构造函数，把控制创建唯一对象抹去， 这显然是很麻烦的。

### 用代理实现单例模式

使用代理实现单例模式可以解决上述问题

```js
/**
 * 使用代理实现单例模式
 */
var CreateDiv1 = function (html) {
  this.html = html;
  this.init();
};
CreateDiv1.prototype.init = function () {
  var div = document.createElement("div");
  div.innerHTML = this.html;
  document.body.appendChild(div);
};
// 引入代理lei proxySingletonCreatediv
var proxySingletonCreatediv = (function () {
  var instance;
  return function (html) {
    if (!instance) {
      instance = new CreateDiv1(html);
    }
    return instance;
  };
})();
var a3 = new proxySingletonCreatediv("test1");
var b3 = new proxySingletonCreatediv("test2");
console.log(a3, b3, a3 === b3); // true
```

通过引入代理类 同样实现了单例模式， 只是将功能区分开， 使用 proxySingletonCreatediv 管理单例的逻辑,CreateDiv1 只是一个普通的创建 div 类

### js 中的单例模式

在以类为中心的语言中， 创建一个对象，首先要定义一个类，譬如在`Java`中,而 js 是一门无类语言，因此照搬单例模式毫无意义

单例模式的核心是<label style="color:red">**确保只有一个实例，并且提供全局访问**</label>

全局变量不是单例模式,但在 js 开发中，常常把全局变量当做单例使用,但同时，如果全局变量使用过多，会造成命名空间污染

#### 在 js 中使用一下几种方式降低全局变量带来的命名污染

- 使用命名空间

  ```js
  var nameSpace1 = {
    a: 1,
    b: function () {},
  };
  ```

  还可以动态创建命名空间

  ```js
  var myApp = {};
  myApp.nameSpace = function (name) {
    var parts = name.split(".");
    var current = myApp;
    for (var i in parts) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }
  };
  ```

- 使用闭包封装私有变量

  把一些变量封装在闭包内部，只暴露一些接口

  ```js
  var user = (function () {
    var _name = "a1";
    var _age = "20";
    return {
      getUserInfo: function () {
        return _name + "-" + _age;
      },
    };
  })();
  ```

### 惰性单例

在需要的时候才会去创建对象实例。

例如在开始创建单例模式的时候，`getInstance`方法中

```js
Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  console.log(this, name);
  return this.instance;
};
```

### 通用的惰性单例

要将创建实例对象的职责和管理单例的职责分开，将其放在两个方法中

创建一个 Div

```js
var CreateDiv = (function () {
  var div;
  return function () {
    if (!div) {
      var div = document.createElement("div");
      document.body.appendChild(div);
    }
    return div;
  };
})();
```

在上述例子中， 使用一个变量来标志是否创建了对象，如果创建了，则直接返回已经创建好的对象。可以将其抽离出来，

```js
if (!obj) {
  obj = "";
}
```

例子中虽然可以满足创建一个 div 的需求， 可是如果改为创建一个 script、iframe，这时还要去修改里面的代码，就显得很繁琐。此时应该将创建实例对象的逻辑和管理单例的逻辑分开。将管理单例的逻辑放在`getSingle`中

```js
var getSingle = function (fn) {
  var result;
  return function () {
    return (result || result = fn.apply(this, arguments));
  };
};
```

将创建实例对象用参数 fn 的方式传入`getSingle`中，使用 result 保存 fn 的结果，result 在闭包中，永远不会被销毁(除非手动销毁),在将来的请求中若 result 已被赋值，则直接返回即可

---

### 小结

惰性单例技术，在合适的时候创建对象，并且只创建唯一的一个。在`getInstance`方法中， 将创建对象实例和管理单例逻辑放在两个方法中， 这个是很关键的一点。
