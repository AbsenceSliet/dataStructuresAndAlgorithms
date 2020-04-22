# 2020 年 4 月 21 日

## 题目地址

[merge-sorted-array](https://leetcode-cn.com/problems/merge-sorted-array/)

## 题目描述

给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

**说明**

- 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
- 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

**示例:**

```js
输入: (nums1 = [1, 2, 3, 0, 0, 0]), (m = 3);
(nums2 = [2, 5, 6]), (n = 3);

输出: [1, 2, 2, 3, 5, 6];
```

### 思路

题目信息：

两个有序的数组

nums2 合并到 nums1 ==> nums1 成为一个有序数组

一般可以想到将两个数组合并之后，使用 sort 方法， 但时间复杂度较差`O((m+n)log(m+n))`

可以使用双指针,从前向后. p1 指向 nums1 的开头，p2 指向 nums2 的开头，在 每一步将最小的数值放入输出的数组中。由于 nums1 是输出的数组 ，所以需要将 nums1 的前 m 个 元素 放在其他地方， 所以需要 O(m)空间复杂度

### code

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  var pre_nums = JSON.parse(JSON.stringify(nums1));

  var p1 = 0,
    p2 = 0;
  var current = 0;
  while (p1 < m && p2 < n) {
    nums1[current++] = pre_nums[p1] < nums2[p2] ? pre_nums[p1++] : nums2[p2++];
  }
  if (p1 < m) {
    nums1.splice(current, m - p1, ...pre_nums.slice(p1, m));
  }
  if (p2 < n) {
    nums1.splice(current, n - p2, ...nums2.slice(p2, n));
  }
};
```

### 思路 2

从后往前 找出 nums1 中最大的值与 nums2 中的最小值比较 一步步 向前走，

### code2

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  var p1 = m - 1,
    p2 = n - 1,
    current = m + n - 1;
  while (p1 >= 0 && p2 >= 0) {
    nums1[current--] = nums1[p1] < nums2[p2] ? nums2[p2--] : nums1[p1--];
  }
  if (p2 >= 0) {
    nums1.splice(0, current + 1, ...nums2.splice(0, p2 + 1));
  }
};
```
