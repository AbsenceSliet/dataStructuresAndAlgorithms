# 2020 年 4 月 21 日

## 题目描述

给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

### 实例

```js
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```

### 进阶

如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。

### 思路 1 暴力解法

两次循环枚举所有子序列的首尾位置，然后再循环求解序列和，这里时间复杂度比较高是 O(n^3)

### 思路 2 前缀和 ＋ 暴力解法

以原数组元素表示 preSum,给定自序列首尾位置(l,r),判断序列和 subarrySum = preSum[r]-preSum[l-1],用一个全局变量 maxSum 表示结果，每次比较 maxSum 与 subarrySum maxSum = Max(maxSum,subarrrySum)

### code

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let len = nums.length;
  let maxSum = -Number.MAX_VALUE;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum = 0;
    for (let j = i; j < len; j++) {
      sum += nums[j];
      if (maxSum < sum) {
        maxSum = sum;
      }
    }
  }
  return maxSum;
};
```

### 思路 3 优化前缀和 ＋ 暴力解法

### code

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let len = nums.length;
    let max = nums[0]
    let min = 0
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum +=nums[i];
    if(sum-min>max>){
        max = sum-min
    }
    if(sum<min){
        min= sum
    }
  }
  return maxSum;
};
```

### 思路 4 归并分治法

### code
