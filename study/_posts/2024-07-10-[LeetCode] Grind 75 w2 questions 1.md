# [LeetCode] Grind 75 questions (14/75) First Bad Version
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/first-bad-version/" target="_blank">문제로</a>

## 풀이
```java
/* The isBadVersion API is defined in the parent class VersionControl.
      boolean isBadVersion(int version); */

public class Solution extends VersionControl {
    public int firstBadVersion(int n) {
        int left = 1;
        int right = n;

        while(left < right) {
            int mid = left + (right - left) / 2; // 정수 오버플로를 방지하면서 중간값 계산
            if(isBadVersion(mid)) right = mid; // mid가 불량이면 그 이전에도 불량이 있을 수 있으므로 right를 mid로 설정
            else left = mid + 1; // mid가 불량이 아니라면 그 이후에 불량이 있으므로 left를 mid + 1로 설정
        }

        return left; // left가 right와 같아지는 시점에 첫 번째 불량품을 찾는다.
    }
}
```

![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/c561d5e3-f1b4-43d5-a223-641076149b92)
