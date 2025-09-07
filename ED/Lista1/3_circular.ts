/*
3. Desenvolva uma função para inserir um nó em uma lista encadeada circular de pessoas,
garantindo que a ordenação crescente por idade seja mantida. Defina atributos
adequados para o nó, como nome e idade, e valide se a lista continua circular após a
inserção.
*/

class _Node<T extends { idade: number }> {
  data: T;
  next: _Node<T>;
  constructor(data: T) {
    this.data = data;
    this.next = this;
  }
}

class CircularSortedList<T extends { idade: number }> {
  head: _Node<T> | null = null;

  push(node: _Node<T>): void {
    if (!this.head) {
      this.head = node;
      return;
    }

    if (node.data.idade <= this.head.data.idade) {
      const oldHead = this.head;
      let last = oldHead;
      while (last.next !== oldHead) {
        last = last.next;
      }
      node.next = oldHead;
      last.next = node;
      this.head = node;
      return;
    }

    let current = this.head;
    while (
      current.next !== this.head &&
      current.next.data.idade < node.data.idade
    ) {
      current = current.next;
    }

    node.next = current.next;
    current.next = node;
  }
}
