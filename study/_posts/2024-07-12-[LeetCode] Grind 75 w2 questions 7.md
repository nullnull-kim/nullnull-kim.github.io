# [LeetCode] Grind 75 questions (20/75) Add Binary
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/add-binary/" target="_blank">문제로</a>

## 풀이
```java
class Solution {
    public String addBinary(String a, String b) {
        StringBuilder result = new StringBuilder();
        int sizeA = a.length() - 1;
        int sizeB = b.length() - 1;
        int carry = 0;

        while(sizeA >= 0 || sizeB >= 0) {
            int digitA = sizeA >= 0 ? a.charAt(sizeA) - '0' : 0;
            int digitB = sizeB >= 0 ? b.charAt(sizeB) - '0' : 0;
            int sum = digitA + digitB + carry;

            result.append(sum % 2);
            carry = sum / 2;

            sizeA--;
            sizeB--;
        }

        if(carry != 0) result.append(carry);

        return result.reverse().toString();
    }
}
```

![image](https://github.com/user-attachments/assets/1be835cb-7603-4adc-981c-5835648311b6)