import { _Node } from "./node_";

export class LinkedList_<T> {
  private head: _Node<T> | null = null;
  private size: number = 0;

  public add(data: NonNullable<T>): void {
    const newNode: _Node<T> = { data, next: null };
    if (!this.head) {
      this.setHead(newNode);
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.increaseSize();
  }

  public addFirst(data: NonNullable<T>): void {
    const newNode: _Node<T> = { data, next: this.head };
    this.setHead(newNode);
    this.increaseSize();
  }

  public remove(data: NonNullable<T>): boolean {
    if (!this.head) return false;

    if (this.head.data === data) {
      this.setHead(this.head.next);
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  public contains(data: NonNullable<T>): boolean {
    let current = this.head;
    while (current) {
      if (current.data === data) return true;
      current = current.next;
    }
    return false;
  }

  public getSize(): number {
    return this.size;
  }

  public get(index: number): NonNullable<T> {
    if (index < 0 || index >= this.size) {
      throw new RangeError(`Index out of bounds: ${index}`);
    }
    let current = this.head;
    let i = 0;
    while (current && i < index) {
      current = current.next;
      i++;
    }
    return current!.data;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public toString(): string {
    let result = "";
    let current = this.head;
    while (current) {
      result += current.data + " -> ";
      current = current.next;
    }
    result += "null";
    return result;
  }
  
  public getHead() {
    return this.head;
  }
  
  public setHead(node: _Node<T> | null) {
    this.head = node;
  }
  
  public increaseSize() {
    this.size++;
  }
}
