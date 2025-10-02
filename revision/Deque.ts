export type Node_<T> = {
    data: T;
    next: _Node<T> | null;
};

export type _Node<T> = Node_<T> & {
    prev: _Node<T> | null;
};

class Deque<T> {
    private front: _Node<T> | null = null;
    private back: _Node<T> | null = null;
    private _size = 0;

    public get size(): number {
        return this._size;
    }

    public isEmpty(): boolean {
        return this._size === 0;
    }

    /**
     * Add element to the left (front)
     */
    public enqueueLeft(data: T): void {
        const node: _Node<T> = { data, next: this.front, prev: null };

        if (this.front) {
            this.front.prev = node;
        } else {
            this.back = node;
        }

        this.front = node;
        this._size++;
    }

    /**
     * Add element to the right (back)
     */
    public enqueueRight(data: T): void {
        const node: _Node<T> = { data, next: null, prev: this.back };

        if (this.back) {
            this.back.next = node;
        } else {
            // if empty, front also points here
            this.front = node;
        }

        this.back = node;
        this._size++;
    }

    /**
     * Remove element from the left (front)
     */
    public dequeueLeft(): T | undefined {
        if (!this.front) return undefined;

        const data = this.front.data;
        this.front = this.front.next;

        if (this.front) {
            this.front.prev = null;
        } else {
            // deque is now empty
            this.back = null;
        }

        this._size--;
        return data;
    }

    /**
     * Remove element from the right (back)
     */
    public dequeueRight(): T | undefined {
        if (!this.back) return undefined;

        const data = this.back.data;
        this.back = this.back.prev;

        if (this.back) {
            this.back.next = null;
        } else {
            // deque is now empty
            this.front = null;
        }

        this._size--;
        return data;
    }

    /**
     * Peek at left element without removing
     */
    public peekLeft(): T | undefined {
        return this.front?.data;
    }

    /**
     * Peek at right element without removing
     */
    public peekRight(): T | undefined {
        return this.back?.data;
    }

    /**
     * Clear the deque
     */
    public clear(): void {
        this.front = null;
        this.back = null;
        this._size = 0;
    }

    /**
     * Convert deque to an array
     */
    public toArray(): T[] {
        const result: T[] = [];
        let current = this.front;

        while (current) {
            result.push(current.data);
            current = current.next;
        }

        return result;
    }

    /**
     * Display the deque (for debugging)
     */
    public display(): void {
        console.log(this.toArray().join(" <-> "));
    }
}

// Example usage
const deque = new Deque<number>();
deque.enqueueLeft(1);
deque.enqueueRight(2);
deque.enqueueLeft(0);
deque.display(); // Output: 0 <-> 1 <-> 2
console.log(deque.dequeueRight()); // Output: 2
deque.display(); // Output: 0 <-> 1
console.log(deque.peekLeft()); // Output: 0
console.log(deque.peekRight()); // Output: 1
deque.clear();
deque.display(); // Output: (empty)
