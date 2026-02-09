export function sortAndUniqueArray(array) {
  const filteredArray = [...new Set(array)];
  return filteredArray.sort((a, b) => a - b);
  /* I was originally going to use the filter method below, but decided to use Set
    after a little research showed it was more performative */
  // const filteredSortedArray = sortedArray.filter((element, index) => {
  //   return element !== sortedArray[index + 1];
  // });
  // console.log(filteredArray);
  // console.log(sortedFilteredArray);
}

export const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};

export function doubleNum(num) {
  return console.log(num * 2);
}

export function log(item) {
  return console.log(item);
}

export function createArrayOfRandomNumbers(numberOfArrayIndexes) {
  if (numberOfArrayIndexes <= 0 || numberOfArrayIndexes > 100) {
    throw new Error('Please choose a number between 1 and 100');
  }
  const array = [];
  for (let i = 0; i <= numberOfArrayIndexes; i++) {
    const num = Math.floor(Math.random() * 100) + 1;
    array.push(num);
  }
  return array;
}
