---
title: "[LeetCode] Grind 75 questions (22/75) Middle of the Linked List"
date: 2024-07-13
categories: [logs]
series: Grind 75
---

<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/middle-of-the-linked-list" target="_blank">문제로</a>

## 풀이
```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while(fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }
}
```

![image](/img/blog/2024-07-13-grind75-middle-of-linked-list-01.png)