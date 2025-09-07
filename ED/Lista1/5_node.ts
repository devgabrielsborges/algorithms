/*
5. Implemente uma função para inserir um nó em uma lista encadeada circular de pessoas,
garantindo que a ordem crescente por idade seja mantida. Teste a função para verificar
se a estrutura continua circular após a inserção.
*/

import { _Node } from "./node_";

export interface Person {
  name: string;
  age: number;
}

type PersonNode = _Node<Person>;

export class CircularSortedPersonList {
  private head: PersonNode | null = null;
  private _size = 0;


  public size(): number {
    return this._size;
  }

  public isEmpty(): boolean {
    return this.head === null;
  }

  public getHead(): PersonNode | null {
    return this.head;
  }

  /**
   * Insere preservando ordem crescente por idade.
   * Aceita idades duplicadas (permanece agrupado).
   */
  public insert(person: Person): void {
    const newNode: PersonNode = { data: person, next: null };

    if (!this.head) {
      newNode.next = newNode; //circularidade
      this.head = newNode;
      this._size++;
      return;
    }

    if (person.age <= this.head.data.age) {
      let tail = this.head;
      while (tail.next !== this.head) {
        tail = tail.next!;
      }
      newNode.next = this.head;
      tail.next = newNode;
      this.head = newNode;
      this._size++;
      return;
    }

    let current = this.head;
    while (current.next !== this.head && current.next!.data.age < person.age) {
      current = current.next!;
    }

    newNode.next = current.next;
    current.next = newNode;
    this._size++;
  }

  public toArray(): Person[] {
    const result: Person[] = [];
    if (!this.head) return result;

    let current = this.head;
    let visited = 0;
    while (visited < this._size) {
      result.push(current.data);
      current = current.next!;
      visited++;
    }
    return result;
  }

  public isCircularIntact(): boolean {
    if (!this.head) return true;
    let current = this.head.next;
    let steps = 1;
    while (current && current !== this.head && steps <= this._size) {
      current = current.next;
      steps++;
    }
    return current === this.head && steps === this._size;
  }
}