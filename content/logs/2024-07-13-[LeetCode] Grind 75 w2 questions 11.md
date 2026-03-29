---
title: "[LeetCode] Grind 75 questions (24/75) Contains Duplicate"
date: 2024-07-13
categories: [logs]
series: Grind 75
---

<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/contains-duplicate/" target="_blank">문제로</a>

## 풀이2
```java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Map<Integer, Integer> numsMap = new HashMap();

        for(int num : nums) {
            numsMap.put(num, numsMap.getOrDefault(num, 0) + 1);
            if(numsMap.get(num) > 1) return true;
        }

        return false;
    }
}
```

![LeetCode Contains Duplicate HashMap 풀이 제출 결과](/img/blog/2024-07-13-grind75-contains-duplicate-01.png)

### 풀이2
```java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> numsSet = new HashSet();

        for(int num : nums) {
            if(numsSet.add(num)) ;
            else return true;
        }

        return false;
    }
}
```

![LeetCode Contains Duplicate HashSet 풀이 제출 결과](/img/blog/2024-07-13-grind75-contains-duplicate-02.png)