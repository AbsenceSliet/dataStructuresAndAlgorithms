# 2020 年 6 月 5 日

[removeNthNodeFromEndofList](https://leetcode.com/problems/remove-nth-node-from-end-of-list/description)

## 题目描述

给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

### 例子

```js
给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.
```

说明：

给定的 n 保证是有效的。

### 思路


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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let i = -1;
  const noop = {
    next: null
  };
   const dummyHead = new ListNode(); // 增加一个dummyHead 简化操作
  dummyHead.next = head;
  let currentP1 = dummyHead;
  let currentP2 = dummyHead;
  while (currentP1) {

    if (i === n) {
      currentP2 = currentP2.next;
    }

    if (i !== n) {
        i++;
    }
    
    currentP1 = currentP1.next;
  }

  currentP2.next = ((currentP2 || noop).next || noop).next;

  return dummyHead.next;
};
```