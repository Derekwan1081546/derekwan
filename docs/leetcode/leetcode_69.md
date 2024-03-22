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
利用二元搜尋法(Binary Search):首先宣告兩個變數分別為`left`和`right`以及`middle`，其中`middle`為`left`和`right`的中間值，利用`middle`來判斷當前值比較高或低，若是比較低，則將`left`提整為`middle+1`﹔若是比較高，則將`right`提整為`middle-1`，直到`left`大於`right`為止才跳出。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int mySqrt(int x) {
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