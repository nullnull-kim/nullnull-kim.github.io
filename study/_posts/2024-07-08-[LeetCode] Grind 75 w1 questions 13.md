# [LeetCode] Grind 75 questions (13/75) Implement Queue using Stacks
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/implement-queue-using-stacks/description/" target="_blank">문제로</a>

## 풀이
```java
class MyQueue {
    private Stack<Integer> stack1;
    private Stack<Integer> stack2;

    public MyQueue() {
        stack1 = new Stack<>();
        stack2 = new Stack<>();
    }

    public void push(int x) {
        stack1.push(x);
    }

    public int pop() {
        if (stack2.isEmpty()) {
            while (!stack1.isEmpty()) {
                stack2.push(stack1.pop());
            }
        }
        return stack2.pop();
    }

    public int peek() {
        if (stack2.isEmpty()) {
            while (!stack1.isEmpty()) {
                stack2.push(stack1.pop());
            }
        }
        return stack2.peek();
    }

    public boolean empty() {
        return stack1.isEmpty() && stack2.isEmpty();
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue obj = new MyQueue();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.peek();
 * boolean param_4 = obj.empty();
 */
```

![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/d36dbd67-71e8-4c4e-9ae7-41800ad9d0ad)

### 참고
#### 초기화
- MyQueue 클래스는 두 개의 스택(stack1과 stack2)을 사용하여 초기화됩니다.
- stack1은 주로 새로운 원소를 저장하는 데 사용됩니다.
- stack2는 원소를 꺼내거나 앞에 있는 원소를 볼 때 사용됩니다.

#### push(int x)
- 원소 x를 stack1에 추가합니다.  
#### pop()
- stack2가 비어 있는 경우, stack1에 있는 모든 원소를 stack2로 이동합니다. 이는 stack2의 맨 위에 stack1의 맨 아래 원소가 오도록 하기 위함입니다. 그런 다음 stack2의 맨 위 원소를 제거하고 반환합니다.
- stack2가 비어 있지 않다면, stack2의 맨 위 원소를 제거하고 반환합니다.  
#### peek()
- stack2가 비어 있는 경우, stack1에 있는 모든 원소를 stack2로 이동합니다. 그런 다음 stack2의 맨 위 원소를 반환합니다.
- stack2가 비어 있지 않다면, stack2의 맨 위 원소를 반환합니다.  
#### empty()
- stack1과 stack2가 모두 비어 있으면 true를 반환하고, 그렇지 않으면 false를 반환합니다.