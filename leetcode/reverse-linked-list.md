# 2020 年 5 月 06 日

[reverse-linked-list](https://leetcode.com/problems/reverse-linked-list/description/)

## 题目描述

反转一个单链表。

### 示例

```md
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

### 思路

使用双指针,一个指针 pre ＝ null，另一个指针 cur=当前的节点即开始时 是 head，不断遍历 cur,每次迭代将 cur 的 next 指向 pre,将 pre 和 cur 各前进一步 ，直到 cur ＝＝ null 代表已经迭代完了

### code

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (!head || !head.next) {
    return head;
  }
  let cur = head,
    pre = null;
  while (cur) {
    const next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
};
```

### 思路 1

使用递归， 终止递归的条件是 1、终止条件是当前节点或者下一个节点==null 2、在函数内部，改变节点的指向，也就是 head 的下一个节点指向 head 递归函数那句 `head.next.next = head`

### code1

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (!head || !head.next) {
    return head;
  }
  let cur = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return cur;
};
```
