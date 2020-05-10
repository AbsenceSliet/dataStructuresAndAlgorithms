# 2020 年 5 月 10 日

[ugly-number](https://leetcode.com/problems/ugly-number/description/)

### 题目描述

编写一个程序判断给定的数是否为丑数。

丑数就是只包含质因数 2, 3, 5 的正整数。

### 示例 1:

```js
输入: 6
输出: true
解释: 6 = 2 × 3
```

### 示例 2:

```js
输入: 8
输出: true
解释: 8 = 2 × 2 × 2
```

### 示例 3:

```js
输入: 14
输出: false 
解释: 14 不是丑数，因为它包含了另外一个质因数 7。
```

### 说明

- 1是丑数。
- 输入不会超过 32 位有符号整数的范围: [−231,  231 − 1]。

### 思路

根据题干， 我们将给定的数字除以2、3、5，直到无法整除，如果得到1，说明是所有因子是2或3或5，如果不是则返回false

### code

```js
/**
 * @param {number} num
 * @return {boolean}
 */
var isUgly = function(num) {
if(num<1){
  return false
}
[2,3,5].map(val=>{
  while(num%val===0){
    num  = num/val
  }
})
return num===1
};
```

### code2

```js
/**
 * @param {number} num
 * @return {boolean}
 */
var isUgly = function(num) {
if(num<=0){
  return false
}
if(num===1) return true
const list = [2,3,5]
if((list.includes(num))) return true
for(let i=0;i<list.length;i++){
  if(num%list[i]===0){
    return isUgly(Math.floor(num / list[i]));
  }
}
return false
};
```