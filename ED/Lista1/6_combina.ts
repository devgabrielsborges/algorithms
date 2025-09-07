/*
6. Desenvolva uma função que recebe duas listas encadeadas ordenadas e as combina em
uma única lista ordenada. Analise a complexidade da abordagem e sugira possíveis
otimizações para reduzir o tempo de execução.
*/

import { LinkedList_ } from "./linkedList";
import type { _Node } from "./node_";

export class SortedNumberList extends LinkedList_<number> {
  /**
   * Insere um número preservando a ordem crescente.
   */
  public add(data: number): void {
    const newNode: _Node<number> = { data, next: null };
    const head = this.getHead();

    if (!head || head.data >= data) {
      newNode.next = head;
      this.setHead(newNode);
      this.increaseSize();
      return;
    }

    let current = head;
    while (current.next && current.next.data < data) {
      current = current.next;
    }

    newNode.next = current.next;
    current.next = newNode;
    this.increaseSize();
  }

  public toArray(): number[] {
    const out: number[] = [];
    let n = this.getHead();
    while (n) {
      out.push(n.data);
      n = n.next;
    }
    return out;
  }

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