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

interface Pessoa {
  nome: string;
  idade: number;
}

const list = new CircularSortedList<Pessoa>();
[
  { nome: "Joao", idade: 30 },
  { nome: "Maria", idade: 25 },
  { nome: "Luis", idade: 40 },
  { nome: "Ana", idade: 20 },
  { nome: "Caio", idade: 25 }
].forEach(p => list.push(new _Node(p)));

