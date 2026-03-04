
# Leetcode-1536. Minimum Swaps to Arrange a Binary Grid
## 題目說明
給定一個 `n×n` 的二進位網格，一步操作即可選擇網格中相鄰的兩行並交換它們。

如果主對角線以上的所有單元格均為零，則稱該網格有效。

傳回使網格有效的最小步驟數，如果網格無效則傳回 `-1`。

網格的主對角線是指從單元格 `(1, 1)` 到單元格 `(n, n)` 的對角線。

### 限制條件：
- `n == grid.length == grid[i].length`。

- `1 <= n <= 200`。

- `grid[i][j]` 的值要麼是 `0`，要麼是 `1`。

## 解題思路

這題要求我們透過「交換相鄰行」的方式，將一個 $n \times n$ 的二進位矩陣轉換成「上三角矩陣」。上三角矩陣的特性是：第 $i$ 行（從 0 開始）的後方必須至少有 $n - 1 - i$ 個連續的 $0$。

### 1. 核心邏輯：降維處理
我們關心的不是整行數字，而是每一行**末尾連續 0 的數量**。
* **預處理**：遍歷每一行，從右往左數，計算連續出現 $0$ 的個數，並存入一維陣列 `trailingZeros`。
* **目標轉換**：題目變成了「如何透過交換相鄰元素，讓 `trailingZeros[i] >= n - 1 - i` 成立」。



### 2. 演算法步驟 (Greedy Approach)
對於矩陣的每一列 $i$：
1.  **設定目標**：第 $i$ 行需要至少 `target = n - 1 - i` 個末尾 0。
2.  **尋找候選行**：從目前的第 $i$ 行開始向下尋找，找到第一個滿足 `trailingZeros[j] >= target` 的行 $j$。
3.  **貪婪交換**：
    * 如果找不到符合條件的行，代表無法達成目標，回傳 `-1`。
    * 如果找到了，將該行 $j$ 透過「相鄰交換」一路移到位置 $i$。
4.  **累加步數**：交換次數即為 `j - i`，累加到 `totalSwaps`。

### 3. 圖解範例
假設 $n = 3$，目標是：
- 第 0 行至少 2 個 0
- 第 1 行至少 1 個 0
- 第 2 行至少 0 個 0

若 `trailingZeros = [0, 2, 1]`：
- $i=0, target=2$：第 0 行不符，往後找。發現索引 1 的值是 2，符合！
- 交換 (1, 0)，`totalSwaps = 1`，陣列變為 `[2, 0, 1]`。
- $i=1, target=1$：第 1 行不符，往後找。發現索引 2 的值是 1，符合！
- 交換 (2, 1)，`totalSwaps = 1 + 1 = 2`，陣列變為 `[2, 1, 0]`。
- **完成！**



---

### 4. 效能分析
| 維度 | 複雜度 | 說明 |
| :--- | :--- | :--- |
| **時間複雜度** | $O(n^2)$ | 預處理需要 $O(n^2)$。排序部分有兩層迴圈，最差情況也是 $O(n^2)$。 |
| **空間複雜度** | $O(n)$ | 需要額外的空間存儲每一行的末尾 0 數量。 |

---

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int minSwaps(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<int> trailingZeros;
        for (int i = 0; i < n; i++) {
            int count = 0;
            for (int j = n - 1; j >= 0; j--) {
                if (grid[i][j] == 0) {
                    count++;
                } else {
                    break;
                }
            }
            trailingZeros.push_back(count);
        }

        int totalSwaps = 0;
        for (int i = 0; i < n; i++) {
            int target = n - 1 - i;
            int foundIdx = -1;
            for (int j = i; j < n; j++) {
                if (trailingZeros[j] >= target) {
                    foundIdx = j;
                    break;
                }
            }
            if (foundIdx == -1)
                return -1;
            for (int k = foundIdx; k > i; k--) {
                swap(trailingZeros[k], trailingZeros[k - 1]);
                totalSwaps++;
            }
        }
        return totalSwaps;
    }
};
```

