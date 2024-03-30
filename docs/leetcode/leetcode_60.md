
# Leetcode-60. Permutation Sequence
## 題目說明
一個集合 `[1, 2, 3, ..., n]` 總共包含 `n！`個獨特的排列。
透過按順序列出並標記所有排列，我們得到 n = 3 時的以下序列：
“123”
“132”
“213”
“231”
“312”
“321”
接著給定 n 和 k，需回傳第 k 個排列序列。
### 限制條件：
-  `1 <= n <= 9`
-  `1 <= k <= n！`
## 解題思路
數學題:首先宣告一個`numbers`一串裡面總共有1~9元素，再來宣告一個`vector`用來計算n個數字的總排列數量，接著跑一個for迴圈執行n次並將j除以排列的數量來確認第一個數字是到哪裡，接著再求餘數繼續確認第二個數字以此類推，此外每當找到一個數字就將此數字移除`numbers`字串，最後回傳`result`。
## 參考解法
```cpp title="C++" showLineNumbers {14,15}
class Solution {
public:
    string getPermutation(int n, int k) {
        string result = "";
        string numbers = "123456789";

        vector<int> factorial(n, 1);
        for (int i = 2; i < n; ++i) {
            factorial[i] = i * factorial[i - 1];
        }

        --k; // for index
        for (int i = n; i >= 1; --i) {
            int j = k / factorial[i - 1];
            k %= factorial[i - 1];
            result += numbers[j];
            numbers.erase(j, 1);
        }

        return result;
    }
};
```