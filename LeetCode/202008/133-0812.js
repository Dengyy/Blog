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
  return cloneWithVisit(node, [])
};

function cloneWithVisit(node, visited) {
  if (!node) {
    return null;
  }
  const clone = new Node(node.val);
  visited.push(clone);
  for (let i = 0; i < node.neighbors.length; i++) {
    const neighbor = node.neighbors[i];
    const hasVisit = visited.filter(item => item.val === neighbor.val);
    if (hasVisit.length > 0) {
      clone.neighbors.push(hasVisit[0]);
      continue;
    }
    const newNode = cloneWithVisit(neighbor, visited)
    clone.neighbors.push(newNode)
  }

  return clone;
}

colorLog('input', [[2,4],[1,3],[2,4],[1,3]])
colorLog('output', graphToArray(cloneGraph(convertGraph([[2,4],[1,3],[2,4],[1,3]]))))