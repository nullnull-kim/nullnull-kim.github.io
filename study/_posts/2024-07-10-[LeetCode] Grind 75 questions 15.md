# [LeetCode] Grind 75 questions (13/75)
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/ransom-note/" target="_blank">문제로</a>

## 풀이
```java
class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        Map<Character, Integer> magazineMap = new HashMap();

        for(char c : magazine.toCharArray()) {
            magazineMap.put(c, magazineMap.getOrDefault(c, 0) + 1);
        }

        for(char c : ransomNote.toCharArray()) {
            magazineMap.put(c, magazineMap.getOrDefault(c, 0) - 1);
        }

        for(int i : magazineMap.values()) {
            if(i < 0) return false;
        }

        return true;
    }
}
```

![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/b6ea5a8f-14ff-4b8c-bdbb-69d40aebc614)

## 풀이2
```java
public class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        // 각 문자의 빈도를 저장할 배열 생성
        int[] count = new int[26];
        
        // magazine의 각 문자의 빈도 계산
        for (char c : magazine.toCharArray()) {
            count[c - 'a']++;
        }
        
        // ransomNote의 각 문자가 magazine에서 충분히 존재하는지 확인
        for (char c : ransomNote.toCharArray()) {
            if (count[c - 'a'] == 0) {
                // 문자가 없으면 false 반환
                return false;
            }
            // 문자를 사용했으므로 빈도 감소
            count[c - 'a']--;
        }
        
        // 모든 문자가 충분히 존재하면 true 반환
        return true;
    }
}
```

![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/3a4111a0-9b77-4953-841c-05150e045102)