/*
2. Crie uma função remover_duplicatas(lista), que recebe uma lista encadeada e remove
todas as duplicatas, mantendo apenas a primeira ocorrência de cada elemento. Analise
a complexidade do algoritmo e sugira otimizações.
*/

import { LinkedList } from "../../linked_list/linkedList";
import type { _Node } from "./node_";

export class LinkedListComRemocaoDuplicatas<T> extends LinkedList<T> {
  public removerDuplicatas(): void {
    if (!this.head) return;

    const seen = new Set<NonNullable<T>>();
    let current: _Node<T> | null = this.head;
    let prev: _Node<T> | null = null;

    while (current) {
      if (seen.has(current.data)) {
        if (prev) {
          prev.next = current.next;
        }
        this.size--;
        current = prev ? prev.next : null;
      } else {
        seen.add(current.data);
        prev = current;
        current = current.next;
      }
    }
  }
}