
# Leetcode-704. Binary Search
## 題目說明
給定一個按升序排列的整數數組 `nums` 和一個整數 `target`，寫一個函數在 `nums` 中尋找 `target`。如果 `target` 存在，則傳回其索引；否則，傳回 `-1`。

你必須寫一個時間複雜度為 `O(log n)` 的演算法。

### 限制條件：
- `1 <= nums.length <= 10^4`。
- `-10^4 < nums[i], target < 10^4`。
- `nums` 中的所有整數都是唯一的。
- `nums` 已依升序排序。

## 解題思路
- 初始化指標
    使用兩個指標 `left` 與 `right`，分別指向陣列的起點與終點，代表目前的搜尋範圍。

- 迴圈搜尋
    - 在 `left <= right` 的條件下持續執行：
        - 透過 `mid = left + (right - left) / 2` 計算中間位置（避免 overflow）。
        - 比較 `nums[mid]` 與 `target`。

- 判斷中間值
    - 如果 `nums[mid] == target`，表示已找到答案，直接回傳 mid。
    - 如果 `nums[mid] < target`，代表目標值在右半邊，將 `left` 移到 `mid + 1`。
    - 如果 `nums[mid] > target`，代表目標值在左半邊，將 `right` 移到 `mid - 1`。

- 未找到結果
    - 當 `left > right` 時，代表搜尋範圍已空，陣列中沒有 `target`，回傳 `-1`。

- 時間複雜度
    - 平均/最佳情況：每次比較將搜尋範圍減半 → `O(log n)`
    - 最壞情況：仍然是 `O(log n)`（因為是已排序陣列，不會退化）

- 空間複雜度
    - 使用迭代版本，不需要額外呼叫堆疊 → `O(1)`

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
};
```