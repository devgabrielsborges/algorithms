import { Vertex } from "./Vertex";

export class Edge<T> {
    private originVertex: Vertex<T>;
    private destinationVertex: Vertex<T>;
    private weight: number;

    constructor(originVertex: Vertex<T>, destinationVertex: Vertex<T>, weight: number = 1) {
        this.originVertex = originVertex;
        this.destinationVertex = destinationVertex;
        this.weight = weight;
    }

    get origin(): Vertex<T> {
        return this.originVertex;
    }

    get destination(): Vertex<T> {
        return this.destinationVertex;
    }

    getWeight(): number {
        return this.weight;
    }

    setWeight(w: number): void {
        this.weight = w;
    }
}