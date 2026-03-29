---
title: "[LeetCode] Grind 75 questions (10/75) Lowest Common Ancestor of a Binary Search Tree"
date: 2024-07-06
categories: [logs]
series: Grind 75
---

<a href="https://www.techinterviewhandbook.org/grind75" target="_blank">Grind75</a>  
<a href="https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" target="_blank">문제로</a>

## 풀이
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */

class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if(root.val > p.val && root.val > q.val) {
            // root보다 값이 작을 경우
            return lowestCommonAncestor(root.left, p, q);
        } else if(root.val < p.val && root.val < q.val) {
            // root보다 값이 클 경우
            return lowestCommonAncestor(root.right, p, q);
        } else {
            // TreeNode p와 q가 같은 노드에 없다면 root가 부모다
            return root;
        }
    }
}
```

![LeetCode Lowest Common Ancestor of a BST 풀이 제출 결과](/img/blog/2024-07-06-grind75-lowest-common-ancestor-bst-01.png)