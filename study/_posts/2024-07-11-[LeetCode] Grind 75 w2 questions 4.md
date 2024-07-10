# [LeetCode] Grind 75 questions (17/75)
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/longest-palindrome/description/" target="_blank">문제로</a>

## 풀이
시간 복잡도 $O(2^n)$
```java
class Solution {
    public int longestPalindrome(String s) {
        Map<Character, Integer> map = new HashMap();

        for(char c : s.toCharArray()) {
            map.put(c, map.getOrDefault(c, 0) +1);
        }

        int result = 0;

        for(int i : map.values()) {
            if(i % 2 == 0) result = result + i;
            else if(i-1 != 0 && (i -1) % 2 == 0) result = result + (i - 1); // ccc
        }

        for(int i : map.values()) {
            if(i % 2 == 1) return result + 1;
        }

        return result;
    }
}
```

![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/865dd4ae-2e3f-4c5e-95fe-330448ab6082)

## 풀이2
```java
class Solution {
    public int longestPalindrome(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }

        HashMap<Character, Integer> charCountMap = new HashMap<>();
        for (char c : s.toCharArray()) {
            charCountMap.put(c, charCountMap.getOrDefault(c, 0) + 1);
        }

        int length = 0;
        boolean oddFound = false;

        for (int count : charCountMap.values()) {
            if (count % 2 == 0) {
                length += count;
            } else {
                length += count - 1;
                oddFound = true;
            }
        }

        if (oddFound) {
            length += 1;
        }

        return length;
    }
}
```

![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/1f445f87-ace9-4555-a52f-1f787df4eb62)