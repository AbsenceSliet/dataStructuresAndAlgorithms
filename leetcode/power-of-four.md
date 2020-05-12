# 2020 年 5 月 12 日

[power-of-four](https://leetcode.com/problems/power-of-four/description/)

### 题目

给定一个整数 (32 位有符号整数)，请编写一个函数来判断它是否是 4 的幂次方。

### 示例:

```js
输入: 16;
输出: true;

输入: 5;
输出: false;
```

不能使用循环或者递归

### code

```js
/**
 * @param {number} num
 * @return {boolean}
 */
var isPowerOfFour = function (num) {
  if (num == 0) return false;
  while (num % 4 == 0) {
    num = num / 4;
  }
  return num == 1;
};
```

### 思路 2

使用数学运算 判断一个叔是否是 4 的幂 `x = 4^a` 那么 `a = log4x`==> `a = 1/2 log2x` ,那么就可以判断`log2x`是否是偶数就好

```js
/**
 * @param {number} num
 * @return {boolean}
 */
var isPowerOfFour = function (num) {
  if (num == 0) return false;
  return (Math.log(num) / Math.LN2) % 2 === 0;
};
```
