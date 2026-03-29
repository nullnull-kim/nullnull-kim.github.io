---
title: "[LeetCode] Grind 75 questions (5/75) Valid Palindrome"
date: 2024-07-01
categories: [logs]
series: Grind 75
---

<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/valid-palindrome/" target="_blank">문제로</a>

## 풀이
```java
class Solution {
    public boolean isPalindrome(String s) {
        s = s.toLowerCase().replaceAll("[^a-z0-9]", "");
        int point = s.length() / 2;

        StringBuffer sb = new StringBuffer(s.substring(s.length() - point));
        return s.substring(0,point).equals(sb.reverse().toString());
    }
}
```
![image](/img/blog/2024-07-01-grind75-valid-palindrome-01.png)


## 풀이 2
```java
class Solution {
    public boolean isPalindrome(String s) {
        s = s.toLowerCase().replaceAll("[^a-z0-9]", "");
        
        int left = 0;
        int right = s.length() - 1;

        while(left < right) {
            if(s.charAt(left++) != s.charAt(right--)) return false;
        }

        return true;
    }
}
```

![image](/img/blog/2024-07-01-grind75-valid-palindrome-02.png)