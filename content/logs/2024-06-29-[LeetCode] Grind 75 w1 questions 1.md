---
title: "[LeetCode] Grind 75 questions (1/75) Two Sum"
date: 2024-06-29
categories: [logs]
series: Grind 75
---

[Grind75](https://www.techinterviewhandbook.org/grind75){: target="_blank"}  
[문제로](https://leetcode.com/problems/two-sum/description/){: target="_blank"}

0초로 푼 이들의 답이 궁금하다

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

![image](/img/blog/2024-06-29-grind75-two-sum-01.png)


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
![image](/img/blog/2024-06-29-grind75-two-sum-02.png)

## 풀이3
```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> numMap = new HashMap<>();

        for(int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if(numMap.containsKey(complement)) return new int[] {numMap.get(complement), i};
            else numMap.put(nums[i], i);
        }

        return new int[]{};
    }
}
```
![image](/img/blog/2024-06-29-grind75-two-sum-03.png)