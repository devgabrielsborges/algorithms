const insertionSort = ((items: number[]): number[] => {
    for (let j = 1; j < items.length; j++) {
        let key = items[j];
        let i = j - 1;

        while (i >= 0 && items[i] > key) {
            items[i + 1] = items[i];
            i--;
        }

        items[i + 1] = key;
    }

    return items;
})