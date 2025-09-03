type Node_<T> = {
    data: NonNullable<T>,
    next: Node_<T> | null
}

class LinkedList<T> {
    private head: Node_<T> | null = null;
    private size: number = 0;

    /**
     * Adds a new node with the given data to the end of the list.
     */
    public add(data: NonNullable<T>): void {
        const newNode: Node_<T> = { data, next: null };
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    /**
     * Adds a new node with the given data to the beginning of the list.
     */
    public addFirst(data: NonNullable<T>): void {
        const newNode: Node_<T> = { data, next: this.head };
        this.head = newNode;
        this.size++;
    }

    /**
     * Removes the first occurrence of the node with the given data.
     * Returns true if removed, false otherwise.
     */
    public remove(data: NonNullable<T>): boolean {
        if (!this.head) return false;

        if (this.head.data === data) {
            this.head = this.head.next;
            this.size--;
            return true;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.data === data) {
                current.next = current.next.next;
                this.size--;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    /**
     * Checks if the list contains the given data.
     */
    public contains(data: NonNullable<T>): boolean {
        let current = this.head;
        while (current) {
            if (current.data === data) return true;
            current = current.next;
        }
        return false;
    }

    /**
     * Returns the size of the list.
     */
    public getSize(): number {
        return this.size;
    }

    /**
     * Checks if the list is empty.
     */
    public isEmpty(): boolean {
        return this.size === 0;
    }

    /**
     * Returns a string representation of the list.
     */
    public toString(): string {
        let result = '';
        let current = this.head;
        while (current) {
            result += current.data + ' -> ';
            current = current.next;
        }
        result += 'null';
        return result;
    }

    public removerDuplicatas(): void {
        if (!this.head) return;

        const map = new Map<NonNullable<T>, Node_<T>>();
        let current: Node_<T> | null = this.head;
        let newHead: Node_<T> | null = null;
        let last: Node_<T> | null = null;

        while (current) {
            if (!map.has(current.data)) {
                map.set(current.data, current);
                if (!newHead) {
                    newHead = current;
                    last = current;
                } else {
                    if (last) last.next = current;
                    last = current;
                }
            }
            current = current.next;
        }

        // terminate list and update head/size
        if (last) last.next = null;
        this.head = newHead;
        this.size = map.size;
    }
}