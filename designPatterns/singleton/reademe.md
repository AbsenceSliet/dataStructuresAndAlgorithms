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
