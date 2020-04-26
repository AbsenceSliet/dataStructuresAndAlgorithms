# 2020 年 4 月 26 日

[valid-palindrome](https://leetcode-cn.com/problems/valid-palindrome/description/?utm_source=LCUS&utm_medium=ip_redirect_q_uns&utm_campaign=transfer2china)

## 题目描述

给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。

### 实例 1

```js
输入: "A man, a plan, a canal: Panama";
输出: true;
```

### 实例 2

```js
输入: "race a car";
输出: false;
```

### 思路

需要搞清楚 回文串是指什么意思。

“回文串”是一个正读和反读都一样的字符串，比如“level”或者“noon”等等就是回文串。

可以是使用双指针， 判断前指针 从第一个元素开始， 后指针从最后一个元素开始， 判断`pointer[0]`与`pointer[len-1]`是否相同，

若不同，则直接返回 false,若相同， 则前指针和后指针都想前走一步，直到两个指针相遇

### code

```js
/**
 * 验证字母和数字字符
 */
function isValid(c) {
  const charCode = c.charCodeAt(0);
  const isDigit =
    charCode >= "0".charCodeAt(0) && charCode <= "9".charCodeAt(0);
  const isChar = charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0);

  return isDigit || isChar;
}
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  s = s.toLowerCase();
  var left = 0,
    right = s.length - 1;
  while (left < right) {
    if (!isValid(s[left])) {
      left++;
      continue;
    }
    if (!isValid(s[right])) {
      right--;
      continue;
    }
    if (s[left] === s[right]) {
      left++;
      right--;
    } else {
      break;
    }
  }
  return right <= left;
};
```
