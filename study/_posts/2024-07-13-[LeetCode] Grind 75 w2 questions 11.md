# [LeetCode] Grind 75 questions (23/75)
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

![image](https://github.com/user-attachments/assets/ca910427-00c8-463b-bd31-c8658ec792ec)

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

![image](https://github.com/user-attachments/assets/d7fb83cd-a2e2-4a5e-aa75-14e06165cc5a)