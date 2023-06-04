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

  insert(root = this.root, key) {
    const node = new Node();
    if (root === null) {
      root = node;
      return root;
    }
    if (key < root.data) {
      if (root.left === null) {
        root.left = node;
      } else {
        this.insert(root.left, key);
      }
    } else if (key > root.data) {
      if (root.right === null) {
        root.right = node;
      } else {
        this.insert(root.right, key);
      }
    }
    return root;
  }

  deleteNode(root = this.root, key) {
    if (root === null) {
      return root;
    }
    if (key < root.data) {
      root.left = this.deleteNode(root.left, key);
    } else if (key > root.data) {
      root.right = this.deleteNode(root.right, key);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }
    }
    let temp = this.findMaxNode(root.left);
    root.data = temp.data;
    root.left = this.delete(root.left, temp.data);

    return root;
  }
  findMaxNode(node) {
    while (node && node.right !== null) {
      node = node.right;
    }
    return node;
  }

  levelOrder(fn) {
    if (fn) {
      return this.levelOrderTraversal(this.root, fn);
    } else {
      let values = [];
      this.levelOrderTraversal(this.root, (node) =>
        values.push(node.data)
      );
      return values;
    }
  }

  inorder(fn) {
    let values = [];
    this._inorder(
      this.root,
      fn || ((node) => values.push(node.data))
    );
    return fn ? undefined : values;
  }

  preorder(fn) {
    let values = [];
    this._preorder(
      this.root,
      fn || ((node) => values.push(node.data))
    );
    return fn ? undefined : values;
  }

  postorder(fn) {
    let values = [];
    this._postorder(
      this.root,
      fn || ((node) => values.push(node.data))
    );
    return fn ? undefined : values;
  }

  _inorder(node, fn) {
    if (node !== null) {
      this._inorder(node.left, fn);
      fn(node);
      this._inorder(node.right, fn);
    }
  }

  _preorder(node, fn) {
    if (node !== null) {
      fn(node);
      this._preorder(node.left, fn);
      this._preorder(node.right, fn);
    }
  }

  _postorder(node, fn) {
    if (node !== null) {
      this._postorder(node.left, fn);
      this._postorder(node.right, fn);
      fn(node);
    }
  }

  // Iterative Level Order Traversal
  levelOrderTraversal(node, fn) {
    if (node === null) return;
    let queue = [node]; // Initialize queue with root node

    while (queue.length > 0) {
      let currentNode = queue.shift(); // Dequeue
      fn(currentNode); // Apply function to the node
      if (currentNode.left) queue.push(currentNode.left); // Enqueue left child
      if (currentNode.right) queue.push(currentNode.right); // Enqueue right child
    }
  }

  height(node = this.root) {
    if (node === null) {
      return -1; // convention: height of an empty tree is -1, height of a leaf node is 0
    } else {
      return (
        1 +
        Math.max(
          this.height(node.left),
          this.height(node.right)
        )
      );
    }
  }

  // Calculate the depth of a node
  depth(node, root = this.root) {
    let depth = 0;
    while (root !== null) {
      if (node.data < root.data) {
        root = root.left;
      } else if (node.data > root.data) {
        root = root.right;
      } else {
        return depth;
      }
      depth++;
    }
    return -1; // if node is not present in the tree
  }

  // Check if the tree is balanced
  isBalanced(node = this.root) {
    if (node === null) {
      return true; // an empty tree is balanced
    }

    const heightDifference =
      this.height(node.left) - this.height(node.right);
    if (
      Math.abs(heightDifference) > 1 ||
      !this.isBalanced(node.left) ||
      !this.isBalanced(node.right)
    ) {
      return false;
    } else {
      return true;
    }
  }

  // Rebalance the tree
  rebalance() {
    const nodes = [];
    this._inorder(this.root, (node) =>
      nodes.push(node.data)
    );

    // Create a new balanced tree from the nodes
    const sortedArr = this.mergeSort(nodes);
    this.root = this.sortedArrayToBst(
      sortedArr,
      0,
      sortedArr.length - 1
    );
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

function getRandomArray(size, min = 0, max = 100) {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1) + min)
  );
}

// Step 1: Create a binary search tree from an array of random numbers < 100
const arr = getRandomArray(15);
const bst = new BinarySearchTree(arr);
console.log("Initial BST:");
bst.prettyPrint();

// Step 2: Confirm that the tree is balanced by calling isBalanced
console.log(
  "Is the initial BST balanced?",
  bst.isBalanced()
);

// Step 3: Print out all elements in level, pre, post, and in order
console.log("Level order:", bst.levelOrder());
console.log("Pre-order:", bst.preorder());
console.log("Post-order:", bst.postorder());
console.log("In-order:", bst.inorder());

// Step 4: Unbalance the tree by adding several numbers > 100
const unbalanceArray = getRandomArray(5, 101, 200);
for (let i = 0; i < unbalanceArray.length; i++) {
  bst.insert(unbalanceArray[i]);
}
console.log("\nBST after unbalancing:");
bst.prettyPrint();

// Step 5: Confirm that the tree is unbalanced by calling isBalanced
console.log(
  "Is the BST after unbalancing balanced?",
  bst.isBalanced()
);

// Step 6: Balance the tree by calling rebalance
bst.rebalance();
console.log("\nBST after rebalancing:");
bst.prettyPrint();

// Step 7: Confirm that the tree is balanced by calling isBalanced
console.log(
  "Is the BST after rebalancing balanced?",
  bst.isBalanced()
);

// Step 8: Print out all elements in level, pre, post, and in order
console.log(
  "Level order after rebalancing:",
  bst.levelOrder()
);
console.log("Pre-order after rebalancing:", bst.preorder());
console.log(
  "Post-order after rebalancing:",
  bst.postorder()
);
console.log("In-order after rebalancing:", bst.inorder());
