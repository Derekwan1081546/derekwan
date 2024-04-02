
# Leetcode-35. Search Insert Position
## 題目說明
給定一個由不同整數組成的排序數組和一個目標值，如果找到目標則傳回索引。 如果不是，則傳回依序插入時所在的索引。

您必須編寫一個運行時間複雜度為 `O(log n)` 的演算法。

### 限制條件：
- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` 包含依升序排序的不同值。
- `-10^4 <= target <= 10^4`
## 解題思路
首先初始化了兩個指針 `left` 和 `right`，分別指向陣列的起始和結尾。然後，它在一個循環中進行迭代，直到 `left` 大於 `right` 為止。在每次迭代中，它計算中間值 `mid`，並檢查 `nums[mid]` 是否等於目標值 `target`。如果相等，則直接返回 `mid`。如果 `nums[mid]` 小於 `target`，則將 `left` 指針移動到 `mid + 1`；如果 `nums[mid]` 大於 `target`，則將 `right` 指針移動到 `mid - 1`。如此一來，它會根據二分搜索的策略不斷地縮小搜索範圍，直到找到目標值的位置或者確定應該插入的位置。

如果目標值存在於陣列中，則最終返回的位置就是目標值的索引。如果目標值不存在於陣列中，則最終返回的位置就是應該插入目標值的位置索引。當迴圈結束時，left 指針的位置就是應該插入的位置索引，因為它指向了第一個大於目標值的元素位置，或者是整個陣列的長度，表示目標值應該插入到陣列的最後面。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        while (left <= right) {
            int mid = (left + right) / 2;//or left + (right - left) / 2; 也行
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }
};
```