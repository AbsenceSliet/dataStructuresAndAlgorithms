# 2020 年 5 月 29 日

[longest-palindromic-substring](https://leetcode-cn.com/problems/longest-palindromic-substring/)

## 题目描述

给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

### 例子

```js
输入: "babad" 输出: "bab" 注意: "aba" 也是一个有效答案。

输入: "cbbd" 输出: "bb"
```

### 思路

首先要知道回文的意思 从左至右和从右至左 是一样的。

解决这类问题的核心思想就是两个字“延伸”即 拓展

那么可以反向思考，如果在一个不是回文字串的两端添加任何字符，或者在回文串左右分别加不同的字符，得到的一定不是回文串

如果一个字符串不是回文串，或者在回文串左右分别加不同的字符，得到的一定不是回文串

通过上面分析 可以得到动态规划方程 用 dp[i][j] 表示 s 中从 i 到 j（包括 i 和 j）是否可以形成回文， 状态转移方程只是将上面的描述转化为代码即可

```js
if (s[i] === s[j] && dp[i + 1][j - 1]) {
  dp[i][j] = true;
}
```

### code

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (!s || s.length === 0) return "";
  let res = s[0];

  const dp = [];
  for (let i = s.length - 1; i >= 0; i--) {
    dp[i] = [];
    for (let j = i; j < s.length; j++) {
      if (j - i === 0) dp[i][j] = true;
      else if (j - i === 1 && s[i] === s[j]) dp[i][j] = true;
      else if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
      }

      if (dp[i][j] && j - i + 1 > res.length) {
        res = s.slice(i, j + 1);
      }
    }
  }

  return res;
};
```

### 思路 2

中心扩展方法

枚举每一种边界情况，并从对应的子串开始不断地向两边扩展，如果两边的字母相同，我们就可以继续扩展，例如从 P(i+1,j-1)P(i+1,j−1) 扩展到 P(i,j)P(i,j)；如果两边的字母不同，我们就可以停止扩展，因为在这之后的子串都不能是回文串了。

边界情况」对应的子串实际上就是我们「扩展」出的回文串的「回文中心」

### code2

```js
var longestPalindrome = function (s) {
  let length = s.length;
  if (s == null || length < 1) return "";

  // 初始化最大回文子串的起点和终点
  let start = 0,
    end = 0;
  // 遍历每个位置，当做中心位
  for (let i = 0; i < length; i++) {
    // 分别拿到奇数偶数的回文子串长度
    let len_odd = expandCenter(s, i, i);
    let len_even = expandCenter(s, i, i + 1);
    // 对比最大的长度
    let len = Math.max(len_odd, len_even);
    // 计算对应最大回文子串的起点和终点
    if (len > end - start) {
      start = i - (len - 1) / 2;
      end = i + len / 2;
    }
  }

  return s.substring(start, end + 1);
};
/**
 * @param s             输入的字符串
 * @param left          起始的左边界
 * @param right         起始的右边界
 * @return              回文串的长度
 */
function expandCenter(s, left, right) {
  // left = right 的时候，此时回文中心是一个字符，回文串的长度是奇数
  // right = left + 1 的时候，此时回文中心是一个空隙，回文串的长度是偶数
  // 跳出循环的时候恰好满足 s.charAt(left) ！= s.charAt(right)
  while (left >= 0 && right < s.length && s[left] == s.s[right]) {
    left--;
    right++;
  }
  // 回文串的长度是right-left+1-2 = right - left - 1
  return right - left - 1;
}
```
