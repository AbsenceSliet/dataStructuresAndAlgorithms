# 2020 年 4 月 17 日

## 题目描述

```md
将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

## 思路

使用递归， 比较 l1 和 l2 的值，修改指针

终止条件是 l1 或 l2 为 null , 返回另一个。

## 解析

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }
  if (l1.val > l2.val) {
    console.log(l1, "l2");
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  } else {
    l1.next = mergeTwoLists(l2, l1.next);
    return l1;
  }
};
```
