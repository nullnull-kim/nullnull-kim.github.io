---
title: "[LeetCode] Grind 75 questions (19/75) Majority Element"
date: 2024-07-11
categories: [logs]
series: Grind 75
---

<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/majority-element/description/" target="_blank">문제로</a>

## 풀이
Boyer-Moore Voting Algorithm  
시간복잡도 $O(1)$  
공간복잡도 $O(n)$
```java
class Solution {
    public int majorityElement(int[] nums) {
        int candidate = nums[0];

        int count = 0;
        for(int num : nums) {
            if(count == 0) {
                candidate = num;
            } 
            if(candidate == num) {
                count++;
            } else {
                count--;
            }
        }

        return candidate;
    }
}
```

![image](/img/blog/2024-07-11-grind75-majority-element-01.png)