# [LeetCode] Grind 75 questions (16/75) Climbing Stairs
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/climbing-stairs/" target="_blank">문제로</a>

## 풀이
시간 복잡도 $O(2^n)$
```java
class Solution {
    public int climbStairs(int n) {
        if (n <= 1) {
            return 1;
        }
        return climbStairs(n - 1) + climbStairs(n - 2);
    }
}
```

![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/a21ca46b-5ad4-4af9-b1ac-fdc18ba717ed)

## 풀이2
시간 복잡도 $O[n]$
```java
class Solution {
    public int climbStairs(int n) {
        if (n <= 1) return 1;
        
        int[] dp = new int[n+1];
        dp[0] = 1;
        dp[1] = 1;
        
        for(int i = 2; i <= n; i++) {
            dp[i] = dp[i-2] + dp[i-1];
        }

        return dp[n];
    }
}
```

![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/82df595b-3b8e-413a-8e90-47259ea8a203)

## 풀이3
시간 복잡도 $O[n]$  
공간 복잡도 $O[1]$
```java
class Solution {
    public int climbStairs(int n) {
        if (n <= 1) return 1;

        int prev1 = 1;
        int prev2 = 1;
        
        for(int i = 2; i <= n; i++) {
            int temp = prev1 + prev2;
            prev1 = prev2;
            prev2 = temp;
        }

        return prev2;
    }
}
```

![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/6f5c6d29-37d9-4933-8410-8ea544a39fd5)