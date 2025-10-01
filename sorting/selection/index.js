var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var selectionSort = (function (items, start) {
    var _a;
    if (start === void 0) { start = 0; }
    var length = items.length;
    if (start >= length - 1)
        return items;
    var min_index = start;
    for (var i = start + 1; i < length; i++) {
        if (items[i] < items[min_index])
            min_index = i;
    }
    if (min_index !== start)
        _a = [items[min_index], items[start]], items[start] = _a[0], items[min_index] = _a[1];
    return selectionSort(items, ++start);
});
var items = [2, 1, 5, 3, 6, 7, 9, 8];
console.time();
console.log(items);
console.log(selectionSort(__spreadArray([], items, true)));
console.timeEnd();
