/**
 * 传统的代码实现
 * 计算奖金
 * @param {level} string
 * @param {salay} number
 * @return {number}
 * 此函数比较庞大 ，里面包含各种ifelse
 * 函数缺乏弹性，如果要修改levelS的 绩效标准，还需要深入函数内部去实现
 */
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

/**
 * 使用策略模式,基于面向对象的策略模式
 * 策略模式包含两部分，一部分是策略类,包含各种算法,负责具体的计算;另一部分是context环境类,context接受用户请求，并把请求委托给某一个策略类
 */
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

/**
 * 基于js 的策略模式
 */
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

/**
 * 使用策略模式实现一个表单校验
 * Validator类
 *
 * 添加规则：validator.add( registerForm.userName, 'isNonEmpty', '用户名不能为空' );
 * 获得校验结果: validator.start()
 */
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
