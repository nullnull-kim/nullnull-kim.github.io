# [LeetCode] Grind 75 questions (24/75) Insert Interval
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/insert-interval/" target="_blank">문제로</a>

## 풀이2
```java
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0;
        int n = intervals.length;

        // 새로운 구간의 시작 이전에 있는 구간들을 결과에 추가
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i]);
            i++;
        }

        // 새로운 구간과 겹치는 구간들을 병합
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.add(newInterval);

        // 새로운 구간의 끝 이후에 있는 구간들을 결과에 추가
        while (i < n) {
            result.add(intervals[i]);
            i++;
        }

        return result.toArray(new int[result.size()][]);
    }
}

```

![image](https://github.com/user-attachments/assets/cf0cd391-896f-4540-b4f9-46711e3562e9)

### 풀이방법

#### 구간 분류:
newInterval을 삽입하기 전에 intervals를 세 가지 범주로 분류합니다:
- newInterval의 시작 이전에 있는 구간.
- newInterval과 겹치는 구간.
- newInterval의 끝 이후에 있는 구간.

#### 구간 병합:

newInterval과 겹치는 구간들을 병합합니다. 병합된 새로운 구간의 시작은 newInterval과 겹치는 구간 중 가장 작은 시작값이고, 병합된 새로운 구간의 끝은 newInterval과 겹치는 구간 중 가장 큰 끝값입니다.

#### 결과 반환:

세 범주로 분류된 구간들을 순서대로 합쳐서 결과를 반환합니다.