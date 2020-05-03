# 2020 年 5 月 02 日

[number-of-1-bits](https://leetcode-cn.com/problems/number-of-1-bits/description/?utm_source=LCUS&utm_medium=ip_redirect_q_uns&utm_campaign=transfer2china)

###  题目描述

编写一个函数，输入是一个无符号整数，返回其二进制表达式中数字位数为 ‘1’ 的个数（也被称为汉明重量）。

### 示例1

```js
输入：00000000000000000000000000001011
输出：3
解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。
```

### 示例2

```js
输入：00000000000000000000000010000000
输出：1
解释：输入的二进制串 00000000000000000000000010000000 中，共有一位为 '1'。

```
### 示例3

```js
输入：11111111111111111111111111111101
输出：31
解释：输入的二进制串 11111111111111111111111111111101 中，共有 31 位为 '1'。
```

### 思路

考察点 位的运算 ,*任何数字与掩码1进行与运算都得到这个数字的最低位*,根据这个特性，循环比较下一位，检查下一位时，将掩码 向左移1位

位运算优先级很低[运算符优先级](https://baike.baidu.com/item/%E8%BF%90%E7%AE%97%E7%AC%A6%E4%BC%98%E5%85%88%E7%BA%A7/4752611?fr=aladdin#4)

- 基本的优先级需要记住
  - 指针最优，单目运算优于双目运算，如正负号。
  -先算术运算，后移位运算，最后位运算。1 << 3 + 2 & 7等价于 (1 << (3 + 2))&7，逻辑运算最后结合

### code

```js
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let count  = 0;
    let helper = 1
    for(let i=0;i<32,i++;){
      if((n&helper)!=0){
        count++
      }
      helper=helper<<1
    }
  return count

};
```
### 思路2

我们不再检查数字的每一位， 而是不断把数字的最后一个1 进行反转，并把答案加起来，当数字变成0 的时候，我们就知道它没有1的位了 ，返回结果

对于任意数字n，将n与n-1做与运算会把最后一个1的位变成0

在二进制表示中，数字 `n` 中最低位的 1 总是对应 n - 1 中的 0 。因此，将 n 和 n−1 与运算总是能把 n 中最低位的 1 变成 0 ，并保持其他位不变

### code

```js
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let count  =  0
    while(n!=0){
      n =  n&(n-1)
      count++;
    }
  return count
};
```