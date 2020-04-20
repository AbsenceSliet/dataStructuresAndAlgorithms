# 题目描述

给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

## 示例 1:

```md
给定数组 nums = [1,1,2],

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。

你不需要考虑数组中超出新长度后面的元素。
```

## 示例 2:

```md
给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。
```

### 思路 1

计算重复元素的个数，原长度减去重复个数

设置开始重复元素个数 0，并且判断数组长度不为 0

从第二个元素开始比较，nums[i]!==nums[i-1] ==> nums[i-count] = nums[i] 否则 count++

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let count = 0; //重复元素个数
  let length = nums.length;
  for (let i = 1; i < length; i++) {
    nums[i] != nums[i - 1] ? (nums[i - count] = nums[i]) : count++;
  }
  return length - count;
};
```

### 思路 2

利用双指针，快慢指针从同一个点开始，如果两个指针指的数字相同， 快指针前进，

如果不同则 nums[fast] !=nums[slow] ==> nums[slow] = nums[fast]; 并且将慢指针也前进一步 slow++

快指针走完之后， 慢指针 当前坐标＋ 1 就是 长度

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let slow = 0; //重复元素个数
  let length = nums.length;
  for (let fast = 0; fast < length; fast++) {
    if (nums[fast] != nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  return slow + 1;
};
```
