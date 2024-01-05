import ArrayList from "./ArrayList";

const LEFT = 1;
const RIGHT = 2;

class Node<T> {
  public constructor(public value: T, public priority: number) {}
}

export default class MinHeap<T = number> {
  #data: ArrayList<Node<T>> = new ArrayList();

  public get length(): number {
    return this.#data.length;
  }

  public insert(priority: number, value?: T): void {
    const node = new Node(value ?? (priority as unknown as T), priority);
    this.#data.append(node);
    this.#heapifyUp();
  }

  public delete(): T {
    if (this.#data.length === 0) {
      throw new Error("Heap is empty");
    }

    const node = this.#data.get(0);

    this.#data.swap(0, this.#data.length - 1);
    this.#data.removeAt(this.#data.length - 1);

    this.#heapifyDown();

    return node.value;
  }

  #heapifyUp(index: number = this.#data.length - 1): void {
    if (index === 0) {
      return;
    }

    const value = this.#data.get(index).priority;
    const parentIndex = this.#getParentIndex(index);
    const parent = this.#data.get(parentIndex).priority;

    if (value >= parent) {
      return;
    }

    this.#data.swap(index, parentIndex);
    this.#heapifyUp(parentIndex);
  }

  #heapifyDown(index: number = 0) {
    if (index >= this.#data.length) {
      return;
    }

    const leftIndex = this.#getChildIndex(index, LEFT);
    const rightIndex = this.#getChildIndex(index, RIGHT);

    if (leftIndex >= this.#data.length) {
      return;
    }

    const value = this.#data.get(index).priority;
    const length = this.#data.length;

    const left = this.#data.get(leftIndex).priority;
    const right =
      rightIndex < length ? this.#data.get(rightIndex).priority : Infinity;

    const minChild = Math.min(left, right);
    if (value <= minChild) {
      return;
    }

    const childIndex = left < right ? leftIndex : rightIndex;
    this.#data.swap(index, childIndex);
    this.#heapifyDown(childIndex);
  }

  #getParentIndex(index: number) {
    return (index - 1) >> 1;
  }

  #getChildIndex(index: number, child: 1 | 2): number {
    return index * 2 + child;
  }
}
