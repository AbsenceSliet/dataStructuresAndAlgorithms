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
var b1 = Singleton1.getInstance("test2");
console.log(a1, b1);
console.log(a1 === b1); //true
//  a 和 b 是同一个实例

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

// 通过引入代理类 同样实现了单例模式， 只是将功能区分开， 使用proxySingletonCreatediv 管理单例的逻辑,CreateDiv1只是一个普通的创建div类

var myApp = {};
myApp.nameSpace = function (name) {
  var parts = name.split(".");
  var current = myApp;
  for (var i in parts) {
    console.log(parts[i], current);
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
};
// myApp.nameSpace("test");
// myApp.nameSpace("test1.a");
myApp.nameSpace("test2.b.c");
console.log(myApp);
