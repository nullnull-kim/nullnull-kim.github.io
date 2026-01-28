# [LeetCode Grind 169] Week1 - 6. Invert Binary Tree
<a href="https://leetcode.com/problems/invert-binary-tree/" target="_blank">문제로</a>

# 풀이
```kotlin
/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun invertTree(root: TreeNode?): TreeNode? {
        if(root == null) return null;
        invertTree(root.left)
        invertTree(root.right)

        var temp = root.left
        root.left = root.right
        root.right = temp

        return root
    }
}
```
<br>
<hr>
전위탐색<br>
1. 현재 노드<br>
2. 왼쪽 서브트리<br>
3. 오른쪽 서브트리<br> 
<hr>
중위탐색<br>
1. 왼쪽 서브트리<br>
2. 현재 노드<br>
3. 오른쪽 서브트리
<hr>
후위탐색<br>
1. 왼쪽 서브트리<br>
2. 오른쪽 서브트리<br>
3. 현재 노드
<hr>
TODO. 전위,중위,후위 탐색이 필요한 경우 각각 공부해놓기
<hr>