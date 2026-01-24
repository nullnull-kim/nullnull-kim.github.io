# [LeetCode Grind 169] Week1 - 3. Merge Two Sorted Lists
<a href="https://leetcode.com/problems/valid-parentheses/" target="_blank">문제로</a>

# 풀이
```kotlin
/**
 * Example:
 * var li = ListNode(5)
 * var v = li.`val`
 * Definition for singly-linked list.
 * class ListNode(var `val`: Int) {
 *     var next: ListNode? = null
 * }
 */
class Solution {
    fun mergeTwoLists(list1: ListNode?, list2: ListNode?): ListNode? {
        if(list1 == null && list2 == null) return null
        else if(list1 == null) return list2
        else if(list2 == null) return list1

        var a = list1;
        var b = list2;

        val answer = ListNode(0)
        var temp: ListNode = answer

        while (a != null && b != null) {
            if(a.`val` <= b.`val`) {
                temp.next = a
                a = a.next
            } else {
                temp.next = b
                b = b.next
            }
            temp = temp.next!!
        }

        temp.next = a ?: b

        return answer.next
    }
}
```
<br>
<hr>
재귀형태 풀이도 기억해두자 ...
<hr>

# 풀이2
```kotlin
class Solution {
    fun mergeTwoLists(list1: ListNode?, list2: ListNode?): ListNode? {
        if (list1 == null) return list2
        if (list2 == null) return list1

        return if (list1.`val` <= list2.`val`) {
            list1.next = mergeTwoLists(list1.next, list2)
            list1
        } else {
            list2.next = mergeTwoLists(list1, list2.next)
            list2
        }
    }
}
```
