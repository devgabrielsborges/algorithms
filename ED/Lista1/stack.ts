type Node_<T> = {
  value: NonNullable<T>;
  below: Node_<T> | null;
}

export class Stack_<T> {
  private top: Node_<T> | null = null;
  private maxSize: number;
  private actualSize: number = 0;

  constructor(maxSize: number) {
    this.top = null;
    this.maxSize = maxSize;
    this.actualSize = 0;
  }

  public push(value: NonNullable<T>): void {
    if (this.actualSize >= this.maxSize) throw new Error("Stack Overflow!");
    const node: Node_<T> = { value, below: this.top };
    this.top = node;
    this.actualSize++;
  }

  public pop(): NonNullable<T> {
    if (this.top == null) throw new Error("Stack is empty!");
    const lastNode = this.top;
    this.top = this.top.below;
    this.actualSize--;
    return lastNode.value;
  }

  public peek(): NonNullable<T> {
    if (this.top == null) throw new Error("Stack is empty!");
    return this.top.value;
  }

  public isEmpty(): boolean {
    return this.top == null;
  }

  public getSize(): number {
    return this.actualSize;
  }
}