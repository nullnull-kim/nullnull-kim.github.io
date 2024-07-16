# [LeetCode] Grind 75 questions (27/75)
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/insert-interval/" target="_blank">문제로</a>

## 풀이2
```java
class Solution {
public int[][] updateMatrix(int[][] mat) {
        int m = mat.length;
        int n = mat[0].length;
        int[][] distances = new int[m][n];
        Queue<int[]> queue = new LinkedList<>();
        
        // 모든 셀을 무한대로 초기화하고 0인 셀을 큐에 추가
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 0) {
                    distances[i][j] = 0;
                    queue.add(new int[]{i, j});
                } else {
                    distances[i][j] = Integer.MAX_VALUE;
                }
            }
        }
        
        // BFS를 위한 방향 배열
        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        
        // BFS 탐색
        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            int x = cell[0];
            int y = cell[1];
            
            for (int[] dir : directions) {
                int newX = x + dir[0];
                int newY = y + dir[1];
                
                // 유효한 범위 내에 있고, 더 짧은 거리를 발견한 경우 업데이트
                if (newX >= 0 && newX < m && newY >= 0 && newY < n) {
                    if (distances[newX][newY] > distances[x][y] + 1) {
                        distances[newX][newY] = distances[x][y] + 1;
                        queue.add(new int[]{newX, newY});
                    }
                }
            }
        }
        
        return distances;
    }
}
```

![image](https://github.com/user-attachments/assets/0bc8d781-f32e-4a91-9c8d-0cb396d45b73)

### 풀이방법

1. 거리 배열 초기화:
- 모든 셀을 Integer.MAX_VALUE로 초기화하고, 0인 셀을 distances 배열에 0으로 설정하고 큐에 추가합니다.

2. BFS를 위한 방향 배열:
- 네 방향 (상, 하, 좌, 우)으로 이동하기 위한 방향 배열을 설정합니다.

3. BFS 탐색:
- 큐에서 셀을 하나씩 꺼내어 네 방향으로 이동하며 유효한 범위 내에 있는 셀을 탐색합니다.
- 이동한 셀이 현재 셀보다 더 큰 거리 값을 가지고 있으면, 해당 셀의 거리를 업데이트하고 큐에 추가합니다.