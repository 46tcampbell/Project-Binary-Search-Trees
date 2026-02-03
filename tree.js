import { Node } from './node.js';

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
    if (this.includes(value)) return;
    if (value > root.data) {
      if (root.right === null) {
        root.right = new Node(value);
        return;
      } else {
        return this.insert(value, root.right);
      }
    } else {
      if (root.left === null) {
        root.left = new Node(value);
        return;
      } else {
        return this.insert(value, root.left);
      }
    }
  }
}
