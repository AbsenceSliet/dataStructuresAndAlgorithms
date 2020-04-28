# 2020 年 4 月 25 日

[min-stack](https://leetcode-cn.com/problems/min-stack/description/?utm_source=LCUS&utm_medium=ip_redirect_q_uns&utm_campaign=transfer2china)

## 题目描述

设计一个支持 `push ，pop ，top` 操作，并能在常数时间内检索到最小元素的栈

- `push(x)`—— 将元素 x 推入栈中。
- `pop()` —— 删除栈顶的元素。
- `top()` —— 获取栈顶元素。
- `getMin()` —— 检索栈中的最小元素。

### 示例

```js
输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
```

#### 提示

- `pop、top 和 getMin` 操作总是在 非空栈 上调用。

### 思路

在每次对栈进行`pop`和`push`操作时 ， 都要去更新最小值 。然后`getmin`返回最小值，这个不是最优的解法，时间复杂度是 O(n)

在入栈的时候， 存入的是当前值与上次值的差值，在`pop`和`top`操作时，只需要拿到栈顶的元素加上**上一个**最小值

求的**上一个**最小值 ，若栈顶元素小于 0，说明栈顶元素是最小元素，出栈会影响 min，上一个最小是，栈 顶元素－上一个 min，如果栈顶元素大于 0，则无影响

### code

```js
/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.stack = [];
  this.min = Number.MAX_VALUE;
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  const min = this.min;
  if (x < this.min) {
    this.min = x;
  }
  this.stack.push(x - min);
};

/**
 * @return {void}
 */
[3, 4][(-1, 1)];
MinStack.prototype.pop = function () {
  let item = this.stack.pop();
  let min = this.min;
  if (item < 0) {
    this.min = min - item;
    return min;
  }
  return min + item;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  let len = this.stack.length;
  let min = this.min;
  let item = this.stack[len - 1];
  if (item < 0) {
    return min;
  }
  return min + item;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.min;
};
```

### 思路 2

使用两个栈 ， 一个栈存放全部元素 进行正常的 pop 和 push 操作。 另一个栈存放最小栈，每次 push，如果比最小栈的栈顶元素还小进行入栈操作， 否则不操作

pop 操作时，判断 元素是否与最小栈元素相同，如果相同就 pop 掉最小栈的栈顶元素

### code

```js
/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.stack = [];
  this.minStack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.stack.push(x);
  if (
    this.minStack.length == 0 ||
    this.minStack[this.minStack.length - 1] >= x
  ) {
    this.minStack.push(x);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  if (this.stack.pop() == this.minStack[this.minStack.length - 1]) {
    this.minStack.pop();
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};
```
