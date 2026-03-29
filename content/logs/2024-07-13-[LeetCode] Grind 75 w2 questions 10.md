---
title: "[LeetCode] Grind 75 questions (23/75) Maximum Depth of Binary Tree"
date: 2024-07-13
categories: [logs]
series: Grind 75
---

<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/maximum-depth-of-binary-tree" target="_blank">문제로</a>

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
    public int maxDepth(TreeNode root) {
        if(root == null) return 0;
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    }
}
```

![LeetCode Maximum Depth of Binary Tree 풀이 제출 결과](/img/blog/2024-07-13-grind75-max-depth-binary-tree-01.png)