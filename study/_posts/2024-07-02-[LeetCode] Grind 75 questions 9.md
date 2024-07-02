# [LeetCode] Grind 75 questions (9/75)
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/flood-fill/description/" target="_blank">문제로</a>

## 풀이
```java
class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int startColor = image[sr][sc];  // 1. 시작 색상 저장
        if (startColor == color) return image;  // 기저 조건: 색상이 같으면 변경 불필요
        fill(image, sr, sc, startColor, color);  // 4. 재귀 호출로 플러드 필 시작
        return image;
    }
    
    private void fill(int[][] image, int sr, int sc, int startColor, int newColor) {
        // 2. 기저 조건 설정: 범위를 벗어나거나 현재 픽셀의 색상이 시작 색상과 다르면 재귀 호출을 종료합니다.
        if (sr < 0 || sr >= image.length || sc < 0 || sc >= image[0].length || image[sr][sc] != startColor) {
            return;
        }
        // 3. 색상 변경
        image[sr][sc] = newColor;
        // 4. 재귀 호출: 4방향(상하좌우)으로 인접한 픽셀에 대해 재귀적으로 fill 메서드를 호출하여 동일한 작업을 반복합니다.
        fill(image, sr + 1, sc, startColor, newColor); // 아래로 이동
        fill(image, sr - 1, sc, startColor, newColor); // 위로 이동
        fill(image, sr, sc + 1, startColor, newColor); // 오른쪽으로 이동
        fill(image, sr, sc - 1, startColor, newColor); // 왼쪽으로 이동
    }
}
```

![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/1902aea0-3ac7-45ca-a706-ce916aa92a68)