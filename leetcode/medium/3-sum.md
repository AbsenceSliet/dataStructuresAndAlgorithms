# 2020 年 6 月 1 日

[3-sum](https://leetcode.com/problems/3sum/description/)

## 题目描述

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

### 例子

```js
给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

### 思路

我们采用分治的思想. 想要找出三个数相加等于0，我们可以数组依次遍历， 每一项a[i]我们都认为它是最终能够用组成0中的一个数字，那么我们的目标就是找到 剩下的元素（除a[i]）两个相加等于-a[i].

通过上面的思路，我们的问题转化为了给定一个数组，找出其中两个相加等于给定值， 这个问题是比较简单的， 我们只需要对数组进行排序，然后双指针解决即可。 加上我们需要外层遍历依次数组，因此总的时间复杂度应该是O(N^2)。


### code

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  if (nums.length < 3) return [];
  const list = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    //nums is sorted,so it's impossible to have a sum = 0
    if (nums[i] > 0) break;
    // skip duplicated result without set
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
   
    // for each index i
    // we want to find the triplet [i, left, right] which sum to 0
    while (left < right) {
      // since left < right, and left > i, no need to compare i === left and i === right.
      if (nums[left] + nums[right] + nums[i] === 0) {
        list.push([nums[left], nums[right], nums[i]]);
        // skip duplicated result without set
        while(nums[left] === nums[left + 1]) {
            left++;
        }
        left++;
        // skip duplicated result without set
        while(nums[right] === nums[right - 1]) {
            right--;
        }
        right--;
        continue;
      } else if (nums[left] + nums[right] + nums[i] > 0) {
        right--;
      } else {
        left++;
      }
    }
  }
  return list;
};
```