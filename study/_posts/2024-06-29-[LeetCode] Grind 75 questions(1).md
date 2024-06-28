# [LeetCode] Grind 75 questions (1/75)
[Grind75](https://www.techinterviewhandbook.org/grind75){: target="_blank"}  
[문제로](https://leetcode.com/problems/two-sum/description/){: target="_blank"}

## 풀이
```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        if(nums == null || nums.length == 0) return null;

        for(int i = 0; i < nums.length -1; i++) {
            for(int j = i+1; j < nums.length; j++) {
                if(nums[i] + nums[j] == target){
                    int[] arr = {i, j};
                    return arr;
                }
            }
        }

        return null;
    }
}
```

![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/51341444-3d97-42f6-b26f-353fde4f5975)