---
title: "[LeetCode Grind 169] Week1 - 8. Binary Search"
date: 2026-02-03
categories: [logs]
series: Grind 169
---

<a href="https://leetcode.com/problems/valid-anagram/" target="_blank">문제로</a>

# 풀이
```kotlin
class Solution {
    fun search(nums: IntArray, target: Int): Int {
        var left = 0;
        var right = nums.size - 1;

        while(left <= right){
            val mid = left + (right-left) / 2
            val v = nums[mid]

            when {
                v == target -> return mid
                v < target -> left = mid + 1 
                else -> right = mid - 1        
            }
        }
        return -1
    }
}
```
<br>

---
> 이 문제는 Grind 75에서도 다뤘다: [Grind 75 - Binary Search]({{< ref "2024-07-02-[LeetCode] Grind 75 w1 questions 8.md" >}})