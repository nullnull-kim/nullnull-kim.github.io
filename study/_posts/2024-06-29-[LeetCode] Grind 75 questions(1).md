# [LeetCode] Grind 75 questions (1/75)
[Grind75](https://www.techinterviewhandbook.org/grind75){: target="_blank"}  
[문제로](https://leetcode.com/problems/two-sum/description/){: target="_blank"}

## 풀이1
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


## 풀이2
```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> numMap = new HashMap<>();
        for(int i = 0; i < nums.length; i++) {
            numMap.put(nums[i], i); // key: 값, value: 인덱스
        }

        for(int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if(numMap.containsKey(complement) && numMap.get(complement) != i) {
                return new int[] {i, numMap.get(complement)};
            }
        }

        return new int[] {};
    }
}
```
![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/f63881ac-9ecd-4cb0-8a69-404cbef3a22b)