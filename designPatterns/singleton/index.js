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
/**
 *
 * @param {*} nums1
 * @param {*} m
 * @param {*} nums2
 * @param {*} n
 *  如果prenums[p1]> nums2[p2] ===>nums[current] = nums[p2]
 * var nums1 = [1, 2, 3, 0, 0, 0],
  nums2 = [2, 5, 6],
  p1 ----0  prenums[p1] ---1
  p2----0   nums2[p2] ----2
 */
// var merge = function (nums1, m, nums2, n) {
//   var pre_nums = JSON.parse(JSON.stringify(nums1));

//   var p1 = 0,
//     p2 = 0;
//   var current = 0;
//   while (p1 < m && p2 < n) {
//     nums1[current++] = pre_nums[p1] < nums2[p2] ? pre_nums[p1++] : nums2[p2++];
//   }
//   if (p1 < m) {
//     nums1.splice(current, m - p1, ...pre_nums.slice(p1, m));
//   }
//   if (p2 < n) {
//     nums1.splice(current, n - p2, ...nums2.slice(p2, n));
//   }
//   console.log(nums1, "99999", current, p1, p2);
// };
// var merge = function (nums1, m, nums2, n) {
//   var p1 = m - 1,
//     p2 = n - 1,
//     current = m + n - 1;
//   while (p1 >= 0 && p2 >= 0) {
//     nums1[current--] = nums1[p1] < nums2[p2] ? nums2[p2--] : nums1[p1--];
//   }
//   if (p2 >= 0) {
//     nums1.splice(0, current + 1, ...nums2.splice(0, p2 + 1));
//   }
// };

// var nums1 = [3, 4, 5],
//   nums2 = [1, 2, 5, 6, 8],
//   m = 3,
//   n = 5;
// merge(nums1, m, nums2, n);

var maxProfit = function (prices) {
  if (prices.length < 2) {
    return 0;
  }
  let diff = [];
  for (let i = 0; i < prices.length - 1; i++) {
    diff[i] = prices[i + 1] - prices[i];
  }

  let dp = new Array(prices.length).fill(0);
  dp[0] = Math.max(0, diff[0]);
  let max = dp[0];
  for (let i = 1; i < diff.length; i++) {
    dp[i] = Math.max(0, dp[i - 1] + diff[i]);
    max = Math.max(max, dp[i]);
  }
  return max;
};
var a = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(a));

var a1 = [0, 0, 1, 2];
var twoSum = function (numbers, target) {
  var len = numbers.length;
  var start = 0;
  var end = len - 1;
  while (start < end) {
    if (numbers[start] + numbers[end] === target) {
      return [start + 1, end + 1];
    } else if (numbers[start] + numbers[end] < target) {
      start++;
    } else {
      end--;
    }
  }

  return [];
};
console.log(twoSum(a1, 0));

var majorityElement = function (nums) {
  let len = nums.length;
  let count = 0;
  let res = [];
  for (let i = 0; i < len; i++) {
    let num = nums[i];
    if (count === 0) {
      res = num;
    }
    let step = res == num ? 1 : -1;
    count += step;
  }
  return res;
};
var a3 = [3, 3, 4, 4, 5, 4];
console.log(majorityElement(a3));
