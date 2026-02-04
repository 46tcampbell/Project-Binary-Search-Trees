export class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.end = 0;
  }

  enqueue(item) {
    this.queue[this.end] = item;
    this.end++;
  }

  dequeue() {
    const item = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return item;
  }
}
