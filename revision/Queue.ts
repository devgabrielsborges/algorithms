// FIFO

import type { Node_ } from "./Node_";

class Queue<T> {
    front: Node_<T> | null = null;
    size: number = 0;

    /**
     * enqueue
     */
    public enqueue(data: Node_<T>) {
        if (!this.front) {
            this.front = data;
        } else {
            let actual = this.front;
            while (actual.next) {
                actual = actual.next;
            }

            actual.next = data;
        }

        this.size++;
    }

    /**
     * dequeue
     */
    public dequeue() {
        if (!this.front) return;

        this.front = this.front.next;
        this.size--;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }

    
}