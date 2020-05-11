# 2020 年 5 月 11 日

[move-zeroes](https://leetcode.com/problems/move-zeroes/description/)

### 题目

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

### 示例:

```js
输入: [0, 1, 0, 3, 12];
输出: [1, 3, 12, 0, 0];
```

### 说明:

- 必须在原数组上操作，不能拷贝额外的数组。
- 尽量减少操作次数。

### 思路 1

不能借助额外的空间 也就是空间复杂度是 O(1)

可以先借助一个游标 index 记录位置，然后遍历一次， 将非 0 的原地修改，最后再 把 0 补齐

### code

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let index = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != 0) {
      nums[index++] = nums[i];
    }
  }
  for (let i = index; i < nums.length; i++) {
    nums[i] = 0;
  }
};
```

### 思路 2

参考快排 的思想， 快速排序首先要确定一个待分割的元素做中间点 x，然后把所有小于等于 x 的元素放到 x 的左边，大于 x 的元素放到其右边。

在这道题目中， 我们将 0 作为这个中间点，使用两个指针 i,j ,只要 nums[i]!=0，便交换 nums[i] 和 nums[j]

### code1

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  if (nums == null) {
    return;
  }
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != 0) {
      let tmp = nums[i];
      nums[i] = nums[j];
      nums[j++] = tmp;
    }
  }
};
```
