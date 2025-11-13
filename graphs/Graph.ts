import { Vertex } from "./Vertex";
import { Edge } from "./Edge";


export class Graph<T> {
    private vertices: Map<T, Vertex<T>> = new Map();
    private adj: Map<T, Map<T, Edge<T>>> = new Map();

    numVertices(): number {
        return this.vertices.size;
    }

    numArestas(): number {
        let count = 0;
        for (const map of this.adj.values()) {
            count += map.size;
        }
        return count;
    }

    grau(v: Vertex<T>): number {
        const value = v.value;
        const out = this.adj.get(value)?.size ?? 0;
        let inbound = 0;
        for (const [_, map] of this.adj.entries()) {
            if (map.has(value)) inbound += 1;
        }
        return out + inbound;
    }

    verticesAdjacentes(v: Vertex<T>): Vertex<T>[] {
        const value = v.value;
        const map = this.adj.get(value);
        if (!map) return [];
        const result: Vertex<T>[] = [];
        for (const dest of map.keys()) {
            const vert = this.vertices.get(dest)!;
            if (vert) result.push(vert);
        }
        return result;
    }

    arestasIncidentes(v: Vertex<T>): Edge<T>[] {
        const value = v.value;
        const result: Edge<T>[] = [];
        const outMap = this.adj.get(value);
        if (outMap) {
            for (const e of outMap.values()) result.push(e);
        }
        for (const map of this.adj.values()) {
            for (const e of map.values()) {
                if (e.destination.value === value) result.push(e);
            }
        }
        return result;
    }

    saoAdjacentes(v: Vertex<T>, w: Vertex<T>): boolean {
        const a = this.adj.get(v.value);
        if (a && a.has(w.value)) return true;
        const b = this.adj.get(w.value);
        if (b && b.has(v.value)) return true;
        return false;
    }

    insereVertice(v: Vertex<T>): void {
        const value = v.value;
        if (!this.vertices.has(value)) {
            this.vertices.set(value, v);
            this.adj.set(value, new Map());
        }
    }

    insereAresta(v: Vertex<T>, w: Vertex<T>, weight: number = 1): Edge<T> {
        this.insereVertice(v);
        this.insereVertice(w);
        const edge = new Edge<T>(v, w, weight);
        const map = this.adj.get(v.value)!;
        map.set(w.value, edge);
        return edge;
    }

    removeVertice(v: Vertex<T>): void {
        const value = v.value;
        this.adj.delete(value);
        for (const map of this.adj.values()) {
            if (map.has(value)) map.delete(value);
        }
        this.vertices.delete(value);
    }

    removeAresta(e: Edge<T>): void {
        const origin = e.origin.value;
        const dest = e.destination.value;
        const map = this.adj.get(origin);
        if (map) map.delete(dest);
    }

    getVertice(value: T): Vertex<T> | undefined {
        return this.vertices.get(value);
    }
}
