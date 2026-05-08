
# Leetcode-2946. Matrix Similarity After Cyclic Shifts
## 題目說明
給定一個 `m x n` 的整數矩陣 `mat` 與一個整數 `k`，矩陣的列為 0-indexed。

以下流程會執行 `k` 次：

- **偶數索引列**（0, 2, 4, ...）會被 **循環左移** 一格。
- **奇數索引列**（1, 3, 5, ...）會被 **循環右移** 一格。

若經過 `k` 次操作後的矩陣與原始矩陣完全相同，則回傳 `true`，否則回傳 `false`。

### 限制條件：
- `1 <= mat.length <= 25`。
- `1 <= mat[i].length <= 25`。
- `1 <= mat[i][j] <= 25`。
- `1 <= k <= 50`。


## 解題思路

這段程式碼的目標是解決 **LeetCode 2946. Matrix Similarity After Cyclic Shifts**（循環位移後的矩陣相似性判斷）。
題目的核心觀察在於：**循環位移 `n` 次（`n` 為矩陣寬度）會回到原狀**，因此實際有效的位移量只是 `k % n`。此外，雖然偶數列向左、奇數列向右方向不同，但由於是循環位移，**左移 `s` 格與右移 `n - s` 格在「位移後是否與原列相同」這個判斷上是等價的**，因此我們只需要驗證每一列在位移 `s = k % n` 後是否仍與自身相同即可。

1.  **計算有效位移量**：
    令 `shiftk = k % n`，避免做超過一輪的多餘比較。

2.  **逐元素比對**：
    對每個位置 `(i, j)`，檢查 `mat[i][j]` 是否等於 `mat[i][(j + shiftk) % n]`。
    * 若任一位置不相等，代表位移後矩陣會改變，直接回傳 `false`。
    * 若全部相等，代表每一列都具有「以 `shiftk` 為週期」的循環性質，矩陣不會因位移而改變。

3.  **回傳結果**：
    全部位置都通過比對後回傳 `true`。

### 為何不需要分別處理奇偶列？

對於某一列，若 `mat[i][j] == mat[i][(j + s) % n]` 對所有 `j` 成立，將 `j` 替換為 `j - s` 後同樣可推得 `mat[i][j] == mat[i][(j - s + n) % n]`，因此左移與右移的判定結果等價，可以用同一個條件統一檢查。

---

### 複雜度分析

* **時間複雜度：$O(M \times N)$**
  其中 $M$ 為矩陣的列數、$N$ 為矩陣的行數。我們對每個元素執行一次常數時間的比較。

* **空間複雜度：$O(1)$**
  僅使用了 `m`、`n`、`shiftk` 等常數個額外變數，沒有配置額外的資料結構。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool areSimilar(vector<vector<int>>& mat, int k) {
        int m = mat.size();
        int n = mat[0].size();
        int shiftk = k % n;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] != mat[i][(j + shiftk) % n])
                    return false;
            }
        }
        return true;
    }
};
```