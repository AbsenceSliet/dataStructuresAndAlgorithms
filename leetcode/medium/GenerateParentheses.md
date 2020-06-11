# 2020 年 6 月 11 日

[GenerateParentheses](https://leetcode-cn.com/problems/generate-parentheses)

## 题目描述

```js
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

示例：

输入：n = 3
输出：[
       "((()))",
       "(()())",
       "(())()",
       "()(())",
       "()()()"
     ]

```

### 思路

动态规划
考虑 i=n 时相比 n-1 组括号增加的那一组括号的位置。  位置可能是左侧或者是右侧

我们清楚所有 i<n 时括号的可能生成排列后，对与 i=n 的情况，我们考虑整个括号排列中最左边的括号。
它一定是一个左括号，那么它可以和它对应的右括号组成一组完整的括号 "( )"，我们认为这一组是相比 n-1 增加进来的括号。

剩下 n-1 组括号有可能在哪呢？


剩下的括号要么在这一组新增的括号内部，要么在这一组新增括号的外部（右侧）。

即"(" + 【i=p时所有括号的排列组合】 + ")" + 【i=q时所有括号的排列组合】 

p+q= n-1

### code

```js
/**
 * @param {number} n
 * @return {string[]}
* @param l 左括号已经用了几个
 * @param r 右括号已经用了几个
 * @param str 当前递归得到的拼接字符串结果
 * @param res 结果集
 */
var generateParenthesis = function(n) {
const res = [];
function dfs(l, r, str) {
    if (l == n && r == n) {
      return res.push(str);
    }
    // l 小于 r 时不满足条件 
    if (l < r) {
      return;
    }
    // l 小于 n 时可以插入左括号，最多可以插入 n 个
    if (l < n) {
      dfs(l + 1, r, str + "(");
    }
    // r < l 时 可以插入右括号
    if (r < l) {
      dfs(l, r + 1, str + ")");
    }
  }
  dfs(0, 0, "");
  return res;
};
```