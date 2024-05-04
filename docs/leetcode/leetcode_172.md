
# Leetcode-172. Factorial Trailing Zeroes
## 題目說明
給定一個整數 `n``，傳回 `n!` 中尾隨零的數量。

請注意，`n！ = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1`。

### 限制條件：
- `0 <= n <= 10^4`

## 解題思路
直接計算因子 5 的數量。因為在階乘數中，因子 2 的數量總是多於因子 5 的數量，所以末尾零的數量由因子 5 的數量決定。以下函數直接計算有多少個 5 的倍數，每找到一個 5 的倍數，就意味著末尾多一個零。這種方法對於非常大的 n 也是有效的，因為它避免了巨大數字的直接計算和儲存。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int trailingZeroes(int n) {
        int count = 0;
        while (n > 0) {
            n /= 5; // Divide by 5 to count how many multiples of 5, 25, 125,
                    // etc., are there.
            count += n;
        }
        return count;
    }
};
```