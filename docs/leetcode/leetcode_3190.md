
# Leetcode-3190. Find Minimum Operations to Make All Elements Divisible by Three
## 題目說明
給定一個整數數組 `nums`。每次運算，你可以對 `nums` 中的任意元素加 `1` 或減 `1`。

傳回使 `nums` 中的所有元素都能被 `3` 整除所需的最少運算次數。

### 限制條件：
- `1 <= nums.length <= 50`。
- `1 <= nums[i] <= 50`。

## 解題思路
題目的目標是讓每個數字都變成 `3` 的倍數，而你能做的操作是對每個數字進行 `+1` 或 `-1`，一次操作算一步。我們需要計算將整個陣列轉換完成所需的最少操作步數。

- 對於每個數字 `x`，只要看它對 `3` 的餘數（`x % 3`）即可決定最少需要幾步：
    - 若餘數是 `0`，表示它已經是 `3` 的倍數，不需要任何操作。
    - 若餘數是 `1`，你可以 `-1` 讓它變成 `3` 的倍數，只需要 `1` 步。
    - 若餘數是 `2`，你可以 `+1` 讓它變成 `3` 的倍數，也只需要 `1` 步。

因此，每個數字需要的最少操作次數，就是 `min(x % 3, 3 - x % 3)`。
將所有數字各自需要的操作步數加總，就是最後答案。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int minimumOperations(vector<int>& nums) {
        int ans = 0;
        for (int x : nums) {
            ans += min(x % 3, 3 - x % 3);
        }
        return ans;
    }
};
```