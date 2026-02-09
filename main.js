import { Tree } from './tree.js';
import { Node } from './node.js';
import {
  sortAndUniqueArray,
  prettyPrint,
  doubleNum,
  log,
  createArrayOfRandomNumbers,
} from './utils.js';
import { Queue } from './queue.js';

const array = createArrayOfRandomNumbers(50);
const sortedAndUniqueArray = sortAndUniqueArray(array);
const tree = new Tree(sortedAndUniqueArray);
console.log(prettyPrint(tree.root));
console.log(tree.isBalanced());
tree.levelOrderForEach(console.log);
console.log('-------------------------------------');
tree.preOrderForEach(console.log);
console.log('-------------------------------------');
tree.postOrderForEach(console.log);
console.log('-------------------------------------');
tree.inOrderForEach(console.log);
console.log('-------------------------------------');
console.log(tree.insert(1000));
console.log(tree.insert(156));
console.log(tree.insert(133));
console.log(tree.insert(199));
console.log(tree.insert(500));
console.log(tree.insert(765));
console.log(tree.insert(392));
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(prettyPrint(tree.root));
tree.levelOrderForEach(console.log);
console.log('-------------------------------------');
tree.preOrderForEach(console.log);
console.log('-------------------------------------');
tree.postOrderForEach(console.log);
console.log('-------------------------------------');
tree.inOrderForEach(console.log);
console.log('-------------------------------------');
