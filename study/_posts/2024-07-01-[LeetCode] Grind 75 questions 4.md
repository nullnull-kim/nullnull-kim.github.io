# [LeetCode] Grind 75 questions (4/75)
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
![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/2ed09bcb-1137-4464-b3cc-64d320989db7)