import Node from "./node.js";

class Tree {
  constructor(arr) {
    const sortedArray = arr
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      .sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    /* Base Case */
    if (start > end) {
      return null;
    }
    /* Get the middle element and make it root */
    var mid = parseInt((start + end) / 2);
    var node = new Node(arr[mid]);
    /* Recursively construct the left subtree and make it
          left child of root */
    node.left = this.buildTree(arr, start, mid - 1);
    /* Recursively construct the right subtree and make it
          right child of root */
    node.right = this.buildTree(arr, mid + 1, end);
    return node;
  }

  insert(key, root = this.root) {
    if (root === null) {
      root = new Node(key);
      return root;
    }

    if (key < root.value) {
      root.left = this.insert(key, root.left);
    } else if (key > root.value) {
      root.right = this.insert(key, root.right);
    }

    return root;
  }

  deletion(root = this.root, key) {
    if (root === null) return root;
    //find the ket by comparing the key the current node.value
    if (root.value > key) {
      root.left = this.deletion(root.left, key);
      return root;
    } else if (root.value < key) {
      root.right = this.deletion(root.right, key);
      return root;
    }

    // we come here once we find the key

    //check the returned root if it does not have children remove it
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }
    //if has both child find the next bigger
    //first go to the root.right then root.right.left then loop till you reach the farest left node
    let successor = this.findMinNode(root.right);

    // Copy the value of the inorder successor to the current node
    root.key = successor.key;

    // Delete the inorder successor from the right subtree
    root.right = this.deletion(root.right, successor.key);

    return root;
  }

  findMinNode(node) {
    // Keep traversing left until the leftmost node is reached

    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value, root = this.root) {
    if (root === null || root.value === value) return root;

    if (value < root.value) {
      return this.find(value, root.left);
    }

    if (value > root.value) {
      return this.find(value, root.right);
    }
  }

  levelOrder(root = this.root, func) {
    if (root == null) return root;
    let result = [];
    let q = [];
    q.push(root);
    while (q.length !== 0) {
      let currentNode = q.shift();
      if (func !== undefined) {
        func(currentNode);
      } else {
        result.push(currentNode.value);
      }

      if (currentNode.left !== null) {
        q.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        q.push(currentNode.right);
      }
    }
    return result;
  }

  preOrder(root = this.root, result = [], func) {
    if (root == null) {
      return;
    }
    if (func != undefined) {
      func(root);
    } else {
      result.push(root.value);
    }

    if (root.left) this.preOrder(root.left, result, func);

    if (root.right) this.preOrder(root.right, result, func);
    return result;
  }

  // A utility function to
  // do inorder traversal of BST
  inOrder(root = this.root, result = [], func) {
    if (root == null) {
      return;
    }
    if (root.left) this.inOrder(root.left, result, func);
    if (func != undefined) {
      func(root);
    } else {
      result.push(root.value);
    }

    if (root.right) this.inOrder(root.right, result, func);
    return result;
  }

  postOrder(func, root = this.root, result = []) {
    if (root == null) {
      return;
    }
    if (root.left) this.postOrder(func, root.left, result);
    if (root.right) this.postOrder(func, root.right, result);
    if (func != null) {
      func(root);
    } else {
      result.push(root.value);
    }

    return result;
  }

  height(root = this.root) {
    if (root === null) return -1;

    let lHeight = this.height(root.left);
    let rHeight = this.height(root.right);

    return Math.max(lHeight, rHeight) + 1;
  }

  depth(node, root = this.root, depth = 0) {
    if (root === null || node === null) return;
    if (node === root) return depth;
    if (node < root.value) {
      return this.depth(node, root.left, ++depth);
    } else {
      return this.depth(node, root.right, ++depth);
    }
  }

  isBalanced(root = this.root) {
    let heightOfLeft = this.height(root.left);
    let heightOfRight = this.height(root.right);
    const heightDiff = Math.abs(heightOfLeft - heightOfRight);
    return heightDiff < 2 ? true : false;
  }

  reBalance(root = this.root) {
    let arr = this.levelOrder(root);
    arr.sort((a, b) => a - b);
    return (this.root = this.buildTree(arr));
  }
}

export default Tree;
