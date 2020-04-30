# 2020 年 4 月 30 日

[majority-element](https://leetcode.com/problems/majority-element/description/)

## 题目描述

给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于  ⌊ n/2 ⌋  的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

### 示例 1

```js
输入: [3, 2, 3];
输出: 3;
```

### 示例 2

```js
输入: [2, 2, 1, 1, 1, 2, 2];
输出: 2;
```

### Code

```js
/**
 * 使用hash 利用额外空间
 * 空间复杂度O(n)
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let len = nums.length;
  let numMap = new Map();
  for (let i = 0; i < len; i++) {
    let num = nums[i];
    if (numMap.has(num)) {
      numMap.set(num, numMap.get(num) + 1);
    } else {
      numMap.set(num, 1);
    }
  }
  for (let item of numMap.entries()) {
    if (item[1] > len / 2) {
      return item[0];
    }
  }
};
```

```js
/**
 * 使用计数法 利用额外空间
 * 空间复杂度O(n)
 * @param {number[]} nums
 * @return {number}
 */
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
```
