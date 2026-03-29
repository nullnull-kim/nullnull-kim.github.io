---
title: "[LeetCode] Grind 75 questions (6/75) Invert Binary Tree"
date: 2024-07-01
categories: [logs]
series: Grind 75
---

<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/invert-binary-tree/" target="_blank">문제로</a>

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
    public TreeNode invertTree(TreeNode root) {
        if(root == null) return root;
        return invert(root);
    }

    private TreeNode invert(TreeNode node) {
        if(node == null) return node;
        TreeNode temp = node.left;
        node.left = node.right;
        node.right = temp;
        invert(node.left);
        invert(node.right);
        return node;
    }
}
```
![image](/img/blog/2024-07-01-grind75-invert-binary-tree-01.png)

---
> 이 문제는 Grind 169에서도 다뤘다: [Grind 169 - Invert Binary Tree]({{< ref "2026-01-28-[LeetCode] Grind 169-6.md" >}})