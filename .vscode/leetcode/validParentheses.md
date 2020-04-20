# 2020 年 4 月 16 日

## 题目描述

```javascript
Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Note that an empty string is also considered valid.

Example 1:

Input: "()"
Output: true
Example 2:

Input: "()[]{}"
Output: true
Example 3:

Input: "(]"
Output: false
Example 4:

Input: "([)]"
Output: false
Example 5:

Input: "{[]}"
Output: true

```

## 思路

使用栈，遍历字符串

若是左侧字符串则将其入栈

若是右侧字符串，则讨论栈 的情形

1. 栈不为空且栈中有对应的左侧字符串则将其 从栈顶中取出，继续循环
2. 若不为对应的左侧字符串，则返回 false
3. 循环结束后， 此时若栈不为空，则直接返回 false

## 解析

```js
/**
 * @params {string} str
 * @return {boolean}
 */
function validParenthese(str) {
  const isvalid = true;
  const stack = [];
  let len = str.length;
  if (len % 2) return false;
  const mapThese = {
    "{": "}",
    "[": "]",
    "(": ")",
  };
  for (let i in str) {
    const val = str[i];
    if (["{", "(", "["].includes(val)) {
      stack.push(val);
    } else {
      const peek = stack.pop();
      if (val != mapThese[peek]) {
        return false;
      }
    }
  }
  if (stack.length > 0) return false;
  return isvalid;
}
```

## 思路 2

先判断字符串长度是是否是奇数 ， 若是则直接返回 false ， 提升性能

使用栈，创建 字典，循环字符串 ，如果是左括号的，就入栈

反之，从栈中取出元素，判断是否再字典中有对应的 key，若有，继续循环，反之 返回 false

最终判断 栈中是否还有元素，

```js
function validParenthese1(str) {
  const stack = [];
  let len = str.length;
  if (len % 2) return false;
  const mapThese = {
    "{": "}",
    "[": "]",
    "(": ")",
  };
  for (let val of str) {
    if (val in mapThese) {
      stack.push(val);
    } else {
      const peek = stack.pop();
      if (val != mapThese[peek]) {
        return false;
      }
    }
  }
  return !stack.length;
}
```
