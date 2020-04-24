# 2020 年 4 月 24 日

[best-time-to-buy-and-sell-stock](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

## 题目描述

给定一个数组，它的第  i 个元素是一支给定股票第 i 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

注意：你不能在买入股票前卖出股票。

### 实例 1

```js
    输入: [7,1,5,3,6,4]
    输出: 5
    解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
        注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
```

### 实例 2

```js
    输入: [7,6,4,3,1]
    输出: 0
    解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

### code

```js
//暴力解法;
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    var maxPrice = 0
    for(var i=0,price1; price1=prices[i++]){
        for(var j=i+1,price2;price2=prices[j++]){
            var current = price2-price1
            if(current>max){
                maxPrice =  current
            }
        }
    }
    return maxPrice
};
```

```js
/**
 * 找出最大差值。
 * 设定一个变量是最小price,一个变量是最大差值
 * 第i天卖出得到的利润是prices[i]-minPrice
 * 最大差值是  Max(max,prices[i]-minPrice)
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    var minPrice= 0,max=0;
    for(var i =0,price;price = prices[i++]){
        if(minPrice>price){
            minPrice = price
        }else{
            max =  Math.max(max,price-minPrice)
        }
    }
    return max
};
```

```js
/**
 * [7,1,5,3,6,4]
 * 使用动态规划
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (prices.length < 2) {
    return 0;
  }
  let diff = [];
  for (let i = 0; i < prices.length - 1; i++) {
    diff[i] = prices[i + 1] - prices[i];
  }

  let dp = new Array(prices.length).fill(0);
  dp[0] = Math.max(0, diff[0]);
  let max = dp[0];
  for (let i = 1; i < diff.length; i++) {
    dp[i] = Math.max(0, dp[i - 1] + diff[i]);
    max = Math.max(max, dp[i]);
  }
  return max;
};
```

---

```js
var maxProfit = function(prices){
    var last =0,max=0;
    for(var i=0,i<prices.length-1;i++){
         last = Math.max(0, last + prices[i+1]-prices[i])
         max = Math.max(max,last)
    }
    return max
}
```
