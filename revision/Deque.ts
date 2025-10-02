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
            // if empty, back also points here
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
}
