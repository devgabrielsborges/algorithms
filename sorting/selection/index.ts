const selectionSort = ((items: number[], start: number = 0): number[] => {
    const length = items.length;

    if (start >= length - 1) return items;

    let min_index = start;
    for (let i = start + 1; i < length; i++) {
        if (items[i] < items[min_index]) min_index = i;
    }

    if (min_index !== start) [items[start], items[min_index]] = [items[min_index], items[start]];

    return selectionSort(items, ++start);
})

const items = [2, 1, 5, 3, 6, 7, 9, 8];

console.time()
console.log(items);
console.log(selectionSort([...items]));
console.timeEnd()