# [LeetCode Grind 169] Week1 - 8. Binary Search
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