//a binary tree node
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(arr) {
    const sortedArr = this.mergeSort(
      Array.from(new Set(arr))
    );
    this.root = this.sortedArrayToBst(
      sortedArr,
      0,
      sortedArr.length - 1
    );
  }

  mergeSort(arr) {
    if (arr.length < 2) {
      return arr;
    }
    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    let sortedLeft = this.mergeSort(left);
    let sortedRight = this.mergeSort(right);

    return this.merge(sortedLeft, sortedRight);
  }

  merge(left, right) {
    let result = [];

    while (left.length && right.length) {
      if (left[0] < right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    return result.concat(left.length ? left : right);
  }

  sortedArrayToBst(arr, start, end) {
    const mid = Math.floor((start + end) / 2);
    if (start > end) {
      return null;
    }
    const node = new Node(arr[mid]);
    node.left = this.sortedArrayToBst(arr, start, mid - 1);
    node.right = this.sortedArrayToBst(arr, mid + 1, end);

    return node;
  }
  search(root = this.root, key) {
    if (root === null || root.data === key) {
      return root;
    } else if (root.data < key) {
      return this.search(root.right, key);
    } else {
      return this.search(root.left, key);
    }
  }
  prettyPrint = (
    node = this.root,
    prefix = "",
    isLeft = true
  ) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(
      `${prefix}${isLeft ? "└── " : "┌── "}${node.data}`
    );
    if (node.left !== null) {
      this.prettyPrint(
        node.left,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  };
}

const arr = [
  1, 7, 4, 23, 8, 9, 324, 4525, 11, 2, 5, 53, 4245, 23, 46,
  34, 2, 143, 5, 232, 32, 423, 432432, 43124, 23423, 636,
  32, 14, 5, 7, 636, 4, 51, 41, 45, 6734, 657, 2, 443, 63,
  4, 4, 3, 5, 7, 9, 67, 6345, 324,
];
const bst = new BinarySearchTree(arr);
bst.prettyPrint();
// console.log(bst);
console.log(bst.search(bst.root, 9));
