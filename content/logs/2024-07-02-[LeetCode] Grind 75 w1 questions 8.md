---
title: "[LeetCode] Grind 75 questions (8/75) Binary Search"
date: 2024-07-02
categories: [logs]
series: Grind 75
---

<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/binary-search/" target="_blank">문제로</a>

## 풀이
```java
class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length-1;
        
        while(left <= right) {
            int mid = left + (right-left) / 2;
            if(nums[mid] == target) return mid;
            else if(nums[mid] > target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return -1;
    }
}
```

![image](/img/blog/2024-07-02-grind75-binary-search-01.png)