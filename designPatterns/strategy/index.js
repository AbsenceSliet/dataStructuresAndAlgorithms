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
  this.strategy = strategy;
};
Bouns.prototype.getBouns = function () {
  this.strategy.calculate(this.salay);
};

var bouns = new Bouns();
Bouns.setSalay(4000);
Bouns.setStrategy(levelS);
Bouns.getBouns();

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
 */
