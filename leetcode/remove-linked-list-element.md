# 2020 年 5 月 05 日

[remove-linked-list-element](https://leetcode.com/problems/remove-linked-list-elements/description/)

## 题目描述

删除链表中等于给定值 val 的所有节点。

### 示例: 

```js
输入: 1->2->6->3->4->5->6, val = 6
输出: 1->2->3->4->5
```

### 思路 

使用递归，如果当前节点值是指定值，则返回下一个节点，下一个结点已经是删除了指定值的链表头结点；否则当前结点为没有指定值的链表头结点，返回其本身。

递归次数为链表长度，时间复杂度为O(n)O(n)。迭代使用栈内存，空间复杂度为O(n)O(n)

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
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
 if(head===null){
   return null
 }
 head.next  = removeElements(head.next,val)
 if(head.val ===val){
   return head.next
 }else{
   return head
 }
};
```

### 思路2

新增一个头节点，处理特殊位置，也就是如果删除的元素是开头一个或几个，需要先把开头的指定值的结点删除，这里只需要像删除链表任意位置一样进行删除就好了， 保证代码逻辑的一致性

### code2

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
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  let newHead= {
    next:head
  };
  let current  = newHead;
  while(current&&current.next!=null){
    let next = current.next;
    if(next.val===val){
      current.next =  next.next
      next = next.next
    }
    // 下一个节点不是要删除的节点，才更新current
    if(!next||next.val!=val){
      current  = next
    }
  }
  return newHead.next
};

```