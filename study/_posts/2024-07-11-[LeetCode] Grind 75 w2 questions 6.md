# [LeetCode] Grind 75 questions (19/75)
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

![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/440213e0-8c1e-477e-97c4-3a82836f0f49)