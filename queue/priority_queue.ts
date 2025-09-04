type Next<T> = Item<T> | null
 
type Item<T> = {
    data: NonNullable<T>
    priority: number
    next: Next<T>
}

/**
 * Simple linked-list based priority queue.
 * Higher numeric `priority` values are served first.
 */
class PriorityQueue<T> {
    front: Item<T> | null = null
    size: number = 0

    constructor() {
        this.front = null
        this.size = 0
    }

    /**
     * Enqueue a value with given priority (default 0).
     * Higher priority values come before lower ones.
     */
    public enqueue(data: NonNullable<T>, priority: number = 0): void {
        const item: Item<T> = { data, priority, next: null }

        // empty queue or new item has higher priority than front
        if (!this.front || item.priority > this.front.priority) {
            item.next = this.front
            this.front = item
            this.size++
            return
        }

        // find insertion point (after last node with priority >= item.priority)
        let current = this.front
        while (current.next && current.next.priority >= item.priority) {
            current = current.next
        }

        item.next = current.next
        current.next = item
        this.size++
    }

    /**
     * Dequeue the highest-priority item.
     * Throws if empty. Returns the removed Item (data, priority).
     */
    public dequeue(): Item<T> {
        if (!this.front || this.size === 0) throw new Error("Queue is empty!")

        const removed = this.front
        this.front = this.front.next
        removed.next = null
        this.size--
        return removed
    }

    /**
     * Peek at the highest-priority item without removing it.
     */
    public peek(): Item<T> | null {
        return this.front
    }

    public getSize(): number {
        return this.size
    }

    public isEmpty(): boolean {
        return this.size === 0
    }

    /**
     * Utility: return array of {data, priority} in dequeue order (non-destructive).
     */
    public toArray(): Array<{ data: NonNullable<T>, priority: number }> {
        const out: Array<{ data: NonNullable<T>, priority: number }> = []
        let cur = this.front
        while (cur) {
            out.push({ data: cur.data, priority: cur.priority })
            cur = cur.next
        }
        return out
    }
}
