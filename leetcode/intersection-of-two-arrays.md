# 2020 年 5 月 09 日

[intersection-of-two-arrays](https://leetcode.com/problems/intersection-of-two-arrays/description/)

### 题目

给定两个数组，编写一个函数来计算它们的交集。

### 示例 :

```js
输入: (nums1 = [1, 2, 2, 1]), (nums2 = [2, 2]);
输出: [2];

输入: (nums1 = [4, 9, 5]), (nums2 = [9, 4, 9, 8, 4]);
输出: [9, 4];
```

_说明_

- 输出结果中的每个元素一定是唯一的。
- 我们可以不考虑输出结果的顺序。

### 思路

使用 set 集合特性 key 是唯一， 判断 nums2 数组中是否存在相同元素， 若存在则 add 到集合中

### code

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  let set = new Set();
  for (let i = 0; i < nums1.length; i++) {
    if (nums2.includes(nums1[i])) {
      set.add(nums1[i]);
    }
  }
  return [...set];
};
```

### 思路 2 双指针

先将 nums1 和 nums2 排序,游走双指针，借助 set

时间复杂度 O(nlogn)

### code2

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  let set = new Set();
  nums1 = nums1.sort((a, b) => a - b);
  nums2 = nums2.sort((a, b) => a - b);
  let i = 0,
    j = 0;
  let pre = Number.MAX_VALUE;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] > nums2[j]) {
      j++;
    } else if (nums1[i] < nums2[j]) {
      i++;
    } else {
      if (pre != nums1[i]) {
        pre = nums1[i];
        set.add(nums1[i]);
      }
      i++;
      j++;
    }
  }
  return [...set];
};
```

### 思路 2 二分查找

nums2 拍好序，使用二分查找 nums1 的元素，借助 binarysearch 方法函数， 判断边界，`left<=right`

### code2

```js
function binarySearch(nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = parseInt(left + (right - left) / 2);
    if (nums[mid] == target) {
      return true;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  return false;
}
var intersection = function (nums1, nums2) {
  let set = new Set();
  nums2 = nums2.sort((a, b) => a - b);
  for (let i = 0; i < nums1.length; i++) {
    if (binarySearch(nums2, nums1[i]) && !set.has(nums1[i])) {
      set.add(nums1[i]);
    }
  }
  return [...set];
};
```
