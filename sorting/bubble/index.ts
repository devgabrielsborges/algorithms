let itens = [3, 1, 2, 4, 7, 6]

const bubblesort = ((itens: number[]): number[] => {
    let length = itens.length;
    let swapped = true;

    do {
        swapped = false
        for (let i = 1; i < length; i++) {
            if (itens[i - 1] > itens[i]) {
                let swap = itens[i];
                itens[i] = itens[i - 1];
                itens[i - 1] = swap;
                swapped = true;
            }
        }
        length--;
    } while(swapped);

    return itens;
})

console.log(itens);
console.log(bubblesort([...itens]));