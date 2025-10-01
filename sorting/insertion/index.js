var insertionSort = (function (items) {
    for (var j = 1; j < items.length; j++) {
        var key = items[j];
        var i = j - 1;
        while (i >= 0 && items[i] > key) {
            items[i + 1] = items[i];
            i--;
        }
        items[i + 1] = key;
    }
    return items;
});
