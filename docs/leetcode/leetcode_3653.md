# Leetcode-3653. XOR After Range Multiplication Queries I

## 題目說明
給定一個長度為 `n` 的整數陣列 `nums` 以及一個大小為 `q` 的二維整數陣列 `queries`，其中 `queries[i] = [li, ri, ki, vi]`。對於每個查詢，依序執行以下操作：

1. 令 `idx = li`。
2. 當 `idx <= ri` 時：
   - 更新：`nums[idx] = (nums[idx] * vi) % (10^9 + 7)`。
   - 令 `idx += ki`。

處理完所有查詢後，回傳 `nums` 中所有元素的**位元 XOR** 值。

### 限制條件：
- `1 <= n == nums.length <= 10^3`。
- `1 <= nums[i] <= 10^9`。
- `1 <= q == queries.length <= 10^3`。
- `queries[i] = [li, ri, ki, vi]`。
- `0 <= li <= ri < n`。
- `1 <= ki <= n`。
- `1 <= vi <= 10^5`。


## 解題思路

本題為直接模擬題。依序處理每個查詢，按照題目定義的跳躍步長 `ki` 更新對應索引的元素值，最後對整個陣列做 XOR 即可。

### 演算法步驟

1.  **逐一處理查詢**：
    外層迴圈遍歷每個查詢 `[li, ri, ki, vi]`。

2.  **依步長更新元素**：
    從 `idx = li` 開始，每次 `idx += ki`，直到 `idx > ri`。對每個到達的索引執行 `nums[idx] = (nums[idx] * vi) % (10^9 + 7)`。

3.  **計算 XOR 結果**：
    所有查詢處理完後，對 `nums` 中所有元素做 XOR，即為答案。

---

### 複雜度分析

* **時間複雜度：$O(q \cdot \frac{n}{k_{avg}} + n)$**
  每個查詢最多更新 $O(n)$ 個元素（當 $k_i = 1$ 時），共 $q$ 個查詢，最壞情況為 $O(q \cdot n)$。最後遍歷陣列計算 XOR 為 $O(n)$。整體為 $O(q \cdot n)$。

* **空間複雜度：$O(1)$**
  僅使用常數額外空間（原地修改 `nums`）。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int xorAfterQueries(vector<int>& nums, vector<vector<int>>& queries) {
        int q = queries.size();
        int ans = 0;
        int MOD = 1e9 + 7;
        for (int i = 0; i < q; i++) {
            for (int j = queries[i][0]; j <= queries[i][1]; j += queries[i][2]) {
                nums[j] = (1LL * nums[j] * queries[i][3]) % MOD;
            }
        }
        
        for (int i = 0; i < nums.size(); i++) {
            ans ^= nums[i];
        }
        return ans;
    }
};
```
