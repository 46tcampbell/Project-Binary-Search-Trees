import { Tree } from './tree.js';
import { sortAndUniqueArray, prettyPrint } from './utils.js';

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sortedAndUniqueArray = sortAndUniqueArray(array);
const tree = new Tree(sortedAndUniqueArray);
console.log(sortedAndUniqueArray);
console.log(prettyPrint(tree.root));
