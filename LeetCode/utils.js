function colorLog (value, stringify = false) {
  /* elsint-disable */
  // @ts-ignore
  console.log(`%c${stringify ? JSON.stringify(value, 2) : value}`, 'color: yellow')
}

function test (expect, res) {
  colorLog(`expect: ${expect}, res: ${res}`)
}

function logList(l) {
  let h = l;
  let str = '';
  while(h) {
    str += (h.val + (h.next ? '->' : ''));
    h = h.next;
  }
  colorLog(str);
}

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

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function buildTree(n, leftVal, rightVal) {
  if (n < 1) {
    return null
  }

  var tree = new TreeNode(null)
  if (n === 1) {
    tree.left = new TreeNode(leftVal)
    tree.right = new TreeNode(rightVal)
    return tree
  }

  tree.left = buildTree(n - 1, leftVal, rightVal, tree)
  tree.left.val = leftVal
  tree.right = buildTree(n - 1, leftVal, rightVal, tree)
  tree.right.val = rightVal
  return tree
}

function logTree (n, tree, arr) {
  if (n < 1 || !tree) {
    return
  }

  arr = arr || []
  arr.count = arr.count || 0
  arr.n = arr.n || n

  logTree(n - 1, tree.left, arr)
  arr[n - 1] = arr[n - 1] || []
  arr[n - 1][arr.count] = tree.val
  arr.count += 1
  logTree(n - 1, tree.right, arr)
  
  if (arr.n === n) {
    var str = ''
    for (let i = n - 1; i > -1; i--) {
      for (let j = 0; j <= arr.count; j++) {
        if (arr[i][j] === undefined) {
          arr[i][j] = ' '
        }
      }
      str += arr[i].join('') + '\n'
    }
    colorLog(str)
  }
}

var WalkTreeType = {
  Before: 1,
  Center: 1,
  After: 1,
}    

function walkTree(tree, cb, type) {
  if (!tree) {
    return
  }

  switch (type) {
    case WalkTreeType.Before: {
      walkTree(tree.left, cb)
      cb(tree.val, tree)
      walkTree(tree.right, cb)
      break;
    }
    case WalkTreeType.After: {
      walkTree(tree.left, cb)
      walkTree(tree.right, cb)
      cb(tree.val, tree)
      break;
    }
    default: {
      cb(tree.val, tree)
      walkTree(tree.left, cb)
      walkTree(tree.right, cb)
      break;
    }

  }
}