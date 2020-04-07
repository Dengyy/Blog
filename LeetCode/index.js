/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  if (!root) {
    return null;
  }
  const p1 = getParents(root, p)
  const q1 = getParents(root, q)

  if (!p1 || !q1) {
    return null;
  }
  
  for (let i = 0, len1 = p1.length; i < len1; i++) {
    for (let j = 0, len1 = q1.length; j < len1; j++) {
      if (p1[i] === q1[j]) {
        return p1[i]
      }
    }
  }

  return null;
};

function getParents(root, target) {
  if (!root) {
    return null;
  }

  if (target === root.val) {
    return [root.val];
  }

  const p1 = getParents(root.left, target)
  const p2 = getParents(root.right, target)
  if (p1) {
    p1.push(root.val)
    return p1
  }
  if (p2) {
    p2.push(root.val)
    return p2
  }
}

function tranverseTree(root) {
  if (!root) {
    return null;
  }
  tranverseTree(root.left)
  console.log('----val', root.val)
  tranverseTree(root.right)
}

// test(3, lowestCommonAncestor(
//   convertTree([3,5,1,6,2,0,8,null,null,7,4]),
//   5, 1
// ))
// test(5, lowestCommonAncestor(
//   convertTree([3,5,1,6,2,0,8,null,null,7,4]),
//   5, 4
// ))

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function convertTree(arr, i = 0) {
  let root
  if (i < arr.length && i >= 0 && arr[i]) {
    root = new TreeNode(arr[i])
    let leftIndex = 2 * (i + 1) - 1
    let rightIndex = leftIndex + 1
    root.left = convertTree(arr, leftIndex)
    root.right = convertTree(arr, rightIndex)
  }
  return root
}


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
  let list = head
  const tempMap = []
  
  while(list) {
    for (let j = 0, len = tempMap.length; j < len; j++) {
      if (tempMap[j] === list) {
        return `tail connects to node index ${j}`
      }
    }
    tempMap[i] = list
    i++
    list = list.next
  }
  
  return 'no cycle'
};
// test(2, detectCycle(
//   convertList([3,2,0,-4], 2),
// ))
// test(0, detectCycle(
//   convertList([0,-4], 0),
// ))


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
  for (let i = 0, len = arr.length; i > -1 && i < len && i < pos; i++) {
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

