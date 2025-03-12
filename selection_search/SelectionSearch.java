package selection_search;

import java.util.Arrays;

public class SelectionSearch {
    public static void main(String[] args) {
        int[] arr = {1, 2, 6, 4, 7, 90, 11};
        int[] sortedArr = selectionSearch(arr.clone()); // Pass a copy to avoid modifying the original
        System.out.println(Arrays.toString(sortedArr));
    }

    public static int searchLower(int[] arr) {
        int lower = arr[0];
        int lowerIndex = 0;

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < lower) {
                lower = arr[i];
                lowerIndex = i;
            }
        }
        return lowerIndex;
    }

    public static int[] selectionSearch(int[] arr) {
        int[] newArr = new int[arr.length];

        for (int i = 0; i < arr.length; i++) {
            int lowerIndex = searchLower(arr);
            newArr[i] = arr[lowerIndex];
            arr[lowerIndex] = Integer.MAX_VALUE;
        }
        return newArr;
    }
}