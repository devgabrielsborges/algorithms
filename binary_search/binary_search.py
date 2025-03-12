def binary_search(nums: list[int], target: int):
    low = 0
    high = len(nums) - 1

    while low <= high:
        middle = int((low + high) / 2)
        attempt = nums[middle]

        if attempt == target:
            return middle
        if attempt > target:
            high = middle - 1
            continue
        low = middle + 1
    return None


if __name__ == "__main__":
    print(binary_search([1,3,4,5,6,7], 6))
