import { Node } from './node.js';
import { Queue } from './queue.js';

export class Tree {
  constructor(array, start, end) {
    this.array = array;
    this.start = start;
    this.end = end;
    this.root = this.#buildTree(this.array);
  }

  #buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);

    root.left = this.#buildTree(array, start, mid - 1);
    root.right = this.#buildTree(array, mid + 1, end);

    return root;
  }

  includes(value, root = this.root) {
    if (root === null) return false;
    if (value === root.data) return true;
    if (value > root.data) {
      return this.includes(value, root.right);
    } else {
      return this.includes(value, root.left);
    }
  }

  insert(value, root = this.root) {
    // Below is to check if tree is empty
    if (this.root === null) {
      this.root = new Node(value);
      return this.root;
    }
    // Below is to just return immediately if the value is already in the tree
    if (value === root.data)
      return console.log(`Value: ${root.data}. It's already in here, Bruh`);
    if (value > root.data) {
      if (root.right === null) {
        root.right = new Node(value);
        return console.log(`New node added with value: ${root.right.data}`);
      } else {
        return this.insert(value, root.right);
      }
    } else {
      if (root.left === null) {
        root.left = new Node(value);
        return console.log(`New node added with value: ${root.left.data}`);
      } else {
        return this.insert(value, root.left);
      }
    }
  }

  deleteItem(value, root = this.root) {
    if (root === null) return root;

    if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      const successorNode = this.getSuccessor(root);
      root.data = successorNode.data;
      root.right = this.deleteItem(successorNode.data, root.right);
    }
    return root;
  }

  getSuccessor(currentNode) {
    currentNode = currentNode.right;
    while (currentNode !== null && currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  levelOrderForEach(callback, root = this.root) {
    if (!callback) {
      throw new Error('Callback Function is required, Ya Silly Sally');
    }

    if (root === null) return root;

    const nodeQueue = new Queue();
    nodeQueue.enqueue(root);

    while (nodeQueue.front < nodeQueue.end) {
      if (nodeQueue.queue[nodeQueue.front].left !== null) {
        nodeQueue.enqueue(nodeQueue.queue[nodeQueue.front].left);
      }
      if (nodeQueue.queue[nodeQueue.front].right !== null) {
        nodeQueue.enqueue(nodeQueue.queue[nodeQueue.front].right);
      }
      callback(nodeQueue.dequeue().data);
    }
  }

  levelOrderForEachRecur(callback, root = this.root, nodeQueue = new Queue()) {
    if (!callback) {
      throw new Error('Callback Function is required, Ya Silly Sally');
    }

    if (root === null) return;

    if (root === this.root) {
      nodeQueue.enqueue(root);
    }
    if (nodeQueue.queue[nodeQueue.front].left !== null) {
      nodeQueue.enqueue(nodeQueue.queue[nodeQueue.front].left);
    }
    if (nodeQueue.queue[nodeQueue.front].right !== null) {
      nodeQueue.enqueue(nodeQueue.queue[nodeQueue.front].right);
    }
    callback(nodeQueue.dequeue().data);
    if (nodeQueue.front >= nodeQueue.end) return;
    return this.levelOrderForEachRecur(
      callback,
      nodeQueue.queue[nodeQueue.front],
      nodeQueue
    );
  }

  inOrderForEach(callback, root = this.root) {
    if (!callback) {
      throw new Error('Callback Function is required, Ya Silly Sally');
    }

    if (root === null) return;

    this.inOrderForEach(callback, root.left);
    callback(root.data);
    this.inOrderForEach(callback, root.right);
  }

  preOrderForEach(callback, root = this.root) {
    if (!callback) {
      throw new Error('Callback Function is required, Ya Silly Sally');
    }

    if (root === null) return;
    callback(root.data);
    this.preOrderForEach(callback, root.left);
    this.preOrderForEach(callback, root.right);
  }

  postOrderForEach(callback, root = this.root) {
    if (!callback) {
      throw new Error('Callback Function is required, Ya Silly Sally');
    }

    if (root === null) return;
    this.postOrderForEach(callback, root.left);
    this.postOrderForEach(callback, root.right);
    callback(root.data);
  }

  height(value, root = this.root) {
    if (root === null) return undefined;
    if (value > root.data) {
      return this.height(value, root.right);
    }

    if (value < root.data) {
      return this.height(value, root.left);
    }

    if (value === root.data) {
      let countRightSubtree = 0;
      let countLeftSubtree = 0;
      let currentRightNode = root;
      let currentLeftNode = root;
      while (currentRightNode.right !== null || currentLeftNode.left !== null) {
        if (currentRightNode.right !== null) {
          currentRightNode = currentRightNode.right;
          countRightSubtree++;
        }
        if (currentLeftNode.left !== null) {
          currentLeftNode = currentLeftNode.left;
          countLeftSubtree++;
        }
      }
      let height = Math.max(countRightSubtree, countLeftSubtree);
      return height;
    }
  }

  depth(value, root = this.root, count = 0) {
    if (root === null) return undefined;
    if (value > root.data) {
      count++;
      return this.depth(value, root.right, count);
    } else if (value < root.data) {
      count++;
      return this.depth(value, root.left, count);
    }
    if (value === root.data) return count;
  }

  findHeightUtil(value, root = this.root, height) {
    if (!root) return -1;

    // Store the maximum height of left and right subtree
    let leftHeight = this.findHeightUtil(value, root.left, height);
    let rightHeight = this.findHeightUtil(value, root.right, height);

    // Update height of the current node
    let ans = Math.max(leftHeight, rightHeight) + 1;

    // If current node is the required node, update height
    if (root.data === value) height.value = ans;

    return ans;
  }

  // Function to find height of a given node
  findHeight(value, root = this.root) {
    let height = { value: -1 }; // Using an object
    // to store height by reference
    this.findHeightUtil(value, root, height);
    if (height.value === -1) {
      return undefined;
    } else {
      return height.value;
    }
  }
}
