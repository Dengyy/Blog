/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  var h = l = new ListNode(0);
  while(l1 || l2) {
    if (l1 && !validNumber(l1.val)) {
      return null;
    }
    if (l2 && !validNumber(l2.val)) {
      return null;
    }
    var sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + l.val;
    l.val = sum % 10;

    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }

    if (l1 || l2) {
      l.next = new ListNode(Math.floor(sum / 10));
      l = l.next;
    } else if (sum > 9) {
      l.next = new ListNode(Math.floor(sum / 10));
    }
  }

  return h;
};

function validNumber (num) {
  return !(num > 9 || num < 0)
}

logList(addTwoNumbers(convertList([2,4,5]), convertList([5,6,4])))