# 2020 年 5 月 14 日

[sum-of-two-integers](https://leetcode.com/problems/sum-of-two-integers/description/)

## 题目描述

不使用运算符 + 和 - ​​​​​​​，计算两整数 ​​​​​​​a 、b ​​​​​​​ 之和。

### 示例 1:

```js
输入: (a = 1), (b = 2);
输出: 3;

输入: (a = -2), (b = 3);
输出: 1;
```

### 思路

不能使用 ＋和－ 所以只能往位运算上面去想。

举例子来看

```js
转换为二进制  5 ＝  5.toString(2) = 0101   4 ＝  4.toString(2) = 0100  1= 1.toString(2) =0001 , 9 = 9.toString(2) = 1001
那么
5和4的异或结果（无进位结果）
        0101
        0100
        ----
        0001

5+4 ＝ 9 ,将5+4 的结果分解为，(a 和 b 的无进位结果) + (a 和 b 的进位结果)

无进位加法使用异或运算计算得出   ， 进位结果使用与运算和移位运算计算得出 ， 循环此过程，直到进位为 0‘

就是先求的5和4 的 按位与的结果

        0101
        0100
        ----
        0100

```

### code

```js
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function (a, b) {
  if (a === 0) return b;
  if (b === 0) return a;
<<<<<<< HEAD
  return getSum(a ^ b, (a & b) << 1);
=======
  return getSum(a ^ b, (a & b) >> 1);
>>>>>>> dcb318ec9fe10e701bd92f34b057d589e9b6eb71
};
```
