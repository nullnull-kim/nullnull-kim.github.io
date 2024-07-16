# [LeetCode] Grind 75 questions (25/75) Maximum Subarray
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/maximum-subarray/description/" target="_blank">문제로</a>

## 풀이2
```java
class Solution {
    public int maxSubArray(int[] nums) {
        int maxCurrent = nums[0];
        int maxGlobal = nums[0];

        for(int i = 1; i < nums.length; i++) {
            maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
            if(maxCurrent > maxGlobal) maxGlobal = maxCurrent;
        }

        return maxGlobal;
    }
}
```

![image](https://github.com/user-attachments/assets/286b5147-4d45-43db-ba75-8bf8f05d31fe)

### 참고
Kadane's Algorithm은 배열에서 연속된 서브어레이(subarray)의 최대 합을 찾기 위한 효율적인 알고리즘입니다.  
이 알고리즘은 한 번의 배열 순회로 문제를 해결할 수 있어서 시간 복잡도가 O(n)입니다.  
이 방법은 현재까지의 최대 합과 현재 위치에서 끝나는 최대 합을 지속적으로 비교하여 업데이트하는 방식으로 동작합니다.

#### Kadane's Algorithm의 동작 방식
초기화:  
1. maxCurrent를 배열의 첫 번째 요소로 설정합니다.
2. maxGlobal을 배열의 첫 번째 요소로 설정합니다.

배열 순회:  
1. 두 번째 요소부터 배열의 끝까지 반복합니다.
2. 현재 요소를 포함하는 서브어레이의 합 (maxCurrent + nums[i])과 현재 요소 자체 (nums[i])를 비교하여 더 큰 값을 maxCurrent로 갱신합니다.
3. maxCurrent가 maxGlobal보다 크다면 maxGlobal을 maxCurrent로 갱신합니다.

결과 반환:  
1. 반복문이 끝난 후 maxGlobal에는 최대 서브어레이의 합이 저장되어 있습니다.