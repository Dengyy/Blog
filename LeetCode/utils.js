function colorLog (value, stringify = false) {
  /* elsint-disable */
  // @ts-ignore
  console.log(`%c${stringify ? JSON.stringify(value, 2) : value}`, 'color: yellow')
}

function test (expect, res) {
  colorLog(`expect: ${expect}, res: ${res}`)
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