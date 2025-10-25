class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  shift() {
    if (!this.head) return;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
  }

  pop() {
    if (!this.head) return;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return;
    }

    let current = this.head;
    while (current.next && current.next !== this.tail) {
      current = current.next;
    }
    current.next = null;
    this.tail = current;
  }

  unshift(value) {
    const new_node = new Node(value);
    if (!this.head) {
      this.head = new_node;
      this.tail = new_node;
    } else {
      new_node.next = this.head;
      this.head = new_node;
    }
  }

  push(value) {
    const new_node = new Node(value);
    if (!this.head) {
      this.head = new_node;
      this.tail = new_node;
    } else {
      this.tail.next = new_node;
      this.tail = new_node;
    }
  }

  traverse() {
    const list = [];
    let current = this.head;
    while (current) {
      list.push(current.value);
      current = current.next;
    }
    return list;
  }

  insert(index, value) {
    if (index === 0) {
      this.unshift(value);
      return;
    }
    const new_node = new Node(value);
    let current = this.head;
    while (index - 1 > 0 && current.next) {
      current = current.next;
      index--;
    }
    new_node.next = current.next;
    current.next = new_node;
  }

  deleteByIndex(index) {
    if (!this.head) return;
    if (index === 0) {
      this.shift();
      return;
    }
    let current = this.head;
    while (index - 1 > 0 && current.next) {
      current = current.next;
      index--;
    }
    if (current.next) {
      current.next = current.next.next;
      if (!current.next) this.tail = current;
    }
  }

  getByIndex(value) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  getLength() {
    let count = 0;
    let current = this.head;
    while (current) {
      current = current.next;
      count++;
    }
    return count;
  }
}

const list = new LinkedList();
list.push(10);
list.push(20);
list.push(30);
list.unshift(5);
list.insert(2, 15);
console.log(list.traverse());
console.log("Uzunlik:", list.getLength());
list.deleteByIndex(1);
console.log(list.traverse());
console.log("Uzunlik:", list.getLength());
console.log("Index 2 qiymat:", list.getByIndex(2));
