---
title: "[LeetCode] Grind 75 questions (4/75) Best Time to Buy and Sell Stock"
date: 2024-07-01
categories: [logs]
series: Grind 75
---

<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/" target="_blank">문제로</a>

## 풀이
```java
class Solution {
    public int maxProfit(int[] prices) {
        int min = Integer.MAX_VALUE;
        int profit = 0;
        for(int price : prices) {
            if(min > price) min = price;
            if(price - min > profit) profit = price - min;
        }

        return profit;
    }
}
```
![image](/img/blog/2024-07-01-grind75-best-time-to-buy-and-sell-stock-01.png)

---
> 이 문제는 Grind 169에서도 다뤘다: [Grind 169 - Best Time to Buy and Sell Stock]({{< ref "2026-01-25-[LeetCode] Grind 169-4.md" >}})