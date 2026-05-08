
# Leetcode-3129. Find All Possible Stable Binary Arrays I
## 題目說明
給定三個正整數 `zero`、`one` 和 `limit`。

如果二進位陣列 `arr` 滿足以下條件，則稱之為穩定陣列：
- `arr` 中 `0` 的數量恰好為 `zero`。
- `arr` 中 `1` 的數量恰好為 `one`。
- 任何長度大於 `limit` 的子陣列都必須同時包含 `0` 和 `1`。

請回傳所有穩定二進位陣列的總數，答案對 `10^9 + 7` 取餘。

### 限制條件：
- `1 <= zero, one, limit <= 200`

## 解題思路
這個問題等價於計算所有長度為 `zero + one` 的二進位序列，
其中 `0` 的個數為 `zero`、`1` 的個數為 `one`，且不能出現連續相同元素長度超過 `limit` 的情況。
因為若存在 `limit + 1` 個連續相同元素，就會產生一個長度大於 `limit` 的子陣列只包含同一種數字，因此不符合穩定性。

我們可以使用動態規劃 `dp[i][j][last]`，表示使用了 `i` 個 `0`、`j` 個 `1`，
且最後一個元素為 `last`（`0` 或 `1`）的合法序列數。

轉移邏輯如下：
- 加入一個 `0`：可從 `dp[i-1][j][0]` 或 `dp[i-1][j][1]` 轉移，表示把 `0` 接到現有序列尾端。
  如果這樣會令序列末端出現 `limit + 1` 個連續 `0`，則必須剔除這些非法方案。
- 加入一個 `1`：可從 `dp[i][j-1][0]` 或 `dp[i][j-1][1]` 轉移，若形成 `limit + 1` 個連續 `1`，也必須剔除。

所以可用下面方式更新狀態：
- `dp[i][j][0] = dp[i-1][j][0] + dp[i-1][j][1]`，再扣除末端 `limit + 1` 個 `0` 的非法方案。
- `dp[i][j][1] = dp[i][j-1][0] + dp[i][j-1][1]`，再扣除末端 `limit + 1` 個 `1` 的非法方案。

初始化時：
- 當 `j == 0` 時，只有純 `0` 的序列；若 `i <= limit` 則合法方案數為 `1`，否則為 `0`。
- 當 `i == 0` 時，只有純 `1` 的序列；若 `j <= limit` 則合法方案數為 `1`，否則為 `0`。

最終答案為 `dp[zero][one][0] + dp[zero][one][1]`。

- 時間複雜度：O(zero × one)
- 空間複雜度：O(zero × one)

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int numberOfStableArrays(int zero, int one, int limit) {
        long long MOD = 1e9 + 7;
        // dp[i][j][0] 表示用了 i 個 0, j 個 1，且最後一個放的是 0 的方案數
        // dp[i][j][1] 表示用了 i 個 0, j 個 1，且最後一個放的是 1 的方案數
        vector<vector<vector<long long>>> dp(
            zero + 1,
            vector<vector<long long>>(one + 1, vector<long long>(2, 0)));

        // 初始化邊界條件
        for (int i = 1; i <= min(zero, limit); ++i)
            dp[i][0][0] = 1;
        for (int j = 1; j <= min(one, limit); ++j)
            dp[0][j][1] = 1;

        for (int i = 1; i <= zero; ++i) {
            for (int j = 1; j <= one; ++j) {
                // 狀態轉移：最後一位放 0
                // 基本邏輯：dp[i][j][0] = dp[i-1][j][0] + dp[i-1][j][1]
                dp[i][j][0] = (dp[i - 1][j][0] + dp[i - 1][j][1]) % MOD;
                if (i > limit) {
                    // 減去非法情況：即最後連續放了 limit + 1 個 0
                    // 這代表在第 i - (limit + 1) 個位置時，最後一個放的是 1
                    dp[i][j][0] =
                        (dp[i][j][0] - dp[i - limit - 1][j][1] + MOD) % MOD;
                }

                // 狀態轉移：最後一位放 1
                // 基本邏輯：dp[i][j][1] = dp[i][j-1][0] + dp[i][j-1][1]
                dp[i][j][1] = (dp[i][j - 1][0] + dp[i][j - 1][1]) % MOD;
                if (j > limit) {
                    // 減去非法情況：即最後連續放了 limit + 1 個 1
                    dp[i][j][1] =
                        (dp[i][j][1] - dp[i][j - limit - 1][0] + MOD) %
                        MOD;
                }
            }
        }

        return (dp[zero][one][0] + dp[zero][one][1]) % MOD;
    }
};
```
