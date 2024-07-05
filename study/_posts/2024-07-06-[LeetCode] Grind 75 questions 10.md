# [LeetCode] Grind 75 questions (10/75)
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

![image](https://github.com/nullnull-kim/nullnull-kim.github.io/assets/77221161/98c7aba5-c363-4f2b-aedd-e655b32904b7)