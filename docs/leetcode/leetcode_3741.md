# Leetcode-3741. Minimum Distance Between Three Equal Elements II

## 題目說明
給定一個整數陣列 `nums`。

一個由 3 個**不同索引**組成的 tuple `(i, j, k)` 為 **good tuple**，若 `nums[i] == nums[j] == nums[k]`。

一個 good tuple 的**距離**定義為 `abs(i - j) + abs(j - k) + abs(k - i)`。

回傳所有 good tuple 中的**最小距離**。若不存在任何 good tuple，回傳 `-1`。

範例1：

- 輸入：`nums = [1,2,1,1,3]`
- 輸出：`6`
- 說明：最小距離由 good tuple `(0, 2, 3)` 達成，距離為 `abs(0-2) + abs(2-3) + abs(3-0) = 2 + 1 + 3 = 6`。

範例2：

- 輸入：`nums = [1,1,2,3,2,1,2]`
- 輸出：`8`
- 說明：最小距離由 good tuple `(2, 4, 6)` 達成，距離為 `abs(2-4) + abs(4-6) + abs(6-2) = 2 + 2 + 4 = 8`。

範例3：

- 輸入：`nums = [1]`
- 輸出：`-1`
- 說明：不存在任何 good tuple。

### 限制條件：
- `1 <= n == nums.length <= 10^5`
- `1 <= nums[i] <= n`

## 解題思路

觀察距離公式：對於排序後的三個索引 `i < j < k`，`abs(i-j) + abs(j-k) + abs(k-i) = 2 * (k - i)`。因此距離只取決於最左和最右的索引差，與中間索引無關。

### 演算法步驟

1. **建立雜湊表**：遍歷陣列，將每個數字對應的所有索引位置記錄下來。

2. **滑動視窗**：對於每個出現次數 ≥ 3 的數字，其索引列表已按順序排列。用大小為 3 的滑動視窗掃描，計算 `2 * (pos[i+2] - pos[i])`，取全域最小值。

3. **回傳結果**：若找到 good tuple 則回傳最小距離，否則回傳 `-1`。

---

### 複雜度分析

* **時間複雜度：$O(n)$**
  建立雜湊表 $O(n)$，滑動視窗遍歷所有索引列表總長度也是 $O(n)$。

* **空間複雜度：$O(n)$**
  雜湊表儲存所有索引位置。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int minimumDistance(vector<int>& nums) {
        unordered_map<int, vector<int>> pos_map;
        for (int i = 0; i < nums.size(); i++) {
            pos_map[nums[i]].push_back(i);
        }
        long long min_dist = -1;

        for (auto& entry : pos_map) {
            vector<int> pos = entry.second;
            if (pos.size() >= 3) {
                for (int i = 0; i < pos.size() - 2; i++) {
                    long long current_dist = 2LL * (pos[i + 2] - pos[i]);
                    if (min_dist == -1 || current_dist < min_dist) {
                        min_dist = current_dist;
                    }
                }
            }
        }
        return (int)min_dist;
    }
};
```
