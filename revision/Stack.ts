import type { Node_ } from "./Node_";

class Stack<T> {
    top: Node_<T> | null = null;
    size: number = 0;

    /**
     * push
     */
    public push(data: Node_<T>) {
        if (!top) this.top = data;
        else {
            let actual = this.top;
            this.top = data;
            this.top.next = actual;
        }

        this.size++;
    }

    /**
     * pop
     */
    public pop() {
        if (this.top) {
            let actual = this.top;
            this.top = this.top?.next;

            return actual;
        }

        this.size--;
    }
}