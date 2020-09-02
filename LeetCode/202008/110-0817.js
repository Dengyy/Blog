// 给定一个二叉树，判断它是否是高度平衡的二叉树。
// 本题中，一棵高度平衡二叉树定义为：
// 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。
// 示例 1:
// 给定二叉树 [3,9,20,null,null,15,7]
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回 true 。
// 示例 2:
// 给定二叉树 [1,2,2,3,3,null,null,4,4]
//        1
//       / \
//      2   2
//     / \
//    3   3
//   / \
//  4   4
// 返回 false 。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
  if (!root) return true;

  const heightLeft = {
    min: 0,
    max: 0,
  }
  const heightRight = {
    min: 0,
    max: 0,
  }
  isBalancedWithI(root.left, heightLeft);
  isBalancedWithI(root.right, heightRight);
  colorLog('height', root, heightLeft, heightRight)
  return Math.abs(heightLeft.max - heightRight.max) <= 1;
};

function isBalancedWithI (root, height, curHeight = 0) {
  if (!root || !root.val) {
    if (height.min === 0 || curHeight < height.min) {
      height.min = curHeight
    }
    return height.max - height.min <= 1
  }

  curHeight += 1;
  if (curHeight > height.max) {
    height.max = curHeight;
  }
  if (!isBalancedWithI(root.left, height, curHeight)) {
    return false;
  }
  if (!isBalancedWithI(root.right, height, curHeight)) {
    return false;
  }

  return true;
}

logArrToTree([1,2,2,3,null,null,3,4,null,null,4])
test(false, isBalanced(convertTree([1,2,2,3,null,null,3,4,null,null,4])))
// test(false, isBalanced(convertTree([1,2,2,3,3,null,null,4,4])))
// test(true, isBalanced(convertTree([3,9,20,null,null,15,7])))
// test(true, isBalanced(convertTree([1,2,2,3,3,3,3,4,4,4,4,4,4,null,null,5,5])))
