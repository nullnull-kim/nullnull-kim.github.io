# [LeetCode] Grind 75 questions (7/75) Valid Anagram
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/valid-anagram/" target="_blank">문제로</a>

## 풀이
```java
class Solution {
    public boolean isAnagram(String s, String t) {
        char[] c1 = s.toCharArray();
        char[] c2 = t.toCharArray();

        Arrays.sort(c1);
        Arrays.sort(c2);

        return new String(c1).equals(new String(c2));
    }
}
```
![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/cd300794-d17f-4c73-948e-101bfbebf2ed)

## 풀이2
```java
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        Map<Character, Integer> count = new HashMap<>();

        for(char c : s.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) + 1);
        }

        for(char c : t.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) -1);
        }

        for(int n : count.values()) {
            if(n != 0) return false;
        }

        return true;
    }
}
```
![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/6afdf503-ccb3-4585-b933-e6f22d16b63f)
