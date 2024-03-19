---
sidebar_position: 5
---
# Leetcode-69
## 題目說明
給定一個非負整數 並傳回 x 的平方根，需向下捨去到最接近的整數。 傳回的整數也應該是非負的。
且不得使用任何內建指數函數或運算符。例如，不要在 c++ 中使用 pow(x, 0.5) 或在 python 中使用 x ** 0.5。
### 限制條件：
- `0 <= x <= 2^31 - 1`
## 解題思路
數學題:首先宣告一個`numbers`一串裡面總共有1~9元素，再來宣告一個`vector`用來計算n個數字的總排列數量，接著跑一個for迴圈執行n次並將j除以排列的數量來確認第一個數字是到哪裡，接著再求餘數繼續確認第二個數字以此類推，此外每當找到一個數字就將此數字移除`numbers`字串，最後回傳`result`。
## 參考解法
```cpp title="C++" showLineNumbers {14,15}
class Solution {
public:
    int mySqrt(int x) {
        // double v;
        // v=sqrt(x);
        // return v;

        // binary search
        long left = 1, right = x;
        while (left <= right) {
            long middle = (left + right) / 2;
            long square = middle * middle;
            if (square == x)
                return middle;
            if (square < x) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return right;
    }
};
```