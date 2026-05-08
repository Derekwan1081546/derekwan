# Leetcode-1848. Minimum Distance to the Target Element
## 題目說明
給定一個整數陣列 `nums`（0-indexed）以及兩個整數 `target` 和 `start`，找到一個索引 `i` 使得 `nums[i] == target` 且 `abs(i - start)` 最小化。

回傳 `abs(i - start)`。

題目保證 `target` 一定存在於 `nums` 中。

範例1：

- 輸入：`nums = [1,2,3,4,5], target = 5, start = 3`
- 輸出：`1`
- 說明：`nums[4] = 5` 是唯一等於 target 的值，答案為 `abs(4 - 3) = 1`。

範例2：

- 輸入：`nums = [1], target = 1, start = 0`
- 輸出：`0`

範例3：

- 輸入：`nums = [1,1,1,1,1,1,1,1,1,1], target = 1, start = 0`
- 輸出：`0`
- 說明：每個值都是 1，但 `nums[0]` 使 `abs(i - start)` 最小，為 `abs(0 - 0) = 0`。

### 限制條件：
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 10^4`
- `0 <= start < nums.length`
- `target` 一定存在於 `nums` 中。

## 解題思路
直接遍歷整個陣列，每當遇到 `nums[i] == target` 時，計算 `abs(i - start)` 並與目前的最小值比較，持續更新最小距離。初始值設為陣列長度（因為距離不可能超過陣列長度）。

- **時間複雜度**：O(n)，遍歷陣列一次。
- **空間複雜度**：O(1)，只使用一個變數記錄最小距離。

## 參考解法
```cpp title="C++ Solution 1: 線性掃描" showLineNumbers
class Solution {
public:
    int getMinDistance(vector<int>& nums, int target, int start) {
        int current = nums.size();
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == target) {
                current = min(current, abs(i - start));
            }
        }
        return current;
    }
};
```
