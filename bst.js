const arr = [1, 2, 3, 4];

//a binary tree node
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function sortedArrayToBst(arr, start, end) {
  const mid = (start + end) / 2;
  if (start > end) {
    return null;
  }
  const node = new Node(arr[mid]);
  node.left = sortedArrayToBst(arr, start, mid - 1);
  node.left = sortedArrayToBst(arr, mid + 1, end);
  return node;
}

console.log(sortedArrayToBst(arr, 0, 3));
