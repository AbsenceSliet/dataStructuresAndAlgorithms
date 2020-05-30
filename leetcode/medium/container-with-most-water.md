# 2020 年 5 月 30 日

[container-with-most-water](https://leetcode.com/problems/container-with-most-water/description/)

## 题目描述

给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

*说明*  你不能倾斜容器，且 n 的值至少为 2。

### 例子

```js
输入：[1,8,6,2,5,4,8,3,7]
输出：49
```

### 思路

使用双指针,双指针代表的是 可以作为容器边界的所有位置的范围。在一开始，双指针指向数组的左右边界，表示 数组中所有的位置都可以作为容器的边界，因为我们还没有进行过任何尝试。在这之后，我们每次将 对应的数字较小的那个指针 另一个指针 的方向移动一个位置，就表示我们认为 这个指针不可能再作为容器的边界了。

考虑第一步，假设当前左指针和右指针指向的数分别为 xx 和 yy，不失一般性，我们假设 x \leq yx≤y。同时，两个指针之间的距离为 tt。那么，它们组成的容器的容量为：

```js
min(x,y)∗t=x∗t
```

### code 

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  if (!height || height.length <= 1) return 0;
  let len = height.length;
  let left  = 0,right = len-1
  let max = 0;
  while(left<right){
    const currentArea = Math.abs(left - right) * Math.min(height[left] , height[right]);
     if (currentArea > max) {
          max = currentArea;
      }
      // 更新小的
      if (height[left] < height[right]) {
          left++;
      } else { // 如果相等就随便了
          right--;
      }
  }
  return max;
};
```

