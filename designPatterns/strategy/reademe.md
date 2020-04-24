# 策略模式

定义一系列的算法，把他门一个个封装起来，并且使它们可以相互转换

来看一段代码

```js
var calculateBonus = function (level, salay) {
  if (level === "S") {
    return salay * 5;
  }
  if (level === "A") {
    return salay * 4;
  }
  if (level === "B") {
    return salay * 3;
  }
};

calculateBonus("S", 3000);
calculateBonus("A", 2000);
```

此函数比较庞大 ，里面包含各种 ifelse

函数缺乏弹性，如果要修改 levelS 的 绩效标准，还需要深入函数内部去实现

#### 基于面向对象的策略模式修改一瓣

```js
var levelS = function () {};
levelS.prototype.calculate = function (salay) {
  return salay * 5;
};
var levelA = function () {};
levelA.prototype.calculate = function (salay) {
  return salay * 4;
};
var levelB = function () {};
levelB.prototype.calculate = function (salay) {
  return salay * 3;
};
// context 部分

var Bouns = function () {
  this.salay = null;
  this.strategy = null;
};
Bouns.prototype.setSalay = function (salay) {
  this.salay = salay;
};

Bouns.prototype.setStrategy = function (strategy) {
  console.log(strategy, "strategy");
  this.strategy = strategy;
};
Bouns.prototype.getBouns = function () {
  console.log(this.strategy, "9999");
  this.strategy.calculate(this.salay);
};

var bouns = new Bouns();
bouns.setSalay(4000);
bouns.setStrategy(new levelS());
bouns.getBouns();
```

策略模式包含两部分，一部分是策略类,包含各种算法,负责具体的计算;另一部分是 context 环境类,context 接受用户请求，并把请求委托给某一个策略类

#### js 的策略模式

```js
var strategies = {
  S: function (salay) {
    return salay * 5;
  },
  A: function (salay) {
    return salay * 4;
  },
  B: function (salay) {
    return salay * 3;
  },
};
var calculate_Bouns = function (level, salay) {
  return strategies[level](salay);
};
calculate_Bouns("S", 3000);
```

contet 没必要使用 Bouns 类表示， 使用函数`calculate_Bouns`充当 context，接受用户的计算请求

#### 使用策略模式实现一个表单验证

`validator` 类

添加规则：`validator.add( dom, [{ strategy: 'isNonEmpty', errorMsg: '用户名不能为空' }, { strategy: 'minLength:6', errorMsg: '用户名长度不能小于 10 位' }]`;

获得校验结果: `validator.start()`

```js
(function (global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory;
  } else {
    factory(global);
  }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
  var strategies = {
    isNonEmpty: function (value, errorMsg) {
      if (value === "") {
        return errorMsg;
      }
    },
    minLength: function (value, length, errorMsg) {
      if (value.length < length) {
        return errorMsg;
      }
    },
    isMobile: function (value, errorMsg) {
      // 手机号码格式
      if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
        return errorMsg;
      }
    },
  };
  var Validator = function () {
    this.cache = [];
  };

  Validator.prototype.add = function (dom, rules) {
    var self = this;
    for (var i = 0; i < rules.length; i++) {
      (function (rule) {
        var ary = rule.strategy.split(":");
        self.cache.push(function () {
          var strategy = ary.shift();
          ary.unshift(dom.value);
          ary.push(rule.errorMsg);
          return strategies[strategy].apply(dom, ary);
        });
      })(rules[i]);
    }
  };
  Validator.prototype.start = function () {
    for (var i = 0, validatorFunc; (validatorFunc = this.cache[i++]); ) {
      var msg = validatorFunc();
      if (msg) return msg;
    }
  };
  if (typeof noGlobal === "undefined") {
    window.Validator = window.V = Validator;
  }
});
```

---

#### 策略模式的优缺点

- 策略模式利用组合、委托和多态等技术和思想,可以有效地避免多重条件选择语句
- 策略模式提供了对*开放—封闭*原则的完美支持,将算法封装在独立的 `strategy` 中,使得它们易于切换,易于理解,易于扩展
- 策略模式中的算法也可以复用在系统的其他地方,从而避免许多重复的复制粘贴工作
- 在策略模式中利用组合和委托来让 `Context` 拥有执行算法的能力,这也是继承的一种更轻便的替代方案。

缺点

- 使用策略模式必须要了解所有的`strategy`, `strategy` 这时会暴露它的所有实现，违反最少知识的原则

### 结语

js 的策略模式中，策略类往往被函数替代，这时策略模式就成为了一种<label style="color:red">隐形</label>的模式
