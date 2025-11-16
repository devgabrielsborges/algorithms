from typing import List


def merge(left: List[int], right: List[int]):
    merged = []
    left_index, right_index = 0, 0

    while (left_index < len(left) and right_index < len(right)):
        if (left[left_index] < right[right_index]):
            merged.append(left[left_index])
            left_index += 1
            continue

        merged.append(right[right_index])
        right_index += 1

    merged.extend(left[left_index:])
    merged.extend(right[right_index:])

    return merged


def merge_sort(arr: List[int]):
    if (len(arr) <= 1):
        return arr

    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]

    return merge(merge_sort(left), merge_sort(right))


if __name__ == "__main__":
    arr = [32, 31, 4, 2, 512, 23]

    print(arr)
    print(merge_sort(arr))
