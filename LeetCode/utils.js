function colorLog (value, ...args) {
  /* elsint-disable */
  // @ts-ignore
  console.log(`%c${value}`, 'color: yellow', ...args)
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

function convertTree(arr, i = 0) {
  let res = null
  if (i < arr.length && arr[i] !== null) {
    res = new TreeNode(arr[i])
    if (2 * i + 1 < arr.length) {
      res.left = convertTree(arr, 2 * i + 1)
    }
    if (2 * i + 2 < arr.length) {
      res.right = convertTree(arr, 2 * i + 2)
    }
  }

  return res
}

function convertTreeToArray(tree, arr = [], i = 0) {
  if (!tree) return arr
  arr[i] = tree.val
  if (tree.left) {
    convertTreeToArray(tree.left, arr, 2 * i + 1)
  }
  if (tree.right) {
    convertTreeToArray(tree.right, arr, 2 * i + 2)
  }
  return arr
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

function logArrToTree (originArr) {
  const n = Math.floor(Math.log2(originArr.length)) + 1;
  logTree(n, convertTree(originArr))
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

// Definition for a Node.
function Node(val, neighbors) {
   this.val = val === undefined ? 0 : val;
   this.neighbors = neighbors === undefined ? [] : neighbors;
};

function convertGraph(arr, visited) {
  visited = visited || [];
  let res
  for (let i = 0; i < arr.length; i++) {
    let node
    const hasVisit = visited.filter(item => item.val === i + 1);
    if (hasVisit.length > 0) {
      node = hasVisit[0]
    } else {
      node = new Node(i + 1)
      visited.push(node);
    }
    res = res || node;

    if (node.neighbors.length > 0) {
      continue;
    }
    
    const neighbors = arr[i];
    for (let j = 0; j < neighbors.length; j++) {
      const neighbor = neighbors[j];
      const hasVisit = visited.filter(item => item.val === neighbor);
      if (hasVisit.length > 0) {
        node.neighbors.push(hasVisit[0])
      } else {
        const newNode = new Node(neighbor)
        node.neighbors.push(newNode)
        visited.push(newNode)
      }
    }
  }
  return res;
}

function graphToArray(graph, res) {
  if (!graph) return [];
  res = res || [];
  if (res[graph.val - 1]) {
    return;
  }
  res[graph.val - 1] = [];
  graph.neighbors.forEach(item => {
    res[graph.val - 1].push(item.val)
    graphToArray(item, res)
  });

  return res;
}

function logArray (arr) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      str += arr[i][j] + ', '
    }
    str += '\n'
  }

  colorLog(str);
  return str;
}