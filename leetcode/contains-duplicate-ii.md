# 2020 年 5 月 05 日

[contains-duplicate-ii](https://leetcode.com/problems/contains-duplicate-ii/description/)

## 题目描述

给定一个整数数组和一个整数  k，判断数组中是否存在两个不同的索引  i  和  j，使得  nums [i] = nums [j]，并且 i 和 j  的差的 绝对值 至多为 k。

### 示例 1:

```js
输入: (nums = [1, 2, 3, 1]), (k = 3);
输出: true;
```

### 示例 2:

```js
输入: (nums = [1, 0, 1, 1]), (k = 1);
输出: true;
```

### 示例 3:

```js
输入: (nums = [1, 2, 3, 1, 2, 3]), (k = 2);
输出: false;
```

### code

### 思路

使用散列表，里面始终最多包含 k 个元素,当出现重复值时则说明在 k 距离内存在重复元素

每次遍历一个元素则将其加入散列表，如果表的大小大于 k，则移除前面的元素

时间复杂度 O(n)

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  let len = nums.length;
    const  set  = new Set()
    for(let i=0;i<len;i++;){
        if(set.has(nums[i])){
            return true
        }
        set.add(nums[i])
        if(set.size>k){
            set.delete(nums[i-k])
        }
    }
    return false;
};
```

### 思路 2

使用一个 Map 对象， 存储访问过的数字，每次访问先检查是否含有这个元素 ， 如果没有的话， 就将其设定， nums[i]为 key，i 为 value，如果有则取出 value，将其比较， 判断是否满足条件。

### code

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  let len = nums.length;
  const visitedMap = new Map();
  for (let i = 0; i < len; i++) {
    if (
      visitedMap.get(nums[i]) != undefined &&
      Math.abs(i - visitedMap.get(nums[i])) <= k
    ) {
      return true;
    }
    visitedMap.set(nums[i], i);
  }
  return false;
};
```
