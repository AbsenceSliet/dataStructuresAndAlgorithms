# 2020 年 4 月 25 日

[best-time-to-buy-and-sell-stock-ii](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

## 题目描述

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

### 实例 1

```js
输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
```

### 实例 2

```js
输入: [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
```
### 实例 3

```js
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

### code

```js
/**
 * @param {number[]} prices
 * @return {number}
 * 暴力解法，列出所有的买进和卖出
 */
var maxProfit = function(prices) {
    return calcute(prices,0)
    function calcute(prices,s){
      var len  = prices.length
      if(s>=len) {
        return 0
      }
      var max = 0 
      for(var start  = s;start<len;start++){
        var maxprofit  = 0
        for(var i = start+1;i<len;i++){
          if(prices[start]<prices[i]){
            var profit  =  calcute(prices,i+1)+prices[i]-prices[start]
            if(profit>maxprofit){
              maxprofit = profit
            }
          }
        }
        if(max<maxprofit){
          max =  maxprofit
        }
      }
      return max
    }
};
```
### code 

贪心算法 ,从第`i`天(i>=1)开始,与第`i-1`天比较，若值大于0，则将利润算入总利润中,即可得出最大利润

```js
/**
 * @param {number[]} prices
 * @return {number}
 * 贪心算法,在每一步总是做出在当前看来最好的选择
 * 最好是指最大或者最小
 * 贪心算法和动态规划相比，它既不看前面（也就是说它不需要从前面的状态转移过来），也不看后面（无后效性，后面的选择不会对前面的选择有影响），因此贪心算法时间复杂一般是线性的，空间复杂度是常数级别的。
 */
var maxProfit  = function(prices){
  var max = 0 
  for(var i =1;i<prices.length;i++){
    var diff  =prices[i]-prices[i-1]
    if(diff>0){
      max+=diff
    }
  }
  return max
}

```

### code 

动态规划 

定义状态，股票的买进和卖出即持有股票（1）或者现金（0）第`i`天可以获得最大利润 即 状态定义为`dp[i][j]`

状态转移方程

状态从持有现金开始， 到最后一天也是持有现金,即`dp[len-1][0]`

每天的状态都可以进行改变或者不改变

确定开始

如果不买入则是`dp[0][0]`;若买入,收益则是`dp[0][1]=-prices[0]`

终止时是`dp[len-1][0]`

```js
var maxProfit= function(prices){
  var len = prices.length
  if (len < 2) {
      return 0;
  }
  var cash =  new Array(len).fill(0)
  var hold =  new Array(len).fill(0)
  // 持有的现金
  cash[0] = 0
  // 持有的股票
  hold[0] = -prices[0]
  for(var i =1;i<len;i++){
    cash[i] = Math.max(cash[i-1],hold[i-1]+prices[i])
    hold[i] = Math.max(hold[i-1],cash[i-1]-prices[i])
  }
  return cash[len - 1];
}
```