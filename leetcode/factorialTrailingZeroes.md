# 2020 年 4 月 30 日

[factorialTrailingZeros](https://leetcode-cn.com/problems/factorial-trailing-zeroes/)

## 题目描述

给定一个整数 n，返回 n! 结果尾数中零的数量。

**说明**: 你算法的时间复杂度应为 O(log n) 。

### 示例 1

```js
输入: 3
输出: 0
解释: 3! = 6, 尾数中没有零。
```

### 示例 2

```js
输入: 5
输出: 1
解释: 5! = 120, 尾数中有 1 个零.
```

### 思路


我们不能计算数的阶乘，因为这个很快就会溢出了。可以先思考下如何可以的到0 ，可以想到`1*10`这样就可以得到一个0

看下5!,`5*4*3*2*1` = 120,结果只有一个0 ，很明显可以看出是含有一个5 和一个2，可以得出想要知道有几个0 ，就可以根据有几对5和2 就好。

在看下10!, `10*9*8*7*6*5*4*3*2*1`将其拆分开,`(5*2)*9*(4*2)*7*(3*2)*(5*1)*(2*2)*3*(1*2)*1`,可以看出含有2 的因子每两个出现一次而5 的因子枚5个出现一次，由此可以得出，我们可以只看有几个5即可。

我们跟着这个思路可，用代码体现

#### code

```js

/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function(n) {
  let count  = 0
  for(let i=1;i<=n;i++){
    let N =i;
    while(N>0){
      if(N%5===0){
        count++
        N=N/5
      }else{
        break;
      }
    }
  }
  return count
};
```

结果并没有按照我们之前想的那样，超出时间限制， 再回过头来思考一下，按照之前的分析是每隔5个数字会出现一次5，继续往下分析，每隔25个数字会出现两个5，除了每隔5个数字算作一个，每隔25个再多加一个，也就是需要多加n/25个，同理我们会发现 每隔125个数字会出现3个5，再加上n/125个,...以此类推我们可以得到5的个数是n/5+n/25+n/125+...  

写程序时，按照上面的会造成分母溢出，我们可以简写,我们再算n/25时，可以先将n更新n = n/5,然后再计算即可

#### code 

```js

/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function(n) {
  let count  = 0
  while(n>=5){
    count+=Math.floor(n/5)
    n=Math.floor(n/5)
  }
  return count
};

```

也可以使用递归

```js

/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function(n) {
  if(n===0) return n

  return Math.floor(n/5)+trailingZeroes(Math.floor(n/5))
};

```

