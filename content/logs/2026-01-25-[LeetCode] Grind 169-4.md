---
title: "[LeetCode Grind 169] Week1 - 4. Best Time to Buy and Sell Stock"
date: 2026-01-25
categories: [logs]
series: Grind 169
---

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

---
> 이 문제는 Grind 75에서도 다뤘다: [Grind 75 - Best Time to Buy and Sell Stock]({{< ref "2024-07-01-[LeetCode] Grind 75 w1 questions 4.md" >}})