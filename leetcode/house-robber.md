# 2020 年 5 月 04 日

[house-robbers](https://leetcode-cn.com/problems/house-robber/description/?utm_source=LCUS&utm_medium=ip_redirect_q_uns&utm_campaign=transfer2china)

## 题目描述

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。


### 示例 1:

```js
输入: [1,2,3,1]
输出: 4
解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。

```

### 示例 2:

```js
输入: [2,7,9,3,1]
输出: 12
解释: 偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。

```

### 思路 

使用动态规划， 重点时找到状态转移方程。先将其划分为 求一小段的最优解，假设n=3,得到最高金额， 要么是第n-1个房间的金额最高，要么是n-2个房间与第n个房间值的和最高，那么也就可以得到状态转移方程 `dp[n] = Max(dp[n-1],dp[n-2]+num)`

时间复杂度：O(n)O(n)，nn 为数组长度

### code

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  let len  = nums.length
  if(len  ===0) return 0
  let dp  = new Array(len-1);
  dp[0] = 0
  dp[1] = nums[0]
  for(let i=2;i<=len;i++){
    dp[i] =  Math.max(dp[i-1],dp[i-2]+nums[i-1])
  }
  return dp[len];
};
```

 ### 思路2

由于只能隔开房间去偷东西，这个很容易让人想到求奇偶和，我们设定一个oddSum和evenSum,最后比较这两个谁最大，返回即可。这个是最优解是纯奇数或者纯偶数的情况。

接下来要解决另外一种情况， 最优解的前半段在前边，另一半在后一段，我们可以在计算奇偶和的过程中，如果奇数和没有偶数和大则将这一段的最优解赋值给另一半，偶数和同理

### code1

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  let len  = nums.length
  let evenSum  =0,oddSum  =0;
  for(let i=0;i<len;i++){
    if(i%2==0){
      evenSum +=nums[i] 
      evenSum = Math.max(evenSum,oddSum)
    }else{
      oddSum +=nums[i] 
      oddSum = Math.max(evenSum,oddSum)
    }
  }
  return Math.max(evenSum,oddSum)
};
```