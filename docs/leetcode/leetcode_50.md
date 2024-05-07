
# Leetcode-50. Pow(x, n)
## 題目說明
實作 `pow(x, n)`，它計算 `x` 的 `n` 次方（即 `x^n`）。

### 限制條件：
- `-100.0 < x < 100.0`
- `-2^31 <= n <= 2^31-1`
- `n`是整數。
- `x` 不為零或 `n > 0`。
- `-10^4 <= x^n <= 10^4`

## 解題思路
使用 `快速冪算法` 的方法來解決此問題，
- 1.遞迴方法(`recursive`): 首先宣告一個 `long long`來儲存 `n` 以防止`n` 溢出，接著處理 `exp` 為負數的情況，並轉換 `exp` 為正數，接著使用遞迴計算 `x^(n/2)` 來執行遞迴函示，直到回傳結果為止。
- 2.一般 `while` 迴圈: 首先宣告一個 `long long` 來儲存n以防止 `n` 溢出，當 `exp` 是負數時，我們先將 `x` 轉為倒數並把 `exp` 轉為正數。然後，通過不斷地平方 `x` 並將 `exp` 除以 2（即右移一位），逐步累計到 `result` 中，這樣可以在對數時間 `O(logn)` 內完成計算。
## 參考解法
```cpp title="C++ recursive" showLineNumbers
class Solution {
public:
    double myPow(double x, int n) {
        long long exp = n; // 使用 long long 來防止對於極大或極小的 n出現溢出
        // 處理exp為0的情況
        if (exp == 0)
            return 1;

        // 處理exp為負數的情況，並轉換n為正數
        if (exp < 0) {
            x = 1 / x;
            exp = -exp;
        }

        // 遞迴計算 x^(n/2)
        double half = myPow(x, exp / 2);

        // 根據n的奇偶性來返回不同的結果
        if (exp % 2 == 0) {
            return half * half;
        } else {
            return half * half * x;
        }
    }
};
```
```cpp title="C++ while loop" showLineNumbers
class Solution {
public:
    double myPow(double x, int n) {
        double result = 1; // 用於累計結果的變數
        long long exp = n; // 使用 long long 來防止對於極大或極小的 n出現溢出

        // 如果 n 是負數，將 x 轉為倒數，並將 n 轉為正數
        if (exp < 0) {
            x = 1 / x;
            exp = -exp;
        }

        // 使用快速冪算法進行計算
        while (exp > 0) {
            if (exp % 2 == 1) { // 如果當前的指數是奇數，則將當前的 x乘到結果中
                result *= x;
            }
            x *= x;   // 將基數平方
            exp /= 2; // 將指數減半
        }

        return result;
    }
};
```