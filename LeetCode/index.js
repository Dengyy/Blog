/* 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

说明：不允许修改给定的链表。

 

示例 1：

输入：head = [3,2,0,-4], pos = 1
输出：tail connects to node index 1
解释：链表中有一个环，其尾部连接到第二个节点。


示例 2：

输入：head = [1,2], pos = 0
输出：tail connects to node index 0
解释：链表中有一个环，其尾部连接到第一个节点。


示例 3：

输入：head = [1], pos = -1
输出：no cycle
解释：链表中没有环。


 

进阶：
你是否可以不用额外空间解决此题？ */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head, pos) {
  if (!head) {
    return null;
  }
  let i = 0
  let temp = head
  let index = head
  let test
  
  while(temp) {
    const next = temp.next
    temp = new ListNode(temp.val === true)
    index = new ListNode(i)
    test = temp
    temp.next = next
    index.next = next

    debugger
    if (!temp.val) {
      i++
      temp.val = true
    } else {
      return `tail connects to node index ${index.val}`
    }
    temp = temp.next
    index = index.next
    test = 
  }
  
  return 'no cycle'
};
test(2, detectCycle(
  convertList([3,2,0,-4], 2),
))


var sortList = function(head) {
  if (!head) {
    return null
  }
  let list = head
  const res = new ListNode(list.val)
  while (list) {
    let cur = res
    let lastCur
    let lessThanMax = false
    while (cur) {
      if (list.val < cur.val) {
        const newNode = new ListNode(list.val)
        newNode.next = cur
        cur = newNode
        lessThanMax = true
        break
      }
      lastCur = cur
      cur = cur.next
    }

    lastCur.next = new ListNode(list.val)
    list = list.next
  }
  return res
};

/* test([4,2,1,3], convertArr(
  sortList(
    convertList([1,2,3,4])
  )
)) */

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
  if (!l1 && !l2) {
    return null
  }

  let num1 = l1, num2 = l2
  let res = new ListNode(0)
  let resNext = res
  while(num1 || num2) {
    if (num1) {
      resNext.val += num1.val
      num1 = num1.next
    }
    if (num2) {
      resNext.val += num2.val
      num2 = num2.next
    }

    const biggerThan9 = resNext.val > 9
    if (num1 || num2 || biggerThan9) {
      resNext.next = new ListNode(0)
      if (resNext.val > 9) {
        resNext.val -= 10
        resNext.next.val = 1
      }
      resNext = resNext.next
    }
  }

  return res
};


/* test([7,0,8], convertArr(
  addTwoNumbers(
    convertList([2,4,3]),
    convertList([5,6,4])
  )
)) */

/* test([0,1], convertArr(
  addTwoNumbers(
    convertList([5]),
    convertList([5])
  )
)) */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let list = head;
  if (!list) {
    return null
  }

  if (!list.next) {
    return new ListNode(list.val)
  }

  const res = reverseList(list.next)
  let next = res
  while (next.next) {
    next = next.next
  }
  next.next = new ListNode(list.val)

  return res
};

/* var reverseList = function(head) {
  let list = head;
  if (!list) {
    return null
  }

  let res = null
  while(list) {
    const preNode = new ListNode(list.val)
    preNode.next = res
    res = preNode
    list = list.next
  }

  return res
}; */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function convertList (arr, pos) {
  let head = null
  let tail = null
  for (let len = arr.length, i = len - 1; i >= 0; i--) {
    const nextNode = new ListNode(arr[i])
    nextNode.next = head
    head = nextNode
    if (!tail) {
      tail = head
    }
  }

  let cur = head
  for (let i = pos, len = arr.length; i > -1 && i < len; i++) {
    cur = cur.next
  }

  if (pos > -1) {
    tail.next = cur
  }

  return head
}

function convertArr (list) {
  const res = []
  while(list) {
    res.push(list.val)
    list = list.next
  }
  return res
}

function test (expect, res) {
  console.log(`expect: ${expect}, res: ${res}`)
}

/* test([1,1,2,3,4,4], convertArr(mergeTwoLists(convertList([1,2,4]), convertList([1,3,4]))))
test([], convertArr(mergeTwoLists(convertList([]), convertList([])))) */

/* test([5,4,3,2,1], convertArr(
  reverseList(
    convertList([1,2,3,4,5])
  )
)) */

