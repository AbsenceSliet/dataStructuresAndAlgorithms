# 2020 年 5 月 27 日

[longest-substring-without-repeating-characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/)

## 题目描述

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

### 例子

```js
输入: "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。



输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。


```

### 思路

使用移动窗口 使用队列维护一个窗口

### code

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let len = s.length;
  if (len === 0) return 0;
  let traverse = new Map();
  let left = 0,
    max = 0;
  for (let i = 0; i < len; i++) {
    if (traverse.has(s[i])) {
      left = Math.max(traverse.get(s[i]) + 1, left);
    }
    max = Math.max(max, i - left + 1);
    traverse.set(s[i], i);
  }
  return max;
};
```

```js
var lengthOfLongestSubstring = function (s) {
  let index = 0,
    max = 0;
  for (let i = 0, j = 0; j < s.length; j++) {
    index = s.substring(i, j).indexOf(s[j]);
    if (index !== -1) {
      i = i + index + 1;
    }
    max = Math.max(max, j - i + 1);
  }
  return max;
};
```
