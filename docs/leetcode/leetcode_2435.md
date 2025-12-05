
# Leetcode-2435. Paths in Matrix Whose Sum Is Divisible by K
## 題目說明
給定一個從 `0` 開始索引的 `m×n` 整數矩陣網格和一個整數 `k`。你目前位於位置 `(0, 0)`，想要到達位置 `(m-1, n-1)`，只能向下或向右移動。

返迴路徑中所有元素總和能被 `k` 整除的路徑數。由於答案可能非常大，因此返回其對 `10^9 + 7` 取模的結果。

### 限制條件：
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 5 * 10^4`
- `1 <= m * n <= 5 * 10^4`
- `0 <= grid[i][j] <= 100`
- `1 <= k <= 50`

## 解題思路
這題要求計算：從左上走到右下、每步只能往下或往右的所有路徑中，有多少條路徑的 總和可以被 `k` 整除。

因為我們在路途中會累積數字的和，所以我們必須追蹤每一條路徑的「目前總和 mod k 的結果」。
若兩條路徑的值雖然不同，但它們的「總和 mod k」相同，那它們在往下一格延伸時的行為是一樣的，因此可以使用動態規劃把狀態合併。

- 核心概念：在每個格子紀錄所有可能的餘數狀態

    我們對於每個格子 `(i, j)` 都記錄：到達這個格子時，路徑的「總和 mod k」可能會是多少，並且對應每個可能的餘數有多少條路徑可以達到這個狀態。

    因此，每個格子都不是只有一個狀態，而是有 k 種可能的餘數狀態。

- 狀態的來源：僅來自上面與左邊

    格子 `(i, j)` 的路徑只能來自：

    上方的 `(i-1, j)`

    左方的 `(i, j-1)`

    我們將這兩個位置的所有餘數狀態取出，並把目前格子的值加上去後，再更新新的餘數狀態。

    也就是說，每一格的所有狀態，是由它上方與左方的所有狀態延伸而來。

- 從起點開始往右下填滿整張 `DP` 表

    起點 `(0,0)` 的餘數狀態非常簡單，只有一種：它自己的值 `mod k`。

    其他格子依序根據左方與上方的資訊累積可能的餘數與路徑數。

- 最後的答案

    結束後，我們查看右下角格子：
    看總和 `mod k == 0` 的路徑數，就是答案。

複雜度分析
    - 時間複雜度: `O(m ＊ n ＊ k)`
        - 我們遍歷 `m * n` 個格子，每個格子都要計算 `k` 個餘數狀態。
    - 空間複雜度: `O(m ＊ n ＊ k)`
        - 我們建立了一個 `m * n * k` 的 DP 陣列。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int numberOfPaths(vector<vector<int>>& grid, int k) {
        const int MOD = 1e9 + 7;
        int m = grid.size(), n = grid[0].size();
        vector<vector<vector<int>>> dp(
            m, vector<vector<int>>(n, vector<int>(k, 0)));

        dp[0][0][grid[0][0] % k] = 1;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int val = grid[i][j] % k;
                for (int r = 0; r < k; r++) {
                    if (i > 0) {
                        int prev = dp[i - 1][j][r];
                        if (prev > 0) {
                            int new_r = (r + val) % k;
                            dp[i][j][new_r] = (dp[i][j][new_r] + prev) % MOD;
                        }
                    }
                    if (j > 0) {
                        int prev = dp[i][j - 1][r];
                        if (prev > 0) {
                            int new_r = (r + val) % k;
                            dp[i][j][new_r] = (dp[i][j][new_r] + prev) % MOD;
                        }
                    }
                }
            }
        }
        return dp[m - 1][n - 1][0];
    }
};
```