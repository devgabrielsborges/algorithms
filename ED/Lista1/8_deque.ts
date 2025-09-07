/*
8. Implemente um Deque para simular o histórico de navegação de um navegador. Cada
página acessada deve ser inserida no fim do deque. O botão "voltar" remove uma página
do fim e a coloca em uma pilha auxiliar de "avançar". O botão "avançar" remove uma
página da pilha auxiliar e a reinsere no fim do deque. Tarefas:
 Modele o TAD Deque utilizando listas encadeadas duplamente ligadas.
 Implemente as operações: inserirInicio, inserirFim, removerInicio, removerFim.
 Teste a simulação acessando páginas, voltando e avançando.
*/

import { _Node } from "./node_";
import { Stack_ } from "./stack";

type DoubleNode<T> = {
  data: NonNullable<T>;
  next: DoubleNode<T> | null;
  prev: DoubleNode<T> | null;
}

class Deque<T> {
  head: DoubleNode<T> | null = null;
  tail: DoubleNode<T> | null = null;
  private size: number = 0;

  public inserirInicio(data: NonNullable<T>) {
    const newNode: DoubleNode<T> = { data, next: this.head, prev: null };
    if (this.head) {
      this.head.prev = newNode;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;
    this.size++;
  }

  public inserirFim(data: NonNullable<T>) {
    const newNode: DoubleNode<T> = { data, next: null, prev: this.tail };
    if (this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;
    this.size++;
  }

  public removerInicio(): NonNullable<T> {
    if (!this.head) throw new Error("Deque is empty");
    const oldHead = this.head!;
    this.head = oldHead.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    oldHead.next = oldHead.prev = null;
    this.size--;
    return oldHead.data;
  }

  public removerFim(): NonNullable<T> {
    if (!this.tail) throw new Error("Deque is empty");
    const oldTail = this.tail!;
    this.tail = oldTail.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    oldTail.next = oldTail.prev = null;
    this.size--;
    return oldTail.data;
  }

  public getSize(): number {
    return this.size;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }
}

class NavegacaoService extends Deque<string> {
  avancarStack = new Stack_<string>(10);

  public navegarPara(url: string) {
    this.inserirFim(url);
    this.avancarStack = new Stack_<string>(10);
  }

  public voltar() {
    if (this.getSize() <= 1) throw new Error("No page to go back to");
    const page = this.removerFim();
    this.avancarStack.push(page);
  }

  public avancar() {
    if (this.avancarStack.isEmpty()) throw new Error("No page to advance to");
    this.inserirFim(this.avancarStack.pop());
  }
}
