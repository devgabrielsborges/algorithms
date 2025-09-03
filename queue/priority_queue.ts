type Next<T> = Item<T> | null
 
type Item<T> = {
    data: NonNullable<T>
    next: Next<T>
}

class Queue<T> {
    front: Item<T> | null
    size: number

    constructor() {
        this.front = null
        this.size = 0;
    }
    

    /**
     * enqueue
     */
    public enqueue(item: Item<T>) {
        if (!this.front) {
            this.front = item;
            this.size++;
            return;
        }

        let current = this.front;

        }
        current.next = item;
        this.size++;
    }

    /**
     * dequeue
     */
    public dequeue() {
        if (!this.front || this.size === 0) throw new Error("Queue is empty!");

        this.front.next != null ? this.front = this.front.next : null
        this.size--;
    }

    public getSize(): number {
        return this.size;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }

    
}
