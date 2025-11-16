const merge = (left: number[], right: number[]): number[] => {
    const merged: number[] = [];
    let left_index = 0;
    let right_index = 0;

    while (left_index < left.length && right_index < right.length) {
        if (left[left_index] < right[right_index]) {
            merged.push(left[left_index]);
            left_index++;
        } else {
            merged.push(right[right_index]);
            right_index++;
        }
    }

    merged.push(...left.slice(left_index));
    merged.push(...right.slice(right_index));

    return merged;
};

const merge_sort = (arr: number[]): number[] => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left_half = merge_sort(arr.slice(0, mid));
    const right_half = merge_sort(arr.slice(mid));

    return merge(left_half, right_half);
};

console.log([32, 31, 4, 2, 512, 23]);
console.log(merge_sort([32, 31, 4, 2, 512, 23]));