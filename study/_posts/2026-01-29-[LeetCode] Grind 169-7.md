# [LeetCode Grind 169] Week1 - 7. Valid Anagram
<a href="https://leetcode.com/problems/valid-anagram/" target="_blank">문제로</a>

# 풀이
```kotlin
class Solution {
    fun isAnagram(s: String, t: String): Boolean {
        if(s.length != t.length) return false

        val count = mutableMapOf<Char, Int>()

        for(char in s) {
            if(count[char] == null) count[char] = 1
            else count[char] = count[char]!! + 1
        }
        
        for(char in t) {
            val v = (count[char] ?: return false) - 1
            if(v == 0) count.remove(char)
            if(v > 0) count[char] = v;
        }

        return count.isEmpty()
    }
}
```
<br>
<hr>
kotlin은 nullable한 값에 비교연산자를 사용할 수 없다... (대입은 된다)<br>
<hr>
```kotlin
// 이렇게 쓰면 에러가 난다... non-null로 만들어줘야 한다 ?:를 잘 활용하자
if(count[char] > 0) count[char] = count[char]!! - 1
```
