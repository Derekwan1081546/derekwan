
# Leetcode-1925. Count Square Sum Triples
## 題目說明
平方三元組 (a,b,c) 是其中 a、b 和 c 為整數且 a^2 + b^2 = c^2 的三元組。

給定一個整數 n，傳回滿足 1 <= a, b, c <= n 的平方三元組的數量。

- 範例1：

    輸入：n = 5
    輸出：2
    解釋： 平方三元組是 (3,4,5) 和 (4,3,5)。

- 範例2：

    輸入：n = 10
    輸出：4
    解釋: 平方三元組是 (3,4,5)、(4,3,5)、(6,8,10) 和 (8,6,10)。

### 限制條件：
- `1 <= n <= 250`

## 解題思路
目標是找出所有符合 `a^2 + b^2 = c^2` 的三元組 `(a, b, c)`，其中 `(a, b, c)` 都是正整數，且 `a, b, c <=n`。它使用雙重迴圈遍歷所有可能的 `a` 和 `b` 值，並透過預先計算平方數來優化計算效率。對於每一對 `(a, b)`，計算其平方和，然後檢查其平方根是否為整數且不超過 `n`。若符合條件，則計數加 2（因為 `(a, b, c)` 和 `(b, a, c)` 是不同的組合）。最終返回符合條件的三元組數量。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int countTriples(int n) {
        int count = 0;
        // 預先計算所有平方數
        vector<int> squares(n + 1);
        for (int i = 1; i <= n; i++) {
            squares[i] = i * i;
        }

        // 使用兩層迴圈找出所有 (a, b, c)
        for (int a = 1; a <= n; a++) {
            for (int b = a + 1; b <= n; ++b) { // b > a，避免重複
                int c2 = squares[a] + squares[b];
                int c = sqrt(c2);

                // 檢查 c 是否為整數且不超過 n
                if (c * c == c2 && c <= n) {
                    count += 2; // (a, b, c) 和 (b, a, c) 都是有效的組合
                }
            }
        }
        return count;
    }
};
```