# 2020 年 5 月 17 日

[find-mode-in-binary-search-tree](https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/)

## 题目描述

给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。

假定 BST 有如下定义：

- 结点左子树中所含结点的值小于等于当前结点的值

- 结点右子树中所含结点的值大于等于当前结点的值

- 左子树和右子树都是二叉搜索树

### 示例 1:

```js
给定 BST [1,null,2,2],

   1
    \
     2
    /
   2

   返回[2].
```

**提示**：如果众数超过1个，不需考虑输出顺序

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
 * @return {number[]}
 */
var findMode = function(root) {
let prenode = null;
    let count = 1;
    let max = 1; let res = [];
    const helper = (root) => {
        if(!root) return;
        helper(root.left);
        if(prenode) {
            if(root.val==prenode.val) count++; 
            else count=1;
        }
        if(count > max){
            max = count;
            res = [];
            res.push(root.val);
        }else if(count == max) res.push(root.val);
        prenode = root;
        helper(root.right);
    }
    helper(root);
    return res;
};
```