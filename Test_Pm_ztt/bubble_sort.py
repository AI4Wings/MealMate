def bubble_sort(arr):
    """
    冒泡排序算法实现
    Bubble Sort Algorithm Implementation

    参数 (Parameters):
        arr: 待排序的数组 (Array to be sorted)
    
    返回 (Returns):
        排序后的数组 (Sorted array)
    
    时间复杂度 (Time Complexity): 
        - 最坏情况 (Worst Case): O(n^2)
        - 最好情况 (Best Case): O(n) - 当数组已经排序时
        - 平均情况 (Average Case): O(n^2)
    
    空间复杂度 (Space Complexity): O(1)
    """
    if not arr:
        return arr

    n = len(arr)
    # 标记是否发生交换，用于优化已排序情况
    # Flag to track if any swaps occurred, used to optimize for already sorted arrays
    swapped = False
    
    # 外层循环控制排序轮数
    # Outer loop controls the number of sorting rounds
    for i in range(n):
        swapped = False
        
        # 内层循环进行相邻元素比较和交换
        # 每一轮结束后，最大的元素会被移动到末尾，所以下一轮可以少比较一次
        # Inner loop compares and swaps adjacent elements
        # After each round, the largest element is moved to the end
        for j in range(0, n - i - 1):
            # 如果前一个元素大于后一个元素，则交换它们
            # If the current element is greater than the next element, swap them
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # 如果这一轮没有发生交换，说明数组已经有序，可以提前退出
        # If no swapping occurred in this round, array is already sorted
        if not swapped:
            break
            
    return arr

def test_bubble_sort():
    """
    测试冒泡排序的各种情况
    Test various cases for bubble sort
    """
    # 测试用例1：普通数组
    # Test case 1: Regular array
    test_array1 = [64, 34, 25, 12, 22, 11, 90]
    print("测试用例1 (Test case 1)")
    print("原始数组 (Original array):", test_array1)
    sorted_array1 = bubble_sort(test_array1.copy())
    print("排序后数组 (Sorted array):", sorted_array1)
    assert sorted_array1 == sorted(test_array1), "Regular array test failed"
    
    # 测试用例2：已排序数组
    # Test case 2: Already sorted array
    test_array2 = [1, 2, 3, 4, 5]
    print("\n测试用例2 (Test case 2)")
    print("原始数组 (Original array):", test_array2)
    sorted_array2 = bubble_sort(test_array2.copy())
    print("排序后数组 (Sorted array):", sorted_array2)
    assert sorted_array2 == test_array2, "Sorted array test failed"
    
    # 测试用例3：倒序数组
    # Test case 3: Reverse sorted array
    test_array3 = [5, 4, 3, 2, 1]
    print("\n测试用例3 (Test case 3)")
    print("原始数组 (Original array):", test_array3)
    sorted_array3 = bubble_sort(test_array3.copy())
    print("排序后数组 (Sorted array):", sorted_array3)
    assert sorted_array3 == sorted(test_array3), "Reverse sorted array test failed"
    
    # 测试用例4：包含重复元素的数组
    # Test case 4: Array with duplicate elements
    test_array4 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
    print("\n测试用例4 (Test case 4)")
    print("原始数组 (Original array):", test_array4)
    sorted_array4 = bubble_sort(test_array4.copy())
    print("排序后数组 (Sorted array):", sorted_array4)
    assert sorted_array4 == sorted(test_array4), "Array with duplicates test failed"
    
    # 测试用例5：空数组
    # Test case 5: Empty array
    test_array5 = []
    print("\n测试用例5 (Test case 5)")
    print("原始数组 (Original array):", test_array5)
    sorted_array5 = bubble_sort(test_array5.copy())
    print("排序后数组 (Sorted array):", sorted_array5)
    assert sorted_array5 == [], "Empty array test failed"
    
    # 测试用例6：大数字测试
    # Test case 6: Large numbers
    test_array6 = [1000000, 999999, 2000000, 1500000, 1750000]
    print("\n测试用例6 (Test case 6)")
    print("原始数组 (Original array):", test_array6)
    sorted_array6 = bubble_sort(test_array6.copy())
    print("排序后数组 (Sorted array):", sorted_array6)
    assert sorted_array6 == sorted(test_array6), "Large numbers test failed"
    
    # 测试用例7：单个元素数组
    # Test case 7: Single element array
    test_array7 = [42]
    print("\n测试用例7 (Test case 7)")
    print("原始数组 (Original array):", test_array7)
    sorted_array7 = bubble_sort(test_array7.copy())
    print("排序后数组 (Sorted array):", sorted_array7)
    assert sorted_array7 == test_array7, "Single element array test failed"
    
    print("\n所有测试用例通过！(All test cases passed!)")

if __name__ == "__main__":
    test_bubble_sort()
