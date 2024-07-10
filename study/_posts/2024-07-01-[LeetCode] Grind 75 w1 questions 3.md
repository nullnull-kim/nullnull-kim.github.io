# [LeetCode] Grind 75 questions (3/75)
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/merge-two-sorted-lists/" target="_blank">문제로</a>

## 풀이
```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode result = new ListNode();
        ListNode dummy = result;

        // list를 비교하여 dummy에 적재한다.
        while(list1 != null && list2 != null) {
            if(list1.val > list2.val) {
                dummy.next = list2;
                list2 = list2.next;
            } else {
                dummy.next = list1;
                list1 = list1.next;
            }
            dummy = dummy.next;
        }

        // 두 리스트 중 하나가 null이 되었으므로 남은 lsit를 next에 적재한다.
        if(list1 == null) dummy.next = list2;
        else dummy.next = list1;

        return result.next; // 초기값은 null이므로 next부터 반환한다.
    }
}
```
![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/20afb28f-fea9-4747-b6fb-d1675ebd60a8)

### 참고
Java에서 객체를 복사할 때 얕은 복사(shallow copy)와 깊은 복사(deep copy)의 개념은 매우 중요합니다. 이 두 가지 복사 방법의 차이를 이해하면 객체의 데이터가 어떻게 복사되고, 두 객체가 어떻게 상호작용하는지를 알 수 있습니다.

1. 얕은 복사 (Shallow Copy)
- 얕은 복사는 객체의 모든 필드를 그대로 복사하지만, 객체가 참조하고 있는 다른 객체들은 복사하지 않습니다. 따라서 원본 객체와 복사된 객체는 동일한 참조를 공유하게 됩니다.
```java
class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

class ShallowCopyExample {
    public static void main(String[] args) {
        Person original = new Person("Alice", 30);
        Person shallowCopy = original;  // 얕은 복사

        System.out.println(original.name);  // Alice
        System.out.println(shallowCopy.name);  // Alice

        shallowCopy.name = "Bob";

        System.out.println(original.name);  // Bob (변경됨)
        System.out.println(shallowCopy.name);  // Bob
    }
}

```

2. 깊은 복사 (Deep Copy)
- 깊은 복사는 객체의 모든 필드뿐만 아니라, 객체가 참조하고 있는 다른 객체들까지 모두 새롭게 복사합니다. 따라서 원본 객체와 복사된 객체는 독립적인 상태를 유지합니다.
```java
class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // 깊은 복사를 위한 생성자
    Person(Person person) {
        this.name = person.name;
        this.age = person.age;
    }
}

class DeepCopyExample {
    public static void main(String[] args) {
        Person original = new Person("Alice", 30);
        Person deepCopy = new Person(original);  // 깊은 복사

        System.out.println(original.name);  // Alice
        System.out.println(deepCopy.name);  // Alice

        deepCopy.name = "Bob";

        System.out.println(original.name);  // Alice (변경되지 않음)
        System.out.println(deepCopy.name);  // Bob
    }
}

```