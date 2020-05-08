# 2020 年 5 月 08 日

[invert-binary-tree]https://leetcode-cn.com/problems/invert-binary-tree/description)

## 题目描述

翻转一棵二叉树。

### 示例 1:

```js
输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9

输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1
```

### 思路 1

使用递归，root 不变只是将左右子树 进行交换

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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (!root) return root;
  let right = invertTree(root.right);
  let left = invertTree(root.left);
  root.left = right;
  root.right = left;
  return root;
};
```

### 思路 2

使用一个队列存储所有的左子树和右子树，还没有被交换过的节点。 开始时只有 root 节点在队列中，只要这个队列不空， 就一直从队列中取出节点，然后互换这个节点的左右子树，然后将孩子节点加入队列，对于其中的空 节点不需要入队列， 最终队列为空， 则左右子树交换完毕，返回 root 即可

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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (!root) return root;
  let stack = [root];
  let current = null;
  while ((current = stack.shift())) {
    const left = current.left;
    const right = current.right;
    if (left) {
      stack.push(left);
    }
    if (right) {
      stack.push(right);
    }
  }
  return root;
};
```
