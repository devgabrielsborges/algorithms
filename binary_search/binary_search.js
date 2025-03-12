const binary_search = ((nums, target) => {
    let low = 0;
    let high = nums.length - 1;

    while (low <= high) {
        let middle = parseInt((low + high) / 2);
        low + high / 2;
        let attempt = nums[middle];

        if (attempt == target) {
            return middle;
        }
        if (attempt > target) {
            high = middle - 1;
            continue;
        }
        low = middle + 1;
    }
    return null;
})

console.log(binary_search([1,3,4,5,67], 5));
