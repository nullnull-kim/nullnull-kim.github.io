# [LeetCode] Grind 75 questions (12/75)
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/linked-list-cycle/description/" target="_blank">문제로</a>

## 풀이
```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        if(head == null || head.next == null) return false;

        ListNode slow = head;
        ListNode fast = head.next;

        while(slow != fast) {
            if(fast == null || fast.next == null) return false;

            slow = slow.next;
            fast = fast.next.next;
        }

        return true;
    }
}
```

![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/27a3e251-b09c-4cb2-b2ba-c443d21c62dd)

### 단계별 설명
1. 초기 조건 확인: head가 null이거나 head.next가 null인 경우, 리스트가 비어있거나 노드가 하나뿐이므로 사이클이 없습니다.
2. 포인터 초기화: slow 포인터는 head에, fast 포인터는 head.next에 위치시킵니다.
3. 반복문 실행: slow와 fast가 같지 않은 동안 반복합니다.
4. fast 또는 fast.next가 null이면 리스트의 끝에 도달한 것이므로 사이클이 없음을 의미합니다.
5. slow는 한 칸 이동하고, fast는 두 칸 이동합니다.
결과 반환: 반복문이 종료되었을 때 slow와 fast가 같다면 사이클이 있는 것이므로 true를 반환합니다.