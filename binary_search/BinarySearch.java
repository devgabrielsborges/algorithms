package binary_search;
public class BinarySearch {
    public static void main(String[] args) {
        int[] nums = {1, 3, 5, 6, 7, 67};
        System.out.println(binarySearch(nums, 5));
    }

    public static int binarySearch(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;
        int middle, attempt;

        while (low <= high) {
            middle = (low + high) >>> 1;
            attempt = nums[middle];

            if (attempt == target) {
                return middle;
            }
            if (attempt > target) {
                high = middle -1;
                continue;
            }
            low = middle + 1;
        }

        return -1;
    }
}