/*
9. Implemente um código para criação de filas com prioridade, que remove os elementos
com base nesta prioridade. Em relação às filas tradicionais, faz mais sentido (do ponto
de vista computacional) ajustar a fila na inserção ou na remoção?
*/

/**
 * - Menor número de prioridade = maior prioridade (fica na frente).
 */
export class PriorityQueue<T> {
  private head: Node<T> | null = null;
  private _size = 0;

  /**
   * Insere um novo elemento com a prioridade dada.
   * Menor prioridade numérica = sai primeiro.
   */
  public enqueue(value: T, priority: number): void {
    const node: Node<T> = { value, priority, next: null };

    if (!this.head || priority < this.head.priority) {
      node.next = this.head;
      this.head = node;
      this._size++;
      return;
    }

    let current = this.head;
    while (current.next && current.next.priority <= priority) {
      current = current.next;
    }
    node.next = current.next;
    current.next = node;
    this._size++;
  }

  public dequeue(): T | undefined {
    if (!this.head) return undefined;
    const value = this.head.value;
    this.head = this.head.next;
    this._size--;
    return value;
  }

  public peek(): T | undefined {
    return this.head ? this.head.value : undefined;
  }

  public size(): number {
    return this._size;
  }

  public isEmpty(): boolean {
    return this._size === 0;
  }
}

interface Node<T> {
  value: T;
  priority: number;
  next: Node<T> | null;
}
