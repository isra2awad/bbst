import Tree from "./bbst.js";
import prettyPrint from "./prettyPrint.js";
import PrettyPrint from "./prettyPrint.js";
function generateRandomArray(length, max) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
}

let newArr = generateRandomArray(10, 100);

let newTree = new Tree(newArr);

console.log(newTree.isBalanced());

newTree.insert(1155);
newTree.insert(1185);
newTree.insert(18855);

console.log(newTree.isBalanced());
console.log(newTree.reBalance());
console.log(newTree.isBalanced());
console.log(newTree.levelOrder());
console.log(newTree.postOrder());
console.log(newTree.inOrder());
console.log(newTree.preOrder());

prettyPrint(newTree.root);
