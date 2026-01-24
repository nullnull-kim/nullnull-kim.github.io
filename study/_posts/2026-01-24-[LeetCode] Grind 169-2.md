# [LeetCode Grind 169] Week1 - 2. Valid Parentheses
<a href="https://leetcode.com/problems/valid-parentheses/" target="_blank">문제로</a>

# 풀이
```kotlin
class Solution {
    fun isValid(s: String): Boolean {
        var charArr = CharArray(s.length)
        var top = 0;

        for (c in s) {
            when(c) {
                '(', '[', '{' -> charArr[top++] = c
                ')' -> if(top == 0 || charArr[--top] != '(') return false
                '}' -> if(top == 0 || charArr[--top] != '{') return false
                ']' -> if(top == 0 || charArr[--top] != '[') return false
                else -> return false
            }
        }

        return top == 0;
    }
}

```
<br>
<hr>
*처음에 stack으로 풀었는데 charArray가 훨씬 빨랐다 ...*
<hr>
