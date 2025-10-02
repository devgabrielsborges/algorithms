import type { _Node } from "./Deque";

class CircularDoublyLinkedList<T> {
    head: _Node<T> | null = null;
    back: _Node<T> | null = this.head;

    /**
     * insert
     */
    public insert(data: T) {
        const newNode: _Node<T> = { data: data, next: null, prev: null };

        if (!this.head) {
            this.head = newNode;
            this.back = this.head;
            this.head.next = this.head;
            this.head.prev = this.head;
        } else {
            newNode.prev = this.back;
            newNode.next = this.head;
            if (this.back) this.back.next = newNode;
            this.head.prev = newNode;
            this.back = newNode;
        }
    }

    /**
     * remove
     */
    public remove(data: T): boolean {
        if (!this.head) return false; // List is empty

        let current = this.head;

        do {
            if (current.data === data) {
                if (current === this.head && current === this.back) {
                    this.head = null;
                    this.back = null;
                } else {
                    if (current.prev) current.prev.next = current.next;
                    if (current.next) current.next.prev = current.prev;

                    if (current === this.head) this.head = current.next;
                    if (current === this.back) this.back = current.prev;
                }
                return true;
            }
            current = current.next!;
        } while (current !== this.head);

        return false; // Data not found
    }

    /**
     * find
     */
    public find(data: T): _Node<T> | null {
        if (!this.head) return null;

        let current = this.head;

        do {
            if (current.data === data) return current;
            current = current.next!;
        } while (current !== this.head);

        return null; // Data not found
    }

    /**
     * display
     */
    public display(): void {
        if (!this.head) {
            console.log("List is empty");
            return;
        }

        let current = this.head;

        const result: T[] = [];
        do {
            result.push(current.data);
            current = current.next!;
        } while (current !== this.head);

        console.log(result.join(" <-> "));
    }
}

// Example usage
const list = new CircularDoublyLinkedList<number>();
list.insert(1);
list.insert(2);
list.insert(3);
list.display(); // Output: 1 <-> 2 <-> 3
list.remove(2);
list.display(); // Output: 1 <-> 3
console.log(list.find(3)); // Output: { data: 3, next: [Object], prev: [Object] }
console.log(list.find(4)); // Output: null