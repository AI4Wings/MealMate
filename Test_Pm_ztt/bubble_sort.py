def bubble_sort(arr):
    n = len(arr)
    # 外层循环控制需要进行多少轮比较
    for i in range(n):
        # 内层循环进行相邻元素比较和交换
        # 每一轮结束后，最大的元素会被移动到末尾，所以下一轮可以少比较一次
        for j in range(0, n - i - 1):
            # 如果前一个元素大于后一个元素，则交换它们
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# 示例使用
if __name__ == "__main__":
    # 测试数组
    test_array = [11, 12, 13, 14444, 1333333, 2222222]
    print("原始数组:", test_array)

    # 进行排序
    sorted_array = bubble_sort(test_array.copy())
    print("排序后数组:", sorted_array)
