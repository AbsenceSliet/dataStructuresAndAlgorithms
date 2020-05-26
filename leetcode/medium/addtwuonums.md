# 2020 年 5 月 26 日

[add-wro-nums](https://leetcode.com/problems/add-two-numbers/description/)

## 题目描述

给出两个   非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照   逆序   的方式存储的，并且它们的每个节点只能存储   一位   数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0  开头。

### 例子

```js
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```

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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}
var addTwoNumbers = function (l1, l2) {
  let pre = new ListNode(0);
  let cur = pre,
    carry = 0;
  while (l1 != null || l2 != null) {
    let x = l1 === null ? 0 : l1.val;
    let y = l2 === null ? 0 : l2.val;
    let sum = x + y + carry;

    carry = sum > 9 ? 1 : 0;
    cur.next = new ListNode(sum);
    cur = cur.next;
    if (l1 != null) {
      l1 = l1.next;
    }
    if (l2 != null) {
      l2 = l2.next;
    }
  }
  if (carry === 1) {
    cur.next = new ListNode(carry);
  }
  return pre.next;
};
```
