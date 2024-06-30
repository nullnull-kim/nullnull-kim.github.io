# [LeetCode] Grind 75 questions (3/75)
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/merge-two-sorted-lists/" target="_blank">문제로</a>

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
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode result = new ListNode();
        ListNode dummy = result;

        // list를 비교하여 dummy에 적재한다.
        while(list1 != null && list2 != null) {
            if(list1.val > list2.val) {
                dummy.next = list2;
                list2 = list2.next;
            } else {
                dummy.next = list1;
                list1 = list1.next;
            }
            dummy = dummy.next;
        }

        // 두 리스트 중 하나가 null이 되었으므로 남은 lsit를 next에 적재한다.
        if(list1 == null) dummy.next = list2;
        else dummy.next = list1;

        return result.next; // 초기값은 null이므로 next부터 반환한다.
    }
}
```
![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/20afb28f-fea9-4747-b6fb-d1675ebd60a8)