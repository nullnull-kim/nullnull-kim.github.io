# [LeetCode Grind 169] Week1 - 4. Best Time to Buy and Sell Stock
<a href="https://leetcode.com/problems/valid-parentheses/" target="_blank">문제로</a>

# 풀이
```kotlin
class Solution {
    fun maxProfit(prices: IntArray): Int {
        var minPrice = Int.MAX_VALUE
        var maxProfit = 0;

        for(price in prices) {
            if(minPrice > price) minPrice = price
            else {
                maxProfit = max(maxProfit, price - minPrice)
            }
        }
        return maxProfit
    }
}
```