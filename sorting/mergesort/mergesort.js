var merge = function (left, right) {
    var merged = [];
    var left_index = 0;
    var right_index = 0;
    while (left_index < left.length && right_index < right.length) {
        if (left[left_index] < right[right_index]) {
            merged.push(left[left_index]);
            left_index++;
        }
        else {
            merged.push(right[right_index]);
            right_index++;
        }
    }
    merged.push.apply(merged, left.slice(left_index));
    merged.push.apply(merged, right.slice(right_index));
    return merged;
};
var merge_sort = function (arr) {
    if (arr.length <= 1)
        return arr;
    var mid = Math.floor(arr.length / 2);
    var left_half = merge_sort(arr.slice(0, mid));
    var right_half = merge_sort(arr.slice(mid));
    return merge(left_half, right_half);
};
console.log([32, 31, 4, 2, 512, 23]);
console.log(merge_sort([32, 31, 4, 2, 512, 23]));
