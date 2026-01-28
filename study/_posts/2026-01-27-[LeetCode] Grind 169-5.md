# [LeetCode Grind 169] Week1 - 5. Valid Palindrome
<a href="https://leetcode.com/problems/valid-parentheses/" target="_blank">문제로</a>

# 풀이
```kotlin
class Solution {
    fun isPalindrome(s: String): Boolean {

        var start = 0
        var end = s.length - 1

        while(start < end) {
            var f = s[start]
            var b = s[end]

            when{
                !f.isLetterOrDigit() -> start++
                !b.isLetterOrDigit() -> end--
                f.lowercaseChar() != b.lowercaseChar() -> return false
                else -> {start++; end--}
            }
        }
        return true
    }
}
```
<br>
<hr>
정규식으로 풀었더니 최하위 점수를 받았다 ... 정규식은 많은 비용을 감수한다 메모하기 ... kotlin의 when은 참 편리한것같다 ...
<hr>