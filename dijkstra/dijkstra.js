var graph = {
    'A': { 'B': 5, 'C': 2 },
    'B': { 'A': 5, 'D': 1, 'E': 4 },
    'C': { 'A': 2, 'F': 9 },
    'D': { 'B': 1, 'G': 6 },
    'E': { 'B': 4, 'G': 8 },
    'F': { 'C': 9, 'G': 3 },
    'G': { 'D': 6, 'E': 8, 'F': 3 }
};
var dijkstra = function (graph, start, end) {
    var distances = {};
    var previous = {};
    var queue = [];
    for (var node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
        queue.push(node);
    }
    distances[start] = 0;
    while (queue.length > 0) {
        queue.sort(function (a, b) { return distances[a] - distances[b]; });
        var current_1 = queue.shift();
        if (current_1 === end) {
            break;
        }
        for (var neighbor in graph[current_1]) {
            var alt = distances[current_1] + graph[current_1][neighbor];
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = current_1;
            }
        }
    }
    var path = [];
    var current = end;
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }
    return {
        distance: distances[end],
        path: path
    };
};
var startNode = 'A';
var endNode = 'F';
var result = dijkstra(graph, startNode, endNode);
console.log("The cheaper route from ".concat(startNode, " to ").concat(endNode, " is ").concat(result.path.join(' -> '), " with a distance of ").concat(result.distance));
