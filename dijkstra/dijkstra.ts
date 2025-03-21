interface Graph {
    [node: string]: {[neighbor: string]: number};
}

const graph: Graph = {
    'A': {'B': 5, 'C': 2},
    'B': {'A': 5, 'D': 1, 'E': 4},
    'C': {'A': 2, 'F': 9},
    'D': {'B': 1, 'G': 6},
    'E': {'B': 4, 'G': 8},
    'F': {'C': 9, 'G': 3},
    'G': {'D': 6, 'E': 8, 'F': 3}
};

const dijkstra = (graph: Graph, start: string, end: string): {distance: number, path: string[]} => {
    const distances: {[node: string]: number} = {};
    const previous: {[node: string]: string | null} = {};
    const queue: string[] = [];

    for (let node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
        queue.push(node);
    }

    distances[start] = 0;

    while (queue.length > 0) {
        queue.sort((a, b) => distances[a] - distances[b]);
        const current = queue.shift()!;

        if (current === end) {
            break;
        }

        for (let neighbor in graph[current]) {
            const alt = distances[current] + graph[current][neighbor];
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = current;
            }
        }
    }

    let path: string[] = [];
    let current: string | null = end;
    while (current !== null) {
        path.unshift(current);
        current = previous[current]
    }

    return {
        distance: distances[end],
        path: path
    };
};

const startNode = 'A';
const endNode = 'F';
const result = dijkstra(graph, startNode, endNode);

console.log(`The cheaper route from ${startNode} to ${endNode} is ${result.path.join(' -> ')} with a distance of ${result.distance}`);