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

    console.log(root);
    return root;
  }
}
