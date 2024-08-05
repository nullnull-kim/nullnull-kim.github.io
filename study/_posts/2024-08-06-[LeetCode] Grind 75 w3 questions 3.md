# [LeetCode] Grind 75 questions (28/75) 973. K Closest Points to Origin
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/k-closest-points-to-origin/" target="_blank">문제로</a>

## 풀이
```java
class Solution {
    public int[][] kClosest(int[][] points, int k) {
        // 최대 힙을 사용하여 거리의 내림차순으로 정렬
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>(
            (a, b) -> (b[0] * b[0] + b[1] * b[1]) - (a[0] * a[0] + a[1] * a[1])
        );

        // 모든 점을 힙에 추가하고, 크기가 k를 초과하면 가장 먼 점을 제거
        for (int[] point : points) {
            maxHeap.add(point);
            if (maxHeap.size() > k) {
                maxHeap.poll();
            }
        }

        // 결과 배열 생성 및 반환
        int[][] result = new int[k][2];
        while (k-- > 0) {
            result[k] = maxHeap.poll();
        }

        return result;
    }
}
```

![image](https://github.com/user-attachments/assets/e1c3ea9e-fc6a-44e8-aad9-87ebb24e6855)

### PriorityQueue
PriorityQueue는 Java의 java.util 패키지에 속하는 클래스이며, 우선순위 큐(priority queue)로서 요소들이 우선순위에 따라 정렬되는 큐입니다. 기본적으로 최소 힙(min-heap) 구조를 사용하지만, 사용자 정의 비교기(Comparator)를 제공하여 최대 힙(max-heap)으로 사용할 수 있습니다.

#### 주요 특징
1. 우선순위 기반 정렬: 큐에 삽입된 요소들은 우선순위에 따라 정렬됩니다. 기본적으로 PriorityQueue는 자연 순서(natural ordering)를 따르며, 낮은 값이 높은 우선순위를 가집니다.
2. 힙 자료 구조: PriorityQueue는 힙 자료 구조를 기반으로 구현되어 있어 요소의 삽입과 제거가 O(log n)의 시간 복잡도를 가집니다.
3. 비동기적: PriorityQueue는 동기화되어 있지 않으므로, 여러 스레드가 동시에 접근할 경우 외부에서 동기화를 처리해야 합니다.

#### 주요 메소드
**생성자**  
- PriorityQueue(): 기본 초기 용량(11)과 자연 순서에 따라 정렬되는 PriorityQueue를 생성합니다.
- PriorityQueue(int initialCapacity): 초기 용량을 지정하여 PriorityQueue를 생성합니다.
- PriorityQueue(Comparator<? super E> comparator): 지정된 비교기를 사용하여 정렬되는 PriorityQueue를 생성합니다.
- PriorityQueue(int initialCapacity, Comparator<? super E> comparator): 초기 용량과 지정된 비교기를 사용하여 PriorityQueue를 생성합니다.

**기본 메소드**
- boolean add(E e): 지정된 요소를 큐에 추가합니다. 요소가 성공적으로 추가되면 true를 반환합니다.
- boolean offer(E e): 지정된 요소를 큐에 추가합니다. add()와 비슷하지만, 큐의 용량 제한을 초과해도 예외를 던지지 않습니다.
- E poll(): 큐의 맨 앞에 있는 요소를 제거하고 반환합니다. 큐가 비어있으면 null을 반환합니다.
- E remove(): 큐의 맨 앞에 있는 요소를 제거하고 반환합니다. 큐가 비어있으면 예외를 던집니다.
- E peek(): 큐의 맨 앞에 있는 요소를 반환하지만 제거하지는 않습니다. 큐가 비어있으면 null을 반환합니다.
- E element(): 큐의 맨 앞에 있는 요소를 반환하지만 제거하지는 않습니다. 큐가 비어있으면 예외를 던집니다.
- boolean isEmpty(): 큐가 비어있는지 여부를 반환합니다.
- int size(): 큐에 있는 요소의 개수를 반환합니다.
- void clear(): 큐의 모든 요소를 제거합니다.
- Object[] toArray(): 큐의 모든 요소를 포함하는 배열을 반환합니다.