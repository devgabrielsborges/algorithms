type Item = {
    value: number | string | boolean,
    below: Item | null
}

class Stack {
    private top: Item | null;
    private maxSize: number;
    private actualSize: number;

    constructor(maxSize: number) {
        this.actualSize = 0;
        this.maxSize = maxSize;
    }

    public push(item: Item): void {
        if (this.actualSize >= this.maxSize) throw new Error("Stack Overflow!");
        
        item.below = this.top;
        this.top = item;
        this.actualSize++;
    }

    public pop(): Item {
        if (this.top == null) throw new Error("Stack is empty!");
        
        let lastItem = this.top;
        this.top = this.top.below;
        this.actualSize--;

        return lastItem;
        
    }

    public peek(): Item {
        if (this.top == null) throw new Error("Stack is empty!");

        return this.top;
    }

    public isEmpty(): boolean {
        return this.top == null;
    }

    public getSize(): number {
        return this.actualSize;
    }

}