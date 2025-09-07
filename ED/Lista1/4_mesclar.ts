/*
4. Implemente uma função para mesclar duas listas encadeadas ordenadas em uma única
lista encadeada também ordenada por idade. As listas de entrada já estão em ordem
crescente. Discuta a eficiência do algoritmo e possíveis otimizações.
*/

import { LinkedList_ } from "./linkedList";
import type { _Node } from "./node_";

export class SortedNumberList extends LinkedList_<number> {
  public add(data: number): void {
    const newNode: _Node<number> = { data, next: null };
    const head = this.getHead();

    // lista vazia ou o novo elemento deve ser a nova cabeça
    if (!head || head.data >= data) {
      newNode.next = head;
      this.setHead(newNode);
      this.increaseSize();
      return;
    }

    // encontrar ponto de inserção
    let current = head;
    while (current.next && current.next.data < data) {
      current = current.next;
    }

    newNode.next = current.next;
    current.next = newNode;
    this.increaseSize();
  }

  /**
   * Retorna um array com os valores (útil para testes).
   */
  public toArray(): number[] {
    const out: number[] = [];
    let n = this.getHead();
    while (n) {
      out.push(n.data);
      n = n.next;
    }
    return out;
  }

  /**
   * Mescla duas listas ordenadas (a e b) em uma nova lista também ordenada.
   * - Não altera as listas originais (os nós são COPIADOS).
   * - Implementação recursiva usando somente o conceito de "head"
   *   (nenhum uso de ponteiro de cauda / tail).
   *
   * Complexidade:
   *  - Tempo: O(n + m), onde n = tamanho de a, m = tamanho de b.
   *  - Espaço adicional: O(n + m) para os novos nós + O(n + m) de profundidade de pilha
   */
  public static merge(
    a: SortedNumberList,
    b: SortedNumberList,
  ): SortedNumberList {
    const result = new SortedNumberList();
    const mergedHead = this._mergeCopyRecursive(a.getHead(), b.getHead());
    result.setHead(mergedHead);

    let cursor = mergedHead;
    while (cursor) {
      result.increaseSize();
      cursor = cursor.next;
    }

    return result;
  }

  private static _mergeCopyRecursive(
    h1: _Node<number> | null,
    h2: _Node<number> | null,
  ): _Node<number> | null {
    if (!h1 && !h2) return null;
    if (!h1) {
      return {
        data: h2!.data,
        next: this._mergeCopyRecursive(null, h2!.next),
      };
    }
    if (!h2) {
      return {
        data: h1.data,
        next: this._mergeCopyRecursive(h1.next, null),
      };
    }

    if (h1.data <= h2.data) {
      return {
        data: h1.data,
        next: this._mergeCopyRecursive(h1.next, h2),
      };
    } else {
      return {
        data: h2.data,
        next: this._mergeCopyRecursive(h1, h2.next),
      };
    }
  }
}

/*
- Inserção:
   - O(n) por operação (varre até achar posição).
   - Para muitas inserções em lote, pode ser mais eficiente ordenar antes e
     construir linearmente.

- Merge:
   - O(n + m) tempo.
   - O(n + m) nós novos (cópia) + O(n + m) profundidade de pilha.
   - Versão iterativa eliminaria custo de pilha; versão in-place (reutilizando nós)
     eliminaria a cópia adicional, mas modificaria as listas originais.
