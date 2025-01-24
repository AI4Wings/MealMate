def bubble_sort(arr):
    """
    冒泡排序算法实现
    Bubble Sort Implementation
    
    参数 Parameters:
        arr: 输入数组 (Input array)
        
    返回 Returns:
        排序后的数组 (Sorted array)
    """
    if not arr:
        return arr
    
    n = len(arr)
    # 优化标志：如果一轮比较中没有发生交换，说明数组已经有序
    # Optimization flag: if no swaps occur in a round, array is already sorted
    
    for i in range(n):
        swapped = False
        # 外层循环控制排序轮数
        # Outer loop controls the number of sorting rounds
        
        for j in range(0, n - i - 1):
            # 内层循环进行相邻元素比较和交换
            # Inner loop compares and swaps adjacent elements
            if arr[j] > arr[j + 1]:
                # 交换元素
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # 如果这一轮没有发生交换，说明数组已经有序，可以提前退出
        # If no swapping occurred in this round, array is sorted, we can exit early
        if not swapped:
            break
            
    return arr

# 测试用例
# Test cases
if __name__ == "__main__":
    # 测试用例1：常规数组
    # Test case 1: Regular array
    test_array1 = [64, 34, 25, 12, 22, 11, 90]
    print("\n测试用例1 - 常规数组 Test case 1 - Regular array:")
    print("原始数组 Original:", test_array1)
    sorted_array1 = bubble_sort(test_array1.copy())
    print("排序后 Sorted:", sorted_array1)
    
    # 测试用例2：大数字测试
    # Test case 2: Large numbers
    test_array2 = [1000000, 2222222, 11, 14444, 1333333, 12, 13]
    print("\n测试用例2 - 大数字 Test case 2 - Large numbers:")
    print("原始数组 Original:", test_array2)
    sorted_array2 = bubble_sort(test_array2.copy())
    print("排序后 Sorted:", sorted_array2)
    
    # 测试用例3：边界情况 - 空数组
    # Test case 3: Edge case - Empty array
    test_array3 = []
    print("\n测试用例3 - 空数组 Test case 3 - Empty array:")
    print("原始数组 Original:", test_array3)
    sorted_array3 = bubble_sort(test_array3.copy())
    print("排序后 Sorted:", sorted_array3)
    
    # 测试用例4：边界情况 - 单个元素
    # Test case 4: Edge case - Single element
    test_array4 = [42]
    print("\n测试用例4 - 单元素 Test case 4 - Single element:")
    print("原始数组 Original:", test_array4)
    sorted_array4 = bubble_sort(test_array4.copy())
    print("排序后 Sorted:", sorted_array4)
    
    # 测试用例5：重复元素
    # Test case 5: Duplicate elements
    test_array5 = [4, 2, 4, 2, 3, 3, 1, 1]
    print("\n测试用例5 - 重复元素 Test case 5 - Duplicate elements:")
    print("原始数组 Original:", test_array5)
    sorted_array5 = bubble_sort(test_array5.copy())
    print("排序后 Sorted:", sorted_array5)
    
    # 验证原数组未被修改（数据安全性测试）
    # Verify original arrays weren't modified (data safety test)
    print("\n数据安全性测试 Data safety test:")
    print("原始数组1保持不变 Original array 1 unchanged:", test_array1)
    print("原始数组2保持不变 Original array 2 unchanged:", test_array2)
