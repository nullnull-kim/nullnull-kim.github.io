# [LeetCode Grind 169] Week1 - 1. Two Sum
한줄평: 시간복잡도를 고려한 최선의 풀이방식 고려하기!

<a href="https://leetcode.com/problems/two-sum/" target="_blank">문제로</a>

## 풀이
```java
class Solution {
    fun twoSum(nums: IntArray, target: Int): IntArray {
        val map = mutableMapOf<Int, Int>()

        for(i in 0 until nums.size) {
     // for(i in nums.indices) {
            val cur:Int = nums[i]
            val sub:Int = target - cur

            if(map.containsKey(sub)){
                return intArrayOf(map.get(sub)!!, i)
            } else {
                map.put(cur, i)
            }
        }

        return intArrayOf()
    }
}
```