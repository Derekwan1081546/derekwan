
# Leetcode-3381. Maximum Subarray Sum With Length Divisible by K
## 題目說明
給定一個整數數組 `nums` 和一個整數 `k`。

傳回 `nums` 的一個子數組的最大和，其中子數組的大小能被 `k` 整除。

### 限制條件：
- `1 <= k <= nums.length <= 2 * 10＾5`。
- `-10＾9 <= nums[i] <= 10＾9`。

## 解題思路
題目要求在陣列中找到一段連續子陣列，使得其長度符合某種與 k 有關的條件，而你的解法使用了「前綴和」與「前綴和的模 `k` 性質」來求解最大片段和。

主要觀念如下：

我們逐步累加前綴和 `prefix`，並用 `index % k` 當作分類依據。因為若兩個前綴的位置 `i`、`j` 具有相同的 `index % k`，那麼這兩者之間的子陣列長度就是 `k` 的倍數。也就是說，只要 `index mod k` 相同，兩者之間的區間長度符合題目要求。

接著，我們想要最大化子陣列的總和，可以利用：

子陣列和 = `prefix(j) − prefix(i)` ，且 `i < j`。

因此，如果想讓 `(prefix(j) − prefix(i))` 最大，就希望 `prefix(i)` 盡可能小，而 `prefix(j)` 盡可能大。

於是我們用一個陣列 `best[k]` 來記錄「對於每種 `index mod k`，曾出現過的最小 `prefix`」。
當遍歷到新的 `prefix` 時，只要找到先前同樣 `mod` 的最小 `prefix`，就能計算對應的子陣列和，並用來更新答案。

整個流程就是：

1. 累加 `prefix`。
2. 計算目前位置的 `index mod k`。
3. 若之前出現過相同 `mod` 的 `prefix`，利用 `prefix` - 最小 `prefix` 計算最大子陣列和。
4. 更新此 `mod` 對應的最小 `prefix`。
5. 持續遍歷直到完成。

最後，在所有合法長度的子陣列中取最大的那一個和作為答案。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    long long maxSubarraySum(vector<int>& nums, int k) {
        vector<long long> best(k, LLONG_MAX);
        long long prefix = 0;
        long long ans = LLONG_MIN;
        int index = 1;
        best[0] = 0; // prefix = 0 的模 k 初始值

        for (int x : nums) {
            prefix += x;
            int mod = index % k;
            // 若之前出現過相同的 prefix mod k
            if (best[mod] != LLONG_MAX) {
                ans = max(ans, prefix - best[mod]);
            }
            index++;
            // 記錄該 mod 下最小 prefix
            best[mod] = min(best[mod], prefix);
        }
        return ans;
    }
};
```