# 2020 年 4 月 23 日

## 题目描述

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

**实例**

```js
给定二叉树 [3,9,20,null,null,15,7]，
    3
   / \
  9  20
    /  \
   15   7
它返回最大长度 3
```

### 思路

DFS(深度优先搜索)

终止条件：当前节点为空

节点为空时说明高度为 0，所以返回 0，节点不为空时则分别求左右子树的高度的最大值，同时加 1 表示当前节点的高度，返回该数值

### code

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) {
    return 0;
  } else {
    const left = maxDepth(root.left);
    const right = maxDepth(root.right);
    return Math.max(left, right) + 1;
  }
};
```
