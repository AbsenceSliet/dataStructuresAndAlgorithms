# 2020 年 5 月 08 日

[climbStairs](https://leetcode-cn.com/problems/climbing-stairs/)

## 题目描述

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

**注意：**给定 n 是一个正整数。

### 示例 1:

```md
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。

1.  1 阶 + 1 阶
2.  2 阶
```

### 示例 2:

```md
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。

1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
```

### 思路

使用动态规划，将其分为多个子问题，爬 n 阶楼梯，等于所有子问题解的和

爬上 n－1 阶楼梯的方法数量，再爬 1 阶就能到达 n 阶

爬上 n－2 阶楼梯的方法数量，再爬 2 阶就能到达 n 阶

`dp[1]` 代表 1 阶楼梯有一种方法，`dp[2]`代表 2 阶楼梯有`{[1,1],[2]}`两种方法,那么`dp[3]` 就会有`dp[1]+dp[2]`种 方法

得出状态转移方程 `dp[n] = dp[n-1]+dp[n-2]`

初始化`dp[0] = 1, dp[1] = 1`

时间复杂度：O(n)O(n)

### code

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  const dp = [];
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i < n + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};
```

### 思路 2

观察数学规律 ，可知是斐波那契数列 `fn(n) = fn(n-1)+fn(n-2) （n ≥ 3，n ∈ N*）, fn(1) = 1 ,fn(2) =1`

那么用斐波那契数列的通项公式求解即可

```md
$a_n = \frac{(\frac{1+\sqrt{5}}{2})^{n} - (\frac{1-\sqrt{5}}{2})^{n}}{\sqrt{5}}$
```

### code2

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  const sqrt_5 = Math.sqrt(5);
  const fibo =
    Math.pow((1 + sqrt_5) / 2, n + 1) - Math.pow((1 - sqrt_5) / 2, n + 1);
  return Math.round(fibo / sqrt_5);
};
```
