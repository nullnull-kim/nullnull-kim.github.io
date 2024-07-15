# [LeetCode] Grind 75 questions (21/75) Diameter of Binary Tree
<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/diameter-of-binary-tree/" target="_blank">문제로</a>

## 풀이
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    private int diameter = 0; // 두 점을 연결하는 가장 긴 경로, 지름 

    public int diameterOfBinaryTree(TreeNode root) {
        getHeight(root);
        return diameter;
    }

    public int getHeight(TreeNode node) {
        if (node == null) return 0;
        
        int leftHeight = getHeight(node.left);
        int rightHeight = getHeight(node.right);
        
        // 노드를 통해 지나가는 경로의 길이
        int pathThroughNode = leftHeight + rightHeight;
        
        // 현재까지의 최대 직경 갱신
        diameter = Math.max(diameter, pathThroughNode);
        
        // 현재 노드의 높이 반환
        return Math.max(leftHeight, rightHeight) + 1;
    }
}
```

![image](https://github.com/user-attachments/assets/3de81a08-078b-4347-a97f-90f3637f42aa)