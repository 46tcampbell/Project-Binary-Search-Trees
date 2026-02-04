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

    // console.log(root);
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

    console.log(nodeQueue);
    while (nodeQueue.front < nodeQueue.end) {
      if (nodeQueue.queue[nodeQueue.front].left !== null) {
        nodeQueue.enqueue(nodeQueue.queue[nodeQueue.front].left);
      }
      // console.log(nodeQueue);
      if (nodeQueue.queue[nodeQueue.front].right !== null) {
        nodeQueue.enqueue(nodeQueue.queue[nodeQueue.front].right);
      }
      // console.log(nodeQueue);
      callback(nodeQueue.dequeue().data);
    }
    console.log(nodeQueue);
  }
}
