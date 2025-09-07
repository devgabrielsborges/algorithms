export type PrintJob = {
  id: number;
  size: number;
};

type JobNode = {
  data: PrintJob;
  next: JobNode | null;
};

export class CircularPrintQueue {
  private tail: JobNode | null = null; // tail.next é a cabeça
  private _size = 0;

  constructor(private readonly maxCapacity: number | null = null) {}

  public size(): number {
    return this._size;
  }

  public isEmpty(): boolean {
    return this._size === 0;
  }

  public isFull(): boolean {
    return this.maxCapacity !== null && this._size >= this.maxCapacity;
  }

  public enqueue(job: PrintJob): boolean {
    if (this.isFull()) return false;

    const node: JobNode = { data: job, next: null };

    if (!this.tail) {
      node.next = node;
      this.tail = node;
    } else {
      // Inserção padrão
      node.next = this.tail.next;
      this.tail.next = node;
      this.tail = node;
    }

    this._size++;
    return true;
  }

  public peek(): PrintJob | undefined {
    if (!this.tail) return undefined;
    return this.tail.next!.data;
  }

  public processNext(): PrintJob | undefined {
    if (!this.tail) return undefined;

    const head = this.tail.next!;

    if (head === this.tail) {
      this.tail = null;
      this._size = 0;
      return head.data;
    }

    this.tail.next = head.next;
    this._size--;
    return head.data;
  }

  public clear(): void {
    this.tail = null;
    this._size = 0;
  }

  public toArray(): PrintJob[] {
    const arr: PrintJob[] = [];
    if (!this.tail) return arr;

    let current = this.tail.next;
    let visited = 0;
    while (current && visited < this._size) {
      arr.push(current.data);
      current = current.next;
      visited++;
    }
    return arr;
  }

  public drain(): PrintJob[] {
    const processed: PrintJob[] = [];
    while (!this.isEmpty()) {
      const job = this.processNext();
      if (job) processed.push(job);
    }
    return processed;
  }
}