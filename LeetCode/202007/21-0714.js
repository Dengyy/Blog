// [21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  if (!l1 && !l2) {
    return null;
  }
  let h1 = l1, h2 = l2, l = new ListNode(), res = l;
  while(h1 && h2) {
    if (h1.val < h2.val) {
      res.val = h1.val;
      h1 = h1.next;
    } else {
      res.val = h2.val;
      h2 = h2.next;
    }
    res.next = new ListNode();
    res = res.next
  }

  if (h1) {
    res.val = h1.val;
    res.next = h1.next;
  }
  if (h2) {
    res.val = h2.val;
    res.next = h2.next;
  }

  return l;
};

logList(mergeTwoLists(convertList([]), convertList([0])))