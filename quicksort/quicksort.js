const quicksort = ((arr) => {
    if (arr.length <= 1) return arr;

    const pivotIndex = Math.floor(Math.random() * arr.length);
    const pivot = arr[pivotIndex];
    const lower_numbers = [];
    const higher_numbers = [];
    const equals = [];

    for (const num of arr) {
        if (num < pivot) lower_numbers.push(num);
        else if (num === pivot) equals.push(num);
        else higher_numbers.push(num);
    }

    return quicksort(lower_numbers).concat(equals).concat(quicksort(higher_numbers));
});

let arr = [10, 23, 43, 54, 90, 85];
console.log(`array: ${arr}\nordered array: ${quicksort(arr)}`);