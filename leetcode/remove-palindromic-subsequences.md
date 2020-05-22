# 2020 年 5 月 22 日

[remove-palindromic-subsequences](https://leetcode-cn.com/problems/remove-palindromic-subsequences/)

## 题目描述

给你一个字符串 s，它仅由字母 'a' 和 'b' 组成。每一次删除操作都可以从 s 中删除一个回文 子序列。

返回删除给定字符串中所有字符（字符串为空）的最小删除次数。

「子序列」定义：如果一个字符串可以通过删除原字符串某些字符而不改变原字符顺序得到，那么这个字符串就是原字符串的一个子序列。

「回文」定义：如果一个字符串向后和向前读是一致的，那么这个字符串就是一个回文。

### 例子

```js
示例 1：

输入：s = "ababa"
输出：1
解释：字符串本身就是回文序列，只需要删除一次。
示例 2：

输入：s = "abb"
输出：2
解释："abb" -> "bb" -> "".
先删除回文子序列 "a"，然后再删除 "bb"。
示例 3：

输入：s = "baabb"
输出：2
解释："baabb" -> "b" -> "".
先删除回文子序列 "baab"，然后再删除 "b"。
示例 4：

输入：s = ""
输出：0


提示：

0 <= s.length <= 1000
s 仅包含字母 'a'  和 'b'

```


### 思路

只有a 和b 两个字符,其实最多消除次数是2 ，因为无论如何我们可以先消除全部的1 再消除全部的2,这样只需要两次.只删除一次的情况是，他 本身就是一个回文串，所以才可以一次全部消除。那么可以得出思路

- 如果s 是回文，则删除一次
- 如果不是则 需要删除两次
- 当然还要注意特殊情况，就是空字符串，  需要0次

### code

```js
/**
 * @param {string} s
 * @return {number}
 */
var removePalindromeSub = function(s) {
    let left =0,right =s.length-1;
    if(s.length===0){
      return 0
    }
    while(right>left){
      if(s[left]!=s[right]){
        return 2
      }else{
        left++
        fight--
      }
    }
    return 1
};
```

当然 也可以一行代码
```js
/**
 * @param {string} s
 * @return {number}
 */
var removePalindromeSub = function(s) {
   return  s.length === 0 ? 0 : s.split('').reverse().join('') === s ? 1 : 2;
};
```