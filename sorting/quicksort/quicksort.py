from random import choice


def quicksort(arr: list[int]) -> list[int]:
    if len(arr) < 2:
        return arr
    pivot = choice(arr)
    lowers = [i for i in arr if i <= pivot]
    equals = [i for i in arr if i == pivot]
    highers = [i for i in arr if i > pivot]

    return quicksort(lowers) + equals + quicksort(highers)


if __name__ == "__main__":
    base_arr = [10, 45, 13, 17, 29, 90]

    print(f"base array => {base_arr}\nordered array => {quicksort(base_arr)}")
