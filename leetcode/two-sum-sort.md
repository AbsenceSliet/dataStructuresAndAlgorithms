# 2020 年 4 月 29 日

[two-sum-sort](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/description/?utm_source=LCUS&utm_medium=ip_redirect_q_uns&utm_campaign=transfer2china)

## 题目描述

给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。

_说明:_

- 返回的下标值（index1 和 index2）不是从零开始的。
- 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

_示例:_

```js
输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
```

### code

```js
/**
 * 双指针碰撞法
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
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
```

### hashMap

```js
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  var len = numbers.length;

  var hashMap = new Map();
  for (let i = 0; i < len; i++) {
    hashMap.set(numbers[i], i);
  }
  for (let j = 0; j < len; j++) {
    if (hashMap.has(target - numbers[j])) {
      return [j + 1, hashMap.get(target - numbers[j]) + 1];
    }
  }
};
```

### 二分查找

```js
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
const binarySearch = function (numbers, target) {
  let high = numbers.length;
  let low = 0;
  while (low <= high) {
    let mid = parseInt((low + high) / 2);
    if (numbers[mid] === target) {
      return mid;
    } else if (numbers[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
};
var twoSum = function (numbers, target) {
  var len = numbers.length;
  for (let i = 0; i < len; i++) {
    let remainder = target - numbers[i];
    let result = binarySearch(numbers, remainder);
    if (result != -1 && i != result) {
      return [Math.min(i, result) + 1, Math.max(i, result) + 1];
    }
  }
};
```
