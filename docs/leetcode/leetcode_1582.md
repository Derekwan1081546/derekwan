
# Leetcode-1582. Special Positions in a Binary Matrix
## 題目說明
給定一個 `m × n` 的二進位矩陣 `mat`，傳回 `mat` 中特殊位置的數量。

如果 `mat[i][j] == 1` 且第 `i` 行第 `j` 列的所有其他元素均為 `0`（行和列的索引均從 `0` 開始），則位置 `(i, j)` 稱為特殊位置。

### 限制條件：
- `m == mat.length`。

- `n == mat[i].length`。

- `1 <= m, n <= 100`。

- `mat[i][j]` 為 `0` 或 `1`。

## 解題思路

這題的核心目標是找出矩陣中所有的「特殊位置」。一個位置 $(i, j)$ 被稱為特殊的條件是：
1.  該位置的值為 `1`。
2.  該行（第 $i$ 行）除了這個 `1` 以外，其餘全是 `0`。
3.  該列（第 $j$ 列）除了這個 `1` 以外，其餘全是 `0`。

### 1. 核心邏輯：預處理行列統計
如果對每一個 `1` 都重新掃描其所在的整行與整列，時間複雜度會達到 $O(M \times N \times (M+N))$，效率較低。
你的做法是先進行**預處理**：
- 使用兩個動態陣列 `rowcount` 與 `colcount` 分別記錄每一行與每一列中 `1` 出現的總次數。
- 這樣在判斷特定位置時，只需要 $O(1)$ 的時間就能知道該行/該列是否只有一個 `1`。



### 2. 演算法步驟
1.  **初始化計數器**：
    * `rowcount` 大小為列數 $m$，初始為 0。
    * `colcount` 大小為行數 $n$，初始為 0。
2.  **第一次遍歷（統計階段）**：
    * 雙重迴圈走過整個矩陣。
    * 遇到 `mat[i][j] == 1` 時，讓 `rowcount[i]` 和 `colcount[j]` 各自加 1。
3.  **第二次遍歷（驗證階段）**：
    * 再次走過矩陣，尋找數值為 `1` 的點。
    * 檢查該點所在的 `rowcount[i]` 是否等於 1，且 `colcount[j]` 是否也等於 1。
    * 若兩者皆為 1，代表這就是唯一的 `1`，特殊位置計數 `count` 加一。

---

### 3. 效能分析
| 維度 | 複雜度 | 說明 |
| :--- | :--- | :--- |
| **時間複雜度** | $O(M \times N)$ | 矩陣被完整遍歷了兩次，$M$ 為行數，$N$ 為列數。 |
| **空間複雜度** | $O(M + N)$ | 需要額外的兩個 `vector` 來儲存每一行與每一列的統計值。 |

---

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int numSpecial(vector<vector<int>>& mat) {
        int count = 0;
        vector<int> rowcount(mat.size(), 0);
        vector<int> colcount(mat[0].size(), 0);
        for (int i = 0; i < mat.size(); i++) {
            for (int j = 0; j < mat[i].size(); j++) {
                if (mat[i][j] == 1) {
                    rowcount[i] += 1;
                    colcount[j] += 1;
                }
            }
        }
        for (int i = 0; i < mat.size(); i++) {
            for (int j = 0; j < mat[i].size(); j++) {
                if (mat[i][j] == 1) {
                    if (rowcount[i] == 1 && colcount[j] == 1) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
};
```

