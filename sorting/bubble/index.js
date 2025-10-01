var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var itens = [3, 1, 2, 4, 7, 6];
var bubblesort = (function (itens) {
    var length = itens.length;
    var swapped = true;
    do {
        swapped = false;
        for (var i = 1; i < length; i++) {
            if (itens[i - 1] > itens[i]) {
                var swap = itens[i];
                itens[i] = itens[i - 1];
                itens[i - 1] = swap;
                swapped = true;
            }
        }
        length--;
    } while (swapped);
    return itens;
});
console.log(itens);
console.log(bubblesort(__spreadArray([], itens, true)));
