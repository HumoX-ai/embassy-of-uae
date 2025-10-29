/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let current = head;
  const values = [];
  while (current) {
    values.push(current.val);
    current = current.next;
  }
  let left = 0;
  let right = values.length - 1;
  while (left < right) {
    if (values[left] !== values[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};

class Node {
  constructor(value) {
    this.val = value;
    this.next = null;
  }
}

function createLinkedList(arr) {
  if (arr.length === 0) return null;
  let head = new Node(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new Node(arr[i]);
    current = current.next;
  }
  return head;
}

// console.log("Running tests for isPalindrome function...\n");

// let test1 = isPalindrome(null);
// console.log("Test 1 - Empty list:");
// console.log("Input: null");
// console.log("Output:", test1);
// console.log("Expected: true");
// console.log("Result:", test1 === true ? "PASS" : "FAIL");
// console.log("");

// let test2 = isPalindrome(createLinkedList([5]));
// console.log("Test 2 - Single node:");
// console.log("Input: [5]");
// console.log("Output:", test2);
// console.log("Expected: true");
// console.log("Result:", test2 === true ? "PASS" : "FAIL");
// console.log("");

// let test3 = isPalindrome(createLinkedList([1, 1]));
// console.log("Test 3 - Two same nodes:");
// console.log("Input: [1, 1]");
// console.log("Output:", test3);
// console.log("Expected: true");
// console.log("Result:", test3 === true ? "PASS" : "FAIL");
// console.log("");

let test4 = isPalindrome(createLinkedList([1, 2]));
console.log("Test 4 - Two different nodes:");
console.log("Input: [1, 2]");
console.log("Output:", test4);
console.log("Expected: false");
console.log("Result:", test4 === false ? "PASS" : "FAIL");
console.log("");

console.log("All tests completed!");
