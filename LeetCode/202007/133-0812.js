/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

// todo: 图的特点，简单图，连通图

const visited = [];
/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
  if (!node) {
    return null;
  }
  let clone = new Node(node.val);
  for (let i = 0; i < node.neighbors.length; i++) {
    const neighbor = node.neighbors[i];
    if (visited.includes(neighbor.val)) {
      continue;
    }
    const newNode = cloneGraph(neighbor)
    clone.neighbors.push(newNode)
  }

  return clone;
};

test(cloneGraph([[2,4],[1,3],[2,4],[1,3]]), [[2,4],[1,3],[2,4],[1,3]])