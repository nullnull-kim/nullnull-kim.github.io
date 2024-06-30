# [LeetCode] Grind 75 questions (1/75)
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/valid-parentheses/description/" target="_blank">문제로</a>

## 풀이
```java
class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();

        for(int i = 0; i < s.length(); i++) {
            if(s.charAt(i) == '(') {
                stack.push(')');
            } else if (s.charAt(i) =='{') {
                stack.push('}');
            } else if (s.charAt(i) == '[') {
                stack.push(']');
            } else {
                if(stack.isEmpty()) return false;
                char c = stack.pop();
                if(c != s.charAt(i)) return false;
            }
        }
        return stack.isEmpty();
    }
}
```

![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/1d4a93d4-1744-47db-bbbe-22cf45243343)
