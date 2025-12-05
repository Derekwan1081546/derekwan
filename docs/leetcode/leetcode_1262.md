
# Leetcode-1262. Greatest Sum Divisible by Three
## 題目說明
給定一個整數數組 `nums`，傳回數組中元素總和能被 `3` 整除的最大可能值。

### 限制條件：
- `1 <= nums.length <= 4 * 10＾4`。
- `1 <= nums[i] <= 10＾4`。

## 解題思路
我們希望從陣列中挑選一些數，使得它們的總和可以被 `3` 整除，並且總和最大。
因為「總和 `mod 3`」只會是 `0`、`1`、`2` 其中之一，因此我們可以使用動態規劃，只記錄每種餘數情況下能得到的最大總和。

設一個長度 `3` 的陣列 `dp`：
    - `dp[0]`：目前能得到、且總和 `%3 = 0` 的最大總和
    - `dp[1]`：目前能得到、且總和 `%3 = 1` 的最大總和
    - `dp[2]`：目前能得到、且總和 `%3 = 2` 的最大總和

起始值為 `dp[0] = 0`，其他兩個設為負無限大，代表尚不存在這些餘數的總和。

接著對每個數字 `x`，我們嘗試把它加入所有已知的 `dp` 狀態中。
如果目前存在某個餘數 `r` 的總和，那麼把 `x` 加進去後，新的餘數就會變成 `(r + x % 3) % 3`。
我們用這個新的餘數來更新對應的 `dp` 狀態，取能形成的最大總和。

因為不能在一個 `dp` 陣列上同時讀寫（避免同一輪被影響），每次都先複製一份 `dp` 再更新。

最後，`dp[0]` 就是所有能被 `3` 整除的總和中的最大值，這就是答案。


## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int maxSumDivThree(vector<int>& nums) {
        vector<int> dp(3, INT_MIN);
        dp[0] = 0;

        for (int x : nums) {
            vector<int> new_dp(dp); // 先複製

            for (int r = 0; r < 3; ++r) {
                if (dp[r] != INT_MIN) {
                    int new_r = (r + x % 3) % 3;
                    new_dp[new_r] = max(new_dp[new_r], dp[r] + x);
                }
            }

            dp = new_dp;
        }

        return dp[0];
    }
};
```