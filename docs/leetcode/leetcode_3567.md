# Leetcode-3567. Minimum Absolute Difference in Sliding Submatrix

## 題目說明
給定一個 `m x n` 的整數矩陣 `grid` 與一個整數 `k`。對於 `grid` 中每一個連續的 `k x k` 子矩陣，計算其中任意兩個**不同值**之間的**最小絕對差**。

回傳一個大小為 `(m - k + 1) x (n - k + 1)` 的二維陣列 `ans`，其中 `ans[i][j]` 為左上角位於 `(i, j)` 的 `k x k` 子矩陣中的最小絕對差。

**注意**：若子矩陣中所有元素的值皆相同，則答案為 `0`。

### 限制條件：
- `1 <= m == grid.length <= 30`。
- `1 <= n == grid[i].length <= 30`。
- `-10^5 <= grid[i][j] <= 10^5`。
- `1 <= k <= min(m, n)`。


## 解題思路

這段程式碼的目標是解決 **LeetCode 3567. Minimum Absolute Difference in Sliding Submatrix**（滑動子矩陣中的最小絕對差）。

核心思路非常直觀：對於每一個可能的 `k x k` 子矩陣，收集其中所有**不重複**的數值，排序後計算相鄰元素的差值，其中最小者即為答案。

### 演算法步驟

1.  **列舉所有子矩陣**：
    雙層迴圈列舉左上角 `(i, j)`，範圍為 `0 <= i <= m - k`、`0 <= j <= n - k`。

2.  **收集不重複值並排序**：
    對每個子矩陣，使用 `set` 將 `k x k` 範圍內的所有元素插入。`set` 會自動去重並維持升序排列。

3.  **計算最小絕對差**：
    * 若 `set` 大小 `<= 1`（所有值相同），答案為 `0`。
    * 否則，遍歷排序後的相鄰元素，取最小差值即為該子矩陣的答案。

4.  **填入結果陣列**：
    將計算結果存入 `ans[i][j]`。

---

### 複雜度分析

* **時間複雜度：$O((m - k + 1)(n - k + 1) \cdot k^2 \log(k^2))$**
  對每個子矩陣，插入 $k^2$ 個元素到 `set` 中（每次插入 $O(\log(k^2))$），再線性遍歷 `set` 計算最小差值。由於 $m, n, k \leq 30$，實際運算量很小。

* **空間複雜度：$O(k^2)$**
  每個子矩陣使用一個最多 $k^2$ 個元素的 `set`。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    vector<vector<int>> minAbsDiff(vector<vector<int>>& grid, int k) {
        int m = grid.size();
        int n = grid[0].size();
        
        // 準備好裝答案的二維陣列
        vector<vector<int>> ans(m - k + 1, vector<int>(n - k + 1, 0));
        
        // 1. 走訪所有可能的 k x k 框框的左上角 (i, j)
        for (int i = 0; i <= m - k; i++) {
            for (int j = 0; j <= n - k; j++) {
                
                set<int> st; // 用來自動去重與排序的 Set
                
                // 2. 把 k x k 框框裡面的數字全部丟進 set
                for (int x = i; x < i + k; x++) {
                    for (int y = j; y < j + k; y++) {
                        st.insert(grid[x][y]);
                    }
                }
                
                // 3. 檢查特殊情況：如果全部數字都一樣 (或只有1個數字)
                if (st.size() <= 1) {
                    ans[i][j] = 0;
                    continue;
                }
                
                // 4. 計算相鄰元素的最小絕對差值
                int min_diff = INT_MAX;
                int prev = -1e9; // 用一個極小值代表還沒碰到第一個數字
                
                for (int num : st) {
                    if (prev != -1e9) {
                        min_diff = min(min_diff, num - prev);
                    }
                    prev = num; // 更新 prev 為當前數字
                }
                
                ans[i][j] = min_diff;
            }
        }
        
        return ans;
    }
};
```
